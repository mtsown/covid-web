import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { Skeleton } from 'antd';
import { COLORS, FIELDS } from '../../constants/constants';
import Legend from "./Legend/Legend";
import Map from "./Map/Map";

import "./CovidMap.css";

function App() {
  const isLoading = useSelector(state => state.covid.isLoading);
  const countriesList = useSelector(state => state.covid.countries);
  const [query, setQuery] = useState("confirmed");
  const [countriesData, setCountriesData] = useState([]);

  useEffect(() => {
    setCountriesData(processData(countriesList));
  }, [countriesList]);

  const processData = (data) => {
    let processed = [];

    for (const d of data) {
      let obj = {
        name: d.country,
        code: d.countryInfo.iso2,
        flag: d.countryInfo.flag,
        updated_at: d.updated,
        confirmed: d.cases,
        deaths: d.deaths,
        recovered: d.recovered
      };

      obj["coordinates"] = {
        latitude: d.countryInfo.lat,
        longitude: d.countryInfo.long
      };

      processed.push(obj);
    }

    return processed;
  };

  const handleSetQuery = (query) => {
    setQuery(query);
  };

  return isLoading ? <div className="covid-map covid-map-loading"><Skeleton active /></div> : (
    <div className="covid-map">
      <Legend
        colors={COLORS}
        fields={FIELDS}
        query={query}
        handleSelectLegend={handleSetQuery}
      />

      <Map
        colors={COLORS}
        data={countriesData}
        fields={FIELDS}
        query={query}
      />
    </div>
  )
}

export default App;