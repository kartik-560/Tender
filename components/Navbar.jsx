'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FileUp, Search, LogOut, ShieldCheck, CheckCircle } from 'lucide-react';
import Button from './Button';
import useAuthStore from '../store/useAuthStore';

export function Navbar() {
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white shadow-xs">
      <div className="flex h-14 items-center justify-between px-6">
        {/* Left: Search Bar */}
        <div className="flex items-center gap-4 w-80">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search tenders, clause codes, agencies..."
              className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-500 focus:bg-white transition-colors"
            />
          </div>
        </div>

        {/* Center: System Status */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded bg-slate-50 border border-slate-200 text-xs text-slate-600">
          <span className="w-2 h-2 rounded-full bg-emerald-600" />
          <span className="font-semibold text-slate-700">Procurement Ingestion Engine:</span>
          <span className="text-[11px] font-mono text-emerald-700 font-bold">OPERATIONAL</span>
          <span className="text-slate-300">|</span>
          <span className="text-[11px] text-slate-500">Security Clearance: Level 3</span>
        </div>

        {/* Right: Actions & User Info */}
        <div className="flex items-center gap-3">
          <Link href="/tenders/upload">
            <Button size="sm" icon={FileUp}>
              Ingest Tender (PDF)
            </Button>
          </Link>

          {/* User profile dropdown */}
          <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-semibold text-slate-800 leading-tight">{user?.name || 'Authorized Officer'}</p>
              <p className="text-[10px] text-slate-500 font-medium">{user?.role || 'Bid Evaluator'}</p>
            </div>
            <div className="w-8 h-8 rounded bg-[#0f243a] flex items-center justify-center font-bold text-xs text-white">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <button
              onClick={handleLogout}
              title="Sign Out"
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
