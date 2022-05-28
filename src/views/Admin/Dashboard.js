import React, { Component } from "react";
import {  Col, Row } from 'reactstrap';

class Dashboard extends Component{
    render() {
        const {data} = this.props;
        return(
            <div className="animated fadeIn">
                
                <Row>
                    <Col xs="12" sm="6" lg="3">
                        ADMIN DASH: {data}
                    </Col>
                </Row>
            </div>
        );
    }
}
export default Dashboard;