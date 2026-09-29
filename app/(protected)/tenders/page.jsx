'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FileText,
  Search,
  FileUp,
  ArrowUpRight,
  Filter,
  Layers
} from 'lucide-react';
import RiskGauge from '../../../components/RiskGauge';
import Badge from '../../../components/Badge';
import Button from '../../../components/Button';
import useTenderStore from '../../../store/useTenderStore';

export default function TendersListPage() {
  const { tenders, fetchTenders, isLoadingTenders } = useTenderStore();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  useEffect(() => {
    fetchTenders();
  }, []);

  if (isLoadingTenders && (!tenders || tenders.length === 0)) {
    return <TendersTableSkeleton />;
  }

  const filteredTenders = (tenders && tenders.length > 0 ? tenders : []).filter((t) => {
    const matchesSearch =
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      (t.buyer && t.buyer.toLowerCase().includes(search.toLowerCase()));
    const matchesStatus = statusFilter === 'ALL' || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Official Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <nav className="text-[11px] font-mono font-medium text-slate-500 uppercase tracking-wider mb-1">
            <span>Procurement Portal</span>
            <span className="mx-1.5 text-slate-400">/</span>
            <span className="text-slate-800 font-semibold">Active Solicitations Registry</span>
          </nav>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Active Procurement Solicitations & Tenders
            </h1>
            <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-300 text-xs font-mono font-bold text-slate-700">
              {filteredTenders.length} Records
            </span>
          </div>
          <p className="text-xs text-slate-600 mt-0.5">
            Centralized index of state, federal, and commercial solicitations with automated risk scores.
          </p>
        </div>

        <Link href="/tenders/upload">
          <Button size="md" variant="action" icon={FileUp}>
            Ingest New Solicitation
          </Button>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="portal-card p-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-50/70">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by keyword, authority, ID..."
            className="portal-input pl-8 w-full"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto">
          <span className="text-xs text-slate-500 font-medium mr-1">Status:</span>
          {['ALL', 'Active', 'In Review', 'Won', 'Lost'].map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setStatusFilter(status)}
              className={`text-xs px-2.5 py-1 rounded font-medium transition-colors ${
                statusFilter === status
                  ? 'bg-[#0f243a] text-white'
                  : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* High-Density Operational Table */}
      <div className="portal-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="portal-table">
            <thead>
              <tr>
                <th className="w-20">ID</th>
                <th className="w-2/5">Tender Specification Title</th>
                <th>Procuring Authority</th>
                <th className="w-28">Est. Value</th>
                <th className="w-32">Risk Index</th>
                <th className="w-24">Status</th>
                <th className="w-24 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredTenders.length > 0 ? (
                filteredTenders.map((tender, index) => (
                  <tr key={tender.id || index}>
                    <td className="font-mono text-xs font-semibold text-slate-700">
                      {tender.id}
                    </td>

                    <td>
                      <p className="font-semibold text-slate-900 text-xs leading-snug">
                        {tender.title}
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                        {tender.summary || 'Procurement solicitation indexed via AI extraction.'}
                      </p>
                    </td>

                    <td className="text-xs text-slate-700">
                      {tender.buyer || 'State Procurement Board'}
                    </td>

                    <td className="font-mono text-xs font-semibold text-slate-900">
                      {tender.estimatedValue || 'TBD'}
                    </td>

                    <td>
                      <RiskGauge score={tender.riskScore || 0} size="sm" />
                    </td>

                    <td>
                      <Badge variant={tender.status === 'Active' ? 'primary' : 'neutral'}>
                        {tender.status}
                      </Badge>
                    </td>

                    <td className="text-right">
                      <Link
                        href="/tenders/upload"
                        className="text-xs font-semibold text-blue-700 hover:text-blue-900 hover:underline inline-flex items-center gap-0.5"
                      >
                        <span>Review</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-10 text-center text-xs text-slate-500 font-mono">
                    <p className="font-semibold text-slate-700">No tenders cataloged in registry.</p>
                    <p className="text-[11px] text-slate-500 mt-1">Upload an RFP PDF to initiate automated extraction.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600 font-mono">
          <span>Showing {filteredTenders.length} solicitations</span>
          <span>Security Protocol: FAR Section 5.2</span>
        </div>
      </div>
    </div>
  );
}

/**
 * Table-specific skeleton loader for the Active Solicitations Registry.
 * Replicates the exact 7-column operational table, filter bar, and pagination/footer.
 */
function TendersTableSkeleton() {
  return (
    <div className="space-y-6" aria-busy="true" aria-label="Loading tenders registry">
      {/* Official Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="space-y-1.5">
          <div className="h-3 w-48 bg-slate-200 rounded animate-pulse" />
          <div className="flex items-center gap-2">
            <div className="h-6 w-96 max-w-full bg-slate-300 rounded animate-pulse" />
            <div className="h-5 w-20 bg-slate-100 border border-slate-200 rounded animate-pulse" />
          </div>
          <div className="h-3.5 w-120 max-w-full bg-slate-100 rounded animate-pulse" />
        </div>

        <div className="h-8 w-44 bg-slate-200 rounded animate-pulse shrink-0" />
      </div>

      {/* Filter and Search Bar Skeleton */}
      <div className="portal-card p-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-50/70">
        <div className="h-8 w-full sm:w-80 bg-white border border-slate-200 rounded animate-pulse" />
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-12 bg-slate-200 rounded animate-pulse mr-1" />
          {['ALL', 'Active', 'In Review', 'Won', 'Lost'].map((st) => (
            <div key={st} className="h-6 w-14 bg-white border border-slate-200 rounded animate-pulse" />
          ))}
        </div>
      </div>

      {/* High-Density Operational Table Skeleton */}
      <div className="portal-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="portal-table">
            <thead>
              <tr>
                <th className="w-20">ID</th>
                <th className="w-2/5">Tender Specification Title</th>
                <th>Procuring Authority</th>
                <th className="w-28">Est. Value</th>
                <th className="w-32">Risk Index</th>
                <th className="w-24">Status</th>
                <th className="w-24 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((row) => (
                <tr key={row}>
                  <td>
                    <div className="h-3.5 w-12 bg-slate-200 rounded font-mono animate-pulse" />
                  </td>
                  <td>
                    <div className="space-y-1.5 py-0.5">
                      <div className="h-3.5 w-4/5 bg-slate-200 rounded animate-pulse" />
                      <div className="h-2.5 w-3/5 bg-slate-100 rounded animate-pulse" />
                    </div>
                  </td>
                  <td>
                    <div className="h-3 w-32 bg-slate-200 rounded animate-pulse" />
                  </td>
                  <td>
                    <div className="h-3.5 w-16 bg-slate-200 rounded font-mono animate-pulse" />
                  </td>
                  <td>
                    <div className="h-3.5 w-24 bg-slate-100 rounded-full animate-pulse" />
                  </td>
                  <td>
                    <div className="h-5 w-16 bg-slate-200 rounded-full animate-pulse" />
                  </td>
                  <td className="text-right">
                    <div className="h-3.5 w-12 bg-slate-200 rounded animate-pulse ml-auto" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer Skeleton */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs">
          <div className="h-3 w-36 bg-slate-200 rounded animate-pulse" />
          <div className="h-3 w-48 bg-slate-200 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}
