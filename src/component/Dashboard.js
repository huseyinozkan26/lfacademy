import React, { Component } from 'react'
import { Row, Col, Card, CardHeader, CardBody } from 'reactstrap'
import UserTags from '../pages/UserTags'
import Lessons from '../pages/Lessons'
import ContinueWatching from '../pages/ContinueWatching'

class Dashboard extends Component {
  render() {
    return (
      <>
        <Row>
          <Col md>
            <Card>
              <CardHeader>
                <h5>Profil</h5>
              </CardHeader>
              <CardBody color='info'>
                <UserTags />
              </CardBody>
            </Card>
          </Col>
          <Col md>
            <Card>
              <CardHeader>
                <h4>Eğitimlerim</h4>
              </CardHeader>
              <CardBody>
                <ContinueWatching />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <CardHeader><h4>LF Akademi dersleri</h4></CardHeader>
              <CardBody>
                <Lessons></Lessons>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </>
    )
  }
}

export default Dashboard