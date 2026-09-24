'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Lock, Mail, Building2, ArrowRight, ShieldCheck } from 'lucide-react';
import Button from '../../../components/Button';
import useAuthStore from '../../../store/useAuthStore';
import { useToast } from '../../../providers/ToastProvider';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const { showToast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(email, password);
      showToast('Authentication successful. Redirecting to portal...', 'success');
      router.push('/dashboard');
    } catch (err) {
      showToast(err.message || 'Authentication failed. Please verify credentials.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col justify-between p-4 sm:p-6 text-slate-900">
      {/* Top Portal Banner */}
      <header className="max-w-md mx-auto w-full pt-6 flex items-center justify-center gap-2 text-xs text-slate-500 font-mono">
        <ShieldCheck className="w-4 h-4 text-slate-700" />
        <span>SECURE PROCUREMENT INTELLIGENCE GATEWAY</span>
      </header>

      {/* Main Login Card */}
      <div className="w-full max-w-md mx-auto my-auto">
        <div className="bg-white border border-slate-300 rounded-md shadow-xs p-6 sm:p-8 space-y-6">
          {/* Official Emblem & Title */}
          <div className="text-center space-y-2 pb-4 border-b border-slate-200">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded bg-[#0f243a] text-white border border-[#1b3f66] mb-1">
              <Building2 className="h-5 w-5" />
            </div>
            <h1 className="text-lg font-bold text-slate-900 tracking-tight">
              Tender & RFP Intelligence Portal
            </h1>
            <p className="text-xs text-slate-500">
              Authorized Personnel Login • Enterprise Access
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Official Work Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="name@agency.gov"
                  className="portal-input pl-8 w-full"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-[11px] font-semibold text-slate-700 uppercase tracking-wider">
                  Access Password
                </label>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="portal-input pl-8 w-full"
                />
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              variant="primary"
              isLoading={isLoading}
              className="w-full"
              icon={ArrowRight}
            >
              Sign In to Procurement Portal
            </Button>
          </form>

          <div className="pt-4 border-t border-slate-200 text-center text-xs text-slate-500">
            Need portal access?{' '}
            <Link href="/register" className="text-blue-700 font-semibold hover:underline">
              Register authorized account
            </Link>
          </div>
        </div>
      </div>

      {/* Institutional Legal Footer */}
      <footer className="max-w-md mx-auto w-full text-center text-[10px] text-slate-500 font-mono pb-4">
        <span>SECURITY PROTOCOL: FAR 52.204 • UNAUTHORIZED ACCESS PROHIBITED</span>
      </footer>
    </div>
  );
}
