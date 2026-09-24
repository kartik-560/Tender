'use client';

import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  TrendingUp,
  ShieldCheck,
  Award,
  Layers
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import StatCard from '../../../components/StatCard';
import Badge from '../../../components/Badge';
import api from '../../../shared/api';
import useTenderStore from '../../../store/useTenderStore';

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState(null);
  const { tenders, fetchTenders } = useTenderStore();

  useEffect(() => {
    async function loadData() {
      try {
        const [res] = await Promise.all([
          api.getAnalytics().catch(() => null),
          fetchTenders().catch(() => null)
        ]);
        if (res && res.data) setAnalytics(res.data);
      } catch (e) {
        console.error('Analytics load error:', e);
      }
    }
    loadData();
  }, []);

  const riskLevels = analytics?.riskDistribution || [
    { level: 'Low Risk (0.0 - 2.5)', count: 0, percentage: 0, category: 'Standard Commercial Terms', color: '#059669' },
    { level: 'Moderate Risk (2.5 - 3.8)', count: 0, percentage: 0, category: 'Liquidated Damage Stipulations', color: '#d97706' },
    { level: 'High Risk (3.8 - 5.0)', count: 0, percentage: 0, category: 'Strict Delivery / Indemnity Caps', color: '#dc2626' },
  ];

  // Dynamic sector aggregation from real tenders in database
  const sectorMap = {};
  tenders.forEach(t => {
    const sector = t.buyer ? t.buyer.split(' ')[0] : 'General';
    if (!sectorMap[sector]) {
      sectorMap[sector] = { sector, bids: 0, won: 0 };
    }
    sectorMap[sector].bids++;
    if (t.status === 'Won') sectorMap[sector].won++;
  });

  const sectorData = Object.values(sectorMap).map(s => ({
    sector: s.sector,
    bids: s.bids,
    winRate: s.bids > 0 ? Math.round((s.won / s.bids) * 100) : 0,
  }));

  const winRate = analytics?.kpi?.winRate || 0;

  return (
    <div className="space-y-6">
      {/* Official Header */}
      <div className="pb-4 border-b border-slate-200">
        <nav className="text-[11px] font-mono font-medium text-slate-500 uppercase tracking-wider mb-1">
          <span>Procurement Portal</span>
          <span className="mx-1.5 text-slate-400">/</span>
          <span className="text-slate-500 font-semibold">Conversion & Risk Audit </span>
        </nav>
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Procurement Conversion & Risk Distribution Audit
          </h1>
          <Badge variant="primary">LIVE AUDIT</Badge>
        </div>
        <p className="text-xs text-slate-600 mt-0.5">
          Real-time metrics computed directly from cataloged tender records and AI risk evaluation indices.
        </p>
      </div>

      {/* Top Stat Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Pipeline Solicitations"
          value={tenders.length}
          subtitle="Cataloged in procurement database"
          icon={TrendingUp}
        />
        <StatCard
          title="Win Conversion Rate"
          value={`${winRate}%`}
          subtitle="Based on evaluated proposal decisions"
          icon={Award}
        />
        <StatCard
          title="Active Solicitations"
          value={tenders.filter(t => t.status === 'Active' || t.status === 'In Review').length}
          subtitle="Under current review"
          icon={Layers}
        />
        <StatCard
          title="Average Risk Index"
          value={analytics?.kpi?.avgRiskScore || 0.0}
          subtitle="Scale 0.0 - 5.0"
          icon={ShieldCheck}
        />
      </div>

      {/* Analytical Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Sector Performance Bar Chart */}
        <div className="portal-card p-4 flex flex-col justify-between">
          <div className="pb-3 border-b border-slate-200">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Win Rate by Sector (%)
            </h2>
            <p className="text-[11px] text-slate-500">Conversion percentages across indexed authorities</p>
          </div>

          <div className="h-64 w-full pt-3">
            {sectorData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sectorData} margin={{ top: 10, right: 10, left: -25, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="2 2" stroke="#e2e8f0" vertical={false} />
                  <XAxis dataKey="sector" stroke="#64748b" fontSize={10} interval={0} angle={-15} textAnchor="end" />
                  <YAxis stroke="#64748b" fontSize={11} domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      borderColor: '#cbd5e1',
                      borderRadius: '4px',
                      fontSize: '12px',
                      color: '#0f172a',
                    }}
                    formatter={(val) => [`${val}%`, 'Win Conversion']}
                  />
                  <Bar dataKey="winRate" fill="#0f243a" radius={[2, 2, 0, 0]} name="Win Rate" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400 font-mono text-xs">
                <p>No sector data indexed yet.</p>
                <p className="text-[11px] text-slate-500 mt-1">Ingest tender solicitations to populate sector conversion metrics.</p>
              </div>
            )}
          </div>
        </div>

        {/* Risk Distribution Audit Panel */}
        <div className="portal-card p-4 flex flex-col justify-between space-y-4">
          <div className="pb-3 border-b border-slate-200">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Procurement Risk Distribution ({tenders.length} Monitored Tenders)
            </h2>
            <p className="text-[11px] text-slate-500">Risk indices evaluated under statutory penalty metrics</p>
          </div>

          <div className="space-y-3">
            {riskLevels.map((risk) => (
              <div key={risk.level} className="p-3 bg-slate-50 border border-slate-200 rounded space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-900">{risk.level}</span>
                  <span className="font-mono font-bold text-slate-800">
                    {risk.count} Solicitations ({risk.percentage}%)
                  </span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${risk.percentage}%`, backgroundColor: risk.color }}
                  />
                </div>
                {risk.category && (
                  <p className="text-[10px] text-slate-500 font-mono">
                    Classification: {risk.category}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="p-3 bg-blue-50 border border-blue-200 rounded text-xs text-blue-900 leading-normal">
            <strong>Audit Status:</strong> Real-time risk distribution calculated from active records in the procurement database.
          </div>
        </div>
      </div>
    </div>
  );
}
