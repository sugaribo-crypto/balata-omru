import {
  PARCA_TURLERI,
  KULLANIM_SEKILLERI,
  KALITE_SINIFLARI,
  KONTROL_ESIGI,
  DEGISTIR_ESIGI,
  YAS_SINIRI_YIL,
} from '../interfaces/sabitler'

export function omurHesapla(parca, guncelKm) {
  const ortalamaOmur = PARCA_TURLERI[parca.parcaTuru].ortalamaOmur
  const kullanimCarpani = KULLANIM_SEKILLERI[parca.kullanimSekli].carpan
  const kaliteCarpani = KALITE_SINIFLARI[parca.kaliteSinifi].carpan

  const tahminiOmur = Math.round(ortalamaOmur * kullanimCarpani * kaliteCarpani)
  const kullanilanKm = Math.max(0, guncelKm - parca.takildigiKm)
  const kalanKm = tahminiOmur - kullanilanKm
  const doluluk = kullanilanKm / tahminiOmur

  const birYil = 1000 * 60 * 60 * 24 * 365
  const yasYil = (Date.now() - new Date(parca.takildigiTarih).getTime()) / birYil

  let durum = 'iyi'
  if (doluluk >= DEGISTIR_ESIGI) {
    durum = 'degistir'
  } else if (doluluk >= KONTROL_ESIGI || yasYil >= YAS_SINIRI_YIL) {
    durum = 'kontrol'
  }

  return { tahminiOmur, kullanilanKm, kalanKm, doluluk, yasYil, durum }
}