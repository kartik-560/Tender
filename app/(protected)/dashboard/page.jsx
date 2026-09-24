'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  FileText,
  Calendar,
  Trophy,
  ShieldAlert,
  ArrowUpRight,
  FileUp,
  ChevronRight
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import StatCard from '../../../components/StatCard';
import RiskGauge from '../../../components/RiskGauge';
import Badge from '../../../components/Badge';
import Button from '../../../components/Button';
import api from '../../../shared/api';
import useTenderStore from '../../../store/useTenderStore';

export default function DashboardPage() {
  const { tenders, fetchTenders } = useTenderStore();
  const [analytics, setAnalytics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [analyticsRes] = await Promise.all([
          api.getAnalytics().catch(() => null),
          fetchTenders().catch(() => null)
        ]);
        if (analyticsRes && analyticsRes.data) {
          setAnalytics(analyticsRes.data);
        }
      } catch (e) {
        console.error('Error loading dashboard data:', e);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  // Real KPIs derived dynamically from backend/database
  const kpis = analytics?.kpi || {
    activeTenders: tenders.filter(t => t.status === 'Active' || t.status === 'In Review').length,
    upcomingDeadlines: 0,
    winRate: 0,
    avgRiskScore: 0.0,
  };

  const monthlyData = analytics?.monthlyAnalysis || [];
  const donutData = analytics?.winLossRatio || [];
  const recentTenders = tenders && tenders.length > 0 ? tenders.slice(0, 5) : [];

  return (
    <div className="space-y-6">
      {/* Official Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <nav className="text-[11px] font-mono font-medium text-slate-500 uppercase tracking-wider mb-1">
            <span>Procurement Portal</span>
            <span className="mx-1.5 text-slate-400">/</span>
            <span className="text-slate-800 font-semibold">Executive Dashboard</span>
          </nav>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Procurement Intelligence & Review Command Center
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Real-time solicitation monitoring, statutory deadline tracking, and compliance risk indexation.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/tenders/upload">
            <Button size="md" variant="action" icon={FileUp}>
              Ingest Tender (5-Step)
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Row (Dynamic metrics strictly from database) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Tenders"
          value={kpis.activeTenders}
          subtitle="Active procurement solicitations"
          icon={FileText}
        />

        <StatCard
          title="Upcoming Deadlines"
          value={kpis.upcomingDeadlines}
          subtitle="Identified cutoff milestones"
          icon={Calendar}
        />

        <StatCard
          title="Win Rate"
          value={`${kpis.winRate}%`}
          subtitle="Evaluated tender proposals"
          icon={Trophy}
        />

        <StatCard
          title="Avg Risk Index"
          value={kpis.avgRiskScore}
          subtitle="Scale 0.0 - 5.0 (FAR standards)"
          icon={ShieldAlert}
        />
      </div>

      {/* Analytical Charts Grid: Monthly Tender Analysis + Win vs Loss Ratio */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Monthly Tender Analysis Area Chart */}
        <div className="lg:col-span-2 portal-card p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Monthly Tender Volume
              </h2>
              <p className="text-[11px] text-slate-500">Volume of solicitations submitted vs awarded contracts</p>
            </div>
            <div className="flex items-center gap-3 text-xs font-medium">
              <span className="flex items-center gap-1.5 text-slate-700">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#1e3a5f]" /> Submitted
              </span>
              <span className="flex items-center gap-1.5 text-blue-700">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#2563eb]" /> Won
              </span>
            </div>
          </div>

          <div className="h-64 w-full pt-3">
            {monthlyData.some(d => d.submitted > 0 || d.won > 0) ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorSub" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1e3a5f" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#1e3a5f" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="colorWon" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="2 2" stroke="#e2e8f0" vertical={false} />
                  <XAxis dataKey="month" stroke="#64748b" fontSize={11} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      borderColor: '#cbd5e1',
                      borderRadius: '4px',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                      color: '#0f172a',
                      fontSize: '12px',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="submitted"
                    stroke="#1e3a5f"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorSub)"
                    name="Submitted Solicitations"
                  />
                  <Area
                    type="monotone"
                    dataKey="won"
                    stroke="#2563eb"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorWon)"
                    name="Awarded Bids"
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400 font-mono text-xs">
                <p>No monthly ingestion data recorded yet.</p>
                <p className="text-[11px] text-slate-500 mt-1">Upload a PDF RFP to initiate analytics trends.</p>
              </div>
            )}
          </div>
        </div>

        {/* Win vs Loss Ratio Donut Chart */}
        <div className="portal-card p-4 flex flex-col justify-between">
          <div className="pb-3 border-b border-slate-200">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Win vs Loss Ratio
            </h2>
            <p className="text-[11px] text-slate-500">Proposal decision distribution</p>
          </div>

          <div className="h-52 w-full relative flex items-center justify-center my-1">
            {donutData.some(d => d.value > 0) ? (
              <>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={donutData}
                      cx="50%"
                      cy="50%"
                      innerRadius={52}
                      outerRadius={75}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {donutData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke="#ffffff" strokeWidth={2} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#ffffff',
                        borderColor: '#cbd5e1',
                        borderRadius: '4px',
                        fontSize: '12px',
                        color: '#0f172a'
                      }}
                      formatter={(value) => [value, 'Volume']}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-xl font-bold font-mono text-slate-900">{kpis.winRate}%</span>
                  <span className="text-[9px] uppercase tracking-wider font-semibold text-slate-500">Win Rate</span>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center text-center p-4 text-slate-400 font-mono text-xs">
                <span>0 Decisions Recorded</span>
              </div>
            )}
          </div>

          {/* Legend Table */}
          <div className="grid grid-cols-3 gap-1 pt-2 border-t border-slate-200 text-center">
            {donutData.map((item) => (
              <div key={item.name} className="p-1.5 bg-slate-50 rounded text-[10px]">
                <span className="text-slate-500 truncate block">{item.name}</span>
                <span className="font-bold font-mono text-slate-900 mt-0.5 block">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Operational Tenders Registry Table */}
      <div className="portal-card overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3 bg-slate-50 border-b border-slate-200">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Active Tenders & Risk Index
            </h2>
            <p className="text-[11px] text-slate-500">
              Showing {recentTenders.length} active solicitations recorded in database
            </p>
          </div>

          <Link href="/tenders">
            <Button size="sm" variant="secondary" icon={ChevronRight}>
              View Complete Registry
            </Button>
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="portal-table">
            <thead>
              <tr>
                <th className="w-2/5">Tender Specification</th>
                <th>Procuring Authority</th>
                <th className="w-28">Est. Value</th>
                <th className="w-32">Risk Index</th>
                <th className="w-24">Status</th>
                <th className="w-24 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {recentTenders.length > 0 ? (
                recentTenders.map((tender) => (
                  <tr key={tender.id}>
                    <td>
                      <p className="font-semibold text-slate-900 text-xs">
                        {tender.title}
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5 font-mono">
                        Ingested {new Date(tender.uploadDate || tender.createdAt || Date.now()).toLocaleDateString()}
                      </p>
                    </td>

                    <td className="text-xs text-slate-700">
                      {tender.buyer || 'State Infrastructure Dept'}
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
                  <td colSpan="6" className="py-10 text-center text-xs text-slate-500 font-mono">
                    <p className="font-semibold text-slate-700">No tenders cataloged in registry yet.</p>
                    <p className="text-[11px] text-slate-500 mt-1">Click "Ingest Tender" to upload an RFP PDF and initiate extraction.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
