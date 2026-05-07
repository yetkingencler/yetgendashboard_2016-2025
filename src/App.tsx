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
import { StatCard } from './components/StatCard';
import { ChartContainer } from './components/ChartContainer';
import { BackgroundEffects } from './components/BackgroundEffects';
import { CustomTurkeyMap as TurkeyMap } from './components/CustomTurkeyMap';
import { FormModal } from './components/FormModal';
import { YearlyJourney } from './components/YearlyJourney';
import { Footer } from './components/Footer';
import { getPlate } from './lib/cities';
import { IYearlyData, ICity, IProgramData, IDepartment } from './types';

// --- Data Preparation ---

const yearlyData: IYearlyData[] = [
  {
    "year": "2016-2020",
    "participants": 1162,
    "graduates": 674,
    "description": "İlk 5 yılın özeti. Pilot uygulamadan dijital dönüşüme uzanan, YetGen'in temelinin atıldığı ve hızla büyüdüğü kuruluş yılları.",
    "image": "/partners/ilkkk.png",
    "hasAgeData": false,
    "gender": {
      "female": 576,
      "male": 579,
      "other": 6
    },
    "cities": [],
    "educationLevels": [
      {
        "name": "Lisans",
        "count": 568
      },
      {
        "name": "Lise",
        "count": 575
      },
      {
        "name": "Diğer",
        "count": 18
      }
    ],
    "topSchools": [
      {
        "name": "İstanbul Erkek Lisesi",
        "val": 49
      },
      {
        "name": "Vefa Lisesi",
        "val": 16
      },
      {
        "name": "Mef Okulları",
        "val": 12
      },
      {
        "name": "Vizyon Koleji",
        "val": 10
      },
      {
        "name": "Mavigün Koleji",
        "val": 7
      }
    ],
    "topDepartments": [
      {
        "name": "Endüstri Mühendisliği",
        "val": 68
      },
      {
        "name": "İşletme",
        "val": 31
      },
      {
        "name": "Hukuk",
        "val": 23
      },
      {
        "name": "İktisat",
        "val": 20
      },
      {
        "name": "Psikoloji",
        "val": 18
      }
    ],
    "sponsors": [
      "Mehmet Zorlu Vakfı",
      "Yetkin Gençler",
      "MEF Üniversitesi"
    ]
  },
  {
    "year": "2021",
    "participants": 3906,
    "graduates": 2686,
    "description": "Rekor katılım yılı! Dijital araçların kullanımıyla Türkiye genelinde 3 farklı programla binlerce gence ulaşıldı.",
    "image": "/partners/online.jpg",
    "hasAgeData": false,
    "gender": {
      "female": 2474,
      "male": 1169,
      "other": 18
    },
    "cities": [
      {
        "name": "Adana",
        "count": 60
      },
      {
        "name": "Adıyaman",
        "count": 6
      },
      {
        "name": "Afyonkarahisar",
        "count": 9
      },
      {
        "name": "Ağrı",
        "count": 2
      },
      {
        "name": "Aksaray",
        "count": 3
      },
      {
        "name": "Amasya",
        "count": 10
      },
      {
        "name": "Ankara",
        "count": 278
      },
      {
        "name": "Antalya",
        "count": 61
      },
      {
        "name": "Ardahan",
        "count": 1
      },
      {
        "name": "Artvin",
        "count": 2
      },
      {
        "name": "Aydın",
        "count": 33
      },
      {
        "name": "Balıkesir",
        "count": 29
      },
      {
        "name": "Bartın",
        "count": 3
      },
      {
        "name": "Batman",
        "count": 2
      },
      {
        "name": "Bayburt",
        "count": 2
      },
      {
        "name": "Bilecik",
        "count": 4
      },
      {
        "name": "Bingöl",
        "count": 2
      },
      {
        "name": "Bitlis",
        "count": 3
      },
      {
        "name": "Bolu",
        "count": 9
      },
      {
        "name": "Burdur",
        "count": 3
      },
      {
        "name": "Bursa",
        "count": 114
      },
      {
        "name": "Çanakkale",
        "count": 15
      },
      {
        "name": "Çankırı",
        "count": 4
      },
      {
        "name": "Çorum",
        "count": 8
      },
      {
        "name": "Denizli",
        "count": 20
      },
      {
        "name": "Diğer",
        "count": 11
      },
      {
        "name": "Diyarbakır",
        "count": 12
      },
      {
        "name": "Düzce",
        "count": 6
      },
      {
        "name": "Edirne",
        "count": 23
      },
      {
        "name": "Elazığ",
        "count": 8
      },
      {
        "name": "Erzincan",
        "count": 3
      },
      {
        "name": "Erzurum",
        "count": 7
      },
      {
        "name": "Eskişehir",
        "count": 70
      },
      {
        "name": "Gaziantep",
        "count": 35
      },
      {
        "name": "Giresun",
        "count": 6
      },
      {
        "name": "Gümüşhane",
        "count": 4
      },
      {
        "name": "Hakkâri",
        "count": 1
      },
      {
        "name": "Hatay",
        "count": 33
      },
      {
        "name": "Iğdır",
        "count": 1
      },
      {
        "name": "Isparta",
        "count": 10
      },
      {
        "name": "İstanbul",
        "count": 1675
      },
      {
        "name": "İzmir",
        "count": 218
      },
      {
        "name": "Kahramanmaraş",
        "count": 7
      },
      {
        "name": "Karabük",
        "count": 14
      },
      {
        "name": "Karaman",
        "count": 2
      },
      {
        "name": "Kars",
        "count": 2
      },
      {
        "name": "Kastamonu",
        "count": 9
      },
      {
        "name": "Kayseri",
        "count": 38
      },
      {
        "name": "Kırıkkale",
        "count": 7
      },
      {
        "name": "Kırklareli",
        "count": 12
      },
      {
        "name": "Kırşehir",
        "count": 3
      },
      {
        "name": "Kilis",
        "count": 2
      },
      {
        "name": "Kocaeli",
        "count": 90
      },
      {
        "name": "Konya",
        "count": 42
      },
      {
        "name": "Kütahya",
        "count": 9
      },
      {
        "name": "Malatya",
        "count": 15
      },
      {
        "name": "Manisa",
        "count": 42
      },
      {
        "name": "Mardin",
        "count": 4
      },
      {
        "name": "Mersin",
        "count": 33
      },
      {
        "name": "Muğla",
        "count": 19
      },
      {
        "name": "Nevşehir",
        "count": 3
      },
      {
        "name": "Niğde",
        "count": 14
      },
      {
        "name": "Ordu",
        "count": 7
      },
      {
        "name": "Osmaniye",
        "count": 15
      },
      {
        "name": "Rize",
        "count": 2
      },
      {
        "name": "Sakarya",
        "count": 34
      },
      {
        "name": "Samsun",
        "count": 27
      },
      {
        "name": "Siirt",
        "count": 2
      },
      {
        "name": "Sinop",
        "count": 3
      },
      {
        "name": "Sivas",
        "count": 9
      },
      {
        "name": "Şanlıurfa",
        "count": 10
      },
      {
        "name": "Şırnak",
        "count": 4
      },
      {
        "name": "Tekirdağ",
        "count": 61
      },
      {
        "name": "Tokat",
        "count": 6
      },
      {
        "name": "Trabzon",
        "count": 23
      },
      {
        "name": "Tunceli",
        "count": 1
      },
      {
        "name": "Uşak",
        "count": 6
      },
      {
        "name": "Van",
        "count": 6
      },
      {
        "name": "Yalova",
        "count": 10
      },
      {
        "name": "Yozgat",
        "count": 3
      },
      {
        "name": "Zonguldak",
        "count": 13
      }
    ],
    "educationLevels": [
      {
        "name": "Lisans",
        "count": 3130
      },
      {
        "name": "Lise",
        "count": 490
      },
      {
        "name": "Lisans Mezunu",
        "count": 109
      },
      {
        "name": "Lise Mezunu",
        "count": 100
      },
      {
        "name": "Lisansüstü",
        "count": 41
      },
      {
        "name": "Diğer",
        "count": 33
      },
      {
        "name": "Lisansüstü Mezunu",
        "count": 1
      }
    ],
    "topDepartments": [
      {
        "name": "Endüstri Mühendisliği",
        "val": 448
      },
      {
        "name": "İşletme",
        "val": 182
      },
      {
        "name": "Hukuk",
        "val": 160
      },
      {
        "name": "Bilgisayar Mühendisliği",
        "val": 158
      },
      {
        "name": "Psikoloji",
        "val": 65
      }
    ],
    "sponsors": [
      "Mehmet Zorlu Vakfı",
      "Yetkin Gençler",
      "MEF Üniversitesi"
    ],
    "programs": [
      {
        "id": "basic-2021",
        "name": "BASIC 2021",
        "participants": 3661,
        "graduates": 2565,
        "gender": {
          "female": 2474,
          "male": 1169,
          "other": 18
        },
        "hasAgeData": false,
        "ageData": [],
        "cities": [
          {
            "name": "Adana",
            "count": 55
          },
          {
            "name": "Adıyaman",
            "count": 6
          },
          {
            "name": "Afyonkarahisar",
            "count": 8
          },
          {
            "name": "Ağrı",
            "count": 2
          },
          {
            "name": "Aksaray",
            "count": 3
          },
          {
            "name": "Amasya",
            "count": 8
          },
          {
            "name": "Ankara",
            "count": 261
          },
          {
            "name": "Antalya",
            "count": 59
          },
          {
            "name": "Ardahan",
            "count": 1
          },
          {
            "name": "Artvin",
            "count": 2
          },
          {
            "name": "Aydın",
            "count": 33
          },
          {
            "name": "Balıkesir",
            "count": 28
          },
          {
            "name": "Bartın",
            "count": 3
          },
          {
            "name": "Batman",
            "count": 2
          },
          {
            "name": "Bayburt",
            "count": 2
          },
          {
            "name": "Bilecik",
            "count": 4
          },
          {
            "name": "Bingöl",
            "count": 2
          },
          {
            "name": "Bitlis",
            "count": 3
          },
          {
            "name": "Bolu",
            "count": 8
          },
          {
            "name": "Burdur",
            "count": 3
          },
          {
            "name": "Bursa",
            "count": 112
          },
          {
            "name": "Çanakkale",
            "count": 15
          },
          {
            "name": "Çankırı",
            "count": 4
          },
          {
            "name": "Çorum",
            "count": 8
          },
          {
            "name": "Denizli",
            "count": 20
          },
          {
            "name": "Diğer",
            "count": 6
          },
          {
            "name": "Diyarbakır",
            "count": 12
          },
          {
            "name": "Düzce",
            "count": 6
          },
          {
            "name": "Edirne",
            "count": 22
          },
          {
            "name": "Elazığ",
            "count": 6
          },
          {
            "name": "Erzincan",
            "count": 3
          },
          {
            "name": "Erzurum",
            "count": 5
          },
          {
            "name": "Eskişehir",
            "count": 59
          },
          {
            "name": "Gaziantep",
            "count": 30
          },
          {
            "name": "Giresun",
            "count": 6
          },
          {
            "name": "Gümüşhane",
            "count": 4
          },
          {
            "name": "Hakkâri",
            "count": 1
          },
          {
            "name": "Hatay",
            "count": 33
          },
          {
            "name": "Iğdır",
            "count": 1
          },
          {
            "name": "Isparta",
            "count": 9
          },
          {
            "name": "İstanbul",
            "count": 1542
          },
          {
            "name": "İzmir",
            "count": 204
          },
          {
            "name": "Kahramanmaraş",
            "count": 7
          },
          {
            "name": "Karabük",
            "count": 10
          },
          {
            "name": "Karaman",
            "count": 2
          },
          {
            "name": "Kars",
            "count": 2
          },
          {
            "name": "Kastamonu",
            "count": 9
          },
          {
            "name": "Kayseri",
            "count": 31
          },
          {
            "name": "Kilis",
            "count": 2
          },
          {
            "name": "Kırıkkale",
            "count": 5
          },
          {
            "name": "Kırklareli",
            "count": 12
          },
          {
            "name": "Kırşehir",
            "count": 3
          },
          {
            "name": "Kocaeli",
            "count": 83
          },
          {
            "name": "Konya",
            "count": 41
          },
          {
            "name": "Kütahya",
            "count": 8
          },
          {
            "name": "Malatya",
            "count": 12
          },
          {
            "name": "Manisa",
            "count": 41
          },
          {
            "name": "Mardin",
            "count": 4
          },
          {
            "name": "Mersin",
            "count": 33
          },
          {
            "name": "Muğla",
            "count": 18
          },
          {
            "name": "Nevşehir",
            "count": 3
          },
          {
            "name": "Niğde",
            "count": 14
          },
          {
            "name": "Ordu",
            "count": 7
          },
          {
            "name": "Osmaniye",
            "count": 15
          },
          {
            "name": "Rize",
            "count": 2
          },
          {
            "name": "Sakarya",
            "count": 32
          },
          {
            "name": "Samsun",
            "count": 25
          },
          {
            "name": "Şanlıurfa",
            "count": 9
          },
          {
            "name": "Siirt",
            "count": 2
          },
          {
            "name": "Sinop",
            "count": 3
          },
          {
            "name": "Sivas",
            "count": 9
          },
          {
            "name": "Şırnak",
            "count": 4
          },
          {
            "name": "Tekirdağ",
            "count": 59
          },
          {
            "name": "Tokat",
            "count": 6
          },
          {
            "name": "Trabzon",
            "count": 20
          },
          {
            "name": "Tunceli",
            "count": 1
          },
          {
            "name": "Uşak",
            "count": 6
          },
          {
            "name": "Van",
            "count": 6
          },
          {
            "name": "Yalova",
            "count": 9
          },
          {
            "name": "Yozgat",
            "count": 3
          },
          {
            "name": "Zonguldak",
            "count": 13
          }
        ],
        "educationLevels": [
          {
            "name": "Lisans",
            "count": 2902
          },
          {
            "name": "Lise",
            "count": 490
          },
          {
            "name": "Lise Mezunu",
            "count": 100
          },
          {
            "name": "Lisans Mezunu",
            "count": 98
          },
          {
            "name": "Lisansüstü",
            "count": 38
          },
          {
            "name": "Diğer",
            "count": 33
          }
        ],
        "topDepartments": [
          {
            "name": "Endüstri Mühendisliği",
            "val": 448
          },
          {
            "name": "İşletme",
            "val": 182
          },
          {
            "name": "Hukuk",
            "val": 160
          },
          {
            "name": "Bilgisayar Mühendisliği",
            "val": 158
          },
          {
            "name": "Psikoloji",
            "val": 65
          }
        ]
      },
      {
        "id": "jump-softtech-2021",
        "name": "Jump Softtech Programı",
        "participants": 245,
        "graduates": 121,
        "description": "Java ve .NET odaklı ilk dikey YetGen programıdır. 250 mezunla başlayıp 8 haftalık teknik eğitimler (171 Java, 77 .NET) verildi. Sertifika alan 121 katılımcının istihdam süreçleri devam etmektedir.",
        "gender": {
          "female": 0,
          "male": 0,
          "other": 0
        },
        "hasAgeData": false,
        "ageData": [],
        "cities": [
          {
            "name": "Adana",
            "count": 5
          },
          {
            "name": "Afyonkarahisar",
            "count": 1
          },
          {
            "name": "Amasya",
            "count": 2
          },
          {
            "name": "Ankara",
            "count": 17
          },
          {
            "name": "Antalya",
            "count": 2
          },
          {
            "name": "Balıkesir",
            "count": 1
          },
          {
            "name": "Bolu",
            "count": 1
          },
          {
            "name": "Bursa",
            "count": 2
          },
          {
            "name": "Diğer",
            "count": 5
          },
          {
            "name": "Edirne",
            "count": 1
          },
          {
            "name": "Elazığ",
            "count": 2
          },
          {
            "name": "Erzurum",
            "count": 2
          },
          {
            "name": "Eskişehir",
            "count": 11
          },
          {
            "name": "Gaziantep",
            "count": 5
          },
          {
            "name": "Isparta",
            "count": 1
          },
          {
            "name": "İstanbul",
            "count": 133
          },
          {
            "name": "İzmir",
            "count": 14
          },
          {
            "name": "Karabük",
            "count": 4
          },
          {
            "name": "Kayseri",
            "count": 7
          },
          {
            "name": "Kırıkkale",
            "count": 2
          },
          {
            "name": "Kocaeli",
            "count": 7
          },
          {
            "name": "Konya",
            "count": 1
          },
          {
            "name": "Kütahya",
            "count": 1
          },
          {
            "name": "Malatya",
            "count": 3
          },
          {
            "name": "Manisa",
            "count": 1
          },
          {
            "name": "Muğla",
            "count": 1
          },
          {
            "name": "Sakarya",
            "count": 2
          },
          {
            "name": "Samsun",
            "count": 2
          },
          {
            "name": "Şanlıurfa",
            "count": 1
          },
          {
            "name": "Tekirdağ",
            "count": 2
          },
          {
            "name": "Trabzon",
            "count": 3
          },
          {
            "name": "Yalova",
            "count": 1
          }
        ],
        "educationLevels": [
          {
            "name": "Lisans",
            "count": 228
          },
          {
            "name": "Lisans Mezunu",
            "count": 11
          },
          {
            "name": "Lisansüstü",
            "count": 3
          },
          {
            "name": "Lisansüstü Mezunu",
            "count": 1
          }
        ]
      }
    ]
  },
  {
    "year": "2022",
    "participants": 4394,
    "graduates": 2812,
    "description": "Eğitim içeriği \"Geleceğin Dünyası\" vizyonuyla tamamen yenilendi. Proje odaklı üretim ön plana çıktı.",
    "image": "/partners/yetgenphoto.webp",
    "hasAgeData": true,
    "ageData": [
      {
        "age": "<18",
        "count": 271
      },
      {
        "age": "18-20",
        "count": 891
      },
      {
        "age": "21-23",
        "count": 951
      },
      {
        "age": "24-26",
        "count": 922
      },
      {
        "age": "27-29",
        "count": 504
      },
      {
        "age": "30+",
        "count": 780
      }
    ],
    "gender": {
      "female": 2981,
      "male": 1383,
      "other": 23
    },
    "cities": [
      {
        "name": "Diğer",
        "count": 10
      },
      {
        "name": "Adana",
        "count": 72
      },
      {
        "name": "Adıyaman",
        "count": 12
      },
      {
        "name": "Afyonkarahisar",
        "count": 12
      },
      {
        "name": "Ağrı",
        "count": 2
      },
      {
        "name": "Aksaray",
        "count": 6
      },
      {
        "name": "Amasya",
        "count": 18
      },
      {
        "name": "Ankara",
        "count": 387
      },
      {
        "name": "Antalya",
        "count": 78
      },
      {
        "name": "Ardahan",
        "count": 2
      },
      {
        "name": "Artvin",
        "count": 6
      },
      {
        "name": "Aydın",
        "count": 36
      },
      {
        "name": "Balıkesir",
        "count": 61
      },
      {
        "name": "Bartın",
        "count": 7
      },
      {
        "name": "Batman",
        "count": 4
      },
      {
        "name": "Bayburt",
        "count": 2
      },
      {
        "name": "Bilecik",
        "count": 3
      },
      {
        "name": "Bingöl",
        "count": 2
      },
      {
        "name": "Bitlis",
        "count": 8
      },
      {
        "name": "Bolu",
        "count": 14
      },
      {
        "name": "Burdur",
        "count": 8
      },
      {
        "name": "Bursa",
        "count": 131
      },
      {
        "name": "Çanakkale",
        "count": 16
      },
      {
        "name": "Çankırı",
        "count": 2
      },
      {
        "name": "Çorum",
        "count": 8
      },
      {
        "name": "Denizli",
        "count": 63
      },
      {
        "name": "Diyarbakır",
        "count": 36
      },
      {
        "name": "Düzce",
        "count": 11
      },
      {
        "name": "Edirne",
        "count": 19
      },
      {
        "name": "Elazığ",
        "count": 14
      },
      {
        "name": "Erzincan",
        "count": 2
      },
      {
        "name": "Erzurum",
        "count": 14
      },
      {
        "name": "Eskişehir",
        "count": 87
      },
      {
        "name": "Gaziantep",
        "count": 54
      },
      {
        "name": "Giresun",
        "count": 10
      },
      {
        "name": "Gümüşhane",
        "count": 1
      },
      {
        "name": "Hakkâri",
        "count": 4
      },
      {
        "name": "Hatay",
        "count": 41
      },
      {
        "name": "Iğdır",
        "count": 4
      },
      {
        "name": "Isparta",
        "count": 24
      },
      {
        "name": "İstanbul",
        "count": 1768
      },
      {
        "name": "İzmir",
        "count": 325
      },
      {
        "name": "Kahramanmaraş",
        "count": 18
      },
      {
        "name": "Karabük",
        "count": 9
      },
      {
        "name": "Karaman",
        "count": 8
      },
      {
        "name": "Kars",
        "count": 8
      },
      {
        "name": "Kastamonu",
        "count": 10
      },
      {
        "name": "Kayseri",
        "count": 58
      },
      {
        "name": "Kırıkkale",
        "count": 11
      },
      {
        "name": "Kırklareli",
        "count": 13
      },
      {
        "name": "Kırşehir",
        "count": 5
      },
      {
        "name": "Kilis",
        "count": 3
      },
      {
        "name": "Kocaeli",
        "count": 126
      },
      {
        "name": "Konya",
        "count": 54
      },
      {
        "name": "Kütahya",
        "count": 18
      },
      {
        "name": "Malatya",
        "count": 24
      },
      {
        "name": "Manisa",
        "count": 51
      },
      {
        "name": "Mardin",
        "count": 12
      },
      {
        "name": "Mersin",
        "count": 54
      },
      {
        "name": "Muğla",
        "count": 46
      },
      {
        "name": "Muş",
        "count": 7
      },
      {
        "name": "Nevşehir",
        "count": 8
      },
      {
        "name": "Niğde",
        "count": 9
      },
      {
        "name": "Ordu",
        "count": 11
      },
      {
        "name": "Osmaniye",
        "count": 14
      },
      {
        "name": "Rize",
        "count": 9
      },
      {
        "name": "Sakarya",
        "count": 45
      },
      {
        "name": "Samsun",
        "count": 46
      },
      {
        "name": "Siirt",
        "count": 4
      },
      {
        "name": "Sinop",
        "count": 4
      },
      {
        "name": "Sivas",
        "count": 15
      },
      {
        "name": "Şanlıurfa",
        "count": 15
      },
      {
        "name": "Şırnak",
        "count": 8
      },
      {
        "name": "Tekirdağ",
        "count": 60
      },
      {
        "name": "Tokat",
        "count": 14
      },
      {
        "name": "Trabzon",
        "count": 26
      },
      {
        "name": "Tunceli",
        "count": 1
      },
      {
        "name": "Uşak",
        "count": 6
      },
      {
        "name": "Van",
        "count": 13
      },
      {
        "name": "Yalova",
        "count": 10
      },
      {
        "name": "Yozgat",
        "count": 4
      },
      {
        "name": "Zonguldak",
        "count": 14
      }
    ],
    "educationLevels": [
      {
        "name": "Lisans",
        "count": 2487
      },
      {
        "name": "Lise",
        "count": 401
      },
      {
        "name": "Lise Mezunu",
        "count": 232
      },
      {
        "name": "Lisans Mezunu",
        "count": 136
      },
      {
        "name": "Ön Lisans",
        "count": 53
      },
      {
        "name": "Lisansüstü",
        "count": 41
      },
      {
        "name": "Diğer",
        "count": 29
      }
    ],
    "topDepartments": [
      {
        "name": "Endüstri Mühendisliği",
        "val": 194
      },
      {
        "name": "Rehberlik ve Psikolojik Danışmanlık",
        "val": 143
      },
      {
        "name": "Bilgisayar Mühendisliği",
        "val": 122
      },
      {
        "name": "Hukuk",
        "val": 114
      },
      {
        "name": "Sınıf Öğretmenliği",
        "val": 100
      }
    ],
    "sponsors": [
      "Mehmet Zorlu Vakfı",
      "Yetkin Gençler",
      "MEF Üniversitesi"
    ],
    "programs": [
      {
        "id": "basic-2022",
        "name": "BASIC 2022",
        "participants": 3378,
        "graduates": 2341,
        "gender": {
          "female": 2231,
          "male": 1124,
          "other": 20
        },
        "hasAgeData": true,
        "ageData": [
          {
            "age": "<18",
            "count": 228
          },
          {
            "age": "18-20",
            "count": 891
          },
          {
            "age": "21-23",
            "count": 926
          },
          {
            "age": "24-26",
            "count": 773
          },
          {
            "age": "27-29",
            "count": 372
          },
          {
            "age": "30+",
            "count": 70
          }
        ],
        "cities": [
          {
            "name": "Adana",
            "count": 60
          },
          {
            "name": "Adıyaman",
            "count": 10
          },
          {
            "name": "Afyonkarahisar",
            "count": 11
          },
          {
            "name": "Ağrı",
            "count": 1
          },
          {
            "name": "Aksaray",
            "count": 5
          },
          {
            "name": "Amasya",
            "count": 17
          },
          {
            "name": "Ankara",
            "count": 317
          },
          {
            "name": "Antalya",
            "count": 53
          },
          {
            "name": "Artvin",
            "count": 4
          },
          {
            "name": "Aydın",
            "count": 29
          },
          {
            "name": "Balıkesir",
            "count": 41
          },
          {
            "name": "Bartın",
            "count": 5
          },
          {
            "name": "Batman",
            "count": 2
          },
          {
            "name": "Bayburt",
            "count": 2
          },
          {
            "name": "Bilecik",
            "count": 3
          },
          {
            "name": "Bingöl",
            "count": 1
          },
          {
            "name": "Bitlis",
            "count": 5
          },
          {
            "name": "Bolu",
            "count": 13
          },
          {
            "name": "Burdur",
            "count": 5
          },
          {
            "name": "Bursa",
            "count": 101
          },
          {
            "name": "Çanakkale",
            "count": 8
          },
          {
            "name": "Çankırı",
            "count": 2
          },
          {
            "name": "Çorum",
            "count": 7
          },
          {
            "name": "Denizli",
            "count": 38
          },
          {
            "name": "Diğer",
            "count": 10
          },
          {
            "name": "Diyarbakır",
            "count": 23
          },
          {
            "name": "Düzce",
            "count": 9
          },
          {
            "name": "Edirne",
            "count": 16
          },
          {
            "name": "Elazığ",
            "count": 12
          },
          {
            "name": "Erzincan",
            "count": 1
          },
          {
            "name": "Erzurum",
            "count": 11
          },
          {
            "name": "Eskişehir",
            "count": 62
          },
          {
            "name": "Gaziantep",
            "count": 38
          },
          {
            "name": "Giresun",
            "count": 7
          },
          {
            "name": "Gümüşhane",
            "count": 1
          },
          {
            "name": "Hakkâri",
            "count": 2
          },
          {
            "name": "Hatay",
            "count": 31
          },
          {
            "name": "Iğdır",
            "count": 2
          },
          {
            "name": "Isparta",
            "count": 20
          },
          {
            "name": "İstanbul",
            "count": 1409
          },
          {
            "name": "İzmir",
            "count": 200
          },
          {
            "name": "Kahramanmaraş",
            "count": 15
          },
          {
            "name": "Karabük",
            "count": 6
          },
          {
            "name": "Karaman",
            "count": 6
          },
          {
            "name": "Kars",
            "count": 3
          },
          {
            "name": "Kastamonu",
            "count": 8
          },
          {
            "name": "Kayseri",
            "count": 48
          },
          {
            "name": "Kilis",
            "count": 3
          },
          {
            "name": "Kırıkkale",
            "count": 10
          },
          {
            "name": "Kırklareli",
            "count": 11
          },
          {
            "name": "Kırşehir",
            "count": 4
          },
          {
            "name": "Kocaeli",
            "count": 102
          },
          {
            "name": "Konya",
            "count": 42
          },
          {
            "name": "Kütahya",
            "count": 12
          },
          {
            "name": "Malatya",
            "count": 22
          },
          {
            "name": "Manisa",
            "count": 37
          },
          {
            "name": "Mardin",
            "count": 10
          },
          {
            "name": "Mersin",
            "count": 40
          },
          {
            "name": "Muğla",
            "count": 22
          },
          {
            "name": "Muş",
            "count": 2
          },
          {
            "name": "Nevşehir",
            "count": 6
          },
          {
            "name": "Niğde",
            "count": 7
          },
          {
            "name": "Ordu",
            "count": 10
          },
          {
            "name": "Osmaniye",
            "count": 13
          },
          {
            "name": "Rize",
            "count": 7
          },
          {
            "name": "Sakarya",
            "count": 30
          },
          {
            "name": "Samsun",
            "count": 34
          },
          {
            "name": "Şanlıurfa",
            "count": 12
          },
          {
            "name": "Siirt",
            "count": 4
          },
          {
            "name": "Sinop",
            "count": 2
          },
          {
            "name": "Sivas",
            "count": 13
          },
          {
            "name": "Şırnak",
            "count": 5
          },
          {
            "name": "Tekirdağ",
            "count": 36
          },
          {
            "name": "Tokat",
            "count": 10
          },
          {
            "name": "Trabzon",
            "count": 22
          },
          {
            "name": "Tunceli",
            "count": 1
          },
          {
            "name": "Uşak",
            "count": 5
          },
          {
            "name": "Van",
            "count": 9
          },
          {
            "name": "Yalova",
            "count": 9
          },
          {
            "name": "Yozgat",
            "count": 4
          },
          {
            "name": "Zonguldak",
            "count": 10
          }
        ],
        "educationLevels": [
          {
            "name": "Lisans",
            "count": 2487
          },
          {
            "name": "Lise",
            "count": 401
          },
          {
            "name": "Lise Mezunu",
            "count": 232
          },
          {
            "name": "Lisans Mezunu",
            "count": 136
          },
          {
            "name": "Ön Lisans",
            "count": 53
          },
          {
            "name": "Lisansüstü",
            "count": 41
          },
          {
            "name": "Diğer",
            "count": 29
          }
        ],
        "topSchools": [
          {
            "name": "Mef Üniversitesi",
            "val": 179
          },
          {
            "name": "Marmara Üniversitesi",
            "val": 47
          },
          {
            "name": "Boğaziçi Üniversitesi",
            "val": 37
          },
          {
            "name": "Hacettepe Üniversitesi",
            "val": 25
          },
          {
            "name": "İstanbul Medipol Üniv.",
            "val": 19
          }
        ],
        "topDepartments": [
          {
            "name": "Endüstri Mühendisliği",
            "val": 194
          },
          {
            "name": "Bilgisayar Mühendisliği",
            "val": 122
          },
          {
            "name": "Hukuk",
            "val": 114
          },
          {
            "name": "Psikoloji",
            "val": 84
          },
          {
            "name": "Elektrik Elektronik Müh.",
            "val": 65
          }
        ]
      },
      {
        "id": "o-22",
        "name": "Öğretmen Eğitimi 2022",
        "participants": 1016,
        "graduates": 471,
        "gender": {
          "female": 750,
          "male": 259,
          "other": 3
        },
        "hasAgeData": true,
        "ageData": [
          {
            "age": "<18",
            "count": 0
          },
          {
            "age": "18-20",
            "count": 0
          },
          {
            "age": "21-23",
            "count": 25
          },
          {
            "age": "24-26",
            "count": 149
          },
          {
            "age": "27-29",
            "count": 132
          },
          {
            "age": "30+",
            "count": 710
          }
        ],
        "cities": [
          {
            "name": "Adana",
            "count": 12
          },
          {
            "name": "Adıyaman",
            "count": 2
          },
          {
            "name": "Afyonkarahisar",
            "count": 1
          },
          {
            "name": "Ağrı",
            "count": 1
          },
          {
            "name": "Aksaray",
            "count": 1
          },
          {
            "name": "Amasya",
            "count": 1
          },
          {
            "name": "Ankara",
            "count": 70
          },
          {
            "name": "Antalya",
            "count": 25
          },
          {
            "name": "Ardahan",
            "count": 2
          },
          {
            "name": "Artvin",
            "count": 2
          },
          {
            "name": "Aydın",
            "count": 7
          },
          {
            "name": "Balıkesir",
            "count": 20
          },
          {
            "name": "Bartın",
            "count": 2
          },
          {
            "name": "Batman",
            "count": 2
          },
          {
            "name": "Bingöl",
            "count": 1
          },
          {
            "name": "Bitlis",
            "count": 3
          },
          {
            "name": "Bolu",
            "count": 1
          },
          {
            "name": "Burdur",
            "count": 3
          },
          {
            "name": "Bursa",
            "count": 30
          },
          {
            "name": "Çanakkale",
            "count": 8
          },
          {
            "name": "Çorum",
            "count": 1
          },
          {
            "name": "Denizli",
            "count": 25
          },
          {
            "name": "Diyarbakır",
            "count": 13
          },
          {
            "name": "Düzce",
            "count": 2
          },
          {
            "name": "Edirne",
            "count": 3
          },
          {
            "name": "Elazığ",
            "count": 2
          },
          {
            "name": "Erzincan",
            "count": 1
          },
          {
            "name": "Erzurum",
            "count": 3
          },
          {
            "name": "Eskişehir",
            "count": 25
          },
          {
            "name": "Gaziantep",
            "count": 16
          },
          {
            "name": "Giresun",
            "count": 3
          },
          {
            "name": "Hakkâri",
            "count": 2
          },
          {
            "name": "Hatay",
            "count": 10
          },
          {
            "name": "Iğdır",
            "count": 2
          },
          {
            "name": "Isparta",
            "count": 4
          },
          {
            "name": "İstanbul",
            "count": 359
          },
          {
            "name": "İzmir",
            "count": 125
          },
          {
            "name": "Kahramanmaraş",
            "count": 3
          },
          {
            "name": "Karabük",
            "count": 3
          },
          {
            "name": "Karaman",
            "count": 2
          },
          {
            "name": "Kars",
            "count": 5
          },
          {
            "name": "Kastamonu",
            "count": 2
          },
          {
            "name": "Kayseri",
            "count": 10
          },
          {
            "name": "Kırıkkale",
            "count": 1
          },
          {
            "name": "Kırklareli",
            "count": 2
          },
          {
            "name": "Kırşehir",
            "count": 1
          },
          {
            "name": "Kocaeli",
            "count": 24
          },
          {
            "name": "Konya",
            "count": 12
          },
          {
            "name": "Kütahya",
            "count": 6
          },
          {
            "name": "Malatya",
            "count": 2
          },
          {
            "name": "Manisa",
            "count": 14
          },
          {
            "name": "Mardin",
            "count": 2
          },
          {
            "name": "Mersin",
            "count": 14
          },
          {
            "name": "Muğla",
            "count": 24
          },
          {
            "name": "Muş",
            "count": 5
          },
          {
            "name": "Nevşehir",
            "count": 2
          },
          {
            "name": "Niğde",
            "count": 2
          },
          {
            "name": "Ordu",
            "count": 1
          },
          {
            "name": "Osmaniye",
            "count": 1
          },
          {
            "name": "Rize",
            "count": 2
          },
          {
            "name": "Sakarya",
            "count": 15
          },
          {
            "name": "Samsun",
            "count": 12
          },
          {
            "name": "Şanlıurfa",
            "count": 3
          },
          {
            "name": "Sinop",
            "count": 2
          },
          {
            "name": "Sivas",
            "count": 2
          },
          {
            "name": "Şırnak",
            "count": 3
          },
          {
            "name": "Tekirdağ",
            "count": 24
          },
          {
            "name": "Tokat",
            "count": 4
          },
          {
            "name": "Trabzon",
            "count": 4
          },
          {
            "name": "Uşak",
            "count": 1
          },
          {
            "name": "Van",
            "count": 4
          },
          {
            "name": "Yalova",
            "count": 1
          },
          {
            "name": "Zonguldak",
            "count": 4
          }
        ],
        "educationLevels": [],
        "topDepartments": [
          {
            "name": "Rehberlik ve Psikolojik Danışmanlık",
            "val": 143
          },
          {
            "name": "Sınıf Öğretmenliği",
            "val": 100
          },
          {
            "name": "Fen Bilgisi Öğretmenliği",
            "val": 63
          },
          {
            "name": "İngilizce Öğretmenliği",
            "val": 59
          },
          {
            "name": "Matematik",
            "val": 53
          }
        ]
      }
    ]
  },
  {
    "year": "2023",
    "participants": 3222,
    "graduates": 2126,
    "description": "Kalite ve derinlik yılı. Mentorluk sistemleri ve asenkron içerik kütüphanesi zenginleştirildi.",
    "image": "/partners/stepup.jpg",
    "hasAgeData": true,
    "ageData": [
      {
        "age": "<18",
        "count": 547
      },
      {
        "age": "18-20",
        "count": 1051
      },
      {
        "age": "21-23",
        "count": 975
      },
      {
        "age": "24-26",
        "count": 232
      },
      {
        "age": "27-29",
        "count": 78
      },
      {
        "age": "30+",
        "count": 260
      }
    ],
    "gender": {
      "female": 1981,
      "male": 1230,
      "other": 7
    },
    "cities": [
      {
        "name": "Adana",
        "count": 174
      },
      {
        "name": "Adıyaman",
        "count": 23
      },
      {
        "name": "Afyonkarahisar",
        "count": 10
      },
      {
        "name": "Ağrı",
        "count": 4
      },
      {
        "name": "Aksaray",
        "count": 3
      },
      {
        "name": "Amasya",
        "count": 7
      },
      {
        "name": "Ankara",
        "count": 292
      },
      {
        "name": "Antalya",
        "count": 41
      },
      {
        "name": "Ardahan",
        "count": 4
      },
      {
        "name": "Artvin",
        "count": 1
      },
      {
        "name": "Aydın",
        "count": 33
      },
      {
        "name": "Balıkesir",
        "count": 29
      },
      {
        "name": "Bartın",
        "count": 2
      },
      {
        "name": "Batman",
        "count": 7
      },
      {
        "name": "Bayburt",
        "count": 4
      },
      {
        "name": "Bilecik",
        "count": 7
      },
      {
        "name": "Bingöl",
        "count": 6
      },
      {
        "name": "Bitlis",
        "count": 7
      },
      {
        "name": "Bolu",
        "count": 11
      },
      {
        "name": "Burdur",
        "count": 3
      },
      {
        "name": "Bursa",
        "count": 101
      },
      {
        "name": "Çanakkale",
        "count": 11
      },
      {
        "name": "Çankırı",
        "count": 4
      },
      {
        "name": "Çorum",
        "count": 4
      },
      {
        "name": "Denizli",
        "count": 41
      },
      {
        "name": "Diyarbakır",
        "count": 64
      },
      {
        "name": "Düzce",
        "count": 5
      },
      {
        "name": "Edirne",
        "count": 9
      },
      {
        "name": "Elazığ",
        "count": 31
      },
      {
        "name": "Erzincan",
        "count": 9
      },
      {
        "name": "Erzurum",
        "count": 15
      },
      {
        "name": "Eskişehir",
        "count": 40
      },
      {
        "name": "Gaziantep",
        "count": 120
      },
      {
        "name": "Giresun",
        "count": 6
      },
      {
        "name": "Gümüşhane",
        "count": 4
      },
      {
        "name": "Hakkâri",
        "count": 2
      },
      {
        "name": "Hatay",
        "count": 73
      },
      {
        "name": "Iğdır",
        "count": 1
      },
      {
        "name": "Isparta",
        "count": 15
      },
      {
        "name": "İstanbul",
        "count": 1070
      },
      {
        "name": "İzmir",
        "count": 190
      },
      {
        "name": "Kahramanmaraş",
        "count": 51
      },
      {
        "name": "Karabük",
        "count": 3
      },
      {
        "name": "Karaman",
        "count": 7
      },
      {
        "name": "Kars",
        "count": 8
      },
      {
        "name": "Kastamonu",
        "count": 7
      },
      {
        "name": "Kayseri",
        "count": 35
      },
      {
        "name": "Kırıkkale",
        "count": 4
      },
      {
        "name": "Kırklareli",
        "count": 7
      },
      {
        "name": "Kırşehir",
        "count": 5
      },
      {
        "name": "Kilis",
        "count": 11
      },
      {
        "name": "Kocaeli",
        "count": 90
      },
      {
        "name": "Konya",
        "count": 32
      },
      {
        "name": "Kütahya",
        "count": 6
      },
      {
        "name": "Malatya",
        "count": 47
      },
      {
        "name": "Manisa",
        "count": 48
      },
      {
        "name": "Mardin",
        "count": 10
      },
      {
        "name": "Mersin",
        "count": 37
      },
      {
        "name": "Muğla",
        "count": 36
      },
      {
        "name": "Muş",
        "count": 5
      },
      {
        "name": "Nevşehir",
        "count": 7
      },
      {
        "name": "Niğde",
        "count": 7
      },
      {
        "name": "Ordu",
        "count": 9
      },
      {
        "name": "Osmaniye",
        "count": 19
      },
      {
        "name": "Rize",
        "count": 4
      },
      {
        "name": "Sakarya",
        "count": 29
      },
      {
        "name": "Samsun",
        "count": 29
      },
      {
        "name": "Siirt",
        "count": 5
      },
      {
        "name": "Sinop",
        "count": 4
      },
      {
        "name": "Sivas",
        "count": 9
      },
      {
        "name": "Şanlıurfa",
        "count": 29
      },
      {
        "name": "Şırnak",
        "count": 8
      },
      {
        "name": "Tekirdağ",
        "count": 33
      },
      {
        "name": "Tokat",
        "count": 6
      },
      {
        "name": "Trabzon",
        "count": 18
      },
      {
        "name": "Tunceli",
        "count": 1
      },
      {
        "name": "Uşak",
        "count": 12
      },
      {
        "name": "Van",
        "count": 8
      },
      {
        "name": "Yalova",
        "count": 11
      },
      {
        "name": "Yozgat",
        "count": 7
      },
      {
        "name": "Zonguldak",
        "count": 7
      }
    ],
    "educationLevels": [
      {
        "name": "Lisans",
        "count": 1851
      },
      {
        "name": "Lise",
        "count": 504
      },
      {
        "name": "Lise Mezunu",
        "count": 142
      },
      {
        "name": "Lisans Mezunu",
        "count": 397
      },
      {
        "name": "Ön Lisans",
        "count": 65
      },
      {
        "name": "Lisansüstü",
        "count": 241
      },
      {
        "name": "Diğer",
        "count": 16
      }
    ],
    "topDepartments": [
      {
        "name": "Endüstri Mühendisliği",
        "val": 216
      },
      {
        "name": "Bilgisayar Mühendisliği",
        "val": 199
      },
      {
        "name": "Hukuk",
        "val": 147
      },
      {
        "name": "Psikoloji",
        "val": 106
      },
      {
        "name": "İşletme",
        "val": 42
      }
    ],
    "sponsors": [
      "Mehmet Zorlu Vakfı",
      "Yetkin Gençler",
      "MEF Üniversitesi"
    ],
    "programs": [
      {
        "id": "basic-2023",
        "name": "BASIC 2023",
        "participants": 2698,
        "graduates": 1808,
        "gender": {
          "female": 1881,
          "male": 807,
          "other": 6
        },
        "hasAgeData": true,
        "ageData": [
          {
            "age": "<18",
            "count": 547
          },
          {
            "age": "18-20",
            "count": 1034
          },
          {
            "age": "21-23",
            "count": 869
          },
          {
            "age": "24-26",
            "count": 135
          },
          {
            "age": "27-29",
            "count": 25
          },
          {
            "age": "30+",
            "count": 9
          }
        ],
        "cities": [
          {
            "name": "Adana",
            "count": 153
          },
          {
            "name": "Adıyaman",
            "count": 18
          },
          {
            "name": "Afyonkarahisar",
            "count": 8
          },
          {
            "name": "Ağrı",
            "count": 4
          },
          {
            "name": "Aksaray",
            "count": 2
          },
          {
            "name": "Amasya",
            "count": 5
          },
          {
            "name": "Ankara",
            "count": 253
          },
          {
            "name": "Antalya",
            "count": 25
          },
          {
            "name": "Ardahan",
            "count": 4
          },
          {
            "name": "Artvin",
            "count": 1
          },
          {
            "name": "Aydın",
            "count": 27
          },
          {
            "name": "Balıkesir",
            "count": 17
          },
          {
            "name": "Bartın",
            "count": 2
          },
          {
            "name": "Batman",
            "count": 7
          },
          {
            "name": "Bayburt",
            "count": 4
          },
          {
            "name": "Bilecik",
            "count": 6
          },
          {
            "name": "Bingöl",
            "count": 5
          },
          {
            "name": "Bitlis",
            "count": 3
          },
          {
            "name": "Bolu",
            "count": 10
          },
          {
            "name": "Burdur",
            "count": 2
          },
          {
            "name": "Bursa",
            "count": 86
          },
          {
            "name": "Çanakkale",
            "count": 10
          },
          {
            "name": "Çankırı",
            "count": 3
          },
          {
            "name": "Çorum",
            "count": 4
          },
          {
            "name": "Denizli",
            "count": 22
          },
          {
            "name": "Diyarbakır",
            "count": 54
          },
          {
            "name": "Düzce",
            "count": 4
          },
          {
            "name": "Edirne",
            "count": 6
          },
          {
            "name": "Elazığ",
            "count": 29
          },
          {
            "name": "Erzincan",
            "count": 9
          },
          {
            "name": "Erzurum",
            "count": 8
          },
          {
            "name": "Eskişehir",
            "count": 33
          },
          {
            "name": "Gaziantep",
            "count": 107
          },
          {
            "name": "Giresun",
            "count": 5
          },
          {
            "name": "Gümüşhane",
            "count": 4
          },
          {
            "name": "Hatay",
            "count": 62
          },
          {
            "name": "Isparta",
            "count": 6
          },
          {
            "name": "İstanbul",
            "count": 922
          },
          {
            "name": "İzmir",
            "count": 163
          },
          {
            "name": "Kahramanmaraş",
            "count": 42
          },
          {
            "name": "Karabük",
            "count": 3
          },
          {
            "name": "Karaman",
            "count": 4
          },
          {
            "name": "Kars",
            "count": 7
          },
          {
            "name": "Kastamonu",
            "count": 5
          },
          {
            "name": "Kayseri",
            "count": 29
          },
          {
            "name": "Kilis",
            "count": 9
          },
          {
            "name": "Kırıkkale",
            "count": 3
          },
          {
            "name": "Kırklareli",
            "count": 7
          },
          {
            "name": "Kırşehir",
            "count": 5
          },
          {
            "name": "Kocaeli",
            "count": 70
          },
          {
            "name": "Konya",
            "count": 25
          },
          {
            "name": "Kütahya",
            "count": 6
          },
          {
            "name": "Malatya",
            "count": 45
          },
          {
            "name": "Manisa",
            "count": 42
          },
          {
            "name": "Mardin",
            "count": 8
          },
          {
            "name": "Mersin",
            "count": 33
          },
          {
            "name": "Muğla",
            "count": 22
          },
          {
            "name": "Muş",
            "count": 4
          },
          {
            "name": "Nevşehir",
            "count": 5
          },
          {
            "name": "Niğde",
            "count": 5
          },
          {
            "name": "Ordu",
            "count": 5
          },
          {
            "name": "Osmaniye",
            "count": 18
          },
          {
            "name": "Rize",
            "count": 3
          },
          {
            "name": "Sakarya",
            "count": 24
          },
          {
            "name": "Samsun",
            "count": 21
          },
          {
            "name": "Şanlıurfa",
            "count": 25
          },
          {
            "name": "Siirt",
            "count": 4
          },
          {
            "name": "Sinop",
            "count": 4
          },
          {
            "name": "Sivas",
            "count": 8
          },
          {
            "name": "Şırnak",
            "count": 4
          },
          {
            "name": "Tekirdağ",
            "count": 25
          },
          {
            "name": "Tokat",
            "count": 4
          },
          {
            "name": "Trabzon",
            "count": 17
          },
          {
            "name": "Tunceli",
            "count": 1
          },
          {
            "name": "Uşak",
            "count": 12
          },
          {
            "name": "Van",
            "count": 6
          },
          {
            "name": "Yalova",
            "count": 11
          },
          {
            "name": "Yozgat",
            "count": 7
          },
          {
            "name": "Zonguldak",
            "count": 7
          }
        ],
        "educationLevels": [
          {
            "name": "Lisans",
            "count": 1843
          },
          {
            "name": "Lise",
            "count": 504
          },
          {
            "name": "Lise Mezunu",
            "count": 142
          },
          {
            "name": "Lisans Mezunu",
            "count": 95
          },
          {
            "name": "Ön Lisans",
            "count": 64
          },
          {
            "name": "Lisansüstü",
            "count": 30
          },
          {
            "name": "Diğer",
            "count": 16
          }
        ],
        "topDepartments": [
          {
            "name": "Endüstri Mühendisliği",
            "val": 216
          },
          {
            "name": "Bilgisayar Mühendisliği",
            "val": 199
          },
          {
            "name": "Hukuk",
            "val": 147
          },
          {
            "name": "Psikoloji",
            "val": 106
          },
          {
            "name": "Elektrik Elektronik Müh.",
            "val": 42
          }
        ]
      },
      {
        "id": "o-23",
        "name": "Öğretmen Eğitimi 2023",
        "participants": 524,
        "graduates": 318,
        "gender": {
          "female": 100,
          "male": 423,
          "other": 1
        },
        "hasAgeData": true,
        "ageData": [
          {
            "age": "<18",
            "count": 0
          },
          {
            "age": "18-20",
            "count": 17
          },
          {
            "age": "21-23",
            "count": 106
          },
          {
            "age": "24-26",
            "count": 97
          },
          {
            "age": "27-29",
            "count": 53
          },
          {
            "age": "30+",
            "count": 251
          }
        ],
        "cities": [
          {
            "name": "Adana",
            "count": 21
          },
          {
            "name": "Adıyaman",
            "count": 5
          },
          {
            "name": "Afyonkarahisar",
            "count": 2
          },
          {
            "name": "Aksaray",
            "count": 1
          },
          {
            "name": "Amasya",
            "count": 2
          },
          {
            "name": "Ankara",
            "count": 39
          },
          {
            "name": "Antalya",
            "count": 16
          },
          {
            "name": "Aydın",
            "count": 6
          },
          {
            "name": "Balıkesir",
            "count": 12
          },
          {
            "name": "Bilecik",
            "count": 1
          },
          {
            "name": "Bingöl",
            "count": 1
          },
          {
            "name": "Bitlis",
            "count": 4
          },
          {
            "name": "Bolu",
            "count": 1
          },
          {
            "name": "Burdur",
            "count": 1
          },
          {
            "name": "Bursa",
            "count": 15
          },
          {
            "name": "Çanakkale",
            "count": 1
          },
          {
            "name": "Çankırı",
            "count": 1
          },
          {
            "name": "Denizli",
            "count": 19
          },
          {
            "name": "Diyarbakır",
            "count": 10
          },
          {
            "name": "Düzce",
            "count": 1
          },
          {
            "name": "Edirne",
            "count": 3
          },
          {
            "name": "Elazığ",
            "count": 2
          },
          {
            "name": "Erzurum",
            "count": 7
          },
          {
            "name": "Eskişehir",
            "count": 7
          },
          {
            "name": "Gaziantep",
            "count": 13
          },
          {
            "name": "Giresun",
            "count": 1
          },
          {
            "name": "Hakkâri",
            "count": 2
          },
          {
            "name": "Hatay",
            "count": 11
          },
          {
            "name": "Iğdır",
            "count": 1
          },
          {
            "name": "Isparta",
            "count": 9
          },
          {
            "name": "İstanbul",
            "count": 148
          },
          {
            "name": "İzmir",
            "count": 27
          },
          {
            "name": "Kahramanmaraş",
            "count": 9
          },
          {
            "name": "Karaman",
            "count": 3
          },
          {
            "name": "Kars",
            "count": 1
          },
          {
            "name": "Kastamonu",
            "count": 2
          },
          {
            "name": "Kayseri",
            "count": 6
          },
          {
            "name": "Kilis",
            "count": 2
          },
          {
            "name": "Kırıkkale",
            "count": 1
          },
          {
            "name": "Kocaeli",
            "count": 20
          },
          {
            "name": "Konya",
            "count": 7
          },
          {
            "name": "Malatya",
            "count": 2
          },
          {
            "name": "Manisa",
            "count": 6
          },
          {
            "name": "Mardin",
            "count": 2
          },
          {
            "name": "Mersin",
            "count": 4
          },
          {
            "name": "Muğla",
            "count": 14
          },
          {
            "name": "Muş",
            "count": 1
          },
          {
            "name": "Nevşehir",
            "count": 2
          },
          {
            "name": "Niğde",
            "count": 2
          },
          {
            "name": "Ordu",
            "count": 4
          },
          {
            "name": "Osmaniye",
            "count": 1
          },
          {
            "name": "Rize",
            "count": 1
          },
          {
            "name": "Sakarya",
            "count": 5
          },
          {
            "name": "Samsun",
            "count": 8
          },
          {
            "name": "Şanlıurfa",
            "count": 4
          },
          {
            "name": "Siirt",
            "count": 1
          },
          {
            "name": "Sivas",
            "count": 1
          },
          {
            "name": "Şırnak",
            "count": 4
          },
          {
            "name": "Tekirdağ",
            "count": 8
          },
          {
            "name": "Tokat",
            "count": 2
          },
          {
            "name": "Trabzon",
            "count": 1
          },
          {
            "name": "Van",
            "count": 2
          }
        ],
        "educationLevels": [
          {
            "name": "Lisans Mezunu",
            "count": 302
          },
          {
            "name": "Lisansüstü Mezunu",
            "count": 110
          },
          {
            "name": "Lisansüstü",
            "count": 82
          },
          {
            "name": "Doktora",
            "count": 10
          },
          {
            "name": "Lisans",
            "count": 8
          },
          {
            "name": "Doktora Mezunu",
            "count": 6
          },
          {
            "name": "Yüksek Lisans",
            "count": 3
          },
          {
            "name": "Ön Lisans",
            "count": 1
          }
        ],
        "topDepartments": []
      },
      {
        "id": "core-python-2-2023",
        "name": "YetGen Core Python Eğitim Programı #2",
        "participants": 147,
        "graduates": 112,
        "description": "Yazılım ve kodlama dünyasına ilgi duymasına rağmen farklı nedenlerden dolayı bu alanlarda kendini geliştiremeyen YetGenlileri başlangıç seviyesinden orta-ileri seviyeye kadar donanımlı hale getirip farkındalık kazandırmayı amaçlayan ve Flipped Learning eğitim modeli ile kurgulanan 12 haftalık programdır.",
        "gender": {
          "female": 94,
          "male": 53,
          "other": 0
        },
        "hasAgeData": false,
        "ageData": [],
        "cities": [],
        "educationLevels": [],
        "topSchools": [
          { "name": "Marmara Üniversitesi", "val": 10 },
          { "name": "İstanbul Üniversitesi", "val": 10 },
          { "name": "Boğaziçi Üniversitesi", "val": 7 },
          { "name": "İstanbul Teknik Üni.", "val": 7 },
          { "name": "Yıldız Teknik Üni.", "val": 6 },
          { "name": "Diğer", "val": 107 }
        ],
        "topDepartments": [
          { "name": "Endüstri Mühendisliği", "val": 22 },
          { "name": "Psikoloji", "val": 12 },
          { "name": "İşletme", "val": 6 },
          { "name": "Bilgisayar Mühendisliği", "val": 6 },
          { "name": "Siyaset Bilimi ve Uluslararası İlişkiler", "val": 4 },
          { "name": "Diğer", "val": 97 }
        ]
      }
    ]
  },
  {
    "year": "2024",
    "participants": 4036,
    "graduates": 2214,
    "description": "Yapay zeka ve yeni nesil teknolojiler müfredatın merkezine yerleştirildi.",
    "image": "/partners/2021.jpg",
    "hasAgeData": false,
    "gender": {
      "female": 3006,
      "male": 1012,
      "other": 12
    },
    "cities": [
      {
        "name": "Adana",
        "count": 66
      },
      {
        "name": "Adıyaman",
        "count": 26
      },
      {
        "name": "Afyonkarahisar",
        "count": 13
      },
      {
        "name": "Aksaray",
        "count": 12
      },
      {
        "name": "Amasya",
        "count": 6
      },
      {
        "name": "Ankara",
        "count": 396
      },
      {
        "name": "Antalya",
        "count": 46
      },
      {
        "name": "Ardahan",
        "count": 1
      },
      {
        "name": "Artvin",
        "count": 1
      },
      {
        "name": "Aydın",
        "count": 23
      },
      {
        "name": "Ağrı",
        "count": 4
      },
      {
        "name": "Balıkesir",
        "count": 34
      },
      {
        "name": "Bartın",
        "count": 4
      },
      {
        "name": "Batman",
        "count": 9
      },
      {
        "name": "Bayburt",
        "count": 1
      },
      {
        "name": "Bilecik",
        "count": 4
      },
      {
        "name": "Bingöl",
        "count": 6
      },
      {
        "name": "Bitlis",
        "count": 7
      },
      {
        "name": "Bolu",
        "count": 11
      },
      {
        "name": "Burdur",
        "count": 8
      },
      {
        "name": "Bursa",
        "count": 74
      },
      {
        "name": "Denizli",
        "count": 27
      },
      {
        "name": "Diyarbakır",
        "count": 43
      },
      {
        "name": "Düzce",
        "count": 4
      },
      {
        "name": "Edirne",
        "count": 15
      },
      {
        "name": "Elazığ",
        "count": 25
      },
      {
        "name": "Erzincan",
        "count": 8
      },
      {
        "name": "Erzurum",
        "count": 15
      },
      {
        "name": "Eskişehir",
        "count": 48
      },
      {
        "name": "Gaziantep",
        "count": 60
      },
      {
        "name": "Giresun",
        "count": 5
      },
      {
        "name": "Gümüşhane",
        "count": 3
      },
      {
        "name": "Hakkâri",
        "count": 7
      },
      {
        "name": "Hatay",
        "count": 35
      },
      {
        "name": "Isparta",
        "count": 9
      },
      {
        "name": "Iğdır",
        "count": 4
      },
      {
        "name": "Kahramanmaraş",
        "count": 20
      },
      {
        "name": "Karabük",
        "count": 9
      },
      {
        "name": "Karaman",
        "count": 5
      },
      {
        "name": "Kars",
        "count": 2
      },
      {
        "name": "Kastamonu",
        "count": 5
      },
      {
        "name": "Kayseri",
        "count": 54
      },
      {
        "name": "Kilis",
        "count": 5
      },
      {
        "name": "Kocaeli",
        "count": 62
      },
      {
        "name": "Konya",
        "count": 60
      },
      {
        "name": "Kütahya",
        "count": 9
      },
      {
        "name": "Kırklareli",
        "count": 10
      },
      {
        "name": "Kırıkkale",
        "count": 8
      },
      {
        "name": "Kırşehir",
        "count": 3
      },
      {
        "name": "Malatya",
        "count": 22
      },
      {
        "name": "Manisa",
        "count": 43
      },
      {
        "name": "Mardin",
        "count": 13
      },
      {
        "name": "Mersin",
        "count": 23
      },
      {
        "name": "Muğla",
        "count": 18
      },
      {
        "name": "Muş",
        "count": 3
      },
      {
        "name": "Nevşehir",
        "count": 2
      },
      {
        "name": "Niğde",
        "count": 7
      },
      {
        "name": "Ordu",
        "count": 9
      },
      {
        "name": "Osmaniye",
        "count": 19
      },
      {
        "name": "Rize",
        "count": 7
      },
      {
        "name": "Sakarya",
        "count": 36
      },
      {
        "name": "Samsun",
        "count": 25
      },
      {
        "name": "Siirt",
        "count": 6
      },
      {
        "name": "Sinop",
        "count": 2
      },
      {
        "name": "Sivas",
        "count": 14
      },
      {
        "name": "Tekirdağ",
        "count": 30
      },
      {
        "name": "Tokat",
        "count": 11
      },
      {
        "name": "Trabzon",
        "count": 19
      },
      {
        "name": "Tunceli",
        "count": 4
      },
      {
        "name": "Uşak",
        "count": 9
      },
      {
        "name": "Van",
        "count": 17
      },
      {
        "name": "Yalova",
        "count": 8
      },
      {
        "name": "Yozgat",
        "count": 4
      },
      {
        "name": "Zonguldak",
        "count": 7
      },
      {
        "name": "Çanakkale",
        "count": 16
      },
      {
        "name": "Çankırı",
        "count": 2
      },
      {
        "name": "Çorum",
        "count": 5
      },
      {
        "name": "İstanbul",
        "count": 1127
      },
      {
        "name": "İzmir",
        "count": 187
      },
      {
        "name": "Şanlıurfa",
        "count": 21
      },
      {
        "name": "Şırnak",
        "count": 6
      }
    ],
    "educationLevels": [
      {
        "name": "Lisans",
        "count": 1692
      },
      {
        "name": "Lise",
        "count": 613
      },
      {
        "name": "Lise Mezunu",
        "count": 367
      },
      {
        "name": "Lisans Mezunu",
        "count": 130
      },
      {
        "name": "Lisansüstü",
        "count": 79
      },
      {
        "name": "Ön Lisans",
        "count": 48
      },
      {
        "name": "Diğer",
        "count": 9
      }
    ],
    "topDepartments": [
      {
        "name": "Endüstri Mühendisliği",
        "val": 195
      },
      {
        "name": "Bilgisayar Mühendisliği",
        "val": 179
      },
      {
        "name": "İşletme",
        "val": 75
      },
      {
        "name": "Hukuk",
        "val": 75
      },
      {
        "name": "Psikoloji",
        "val": 46
      }
    ],
    "sponsors": [
      "Mehmet Zorlu Vakfı",
      "Yetkin Gençler",
      "MEF Üniversitesi"
    ],
    "programs": [
      {
        "id": "basic-2024",
        "name": "BASIC 2024",
        "participants": 1926,
        "graduates": 1076,
        "gender": {
          "female": 1434,
          "male": 486,
          "other": 4
        },
        "hasAgeData": false,
        "ageData": [],
        "cities": [
          {
            "name": "Adana",
            "count": 30
          },
          {
            "name": "Adıyaman",
            "count": 4
          },
          {
            "name": "Afyonkarahisar",
            "count": 4
          },
          {
            "name": "Aksaray",
            "count": 4
          },
          {
            "name": "Amasya",
            "count": 1
          },
          {
            "name": "Ankara",
            "count": 286
          },
          {
            "name": "Antalya",
            "count": 24
          },
          {
            "name": "Ardahan",
            "count": 1
          },
          {
            "name": "Artvin",
            "count": 1
          },
          {
            "name": "Aydın",
            "count": 8
          },
          {
            "name": "Balıkesir",
            "count": 15
          },
          {
            "name": "Bartın",
            "count": 1
          },
          {
            "name": "Batman",
            "count": 2
          },
          {
            "name": "Bayburt",
            "count": 1
          },
          {
            "name": "Bilecik",
            "count": 1
          },
          {
            "name": "Bingöl",
            "count": 2
          },
          {
            "name": "Bitlis",
            "count": 1
          },
          {
            "name": "Bolu",
            "count": 4
          },
          {
            "name": "Burdur",
            "count": 4
          },
          {
            "name": "Bursa",
            "count": 47
          },
          {
            "name": "Çanakkale",
            "count": 8
          },
          {
            "name": "Çankırı",
            "count": 1
          },
          {
            "name": "Çorum",
            "count": 1
          },
          {
            "name": "Denizli",
            "count": 14
          },
          {
            "name": "Diyarbakır",
            "count": 13
          },
          {
            "name": "Düzce",
            "count": 2
          },
          {
            "name": "Edirne",
            "count": 7
          },
          {
            "name": "Elazığ",
            "count": 13
          },
          {
            "name": "Erzincan",
            "count": 3
          },
          {
            "name": "Erzurum",
            "count": 3
          },
          {
            "name": "Eskişehir",
            "count": 36
          },
          {
            "name": "Gaziantep",
            "count": 22
          },
          {
            "name": "Giresun",
            "count": 4
          },
          {
            "name": "Hatay",
            "count": 10
          },
          {
            "name": "Iğdır",
            "count": 1
          },
          {
            "name": "Isparta",
            "count": 7
          },
          {
            "name": "İstanbul",
            "count": 919
          },
          {
            "name": "İzmir",
            "count": 127
          },
          {
            "name": "Kahramanmaraş",
            "count": 3
          },
          {
            "name": "Karabük",
            "count": 7
          },
          {
            "name": "Karaman",
            "count": 2
          },
          {
            "name": "Kars",
            "count": 1
          },
          {
            "name": "Kastamonu",
            "count": 1
          },
          {
            "name": "Kayseri",
            "count": 28
          },
          {
            "name": "Kırıkkale",
            "count": 2
          },
          {
            "name": "Kırklareli",
            "count": 6
          },
          {
            "name": "Kırşehir",
            "count": 1
          },
          {
            "name": "Kocaeli",
            "count": 37
          },
          {
            "name": "Konya",
            "count": 19
          },
          {
            "name": "Kütahya",
            "count": 5
          },
          {
            "name": "Malatya",
            "count": 3
          },
          {
            "name": "Manisa",
            "count": 33
          },
          {
            "name": "Mardin",
            "count": 1
          },
          {
            "name": "Mersin",
            "count": 11
          },
          {
            "name": "Muğla",
            "count": 12
          },
          {
            "name": "Niğde",
            "count": 3
          },
          {
            "name": "Ordu",
            "count": 3
          },
          {
            "name": "Osmaniye",
            "count": 5
          },
          {
            "name": "Rize",
            "count": 4
          },
          {
            "name": "Sakarya",
            "count": 20
          },
          {
            "name": "Samsun",
            "count": 14
          },
          {
            "name": "Şanlıurfa",
            "count": 3
          },
          {
            "name": "Siirt",
            "count": 2
          },
          {
            "name": "Sivas",
            "count": 5
          },
          {
            "name": "Şırnak",
            "count": 4
          },
          {
            "name": "Tekirdağ",
            "count": 17
          },
          {
            "name": "Tokat",
            "count": 6
          },
          {
            "name": "Trabzon",
            "count": 11
          },
          {
            "name": "Tunceli",
            "count": 2
          },
          {
            "name": "Uşak",
            "count": 5
          },
          {
            "name": "Van",
            "count": 3
          },
          {
            "name": "Yalova",
            "count": 7
          },
          {
            "name": "Zonguldak",
            "count": 1
          }
        ],
        "educationLevels": [
          {
            "name": "Lisans",
            "count": 1600
          },
          {
            "name": "Lise",
            "count": 179
          },
          {
            "name": "Ön Lisans",
            "count": 47
          },
          {
            "name": "Lisans Mezunu",
            "count": 46
          },
          {
            "name": "Lise Mezunu",
            "count": 33
          },
          {
            "name": "Lisansüstü",
            "count": 10
          },
          {
            "name": "Diğer",
            "count": 9
          }
        ],
        "topDepartments": [
          {
            "name": "Endüstri Mühendisliği",
            "val": 195
          },
          {
            "name": "Bilgisayar Mühendisliği",
            "val": 179
          },
          {
            "name": "İşletme",
            "val": 75
          },
          {
            "name": "Hukuk",
            "val": 75
          },
          {
            "name": "Psikoloji",
            "val": 46
          }
        ]
      },
      {
        "id": "o-24",
        "name": "Öğretmen Eğitimi 2024",
        "participants": 248,
        "graduates": 157,
        "gender": {
          "female": 205,
          "male": 42,
          "other": 1
        },
        "hasAgeData": false,
        "ageData": [],
        "cities": [
          {
            "name": "Adana",
            "count": 13
          },
          {
            "name": "Adıyaman",
            "count": 5
          },
          {
            "name": "Afyonkarahisar",
            "count": 2
          },
          {
            "name": "Aksaray",
            "count": 1
          },
          {
            "name": "Ankara",
            "count": 9
          },
          {
            "name": "Aydın",
            "count": 3
          },
          {
            "name": "Balıkesir",
            "count": 6
          },
          {
            "name": "Bartın",
            "count": 1
          },
          {
            "name": "Bingöl",
            "count": 1
          },
          {
            "name": "Bitlis",
            "count": 1
          },
          {
            "name": "Bolu",
            "count": 2
          },
          {
            "name": "Burdur",
            "count": 2
          },
          {
            "name": "Bursa",
            "count": 5
          },
          {
            "name": "Çanakkale",
            "count": 2
          },
          {
            "name": "Çorum",
            "count": 2
          },
          {
            "name": "Denizli",
            "count": 5
          },
          {
            "name": "Diyarbakır",
            "count": 6
          },
          {
            "name": "Edirne",
            "count": 1
          },
          {
            "name": "Elazığ",
            "count": 5
          },
          {
            "name": "Erzincan",
            "count": 1
          },
          {
            "name": "Erzurum",
            "count": 1
          },
          {
            "name": "Eskişehir",
            "count": 4
          },
          {
            "name": "Gaziantep",
            "count": 10
          },
          {
            "name": "Gümüşhane",
            "count": 1
          },
          {
            "name": "Hatay",
            "count": 7
          },
          {
            "name": "Iğdır",
            "count": 1
          },
          {
            "name": "İstanbul",
            "count": 46
          },
          {
            "name": "İzmir",
            "count": 13
          },
          {
            "name": "Kahramanmaraş",
            "count": 6
          },
          {
            "name": "Karabük",
            "count": 1
          },
          {
            "name": "Karaman",
            "count": 1
          },
          {
            "name": "Kastamonu",
            "count": 2
          },
          {
            "name": "Kayseri",
            "count": 4
          },
          {
            "name": "Kırklareli",
            "count": 3
          },
          {
            "name": "Kırşehir",
            "count": 2
          },
          {
            "name": "Kocaeli",
            "count": 5
          },
          {
            "name": "Konya",
            "count": 3
          },
          {
            "name": "Malatya",
            "count": 4
          },
          {
            "name": "Manisa",
            "count": 3
          },
          {
            "name": "Mardin",
            "count": 2
          },
          {
            "name": "Mersin",
            "count": 4
          },
          {
            "name": "Muğla",
            "count": 3
          },
          {
            "name": "Muş",
            "count": 1
          },
          {
            "name": "Nevşehir",
            "count": 1
          },
          {
            "name": "Niğde",
            "count": 2
          },
          {
            "name": "Ordu",
            "count": 4
          },
          {
            "name": "Osmaniye",
            "count": 2
          },
          {
            "name": "Rize",
            "count": 2
          },
          {
            "name": "Sakarya",
            "count": 5
          },
          {
            "name": "Samsun",
            "count": 4
          },
          {
            "name": "Şanlıurfa",
            "count": 5
          },
          {
            "name": "Sinop",
            "count": 1
          },
          {
            "name": "Sivas",
            "count": 3
          },
          {
            "name": "Şırnak",
            "count": 1
          },
          {
            "name": "Tekirdağ",
            "count": 4
          },
          {
            "name": "Tokat",
            "count": 2
          },
          {
            "name": "Trabzon",
            "count": 2
          },
          {
            "name": "Uşak",
            "count": 1
          },
          {
            "name": "Van",
            "count": 1
          },
          {
            "name": "Yalova",
            "count": 1
          },
          {
            "name": "Yozgat",
            "count": 2
          },
          {
            "name": "Zonguldak",
            "count": 2
          }
        ],
        "educationLevels": [
          {
            "name": "Lisans",
            "count": 91
          },
          {
            "name": "Lisans Mezunu",
            "count": 84
          },
          {
            "name": "Lisansüstü Öğrencisi",
            "count": 31
          },
          {
            "name": "Lisansüstü Mezunu",
            "count": 29
          },
          {
            "name": "Doktora Öğrencisi",
            "count": 4
          },
          {
            "name": "Yüksek Lisans",
            "count": 2
          },
          {
            "name": "Doktora Mezunu",
            "count": 2
          },
          {
            "name": "Lisans (3. ve 4. sınıf)",
            "count": 1
          },
          {
            "name": "Lisansüstü",
            "count": 1
          },
          {
            "name": "Lise",
            "count": 1
          },
          {
            "name": "Ön Lisans",
            "count": 1
          }
        ],
        "topDepartments": [
          {
            "name": "İlköğretim Matematik Öğretmenliği",
            "val": 42
          },
          {
            "name": "İngilizce Öğretmenliği",
            "val": 34
          },
          {
            "name": "Sınıf Öğretmenliği",
            "val": 29
          },
          {
            "name": "Okul Öncesi Öğretmenliği",
            "val": 22
          },
          {
            "name": "Rehberlik ve Psikolojik Danışmanlık",
            "val": 17
          }
        ]
      },
      {
        "id": "doping-2024",
        "name": "Doping Hafıza Eğitimi",
        "image": "/partners/dopinghafızaa.png",
        "participants": 1862,
        "graduates": 981,
        "gender": {
          "female": 1367,
          "male": 484,
          "other": 7
        },
        "hasAgeData": false,
        "ageData": [],
        "cities": [
          {
            "name": "Adana",
            "count": 23
          },
          {
            "name": "Adıyaman",
            "count": 17
          },
          {
            "name": "Afyonkarahisar",
            "count": 7
          },
          {
            "name": "Ağrı",
            "count": 4
          },
          {
            "name": "Aksaray",
            "count": 7
          },
          {
            "name": "Amasya",
            "count": 5
          },
          {
            "name": "Ankara",
            "count": 101
          },
          {
            "name": "Antalya",
            "count": 22
          },
          {
            "name": "Aydın",
            "count": 12
          },
          {
            "name": "Balıkesir",
            "count": 13
          },
          {
            "name": "Bartın",
            "count": 2
          },
          {
            "name": "Batman",
            "count": 7
          },
          {
            "name": "Bilecik",
            "count": 3
          },
          {
            "name": "Bingöl",
            "count": 3
          },
          {
            "name": "Bitlis",
            "count": 5
          },
          {
            "name": "Bolu",
            "count": 5
          },
          {
            "name": "Burdur",
            "count": 2
          },
          {
            "name": "Bursa",
            "count": 22
          },
          {
            "name": "Çanakkale",
            "count": 6
          },
          {
            "name": "Çankırı",
            "count": 1
          },
          {
            "name": "Çorum",
            "count": 2
          },
          {
            "name": "Denizli",
            "count": 8
          },
          {
            "name": "Diyarbakır",
            "count": 24
          },
          {
            "name": "Düzce",
            "count": 2
          },
          {
            "name": "Edirne",
            "count": 7
          },
          {
            "name": "Elazığ",
            "count": 7
          },
          {
            "name": "Erzincan",
            "count": 4
          },
          {
            "name": "Erzurum",
            "count": 11
          },
          {
            "name": "Eskişehir",
            "count": 8
          },
          {
            "name": "Gaziantep",
            "count": 28
          },
          {
            "name": "Giresun",
            "count": 1
          },
          {
            "name": "Gümüşhane",
            "count": 2
          },
          {
            "name": "Hakkâri",
            "count": 7
          },
          {
            "name": "Hatay",
            "count": 18
          },
          {
            "name": "Iğdır",
            "count": 2
          },
          {
            "name": "Isparta",
            "count": 2
          },
          {
            "name": "İstanbul",
            "count": 162
          },
          {
            "name": "İzmir",
            "count": 47
          },
          {
            "name": "Kahramanmaraş",
            "count": 11
          },
          {
            "name": "Karabük",
            "count": 1
          },
          {
            "name": "Karaman",
            "count": 2
          },
          {
            "name": "Kars",
            "count": 1
          },
          {
            "name": "Kastamonu",
            "count": 2
          },
          {
            "name": "Kayseri",
            "count": 22
          },
          {
            "name": "Kilis",
            "count": 5
          },
          {
            "name": "Kırıkkale",
            "count": 6
          },
          {
            "name": "Kırklareli",
            "count": 1
          },
          {
            "name": "Kocaeli",
            "count": 20
          },
          {
            "name": "Konya",
            "count": 38
          },
          {
            "name": "Kütahya",
            "count": 4
          },
          {
            "name": "Malatya",
            "count": 15
          },
          {
            "name": "Manisa",
            "count": 7
          },
          {
            "name": "Mardin",
            "count": 10
          },
          {
            "name": "Mersin",
            "count": 8
          },
          {
            "name": "Muğla",
            "count": 3
          },
          {
            "name": "Muş",
            "count": 2
          },
          {
            "name": "Nevşehir",
            "count": 1
          },
          {
            "name": "Niğde",
            "count": 2
          },
          {
            "name": "Ordu",
            "count": 2
          },
          {
            "name": "Osmaniye",
            "count": 12
          },
          {
            "name": "Rize",
            "count": 1
          },
          {
            "name": "Sakarya",
            "count": 11
          },
          {
            "name": "Samsun",
            "count": 7
          },
          {
            "name": "Şanlıurfa",
            "count": 13
          },
          {
            "name": "Siirt",
            "count": 4
          },
          {
            "name": "Sinop",
            "count": 1
          },
          {
            "name": "Sivas",
            "count": 6
          },
          {
            "name": "Şırnak",
            "count": 1
          },
          {
            "name": "Tekirdağ",
            "count": 9
          },
          {
            "name": "Tokat",
            "count": 3
          },
          {
            "name": "Trabzon",
            "count": 6
          },
          {
            "name": "Tunceli",
            "count": 2
          },
          {
            "name": "Uşak",
            "count": 3
          },
          {
            "name": "Van",
            "count": 13
          },
          {
            "name": "Yozgat",
            "count": 2
          },
          {
            "name": "Zonguldak",
            "count": 4
          }
        ],
        "educationLevels": [
          {
            "name": "Lise",
            "count": 433
          },
          {
            "name": "Lise Mezunu",
            "count": 334
          }
        ],
        "topDepartments": []
      }
    ]
  },
  {
    "year": "2025",
    "participants": 2505,
    "graduates": 1042,
    "description": "Güncel dönem. Sürdürülebilir gelişim ve küresel yetkinlikler odağında eğitimler devam ediyor.",
    "image": "/partners/2025.jpg",
    "hasAgeData": true,
    "ageData": [
      {
        "age": "<18",
        "count": 759
      },
      {
        "age": "18-20",
        "count": 1193
      },
      {
        "age": "21-23",
        "count": 320
      },
      {
        "age": "24-26",
        "count": 95
      },
      {
        "age": "27-29",
        "count": 36
      },
      {
        "age": "30+",
        "count": 86
      }
    ],
    "gender": {
      "female": 1955,
      "male": 534,
      "other": 6
    },
    "cities": [
      {
        "name": "Adana",
        "count": 54
      },
      {
        "name": "Adıyaman",
        "count": 9
      },
      {
        "name": "Afyonkarahisar",
        "count": 9
      },
      {
        "name": "Ağrı",
        "count": 1
      },
      {
        "name": "Aksaray",
        "count": 5
      },
      {
        "name": "Amasya",
        "count": 3
      },
      {
        "name": "Ankara",
        "count": 321
      },
      {
        "name": "Antalya",
        "count": 35
      },
      {
        "name": "Ardahan",
        "count": 1
      },
      {
        "name": "Artvin",
        "count": 1
      },
      {
        "name": "Aydın",
        "count": 17
      },
      {
        "name": "Balıkesir",
        "count": 22
      },
      {
        "name": "Batman",
        "count": 8
      },
      {
        "name": "Bilecik",
        "count": 5
      },
      {
        "name": "Bingöl",
        "count": 1
      },
      {
        "name": "Bitlis",
        "count": 3
      },
      {
        "name": "Bolu",
        "count": 2
      },
      {
        "name": "Burdur",
        "count": 4
      },
      {
        "name": "Bursa",
        "count": 84
      },
      {
        "name": "Çanakkale",
        "count": 10
      },
      {
        "name": "Çankırı",
        "count": 2
      },
      {
        "name": "Çorum",
        "count": 3
      },
      {
        "name": "Denizli",
        "count": 22
      },
      {
        "name": "Diyarbakır",
        "count": 20
      },
      {
        "name": "Düzce",
        "count": 6
      },
      {
        "name": "Edirne",
        "count": 6
      },
      {
        "name": "Elazığ",
        "count": 7
      },
      {
        "name": "Erzincan",
        "count": 1
      },
      {
        "name": "Erzurum",
        "count": 13
      },
      {
        "name": "Eskişehir",
        "count": 63
      },
      {
        "name": "Gaziantep",
        "count": 42
      },
      {
        "name": "Giresun",
        "count": 8
      },
      {
        "name": "Hatay",
        "count": 29
      },
      {
        "name": "Iğdır",
        "count": 3
      },
      {
        "name": "Isparta",
        "count": 6
      },
      {
        "name": "İstanbul",
        "count": 957
      },
      {
        "name": "İzmir",
        "count": 190
      },
      {
        "name": "Kahramanmaraş",
        "count": 7
      },
      {
        "name": "Karabük",
        "count": 4
      },
      {
        "name": "Karaman",
        "count": 3
      },
      {
        "name": "Kars",
        "count": 4
      },
      {
        "name": "Kastamonu",
        "count": 8
      },
      {
        "name": "Kayseri",
        "count": 47
      },
      {
        "name": "Kırıkkale",
        "count": 6
      },
      {
        "name": "Kırklareli",
        "count": 11
      },
      {
        "name": "Kırşehir",
        "count": 1
      },
      {
        "name": "Kilis",
        "count": 6
      },
      {
        "name": "Kocaeli",
        "count": 65
      },
      {
        "name": "Konya",
        "count": 32
      },
      {
        "name": "Kütahya",
        "count": 12
      },
      {
        "name": "Malatya",
        "count": 15
      },
      {
        "name": "Manisa",
        "count": 50
      },
      {
        "name": "Mardin",
        "count": 5
      },
      {
        "name": "Mersin",
        "count": 34
      },
      {
        "name": "Muğla",
        "count": 21
      },
      {
        "name": "Muş",
        "count": 3
      },
      {
        "name": "Nevşehir",
        "count": 2
      },
      {
        "name": "Niğde",
        "count": 1
      },
      {
        "name": "Ordu",
        "count": 8
      },
      {
        "name": "Osmaniye",
        "count": 10
      },
      {
        "name": "Rize",
        "count": 6
      },
      {
        "name": "Sakarya",
        "count": 18
      },
      {
        "name": "Samsun",
        "count": 18
      },
      {
        "name": "Siirt",
        "count": 6
      },
      {
        "name": "Sinop",
        "count": 1
      },
      {
        "name": "Sivas",
        "count": 11
      },
      {
        "name": "Şanlıurfa",
        "count": 18
      },
      {
        "name": "Tekirdağ",
        "count": 21
      },
      {
        "name": "Tokat",
        "count": 4
      },
      {
        "name": "Trabzon",
        "count": 16
      },
      {
        "name": "Tunceli",
        "count": 2
      },
      {
        "name": "Uşak",
        "count": 5
      },
      {
        "name": "Van",
        "count": 7
      },
      {
        "name": "Yalova",
        "count": 5
      },
      {
        "name": "Yozgat",
        "count": 1
      },
      {
        "name": "Zonguldak",
        "count": 6
      }
    ],
    "educationLevels": [],
    "topDepartments": [
      {
        "name": "Bilgisayar Mühendisliği",
        "val": 98
      },
      {
        "name": "Endüstri Mühendisliği",
        "val": 94
      },
      {
        "name": "Endüstri Müh. (İngilizce)",
        "val": 93
      },
      {
        "name": "İşletme",
        "val": 60
      },
      {
        "name": "Hukuk",
        "val": 56
      }
    ],
    "sponsors": [
      "Mehmet Zorlu Vakfı",
      "Yetkin Gençler",
      "MEF Üniversitesi"
    ],
    "programs": [
      {
        "id": "basic-2025",
        "name": "BASIC 2025",
        "participants": 2041,
        "graduates": 862,
        "gender": {
          "female": 1543,
          "male": 491,
          "other": 5
        },
        "hasAgeData": true,
        "ageData": [
          {
            "age": "<18",
            "count": 714
          },
          {
            "age": "18-20",
            "count": 1031
          },
          {
            "age": "21-23",
            "count": 213
          },
          {
            "age": "24-26",
            "count": 58
          },
          {
            "age": "27-29",
            "count": 9
          },
          {
            "age": "30+",
            "count": 14
          }
        ],
        "cities": [
          {
            "name": "Adana",
            "count": 42
          },
          {
            "name": "Adıyaman",
            "count": 8
          },
          {
            "name": "Afyonkarahisar",
            "count": 3
          },
          {
            "name": "Ağrı",
            "count": 1
          },
          {
            "name": "Aksaray",
            "count": 3
          },
          {
            "name": "Amasya",
            "count": 2
          },
          {
            "name": "Ankara",
            "count": 260
          },
          {
            "name": "Antalya",
            "count": 25
          },
          {
            "name": "Ardahan",
            "count": 1
          },
          {
            "name": "Artvin",
            "count": 1
          },
          {
            "name": "Aydın",
            "count": 16
          },
          {
            "name": "Balıkesir",
            "count": 16
          },
          {
            "name": "Batman",
            "count": 3
          },
          {
            "name": "Bilecik",
            "count": 5
          },
          {
            "name": "Bingöl",
            "count": 1
          },
          {
            "name": "Bitlis",
            "count": 3
          },
          {
            "name": "Bolu",
            "count": 1
          },
          {
            "name": "Burdur",
            "count": 3
          },
          {
            "name": "Bursa",
            "count": 65
          },
          {
            "name": "Çanakkale",
            "count": 6
          },
          {
            "name": "Çankırı",
            "count": 1
          },
          {
            "name": "Çorum",
            "count": 2
          },
          {
            "name": "Denizli",
            "count": 14
          },
          {
            "name": "Diyarbakır",
            "count": 18
          },
          {
            "name": "Düzce",
            "count": 5
          },
          {
            "name": "Edirne",
            "count": 3
          },
          {
            "name": "Elazığ",
            "count": 6
          },
          {
            "name": "Erzurum",
            "count": 10
          },
          {
            "name": "Eskişehir",
            "count": 49
          },
          {
            "name": "Gaziantep",
            "count": 32
          },
          {
            "name": "Giresun",
            "count": 4
          },
          {
            "name": "Hatay",
            "count": 19
          },
          {
            "name": "Iğdır",
            "count": 3
          },
          {
            "name": "Isparta",
            "count": 4
          },
          {
            "name": "İstanbul",
            "count": 823
          },
          {
            "name": "İzmir",
            "count": 174
          },
          {
            "name": "Kahramanmaraş",
            "count": 6
          },
          {
            "name": "Karabük",
            "count": 4
          },
          {
            "name": "Karaman",
            "count": 3
          },
          {
            "name": "Kars",
            "count": 3
          },
          {
            "name": "Kastamonu",
            "count": 6
          },
          {
            "name": "Kayseri",
            "count": 35
          },
          {
            "name": "Kilis",
            "count": 4
          },
          {
            "name": "Kırıkkale",
            "count": 6
          },
          {
            "name": "Kırklareli",
            "count": 8
          },
          {
            "name": "Kocaeli",
            "count": 47
          },
          {
            "name": "Konya",
            "count": 26
          },
          {
            "name": "Kütahya",
            "count": 10
          },
          {
            "name": "Malatya",
            "count": 13
          },
          {
            "name": "Manisa",
            "count": 46
          },
          {
            "name": "Mardin",
            "count": 5
          },
          {
            "name": "Mersin",
            "count": 23
          },
          {
            "name": "Muğla",
            "count": 14
          },
          {
            "name": "Muş",
            "count": 3
          },
          {
            "name": "Nevşehir",
            "count": 1
          },
          {
            "name": "Niğde",
            "count": 1
          },
          {
            "name": "Ordu",
            "count": 5
          },
          {
            "name": "Osmaniye",
            "count": 9
          },
          {
            "name": "Rize",
            "count": 3
          },
          {
            "name": "Sakarya",
            "count": 16
          },
          {
            "name": "Samsun",
            "count": 14
          },
          {
            "name": "Şanlıurfa",
            "count": 17
          },
          {
            "name": "Siirt",
            "count": 4
          },
          {
            "name": "Sivas",
            "count": 7
          },
          {
            "name": "Tekirdağ",
            "count": 16
          },
          {
            "name": "Tokat",
            "count": 3
          },
          {
            "name": "Trabzon",
            "count": 11
          },
          {
            "name": "Tunceli",
            "count": 2
          },
          {
            "name": "Uşak",
            "count": 3
          },
          {
            "name": "Van",
            "count": 5
          },
          {
            "name": "Yalova",
            "count": 3
          },
          {
            "name": "Zonguldak",
            "count": 6
          }
        ],
        "educationLevels": [],
        "topDepartments": [
          {
            "name": "Bilgisayar Mühendisliği",
            "val": 98
          },
          {
            "name": "Endüstri Mühendisliği",
            "val": 94
          },
          {
            "name": "Endüstri Müh. (İngilizce)",
            "val": 93
          },
          {
            "name": "İşletme",
            "val": 60
          },
          {
            "name": "Hukuk",
            "val": 56
          }
        ]
      },
      {
        "id": "o-25",
        "name": "Öğretmen Eğitimi 2025",
        "participants": 464,
        "graduates": 180,
        "gender": {
          "female": 412,
          "male": 43,
          "other": 1
        },
        "hasAgeData": true,
        "ageData": [
          {
            "age": "<18",
            "count": 45
          },
          {
            "age": "18-20",
            "count": 162
          },
          {
            "age": "21-23",
            "count": 107
          },
          {
            "age": "24-26",
            "count": 37
          },
          {
            "age": "27-29",
            "count": 27
          },
          {
            "age": "30+",
            "count": 72
          }
        ],
        "cities": [
          {
            "name": "Adana",
            "count": 12
          },
          {
            "name": "Adıyaman",
            "count": 1
          },
          {
            "name": "Afyonkarahisar",
            "count": 6
          },
          {
            "name": "Aksaray",
            "count": 2
          },
          {
            "name": "Amasya",
            "count": 1
          },
          {
            "name": "Ankara",
            "count": 61
          },
          {
            "name": "Antalya",
            "count": 10
          },
          {
            "name": "Aydın",
            "count": 1
          },
          {
            "name": "Balıkesir",
            "count": 6
          },
          {
            "name": "Batman",
            "count": 5
          },
          {
            "name": "Bolu",
            "count": 1
          },
          {
            "name": "Burdur",
            "count": 1
          },
          {
            "name": "Bursa",
            "count": 19
          },
          {
            "name": "Çanakkale",
            "count": 4
          },
          {
            "name": "Çankırı",
            "count": 1
          },
          {
            "name": "Çorum",
            "count": 1
          },
          {
            "name": "Denizli",
            "count": 8
          },
          {
            "name": "Diyarbakır",
            "count": 2
          },
          {
            "name": "Düzce",
            "count": 1
          },
          {
            "name": "Edirne",
            "count": 3
          },
          {
            "name": "Elazığ",
            "count": 1
          },
          {
            "name": "Erzincan",
            "count": 1
          },
          {
            "name": "Erzurum",
            "count": 3
          },
          {
            "name": "Eskişehir",
            "count": 14
          },
          {
            "name": "Gaziantep",
            "count": 10
          },
          {
            "name": "Giresun",
            "count": 4
          },
          {
            "name": "Hatay",
            "count": 10
          },
          {
            "name": "Isparta",
            "count": 2
          },
          {
            "name": "İstanbul",
            "count": 134
          },
          {
            "name": "İzmir",
            "count": 16
          },
          {
            "name": "Kahramanmaraş",
            "count": 1
          },
          {
            "name": "Kars",
            "count": 1
          },
          {
            "name": "Kastamonu",
            "count": 2
          },
          {
            "name": "Kayseri",
            "count": 12
          },
          {
            "name": "Kilis",
            "count": 2
          },
          {
            "name": "Kırklareli",
            "count": 3
          },
          {
            "name": "Kırşehir",
            "count": 1
          },
          {
            "name": "Kocaeli",
            "count": 18
          },
          {
            "name": "Konya",
            "count": 6
          },
          {
            "name": "Kütahya",
            "count": 2
          },
          {
            "name": "Malatya",
            "count": 2
          },
          {
            "name": "Manisa",
            "count": 4
          },
          {
            "name": "Mersin",
            "count": 11
          },
          {
            "name": "Muğla",
            "count": 7
          },
          {
            "name": "Nevşehir",
            "count": 1
          },
          {
            "name": "Ordu",
            "count": 3
          },
          {
            "name": "Osmaniye",
            "count": 1
          },
          {
            "name": "Rize",
            "count": 3
          },
          {
            "name": "Sakarya",
            "count": 2
          },
          {
            "name": "Samsun",
            "count": 4
          },
          {
            "name": "Şanlıurfa",
            "count": 1
          },
          {
            "name": "Siirt",
            "count": 2
          },
          {
            "name": "Sinop",
            "count": 1
          },
          {
            "name": "Sivas",
            "count": 4
          },
          {
            "name": "Tekirdağ",
            "count": 5
          },
          {
            "name": "Tokat",
            "count": 1
          },
          {
            "name": "Trabzon",
            "count": 5
          },
          {
            "name": "Uşak",
            "count": 2
          },
          {
            "name": "Van",
            "count": 2
          },
          {
            "name": "Yalova",
            "count": 2
          },
          {
            "name": "Yozgat",
            "count": 1
          }
        ],
        "educationLevels": [],
        "topDepartments": [
          {
            "name": "Sınıf Öğretmenliği",
            "val": 47
          },
          {
            "name": "İlköğretim Matematik Öğretmenliği",
            "val": 37
          },
          {
            "name": "İngilizce Öğretmenliği",
            "val": 37
          },
          {
            "name": "Okul Öncesi Öğretmenliği",
            "val": 32
          },
          {
            "name": "Rehberlik ve Psikolojik Danışmanlık",
            "val": 27
          }
        ]
      },
      {
        "id": "doping-2025",
        "name": "Doping Hafıza Eğitimi",
        "image": "/partners/dopinghafızaa.png",
        "participants": 650,
        "graduates": 500,
        "gender": {
          "female": 500,
          "male": 142,
          "other": 8
        },
        "hasAgeData": true,
        "ageData": [
          {
            "age": "10",
            "count": 2
          },
          {
            "age": "11",
            "count": 48
          },
          {
            "age": "12",
            "count": 90
          },
          {
            "age": "13",
            "count": 117
          },
          {
            "age": "14",
            "count": 190
          },
          {
            "age": "15",
            "count": 101
          },
          {
            "age": "16",
            "count": 48
          },
          {
            "age": "17",
            "count": 19
          },
          {
            "age": "18",
            "count": 9
          },
          {
            "age": "19",
            "count": 10
          },
          {
            "age": "20",
            "count": 4
          },
          {
            "age": "21",
            "count": 4
          },
          {
            "age": "22",
            "count": 2
          },
          {
            "age": "23",
            "count": 6
          }
        ],
        "cities": [
          {
            "name": "Adana",
            "count": 18
          },
          {
            "name": "Adıyaman",
            "count": 7
          },
          {
            "name": "Afyonkarahisar",
            "count": 7
          },
          {
            "name": "Ağrı",
            "count": 3
          },
          {
            "name": "Aksaray",
            "count": 5
          },
          {
            "name": "Amasya",
            "count": 1
          },
          {
            "name": "Ankara",
            "count": 58
          },
          {
            "name": "Antalya",
            "count": 16
          },
          {
            "name": "Ardahan",
            "count": 1
          },
          {
            "name": "Artvin",
            "count": 2
          },
          {
            "name": "Aydın",
            "count": 8
          },
          {
            "name": "Balıkesir",
            "count": 12
          },
          {
            "name": "Bartın",
            "count": 1
          },
          {
            "name": "Batman",
            "count": 4
          },
          {
            "name": "Bayburt",
            "count": 2
          },
          {
            "name": "Bilecik",
            "count": 3
          },
          {
            "name": "Bingöl",
            "count": 3
          },
          {
            "name": "Bitlis",
            "count": 3
          },
          {
            "name": "Bolu",
            "count": 1
          },
          {
            "name": "Bursa",
            "count": 24
          },
          {
            "name": "Çanakkale",
            "count": 3
          },
          {
            "name": "Çankırı",
            "count": 2
          },
          {
            "name": "Çorum",
            "count": 2
          },
          {
            "name": "Denizli",
            "count": 8
          },
          {
            "name": "Diyarbakır",
            "count": 10
          },
          {
            "name": "Düzce",
            "count": 2
          },
          {
            "name": "Edirne",
            "count": 6
          },
          {
            "name": "Elazığ",
            "count": 6
          },
          {
            "name": "Erzincan",
            "count": 2
          },
          {
            "name": "Erzurum",
            "count": 14
          },
          {
            "name": "Eskişehir",
            "count": 7
          },
          {
            "name": "Gaziantep",
            "count": 21
          },
          {
            "name": "Giresun",
            "count": 1
          },
          {
            "name": "Hakkâri",
            "count": 5
          },
          {
            "name": "Hatay",
            "count": 13
          },
          {
            "name": "Iğdır",
            "count": 6
          },
          {
            "name": "Isparta",
            "count": 2
          },
          {
            "name": "İstanbul",
            "count": 97
          },
          {
            "name": "İzmir",
            "count": 37
          },
          {
            "name": "Kahramanmaraş",
            "count": 8
          },
          {
            "name": "Karabük",
            "count": 1
          },
          {
            "name": "Karaman",
            "count": 3
          },
          {
            "name": "Kars",
            "count": 3
          },
          {
            "name": "Kayseri",
            "count": 21
          },
          {
            "name": "Kilis",
            "count": 4
          },
          {
            "name": "Kırıkkale",
            "count": 3
          },
          {
            "name": "Kırklareli",
            "count": 1
          },
          {
            "name": "Kırşehir",
            "count": 3
          },
          {
            "name": "Kocaeli",
            "count": 17
          },
          {
            "name": "Konya",
            "count": 19
          },
          {
            "name": "Kütahya",
            "count": 3
          },
          {
            "name": "Malatya",
            "count": 8
          },
          {
            "name": "Manisa",
            "count": 4
          },
          {
            "name": "Mardin",
            "count": 9
          },
          {
            "name": "Mersin",
            "count": 17
          },
          {
            "name": "Muğla",
            "count": 10
          },
          {
            "name": "Muş",
            "count": 2
          },
          {
            "name": "Nevşehir",
            "count": 1
          },
          {
            "name": "Niğde",
            "count": 2
          },
          {
            "name": "Ordu",
            "count": 1
          },
          {
            "name": "Osmaniye",
            "count": 6
          },
          {
            "name": "Rize",
            "count": 1
          },
          {
            "name": "Sakarya",
            "count": 8
          },
          {
            "name": "Samsun",
            "count": 4
          },
          {
            "name": "Şanlıurfa",
            "count": 10
          },
          {
            "name": "Siirt",
            "count": 2
          },
          {
            "name": "Sinop",
            "count": 1
          },
          {
            "name": "Sivas",
            "count": 6
          },
          {
            "name": "Şırnak",
            "count": 2
          },
          {
            "name": "Tekirdağ",
            "count": 13
          },
          {
            "name": "Tokat",
            "count": 4
          },
          {
            "name": "Trabzon",
            "count": 4
          },
          {
            "name": "Tunceli",
            "count": 1
          },
          {
            "name": "Van",
            "count": 11
          },
          {
            "name": "Yalova",
            "count": 2
          },
          {
            "name": "Yozgat",
            "count": 3
          },
          {
            "name": "Zonguldak",
            "count": 6
          }
        ],
        "educationLevels": [
          {
            "name": "Lise",
            "count": 414
          },
          {
            "name": "Lise Mezunu",
            "count": 236
          }
        ],
        "topDepartments": []
      }
    ]
  }
];

