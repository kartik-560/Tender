'use client';

import React from 'react';
import StepIndicator from '@/features/tender-flow/StepIndicator';
import Step1Upload from '@/features/tender-flow/Step1Upload';
import Step2Documents from '@/features/tender-flow/Step2Documents';
import Step3Eligibility from '@/features/tender-flow/Step3Eligibility';
import Step4KeyInfo from '@/features/tender-flow/Step4KeyInfo';
import Step5Deadlines from '@/features/tender-flow/Step5Deadlines';
import useTenderStore from '@/store/useTenderStore';

export default function TenderUploadFlowPage() {
  const { currentStep, setCurrentStep } = useTenderStore();

  return (
    <div className="space-y-6">
      {/* Official Breadcrumb */}
      <div className="pb-2 border-b border-slate-200">
        <nav className="text-[11px] font-mono font-medium text-slate-500 uppercase tracking-wider mb-1">
          <span>Procurement Portal</span>
          <span className="mx-1.5 text-slate-400">/</span>
          <span className="text-slate-800 font-semibold">Document Ingestion Pipeline</span>
        </nav>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">
          5-Stage Tender Ingestion & Intelligence Pipeline
        </h1>
        <p className="text-xs text-slate-600 mt-0.5">
          Execute automated parsing, extraction, eligibility matrix validation, and deadline delegation.
        </p>
      </div>

      {/* 5-Step Stepper Navigation */}
      <div className="portal-card p-4">
        <StepIndicator currentStep={currentStep} onSelectStep={setCurrentStep} />
      </div>

      {/* Dynamic Step Body */}
      <div className="pt-2">
        {currentStep === 1 && <Step1Upload />}
        {currentStep === 2 && <Step2Documents />}
        {currentStep === 3 && <Step3Eligibility />}
        {currentStep === 4 && <Step4KeyInfo />}
        {currentStep === 5 && <Step5Deadlines />}
      </div>
    </div>
  );
}
