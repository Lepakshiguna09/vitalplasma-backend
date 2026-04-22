import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FilePlus, MapPin, Droplet, Users, Calendar, Loader2, CheckCircle2 } from 'lucide-react';
import axios from 'axios';

export default function RequestBlood() {
  const [bloodGroupRequired, setBloodGroupRequired] = useState('');
  const [location, setLocation] = useState('');
  const [unitsRequired, setUnitsRequired] = useState(1);
  const [loading, setLoading] = useState(false);
  const [requests, setRequests] = useState<any[]>([]);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchMyRequests();
  }, []);

  const fetchMyRequests = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/requests/my', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRequests(response.data);
    } catch (err) {
      console.error('Failed to fetch requests');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const postRequest = async () => {
        const token = localStorage.getItem('token');
        await axios.post('/api/requests', 
          { bloodGroupRequired, location, unitsRequired },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setSuccess(true);
        fetchMyRequests();
        setTimeout(() => setSuccess(false), 3000);
        setBloodGroupRequired('');
        setUnitsRequired(1);
      };
      postRequest();
    } catch (err) {
      console.error('Request failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[calc(100vw-80px)] mx-auto py-10">
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-4xl font-[800] text-slate-text tracking-tight">Blood Requests</h1>
        <p className="text-slate-muted mt-2 text-lg font-medium">Manage and monitor your hospital's blood requirements.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5">
          <div className="vibrant-card shadow-xl !rounded-[24px]">
            <h2 className="text-2xl font-bold text-slate-text mb-8 flex items-center gap-3">
              <FilePlus className="h-6 w-6 text-brand" />
              <span>New Request</span>
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-text mb-2">Blood Group Required</label>
                <div className="relative">
                  <select
                    required
                    value={bloodGroupRequired}
                    onChange={(e) => setBloodGroupRequired(e.target.value)}
                    className="w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-border rounded-xl focus:ring-2 focus:ring-brand/10 focus:border-brand outline-none appearance-none font-semibold"
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
                <label className="block text-sm font-bold text-slate-700 mb-2">Units Required</label>
                <input
                  type="number"
                  min="1"
                  required
                  value={unitsRequired}
                  onChange={(e) => setUnitsRequired(Number(e.target.value))}
                  className="w-full px-4 py-4 bg-slate-50 border border-slate-border rounded-xl focus:ring-2 focus:ring-brand/10 focus:border-brand outline-none font-semibold"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-text mb-2">Location / Hospital Area</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="E.g. Central Hospital, Downtown"
                    className="w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-border rounded-xl focus:ring-2 focus:ring-brand/10 focus:border-brand outline-none font-semibold"
                  />
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="vibrant-btn vibrant-btn-primary w-full justify-center !py-4 text-lg shadow-md"
              >
                {loading ? <Loader2 className="h-7 w-7 animate-spin" /> : <span>Post Request</span>}
              </button>

              <AnimatePresence>
                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-3 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center gap-2 font-bold border border-emerald-100 text-sm"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Request Posted Successfully!</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </div>

        <div className="lg:col-span-7">
          <h2 className="text-2xl font-bold text-slate-text mb-8 flex items-center gap-3">
            <Users className="h-6 w-6 text-brand" />
            <span>My Active Requests</span>
          </h2>

          <div className="space-y-4">
            {requests.length > 0 ? (
              requests.map((request, idx) => (
                <motion.div
                  key={request._id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="vibrant-card !p-5 hover:border-brand hover:shadow-md transition-all flex flex-col md:flex-row md:items-center md:justify-between"
                >
                  <div className="flex items-center gap-4 mb-4 md:mb-0">
                    <div className="w-12 h-12 bg-brand-light text-brand rounded-lg flex items-center justify-center text-[16px] font-[800]">
                      {request.bloodGroupRequired}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-text">{request.unitsRequired} Units Required</h4>
                      <p className="text-slate-muted text-[13px] flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {request.location}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-slate-muted text-[10px] font-bold uppercase tracking-wider mb-1">Status</p>
                      <span className={`px-3 py-0.5 rounded-full text-[11px] font-bold uppercase ${
                        request.status === 'pending' ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'
                      }`}>
                        {request.status}
                      </span>
                    </div>
                    <div className="text-right hidden sm:block">
                      <p className="text-slate-muted text-[10px] font-bold uppercase tracking-wider mb-1">Posted On</p>
                      <p className="text-slate-text text-[13px] font-bold flex items-center justify-end">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(request.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="py-20 text-center opacity-40">
                <FilePlus className="h-16 w-16 mx-auto mb-4 text-slate-200" />
                <p className="text-slate-muted font-bold italic">No active requests found.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
