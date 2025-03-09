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
