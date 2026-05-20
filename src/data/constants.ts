import {
  Brain,
  Wrench,
  MessageSquare,
  Laptop,
  Rocket,
  FileSpreadsheet,
  Briefcase,
  Presentation,
  Target
} from 'lucide-react';
import { IProgramData, IYearlyData } from '../types';

export const defaultSkills = [
  { name: 'Analitik Düşünme', icon: Brain, color: 'text-purple-400' },
  { name: 'Problem Çözme', icon: Wrench, color: 'text-blue-400' },
  { name: 'İletişim & Takım', icon: MessageSquare, color: 'text-emerald-400' },
  { name: 'Dijital Okuryazarlık', icon: Laptop, color: 'text-orange-400' },
  { name: 'Girişimcilik', icon: Rocket, color: 'text-rose-400' },
  { name: 'Excel İle Modelleme', icon: FileSpreadsheet, color: 'text-green-500' },
  { name: 'Kariyer Planlama', icon: Briefcase, color: 'text-amber-500' },
  { name: 'Sunum Teknikleri', icon: Presentation, color: 'text-indigo-400' },
];

export const pythonProgramSkills = [
  { name: 'Algoritmik Temeller ve Kontrol Yapıları', icon: Brain, color: 'text-violet-500' },
  { name: 'Veri Yapıları ve Manipülasyonu', icon: FileSpreadsheet, color: 'text-blue-500' },
  { name: 'Fonksiyonel Programlama ve Verimlilik', icon: Wrench, color: 'text-emerald-500' },
  { name: 'Hata Yönetimi ve Nesne Yönelimli Programlama', icon: Laptop, color: 'text-indigo-500' },
  { name: 'Veri Bilimi ve Görselleştirme', icon: Presentation, color: 'text-rose-500' },
];

export const isbankFinansSkills = [
  { name: 'Temel Finansal Okuryazarlık', icon: FileSpreadsheet, color: 'text-sky-600' },
  { name: 'Yeni Nesil Finansal Teknolojiler', icon: Laptop, color: 'text-blue-600' },
  { name: 'Finansta Yapay Zeka Dönüşümü', icon: Brain, color: 'text-violet-600' },
  { name: 'Bankacılık Vizyonu', icon: Target, color: 'text-indigo-600' },
  { name: 'Kariyer Planlama', icon: Briefcase, color: 'text-amber-600' },
];

export type ProgramBannerCopy = {
  badge: string;
  headline: [string, string];
  tagline: string;
  heroHeadline?: [string, string];
};

