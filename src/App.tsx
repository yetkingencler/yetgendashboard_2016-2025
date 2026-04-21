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
  Sparkles
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
import { getPlate } from './lib/cities';
import { IYearlyData, ICity, IProgramData, IDepartment } from './types';

// --- Data Preparation ---

const yearlyData: IYearlyData[] = [
  {
    year: '2016-2020',
    participants: 1162,
    graduates: 674,
    description: 'İlk 5 yılın özeti. Pilot uygulamadan dijital dönüşüme uzanan, YetGen\'in temelinin atıldığı ve hızla büyüdüğü kuruluş yılları.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200',
    hasAgeData: false,
    gender: { female: 576, male: 579, other: 6 },
    cities: [],
    educationLevels: [
      { name: 'Lisans', count: 568 },
      { name: 'Lise', count: 575 },
      { name: 'Diğer', count: 18 }
    ],
    topSchools: [
      { name: 'İstanbul Erkek Lisesi', val: 49 },
      { name: 'Vefa Lisesi', val: 16 },
      { name: 'Mef Okulları', val: 12 },
      { name: 'Vizyon Koleji', val: 10 },
      { name: 'Mavigün Koleji', val: 7 }
    ],
    topDepartments: [
      { name: 'Endüstri Mühendisliği', val: 68 },
      { name: 'İşletme', val: 31 },
      { name: 'Hukuk', val: 23 },
      { name: 'İktisat', val: 20 },
      { name: 'Psikoloji', val: 18 }
    ],
    sponsors: ['Mehmet Zorlu Vakfı', 'Yetkin Gençler']
  },
  {
    year: '2021',
    participants: 3661,
    graduates: 2565,
    description: 'Rekor katılım yılı! Dijital araçların kullanımıyla Türkiye genelinde 3 farklı programla binlerce gence ulaşıldı.',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1200',
    hasAgeData: false,
    gender: { female: 2474, male: 1169, other: 18 },
    cities: [
      { name: 'Diğer', count: 6 },
      { name: 'Adana', count: 55 },
      { name: 'Adıyaman', count: 6 },
      { name: 'Afyonkarahisar', count: 8 },
      { name: 'Ağrı', count: 2 },
      { name: 'Aksaray', count: 3 },
      { name: 'Amasya', count: 8 },
      { name: 'Ankara', count: 261 },
      { name: 'Antalya', count: 59 },
      { name: 'Ardahan', count: 1 },
      { name: 'Artvin', count: 2 },
      { name: 'Aydın', count: 33 },
      { name: 'Balıkesir', count: 28 },
      { name: 'Bartın', count: 3 },
      { name: 'Batman', count: 2 },
      { name: 'Bayburt', count: 2 },
      { name: 'Bilecik', count: 4 },
      { name: 'Bingöl', count: 2 },
      { name: 'Bitlis', count: 3 },
      { name: 'Bolu', count: 8 },
      { name: 'Burdur', count: 3 },
      { name: 'Bursa', count: 112 },
      { name: 'Çanakkale', count: 15 },
      { name: 'Çankırı', count: 4 },
      { name: 'Çorum', count: 8 },
      { name: 'Denizli', count: 20 },
      { name: 'Diyarbakır', count: 12 },
      { name: 'Düzce', count: 6 },
      { name: 'Edirne', count: 22 },
      { name: 'Elazığ', count: 6 },
      { name: 'Erzincan', count: 3 },
      { name: 'Erzurum', count: 5 },
      { name: 'Eskişehir', count: 59 },
      { name: 'Gaziantep', count: 30 },
      { name: 'Giresun', count: 6 },
      { name: 'Gümüşhane', count: 4 },
      { name: 'Hakkâri', count: 1 },
      { name: 'Hatay', count: 33 },
      { name: 'Iğdır', count: 1 },
      { name: 'Isparta', count: 9 },
      { name: 'İstanbul', count: 1542 },
      { name: 'İzmir', count: 204 },
      { name: 'Kahramanmaraş', count: 7 },
      { name: 'Karabük', count: 10 },
      { name: 'Karaman', count: 2 },
      { name: 'Kars', count: 2 },
      { name: 'Kastamonu', count: 9 },
      { name: 'Kayseri', count: 31 },
      { name: 'Kırıkkale', count: 5 },
      { name: 'Kırklareli', count: 12 },
      { name: 'Kırşehir', count: 3 },
      { name: 'Kilis', count: 2 },
      { name: 'Kocaeli', count: 83 },
      { name: 'Konya', count: 41 },
      { name: 'Kütahya', count: 8 },
      { name: 'Malatya', count: 12 },
      { name: 'Manisa', count: 41 },
      { name: 'Mardin', count: 4 },
      { name: 'Mersin', count: 33 },
      { name: 'Muğla', count: 18 },
      { name: 'Nevşehir', count: 3 },
      { name: 'Niğde', count: 14 },
      { name: 'Ordu', count: 7 },
      { name: 'Osmaniye', count: 15 },
      { name: 'Rize', count: 2 },
      { name: 'Sakarya', count: 32 },
      { name: 'Samsun', count: 25 },
      { name: 'Siirt', count: 2 },
      { name: 'Sinop', count: 3 },
      { name: 'Sivas', count: 9 },
      { name: 'Şanlıurfa', count: 9 },
      { name: 'Şırnak', count: 4 },
      { name: 'Tekirdağ', count: 59 },
      { name: 'Tokat', count: 6 },
      { name: 'Trabzon', count: 20 },
      { name: 'Tunceli', count: 1 },
      { name: 'Uşak', count: 6 },
      { name: 'Van', count: 6 },
      { name: 'Yalova', count: 9 },
      { name: 'Yozgat', count: 3 },
      { name: 'Zonguldak', count: 13 }
    ],
    educationLevels: [
      { name: 'Lisans', count: 2902 },
      { name: 'Lise', count: 490 },
      { name: 'Lise Mezunu', count: 100 },
      { name: 'Lisans Mezunu', count: 98 },
      { name: 'Lisansüstü', count: 38 },
      { name: 'Diğer', count: 33 }
    ],
    topDepartments: [
      { name: 'Endüstri Mühendisliği', val: 448 },
      { name: 'İşletme', val: 182 },
      { name: 'Hukuk', val: 160 },
      { name: 'Bilgisayar Mühendisliği', val: 158 },
      { name: 'Psikoloji', val: 65 }
    ],
    sponsors: ['Mehmet Zorlu Vakfı', 'Yetkin Gençler'],
    programs: [
      {
        id: 'basic-1',
        name: 'BASIC 2021-1',
        participants: 714,
        graduates: 531,
        gender: { female: 508, male: 205, other: 1 },
        hasAgeData: false,
        cities: [
          { name: 'Adana', count: 2 },
          { name: 'Ankara', count: 15 },
          { name: 'Antalya', count: 2 },
          { name: 'Aydın', count: 1 },
          { name: 'Bolu', count: 1 },
          { name: 'Bursa', count: 9 },
          { name: 'Çanakkale', count: 2 },
          { name: 'Çorum', count: 1 },
          { name: 'Edirne', count: 6 },
          { name: 'Eskişehir', count: 9 },
          { name: 'Gaziantep', count: 2 },
          { name: 'İstanbul', count: 128 },
          { name: 'İzmir', count: 16 },
          { name: 'Kayseri', count: 1 },
          { name: 'Kocaeli', count: 8 },
          { name: 'Konya', count: 1 },
          { name: 'Malatya', count: 1 },
          { name: 'Manisa', count: 1 },
          { name: 'Mersin', count: 1 },
          { name: 'Niğde', count: 1 },
          { name: 'Sakarya', count: 6 },
          { name: 'Samsun', count: 2 },
          { name: 'Şanlıurfa', count: 2 },
          { name: 'Sinop', count: 1 },
          { name: 'Tekirdağ', count: 6 },
          { name: 'Trabzon', count: 1 },
          { name: 'Uşak', count: 2 },
          { name: 'Yalova', count: 1 }
        ],
        educationLevels: [
          { name: 'Lisans', count: 560 },
          { name: 'Lise', count: 119 },
          { name: 'Lise Mezunu', count: 10 },
          { name: 'Lisans Mezunu', count: 10 },
          { name: 'Lisansüstü', count: 8 },
          { name: 'Diğer', count: 7 }
        ],
        topDepartments: [
          { name: 'Endüstri Mühendisliği', val: 87 },
          { name: 'İşletme', val: 32 },
          { name: 'Bilgisayar Mühendisliği', val: 30 },
          { name: 'Hukuk', val: 28 },
          { name: 'Elektrik-Elektronik Mühendisliği', val: 25 }
        ]
      },
      {
        id: 'basic-2',
        name: 'BASIC 2021-2',
        participants: 939,
        graduates: 689,
        gender: { female: 619, male: 310, other: 10 },
        hasAgeData: false,
        cities: [
          { name: 'Adana', count: 16 },
          { name: 'Adıyaman', count: 3 },
          { name: 'Afyonkarahisar', count: 2 },
          { name: 'Aksaray', count: 1 },
          { name: 'Amasya', count: 3 },
          { name: 'Ankara', count: 75 },
          { name: 'Antalya', count: 16 },
          { name: 'Aydın', count: 9 },
          { name: 'Balıkesir', count: 13 },
          { name: 'Bartın', count: 1 },
          { name: 'Batman', count: 1 },
          { name: 'Bayburt', count: 1 },
          { name: 'Bilecik', count: 3 },
          { name: 'Bingöl', count: 1 },
          { name: 'Bitlis', count: 2 },
          { name: 'Bolu', count: 2 },
          { name: 'Burdur', count: 1 },
          { name: 'Bursa', count: 40 },
          { name: 'Çanakkale', count: 6 },
          { name: 'Çankırı', count: 1 },
          { name: 'Çorum', count: 4 },
          { name: 'Denizli', count: 4 },
          { name: 'Diyarbakır', count: 3 },
          { name: 'Düzce', count: 1 },
          { name: 'Edirne', count: 6 },
          { name: 'Erzincan', count: 2 },
          { name: 'Erzurum', count: 3 },
          { name: 'Eskişehir', count: 26 },
          { name: 'Gaziantep', count: 10 },
          { name: 'Giresun', count: 2 },
          { name: 'Gümüşhane', count: 1 },
          { name: 'Hatay', count: 10 },
          { name: 'Iğdır', count: 1 },
          { name: 'Isparta', count: 3 },
          { name: 'İstanbul', count: 408 },
          { name: 'İzmir', count: 57 },
          { name: 'Kahramanmaraş', count: 4 },
          { name: 'Karabük', count: 3 },
          { name: 'Karaman', count: 2 },
          { name: 'Kars', count: 1 },
          { name: 'Kastamonu', count: 2 },
          { name: 'Kayseri', count: 7 },
          { name: 'Kilis', count: 1 },
          { name: 'Kırıkkale', count: 4 },
          { name: 'Kırklareli', count: 6 },
          { name: 'Kırşehir', count: 1 },
          { name: 'Kocaeli', count: 22 },
          { name: 'Konya', count: 10 },
          { name: 'Kütahya', count: 3 },
          { name: 'Malatya', count: 2 },
          { name: 'Manisa', count: 19 },
          { name: 'Mardin', count: 2 },
          { name: 'Mersin', count: 13 },
          { name: 'Muğla', count: 7 },
          { name: 'Nevşehir', count: 2 },
          { name: 'Niğde', count: 3 },
          { name: 'Ordu', count: 2 },
          { name: 'Osmaniye', count: 10 },
          { name: 'Rize', count: 1 },
          { name: 'Sakarya', count: 12 },
          { name: 'Samsun', count: 9 },
          { name: 'Şanlıurfa', count: 2 },
          { name: 'Siirt', count: 1 },
          { name: 'Sinop', count: 1 },
          { name: 'Sivas', count: 4 },
          { name: 'Şırnak', count: 2 },
          { name: 'Tekirdağ', count: 20 },
          { name: 'Tokat', count: 2 },
          { name: 'Trabzon', count: 7 },
          { name: 'Tunceli', count: 1 },
          { name: 'Uşak', count: 2 },
          { name: 'Van', count: 2 },
          { name: 'Yalova', count: 1 },
          { name: 'Yozgat', count: 1 },
          { name: 'Zonguldak', count: 5 }
        ],
        educationLevels: [
          { name: 'Lisans', count: 729 },
          { name: 'Lise', count: 158 },
          { name: 'Lise Mezunu', count: 18 },
          { name: 'Lisans Mezunu', count: 13 },
          { name: 'Lisansüstü', count: 13 },
          { name: 'Diğer', count: 8 }
        ],
        topDepartments: [
          { name: 'Endüstri Mühendisliği', val: 128 },
          { name: 'İşletme', val: 47 },
          { name: 'Elektrik-Elektronik Mühendisliği', val: 37 },
          { name: 'Hukuk', val: 36 },
          { name: 'Makine Mühendisliği', val: 35 }
        ]
      },
      {
        id: 'basic-3',
        name: 'BASIC 2021-3',
        participants: 2008,
        graduates: 1345,
        gender: { female: 1347, male: 654, other: 7 },
        hasAgeData: false,
        cities: [
          { name: 'Diğer', count: 6 },
          { name: 'Adana', count: 37 },
          { name: 'Adıyaman', count: 3 },
          { name: 'Afyonkarahisar', count: 6 },
          { name: 'Ağrı', count: 2 },
          { name: 'Aksaray', count: 2 },
          { name: 'Amasya', count: 5 },
          { name: 'Ankara', count: 171 },
          { name: 'Antalya', count: 41 },
          { name: 'Ardahan', count: 1 },
          { name: 'Artvin', count: 2 },
          { name: 'Aydın', count: 23 },
          { name: 'Balıkesir', count: 15 },
          { name: 'Bartın', count: 2 },
          { name: 'Batman', count: 1 },
          { name: 'Bayburt', count: 1 },
          { name: 'Bilecik', count: 1 },
          { name: 'Bingöl', count: 1 },
          { name: 'Bitlis', count: 1 },
          { name: 'Bolu', count: 5 },
          { name: 'Burdur', count: 2 },
          { name: 'Bursa', count: 63 },
          { name: 'Çanakkale', count: 7 },
          { name: 'Çankırı', count: 3 },
          { name: 'Çorum', count: 3 },
          { name: 'Denizli', count: 16 },
          { name: 'Diyarbakır', count: 9 },
          { name: 'Düzce', count: 5 },
          { name: 'Edirne', count: 10 },
          { name: 'Elazığ', count: 6 },
          { name: 'Erzincan', count: 1 },
          { name: 'Erzurum', count: 2 },
          { name: 'Eskişehir', count: 24 },
          { name: 'Gaziantep', count: 18 },
          { name: 'Giresun', count: 4 },
          { name: 'Gümüşhane', count: 3 },
          { name: 'Hakkâri', count: 1 },
          { name: 'Hatay', count: 23 },
          { name: 'Isparta', count: 6 },
          { name: 'İstanbul', count: 1006 },
          { name: 'İzmir', count: 131 },
          { name: 'Kahramanmaraş', count: 3 },
          { name: 'Karabük', count: 7 },
          { name: 'Kars', count: 1 },
          { name: 'Kastamonu', count: 7 },
          { name: 'Kayseri', count: 23 },
          { name: 'Kilis', count: 1 },
          { name: 'Kırıkkale', count: 1 },
          { name: 'Kırklareli', count: 6 },
          { name: 'Kırşehir', count: 2 },
          { name: 'Kocaeli', count: 53 },
          { name: 'Konya', count: 30 },
          { name: 'Kütahya', count: 5 },
          { name: 'Malatya', count: 9 },
          { name: 'Manisa', count: 21 },
          { name: 'Mardin', count: 2 },
          { name: 'Mersin', count: 19 },
          { name: 'Muğla', count: 11 },
          { name: 'Nevşehir', count: 1 },
          { name: 'Niğde', count: 10 },
          { name: 'Ordu', count: 5 },
          { name: 'Osmaniye', count: 5 },
          { name: 'Rize', count: 1 },
          { name: 'Sakarya', count: 14 },
          { name: 'Samsun', count: 14 },
          { name: 'Şanlıurfa', count: 5 },
          { name: 'Siirt', count: 1 },
          { name: 'Sinop', count: 1 },
          { name: 'Sivas', count: 5 },
          { name: 'Şırnak', count: 2 },
          { name: 'Tekirdağ', count: 33 },
          { name: 'Tokat', count: 4 },
          { name: 'Trabzon', count: 12 },
          { name: 'Uşak', count: 2 },
          { name: 'Van', count: 4 },
          { name: 'Yalova', count: 7 },
          { name: 'Yozgat', count: 2 },
          { name: 'Zonguldak', count: 8 }
        ],
        educationLevels: [
          { name: 'Lisans', count: 1613 },
          { name: 'Lise', count: 213 },
          { name: 'Lisans Mezunu', count: 75 },
          { name: 'Lise Mezunu', count: 72 },
          { name: 'Lisansüstü', count: 17 },
          { name: 'Diğer', count: 18 }
        ],
        topDepartments: [
          { name: 'Endüstri Mühendisliği', val: 233 },
          { name: 'Bilgisayar Mühendisliği', val: 128 },
          { name: 'İşletme', val: 103 },
          { name: 'Hukuk', val: 96 },
          { name: 'Psikoloji', val: 65 }
        ]
      }
    ]
  },
  {
    year: '2022',
    participants: 4394,
    graduates: 2812,
    description: 'Eğitim içeriği "Geleceğin Dünyası" vizyonuyla tamamen yenilendi. Proje odaklı üretim ön plana çıktı.',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1200',
    hasAgeData: true,
    ageData: [
      { age: '<18', count: 271 },
      { age: '18-20', count: 891 },
      { age: '21-23', count: 951 },
      { age: '24-26', count: 922 },
      { age: '27-29', count: 504 },
      { age: '30+', count: 780 }
    ],
    gender: { female: 2981, male: 1383, other: 23 },
    cities: [
      { name: 'Diğer', count: 10 },
      { name: 'Adana', count: 72 },
      { name: 'Adıyaman', count: 12 },
      { name: 'Afyonkarahisar', count: 12 },
      { name: 'Ağrı', count: 2 },
      { name: 'Aksaray', count: 6 },
      { name: 'Amasya', count: 18 },
      { name: 'Ankara', count: 387 },
      { name: 'Antalya', count: 78 },
      { name: 'Ardahan', count: 2 },
      { name: 'Artvin', count: 6 },
      { name: 'Aydın', count: 36 },
      { name: 'Balıkesir', count: 61 },
      { name: 'Bartın', count: 7 },
      { name: 'Batman', count: 4 },
      { name: 'Bayburt', count: 2 },
      { name: 'Bilecik', count: 3 },
      { name: 'Bingöl', count: 2 },
      { name: 'Bitlis', count: 8 },
      { name: 'Bolu', count: 14 },
      { name: 'Burdur', count: 8 },
      { name: 'Bursa', count: 131 },
      { name: 'Çanakkale', count: 16 },
      { name: 'Çankırı', count: 2 },
      { name: 'Çorum', count: 8 },
      { name: 'Denizli', count: 63 },
      { name: 'Diyarbakır', count: 36 },
      { name: 'Düzce', count: 11 },
      { name: 'Edirne', count: 19 },
      { name: 'Elazığ', count: 14 },
      { name: 'Erzincan', count: 2 },
      { name: 'Erzurum', count: 14 },
      { name: 'Eskişehir', count: 87 },
      { name: 'Gaziantep', count: 54 },
      { name: 'Giresun', count: 10 },
      { name: 'Gümüşhane', count: 1 },
      { name: 'Hakkâri', count: 4 },
      { name: 'Hatay', count: 41 },
      { name: 'Iğdır', count: 4 },
      { name: 'Isparta', count: 24 },
      { name: 'İstanbul', count: 1768 },
      { name: 'İzmir', count: 325 },
      { name: 'Kahramanmaraş', count: 18 },
      { name: 'Karabük', count: 9 },
      { name: 'Karaman', count: 8 },
      { name: 'Kars', count: 8 },
      { name: 'Kastamonu', count: 10 },
      { name: 'Kayseri', count: 58 },
      { name: 'Kırıkkale', count: 11 },
      { name: 'Kırklareli', count: 13 },
      { name: 'Kırşehir', count: 5 },
      { name: 'Kilis', count: 3 },
      { name: 'Kocaeli', count: 126 },
      { name: 'Konya', count: 54 },
      { name: 'Kütahya', count: 18 },
      { name: 'Malatya', count: 24 },
      { name: 'Manisa', count: 51 },
      { name: 'Mardin', count: 12 },
      { name: 'Mersin', count: 54 },
      { name: 'Muğla', count: 46 },
      { name: 'Muş', count: 7 },
      { name: 'Nevşehir', count: 8 },
      { name: 'Niğde', count: 9 },
      { name: 'Ordu', count: 11 },
      { name: 'Osmaniye', count: 14 },
      { name: 'Rize', count: 9 },
      { name: 'Sakarya', count: 45 },
      { name: 'Samsun', count: 46 },
      { name: 'Siirt', count: 4 },
      { name: 'Sinop', count: 4 },
      { name: 'Sivas', count: 15 },
      { name: 'Şanlıurfa', count: 15 },
      { name: 'Şırnak', count: 8 },
      { name: 'Tekirdağ', count: 60 },
      { name: 'Tokat', count: 14 },
      { name: 'Trabzon', count: 26 },
      { name: 'Tunceli', count: 1 },
      { name: 'Uşak', count: 6 },
      { name: 'Van', count: 13 },
      { name: 'Yalova', count: 10 },
      { name: 'Yozgat', count: 4 },
      { name: 'Zonguldak', count: 14 }
    ],
    educationLevels: [
      { name: 'Lisans', count: 2487 },
      { name: 'Lise', count: 401 },
      { name: 'Lise Mezunu', count: 232 },
      { name: 'Lisans Mezunu', count: 136 },
      { name: 'Ön Lisans', count: 53 },
      { name: 'Lisansüstü', count: 41 },
      { name: 'Diğer', count: 29 }
    ],
    topDepartments: [
      { name: 'Endüstri Mühendisliği', val: 194 },
      { name: 'Rehberlik ve Psikolojik Danışmanlık', val: 143 },
      { name: 'Bilgisayar Mühendisliği', val: 122 },
      { name: 'Hukuk', val: 114 },
      { name: 'Sınıf Öğretmenliği', val: 100 }
    ],
    sponsors: ['Mehmet Zorlu Vakfı', 'Yetkin Gençler'],
    programs: [
      {
        id: 'b-22-1',
        name: 'BASIC 2022-1',
        participants: 1374,
        graduates: 1036,
        gender: { female: 906, male: 462, other: 6 },
        hasAgeData: true,
        ageData: [
          { age: '18-20', count: 29 },
          { age: '21-23', count: 130 },
          { age: '24-26', count: 675 },
          { age: '27-29', count: 357 },
          { age: '30+', count: 65 }
        ],
        cities: [
          { name: 'Diğer', count: 10 },
          { name: 'Adana', count: 23 },
          { name: 'Adıyaman', count: 4 },
          { name: 'Afyonkarahisar', count: 6 },
          { name: 'Ağrı', count: 1 },
          { name: 'Aksaray', count: 2 },
          { name: 'Amasya', count: 11 },
          { name: 'Ankara', count: 91 },
          { name: 'Antalya', count: 25 },
          { name: 'Artvin', count: 3 },
          { name: 'Aydın', count: 11 },
          { name: 'Balıkesir', count: 23 },
          { name: 'Bartın', count: 1 },
          { name: 'Batman', count: 2 },
          { name: 'Bilecik', count: 2 },
          { name: 'Bitlis', count: 3 },
          { name: 'Bolu', count: 5 },
          { name: 'Bursa', count: 27 },
          { name: 'Çanakkale', count: 3 },
          { name: 'Çankırı', count: 1 },
          { name: 'Denizli', count: 12 },
          { name: 'Diyarbakır', count: 8 },
          { name: 'Düzce', count: 4 },
          { name: 'Edirne', count: 3 },
          { name: 'Elazığ', count: 7 },
          { name: 'Erzurum', count: 6 },
          { name: 'Eskişehir', count: 14 },
          { name: 'Gaziantep', count: 16 },
          { name: 'Giresun', count: 5 },
          { name: 'Gümüşhane', count: 1 },
          { name: 'Hakkâri', count: 1 },
          { name: 'Hatay', count: 14 },
          { name: 'Iğdır', count: 2 },
          { name: 'Isparta', count: 7 },
          { name: 'İstanbul', count: 569 },
          { name: 'İzmir', count: 69 },
          { name: 'Kahramanmaraş', count: 6 },
          { name: 'Karabük', count: 2 },
          { name: 'Karaman', count: 5 },
          { name: 'Kars', count: 2 },
          { name: 'Kastamonu', count: 5 },
          { name: 'Kayseri', count: 12 },
          { name: 'Kilis', count: 2 },
          { name: 'Kırıkkale', count: 4 },
          { name: 'Kırklareli', count: 6 },
          { name: 'Kırşehir', count: 2 },
          { name: 'Kocaeli', count: 28 },
          { name: 'Konya', count: 17 },
          { name: 'Kütahya', count: 5 },
          { name: 'Malatya', count: 10 },
          { name: 'Manisa', count: 11 },
          { name: 'Mardin', count: 4 },
          { name: 'Mersin', count: 20 },
          { name: 'Muğla', count: 9 },
          { name: 'Muş', count: 1 },
          { name: 'Nevşehir', count: 3 },
          { name: 'Niğde', count: 6 },
          { name: 'Ordu', count: 6 },
          { name: 'Osmaniye', count: 4 },
          { name: 'Rize', count: 5 },
          { name: 'Sakarya', count: 14 },
          { name: 'Samsun', count: 16 },
          { name: 'Şanlıurfa', count: 5 },
          { name: 'Siirt', count: 3 },
          { name: 'Sinop', count: 1 },
          { name: 'Sivas', count: 7 },
          { name: 'Şırnak', count: 3 },
          { name: 'Tekirdağ', count: 13 },
          { name: 'Tokat', count: 7 },
          { name: 'Trabzon', count: 7 },
          { name: 'Uşak', count: 1 },
          { name: 'Van', count: 4 },
          { name: 'Yalova', count: 2 },
          { name: 'Yozgat', count: 3 },
          { name: 'Zonguldak', count: 5 }
        ],
        educationLevels: [
          { name: 'Lisans', count: 1061 },
          { name: 'Lise', count: 172 },
          { name: 'Lisans Mezunu', count: 48 },
          { name: 'Lise Mezunu', count: 38 },
          { name: 'Ön Lisans', count: 29 },
          { name: 'Lisansüstü', count: 14 },
          { name: 'Diğer', count: 16 }
        ],
        topSchools: [
          { name: 'Mef Üniversitesi', val: 179 },
          { name: 'Marmara Üniversitesi', val: 47 },
          { name: 'Boğaziçi Üniversitesi', val: 37 },
          { name: 'Hacettepe Üniversitesi', val: 25 },
          { name: 'İstanbul Medipol Üniv.', val: 19 }
        ]
      },
      {
        id: 'b-22-2',
        name: 'BASIC 2022-2',
        participants: 2004,
        graduates: 1305,
        gender: { female: 1325, male: 662, other: 14 },
        hasAgeData: true,
        ageData: [
          { age: '<18', count: 228 },
          { age: '18-20', count: 862 },
          { age: '21-23', count: 796 },
          { age: '24-26', count: 98 },
          { age: '27-29', count: 15 },
          { age: '30+', count: 5 }
        ],
        cities: [
          { name: 'Adana', count: 37 },
          { name: 'Adıyaman', count: 6 },
          { name: 'Afyonkarahisar', count: 5 },
          { name: 'Aksaray', count: 3 },
          { name: 'Amasya', count: 6 },
          { name: 'Ankara', count: 226 },
          { name: 'Antalya', count: 28 },
          { name: 'Artvin', count: 1 },
          { name: 'Aydın', count: 18 },
          { name: 'Balıkesir', count: 18 },
          { name: 'Bartın', count: 4 },
          { name: 'Bayburt', count: 2 },
          { name: 'Bilecik', count: 1 },
          { name: 'Bingöl', count: 1 },
          { name: 'Bitlis', count: 2 },
          { name: 'Bolu', count: 8 },
          { name: 'Burdur', count: 5 },
          { name: 'Bursa', count: 74 },
          { name: 'Çanakkale', count: 5 },
          { name: 'Çankırı', count: 1 },
          { name: 'Çorum', count: 7 },
          { name: 'Denizli', count: 26 },
          { name: 'Diyarbakır', count: 15 },
          { name: 'Düzce', count: 5 },
          { name: 'Edirne', count: 13 },
          { name: 'Elazığ', count: 5 },
          { name: 'Erzincan', count: 1 },
          { name: 'Erzurum', count: 5 },
          { name: 'Eskişehir', count: 48 },
          { name: 'Gaziantep', count: 22 },
          { name: 'Giresun', count: 2 },
          { name: 'Hakkâri', count: 1 },
          { name: 'Hatay', count: 17 },
          { name: 'Isparta', count: 13 },
          { name: 'İstanbul', count: 840 },
          { name: 'İzmir', count: 131 },
          { name: 'Kahramanmaraş', count: 9 },
          { name: 'Karabük', count: 4 },
          { name: 'Karaman', count: 1 },
          { name: 'Kars', count: 1 },
          { name: 'Kastamonu', count: 3 },
          { name: 'Kayseri', count: 36 },
          { name: 'Kilis', count: 1 },
          { name: 'Kırıkkale', count: 6 },
          { name: 'Kırklareli', count: 5 },
          { name: 'Kırşehir', count: 2 },
          { name: 'Kocaeli', count: 74 },
          { name: 'Konya', count: 25 },
          { name: 'Kütahya', count: 7 },
          { name: 'Malatya', count: 12 },
          { name: 'Manisa', count: 26 },
          { name: 'Mardin', count: 6 },
          { name: 'Mersin', count: 20 },
          { name: 'Muğla', count: 13 },
          { name: 'Muş', count: 1 },
          { name: 'Nevşehir', count: 3 },
          { name: 'Niğde', count: 1 },
          { name: 'Ordu', count: 4 },
          { name: 'Osmaniye', count: 9 },
          { name: 'Rize', count: 2 },
          { name: 'Sakarya', count: 16 },
          { name: 'Samsun', count: 18 },
          { name: 'Şanlıurfa', count: 7 },
          { name: 'Siirt', count: 1 },
          { name: 'Sinop', count: 1 },
          { name: 'Sivas', count: 6 },
          { name: 'Şırnak', count: 2 },
          { name: 'Tekirdağ', count: 23 },
          { name: 'Tokat', count: 3 },
          { name: 'Trabzon', count: 15 },
          { name: 'Tunceli', count: 1 },
          { name: 'Uşak', count: 4 },
          { name: 'Van', count: 5 },
          { name: 'Yalova', count: 7 },
          { name: 'Yozgat', count: 1 },
          { name: 'Zonguldak', count: 5 }
        ],
        educationLevels: [
          { name: 'Lisans', count: 1426 },
          { name: 'Lise', count: 229 },
          { name: 'Lise Mezunu', count: 194 },
          { name: 'Lisans Mezunu', count: 88 },
          { name: 'Lisansüstü', count: 27 },
          { name: 'Ön Lisans', count: 24 },
          { name: 'Diğer', count: 13 }
        ],
        topDepartments: [
          { name: 'Endüstri Mühendisliği', val: 194 },
          { name: 'Bilgisayar Mühendisliği', val: 122 },
          { name: 'Hukuk', val: 114 },
          { name: 'Psikoloji', val: 84 },
          { name: 'Elektrik Elektronik Müh.', val: 65 }
        ]
      },
      {
        id: 'o-22',
        name: 'Öğretmen Eğitimi 2022',
        participants: 1016,
        graduates: 471,
        gender: { female: 750, male: 259, other: 3 },
        hasAgeData: true,
        ageData: [
          { age: '<18', count: 0 },
          { age: '18-20', count: 0 },
          { age: '21-23', count: 25 },
          { age: '24-26', count: 149 },
          { age: '27-29', count: 132 },
          { age: '30+', count: 710 }
        ],
        cities: [
          { name: 'Adana', count: 12 },
          { name: 'Adıyaman', count: 2 },
          { name: 'Afyonkarahisar', count: 1 },
          { name: 'Ağrı', count: 1 },
          { name: 'Aksaray', count: 1 },
          { name: 'Amasya', count: 1 },
          { name: 'Ankara', count: 70 },
          { name: 'Antalya', count: 25 },
          { name: 'Ardahan', count: 2 },
          { name: 'Artvin', count: 2 },
          { name: 'Aydın', count: 7 },
          { name: 'Balıkesir', count: 20 },
          { name: 'Bartın', count: 2 },
          { name: 'Batman', count: 2 },
          { name: 'Bingöl', count: 1 },
          { name: 'Bitlis', count: 3 },
          { name: 'Bolu', count: 1 },
          { name: 'Burdur', count: 3 },
          { name: 'Bursa', count: 30 },
          { name: 'Çanakkale', count: 8 },
          { name: 'Çorum', count: 1 },
          { name: 'Denizli', count: 25 },
          { name: 'Diyarbakır', count: 13 },
          { name: 'Düzce', count: 2 },
          { name: 'Edirne', count: 3 },
          { name: 'Elazığ', count: 2 },
          { name: 'Erzincan', count: 1 },
          { name: 'Erzurum', count: 3 },
          { name: 'Eskişehir', count: 25 },
          { name: 'Gaziantep', count: 16 },
          { name: 'Giresun', count: 3 },
          { name: 'Hakkâri', count: 2 },
          { name: 'Hatay', count: 10 },
          { name: 'Iğdır', count: 2 },
          { name: 'Isparta', count: 4 },
          { name: 'İstanbul', count: 359 },
          { name: 'İzmir', count: 125 },
          { name: 'Kahramanmaraş', count: 3 },
          { name: 'Karabük', count: 3 },
          { name: 'Karaman', count: 2 },
          { name: 'Kars', count: 5 },
          { name: 'Kastamonu', count: 2 },
          { name: 'Kayseri', count: 10 },
          { name: 'Kırıkkale', count: 1 },
          { name: 'Kırklareli', count: 2 },
          { name: 'Kırşehir', count: 1 },
          { name: 'Kocaeli', count: 24 },
          { name: 'Konya', count: 12 },
          { name: 'Kütahya', count: 6 },
          { name: 'Malatya', count: 2 },
          { name: 'Manisa', count: 14 },
          { name: 'Mardin', count: 2 },
          { name: 'Mersin', count: 14 },
          { name: 'Muğla', count: 24 },
          { name: 'Muş', count: 5 },
          { name: 'Nevşehir', count: 2 },
          { name: 'Niğde', count: 2 },
          { name: 'Ordu', count: 1 },
          { name: 'Osmaniye', count: 1 },
          { name: 'Rize', count: 2 },
          { name: 'Sakarya', count: 15 },
          { name: 'Samsun', count: 12 },
          { name: 'Şanlıurfa', count: 3 },
          { name: 'Sinop', count: 2 },
          { name: 'Sivas', count: 2 },
          { name: 'Şırnak', count: 3 },
          { name: 'Tekirdağ', count: 24 },
          { name: 'Tokat', count: 4 },
          { name: 'Trabzon', count: 4 },
          { name: 'Uşak', count: 1 },
          { name: 'Van', count: 4 },
          { name: 'Yalova', count: 1 },
          { name: 'Zonguldak', count: 4 }
        ],
        educationLevels: [],
        topDepartments: [
          { name: 'Rehberlik ve Psikolojik Danışmanlık', val: 143 },
          { name: 'Sınıf Öğretmenliği', val: 100 },
          { name: 'Fen Bilgisi Öğretmenliği', val: 63 },
          { name: 'İngilizce Öğretmenliği', val: 59 },
          { name: 'Matematik', val: 53 }
        ]
      }
    ]
  },
  {
    year: '2023',
    participants: 3222,
    graduates: 2126,
    description: 'Kalite ve derinlik yılı. Mentorluk sistemleri ve asenkron içerik kütüphanesi zenginleştirildi.',
    image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=1200',
    hasAgeData: true,
    ageData: [
      { age: '<18', count: 547 },
      { age: '18-20', count: 1051 },
      { age: '21-23', count: 975 },
      { age: '24-26', count: 232 },
      { age: '27-29', count: 78 },
      { age: '30+', count: 260 }
    ],
    gender: { female: 1981, male: 1230, other: 7 },
    cities: [
      { name: 'Adana', count: 174 },
      { name: 'Adıyaman', count: 23 },
      { name: 'Afyonkarahisar', count: 10 },
      { name: 'Ağrı', count: 4 },
      { name: 'Aksaray', count: 3 },
      { name: 'Amasya', count: 7 },
      { name: 'Ankara', count: 292 },
      { name: 'Antalya', count: 41 },
      { name: 'Ardahan', count: 4 },
      { name: 'Artvin', count: 1 },
      { name: 'Aydın', count: 33 },
      { name: 'Balıkesir', count: 29 },
      { name: 'Bartın', count: 2 },
      { name: 'Batman', count: 7 },
      { name: 'Bayburt', count: 4 },
      { name: 'Bilecik', count: 7 },
      { name: 'Bingöl', count: 6 },
      { name: 'Bitlis', count: 7 },
      { name: 'Bolu', count: 11 },
      { name: 'Burdur', count: 3 },
      { name: 'Bursa', count: 101 },
      { name: 'Çanakkale', count: 11 },
      { name: 'Çankırı', count: 4 },
      { name: 'Çorum', count: 4 },
      { name: 'Denizli', count: 41 },
      { name: 'Diyarbakır', count: 64 },
      { name: 'Düzce', count: 5 },
      { name: 'Edirne', count: 9 },
      { name: 'Elazığ', count: 31 },
      { name: 'Erzincan', count: 9 },
      { name: 'Erzurum', count: 15 },
      { name: 'Eskişehir', count: 40 },
      { name: 'Gaziantep', count: 120 },
      { name: 'Giresun', count: 6 },
      { name: 'Gümüşhane', count: 4 },
      { name: 'Hakkâri', count: 2 },
      { name: 'Hatay', count: 73 },
      { name: 'Iğdır', count: 1 },
      { name: 'Isparta', count: 15 },
      { name: 'İstanbul', count: 1070 },
      { name: 'İzmir', count: 190 },
      { name: 'Kahramanmaraş', count: 51 },
      { name: 'Karabük', count: 3 },
      { name: 'Karaman', count: 7 },
      { name: 'Kars', count: 8 },
      { name: 'Kastamonu', count: 7 },
      { name: 'Kayseri', count: 35 },
      { name: 'Kırıkkale', count: 4 },
      { name: 'Kırklareli', count: 7 },
      { name: 'Kırşehir', count: 5 },
      { name: 'Kilis', count: 11 },
      { name: 'Kocaeli', count: 90 },
      { name: 'Konya', count: 32 },
      { name: 'Kütahya', count: 6 },
      { name: 'Malatya', count: 47 },
      { name: 'Manisa', count: 48 },
      { name: 'Mardin', count: 10 },
      { name: 'Mersin', count: 37 },
      { name: 'Muğla', count: 36 },
      { name: 'Muş', count: 5 },
      { name: 'Nevşehir', count: 7 },
      { name: 'Niğde', count: 7 },
      { name: 'Ordu', count: 9 },
      { name: 'Osmaniye', count: 19 },
      { name: 'Rize', count: 4 },
      { name: 'Sakarya', count: 29 },
      { name: 'Samsun', count: 29 },
      { name: 'Siirt', count: 5 },
      { name: 'Sinop', count: 4 },
      { name: 'Sivas', count: 9 },
      { name: 'Şanlıurfa', count: 29 },
      { name: 'Şırnak', count: 8 },
      { name: 'Tekirdağ', count: 33 },
      { name: 'Tokat', count: 6 },
      { name: 'Trabzon', count: 18 },
      { name: 'Tunceli', count: 1 },
      { name: 'Uşak', count: 12 },
      { name: 'Van', count: 8 },
      { name: 'Yalova', count: 11 },
      { name: 'Yozgat', count: 7 },
      { name: 'Zonguldak', count: 7 }
    ],
    educationLevels: [
      { name: 'Lisans', count: 1851 },
      { name: 'Lise', count: 504 },
      { name: 'Lise Mezunu', count: 142 },
      { name: 'Lisans Mezunu', count: 397 },
      { name: 'Ön Lisans', count: 65 },
      { name: 'Lisansüstü', count: 241 },
      { name: 'Diğer', count: 16 }
    ],
    topDepartments: [
      { name: 'Endüstri Mühendisliği', val: 216 },
      { name: 'Bilgisayar Mühendisliği', val: 199 },
      { name: 'Hukuk', val: 147 },
      { name: 'Psikoloji', val: 106 },
      { name: 'İşletme', val: 42 }
    ],
    sponsors: ['Mehmet Zorlu Vakfı', 'Yetkin Gençler'],
    programs: [
      {
        id: 'b-23-1',
        name: 'BASIC 2023-1',
        participants: 1294,
        graduates: 951,
        gender: { female: 966, male: 323, other: 3 },
        hasAgeData: true,
        ageData: [
          { age: '<18', count: 171 },
          { age: '18-20', count: 383 },
          { age: '21-23', count: 548 },
          { age: '24-26', count: 92 },
          { age: '27-29', count: 15 },
          { age: '30+', count: 6 }
        ],
        cities: [
          { name: 'Adana', count: 87 },
          { name: 'Adıyaman', count: 9 },
          { name: 'Afyonkarahisar', count: 5 },
          { name: 'Ağrı', count: 2 },
          { name: 'Aksaray', count: 1 },
          { name: 'Amasya', count: 3 },
          { name: 'Ankara', count: 100 },
          { name: 'Antalya', count: 10 },
          { name: 'Ardahan', count: 2 },
          { name: 'Aydın', count: 9 },
          { name: 'Balıkesir', count: 6 },
          { name: 'Bartın', count: 1 },
          { name: 'Batman', count: 2 },
          { name: 'Bayburt', count: 2 },
          { name: 'Bilecik', count: 3 },
          { name: 'Bingöl', count: 2 },
          { name: 'Bitlis', count: 1 },
          { name: 'Bolu', count: 4 },
          { name: 'Burdur', count: 1 },
          { name: 'Bursa', count: 40 },
          { name: 'Çanakkale', count: 5 },
          { name: 'Çankırı', count: 2 },
          { name: 'Çorum', count: 1 },
          { name: 'Denizli', count: 6 },
          { name: 'Diyarbakır', count: 30 },
          { name: 'Düzce', count: 2 },
          { name: 'Edirne', count: 4 },
          { name: 'Elazığ', count: 11 },
          { name: 'Erzincan', count: 3 },
          { name: 'Erzurum', count: 2 },
          { name: 'Eskişehir', count: 17 },
          { name: 'Gaziantep', count: 54 },
          { name: 'Giresun', count: 3 },
          { name: 'Gümüşhane', count: 2 },
          { name: 'Hatay', count: 34 },
          { name: 'Isparta', count: 4 },
          { name: 'İstanbul', count: 460 },
          { name: 'İzmir', count: 67 },
          { name: 'Kahramanmaraş', count: 18 },
          { name: 'Karabük', count: 2 },
          { name: 'Karaman', count: 1 },
          { name: 'Kars', count: 2 },
          { name: 'Kastamonu', count: 3 },
          { name: 'Kayseri', count: 14 },
          { name: 'Kilis', count: 6 },
          { name: 'Kırıkkale', count: 2 },
          { name: 'Kırklareli', count: 3 },
          { name: 'Kırşehir', count: 2 },
          { name: 'Kocaeli', count: 34 },
          { name: 'Konya', count: 14 },
          { name: 'Kütahya', count: 2 },
          { name: 'Malatya', count: 26 },
          { name: 'Manisa', count: 18 },
          { name: 'Mardin', count: 3 },
          { name: 'Mersin', count: 15 },
          { name: 'Muğla', count: 10 },
          { name: 'Muş', count: 3 },
          { name: 'Nevşehir', count: 2 },
          { name: 'Niğde', count: 2 },
          { name: 'Ordu', count: 2 },
          { name: 'Osmaniye', count: 10 },
          { name: 'Rize', count: 2 },
          { name: 'Sakarya', count: 10 },
          { name: 'Samsun', count: 8 },
          { name: 'Şanlıurfa', count: 18 },
          { name: 'Siirt', count: 3 },
          { name: 'Sinop', count: 2 },
          { name: 'Sivas', count: 2 },
          { name: 'Şırnak', count: 1 },
          { name: 'Tekirdağ', count: 6 },
          { name: 'Tokat', count: 3 },
          { name: 'Trabzon', count: 14 },
          { name: 'Tunceli', count: 1 },
          { name: 'Uşak', count: 3 },
          { name: 'Van', count: 2 },
          { name: 'Yalova', count: 7 },
          { name: 'Yozgat', count: 4 },
          { name: 'Zonguldak', count: 3 }
        ],
        educationLevels: [
          { name: 'Lisans', count: 975 },
          { name: 'Lise', count: 195 },
          { name: 'Lisans Mezunu', count: 39 },
          { name: 'Ön Lisans', count: 32 },
          { name: 'Lise Mezunu', count: 21 },
          { name: 'Lisansüstü', count: 19 },
          { name: 'Diğer', count: 9 }
        ],
        topDepartments: [
          { name: 'Endüstri Mühendisliği', val: 119 },
          { name: 'Bilgisayar Mühendisliği', val: 100 },
          { name: 'Hukuk', val: 87 },
          { name: 'Psikoloji', val: 55 },
          { name: 'Elektrik Elektronik Müh.', val: 42 }
        ]
      },
      {
        id: 'b-23-2',
        name: 'BASIC 2023-2',
        participants: 1404,
        graduates: 857,
        gender: { female: 915, male: 484, other: 3 },
        hasAgeData: true,
        ageData: [
          { age: '<18', count: 376 },
          { age: '18-20', count: 651 },
          { age: '21-23', count: 321 },
          { age: '24-26', count: 43 },
          { age: '27-29', count: 10 },
          { age: '30+', count: 3 }
        ],
        cities: [
          { name: 'Adana', count: 66 },
          { name: 'Adıyaman', count: 9 },
          { name: 'Afyonkarahisar', count: 3 },
          { name: 'Ağrı', count: 2 },
          { name: 'Aksaray', count: 1 },
          { name: 'Amasya', count: 2 },
          { name: 'Ankara', count: 153 },
          { name: 'Antalya', count: 15 },
          { name: 'Ardahan', count: 2 },
          { name: 'Artvin', count: 1 },
          { name: 'Aydın', count: 18 },
          { name: 'Balıkesir', count: 11 },
          { name: 'Bartın', count: 1 },
          { name: 'Batman', count: 5 },
          { name: 'Bayburt', count: 2 },
          { name: 'Bilecik', count: 3 },
          { name: 'Bingöl', count: 3 },
          { name: 'Bitlis', count: 2 },
          { name: 'Bolu', count: 6 },
          { name: 'Burdur', count: 1 },
          { name: 'Bursa', count: 46 },
          { name: 'Çanakkale', count: 5 },
          { name: 'Çankırı', count: 1 },
          { name: 'Çorum', count: 3 },
          { name: 'Denizli', count: 16 },
          { name: 'Diyarbakır', count: 24 },
          { name: 'Düzce', count: 2 },
          { name: 'Edirne', count: 2 },
          { name: 'Elazığ', count: 18 },
          { name: 'Erzincan', count: 6 },
          { name: 'Erzurum', count: 6 },
          { name: 'Eskişehir', count: 16 },
          { name: 'Gaziantep', count: 53 },
          { name: 'Giresun', count: 2 },
          { name: 'Gümüşhane', count: 2 },
          { name: 'Hatay', count: 28 },
          { name: 'Isparta', count: 2 },
          { name: 'İstanbul', count: 462 },
          { name: 'İzmir', count: 96 },
          { name: 'Kahramanmaraş', count: 24 },
          { name: 'Karabük', count: 1 },
          { name: 'Karaman', count: 3 },
          { name: 'Kars', count: 5 },
          { name: 'Kastamonu', count: 2 },
          { name: 'Kayseri', count: 15 },
          { name: 'Kilis', count: 3 },
          { name: 'Kırıkkale', count: 1 },
          { name: 'Kırklareli', count: 4 },
          { name: 'Kırşehir', count: 3 },
          { name: 'Kocaeli', count: 36 },
          { name: 'Konya', count: 11 },
          { name: 'Kütahya', count: 4 },
          { name: 'Malatya', count: 19 },
          { name: 'Manisa', count: 24 },
          { name: 'Mardin', count: 5 },
          { name: 'Mersin', count: 18 },
          { name: 'Muğla', count: 12 },
          { name: 'Muş', count: 1 },
          { name: 'Nevşehir', count: 3 },
          { name: 'Niğde', count: 3 },
          { name: 'Ordu', count: 3 },
          { name: 'Osmaniye', count: 8 },
          { name: 'Rize', count: 1 },
          { name: 'Sakarya', count: 14 },
          { name: 'Samsun', count: 13 },
          { name: 'Şanlıurfa', count: 7 },
          { name: 'Siirt', count: 1 },
          { name: 'Sinop', count: 2 },
          { name: 'Sivas', count: 6 },
          { name: 'Şırnak', count: 3 },
          { name: 'Tekirdağ', count: 19 },
          { name: 'Tokat', count: 1 },
          { name: 'Trabzon', count: 3 },
          { name: 'Uşak', count: 9 },
          { name: 'Van', count: 4 },
          { name: 'Yalova', count: 4 },
          { name: 'Yozgat', count: 3 },
          { name: 'Zonguldak', count: 4 }
        ],
        educationLevels: [
          { name: 'Lisans', count: 868 },
          { name: 'Lise', count: 309 },
          { name: 'Lise Mezunu', count: 121 },
          { name: 'Lisans Mezunu', count: 56 },
          { name: 'Ön Lisans', count: 32 },
          { name: 'Lisansüstü', count: 11 },
          { name: 'Diğer', count: 7 }
        ],
        topDepartments: [
          { name: 'Bilgisayar Mühendisliği', val: 99 },
          { name: 'Endüstri Mühendisliği', val: 97 },
          { name: 'Hukuk', val: 60 },
          { name: 'Psikoloji', val: 51 },
          { name: 'İşletme', val: 42 }
        ]
      },
      {
        id: 'o-23',
        name: 'Öğretmen Eğitimi 2023',
        participants: 524,
        graduates: 318,
        gender: { female: 100, male: 423, other: 1 },
        hasAgeData: true,
        ageData: [
          { age: '<18', count: 0 },
          { age: '18-20', count: 17 },
          { age: '21-23', count: 106 },
          { age: '24-26', count: 97 },
          { age: '27-29', count: 53 },
          { age: '30+', count: 251 }
        ],
        cities: [
          { name: 'Adana', count: 21 },
          { name: 'Adıyaman', count: 5 },
          { name: 'Afyonkarahisar', count: 2 },
          { name: 'Aksaray', count: 1 },
          { name: 'Amasya', count: 2 },
          { name: 'Ankara', count: 39 },
          { name: 'Antalya', count: 16 },
          { name: 'Aydın', count: 6 },
          { name: 'Balıkesir', count: 12 },
          { name: 'Bilecik', count: 1 },
          { name: 'Bingöl', count: 1 },
          { name: 'Bitlis', count: 4 },
          { name: 'Bolu', count: 1 },
          { name: 'Burdur', count: 1 },
          { name: 'Bursa', count: 15 },
          { name: 'Çanakkale', count: 1 },
          { name: 'Çankırı', count: 1 },
          { name: 'Denizli', count: 19 },
          { name: 'Diyarbakır', count: 10 },
          { name: 'Düzce', count: 1 },
          { name: 'Edirne', count: 3 },
          { name: 'Elazığ', count: 2 },
          { name: 'Erzurum', count: 7 },
          { name: 'Eskişehir', count: 7 },
          { name: 'Gaziantep', count: 13 },
          { name: 'Giresun', count: 1 },
          { name: 'Hakkâri', count: 2 },
          { name: 'Hatay', count: 11 },
          { name: 'Iğdır', count: 1 },
          { name: 'Isparta', count: 9 },
          { name: 'İstanbul', count: 148 },
          { name: 'İzmir', count: 27 },
          { name: 'Kahramanmaraş', count: 9 },
          { name: 'Karaman', count: 3 },
          { name: 'Kars', count: 1 },
          { name: 'Kastamonu', count: 2 },
          { name: 'Kayseri', count: 6 },
          { name: 'Kilis', count: 2 },
          { name: 'Kırıkkale', count: 1 },
          { name: 'Kocaeli', count: 20 },
          { name: 'Konya', count: 7 },
          { name: 'Malatya', count: 2 },
          { name: 'Manisa', count: 6 },
          { name: 'Mardin', count: 2 },
          { name: 'Mersin', count: 4 },
          { name: 'Muğla', count: 14 },
          { name: 'Muş', count: 1 },
          { name: 'Nevşehir', count: 2 },
          { name: 'Niğde', count: 2 },
          { name: 'Ordu', count: 4 },
          { name: 'Osmaniye', count: 1 },
          { name: 'Rize', count: 1 },
          { name: 'Sakarya', count: 5 },
          { name: 'Samsun', count: 8 },
          { name: 'Şanlıurfa', count: 4 },
          { name: 'Siirt', count: 1 },
          { name: 'Sivas', count: 1 },
          { name: 'Şırnak', count: 4 },
          { name: 'Tekirdağ', count: 8 },
          { name: 'Tokat', count: 2 },
          { name: 'Trabzon', count: 1 },
          { name: 'Van', count: 2 }
        ],
        educationLevels: [
          { name: 'Lisans Mezunu', count: 302 },
          { name: 'Lisansüstü Mezunu', count: 110 },
          { name: 'Lisansüstü', count: 82 },
          { name: 'Doktora', count: 10 },
          { name: 'Lisans', count: 8 },
          { name: 'Doktora Mezunu', count: 6 },
          { name: 'Yüksek Lisans', count: 3 },
          { name: 'Ön Lisans', count: 1 }
        ],
        topDepartments: []
      }
    ]
  },
  {
    year: '2024',
    participants: 2174,
    graduates: 1233,
    description: 'Yapay zeka ve yeni nesil teknolojiler müfredatın merkezine yerleştirildi.',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1200',
    hasAgeData: false,
    gender: { female: 1639, male: 528, other: 5 },
    cities: [
      { name: 'Adana', count: 43 },
      { name: 'Adıyaman', count: 9 },
      { name: 'Afyonkarahisar', count: 6 },
      { name: 'Aksaray', count: 5 },
      { name: 'Amasya', count: 1 },
      { name: 'Ankara', count: 295 },
      { name: 'Antalya', count: 24 },
      { name: 'Ardahan', count: 1 },
      { name: 'Artvin', count: 1 },
      { name: 'Aydın', count: 11 },
      { name: 'Balıkesir', count: 21 },
      { name: 'Bartın', count: 2 },
      { name: 'Batman', count: 2 },
      { name: 'Bayburt', count: 1 },
      { name: 'Bilecik', count: 1 },
      { name: 'Bingöl', count: 3 },
      { name: 'Bitlis', count: 2 },
      { name: 'Bolu', count: 6 },
      { name: 'Burdur', count: 6 },
      { name: 'Bursa', count: 52 },
      { name: 'Çanakkale', count: 10 },
      { name: 'Çankırı', count: 1 },
      { name: 'Çorum', count: 3 },
      { name: 'Denizli', count: 19 },
      { name: 'Diyarbakır', count: 19 },
      { name: 'Düzce', count: 2 },
      { name: 'Edirne', count: 8 },
      { name: 'Elazığ', count: 18 },
      { name: 'Erzincan', count: 4 },
      { name: 'Erzurum', count: 4 },
      { name: 'Eskişehir', count: 40 },
      { name: 'Gaziantep', count: 32 },
      { name: 'Giresun', count: 4 },
      { name: 'Gümüşhane', count: 1 },
      { name: 'Hatay', count: 17 },
      { name: 'Iğdır', count: 2 },
      { name: 'Isparta', count: 7 },
      { name: 'İstanbul', count: 965 },
      { name: 'İzmir', count: 140 },
      { name: 'Kahramanmaraş', count: 9 },
      { name: 'Karabük', count: 8 },
      { name: 'Karaman', count: 3 },
      { name: 'Kars', count: 1 },
      { name: 'Kastamonu', count: 3 },
      { name: 'Kayseri', count: 32 },
      { name: 'Kırıkkale', count: 2 },
      { name: 'Kırklareli', count: 9 },
      { name: 'Kırşehir', count: 3 },
      { name: 'Kocaeli', count: 42 },
      { name: 'Konya', count: 22 },
      { name: 'Kütahya', count: 5 },
      { name: 'Malatya', count: 7 },
      { name: 'Manisa', count: 36 },
      { name: 'Mardin', count: 3 },
      { name: 'Mersin', count: 15 },
      { name: 'Muğla', count: 15 },
      { name: 'Muş', count: 1 },
      { name: 'Nevşehir', count: 1 },
      { name: 'Niğde', count: 5 },
      { name: 'Ordu', count: 7 },
      { name: 'Osmaniye', count: 7 },
      { name: 'Rize', count: 6 },
      { name: 'Sakarya', count: 25 },
      { name: 'Samsun', count: 18 },
      { name: 'Siirt', count: 2 },
      { name: 'Sinop', count: 1 },
      { name: 'Sivas', count: 8 },
      { name: 'Şanlıurfa', count: 8 },
      { name: 'Şırnak', count: 5 },
      { name: 'Tekirdağ', count: 21 },
      { name: 'Tokat', count: 8 },
      { name: 'Trabzon', count: 13 },
      { name: 'Tunceli', count: 2 },
      { name: 'Uşak', count: 6 },
      { name: 'Van', count: 4 },
      { name: 'Yalova', count: 8 },
      { name: 'Yozgat', count: 2 },
      { name: 'Zonguldak', count: 3 }
    ],
    educationLevels: [
      { name: 'Lisans', count: 1692 },
      { name: 'Lise', count: 180 },
      { name: 'Ön Lisans', count: 48 },
      { name: 'Lisans Mezunu', count: 130 },
      { name: 'Lise Mezunu', count: 33 },
      { name: 'Lisansüstü', count: 79 },
      { name: 'Diğer', count: 9 }
    ],
    topDepartments: [
      { name: 'Endüstri Mühendisliği', val: 195 },
      { name: 'Bilgisayar Mühendisliği', val: 179 },
      { name: 'İşletme', val: 75 },
      { name: 'Hukuk', val: 75 },
      { name: 'Psikoloji', val: 46 }
    ],
    sponsors: ['Mehmet Zorlu Vakfı', 'Yetkin Gençler'],
    programs: [
      {
        id: 'b-24-1',
        name: 'BASIC 2024-1',
        participants: 1031,
        graduates: 636,
        gender: { female: 786, male: 243, other: 2 },
        hasAgeData: false,
        ageData: [],
        cities: [
          { name: 'Adana', count: 12 },
          { name: 'Adıyaman', count: 1 },
          { name: 'Afyonkarahisar', count: 3 },
          { name: 'Aksaray', count: 2 },
          { name: 'Ankara', count: 161 },
          { name: 'Antalya', count: 12 },
          { name: 'Ardahan', count: 1 },
          { name: 'Aydın', count: 5 },
          { name: 'Balıkesir', count: 8 },
          { name: 'Batman', count: 1 },
          { name: 'Bilecik', count: 1 },
          { name: 'Bolu', count: 3 },
          { name: 'Burdur', count: 1 },
          { name: 'Bursa', count: 23 },
          { name: 'Çanakkale', count: 4 },
          { name: 'Denizli', count: 7 },
          { name: 'Diyarbakır', count: 7 },
          { name: 'Edirne', count: 5 },
          { name: 'Elazığ', count: 6 },
          { name: 'Erzincan', count: 1 },
          { name: 'Erzurum', count: 1 },
          { name: 'Eskişehir', count: 22 },
          { name: 'Gaziantep', count: 12 },
          { name: 'Giresun', count: 3 },
          { name: 'Hatay', count: 4 },
          { name: 'Isparta', count: 2 },
          { name: 'İstanbul', count: 513 },
          { name: 'İzmir', count: 69 },
          { name: 'Kahramanmaraş', count: 1 },
          { name: 'Karabük', count: 1 },
          { name: 'Karaman', count: 1 },
          { name: 'Kayseri', count: 16 },
          { name: 'Kırıkkale', count: 2 },
          { name: 'Kırklareli', count: 3 },
          { name: 'Kocaeli', count: 24 },
          { name: 'Konya', count: 10 },
          { name: 'Malatya', count: 1 },
          { name: 'Manisa', count: 11 },
          { name: 'Mersin', count: 3 },
          { name: 'Muğla', count: 8 },
          { name: 'Niğde', count: 2 },
          { name: 'Ordu', count: 3 },
          { name: 'Rize', count: 1 },
          { name: 'Sakarya', count: 9 },
          { name: 'Samsun', count: 6 },
          { name: 'Şanlıurfa', count: 2 },
          { name: 'Siirt', count: 1 },
          { name: 'Sivas', count: 4 },
          { name: 'Şırnak', count: 3 },
          { name: 'Tekirdağ', count: 10 },
          { name: 'Tokat', count: 3 },
          { name: 'Trabzon', count: 8 },
          { name: 'Uşak', count: 2 },
          { name: 'Van', count: 1 },
          { name: 'Yalova', count: 3 },
          { name: 'Zonguldak', count: 1 }
        ],
        educationLevels: [
          { name: 'Lisans', count: 870 },
          { name: 'Lise', count: 110 },
          { name: 'Ön Lisans', count: 20 },
          { name: 'Lisans Mezunu', count: 18 },
          { name: 'Lise Mezunu', count: 10 },
          { name: 'Lisansüstü', count: 2 },
          { name: 'Diğer', count: 1 }
        ],
        topDepartments: [
          { name: 'Endüstri Mühendisliği', val: 103 },
          { name: 'Bilgisayar Mühendisliği', val: 93 },
          { name: 'Psikoloji', val: 46 },
          { name: 'İşletme', val: 42 },
          { name: 'Hukuk', val: 40 }
        ]
      },
      {
        id: 'b-24-2',
        name: 'BASIC 2024-2',
        participants: 895,
        graduates: 440,
        gender: { female: 648, male: 243, other: 2 },
        hasAgeData: false,
        ageData: [],
        cities: [
          { name: 'Adana', count: 18 },
          { name: 'Adıyaman', count: 3 },
          { name: 'Afyonkarahisar', count: 1 },
          { name: 'Aksaray', count: 2 },
          { name: 'Amasya', count: 1 },
          { name: 'Ankara', count: 125 },
          { name: 'Antalya', count: 12 },
          { name: 'Artvin', count: 1 },
          { name: 'Aydın', count: 3 },
          { name: 'Balıkesir', count: 7 },
          { name: 'Bartın', count: 1 },
          { name: 'Batman', count: 1 },
          { name: 'Bayburt', count: 1 },
          { name: 'Bingöl', count: 2 },
          { name: 'Bitlis', count: 1 },
          { name: 'Bolu', count: 1 },
          { name: 'Burdur', count: 3 },
          { name: 'Bursa', count: 24 },
          { name: 'Çanakkale', count: 4 },
          { name: 'Çankırı', count: 1 },
          { name: 'Çorum', count: 1 },
          { name: 'Denizli', count: 7 },
          { name: 'Diyarbakır', count: 6 },
          { name: 'Düzce', count: 2 },
          { name: 'Edirne', count: 2 },
          { name: 'Elazığ', count: 7 },
          { name: 'Erzincan', count: 2 },
          { name: 'Erzurum', count: 2 },
          { name: 'Eskişehir', count: 14 },
          { name: 'Gaziantep', count: 10 },
          { name: 'Giresun', count: 1 },
          { name: 'Hatay', count: 6 },
          { name: 'Iğdır', count: 1 },
          { name: 'Isparta', count: 5 },
          { name: 'İstanbul', count: 406 },
          { name: 'İzmir', count: 58 },
          { name: 'Kahramanmaraş', count: 2 },
          { name: 'Karabük', count: 6 },
          { name: 'Karaman', count: 1 },
          { name: 'Kars', count: 1 },
          { name: 'Kastamonu', count: 1 },
          { name: 'Kayseri', count: 12 },
          { name: 'Kırklareli', count: 3 },
          { name: 'Kırşehir', count: 1 },
          { name: 'Kocaeli', count: 13 },
          { name: 'Konya', count: 9 },
          { name: 'Kütahya', count: 5 },
          { name: 'Malatya', count: 2 },
          { name: 'Manisa', count: 22 },
          { name: 'Mardin', count: 1 },
          { name: 'Mersin', count: 8 },
          { name: 'Muğla', count: 4 },
          { name: 'Niğde', count: 1 },
          { name: 'Osmaniye', count: 5 },
          { name: 'Rize', count: 3 },
          { name: 'Sakarya', count: 11 },
          { name: 'Samsun', count: 8 },
          { name: 'Şanlıurfa', count: 1 },
          { name: 'Siirt', count: 1 },
          { name: 'Sivas', count: 1 },
          { name: 'Şırnak', count: 1 },
          { name: 'Tekirdağ', count: 7 },
          { name: 'Tokat', count: 3 },
          { name: 'Trabzon', count: 3 },
          { name: 'Tunceli', count: 2 },
          { name: 'Uşak', count: 3 },
          { name: 'Van', count: 2 },
          { name: 'Yalova', count: 4 }
        ],
        educationLevels: [
          { name: 'Lisans', count: 730 },
          { name: 'Lise', count: 69 },
          { name: 'Lisans Mezunu', count: 28 },
          { name: 'Ön Lisans', count: 27 },
          { name: 'Lise Mezunu', count: 23 },
          { name: 'Lisansüstü', count: 8 },
          { name: 'Diğer', count: 8 }
        ],
        topDepartments: [
          { name: 'Endüstri Mühendisliği', val: 92 },
          { name: 'Bilgisayar Mühendisliği', val: 86 },
          { name: 'Hukuk', val: 35 },
          { name: 'Elektrik Elektronik Müh.', val: 35 },
          { name: 'İşletme', val: 33 }
        ]
      },
      {
        id: 'o-24',
        name: 'Öğretmen Eğitimi 2024',
        participants: 248,
        graduates: 157,
        gender: { female: 205, male: 42, other: 1 },
        hasAgeData: false,
        ageData: [],
        cities: [
          { name: 'Adana', count: 13 },
          { name: 'Adıyaman', count: 5 },
          { name: 'Afyonkarahisar', count: 2 },
          { name: 'Aksaray', count: 1 },
          { name: 'Ankara', count: 9 },
          { name: 'Aydın', count: 3 },
          { name: 'Balıkesir', count: 6 },
          { name: 'Bartın', count: 1 },
          { name: 'Bingöl', count: 1 },
          { name: 'Bitlis', count: 1 },
          { name: 'Bolu', count: 2 },
          { name: 'Burdur', count: 2 },
          { name: 'Bursa', count: 5 },
          { name: 'Çanakkale', count: 2 },
          { name: 'Çorum', count: 2 },
          { name: 'Denizli', count: 5 },
          { name: 'Diyarbakır', count: 6 },
          { name: 'Edirne', count: 1 },
          { name: 'Elazığ', count: 5 },
          { name: 'Erzincan', count: 1 },
          { name: 'Erzurum', count: 1 },
          { name: 'Eskişehir', count: 4 },
          { name: 'Gaziantep', count: 10 },
          { name: 'Gümüşhane', count: 1 },
          { name: 'Hatay', count: 7 },
          { name: 'Iğdır', count: 1 },
          { name: 'İstanbul', count: 46 },
          { name: 'İzmir', count: 13 },
          { name: 'Kahramanmaraş', count: 6 },
          { name: 'Karabük', count: 1 },
          { name: 'Karaman', count: 1 },
          { name: 'Kastamonu', count: 2 },
          { name: 'Kayseri', count: 4 },
          { name: 'Kırklareli', count: 3 },
          { name: 'Kırşehir', count: 2 },
          { name: 'Kocaeli', count: 5 },
          { name: 'Konya', count: 3 },
          { name: 'Malatya', count: 4 },
          { name: 'Manisa', count: 3 },
          { name: 'Mardin', count: 2 },
          { name: 'Mersin', count: 4 },
          { name: 'Muğla', count: 3 },
          { name: 'Muş', count: 1 },
          { name: 'Nevşehir', count: 1 },
          { name: 'Niğde', count: 2 },
          { name: 'Ordu', count: 4 },
          { name: 'Osmaniye', count: 2 },
          { name: 'Rize', count: 2 },
          { name: 'Sakarya', count: 5 },
          { name: 'Samsun', count: 4 },
          { name: 'Şanlıurfa', count: 5 },
          { name: 'Sinop', count: 1 },
          { name: 'Sivas', count: 3 },
          { name: 'Şırnak', count: 1 },
          { name: 'Tekirdağ', count: 4 },
          { name: 'Tokat', count: 2 },
          { name: 'Trabzon', count: 2 },
          { name: 'Uşak', count: 1 },
          { name: 'Van', count: 1 },
          { name: 'Yalova', count: 1 },
          { name: 'Yozgat', count: 2 },
          { name: 'Zonguldak', count: 2 }
        ],
        educationLevels: [
          { name: 'Lisans', count: 91 },
          { name: 'Lisans Mezunu', count: 84 },
          { name: 'Lisansüstü Öğrencisi', count: 31 },
          { name: 'Lisansüstü Mezunu', count: 29 },
          { name: 'Doktora Öğrencisi', count: 4 },
          { name: 'Yüksek Lisans', count: 2 },
          { name: 'Doktora Mezunu', count: 2 },
          { name: 'Lisans (3. ve 4. sınıf)', count: 1 },
          { name: 'Lisansüstü', count: 1 },
          { name: 'Lise', count: 1 },
          { name: 'Ön Lisans', count: 1 }
        ],
        topDepartments: [
          { name: 'İlköğretim Matematik Öğretmenliği', val: 42 },
          { name: 'İngilizce Öğretmenliği', val: 34 },
          { name: 'Sınıf Öğretmenliği', val: 29 },
          { name: 'Okul Öncesi Öğretmenliği', val: 22 },
          { name: 'Rehberlik ve Psikolojik Danışmanlık', val: 17 }
        ]
      }
    ]
  },
  {
    year: '2025',
    participants: 2505,
    graduates: 1042,
    description: 'Güncel dönem. Sürdürülebilir gelişim ve küresel yetkinlikler odağında eğitimler devam ediyor.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200',
    hasAgeData: true,
    ageData: [
      { age: '<18', count: 759 },
      { age: '18-20', count: 1193 },
      { age: '21-23', count: 320 },
      { age: '24-26', count: 95 },
      { age: '27-29', count: 36 },
      { age: '30+', count: 86 }
    ],
    gender: { female: 1955, male: 534, other: 6 },
    cities: [
      { name: 'Adana', count: 54 },
      { name: 'Adıyaman', count: 9 },
      { name: 'Afyonkarahisar', count: 9 },
      { name: 'Ağrı', count: 1 },
      { name: 'Aksaray', count: 5 },
      { name: 'Amasya', count: 3 },
      { name: 'Ankara', count: 321 },
      { name: 'Antalya', count: 35 },
      { name: 'Ardahan', count: 1 },
      { name: 'Artvin', count: 1 },
      { name: 'Aydın', count: 17 },
      { name: 'Balıkesir', count: 22 },
      { name: 'Batman', count: 8 },
      { name: 'Bilecik', count: 5 },
      { name: 'Bingöl', count: 1 },
      { name: 'Bitlis', count: 3 },
      { name: 'Bolu', count: 2 },
      { name: 'Burdur', count: 4 },
      { name: 'Bursa', count: 84 },
      { name: 'Çanakkale', count: 10 },
      { name: 'Çankırı', count: 2 },
      { name: 'Çorum', count: 3 },
      { name: 'Denizli', count: 22 },
      { name: 'Diyarbakır', count: 20 },
      { name: 'Düzce', count: 6 },
      { name: 'Edirne', count: 6 },
      { name: 'Elazığ', count: 7 },
      { name: 'Erzincan', count: 1 },
      { name: 'Erzurum', count: 13 },
      { name: 'Eskişehir', count: 63 },
      { name: 'Gaziantep', count: 42 },
      { name: 'Giresun', count: 8 },
      { name: 'Hatay', count: 29 },
      { name: 'Iğdır', count: 3 },
      { name: 'Isparta', count: 6 },
      { name: 'İstanbul', count: 957 },
      { name: 'İzmir', count: 190 },
      { name: 'Kahramanmaraş', count: 7 },
      { name: 'Karabük', count: 4 },
      { name: 'Karaman', count: 3 },
      { name: 'Kars', count: 4 },
      { name: 'Kastamonu', count: 8 },
      { name: 'Kayseri', count: 47 },
      { name: 'Kırıkkale', count: 6 },
      { name: 'Kırklareli', count: 11 },
      { name: 'Kırşehir', count: 1 },
      { name: 'Kilis', count: 6 },
      { name: 'Kocaeli', count: 65 },
      { name: 'Konya', count: 32 },
      { name: 'Kütahya', count: 12 },
      { name: 'Malatya', count: 15 },
      { name: 'Manisa', count: 50 },
      { name: 'Mardin', count: 5 },
      { name: 'Mersin', count: 34 },
      { name: 'Muğla', count: 21 },
      { name: 'Muş', count: 3 },
      { name: 'Nevşehir', count: 2 },
      { name: 'Niğde', count: 1 },
      { name: 'Ordu', count: 8 },
      { name: 'Osmaniye', count: 10 },
      { name: 'Rize', count: 6 },
      { name: 'Sakarya', count: 18 },
      { name: 'Samsun', count: 18 },
      { name: 'Siirt', count: 6 },
      { name: 'Sinop', count: 1 },
      { name: 'Sivas', count: 11 },
      { name: 'Şanlıurfa', count: 18 },
      { name: 'Tekirdağ', count: 21 },
      { name: 'Tokat', count: 4 },
      { name: 'Trabzon', count: 16 },
      { name: 'Tunceli', count: 2 },
      { name: 'Uşak', count: 5 },
      { name: 'Van', count: 7 },
      { name: 'Yalova', count: 5 },
      { name: 'Yozgat', count: 1 },
      { name: 'Zonguldak', count: 6 }
    ],
    educationLevels: [],
    topDepartments: [
      { name: 'Bilgisayar Mühendisliği', val: 98 },
      { name: 'Endüstri Mühendisliği', val: 94 },
      { name: 'Endüstri Müh. (İngilizce)', val: 93 },
      { name: 'İşletme', val: 60 },
      { name: 'Hukuk', val: 56 }
    ],
    sponsors: ['Mehmet Zorlu Vakfı', 'Yetkin Gençler'],
    programs: [
      {
        id: 'b-25',
        name: 'BASIC 2025',
        participants: 2041,
        graduates: 862,
        gender: { female: 1543, male: 491, other: 5 },
        hasAgeData: true,
        ageData: [
          { age: '<18', count: 714 },
          { age: '18-20', count: 1031 },
          { age: '21-23', count: 213 },
          { age: '24-26', count: 58 },
          { age: '27-29', count: 9 },
          { age: '30+', count: 14 }
        ],
        cities: [
          { name: 'Adana', count: 42 },
          { name: 'Adıyaman', count: 8 },
          { name: 'Afyonkarahisar', count: 3 },
          { name: 'Ağrı', count: 1 },
          { name: 'Aksaray', count: 3 },
          { name: 'Amasya', count: 2 },
          { name: 'Ankara', count: 260 },
          { name: 'Antalya', count: 25 },
          { name: 'Ardahan', count: 1 },
          { name: 'Artvin', count: 1 },
          { name: 'Aydın', count: 16 },
          { name: 'Balıkesir', count: 16 },
          { name: 'Batman', count: 3 },
          { name: 'Bilecik', count: 5 },
          { name: 'Bingöl', count: 1 },
          { name: 'Bitlis', count: 3 },
          { name: 'Bolu', count: 1 },
          { name: 'Burdur', count: 3 },
          { name: 'Bursa', count: 65 },
          { name: 'Çanakkale', count: 6 },
          { name: 'Çankırı', count: 1 },
          { name: 'Çorum', count: 2 },
          { name: 'Denizli', count: 14 },
          { name: 'Diyarbakır', count: 18 },
          { name: 'Düzce', count: 5 },
          { name: 'Edirne', count: 3 },
          { name: 'Elazığ', count: 6 },
          { name: 'Erzurum', count: 10 },
          { name: 'Eskişehir', count: 49 },
          { name: 'Gaziantep', count: 32 },
          { name: 'Giresun', count: 4 },
          { name: 'Hatay', count: 19 },
          { name: 'Iğdır', count: 3 },
          { name: 'Isparta', count: 4 },
          { name: 'İstanbul', count: 823 },
          { name: 'İzmir', count: 174 },
          { name: 'Kahramanmaraş', count: 6 },
          { name: 'Karabük', count: 4 },
          { name: 'Karaman', count: 3 },
          { name: 'Kars', count: 3 },
          { name: 'Kastamonu', count: 6 },
          { name: 'Kayseri', count: 35 },
          { name: 'Kilis', count: 4 },
          { name: 'Kırıkkale', count: 6 },
          { name: 'Kırklareli', count: 8 },
          { name: 'Kocaeli', count: 47 },
          { name: 'Konya', count: 26 },
          { name: 'Kütahya', count: 10 },
          { name: 'Malatya', count: 13 },
          { name: 'Manisa', count: 46 },
          { name: 'Mardin', count: 5 },
          { name: 'Mersin', count: 23 },
          { name: 'Muğla', count: 14 },
          { name: 'Muş', count: 3 },
          { name: 'Nevşehir', count: 1 },
          { name: 'Niğde', count: 1 },
          { name: 'Ordu', count: 5 },
          { name: 'Osmaniye', count: 9 },
          { name: 'Rize', count: 3 },
          { name: 'Sakarya', count: 16 },
          { name: 'Samsun', count: 14 },
          { name: 'Şanlıurfa', count: 17 },
          { name: 'Siirt', count: 4 },
          { name: 'Sivas', count: 7 },
          { name: 'Tekirdağ', count: 16 },
          { name: 'Tokat', count: 3 },
          { name: 'Trabzon', count: 11 },
          { name: 'Tunceli', count: 2 },
          { name: 'Uşak', count: 3 },
          { name: 'Van', count: 5 },
          { name: 'Yalova', count: 3 },
          { name: 'Zonguldak', count: 6 }
        ],
        educationLevels: [],
        topDepartments: [
          { name: 'Bilgisayar Mühendisliği', val: 98 },
          { name: 'Endüstri Mühendisliği', val: 94 },
          { name: 'Endüstri Müh. (İngilizce)', val: 93 },
          { name: 'İşletme', val: 60 },
          { name: 'Hukuk', val: 56 }
        ]
      },
      {
        id: 'o-25',
        name: 'Öğretmen Eğitimi 2025',
        participants: 464,
        graduates: 180,
        gender: { female: 412, male: 43, other: 1 },
        hasAgeData: true,
        ageData: [
          { age: '<18', count: 45 },
          { age: '18-20', count: 162 },
          { age: '21-23', count: 107 },
          { age: '24-26', count: 37 },
          { age: '27-29', count: 27 },
          { age: '30+', count: 72 }
        ],
        cities: [
          { name: 'Adana', count: 12 },
          { name: 'Adıyaman', count: 1 },
          { name: 'Afyonkarahisar', count: 6 },
          { name: 'Aksaray', count: 2 },
          { name: 'Amasya', count: 1 },
          { name: 'Ankara', count: 61 },
          { name: 'Antalya', count: 10 },
          { name: 'Aydın', count: 1 },
          { name: 'Balıkesir', count: 6 },
          { name: 'Batman', count: 5 },
          { name: 'Bolu', count: 1 },
          { name: 'Burdur', count: 1 },
          { name: 'Bursa', count: 19 },
          { name: 'Çanakkale', count: 4 },
          { name: 'Çankırı', count: 1 },
          { name: 'Çorum', count: 1 },
          { name: 'Denizli', count: 8 },
          { name: 'Diyarbakır', count: 2 },
          { name: 'Düzce', count: 1 },
          { name: 'Edirne', count: 3 },
          { name: 'Elazığ', count: 1 },
          { name: 'Erzincan', count: 1 },
          { name: 'Erzurum', count: 3 },
          { name: 'Eskişehir', count: 14 },
          { name: 'Gaziantep', count: 10 },
          { name: 'Giresun', count: 4 },
          { name: 'Hatay', count: 10 },
          { name: 'Isparta', count: 2 },
          { name: 'İstanbul', count: 134 },
          { name: 'İzmir', count: 16 },
          { name: 'Kahramanmaraş', count: 1 },
          { name: 'Kars', count: 1 },
          { name: 'Kastamonu', count: 2 },
          { name: 'Kayseri', count: 12 },
          { name: 'Kilis', count: 2 },
          { name: 'Kırklareli', count: 3 },
          { name: 'Kırşehir', count: 1 },
          { name: 'Kocaeli', count: 18 },
          { name: 'Konya', count: 6 },
          { name: 'Kütahya', count: 2 },
          { name: 'Malatya', count: 2 },
          { name: 'Manisa', count: 4 },
          { name: 'Mersin', count: 11 },
          { name: 'Muğla', count: 7 },
          { name: 'Nevşehir', count: 1 },
          { name: 'Ordu', count: 3 },
          { name: 'Osmaniye', count: 1 },
          { name: 'Rize', count: 3 },
          { name: 'Sakarya', count: 2 },
          { name: 'Samsun', count: 4 },
          { name: 'Şanlıurfa', count: 1 },
          { name: 'Siirt', count: 2 },
          { name: 'Sinop', count: 1 },
          { name: 'Sivas', count: 4 },
          { name: 'Tekirdağ', count: 5 },
          { name: 'Tokat', count: 1 },
          { name: 'Trabzon', count: 5 },
          { name: 'Uşak', count: 2 },
          { name: 'Van', count: 2 },
          { name: 'Yalova', count: 2 },
          { name: 'Yozgat', count: 1 }
        ],
        educationLevels: [],
        topDepartments: [
          { name: 'Sınıf Öğretmenliği', val: 47 },
          { name: 'İlköğretim Matematik Öğretmenliği', val: 37 },
          { name: 'İngilizce Öğretmenliği', val: 37 },
          { name: 'Okul Öncesi Öğretmenliği', val: 32 },
          { name: 'Rehberlik ve Psikolojik Danışmanlık', val: 27 }
        ]
      }
    ]
  },
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
      subtitle: '2021 Lansman Yılı',
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
    content.subtitle = `${selectedProgramData.programName} İnovasyon Eğitim Raporu`;
  }

  return content;
};

