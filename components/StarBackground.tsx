'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from '@/lib/hooks/useTheme';

export function StarBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  // We only show stars if the theme is dark, or by default if the user prefers their theme dominant.
  // Actually, since their theme is dominant, we can check if it's dark to render stars.
  // But let's just render it. If it's light theme, we could just clear it or draw faint dots.
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let stars: Array<{ x: number, y: number, r: number, a: number, speed: number, phase: number }> = [];
    let animationFrameId: number;
    let t = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initStars = () => {
      const starCount = Math.floor((window.innerWidth * window.innerHeight) / 4000); // responsive count
      stars = Array.from({ length: Math.min(starCount, 300) }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.2 + 0.2, // Tiny stars
        a: Math.random(),
        speed: Math.random() * 0.05 + 0.01,
        phase: Math.random() * Math.PI * 2
      }));
    };

    const drawStars = () => {
      // Clear canvas with transparent
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const isLight = theme === 'light';

      stars.forEach(s => {
        // Opacity pulsing
        const alpha = s.a * (0.3 + 0.7 * Math.abs(Math.sin(t * s.speed + s.phase)));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        
        // Very subtle blue-ish/white glow for stars
        if (isLight) {
          ctx.fillStyle = `rgba(100, 100, 200, ${alpha * 0.5})`; // Faint dark blue for light mode
        } else {
          ctx.fillStyle = `rgba(200, 200, 255, ${alpha * 0.8})`; // Bright for dark
        }
        
        ctx.fill();
        
        // Move stars slowly upwards for a gentle floating effect
        s.y -= s.speed * 5;
        if (s.y < 0) s.y = canvas.height;
      });

      t++;
      animationFrameId = requestAnimationFrame(drawStars);
    };

    window.addEventListener('resize', () => {
      resize();
      initStars();
    });

    resize();
    initStars();
    drawStars();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  // The cosmic radial gradient overlay.
  const gradientOverlay = theme === 'light' 
    ? 'none' 
    : 'radial-gradient(circle at 10% 20%, rgba(155, 92, 246, 0.05) 0%, transparent 40%), radial-gradient(circle at 90% 80%, rgba(74, 108, 247, 0.05) 0%, transparent 40%)';

  return (
    <>
      <div 
        className="fixed inset-0 z-[-2] pointer-events-none transition-colors duration-700" 
        style={{ 
          background: theme === 'light' ? 'var(--bg-light)' : 'var(--void)'
        }}
      />
      <div 
        className="fixed inset-0 z-[-1] pointer-events-none transition-opacity duration-700" 
        style={{ background: gradientOverlay }}
      />
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 0 }} // Put stars right behind the main content (which is wrapped naturally in z-10 or default stacking)
      />
    </>
  );
}