export const PROGRAM_BANNER_COPY: Record<string, ProgramBannerCopy> = {
  'basic-2021': {
    badge: 'Temel Eğitim Programı',
    headline: ['Üniversite Gençliği', 'Yetkinlik Temeli'],
    tagline: '21. yüzyıl becerilerine giriş ve mezuniyet yolculuğunun ilk ölçekli yılı.',
    heroHeadline: ['21. Yüzyıl Yetkinlikleri', 'Temel Farkındalık Programı'],
  },
  'jump-softtech-2021': {
    badge: 'Softtech Jump',
    headline: ['Teknoloji Kariyeri', 'Hızlandırılmış Yol'],
    tagline: 'Softtech iş birliğiyle seçilmiş YetGenliler için yoğun staj ve mentorluk programı.',
    heroHeadline: ['Softtech Jump', 'Yazılım Geliştirme Programı'],
  },
  'basic-2022': {
    badge: 'Temel Eğitim Programı',
    headline: ['Kapsayıcı Büyüme', 'Dijital Yetkinlik'],
    tagline: 'Türkiye genelinde genişleyen katılım ve yüksek mezuniyet ivmesi.',
    heroHeadline: ['21. Yüzyıl Yetkinlikleri', 'Gelişim Hareketi'],
  },
  'o-22': {
    badge: 'Öğretmen Eğitimi 2022',
    headline: ['Eğitimde Yeni Çağ', 'Öğretmen Yetkinlikleri'],
    tagline: 'Aktif öğretmen ve öğretmen adaylarına yönelik 21. yy farkındalık ve gelişim modülleri.',
    heroHeadline: ['Geleceğin Sınıfları', 'Öğretmen Akademisi'],
  },
  'basic-2023': {
    badge: 'Temel Eğitim Programı',
    headline: ['Derinleşen', 'Öğrenme Kalitesi'],
    tagline: 'Mentorluk ve asenkron içerikle bireysel gelişimin güçlendiği yıl.',
    heroHeadline: ['21. Yüzyıl Yetkinlikleri', 'Eğitim Programı'],
  },
  'core-python-2-2023': {
    badge: 'Core Python #2',
    headline: ['Koddan Üretime', '12 Haftalık Yol'],
    tagline: 'Flipped learning ile başlangıçtan orta-ileri Python yetkinliğine geçiş.',
    heroHeadline: ['Core Python #2', 'Yazılım ve Algoritma'],
  },
  'yetgen-gs-2023': {
    badge: 'Galatasaray Lisesi',
    headline: ['Öğretmenlere Özel', 'Pilot Program'],
    tagline: 'Değişen çağda yetkinlikler — 4 hafta, 8 eğitim günü, 31 öğretmen.',
    heroHeadline: ['YetGen & Galatasaray', 'Lisesi Pilot Programı'],
  },
  'birlikte-iyilesiyoruz-2023': {
    badge: 'Birlikte İyileşiyoruz',
    headline: ['Toplumsal', 'Dayanıklılık'],
    tagline: 'Beş oturumluk seminer serisi: duygu regülasyonundan psikolojik ilk yardıma.',
    heroHeadline: ['Toplumsal Dayanıklılık', 'Birlikte İyileşiyoruz'],
  },
  'ilk-ders-2023': {
    badge: 'İlk Ders Semineri',
    headline: ['Eğitimde', 'İlk Adım'],
    tagline: 'Deprem sonrası eğitimcilere yönelik sınıf içi iletişim ve psikolojik destek oturumu.',
    heroHeadline: ['Afet Sonrası', 'İlk Ders Semineri'],
  },
  'o-23': {
    badge: 'Öğretmen Eğitimi 2023',
    headline: ['Sınıfın', 'Geleceği'],
    tagline: 'Öğretmen adayları ve aktif öğretmenler için 21. yy yetkinlik modülleri.',
    heroHeadline: ['Geleceğin Sınıfları', 'Öğretmen Akademisi'],
  },
  'basic-2024': {
    badge: 'Temel Eğitim Programı',
    headline: ['Üniversite Gençliği', 'Yetkinlik Yolculuğu'],
    tagline: '1.926 katılımcı, 1.076 mezun — Türkiye genelinde temel farkındalık ve sertifikasyon.',
    heroHeadline: ['21. Yüzyıl Yetkinlikleri', 'Sertifikasyon Programı'],
  },
  'core-python-3-2024': {
    badge: 'Core Python #3',
    headline: ['Başlangıçtan', 'İleri Seviyeye'],
    tagline: 'Mezunlara özel üç aylık program: algoritmadan veri görselleştirmeye Python.',
    heroHeadline: ['Core Python #3', 'Teknik Yazılım Eğitimi'],
  },
  'o-24': {
    badge: 'Öğretmen Eğitimi 2024',
    headline: ['Eğitimciler İçin', '21. Yy Becerileri'],
    tagline: 'Öğretmen ve öğretmen adaylarına yönelik uygulamalı yetkinlik geliştirme.',
    heroHeadline: ['Eğitimde Yeni Vizyon', 'Öğretmen Akademisi'],
  },
  'doping-2024': {
    badge: 'Doping Hafıza · Liseliler',
    headline: ['Liselilere Özel', 'Dijital Çağ'],
    tagline: 'Doping Hafıza iş birliğiyle lise öğrencilerine yönelik; farkındalık, dijital çağ yetkinlikleri ve gelecek vizyonu kazandıran atölye programı.',
    heroHeadline: ['Doping Hafıza', 'Farkındalık Programı'],
  },
  'habitat-empower-me-2024': {
    badge: 'Empower Me · Habitat',
    headline: ['Eğitmen', 'Eğitimi'],
    tagline: 'Empower Me Zirvesi kapsamında yüz yüze 21. yy yetkinlik modülleri — 29 katılımcı.',
    heroHeadline: ['Empower Me', 'Habitat Eğitmen Eğitimi'],
  },
  'isbank-finansal-okuryazarlik-2024': {
    badge: 'İş Bankası · Finans',
    headline: ['Finansal', 'Okuryazarlık'],
    tagline: 'Mezunlara özel: dijital finans, yapay zeka ve bankacılık ekosistemine yakınlaşma.',
    heroHeadline: ['İş Bankası Finans', 'Okuryazarlığı Programı'],
  },
  'basic-2025': {
    badge: 'Temel Eğitim Programı',
    headline: ['Yeni Dönem', 'Yetkin Gençler'],
    tagline: 'Girişimcilik, eleştirel düşünme ve teknoloji okuryazarlığı gibi modern dünya yetkinliklerini odağına alan 12 haftalık gelişim yolculuğu.',
    heroHeadline: ['21. Yüzyıl Yetkinlikleri', 'Farkındalık Programı'],
  },
  'o-25': {
    badge: 'Öğretmen Eğitimi 2025',
    headline: ['Yapay Zekâ ve Eğitim', 'Öğretmen Akademisi'],
    tagline: 'Yapay zekâ ve yeni nesil teknolojik araçlarla güçlendirilmiş öğretmen gelişim programı.',
    heroHeadline: ['Eğitimde Dijital Dönüşüm', 'Öğretmen Akademisi'],
  },
  'doping-2025': {
    badge: 'Doping Hafıza · Liseliler',
    headline: ['Lise Öğrencileri', 'Yetkinlik Atölyesi'],
    tagline: 'Doping Hafıza kullanıcısı liselilere özel; dijital çağ becerilerini, öz farkındalığı ve algoritmik düşünmeyi odağına alan dinamik atölye serisi.',
    heroHeadline: ['Doping Hafıza', 'Gelişim Programı'],
  },
  'iyi-niyet-2025': {
    badge: 'İyi Niyet Programı',
    headline: ['Sosyal Etki', 'Üniversite Ağı'],
    tagline: 'Disiplinler arası öğrenme kültürü ve sürdürülebilir topluluk çıktıları.',
    heroHeadline: ['İyi Niyet', 'Sosyal Etki Programı'],
  },
  'empowerme-2025': {
    badge: 'EmpowerMe · Eğitmen Eğitimi',
    headline: ['Gençlik Zirvesi', 'Eğitmen Eğitimi'],
    tagline: '21. Yüzyıl Yetkinlikleri Eğitmen Eğitimi — gençlerin yapay zekâ, dijital üretim ve algoritmik düşünmeyle dönüştürücü liderler olarak güçlenmesi.',
    heroHeadline: ['EmpowerMe Zirvesi', 'Eğitmen Gelişim Eğitimi'],
  },
  'uoml-2025': {
    badge: 'YetGen & UÖML',
    headline: ['Kariyer & Yaşam', 'Becerileri'],
    tagline: 'Ulus Özel Musevi Lisesi iş birliğiyle tüm lise kademelerine yönelik; Excel ile modelleme, sürdürülebilirlik, tasarım odaklı düşünce, teknoloji okuryazarlığı ve etkili sunum tekniklerini kapsayan eğitim programı.',
    heroHeadline: ['YetGen & UÖML', 'Lise Gelişim Programı'],
  },
};

