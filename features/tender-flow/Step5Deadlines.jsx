'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Calendar, Clock, CheckCircle2, User, ArrowLeft, LayoutDashboard, FileText, Check, AlertCircle } from 'lucide-react';
import Button from '../../components/Button';
import Badge from '../../components/Badge';
import useTenderStore from '../../store/useTenderStore';
import { useToast } from '../../providers/ToastProvider';

export function Step5Deadlines() {
  const { extractedTender, setCurrentStep, resetUploadFlow, confirmAndRegisterTender } = useTenderStore();
  const { showToast } = useToast();
  const [isRegistering, setIsRegistering] = useState(false);

  if (!extractedTender) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-mono font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 uppercase">
              Phase 5 of 5
            </span>
            <span className="text-xs text-slate-500 font-medium">Chronological Milestones & Task Delegation</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Procurement Milestones & Submission Deadlines
          </h2>
        </div>

        <div className="portal-card p-12 text-center space-y-4 bg-slate-50/50">
          <div className="w-12 h-12 rounded bg-slate-100 border border-slate-300 flex items-center justify-center mx-auto text-slate-500">
            <Calendar className="w-6 h-6" />
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

  const isRegistered = extractedTender?.isRegistered === true || extractedTender?.tender?.status === 'Active';
  const deadlines = extractedTender?.rawAnalysis?.deadlines || [];

  const handleRegister = async () => {
    try {
      setIsRegistering(true);
      await confirmAndRegisterTender();
      showToast('Tender officially registered in Active Procurement Registry.', 'success');
    } catch (err) {
      showToast(err.message || 'Failed to register tender in database', 'error');
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Section Header */}
      <div className="border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[11px] font-mono font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 uppercase">
            Phase 5 of 5
          </span>
          <span className="text-xs text-slate-500 font-medium">Chronological Milestones & Task Delegation</span>
        </div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">
          Procurement Milestones & Submission Deadlines
        </h2>
        <p className="mt-1 text-xs text-slate-600">
          Statutory submission deadlines have been indexed and assigned to designated proposal team leads for pre-submission compliance.
        </p>
      </div>

      {/* Confirmation / Pending Status Banner */}
      {isRegistered ? (
        <div className="p-4 bg-emerald-50 border border-emerald-300 rounded flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
            <div>
              <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wider">
                Ingestion Dossier Successfully Verified & Cataloged
              </h4>
              <p className="text-xs text-emerald-800 mt-0.5">
                All 5 phases of extraction and milestone assignments are officially committed to the Active Procurement Registry.
              </p>
            </div>
          </div>
          <Badge variant="success">OFFICIALLY REGISTERED</Badge>
        </div>
      ) : (
        <div className="p-4 bg-amber-50 border border-amber-300 rounded flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-amber-700 shrink-0" />
            <div>
              <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider">
                Pending Official Registration
              </h4>
              <p className="text-xs text-amber-800 mt-0.5">
                All 5 ingestion phases reviewed. Click &quot;Complete Ingestion &amp; Register Tender&quot; below to record this solicitation into the database.
              </p>
            </div>
          </div>
          <Badge variant="warning">PENDING CONFIRMATION</Badge>
        </div>
      )}

      {/* Milestones Data Table */}
      <div className="portal-card overflow-hidden">
        <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
            Critical Solicitation Timetable
          </span>
          <span className="text-xs text-slate-500 font-mono">
            {deadlines.length} Milestones Identified
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="portal-table">
            <thead>
              <tr>
                <th className="w-12">#</th>
                <th className="w-2/5">Milestone Event</th>
                <th className="w-28">Cutoff Date</th>
                <th>RFP Reference</th>
                <th>Assigned Action Officer</th>
                <th className="w-24 text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {deadlines.length > 0 ? (
                deadlines.map((dl, index) => {
                  const isCritical = dl.priority === 'Critical';

                  return (
                    <tr key={index}>
                      <td className="font-mono text-xs text-slate-500">
                        {String(index + 1).padStart(2, '0')}
                      </td>
                      <td className="text-xs font-semibold text-slate-900">
                        {dl.title}
                      </td>
                      <td className="font-mono text-xs font-semibold text-slate-800">
                        {dl.date}
                      </td>
                      <td className="text-xs text-slate-600">
                        {dl.clause || 'RFP General Section'}
                      </td>
                      <td className="text-xs text-slate-700 font-medium">
                        {dl.assignedTo || 'Proposal Team'}
                      </td>
                      <td className="text-right">
                        <Badge variant={isCritical ? 'danger' : 'primary'}>
                          {isCritical ? 'Critical' : 'Scheduled'}
                        </Badge>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-xs text-slate-500 font-mono">
                    No explicit deadline events or milestones detected in document text.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Final Action Bar */}
      <div className="p-4 bg-white border border-slate-200 rounded flex flex-col sm:flex-row items-center justify-between gap-4">
        {!isRegistered ? (
          <>
            <Button variant="secondary" onClick={() => setCurrentStep(4)} icon={ArrowLeft}>
              Back to Parameters
            </Button>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={resetUploadFlow}
                className="text-xs px-3 py-1.5 rounded border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-medium transition-colors"
              >
                Discard Dossier
              </button>
              <Button
                size="md"
                variant="action"
                isLoading={isRegistering}
                onClick={handleRegister}
                icon={CheckCircle2}
                className="bg-emerald-700 hover:bg-emerald-800 text-white border-emerald-800"
              >
                {isRegistering ? 'Registering Tender...' : 'Complete Ingestion & Register Tender'}
              </Button>
            </div>
          </>
        ) : (
          <>
            <Button
              type="button"
              variant="secondary"
              onClick={resetUploadFlow}
              icon={ArrowLeft}
            >
              Ingest Another Tender
            </Button>

            <div className="flex items-center gap-2">
              <Link href="/tenders">
                <Button size="md" variant="secondary" icon={FileText}>
                  View in Tender Registry
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button size="md" variant="action" icon={LayoutDashboard}>
                  Return to Executive Dashboard
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Step5Deadlines;

