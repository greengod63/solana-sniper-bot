import mongoose, { Schema, Document } from "mongoose";

// Define the interface for the User document
export interface ISwapConfig extends Document {
  token?: String;
  slippage?: Number;
  snipe_fee?: Number;
  snipe_tip?: Number;
  tp?: Number;
  sl?: Number;
  snipe_amount?: Number;
}

const swapConfigSchema = new Schema({
  token: {
    type: String,
  },
  slippage: {
    type: Number,
    default: 50,
  },
  snipe_fee: {
    type: Number,
    default: 0.005,
  },
  snipe_tip: {
    type: Number,
    default: 0.005,
  },
  tp: Number,
  sl: Number,
  snipe_amount: Number,
});

// Function to get or create the model dynamically
const DynamicSwapConfigModel = (collectionName: string) => {
    if (mongoose.models[collectionName]) {
        return mongoose.models[collectionName];
    }
    return mongoose.model<ISwapConfig>(collectionName, swapConfigSchema);
}

export default DynamicSwapConfigModel;