export const getProgramBannerCopy = (program: IProgramData): ProgramBannerCopy => {
  const preset = PROGRAM_BANNER_COPY[program.id];
  if (preset) return preset;

  const badge = program.name;
  const tagline =
    program.summary?.trim() ||
    (program.description && program.description.length <= 160
      ? program.description
      : `${program.description?.slice(0, 157)}…`) ||
    'Program katılım ve etki özeti.';

  return {
    badge,
    headline: ['Program', 'Etki Özeti'],
    tagline,
  };
};

export const getHeroContent = (selectedYear: string, selectedProgramData?: IYearlyData | IProgramData) => {
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
      subtitle: '',
      text: 'Geleceğin iş modellerini ve sürdürülebilir yetkinlikleri merkeze alarak, global küreselde rekabet edecek yeni nesil yetenekleri ve vizyoner teknoloji üreticilerini liderler olarak eğitiyoruz.',
      statusText: 'Tamamlandı'
    };
  } else if (selectedYear === '2024') {
    content = {
      title1: 'İnovasyon &',
      title2: 'Teknolojik Dönüşüm',
      subtitle: '',
      text: 'Yapay zeka, dijital dönüşüm ve ileri teknolojiye tam entegre, kendi girişimlerini kurabilen cesur liderlerin sahne aldığı tam bir teknoloji yılı.',
      statusText: 'Tamamlandı'
    };
  } else if (selectedYear === '2023') {
    content = {
      title1: 'Derin Uzmanlık &',
      title2: 'Kalite Odağı',
      subtitle: '',
      text: 'Güçlü mentorluk stüdyoları ve çok boyutlu asenkron altyapısıyla, bireysel yetkinlik gelişimini maksimize ederek rekor seviyede yüksek nitelikli mezunlar verdik.',
      statusText: 'Tamamlandı'
    };
  } else if (selectedYear === '2022') {
    content = {
      title1: 'Kapsayıcılık &',
      title2: 'Dev Büyüme Hareketi',
      subtitle: '',
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
    const program = selectedProgramData as IProgramData;
    const banner = getProgramBannerCopy(program);
    content.title1 = banner.heroHeadline ? banner.heroHeadline[0] : banner.headline[0];
    content.title2 = banner.heroHeadline ? banner.heroHeadline[1] || '' : banner.headline[1];
    content.subtitle = '';
    content.text = program.description || banner.tagline;
  }

  return content;
};

export const getProgramHeadingName = (program: IProgramData) => {
  if (program.longName) return program.longName;
  if (program.id.startsWith('basic-')) {
    return '21. Yüzyıl Yetkinlikleri Farkındalık Eğitim Programı';
  }
  if (program.id === 'doping-2024' || program.id === 'doping-2025') {
    return 'YetGen & Doping Hafıza Dijital Çağda Yetkinlikler ve Beceriler Farkındalık Programı';
  }
  return program.name;
};
