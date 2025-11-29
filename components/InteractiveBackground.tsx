import React, { useEffect, useRef } from 'react';

export const InteractiveBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    
    // Resize handler
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();

    // Particles
    const particles: Particle[] = [];
    const particleCount = Math.min(Math.floor(width * 0.15), 150); // Increased count slightly
    
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.8; // Slightly faster
        this.vy = (Math.random() - 0.5) * 0.8;
        this.size = Math.random() * 2.5 + 1.5; // Larger particles
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(52, 211, 153, 0.6)'; // Emerald-400, higher opacity (0.4 -> 0.6)
        ctx.fill();
      }
    }

    // Init particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Mouse interaction
    let mouse = { x: -1000, y: -1000 };
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Draw background gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, '#0f172a'); // slate-900
      gradient.addColorStop(1, '#1e293b'); // slate-800
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Update and draw particles
      particles.forEach((particle, index) => {
        particle.update();
        particle.draw();

        // Connect particles
        for (let j = index + 1; j < particles.length; j++) {
          const dx = particles[j].x - particle.x;
          const dy = particles[j].y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Increased connection distance and opacity
          if (distance < 180) {
            ctx.beginPath();
            // More visible lines (base opacity 0.15)
            ctx.strokeStyle = `rgba(148, 163, 184, ${0.25 - distance/1000})`; 
            ctx.lineWidth = 1;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }

        // Connect to mouse
        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 250) { // Increased interaction radius
          ctx.beginPath();
          ctx.strokeStyle = `rgba(52, 211, 153, ${0.5 - distance/800})`; // Much brighter mouse connection
          ctx.lineWidth = 1.5;
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
          
          // Push effect
          if (distance < 120) {
             particle.vx -= dx * 0.0005;
             particle.vy -= dy * 0.0005;
          }
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 -z-10 w-full h-full pointer-events-none"
    />
  );
};