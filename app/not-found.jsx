import Link from 'next/link';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import Button from '../components/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col items-center justify-center p-6 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded bg-slate-100 border border-slate-300 text-slate-700 mb-4">
        <AlertCircle className="h-6 w-6" />
      </div>
      <h1 className="text-xl font-bold text-slate-900 tracking-tight">404 - Record or Resource Not Located</h1>
      <p className="mt-2 text-xs text-slate-600 max-w-sm leading-relaxed">
        The procurement file or intelligence module you requested is either not cataloged in the system or has been archived.
      </p>
      <div className="mt-5">
        <Link href="/dashboard">
          <Button variant="primary" icon={ArrowLeft}>
            Return to Executive Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}
