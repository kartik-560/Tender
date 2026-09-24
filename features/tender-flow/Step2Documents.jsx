'use client';

import React from 'react';
import { FileText, ExternalLink, ArrowRight, ArrowLeft, Shield, Building, HardDrive } from 'lucide-react';
import Button from '../../components/Button';
import useTenderStore from '../../store/useTenderStore';

export function Step2Documents() {
  const { extractedTender, setCurrentStep } = useTenderStore();

  const tender = extractedTender?.tender;
  const raw = extractedTender?.rawAnalysis;

  if (!tender) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-mono font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 uppercase">
              Phase 2 of 5
            </span>
            <span className="text-xs text-slate-500 font-medium">Ingestion Manifest & Verification</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Document Ingestion Manifest
          </h2>
        </div>

        <div className="portal-card p-12 text-center space-y-4 bg-slate-50/50">
          <div className="w-12 h-12 rounded bg-slate-100 border border-slate-300 flex items-center justify-center mx-auto text-slate-500">
            <FileText className="w-6 h-6" />
          </div>
          <div className="space-y-1 max-w-sm mx-auto">
            <h3 className="text-sm font-bold text-slate-900">No Document Ingested</h3>
            <p className="text-xs text-slate-500">
              Please upload and analyze an RFP solicitation document in Phase 1 before reviewing document parameters.
            </p>
          </div>
          <Button variant="action" onClick={() => setCurrentStep(1)} icon={ArrowLeft}>
            Return to Upload (Phase 1)
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Section Header */}
      <div className="border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[11px] font-mono font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 uppercase">
            Phase 2 of 5
          </span>
          <span className="text-xs text-slate-500 font-medium">Ingestion Manifest & Verification</span>
        </div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">
          Document Ingestion Manifest
        </h2>
        <p className="mt-1 text-xs text-slate-600">
          The document has been securely verified, parsed into structured tokens, and stored in the procurement repository.
        </p>
      </div>

      {/* Main Document Information Card */}
      <div className="portal-card p-5 space-y-5">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded bg-slate-100 border border-slate-300 text-slate-700">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">{tender.title}</h3>
              <p className="text-xs text-slate-500 mt-0.5 font-mono">
                {tender.fileName || 'tender-specification.pdf'} • {((tender.fileSize || 3500000) / (1024 * 1024)).toFixed(2)} MB
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2 py-1 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-mono font-semibold">
              INDEXED & ENCRYPTED
            </span>
            {tender.documentUrl && tender.documentUrl !== '#' && (
              <a
                href={tender.documentUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-white hover:bg-slate-50 text-xs text-slate-700 border border-slate-300 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                <span>View PDF Source</span>
              </a>
            )}
          </div>
        </div>

        {/* Structured Spec Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-3 bg-slate-50 border border-slate-200 rounded">
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">Document Length</span>
            <span className="mt-1 text-base font-bold font-mono text-slate-900 block">
              {tender.pageCount || 1} Pages
            </span>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded">
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">Issuing Authority</span>
            <span className="mt-1 text-xs font-semibold text-slate-800 block truncate">
              {tender.buyer || 'Undisclosed Buyer'}
            </span>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded">
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">Estimated Budget</span>
            <span className="mt-1 text-base font-bold font-mono text-slate-900 block">
              {tender.estimatedValue || 'Undisclosed'}
            </span>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded">
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">Security Level</span>
            <span className="mt-1 text-xs font-semibold text-slate-800 flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-blue-700" />
              <span>TLS 1.3 Restricted</span>
            </span>
          </div>
        </div>

        {/* Executive Scope & Objectives */}
        <div className="space-y-1.5 pt-2">
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Scope & Procurement Objectives (Extracted from Section 1)
          </h4>
          <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded border border-slate-200">
            {tender.summary || raw?.summary || 'No executive summary extracted for this solicitation.'}
          </p>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-2">
        <Button variant="secondary" onClick={() => setCurrentStep(1)} icon={ArrowLeft}>
          Back to Upload
        </Button>
        <Button variant="action" onClick={() => setCurrentStep(3)} icon={ArrowRight}>
          Review Eligibility Matrix
        </Button>
      </div>
    </div>
  );
}

export default Step2Documents;
