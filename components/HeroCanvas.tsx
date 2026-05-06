'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import NextImage from 'next/image';
import Link from 'next/link';
import ParticleLayer from './ParticleLayer';
import BlueprintHUD from './BlueprintHUD';

const TOTAL_FRAMES = 240;
const FRAME_PATH = (index: number) => `/frames/frame-${index.toString().padStart(3, '0')}.webp`;

const HeroCanvas = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const prevFrameRef = useRef<number>(-1);

  // Preload logic
  useEffect(() => {
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    const onLoad = () => {
      loadedCount++;
      const progress = Math.round((loadedCount / TOTAL_FRAMES) * 100);
      setLoadProgress(progress);
      if (loadedCount === TOTAL_FRAMES) {
        setIsLoaded(true);
        // Initial draw
        drawFrame(TOTAL_FRAMES);
      }
    };

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new (window.Image as any)();
      img.src = FRAME_PATH(i);
      img.onload = onLoad;
      img.onerror = onLoad;
      images.push(img);
    }
    imagesRef.current = images;
  }, []);

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[index - 1];
    if (!img) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    
    if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
    }

    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;
    
    let drawWidth, drawHeight, offsetX, offsetY;

    if (canvasRatio > imgRatio) {
      drawWidth = canvas.width;
      drawHeight = canvas.width / imgRatio;
      offsetX = 0;
      offsetY = (canvas.height - drawHeight) / 2;
    } else {
      drawHeight = canvas.height;
      drawWidth = canvas.height * imgRatio;
      offsetY = 0;
      offsetX = (canvas.width - drawWidth) / 2;
    }

    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const overscale = 1.05;
    const finalWidth = drawWidth * overscale;
    const finalHeight = drawHeight * overscale;
    const finalX = offsetX - (finalWidth - drawWidth) / 2;
    const finalY = offsetY - (finalHeight - drawHeight) / 2;

    ctx.drawImage(img, finalX, finalY, finalWidth, finalHeight);
    prevFrameRef.current = index;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalHeight = containerRef.current.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const progress = Math.min(Math.max(scrolled / totalHeight, 0), 1);
      
      setScrollProgress(progress);

      if (isLoaded) {
        const frameIndex = Math.max(1, Math.min(TOTAL_FRAMES, Math.floor(TOTAL_FRAMES - progress * (TOTAL_FRAMES - 1))));
        if (frameIndex !== prevFrameRef.current) {
          requestAnimationFrame(() => drawFrame(frameIndex));
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', () => {
      if (prevFrameRef.current !== -1) drawFrame(prevFrameRef.current);
    });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoaded, drawFrame]);

  const getOpacity = (start: number, end: number, current: number) => {
    if (current < start) return 0;
    if (current > end) return 0;
    const mid = (start + end) / 2;
    const range = (end - start) / 2;
    const dist = Math.abs(current - mid);
    const fadeRange = range * 0.2;
    if (dist < range - fadeRange) return 1;
    return 1 - (dist - (range - fadeRange)) / fadeRange;
  };

  return (
    <section ref={containerRef} className="relative h-[500vh] bg-bg">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-bg">
        {/* High-Res Green Hero (Static Start) */}
        <div 
          className="absolute inset-0 z-[5] transition-opacity duration-1000"
          style={{ opacity: scrollProgress < 0.05 ? 1 : 0 }}
        >
          <NextImage 
            src="/hero-car-v4.png"
            alt="BMW M4 Competition"
            fill
            className="object-cover scale-105"
            priority
          />
        </div>

        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover relative z-0"
        />

        {/* Hero Blueprint HUD */}
        <div 
          className="absolute inset-0 z-20 pointer-events-none transition-opacity duration-700"
          style={{ opacity: scrollProgress < 0.12 ? 1 : 0 }}
        >
          <BlueprintHUD />
        </div>

        <ParticleLayer progress={scrollProgress} />

        <div className="absolute inset-0 bg-gradient-to-b from-bg/40 via-transparent to-bg/40 pointer-events-none z-[10]" />

        {/* Preloader */}
        {!isLoaded && (
          <div className="absolute inset-0 z-[60] bg-bg flex flex-col items-center justify-center transition-opacity duration-1000">
            <div className="flex flex-col items-center gap-6">
              <span className="font-display font-semibold text-6xl tracking-[0.4em] text-white">M4</span>
              <div className="w-48 h-[1px] bg-subtle/30 overflow-hidden relative">
                <div 
                  className="absolute left-0 top-0 h-full bg-accent transition-all duration-300"
                  style={{ width: `${loadProgress}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Overlay Text System */}
        <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center text-center px-6 z-[100]">
          <div 
            style={{ 
              opacity: getOpacity(0, 0.2, scrollProgress),
              transform: `translateY(${(0.1 - scrollProgress) * 60 - 120}px)` 
            }}
            className="transition-opacity duration-0 absolute top-[35%] w-full"
          >
            <div className="relative inline-block py-12 px-24">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.8)_0%,transparent_70%)] pointer-events-none -z-10 scale-150" />
              <h1 className="font-display font-semibold text-5xl md:text-[96px] tracking-[0.08em] uppercase text-white leading-tight drop-shadow-[0_4px_32px_rgba(0,0,0,0.9)]">
                ENGINEERED<br />BEYOND REASON
              </h1>
              <p className="font-body font-light text-[11px] md:text-[13px] tracking-[0.5em] uppercase text-muted mt-6 drop-shadow-lg">
                BMW M4 Competition · 2024
              </p>
            </div>
          </div>

          <div 
            style={{ 
              opacity: getOpacity(0.25, 0.45, scrollProgress),
              transform: `translateY(120px)`
            }}
            className="transition-opacity duration-0 absolute bottom-[35%] w-full"
          >
            <div className="relative inline-block py-12 px-24">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.7)_0%,transparent_70%)] pointer-events-none -z-10 scale-150" />
              <h2 className="font-display italic text-3xl md:text-[48px] text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
                510 horsepower. Zero compromises.
              </h2>
            </div>
          </div>

          <div 
            style={{ opacity: getOpacity(0.7, 0.9, scrollProgress) }}
            className="absolute inset-0 w-full h-full hidden md:flex items-center justify-between px-10 transition-opacity duration-0"
          >
            <div className="flex flex-col gap-16 text-left">
              {["S58 Twin-Turbo Inline-6", "M Compound Brake Caliper", "Carbon-Fibre Roof Panel"].map((label) => (
                <div key={label} className="flex items-center gap-6 group relative py-2">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,rgba(0,0,0,0.6)_0%,transparent_80%)] pointer-events-none -z-10" />
                  <div className="w-[2px] h-10 bg-accent shadow-[0_0_15px_rgba(227,0,15,0.6)]" />
                  <span className="font-body font-normal text-[12px] tracking-[0.45em] uppercase text-white backdrop-blur-md bg-bg/20 py-2 px-4 rounded-sm border-l border-accent/20">
                    {label}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-16 text-right">
              {["19″ M Forged Alloy Wheel", "Titanium Active Exhaust", "Cognac Merino Interior"].map((label) => (
                <div key={label} className="flex items-center gap-6 group justify-end relative py-2">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_right,rgba(0,0,0,0.6)_0%,transparent_80%)] pointer-events-none -z-10" />
                  <span className="font-body font-normal text-[12px] tracking-[0.45em] uppercase text-white backdrop-blur-md bg-bg/20 py-2 px-4 rounded-sm border-r border-accent/20">
                    {label}
                  </span>
                  <div className="w-[2px] h-10 bg-accent shadow-[0_0_15px_rgba(227,0,15,0.6)]" />
                </div>
              ))}
            </div>
          </div>

          <div 
            style={{ opacity: getOpacity(0.88, 1, scrollProgress) }}
            className="transition-opacity duration-0"
          >
            <a 
              href="#configure"
              className="pointer-events-auto backdrop-blur-xl border border-accent/50 px-12 py-5 font-body text-[14px] tracking-[0.4em] uppercase text-white hover:bg-accent hover:text-bg transition-all duration-500 shadow-2xl inline-block cursor-pointer"
            >
              Configure Your M4
            </a>
          </div>

          <div 
            style={{ opacity: scrollProgress < 0.03 ? 1 : 0 }}
            className="absolute bottom-12 flex flex-col items-center gap-4 transition-opacity duration-500"
          >
            <span className="font-body font-light text-[10px] tracking-[0.5em] uppercase text-subtle">
              Scroll to Explore
            </span>
            <div className="w-[1px] h-12 bg-subtle/30 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-accent animate-scroll-indicator" />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-indicator {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .animate-scroll-indicator {
          animation: scroll-indicator 2s cubic-bezier(0.16, 1, 0.3, 1) infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroCanvas;
