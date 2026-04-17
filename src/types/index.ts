export interface ICity {
  name: string;
  count: number;
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
  description?: string;
  image?: string;
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
  programs?: IProgramData[];
  isProgram?: boolean;
  programName?: string;
}
