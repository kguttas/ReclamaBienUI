import React, { Component } from 'react';
import { Col, Container, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

class Error extends Component {
    render() {
        return (
            <div className="app flex-row align-items-center">
                <Container>
                <Row className="justify-content-center">
                    <Col md="6">
                    <div className="clearfix">
                        <h1 className="float-left display-4 mr-4">404</h1>
                        <h4 className="pt-3">Oops! Estas perdido.</h4>
                        <p className="text-muted float-left">No se encontró la página que busca..</p>
                    </div>
                    <InputGroup className="input-prepend">
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <i className="fa fa-search"></i>
                            </InputGroupText>
                        </InputGroupAddon>
                        {/*<Input size="16" type="text" placeholder="What are you looking for?" />
                        <InputGroupAddon addonType="append">
                            <Button color="info">Search</Button>
        </InputGroupAddon>*/}
                    </InputGroup>
                    </Col>
                </Row>
                </Container>
            </div>
        );
    }
}

export default Error;