const genderData = [
  { name: 'Kadın', value: 11669, color: '#F472B6' },
  { name: 'Erkek', value: 5384, color: '#3B82F6' },
  { name: 'Diğer', value: 52, color: '#94A3B8' },
];

const ageData = [
  { year: '1995', count: 75 },
  { year: '1996', count: 142 },
  { year: '1997', count: 245 },
  { year: '1998', count: 512 },
  { year: '1999', count: 1040 },
  { year: '2000', count: 1850 },
  { year: '2001', count: 2840 },
  { year: '2002', count: 3250 },
  { year: '2003', count: 2860 },
  { year: '2004', count: 2080 },
  { year: '2005', count: 1220 },
  { year: '2006', count: 1040 },
  { year: '2007', count: 670 },
  { year: '2008', count: 370 },
];

const skills = [
  { name: 'Analitik Düşünme', icon: Brain, color: 'text-purple-400' },
  { name: 'Problem Çözme', icon: Wrench, color: 'text-blue-400' },
  { name: 'İletişim & Takım', icon: MessageSquare, color: 'text-emerald-400' },
  { name: 'Dijital Okuryazarlık', icon: Laptop, color: 'text-orange-400' },
  { name: 'Girişimcilik', icon: Rocket, color: 'text-rose-400' },
  { name: 'Excel İle Modelleme', icon: FileSpreadsheet, color: 'text-green-500' },
  { name: 'Kariyer Planlama', icon: Briefcase, color: 'text-amber-500' },
  { name: 'Sunum Teknikleri', icon: Presentation, color: 'text-indigo-400' },
];

