import { useState } from 'react'

function KmGuncelle({ guncelKm, onKaydet }) {
  const [deger, setDeger] = useState(guncelKm || '')

  function gonder(e) {
    e.preventDefault()
    if (deger === '' || Number(deger) < 0) return
    onKaydet(Number(deger))
  }

  return (
    <form onSubmit={gonder} className="mb-4 flex flex-wrap items-end gap-3 rounded-2xl bg-white p-5 shadow-sm">
      <label className="min-w-48 flex-1">
        <span className="mb-1 block text-xs font-medium text-stone-600">Aracın güncel kilometresi</span>
        <input
          type="number"
          min="0"
          value={deger}
          onChange={(e) => setDeger(e.target.value)}
          placeholder="Örn. 99000"
          className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm"
        />
      </label>
      <button type="submit" className="rounded-lg bg-stone-900 px-4 py-2 text-sm font-semibold text-white hover:bg-stone-700">
        Km'yi güncelle
      </button>
    </form>
  )
}

export default KmGuncelle