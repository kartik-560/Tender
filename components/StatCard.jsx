import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendPositive = true,
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-md p-4 shadow-xs">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">{title}</p>
          <div className="mt-1.5 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-slate-900 tracking-tight">{value}</span>
            {trend && (
              <span
                className={`inline-flex items-center text-[10px] font-semibold px-1.5 py-0.5 rounded font-mono ${
                  trendPositive
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}
              >
                {trendPositive ? (
                  <ArrowUpRight className="w-3 h-3 mr-0.5" />
                ) : (
                  <ArrowDownRight className="w-3 h-3 mr-0.5" />
                )}
                {trend}
              </span>
            )}
          </div>
          {subtitle && <p className="mt-1 text-xs text-slate-500">{subtitle}</p>}
        </div>

        {Icon && (
          <div className="p-2 rounded bg-slate-100 border border-slate-200 text-slate-600">
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>
    </div>
  );
}
