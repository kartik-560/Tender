import React from 'react';
import { Check, Upload, FileText, CheckSquare, Layers, Calendar } from 'lucide-react';

const steps = [
  { id: 1, name: 'Upload Tender Document', short: 'Document Ingestion' },
  { id: 2, name: 'Document Ingestion Manifest', short: 'Manifest & Specs' },
  { id: 3, name: 'Eligibility & Compliance Matrix', short: 'Eligibility Check' },
  { id: 4, name: 'Commercial & Risk Parameters', short: 'Risk Analysis' },
  { id: 5, name: 'Milestone Schedule & Actions', short: 'Timeline & Tasks' },
];

export function StepIndicator({ currentStep, onSelectStep }) {
  return (
    <div className="w-full">
      <nav aria-label="Progress">
        <ol className="grid grid-cols-2 sm:grid-cols-5 gap-2 border-b border-slate-200 pb-4">
          {steps.map((step) => {
            const isCompleted = currentStep > step.id;
            const isCurrent = currentStep === step.id;

            return (
              <li key={step.id} className="relative">
                <button
                  type="button"
                  onClick={() => onSelectStep && onSelectStep(step.id)}
                  disabled={!isCompleted && !isCurrent}
                  className={`w-full text-left group transition-colors focus:outline-none ${
                    !isCompleted && !isCurrent ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded text-xs font-mono font-bold ${
                        isCompleted
                          ? 'bg-slate-800 text-white'
                          : isCurrent
                          ? 'bg-blue-700 text-white ring-2 ring-blue-200'
                          : 'bg-slate-100 text-slate-500 border border-slate-300'
                      }`}
                    >
                      {isCompleted ? <Check className="h-3.5 w-3.5 stroke-[2.5]" /> : step.id}
                    </span>
                    <div className="min-w-0">
                      <span
                        className={`block text-[10px] font-semibold uppercase tracking-wider ${
                          isCurrent ? 'text-blue-700' : isCompleted ? 'text-slate-700' : 'text-slate-400'
                        }`}
                      >
                        Step {step.id}
                      </span>
                      <span
                        className={`block text-xs font-medium truncate ${
                          isCurrent ? 'text-slate-900 font-bold' : isCompleted ? 'text-slate-600' : 'text-slate-400'
                        }`}
                      >
                        {step.short}
                      </span>
                    </div>
                  </div>

                  {/* Step progress bar beneath item */}
                  <div className="mt-2.5 h-1 w-full rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className={`h-full ${
                        isCompleted ? 'bg-slate-800' : isCurrent ? 'bg-blue-700' : 'bg-transparent'
                      }`}
                    />
                  </div>
                </button>
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}

export default StepIndicator;
