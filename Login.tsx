import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Mail, Lock, Loader2, AlertCircle } from 'lucide-react';
import axios from 'axios';

export default function Login({ onLogin }: { onLogin: (userData: any) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const loginUser = async () => {
      try {
        const response = await axios.post('/api/auth/login', { email, password });
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        onLogin(user);
        navigate('/dashboard');
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to login. Please check your credentials.');
      } finally {
        setLoading(false);
      }
    };
    loginUser();
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
            <h2 className="text-3xl font-[800] text-slate-text tracking-tight">Welcome Back</h2>
            <p className="text-slate-muted mt-2 font-medium">Log into your VitalPlasma account</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-brand-light border border-brand/10 text-brand-dark rounded-xl flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              <span className="text-sm font-bold">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-text mb-2">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-border rounded-xl focus:ring-2 focus:ring-brand/10 focus:border-brand outline-none transition-all font-medium"
                  placeholder="name@example.com"
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-muted" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-text mb-2">Password</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-border rounded-xl focus:ring-2 focus:ring-brand/10 focus:border-brand outline-none transition-all font-medium"
                  placeholder="••••••••"
                />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-muted" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="vibrant-btn vibrant-btn-primary w-full justify-center !py-4 text-lg shadow-md"
            >
              {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : <span>Login</span>}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-border text-center">
            <p className="text-slate-muted text-sm font-medium">
              Don't have an account?{' '}
              <Link to="/register" className="text-brand font-bold hover:underline">
                Create one
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