const getHeroContent = (selectedYear: string, selectedProgramData?: IYearlyData | IProgramData) => {
  let content = {
    title1: 'YetGen',
    title2: 'Stratejik Etki Raporu',
    subtitle: '21. Yüzyıl Yetkinlikleri Programı',
    text: 'Gençleri 21. yüzyıl yetkinlikleri ve uygulama odaklı modellerle donatarak geleceğin üretici liderlerine dönüştürüyoruz.',
    statusText: 'Aktif & Büyüyor'
  };

  if (selectedYear === 'all') {
    content = {
      title1: 'YetGen',
      title2: 'Stratejik Etki Raporu',
      subtitle: '',
      text: 'Gençleri 21. yüzyıl yetkinlikleri ve yaratıcı projelerle donatarak güçlü liderler haline getiriyor; büyük bir ekosistem inşa ediyoruz.',
      statusText: 'Ekosistem Aktif'
    };
  } else if (selectedYear === '2025') {
    content = {
      title1: 'Sürdürülebilirlik &',
      title2: 'Küresel Vizyon',
      subtitle: '2025 Ekosistemi',
      text: 'Geleceğin iş modellerini ve sürdürülebilir yetkinlikleri merkeze alarak, global küreselde rekabet edecek yeni nesil yetenekleri ve vizyoner teknoloji üreticilerini liderler olarak eğitiyoruz.',
      statusText: 'Tamamlandı'
    };
  } else if (selectedYear === '2024') {
    content = {
      title1: 'İnovasyon &',
      title2: 'Teknolojik Dönüşüm',
      subtitle: '2024 Altın Zirvesi',
      text: 'Yapay zeka, dijital dönüşüm ve ileri teknolojiye tam entegre, kendi girişimlerini kurabilen cesur liderlerin sahne aldığı tam bir teknoloji yılı.',
      statusText: 'Tamamlandı'
    };
  } else if (selectedYear === '2023') {
    content = {
      title1: 'Derin Uzmanlık &',
      title2: 'Kalite Odağı',
      subtitle: '2023 Etki Dönemi',
      text: 'Güçlü mentorluk stüdyoları ve çok boyutlu asenkron altyapısıyla, bireysel yetkinlik gelişimini maksimize ederek rekor seviyede yüksek nitelikli mezunlar verdik.',
      statusText: 'Tamamlandı'
    };
  } else if (selectedYear === '2022') {
    content = {
      title1: 'Kapsayıcılık &',
      title2: 'Dev Büyüme Hareketi',
      subtitle: '2022 Genişlemesi',
      text: 'Eğitimde fırsat eşitliğini bayraklaştırarak, Türkiye\'nin dört bir yanından gelen binlerce pırıl pırıl gencin en kritik dijital araçlarla donatılarak sisteme entegre olduğu özel yıl.',
      statusText: 'Tamamlandı'
    };
  } else if (selectedYear === '2021') {
    content = {
      title1: 'Büyük Atılım &',
      title2: 'İlk Güçlü Kıvılcım',
      subtitle: '',
      text: 'Büyük ve cesur dijital hareketin temellerinin atıldığı, sınırları aştığımız ve YetGen kültürünün güçlü köklerinin toprağa sıkı sıkıya tutunduğu ilk altın dönüm noktamız.',
      statusText: 'Tamamlandı'
    };
  } else if (selectedYear === '2020') {
    content = {
      title1: 'YetGen',
      title2: '21.Yüzyıl Liderliği',
      subtitle: 'Pandemi Çevikliği',
      text: 'Kriz anlarında eşsiz bir çeviklik (agile) prensibi sergileyerek eğitimleri aksatmadan tamamen dijitale hızlıca taşıdığımız ve sınırları yıktığımız tarihsel dönüm yılı.',
      statusText: 'Tamamlandı'
    };
  } else if (selectedYear === '2019') {
    content = {
      title1: 'Büyüme &',
      title2: 'İvme Kazanımı',
      subtitle: '2019 Atılımı',
      text: 'Mezunların topluluğa katkısı ve network ağının temellerinin sağlamlaştırıldığı, büyüme ivmesinin her ay katlandığı gelişim yılı.',
      statusText: 'Tamamlandı'
    };
  } else if (selectedYear === '2018') {
    content = {
      title1: 'Dijital',
      title2: 'Okuryazarlık',
      subtitle: '2018 Müfredatı',
      text: 'Dijital okuryazarlık eğitimlerinin müfredata tam entegre edildiği ve katılımcı etkileşiminin yeni rekorlara ulaştığı dönem.',
      statusText: 'Tamamlandı'
    };
  } else if (selectedYear === '2017') {
    content = {
      title1: 'İletişim &',
      title2: 'Takım Ruhu',
      subtitle: '2017 Gelişimi',
      text: 'Program kapsamının genişletildiği; iletişim ve takım çalışması modüllerinin YetGen kültürüne kalıcı olarak işlendiği yıl.',
      statusText: 'Tamamlandı'
    };
  } else if (selectedYear === '2016') {
    content = {
      title1: 'Pilot Yıl &',
      title2: 'İlk Kıvılcım',
      subtitle: '2016 Başlangıcı',
      text: '73 cesur gençle yola çıkılan, YetGen ruhunun ilk meyvelerini verdiği ve büyük hikayenin başladığı kuruluş yılı.',
      statusText: 'Tamamlandı'
    };
  }

  if (selectedProgramData?.isProgram) {
    content.title1 = selectedProgramData.programName;
    content.title2 = ' Raporu';
    content.subtitle = '';
    if (selectedProgramData.description) {
      content.text = selectedProgramData.description;
    }
  }

  return content;
};

