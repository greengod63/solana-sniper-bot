import mongoose, { Schema, Document } from "mongoose";

// Define the interface for the User document
export interface ISwap extends Document {
  userid: number;
  token: string;
  slippage: number;
  snipe_fee: number;
  snipe_tip: number;
  tp: number;
  sl: number;
  snipe_amount: number;
  type: String; // "manual" | "auto";
  status: String; // "snipping" | "success" | "failure";
}

const swapSchema = new Schema({
  userid: {
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
});

const Swap = mongoose.model<ISwap>("swap", swapSchema);

export default Swap;
