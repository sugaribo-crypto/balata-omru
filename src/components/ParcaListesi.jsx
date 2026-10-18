import ParcaKart from './ParcaKart'

function ParcaListesi({ parcalar, guncelKm, onSil, onDuzenle }) {
  if (parcalar.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-stone-300 p-8 text-center text-stone-500">
        Henüz parça eklenmedi. Yukarıdaki formdan ilk parçanı ekle.
      </p>
    )
  }

  return (
    <ul className="space-y-3">
      {parcalar.map((parca) => (
        <ParcaKart
          key={parca.id}
          parca={parca}
          guncelKm={guncelKm}
          onSil={onSil}
          onDuzenle={onDuzenle}
        />
      ))}
    </ul>
  )
}

export default ParcaListesi