export default function App() {
  const [selectedYear, setSelectedYear] = React.useState('all');
  const [selectedProgram, setSelectedProgram] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = React.useState(false);

  // Reset program when year changes
  React.useEffect(() => {
    setSelectedProgram(null);
  }, [selectedYear]);

  const totalParticipants = useMemo(() => yearlyData.reduce((acc, curr) => acc + curr.participants, 0), []);
  const totalGraduates = useMemo(() => yearlyData.reduce((acc, curr) => acc + curr.graduates, 0), []);
  const avgCompletionRate = useMemo(() => ((totalGraduates / totalParticipants) * 100).toFixed(1), [totalGraduates, totalParticipants]);

  const allYearsData = useMemo(() => {
    const participants = yearlyData.reduce((acc, curr) => acc + curr.participants, 0);
    const graduates = yearlyData.reduce((acc, curr) => acc + curr.graduates, 0);

    const deptCount: Record<string, number> = {};
    let female = 0, male = 0, other = 0;
    const eduCount: Record<string, number> = {};
    const ageCount: Record<string, number> = {};
    const cityCount: Record<string, number> = {};
    let hasAgeData = false;

    yearlyData.forEach(d => {
      // Departments
      (d.topDepartments || []).forEach(dept => {
        if (typeof dept === 'string') {
          deptCount[dept] = (deptCount[dept] || 0) + 1; // legacy fallback
        } else if (dept && typeof dept === 'object' && dept.name) {
          deptCount[dept.name] = (deptCount[dept.name] || 0) + (dept.val || 1);
        }
      });

      // Cities
      const collectCities = (arr: ICity[]) => {
        (arr || []).forEach(city => {
          if (typeof city === 'object' && city.name && city.count) {
            cityCount[city.name] = (cityCount[city.name] || 0) + city.count;
          }
        });
      };
      if (d.programs && d.programs.length > 0) d.programs.forEach(p => collectCities(p.cities));
      else collectCities(d.cities);

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

      // Age (Check top level or programs)
      if (d.programs && d.programs.length > 0) {
        d.programs.forEach(p => {
          if (p.ageData) {
            hasAgeData = true;
            p.ageData.forEach(a => {
              ageCount[a.age] = (ageCount[a.age] || 0) + a.count;
            });
          }
        });
      } else if (d.ageData) {
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
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200',
      hasAgeData,
      ageData,
      gender: { female, male, other },
      cities: cities.length > 0 ? cities : [{ name: '81 İl + KKTC', count: null }],
      educationLevels,
      topDepartments,
      sponsors: Array.from(new Set(yearlyData.flatMap(d => d.sponsors || [])))
    };
  }, []);

  const selectedYearData = useMemo(() => {
    if (selectedYear === 'all') return allYearsData;
    const yearData = yearlyData.find(d => d.year === selectedYear);

    if (yearData && selectedProgram) {
      const program = yearData.programs?.find(p => p.id === selectedProgram);
      if (program) {
        return {
          ...yearData,
          ...program,
          description: `${program.name} programı kapsamında gerçekleştirilen eğitim ve gelişim süreci.`,
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

    const currentIndex = yearlyData.findIndex(d => d.year === selectedYear);
    const isProgram = selectedYearData && 'isProgram' in selectedYearData;

    if (currentIndex > 0 && selectedYearData && !isProgram) {
      const prevData = yearlyData[currentIndex - 1];
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
      const totalYearParticipants = yearlyData[currentIndex]?.participants || 1;
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
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 selection:bg-blue-100 relative">
      <BackgroundEffects trigger={selectedYear} />
      <FormModal 
        isOpen={isFormModalOpen} 
        onClose={() => setIsFormModalOpen(false)} 
        formUrl="https://docs.google.com/forms/d/e/1FAIpQLSd65oa6o4MP_H-mf9FlYK5NqHuYj8LBnzHOSN1yuhnra9H6YA/viewform?embedded=true" 
      />

      {/* Top Navigation Timeline */}
      <nav className="sticky top-4 sm:top-6 z-[100] flex justify-center px-2 sm:px-6 w-full max-w-full pointer-events-none">
        <div className="pointer-events-auto w-full max-w-[100vw] sm:max-w-fit flex justify-center">
          <div className="flex items-center gap-0.5 sm:gap-1 p-1 sm:p-1.5 bg-white/90 backdrop-blur-2xl rounded-full border border-slate-200/50 shadow-[0_15px_40px_rgba(0,0,0,0.08)] w-full max-w-full">
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

            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar w-full sm:max-w-none px-1 py-0.5">
              {[...yearlyData].reverse().map((d) => (
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
      </nav>

      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] h-[40%] w-[40%] rounded-full bg-blue-500/5 blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] h-[40%] w-[40%] rounded-full bg-purple-500/5 blur-[120px]" />
        <div className="absolute -bottom-[10%] left-[20%] h-[40%] w-[40%] rounded-full bg-emerald-500/5 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-16">
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
            {selectedYear !== 'all' && yearlyData.find(d => d.year === selectedYear)?.programs && (
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
                  {yearlyData.find(d => d.year === selectedYear)?.programs?.map(p => (
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
            <header className="mb-10 sm:mb-16 flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-8">
              <div className="flex-1 min-w-0">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-slate-900 leading-[1.1] font-display break-words"
                >
                  {heroContent.title1} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 selection:text-blue-700">{heroContent.title2}</span>
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

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-4 sm:gap-5 bg-white border border-slate-200 shadow-sm rounded-3xl p-4 lg:p-5 w-full lg:w-auto shrink-0"
              >
                <div className="text-left lg:text-right flex-1 lg:flex-none">
                  <p className="text-[10px] lg:text-xs text-slate-400 uppercase font-bold tracking-widest">Program Durumu</p>
                  <p className="text-sm lg:text-base font-bold text-emerald-600 flex items-center gap-2 lg:justify-end">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                    {heroContent.statusText}
                  </p>
                </div>
              </motion.div>
            </header>

            {/* KPI Grid */}
            <div className="grid grid-cols-1 gap-4 sm:gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-4 mb-10 md:mb-16">
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
              <StatCard
                title={growthMetrics.title}
                value={growthMetrics.value}
                subValue={growthMetrics.subValue}
                icon={TrendingUp}
                trend={growthMetrics.trend}
                delay={0.4}
              />
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
                        <div className="relative h-[300px] sm:h-[400px] md:h-[450px]">
                          <img
                            src={selectedYearData?.image}
                            alt={selectedYear}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-90" />
                          <div className="absolute inset-0 p-8 md:p-12 lg:p-16 flex flex-col justify-end z-10">
                            <div className="max-w-2xl">
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
                                className="text-white/80 text-lg md:text-xl font-medium leading-relaxed max-w-xl"
                              >
                                {selectedYearData?.description}
                              </motion.p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 4 or 5 Interactive Charts Row */}
                      <div className={cn(
                        "grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-6 sm:mt-8",
                        {
                          3: "xl:grid-cols-3",
                          4: "xl:grid-cols-4",
                          5: "xl:grid-cols-5"
                        }[computedGridCols] || "xl:grid-cols-4"
                      )}>
                        {/* Age Distribution Mini Chart */}
                        {selectedYearData?.hasAgeData !== false && (
                          <div className="bg-white rounded-[2rem] lg:rounded-[2.5rem] border border-slate-100 p-6 sm:p-8 md:p-10 shadow-sm flex flex-col h-full min-w-0 relative overflow-hidden hover:shadow-xl hover:shadow-indigo-100/40 transition-all justify-start">
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
                                  <BarChart layout="vertical" data={Math.max((selectedYearData?.ageData?.length || 0), 0) > 0 ? selectedYearData?.ageData : [
                                    { age: '15-18', count: 12 },
                                    { age: '18-22', count: 48 },
                                    { age: '23-26', count: 28 },
                                    { age: '26+', count: 12 },
                                  ]} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#E2E8F0" opacity={0.5} />
                                    <XAxis type="number" hide />
                                    <YAxis dataKey="age" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b', fontWeight: 700 }} width={45} />
                                    <Tooltip cursor={{ fill: '#F1F5F9' }} contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                                    <Bar dataKey="count" fill="#6366f1" radius={[0, 4, 4, 0]} barSize={16}>
                                      <LabelList dataKey="count" position="right" style={{ fill: '#64748b', fontSize: 10, fontWeight: 800 }} />
                                    </Bar>
                                  </BarChart>
                                </ResponsiveContainer>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Education Level */}
                        {selectedYearData?.educationLevels && selectedYearData.educationLevels.length > 0 && (
                          <div className="bg-white rounded-[2rem] lg:rounded-[2.5rem] border border-slate-100 p-6 sm:p-8 md:p-10 shadow-sm flex flex-col min-w-0 h-full relative overflow-hidden hover:shadow-xl hover:shadow-indigo-100/40 transition-all justify-start">
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
                            </div>
                          </div>
                        )}

                        {/* Gender Unstacked Contents */}
                        <div className="contents">
                          {/* Gender Donut Chart */}
                          <div className={cn(
                            "bg-white rounded-[2rem] lg:rounded-[2.5rem] border border-slate-100 p-6 sm:p-8 md:p-10 shadow-sm flex flex-col min-w-0 h-full relative overflow-hidden hover:shadow-xl hover:shadow-pink-100/40 transition-all justify-start"
                          )}>
                            <div>
                              <div className="flex items-center gap-3 mb-2">
                                <div className="w-8 h-8 rounded-xl bg-pink-50 text-pink-500 flex items-center justify-center shrink-0">
                                  <Sparkles className="w-4 h-4" />
                                </div>
                                <div>
                                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Cinsiyet Dengesi</p>
                                </div>
                              </div>
                              <div className="flex items-center justify-between gap-1">
                                <div className="h-[120px] w-[120px] relative shrink-0 -ml-2">
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
                                        innerRadius={35}
                                        outerRadius={48}
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
                                <div className="flex flex-col gap-3 justify-center">
                                  <div className="flex items-center gap-3 group" title={`${selectedYearData?.gender?.female || 0} Kişi`}>
                                    <div className="w-3 h-3 rounded-full bg-pink-500 shadow-sm shadow-pink-200 group-hover:scale-125 transition-transform" />
                                    <div className="flex flex-col">
                                      <span className="text-[10px] font-bold text-slate-400 uppercase leading-none mb-1">Kadın</span>
                                      <span className="text-xl font-black text-slate-900 leading-none">%{Math.round((selectedYearData?.gender?.female || 0) / (selectedYearData?.participants || 1) * 100) || 64}</span>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-3 group" title={`${selectedYearData?.gender?.male || 0} Kişi`}>
                                    <div className="w-3 h-3 rounded-full bg-blue-500 shadow-sm shadow-blue-200 group-hover:scale-125 transition-transform" />
                                    <div className="flex flex-col">
                                      <span className="text-[10px] font-bold text-slate-400 uppercase leading-none mb-1">Erkek</span>
                                      <span className="text-xl font-black text-slate-900 leading-none">%{Math.round((selectedYearData?.gender?.male || 0) / (selectedYearData?.participants || 1) * 100) || 36}</span>
                                    </div>
                                  </div>
                                  {(selectedYearData?.gender?.other && Math.round((selectedYearData.gender.other / selectedYearData.participants) * 100) > 0) ? (
                                    <div className="flex items-center gap-3 group" title={`${selectedYearData?.gender?.other || 0} Kişi`}>
                                      <div className="w-3 h-3 rounded-full bg-slate-400 shadow-sm shadow-slate-200 group-hover:scale-125 transition-transform" />
                                      <div className="flex flex-col">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase leading-none mb-1">Diğer</span>
                                        <span className="text-lg font-black text-slate-900 leading-none">%{Math.round((selectedYearData.gender.other / selectedYearData.participants) * 100)}</span>
                                      </div>
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* Turkey Map was removed from here. */}
                        </div>

                        {/* Academic Profile Ranking */}
                        {((selectedYearData?.topSchools && selectedYearData.topSchools.length > 0) || (selectedYearData?.topDepartments && selectedYearData.topDepartments.length > 0)) && (
                        <div className="bg-white rounded-[2rem] lg:rounded-[2.5rem] border border-slate-100 p-6 sm:p-8 md:p-10 shadow-sm flex flex-col min-w-0 h-full relative overflow-hidden hover:shadow-xl hover:shadow-blue-100/40 transition-all justify-start">
                          <div>
                            {selectedYearData?.topSchools ? (
                              <>
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
                              </>
                            ) : (
                              <>
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
                                  {selectedYearData?.topDepartments?.slice(0, 5).map((dept, i) => {
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
                              </>
                            )}
                          </div>
                        </div>
                        )}

                      </div>

                      {/* HUGE TURKEY MAP CONTAINER */}
                      {hasCityData && (
                        <div className="mt-8 mb-12 bg-white rounded-[2rem] lg:rounded-[3rem] border border-slate-100 shadow-sm flex flex-col relative hover:shadow-2xl hover:shadow-indigo-100/50 transition-all justify-center items-center w-full group min-h-[400px] sm:min-h-[500px]">
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
                      <div className="mt-8 mb-12 bg-white rounded-[2rem] lg:rounded-[3rem] border border-slate-100 shadow-sm flex flex-col relative hover:shadow-2xl hover:shadow-indigo-100/50 transition-all justify-center items-start w-full group min-h-[400px] sm:min-h-[550px] overflow-hidden">
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
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4 pt-2">
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
                    <div className="bg-white rounded-[2rem] lg:rounded-[3rem] border border-slate-200 p-6 md:p-10 shadow-sm overflow-hidden">
                      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-12 border-b border-slate-100 pb-8">
                        <div>
                          <div className="flex items-center gap-3 mb-3">
                            <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
                            <span className="text-[10px] sm:text-xs font-black text-blue-600 uppercase tracking-[0.2em]">Ekosistem Ağı</span>
                          </div>
                          <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight font-display mb-2">Stratejik Partnerler</h3>
                          <p className="text-sm md:text-base text-slate-500 font-medium max-w-xl leading-relaxed">Etki alanımızı genişletirken vizyonumuzu paylaşan, bu dönüşüm yolculuğuna güç katan değerli kurumlar.</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap justify-center md:justify-start gap-4 sm:gap-6">
                        {selectedYearData?.sponsors.map((sponsor, i) => (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
                            key={sponsor}
                            className="relative flex items-center justify-center min-h-[6rem] md:min-h-[7rem] px-10 py-6 bg-white rounded-[2rem] border border-slate-100 group hover:border-blue-100 hover:shadow-2xl hover:shadow-blue-900/5 hover:-translate-y-1 transition-all duration-500 w-full sm:w-auto sm:min-w-[220px] overflow-hidden"
                          >
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative flex w-full h-full items-center justify-center">
                              <img 
                                src={`/partners/${sponsor.toLowerCase().replace(/ /g, '-')}.png`} 
                                alt={sponsor} 
                                className="max-h-12 w-auto object-contain grayscale opacity-60 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500 ease-out drop-shadow-sm"
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                                }}
                              />
                              <span className="hidden text-sm md:text-base font-bold text-slate-400 group-hover:text-blue-950 text-center tracking-wide transition-colors">{sponsor}</span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>



        {/* Footer / CTA */}
        <footer className="border-t border-slate-200 pt-16 flex flex-col md:flex-row items-center justify-between gap-10 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <img src="/partners/yetgen-logo-transparent.png" alt="YetGen Logo" className="h-16 object-contain shrink-0" />
            <div>
              <p className="text-xl font-black text-slate-900">YetGen 21.Yüzyıl Yetkinlikleri</p>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Farkındalık Programı</p>
            </div>
          </div>

          <div className="flex gap-6 w-full md:w-auto">
            <button 
              onClick={() => setIsFormModalOpen(true)}
              className="w-full md:w-auto px-10 py-5 rounded-3xl bg-slate-900 text-white font-black hover:bg-slate-800 transition-all hover:shadow-xl hover:-translate-y-1 active:scale-95"
            >
              Bizimle Partner Olun
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
