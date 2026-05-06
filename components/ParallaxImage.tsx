'use client';

import React, { useEffect, useRef, useState } from 'react';
import NextImage from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface ParallaxImageProps {
  src: string;
  revealSrc?: string;
  alt: string;
}

const ParallaxImage: React.FC<ParallaxImageProps> = ({ src, revealSrc, alt }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  // Motion values for smooth tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Spring physics for buttery smooth movement
  const springConfig = { damping: 40, stiffness: 200 };
  
  // Parallax offsets
  const parallaxX = useSpring(useMotionValue(0), springConfig);
  const parallaxY = useSpring(useMotionValue(0), springConfig);

  // Reactive clip-path string
  const clipPath = useTransform(
    [mouseX, mouseY],
    ([x, y]) => isHovering ? `circle(150px at ${x}% ${y}%)` : `circle(0px at ${x}% ${y}%)`
  );

  const cursorX = useTransform(mouseX, (x) => `${x}%`);
  const cursorY = useTransform(mouseY, (y) => `${y}%`);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      
      const x = ((e.clientX - left) / width) * 100;
      const y = ((e.clientY - top) / height) * 100;
      
      mouseX.set(x);
      mouseY.set(y);

      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const moveX = (e.clientX - centerX) / (width / 2);
      const moveY = (e.clientY - centerY) / (height / 2);
      
      parallaxX.set(moveX * 15);
      parallaxY.set(moveY * 15);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, parallaxX, parallaxY]);

  return (
    <div 
      ref={containerRef} 
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="relative w-full h-[500px] md:h-[750px] overflow-hidden bg-bg/50 rounded-sm cursor-none will-change-transform"
    >
      {/* Base Exterior Image */}
      <motion.div 
        className="absolute inset-0"
        style={{
          x: parallaxX,
          y: parallaxY,
          scale: 1.05,
        }}
      >
        <NextImage
          src={src}
          alt={alt}
          fill
          unoptimized
          className="object-contain object-center"
          sizes="100vw"
          priority
        />
      </motion.div>

      {/* Reveal Interior Image */}
      {revealSrc && (
        <motion.div 
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            x: parallaxX,
            y: parallaxY,
            scale: 1.05,
            clipPath: clipPath,
            WebkitClipPath: clipPath,
            backfaceVisibility: "hidden",
            transformStyle: "preserve-3d",
            willChange: "clip-path, transform"
          }}
        >
          <div className="absolute inset-0 scale-[1.001]">
            <NextImage
              src={revealSrc}
              alt={`${alt} interior`}
              fill
              unoptimized
              quality={100}
              className="object-contain object-center brightness-110 saturate-125"
              style={{ imageRendering: 'high-quality' } as any}
              sizes="100vw"
            />
          </div>
          
          {/* Subtle Border for the Reveal Circle */}
          <motion.div 
            className="absolute inset-0 border border-accent/40 rounded-full"
            style={{ clipPath }}
          />
        </motion.div>
      )}

      {/* High-Performance Reveal Lens (Custom Cursor) */}
      {revealSrc && isHovering && (
        <motion.div 
          className="absolute pointer-events-none z-20 border border-accent/40 rounded-full flex items-center justify-center"
          style={{
            width: '300px',
            height: '300px',
            left: cursorX,
            top: cursorY,
            x: "-50%",
            y: "-50%",
          }}
        >
          <div className="relative">
             <div className="absolute inset-0 bg-accent/5 blur-lg rounded-full" />
             <span className="relative font-body text-[9px] tracking-[0.4em] uppercase text-accent bg-bg/95 px-3 py-1.5 border border-accent/30 rounded-sm">
               X-Ray Active
             </span>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ParallaxImage;
