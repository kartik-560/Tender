'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  UploadCloud,
  PieChart,
  ShieldCheck,
  Building2,
  Lock
} from 'lucide-react';
import useTenderStore from '../store/useTenderStore';

export function Sidebar() {
  const pathname = usePathname();
  const { tenders } = useTenderStore();

  const navigation = [
    { name: 'Executive Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Document Ingestion', href: '/tenders/upload', icon: UploadCloud, flag: '5-Step Flow' },
    {
      name: 'Active Solicitations',
      href: '/tenders',
      icon: FileText,
      badge: tenders.length > 0 ? String(tenders.length) : null
    },
    { name: 'Conversion & Risk Audit', href: '/analytics', icon: PieChart },
  ];

  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-60 flex-col border-r border-[#152e4a] bg-[#0a1a2f] text-slate-300 select-none">
      {/* Brand logo & platform header */}
      <div className="flex h-14 items-center gap-3 px-4 border-b border-[#152e4a] bg-[#071322]">
        <div className="flex h-8 w-8 items-center justify-center rounded bg-[#163859] text-white border border-[#255280]">
          <Building2 className="h-4 w-4" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-xs tracking-tight text-white font-mono">TENDER INTEL</span>
            <span className="text-[9px] font-semibold px-1 py-0.2 rounded bg-blue-900/60 text-blue-200 border border-blue-700">PORTAL</span>
          </div>
          <p className="text-[10px] text-slate-400 font-medium">Procurement Authority</p>
        </div>
      </div>

      {/* Navigation links */}
      <div className="flex flex-1 flex-col justify-between overflow-y-auto px-2 py-4">
        <div className="space-y-1">
          <p className="px-2.5 pb-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            Operational Navigation
          </p>
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center justify-between px-2.5 py-2 rounded text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-[#152e4a] text-white font-semibold border-l-2 border-blue-500 pl-2'
                    : 'text-slate-300 hover:text-white hover:bg-[#0f243a]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`h-4 w-4 ${isActive ? 'text-blue-400' : 'text-slate-400 group-hover:text-slate-200'}`} />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className={`px-1.5 py-0.2 rounded text-[10px] font-mono font-semibold ${
                    isActive ? 'bg-blue-900 text-blue-200' : 'bg-[#14263b] text-slate-300 border border-slate-700'
                  }`}>
                    {item.badge}
                  </span>
                )}
                {item.flag && !isActive && (
                  <span className="text-[9px] font-mono text-blue-400 font-medium">{item.flag}</span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Bottom System Audit Card */}
        <div className="rounded border border-[#173250] bg-[#071322] p-3 text-xs">
          <div className="flex items-center gap-1.5 font-semibold text-slate-200 text-[11px]">
            <Lock className="w-3.5 h-3.5 text-blue-400" />
            <span>Official Portal Node</span>
          </div>
          <p className="mt-1 text-[10px] text-slate-400 leading-normal">
            Authorized personnel only. Data governed under FedRAMP and ISO 27001 protocols.
          </p>
          <div className="mt-2 pt-2 border-t border-[#152e4a] flex items-center justify-between text-[10px] text-slate-400 font-mono">
            <span>Env: PROD</span>
            <span className="text-emerald-400">STATUS: OK</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
