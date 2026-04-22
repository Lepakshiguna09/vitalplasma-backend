import { Link } from 'react-router-dom';
import { Droplet, User, LogOut, LayoutDashboard } from 'lucide-react';

export default function Navbar({ user, onLogout }: { user: any, onLogout: () => void }) {
  return (
    <nav className="h-[72px] bg-white border-b border-slate-border sticky top-0 z-50 flex items-center">
      <div className="max-w-[calc(100vw-80px)] w-full mx-auto px-4 md:px-0">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-8">
            <Link to="/" className="text-2xl font-[800] text-brand tracking-[-0.5px]">
              VitalPlasma
            </Link>
            
            {user && (
              <div className="hidden md:flex gap-8 font-medium text-[14px]">
                <Link to="/dashboard" className="text-brand">Dashboard</Link>
                <Link to="/search" className="text-slate-text hover:text-brand transition-colors">Find Donors</Link>
                <Link to="/request" className="text-slate-text hover:text-brand transition-colors">Blood Requests</Link>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <div className="text-[14px] font-semibold">{user.name}</div>
                  <div className="text-[12px] color-slate-muted capitalize">{user.role}</div>
                </div>
                <div className="w-10 h-10 rounded-full bg-slate-border border-2 border-brand-light flex items-center justify-center font-bold text-brand uppercase">
                  {user.name.substring(0, 2)}
                </div>
                <button
                  onClick={onLogout}
                  className="p-2 text-slate-muted hover:text-brand transition-colors cursor-pointer"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4 font-medium text-[14px]">
                <Link to="/login" className="text-slate-text hover:text-brand transition-colors">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-brand text-white px-6 py-3 rounded-xl font-semibold shadow-sm hover:opacity-90 active:scale-95 transition-all"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
