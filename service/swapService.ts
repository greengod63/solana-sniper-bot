import Swap, { ISwap } from "../module/swap";
import { Keypair } from "@solana/web3.js";
import bs58 from "bs58";

/**
 * Add a new swap.
 * @param swapData - The swap data to add.
 */
export async function addSwap(
  swapData: Partial<ISwap>,
  chatId: number
): Promise<ISwap> {
  try {
    const newSwap = new Swap({
        ...swapData,
        chat_id: chatId,
        type: "manual",
        status: "snipping",
      });
    await newSwap.save();
    return newSwap;
  } catch (error) {
    console.error("Error adding swap:", error);
    throw error;
  }
}

/**
 * Get a swap by chat ID.
 * @param chat_id - The chat ID to search for.
 */
export async function getSwapByChatId(chat_id: number): Promise<ISwap | null> {
  try {
    const swap = await Swap.findOne({ chat_id });
    return swap;
  } catch (error) {
    console.error("Error fetching swap:", error);
    throw error;
  }
}

/**
 * Update a swap's data.
 * @param chat_id - The chat ID to update.
 * @param updates - The updates to apply.
 */
export async function updateSwap(
  chat_id: number,
  updates: Partial<Omit<ISwap, "chat_id">>
): Promise<ISwap | null> {
  try {
    const swap = await Swap.findOneAndUpdate({ chat_id }, updates, {
      new: true,
    });
    return swap;
  } catch (error) {
    console.error("Error updating swap:", error);
    throw error;
  }
}

/**
 * Delete a swap by chat ID.
 * @param chat_id - The chat ID to delete.
 */
export async function deleteSwap(chat_id: number): Promise<ISwap | null> {
  try {
    const swap = await Swap.findOneAndDelete({ chat_id });
    return swap;
  } catch (error) {
    console.error("Error deleting swap:", error);
    throw error;
  }
}

/**
 * Get all swaps.
 */
export async function getAllSwaps(): Promise<ISwap[]> {
  try {
    const swaps = await Swap.find({});
    return swaps;
  } catch (error) {
    console.error("Error fetching all swaps:", error);
    throw error;
  }
}

/**
 * Get swaps by status.
 * @param status - The status to filter by (e.g., "snipping", "success", "failure").
 */
export async function getSwapsByStatus(status: string): Promise<ISwap[]> {
  try {
    const swaps = await Swap.find({ status });
    return swaps;
  } catch (error) {
    console.error("Error fetching swaps by status:", error);
    throw error;
  }
}
