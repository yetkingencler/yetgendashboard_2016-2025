/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';
import {
  Users,
  GraduationCap,
  TrendingUp,
  Target,
  Brain,
  Wrench,
  MessageSquare,
  Laptop,
  Rocket,
  ArrowRight,
  ShieldCheck,
  Globe,
  Sparkles,
  FileSpreadsheet,
  Briefcase,
  Presentation,
  Info
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  Legend,
  LabelList,
  ComposedChart,
  Line
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { RAPOR } from './lib/publicAssets';
import { StatCard } from './components/StatCard';
import { ChartContainer } from './components/ChartContainer';
import { BackgroundEffects } from './components/BackgroundEffects';
import { CustomTurkeyMap as TurkeyMap } from './components/CustomTurkeyMap';
import { FormModal } from './components/FormModal';
import { YearlyJourney } from './components/YearlyJourney';
import { Footer } from './components/Footer';
import { getPlate } from './lib/cities';
import { normalizeAgeBucket, rollupPrograms } from './lib/aggregatePrograms';
import { IYearlyData, ICity, IProgramData, IDepartment } from './types';

// --- Data Preparation ---

import { yearlyData } from './data/yearlyData';
import {
  defaultSkills,
  pythonProgramSkills,
  isbankFinansSkills,
  getProgramBannerCopy,
  getHeroContent,
  getProgramHeadingName
} from './data/constants';

const normalizedYearlyData: IYearlyData[] = yearlyData.map(year => {
  if (!year.programs || year.programs.length === 0) return year;

  const roll = rollupPrograms(year.programs);

  if (roll.participants >= year.participants) {
    return {
      ...year,
      participants: roll.participants,
      graduates: roll.graduates,
      gender: { female: roll.female, male: roll.male, other: roll.other },
      educationLevels: Object.entries(roll.eduCount).map(([name, count]) => ({name, count})).sort((a,b) => b.count - a.count),
      cities: Object.entries(roll.cityCount).map(([name, count]) => ({name, count})).sort((a,b) => b.count - a.count),
      hasAgeData: roll.hasAgeData,
      ageData: Object.entries(roll.ageCount).map(([age, count]) => ({age, count})).sort((a,b) => b.count - a.count),
      topDepartments: Object.entries(roll.deptCount).map(([name, val]) => ({name, val})).sort((a,b) => b.val - a.val)
    };
  }
  return year;
});

export default function App() {
  const [selectedYear, setSelectedYear] = React.useState('all');
  const [selectedProgram, setSelectedProgram] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = React.useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = React.useState(false);
  const [empowerMeTab, setEmpowerMeTab] = React.useState<'summary' | 'program' | 'metrics' | 'outcomes'>('summary');
  const programTimelineRef = React.useRef<HTMLDivElement>(null);

  // Reset program when year changes
  React.useEffect(() => {
    setSelectedProgram(null);
  }, [selectedYear]);

  // Aktif eğitim sekmesi kaydırma alanında kalsın (son öğeler sağda kaybolmasın)
  React.useEffect(() => {
    if (selectedYear === 'all') return;
    const container = programTimelineRef.current;
    if (!container) return;
    const frame = requestAnimationFrame(() => {
      const active = container.querySelector<HTMLElement>('button[data-timeline-active="true"]');
      active?.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
    });
    return () => cancelAnimationFrame(frame);
  }, [selectedProgram, selectedYear]);

  const totalParticipants = useMemo(
    () => normalizedYearlyData.reduce((acc, curr) => acc + curr.participants, 0),
    [normalizedYearlyData],
  );
  const totalGraduates = useMemo(
    () => normalizedYearlyData.reduce((acc, curr) => acc + curr.graduates, 0),
    [normalizedYearlyData],
  );
  const certificationParticipantBaseAllYears = useMemo(
    () =>
      normalizedYearlyData.reduce((acc, year) => {
        if (year.programs?.length) {
          return (
            acc +
            year.programs.reduce(
              (programAcc, program) =>
                programAcc + (program.certificationBased === false ? 0 : program.participants || 0),
              0,
            )
          );
        }
        return acc + (year.participants || 0);
      }, 0),
    [normalizedYearlyData],
  );
  const avgCompletionRate = useMemo(
    () =>
      certificationParticipantBaseAllYears > 0
        ? ((totalGraduates / certificationParticipantBaseAllYears) * 100).toFixed(1)
        : '0.0',
    [totalGraduates, certificationParticipantBaseAllYears],
  );

  const allYearsData = useMemo(() => {
    const participants = normalizedYearlyData.reduce((acc, curr) => acc + curr.participants, 0);
    const graduates = normalizedYearlyData.reduce((acc, curr) => acc + curr.graduates, 0);

    const deptCount: Record<string, number> = {};
    let female = 0, male = 0, other = 0;
    const eduCount: Record<string, number> = {};
    const ageCount: Record<string, number> = {};
    const cityCount: Record<string, number> = {};
    let hasAgeData = false;

    normalizedYearlyData.forEach((d) => {
      const roll = d.programs?.length ? rollupPrograms(d.programs) : null;

      const mergeDepartments = (src: typeof d.topDepartments) => {
        (src || []).forEach((dept) => {
          if (typeof dept === 'string') {
            deptCount[dept] = (deptCount[dept] || 0) + 1;
          } else if (dept && typeof dept === 'object' && dept.name) {
            deptCount[dept.name] = (deptCount[dept.name] || 0) + (dept.val || 1);
          }
        });
      };

      const mergeCities = (src: typeof d.cities) => {
        (src || []).forEach((city) => {
          if (typeof city === 'object' && city?.name && city.count != null) {
            cityCount[city.name] = (cityCount[city.name] || 0) + city.count;
          }
        });
      };

      mergeDepartments(d.topDepartments);
      if (!d.topDepartments?.length && roll && Object.keys(roll.deptCount).length > 0) {
        Object.entries(roll.deptCount).forEach(([name, val]) => {
          deptCount[name] = (deptCount[name] || 0) + val;
        });
      }

      mergeCities(d.cities);
      const yearHasCityCounts = d.cities?.some((c) => typeof c === 'object' && c?.name && c.count != null);
      if (!yearHasCityCounts && roll && Object.keys(roll.cityCount).length > 0) {
        Object.entries(roll.cityCount).forEach(([name, count]) => {
          cityCount[name] = (cityCount[name] || 0) + count;
        });
      }

      const gYear =
        (d.gender?.female || 0) + (d.gender?.male || 0) + (d.gender?.other || 0);
      const gRoll = roll ? roll.female + roll.male + roll.other : 0;
      if (gYear > 0) {
        female += d.gender!.female || 0;
        male += d.gender!.male || 0;
        other += d.gender!.other || 0;
      } else if (gRoll > 0) {
        female += roll!.female;
        male += roll!.male;
        other += roll!.other;
      }

      if (d.educationLevels?.length) {
        d.educationLevels.forEach((edu) => {
          eduCount[edu.name] = (eduCount[edu.name] || 0) + edu.count;
        });
      } else if (roll && Object.keys(roll.eduCount).length > 0) {
        Object.entries(roll.eduCount).forEach(([name, count]) => {
          eduCount[name] = (eduCount[name] || 0) + count;
        });
      }

      if (d.ageData && d.ageData.length > 0) {
        hasAgeData = true;
        d.ageData.forEach((a) => {
          const raw = a.age;
          if (raw == null || String(raw).trim() === '') return;
          const bucket = normalizeAgeBucket(String(raw));
          ageCount[bucket] = (ageCount[bucket] || 0) + a.count;
        });
      } else if (roll?.hasAgeData && Object.keys(roll.ageCount).length > 0) {
        hasAgeData = true;
        Object.entries(roll.ageCount).forEach(([age, count]) => {
          ageCount[age] = (ageCount[age] || 0) + count;
        });
      }
    });

    const topDepartments = Object.entries(deptCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, val]) => ({ name, val }));

    const educationLevels = Object.entries(eduCount)
      .sort((a, b) => b[1] - a[1])
      .map(([name, count]) => ({ name, count }));

    const ageOrder = ['<18', '18-20', '21-23', '24-26', '27-29', '30+'];
    const ageData = Object.entries(ageCount)
      .map(([age, count]) => ({ age, count }))
      .sort((a, b) => {
        const aIdx = ageOrder.indexOf(a.age);
        const bIdx = ageOrder.indexOf(b.age);
        if (aIdx !== -1 && bIdx !== -1) return aIdx - bIdx;
        return a.age.localeCompare(b.age);
      });

    const cities = Object.entries(cityCount)
      .filter(([name]) => name !== 'Diğer')
      .sort((a, b) => b[1] - a[1])
      .map(([name, count]) => ({ name, count }));

    return {
      year: 'all',
      participants,
      graduates,
      description: 'YetGen\'in tüm yıllar boyunca yarattığı kümülatif etki ve ulaştığı geniş kitle.',
      image: '/partners/2025.jpg',
      hasAgeData,
      ageData,
      gender: { female, male, other },
      cities: cities.length > 0 ? cities : [{ name: '81 İl + KKTC', count: null }],
      educationLevels,
      topDepartments,
      sponsors: Array.from(
        new Set(
          normalizedYearlyData.flatMap(d => [
            ...(d.sponsors || []),
            ...(d.programs?.flatMap(p => p.sponsors || []) ?? []),
          ]),
        ),
      )
    };
  }, [normalizedYearlyData]);

  const selectedYearData = useMemo(() => {
    if (selectedYear === 'all') return allYearsData;
    const yearData = normalizedYearlyData.find(d => d.year === selectedYear);

    if (yearData && selectedProgram) {
      const program = yearData.programs?.find(p => p.id === selectedProgram);
      if (program) {
        return {
          ...yearData,
          ...program,
          description: program.description || `${program.name} programı kapsamında gerçekleştirilen eğitim ve gelişim süreci.`,
          isProgram: true,
          programName: getProgramHeadingName(program)
        };
      }
    }
    return yearData;
  }, [selectedYear, allYearsData, selectedProgram]);

  const partnerCards = useMemo(() => {
    const programPartnerOverrides: Record<string, string[]> = {
      'jump-softtech-2021': ['Softtech'],
      'basic-2024': ['Mehmet Zorlu Vakfı', 'MEF Üniversitesi', 'Şişli Belediyesi'],
      'doping-2024': ['Doping Hafıza'],
      'doping-2025': ['Doping Hafıza'],
      'isbank-finansal-okuryazarlik-2024': ['İş Bankası'],
      'habitat-empower-me-2024': ['Habitat Derneği'],
      'uoml-2025': ['Ulus Özel Musevi Lisesi'],
      'iyi-niyet-2025': ['İyi Niyet Derneği'],
    };

    const mapSponsorToLogo = (sponsor: string) => {
      const normalizedSponsor = sponsor.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
      if (sponsor === 'Mehmet Zorlu Vakfı') return '/partners/mzv-logo.png';
      if (sponsor === 'MEF Üniversitesi') return '/partners/mefu\u0308nii.png';
      if (normalizedSponsor.includes('doping')) return '/partners/doping.png';
      if (normalizedSponsor.includes('habitat')) return '/partners/Habitat_logo.jpg';
      if (normalizedSponsor.includes('is bank')) return '/partners/isb.png';
      if (normalizedSponsor === 'softtech' || normalizedSponsor === 'softech') return '/partners/softech.png';
      if (sponsor === 'Zorlu Holding') return '/partners/Zorlu_Logo.png';
      if (sponsor === 'GAİN') return '/partners/GAİN_LOGO.jpg';
      if (sponsor === 'Ulus Özel Musevi Lisesi' || normalizedSponsor.includes('musevi') || normalizedSponsor.includes('uoml')) return '/partners/ulusmusevilogo.svg';
      if (sponsor === 'İyi Niyet Derneği' || normalizedSponsor.includes('iyi niyet') || normalizedSponsor.includes('iyiniyet')) return '/partners/iyiniyetlogo.png';
      if (normalizedSponsor.includes('galatasaray')) return '/partners/galatasaraylogo.png';
      if (normalizedSponsor.includes('skoda')) return '/partners/skoda logo.png';
      return `/partners/${normalizedSponsor.replace(/ /g, '-').replace(/g/g, 'g').replace(/i/g, 'i').replace(/u/g, 'u').replace(/s/g, 's').replace(/o/g, 'o').replace(/c/g, 'c')}.png`;
    };

    if (selectedYear === 'all') {
      return [
        { name: 'Mehmet Zorlu Vakfı', logo: '/partners/mzv-logo.png' },
        { name: 'MEF Üniversitesi', logo: '/partners/mefu\u0308nii.png' },
        { name: 'Zorlu Holding', logo: '/partners/Zorlu_Logo.png' },
        { name: 'Akbank', logo: '/partners/akbank.png' },
        { name: 'Paribu', logo: '/partners/paribu.png' },
        { name: 'Paribu Hub', logo: '/partners/paribuhub.png' },
        { name: 'Doping Hafıza', logo: '/partners/doping.png' },
        { name: 'Doritos', logo: '/partners/doritos.png' },
        { name: 'İş Bankası', logo: '/partners/isb.png' },
        { name: 'Miuul', logo: '/partners/miuul.png' },
        { name: 'Şişli Belediyesi', logo: '/partners/sisli-belediyesi.png' },
        { name: 'Softtech', logo: '/partners/softech.png' },
        { name: 'GAİN', logo: '/partners/GAİN_LOGO.jpg' },
        { name: 'Habitat Derneği', logo: '/partners/Habitat_logo.jpg' },
        { name: 'Ulus Özel Musevi Lisesi', logo: '/partners/ulusmusevilogo.svg' },
        { name: 'İyi Niyet Derneği', logo: '/partners/iyiniyetlogo.png' },
        { name: 'CEİS', logo: '/partners/ceis-logo.svg' },
        { name: 'Galatasaray Lisesi', logo: '/partners/galatasaraylogo.png' },
        { name: 'Skoda', logo: '/partners/skoda logo.png' },
      ];
    }

    const yearData = normalizedYearlyData.find((d) => d.year === selectedYear);
    if (!yearData) return [];

    let sponsorPool: string[] = [];

    if (selectedProgram) {
      sponsorPool = (selectedYearData?.sponsors || []).filter((sponsor) => sponsor !== 'Yetkin Gençler');
    } else if (selectedYear === '2024') {
      sponsorPool = (yearData.sponsors || []).filter((sponsor) => sponsor !== 'Yetkin Gençler');
    } else {
      const yearSponsors = (yearData.sponsors || []).filter((sponsor) => sponsor !== 'Yetkin Gençler');
      const programSponsors = (yearData.programs || [])
        .flatMap((program) => program.sponsors || [])
        .filter((sponsor) => sponsor !== 'Yetkin Gençler');
      sponsorPool = [...yearSponsors, ...programSponsors];
    }

    const uniqueSponsors = new Map<string, string>();
    sponsorPool.forEach((sponsor) => {
      const key = sponsor.trim().toLowerCase();
      if (!uniqueSponsors.has(key)) uniqueSponsors.set(key, sponsor.trim());
    });

    const addSponsorIfMissing = (sponsorName: string) => {
      const key = sponsorName.trim().toLowerCase();
      if (!uniqueSponsors.has(key)) uniqueSponsors.set(key, sponsorName.trim());
    };

    if (selectedProgram) {
      (programPartnerOverrides[selectedProgram] || []).forEach(addSponsorIfMissing);
    } else {
      (yearData.programs || []).forEach((program) => {
        (programPartnerOverrides[program.id] || []).forEach(addSponsorIfMissing);
      });
    }

    const resolvedSponsors = Array.from(uniqueSponsors.values());

    return resolvedSponsors.map((sponsor) => ({
      name: sponsor,
      logo: mapSponsorToLogo(sponsor),
    }));
  }, [selectedYear, selectedProgram, selectedYearData]);

  React.useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 150);
    return () => clearTimeout(timer);
  }, [selectedYear]);

  // Yıla Özel Dinamik Büyüme Metrikleri
  const growthMetrics = useMemo(() => {
    if (selectedYear === 'all') {
      return {
        title: "Büyüme Endeksi",
        value: "29.1x",
        subValue: "2016 Lansmanından beri",
        trend: { value: "Sürekli Büyüme", isPositive: true, label: 'Genel Durum' }
      };
    }

    const currentIndex = normalizedYearlyData.findIndex(d => d.year === selectedYear);
    const isProgram = selectedYearData && 'isProgram' in selectedYearData;

    if (currentIndex > 0 && selectedYearData && !isProgram) {
      const prevData = normalizedYearlyData[currentIndex - 1];
      const growth = ((selectedYearData.participants - prevData.participants) / prevData.participants) * 100;

      return {
        title: "Yıllık Büyüme",
        value: `${growth > 0 ? '+' : ''}${growth.toFixed(1)}%`,
        subValue: "Geçen yıla göre",
        trend: {
          value: growth > 0 ? "Yükseliş Trendi" : "Dönemsel Denge",
          isPositive: growth >= 0
        }
      };
    }

    if (isProgram) {
      const totalYearParticipants = normalizedYearlyData[currentIndex]?.participants || 1;
      return {
        title: "Dönem Payı",
        value: `${((selectedYearData.participants / totalYearParticipants) * 100).toFixed(0)}%`,
        subValue: "Yıllık geneldeki yeri",
        trend: { value: "Odaklı Etki", isPositive: true }
      };
    }

    return {
      title: "Başlangıç İvmesi",
      value: "Pilot Yıl",
      subValue: "Temellerin atıldığı dönem",
      trend: { value: "İlk Kıvılcım", isPositive: true }
    };
  }, [selectedYear, selectedYearData]);

  const hasEduData = !!(selectedYearData?.educationLevels && selectedYearData.educationLevels.length > 0);
  const hasCityData = !!(selectedYearData?.cities && selectedYearData.cities.length > 0);
  const hasMeaningfulGenderData =
    ((selectedYearData?.gender?.female || 0) +
      (selectedYearData?.gender?.male || 0) +
      (selectedYearData?.gender?.other || 0)) > 0;

  const isGalatasarayProgram = selectedProgram === 'yetgen-gs-2023';
  const isBiSeminerProgram = selectedProgram === 'birlikte-iyilesiyoruz-2023';
  const isIlkDersProgram = selectedProgram === 'ilk-ders-2023';
  const isIyiNiyetProgram = selectedProgram === 'iyi-niyet-2025';
  const isHabitatEmpowerProgram = selectedProgram === 'habitat-empower-me-2024';
  const isEmpowerMe2025 = selectedProgram === 'empowerme-2025';
  const isUomlProgram = selectedProgram === 'uoml-2025';
  const isIsbankFinans2024 = selectedProgram === 'isbank-finansal-okuryazarlik-2024';
  const isCorePython3_2024 = selectedProgram === 'core-python-3-2024';
  const isPythonProgram = !!selectedProgram?.includes('core-python');
  const isDoping2024Program = selectedProgram === 'doping-2024';
  const isDopingProgram = selectedProgram === 'doping-2024' || selectedProgram === 'doping-2025';
  const usesWideMapProgramLayout = (isIyiNiyetProgram && hasCityData) || isIsbankFinans2024;
  const usesTwelveColMapRow = (isIyiNiyetProgram && hasCityData) || isIsbankFinans2024;
  const usesHabitatCompactLayout = isHabitatEmpowerProgram || isEmpowerMe2025 || isUomlProgram;
  const usesGalatasarayCompactLayout = isGalatasarayProgram;
  const usesCompactNoMapLayout = usesHabitatCompactLayout || usesGalatasarayCompactLayout;

  const programFocusSkills = useMemo(() => {
    if (isPythonProgram) return pythonProgramSkills;
    if (isIsbankFinans2024) return isbankFinansSkills;
    return defaultSkills;
  }, [isPythonProgram, isIsbankFinans2024]);

  const programBannerCopy = useMemo(() => {
    if (!selectedProgram || !selectedYearData?.isProgram) return null;
    return getProgramBannerCopy(selectedYearData as IProgramData);
  }, [selectedProgram, selectedYearData]);

  const showPartnersSection = !isCorePython3_2024 && partnerCards.length > 0;

  const showAgeChart =
    selectedProgram === 'doping-2025' ||
    (selectedYearData?.hasAgeData !== false && (selectedYearData?.ageData?.length ?? 0) > 0);
  const showGenderCard = hasMeaningfulGenderData && !isGalatasarayProgram;
  const showAcademicSchools =
    selectedYear !== '2016-2020' &&
    !isHabitatEmpowerProgram &&
    !isIsbankFinans2024 &&
    !!(selectedYearData?.topSchools && selectedYearData.topSchools.length > 0);
  const showAcademicDepts =
    selectedYear !== '2016-2020' &&
    !isHabitatEmpowerProgram &&
    !isIsbankFinans2024 &&
    !!(selectedYearData?.topDepartments && selectedYearData.topDepartments.length > 0);

  const standardChartCellCount =
    (showAgeChart ? 1 : 0) +
    (hasEduData ? 1 : 0) +
    (showGenderCard ? 1 : 0) +
    (showAcademicSchools ? 1 : 0) +
    (showAcademicDepts ? 1 : 0) +
    (selectedYear === '2016-2020' ? 1 : 0);
  const computedGridCols = Math.min(Math.max(standardChartCellCount, 1), 5);
  const standardGridColsClass =
    (['xl:grid-cols-1', 'xl:grid-cols-2', 'xl:grid-cols-3', 'xl:grid-cols-4', 'xl:grid-cols-5'] as const)[
      computedGridCols - 1
    ] ?? 'xl:grid-cols-4';

  /** Stack age + education in one lg:col-span-3 on map rows. Skip İyi Niyet (üçlü sütun). İlk Ders ayrı üst grid + altta harita düzeninde. */
  const mapRowLeftStack =
    usesWideMapProgramLayout && !isIyiNiyetProgram && (showAgeChart || hasEduData);

  const mapData = useMemo(() => {
    const colorData: Record<string, string> = {};
    const tooltipData: Record<string, string> = {};
    const defaultLegend = [{ color: '#cbd5e1', label: 'Yok' }];

    if (!selectedYearData?.cities || selectedYearData.cities.length === 0) {
      return { colorData, tooltipData, legendData: defaultLegend };
    }

    const validCities = selectedYearData.cities.filter((c: ICity) => c.name !== 'Diğer');
    const maxCount = Math.max(1, ...validCities.map((c: ICity) => c.count || 0));

    let t: number[];
    if (maxCount >= 4000) t = [3000, 1000, 300, 100, 20, 1];
    else if (maxCount >= 1000) t = [800, 300, 100, 40, 10, 1];
    else if (maxCount >= 500) t = [400, 150, 50, 20, 5, 1];
    else if (maxCount >= 200) t = [150, 75, 30, 10, 3, 1];
    else if (maxCount >= 100) t = [80, 40, 15, 5, 2, 1];
    else if (maxCount >= 50) t = [40, 20, 8, 4, 2, 1];
    else if (maxCount >= 20) t = [15, 8, 4, 2, 1];
    else if (maxCount >= 5) t = [5, 3, 2, 1];
    else t = [1];

    const palette = ['#e0e7ff', '#c7d2fe', '#818cf8', '#4f46e5', '#4338ca', '#3730a3', '#312e81'];
    
    // Reverse `t` to match from lowest to highest, assign colors, then reverse back to descending
    const activeBins = t.slice().reverse().map((thresh, i) => ({
      threshold: thresh,
      color: palette[Math.min(i, palette.length - 1)]
    })).reverse();

    validCities.forEach((city: ICity) => {
      const plate = getPlate(city.name);
      if (plate) {
        if (!city.count) {
          colorData[plate] = '#cbd5e1'; 
          if (city.name.includes('81')) tooltipData[plate] = city.name;
        } else {
          tooltipData[plate] = `${city.name}: ${city.count} Katılımcı`;
          const bin = activeBins.find(b => city.count >= b.threshold) || activeBins[activeBins.length - 1];
          colorData[plate] = bin.color;
        }
      }
    });

    const legendData = [
      { color: '#312e81', label: 'Çok Yüksek' },
      { color: '#4338ca', label: 'Yüksek' },
      { color: '#4f46e5', label: 'Orta' },
      { color: '#818cf8', label: 'Düşük' },
      { color: '#e0e7ff', label: 'Minimum' },
      { color: '#cbd5e1', label: 'Yok' }
    ];

    return { colorData, tooltipData, legendData };
  }, [selectedYearData]);

  const heroContent = getHeroContent(selectedYear, selectedYearData);
  const galatasarayReportUrl = RAPOR.galatasaray2023;
  const ilkDersYoutubeUrl = 'https://www.youtube.com/watch?v=OMJ92D2QV2k';
  const biSeminerPlaylistUrl =
    'https://www.youtube.com/watch?v=wSFcriI0OLs&list=PL98DQy3xBiLc3DFtEFJFLdwvK4EhFlBaE&pp=sAgC';
  const biSeminerSessions = [
    { title: 'Duygu Regülasyonu ve Psikolojik Sağlamlık', slido: 1299, youtube: 479 },
    { title: 'Kayıp ve Yas', slido: 443, youtube: 193 },
    { title: 'Mindfulness ve Stres Egzersizi', slido: 334, youtube: 163 },
    { title: 'Psikolojik İlk Yardım', slido: 167, youtube: 45 },
    { title: 'İçimizdeki Çocuk', slido: 61, youtube: 37 },
  ];
  const genderFemale = selectedYearData?.gender?.female ?? 0;
  const genderMale = selectedYearData?.gender?.male ?? 0;
  const genderOther = selectedYearData?.gender?.other ?? 0;
  const genderKnownTotal = genderFemale + genderMale + genderOther;
  const genderPieSegments = [
    { name: 'Kadın', value: genderFemale, color: '#ec4899' },
    { name: 'Erkek', value: genderMale, color: '#3b82f6' },
    ...(genderOther > 0 ? ([{ name: 'Diğer', value: genderOther, color: '#94a3b8' }] as const) : []),
  ].filter((s) => s.value > 0);

  const formatGenderPctLabel = (count: number): string => {
    if (genderKnownTotal <= 0) return '—';
    if (count <= 0) return '0%';
    const p = Math.round((count / genderKnownTotal) * 100);
    if (p === 0) return '<1%';
    return `${p}%`;
  };

  const completionRateParticipantBase = useMemo(() => {
    if (selectedProgram) {
      const yearData = normalizedYearlyData.find((d) => d.year === selectedYear);
      const currentProgram = yearData?.programs?.find((p) => p.id === selectedProgram);
      if (!currentProgram) return selectedYearData?.participants || 0;
      return currentProgram.certificationBased === false ? 0 : currentProgram.participants || 0;
    }

    if (selectedYear === 'all') {
      return certificationParticipantBaseAllYears;
    }

    const yearData = normalizedYearlyData.find((d) => d.year === selectedYear);
    if (yearData?.programs?.length) {
      return yearData.programs.reduce(
        (acc, program) => acc + (program.certificationBased === false ? 0 : program.participants || 0),
        0,
      );
    }

    return selectedYearData?.participants || 0;
  }, [
    selectedProgram,
    selectedYear,
    selectedYearData,
    certificationParticipantBaseAllYears,
  ]);

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 selection:bg-blue-100 relative">
      {/* Global premium background */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-50/40 via-slate-50/20 to-slate-50/20 transition-colors duration-1000"></div>
      <BackgroundEffects trigger={selectedYear} />
      <FormModal 
        isOpen={isFormModalOpen} 
        onClose={() => setIsFormModalOpen(false)} 
        formUrl="https://docs.google.com/forms/d/e/1FAIpQLSd65oa6o4MP_H-mf9FlYK5NqHuYj8LBnzHOSN1yuhnra9H6YA/viewform?embedded=true" 
      />

      {/* Top Navigation Timeline */}
      <nav className="sticky top-4 sm:top-6 z-[100] flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-4 w-full max-w-7xl mx-auto px-4 sm:px-6 pointer-events-none relative">
        <div className="pointer-events-auto w-full md:flex-1 md:min-w-0 flex justify-center md:justify-start">
          <div className="flex items-center gap-0.5 sm:gap-1 p-1 sm:p-1.5 bg-white/90 backdrop-blur-2xl rounded-full border border-slate-200/50 shadow-[0_15px_40px_rgba(0,0,0,0.08)] w-full md:w-auto md:max-w-full">
            <button
              onClick={() => setSelectedYear('all')}
              className={cn(
                "px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-[10px] sm:text-[11px] font-bold transition-all uppercase tracking-[0.1em] sm:tracking-[0.15em] shrink-0 relative font-display",
                selectedYear === 'all'
                  ? "text-white"
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-50/80"
              )}
            >
              {selectedYear === 'all' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-slate-900 rounded-full -z-10 shadow-lg shadow-slate-200"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              Tüm Yıllar
            </button>

            <div className="h-4 w-px bg-slate-200/60 mx-1 shrink-0" />

            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar w-full md:w-auto md:max-w-none px-1 py-0.5">
              {[...normalizedYearlyData].reverse().map((d) => (
                <button
                  key={d.year}
                  onClick={() => setSelectedYear(d.year)}
                  className={cn(
                    "px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-[10px] sm:text-[11px] font-bold transition-all uppercase tracking-[0.1em] sm:tracking-[0.15em] shrink-0 relative font-display",
                    selectedYear === d.year
                      ? "text-white"
                      : "text-slate-500 hover:text-slate-900 hover:bg-slate-50/80"
                  )}
                >
                  {selectedYear === d.year && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-blue-600 rounded-full -z-10 shadow-lg shadow-blue-200"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  {d.year}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="pointer-events-auto w-full md:w-auto md:shrink-0">
          <button 
            onClick={() => setIsFormModalOpen(true)}
            className="group w-full md:w-auto flex items-center justify-center gap-2 px-5 sm:px-6 py-3 rounded-full bg-slate-900/95 backdrop-blur-md text-white text-xs sm:text-sm font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20 hover:shadow-xl active:scale-95 border border-slate-700/50"
          >
            Bizimle Partner Olun
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </nav>


      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] h-[40%] w-[40%] rounded-full bg-blue-500/5 blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] h-[40%] w-[40%] rounded-full bg-purple-500/5 blur-[120px]" />
        <div className="absolute -bottom-[10%] left-[20%] h-[40%] w-[40%] rounded-full bg-emerald-500/5 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-16 overflow-x-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedYear}-${selectedProgram}`}
            initial={{ opacity: 0, y: 20, filter: 'blur(8px)', scale: 0.98 }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
            exit={{ opacity: 0, y: -15, filter: 'blur(4px)', scale: 0.99 }}
            transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col w-full"
          >
            {/* Sub-Program Selection (Secondary Timeline) */}
            {selectedYear !== 'all' && normalizedYearlyData.find(d => d.year === selectedYear)?.programs && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-10 flex flex-col items-center sm:items-start"
              >
                <div
                  ref={programTimelineRef}
                  className={cn(
                    "flex items-center gap-1 p-1 md:p-1.5 bg-white/80 backdrop-blur-md rounded-full border border-slate-200 shadow-md shadow-slate-200/50 max-w-full scroll-px-2",
                    selectedYear === '2023'
                      ? "flex-wrap justify-center overflow-x-visible"
                      : "overflow-x-auto no-scrollbar mask-fade-edges",
                  )}
                >
                  <button
                    type="button"
                    data-timeline-active={selectedProgram === null ? 'true' : undefined}
                    onClick={() => setSelectedProgram(null)}
                    className={cn(
                      "px-3 md:px-4 py-2 md:py-2.5 rounded-full text-[10px] md:text-[11px] font-black transition-all uppercase tracking-[0.08em] shrink-0",
                      selectedProgram === null
                        ? "bg-slate-900 text-white shadow-xl shadow-slate-300"
                        : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                    )}
                  >
                    Genel Bakış
                  </button>
                  {normalizedYearlyData.find(d => d.year === selectedYear)?.programs?.map(p => (
                    <button
                      type="button"
                      key={p.id}
                      data-timeline-active={selectedProgram === p.id ? 'true' : undefined}
                      onClick={() => setSelectedProgram(p.id)}
                      className={cn(
                        "px-3 md:px-4 py-2 md:py-2.5 rounded-full text-[10px] md:text-[11px] font-black transition-all uppercase tracking-[0.08em] shrink-0 whitespace-normal break-words leading-tight text-center",
                        selectedProgram === p.id
                          ? "bg-slate-900 text-white shadow-xl shadow-slate-300"
                          : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                      )}
                      title={p.longName || p.name}
                    >
                      {p.name}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Header */}
            <header className="mb-10 sm:mb-16 flex flex-col lg:flex-row lg:items-center justify-between gap-8 sm:gap-12 relative z-10">
              <div className="flex-1 min-w-0">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "font-black tracking-tighter text-slate-900 leading-[1.1] font-display break-words",
                    isIsbankFinans2024
                      ? "text-3xl sm:text-4xl lg:text-5xl"
                      : "text-4xl sm:text-5xl lg:text-6xl",
                  )}
                >
                  {heroContent.title1} <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 selection:text-blue-700 drop-shadow-sm">{heroContent.title2}</span>
                  {heroContent.subtitle && (
                    <>
                      <br className="hidden lg:block" />
                      <span className="text-slate-800">
                        {heroContent.subtitle}
                      </span>
                    </>
                  )}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mt-6 text-lg lg:text-xl text-slate-500 max-w-2xl font-medium leading-relaxed"
                >
                  {heroContent.text}
                </motion.p>
                {selectedProgram === 'yetgen-gs-2023' && (
                  <motion.button
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    onClick={() => setIsReportModalOpen(true)}
                    className="mt-5 inline-flex items-center gap-2 rounded-xl border border-indigo-200 bg-white/90 px-4 py-2.5 text-sm font-bold text-indigo-700 shadow-sm hover:bg-indigo-50 hover:border-indigo-300 transition-colors"
                  >
                    Raporu İncele (PDF)
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                )}
                {selectedProgram === 'ilk-ders-2023' && (
                  <motion.a
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    href={ilkDersYoutubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-2 rounded-xl border border-red-200 bg-white/90 px-4 py-2.5 text-sm font-bold text-red-700 shadow-sm hover:bg-red-50 hover:border-red-300 transition-colors"
                  >
                    YouTube Yayınını Aç
                    <ArrowRight className="w-4 h-4" />
                  </motion.a>
                )}

              </div>
              
              {/* Professional Right Logo */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 1, ease: [0.23, 1, 0.32, 1], delay: 0.3 }}
                className="hidden lg:flex shrink-0 relative items-center justify-center lg:w-80 xl:w-96 bg-white/60 backdrop-blur-md border border-slate-200/60 rounded-[2rem] p-8 shadow-[0_2px_15px_-3px_rgba(6,81,237,0.05)] hover:shadow-lg hover:bg-white/90 transition-all duration-500"
              >
                <img 
                  src="/partners/yetgen-logo-transparent.png" 
                  alt="YetGen" 
                  className="w-full object-contain relative z-10 hover:scale-105 transition-transform duration-500 ease-out" 
                />
              </motion.div>
            </header>

            {/* KPI Grid */}
            <div className={cn(
              "grid grid-cols-1 gap-4 sm:gap-6 md:gap-8 sm:grid-cols-2 mb-10 md:mb-16 items-stretch",
              selectedYear === '2016-2020' ? "lg:grid-cols-3" : "lg:grid-cols-4"
            )}>
              {isGalatasarayProgram ? (
                <>
                  <StatCard
                    title="Program Katılımcısı"
                    value={selectedYearData?.participants.toLocaleString() || '0'}
                    subValue="Galatasaray Lisesi öğretmenleri"
                    icon={Users}
                    delay={0.1}
                  />
                  <StatCard
                    title="Program Süresi"
                    value="4 Hafta"
                    subValue="Mayıs 2023 pilot uygulama"
                    icon={Target}
                    delay={0.2}
                  />
                  <StatCard
                    title="Eğitim Yapısı"
                    value="8 Gün"
                    subValue="Canlı oturum + asenkron içerik"
                    icon={Presentation}
                    delay={0.3}
                  />
                  <StatCard
                    title="Program Odağı"
                    value="Öğretmen"
                    subValue="Öğretmen Akademisi odağı"
                    icon={Sparkles}
                    delay={0.4}
                  />
                </>
              ) : isBiSeminerProgram ? (
                <>
                  <StatCard
                    title="Toplam Kayıt"
                    value="4.000"
                    subValue="Seminer serisine kayıt"
                    icon={Users}
                    delay={0.1}
                  />
                  <StatCard
                    title="Toplam Katılım"
                    value="1.778"
                    subValue="Canlı/izleme toplam erişim"
                    icon={TrendingUp}
                    delay={0.2}
                  />
                  <StatCard
                    title="Seminer Sayısı"
                    value="5"
                    subValue="Program boyunca oturum"
                    icon={Presentation}
                    delay={0.3}
                  />
                  <StatCard
                    title="İzleme Kanalı"
                    value="YouTube"
                    subValue="Playlist üzerinden erişim"
                    icon={Globe}
                    delay={0.4}
                  />
                </>
              ) : isIlkDersProgram ? (
                <>
                  <StatCard
                    title="Toplam Kayıt"
                    value={selectedYearData?.participants.toLocaleString('tr-TR') || '0'}
                    subValue="Eğitimci katılımcı listesi"
                    icon={Users}
                    delay={0.1}
                  />
                  <StatCard
                    title="Tarih"
                    value="18 Şubat 2023"
                    subValue="Cumartesi"
                    icon={Target}
                    delay={0.2}
                  />
                  <StatCard
                    title="Saat"
                    value="19.00–20.00"
                    subValue="1 saat seminer"
                    icon={Presentation}
                    delay={0.3}
                  />
                  <StatCard
                    title="Yayın"
                    value="YouTube"
                    subValue="Tekil video yayını"
                    icon={Globe}
                    delay={0.4}
                  />
                </>
              ) : isUomlProgram ? (
                <>
                  <StatCard
                    title="Katılımcı"
                    value={selectedYearData?.participants.toLocaleString('tr-TR') || '152'}
                    subValue="9, 10, 11, 12. Sınıf & Mezun"
                    icon={Users}
                    delay={0.1}
                  />
                  <StatCard
                    title="Eğitim Metodu"
                    value="Yüz Yüze & Online"
                    subValue="Hibrit Kurgu"
                    icon={Target}
                    delay={0.2}
                  />
                  <StatCard
                    title="Eğitim Takvimi"
                    value="5 Eylül - 22 Ekim"
                    subValue="2025 Güz Dönemi"
                    icon={Presentation}
                    delay={0.3}
                  />
                  <StatCard
                    title="Sertifika Kriteri"
                    value="Canlı + Asenkron + Ödev"
                    subValue="Düzenli katılım ve takip"
                    icon={TrendingUp}
                    delay={0.4}
                  />
                </>
              ) : isEmpowerMe2025 ? (
                <>
                  <StatCard
                    title="Eğitmen Eğitimi"
                    value={selectedYearData?.participants.toLocaleString('tr-TR') || '30'}
                    subValue="İstanbul, yüz yüze katılım"
                    icon={Users}
                    delay={0.1}
                  />
                  <StatCard
                    title="Program Süresi"
                    value="3 Tam Gün"
                    subValue="27–29 Kasım 2025"
                    icon={Target}
                    delay={0.2}
                  />
                  <StatCard
                    title="Yetkinlik Gelişimi"
                    value="%70,3 Artış"
                    subValue="Algoritmik düşünme son-test"
                    icon={Presentation}
                    delay={0.3}
                  />
                  <StatCard
                    title="Memnuniyet"
                    value="4,80 / 5"
                    subValue="Genel zirve değerlendirmesi"
                    icon={TrendingUp}
                    delay={0.4}
                  />
                </>
              ) : isHabitatEmpowerProgram ? (
                <>
                  <StatCard
                    title="Eğitmen Eğitimi"
                    value={selectedYearData?.participants.toLocaleString('tr-TR') || '29'}
                    subValue="21. yy yetkinlik modülleri (PDF)"
                    icon={Users}
                    delay={0.1}
                  />
                  <StatCard
                    title="Program Süresi"
                    value="3 Gün"
                    subValue="12–14 Aralık 2024, yüz yüze"
                    icon={Target}
                    delay={0.2}
                  />
                  <StatCard
                    title="İçerik Derinliği"
                    value="13 Modül"
                    subValue="İlk gün 7 + sonraki günler 6 başlık"
                    icon={Presentation}
                    delay={0.3}
                  />
                  <StatCard
                    title="Anket Memnuniyeti"
                    value="4,57 / 5"
                    subValue="Gün 2: 4,27 · Gün 3: 4,86 (anonim)"
                    icon={TrendingUp}
                    delay={0.4}
                  />
                </>
              ) : isIsbankFinans2024 ? (
                <>
                  <StatCard
                    title="Toplam Başvuru"
                    value="447"
                    subValue="PDF program özeti (analiz: 449)"
                    icon={Users}
                    delay={0.1}
                  />
                  <StatCard
                    title="Program Katılımı"
                    value={selectedYearData?.participants.toLocaleString('tr-TR') || '402'}
                    subValue="Olumlu sonuç ile programa alınan"
                    icon={Target}
                    delay={0.2}
                  />
                  <StatCard
                    title="Süreci Tamamlayan"
                    value="260"
                    subValue="Program sonuna kadar devam eden"
                    icon={Presentation}
                    delay={0.3}
                  />
                  <StatCard
                    title="Sertifika Kazanan"
                    value="135"
                    subValue="Başarıyla tamamlayıp hak kazanan"
                    icon={ShieldCheck}
                    delay={0.4}
                  />
                </>
              ) : (
                <>
                  <StatCard
                    title={selectedYear === 'all' ? "Toplam Katılımcı" : `${selectedYear} Katılımcı`}
                    value={selectedYearData?.participants.toLocaleString() || '0'}
                    subValue={selectedYear === 'all' ? "10 yıllık süreçte" : `${selectedYear} yılı verisi`}
                    icon={Users}
                    trend={selectedYear === 'all' ? { value: "%7.6", isPositive: true, label: "Tüm Yıllar Artışı" } : undefined}
                    delay={0.1}
                  />
                  <StatCard
                    title={selectedYear === 'all' ? "Toplam Mezun" : `${selectedYear} Mezun`}
                    value={selectedYearData?.graduates.toLocaleString() || '0'}
                    subValue="Sertifikalı Alumniler"
                    icon={GraduationCap}
                    trend={selectedYear === 'all' ? { value: "%12.4", isPositive: true, label: "Mezun Bazında" } : undefined}
                    delay={0.2}
                  />
                  <StatCard
                    title="Tamamlama Oranı"
                    value={`%${completionRateParticipantBase > 0 ? ((selectedYearData.graduates / completionRateParticipantBase) * 100).toFixed(1) : '0'}`}
                    subValue="Program Verimliliği"
                    icon={ShieldCheck}
                    trend={selectedYear === 'all' ? { value: "%2.1", isPositive: true, label: "Artan Başarı" } : undefined}
                    delay={0.3}
                  />
                  {selectedYear !== '2016-2020' && (
                    <StatCard
                      title={growthMetrics.title}
                      value={growthMetrics.value}
                      subValue={growthMetrics.subValue}
                      icon={TrendingUp}
                      trend={growthMetrics.trend}
                      delay={0.4}
                    />
                  )}
                </>
              )}
            </div>



            {/* Dynamic Content Area */}
            <div className="relative min-h-[800px]">
              {isLoading && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/40 backdrop-blur-[2px] rounded-[2.5rem]">
                  <div className="flex flex-col items-center gap-4">
                    <div className="h-10 w-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                    <p className="text-xs font-black text-blue-600 uppercase tracking-widest">Veriler Hazırlanıyor</p>
                  </div>
                </div>
              )}

              <div className="space-y-12 w-full">
                  <div className="space-y-12">
                    {/* Bento Grid Layout */}
                    <div className="space-y-6 md:space-y-8 w-full">
                      {/* Main Hero Cinematic Banner */}
                      <div className="bg-white rounded-[2rem] md:rounded-[3.5rem] border border-slate-200 shadow-2xl shadow-slate-200/40 relative overflow-hidden group">
                        <div className={cn(
                          "relative",
                          selectedProgram ? "min-h-[400px] sm:min-h-[450px] md:min-h-[500px] flex flex-col" : "h-[300px] sm:h-[400px] md:h-[450px]"
                        )}>
                          <img
                            src={selectedYearData?.image}
                            alt={selectedYear}
                            className={cn(
                              "absolute inset-0 w-full h-full object-cover brightness-[1.05] contrast-[1.1] saturate-[1.1] transition-transform duration-[2s] group-hover:scale-110",
                              selectedProgram === 'doping-2024' ? "object-[right_35%]" :
                              selectedYear === '2025' ? "object-[center_45%]" :
                              selectedYear === 'all' ? "object-[center_70%]" : 
                              selectedYear === '2022' ? "object-[center_75%]" : 
                              "object-[center_20%]"
                            )}
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-slate-900/30" />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent" />
                          <div className="relative w-full h-full min-h-[inherit] p-8 pt-16 md:p-12 md:pt-20 lg:p-16 lg:pt-24 flex flex-col justify-end z-10">
                            <div className="max-w-2xl drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]">
                              <motion.span
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl mb-6 md:mb-8"
                              >
                                {programBannerCopy
                                  ? programBannerCopy.badge
                                  : selectedYear === 'all'
                                    ? 'Genel Bakış'
                                    : `Yıl: ${selectedYear}`}
                              </motion.span>
                              <motion.h3
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className={cn(
                                  "font-black text-white tracking-tighter leading-[0.95] font-display mb-4 md:mb-6",
                                  selectedProgram
                                    ? "text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
                                    : "text-4xl sm:text-5xl md:text-6xl lg:text-8xl mb-6 md:mb-8 leading-[0.9] md:leading-[0.85]",
                                )}
                              >
                                {programBannerCopy ? (
                                  <>
                                    {programBannerCopy.headline[0]}
                                    {programBannerCopy.headline[1] ? (
                                      <>
                                        <br />
                                        <span className="text-blue-400">{programBannerCopy.headline[1]}</span>
                                      </>
                                    ) : null}
                                  </>
                                ) : (
                                  <>
                                    {selectedYear === 'all' ? '10 Yıllık' : selectedYear} <br />
                                    <span className="text-blue-400">
                                      {selectedYear === 'all' ? 'Etki Raporu' : 'Etki Yılı'}
                                    </span>
                                  </>
                                )}
                              </motion.h3>
                              <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="text-slate-100 text-base md:text-lg font-medium leading-relaxed max-w-xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                              >
                                {programBannerCopy
                                  ? programBannerCopy.tagline
                                  : selectedYearData?.description}
                              </motion.p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 4 or 5 Interactive Charts Row */}
                      <div className={cn(
                        "mt-6 sm:mt-8 gap-6 md:gap-8",
                        isDoping2024Program || isIlkDersProgram || usesCompactNoMapLayout
                          ? "flex flex-col"
                          : isBiSeminerProgram
                            ? "grid grid-cols-1 md:grid-cols-2 items-stretch"
                          : cn(
                              "grid",
                              usesTwelveColMapRow
                                ? "grid-cols-1 lg:grid-cols-12 items-stretch"
                                : cn("grid-cols-1 md:grid-cols-2", standardGridColsClass),
                            ),
                      )}>
                        {isBiSeminerProgram && (
                          <div className="md:col-span-2 relative bg-white/90 backdrop-blur-3xl border border-slate-200/80 shadow-[0_16px_45px_rgba(15,23,42,0.08)] rounded-[2rem] p-6 sm:p-8 md:p-10 overflow-hidden">
                            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-violet-50/80 to-transparent pointer-events-none" />
                            <div className="relative flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
                              <div>
                                <p className="text-[10px] font-black text-violet-600 uppercase tracking-[0.2em] mb-2">Seminer Serisi</p>
                                <h4 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Birlikte İyileşiyoruz Program Oturumları</h4>
                              </div>
                            </div>
                            <div className="relative mb-5 rounded-2xl border border-slate-200 bg-gradient-to-r from-red-50/70 to-white p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-4">
                              <img
                                src="https://img.youtube.com/vi/wSFcriI0OLs/hqdefault.jpg"
                                alt="Birlikte İyileşiyoruz YouTube Oynatma Listesi"
                                className="w-full sm:w-44 h-24 object-cover rounded-xl border border-red-100"
                              />
                              <div className="flex-1 min-w-0">
                                <p className="text-[11px] font-black text-red-600 uppercase tracking-[0.16em] mb-1">YouTube Oynatma Listesi</p>
                                <h5 className="text-sm sm:text-base font-black text-slate-900 leading-tight">
                                  Birlikte İyileşiyoruz Seminer Kayıtları
                                </h5>
                              </div>
                              <a
                                href={biSeminerPlaylistUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200/80 bg-white px-4 py-2 text-xs sm:text-sm font-bold text-red-700 shadow-sm hover:bg-red-50 hover:border-red-300 transition-colors shrink-0"
                              >
                                Oynatma Listesini Aç
                                <ArrowRight className="w-4 h-4" />
                              </a>
                            </div>
                            <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4 mb-4">
                              {biSeminerSessions.map((session) => (
                                <div key={session.title} className="group rounded-2xl border border-slate-200 bg-white p-4 hover:shadow-lg hover:shadow-slate-900/5 transition-all">
                                  <p className="text-sm font-bold text-slate-800 leading-snug min-h-[42px]">{session.title}</p>
                                  <div className="mt-3 pt-3 border-t border-slate-100 space-y-1.5">
                                    <p className="text-xs text-slate-500 font-semibold">Slido: <span className="text-slate-900 font-black">{session.slido}</span></p>
                                    <p className="text-xs text-slate-500 font-semibold">YouTube: <span className="text-slate-900 font-black">{session.youtube}</span></p>
                                  </div>
                                </div>
                              ))}
                            </div>
                            <p className="text-xs text-slate-500 font-medium">
                              Not: Slido ve YouTube değerleri seminerlerin canlı yayın anındaki katılım/izlenme sayılarını göstermektedir. Toplam kayıt 4.000, toplam katılım 1.778 olarak raporlanmıştır.
                            </p>
                          </div>
                        )}

                        {/* Doping 2024: eğitim + yaş + cinsiyet üst satırda yan yana; harita altta tam genişlikte */}
                        {isDoping2024Program && (
                          <div className="flex flex-col md:flex-row gap-6 md:gap-8 w-full items-stretch">
                            {hasEduData && (
                              <div className="flex-1 min-w-0 bg-white/70 backdrop-blur-3xl border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] lg:rounded-[2.5rem] border p-6 sm:p-8 md:p-10 shadow-sm flex flex-col h-full relative overflow-hidden hover:shadow-xl hover:shadow-indigo-100/40 transition-all justify-start">
                                <div>
                                  <div className="flex items-center gap-3 mb-4">
                                    <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-500 flex items-center justify-center shrink-0">
                                      <GraduationCap className="w-4 h-4" />
                                    </div>
                                    <div>
                                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Eğitim Durumu</p>
                                    </div>
                                  </div>
                                  <div className="space-y-4 mt-2">
                                    {selectedYearData.educationLevels.filter(ed => Math.round((ed.count / selectedYearData.participants) * 100) > 0).map((ed, i) => (
                                      <div key={ed.name} className="flex flex-col gap-1.5" title={`${ed.count} Kişi`}>
                                        <div className="flex justify-between items-center text-xs">
                                          <span className="font-bold text-slate-700">{ed.name}</span>
                                          <span className="font-black text-indigo-600">%{Math.round((ed.count / selectedYearData.participants) * 100)}</span>
                                        </div>
                                        <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                                          <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(ed.count / selectedYearData.participants) * 100}%` }}
                                            transition={{ duration: 1, delay: i * 0.1 }}
                                            className="h-full bg-indigo-500 rounded-full"
                                          />
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                  <div className="mt-6 flex items-start gap-2 bg-indigo-50/50 p-3 rounded-xl border border-indigo-100/50">
                                    <Info className="w-4 h-4 text-indigo-500 mt-0.5 shrink-0" />
                                    <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                                      <span className="font-bold text-indigo-600 mr-1">Not:</span>
                                      Bu eğitim 2 dönem yapılmıştır. Eğitim durumu bilgileri yalnızca 1. döneme aittir.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            )}
                            {showAgeChart && (
                              <div className="flex-1 min-w-0 bg-white/70 backdrop-blur-3xl border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] lg:rounded-[2.5rem] border p-6 sm:p-8 md:p-10 shadow-sm flex flex-col h-full relative overflow-hidden hover:shadow-xl hover:shadow-indigo-100/40 transition-all justify-start">
                                <div>
                                  <div className="flex items-center gap-3 mb-4">
                                    <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-500 flex items-center justify-center shrink-0">
                                      <Users className="w-4 h-4" />
                                    </div>
                                    <div>
                                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Yaş Aralığı</div>
                                    </div>
                                  </div>
                                  <div className="h-[220px] w-full mt-4 min-h-[200px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                      {(() => {
                                        const ageData = selectedYearData?.ageData ?? [];
                                        return (
                                          <BarChart layout="vertical" data={ageData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#E2E8F0" opacity={0.5} />
                                            <XAxis type="number" hide />
                                            <YAxis dataKey="age" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b', fontWeight: 700 }} width={52} interval={0} />
                                            <Tooltip cursor={{ fill: '#F1F5F9' }} contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                                            <Bar dataKey="count" fill="#6366f1" radius={[0, 4, 4, 0]} barSize={16}>
                                              <LabelList dataKey="count" position="right" style={{ fill: '#64748b', fontSize: 10, fontWeight: 800 }} />
                                            </Bar>
                                          </BarChart>
                                        );
                                      })()}
                                    </ResponsiveContainer>
                                  </div>
                                </div>
                              </div>
                            )}
                            {showGenderCard && (
                              <div className="flex-1 min-w-0 bg-white/70 backdrop-blur-3xl border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] lg:rounded-[2.5rem] border p-6 sm:p-8 md:p-10 shadow-sm flex flex-col min-w-0 h-full relative overflow-x-clip overflow-y-visible hover:shadow-xl hover:shadow-pink-100/40 transition-all justify-between">
                                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                                  <div className="w-8 h-8 rounded-xl bg-pink-50 text-pink-500 flex items-center justify-center shrink-0">
                                    <Sparkles className="w-4 h-4" />
                                  </div>
                                  <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Cinsiyet Dengesi</p>
                                  </div>
                                </div>
                                <div className="flex-1 w-full min-w-0 flex flex-col items-center justify-center mt-2 mb-2">
                                  <div className="h-[152px] w-[152px] sm:h-[168px] sm:w-[168px] relative shrink-0 mb-5">
                                    <ResponsiveContainer width="100%" height="100%">
                                      <PieChart>
                                        <Pie
                                          data={genderPieSegments}
                                          cx="50%"
                                          cy="50%"
                                          innerRadius={52}
                                          outerRadius={72}
                                          paddingAngle={4}
                                          dataKey="value"
                                          stroke="none"
                                        >
                                          {genderPieSegments.map((seg, index) => (
                                            <Cell key={`gender-doping-seg-${seg.name}-${index}`} fill={seg.color} />
                                          ))}
                                        </Pie>
                                        <Tooltip cursor={false} contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} itemStyle={{ fontSize: '12px', fontWeight: 'bold' }} />
                                      </PieChart>
                                    </ResponsiveContainer>
                                  </div>
                                  <div
                                    className={cn(
                                      'grid w-full max-w-full min-w-0 gap-x-3 gap-y-5 px-1',
                                      genderOther > 0 ? 'grid-cols-3' : 'grid-cols-2 max-w-[16rem]',
                                    )}
                                  >
                                    <div
                                      className="min-w-0 flex flex-col items-center text-center justify-start gap-y-2"
                                      title={`${genderFemale.toLocaleString('tr-TR')} kişi`}
                                    >
                                      <div className="flex flex-col sm:flex-row sm:items-center justify-center gap-1 w-full px-0.5">
                                        <span className="inline-block w-3 h-3 rounded-full bg-pink-500 shrink-0 mx-auto sm:mx-0" />
                                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider truncate max-w-full">Kadın</span>
                                      </div>
                                      <span className="text-xl sm:text-2xl font-black tabular-nums tracking-tight text-slate-900 leading-none whitespace-nowrap">
                                        {formatGenderPctLabel(genderFemale)}
                                      </span>
                                    </div>
                                    <div
                                      className="min-w-0 flex flex-col items-center text-center justify-start gap-y-2"
                                      title={`${genderMale.toLocaleString('tr-TR')} kişi`}
                                    >
                                      <div className="flex flex-col sm:flex-row sm:items-center justify-center gap-1 w-full px-0.5">
                                        <span className="inline-block w-3 h-3 rounded-full bg-blue-500 shrink-0 mx-auto sm:mx-0" />
                                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider truncate max-w-full">Erkek</span>
                                      </div>
                                      <span className="text-xl sm:text-2xl font-black tabular-nums tracking-tight text-slate-900 leading-none whitespace-nowrap">
                                        {formatGenderPctLabel(genderMale)}
                                      </span>
                                    </div>
                                    {genderOther > 0 ? (
                                      <div
                                        className="min-w-0 flex flex-col items-center text-center justify-start gap-y-2"
                                        title={`${genderOther.toLocaleString('tr-TR')} kişi`}
                                      >
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-center gap-1 w-full px-0.5">
                                          <span className="inline-block w-3 h-3 rounded-full bg-slate-400 shrink-0 mx-auto sm:mx-0" />
                                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider truncate max-w-full">Diğer</span>
                                        </div>
                                        <span className="text-lg sm:text-xl font-black tabular-nums tracking-tight text-slate-900 leading-none whitespace-nowrap">
                                          {formatGenderPctLabel(genderOther)}
                                        </span>
                                      </div>
                                    ) : null}
                                  </div>
                                  <p className="mt-5 text-[9px] sm:text-[10px] font-medium text-slate-400 text-center max-w-[18rem] leading-snug uppercase tracking-[0.12em]">
                                    Oranlar, cinsiyet bilgisinin bildirildiği kayıtlar üzerinden
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Habitat 2024: yaş, eğitim ve program özeti yan yana; harita gösterilmez */}
                        {usesHabitatCompactLayout && (
                          <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className={cn(
                              "grid grid-cols-1 gap-6 md:gap-8 w-full items-stretch",
                              isUomlProgram ? "sm:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-3"
                            )}
                          >
                            {showAgeChart && (
                              <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="min-w-0 bg-white/70 backdrop-blur-3xl border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] lg:rounded-[2.5rem] border p-6 sm:p-8 md:p-10 shadow-sm flex flex-col h-full relative overflow-hidden hover:shadow-xl hover:shadow-indigo-100/40 transition-all justify-start"
                              >
                                <motion.div className="flex items-center gap-3 mb-4">
                                  <motion.div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-500 flex items-center justify-center shrink-0">
                                    <Users className="w-4 h-4" />
                                  </motion.div>
                                  <div>
                                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Yaş Aralığı</div>
                                  </div>
                                </motion.div>
                                <motion.div className="h-[220px] w-full mt-4 min-h-[200px]">
                                  <ResponsiveContainer width="100%" height="100%">
                                    {(() => {
                                      const ageData = selectedYearData?.ageData ?? [];
                                      return (
                                        <BarChart layout="vertical" data={ageData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                                          <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#E2E8F0" opacity={0.5} />
                                          <XAxis type="number" hide />
                                          <YAxis dataKey="age" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b', fontWeight: 700 }} width={48} interval={0} />
                                          <Tooltip cursor={{ fill: '#F1F5F9' }} contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                                          <Bar dataKey="count" fill="#6366f1" radius={[0, 4, 4, 0]} barSize={16}>
                                            <LabelList dataKey="count" position="right" style={{ fill: '#64748b', fontSize: 10, fontWeight: 800 }} />
                                          </Bar>
                                        </BarChart>
                                      );
                                    })()}
                                  </ResponsiveContainer>
                                </motion.div>
                              </motion.div>
                            )}
                            {hasEduData && (
                              <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="min-w-0 bg-white/70 backdrop-blur-3xl border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] lg:rounded-[2.5rem] border p-6 sm:p-8 md:p-10 shadow-sm flex flex-col h-full relative overflow-hidden hover:shadow-xl hover:shadow-indigo-100/40 transition-all justify-start"
                              >
                                <div className="flex items-center gap-3 mb-4">
                                  <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-500 flex items-center justify-center shrink-0">
                                    <GraduationCap className="w-4 h-4" />
                                  </div>
                                  <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Eğitim Durumu</p>
                                  </div>
                                </div>
                                <div className="space-y-4 mt-2">
                                  {selectedYearData.educationLevels.filter(ed => Math.round((ed.count / selectedYearData.participants) * 100) > 0).map((ed, i) => (
                                    <div key={ed.name} className="flex flex-col gap-1.5" title={`${ed.count} Kişi`}>
                                      <div className="flex justify-between items-center text-xs gap-2">
                                        <span className="font-bold text-slate-700 min-w-0 break-words">{ed.name}</span>
                                        <span className="font-black text-indigo-600 shrink-0">%{Math.round((ed.count / selectedYearData.participants) * 100)}</span>
                                      </div>
                                      <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                                        <motion.div
                                          initial={{ width: 0 }}
                                          animate={{ width: `${(ed.count / selectedYearData.participants) * 100}%` }}
                                          transition={{ duration: 1, delay: i * 0.1 }}
                                          className="h-full bg-indigo-500 rounded-full"
                                        />
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                            {isUomlProgram && (
                              <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="min-w-0 bg-white/70 backdrop-blur-3xl border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] lg:rounded-[2.5rem] border p-6 sm:p-8 md:p-10 shadow-sm flex flex-col h-full relative overflow-hidden hover:shadow-xl hover:shadow-indigo-100/40 transition-all justify-between"
                              >
                                <div>
                                  {/* Card Header */}
                                  <div className="flex items-center gap-3 mb-5">
                                    <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-pink-100 via-purple-50 to-blue-100 text-indigo-500 flex items-center justify-center shrink-0 shadow-inner">
                                      <Users className="w-4 h-4" />
                                    </div>
                                    <div>
                                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Kitle Profili</p>
                                      <p className="text-xs font-bold text-slate-900 leading-tight">Cinsiyet & Okul</p>
                                    </div>
                                  </div>

                                  {/* Gender Section */}
                                  <div className="space-y-3">
                                    <div className="flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-[0.1em]">
                                      <span>Cinsiyet Dengesi</span>
                                      <span className="text-slate-500 font-bold tracking-normal">{genderKnownTotal} Kişi</span>
                                    </div>
                                    
                                    {/* Multi-segment compact horizontal bar */}
                                    <div className="h-3.5 bg-slate-100 rounded-full flex overflow-hidden border border-slate-200/30 shadow-inner">
                                      <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(genderFemale / genderKnownTotal) * 100}%` }}
                                        transition={{ duration: 1 }}
                                        className="h-full bg-gradient-to-r from-pink-400 to-pink-500 relative group cursor-help"
                                        title={`Kadın: ${genderFemale} kişi (%${Math.round((genderFemale / genderKnownTotal) * 100)})`}
                                      />
                                      <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(genderMale / genderKnownTotal) * 100}%` }}
                                        transition={{ duration: 1, delay: 0.1 }}
                                        className="h-full bg-gradient-to-r from-blue-400 to-blue-500 relative group cursor-help"
                                        title={`Erkek: ${genderMale} kişi (%${Math.round((genderMale / genderKnownTotal) * 100)})`}
                                      />
                                    </div>

                                    {/* Gender Legend */}
                                    <div className="grid grid-cols-2 gap-2 text-xs">
                                      <div className="flex items-center gap-1.5">
                                        <span className="w-2.5 h-2.5 rounded-full bg-pink-500 shrink-0" />
                                        <div className="flex flex-col">
                                          <span className="font-bold text-slate-700">Kadın</span>
                                          <span className="text-[10px] font-black text-pink-600 leading-none">
                                            %{Math.round((genderFemale / genderKnownTotal) * 100)} <span className="text-slate-400 font-normal">({genderFemale})</span>
                                          </span>
                                        </div>
                                      </div>
                                      <div className="flex items-center gap-1.5 justify-end text-right">
                                        <div className="flex flex-col items-end">
                                          <span className="font-bold text-slate-700">Erkek</span>
                                          <span className="text-[10px] font-black text-blue-600 leading-none">
                                            %{Math.round((genderMale / genderKnownTotal) * 100)} <span className="text-slate-400 font-normal">({genderMale})</span>
                                          </span>
                                        </div>
                                        <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0" />
                                      </div>
                                    </div>
                                  </div>

                                  {/* Divider */}
                                  <div className="border-t border-slate-100 my-4" />

                                  {/* School Section */}
                                  <div className="space-y-2.5">
                                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em]">
                                      En Aktif Okul
                                    </div>
                                    {selectedYearData?.topSchools && selectedYearData.topSchools.length > 0 ? (
                                      <div className="bg-slate-50/70 border border-slate-100 rounded-2xl p-3 flex flex-col gap-2 hover:bg-slate-50 transition-colors">
                                        <div className="flex items-start gap-2.5">
                                          <div className="w-6 h-6 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center shrink-0 border border-blue-100/30">
                                            <Globe className="w-3.5 h-3.5" />
                                          </div>
                                          <div className="flex-1 min-w-0">
                                            <p className="text-xs font-bold text-slate-800 leading-snug break-words">
                                              {selectedYearData.topSchools[0].name}
                                            </p>
                                            <p className="text-[10px] font-black text-blue-600 mt-0.5">
                                              {selectedYearData.topSchools[0].val} Katılımcı <span className="text-slate-400 font-normal">(%100)</span>
                                            </p>
                                          </div>
                                        </div>
                                        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                          <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: "100%" }}
                                            transition={{ duration: 1, delay: 0.2 }}
                                            className="h-full bg-blue-500 rounded-full"
                                          />
                                        </div>
                                      </div>
                                    ) : (
                                      <div className="text-xs text-slate-500">Okul bilgisi bulunamadı.</div>
                                    )}
                                  </div>
                                </div>
                                <p className="mt-4 text-[9px] font-medium text-slate-400 leading-snug uppercase tracking-[0.1em]">
                                  Tek okul üzerinden tam katılım sağlanmıştır.
                                </p>
                              </motion.div>
                            )}
                            <motion.div
                              initial={{ opacity: 0, y: 16 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              className="min-w-0 bg-white/70 backdrop-blur-3xl border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] lg:rounded-[2.5rem] border p-6 sm:p-8 md:p-10 shadow-sm flex flex-col h-full relative overflow-hidden hover:shadow-xl hover:shadow-teal-100/40 transition-all justify-start"
                            >
                              <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                                  <Target className="w-4 h-4" />
                                </div>
                                <div>
                                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Program Özeti</p>
                                  <p className="text-xs font-bold text-slate-900 leading-tight">
                                    {isUomlProgram ? "UÖML Eğitim Programı" : isEmpowerMe2025 ? "EmpowerMe Zirvesi" : "Empower Me · Yüz Yüze"}
                                  </p>
                                </div>
                              </div>
                              <ul className="space-y-4 mt-2 text-sm">
                                <li className="flex justify-between gap-3 border-b border-slate-100 pb-3">
                                  <span className="text-slate-600 font-medium">Katılımcı</span>
                                  <span className="font-black text-slate-900">{selectedYearData?.participants ?? (isEmpowerMe2025 ? 30 : 29)}</span>
                                </li>
                                <li className="flex justify-between gap-3 border-b border-slate-100 pb-3">
                                  <span className="text-slate-600 font-medium">Süre</span>
                                  <span className="font-black text-slate-900 text-right">
                                    {isUomlProgram ? "5 Eylül - 22 Ekim 2025" : isEmpowerMe2025 ? "27–29 Kasım 2025" : "12–14 Ara 2024"}
                                  </span>
                                </li>
                                <li className="flex justify-between gap-3 border-b border-slate-100 pb-3">
                                  <span className="text-slate-600 font-medium">Konum</span>
                                  <span className="font-black text-slate-900">{isUomlProgram ? "UÖML Salonu & Meet" : "İstanbul"}</span>
                                </li>
                                <li className="flex justify-between gap-3">
                                  {isUomlProgram ? (
                                    <>
                                      <span className="text-slate-600 font-medium">Format</span>
                                      <span className="font-black text-teal-700">Yüz Yüze + Online</span>
                                    </>
                                  ) : (
                                    <>
                                      <span className="text-slate-600 font-medium">Memnuniyet</span>
                                      <span className="font-black text-teal-700">
                                        {isEmpowerMe2025 ? "4,80 / 5" : "4,57 / 5"}
                                      </span>
                                    </>
                                  )}
                                </li>
                              </ul>
                              <p className="mt-5 text-[11px] text-slate-500 leading-relaxed">
                                Katılımcıların tamamı İstanbul merkezli olduğundan coğrafi harita yerine program metrikleri öne çıkarılmıştır.
                              </p>
                            </motion.div>
                          </motion.div>
                        )}

{usesGalatasarayCompactLayout && (
                          <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full items-stretch"
                          >
                            {showAgeChart && (
                              <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="min-w-0 bg-white/70 backdrop-blur-3xl border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] lg:rounded-[2.5rem] border p-6 sm:p-8 md:p-10 shadow-sm flex flex-col h-full relative overflow-hidden hover:shadow-xl hover:shadow-amber-100/40 transition-all justify-start"
                              >
                                <motion.div className="flex items-center gap-3 mb-4">
                                  <motion.div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                                    <Users className="w-4 h-4" />
                                  </motion.div>
                                  <div>
                                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Yaş Aralığı</div>
                                  </div>
                                </motion.div>
                                <motion.div className="h-[220px] w-full mt-4 min-h-[200px]">
                                  <ResponsiveContainer width="100%" height="100%">
                                    {(() => {
                                      const ageData = selectedYearData?.ageData ?? [];
                                      return (
                                        <BarChart layout="vertical" data={ageData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                                          <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#E2E8F0" opacity={0.5} />
                                          <XAxis type="number" hide />
                                          <YAxis dataKey="age" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b', fontWeight: 700 }} width={48} interval={0} />
                                          <Tooltip cursor={{ fill: '#F1F5F9' }} contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                                          <Bar dataKey="count" fill="#d97706" radius={[0, 4, 4, 0]} barSize={16}>
                                            <LabelList dataKey="count" position="right" style={{ fill: '#64748b', fontSize: 10, fontWeight: 800 }} />
                                          </Bar>
                                        </BarChart>
                                      );
                                    })()}
                                  </ResponsiveContainer>
                                </motion.div>
                              </motion.div>
                            )}
                            {hasEduData && (
                              <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="min-w-0 bg-white/70 backdrop-blur-3xl border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] lg:rounded-[2.5rem] border p-6 sm:p-8 md:p-10 shadow-sm flex flex-col h-full relative overflow-hidden hover:shadow-xl hover:shadow-amber-100/40 transition-all justify-start"
                              >
                                <div className="flex items-center gap-3 mb-4">
                                  <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                                    <GraduationCap className="w-4 h-4" />
                                  </div>
                                  <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Eğitim Durumu</p>
                                  </div>
                                </div>
                                <div className="space-y-4 mt-2">
                                  {selectedYearData.educationLevels.filter(ed => Math.round((ed.count / selectedYearData.participants) * 100) > 0).map((ed, i) => (
                                    <div key={ed.name} className="flex flex-col gap-1.5" title={`${ed.count} Kişi`}>
                                      <div className="flex justify-between items-center text-xs gap-2">
                                        <span className="font-bold text-slate-700 min-w-0 break-words">{ed.name}</span>
                                        <span className="font-black text-amber-600 shrink-0">%{Math.round((ed.count / selectedYearData.participants) * 100)}</span>
                                      </div>
                                      <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                                        <motion.div
                                          initial={{ width: 0 }}
                                          animate={{ width: `${(ed.count / selectedYearData.participants) * 100}%` }}
                                          transition={{ duration: 1, delay: i * 0.1 }}
                                          className="h-full bg-amber-500 rounded-full"
                                        />
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                            <motion.div
                              initial={{ opacity: 0, y: 16 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              className="min-w-0 bg-white/70 backdrop-blur-3xl border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] lg:rounded-[2.5rem] border p-6 sm:p-8 md:p-10 shadow-sm flex flex-col h-full relative overflow-hidden hover:shadow-xl hover:shadow-amber-100/40 transition-all justify-start"
                            >
                              <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                                  <Target className="w-4 h-4" />
                                </div>
                                <div>
                                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Program Özeti</p>
                                  <p className="text-xs font-bold text-slate-900 leading-tight">Galatasaray Lisesi Pilotu</p>
                                </div>
                              </div>
                              <ul className="space-y-4 mt-2 text-sm">
                                <li className="flex justify-between gap-3 border-b border-slate-100 pb-3">
                                  <span className="text-slate-600 font-medium">Katılımcı</span>
                                  <span className="font-black text-slate-900">{selectedYearData?.participants ?? 31} öğretmen</span>
                                </li>
                                <li className="flex justify-between gap-3 border-b border-slate-100 pb-3">
                                  <span className="text-slate-600 font-medium">Süre</span>
                                  <span className="font-black text-slate-900 text-right">Mayıs 2023</span>
                                </li>
                                <li className="flex justify-between gap-3 border-b border-slate-100 pb-3">
                                  <span className="text-slate-600 font-medium">Konum</span>
                                  <span className="font-black text-slate-900">Galatasaray Lisesi</span>
                                </li>
                                <li className="flex justify-between gap-3">
                                  <span className="text-slate-600 font-medium">Odak</span>
                                  <span className="font-black text-red-700 text-right">21. yy yetkinlikleri</span>
                                </li>
                              </ul>
                              <p className="mt-5 text-[11px] text-slate-500 leading-relaxed">
                                Tüm katılımcılar İstanbul/Galatasaray Lisesi merkezli olduğundan geniş harita yerine program metrikleri öne çıkarılmıştır.
                              </p>
                            </motion.div>
                          </motion.div>
                        )}

                        
                        {/* İlk Ders 2023: yaş, eğitim, branş üstte yan yana; harita altta tam genişlik */}
                        {isIlkDersProgram && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8 w-full items-stretch">
                            {showAgeChart && (
                              <div className="min-w-0 bg-white/70 backdrop-blur-3xl border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] lg:rounded-[2.5rem] border p-6 sm:p-8 md:p-10 shadow-sm flex flex-col h-full relative overflow-hidden hover:shadow-xl hover:shadow-indigo-100/40 transition-all justify-start">
                                <div>
                                  <div className="flex items-center gap-3 mb-4">
                                    <motion.div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-500 flex items-center justify-center shrink-0">
                                      <Users className="w-4 h-4" />
                                    </motion.div>
                                    <div>
                                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Yaş Aralığı</div>
                                    </div>
                                  </div>
                                  <div className="h-[220px] w-full mt-4 min-h-[200px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                      {(() => {
                                        const ageData = selectedYearData?.ageData ?? [];
                                        return (
                                          <BarChart layout="vertical" data={ageData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#E2E8F0" opacity={0.5} />
                                            <XAxis type="number" hide />
                                            <YAxis dataKey="age" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b', fontWeight: 700 }} width={48} interval={0} />
                                            <Tooltip cursor={{ fill: '#F1F5F9' }} contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                                            <Bar dataKey="count" fill="#6366f1" radius={[0, 4, 4, 0]} barSize={16}>
                                              <LabelList dataKey="count" position="right" style={{ fill: '#64748b', fontSize: 10, fontWeight: 800 }} />
                                            </Bar>
                                          </BarChart>
                                        );
                                      })()}
                                    </ResponsiveContainer>
                                  </div>
                                </div>
                              </div>
                            )}
                            {hasEduData && (
                              <motion.div className="min-w-0 bg-white/70 backdrop-blur-3xl border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] lg:rounded-[2.5rem] border p-6 sm:p-8 md:p-10 shadow-sm flex flex-col h-full relative overflow-hidden hover:shadow-xl hover:shadow-indigo-100/40 transition-all justify-start">
                                <div>
                                  <div className="flex items-center gap-3 mb-4">
                                    <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-500 flex items-center justify-center shrink-0">
                                      <GraduationCap className="w-4 h-4" />
                                    </div>
                                    <div>
                                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Eğitim Durumu</p>
                                    </div>
                                  </div>
                                  <div className="space-y-4 mt-2">
                                    {selectedYearData.educationLevels.filter(ed => Math.round((ed.count / selectedYearData.participants) * 100) > 0).map((ed, i) => (
                                      <div key={ed.name} className="flex flex-col gap-1.5" title={`${ed.count} Kişi`}>
                                        <div className="flex justify-between items-center text-xs gap-2">
                                          <span className="font-bold text-slate-700 min-w-0 break-words">{ed.name}</span>
                                          <span className="font-black text-indigo-600 shrink-0">%{Math.round((ed.count / selectedYearData.participants) * 100)}</span>
                                        </div>
                                        <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                                          <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(ed.count / selectedYearData.participants) * 100}%` }}
                                            transition={{ duration: 1, delay: i * 0.1 }}
                                            className="h-full bg-indigo-500 rounded-full"
                                          />
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </motion.div>
                            )}
                            {selectedYearData?.topSchools && selectedYearData.topSchools.length > 0 && (
                              <div className="min-w-0 bg-white/70 backdrop-blur-3xl border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] lg:rounded-[2.5rem] border p-6 sm:p-8 md:p-10 shadow-sm flex flex-col h-full relative overflow-hidden hover:shadow-xl hover:shadow-blue-100/40 transition-all justify-start">
                                <motion.div>
                                  <div className="flex items-center gap-3 mb-4">
                                    <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
                                      <Globe className="w-4 h-4" />
                                    </div>
                                    <div>
                                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Branş</p>
                                      <p className="text-xs font-bold text-slate-900 leading-tight">En Aktif Okullar</p>
                                    </div>
                                  </div>
                                  <div className="space-y-3.5 mt-2">
                                    {selectedYearData.topSchools.slice(0, 5).map((school, i) => (
                                      <div key={school.name} className="flex items-center gap-3 group">
                                        <span className="text-[10px] font-black text-slate-400 w-3 shrink-0">{i + 1}.</span>
                                        <div className="flex-1 min-w-0">
                                          <div className="flex justify-between items-start text-xs mb-1.5 gap-2">
                                            <span className="font-bold text-slate-700 group-hover:text-blue-600 transition-colors break-words" style={{ lineHeight: '1.2' }}>{school.name}</span>
                                            <span className="text-[10px] whitespace-nowrap pt-0.5 font-black text-slate-900 shrink-0">{school.val} Kişi</span>
                                          </div>
                                          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                            <motion.div
                                              initial={{ width: 0 }}
                                              whileInView={{ width: `${(school.val / selectedYearData.topSchools[0].val) * 100}%` }}
                                              transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                                              className="h-full rounded-full bg-blue-500"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </motion.div>
                              </div>
                            )}
                            {selectedYearData?.topDepartments && selectedYearData.topDepartments.length > 0 && (
                              <div className="min-w-0 bg-white/70 backdrop-blur-3xl border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] lg:rounded-[2.5rem] border p-6 sm:p-8 md:p-10 shadow-sm flex flex-col h-full relative overflow-hidden hover:shadow-xl hover:shadow-blue-100/40 transition-all justify-start">
                                <div>
                                  <div className="flex items-center gap-3 mb-4">
                                    <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
                                      <GraduationCap className="w-4 h-4" />
                                    </div>
                                    <div>
                                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Branş</p>
                                      <p className="text-xs font-bold text-slate-900 leading-tight">En Aktif Bölümler</p>
                                    </div>
                                  </div>
                                  <div className="space-y-3.5 mt-2">
                                    {selectedYearData.topDepartments.slice(0, 5).map((dept, i) => {
                                      const deptName = typeof dept === 'string' ? dept : dept.name;
                                      const deptVal = typeof dept === 'string' ? null : dept.val;
                                      const maxVal = typeof selectedYearData.topDepartments[0] === 'string' ? 100 : selectedYearData.topDepartments[0].val;
                                      const widthVal = deptVal === null ? `${100 - (i * 15)}%` : `${(deptVal / maxVal) * 100}%`;
                                      return (
                                        <div key={deptName} className="flex items-center gap-3 group">
                                          <span className="text-[10px] font-black text-slate-400 w-3 shrink-0">{i + 1}.</span>
                                          <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-start text-xs mb-1.5 gap-2">
                                              <span className="font-bold text-slate-700 group-hover:text-blue-600 transition-colors break-words" style={{ lineHeight: '1.2' }}>{deptName}</span>
                                              {deptVal !== null && (
                                                <span className="text-[10px] whitespace-nowrap pt-0.5 font-black text-slate-900 shrink-0">{deptVal} Kişi</span>
                                              )}
                                            </div>
                                            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                              <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: widthVal }}
                                                transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                                                className="h-full rounded-full bg-blue-500"
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        {/* EmpowerMe 2025: Cinsiyet Dengesi + Okullar + Bölümler Yan Yana */}
                        {isEmpowerMe2025 && (
                          <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 w-full items-stretch mt-6 sm:mt-8"
                          >
                            {/* Gender Donut Chart */}
                            <div className="bg-white/70 backdrop-blur-3xl border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] lg:rounded-[2.5rem] border p-6 sm:p-8 md:p-10 shadow-sm flex flex-col min-w-0 h-full relative overflow-x-clip overflow-y-visible hover:shadow-xl hover:shadow-pink-100/40 transition-all justify-between">
                              {/* Header */}
                              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                                <div className="w-8 h-8 rounded-xl bg-pink-50 text-pink-500 flex items-center justify-center shrink-0">
                                  <Sparkles className="w-4 h-4" />
                                </div>
                                <div>
                                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Cinsiyet Dengesi</p>
                                </div>
                              </div>
                              
                              {/* Centered Chart Content */}
                              <div className="flex-1 w-full min-w-0 flex flex-col items-center justify-center mt-2 mb-2">
                                {/* Donut Chart */}
                                <div className="h-[152px] w-[152px] sm:h-[168px] sm:w-[168px] relative shrink-0 mb-5">
                                  <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                      <Pie
                                        data={genderPieSegments}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={52}
                                        outerRadius={72}
                                        paddingAngle={4}
                                        dataKey="value"
                                        stroke="none"
                                      >
                                        {genderPieSegments.map((seg, index) => (
                                          <Cell key={`gender-seg-empowerme-${seg.name}-${index}`} fill={seg.color} />
                                        ))}
                                      </Pie>
                                      <Tooltip cursor={false} contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} itemStyle={{ fontSize: '12px', fontWeight: 'bold' }} />
                                    </PieChart>
                                  </ResponsiveContainer>
                                </div>
                                
                                {/* Legend */}
                                <div
                                  className={cn(
                                    'grid w-full max-w-full min-w-0 gap-x-3 gap-y-5 px-1',
                                    genderOther > 0 ? 'grid-cols-3' : 'grid-cols-2 max-w-[16rem]',
                                  )}
                                >
                                  <div
                                    className="min-w-0 flex flex-col items-center text-center justify-start gap-y-2"
                                    title={`${genderFemale.toLocaleString('tr-TR')} kişi`}
                                  >
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-center gap-1 w-full px-0.5">
                                      <span className="inline-block w-3 h-3 rounded-full bg-pink-500 shrink-0 mx-auto sm:mx-0" />
                                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider truncate max-w-full">Kadın</span>
                                    </div>
                                    <span className="text-xl sm:text-2xl font-black tabular-nums tracking-tight text-slate-900 leading-none whitespace-nowrap">
                                      {formatGenderPctLabel(genderFemale)}
                                    </span>
                                  </div>
                                  <div
                                    className="min-w-0 flex flex-col items-center text-center justify-start gap-y-2"
                                    title={`${genderMale.toLocaleString('tr-TR')} kişi`}
                                  >
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-center gap-1 w-full px-0.5">
                                      <span className="inline-block w-3 h-3 rounded-full bg-blue-500 shrink-0 mx-auto sm:mx-0" />
                                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider truncate max-w-full">Erkek</span>
                                    </div>
                                    <span className="text-xl sm:text-2xl font-black tabular-nums tracking-tight text-slate-900 leading-none whitespace-nowrap">
                                      {formatGenderPctLabel(genderMale)}
                                    </span>
                                  </div>
                                </div>
                                <p className="mt-5 text-[9px] sm:text-[10px] font-medium text-slate-400 text-center max-w-[18rem] leading-snug uppercase tracking-[0.12em]">
                                  Oranlar, cinsiyet bilgisinin bildirildiği kayıtlar üzerinden
                                </p>
                              </div>
                            </div>

                            {/* En Aktif Okullar */}
                            {selectedYearData?.topSchools && selectedYearData.topSchools.length > 0 && (
                              <div className="bg-white/70 backdrop-blur-3xl border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] lg:rounded-[2.5rem] border p-6 sm:p-8 md:p-10 shadow-sm flex flex-col min-w-0 h-full relative overflow-hidden hover:shadow-xl hover:shadow-blue-100/40 transition-all justify-start">
                                <div>
                                  <div className="flex items-center gap-3 mb-4">
                                    <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
                                      <Globe className="w-4 h-4" />
                                    </div>
                                    <div>
                                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Akademik Profil</p>
                                      <p className="text-xs font-bold text-slate-900 leading-tight">En Aktif Okullar</p>
                                    </div>
                                  </div>
                                  <div className="space-y-3.5 mt-2">
                                    {selectedYearData.topSchools.slice(0, 5).map((school, i) => (
                                      <div key={school.name} className="flex items-center gap-3 group">
                                        <span className="text-[10px] font-black text-slate-400 w-3">{i + 1}.</span>
                                        <div className="flex-1 min-w-0">
                                          <div className="flex justify-between items-start text-xs mb-1.5 gap-2">
                                            <span className="font-bold text-slate-700 group-hover:text-blue-600 transition-colors" style={{ wordBreak: 'break-word', lineHeight: '1.2' }}>{school.name}</span>
                                            <span className="text-[10px] whitespace-nowrap pt-0.5 font-black text-slate-900">{school.val} Kişi</span>
                                          </div>
                                          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                            <motion.div
                                              initial={{ width: 0 }}
                                              whileInView={{ width: `${(school.val / selectedYearData.topSchools[0].val) * 100}%` }}
                                              transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                                              className="h-full rounded-full bg-blue-500"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* En Aktif Bölümler */}
                            {selectedYearData?.topDepartments && selectedYearData.topDepartments.length > 0 && (
                              <div className="bg-white/70 backdrop-blur-3xl border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] lg:rounded-[2.5rem] border p-6 sm:p-8 md:p-10 shadow-sm flex flex-col min-w-0 h-full relative overflow-hidden hover:shadow-xl hover:shadow-blue-100/40 transition-all justify-start">
                                <div>
                                  <div className="flex items-center gap-3 mb-4">
                                    <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
                                      <GraduationCap className="w-4 h-4" />
                                    </div>
                                    <div>
                                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Akademik Profil</p>
                                      <p className="text-xs font-bold text-slate-900 leading-tight">En Aktif Bölümler</p>
                                    </div>
                                  </div>
                                  <div className="space-y-3.5 mt-2">
                                    {selectedYearData.topDepartments.slice(0, 5).map((dept, i) => {
                                      const deptName = typeof dept === 'string' ? dept : dept.name;
                                      const deptVal = typeof dept === 'string' ? null : dept.val;
                                      const maxVal = typeof selectedYearData.topDepartments[0] === 'string' ? 100 : selectedYearData.topDepartments[0].val;
                                      const widthVal = deptVal === null ? `${100 - (i * 15)}%` : `${(deptVal / maxVal) * 100}%`;

                                      return (
                                        <div key={deptName} className="flex items-center gap-3 group">
                                          <span className="text-[10px] font-black text-slate-400 w-3">{i + 1}.</span>
                                          <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-start text-xs mb-1.5 gap-2">
                                              <span className="font-bold text-slate-700 group-hover:text-blue-600 transition-colors" style={{ wordBreak: 'break-word', lineHeight: '1.2' }}>{deptName}</span>
                                              {deptVal !== null && (
                                                <span className="text-[10px] whitespace-nowrap pt-0.5 font-black text-slate-900">{deptVal} Kişi</span>
                                              )}
                                            </div>
                                            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                              <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: widthVal }}
                                                transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                                                className="h-full rounded-full bg-blue-500"
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              </div>
                            )}
                          </motion.div>
                        )}

                        {/* EmpowerMe 2025: Özel Etkileşimli Değerlendirme Raporu */}
                        {isEmpowerMe2025 && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="w-full bg-white/80 backdrop-blur-3xl border border-slate-200/80 shadow-[0_16px_45px_rgba(15,23,42,0.08)] rounded-[2.5rem] p-6 sm:p-8 md:p-10 relative overflow-hidden mt-8"
                          >
                            <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-indigo-50/50 to-transparent pointer-events-none" />
                            
                            {/* Başlık ve Badge */}
                            <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                              <div>
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-indigo-50 text-indigo-600 border border-indigo-100/80 mb-3 tracking-wider uppercase">
                                  <Sparkles className="w-3.5 h-3.5 animate-pulse" /> Genel Değerlendirme Raporu
                                </span>
                                <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-tight">
                                  EmpowerMe Zirvesi Beceriler Analizi
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-500 font-semibold mt-1">
                                  Aralık 2025 · 21. Yüzyıl Yetkinlikleri Eğitmen Eğitimi Detaylı Çıktıları
                                </p>
                              </div>
                              
                              {/* Sekme Butonları (Tabs) */}
                              <div className="flex flex-wrap gap-1.5 p-1 bg-slate-100/80 rounded-2xl border border-slate-200/40 self-start md:self-center">
                                <button
                                  onClick={() => setEmpowerMeTab('summary')}
                                  className={cn(
                                    "px-4 py-2 text-xs font-black rounded-xl transition-all flex items-center gap-2",
                                    empowerMeTab === 'summary'
                                      ? "bg-white text-indigo-600 shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-slate-200/20"
                                      : "text-slate-600 hover:text-indigo-600 hover:bg-white/50"
                                  )}
                                >
                                  <Info className="w-3.5 h-3.5" />
                                  Yönetici Özeti
                                </button>
                                <button
                                  onClick={() => setEmpowerMeTab('program')}
                                  className={cn(
                                    "px-4 py-2 text-xs font-black rounded-xl transition-all flex items-center gap-2",
                                    empowerMeTab === 'program'
                                      ? "bg-white text-indigo-600 shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-slate-200/20"
                                      : "text-slate-600 hover:text-indigo-600 hover:bg-white/50"
                                  )}
                                >
                                  <Presentation className="w-3.5 h-3.5" />
                                  Eğitim Akışı
                                </button>
                                <button
                                  onClick={() => setEmpowerMeTab('metrics')}
                                  className={cn(
                                    "px-4 py-2 text-xs font-black rounded-xl transition-all flex items-center gap-2",
                                    empowerMeTab === 'metrics'
                                      ? "bg-white text-indigo-600 shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-slate-200/20"
                                      : "text-slate-600 hover:text-indigo-600 hover:bg-white/50"
                                  )}
                                >
                                  <TrendingUp className="w-3.5 h-3.5" />
                                  Ön / Son Test
                                </button>
                                <button
                                  onClick={() => setEmpowerMeTab('outcomes')}
                                  className={cn(
                                    "px-4 py-2 text-xs font-black rounded-xl transition-all flex items-center gap-2",
                                    empowerMeTab === 'outcomes'
                                      ? "bg-white text-indigo-600 shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-slate-200/20"
                                      : "text-slate-600 hover:text-indigo-600 hover:bg-white/50"
                                  )}
                                >
                                  <Sparkles className="w-3.5 h-3.5" />
                                  Çıktı & Öneri
                                </button>
                              </div>
                            </div>

                            {/* Sekme İçerikleri */}
                            <div className="relative mt-6 min-h-[300px]">
                              {/* 1. Yönetici Özeti & Künye */}
                              {empowerMeTab === 'summary' && (
                                <motion.div
                                  initial={{ opacity: 0, x: 10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0, x: -10 }}
                                  transition={{ duration: 0.3 }}
                                  className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                                >
                                  {/* Künye Bölümü */}
                                  <div className="lg:col-span-1 space-y-4">
                                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Program Künyesi</div>
                                    <div className="bg-slate-50/80 border border-slate-100 rounded-3xl p-5 space-y-4 shadow-inner">
                                      <div className="flex justify-between items-center text-xs pb-3.5 border-b border-slate-200/60">
                                        <span className="text-slate-500 font-bold">Program Adı</span>
                                        <span className="font-black text-slate-800 text-right">EmpowerMe - Gençlik Zirvesi</span>
                                      </div>
                                      <div className="flex justify-between items-center text-xs pb-3.5 border-b border-slate-200/60">
                                        <span className="text-slate-500 font-bold">Tarih</span>
                                        <span className="font-black text-slate-800">27–29 Kasım 2025</span>
                                      </div>
                                      <div className="flex justify-between items-center text-xs pb-3.5 border-b border-slate-200/60">
                                        <span className="text-slate-500 font-bold">Süre</span>
                                        <span className="font-black text-slate-800">3 Tam Gün</span>
                                      </div>
                                      <div className="flex justify-between items-center text-xs pb-3.5 border-b border-slate-200/60">
                                        <span className="text-slate-500 font-bold">Katılımcı</span>
                                        <span className="font-black text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100">30 Genç Lider</span>
                                      </div>
                                      <div className="flex justify-between items-center text-xs pb-3.5 border-b border-slate-200/60">
                                        <span className="text-slate-500 font-bold">Eğitmen Kadrosu</span>
                                        <span className="font-black text-slate-800">2 Eğitmen, 1 Kolaylaştırıcı</span>
                                      </div>
                                      <div className="flex justify-between items-center text-xs">
                                        <span className="text-slate-500 font-bold">Uygulama Türü</span>
                                        <span className="font-black text-slate-800">Yüz Yüze (İstanbul)</span>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Yönetici Özeti ve Program Amacı */}
                                  <div className="lg:col-span-2 space-y-6">
                                    <div>
                                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Yönetici Özeti</div>
                                      <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/30 rounded-full blur-xl pointer-events-none" />
                                        <p className="text-sm text-slate-600 leading-relaxed font-medium">
                                          21. Yüzyıl Yetkinlikleri Eğitmen Eğitimi, gençlerin hızla değişen dünyada yalnızca bilgi sahibi bireyler olarak kalmayıp; 
                                          kendini tanıyan, ekiplerle etkili biçimde çalışabilen, teknolojiyi bilinçli kullanan ve öğrendiklerini akranlarına 
                                          aktarabilen toplumsal dönüşüm öncüleri olarak yetişmelerini hedefleyen kapsamlı bir programdır.
                                        </p>
                                        <p className="text-sm text-slate-600 leading-relaxed font-medium mt-4">
                                          İstanbul merkezli olarak gerçekleştirilen bu 3 günlük yüz yüze zirve, katılımcılara hem teorik altyapıyı 
                                          kazandırmış hem de mikro-öğretim simülasyonları ile eğitmenlik reflekslerini pratik bir düzlemde geliştirme 
                                          fırsatı sunmuştur.
                                        </p>
                                      </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                      <div className="bg-slate-50/60 rounded-2xl border border-slate-100 p-5 flex gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-violet-100 text-violet-600 flex items-center justify-center shrink-0">
                                          <Target className="w-5 h-5" />
                                        </div>
                                        <div>
                                          <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">Temel Hedef</h4>
                                          <p className="text-xs text-slate-500 font-semibold mt-1 leading-relaxed">
                                            Gençlerin öz farkındalık, problem çözme ve hitabet gibi 21. yüzyıl yetkinliklerini edinerek eğitici roller üstlenmesi.
                                          </p>
                                        </div>
                                      </div>
                                      <div className="bg-slate-50/60 rounded-2xl border border-slate-100 p-5 flex gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center shrink-0">
                                          <Brain className="w-5 h-5" />
                                        </div>
                                        <div>
                                          <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">Teknolojik Boyut</h4>
                                          <p className="text-xs text-slate-500 font-semibold mt-1 leading-relaxed">
                                            Eğitimde yapay zekâ entegrasyonu, Padlet ve Genially gibi interaktif araçlarla dijital üretim becerilerinin artırılması.
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </motion.div>
                              )}

                              {/* 2. 3 Günlük Eğitim Akışı */}
                              {empowerMeTab === 'program' && (
                                <motion.div
                                  initial={{ opacity: 0, x: 10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0, x: -10 }}
                                  transition={{ duration: 0.3 }}
                                  className="space-y-6"
                                >
                                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Program Takvimi ve Akışı</div>
                                  <div className="relative pl-6 sm:pl-8 border-l border-slate-200 space-y-8">
                                    
                                    {/* 1. Gün */}
                                    <div className="relative group">
                                      <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-6 h-6 rounded-full bg-indigo-500 text-white flex items-center justify-center text-[10px] font-black border-4 border-white shadow-md transition-transform group-hover:scale-110">
                                        1
                                      </div>
                                      <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                                          <div>
                                            <span className="text-xs font-black text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100">1. GÜN</span>
                                            <h4 className="text-base font-black text-slate-900 tracking-tight mt-1.5">
                                              Temel Yetkinlikler, Öz Farkındalık & Uyum
                                            </h4>
                                          </div>
                                          <span className="text-xs font-bold text-slate-400">27 Kasım 2025 · 09:30 - 17:00</span>
                                        </div>
                                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-semibold">
                                          İlk gün, katılımcıların birbirleriyle ve YetGen kültürüyle kaynaşması adına buz kırıcılar ve akran öğrenmesi kurgularıyla başladı. 
                                          Öz farkındalık çalışmaları kapsamında SWOT analizleri yapıldı ve etkili iletişim, takımdaşlık pratikleri gerçekleştirildi.
                                        </p>
                                        <div className="mt-4 flex items-start gap-2 bg-indigo-50/40 border border-indigo-100/50 rounded-2xl p-3">
                                          <span className="text-indigo-600 text-base shrink-0 pt-0.5">🌱</span>
                                          <div>
                                            <strong className="text-xs font-black text-indigo-900">Öne Çıkan Çalışma: Yetkinlik Ağacı</strong>
                                            <p className="text-xs text-indigo-700 font-semibold mt-0.5">
                                              Katılımcıların kendi güçlü yetkinliklerini ağacın kökleri, geliştirilmesi gereken alanları ise yaprakları olarak modeledikleri interaktif görselleştirme seansı.
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    {/* 2. Gün */}
                                    <div className="relative group">
                                      <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-6 h-6 rounded-full bg-violet-500 text-white flex items-center justify-center text-[10px] font-black border-4 border-white shadow-md transition-transform group-hover:scale-110">
                                        2
                                      </div>
                                      <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                                          <div>
                                            <span className="text-xs font-black text-violet-600 bg-violet-50 px-2.5 py-0.5 rounded-full border border-violet-100">2. GÜN</span>
                                            <h4 className="text-base font-black text-slate-900 tracking-tight mt-1.5">
                                              Tasarım Odaklı Düşünme & Dijital Araç Entegrasyonu
                                            </h4>
                                          </div>
                                          <span className="text-xs font-bold text-slate-400">28 Kasım 2025 · 09:30 - 17:30</span>
                                        </div>
                                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-semibold">
                                          İkinci gün, problem çözme odaklı Tasarım Odaklı Düşünme (Design Thinking) metodolojisiyle başladı. 
                                          Katılımcılar Genially, Canva ve Padlet gibi interaktif dijital araçları kullanarak eğitim içeriği 
                                          tasarlama ve sunum becerilerini güçlendiren atölyelere katıldılar.
                                        </p>
                                        <div className="mt-4 flex items-start gap-2 bg-violet-50/40 border border-violet-100/50 rounded-2xl p-3">
                                          <span className="text-violet-600 text-base shrink-0 pt-0.5">📺</span>
                                          <div>
                                            <strong className="text-xs font-black text-violet-900">Öne Çıkan Çalışma: Sosyal İnovasyon Haber Bülteni</strong>
                                            <p className="text-xs text-violet-700 font-semibold mt-0.5">
                                              Sürdürülebilir Kalkınma Amaçları doğrultusunda tasarlanan sosyal fayda projelerinin, gruplar tarafından canlı bir haber bülteni sunumu şeklinde sahnede canlandırılması.
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    {/* 3. Gün */}
                                    <div className="relative group">
                                      <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-6 h-6 rounded-full bg-teal-500 text-white flex items-center justify-center text-[10px] font-black border-4 border-white shadow-md transition-transform group-hover:scale-110">
                                        3
                                      </div>
                                      <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                                          <div>
                                            <span className="text-xs font-black text-teal-600 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-100">3. GÜN</span>
                                            <h4 className="text-base font-black text-slate-900 tracking-tight mt-1.5">
                                              Mikro-Öğretim Simülasyonları & Liderlik
                                            </h4>
                                          </div>
                                          <span className="text-xs font-bold text-slate-400">29 Kasım 2025 · 09:30 - 18:00</span>
                                        </div>
                                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-semibold">
                                          Son günde kolaylaştırıcılık ve eğitmenlik rolleri ele alındı. Her bir katılımcının sahnede ve dijital mecralarda 
                                          10'ar dakikalık mikro-öğretim simülasyonları gerçekleştirdiği ve akranlarından anlık yapılandırılmış geri bildirim 
                                          aldığı yoğun bir pratik seansı uygulandı. Kapanışta ise sertifika töreni heyecanı paylaşıldı.
                                        </p>
                                        <div className="mt-4 flex items-start gap-2 bg-teal-50/40 border border-teal-100/50 rounded-2xl p-3">
                                          <span className="text-teal-600 text-base shrink-0 pt-0.5">🎓</span>
                                          <div>
                                            <strong className="text-xs font-black text-teal-900">Öne Çıkan Çalışma: Mikro-Öğretim ve Geri Bildirim Döngüsü</strong>
                                            <p className="text-xs text-teal-700 font-semibold mt-0.5">
                                              Her katılımcının eğitici şapkasını giydiği, beden dili, hitabet ve sunum becerilerini sergilediği ve eğitmenler tarafından video analizleri ile değerlendirildiği simülasyon.
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                  </div>
                                </motion.div>
                              )}

                              {/* 3. Ön Test - Son Test Bulguları */}
                              {empowerMeTab === 'metrics' && (
                                <motion.div
                                  initial={{ opacity: 0, x: 10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0, x: -10 }}
                                  transition={{ duration: 0.3 }}
                                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
                                >
                                  {/* İlerleme Barları (Progress metrics) */}
                                  <div className="lg:col-span-7 space-y-6">
                                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Yetkinlik Gelişim Oranları (Ön Test / Son Test)</div>
                                    
                                    {/* 1. Metrik */}
                                    <div className="space-y-2">
                                      <div className="flex justify-between items-center text-xs sm:text-sm">
                                        <span className="font-black text-slate-800">Algoritmik Düşünme Becerisi</span>
                                        <span className="font-black text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full text-xs border border-indigo-100">%70,3 Artış</span>
                                      </div>
                                      <div className="space-y-1.5 bg-slate-50 border border-slate-100 rounded-2xl p-3 shadow-inner">
                                        <div className="flex items-center gap-3">
                                          <span className="text-[10px] font-black text-slate-400 w-12 shrink-0">Ön Test</span>
                                          <div className="flex-1 h-3 bg-slate-200/50 rounded-full overflow-hidden">
                                            <motion.div initial={{ width: 0 }} animate={{ width: '45%' }} className="h-full bg-slate-400 rounded-full" transition={{ duration: 1 }} />
                                          </div>
                                          <span className="text-xs font-black text-slate-600 w-8 text-right">%45</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                          <span className="text-[10px] font-black text-indigo-500 w-12 shrink-0">Son Test</span>
                                          <div className="flex-1 h-3 bg-slate-200/50 rounded-full overflow-hidden">
                                            <motion.div initial={{ width: 0 }} animate={{ width: '76.6%' }} className="h-full bg-indigo-500 rounded-full" transition={{ duration: 1, delay: 0.1 }} />
                                          </div>
                                          <span className="text-xs font-black text-indigo-600 w-8 text-right">%76,6</span>
                                        </div>
                                      </div>
                                    </div>

                                    {/* 2. Metrik */}
                                    <div className="space-y-2">
                                      <div className="flex justify-between items-center text-xs sm:text-sm">
                                        <span className="font-black text-slate-800">21. Yüzyıl Yetkinlikleri Farkındalığı</span>
                                        <span className="font-black text-violet-600 bg-violet-50 px-2.5 py-0.5 rounded-full text-xs border border-violet-100">%46,8 Artış</span>
                                      </div>
                                      <div className="space-y-1.5 bg-slate-50 border border-slate-100 rounded-2xl p-3 shadow-inner">
                                        <div className="flex items-center gap-3">
                                          <span className="text-[10px] font-black text-slate-400 w-12 shrink-0">Ön Test</span>
                                          <div className="flex-1 h-3 bg-slate-200/50 rounded-full overflow-hidden">
                                            <motion.div initial={{ width: 0 }} animate={{ width: '62%' }} className="h-full bg-slate-400 rounded-full" transition={{ duration: 1 }} />
                                          </div>
                                          <span className="text-xs font-black text-slate-600 w-8 text-right">%62</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                          <span className="text-[10px] font-black text-violet-500 w-12 shrink-0">Son Test</span>
                                          <div className="flex-1 h-3 bg-slate-200/50 rounded-full overflow-hidden">
                                            <motion.div initial={{ width: 0 }} animate={{ width: '91%' }} className="h-full bg-violet-500 rounded-full" transition={{ duration: 1, delay: 0.1 }} />
                                          </div>
                                          <span className="text-xs font-black text-violet-600 w-8 text-right">%91</span>
                                        </div>
                                      </div>
                                    </div>

                                    {/* 3. Metrik */}
                                    <div className="space-y-2">
                                      <div className="flex justify-between items-center text-xs sm:text-sm">
                                        <span className="font-black text-slate-800">Eğitmenlik Özgüveni & Sınıf Yönetimi</span>
                                        <span className="font-black text-teal-600 bg-teal-50 px-2.5 py-0.5 rounded-full text-xs border border-teal-100">%76,0 Artış</span>
                                      </div>
                                      <div className="space-y-1.5 bg-slate-50 border border-slate-100 rounded-2xl p-3 shadow-inner">
                                        <div className="flex items-center gap-3">
                                          <span className="text-[10px] font-black text-slate-400 w-12 shrink-0">Ön Test</span>
                                          <div className="flex-1 h-3 bg-slate-200/50 rounded-full overflow-hidden">
                                            <motion.div initial={{ width: 0 }} animate={{ width: '50%' }} className="h-full bg-slate-400 rounded-full" transition={{ duration: 1 }} />
                                          </div>
                                          <span className="text-xs font-black text-slate-600 w-8 text-right">%50</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                          <span className="text-[10px] font-black text-teal-500 w-12 shrink-0">Son Test</span>
                                          <div className="flex-1 h-3 bg-slate-200/50 rounded-full overflow-hidden">
                                            <motion.div initial={{ width: 0 }} animate={{ width: '88%' }} className="h-full bg-teal-500 rounded-full" transition={{ duration: 1, delay: 0.1 }} />
                                          </div>
                                          <span className="text-xs font-black text-teal-600 w-8 text-right">%88</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Memnuniyet Skalaları (Survey stats) */}
                                  <div className="lg:col-span-5 space-y-4">
                                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Zirve Değerlendirme Anketi Skorları</div>
                                    
                                    <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm space-y-4">
                                      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                                        <div>
                                          <h5 className="text-xs font-black text-slate-700">Genel Zirve Memnuniyeti</h5>
                                          <p className="text-[10px] font-bold text-slate-400 mt-0.5">30 katılımcının genel puanı</p>
                                        </div>
                                        <span className="text-lg font-black text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-2xl">4,80 / 5</span>
                                      </div>

                                      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                                        <div>
                                          <h5 className="text-xs font-black text-slate-700">Eğitim İçeriği & Dokümanlar</h5>
                                          <p className="text-[10px] font-bold text-slate-400 mt-0.5">Sunulan materyal kalitesi</p>
                                        </div>
                                        <span className="text-base font-black text-slate-800">4,85 / 5</span>
                                      </div>

                                      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                                        <div>
                                          <h5 className="text-xs font-black text-slate-700">Eğitmen & Kolaylaştırıcı Yetkinliği</h5>
                                          <p className="text-[10px] font-bold text-slate-400 mt-0.5">Oturum liderleri değerlendirmesi</p>
                                        </div>
                                        <span className="text-base font-black text-slate-800">4,92 / 5</span>
                                      </div>

                                      <div className="flex items-center justify-between">
                                        <div>
                                          <h5 className="text-xs font-black text-slate-700">Fiziksel Ortam & Organizasyon</h5>
                                          <p className="text-[10px] font-bold text-slate-400 mt-0.5">Eğitim mekanı ve ikramlar</p>
                                        </div>
                                        <span className="text-base font-black text-slate-800">4,64 / 5</span>
                                      </div>
                                    </div>
                                  </div>
                                </motion.div>
                              )}

                              {/* 4. Çıktılar & Öneriler */}
                              {empowerMeTab === 'outcomes' && (
                                <motion.div
                                  initial={{ opacity: 0, x: 10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0, x: -10 }}
                                  transition={{ duration: 0.3 }}
                                  className="grid grid-cols-1 md:grid-cols-2 gap-8"
                                >
                                  {/* Somut Çıktılar (Outcomes) */}
                                  <div>
                                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Zirve Sonrası Somut Çıktılar</div>
                                    <div className="space-y-4">
                                      
                                      <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
                                        <span className="text-2xl shrink-0">🎓</span>
                                        <div>
                                          <h5 className="text-xs sm:text-sm font-black text-slate-800 uppercase tracking-wide">30 Yeni Beceriler Eğitmeni</h5>
                                          <p className="text-xs text-slate-500 font-semibold mt-1 leading-relaxed">
                                            30 genç lider, 21. yüzyıl yetkinliklerini kendi topluluklarında akranlarına aktarabilecek teorik ve pratik donanıma kavuşarak sertifikalandırıldı.
                                          </p>
                                        </div>
                                      </div>

                                      <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
                                        <span className="text-2xl shrink-0">📂</span>
                                        <div>
                                          <h5 className="text-xs sm:text-sm font-black text-slate-800 uppercase tracking-wide">Dijital Ders Tasarımları & Materyaller</h5>
                                          <p className="text-xs text-slate-500 font-semibold mt-1 leading-relaxed">
                                            Eğitim boyunca Genially ve Padlet üzerinde kurgulanan 10'dan fazla özgün ders kurgusu ve interaktif sunum açık kaynaklı bir kütüphaneye dönüştürüldü.
                                          </p>
                                        </div>
                                      </div>

                                      <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
                                        <span className="text-2xl shrink-0">🤝</span>
                                        <div>
                                          <h5 className="text-xs sm:text-sm font-black text-slate-800 uppercase tracking-wide">Akran Dayanışma & İş Birliği Ağı</h5>
                                          <p className="text-xs text-slate-500 font-semibold mt-1 leading-relaxed">
                                            İstanbul genelinde yer alan farklı üniversitelerden 30 seçkin genç arasında sürdürülebilir bir iş birliği, bilgi ve materyal paylaşım ağı inşa edildi.
                                          </p>
                                        </div>
                                      </div>

                                    </div>
                                  </div>

                                  {/* Stratejik Öneriler (Recommendations) */}
                                  <div>
                                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Gelecek Programlar İçin Öneriler</div>
                                    <div className="space-y-4">

                                      <div className="bg-slate-50 border border-slate-100/60 rounded-3xl p-5 shadow-inner flex items-start gap-4">
                                        <span className="text-2xl shrink-0">⏰</span>
                                        <div>
                                          <h5 className="text-xs sm:text-sm font-black text-slate-800 uppercase tracking-wide">Süre Genişletilmesi ve Derinleşme</h5>
                                          <p className="text-xs text-slate-500 font-semibold mt-1 leading-relaxed">
                                            Dijital araç eğitimleri (özellikle interaktif şablon tasarımları) ve mikro-öğretim pratikleri için ayrılan sürelerin yarımşar gün uzatılarak 3,5 veya 4 güne yayılması.
                                          </p>
                                        </div>
                                      </div>

                                      <div className="bg-slate-50 border border-slate-100/60 rounded-3xl p-5 shadow-inner flex items-start gap-4">
                                        <span className="text-2xl shrink-0">🧭</span>
                                        <div>
                                          <h5 className="text-xs sm:text-sm font-black text-slate-800 uppercase tracking-wide">Sürekli Mentorluk & İzleme Programı</h5>
                                          <p className="text-xs text-slate-500 font-semibold mt-1 leading-relaxed">
                                            Sertifikasını alan yeni eğitmenlerin akran eğitimlerinde yalnız bırakılmaması; ilk 2 eğitim seansında YetGen kıdemli eğitmenlerince izlenip ara değerlendirme yapılması.
                                          </p>
                                        </div>
                                      </div>

                                      <div className="bg-slate-50 border border-slate-100/60 rounded-3xl p-5 shadow-inner flex items-start gap-4">
                                        <span className="text-2xl shrink-0">💡</span>
                                        <div>
                                          <h5 className="text-xs sm:text-sm font-black text-slate-800 uppercase tracking-wide">Sosyal İnovasyon Projelerinin Kuluçkalanması</h5>
                                          <p className="text-xs text-slate-500 font-semibold mt-1 leading-relaxed">
                                            2. gün geliştirilen sürdürülebilir kalkınma projelerinin, YetGen girişimcilik dikeyine (Kuluçka Merkezi vb.) aktarılarak hayata geçirilmesi için fon/mentor desteği sağlanması.
                                          </p>
                                        </div>
                                      </div>

                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </div>
                          </motion.div>
                        )}

                        {/* Age + education: one left column on 12-col map rows so a narrow "icon strip" never appears */}
                        {!isDoping2024Program && !isIlkDersProgram && !usesCompactNoMapLayout && mapRowLeftStack && (
                          <div className="lg:col-span-3 lg:order-1 flex flex-col gap-6 min-w-0">
                            {showAgeChart && (
                              <div className="bg-white/70 backdrop-blur-3xl border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] lg:rounded-[2.5rem] border p-6 sm:p-8 md:p-10 shadow-sm flex flex-col h-full min-w-0 relative overflow-hidden hover:shadow-xl hover:shadow-indigo-100/40 transition-all justify-start">
                                <div>
                                  <div className="flex items-center gap-3 mb-4">
                                    <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-500 flex items-center justify-center shrink-0">
                                      <Users className="w-4 h-4" />
                                    </div>
                                    <div>
                                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Yaş Aralığı</p>
                                      <p className="text-xs font-bold text-slate-900 leading-tight">Genel Yaş Dağılımı</p>
                                    </div>
                                  </div>
                                  <div className="h-[220px] w-full mt-4">
                                    <ResponsiveContainer width="100%" height="100%">
                                      {(() => {
                                        const ageData =
                                          selectedProgram === 'doping-2025'
                                            ? [
                                                { age: '10-12 Yaş', count: 140 },
                                                { age: '13 Yaş', count: 117 },
                                                { age: '14 Yaş', count: 190 },
                                                { age: '15 Yaş', count: 101 },
                                                { age: '16-17 Yaş', count: 67 },
                                                { age: '18+ Yaş', count: 35 },
                                              ]
                                            : (selectedYearData?.ageData ?? []);

                                        return (
                                          <BarChart layout="vertical" data={ageData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#E2E8F0" opacity={0.5} />
                                            <XAxis type="number" hide />
                                            <YAxis dataKey="age" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b', fontWeight: 700 }} width={45} interval={0} />
                                            <Tooltip cursor={{ fill: '#F1F5F9' }} contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                                            <Bar dataKey="count" fill="#6366f1" radius={[0, 4, 4, 0]} barSize={16}>
                                              <LabelList dataKey="count" position="right" style={{ fill: '#64748b', fontSize: 10, fontWeight: 800 }} />
                                            </Bar>
                                          </BarChart>
                                        );
                                      })()}
                                    </ResponsiveContainer>
                                  </div>
                                </div>
                              </div>
                            )}
                            {hasEduData && (
                              <div className="bg-white/70 backdrop-blur-3xl border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] lg:rounded-[2.5rem] border p-6 sm:p-8 md:p-10 shadow-sm flex flex-col min-w-0 h-full relative overflow-hidden hover:shadow-xl hover:shadow-indigo-100/40 transition-all justify-start">
                                <div>
                                  <div className="flex items-center gap-3 mb-4">
                                    <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-500 flex items-center justify-center shrink-0">
                                      <GraduationCap className="w-4 h-4" />
                                    </div>
                                    <div>
                                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Eğitim Durumu</p>
                                      <p className="text-xs font-bold text-slate-900 leading-tight">Öğrenim Seviyeleri</p>
                                    </div>
                                  </div>
                                  <div className="space-y-3.5 mt-2">
                                    {selectedYearData.educationLevels.filter(ed => Math.round((ed.count / selectedYearData.participants) * 100) > 0).slice(0, 5).map((ed, i) => (
                                      <div key={ed.name} className="flex items-center gap-3 group/item" title={`${ed.count} Kişi`}>
                                        <span className="text-[10px] font-black text-slate-400 w-3">{i + 1}.</span>
                                        <div className="flex-1 min-w-0">
                                          <div className="flex justify-between items-start text-xs mb-1.5 gap-2">
                                            <span className="font-bold text-slate-700 group-hover/item:text-indigo-600 transition-colors" style={{ wordBreak: 'break-word', lineHeight: '1.2' }}>{ed.name}</span>
                                            <span className="text-[10px] whitespace-nowrap pt-0.5 font-black text-indigo-600">%{Math.round((ed.count / selectedYearData.participants) * 100)}</span>
                                          </div>
                                          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                            <motion.div
                                              initial={{ width: 0 }}
                                              animate={{ width: `${(ed.count / selectedYearData.participants) * 100}%` }}
                                              transition={{ duration: 1, delay: i * 0.1 }}
                                              className="h-full rounded-full bg-indigo-500"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Age Distribution Mini Chart (standard grid rows) */}
                        {!isDoping2024Program && !isIlkDersProgram && !usesCompactNoMapLayout && !mapRowLeftStack && showAgeChart && (
                          <div
                            className={cn(
                              'bg-white/70 backdrop-blur-3xl border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] lg:rounded-[2.5rem] border p-6 sm:p-8 md:p-10 shadow-sm flex flex-col h-full min-w-0 relative overflow-hidden hover:shadow-xl hover:shadow-indigo-100/40 transition-all justify-start',
                              isIyiNiyetProgram && usesTwelveColMapRow ? 'lg:col-span-3 lg:order-1' : '',
                            )}
                          >
                            <div>
                              <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-500 flex items-center justify-center shrink-0">
                                  <Users className="w-4 h-4" />
                                </div>
                                <div>
                                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Yaş Aralığı</p>
                                  <p className="text-xs font-bold text-slate-900 leading-tight">Genel Yaş Dağılımı</p>
                                </div>
                              </div>
                              <div className="h-[220px] w-full mt-4">
                                <ResponsiveContainer width="100%" height="100%">
                                  {(() => {
                                    const ageData =
                                      selectedProgram === 'doping-2025'
                                        ? [
                                            { age: '10-12 Yaş', count: 140 },
                                            { age: '13 Yaş', count: 117 },
                                            { age: '14 Yaş', count: 190 },
                                            { age: '15 Yaş', count: 101 },
                                            { age: '16-17 Yaş', count: 67 },
                                            { age: '18+ Yaş', count: 35 },
                                          ]
                                        : (selectedYearData?.ageData ?? []);

                                    return (
                                      <BarChart layout="vertical" data={ageData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#E2E8F0" opacity={0.5} />
                                        <XAxis type="number" hide />
                                        <YAxis dataKey="age" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b', fontWeight: 700 }} width={45} interval={0} />
                                        <Tooltip cursor={{ fill: '#F1F5F9' }} contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                                        <Bar dataKey="count" fill="#6366f1" radius={[0, 4, 4, 0]} barSize={16}>
                                          <LabelList dataKey="count" position="right" style={{ fill: '#64748b', fontSize: 10, fontWeight: 800 }} />
                                        </Bar>
                                      </BarChart>
                                    );
                                  })()}
                                </ResponsiveContainer>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Education Level */}
                        {!isDoping2024Program && !isIlkDersProgram && !usesCompactNoMapLayout && !mapRowLeftStack && selectedYearData?.educationLevels && selectedYearData.educationLevels.length > 0 && (
                          <div className={cn(
                            "bg-white/70 backdrop-blur-3xl border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] lg:rounded-[2.5rem] border p-6 sm:p-8 md:p-10 shadow-sm flex flex-col min-w-0 h-full relative overflow-hidden hover:shadow-xl hover:shadow-indigo-100/40 transition-all justify-start",
                            isIyiNiyetProgram && usesTwelveColMapRow
                              ? "lg:col-span-3 lg:order-3"
                              : usesWideMapProgramLayout
                                ? "lg:col-span-3 lg:order-1"
                                : ""
                          )}>
                            <div>
                              <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-500 flex items-center justify-center shrink-0">
                                  <GraduationCap className="w-4 h-4" />
                                </div>
                                <div>
                                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Eğitim Durumu</p>
                                  <p className="text-xs font-bold text-slate-900 leading-tight">Öğrenim Seviyeleri</p>
                                </div>
                              </div>
                              <div className="space-y-3.5 mt-2">
                                {selectedYearData.educationLevels.filter(ed => Math.round((ed.count / selectedYearData.participants) * 100) > 0).slice(0, 5).map((ed, i) => (
                                  <div key={ed.name} className="flex items-center gap-3 group/item" title={`${ed.count} Kişi`}>
                                    <span className="text-[10px] font-black text-slate-400 w-3">{i + 1}.</span>
                                    <div className="flex-1 min-w-0">
                                      <div className="flex justify-between items-start text-xs mb-1.5 gap-2">
                                        <span className="font-bold text-slate-700 group-hover/item:text-indigo-600 transition-colors" style={{ wordBreak: 'break-word', lineHeight: '1.2' }}>{ed.name}</span>
                                        <span className="text-[10px] whitespace-nowrap pt-0.5 font-black text-indigo-600">%{Math.round((ed.count / selectedYearData.participants) * 100)}</span>
                                      </div>
                                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                        <motion.div
                                          initial={{ width: 0 }}
                                          animate={{ width: `${(ed.count / selectedYearData.participants) * 100}%` }}
                                          transition={{ duration: 1, delay: i * 0.1 }}
                                          className="h-full rounded-full bg-indigo-500"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Gender Unstacked Contents */}
                        {showGenderCard && !isDoping2024Program && !isEmpowerMe2025 && !isUomlProgram && (
                        <div className={cn(
                          isIyiNiyetProgram && usesTwelveColMapRow
                            ? "lg:col-span-12 lg:order-4"
                            : usesWideMapProgramLayout
                              ? "lg:col-span-12 lg:order-3"
                              : "contents"
                        )}>
                          {/* Gender Donut Chart */}
                          <div className={cn(
                            "bg-white/70 backdrop-blur-3xl border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] lg:rounded-[2.5rem] border p-6 sm:p-8 md:p-10 shadow-sm flex flex-col min-w-0 h-full relative overflow-x-clip overflow-y-visible hover:shadow-xl hover:shadow-pink-100/40 transition-all"
                          )}>
                            {/* Header */}
                             <div className="flex items-center gap-3 mb-4 sm:mb-6">
                              <div className="w-8 h-8 rounded-xl bg-pink-50 text-pink-500 flex items-center justify-center shrink-0">
                                <Sparkles className="w-4 h-4" />
                              </div>
                              <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Cinsiyet Dengesi</p>
                                <p className="text-xs font-bold text-slate-900 leading-tight">Genel Oranlar</p>
                              </div>
                            </div>
                            
                            {/* Centered Chart Content */}
                            <div className="flex-1 w-full min-w-0 flex flex-col items-center justify-center mt-2 mb-2">
                              {/* Donut Chart */}
                              <div className="h-[152px] w-[152px] sm:h-[168px] sm:w-[168px] relative shrink-0 mb-5">
                                <ResponsiveContainer width="100%" height="100%">
                                  <PieChart>
                                    <Pie
                                      data={genderPieSegments}
                                      cx="50%"
                                      cy="50%"
                                      innerRadius={52}
                                      outerRadius={72}
                                      paddingAngle={4}
                                      dataKey="value"
                                      stroke="none"
                                    >
                                      {genderPieSegments.map((seg, index) => (
                                        <Cell key={`gender-seg-${seg.name}-${index}`} fill={seg.color} />
                                      ))}
                                    </Pie>
                                    <Tooltip cursor={false} contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} itemStyle={{ fontSize: '12px', fontWeight: 'bold' }} />
                                  </PieChart>
                                </ResponsiveContainer>
                              </div>
                              
                              {/* Legend — grid keeps three columns readable on narrow widths */}
                              <div
                                className={cn(
                                  'grid w-full max-w-full min-w-0 gap-x-3 gap-y-5 px-1',
                                  genderOther > 0 ? 'grid-cols-3' : 'grid-cols-2 max-w-[16rem]',
                                )}
                              >
                                <div
                                  className="min-w-0 flex flex-col items-center text-center justify-start gap-y-2"
                                  title={`${genderFemale.toLocaleString('tr-TR')} kişi`}
                                >
                                  <div className="flex flex-col sm:flex-row sm:items-center justify-center gap-1 w-full px-0.5">
                                    <span className="inline-block w-3 h-3 rounded-full bg-pink-500 shrink-0 mx-auto sm:mx-0" />
                                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider truncate max-w-full">Kadın</span>
                                  </div>
                                  <span className="text-xl sm:text-2xl font-black tabular-nums tracking-tight text-slate-900 leading-none whitespace-nowrap">
                                    {formatGenderPctLabel(genderFemale)}
                                  </span>
                                </div>
                                <div
                                  className="min-w-0 flex flex-col items-center text-center justify-start gap-y-2"
                                  title={`${genderMale.toLocaleString('tr-TR')} kişi`}
                                >
                                  <div className="flex flex-col sm:flex-row sm:items-center justify-center gap-1 w-full px-0.5">
                                    <span className="inline-block w-3 h-3 rounded-full bg-blue-500 shrink-0 mx-auto sm:mx-0" />
                                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider truncate max-w-full">Erkek</span>
                                  </div>
                                  <span className="text-xl sm:text-2xl font-black tabular-nums tracking-tight text-slate-900 leading-none whitespace-nowrap">
                                    {formatGenderPctLabel(genderMale)}
                                  </span>
                                </div>
                                {genderOther > 0 ? (
                                  <div
                                    className="min-w-0 flex flex-col items-center text-center justify-start gap-y-2"
                                    title={`${genderOther.toLocaleString('tr-TR')} kişi`}
                                  >
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-center gap-1 w-full px-0.5">
                                      <span className="inline-block w-3 h-3 rounded-full bg-slate-400 shrink-0 mx-auto sm:mx-0" />
                                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider truncate max-w-full">Diğer</span>
                                    </div>
                                    <span className="text-lg sm:text-xl font-black tabular-nums tracking-tight text-slate-900 leading-none whitespace-nowrap">
                                      {formatGenderPctLabel(genderOther)}
                                    </span>
                                  </div>
                                ) : null}
                              </div>
                              <p className="mt-5 text-[9px] sm:text-[10px] font-medium text-slate-400 text-center max-w-[18rem] leading-snug uppercase tracking-[0.12em]">
                                Oranlar, cinsiyet bilgisinin bildirildiği kayıtlar üzerinden
                              </p>
                            </div>
                          </div>
                        </div>
                        )}
                        
                        {/* Map for selected programs inside Charts Row */}
                        {usesTwelveColMapRow && hasCityData && (
                          <div className={cn(
                            "flex flex-col h-full bg-white/70 backdrop-blur-3xl border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] lg:rounded-[2.5rem] border relative overflow-hidden hover:shadow-xl hover:shadow-indigo-100/40 transition-all justify-start items-center group min-h-[400px]",
                            isIyiNiyetProgram
                              ? "lg:col-span-6 lg:order-2"
                              : usesWideMapProgramLayout
                                ? "lg:col-span-9 lg:order-2"
                                : "lg:col-span-6 lg:order-2"
                          )}>
                            <div className="absolute inset-0 rounded-[2rem] lg:rounded-[2.5rem] overflow-hidden pointer-events-none z-0">
                              <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-40 group-hover:opacity-80 transition-opacity duration-1000"></div>
                            </div>
                            <div className="w-full flex flex-col items-start px-6 sm:px-8 pt-8 z-20 pointer-events-none">
                              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter leading-none mb-1 drop-shadow-sm">
                                Türkiye <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">Katılım Haritası</span>
                              </h2>
                              <p className="text-[9px] md:text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] ml-1">
                                Genel Yoğunluk ve Dağılım
                              </p>
                            </div>
                            <div className={cn(
                              "w-full flex items-center justify-center relative mt-2 mb-4 z-10 px-4 transition-transform duration-700 group-hover:scale-[1.01]",
                              usesWideMapProgramLayout
                                ? "w-full max-w-full aspect-[2.25/1] sm:aspect-[2.35/1]"
                                : "max-w-[900px] aspect-[1.3/1] sm:aspect-[2/1]"
                            )}>
                              <TurkeyMap 
                                showTooltip={true}
                                colorData={mapData.colorData}
                                tooltipData={mapData.tooltipData}
                                legendData={mapData.legendData}
                              />
                            </div>
                          </div>
                        )}

                        {/* 2016-2020 Specific Slogan Card */}
                        {selectedYear === '2016-2020' && (
                          <div className="bg-slate-900 rounded-[2rem] lg:rounded-[2.5rem] border border-slate-800 p-6 sm:p-8 md:p-10 shadow-2xl flex flex-col min-w-0 h-full relative overflow-hidden group justify-center items-center text-center hover:border-blue-500/50 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)] transition-all duration-500">
                            {/* Decorative Background Elements */}
                            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-slate-900 to-slate-900 opacity-80"></div>
                            <div className="absolute -top-32 -right-32 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all duration-700"></div>
                            <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-all duration-700"></div>
                            
                            <div className="relative z-10 flex flex-col items-center">
                              <div className="w-14 h-14 rounded-2xl bg-white/5 backdrop-blur-xl flex items-center justify-center mb-6 border border-white/10 shadow-inner group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">
                                <img src="/partners/yetgen-logo-transparent.png" alt="YetGen Logo" className="w-8 h-8 object-contain" />
                              </div>
                              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight mb-4 font-display leading-[1.1]">
                                Yetkinliklerin <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Temelleri</span>
                              </h3>
                              <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mb-5 opacity-50 group-hover:w-20 group-hover:opacity-100 transition-all duration-500"></div>
                              <p className="text-slate-400 text-xs sm:text-sm font-medium leading-relaxed max-w-[260px]">
                                2016-2020 dönemi, binlerce gencin 21. yüzyıl yetkinlikleriyle tanıştığı öncü yıllar oldu. Bu miras, geleceğe ilham veriyor.
                              </p>
                            </div>
                          </div>
                        )}
                        
                        {/* Academic Profile Ranking - Schools */}
                        {selectedYear !== '2016-2020' && !isHabitatEmpowerProgram && !isIsbankFinans2024 && !isIlkDersProgram && !isEmpowerMe2025 && !isUomlProgram && selectedYearData?.topSchools && selectedYearData.topSchools.length > 0 && (
                        <div className={cn(
                          "bg-white/70 backdrop-blur-3xl border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] lg:rounded-[2.5rem] border p-6 sm:p-8 md:p-10 shadow-sm flex flex-col min-w-0 h-full relative overflow-hidden hover:shadow-xl hover:shadow-blue-100/40 transition-all justify-start",
                          usesTwelveColMapRow ? "lg:col-span-6 lg:order-5" : ""
                        )}>
                          <div>
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
                                <Globe className="w-4 h-4" />
                              </div>
                              <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Akademik Profil</p>
                                <p className="text-xs font-bold text-slate-900 leading-tight">En Aktif Okullar</p>
                              </div>
                            </div>
                            <div className="space-y-3.5 mt-2">
                              {selectedYearData.topSchools.slice(0, 5).map((school, i) => (
                                <div key={school.name} className="flex items-center gap-3 group">
                                  <span className="text-[10px] font-black text-slate-400 w-3">{i + 1}.</span>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start text-xs mb-1.5 gap-2">
                                      <span className="font-bold text-slate-700 group-hover:text-blue-600 transition-colors" style={{ wordBreak: 'break-word', lineHeight: '1.2' }}>{school.name}</span>
                                      <span className="text-[10px] whitespace-nowrap pt-0.5 font-black text-slate-900">{school.val} Kişi</span>
                                    </div>
                                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                      <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${(school.val / selectedYearData.topSchools[0].val) * 100}%` }}
                                        transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                                        className="h-full rounded-full bg-blue-500"
                                      />
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        )}

                        {/* Academic Profile Ranking - Departments */}
                        {selectedYear !== '2016-2020' && !isHabitatEmpowerProgram && !isIsbankFinans2024 && !isIlkDersProgram && !isEmpowerMe2025 && selectedYearData?.topDepartments && selectedYearData.topDepartments.length > 0 && (
                        <div className={cn(
                          "bg-white/70 backdrop-blur-3xl border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] lg:rounded-[2.5rem] border p-6 sm:p-8 md:p-10 shadow-sm flex flex-col min-w-0 h-full relative overflow-hidden hover:shadow-xl hover:shadow-blue-100/40 transition-all justify-start",
                          usesTwelveColMapRow ? "lg:col-span-6 lg:order-6" : ""
                        )}>
                          <div>
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
                                <GraduationCap className="w-4 h-4" />
                              </div>
                              <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Akademik Profil</p>
                                <p className="text-xs font-bold text-slate-900 leading-tight">En Aktif Bölümler</p>
                              </div>
                            </div>
                            <div className="space-y-3.5 mt-2">
                              {selectedYearData.topDepartments.slice(0, 5).map((dept, i) => {
                                const deptName = typeof dept === 'string' ? dept : dept.name;
                                const deptVal = typeof dept === 'string' ? null : dept.val;
                                const maxVal = typeof selectedYearData.topDepartments[0] === 'string' ? 100 : selectedYearData.topDepartments[0].val;
                                const widthVal = deptVal === null ? `${100 - (i * 15)}%` : `${(deptVal / maxVal) * 100}%`;

                                return (
                                  <div key={deptName} className="flex items-center gap-3 group">
                                    <span className="text-[10px] font-black text-slate-400 w-3">{i + 1}.</span>
                                    <div className="flex-1 min-w-0">
                                      <div className="flex justify-between items-start text-xs mb-1.5 gap-2">
                                        <span className="font-bold text-slate-700 group-hover:text-blue-600 transition-colors" style={{ wordBreak: 'break-word', lineHeight: '1.2' }}>{deptName}</span>
                                        {deptVal !== null && (
                                          <span className="text-[10px] whitespace-nowrap pt-0.5 font-black text-slate-900">{deptVal} Kişi</span>
                                        )}
                                      </div>
                                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                        <motion.div
                                          initial={{ width: 0 }}
                                          whileInView={{ width: widthVal }}
                                          transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                                          className="h-full rounded-full bg-blue-500"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                        )}

                      </div>

                      {/* HUGE TURKEY MAP CONTAINER */}
                      {!usesTwelveColMapRow && !usesCompactNoMapLayout && hasCityData && (
                        <div
                          className={cn(
                            'mt-8 mb-12 bg-white/70 backdrop-blur-3xl border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] lg:rounded-[3rem] border flex flex-col relative hover:shadow-2xl hover:shadow-indigo-100/50 transition-all justify-center items-center w-full group',
                            isDoping2024Program || isIlkDersProgram
                              ? 'min-h-[440px] sm:min-h-[560px]'
                              : 'min-h-[400px] sm:min-h-[500px]',
                          )}
                        >
                          {/* Subtle Background Pattern */}
                          <div className="absolute inset-0 rounded-[2rem] lg:rounded-[3rem] overflow-hidden pointer-events-none z-0">
                            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-40 group-hover:opacity-80 transition-opacity duration-1000"></div>
                          </div>
                          
                          {/* Professional Standalone Header */}
                          <div className="w-full flex flex-col items-start px-8 md:px-14 pt-10 z-20 pointer-events-none">
                            <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-black text-slate-900 tracking-tighter leading-none mb-2 drop-shadow-sm">
                              Türkiye <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">Katılım Haritası</span>
                            </h2>
                            <p className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-[0.3em] ml-1">
                              Genel Yoğunluk ve Dağılım
                            </p>
                          </div>
                          
                          <div
                            className={cn(
                              'w-full flex items-center justify-center relative mt-4 md:mt-2 mb-4 z-10 px-4 transition-transform duration-700 group-hover:scale-[1.01]',
                              isDoping2024Program || isIlkDersProgram
                                ? 'max-w-[1200px] aspect-[1.25/1] sm:aspect-[2.1/1]'
                                : 'max-w-[1100px] aspect-[1.3/1] sm:aspect-[2/1]',
                            )}
                          >
                            <TurkeyMap 
                              showTooltip={true}
                              colorData={mapData.colorData}
                              tooltipData={mapData.tooltipData}
                              legendData={mapData.legendData}
                            />
                          </div>
                          {isDoping2024Program && (
                            <div className="w-full max-w-4xl mx-auto px-8 md:px-14 pb-10 z-20">
                              <div className="flex items-start gap-2 bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100/50">
                                <Info className="w-4 h-4 text-indigo-500 mt-0.5 shrink-0" />
                                <p className="text-[10px] md:text-[11px] text-slate-600 leading-relaxed font-medium">
                                  <span className="font-bold text-indigo-600 mr-1">Not:</span>
                                  Bu eğitim 2 dönem yapılmıştır. Haritada görünen şehir bilgileri yalnızca 1. döneme aittir.
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* MASSIVE ANALYTICS TREND CONTAINER */}
                    {selectedYear === 'all' && (
                      <div className="mt-8 mb-12 bg-white/70 backdrop-blur-3xl border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] lg:rounded-[3rem] border flex flex-col relative hover:shadow-2xl hover:shadow-indigo-100/50 transition-all justify-center items-start w-full group min-h-[400px] sm:min-h-[550px] overflow-hidden">
                        {/* Subtle Background Radial Pattern */}
                        <div className="absolute inset-0 z-0 pointer-events-none">
                          <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-40 group-hover:opacity-80 transition-opacity duration-1000"></div>
                          {/* Inner soft glow */}
                          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-blue-50/50 to-transparent"></div>
                        </div>

                        {/* Professional Standalone Header */}
                        <div className="w-full flex-col px-8 md:px-14 pt-10 z-20 pointer-events-none flex">
                          <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-black text-slate-900 tracking-tighter leading-none mb-2 drop-shadow-sm">
                            Yıllık Katılım <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Büyüme Ekseni</span>
                          </h2>
                          <p className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-[0.3em] ml-1">
                            Yıllara Göre Katılımcı ve Mezun İvmesi
                          </p>
                        </div>
                        
                        <div className="w-full relative mt-6 md:mt-8 mb-4 z-10 px-4 sm:px-6 md:px-10">
                          <YearlyJourney data={yearlyData} />
                        </div>
                      </div>
                    )}

                    {/* Secondary Bento Grid */}
                    <div className="grid grid-cols-1 gap-6 md:gap-8">
                      {/* Skills Card */}
                      <div className="w-full">
                        <ChartContainer
                          title="Eğitim Odak Alanları"
                          subtitle="Geliştirilen temel yetkinlikler"
                          className="h-full rounded-[2rem] sm:rounded-[3rem]"
                        >
                          <div className={cn("grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-2", programFocusSkills.length <= 5 ? "lg:grid-cols-3 xl:grid-cols-5" : "md:grid-cols-4 xl:grid-cols-4")}>
                            {programFocusSkills.map((skill, idx) => (
                              <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: idx * 0.1, ease: "easeOut" }}
                                key={skill.name}
                                className="flex flex-row items-center justify-start gap-4 p-4 sm:p-5 rounded-2xl md:rounded-[1.5rem] bg-slate-50/50 border border-slate-100/80 hover:bg-white hover:border-slate-200 hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300 group"
                              >
                                <div className={cn("p-3 rounded-xl bg-white shadow-sm border border-slate-100 group-hover:scale-110 transition-transform duration-300 shrink-0", skill.color)}>
                                  <skill.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                                </div>
                                <span className="text-xs sm:text-sm font-black text-slate-700 group-hover:text-slate-900 transition-colors leading-tight text-left">{skill.name}</span>
                              </motion.div>
                            ))}
                          </div>
                        </ChartContainer>
                      </div>
                    </div>

                    {/* Partners Bento */}
                    {showPartnersSection && (
                    <div className="relative bg-white/90 backdrop-blur-3xl border border-slate-200/80 shadow-[0_16px_45px_rgba(15,23,42,0.08)] rounded-[2rem] lg:rounded-[3rem] p-8 md:p-12 overflow-hidden">
                      <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-indigo-50/70 to-transparent pointer-events-none" />
                      <div className="relative flex flex-col gap-6 mb-10 border-b border-slate-200/70 pb-8">
                        <div>
                          <div className="flex items-center gap-3 mb-3">
                            <span className="h-2 w-2 rounded-full bg-indigo-600" />
                            <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">İş Birliği Ekosistemi</span>
                          </div>
                          <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight font-display mb-2">Stratejik Partnerlerimiz</h3>
                          <p className="text-sm md:text-base text-slate-600 font-medium max-w-2xl leading-relaxed">
                            Bu etki raporundaki dönüşüm, eğitimden teknolojiye uzanan güçlü iş birlikleriyle mümkün oldu.
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap justify-center gap-4 md:gap-5">
                        {partnerCards.map((partner, i) => (
                          <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08, duration: 0.55, ease: "easeOut" }}
                            key={partner.name}
                            className="group relative flex items-center justify-center h-[132px] md:h-[142px] bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:shadow-indigo-900/10 hover:-translate-y-1 transition-all duration-300 px-5 py-4 overflow-hidden w-full sm:w-[calc(50%-8px)] md:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] xl:w-[calc(25%-15px)]"
                          >
                            <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-indigo-100/40 to-transparent translate-x-[-120%] group-hover:translate-x-[120%]" />
                            <img 
                              src={partner.logo}
                              alt={partner.name}
                              className="max-h-[76px] md:max-h-[84px] w-full object-contain opacity-100 transition-transform duration-300 ease-out group-hover:scale-[1.04]"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                e.currentTarget.nextElementSibling?.classList.remove('hidden');
                              }}
                            />
                            <div className="hidden text-center p-3 select-none">
                              <span className="text-sm font-extrabold text-slate-700 tracking-tight">{partner.name}</span>
                            </div>
                            
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    )}
                  </div>
            </div>
              </div>
          </motion.div>
        </AnimatePresence>



        {/* The CTA has been moved above */}
      </div>
      {isReportModalOpen && (
        <div className="fixed inset-0 z-[200] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
          <div className="w-full max-w-6xl h-[88vh] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
            <div className="h-14 px-4 sm:px-6 border-b border-slate-200 flex items-center justify-between">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">YETGEN & GALATASARAY LİSESİ - Program Raporu</h3>
              <button
                onClick={() => setIsReportModalOpen(false)}
                className="h-9 w-9 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors"
                aria-label="Rapor penceresini kapat"
              >
                ×
              </button>
            </div>
            <iframe
              src={galatasarayReportUrl}
              title="YetGen Galatasaray Lisesi Program Raporu"
              className="w-full flex-1"
            />
            <div className="h-12 px-4 sm:px-6 border-t border-slate-200 flex items-center justify-end">
              <a
                href={galatasarayReportUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-sm font-semibold text-indigo-700 hover:text-indigo-900"
              >
                Yeni sekmede aç
              </a>
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
}
