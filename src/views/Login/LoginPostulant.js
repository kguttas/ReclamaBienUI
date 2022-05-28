import React, { Component } from 'react';
import { 
    Link 
} from 'react-router-dom';
import { 
    Alert, 
    Button, 
    Card, 
    CardBody, 
    CardGroup, 
    Col, 
    Container,
    Input, 
    InputGroup,
    InputGroupAddon, 
    InputGroupText, 
    Row,
    FormFeedback,
} from 'reactstrap';
import { urlAreaPortulant, webConfig, urlRecoveryPassword } from '../../GlobalConfig';
import { Formik, Form as FormFormik } from 'formik';
import cookie from 'react-cookies';
import CustomModal from '../../components/UI/CustomModal';
// Redux
import { connect } from 'react-redux';
import { loginPostulant } from '../../actions/usersActions';


class LoginPostulant extends Component {

    emailRef = '';
    passwordRef = '';

    constructor(props){
        super(props);

        this.urlToRedirect = '';
        
        this.state = {
            modal: false,
            classNameModal: '',
            titleModal: '',
            contentModal: null,
            isValidatingForm: false
        };

        this.setOpenModal = this.setOpenModal.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.redirectRecoveryPassword = this.redirectRecoveryPassword.bind(this);
    }

    UNSAFE_componentWillReceiveProps(NextProps, NextState){

        if(this.props.token !== NextProps.token){
            
            if(NextProps.token.access_token){
                
                const expires = new Date();
                expires.setDate(expires.getDate() + 30);
                
                cookie.save(
                    webConfig.cookieNameAuth,
                    NextProps.token.access_token,
                    {
                        path: '/',
                        expires,
                        maxAge: 24 * 60 * 60,
                        //domain: webConfig.domain,
                        //secure: true,
                        //httpOnly: true
                    }
                );

                this.props.history.push(this.urlToRedirect ? this.urlToRedirect : urlAreaPortulant);
            }else{
                this.setOpenModal(true, "modal-danger", "Observaciones", <Alert color="danger">{NextProps.token.error}</Alert>);
            }
        }

    }

    componentDidMount() {
        
        this.urlToRedirect = this.props.location && 
        this.props.location.state &&  
        this.props.location.state.from ? this.props.location.state.from: null;

        const token = cookie.load(webConfig.cookieNameAuth);
        if(token){

            const jwtParts = token.split('.');
            if(jwtParts[1]){
                const decodedString = atob(jwtParts[1]);
                if(decodedString){
                    const claimsToken = JSON.parse(decodedString);
                    //console.log(claimsToken);

                    if(claimsToken.role.includes('Postulant')){
                        this.props.history.push(this.urlToRedirect ? this.urlToRedirect : urlAreaPortulant);
                    }
                }
            }
            
            
        }
    }

    setOpenModal(isOpen,classNameModal, titleModal, contentModal) {
        this.setState({
          modal: isOpen,
          classNameModal: classNameModal,
          titleModal: titleModal,
          contentModal: contentModal
        });
    }

    toggleModal() {
        
        this.setState({
          modal: !this.state.modal
        });
    }

    validateForm(){
        this.setState({isValidatingForm:true});
    }

    redirectRecoveryPassword = e => {
        this.props.history.push(urlRecoveryPassword);
    }

    /*loginUser = e => {
        e.preventDefault();

        const email = this.emailRef.value;
        const password = this.passwordRef.value;

        if (email === '' || password === '') {
            this.setState({ error: true });
            this.setOpenModal(true, "modal-danger", "Observaciones", <Alert color="danger">Campo Email y Password son requeridos.</Alert>);
            return;
        } else {
            this.setState({ error: false });
        }

        const usercredential = { email, password };
        
        //console.log(usercredential);

        this.props.loginEmployer(usercredential);

        //e.target.reset();
    }*/