const normalizedYearlyData: IYearlyData[] = yearlyData.map(year => {
  if (!year.programs || year.programs.length === 0) return year;

  let p = 0, g = 0;
  let f = 0, m = 0, o = 0;
  const eduCount: Record<string, number> = {};
  const cityCount: Record<string, number> = {};
  const ageCount: Record<string, number> = {};
  const deptCount: Record<string, number> = {};
  let hasAge = false;

  year.programs.forEach(prog => {
    p += prog.participants || 0;
    g += prog.graduates || 0;
    if (prog.gender) {
      f += prog.gender.female || 0;
      m += prog.gender.male || 0;
      o += prog.gender.other || 0;
    }
    if (prog.educationLevels) {
      prog.educationLevels.forEach(e => { eduCount[e.name] = (eduCount[e.name] || 0) + e.count; });
    }
    if (prog.cities) {
      prog.cities.forEach(c => { cityCount[c.name] = (cityCount[c.name] || 0) + c.count; });
    }
    if (prog.ageData && prog.ageData.length > 0) {
      hasAge = true;
      prog.ageData.forEach(a => {
        let bucket = a.age;
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
        ageCount[bucket] = (ageCount[bucket] || 0) + a.count;
      });
    }
    if (prog.topDepartments) {
      prog.topDepartments.forEach(d => {
        if (typeof d === 'string') deptCount[d] = (deptCount[d] || 0) + 1;
        else if (d && typeof d === 'object' && d.name) deptCount[d.name] = (deptCount[d.name] || 0) + (d.val || 1);
      });
    }
  });

  if (p >= year.participants) {
    return {
      ...year,
      participants: p,
      graduates: g,
      gender: { female: f, male: m, other: o },
      educationLevels: Object.entries(eduCount).map(([name, count]) => ({name, count})).sort((a,b) => b.count - a.count),
      cities: Object.entries(cityCount).map(([name, count]) => ({name, count})).sort((a,b) => b.count - a.count),
      hasAgeData: hasAge,
      ageData: Object.entries(ageCount).map(([age, count]) => ({age, count})).sort((a,b) => b.count - a.count),
      topDepartments: Object.entries(deptCount).map(([name, val]) => ({name, val})).sort((a,b) => b.val - a.val)
    };
  }
  return year;
});

