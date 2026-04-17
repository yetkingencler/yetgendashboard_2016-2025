import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ClipboardList } from 'lucide-react';

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  formUrl: string;
}

export const FormModal: React.FC<FormModalProps> = ({ isOpen, onClose, formUrl }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[9999] bg-slate-900/60 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[10000] w-[95%] max-w-[800px] h-[90vh] sm:h-[85vh] flex flex-col"
          >
            <div className="bg-white rounded-[2rem] shadow-2xl shadow-slate-900/40 border border-slate-200 flex flex-col overflow-hidden w-full h-full relative">
              
              {/* Header */}
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white z-10 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <ClipboardList className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-black text-lg text-slate-900 font-display">Partnerlik Formu</h3>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Bizimle Partner Olun</p>
                  </div>
                </div>
                <button 
                  onClick={onClose}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form Iframe Container */}
              <div className="w-full flex-1 bg-slate-50 overflow-hidden relative">
                {/* Loding State / Behind Iframe */}
                <div className="absolute inset-0 flex flex-col items-center justify-center -z-0">
                  <div className="w-8 h-8 rounded-full border-4 border-blue-100 border-t-blue-600 animate-spin mb-3"></div>
                  <p className="text-sm font-bold text-slate-400">Form Yükleniyor...</p>
                </div>

                <iframe
                  src={formUrl}
                  width="100%"
                  height="100%"
                  className="relative z-10 bg-transparent border-0"
                  title="Partnerlik Formu"
                   sandbox="allow-scripts allow-popups allow-forms allow-same-origin"
                >
                  Yükleniyor…
                </iframe>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
