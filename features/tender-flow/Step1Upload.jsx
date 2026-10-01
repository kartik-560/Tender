'use client';

import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, ArrowRight, ShieldCheck, CheckCircle2, AlertTriangle } from 'lucide-react';
import Button from '../../components/Button';
import useTenderStore from '../../store/useTenderStore';
import { useToast } from '../../providers/ToastProvider';

export default function Step1Upload() {
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const { isAnalyzing, analysisProgress, uploadError, startAnalysis } = useTenderStore();
  const { showToast } = useToast();

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
        setSelectedFile(file);
      } else {
        showToast('Only standard PDF procurement files are accepted.', 'warning');
      }
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);
    }
  };

  const handleUploadSubmit = async () => {
    if (!selectedFile) {
      showToast('Select an RFP PDF document before proceeding.', 'warning');
      return;
    }

    try {
      showToast('Executing document parsing and intelligence extraction...', 'info');
      await startAnalysis(selectedFile);
      showToast('Tender successfully parsed and indexed.', 'success');
    } catch (err) {
      showToast(err.message || 'Ingestion failed', 'error');
    }
  };



  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Section Header */}
      {/* <div className="border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[11px] font-mono font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 uppercase">
            Phase 1 of 5
          </span>
          <span className="text-xs text-slate-500 font-medium">Document Ingestion & Text Indexing</span>
        </div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">
          Upload Procurement Solicitation Document
        </h2>
        <p className="mt-1 text-xs text-slate-600 leading-relaxed">
          Upload any official tender, RFP, or solicitation specification in PDF format. The system automatically segments clauses, evaluates mandatory eligibility conditions, calculates penalty risks, and maps submission timelines.
        </p>
      </div> */}

      {/* Upload Box */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !isAnalyzing && fileInputRef.current?.click()}
        className={`cursor-pointer rounded-md border-2 border-dashed p-8 text-center transition-colors ${
          isDragOver
            ? 'border-blue-600 bg-blue-50/50'
            : 'border-slate-300 bg-white hover:bg-slate-50/80'
        }`}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".pdf,application/pdf"
          className="hidden"
          disabled={isAnalyzing}
        />

        <div className="flex flex-col items-center">
          <div className="flex h-10 w-10 items-center justify-center rounded bg-slate-100 text-slate-600 border border-slate-200 mb-3">
            <UploadCloud className="h-5 w-5 text-slate-700" />
          </div>

          <p className="text-xs font-semibold text-slate-900">
            {selectedFile ? selectedFile.name : 'Select file or drag & drop tender PDF here'}
          </p>
          <p className="mt-1 text-[11px] text-slate-500">
            Official format: PDF (up to 30MB) • FedRAMP compliant document parsing
          </p>

          {selectedFile && (
            <div className="mt-3 flex items-center gap-2 px-2.5 py-1 rounded bg-slate-100 border border-slate-200 text-xs text-slate-700 font-mono">
              <FileText className="w-3.5 h-3.5 text-slate-500" />
              <span>{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</span>
              <span className="text-emerald-700 font-semibold">• Verification ready</span>
            </div>
          )}
        </div>
      </div>

      {/* Analysis Progress */}
      {isAnalyzing && (
        <div className="rounded-md border border-slate-200 bg-white p-4 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-800">
              Processing document streams and executing clause NLP...
            </span>
            <span className="font-mono text-slate-600 font-bold">{analysisProgress}%</span>
          </div>

          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-700 transition-all duration-300"
              style={{ width: `${analysisProgress}%` }}
            />
          </div>

          <div className="grid grid-cols-4 gap-2 pt-1 text-[10px] font-mono text-slate-500">
            <span className={analysisProgress >= 25 ? 'text-slate-800 font-semibold' : ''}>[1] PDF Parsing</span>
            <span className={analysisProgress >= 50 ? 'text-slate-800 font-semibold' : ''}>[2] Clause Matrix</span>
            <span className={analysisProgress >= 75 ? 'text-slate-800 font-semibold' : ''}>[3] Gemini Review</span>
            <span className={analysisProgress >= 95 ? 'text-slate-800 font-semibold' : ''}>[4] Risk Indexing</span>
          </div>
        </div>
      )}

      {/* Document Validation Alert */}
      {uploadError && (
        <div className="p-4 rounded-lg bg-red-50/90 border border-red-200 text-xs text-red-900 flex items-start gap-3 shadow-xs">
          <div className="p-1 rounded bg-red-100 text-red-700 shrink-0 mt-0.5">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div className="space-y-1">
            <p className="font-semibold text-red-900">Document Ingestion Rejected</p>
            <p className="text-red-700 leading-relaxed">{uploadError}</p>
            <p className="text-[11px] text-red-600 font-mono pt-1">
              Authorized Formats: Official government/enterprise RFPs, tenders, RFQs, or procurement solicitation packages.
            </p>
          </div>
        </div>
      )}

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <p className="text-xs text-slate-500">
          {selectedFile ? `Ready to parse ${selectedFile.name}` : 'Awaiting document selection'}
        </p>

        <Button
          size="md"
          variant="action"
          disabled={!selectedFile || isAnalyzing}
          isLoading={isAnalyzing}
          onClick={handleUploadSubmit}
          icon={ArrowRight}
        >
          {isAnalyzing ? 'Extracting...' : 'Initiate Analysis'}
        </Button>
      </div>
    </div>
  );
}
