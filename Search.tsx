import React, { useState, ReactNode } from 'react';
import { motion } from 'motion/react';
import { Search as SearchIcon, MapPin, Droplet, Phone, Mail, Loader2, Info } from 'lucide-react';
import axios from 'axios';

export default function Search() {
  const [bloodGroup, setBloodGroup] = useState('');
  const [location, setLocation] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSearched(true);

    try {
      const fetchResults = async () => {
        const response = await axios.get(`/api/donors/search`, {
          params: { bloodGroup, location }
        });
        setResults(response.data);
      };
      fetchResults();
    } catch (err) {
      console.error('Search failed', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[calc(100vw-80px)] mx-auto py-10">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-[800] text-slate-text tracking-tight">Find Donors</h1>
        <p className="text-slate-muted mt-2 text-lg">Search our network of life-savers near you.</p>
      </div>

      <div className="vibrant-card mb-10 !bg-slate-50/50">
        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-bold text-slate-text mb-2 px-1">Blood Group</label>
            <div className="relative">
              <select
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-border rounded-xl focus:ring-2 focus:ring-brand/10 focus:border-brand outline-none transition-all appearance-none font-semibold text-[15px]"
              >
                <option value="">Any Blood Group</option>
                {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(group => (
                  <option key={group} value={group}>{group}</option>
                ))}
              </select>
              <Droplet className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-brand" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-text mb-2 px-1">Location</label>
            <div className="relative">
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City or Area"
                className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-border rounded-xl focus:ring-2 focus:ring-brand/10 focus:border-brand outline-none transition-all font-semibold text-[15px]"
              />
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            </div>
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              disabled={loading}
              className="vibrant-btn vibrant-btn-primary w-full justify-center !py-3.5 text-lg shadow-md"
            >
              {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : (
                <>
                  <SearchIcon className="h-5 w-5" />
                  <span>Search Now</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      <div className="space-y-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 opacity-50">
            <Loader2 className="h-12 w-12 animate-spin text-brand mb-4" />
            <p className="text-slate-muted font-bold">Scanning donor database...</p>
          </div>
        ) : searched ? (
          results.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((donor, idx) => (
                <motion.div
                  key={donor._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="vibrant-card border-slate-border hover:border-brand hover:shadow-lg transition-all group"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-brand-light text-brand flex items-center justify-center text-2xl font-[800] shadow-sm transform group-hover:scale-110 transition-transform">
                      {donor.bloodGroup}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-text capitalize">{donor.userId.name}</h3>
                      <p className="text-slate-muted flex items-center text-[12px] font-medium">
                        <MapPin className="h-3 w-3 mr-1" />
                        {donor.location}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-8 pt-4 border-t border-slate-border">
                    <ContactItem icon={<Phone className="h-4 w-4" />} text={donor.contactNumber} />
                    <ContactItem icon={<Mail className="h-4 w-4" />} text={donor.userId.email} />
                  </div>

                  <button className="vibrant-btn vibrant-btn-secondary w-full justify-center group-hover:bg-brand group-hover:text-white">
                    Contact Donor
                  </button>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-16 text-center border-2 border-dashed border-slate-border">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mx-auto mb-6 shadow-sm">
                <SearchIcon className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-[800] text-slate-text mb-2">No Donors Found</h3>
              <p className="text-slate-muted max-w-sm mx-auto">Try adjusting your filters or location to find available donors in other areas.</p>
            </div>
          )
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-slate-border">
            <Info className="h-12 w-12 text-slate-200 mb-4" />
            <p className="text-slate-muted font-medium italic">Use the filters above to search for life-saving donors.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function ContactItem({ icon, text }: { icon: ReactNode, text: string }) {
  return (
    <div className="flex items-center space-x-3 text-slate-600 bg-slate-50 px-4 py-2 rounded-xl text-sm font-medium border border-slate-100">
      <div className="text-slate-400">{icon}</div>
      <span className="truncate">{text}</span>
    </div>
  );
}
