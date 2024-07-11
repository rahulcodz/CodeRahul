import { Schema, model, Document } from 'mongoose';

interface IUser extends Document {
    username: string;
    email: string;
    age?: number;
}

const userSchema = new Schema<IUser>({
    username: { type: String, required: true },
    email: { type: String, required: true },
    age: Number, // Optional field
});

const UserModel = model<IUser>('User', userSchema);
export default UserModel;
