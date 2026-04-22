import React, { ReactNode } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Heart, Search, FilePlus, User, History, ArrowRight } from 'lucide-react';

export default function Dashboard({ user }: { user: any }) {
  return (
    <div className="max-w-[calc(100vw-80px)] mx-auto py-8">
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
        {/* Sidebar */}
        <aside className="space-y-5">
          <div>
            <h3 className="text-[14px] uppercase tracking-[0.05em] text-slate-muted font-bold mb-4">Urgent Alerts</h3>
            <div className="vibrant-card !p-4 mb-3">
              <div className="flex justify-between items-start mb-2">
                <div className="w-9 h-9 rounded-lg bg-brand-light text-brand flex items-center justify-center font-[800] text-[14px]">O-</div>
                <span className="px-2 py-1 bg-brand-light text-brand-dark rounded-full text-[12px] font-bold">Critical</span>
              </div>
              <div className="font-semibold text-[14px]">City Central Hospital</div>
              <div className="text-[12px] text-slate-muted">3 units needed • 0.8km away</div>
            </div>
            
            <div className="vibrant-card !p-4 border-2 border-dashed border-slate-border bg-transparent shadow-none">
              <p className="text-[12px] text-slate-muted text-center italic">No other urgent alerts</p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-border">
            <h3 className="text-[14px] uppercase tracking-[0.05em] text-slate-muted font-bold mb-3">Activity Hub</h3>
            <div className="text-[13px] border-l-2 border-slate-border pl-4 ml-2">
              <div className="mb-4">
                <div className="font-medium">Recent Login</div>
                <div className="text-slate-muted text-[11px]">Just now • {user.name}</div>
              </div>
              <div>
                <div className="font-medium">System Ready</div>
                <div className="text-slate-muted text-[11px]">Stable • API v1.0</div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="vibrant-card !pt-5 !pb-5 !border-t-4 !border-brand">
              <div className="text-[12px] text-slate-muted font-medium">Available Donors</div>
              <div className="text-[28px] font-[800] mt-1">1,248</div>
              <div className="text-[11px] text-emerald-500 mt-1">↑ 8% from last week</div>
            </div>
            <div className="vibrant-card !pt-5 !pb-5">
              <div className="text-[12px] text-slate-muted font-medium">Active Requests</div>
              <div className="text-[28px] font-[800] mt-1">42</div>
              <div className="text-[11px] text-brand mt-1">5 urgent needed</div>
            </div>
            <div className="vibrant-card !pt-5 !pb-5">
              <div className="text-[12px] text-slate-muted font-medium">Lives Saved</div>
              <div className="text-[28px] font-[800] mt-1">5.2k</div>
              <div className="text-[11px] text-slate-muted mt-1">Total network impact</div>
            </div>
          </div>

          <div className="vibrant-card">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-[700]">Manage Operations</h2>
              <div className="flex gap-2">
                <button className="vibrant-btn vibrant-btn-secondary !py-2 !px-4 text-[13px]">View Reports</button>
                {user.role === 'hospital' && (
                  <Link to="/request" className="vibrant-btn vibrant-btn-primary !py-2 !px-4 text-[13px]">
                    + New Request
                  </Link>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-[#FFF5F5] border-2 border-dashed border-[#FECACA] rounded-2xl p-6 text-center">
                <div className="bg-white w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center text-2xl shadow-sm">🩸</div>
                <h4 className="font-bold mb-2">Donate Blood</h4>
                <p className="text-[13px] text-brand-dark mb-4">Register or update your donor profile to help save lives.</p>
                <Link to="/donate" className="vibrant-btn vibrant-btn-primary w-full justify-center">Donor Registration</Link>
              </div>

              <div className="bg-[#F0F9FF] border-2 border-dashed border-[#BAE6FD] rounded-2xl p-6 text-center">
                <div className="bg-white w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center text-2xl shadow-sm">🔍</div>
                <h4 className="font-bold mb-2">Search Donors</h4>
                <p className="text-[13px] text-[#0C4A6E] mb-4">Search by blood group and location to find matching donors.</p>
                <Link to="/search" className="vibrant-btn vibrant-btn-primary w-full justify-center !bg-[#0284C7]">Open Search Tool</Link>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-slate-border">
              <h4 className="text-[14px] font-bold mb-4">Top Available Donors Near You</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <DonorItem group="A+" name="Emily Watson" dist="0.8km" bg="bg-emerald-100" textColor="text-emerald-700" />
                <DonorItem group="O+" name="David Miller" dist="2.1km" bg="bg-brand-light" textColor="text-brand" />
                <DonorItem group="B-" name="Lisa Ray" dist="1.5km" bg="bg-purple-100" textColor="text-purple-700" />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function DonorItem({ group, name, dist, bg, textColor }: { group: string, name: string, dist: string, bg: string, textColor: string }) {
  return (
    <div className="p-3 border border-slate-border rounded-xl flex items-center gap-3 bg-slate-50/50">
      <div className={`w-11 h-11 rounded-lg ${bg} ${textColor} flex items-center justify-center font-[800] text-lg`}>
        {group}
      </div>
      <div>
        <div className="font-semibold text-[13px]">{name}</div>
        <div className="text-[11px] text-slate-muted">{dist} • Available</div>
      </div>
    </div>
  );
}
