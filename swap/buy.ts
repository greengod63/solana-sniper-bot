import axios from "axios";
import {
  Connection,
  Keypair,
  VersionedTransaction,
  PublicKey,
  SystemProgram,
  AddressLookupTableAccount,
  TransactionMessage,
  TransactionInstruction,
} from "@solana/web3.js";
import bs58 from "bs58";
// import { addSwap } from "../service/swap.service";
import { getTokenOverview } from "../service/birdeyeService";
import { getTokenInfo_Decimals_Supply } from "../utils/web3";
import dotenv from "dotenv";
import { BOT_FEE_PERCENT } from "../config/constants";

dotenv.config();

// ✅ Solana Mainnet Connection
const SOLANA_RPC_URL = "https://api.mainnet-beta.solana.com";
const connection = new Connection(SOLANA_RPC_URL, "confirmed");
const BOT_WALLET_PUBLIC_KEY = process.env.BOT_WALLET_PUBLIC_KEY as string;

const botFeeWalletPublicKey = new PublicKey(BOT_WALLET_PUBLIC_KEY); // Replace with your wallet address

// ✅ Get CLI Arguments (Private Key, Amount, Token, Gas Fee, Slippage)
// const args = process.argv.slice(2);
// if (args.length < 5) {
//   console.error(
//     "❌ Missing arguments! Usage: node buy_token.js <privateKey> <amountSol> <tokenAddress> <gasFee> <slippage>"
//   );
//   process.exit(1);
// }

// ✅ **Get Swap Route from Jupiter API with Retry Logic**
async function getJupiterSwapRoute(
  retries = 3,
  amountInSol: number,
  slippage: number,
  tokenAddress: string
) {
  while (retries > 0) {
    try {
      const url = `https://quote-api.jup.ag/v6/quote?inputMint=So11111111111111111111111111111111111111112&outputMint=${tokenAddress}&amount=${Math.floor(
        amountInSol * 1e9
      )}&slippageBps=${slippage * 100}`;
      console.log(`🔍 Requesting swap route from Jupiter API: ${url}`);

      const quoteResponse = (await axios.get(url)).data;
      console.log(quoteResponse);

      return quoteResponse;
    } catch (error: any) {
      console.error(`❌ Swap Route Error: ${error.message}`);
      retries--;
      if (retries === 0) process.exit(1);
      console.log(`🔄 Retrying... Attempts left: ${retries}`);
      await new Promise((res) => setTimeout(res, 2000));
    }
  }
}

function deserializeInstruction(instruction: any) {
  return new TransactionInstruction({
    programId: new PublicKey(instruction.programId),
    keys: instruction.accounts.map((key: any) => ({
      pubkey: new PublicKey(key.pubkey),
      isSigner: key.isSigner,
      isWritable: key.isWritable,
    })),
    data: Buffer.from(instruction.data, "base64"),
  });
}

