import * as React from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import { Header } from 'react-bootstrap/lib/Modal';
import Calc from './Calc';
import './css/App.css';

class App extends React.Component {
    public render() {
      return (
        <Grid className="App">
          <Row>
          <Col lg={12} md={12} sm={12} xs={12}>
            <Header className="App-header">
              <h1 className="App-title">
                Kyash Charge
              </h1>
            </Header>
          </Col>
          <Col lg={12} md={12} sm={12} xs={12}>
            <Calc/>
          </Col>
          </Row>
        </Grid>
    );
  }
}

export default App;
