'use client';

import React, { useEffect, useRef, useState } from 'react';
import NavBar from '@/components/NavBar';
import HeroCanvas from '@/components/HeroCanvas';
import SplitText from '@/components/SplitText';
import SpecsGrid from '@/components/SpecsGrid';
import ParallaxImage from '@/components/ParallaxImage';
import SectionDivider from '@/components/SectionDivider';
import BlueprintHUD from '@/components/BlueprintHUD';

// --- Sub-components for Page ---

const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref}
      className="transition-all duration-[1200ms] ease-out-expo"
      style={{
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
        opacity: isVisible ? 1 : 0,
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  );
};

const HeritageSection = () => (
  <section id="heritage" className="py-60 px-12 bg-bg relative overflow-hidden">
    {/* Large Background Year (Asymmetric) */}
    <div className="absolute top-20 -left-10 opacity-5 select-none pointer-events-none">
      <span className="font-display font-light text-[240px] md:text-[320px] text-white leading-none">
        1972
      </span>
    </div>

    <div className="max-w-7xl mx-auto relative grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
      {/* Editorial Headline (Floating Left) */}
      <div className="md:col-span-5 pt-20">
        <SplitText 
          text="Half A Century Of Obsession" 
          className="font-display font-semibold text-5xl md:text-7xl text-white uppercase tracking-widest leading-[1.1]"
        />
        <div className="w-20 h-[1px] bg-accent mt-12 mb-12" />
        <FadeIn delay={400}>
          <p className="font-body font-light text-lg text-muted leading-[1.9] max-w-sm">
            Founded in 1972, BMW M GmbH was the response to a growing hunger for race-bred performance on public roads.
          </p>
        </FadeIn>
      </div>

      {/* Hero Heritage Image (Offset Right) */}
      <div className="md:col-span-7 md:translate-y-20 relative">
        <FadeIn delay={200}>
          <div className="relative group">
            <div className="absolute -inset-4 border border-white/5 group-hover:border-accent/20 transition-colors duration-700 -z-10" />
            <ParallaxImage 
              src="/heritage-killer.png" 
              alt="BMW M4 Aggressive Front View" 
            />
          </div>
        </FadeIn>
        
        {/* Floating Caption (Overlapping) */}
        <div className="absolute -bottom-20 -left-20 max-w-xs hidden md:block">
          <FadeIn delay={600}>
            <div className="bg-bg/80 backdrop-blur-xl p-10 border-l-2 border-accent shadow-2xl">
              <span className="font-body text-[10px] tracking-[0.4em] uppercase text-accent mb-4 block">Genesis</span>
              <p className="font-body font-light text-sm text-fg leading-relaxed">
                What began with the legendary M1 has evolved into the M4 Competition — a synthesis of raw mechanical power and surgical precision.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>

    {/* Floating Detail Text (Asymmetric Right) */}
    <div className="mt-60 md:mt-0 md:absolute md:bottom-20 md:right-20 max-w-sm text-right">
      <FadeIn delay={800}>
        <p className="font-body font-light text-sm text-subtle tracking-widest uppercase mb-4">
          Physics Dictates. Tradition Binds.
        </p>
        <div className="w-12 h-[1px] bg-white/20 inline-block" />
      </FadeIn>
    </div>
  </section>
);

const EngineeringSection = () => (
  <section id="engineering" className="py-40 px-12 bg-bg">
    <div className="flex flex-col gap-12">
      <SplitText 
        text="The Core Of The Machine" 
        className="font-display font-semibold text-4xl md:text-6xl text-white uppercase tracking-widest text-center mb-12"
      />
      <FadeIn delay={200}>
        <div className="max-w-5xl mx-auto w-full relative group">
          <BlueprintHUD />
          <ParallaxImage 
            src="/hero-car-v3.png" 
            revealSrc="/hero-car-interior-v3.png"
            alt="BMW M4 Engineering" 
          />
        </div>
      </FadeIn>
      <FadeIn delay={400}>
        <div className="flex justify-center mt-12">
          <p className="font-body font-light text-sm text-subtle tracking-[0.3em] uppercase">
            Hover to Reveal Internal Components
          </p>
        </div>
      </FadeIn>
    </div>
  </section>
);

