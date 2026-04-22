import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Droplet, MapPin, Phone, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import axios from 'axios';

export default function Donate() {
  const [bloodGroup, setBloodGroup] = useState('');
  const [location, setLocation] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    const submitData = async () => {
      try {
        const token = localStorage.getItem('token');
        await axios.post('/api/donors', { bloodGroup, location, contactNumber }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSuccess(true);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to register as donor.');
      } finally {
        setLoading(false);
      }
    };
    submitData();
  };

  if (success) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="vibrant-card !p-12 shadow-xl !rounded-[32px] text-center"
        >
          <div className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="h-14 w-14" />
          </div>
          <h2 className="text-4xl font-[800] text-slate-text mb-4">You're a Hero!</h2>
          <p className="text-xl text-slate-muted mb-10 leading-relaxed">
            Your donor profile has been successfully updated. Hospitals and people in need can now reach out to you.
          </p>
          <button
            onClick={() => setSuccess(false)}
            className="vibrant-btn vibrant-btn-primary px-10 py-4 text-lg mx-auto shadow-md"
          >
            Update Profile
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-[calc(100vw-80px)] mx-auto py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-5xl font-[800] text-slate-text leading-tight">Become a <span className="text-brand">Donor</span></h1>
          <p className="text-2xl text-slate-muted mt-4 leading-relaxed">
            Register your details to let hospitals and patients find you in emergencies.
          </p>
          
          <div className="mt-12 space-y-10">
            <FeatureItem
              icon={<Droplet className="h-6 w-6" />}
              title="Simple Process"
              desc="Just enter your blood group and location. We handle the rest."
            />
            <FeatureItem
              icon={<CheckCircle2 className="h-6 w-6" />}
              title="Stay in Control"
              desc="You choose when you're available for donation."
            />
            <FeatureItem
              icon={<MapPin className="h-6 w-6" />}
              title="Local Impact"
              desc="Help people in your immediate community and city."
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="vibrant-card !p-10 shadow-2xl !rounded-[24px]"
        >
          <h2 className="text-2xl font-bold text-slate-text mb-8">Donor Registration</h2>

          {error && (
            <div className="mb-8 p-4 bg-brand-light border border-brand/10 text-brand-dark rounded-xl flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              <span className="text-sm font-bold">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-text mb-2">Blood Group</label>
              <div className="relative">
                <select
                  required
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value)}
                  className="w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-border rounded-xl focus:ring-2 focus:ring-brand/10 focus:border-brand outline-none transition-all appearance-none font-semibold"
                >
                  <option value="">Select Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
                <Droplet className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-brand" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-text mb-2">Location / City</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="E.g. New York, Brooklyn"
                  className="w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-border rounded-xl focus:ring-2 focus:ring-brand/10 focus:border-brand outline-none transition-all font-semibold"
                />
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-text mb-2">Contact Number</label>
              <div className="relative">
                <input
                  type="tel"
                  required
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-border rounded-xl focus:ring-2 focus:ring-brand/10 focus:border-brand outline-none transition-all font-semibold"
                />
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="vibrant-btn vibrant-btn-primary w-full justify-center !py-4 text-lg shadow-md mt-6"
            >
              {loading ? <Loader2 className="h-7 w-7 animate-spin" /> : <span>Register as Donor</span>}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

function FeatureItem({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="flex space-x-6">
      <div className="w-12 h-12 bg-white rounded-xl shadow-card border border-slate-border flex items-center justify-center text-brand flex-shrink-0">
        {icon}
      </div>
      <div>
        <h4 className="text-xl font-[800] text-slate-text">{title}</h4>
        <p className="text-slate-muted mt-1 font-medium">{desc}</p>
      </div>
    </div>
  );
}
