import mongoose from 'mongoose';

const requestSchema = new mongoose.Schema({
  hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bloodGroupRequired: { type: String, required: true },
  location: { type: String, required: true },
  unitsRequired: { type: Number, default: 1 },
  status: { type: String, enum: ['pending', 'fulfilled', 'cancelled'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

export const Request = mongoose.model('Request', requestSchema);
