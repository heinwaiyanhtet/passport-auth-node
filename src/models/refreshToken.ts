import mongoose, { Document, Schema, model } from 'mongoose';

interface RefreshTokenDocument extends Document {
  token: string;
  userId: mongoose.Types.ObjectId;
  expiryDate: Date;
}

const refreshTokenSchema = new Schema<RefreshTokenDocument>({
  token: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  expiryDate: { type: Date, required: true },
});

export const RefreshToken = model('RefreshToken', refreshTokenSchema);
