import mongoose, { Schema, Document } from 'mongoose';

// Define the interface for the Tier structure
interface ITier {
  users: number;
  volume: number;
  earnings: number;
}

// Define the interface for the Referral document
interface IReferral extends Document {
  chat_id: number;
  parent_id?: number;
  rewards_wallet?: string;
  paid_amount?: number;
  tier1: ITier;
  tier2: ITier;
  tier3: ITier;
  tier4: ITier;
  tier5: ITier;
}

// Define the schema for the Tier structure
const TierSchema: Schema = new Schema({
  users: { type: Number, default: 0 },
  volume: { type: Number, default: 0 },
  earnings: { type: Number, default: 0 },
});

// Define the schema for the Referral document
const ReferralSchema: Schema = new Schema({
  chat_id: { type: Number, required: true, unique: true },
  parent_id: { type: Number },
  rewards_wallet: { type: String },
  paid_amount: { type: Number, default: 0 },
  tier1: { type: TierSchema, default: () => ({}) },
  tier2: { type: TierSchema, default: () => ({}) },
  tier3: { type: TierSchema, default: () => ({}) },
  tier4: { type: TierSchema, default: () => ({}) },
  tier5: { type: TierSchema, default: () => ({}) },
});

// Create the model
const ReferralModel = mongoose.model<IReferral>('Referral', ReferralSchema);

export default ReferralModel;