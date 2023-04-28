import {ListWrapper} from './styles';
import React from 'react';
import { Layout, Space, Row, Col, Typography } from 'antd';
import AddBtn from './components/add-btn';
import IList from './components/list';

const { Header } = Layout;
const { Title } = Typography;

function App() {
  return (
    <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
      <Layout>
        <Header>
          <Row>
            <Col span={8}>col-8</Col>
            <Col span={8} style={{ textAlign: 'center'}}>
              <Title type="warning" style={{margin: '10px'}}>Bitex</Title>
            </Col>
            <Col dir='rtl' span={8}><AddBtn/></Col>
          </Row>
        </Header>
        <ListWrapper>
          <IList />
        </ListWrapper>
      </Layout>
    </Space>
  );
}

export default App;
