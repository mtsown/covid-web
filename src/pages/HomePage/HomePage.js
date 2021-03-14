import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Row, Col, Divider, Typography, AutoComplete, Input } from 'antd';

import { MONTHS, MONTH_FILTER_ARRAY, WEEK_FILTER_ARRAY } from '../../constants/constants';
import { getValuesFromRawData, getMonthlyValuesFromRawData, getKeysFromRawData, getCountryCodeFromName } from '../../utils/helpers';
import Header from '../../components/Header/Header';
import CovidOverview from '../../components/CovidOverview/CovidOverview';
import CovidMap from '../../components/CovidMap/CovidMap';
import CovidTimeline from '../../components/CovidTimeline/CovidTimeline';
import CovidCountries from './CovidCountries/CovidCountries';
import './HomePage.css';

function HomePage() {
  const [activeFilter, setActiveFilter] = useState('Day');
  const [value, setValue] = useState('');
  const [options, setOptions] = useState([]);

  const currentData = useSelector(state => state.covid.currentData);
  const historicalData = useSelector(state => state.covid.historicalData);
  const countriesList = useSelector(state => state.covid.countries);

  const history = useHistory();
  const { Title } = Typography;

  const rawTotal = historicalData.cases;
  const rawRecovered = historicalData.recovered;
  const rawDeaths = historicalData.deaths;

  const timelineData = {
    labels: {
      day: Object.keys(rawTotal || {}),
      week: getKeysFromRawData(rawTotal, WEEK_FILTER_ARRAY),
      month: MONTHS
    },
    total: {
      day: Object.values(rawTotal || {}),
      week: getValuesFromRawData(rawTotal, WEEK_FILTER_ARRAY),
      month: getMonthlyValuesFromRawData(rawTotal, MONTH_FILTER_ARRAY)
    },
    recovered: {
      day: Object.values(rawRecovered || {}),
      week: getValuesFromRawData(rawRecovered, WEEK_FILTER_ARRAY),
      month: getMonthlyValuesFromRawData(rawRecovered, MONTH_FILTER_ARRAY)
    },
    deaths: {
      day: Object.values(rawDeaths || {}),
      week: getValuesFromRawData(rawDeaths, WEEK_FILTER_ARRAY),
      month: getMonthlyValuesFromRawData(rawDeaths, MONTH_FILTER_ARRAY)
    }
  };

  const countriesData = countriesList.filter(country => country.countryInfo._id !== null).map((country) => {
    return ({
      key: country.countryInfo._id,
      country: country.country,
      flag: country.countryInfo.flag,
      continent: country.continent,
      total: country.cases,
      recovered: country.recovered,
      deaths: country.deaths
    });
  });

  const handleSelectFilter = (criterion) => {
    setActiveFilter(criterion);
  };

  const filterCountriesFromSearchText = (searchText) => {
    return countriesList.filter(
      country => country.country.toLowerCase().includes(searchText.toLowerCase())
    ).map(country => country.country
    ).map((countryName) => { return { value: countryName } });
  };

  const handleSearch = (searchText) => {
    setOptions(
      !searchText ? [] : filterCountriesFromSearchText(searchText),
    );
  };

  const handleSelect = (selectedCountry) => {
    const countryCode = getCountryCodeFromName(countriesList, selectedCountry);
    history.push(`/country/${countryCode}`);
  };

  const handleChange = (inputValue) => {
    setValue(inputValue);
  };

  return (
    <div className="home-page">
      <Header />
      <Divider><Title level={1}>Overview</Title></Divider>
      <CovidOverview data={currentData} />
      <Divider><Title level={1}>Map</Title></Divider>
      <CovidMap />
      <Divider><Title level={1}>Timeline</Title></Divider>
      <CovidTimeline data={timelineData} filter={activeFilter} onSelectFilter={handleSelectFilter} />
      <Divider><Title level={1}>Countries</Title></Divider>
      <Row className="search-input" justify="start">
        <Col span={20} offset={2}>
          <AutoComplete value={value} options={options} style={{ width: 300 }} onSelect={handleSelect} onSearch={handleSearch} onChange={handleChange}>
            <Input.Search size="large" placeholder="Search countries" />
          </AutoComplete>
        </Col>
      </Row>
      <CovidCountries data={countriesData} />
    </div >
  );
}

export default HomePage;