import Referral, { IReferral, ITier } from "../module/referral";


/**
 * Add a new referral record and update tier data for parent and ancestors.
 * @param chat_id - The chat ID of the new referral.
 * @param parent_id - The chat ID of the parent referral (optional).
 * @param rewards_wallet - The rewards wallet address (optional).
 */
export async function addReferral(
  chat_id: number,
  parent_id?: number,
  rewards_wallet?: string
): Promise<IReferral> {
  try {
    // Create the new referral
    const newReferral = new Referral({
      chat_id,
      parent_id,
      rewards_wallet,
    });
    await newReferral.save();

    // Update tier data for parent and ancestors
    let tmpUserId = parent_id;
    let idx = 0;
    while (tmpUserId && idx < 5) {
      const parentReferral = await Referral.findOne({
        chat_id: tmpUserId,
      });
      if (parentReferral && parentReferral.chat_id !== chat_id) {
        const tier = `tier${idx + 1}` as keyof IReferral; // e.g., "tier1", "tier2", etc.
        await incrementTierData(tmpUserId, tier, "users", 1);
        tmpUserId = parentReferral.parent_id;
        idx++;
      } else {
        break;
      }
    }

    return newReferral;
  } catch (error) {
    console.error("Error adding referral:", error);
    throw error;
  }
}

/**
 * Get referral data by chat ID.
 * @param chat_id - The chat ID of the referral.
 */
export async function getReferralByChatId(
  chat_id: number
): Promise<IReferral | null> {
  try {
    const referral = await Referral.findOne({ chat_id });
    return referral;
  } catch (error) {
    console.error("Error fetching referral data:", error);
    throw error;
  }
}

/**
 * Update tier data for a specific referral.
 * @param chat_id - The chat ID of the referral.
 * @param tier - The tier to update (e.g., "tier1").
 * @param updates - The updates to apply (users, volume, earnings).
 */
export async function updateTierData(
  chat_id: number,
  tier: keyof IReferral,
  updates: Partial<ITier>
): Promise<IReferral | null> {
  try {
    const referral = await Referral.findOneAndUpdate(
      { chat_id },
      { $set: { [`${tier}`]: updates } },
      { new: true }
    );
    return referral;
  } catch (error) {
    console.error("Error updating tier data:", error);
    throw error;
  }
}

/**
 * Increment a specific field in a tier.
 * @param chat_id - The chat ID of the referral.
 * @param tier - The tier to update (e.g., "tier1").
 * @param field - The field to increment (e.g., "users", "volume", "earnings").
 * @param value - The value to increment by.
 */
export async function incrementTierData(
  chat_id: number,
  tier: keyof IReferral,
  field: keyof ITier,
  value: number
): Promise<IReferral | null> {
  try {
    const referral = await Referral.findOneAndUpdate(
      { chat_id },
      { $inc: { [`${tier}.${field}`]: value } },
      { new: true }
    );
    return referral;
  } catch (error) {
    console.error("Error incrementing tier data:", error);
    throw error;
  }
}

/**
 * Calculate unpaid amount for a referral.
 * @param chat_id - The chat ID of the referral.
 */
export async function getUnpaidAmount(chat_id: number): Promise<number> {
  try {
    const referral = await Referral.findOne({ chat_id });
    if (!referral) throw new Error("Referral not found");

    const unpaidAmount =
      referral.tier1.earnings +
      referral.tier2.earnings +
      referral.tier3.earnings +
      referral.tier4.earnings +
      referral.tier5.earnings;

    return unpaidAmount;
  } catch (error) {
    console.error("Error calculating unpaid amount:", error);
    throw error;
  }
}

/**
 * Update paid amount and reset tier earnings.
 * @param chat_id - The chat ID of the referral.
 * @param payment_amount - The amount to add to paid_amount.
 */
export async function updatePaymentAndResetTiers(
  chat_id: number,
  payment_amount: number
): Promise<IReferral | null> {
  try {
    const referral = await Referral.findOneAndUpdate(
      { chat_id },
      {
        $inc: { paid_amount: payment_amount },
        $set: {
          "tier1.earnings": 0,
          "tier2.earnings": 0,
          "tier3.earnings": 0,
          "tier4.earnings": 0,
          "tier5.earnings": 0,
        },
      },
      { new: true }
    );
    return referral;
  } catch (error) {
    console.error("Error updating payment and resetting tiers:", error);
    throw error;
  }
}

/**
 * Delete a referral record.
 * @param chat_id - The chat ID of the referral.
 */
export async function deleteReferral(
  chat_id: number
): Promise<IReferral | null> {
  try {
    const referral = await Referral.findOneAndDelete({ chat_id });
    return referral;
  } catch (error) {
    console.error("Error deleting referral:", error);
    throw error;
  }
}
