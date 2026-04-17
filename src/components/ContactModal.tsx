import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Copy, CheckCircle2, X } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const email = "iletisim@yetkingencler.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[9999] bg-slate-900/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", bounce: 0.3, duration: 0.5 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[10000] w-[95%] max-w-[440px]"
          >
            <div className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-2xl shadow-slate-900/20 border border-slate-100 flex flex-col items-center text-center relative overflow-hidden">
              
              {/* Background Decoration */}
              <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-indigo-50 to-blue-50 -z-10" />
              <div className="absolute top-8 right-8 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl -z-10" />

              <button 
                onClick={onClose}
                className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100/80 text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-16 h-16 bg-white rounded-2xl shadow-xl shadow-indigo-100 flex items-center justify-center mb-6 text-indigo-600 border border-indigo-50">
                <Mail className="w-8 h-8" />
              </div>

              <h3 className="text-2xl font-black text-slate-900 mb-3 font-display tracking-tight">YetGen'le Partner Olun</h3>
              <p className="text-sm font-medium text-slate-500 mb-8 leading-relaxed px-2">
                21. yüzyıl yetkinlikleri farkındalık eğitimimize kurum olarak destek vermek, sponsor olmak veya ekosisteme değer katmak için bize ulaşabilirsiniz.
              </p>

              <div className="w-full flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-200/60 mb-6 group">
                <span className="text-sm font-black text-slate-700 tracking-wide select-all">{email}</span>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-[11px] font-bold text-slate-600 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 transition-all"
                >
                  {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? "Kopyalandı!" : "Kopyala"}
                </button>
              </div>

              <a 
                href={`mailto:${email}?subject=YetGen Partnerlik / Sponsorluk Görüşmesi &body=Merhaba YetGen Ekibi,%0A%0A`}
                className="w-full py-4 bg-slate-900 hover:bg-indigo-600 active:scale-95 text-white rounded-2xl text-sm font-black uppercase tracking-widest shadow-xl shadow-slate-900/20 hover:shadow-indigo-600/30 transition-all flex items-center justify-center gap-2"
              >
                Mail Uygulamasını Aç
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
