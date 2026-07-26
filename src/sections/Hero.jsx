import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Beams from '../animations/Beams';
import TextPressure from '../animations/TextPressue';


const Hero = () => {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 767px)').matches : false
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    const update = (event) => setIsMobile(event.matches);
    setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener('change', update);
    return () => mediaQuery.removeEventListener('change', update);
  }, []);

  return (
    <section
      id="hero"
      className="relative w-full h-screen overflow-hidden transition-colors duration-500"
      style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}
    >
      {/* Beams Background */}
      <div className="absolute inset-0 z-0">
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          <Beams
            beamWidth={2}
            beamHeight={15}
            beamNumber={12}
            lightColor="var(--primary)"
            speed={2}
            noiseIntensity={1.75}
            scale={0.2}
            rotation={30}
          />
        </div>
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, var(--background) 0%, transparent 50%)',
          }}
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 sm:px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className={`${isMobile ? 'text-3xl sm:text-4xl' : 'text-4xl sm:text-5xl md:text-7xl'} font-extrabold tracking-tight leading-tight mb-6`}
          style={{ color: 'var(--primary)' }}
        >
          <TextPressure
            text="Rethink_Teamwork"
            flex={true}
            alpha={false}
            stroke={false}
            width={true}
            weight={true}
            italic={true}
            textColor="var(--primary)"
            strokeColor="var(--border)"
            minFontSize={isMobile ? 60 : 200}
          />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-6 text-lg sm:text-xl md:text-2xl max-w-3xl leading-relaxed"
          style={{ color: 'var(--muted-foreground)' }}
        >
          The new standard for collaborative productivity - sleek, fast, and delightful to use.
        </motion.p>

       <motion.div
         className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 w-full max-w-md mx-auto"
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ delay: 0.8, duration: 0.7 }}
       >
         <button
           onClick={() => window.open(import.meta.env.VITE_APP_URL || 'https://collabnest-iota.vercel.app', '_blank')}
           className="w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl text-center border-0 cursor-pointer"
           style={{
             backgroundColor: 'var(--primary)',
             color: 'var(--primary-foreground)',
             boxShadow: 'var(--shadow-lg)',
           }}
         >
           Get Started
         </button>
         
         <button
           onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
           className="w-full sm:w-auto px-8 py-4 border-2 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 text-center cursor-pointer"
           style={{
             borderColor: 'var(--border)',
             color: 'var(--foreground)',
             backgroundColor: 'transparent',
           }}
           onMouseEnter={(e) => {
             e.currentTarget.style.backgroundColor = 'var(--primary)';
             e.currentTarget.style.color = 'var(--primary-foreground)';
             e.currentTarget.style.borderColor = 'var(--primary)';
           }}
           onMouseLeave={(e) => {
             e.currentTarget.style.backgroundColor = 'transparent';
             e.currentTarget.style.color = 'var(--foreground)';
             e.currentTarget.style.borderColor = 'var(--border)';
           }}
         >
           Contact Us
         </button>
       </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-16 flex flex-wrap justify-center items-center gap-4 md:gap-8 text-sm px-4"
          style={{ color: 'var(--muted-foreground)' }}
        >
          <div className="flex items-center gap-2">
            <div 
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: 'var(--primary)' }}
            />
            <span>Real-time Collaboration</span>
          </div>
          <div className="flex items-center gap-2">
            <div 
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: 'var(--primary)' }}
            />
            <span>AI-Powered Insights</span>
          </div>
          <div className="flex items-center gap-2">
            <div 
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: 'var(--primary)' }}
            />
            <span>Enterprise Security</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
