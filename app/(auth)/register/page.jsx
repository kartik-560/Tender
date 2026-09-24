'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Lock, Mail, User, Briefcase, Building2, ArrowRight } from 'lucide-react';
import Button from '../../../components/Button';
import useAuthStore from '../../../store/useAuthStore';
import { useToast } from '../../../providers/ToastProvider';

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const { showToast } = useToast();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Bid Manager');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Registration failed');

      if (data.token && data.user) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
      }

      showToast('Authorized account created successfully.', 'success');
      router.push('/dashboard');
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col justify-between p-4 sm:p-6 text-slate-900">
      <div className="w-full max-w-md mx-auto my-auto">
        <div className="bg-white border border-slate-300 rounded-md shadow-xs p-6 sm:p-8 space-y-6">
          <div className="text-center space-y-2 pb-4 border-b border-slate-200">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded bg-[#0f243a] text-white border border-[#1b3f66] mb-1">
              <Building2 className="h-5 w-5" />
            </div>
            <h1 className="text-lg font-bold text-slate-900 tracking-tight">
              Create Enterprise Account
            </h1>
            <p className="text-xs text-slate-500">
              Procurement Officer & Bid Reviewer Registration
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Full Legal Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Elena Rostova"
                  className="portal-input pl-8 w-full"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Official Agency Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="elena.rostova@agency.gov"
                  className="portal-input pl-8 w-full"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Password
              </label>
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

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Organizational Role
              </label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="portal-input pl-8 w-full"
                >
                  <option value="Bid Manager">Senior Bid Director / Proposal Lead</option>
                  <option value="Technical Architect">Technical Solutions Architect</option>
                  <option value="Legal & Compliance Officer">Legal & Regulatory Compliance Officer</option>
                  <option value="Executive Evaluator">Procurement Board Evaluator</option>
                </select>
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              variant="primary"
              isLoading={isLoading}
              className="w-full mt-2"
              icon={ArrowRight}
            >
              Register Portal Account
            </Button>
          </form>

          <div className="pt-3 border-t border-slate-200 text-center text-xs text-slate-500">
            Already authorized?{' '}
            <Link href="/login" className="text-blue-700 font-semibold hover:underline">
              Sign in to Portal
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
