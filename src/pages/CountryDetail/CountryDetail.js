import React, { useEffect, useState } from 'react';
import { Row, Col, Divider, Typography } from 'antd';

import { MONTHS, MONTH_FILTER_ARRAY, WEEK_FILTER_ARRAY } from '../../constants/constants';
import { getValuesFromRawData, getMonthlyValuesFromRawData, getKeysFromRawData } from '../../utils/helpers';
import Header from '../../components/Header/Header';
import CovidOverview from '../../components/CovidOverview/CovidOverview';
import CovidTimeline from '../../components/CovidTimeline/CovidTimeline';
import './CountryDetail.css';
const axios = require('axios');

function CountryDetail(props) {
  const [currentData, setCurrentData] = useState();
  const [historicalData, setHistoricalData] = useState();
  const [activeFilter, setActiveFilter] = useState('Day');

  const { Title } = Typography;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  useEffect(() => {
    axios.get(`https://disease.sh/v3/covid-19/countries/${props.countryId}?strict=true`)
      .then((response) => {
        setCurrentData(response.data);
      })
      .catch(error => console.log(error));
    axios.get(`https://disease.sh/v3/covid-19/historical/${props.countryId}?lastdays=all`)
      .then((response) => {
        setHistoricalData(response.data.timeline);
      })
      .catch(error => console.log(error))
  }, [props.countryId]);

  const overviewData = {
    total: currentData?.cases || 0,
    recovered: currentData?.recovered || 0,
    deaths: currentData?.deaths || 0,
    active: currentData?.active || 0,
  };

  const rawTotal = historicalData?.cases || 0;
  const rawRecovered = historicalData?.recovered || 0;
  const rawDeaths = historicalData?.deaths || 0;

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

  const handleSelectFilter = (criterion) => {
    setActiveFilter(criterion);
  };

  return (
    <div className='country-detail'>
      <Header />
      <Row className='country-info' justify='center'>
        <Col span={16}>
          <img className='country-flag' src={`https://disease.sh/assets/img/flags/${props.countryId}.png`} alt={`${currentData?.country || ''} flag`} />
          <div className='country-name'><Title level={1}>{currentData?.country || ''}</Title></div>
        </Col>
      </Row>
      <Divider><Title level={1}>Overview</Title></Divider>
      <CovidOverview data={overviewData} />
      <Divider><Title level={1}>Timeline</Title></Divider>
      <CovidTimeline data={timelineData} filter={activeFilter} onSelectFilter={handleSelectFilter} />
    </div>
  );
}

export default CountryDetail;