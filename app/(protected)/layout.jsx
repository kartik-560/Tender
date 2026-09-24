'use client';

import React from 'react';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';

export default function ProtectedLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex">
      {/* Fixed Left Institutional Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 ml-60 flex flex-col min-h-screen overflow-x-hidden">
        <Navbar />
        <main className="flex-1 p-6 max-w-7xl w-full mx-auto space-y-6">
          {children}
        </main>
      </div>
    </div>
  );
}
