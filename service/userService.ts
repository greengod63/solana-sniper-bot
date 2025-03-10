import User, { IUser } from "../module/user";
import { Keypair } from "@solana/web3.js";
import bs58 from "bs58";

/**
 * Add a new user.
 * @param userData - The user data to add.
 */
export async function addUser(userData: Partial<IUser>): Promise<IUser> {
  try {
    const private_key = bs58.encode(Keypair.generate().secretKey);
    const public_key = Keypair.fromSecretKey(
      bs58.decode(private_key)
    ).publicKey.toBase58();

    const newUser = new User({
      ...userData,
      private_key: private_key,
      public_key: public_key,
    });
    await newUser.save();
    return newUser;
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
}

/**
 * Get a user by chat_id.
 * @param chat_id - The user ID to search for.
 */
export async function getUserById(chat_id: number): Promise<IUser | null> {
  try {
    const user = await User.findOne({ chat_id });
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}

/**
 * Update a user's data.
 * @param chat_id - The user ID to update.
 * @param updates - The updates to apply.
 */
export async function updateUser(
  chat_id: number,
  updates: Partial<Omit<IUser, "chat_id" | "public_key" | "private_key">>
): Promise<IUser | null> {
  try {
    const user = await User.findOneAndUpdate({ chat_id }, updates, {
      new: true,
    });
    return user;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
}

/**
 * Delete a user by chat_id.
 * @param chat_id - The user ID to delete.
 */
export async function deleteUser(chat_id: number): Promise<IUser | null> {
  try {
    const user = await User.findOneAndDelete({ chat_id });
    return user;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
}

/**
 * Get all users.
 */
export async function getAllUsers(): Promise<IUser[]> {
  try {
    const users = await User.find({});
    return users;
  } catch (error) {
    console.error("Error fetching all users:", error);
    throw error;
  }
}
