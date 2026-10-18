import { useState, useEffect } from 'react'
import { PARCA_TURLERI, KULLANIM_SEKILLERI, KALITE_SINIFLARI } from '../interfaces/sabitler'

const BOS_FORM = {
  parcaTuru: 'on-fren',
  marka: '',
  model: '',
  kaliteSinifi: 'standart',
  kullanimSekli: 'karma',
  takildigiTarih: '',
  takildigiKm: '',
}

function ParcaForm({ onKaydet, duzenlenen, onVazgec }) {
  const [form, setForm] = useState(BOS_FORM)
  const [hata, setHata] = useState('')

  useEffect(() => {
    if (duzenlenen) {
      setForm({
        parcaTuru: duzenlenen.parcaTuru,
        marka: duzenlenen.marka,
        model: duzenlenen.model || '',
        kaliteSinifi: duzenlenen.kaliteSinifi,
        kullanimSekli: duzenlenen.kullanimSekli,
        takildigiTarih: duzenlenen.takildigiTarih,
        takildigiKm: String(duzenlenen.takildigiKm),
      })
    } else {
      setForm(BOS_FORM)
    }
    setHata('')
  }, [duzenlenen])

  function alanDegistir(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function gonder(e) {
    e.preventDefault()

    if (!form.marka.trim() || !form.takildigiTarih || form.takildigiKm === '') {
      setHata('Marka, takıldığı tarih ve takıldığı km alanları zorunludur.')
      return
    }

    onKaydet({
      ...form,
      marka: form.marka.trim(),
      model: form.model.trim(),
      takildigiKm: Number(form.takildigiKm),
    })

    setForm(BOS_FORM)
    setHata('')
  }

  const kutu = 'w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm'
  const etiket = 'mb-1 block text-xs font-medium text-stone-600'

  return (
    <form
      onSubmit={gonder}
      className={`rounded-2xl bg-white p-5 shadow-sm ${duzenlenen ? 'ring-2 ring-emerald-700' : ''}`}
    >
      <h2 className="mb-4 text-xl font-semibold text-stone-900">
        {duzenlenen ? 'Parçayı güncelle' : 'Yeni parça ekle'}
      </h2>

      <div className="grid gap-3 sm:grid-cols-2">
        <label>
          <span className={etiket}>Parça türü</span>
          <select name="parcaTuru" value={form.parcaTuru} onChange={alanDegistir} className={kutu}>
            {Object.entries(PARCA_TURLERI).map(([anahtar, deger]) => (
              <option key={anahtar} value={anahtar}>{deger.etiket}</option>
            ))}
          </select>
        </label>

        <label>
          <span className={etiket}>Kalite sınıfı</span>
          <select name="kaliteSinifi" value={form.kaliteSinifi} onChange={alanDegistir} className={kutu}>
            {Object.entries(KALITE_SINIFLARI).map(([anahtar, deger]) => (
              <option key={anahtar} value={anahtar}>{deger.etiket}</option>
            ))}
          </select>
        </label>

        <label>
          <span className={etiket}>Marka</span>
          <input name="marka" value={form.marka} onChange={alanDegistir} placeholder="Örn. Bosch" className={kutu} />
        </label>

        <label>
          <span className={etiket}>Model (isteğe bağlı)</span>
          <input name="model" value={form.model} onChange={alanDegistir} placeholder="Örn. BP1234" className={kutu} />
        </label>

        <label>
          <span className={etiket}>Kullanım şekli</span>
          <select name="kullanimSekli" value={form.kullanimSekli} onChange={alanDegistir} className={kutu}>
            {Object.entries(KULLANIM_SEKILLERI).map(([anahtar, deger]) => (
              <option key={anahtar} value={anahtar}>{deger.etiket}</option>
            ))}
          </select>
        </label>

        <label>
          <span className={etiket}>Takıldığı tarih</span>
          <input type="date" name="takildigiTarih" value={form.takildigiTarih} onChange={alanDegistir} className={kutu} />
        </label>

        <label>
          <span className={etiket}>Takıldığı km</span>
          <input type="number" min="0" name="takildigiKm" value={form.takildigiKm} onChange={alanDegistir} placeholder="Örn. 85000" className={kutu} />
        </label>
      </div>

      {hata && <p className="mt-3 text-sm text-red-700">{hata}</p>}

      <div className="mt-4 flex gap-2">
        <button type="submit" className="rounded-lg bg-emerald-800 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-900">
          {duzenlenen ? 'Kaydet' : 'Ekle'}
        </button>
        {duzenlenen && (
          <button
            type="button"
            onClick={onVazgec}
            className="rounded-lg border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 hover:bg-stone-100"
          >
            Vazgeç
          </button>
        )}
      </div>
    </form>
  )
}

export default ParcaForm