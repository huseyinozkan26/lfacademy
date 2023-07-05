import React, { Component } from 'react';
import { Row, Col } from "reactstrap";
import CategoryList from '../categories/CategoryList';
import EducationsList from '../educations/EducationsList';

export default class Dashboard extends Component {
    render() {
        return (
            <div>
                <Row>
                    <Col sm="3">
                        <CategoryList />
                    </Col>
                    <Col sm="9">
                        <EducationsList />
                    </Col>
                </Row>
            </div>
        )
    }
}
