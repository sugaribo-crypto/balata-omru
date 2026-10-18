export const PARCA_TURLERI = {
  'on-fren':   { etiket: 'Ön fren balatası',   ortalamaOmur: 40000 },
  'arka-fren': { etiket: 'Arka fren balatası', ortalamaOmur: 60000 },
  'debriyaj':  { etiket: 'Debriyaj seti',      ortalamaOmur: 120000 },
}

export const KULLANIM_SEKILLERI = {
  'duz-yol': { etiket: 'Düz yol / otoyol', carpan: 1.2 },
  'karma':   { etiket: 'Karma kullanım',   carpan: 1.0 },
  'arazi':   { etiket: 'Arazi',            carpan: 0.7 },
  'trafik':  { etiket: 'Aşırı trafik',     carpan: 0.6 },
}

export const KALITE_SINIFLARI = {
  'ekonomik': { etiket: 'Ekonomik',           carpan: 0.8 },
  'standart': { etiket: 'Standart',           carpan: 1.0 },
  'premium':  { etiket: 'Premium / orijinal', carpan: 1.2 },
}

export const KONTROL_ESIGI = 0.7
export const DEGISTIR_ESIGI = 0.9
export const YAS_SINIRI_YIL = 2