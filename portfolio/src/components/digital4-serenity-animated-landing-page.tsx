"use client";
import React, { useState, useEffect, useRef } from 'react';

const DigitalSerenity4 = () => {
  const [mouseGradientStyle, setMouseGradientStyle] = useState({
    left: '0px',
    top: '0px',
    opacity: 0,
  });
  type Ripple = { id: number; x: number; y: number };
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [scrolled, setScrolled] = useState(false);
  const wordsRef = useRef([]);
  const floatingElementsRef = useRef<Element[]>([]);

  useEffect(() => {
    const animateWords = () => {
      const wordElements = document.querySelectorAll('.word-animate');
      wordElements.forEach(word => {
        const delay = parseInt(word.getAttribute('data-delay') ?? '0') || 0;
        setTimeout(() => {
          if (word) {
            const htmlWord = word as HTMLElement;
            htmlWord.style.opacity = '1';
            htmlWord.style.transform = 'translateY(0) scale(1)';
            htmlWord.style.filter = 'blur(0)';
          }
        }, delay);
      });
    };
    const timeoutId = setTimeout(animateWords, 500);
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseGradientStyle({
        left: `${e.clientX}px`,
        top: `${e.clientY}px`,
        opacity: 1,
      });
    };
    const handleMouseLeave = () => {
      setMouseGradientStyle(prev => ({ ...prev, opacity: 0 }));
    };
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const newRipple = { id: Date.now(), x: e.clientX, y: e.clientY };
      setRipples(prev => [...prev, newRipple]);
      setTimeout(() => setRipples(prev => prev.filter(r => r.id !== newRipple.id)), 1000);
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);
  
  useEffect(() => {
    const wordElements = document.querySelectorAll('.word-animate');
    const handleMouseEnter = (e: Event) => { 
      const target = e.target as HTMLElement;
      if (target) {
        target.style.textShadow = '0 0 15px rgba(99, 102, 241, 0.4)';
        target.style.transform = 'translateY(-2px)';
        target.style.color = '#4f46e5';
      }
    };
    const handleMouseLeave = (e: Event) => { 
      const target = e.target as HTMLElement;
      if (target) {
        target.style.textShadow = 'none';
        target.style.transform = 'translateY(0)';
        target.style.color = '';
      }
    };
    wordElements.forEach(word => {
      word.addEventListener('mouseenter', handleMouseEnter);
      word.addEventListener('mouseleave', handleMouseLeave);
    });
    return () => {
      wordElements.forEach(word => {
        if (word) {
          word.removeEventListener('mouseenter', handleMouseEnter);
          word.removeEventListener('mouseleave', handleMouseLeave);
        }
      });
    };
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll('.floating-element-animate');
    floatingElementsRef.current = Array.from(elements);
    const handleScroll = () => {
      if (!scrolled) {
        setScrolled(true);
        floatingElementsRef.current.forEach((el, index) => {
          setTimeout(() => {
            if (el) {
              (el as HTMLElement).style.opacity = '0.5';
              (el as HTMLElement).style.animation = 'float 4s ease-in-out infinite';
            }
          }, index * 100);
        });
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  return (
    <div className="min-h-[150vh] bg-gradient-to-br from-blue-50/30 via-indigo-50/20 to-violet-100/40 text-slate-800 overflow-hidden relative backdrop-blur-sm">
      <style jsx>{`
        .mouse-gradient {
          position: fixed;
          pointer-events: none;
          border-radius: 9999px;
          background: radial-gradient(circle, rgba(79, 70, 229, 0.08), rgba(147, 51, 234, 0.06), rgba(236, 72, 153, 0.04), transparent 70%);
          transform: translate(-50%, -50%);
          will-change: left, top, opacity;
          transition: left 70ms linear, top 70ms linear, opacity 300ms ease-out;
        }
        
        .word-animate {
          display: inline-block;
          opacity: 0;
          margin: 0 0.1em;
          transition: all 0.3s ease;
          transform: translateY(30px) scale(0.8);
          filter: blur(10px);
        }
        
        .grid-line {
          stroke: #6366f1;
          stroke-width: 0.5;
          opacity: 0;
          stroke-dasharray: 5 5;
          animation: grid-draw 2s ease-out forwards;
        }
        
        .detail-dot {
          fill: #8b5cf6;
          opacity: 0;
          animation: pulse-glow 3s ease-in-out infinite;
        }
        
        .corner-element-animate {
          position: absolute;
          width: 40px;
          height: 40px;
          border: 1px solid rgba(99, 102, 241, 0.3);
          opacity: 0;
          animation: fade-in 1s ease-out forwards;
          backdrop-filter: blur(8px);
          background: rgba(255, 255, 255, 0.1);
        }
        
        .floating-element-animate {
          position: absolute;
          width: 3px;
          height: 3px;
          background: linear-gradient(45deg, #6366f1, #8b5cf6);
          border-radius: 50%;
          opacity: 0;
          box-shadow: 0 0 10px rgba(99, 102, 241, 0.3);
        }
        
        .ripple-effect {
          position: fixed;
          width: 6px;
          height: 6px;
          background: linear-gradient(45deg, #6366f1, #8b5cf6);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
          animation: ripple-pulse 1s ease-out forwards;
          z-index: 9999;
          box-shadow: 0 0 20px rgba(99, 102, 241, 0.4);
        }
        
        .text-decoration-line {
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #6366f1, #8b5cf6, transparent);
          animation: underline-grow 2s ease-out forwards 2s;
          border-radius: 1px;
        }
        
        @keyframes grid-draw {
          0% { stroke-dashoffset: 1000; opacity: 0; }
          50% { opacity: 0.3; }
          100% { stroke-dashoffset: 0; opacity: 0.15; }
        }
        
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.2); }
        }
        
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(30px) scale(0.8); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
          25% { transform: translateY(-15px) translateX(8px); opacity: 0.8; }
          50% { transform: translateY(-8px) translateX(-5px); opacity: 0.5; }
          75% { transform: translateY(-20px) translateX(10px); opacity: 0.9; }
        }
        
        @keyframes underline-grow {
          to { width: 100%; }
        }
        
        @keyframes ripple-pulse {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
          100% { transform: translate(-50%, -50%) scale(10); opacity: 0; }
        }
      `}</style>
      
      <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <pattern id="gridReactDarkResponsive" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(99, 102, 241, 0.15)" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="200%" height="200%" fill="url(#gridReactDarkResponsive)" />
        <line x1="0" y1="20%" x2="100%" y2="20%" className="grid-line" style={{ animationDelay: '0.5s' }} />
        <line x1="0" y1="80%" x2="100%" y2="80%" className="grid-line" style={{ animationDelay: '1s' }} />
        <line x1="20%" y1="0" x2="20%" y2="100%" className="grid-line" style={{ animationDelay: '1.5s' }} />
        <line x1="80%" y1="0" x2="80%" y2="100%" className="grid-line" style={{ animationDelay: '2s' }} />
        <line x1="50%" y1="0" x2="50%" y2="100%" className="grid-line" style={{ animationDelay: '2.5s', opacity: '0.05' }} />
        <line x1="0" y1="50%" x2="100%" y2="50%" className="grid-line" style={{ animationDelay: '3s', opacity: '0.05' }} />
        <circle cx="20%" cy="20%" r="2" className="detail-dot" style={{ animationDelay: '3s' }} />
        <circle cx="80%" cy="20%" r="2" className="detail-dot" style={{ animationDelay: '3.2s' }} />
        <circle cx="20%" cy="80%" r="2" className="detail-dot" style={{ animationDelay: '3.4s' }} />
        <circle cx="80%" cy="80%" r="2" className="detail-dot" style={{ animationDelay: '3.6s' }} />
        <circle cx="50%" cy="50%" r="1.5" className="detail-dot" style={{ animationDelay: '4s' }} />
      </svg>

      {/* Corner Elements */}
      <div className="corner-element-animate top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-8" style={{ animationDelay: '4s' }}>
        <div className="absolute top-0 left-0 w-2 h-2 bg-indigo-500 opacity-50 rounded-full shadow-lg shadow-indigo-500/30"></div>
      </div>
      <div className="corner-element-animate top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8" style={{ animationDelay: '4.2s' }}>
        <div className="absolute top-0 right-0 w-2 h-2 bg-violet-500 opacity-50 rounded-full shadow-lg shadow-violet-500/30"></div>
      </div>
      <div className="corner-element-animate bottom-4 left-4 sm:bottom-6 sm:left-6 md:bottom-8 md:left-8" style={{ animationDelay: '4.4s' }}>
        <div className="absolute bottom-0 left-0 w-2 h-2 bg-purple-500 opacity-50 rounded-full shadow-lg shadow-purple-500/30"></div>
      </div>
      <div className="corner-element-animate bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8" style={{ animationDelay: '4.6s' }}>
        <div className="absolute bottom-0 right-0 w-2 h-2 bg-indigo-600 opacity-50 rounded-full shadow-lg shadow-indigo-600/30"></div>
      </div>


      <div className="floating-element-animate" style={{ top: '25%', left: '15%' }}></div>
      <div className="floating-element-animate" style={{ top: '60%', left: '85%' }}></div>
      <div className="floating-element-animate" style={{ top: '40%', left: '10%' }}></div>
      <div className="floating-element-animate" style={{ top: '75%', left: '90%' }}></div>


      <div className="relative z-10 min-h-screen flex flex-col justify-between items-center px-6 py-10 sm:px-8 sm:py-12 md:px-16 md:py-20">
        <div className="text-center">
          <div className="mt-4 w-12 sm:w-16 h-px bg-gradient-to-r from-transparent via-indigo-400 to-transparent opacity-50 mx-auto"></div>
        </div>

        <div className="text-center max-w-5xl mx-auto relative">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extralight leading-tight tracking-tight text-slate-900 relative">
            <div className="mb-4 md:mb-6">
              <span className="word-animate" data-delay="700">Experience</span>
            </div>
            <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-thin text-slate-600 leading-relaxed tracking-wide">
              <span className="word-animate" data-delay="1400">To</span>
              <span className="word-animate" data-delay="1550">be</span>
              <span className="word-animate" data-delay="1700">updated.</span>
              {/* <span className="word-animate" data-delay="1850">and</span>
              <span className="word-animate" data-delay="2000">clarity</span>
              <span className="word-animate" data-delay="2150">awakens</span>
              <span className="word-animate" data-delay="2300">within</span>
              <span className="word-animate" data-delay="2450">the</span>
              <span className="word-animate" data-delay="2600">soul.</span> */}
            </div>
            <div className="text-decoration-line"></div>
          </h1>
          
          <div className="absolute -left-6 sm:-left-8 top-1/2 transform -translate-y-1/2 w-3 sm:w-4 h-px bg-indigo-500 opacity-0" style={{ animation: 'fade-in 1s ease-out forwards', animationDelay: '3.2s' }}></div>
          <div className="absolute -right-6 sm:-right-8 top-1/2 transform -translate-y-1/2 w-3 sm:w-4 h-px bg-violet-500 opacity-0" style={{ animation: 'fade-in 1s ease-out forwards', animationDelay: '3.4s' }}></div>
        </div>

        <div className="text-center">
          <div className="mb-4 w-12 sm:w-16 h-px bg-gradient-to-r from-transparent via-indigo-400 to-transparent opacity-50 mx-auto"></div>
          <div className="mt-6 flex justify-center space-x-4 opacity-0" style={{ animation: 'fade-in 1s ease-out forwards', animationDelay: '4.2s' }}>
            <div className="w-1 h-1 bg-indigo-500 rounded-full opacity-60 shadow-sm shadow-indigo-500/40"></div>
            <div className="w-1 h-1 bg-violet-500 rounded-full opacity-80 shadow-sm shadow-violet-500/40"></div>
            <div className="w-1 h-1 bg-purple-500 rounded-full opacity-60 shadow-sm shadow-purple-500/40"></div>
          </div>
        </div>
      </div>

      
      <div 
        className="mouse-gradient w-60 h-60 blur-xl sm:w-80 sm:h-80 sm:blur-2xl md:w-96 md:h-96 md:blur-3xl"
        style={{
          left: mouseGradientStyle.left,
          top: mouseGradientStyle.top,
          opacity: mouseGradientStyle.opacity,
        }}
      ></div>


      {ripples.map(ripple => (
        <div
          key={ripple.id}
          className="ripple-effect"
          style={{ left: `${ripple.x}px`, top: `${ripple.y}px` }}
        ></div>
      ))}
    </div>
  );
};

export default DigitalSerenity4;