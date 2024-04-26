import axios from "axios"
import { useState, useEffect } from "react"

const App = () => {

  const urlProv = "https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json"
  const [prov, setProv] = useState([])
  useEffect(() => {
    lihatProvinsi()
  }, [])
  const lihatProvinsi = () => {
    axios.get(urlProv).then(function (response) {
      console.log(response.data)
      setProv(response.data)
    })
  }


  const provinsi = 11
  const urlKab = `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provinsi}.json`
  const [kab, setKab] = useState([])

  useEffect(() => {
    lihatKabupaten()
  }, [])

  const lihatKabupaten = () => {
    axios.get(urlKab).then(function (response) {
      console.log(response.data)
      setKab(response.data)
    })
  }


  const kabupaten = 1103
  const urlKec = `https://www.emsifa.com/api-wilayah-indonesia/api/districts/${kabupaten}.json`
  const [kec, setKec] = useState([])

  useEffect(() => {
    lihatKecamatan()
  }, [])

  const lihatKecamatan = () => {
    axios.get(urlKec).then(function (response) {
      console.log(response.data)
      setKec(response.data)
    })
  }

  const kecamatan = 1103010
  const urlKel = `https://www.emsifa.com/api-wilayah-indonesia/api/villages/${kecamatan}.json`
  const [kel, setKel] = useState([])

  useEffect(() => {
    lihatKelurahan()
  }, [])

  const lihatKelurahan = () => {
    axios.get(urlKel).then(function (response) {
      console.log(response.data)
      setKel(response.data)
    })
  }

  return (
    <div>
      <h2>Pilih provinsi</h2>
      <select>
        <option value="">Pilih provinsi</option>
        {
          prov.map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))
        }
      </select>
      <br/>
      <h2>Pilih kabupaten</h2>
      <select>
        <option value="">Pilih kabupaten</option>
        {
          kab.map((k) => (
            <option key={k.id} value={k.id}>{k.name}</option>
          ))
        }
      </select>
      <br/>
      <h2>Pilih kecamatan</h2>
      <select>
        <option value="">Pilih kecamatan</option>
        {
          kec.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))
        }
      </select>
      <br/>
      <h2>Pilih kelurahan</h2>
      <select>
        <option value="">Pilih kelurahan</option>
        {
          kel.map((l) => (
            <option key={l.id} value={l.id}>{l.name}</option>
          ))
        }
      </select>
    </div>
  )
}

export default App