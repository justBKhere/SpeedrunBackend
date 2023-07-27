// src/models/user.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface User extends Document {
    username: string;
    hashedPassword: string;
    uuid: string;
    salt: string;
    privateKey: string;
    mnemonics: string;
    publicKey: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    // Add any other required fields here
}

const userSchema: Schema<User> = new Schema<User>({
    username: { type: String, required: true, unique: true },
    hashedPassword: { type: String, required: true },
    uuid: { type: String, required: true },
    salt: { type: String, required: true },
    privateKey: { type: String, required: true },
    mnemonics: { type: String, required: true },
    publicKey: { type: String, required: true },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
    email: { type: String, required: true },

    // Add any other required fields here
});

const UserModel = mongoose.model<User>('User', userSchema);

export default UserModel;
