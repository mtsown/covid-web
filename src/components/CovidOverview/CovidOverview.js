import React from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Card } from 'antd';
import './CovidOverview.css';

function CovidOverview(props) {
  const covid = props.data;
  const isLoading = useSelector(state => state.covid.isLoading);

  return (
    <Row className="covid-overview" justify="space-around">
      <Col xs={{ span: 20 }} sm={{ span: 10 }} md={{ span: 5 }}>
        <Card title="Total" loading={isLoading} bordered={false}>
          <p>{covid.total.toLocaleString()}</p>
        </Card>
      </Col>
      <Col xs={{ span: 20 }} sm={{ span: 10 }} md={{ span: 5 }}>
        <Card title="Recovered" loading={isLoading} bordered={false}>
          <p>{covid.recovered.toLocaleString()}</p>
        </Card>
      </Col>
      <Col xs={{ span: 20 }} sm={{ span: 10 }} md={{ span: 5 }}>
        <Card title="Deaths" loading={isLoading} bordered={false}>
          <p>{covid.deaths.toLocaleString()}</p>
        </Card>
      </Col>
      <Col xs={{ span: 20 }} sm={{ span: 10 }} md={{ span: 5 }}>
        <Card title="Active" loading={isLoading} bordered={false}>
          <p>{covid.active.toLocaleString()}</p>
        </Card>
      </Col>
    </Row>
  );
}

export default CovidOverview;