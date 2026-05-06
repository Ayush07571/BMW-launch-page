'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const BlueprintHUD = () => {
  const [coords, setCoords] = useState({ x: '48.1351° N', y: '11.5820° E' });

  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly jitter coords for effect
      const jitter = () => (Math.random() * 0.001).toFixed(4);
      setCoords({
        x: `48.${1351 + Math.floor(Math.random() * 10)}° N`,
        y: `11.${5820 + Math.floor(Math.random() * 10)}° E`,
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
      {/* Scanning Horizontal Line */}
      <motion.div 
        initial={{ top: "-10%" }}
        animate={{ top: "110%" }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 w-full h-[1px] bg-accent/30 shadow-[0_0_15px_rgba(227,0,15,0.5)]"
      />

      {/* Crosshair (Top Left) */}
      <div className="absolute top-10 left-10 flex flex-col gap-2">
        <div className="flex gap-2">
          <div className="w-4 h-[1px] bg-accent" />
          <div className="w-[1px] h-4 bg-accent" />
        </div>
        <span className="font-mono text-[9px] text-accent/60 tracking-widest uppercase">
          Scan: Active
        </span>
      </div>

      {/* Dynamic Coords (Bottom Right) */}
      <div className="absolute bottom-10 right-10 text-right">
        <div className="font-mono text-[10px] text-accent tracking-tighter mb-1">
          LOC: {coords.x} / {coords.y}
        </div>
        <div className="font-mono text-[8px] text-subtle tracking-widest uppercase">
          Precision Engineering Division
        </div>
      </div>

      {/* Corner Brackets */}
      <div className="absolute top-0 left-0 w-20 h-20 border-t border-l border-white/10" />
      <div className="absolute top-0 right-0 w-20 h-20 border-t border-r border-white/10" />
      <div className="absolute bottom-0 left-0 w-20 h-20 border-b border-l border-white/10" />
      <div className="absolute bottom-0 right-0 w-20 h-20 border-b border-r border-white/10" />

      {/* Floating Mechanical Specs */}
      <motion.div 
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-10 text-right hidden md:block"
      >
        <span className="font-mono text-[9px] text-white/40 block mb-2 tracking-[0.3em] uppercase">Tolerance Check</span>
        <span className="font-mono text-xs text-white/80 block">0.002mm ADJ.</span>
      </motion.div>
    </div>
  );
};

export default BlueprintHUD;