export default function App() {
  const [selectedYear, setSelectedYear] = React.useState('all');
  const [selectedProgram, setSelectedProgram] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = React.useState(false);

  // Reset program when year changes
  React.useEffect(() => {
    setSelectedProgram(null);
  }, [selectedYear]);

  const totalParticipants = useMemo(() => normalizedYearlyData.reduce((acc, curr) => acc + curr.participants, 0), []);
  const totalGraduates = useMemo(() => normalizedYearlyData.reduce((acc, curr) => acc + curr.graduates, 0), []);
  const avgCompletionRate = useMemo(() => ((totalGraduates / totalParticipants) * 100).toFixed(1), [totalGraduates, totalParticipants]);

  const allYearsData = useMemo(() => {
    const participants = normalizedYearlyData.reduce((acc, curr) => acc + curr.participants, 0);
    const graduates = normalizedYearlyData.reduce((acc, curr) => acc + curr.graduates, 0);

    const deptCount: Record<string, number> = {};
    let female = 0, male = 0, other = 0;
    const eduCount: Record<string, number> = {};
    const ageCount: Record<string, number> = {};
    const cityCount: Record<string, number> = {};
    let hasAgeData = false;

    normalizedYearlyData.forEach(d => {
      // Departments
      (d.topDepartments || []).forEach(dept => {
        if (typeof dept === 'string') {
          deptCount[dept] = (deptCount[dept] || 0) + 1;
        } else if (dept && typeof dept === 'object' && dept.name) {
          deptCount[dept.name] = (deptCount[dept.name] || 0) + (dept.val || 1);
        }
      });

      // Cities
      if (d.cities) {
        d.cities.forEach(city => {
          if (typeof city === 'object' && city.name && city.count) {
            cityCount[city.name] = (cityCount[city.name] || 0) + city.count;
          }
        });
      }

      // Gender
      if (d.gender) {
        female += d.gender.female || 0;
        male += d.gender.male || 0;
        other += d.gender.other || 0;
      }

      // Education
      if (d.educationLevels) {
        d.educationLevels.forEach(edu => {
          eduCount[edu.name] = (eduCount[edu.name] || 0) + edu.count;
        });
      }

      // Age
      if (d.ageData && d.ageData.length > 0) {
        hasAgeData = true;
        d.ageData.forEach(a => {
          ageCount[a.age] = (ageCount[a.age] || 0) + a.count;
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
      sponsors: Array.from(new Set(normalizedYearlyData.flatMap(d => d.sponsors || [])))
    };
  }, []);

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
          programName: program.name
        };
      }
    }
    return yearData;
  }, [selectedYear, allYearsData, selectedProgram]);

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

  const hasAgeData = selectedYearData?.hasAgeData !== false;
  const hasEduData = !!(selectedYearData?.educationLevels && selectedYearData.educationLevels.length > 0);
  const hasCityData = !!(selectedYearData?.cities && selectedYearData.cities.length > 0);
  const hasDeptData = !!((selectedYearData?.topSchools && selectedYearData.topSchools.length > 0) || (selectedYearData?.topDepartments && selectedYearData.topDepartments.length > 0));

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
  const totalRawCards = [hasAgeData, hasEduData, true, hasDeptData].filter(Boolean).length;
  // Top cards grid size is based on remaining cards (up to 4)
  const computedGridCols = totalRawCards || 1;

  const heroContent = getHeroContent(selectedYear, selectedYearData);

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
                <div className="flex items-center gap-2 p-1.5 md:p-2 bg-white/80 backdrop-blur-md rounded-full border border-slate-200 shadow-md shadow-slate-200/50 overflow-x-auto no-scrollbar max-w-full">
                  <button
                    onClick={() => setSelectedProgram(null)}
                    className={cn(
                      "px-6 md:px-8 py-3 md:py-3.5 rounded-full text-[10px] md:text-[11px] font-black transition-all uppercase tracking-[0.15em] shrink-0",
                      selectedProgram === null
                        ? "bg-slate-900 text-white shadow-xl shadow-slate-300"
                        : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                    )}
                  >
                    Genel Bakış
                  </button>
                  {normalizedYearlyData.find(d => d.year === selectedYear)?.programs?.map(p => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedProgram(p.id)}
                      className={cn(
                        "px-6 md:px-8 py-3 md:py-3.5 rounded-full text-[10px] md:text-[11px] font-black transition-all uppercase tracking-[0.15em] shrink-0",
                        selectedProgram === p.id
                          ? "bg-slate-900 text-white shadow-xl shadow-slate-300"
                          : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                      )}
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
                  className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-slate-900 leading-[1.1] font-display break-words"
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
              "grid grid-cols-1 gap-4 sm:gap-6 md:gap-8 sm:grid-cols-2 mb-10 md:mb-16",
              selectedYear === '2016-2020' ? "lg:grid-cols-3" : "lg:grid-cols-4"
            )}>
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
                value={`%${selectedYearData?.participants ? ((selectedYearData.graduates / selectedYearData.participants) * 100).toFixed(1) : '0'}`}
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
                                {selectedProgram ? selectedYearData?.programName : (selectedYear === 'all' ? 'Genel Bakış' : `Yıl: ${selectedYear}`)}
                              </motion.span>
                              <motion.h3
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-white tracking-tighter leading-[0.9] md:leading-[0.85] font-display mb-6 md:mb-8"
                              >
                                {selectedYear === 'all' ? '10 Yıllık' : selectedYear} <br />
                                <span className="text-blue-400">{selectedProgram ? 'Özel Program' : (selectedYear === 'all' ? 'Etki Raporu' : 'Etki Yılı')}</span>
                              </motion.h3>
                              <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="text-slate-100 text-lg md:text-xl font-medium leading-relaxed max-w-xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                              >
                                {selectedYearData?.description}
                              </motion.p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 4 or 5 Interactive Charts Row */}
                      <div className={cn(
                        "grid gap-6 md:gap-8 mt-6 sm:mt-8",
                        selectedProgram === 'doping-2024' 
                          ? "grid-cols-1 lg:grid-cols-12 items-stretch" 
                          : cn("grid-cols-1 md:grid-cols-2", {
                              3: "xl:grid-cols-3",
                              4: "xl:grid-cols-4",
                              5: "xl:grid-cols-5"
                            }[computedGridCols] || "xl:grid-cols-4")
                      )}>
                        {/* Age Distribution Mini Chart */}
                        {selectedYearData?.hasAgeData !== false && (
                          <div className="bg-white/70 backdrop-blur-3xl border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] lg:rounded-[2.5rem] border p-6 sm:p-8 md:p-10 shadow-sm flex flex-col h-full min-w-0 relative overflow-hidden hover:shadow-xl hover:shadow-indigo-100/40 transition-all justify-start">
                            <div>
                              <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-500 flex items-center justify-center shrink-0">
                                  <Users className="w-4 h-4" />
                                </div>
                                <div>
                                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Yaş Aralığı</div>
                                </div>
                              </div>
                              <div className="h-[220px] w-full mt-4">
                                <ResponsiveContainer width="100%" height="100%">
                                  {(() => {
                                    let ageData = Math.max((selectedYearData?.ageData?.length || 0), 0) > 0 ? selectedYearData?.ageData : [
                                      { age: '15-18', count: 12 },
                                      { age: '18-22', count: 48 },
                                      { age: '23-26', count: 28 },
                                      { age: '26+', count: 12 },
                                    ];
                                    
                                    if (selectedProgram === 'doping-2025') {
                                      ageData = [
                                        { age: '10-12 Yaş', count: 140 },
                                        { age: '13 Yaş', count: 117 },
                                        { age: '14 Yaş', count: 190 },
                                        { age: '15 Yaş', count: 101 },
                                        { age: '16-17 Yaş', count: 67 },
                                        { age: '18+ Yaş', count: 35 }
                                      ];
                                    }
                                    
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
                        {selectedYearData?.educationLevels && selectedYearData.educationLevels.length > 0 && (
                          <div className={cn(
                            "bg-white/70 backdrop-blur-3xl border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] lg:rounded-[2.5rem] border p-6 sm:p-8 md:p-10 shadow-sm flex flex-col min-w-0 h-full relative overflow-hidden hover:shadow-xl hover:shadow-indigo-100/40 transition-all justify-start",
                            selectedProgram === 'doping-2024' ? "lg:col-span-3 lg:order-1" : ""
                          )}>
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
                              
                              {selectedProgram === 'doping-2024' && (
                                <div className="mt-6 flex items-start gap-2 bg-indigo-50/50 p-3 rounded-xl border border-indigo-100/50">
                                  <Info className="w-4 h-4 text-indigo-500 mt-0.5 shrink-0" />
                                  <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                                    <span className="font-bold text-indigo-600 mr-1">Not:</span> 
                                    Bu eğitim 2 dönem yapılmıştır. Eğitim durumu bilgileri yalnızca 1. döneme aittir.
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Gender Unstacked Contents */}
                        <div className={cn(selectedProgram === 'doping-2024' ? "lg:col-span-3 lg:order-3" : "contents")}>
                          {/* Gender Donut Chart */}
                          <div className={cn(
                            "bg-white/70 backdrop-blur-3xl border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] lg:rounded-[2.5rem] border p-6 sm:p-8 md:p-10 shadow-sm flex flex-col min-w-0 h-full relative overflow-hidden hover:shadow-xl hover:shadow-pink-100/40 transition-all"
                          )}>
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
                            <div className="flex-1 w-full flex flex-col items-center justify-center mt-4 mb-2">
                              {/* Donut Chart */}
                              <div className="h-[160px] w-[160px] sm:h-[180px] sm:w-[180px] relative shrink-0 mb-8">
                                <ResponsiveContainer width="100%" height="100%">
                                  <PieChart>
                                    <Pie
                                      data={[
                                        { name: 'Kadın', value: selectedYearData?.gender?.female || 64, color: '#ec4899' },
                                        { name: 'Erkek', value: selectedYearData?.gender?.male || 36, color: '#3b82f6' },
                                        ...(selectedYearData?.gender?.other ? [{ name: 'Diğer', value: selectedYearData.gender.other, color: '#94a3b8' }] : [])
                                      ]}
                                      cx="50%"
                                      cy="50%"
                                      innerRadius={55}
                                      outerRadius={75}
                                      paddingAngle={5}
                                      dataKey="value"
                                      stroke="none"
                                    >
                                      {
                                        [
                                          { name: 'Kadın', color: '#ec4899' },
                                          { name: 'Erkek', color: '#3b82f6' },
                                          { name: 'Diğer', color: '#94a3b8' }
                                        ].map((entry, index) => (
                                          <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))
                                      }
                                    </Pie>
                                    <Tooltip cursor={false} contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} itemStyle={{ fontSize: '12px', fontWeight: 'bold' }} />
                                  </PieChart>
                                </ResponsiveContainer>
                              </div>
                              
                              {/* Horizontal Legend Below Chart */}
                              <div className="flex items-center justify-center gap-8 sm:gap-12 w-full px-2">
                                <div className="flex flex-col items-center group" title={`${selectedYearData?.gender?.female || 0} Kişi`}>
                                  <div className="flex items-center gap-1.5 mb-1.5">
                                    <div className="w-3.5 h-3.5 rounded-full bg-pink-500 shadow-sm shadow-pink-200 group-hover:scale-125 transition-transform" />
                                    <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">Kadın</span>
                                  </div>
                                  <span className="text-3xl sm:text-4xl font-black text-slate-900 leading-none">%{Math.round((selectedYearData?.gender?.female || 0) / (selectedYearData?.participants || 1) * 100) || 64}</span>
                                </div>
                                <div className="flex flex-col items-center group" title={`${selectedYearData?.gender?.male || 0} Kişi`}>
                                  <div className="flex items-center gap-1.5 mb-1.5">
                                    <div className="w-3.5 h-3.5 rounded-full bg-blue-500 shadow-sm shadow-blue-200 group-hover:scale-125 transition-transform" />
                                    <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">Erkek</span>
                                  </div>
                                  <span className="text-3xl sm:text-4xl font-black text-slate-900 leading-none">%{Math.round((selectedYearData?.gender?.male || 0) / (selectedYearData?.participants || 1) * 100) || 36}</span>
                                </div>
                                {(selectedYearData?.gender?.other && Math.round((selectedYearData.gender.other / selectedYearData.participants) * 100) > 0) ? (
                                  <div className="flex flex-col items-center group" title={`${selectedYearData?.gender?.other || 0} Kişi`}>
                                    <div className="flex items-center gap-1.5 mb-1.5">
                                      <div className="w-3.5 h-3.5 rounded-full bg-slate-400 shadow-sm shadow-slate-200 group-hover:scale-125 transition-transform" />
                                      <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">Diğer</span>
                                    </div>
                                    <span className="text-2xl sm:text-3xl font-black text-slate-900 leading-none">%{Math.round((selectedYearData.gender.other / selectedYearData.participants) * 100)}</span>
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Map for doping-2024 inside Charts Row */}
                        {selectedProgram === 'doping-2024' && hasCityData && (
                          <div className="lg:col-span-6 lg:order-2 flex flex-col h-full bg-white/70 backdrop-blur-3xl border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] lg:rounded-[2.5rem] border relative overflow-hidden hover:shadow-xl hover:shadow-indigo-100/40 transition-all justify-start items-center group min-h-[400px]">
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
                            <div className="w-full max-w-[900px] aspect-[1.3/1] sm:aspect-[2/1] flex items-center justify-center relative mt-2 mb-4 z-10 px-4 transition-transform duration-700 group-hover:scale-[1.01]">
                              <TurkeyMap 
                                showTooltip={true}
                                colorData={mapData.colorData}
                                tooltipData={mapData.tooltipData}
                                legendData={mapData.legendData}
                              />
                            </div>
                            <div className="w-full px-6 sm:px-8 pb-6 z-20 relative mt-auto">
                              <div className="flex items-start gap-2 bg-indigo-50/50 p-3 rounded-xl border border-indigo-100/50">
                                <Info className="w-4 h-4 text-indigo-500 mt-0.5 shrink-0" />
                                <p className="text-[10px] md:text-[11px] text-slate-600 leading-relaxed font-medium">
                                  <span className="font-bold text-indigo-600 mr-1">Not:</span> 
                                  Bu eğitim 2 dönem yapılmıştır. Haritada görünen şehir bilgileri yalnızca 1. döneme aittir.
                                </p>
                              </div>
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
                        {selectedYear !== '2016-2020' && selectedYearData?.topSchools && selectedYearData.topSchools.length > 0 && (
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

                        {/* Academic Profile Ranking - Departments */}
                        {selectedYear !== '2016-2020' && selectedYearData?.topDepartments && selectedYearData.topDepartments.length > 0 && (
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

                      </div>

                      {/* HUGE TURKEY MAP CONTAINER */}
                      {selectedProgram !== 'doping-2024' && hasCityData && (
                        <div className="mt-8 mb-12 bg-white/70 backdrop-blur-3xl border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] lg:rounded-[3rem] border flex flex-col relative hover:shadow-2xl hover:shadow-indigo-100/50 transition-all justify-center items-center w-full group min-h-[400px] sm:min-h-[500px]">
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
                          
                          <div className="w-full max-w-[1100px] aspect-[1.3/1] sm:aspect-[2/1] flex items-center justify-center relative mt-4 md:mt-2 mb-8 z-10 px-4 transition-transform duration-700 group-hover:scale-[1.01]">
                            <TurkeyMap 
                              showTooltip={true}
                              colorData={mapData.colorData}
                              tooltipData={mapData.tooltipData}
                              legendData={mapData.legendData}
                            />
                          </div>
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
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-4 gap-3 sm:gap-4 pt-2">
                            {skills.map((skill, idx) => (
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
                    <div className="bg-white/70 backdrop-blur-3xl border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] lg:rounded-[3rem] border p-8 md:p-12 overflow-hidden">
                      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 border-b border-slate-100 pb-8">
                        <div>
                          <div className="flex items-center gap-3 mb-3">
                            <span className="h-2 w-2 rounded-full bg-blue-600" />
                            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Ekosistem Ağı</span>
                          </div>
                          <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight font-display mb-2">Stratejik Partnerler</h3>
                          <p className="text-sm md:text-base text-slate-500 font-medium max-w-xl leading-relaxed">
                            Gençlerin 21. yüzyıl yetkinlikleri ile donatılması vizyonumuzda bizimle yürüyen değerli kurumlar.
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 lg:gap-8">
                        {selectedYearData?.sponsors.filter(sponsor => sponsor !== 'Yetkin Gençler').map((sponsor, i) => (
                          <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
                            key={sponsor}
                            className="group relative flex items-center justify-center w-full sm:w-[240px] h-[120px] bg-white/50 backdrop-blur-md rounded-2xl border border-white/50 shadow-sm hover:bg-white hover:border-blue-100 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300"
                          >
                            <img 
                              src={sponsor === 'Mehmet Zorlu Vakfı' ? '/partners/mzv-logo.png' : sponsor === 'MEF Üniversitesi' ? '/partners/mefunii_transparent.png' : `/partners/${sponsor.toLowerCase().replace(/ /g, '-')}.png`} 
                              alt={sponsor} 
                              className="max-h-16 max-w-[80%] object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300 ease-out"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                e.currentTarget.nextElementSibling?.classList.remove('hidden');
                              }}
                            />
                            <span className="hidden text-sm font-bold text-slate-500 group-hover:text-slate-900 text-center tracking-wide px-4">{sponsor}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>



        {/* The CTA has been moved above */}
      </div>
      
      <Footer />
    </div>
  );
}
