import React from 'react';
import { Row, Col, Button, Typography } from 'antd';
import { Line } from 'react-chartjs-2';
import './CovidTimeline.css';

function CovidTimeline(props) {
  const { labels, total, recovered, deaths } = props.data;
  const filter = props.filter;
  const { Text } = Typography;

  const handleClickFilter = (e) => {
    e.preventDefault();
    props.onSelectFilter(e.target.firstChild.data);
  };

  return (
    <Row className="covid-timeline" justify="center">
      <Col span={20}>
        <Text mark strong={false}>Sort by:</Text>
        <Button type="default" onClick={handleClickFilter}>Day</Button>
        <Button type="default" onClick={handleClickFilter}>Week</Button>
        <Button type="default" onClick={handleClickFilter}>Month</Button>
        <Line
          data={{
            labels: (filter === 'Day' && labels.day) || (filter === 'Week' && labels.week) || (filter === 'Month' && labels.month),
            datasets: [
              {
                label: 'Total',
                fill: false,
                lineTension: 0.5,
                backgroundColor: '#ADD8E6',
                borderColor: '#4682b4',
                borderWidth: 2,
                pointRadius: 0,
                data: (filter === 'Day' && total.day) || (filter === 'Week' && total.week) || (filter === 'Month' && total.month)
              },
              {
                label: 'Recovered',
                fill: false,
                lineTension: 0.5,
                backgroundColor: '#90EE90',
                borderColor: '#2e8b57',
                borderWidth: 2,
                pointRadius: 0,
                data: (filter === 'Day' && recovered.day) || (filter === 'Week' && recovered.week) || (filter === 'Month' && recovered.month)
              },
              {
                label: 'Deaths',
                fill: false,
                lineTension: 0.5,
                backgroundColor: '#FFB6C1',
                borderColor: '#b22222',
                borderWidth: 2,
                pointRadius: 0,
                data: (filter === 'Day' && deaths.day) || (filter === 'Week' && deaths.week) || (filter === 'Month' && deaths.month)
              }
            ]
          }}
          options={{
            legend: {
              display: true,
              position: 'top'
            },
            scales: {
              yAxes: [{
                ticks: {
                  callback(value) {
                    return Number(value).toLocaleString('en')
                  }
                }
              }]
            }
          }}
        />
      </Col>
    </Row>
  );
}

export default CovidTimeline;