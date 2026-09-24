'use client';

import React, { useState } from 'react';
import { CheckCircle2, AlertTriangle, XCircle, ArrowRight, ArrowLeft, Filter, ShieldCheck } from 'lucide-react';
import Button from '../../components/Button';
import Badge from '../../components/Badge';
import useTenderStore from '../../store/useTenderStore';

export function Step3Eligibility() {
  const { extractedTender, setCurrentStep } = useTenderStore();
  const [filter, setFilter] = useState('ALL');

  if (!extractedTender) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-mono font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 uppercase">
              Phase 3 of 5
            </span>
            <span className="text-xs text-slate-500 font-medium">Pre-Qualification & Compliance Review</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Eligibility & Disqualification Verification Matrix
          </h2>
        </div>

        <div className="portal-card p-12 text-center space-y-4 bg-slate-50/50">
          <div className="w-12 h-12 rounded bg-slate-100 border border-slate-300 flex items-center justify-center mx-auto text-slate-500">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div className="space-y-1 max-w-sm mx-auto">
            <h3 className="text-sm font-bold text-slate-900">No Ingestion Data Available</h3>
            <p className="text-xs text-slate-500">
              Please upload and analyze a procurement solicitation document in Phase 1 first.
            </p>
          </div>
          <Button variant="action" onClick={() => setCurrentStep(1)} icon={ArrowLeft}>
            Return to Upload (Phase 1)
          </Button>
        </div>
      </div>
    );
  }

  const rawEligibility = extractedTender?.rawAnalysis?.eligibilityRequirements || [];
  const eligibilityList = rawEligibility.map((r, i) => ({
    id: `el-${i}`,
    code: `REQ-${String(i + 1).padStart(2, '0')}`,
    clause: r.clause,
    category: 'Mandatory RFP Condition',
    status: r.status || 'Compliant',
    notes: 'Extracted directly from solicitation specification.'
  }));

  const filteredCriteria = eligibilityList.filter(item => {
    if (filter === 'ALL') return true;
    return item.status.toUpperCase() === filter;
  });

  const compliantCount = eligibilityList.filter(e => e.status === 'Compliant').length;
  const attentionCount = eligibilityList.filter(e => e.status === 'Attention').length;
  const passRate = eligibilityList.length > 0
    ? Math.round((compliantCount / eligibilityList.length) * 100)
    : 100;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Section Header */}
      <div className="border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[11px] font-mono font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 uppercase">
            Phase 3 of 5
          </span>
          <span className="text-xs text-slate-500 font-medium">Pre-Qualification & Compliance Review</span>
        </div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">
          Eligibility & Disqualification Verification Matrix
        </h2>
        <p className="mt-1 text-xs text-slate-600">
          The extraction engine has verified mandatory qualification clauses to isolate potential disqualification hurdles before formal proposal compilation.
        </p>
      </div>

      {/* Summary KPI Strips */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3.5 bg-white border border-slate-200 rounded shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 block">Compliant Criteria</span>
            <span className="text-xl font-bold font-mono text-emerald-700 mt-0.5 block">{compliantCount} of {eligibilityList.length}</span>
          </div>
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
        </div>

        <div className="p-3.5 bg-white border border-slate-200 rounded shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 block">Review Flags</span>
            <span className="text-xl font-bold font-mono text-amber-700 mt-0.5 block">{attentionCount} Mandatory</span>
          </div>
          <AlertTriangle className="w-5 h-5 text-amber-600" />
        </div>

        <div className="p-3.5 bg-white border border-slate-200 rounded shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 block">Pre-Qual Pass Rate</span>
            <span className="text-xl font-bold font-mono text-slate-900 mt-0.5 block">{passRate}%</span>
          </div>
          <ShieldCheck className="w-5 h-5 text-blue-700" />
        </div>
      </div>

      {/* Operational Table Container */}
      <div className="portal-card overflow-hidden">
        {/* Table Filter Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-700">Filter Criteria:</span>
            {['ALL', 'COMPLIANT', 'ATTENTION'].map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`text-xs px-2.5 py-1 rounded font-medium transition-colors ${
                  filter === f
                    ? 'bg-[#0f243a] text-white'
                    : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <span className="text-xs text-slate-500 font-mono">
            Showing {filteredCriteria.length} of {eligibilityList.length} clauses
          </span>
        </div>

        {/* Dense Enterprise Table */}
        <div className="overflow-x-auto">
          <table className="portal-table">
            <thead>
              <tr>
                <th className="w-20">Code</th>
                <th className="w-2/5">Requirement Clause</th>
                <th className="w-32">Classification</th>
                <th>Evaluation & Benchmark Notes</th>
                <th className="w-28 text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredCriteria.length > 0 ? (
                filteredCriteria.map((item) => (
                  <tr key={item.id}>
                    <td className="font-mono text-xs font-semibold text-slate-800">
                      {item.code}
                    </td>
                    <td className="text-xs font-medium text-slate-900 leading-snug">
                      {item.clause}
                    </td>
                    <td className="text-xs text-slate-600">
                      {item.category}
                    </td>
                    <td className="text-xs text-slate-500 italic">
                      {item.notes}
                    </td>
                    <td className="text-right">
                      {item.status === 'Compliant' ? (
                        <Badge variant="success">Compliant</Badge>
                      ) : item.status === 'Attention' ? (
                        <Badge variant="warning">Review Needed</Badge>
                      ) : (
                        <Badge variant="danger">Disqualifier</Badge>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-8 text-center text-xs text-slate-500 font-mono">
                    No qualification criteria found matching filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-2">
        <Button variant="secondary" onClick={() => setCurrentStep(2)} icon={ArrowLeft}>
          Back to Manifest
        </Button>
        <Button variant="action" onClick={() => setCurrentStep(4)} icon={ArrowRight}>
          Proceed to Commercial & Risk Review
        </Button>
      </div>
    </div>
  );
}

export default Step3Eligibility;