    render() {

        const contentRegister = 
        <div>
            <h2>Registrarse</h2>
            <p>Encuentra fácilmente ofertas de empleo, y accede a un set completo de funcionalidades que te ayudaran a organizar tus postulaciones.</p>
            <Link to="/registrarse/postulante">
                <Button color="primary" className="mt-3" active tabIndex={-1}>Registrarse Ahora!</Button>
            </Link>
        </div>

        let initialValues={ 
            email: '', 
            password: ''
        };

        return (
            
            <div className="animated fadeIn ">
                <div className="app flex-row my-flex-container align-items-center" style={{ height: '100%' }}>
                <Container>
                        <CustomModal
                        isOpen={this.state.modal} 
                        toggle={this.toggleModal} 
                        classNameModal={this.state.classNameModal}
                        titleModal={this.state.titleModal}
                        contentModal={this.state.contentModal}
                        ></CustomModal>
                            <Row className="justify-content-center">
                                <Col xs="12" md="8">
                                    <CardGroup>
                                        <Card className="p-4">
                                            <CardBody>
                                                <Formik
                                                    initialValues={initialValues}
                                                    validate={ (values) => {
                                                        let errors = {};
                                                        
                                                        if (!values.email) {
                                                            errors.email = 'Campo Email es requerido.';
                                                        } else if (
                                                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                                                        ) {
                                                            errors.email = 'Debe proporcial un email valido.';
                                                        }

                                                        if (!values.password) {
                                                            errors.password = 'Campo Password es requerido.';
                                                        }

                                                        var listError = Object.keys(errors);
                                                        //console.log(listError.length);
                                                        if(this.state.isValidatingForm && listError.length > 0){
                                                            this.setState({isValidatingForm:false});
                                        
                                                            let messageModalJsx = [];
                                                            listError.forEach((item,key) => {
                                                                //console.log(errors[item]);
                                                                messageModalJsx.push(
                                                                        <Alert  key={key} color="danger">
                                                                            {errors[item]}
                                                                        </Alert>
                                                                    );
                                                            });

                                                            
                                                            this.setOpenModal(true, "modal-danger", "Completar Formulario", messageModalJsx);                    
                                                        }
                                                        
                                                        return errors;
                                                    }}
                                                    
                                                    onSubmit={(values, { setSubmitting ,resetForm }) => {
                                                        this.setState({isValidatingForm:false});

                                                        this.props.loginPostulant(values);
                                                        //values.password = '';
                                                        setSubmitting(false); 

                                                        resetForm(initialValues);
                                                    }}
                                                    >
                                                    {({
                                                        values,
                                                        errors,
                                                        touched,
                                                        handleChange,
                                                        handleBlur,
                                                        handleSubmit,
                                                        isSubmitting,
                                                        setFieldValue,
                                                        setFieldTouched,
                                                        validateForm
                                                        /* and other goodies */
                                                    }) => {
                                                        
                                                        return (
                                                        <FormFormik onSubmit={handleSubmit}>
                                                            <h2>Login Postulante</h2>
                                                            <p className="text-muted">Ingresa a tu cuenta</p>
                                                            <InputGroup className="mb-3">
                                                                <InputGroupAddon addonType="prepend">
                                                                    <InputGroupText>
                                                                    <i className="icon-user"></i>
                                                                    </InputGroupText>
                                                                </InputGroupAddon>
                                                                <Input type="email" id="email" 
                                                                            onChange={handleChange}
                                                                            onBlur={handleBlur}
                                                                            value={values.email}
                                                                            placeholder="Email..."
                                                                            valid={values.email !== '' && touched.email }
                                                                            invalid={errors.email !== undefined && touched.email } />
                                                                <FormFeedback className="help-block">{errors.email && touched.email && errors.email}</FormFeedback>
                                                            </InputGroup>
                                                            <InputGroup className="mb-4">
                                                                <InputGroupAddon addonType="prepend">
                                                                    <InputGroupText>
                                                                    <i className="icon-lock"></i>
                                                                    </InputGroupText>
                                                                </InputGroupAddon>
                                                                <Input type="password" id="password" 
                                                                            onChange={handleChange}
                                                                            onBlur={handleBlur}
                                                                            value={values.password}
                                                                            placeholder="Ingrese su password..."
                                                                            valid={values.password !== '' && touched.password }
                                                                            invalid={errors.password !== undefined && touched.password }/>
                                                                <FormFeedback className="help-block">{errors.password && touched.password && errors.password}</FormFeedback>
                                                            </InputGroup>
                                                            <Row>
                                                                <Col xs="4">
                                                                    <Button color="primary" className="px-4" type="submit"
                                                                    disabled={isSubmitting} 
                                                                    onClick={(e) => {
                                                                        this.validateForm(e);
                                                                        
                                                                        }}>Login</Button>
                                                                </Col>
                                                                <Col xs="8" className="text-right">
                                                                    <Button color="link" className="px-0" type="button" onClick={this.redirectRecoveryPassword}>No recuerdas el password?</Button>
                                                                </Col>
                                                            </Row>
                                                            
                                                        </FormFormik>
                                                        );
                                                    }}
                                                    </Formik>
                                                   
                                                    <Row className="d-xs-block d-sm-block  d-md-block d-lg-none d-xl-none mt-3">
                                                        <Col xs="12">
                                                            <Card className="text-white bg-primary py-5">
                                                                <CardBody className="text-center">
                                                                {contentRegister}
                                                                </CardBody>
                                                            </Card>
                                                        </Col>
                                                        
                                                    </Row>
                                            
                                            </CardBody>
                                        </Card>
                                        <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                                            <CardBody className="text-center">
                                            {contentRegister}
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

const mapStateToProps = state => ({
    token: state.userAuth.token
})

export default connect(mapStateToProps, { 
    loginPostulant
})(LoginPostulant);