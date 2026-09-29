'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Lock,
  Mail,
  User,
  Briefcase,
  Building2,
  ArrowRight,
  ShieldCheck,
  Eye,
  EyeOff,
  Sparkles,
  Check,
  ArrowUpRight,
  CheckCircle2,
  Layers,
  FileCheck2
} from 'lucide-react';
import useAuthStore from '../../../store/useAuthStore';
import { useToast } from '../../../providers/ToastProvider';
import api from '../../../shared/api';

export default function RegisterPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuthStore();
  const { showToast } = useToast();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Bid Manager');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isLoading, isAuthenticated, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const data = await api.register(name, email, password, role);

      if (data.token && data.user) {
        if (typeof window !== 'undefined') {
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          document.cookie = `token=${data.token}; path=/; max-age=604800; SameSite=Lax`;
        }
      }

      showToast('Authorized account created successfully.', 'success');
      router.push('/dashboard');
    } catch (err) {
      showToast(err.message || 'Registration failed. Please check inputs.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f1f5f9] flex flex-col lg:flex-row text-slate-900 select-none">
      {/* ======================================================== */}
      {/* LEFT VISUAL / BRANDING PANEL (Enterprise Navy Theme)     */}
      {/* ======================================================== */}
      <div className="relative w-full lg:w-[48%] xl:w-[50%] bg-[#071322] bg-gradient-to-br from-[#071322] via-[#0a1a2f] to-[#0f243a] text-white p-6 sm:p-10 lg:p-12 xl:p-16 flex flex-col justify-between overflow-hidden border-b lg:border-b-0 lg:border-r border-[#152e4a]">
        {/* Subtle Background Pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
            backgroundSize: '24px 24px',
          }}
        />

        {/* Ambient Subtle Radial Glow */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#163859]/30 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header / Brand Logo */}
        <div className="relative z-10 animate-login-fade animation-delay-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#163859] to-[#0f243a] text-white border border-[#255280] shadow-sm ring-1 ring-white/10">
              <Building2 className="h-5 w-5 text-blue-200" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm tracking-tight text-white font-mono">TENDER INTEL</span>
                <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-blue-900/80 text-blue-200 border border-blue-700/60 uppercase">
                  Portal
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">Procurement Authority Gateway</p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#0b1c31] border border-[#1b3f66] text-[10px] font-mono text-slate-300">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            <span>SOVEREIGN ACCESS ONBOARDING</span>
          </div>
        </div>

        {/* Center Section: Core Message & Onboarding Highlights */}
        <div className="relative z-10 py-6 lg:py-10 space-y-6 my-auto">
          {/* Main Headline & Subtitle */}
          <div className="space-y-3 animate-login-slide animation-delay-150">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-blue-950/70 border border-blue-800/40 text-[11px] font-mono text-blue-300 font-semibold">
              <Sparkles className="w-3 h-3 text-blue-400" />
              <span>ROLE-BASED PROCUREMENT INTELLIGENCE</span>
            </div>

            <h1 className="text-2xl sm:text-3xl xl:text-4xl font-bold text-white tracking-tight leading-snug">
              Equip Your Proposal Team <br className="hidden sm:inline" />
              With Statutory AI Review.
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-lg">
              Gain institutional access to automated solicitation decomposition, FAR penalty clause matrices, and standardized bid-decision workflows.
            </p>
          </div>

          {/* Feature Highlight Cards */}
          <div className="space-y-2.5 animate-login-slide animation-delay-200">
            {[
              {
                icon: FileCheck2,
                title: 'Multi-Page PDF Ingestion & Tokenization',
                desc: 'Upload RFP packages up to 30MB with automated clause segmentation.'
              },
              {
                icon: ShieldCheck,
                title: 'FAR Statutory Compliance Matrix',
                desc: 'Pre-qualification risk indexation (0.0 - 5.0) and penalty liability detection.'
              },
              {
                icon: Layers,
                title: 'Operational Registry & Milestone Delegation',
                desc: 'Track statutory submission deadlines, amendments, and award histories.'
              }
            ].map((feat, i) => {
              const Icon = feat.icon;
              return (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-lg bg-[#0b1c31]/80 border border-[#1b3f66] backdrop-blur-sm"
                >
                  <div className="w-7 h-7 rounded bg-[#163859] border border-[#255280] flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="w-3.5 h-3.5 text-blue-300" />
                  </div>
                  <div>
                    <h2 className="text-xs font-semibold text-white tracking-tight">{feat.title}</h2>
                    <p className="text-[11px] text-slate-400 leading-relaxed mt-0.5">{feat.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Supporting Intentional Quote */}
          <div className="pl-3.5 border-l-2 border-blue-500/80 animate-login-slide animation-delay-250">
            <p className="text-xs text-slate-300 italic leading-relaxed">
              &ldquo;Precision in proposal analysis starts with verified credentials.&rdquo;
            </p>
            <p className="text-[10px] text-slate-400 font-mono mt-1 uppercase tracking-wider">
              — Federal Acquisition Integrity Standards
            </p>
          </div>
        </div>

        {/* Bottom Trust & Security Indicators */}
        <div className="relative z-10 pt-4 border-t border-[#152e4a] space-y-2 animate-login-fade animation-delay-300">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-slate-300 font-medium">
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-blue-400" />
              <span>Role-Based Access</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-blue-400" />
              <span>FedRAMP Compatible</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-blue-400" />
              <span>256-Bit TLS Security</span>
            </span>
          </div>

          <p className="text-[10px] text-slate-500 font-mono">
            SECURITY PROTOCOL: FAR 52.204 • AUDITABLE SESSION AUTHORIZATION
          </p>
        </div>
      </div>

      {/* ======================================================== */}
      {/* RIGHT REGISTER PANEL (Refined Enterprise Form)           */}
      {/* ======================================================== */}
      <div className="flex-1 bg-[#f8fafc] flex flex-col justify-between p-6 sm:p-10 lg:p-12 xl:p-16 text-slate-900 overflow-y-auto">
        {/* Top Operational Status Header */}
        <div className="flex items-center justify-between max-w-md w-full mx-auto pb-3">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold text-slate-700">NODE: REGISTRATION GATEWAY</span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono uppercase bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">
            TLS 1.3 ACTIVE
          </span>
        </div>

        {/* Main Centered Register Card */}
        <div className="w-full max-w-md mx-auto my-auto py-2">
          <div className="bg-white border border-slate-200/90 rounded-2xl shadow-[0_10px_35px_-8px_rgba(15,23,42,0.08),0_1px_3px_0_rgba(15,23,42,0.03)] p-7 sm:p-8 space-y-5 relative overflow-hidden animate-login-slide">
            {/* Top Institutional Navy Accent Strip */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0f243a] via-[#1e3a5f] to-[#2563eb]" />

            {/* Header: Portal Identity */}
            <div className="space-y-1.5 pb-3 border-b border-slate-100">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#0f243a] text-white border border-[#1b3f66] shadow-sm mb-1.5">
                <Building2 className="h-5 w-5 text-blue-200" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Create Enterprise Account
              </h2>
              <div className="flex items-center gap-2 pt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <p className="text-xs text-slate-500 font-medium">
                  Procurement Officer &amp; Bid Reviewer Registration
                </p>
              </div>
            </div>

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* Full Legal Name Field */}
              <div className="space-y-1.5">
                <label
                  htmlFor="reg-name"
                  className="block text-xs font-semibold text-slate-700 uppercase tracking-wider"
                >
                  Full Legal Name
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-0 inset-y-0 w-11 flex items-center justify-center pointer-events-none text-slate-400">
                    <User className="w-[18px] h-[18px]" />
                  </div>
                  <input
                    id="reg-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Elena Rostova"
                    style={{ paddingLeft: '2.75rem', paddingRight: '1rem' }}
                    className="w-full h-11 py-2.5 bg-slate-50/70 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 hover:border-slate-400 hover:bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0f243a]/15 focus:border-[#0f243a] transition-all"
                  />
                </div>
              </div>

              {/* Official Agency Email Field */}
              <div className="space-y-1.5">
                <label
                  htmlFor="reg-email"
                  className="block text-xs font-semibold text-slate-700 uppercase tracking-wider"
                >
                  Official Agency Email
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-0 inset-y-0 w-11 flex items-center justify-center pointer-events-none text-slate-400">
                    <Mail className="w-[18px] h-[18px]" />
                  </div>
                  <input
                    id="reg-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="elena.rostova@agency.gov"
                    style={{ paddingLeft: '2.75rem', paddingRight: '1rem' }}
                    className="w-full h-11 py-2.5 bg-slate-50/70 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 hover:border-slate-400 hover:bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0f243a]/15 focus:border-[#0f243a] transition-all"
                  />
                </div>
              </div>

              {/* Password Field with Prominent Visibility Toggle */}
              <div className="space-y-1.5">
                <label
                  htmlFor="reg-password"
                  className="block text-xs font-semibold text-slate-700 uppercase tracking-wider"
                >
                  Access Password
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-0 inset-y-0 w-11 flex items-center justify-center pointer-events-none text-slate-400">
                    <Lock className="w-[18px] h-[18px]" />
                  </div>

                  <input
                    id="reg-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••••••"
                    style={{ paddingLeft: '2.75rem', paddingRight: '5.25rem' }}
                    className="w-full h-11 py-2.5 bg-slate-50/70 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 hover:border-slate-400 hover:bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0f243a]/15 focus:border-[#0f243a] transition-all"
                  />

                  {/* Visible, interactive Show/Hide Password button */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    title={showPassword ? 'Hide password' : 'Show password'}
                    className={`absolute right-2.5 top-1/2 -translate-y-1/2 h-7 px-2.5 flex items-center gap-1.5 rounded-md text-xs font-medium cursor-pointer transition-all ${
                      showPassword
                        ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-xs'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200 hover:text-slate-900'
                    }`}
                  >
                    {showPassword ? (
                      <>
                        <EyeOff className="w-3.5 h-3.5 text-blue-700" />
                        <span className="font-semibold">Hide</span>
                      </>
                    ) : (
                      <>
                        <Eye className="w-3.5 h-3.5 text-slate-500" />
                        <span>Show</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Organizational Role Selector */}
              <div className="space-y-1.5">
                <label
                  htmlFor="reg-role"
                  className="block text-xs font-semibold text-slate-700 uppercase tracking-wider"
                >
                  Organizational Role
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-0 inset-y-0 w-11 flex items-center justify-center pointer-events-none text-slate-400">
                    <Briefcase className="w-[18px] h-[18px]" />
                  </div>
                  <select
                    id="reg-role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    style={{ paddingLeft: '2.75rem', paddingRight: '2rem' }}
                    className="w-full h-11 py-2.5 bg-slate-50/70 border border-slate-300 rounded-lg text-sm text-slate-900 hover:border-slate-400 hover:bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0f243a]/15 focus:border-[#0f243a] transition-all cursor-pointer"
                  >
                    <option value="Bid Manager">Senior Bid Director / Proposal Lead</option>
                    <option value="Technical Architect">Technical Solutions Architect</option>
                    <option value="Legal & Compliance Officer">Legal &amp; Regulatory Compliance Officer</option>
                    <option value="Executive Evaluator">Procurement Board Evaluator</option>
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-11 rounded-lg bg-[#0f243a] hover:bg-[#163859] active:bg-[#0b1b2d] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>Creating Authorized Account...</span>
                    </>
                  ) : (
                    <>
                      <span>Register Portal Account</span>
                      <ArrowRight className="w-4 h-4 ml-0.5" />
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Link back to Login */}
            <div className="pt-3 border-t border-slate-100 text-center text-xs text-slate-500">
              Already have authorized credentials?{' '}
              <Link
                href="/login"
                className="text-blue-700 font-semibold hover:text-blue-900 hover:underline transition-colors inline-flex items-center gap-0.5"
              >
                <span>Sign in to Portal</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Institutional Legal Footer */}
        <footer className="max-w-md mx-auto w-full text-center text-[10px] text-slate-500 font-mono pt-4 pb-2">
          <p>OFFICIAL USE ONLY • CREDENTIAL PROVISIONING IS MONITORED</p>
          <p className="text-[9px] text-slate-400 mt-0.5">
            Governed under Federal Acquisition Regulation (FAR) 52.204 protocols.
          </p>
        </footer>
      </div>
    </div>
  );
}
