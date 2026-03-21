"use client";

import { Header } from '@/components/header';

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 lg:p-6">
        {children}
      </main>
    </div>
  );
}
