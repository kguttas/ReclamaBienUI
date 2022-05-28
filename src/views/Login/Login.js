import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { throws } from 'assert';


class Login extends Component {


    emailRef = '';
    passwordRef = '';

    loginUser = e => {
        e.preventDefault();

        const email = this.emailRef.value;
        const password = this.passwordRef.value;

        

        /*if (email === '' || password === '') {
            this.setState({ error: true });
            return;
        } else {
            this.setState({ error: false });
        }*/

        const usercredential = { email, password };
        
        console.log(usercredential);

        //this.props.loginUser(usercredential);

        //e.target.reset();
    }


    render() {
        return (
            <div className="animated fadeIn ">
                <div className="app flex-row my-flex-container align-items-center" style={{ height: '100%' }}>
                <Container>
                    <Row className="justify-content-center">
                        <Col md="8">
                            <CardGroup>
                                <Card className="p-4">
                                    <CardBody>
                                        <Form onSubmit={this.loginUser}>
                                            <h1>Login</h1>
                                            <p className="text-muted">Sign In to your account</p>
                                            <InputGroup className="mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                    <i className="icon-user"></i>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input type="text" innerRef={(input) => (this.emailRef = input)} placeholder="Username" autoComplete="username" />
                                            </InputGroup>
                                            <InputGroup className="mb-4">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                    <i className="icon-lock"></i>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input type="password" innerRef={(input) => (this.passwordRef = input)} placeholder="Password" autoComplete="current-password" />
                                            </InputGroup>
                                            <Row>
                                                <Col xs="6">
                                                    <Button color="primary" className="px-4">Login</Button>
                                                </Col>
                                                <Col xs="6" className="text-right">
                                                    <Button color="link" className="px-0">Forgot password?</Button>
                                                </Col>
                                            </Row>
                                            <Row className="d-xs-block d-sm-block  d-md-block d-lg-none d-xl-none mt-3">
                                                <Col xs="12">
                                                    <Card className="text-white bg-primary py-5">
                                                        <CardBody className="text-center">
                                                        <div>
                                                            <h2>Sign up</h2>
                                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                                                            labore et dolore magna aliqua.</p>
                                                            <Link to="/registrarse">
                                                                <Button color="primary" className="mt-3" active tabIndex={-1}>Register Now!</Button>
                                                            </Link>
                                                        </div>
                                                        </CardBody>
                                                    </Card>
                                                </Col>
                                                
                                            </Row>
                                        </Form>
                                    </CardBody>
                                </Card>
                                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                                    <CardBody className="text-center">
                                    <div>
                                        <h2>Sign up</h2>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                                        labore et dolore magna aliqua.</p>
                                        <Link to="/registrarse">
                                            <Button color="primary" className="mt-3" active tabIndex={-1}>Register Now!</Button>
                                        </Link>
                                    </div>
                                    </CardBody>
                                </Card>
                            </CardGroup>
                        </Col>
                    </Row>
                </Container>
                </div>
            </div>
        );
    }
}


export default Login;