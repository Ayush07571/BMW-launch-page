'use client';

import React, { useEffect, useRef } from 'react';
import { useMotionValue, useSpring, useInView, motion } from 'framer-motion';

interface DataCounterProps {
  value: number;
  decimals?: number;
  suffix?: string;
  duration?: number;
}

const DataCounter: React.FC<DataCounterProps> = ({ 
  value, 
  decimals = 0, 
  suffix = "", 
  duration = 2 
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
  });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Intl.NumberFormat("en-US", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        }).format(latest) + suffix;
      }
    });
  }, [springValue, decimals, suffix]);

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    />
  );
};

export default DataCounter;
