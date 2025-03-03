import User, { IUser } from "../module/user";
import { Keypair } from "@solana/web3.js";
import bs58 from "bs58";

export async function createUser(userData: Partial<IUser>): Promise<IUser> {
    console.log(userData);

    const private_key = bs58.encode(Keypair.generate().secretKey);
    const public_key = Keypair.fromSecretKey(bs58.decode(private_key)).publicKey.toBase58();

    console.log("Keypair: ", private_key, public_key);

    const user = new User({
        ...userData,
        private_key: private_key,
        public_key: public_key
    });
    return await user.save();
}

export async function hasUser(userid: Number): Promise<IUser | null> {
    const user = await User.findOne({userid: userid});
    if(user){
        return user;
    }
    else {
        return null;
    }
}