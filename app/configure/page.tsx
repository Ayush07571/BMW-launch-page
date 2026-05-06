'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import NavBar from '@/components/NavBar';

const OPTIONS = {
  Exterior: ['Frozen Black', 'Toronto Red', 'Isle of Man Green'],
  Interior: ['Cognac Merino', 'Black Extended', 'Silverstone/Black'],
  Performance: ['M Carbon Ceramic Brakes', 'M Driver\'s Package', 'M Precision Bar']
};

export default function ConfigurePage() {
  const [selected, setSelected] = useState<Record<string, string>>({
    Exterior: 'Frozen Black',
    Interior: 'Cognac Merino',
    Performance: 'M Carbon Ceramic Brakes'
  });

  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [isFinalized, setIsFinalized] = useState(false);

  if (isFinalized) {
    return (
      <main className="min-h-screen bg-bg flex flex-col items-center justify-center text-center px-12">
        <NavBar />
        <div className="max-w-2xl animate-in fade-in zoom-in duration-1000">
          <div className="w-20 h-20 border border-accent rounded-full flex items-center justify-center mx-auto mb-12">
            <div className="w-10 h-10 bg-accent rounded-full animate-pulse" />
          </div>
          <h1 className="font-display font-semibold text-5xl text-white uppercase tracking-widest mb-6">
            Specification Locked
          </h1>
          <p className="font-body font-light text-muted leading-relaxed mb-12">
            Your unique BMW M4 Competition specification has been recorded. Our team will contact you shortly to finalize the acquisition.
          </p>
          <div className="bg-white/5 border border-white/10 p-8 mb-12 text-left">
            {Object.entries(selected).map(([key, val]) => (
              <div key={key} className="flex justify-between py-3 border-b border-white/5 last:border-0">
                <span className="font-body text-[10px] tracking-widest uppercase text-subtle">{key}</span>
                <span className="font-body text-xs text-white uppercase">{val}</span>
              </div>
            ))}
          </div>
          <Link href="/" className="font-body text-[11px] tracking-[0.5em] uppercase text-accent border-b border-accent pb-2">
            Return to Experience
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-bg flex flex-col items-center justify-center text-center px-12 pt-32 pb-20">
      <NavBar />
      
      <div className="max-w-4xl w-full">
        <h1 className="font-display font-semibold text-6xl text-white uppercase tracking-widest mb-8">
          Configure Your M4
        </h1>
        <p className="font-body font-light text-muted max-w-lg mx-auto leading-relaxed mb-12">
          Every detail is yours to command. Select your preferences below to build your unique Competition spec.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {Object.keys(OPTIONS).map((category) => (
            <button 
              key={category}
              onClick={() => setActiveTab(activeTab === category ? null : category)}
              className={`border p-12 transition-all duration-500 text-left relative group ${
                activeTab === category ? 'border-accent bg-accent/5' : 'border-white/10 hover:border-white/30'
              }`}
            >
              <span className="font-body text-[10px] tracking-[0.4em] uppercase text-subtle mb-4 block">
                {category}
              </span>
              <span className="font-display text-2xl text-white italic block mb-2">
                {selected[category as keyof typeof selected]}
              </span>
              <span className="font-body text-[9px] tracking-[0.2em] uppercase text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                Change Selection
              </span>
            </button>
          ))}
        </div>

        {/* Options Panel */}
        <div className={`transition-all duration-700 overflow-hidden ${activeTab ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}`}>
          {activeTab && (
            <div className="border border-white/5 bg-white/[0.02] p-12 mb-16">
              <h3 className="font-display text-xl text-white uppercase tracking-widest mb-8">
                Select {activeTab}
              </h3>
              <div className="flex flex-wrap justify-center gap-6">
                {OPTIONS[activeTab as keyof typeof OPTIONS].map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setSelected({ ...selected, [activeTab]: option });
                      setActiveTab(null);
                    }}
                    className={`px-8 py-4 font-body text-[11px] tracking-[0.3em] uppercase border transition-all duration-300 ${
                      selected[activeTab] === option 
                        ? 'border-accent text-accent' 
                        : 'border-white/10 text-muted hover:border-white/40'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col items-center gap-8">
          <button 
            onClick={() => setIsFinalized(true)}
            className="bg-accent text-bg px-16 py-5 font-body font-bold text-[14px] tracking-[0.5em] uppercase hover:scale-[1.03] transition-all duration-500 shadow-[0_0_40px_rgba(227,0,15,0.2)]"
          >
            Finalize Specification
          </button>
          <Link href="/" className="font-body text-[11px] tracking-[0.5em] uppercase text-accent border-b border-accent pb-2">
            Back to Experience
          </Link>
        </div>
      </div>
    </main>
  );
}
