import { omurHesapla } from '../utils/omurHesapla'
import { PARCA_TURLERI, KULLANIM_SEKILLERI, KALITE_SINIFLARI } from '../interfaces/sabitler'

const DURUM_STILLERI = {
  iyi:      { yazi: 'İyi',           rozet: 'bg-emerald-100 text-emerald-800', cubuk: 'bg-emerald-600' },
  kontrol:  { yazi: 'Kontrol ettir', rozet: 'bg-amber-100 text-amber-800',     cubuk: 'bg-amber-500' },
  degistir: { yazi: 'Değiştir',      rozet: 'bg-red-100 text-red-800',         cubuk: 'bg-red-600' },
}

function ParcaKart({ parca, guncelKm, onSil, onDuzenle }) {
  const sonuc = omurHesapla(parca, guncelKm)
  const stil = DURUM_STILLERI[sonuc.durum]
  const yuzde = Math.min(100, Math.round(sonuc.doluluk * 100))
  const kmGirilmedi = guncelKm < parca.takildigiKm
  
  function sil() {
    if (window.confirm(`${parca.marka} ${PARCA_TURLERI[parca.parcaTuru].etiket} silinsin mi?`)) {
      onSil(parca.id)
    }
  }

  return (
    <li className="rounded-xl bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="font-semibold text-stone-900">{PARCA_TURLERI[parca.parcaTuru].etiket}</h3>
          <p className="text-sm text-stone-600">{parca.marka} {parca.model}</p>
        </div>
        {!kmGirilmedi && (
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${stil.rozet}`}>
            {stil.yazi}
          </span>
        )}
      </div>

      {kmGirilmedi ? (
                <p className="mt-3 text-sm text-amber-700">
          Aracın km'si ({guncelKm.toLocaleString('tr-TR')}) parçanın takıldığı km'den
          ({parca.takildigiKm.toLocaleString('tr-TR')}) düşük. Gösterge panelindeki toplam km'yi gir.
        </p>
      ) : (
        <>
          <div className="mt-3 h-2 rounded-full bg-stone-200">
            <div className={`h-2 rounded-full ${stil.cubuk}`} style={{ width: `${yuzde}%` }} />
          </div>
          <p className="mt-2 text-sm text-stone-700">
            %{yuzde} kullanıldı ·{' '}
            {sonuc.kalanKm > 0
              ? `${sonuc.kalanKm.toLocaleString('tr-TR')} km kaldı`
              : `${Math.abs(sonuc.kalanKm).toLocaleString('tr-TR')} km aşıldı`}
          </p>
        </>
      )}

      <p className="mt-2 text-xs text-stone-500">
        {KALITE_SINIFLARI[parca.kaliteSinifi].etiket} · {KULLANIM_SEKILLERI[parca.kullanimSekli].etiket} ·
        Takıldı: {parca.takildigiTarih} / {parca.takildigiKm.toLocaleString('tr-TR')} km ·
        Tahmini ömür: {sonuc.tahminiOmur.toLocaleString('tr-TR')} km
      </p>
      
      <div className="mt-3 flex gap-2">
                <button
          onClick={() => onDuzenle(parca)}
          className="rounded-lg border border-stone-300 px-3 py-1.5 text-sm font-medium text-stone-700 hover:bg-stone-100"
        >
          Düzenle
        </button>
        <button
          onClick={sil}
          className="rounded-lg border border-red-200 px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-50"
        >
          Sil
        </button>
      </div>
    </li>
  )
}

export default ParcaKart