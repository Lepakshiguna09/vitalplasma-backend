import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Mail, Lock, User, Briefcase, Loader2, AlertCircle } from 'lucide-react';
import axios from 'axios';

export default function Register({ onLogin }: { onLogin: (userData: any) => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('donor');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const registerUser = async () => {
      try {
        const response = await axios.post('/api/auth/register', { name, email, password, role });
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        onLogin(user);
        navigate('/dashboard');
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to register. Please check your details.');
      } finally {
        setLoading(false);
      }
    };
    registerUser();
  };

  return (
    <div className="min-h-[calc(100vh-72px)] flex items-center justify-center p-4 bg-bg-main">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="vibrant-card !p-8 shadow-xl !rounded-[24px]">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-[800] text-slate-text tracking-tight">Create Account</h2>
            <p className="text-slate-muted mt-2 font-medium">Join VitalPlasma and help save lives</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-brand-light border border-brand/10 text-brand-dark rounded-xl flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              <span className="text-sm font-bold">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-text mb-1">Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-border rounded-xl focus:ring-2 focus:ring-brand/10 focus:border-brand outline-none transition-all font-medium"
                  placeholder="John Doe"
                />
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-muted" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-text mb-1">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-border rounded-xl focus:ring-2 focus:ring-brand/10 focus:border-brand outline-none transition-all font-medium"
                  placeholder="name@example.com"
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-muted" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-text mb-1">Password</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-border rounded-xl focus:ring-2 focus:ring-brand/10 focus:border-brand outline-none transition-all font-medium"
                  placeholder="••••••••"
                />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-muted" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-text mb-1">Account Type</label>
              <div className="relative">
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-border rounded-xl focus:ring-2 focus:ring-brand/10 focus:border-brand outline-none transition-all appearance-none font-medium"
                >
                  <option value="donor">Individual / Donor</option>
                  <option value="hospital">Hospital / Organization</option>
                </select>
                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-muted" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="vibrant-btn vibrant-btn-primary w-full justify-center !py-4 text-lg mt-4 shadow-md"
            >
              {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : <span>Create Account</span>}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-border text-center">
            <p className="text-slate-muted text-sm font-medium">
              Already have an account?{' '}
              <Link to="/login" className="text-brand font-bold hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
