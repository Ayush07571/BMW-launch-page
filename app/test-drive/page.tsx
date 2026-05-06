'use client';

import Link from 'next/link';
import NavBar from '@/components/NavBar';

export default function TestDrivePage() {
  return (
    <main className="min-h-screen bg-bg flex flex-col items-center justify-center text-center px-12 pt-32">
      <NavBar />
      <h1 className="font-display font-semibold text-6xl text-white uppercase tracking-widest mb-8">
        Experience Obsession
      </h1>
      <p className="font-body font-light text-muted max-w-lg leading-relaxed mb-12">
        The M4 Competition cannot be explained. It must be felt. Book a slot at your nearest BMW M certified center.
      </p>
      <div className="w-full max-w-md bg-white/5 p-12 border border-white/10">
        <form className="flex flex-col gap-6">
          <input type="text" placeholder="FULL NAME" className="bg-transparent border-b border-white/20 py-4 font-body text-xs tracking-widest focus:border-accent outline-none text-white uppercase" />
          <input type="email" placeholder="EMAIL ADDRESS" className="bg-transparent border-b border-white/20 py-4 font-body text-xs tracking-widest focus:border-accent outline-none text-white uppercase" />
          <button className="bg-accent text-bg py-5 font-body font-bold text-[12px] tracking-[0.4em] uppercase mt-8 hover:scale-[1.02] transition-transform">
            Request Session
          </button>
        </form>
      </div>
      <Link href="/" className="mt-20 font-body text-[11px] tracking-[0.5em] uppercase text-accent border-b border-accent pb-2">
        Back to Experience
      </Link>
    </main>
  );
}
