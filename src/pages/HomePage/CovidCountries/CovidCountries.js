import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Table } from 'antd';
import { getCountryCodeFromName } from '../../../utils/helpers';
import './CovidCountries.css';

function CovidCountries(props) {
  const [filteredInfo, setFilteredInfo] = useState(null);
  const countriesList = useSelector(state => state.covid.countries);
  const tableData = props.data;
  const columnsData = [
    {
      title: 'Country',
      dataIndex: 'country',
      render: (text, record) => (
        <div>
          <img src={record.flag} alt={text} width='30px' style={{ marginRight: '10px', border: '0.5px solid lightgray' }} />
          <span><Link to={`/country/${getCountryCodeFromName(countriesList, text)}`}>{text}</Link></span>
        </div>
      ),
      sorter: (a, b) => a.country.localeCompare(b.country)
    },
    {
      title: 'Continent',
      dataIndex: 'continent',
      filters: [
        { text: 'Asia', value: 'Asia' },
        { text: 'Africa', value: 'Africa' },
        { text: 'Europe', value: 'Europe' },
        { text: 'North America', value: 'North America' },
        { text: 'South America', value: 'South America' },
        { text: 'Australia/Oceania', value: 'Australia/Oceania' }
      ],
      filteredValue: filteredInfo ? filteredInfo.continent : null,
      onFilter: (value, record) => record.continent.includes(value)
    },
    {
      title: 'Total',
      dataIndex: 'total',
      render: (text) => (<span>{text.toLocaleString()}</span>),
      sorter: (a, b) => a.total - b.total
    },
    {
      title: 'Recovered',
      dataIndex: 'recovered',
      render: (text) => (<span>{text.toLocaleString()}</span>),
      sorter: (a, b) => a.recovered - b.recovered
    },
    {
      title: 'Deaths',
      dataIndex: 'deaths',
      render: (text) => (<span>{text.toLocaleString()}</span>),
      sorter: (a, b) => a.deaths - b.deaths,
    }
  ];

  const handleChange = (filters) => {
    setFilteredInfo(filters);
  };

  return (
    <Row className="covid-countries" justify="center">
      <Col span={20}>
        <Table dataSource={tableData} columns={columnsData} onChange={handleChange} />
      </Col>
    </Row>
  );
}

export default CovidCountries;