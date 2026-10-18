import { useState, useEffect } from 'react'
import ParcaForm from '../components/ParcaForm'
import ParcaListesi from '../components/ParcaListesi'
import KmGuncelle from '../components/KmGuncelle'

function verileriYukle(anahtar, varsayilan) {
  try {
    const kayit = localStorage.getItem(anahtar)
    return kayit ? JSON.parse(kayit) : varsayilan
  } catch {
    return varsayilan
  }
}

function AnaSayfa() {
  const [parcalar, setParcalar] = useState(() => verileriYukle('balata-parcalar', []))
  const [guncelKm, setGuncelKm] = useState(() => verileriYukle('balata-km', 0))
  const [duzenlenen, setDuzenlenen] = useState(null)

  useEffect(() => {
    localStorage.setItem('balata-parcalar', JSON.stringify(parcalar))
  }, [parcalar])

  useEffect(() => {
    localStorage.setItem('balata-km', JSON.stringify(guncelKm))
  }, [guncelKm])

  function parcaEkle(yeniParca) {
    setParcalar([...parcalar, { ...yeniParca, id: crypto.randomUUID() }])
  }

  function parcaSil(id) {
    setParcalar(parcalar.filter((parca) => parca.id !== id))
    if (duzenlenen && duzenlenen.id === id) setDuzenlenen(null)
  }

  function parcaGuncelle(guncelParca) {
    setParcalar(
      parcalar.map((parca) =>
        parca.id === duzenlenen.id ? { ...guncelParca, id: parca.id } : parca
      )
    )
    setDuzenlenen(null)
  }

  function formKaydet(veri) {
    if (duzenlenen) {
      parcaGuncelle(veri)
    } else {
      parcaEkle(veri)
    }
  }

  function duzenlemeyeBasla(parca) {
    setDuzenlenen(parca)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <main className="min-h-screen bg-stone-100 px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold text-stone-900">Balata Ömrü</h1>
        <p className="mt-1 text-stone-600">Fren ve debriyaj aşınma takibi</p>
        <p className="mt-6 mb-4 text-sm text-stone-500">
          Kayıtlı parça: {parcalar.length} · Araç km: {guncelKm}
        </p>

        <KmGuncelle guncelKm={guncelKm} onKaydet={setGuncelKm} />
        <ParcaForm
          onKaydet={formKaydet}
          duzenlenen={duzenlenen}
          onVazgec={() => setDuzenlenen(null)}
        />

        <h2 className="mt-8 mb-3 text-xl font-semibold text-stone-900">Parçalarım</h2>
        <ParcaListesi
          parcalar={parcalar}
          guncelKm={guncelKm}
          onSil={parcaSil}
          onDuzenle={duzenlemeyeBasla}
        />
      </div>
    </main>
  )
}

export default AnaSayfa