export interface ICity {
  name: string;
  count: number | null;
}

export interface IDepartment {
  name: string;
  val: number;
}

export interface IEducationLevel {
  name: string;
  count: number;
}

export interface IAgeData {
  age?: string;
  year?: string;
  count: number;
}

export interface ISchool {
  name: string;
  val: number;
}

export interface IGenderData {
  female?: number;
  male?: number;
  other?: number;
}

export interface IProgramData {
  id: string;
  name: string;
  participants: number;
  graduates: number;
  gender?: IGenderData;
  hasAgeData?: boolean;
  ageData?: IAgeData[];
  cities?: ICity[];
  educationLevels?: IEducationLevel[];
  topDepartments?: (string | IDepartment)[];
  topSchools?: ISchool[];
  sponsors?: string[];
  /** Sekmede kısa `name` kullanılırken tam başlık için ipucu (title). */
  longName?: string;
  /** Kısa özet; rapor başlığının altındaki açık zeminli alan için. Görsel banner metni `description` ile verilir. */
  summary?: string;
  description?: string;
  image?: string;
  certificationBased?: boolean;
  isProgram?: boolean;
  programName?: string;
}

export interface IYearlyData {
  year: string;
  participants: number;
  graduates: number;
  description?: string;
  image?: string;
  hasAgeData?: boolean;
  ageData?: IAgeData[];
  gender?: IGenderData;
  cities?: ICity[];
  educationLevels?: IEducationLevel[];
  topSchools?: ISchool[];
  topDepartments?: (string | IDepartment)[];
  sponsors?: string[];
  /** Program seçildiğinde birleşik görünümde rapor özet metni (opsiyonel). */
  summary?: string;
  programs?: IProgramData[];
  isProgram?: boolean;
  programName?: string;
}
