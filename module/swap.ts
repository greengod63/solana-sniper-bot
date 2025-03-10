import mongoose, { Schema, Document } from "mongoose";

// Define the interface for the User document
export interface ISwap extends Document {
  chat_id: number;
  token: string;
  slippage: number;
  snipe_fee: number;
  snipe_tip: number;
  tp: number;
  sl: number;
  snipe_amount: number;
  type: String; // "manual" | "auto";
  status: String; // "snipping" | "success" | "failure";
  swap_time: number;
}

const swapSchema = new Schema({
  chat_id: {
    type: Number,
    required: true,
  },
  token: String,
  slippage: Number,
  snipe_fee: Number,
  snipe_tip: Number,
  tp: Number,
  sl: Number,
  snipe_amount: Number,
  type: String,
  status: String,
  swap_time: Number
});

const Swap = mongoose.model<ISwap>("swap", swapSchema);

export default Swap;
