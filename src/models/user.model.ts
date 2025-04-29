import mongoose, { Schema, Document, Model } from 'mongoose';
import { User, UserRole, UserDocument } from '../types/user.types';

const UserSchema: Schema<UserDocument> = new Schema<UserDocument>({
  id: { type: String, required: true, unique: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v: string) => /.+@.+\..+/.test(v),
      message: 'Invalid email format',
    },
  },
  passwordHash: { type: String, required: true },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const UserModel: Model<UserDocument> = mongoose.model<UserDocument>('User', UserSchema, 'users'); 