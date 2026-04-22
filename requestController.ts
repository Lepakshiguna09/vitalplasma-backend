import { Response, NextFunction } from 'express';
import { Request as BloodRequest } from '../models/Request.js';
import { Donor } from '../models/Donor.js';
import { AuthRequest } from '../middleware/auth.js';

export const createRequest = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { bloodGroupRequired, location, unitsRequired } = req.body;
    
    const newRequest = new BloodRequest({
      hospitalId: req.user.id,
      bloodGroupRequired,
      location,
      unitsRequired,
    });
    
    await newRequest.save();
    res.status(201).json(newRequest);
  } catch (err: any) {
    next(err);
  }
};

export const matchDonors = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const request = await BloodRequest.findById(id);
    
    if (!request) return res.status(404).json({ message: 'Request not found' });

    const donors = await Donor.find({
      bloodGroup: request.bloodGroupRequired,
      location: { $regex: request.location, $options: 'i' },
      isAvailable: true
    }).populate('userId', 'name email');

    res.json({ request, matchingDonors: donors });
  } catch (err: any) {
    next(err);
  }
};

export const getMyRequests = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const requests = await BloodRequest.find({ hospitalId: req.user.id }).sort({ createdAt: -1 });
    res.json(requests);
  } catch (err: any) {
    next(err);
  }
};
