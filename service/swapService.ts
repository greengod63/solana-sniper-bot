import Swap, { ISwap } from "../module/swap";
import { Keypair } from "@solana/web3.js";
import bs58 from "bs58";

export async function createSwap(swapData: Partial<ISwap>, chatId: number, ): Promise<ISwap> {
    console.log(swapData);

    const swap = new Swap({
        ...swapData,
        userid: chatId,
        type: "manual",
        status: "snipping"
    });
    return await swap.save();
}

export async function hasSwap(swapid: Number): Promise<ISwap | null> {
    const swap = await Swap.findOne({swapid: swapid});
    if(swap){
        return swap;
    }
    else {
        return null;
    }
}