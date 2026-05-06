'use client';

import React, { useEffect, useRef } from 'react';

const ParticleLayer = ({ progress }: { progress: number }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<{ x: number; y: number; s: number; v: number }[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles.current = Array.from({ length: 50 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        s: Math.random() * 2 + 0.5,
        v: Math.random() * 200 + 100, // Velocity factor for parallax
      }));
    };

    init();
    window.addEventListener('resize', init);
    return () => window.removeEventListener('resize', init);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';

    particles.current.forEach((p) => {
      // Parallax effect: Y position depends on scroll progress and its unique velocity
      const yOffset = (progress * p.v) % canvas.height;
      const finalY = (p.y + yOffset) % canvas.height;
      
      ctx.beginPath();
      ctx.arc(p.x, finalY, p.s, 0, Math.PI * 2);
      ctx.fill();
    });
  }, [progress]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-[15] mix-blend-screen"
    />
  );
};

export default ParticleLayer;
