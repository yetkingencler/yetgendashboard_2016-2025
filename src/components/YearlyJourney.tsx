import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { IYearlyData } from '../types';
import { Users, GraduationCap, TrendingUp, Sparkles, Brain } from 'lucide-react';
import { cn } from '../lib/utils';

interface YearlyJourneyProps {
  data: IYearlyData[];
}

export const YearlyJourney: React.FC<YearlyJourneyProps> = ({ data }) => {
  // Varsayılan olarak ilk sekmeyi değil, en son yılı (2025) seçiyoruz
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

      {/* 2. ETKİ GÖSTERGE PANELİ (PREMIUM BENTO DASHBOARD) */}
      <div className="flex-1 w-full mt-2 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeYear}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98, filter: "blur(4px)" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full flex flex-col gap-4 sm:gap-6"
          >
            
            {/* SATIR 1: HERO, MEZUNLAR, CİNSİYET */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
              
              {/* SOL BÖLÜM: HERO & KATILIMCI SAYISI */}
              <div className="lg:col-span-8 relative overflow-hidden rounded-[2rem] sm:rounded-[3rem] p-8 md:p-12 shadow-sm group min-h-[360px] flex flex-col justify-between">
                {/* Background Image & Overlay */}
                {activeData.image ? (
                  <>
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105" 
                      style={{ backgroundImage: `url(${activeData.image})` }} 
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-950/95 via-blue-900/80 to-slate-900/40" />
                  </>
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50" />
                )}
                
                <div className="relative z-10 flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md shadow-sm flex items-center justify-center text-blue-100 border border-white/10">
                      <Users className="w-6 h-6" />
                    </div>
                    <h3 className="text-sm font-black text-blue-100 uppercase tracking-[0.2em]">{activeYear} Etki Özeti</h3>
                  </div>
                  {activeData.description && (
                    <p className="text-white/90 font-medium max-w-2xl text-base sm:text-lg leading-relaxed mt-2 drop-shadow-sm">
                      {activeData.description}
                    </p>
                  )}
                </div>

                <div className="relative z-10 mt-12 flex flex-col sm:flex-row sm:items-end gap-6">
                  <div className="flex flex-col">
                    <span className="text-blue-200/80 text-sm font-bold uppercase tracking-widest mb-2">Resmi Katılımcı</span>
                    <motion.span 
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: 'spring', bounce: 0.5, delay: 0.1 }}
                      className="text-6xl sm:text-7xl md:text-[6rem] font-black text-white leading-none tracking-tighter drop-shadow-xl"
                    >
                      {activeData.participants.toLocaleString('tr-TR')}
                    </motion.span>
                  </div>
                  
                  {growthRate > 0 && (
                    <div className="flex items-center gap-2 mb-2 sm:mb-4 px-4 py-2 bg-emerald-500/20 backdrop-blur-md rounded-2xl border border-emerald-500/30 shadow-xl">
                      <TrendingUp className="w-5 h-5 text-emerald-300" />
                      <span className="text-sm font-black text-emerald-100">+{growthRate}% Büyüme</span>
                    </div>
                  )}
                </div>
              </div>

              {/* SAĞ BÖLÜM: MEZUNLAR & CİNSİYET */}
              <div className="lg:col-span-4 grid grid-rows-2 gap-4 sm:gap-6">
                
                {/* Mezuniyet Kartı */}
                <div className="bg-white border border-slate-100 rounded-[2rem] p-6 sm:p-8 flex flex-col justify-center relative overflow-hidden group hover:border-emerald-100 transition-colors shadow-sm">
                  <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-emerald-50 rounded-full blur-2xl -z-10 group-hover:bg-emerald-100 transition-colors" />
                  
                  <div className="flex items-center gap-2 mb-3">
                    <GraduationCap className="w-5 h-5 text-emerald-500" />
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Resmi Mezunlar</span>
                  </div>
                  
                  <div className="flex items-baseline gap-4 mt-2">
                    <span className="text-5xl sm:text-6xl font-black text-slate-900 tracking-tight">
                      {activeData.graduates.toLocaleString('tr-TR')}
                    </span>
                    <div className="flex flex-col items-start bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100/50">
                      <span className="text-lg font-black text-emerald-600 leading-none">%{graduationRate}</span>
                      <span className="text-[10px] font-bold text-emerald-400 uppercase mt-1">Verim</span>
                    </div>
                  </div>
                </div>

                {/* Cinsiyet Dağılımı Kartı */}
                <div className="bg-slate-900 rounded-[2rem] p-6 sm:p-8 flex flex-col justify-center relative overflow-hidden group shadow-lg">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/40 via-transparent to-transparent opacity-50" />
                  <div className="relative z-10 flex flex-col h-full justify-between">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Cinsiyet Dağılımı</span>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-pink-500"></div><span className="text-xs text-slate-300 font-bold">K</span></div>
                        <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-blue-500"></div><span className="text-xs text-slate-300 font-bold">E</span></div>
                      </div>
                    </div>
                    
                    {activeData.gender ? (
                      <div className="flex flex-col gap-4 mt-auto">
                        <div className="w-full h-3 bg-slate-800 rounded-full flex overflow-hidden shadow-inner">
                          {(() => {
                            const female = activeData.gender?.female || 0;
                            const male = activeData.gender?.male || 0;
                            const total = female + male + (activeData.gender?.other || 0);
                            const fPct = total > 0 ? Math.round((female / total) * 100) : 0;
                            const mPct = total > 0 ? Math.round((male / total) * 100) : 0;
                            return (
                              <>
                                <motion.div initial={{ width: 0 }} animate={{ width: `${fPct}%` }} transition={{ duration: 1.2, ease: 'easeOut' }} className="h-full bg-gradient-to-r from-pink-600 to-pink-500" />
                                <motion.div initial={{ width: 0 }} animate={{ width: `${mPct}%` }} transition={{ duration: 1.2, ease: 'easeOut' }} className="h-full bg-gradient-to-r from-blue-500 to-indigo-500" />
                              </>
                            );
                          })()}
                        </div>
                        <div className="flex justify-between items-center px-1">
                          <span className="text-2xl font-black text-pink-100">{activeData.gender.female?.toLocaleString('tr-TR')}</span>
                          <span className="text-2xl font-black text-blue-100">{activeData.gender.male?.toLocaleString('tr-TR')}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-auto text-slate-500 text-sm font-medium">Bu yıla ait demografik veri bulunmuyor.</div>
                    )}
                  </div>
                </div>

              </div>
            </div>

            {/* SATIR 2: AKADEMİK PROFİL */}
            {((activeData.topDepartments && activeData.topDepartments.length > 0) || (activeData.educationLevels && activeData.educationLevels.length > 0)) && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                
                {/* Öne Çıkan Bölümler */}
                <div className="bg-white border border-slate-100 rounded-[2rem] p-6 sm:p-8 flex flex-col gap-6 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                      <Brain className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-slate-900 uppercase tracking-widest text-xs">Öne Çıkan Bölümler</h4>
                  </div>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {activeData.topDepartments?.slice(0, 6).map((dept: any, i: number) => {
                      const name = typeof dept === 'string' ? dept : dept.name;
                      const val = typeof dept === 'string' ? null : dept.val;
                      return (
                        <div key={i} className="px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-semibold text-slate-700 flex items-center gap-3 hover:bg-slate-100 transition-colors group">
                          <span>{name}</span>
                          {val && (
                            <span className="text-purple-600 font-black bg-purple-100 px-2 py-0.5 rounded-lg text-xs group-hover:bg-purple-200 transition-colors">
                              {val}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Eğitim Seviyeleri */}
                <div className="bg-white border border-slate-100 rounded-[2rem] p-6 sm:p-8 flex flex-col gap-6 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-slate-900 uppercase tracking-widest text-xs">Eğitim Seviyeleri</h4>
                  </div>
                  <div className="flex flex-col gap-4">
                    {activeData.educationLevels?.slice(0, 4).map((lvl: any, i: number) => {
                      const percentage = activeData.participants > 0 ? (lvl.count / activeData.participants) * 100 : 0;
                      return (
                        <div key={i} className="flex items-center justify-between group">
                          <span className="text-sm font-bold text-slate-600 group-hover:text-slate-900 transition-colors">{lvl.name}</span>
                          <div className="flex items-center gap-4">
                            <div className="w-24 sm:w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }} 
                                animate={{ width: `${percentage}%` }} 
                                transition={{ duration: 1.2, delay: i * 0.1, ease: 'easeOut' }} 
                                className="h-full bg-gradient-to-r from-orange-400 to-amber-500 rounded-full" 
                              />
                            </div>
                            <span className="text-sm font-black text-slate-900 w-10 text-right">{lvl.count}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
};
