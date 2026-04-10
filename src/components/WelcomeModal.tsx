import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, ArrowRight, Globe } from 'lucide-react';

export const WelcomeModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show modal shortly after initial load for a smooth entrance
    const timer = setTimeout(() => setIsOpen(true), 800);
    return () => clearTimeout(timer);
  }, []);

  // Prevent background scrolling when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleClose = () => setIsOpen(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 md:p-12">
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(16px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-slate-900/40"
            onClick={handleClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", duration: 0.6, bounce: 0.2 }}
            className="relative w-full max-w-2xl bg-white rounded-[2rem] sm:rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100 flex flex-col"
          >
            {/* Close Button */}
            <button 
              onClick={handleClose}
              className="absolute top-5 right-5 sm:top-6 sm:right-6 z-20 p-2 bg-slate-100/50 hover:bg-slate-100 rounded-full text-slate-500 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Decorative Header Area */}
            <div className="relative h-48 sm:h-56 bg-slate-900 overflow-hidden shrink-0">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_150%,#4f46e5,transparent_60%)] opacity-50" />
              <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
              
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="h-20 w-20 sm:h-24 sm:w-24 bg-white/10 backdrop-blur-md rounded-[1.5rem] border border-white/20 flex items-center justify-center shadow-2xl"
                >
                  <Globe className="h-10 w-10 sm:h-12 sm:w-12 text-blue-300" />
                </motion.div>
              </div>
            </div>

            {/* Content Area */}
            <div className="px-6 py-8 sm:px-10 sm:py-10 flex flex-col items-center text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-widest mb-4">
                <Sparkles className="h-3 w-3" />
                <span>Hoş Geldiniz</span>
              </div>
              
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight font-display mb-4">
                YetGen <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Etki Ekosistemi</span>
              </h2>
              
              <p className="text-slate-500 text-sm sm:text-base font-medium leading-relaxed max-w-lg mb-8">
                Pasif öğrenenleri, 21. yüzyıl yetkinlikleri ve uygulama odaklı modellerle aktif üreticilere dönüştürüyoruz. Bugüne kadar binlerce gence dokunan bu serüveni ve yıllara yayılan dönüşüm raporumuzu keşfedin.
              </p>
              
              <button 
                onClick={handleClose}
                className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-black text-sm sm:text-base transition-all shadow-xl shadow-slate-900/10 group animate-pulse hover:animate-none"
              >
                Raporu İncele
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
            
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
