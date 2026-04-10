import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'motion/react';

interface BackgroundEffectsProps {
  trigger?: string;
}

export const BackgroundEffects: React.FC<BackgroundEffectsProps> = ({ trigger }) => {
  const { scrollYProgress } = useScroll();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const springConfig = { damping: 25, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Pulse on Trigger */}
      <motion.div
        key={trigger}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: [0, 0.1, 0], scale: [0.8, 1.2, 1.5] }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 bg-blue-400/10 blur-[100px]"
      />

      {/* Interactive Mouse Follower */}
      <motion.div
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className="absolute w-[30vw] h-[30vw] rounded-full bg-blue-400/5 blur-[100px]"
      />

      {/* Subtle Floating Orbs */}
      <motion.div
        style={{ y: y1, rotate }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute -top-[10%] -left-[5%] w-[40vw] h-[40vw] rounded-full bg-gradient-to-br from-blue-200/20 to-indigo-300/20 blur-[120px]"
      />

      {/* Floating Particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: Math.random() * 100 + 'vw', 
            y: Math.random() * 100 + 'vh',
            opacity: Math.random() * 0.3 + 0.1
          }}
          animate={{
            y: [null, '-100vh'],
          }}
          style={{
            x: useTransform(springX, [0, 1920], [i * 2, -i * 2]),
          }}
          transition={{
            y: {
              duration: Math.random() * 20 + 20,
              repeat: Infinity,
              ease: "linear",
              delay: -Math.random() * 20
            }
          }}
          className="absolute w-1 h-1 bg-blue-400 rounded-full blur-[1px]"
        />
      ))}
      
      <motion.div
        style={{ y: y2, rotate: -rotate }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-[40%] -right-[10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-br from-purple-200/10 to-blue-300/10 blur-[150px]"
      />

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `radial-gradient(#000 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />
    </div>
  );
};
