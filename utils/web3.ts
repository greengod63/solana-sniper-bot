import dotenv from "dotenv";
import bs58 from "bs58";
import {
  LAMPORTS_PER_SOL,
  Transaction,
  SystemProgram,
  sendAndConfirmTransaction,
  Keypair,
  Connection,
  PublicKey,
  clusterApiUrl,
  ComputeBudgetProgram,
  TransactionMessage,
  VersionedTransaction,
  TransactionInstruction,
} from "@solana/web3.js";

dotenv.config();

// ✅ Solana Mainnet Connection
const SOLANA_RPC_URL =
  process.env.SOLANA_RPC_URL || "https://api.mainnet-beta.solana.com";
const connection = new Connection(SOLANA_RPC_URL, "confirmed");

export const getSolBalance = async (walletAddress: string) => {
  const balance = await connection.getBalance(new PublicKey(walletAddress));
  console.log("Sol Balance", balance);

  return balance / 1e9;
};

export const getTokenInfo_Decimals_Supply = async (tokenAddress: string) => {
  const tokenInfo = await connection.getParsedAccountInfo(
    new PublicKey(tokenAddress)
  );
  // console.log("tokenInfo------>", JSON.stringify(tokenInfo, null, 2));
  const splData = tokenInfo.value?.data;
  if (splData && "parsed" in splData) {
    const parsed = splData.parsed;
    // console.log("Parsed----->", JSON.stringify(parsed.info, null, 2))
    const decimals = parsed.info.decimals;
    const supply = parsed.info.supply;
    console.log("Parsed----->", decimals, supply);

    return { decimals: decimals, supply: supply };
  }
};

export const tansferSOL = async (
  senderPrivateKeyString: string,
  receiverPublicKeyString: string,
  amount: number
) => {
  const senderSecretKey = bs58.decode(senderPrivateKeyString);
  const sender = Keypair.fromSecretKey(senderSecretKey);

  // Get receiver public key
  const receiverPublicKey = new PublicKey(receiverPublicKeyString);

  try {
    const trasnferInstruction = SystemProgram.transfer({
      fromPubkey: sender.publicKey,
      toPubkey: receiverPublicKey,
      lamports: amount * 1e9,
    });

    const transaction = new Transaction().add(trasnferInstruction);

    const transactionSignature = await sendAndConfirmTransaction(
      connection,
      transaction,
      [sender]
    );

    console.log(
      "Transaction Signature: ",
      `https://solscan.io/tx/${transactionSignature}`
    );
    return { status: "success", tx_hash: transactionSignature };
  } catch (error: any) {
    console.error("❌ Transfer SOL error", error.message);
    return { status: "failed", tx_hash: null };
  }
};

export const getTokenPrice = async (tokenAddressArray: string[]) => {
  const mergedMintAddresses = tokenAddressArray.join(",");
  const solAddress = "So11111111111111111111111111111111111111112";
  const priceResponseShowExtraInfo = await fetch(
    `https://api.jup.ag/price/v2?ids=${solAddress},${mergedMintAddresses}`
  );
  // const priceResponseShowExtraInfo = await fetch(`https://api.jup.ag/price/v2?ids=${mergedMintAddresses}&showExtraInfo=true`);
  const priceDataShowExtraInfo = await priceResponseShowExtraInfo.json();
  return priceDataShowExtraInfo;
};
