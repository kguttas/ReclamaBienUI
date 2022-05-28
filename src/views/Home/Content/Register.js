import React, { Component } from 'react';
import { Button, Card,Label, FormGroup, CardHeader,CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { urlAreaEmployer, urlAreaPortulant} from '../../../GlobalConfig';

class Register extends Component {

    registerPostulant = (e) => {
        this.props.history.push(urlAreaPortulant);
    }

    registerEmployer = (e) => {
        this.props.history.push(urlAreaEmployer);
    }

    render() {
        return (
            
                <div className="animated fadeIn">
                    <Row>
                        <Col xs="12" sm="6">
                            <Card>
                            <CardHeader>
                                <strong>Postulantes</strong>
                                <small>&ensp; Ingrese sus datos...</small>
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col xs="12">
                                        <FormGroup>
                                            <Label htmlFor="name">Name</Label>
                                            <Input type="text" id="name" placeholder="Enter your name" required />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                <Col xs="12">
                                    <FormGroup>
                                        <Label htmlFor="ccnumber">Credit Card Number</Label>
                                        <Input type="text" id="ccnumber" placeholder="0000 0000 0000 0000" required />
                                    </FormGroup>
                                </Col>
                                </Row>
                                <Row>
                                    <Col xs="4">
                                        <FormGroup>
                                        <Label htmlFor="ccmonth">Month</Label>
                                        <Input type="select" name="ccmonth" id="ccmonth">
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                            <option value="9">9</option>
                                            <option value="10">10</option>
                                            <option value="11">11</option>
                                            <option value="12">12</option>
                                        </Input>
                                        </FormGroup>
                                    </Col>
                                    <Col xs="4">
                                        <FormGroup>
                                        <Label htmlFor="ccyear">Year</Label>
                                        <Input type="select" name="ccyear" id="ccyear">
                                            <option>2017</option>
                                            <option>2018</option>
                                            <option>2019</option>
                                            <option>2020</option>
                                            <option>2021</option>
                                            <option>2022</option>
                                            <option>2023</option>
                                            <option>2024</option>
                                            <option>2025</option>
                                            <option>2026</option>
                                        </Input>
                                        </FormGroup>
                                    </Col>
                                    <Col xs="4">
                                        <FormGroup>
                                        <Label htmlFor="cvv">CVV/CVC</Label>
                                        <Input type="text" id="cvv" placeholder="123" required />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="12">
                                        <Button block color="success" onClick={this.registerPostulant}>REGISTRAR POSTULANTE</Button>
                                    </Col>
                                </Row>
                            </CardBody>
                            </Card>
                        </Col>
                        <Col xs="12" sm="6">
                        <Card>
                            <CardHeader>
                                <strong>Empleador</strong>
                                <small>&ensp; Ingrese sus datos...</small>
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col xs="12">
                                        <FormGroup>
                                            <Label htmlFor="name">Name</Label>
                                            <Input type="text" id="name" placeholder="Enter your name" required />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                <Col xs="12">
                                    <FormGroup>
                                    <Label htmlFor="ccnumber">Credit Card Number</Label>
                                    <Input type="text" id="ccnumber" placeholder="0000 0000 0000 0000" required />
                                    </FormGroup>
                                </Col>
                                </Row>
                                <Row>
                                    <Col xs="4">
                                        <FormGroup>
                                        <Label htmlFor="ccmonth">Month</Label>
                                        <Input type="select" name="ccmonth" id="ccmonth">
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                            <option value="9">9</option>
                                            <option value="10">10</option>
                                            <option value="11">11</option>
                                            <option value="12">12</option>
                                        </Input>
                                        </FormGroup>
                                    </Col>
                                    <Col xs="4">
                                        <FormGroup>
                                        <Label htmlFor="ccyear">Year</Label>
                                        <Input type="select" name="ccyear" id="ccyear">
                                            <option>2017</option>
                                            <option>2018</option>
                                            <option>2019</option>
                                            <option>2020</option>
                                            <option>2021</option>
                                            <option>2022</option>
                                            <option>2023</option>
                                            <option>2024</option>
                                            <option>2025</option>
                                            <option>2026</option>
                                        </Input>
                                        </FormGroup>
                                    </Col>
                                    <Col xs="4">
                                        <FormGroup>
                                        <Label htmlFor="cvv">CVV/CVC</Label>
                                        <Input type="text" id="cvv" placeholder="123" required />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="12">
                                        <Button block color="success" onClick={this.registerEmployer}>REGISTRAR EMPLEADOR</Button>
                                    </Col>
                                </Row>
                            </CardBody>
                            </Card>
                        </Col>
                    </Row>
                       
                </div>    
        );
    }
}


export default Register;
