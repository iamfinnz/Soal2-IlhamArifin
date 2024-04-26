import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {

  const [provinsi, setProvinsi] = useState([]);
  const [kabupaten, setKabupaten] = useState([]);
  const [kecamatan, setKecamatan] = useState([]);
  const [kelurahan, setKelurahan] = useState([]);
  const [selectedProvinceCode, setSelectedProvinceCode] = useState('');
  const [selectedProvinceName, setSelectedProvinceName] = useState('');
  const [selectedRegenciesCode, setSelectedRegenciesCode] = useState('');
  const [selectedRegenciesName, setSelectedRegenciesName] = useState('');
  const [selectedDistrictsCode, setSelectedDistrictsCode] = useState('');
  const [selectedDistrictsName, setSelectedDistrictsName] = useState('');

  useEffect(() => {
    // Ambil data dari API provinsi
    axios.get('https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json')
      .then(response => {
        setProvinsi(response.data);
      })
      .catch(error => {
        console.error('Error fetching provinces:', error);
      });
  }, []);

  // Handle perubahan option provinsi
  const handleProvinceChange = (e) => {
    const selectedProvinceCode = e.target.value;
    const selectedProvinceName = e.target.options[e.target.selectedIndex].text;
    setSelectedProvinceCode(selectedProvinceCode);
    setSelectedProvinceName(selectedProvinceName);

    // Reset kosong kecamatan dan kelurahan
    setKecamatan([]);
    setKelurahan([]);

    // Ambil data kabupaten dari provinsi yang dipilih
    axios.get(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${selectedProvinceCode}.json`)
      .then(response => {
        setKabupaten(response.data);
      })
      .catch(error => {
        console.error('Error fetching regencies:', error);
      });
  };

  // Handle perubahan option kabupaten
  const handleRegenciesChange = (r) => {
    const selectedRegenciesCode = r.target.value;
    const selectedRegenciesName = r.target.options[r.target.selectedIndex].text;
    setSelectedRegenciesCode(selectedRegenciesCode);
    setSelectedRegenciesName(selectedRegenciesName);

    // Reset kelurahan
    setKelurahan([]);

    // Ambil data kecamatan dari kabupaten yang dipilih
    axios.get(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${selectedRegenciesCode}.json`)
      .then(response => {
        setKecamatan(response.data);
      })
      .catch(error => {
        console.error('Error fetching districts:', error);
      });
  };

  // Handle perubahan kecamatan
  const handleDistrictsChange = (d) => {
    const selectedDistrictsCode = d.target.value;
    const selectedDistrictsName = d.target.options[d.target.selectedIndex].text;
    setSelectedDistrictsCode(selectedDistrictsCode);
    setSelectedDistrictsName(selectedDistrictsName);

    // Ambil data kelurahan dari kecamatan yang dipilih
    axios.get(`https://www.emsifa.com/api-wilayah-indonesia/api/villages/${selectedDistrictsCode}.json`)
      .then(response => {
        setKelurahan(response.data);
      })
      .catch(error => {
        console.error('Error fetching villages:', error);
      });
  };

  return (
    <div>
      <center>
      <h1>Soal 2 - Get Data From API</h1>
      </center>
      <label>Pilih Provinsi:    </label>
      <select onChange={handleProvinceChange} value={selectedProvinceCode}>
        <option value="">{selectedProvinceName ? selectedProvinceName : 'Pilih Provinsi'}</option>
        {provinsi.map(prov => (
          <option key={prov.id} value={prov.id}>
            {prov.name}
          </option>
        ))}
      </select>
      <br/><br/>
      <label>Pilih Kabupaten:    </label>
      <select onChange={handleRegenciesChange} value={selectedRegenciesCode}>
        <option value="">{selectedRegenciesName ? selectedRegenciesName : 'Pilih Kabupaten'}</option>
        {kabupaten.map(kab => (
          <option key={kab.id} value={kab.id}>
            {kab.name}
          </option>
        ))}
      </select>
      <br/><br/>
      <label>Pilih Kecamatan:    </label>
      <select onChange={handleDistrictsChange} value={selectedDistrictsCode}>
        <option value="">{selectedDistrictsName ? selectedDistrictsName : 'Pilih Kecamatan'}</option>
        {kecamatan.map(kec => (
          <option key={kec.id} value={kec.id}>
            {kec.name}
          </option>
        ))}
      </select>
      <br/><br/>
      <label>Pilih Kelurahan:    </label>
      <select>
        <option value="">Pilih Kelurahan</option>
        {kelurahan.map(kel => (
          <option key={kel.id} value={kel.id}>
            {kel.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default App;
