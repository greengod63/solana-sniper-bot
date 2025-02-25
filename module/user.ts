import mongoose, {Schema, Document} from "mongoose";

// Define the interface for the User document
export interface IUser extends Document {
    userid: number;
    username?: string;
    first_name?: string;
    last_name?: string;
    public_key: string;
    private_key: string;
    swap: {
        auto: boolean;
        amount_sol: number;
        tip_sol: number;
        slippage: number;
    };
}

const userSchema = new Schema({
    userid: {
        type: Number,
        required: true,
        unique: true
    },
    username: String,
    first_name: String,
    last_name: String,
    public_key: {
        type: String,
        required: true
    },
    private_key: {
        type: String,
        required: true
    },
    swap: {
        auto: {
            type: Boolean,
            default: false
        },
        amount_sol: {
            type: Number,
            default: 0.000001
        },
        tip_sol: {
            type: Number,
            default: 0.0001
        },
        slippage: {
            type: Number,
            default: 100
        }
    }
});

const User = mongoose.model<IUser>('user', userSchema);

export default User;