const MaterialStory = () => {
  const materials = [
    { name: "Frozen Black Metallic", desc: "A light-absorbing finish that emphasizes the aggressive musculature of the body panels." },
    { name: "Carbon-Fibre Weave", desc: "Weight reduction without compromise. Hand-laid structural integrity at the highest level." },
    { name: "Cognac Merino Leather", desc: "Supple, top-grain hide tanned with natural extracts. Luxury that endures the lateral Gs." },
  ];

  return (
    <section className="py-40 px-12 bg-bg">
      <SplitText 
        text="Frozen Black. Carbon Weave. Cognac Within." 
        className="font-display font-semibold text-3xl md:text-5xl text-white mb-20 uppercase tracking-widest text-center"
      />
      <div className="flex flex-col gap-4">
        {materials.map((m, i) => (
          <div 
            key={i}
            className="group relative h-[120px] hover:h-[180px] transition-all duration-700 ease-out-expo border-b border-white/5 flex items-center px-8 overflow-hidden"
          >
            <div className="absolute left-0 top-0 w-0 h-full bg-accent group-hover:w-1 transition-all duration-500" />
            <div className="flex w-full justify-between items-center">
              <span className="font-body font-normal text-xl md:text-2xl text-fg">{m.name}</span>
              <span className="font-body font-light text-xs md:text-sm text-subtle tracking-widest uppercase text-right max-w-xs">
                {m.desc}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const EditorialQuote = () => (
  <section className="py-60 px-12 bg-bg flex flex-col items-center text-center">
    <div className="w-20 h-[1px] bg-accent mb-12" />
    <FadeIn>
      <blockquote className="font-display italic text-3xl md:text-5xl text-fg max-w-4xl leading-tight">
        "It is not enough to go fast. You must feel it in the spine."
      </blockquote>
      <cite className="block mt-12 font-body font-light text-[11px] tracking-[0.5em] uppercase text-subtle not-italic">
        — BMW M GmbH, Munich
      </cite>
    </FadeIn>
  </section>
);

const FinalCTA = () => (
  <section id="configure" className="py-40 px-12 bg-bg flex flex-col items-center text-center">
    <SplitText 
      text="Your M4 Awaits." 
      className="font-display font-semibold text-5xl md:text-7xl text-white mb-6 uppercase tracking-[0.2em]"
    />
    <FadeIn delay={200}>
      <p className="font-display italic text-xl md:text-2xl text-muted mb-16">
        Built to order. Delivered to obsession.
      </p>
    </FadeIn>
    <FadeIn delay={400}>
      <div className="flex flex-col md:flex-row gap-8">
        <a 
          href="/configure"
          className="bg-accent text-bg px-12 py-5 font-body font-semibold text-[14px] tracking-[0.4em] uppercase hover:scale-[1.03] hover:shadow-[0_0_32px_rgba(227,0,15,0.3)] transition-all duration-500 inline-block"
        >
          Build & Price
        </a>
        <a 
          href="/test-drive"
          className="border border-accent text-fg px-12 py-5 font-body font-semibold text-[14px] tracking-[0.4em] uppercase backdrop-blur-md hover:scale-[1.03] hover:shadow-[0_0_32px_rgba(227,0,15,0.3)] transition-all duration-500 inline-block"
        >
          Book a Test Drive
        </a>
      </div>
    </FadeIn>
  </section>
);

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <NavBar />
      <HeroCanvas />
      
      <SectionDivider />
      <HeritageSection />
      
      <SectionDivider />
      <EngineeringSection />
      
      <SectionDivider />
      <SpecsGrid />
      
      <SectionDivider />
      <MaterialStory />
      
      <SectionDivider />
      <EditorialQuote />
      
      <SectionDivider />
      <FinalCTA />
      
      <footer className="py-20 px-12 bg-bg text-center border-t border-white/5">
        <span className="font-body font-light text-[10px] tracking-[0.5em] uppercase text-subtle">
          &copy; 2024 BMW M GMBH. ALL RIGHTS RESERVED.
        </span>
      </footer>
    </main>
  );
}
