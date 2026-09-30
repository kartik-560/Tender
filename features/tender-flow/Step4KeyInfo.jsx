'use client';

import React from 'react';
import { DollarSign, FileCheck, ArrowRight, ArrowLeft, ShieldAlert } from 'lucide-react';
import Button from '../../components/Button';
import RiskGauge from '../../components/RiskGauge';
import Badge from '../../components/Badge';
import useTenderStore from '../../store/useTenderStore';

export default function Step4KeyInfo() {
  const { extractedTender, setCurrentStep } = useTenderStore();

  if (!extractedTender) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-mono font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 uppercase">
              Phase 4 of 5
            </span>
            <span className="text-xs text-slate-500 font-medium">Commercial Parameters & Risk Assessment</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Commercial, Contractual & Risk Extraction
          </h2>
        </div>

        <div className="portal-card p-12 text-center space-y-4 bg-slate-50/50">
          <div className="w-12 h-12 rounded bg-slate-100 border border-slate-300 flex items-center justify-center mx-auto text-slate-500">
            <ShieldAlert className="w-6 h-6" />
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

  const tender = extractedTender?.tender;
  const raw = extractedTender?.rawAnalysis;

  const riskScore = typeof tender?.riskScore === 'number' ? tender.riskScore : (raw?.riskScore || 1.0);
  const riskReasoning = raw?.riskReasoning || 'Risk score evaluated against document terms and penalty clauses.';

  const keyFacts = raw?.keyInformation || [];
  const complianceClauses = raw?.complianceRequirements || [];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Section Header */}
      <div className="border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[11px] font-mono font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 uppercase">
            Phase 4 of 5
          </span>
          <span className="text-xs text-slate-500 font-medium">Commercial Parameters & Risk Assessment</span>
        </div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">
          Commercial, Contractual & Risk Extraction
        </h2>
        <p className="mt-1 text-xs text-slate-600">
          Evaluates contract type, liability benchmarks, and automated penalty scoring derived from RFP clauses.
        </p>
      </div>

      {/* Formal Risk Score Review Panel */}
      <div className="portal-card p-5 bg-slate-50/50 border border-slate-300">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Automated Risk Scoring & Liability Analysis
              </span>
              <Badge variant={riskScore >= 3.8 ? 'danger' : 'warning'}>
                {riskScore >= 3.8 ? 'High Risk Profile' : 'Moderate Risk Profile'}
              </Badge>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              {riskReasoning}
            </p>
          </div>

          <div className="p-3 bg-white border border-slate-200 rounded shrink-0">
            <RiskGauge score={riskScore} />
          </div>
        </div>
      </div>

      {/* Commercial & Compliance Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Commercial Specifications */}
        <div className="portal-card p-4 space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
            <DollarSign className="w-4 h-4 text-slate-700" />
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Commercial & Contractual Terms
            </h3>
          </div>
          <div className="space-y-2">
            {keyFacts.length > 0 ? (
              keyFacts.map((fact, index) => (
                <div
                  key={index}
                  className="p-2.5 bg-slate-50 border border-slate-200 rounded flex flex-col justify-between text-xs"
                >
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    {fact.label}
                  </span>
                  <span className="font-semibold text-slate-900 mt-0.5">
                    {fact.value}
                  </span>
                </div>
              ))
            ) : (
              <div className="p-4 bg-slate-50 border border-slate-200 rounded text-center text-xs text-slate-500 font-mono">
                No explicit commercial parameters detected.
              </div>
            )}
          </div>
        </div>

        {/* Mandatory Compliance Checkpoints */}
        <div className="portal-card p-4 space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
            <FileCheck className="w-4 h-4 text-slate-700" />
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Mandatory Compliance Mandates
            </h3>
          </div>
          <div className="space-y-2">
            {complianceClauses.length > 0 ? (
              complianceClauses.map((clauseItem, idx) => (
                <div
                  key={idx}
                  className="p-2.5 bg-slate-50 border border-slate-200 rounded space-y-1 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-slate-700">
                      MANDATE-{(idx + 1).toString().padStart(2, '0')}
                    </span>
                    <Badge variant={clauseItem.status === 'Critical' ? 'danger' : 'success'}>
                      {clauseItem.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-700 leading-snug">
                    {clauseItem.clause}
                  </p>
                </div>
              ))
            ) : (
              <div className="p-4 bg-slate-50 border border-slate-200 rounded text-center text-xs text-slate-500 font-mono">
                No explicit compliance mandates isolated.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-2">
        <Button variant="secondary" onClick={() => setCurrentStep(3)} icon={ArrowLeft}>
          Back to Eligibility
        </Button>
        <Button variant="action" onClick={() => setCurrentStep(5)} icon={ArrowRight}>
          Proceed to Milestone Schedule
        </Button>
      </div>
    </div>
  );
}
