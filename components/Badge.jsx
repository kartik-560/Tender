import React from 'react';

export default function Badge({ children, variant = 'default', className = '' }) {
  const styles = {
    default: 'bg-slate-100 text-slate-700 border-slate-200',
    primary: 'bg-blue-50 text-blue-800 border-blue-200',
    success: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    warning: 'bg-amber-50 text-amber-800 border-amber-200',
    danger: 'bg-red-50 text-red-800 border-red-200',
    neutral: 'bg-slate-100 text-slate-600 border-slate-200',
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium border font-mono tracking-tight ${
        styles[variant] || styles.default
      } ${className}`}
    >
      {children}
    </span>
  );
}
