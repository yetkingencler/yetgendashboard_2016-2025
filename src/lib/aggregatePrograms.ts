import type { IProgramData } from '../types';

export interface ProgramsRollup {
  participants: number;
  graduates: number;
  female: number;
  male: number;
  other: number;
  eduCount: Record<string, number>;
  cityCount: Record<string, number>;
  ageCount: Record<string, number>;
  deptCount: Record<string, number>;
  hasAgeData: boolean;
}

export function normalizeAgeBucket(raw: string): string {
  let bucket = raw;
  if (!bucket.includes('-') && !bucket.includes('<') && !bucket.includes('+')) {
    const ageNum = parseInt(bucket, 10);
    if (!isNaN(ageNum)) {
      if (ageNum < 18) bucket = '<18';
      else if (ageNum <= 20) bucket = '18-20';
      else if (ageNum <= 23) bucket = '21-23';
      else if (ageNum <= 26) bucket = '24-26';
      else if (ageNum <= 29) bucket = '27-29';
      else bucket = '30+';
    }
  }
  return bucket;
}

/** Bir yıldaki tüm alt programların demografik ve dağılım verilerini toplar. */
export function rollupPrograms(programs: IProgramData[]): ProgramsRollup {
  let participants = 0;
  let graduates = 0;
  let female = 0;
  let male = 0;
  let other = 0;
  const eduCount: Record<string, number> = {};
  const cityCount: Record<string, number> = {};
  const ageCount: Record<string, number> = {};
  const deptCount: Record<string, number> = {};
  let hasAgeData = false;

  programs.forEach((prog) => {
    participants += prog.participants || 0;
    graduates += prog.graduates || 0;
    if (prog.gender) {
      female += prog.gender.female || 0;
      male += prog.gender.male || 0;
      other += prog.gender.other || 0;
    }
    if (prog.educationLevels) {
      prog.educationLevels.forEach((e) => {
        eduCount[e.name] = (eduCount[e.name] || 0) + e.count;
      });
    }
    if (prog.cities) {
      prog.cities.forEach((c) => {
        if (c?.name && c.count != null) {
          cityCount[c.name] = (cityCount[c.name] || 0) + c.count;
        }
      });
    }
    if (prog.ageData && prog.ageData.length > 0) {
      hasAgeData = true;
      prog.ageData.forEach((a) => {
        const raw = a.age;
        if (raw == null || String(raw).trim() === '') return;
        const bucket = normalizeAgeBucket(String(raw));
        ageCount[bucket] = (ageCount[bucket] || 0) + a.count;
      });
    }
    if (prog.topDepartments) {
      prog.topDepartments.forEach((d) => {
        if (typeof d === 'string') deptCount[d] = (deptCount[d] || 0) + 1;
        else if (d && typeof d === 'object' && d.name) {
          deptCount[d.name] = (deptCount[d.name] || 0) + (d.val || 1);
        }
      });
    }
  });

  return {
    participants,
    graduates,
    female,
    male,
    other,
    eduCount,
    cityCount,
    ageCount,
    deptCount,
    hasAgeData,
  };
}