// ✅ **Execute Swap Transaction**
async function executeSwap(
  routeData: any,
  ownerAddress: string,
  wallet: Keypair,
  gasFee: number,
  tokenAddress: string,
  chatId: number,
  amountInSol: number
) {
  try {
    const instructions = (
      await axios.post(
        "https://quote-api.jup.ag/v6/swap-instructions",
        {
          quoteResponse: routeData,
          userPublicKey: ownerAddress,
          wrapAndUnwrapSol: true,
          computeUnitPriceMicroLamports: Math.floor(gasFee * 1e9), // ✅ Convert SOL Gas Fee to MicroLamports
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
    ).data;

    const {
      tokenLedgerInstruction, // If you are using `useTokenLedger = true`.
      computeBudgetInstructions, // The necessary instructions to setup the compute budget.
      setupInstructions, // Setup missing ATA for the users.
      swapInstruction: swapInstructionPayload, // The actual swap instruction.
      cleanupInstruction, // Unwrap the SOL if `wrapAndUnwrapSol = true`.
      addressLookupTableAddresses, // The lookup table addresses that you can use if you are using versioned transaction.
    } = instructions;

    const getAddressLookupTableAccounts = async (
      keys: string[]
    ): Promise<AddressLookupTableAccount[]> => {
      const addressLookupTableAccountInfos =
        await connection.getMultipleAccountsInfo(
          keys.map((key) => new PublicKey(key))
        );

      return addressLookupTableAccountInfos.reduce(
        (acc, accountInfo, index) => {
          const addressLookupTableAddress = keys[index];
          if (accountInfo) {
            const addressLookupTableAccount = new AddressLookupTableAccount({
              key: new PublicKey(addressLookupTableAddress),
              state: AddressLookupTableAccount.deserialize(accountInfo.data),
            });
            acc.push(addressLookupTableAccount);
          }

          return acc;
        },
        new Array()
      );
    };

    const addressLookupTableAccounts = [];
    addressLookupTableAccounts.push(
      ...(await getAddressLookupTableAccounts(addressLookupTableAddresses))
    );

    // ✅ Add Transfer Instruction for Bot Fee
    const botFee = Math.floor(amountInSol * (BOT_FEE_PERCENT / 100) * 1e9); // bot fee SOL, adjust as needed

    const transferInstruction = SystemProgram.transfer({
      fromPubkey: wallet.publicKey,
      toPubkey: botFeeWalletPublicKey,
      lamports: botFee,
    });

    // ✅ Fetch Fresh Blockhash Before Signing
    const { blockhash } = await connection.getLatestBlockhash("finalized");

    if (!blockhash) {
      console.error("Failed to retrieve blockhash from cache");
      throw new Error("Failed to retrieve blockhash from cache");
    }
    const messageV0 = new TransactionMessage({
      payerKey: wallet.publicKey,
      recentBlockhash: blockhash,
      instructions: [
        ...setupInstructions.map(deserializeInstruction),
        deserializeInstruction(swapInstructionPayload),
        deserializeInstruction(cleanupInstruction),
        transferInstruction,
      ],
    }).compileToV0Message(addressLookupTableAccounts);

    const transaction = new VersionedTransaction(messageV0);

    transaction.sign([wallet]);

    // ✅ **Simulate Transaction Before Sending**
    const simulationResult = await connection.simulateTransaction(transaction);
    if (simulationResult.value.err) {
      console.error("❌ Simulation Error:", simulationResult.value.err);
      process.exit(1);
    }

    console.log(`🚀 Sending Signed Transaction...`);
    const txid = await connection.sendRawTransaction(transaction.serialize(), {
      skipPreflight: false,
      preflightCommitment: "confirmed",
    });

    // const tokenOverview = await getTokenOverview(tokenAddress);
    const tokenInfo = await getTokenInfo_Decimals_Supply(tokenAddress);
    // console.log("tokenOverview", tokenOverview);
    const sol_amount = parseFloat(routeData.inAmount) / 1e9;
    const token_amount =
      parseFloat(routeData.outAmount) / Math.pow(10, tokenInfo?.decimals);
    const token_price = parseFloat(routeData.swapUsdValue) / token_amount;

    // await addSwap({
    //   chat_id: chatId,
    //   token_mint_address: tokenAddress,
    //   tx_hash: txid,
    //   sol_amount: sol_amount,
    //   token_amount: token_amount,
    //   entry_sol_price: parseFloat(routeData.swapUsdValue) / sol_amount,
    //   avg_entry_price: token_price,
    //   avg_entry_mc:
    //     (tokenInfo.supply * token_price) / Math.pow(10, tokenInfo.decimals),
    //   swap: "BUY",
    //   tx_time: Date.now(),
    // });
    console.log(`✅ Swap Submitted! Transaction ID: ${txid}`);
    console.log(`🔗 View on SolScan: https://solscan.io/tx/${txid}`);
    return { status: "success", tx_hash: txid, amount: sol_amount };
  } catch (error: any) {
    console.error(`❌ Swap Execution Failed: ${error.message}`);
    return { status: "failed", tx_hash: null };
    // process.exit(1);
  }
}

async function buyToken(
  chatId: number,
  private_key: string,
  amountInSol: number,
  tokenAddress: string,
  gasFee: number,
  slippage: number
) {
  try {
    // let privateKeyString = args[0].trim();
    let privateKeyString = private_key;

    // ✅ Decode and Validate Base58 Private Key
    let privateKey: Uint8Array;
    try {
      privateKey = bs58.decode(privateKeyString);
      if (privateKey.length !== 64) {
        throw new Error(
          `❌ Invalid private key length! Expected 64 bytes but got ${privateKey.length}.`
        );
      }
    } catch (e: any) {
      console.error(`❌ Failed to decode private key: ${e.message}`);
      process.exit(1);
    }

    // ✅ Extract Swap Parameters
    // const amountInSol = parseFloat(args[1]);
    // const tokenAddress = args[2].trim();
    // const gasFee = parseFloat(args[3]);
    // const slippage = parseFloat(args[4]);

    const wallet = Keypair.fromSecretKey(privateKey);
    const ownerAddress = wallet.publicKey.toString();

    console.log(`🚀 Wallet: ${ownerAddress}`);
    console.log(`💰 Buying Token: ${tokenAddress}`);
    console.log(`🔄 Amount: ${amountInSol} SOL`);
    console.log(`⛽ Gas Fee: ${gasFee} SOL`);
    console.log(`📊 Slippage: ${slippage}%`);
    console.log("🔄 Fetching swap route...");

    const botFee = amountInSol * (BOT_FEE_PERCENT / 100);
    const solBalance = await connection.getBalance(wallet.publicKey);

    if (solBalance < botFee) {
      console.error(`❌ Swap Execution Failed: Insufficient SOL balance`);
      return { status: "failed", tx_hash: null };
    }

    // ✅ **Execute Swap Process**
    const swapRoute = await getJupiterSwapRoute(
      3,
      amountInSol,
      slippage,
      tokenAddress
    );
    const result = await executeSwap(
      swapRoute,
      ownerAddress,
      wallet,
      gasFee,
      tokenAddress,
      chatId,
      amountInSol
    );
    return result;
  } catch (error: any) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
}

export default buyToken;