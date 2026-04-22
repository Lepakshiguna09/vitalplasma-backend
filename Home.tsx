import { motion } from 'motion/react';
import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Search, Shield, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="bg-bg-main">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-[calc(100vw-80px)] mx-auto relative z-10 px-4 md:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl lg:text-7xl font-[800] text-slate-text leading-[0.95] tracking-tight">
                Every Drop <br />
                <span className="text-brand">Saves a Life.</span>
              </h1>
              <p className="mt-8 text-lg text-slate-muted max-w-lg leading-relaxed">
                A modern blood donation network connecting donors with hospitals instantly. Join VitalPlasma and make an impact.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  to="/register"
                  className="vibrant-btn vibrant-btn-primary !px-10 !py-4 text-lg"
                >
                  Get Started
                </Link>
                <Link
                  to="/search"
                  className="vibrant-btn bg-white border border-slate-border text-slate-text hover:border-brand hover:text-brand !px-10 !py-4 text-lg shadow-sm"
                >
                  <Search className="h-5 w-5" />
                  <span>Find Donors</span>
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative hidden lg:block"
            >
              <img
                src="https://picsum.photos/seed/vitalplasma/800/600"
                alt="Healthcare Professionals"
                className="rounded-[24px] shadow-card relative z-10 border border-slate-border"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-brand-light rounded-2xl -z-0" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-white border-y border-slate-border">
        <div className="max-w-[calc(100vw-80px)] mx-auto px-4 md:px-0">
          <div className="mb-16">
            <h2 className="text-[14px] uppercase tracking-[0.1em] text-brand font-bold mb-2">Why VitalPlasma</h2>
            <p className="text-4xl font-[800] text-slate-text">Simple. Secure. Life-Saving.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Heart className="h-8 w-8 text-brand" />}
              title="Easy Donation"
              description="Register as a donor in minutes. Manage your history and availability status anytime."
            />
            <FeatureCard
              icon={<Search className="h-8 w-8 text-brand" />}
              title="Instant Search"
              description="Quickly find donors matching specific blood group and location requirements."
            />
            <FeatureCard
              icon={<Shield className="h-8 w-8 text-brand" />}
              title="Verified Network"
              description="Securely connect with verified medical facilities and accredited hospitals."
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: ReactNode, title: string, description: string }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="vibrant-card !p-8 group"
    >
      <div className="w-16 h-16 bg-brand-light rounded-xl flex items-center justify-center mb-6 shadow-sm">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-text mb-4">{title}</h3>
      <p className="text-slate-muted leading-relaxed text-[15px]">{description}</p>
    </motion.div>
  );
}
