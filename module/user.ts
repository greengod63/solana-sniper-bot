import mongoose, {Schema, Document} from "mongoose";

// Define the interface for the User document
export interface IUser extends Document {
    chat_id: number;
    username?: string;
    first_name?: string;
    last_name?: string;
    public_key: string;
    private_key: string;
}

const userSchema = new Schema({
    chat_id: {
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
});

const User = mongoose.model<IUser>('user', userSchema);

export default User;