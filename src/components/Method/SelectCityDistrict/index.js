import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SelectCityDistrict.css'

const SelectCityDistrict = () => {
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json');
        setCities(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleCityChange = (e) => {
    const selectedCityId = e.target.value;

    // Filter districts based on selected city
    const selectedCity = cities.find(city => city.Id === selectedCityId);
    setDistricts(selectedCity?.Districts || []);

    // Reset wards
    setWards([]);
  };

  const handleDistrictChange = (e) => {
    const selectedDistrictId = e.target.value;

    // Filter wards based on selected district
    const selectedDistrict = districts.find(district => district.Id === selectedDistrictId);
    setWards(selectedDistrict?.Wards || []);
  };

  return (
    <div>
      <select className="form-select form-select-sm mb-3 custom-select" id="city" onChange={handleCityChange} aria-label=".form-select-sm" defaultValue="">
        <option value="">Choose City</option>
        {cities.map(city => (
          <option key={city.Id} value={city.Id}>{city.Name}</option>
        ))}
      </select>

      <select className="form-select form-select-sm mb-3 custom-select" id="district" onChange={handleDistrictChange} aria-label=".form-select-sm" defaultValue="">
        <option value="">Choose District</option>
        {districts.map(district => (
          <option key={district.Id} value={district.Id}>{district.Name}</option>
        ))}
      </select>

      <select className="form-select form-select-sm custom-select" id="ward" aria-label=".form-select-sm" defaultValue="">
        <option value="">Choose Ward</option>
        {wards.map(ward => (
          <option key={ward.Id} value={ward.Id}>{ward.Name}</option>
        ))}
      </select>
    </div>
  );
};

export default SelectCityDistrict;
