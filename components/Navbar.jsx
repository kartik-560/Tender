'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FileUp, Search, LogOut, Menu, Building2 } from 'lucide-react';
import Button from './Button';
import useAuthStore from '../store/useAuthStore';
import useSidebarStore from '../store/useSidebarStore';

export default function Navbar() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const { toggleSidebar } = useSidebarStore();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <header className="sticky top-0 z-30 w-full border-b border-slate-200 bg-white shadow-xs">
      <div className="flex h-14 items-center justify-between px-3 sm:px-6 gap-2 sm:gap-4">
        {/* Left: Mobile Hamburger + Brand Identifier + Search */}
        <div className="flex items-center gap-2 min-w-0 flex-1">
          {/* Hamburger toggle button (visible on mobile and tab < lg) */}
          <button
            onClick={toggleSidebar}
            type="button"
            aria-label="Toggle navigation menu"
            className="p-1.5 -ml-1 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md lg:hidden transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 shrink-0"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Mini Brand node on mobile & tab when sidebar is collapsed */}
          <div className="flex items-center gap-1.5 lg:hidden mr-1 shrink-0">
            <div className="flex h-7 w-7 items-center justify-center rounded bg-[#0a1a2f] text-white">
              <Building2 className="h-3.5 w-3.5" />
            </div>
            <span className="font-bold text-xs tracking-tight text-slate-900 font-mono hidden sm:inline">
              TENDER INTEL
            </span>
          </div>

          {/* Search Bar - dynamically responsive */}
          <div className="relative flex-1 max-w-[190px] sm:max-w-xs md:max-w-sm lg:w-80">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search tenders, agencies..."
              className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-500 focus:bg-white transition-colors"
            />
          </div>
        </div>

        {/* Center: System Status (desktop/large screens only) */}
        <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded bg-slate-50 border border-slate-200 text-xs text-slate-600 shrink-0">
          <span className="w-2 h-2 rounded-full bg-emerald-600" />
          <span className="font-semibold text-slate-700">Procurement Engine:</span>
          <span className="text-[11px] font-mono text-emerald-700 font-bold">OPERATIONAL</span>
          <span className="text-slate-300">|</span>
          <span className="text-[11px] text-slate-500">Clearance: L3</span>
        </div>

        {/* Right: Actions & User Info */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <Link href="/tenders/upload" className="shrink-0">
            <Button size="sm" icon={FileUp} className="shrink-0 whitespace-nowrap">
              <span className="hidden sm:inline">Ingest Tender (PDF)</span>
              <span className="sm:hidden text-xs">Ingest</span>
            </Button>
          </Link>

          {/* User profile dropdown */}
          <div className="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-3 border-l border-slate-200 shrink-0">
            <div className="text-right hidden md:block">
              <p className="text-xs font-semibold text-slate-800 leading-tight">{user?.name || 'Authorized Officer'}</p>
              <p className="text-[10px] text-slate-500 font-medium">{user?.role || 'Bid Evaluator'}</p>
            </div>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded bg-[#0f243a] flex items-center justify-center font-bold text-xs text-white shrink-0">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <button
              onClick={handleLogout}
              title="Sign Out"
              className="p-1 sm:p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded transition-colors shrink-0"
              aria-label="Sign out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
