'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import useAuthStore from '../../store/useAuthStore';

export default function ProtectedLayout({ children }) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuthStore();

  // Show application shell skeleton while auth hydrates from localStorage
  if (isLoading) {
    return <AuthShellSkeleton />;
  }

  // Redirect to login if not authenticated (client-side fallback)
  if (!isAuthenticated) {
    router.push('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex">
      {/* Institutional Sidebar (Drawer on mobile/tab, docked on desktop lg+) */}
      <Sidebar />

      {/* Main Content Area: full width on mobile/tab (ml-0), offset on desktop (lg:ml-60) */}
      <div className="flex-1 ml-0 lg:ml-60 flex flex-col min-h-screen min-w-0 overflow-x-hidden">
        <Navbar />
        <main className="flex-1 p-3.5 sm:p-5 md:p-6 max-w-7xl w-full mx-auto space-y-6">
          {children}
        </main>
      </div>
    </div>
  );
}

/**
 * Page/Shell-specific skeleton loader for authenticated application verification.
 * Accurately mirrors the institutional sidebar, top navigation, and core page container.
 */
function AuthShellSkeleton() {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex" aria-busy="true" aria-label="Loading workspace">
      {/* Shell Sidebar Skeleton (hidden on mobile/tab, visible on desktop lg+) */}
      <aside className="fixed left-0 top-0 z-50 hidden lg:flex h-screen w-60 flex-col border-r border-[#152e4a] bg-[#0a1a2f] select-none">
        {/* Sidebar Brand Header */}
        <div className="flex h-14 items-center gap-3 px-4 border-b border-[#152e4a] bg-[#071322]">
          <div className="h-8 w-8 rounded bg-[#163859] animate-pulse shrink-0" />
          <div className="space-y-1.5 flex-1">
            <div className="h-3 w-24 bg-[#1f456e] rounded animate-pulse" />
            <div className="h-2 w-16 bg-[#142e4a] rounded animate-pulse" />
          </div>
        </div>

        {/* Sidebar Navigation Items */}
        <div className="flex flex-1 flex-col justify-between px-2 py-4">
          <div className="space-y-2">
            <div className="px-2.5 pb-1">
              <div className="h-2.5 w-28 bg-[#142e4a] rounded animate-pulse" />
            </div>
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-2.5 py-2 rounded bg-[#0f243a]/60 animate-pulse"
              >
                <div className="h-4 w-4 rounded bg-[#1f456e] shrink-0" />
                <div className="h-3 w-28 bg-[#1a385a] rounded" />
              </div>
            ))}
          </div>

          {/* Bottom Node Card */}
          <div className="rounded border border-[#173250] bg-[#071322] p-3 space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 rounded bg-[#1b3f66] animate-pulse" />
              <div className="h-3 w-24 bg-[#1b3f66] rounded animate-pulse" />
            </div>
            <div className="h-2 w-full bg-[#12283e] rounded animate-pulse" />
            <div className="pt-2 border-t border-[#152e4a] flex justify-between">
              <div className="h-2 w-12 bg-[#12283e] rounded animate-pulse" />
              <div className="h-2 w-16 bg-[#12283e] rounded animate-pulse" />
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Shell Skeleton */}
      <div className="flex-1 ml-0 lg:ml-60 flex flex-col min-h-screen overflow-x-hidden">
        {/* Top Navbar Skeleton */}
        <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white shadow-xs">
          <div className="flex h-14 items-center justify-between px-3 sm:px-6">
            <div className="h-8 w-48 sm:w-80 bg-slate-100 rounded animate-pulse" />
            <div className="hidden md:flex h-6 w-60 bg-slate-100 rounded animate-pulse" />
            <div className="flex items-center gap-3">
              <div className="h-8 w-20 sm:w-32 bg-slate-200 rounded animate-pulse" />
              <div className="w-8 h-8 rounded bg-slate-200 animate-pulse" />
            </div>
          </div>
        </header>

        {/* Page Content Placeholder Skeleton */}
        <main className="flex-1 p-3.5 sm:p-5 md:p-6 max-w-7xl w-full mx-auto space-y-6">
          {/* Header Skeleton */}
          <div className="pb-4 border-b border-slate-200 space-y-2">
            <div className="h-3 w-44 bg-slate-200 rounded animate-pulse" />
            <div className="h-6 w-80 bg-slate-300 rounded animate-pulse" />
            <div className="h-3.5 w-96 max-w-full bg-slate-100 rounded animate-pulse" />
          </div>

          {/* 4 Stat Cards Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="portal-card p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="h-3 w-24 bg-slate-200 rounded animate-pulse" />
                  <div className="w-7 h-7 rounded bg-slate-100 animate-pulse" />
                </div>
                <div className="h-7 w-20 bg-slate-300 rounded animate-pulse" />
                <div className="h-3 w-36 bg-slate-100 rounded animate-pulse" />
              </div>
            ))}
          </div>

          {/* Body Content Area Placeholder */}
          <div className="portal-card p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="h-4 w-44 bg-slate-200 rounded animate-pulse" />
              <div className="h-7 w-28 bg-slate-100 rounded animate-pulse" />
            </div>
            <div className="space-y-3 pt-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-10 w-full bg-slate-50 border border-slate-100 rounded animate-pulse" />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
