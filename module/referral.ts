import mongoose, { Schema, Document } from "mongoose";

// Define the interface for the Referral document
export interface IReferral extends Document {
  chat_id: number;
  parent_id?: number;
  rewards_wallet?: string;
  paid_amount?: number;
  tier1_users?: number;
  tier1_volume?: number;
  tier1_earnings?: number;
  tier2_users?: number;
  tier2_volume?: number;
  tier2_earnings?: number;
  tier3_users?: number;
  tier3_volume?: number;
  tier3_earnings?: number;
  tier4_users?: number;
  tier4_volume?: number;
  tier4_earnings?: number;
  tier5_users?: number;
  tier5_volume?: number;
  tier5_earnings?: number;
}

// Define the schema
const ReferralSchema: Schema = new Schema({
  chat_id: { type: Number, required: true, unique: true },
  parent_id: { type: Number },
  rewards_wallet: { type: String },
  paid_amount: { type: Number, default: 0 },
  tier1_users: { type: Number, default: 0 },
  tier1_volume: { type: Number, default: 0 },
  tier1_earnings: { type: Number, default: 0 },
  tier2_users: { type: Number, default: 0 },
  tier2_volume: { type: Number, default: 0 },
  tier2_earnings: { type: Number, default: 0 },
  tier3_users: { type: Number, default: 0 },
  tier3_volume: { type: Number, default: 0 },
  tier3_earnings: { type: Number, default: 0 },
  tier4_users: { type: Number, default: 0 },
  tier4_volume: { type: Number, default: 0 },
  tier4_earnings: { type: Number, default: 0 },
  tier5_users: { type: Number, default: 0 },
  tier5_volume: { type: Number, default: 0 },
  tier5_earnings: { type: Number, default: 0 },
});

// Create the model
const Referral = mongoose.model<IReferral>('referral', ReferralSchema);

export default Referral;