import Link from 'next/link';
import { ArrowRight, ShieldCheck, Building2, Layers, BarChart3, FileUp, Lock, CheckCircle2 } from 'lucide-react';
import Button from '../components/Button';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col justify-between">
      {/* Official Top Bar */}
      <header className="border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-[#0f243a] text-white">
              <Building2 className="h-4 w-4" />
            </div>
            <div>
              <span className="font-bold text-xs tracking-tight text-slate-900 font-mono">TENDER & RFP INTELLIGENCE PORTAL</span>
              <span className="hidden sm:inline-block text-[10px] text-slate-500 ml-2 border-l border-slate-300 pl-2">
                Public & Enterprise Procurement Authority
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/login" className="text-xs font-semibold text-slate-700 hover:text-slate-900 transition-colors">
              Official Sign In
            </Link>
            <Link href="/dashboard">
              <Button size="sm" variant="primary">
                Launch Portal
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Gateway Section */}
      <div className="max-w-5xl mx-auto px-6 py-12 w-full space-y-8">
        {/* Institutional Title & Purpose */}
        <div className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-slate-100 border border-slate-300 text-[11px] font-mono text-slate-700 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-700" />
            <span>FEDERAL & ENTERPRISE PROCUREMENT REVIEW SYSTEM • v2.4.1</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-snug">
            Automated Tender Specification Analysis, Compliance Extraction & Risk Scoring
          </h1>

          <p className="text-sm text-slate-600 leading-relaxed">
            Standardized operational software designed for procurement officers, proposal directors, and evaluation boards. Ingest multi-page RFP solicitations in PDF format, segment mandatory eligibility criteria, identify liquidated damage liabilities, and track statutory submission milestones.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link href="/dashboard">
              <Button size="lg" variant="primary" icon={BarChart3}>
                Open Executive Dashboard
              </Button>
            </Link>
            <Link href="/tenders/upload">
              <Button size="lg" variant="secondary" icon={FileUp}>
                Execute 5-Step Ingestion Flow
              </Button>
            </Link>
          </div>
        </div>

        {/* 3 Core Operating Capabilities */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
          <div className="portal-card p-4 space-y-2">
            <div className="w-8 h-8 rounded bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700">
              <FileUp className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              5-Step Ingestion Pipeline
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Standardized ingestion: Document verification, manifest extraction, eligibility matrix validation, commercial parameter review, and deadline delegation.
            </p>
          </div>

          <div className="portal-card p-4 space-y-2">
            <div className="w-8 h-8 rounded bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700">
              <ShieldCheck className="w-4 h-4 text-slate-700" />
            </div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Clause Risk Scoring (0.0 - 5.0)
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Automated NLP evaluation that isolates high-liability stipulations, indemnification clauses, and liquidated damages percentages.
            </p>
          </div>

          <div className="portal-card p-4 space-y-2">
            <div className="w-8 h-8 rounded bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700">
              <Layers className="w-4 h-4 text-slate-700" />
            </div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Procurement Intelligence
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Centralized active tender registry with 24 pre-indexed solicitations, historical conversion analytics, and real-time deadline monitoring.
            </p>
          </div>
        </div>
      </div>

      {/* Official Footer */}
      <footer className="border-t border-slate-200 bg-white py-4 text-center text-[11px] text-slate-500 font-mono">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>TENDER & RFP INTELLIGENCE PORTAL • OFFICIAL ENTERPRISE RELEASE</span>
          <span>COMPLIANCE STANDARDS: FAR PART 15 • ISO/IEC 27001</span>
        </div>
      </footer>
    </main>
  );
}
