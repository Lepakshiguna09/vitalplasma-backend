import mongoose from 'mongoose';

const donorSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bloodGroup: { type: String, required: true },
  location: { type: String, required: true },
  contactNumber: { type: String, required: true },
  lastDonationDate: { type: Date },
  isAvailable: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

export const Donor = mongoose.model('Donor', donorSchema);
