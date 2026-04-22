import { Response, NextFunction } from 'express';
import { Donor } from '../models/Donor.js';
import { AuthRequest } from '../middleware/auth.js';

export const createDonor = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { bloodGroup, location, contactNumber } = req.body;
    
    // Check if user is already a donor
    let donor = await Donor.findOne({ userId: req.user.id });
    if (donor) {
      // Update existing donor info
      donor.bloodGroup = bloodGroup;
      donor.location = location;
      donor.contactNumber = contactNumber;
      await donor.save();
      return res.json({ message: 'Donor info updated', donor });
    }

    donor = new Donor({
      userId: req.user.id,
      bloodGroup,
      location,
      contactNumber,
    });
    
    await donor.save();
    res.status(201).json(donor);
  } catch (err: any) {
    next(err);
  }
};

export const searchDonors = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { bloodGroup, location } = req.query;
    const query: any = { isAvailable: true };
    
    if (bloodGroup) query.bloodGroup = bloodGroup;
    if (location) query.location = { $regex: location, $options: 'i' };

    const donors = await Donor.find(query).populate('userId', 'name email');
    res.json(donors);
  } catch (err: any) {
    next(err);
  }
};
