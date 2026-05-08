/**
 * `public/` altındaki statik varlık yolları.
 * Görseller ve sponsor logoları: /partners
 * PDF raporlar: /rapor
 */
export const PUBLIC_PARTNERS = '/partners';
export const PUBLIC_RAPOR = '/rapor';

export const RAPOR = {
  galatasaray2023: `${PUBLIC_RAPOR}/yetgen-galatasaray-2023-raporu.pdf`,
  habitat: `${PUBLIC_RAPOR}/habitat.pdf`,
  isbankFinansalOkuryazarlik2024: `${PUBLIC_RAPOR}/yetgen-isbankasi-finansal-okuryazarlik-2024-raporu.pdf`,
  corePython3_2024: `${PUBLIC_RAPOR}/yetgen-core-python-3-2024-degerlendirme-raporu-genel.pdf`,
} as const;
