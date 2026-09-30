import React from 'react';
import { ShieldAlert, ShieldCheck, AlertTriangle } from 'lucide-react';

export default function RiskGauge({ score = 3.8, showLabel = true, size = 'md' }) {
  const numScore = typeof score === 'number' ? score : parseFloat(score) || 3.8;

  let colorClass = 'text-emerald-800 border-emerald-300 bg-emerald-50';
  let barColor = 'bg-emerald-600';
  let level = 'Low Risk';
  let Icon = ShieldCheck;

  if (numScore >= 3.8) {
    colorClass = 'text-red-800 border-red-300 bg-red-50';
    barColor = 'bg-red-600';
    level = 'High Risk';
    Icon = ShieldAlert;
  } else if (numScore >= 2.5) {
    colorClass = 'text-amber-800 border-amber-300 bg-amber-50';
    barColor = 'bg-amber-600';
    level = 'Moderate Risk';
    Icon = AlertTriangle;
  }

  const percentage = Math.min(100, Math.max(0, (numScore / 5.0) * 100));

  if (size === 'sm') {
    return (
      <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded border text-[11px] font-mono font-semibold ${colorClass}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${barColor}`} />
        <span>{numScore.toFixed(1)} / 5.0</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <div className={`flex items-center justify-center w-10 h-10 rounded border font-mono font-bold text-sm ${colorClass}`}>
        {numScore.toFixed(1)}
      </div>
      <div>
        <div className="flex items-center gap-1.5">
          <Icon className={`w-3.5 h-3.5 ${colorClass.split(' ')[0]}`} />
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-700">{level}</span>
        </div>
        <div className="w-24 h-1 bg-slate-200 rounded-full mt-1.5 overflow-hidden">
          <div
            className={`h-full rounded-full ${barColor}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}
