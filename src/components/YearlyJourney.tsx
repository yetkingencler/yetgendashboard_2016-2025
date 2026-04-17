import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { IYearlyData } from '../types';
import { Users, GraduationCap, TrendingUp, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';

interface YearlyJourneyProps {
  data: IYearlyData[];
}

export const YearlyJourney: React.FC<YearlyJourneyProps> = ({ data }) => {
  // En son yılı varsayılan olarak seçili yaparız (örn: 2025)
  const [activeYear, setActiveYear] = useState<string>(data[data.length - 1]?.year || '2025');

  const activeData = data.find((d) => d.year === activeYear);

  if (!activeData) return null;

  // İstatistiksel veriler
  const previousData = data.find((d) => parseInt(d.year) === parseInt(activeYear) - 1);
  const growthRate = previousData 
    ? Math.round(((activeData.participants - previousData.participants) / previousData.participants) * 100)
    : 0;
  const graduationRate = Math.round((activeData.graduates / activeData.participants) * 100);

  return (
    <div className="w-full h-full flex flex-col pt-4">
      
      {/* 1. YIL SEÇİCİ (TABS) */}
      <div className="w-full flex justify-start md:justify-center overflow-x-auto pb-6 px-2 scrollbar-none snap-x mask-fade-edges">
        <div className="flex items-center gap-2 sm:gap-4 px-4 sm:px-0 mx-auto">
          {data.map((item) => {
            const isActive = item.year === activeYear;
            return (
              <button
                key={item.year}
                onClick={() => setActiveYear(item.year)}
                className={cn(
                  "relative px-5 py-2.5 sm:px-6 sm:py-3 rounded-[1.5rem] text-sm sm:text-base font-black transition-all duration-500 shrink-0 snap-center outline-none",
                  isActive 
                    ? "text-white shadow-xl shadow-blue-900/20 scale-105" 
                    : "bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-700 hover:scale-105"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabBadge"
                    className="absolute inset-0 bg-slate-900 rounded-[1.5rem] -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {item.year}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. ETKİ GÖSTERGE PANELİ (BENTO DASHBOARD) */}
      <div className="flex-1 w-full mt-2 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeYear}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98, filter: "blur(4px)" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 h-full"
          >
            {/* SOL KUTU: Katılımcı Sayısı (Devasa Tipografi) */}
            <div className="col-span-1 md:col-span-7 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100/50 rounded-[2rem] sm:rounded-[3rem] p-8 md:p-12 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -z-10 transform group-hover:scale-150 transition-transform duration-1000" />
              
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-blue-600">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-black text-blue-900 uppercase tracking-[0.2em]">{activeYear} Yılı Katılımcı Sayısı</h3>
              </div>

              <div className="mt-2 flex flex-col sm:flex-row sm:items-end gap-6 relative z-10">
                <motion.span 
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', bounce: 0.5, delay: 0.1 }}
                  className="text-6xl sm:text-7xl md:text-[7rem] lg:text-[8rem] font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-indigo-900 leading-none tracking-tighter"
                >
                  {activeData.participants.toLocaleString('tr-TR')}
                </motion.span>
                
                {growthRate > 0 && (
                  <div className="flex items-center gap-2 mb-4 px-4 py-2 bg-white rounded-2xl shadow-sm border border-emerald-100 animate-in fade-in slide-in-from-bottom-5 duration-700 delay-300">
                    <TrendingUp className="w-5 h-5 text-emerald-500" />
                    <span className="text-sm font-black text-emerald-600">+{growthRate}% Büyüme</span>
                  </div>
                )}
              </div>
              
              <p className="mt-6 text-sm sm:text-base font-medium text-slate-600 max-w-sm leading-relaxed">
                21. Yüzyıl Yetkinlikleri Eğitim Farkındalık Programına resmi olarak katılan gençlerimizin toplam sayısı.
              </p>
            </div>

            {/* SAĞ KUTU ÜST: Mezunlar */}
            <div className="col-span-1 md:col-span-5 grid grid-rows-2 gap-4 sm:gap-6">
              
              <div className="bg-white border border-slate-100 rounded-[2rem] p-6 sm:p-8 flex justify-between items-center relative overflow-hidden group hover:border-emerald-100 transition-colors">
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-emerald-50 rounded-full blur-2xl -z-10 group-hover:bg-emerald-100 transition-colors" />
                
                <div className="flex flex-col z-10">
                  <div className="flex items-center gap-2 mb-4">
                    <GraduationCap className="w-5 h-5 text-emerald-500" />
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Resmi Mezunlar</span>
                  </div>
                  <span className="text-5xl sm:text-6xl font-black text-slate-900 tracking-tight">
                    {activeData.graduates.toLocaleString('tr-TR')}
                  </span>
                </div>
                {/* Decoration Graphic */}
                <div className="hidden sm:flex w-20 h-20 bg-slate-50 rounded-full border border-slate-100 items-center justify-center shrink-0">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <Sparkles className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* SAĞ KUTU ALT: Başarı / Mezuniyet Oranı */}
              <div className="bg-slate-900 rounded-[2rem] p-6 sm:p-8 flex flex-col justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/40 via-transparent to-transparent opacity-50" />
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Mezuniyet Oranı</span>
                    <span className="px-3 py-1 bg-white/10 text-white rounded-lg text-xs font-bold">Verim</span>
                  </div>
                  
                  <div className="flex items-baseline gap-2 mt-4 mt-auto">
                    <span className="text-5xl sm:text-6xl font-black text-white">{graduationRate}</span>
                    <span className="text-2xl font-bold text-blue-400">%</span>
                  </div>

                  {/* Progress Bar Mini */}
                  <div className="w-full h-2 bg-slate-800 rounded-full mt-4 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${graduationRate}%` }}
                      transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-blue-500 to-indigo-400 rounded-full" 
                    />
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
};
