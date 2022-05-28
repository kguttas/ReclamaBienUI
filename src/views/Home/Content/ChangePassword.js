import React, { Component } from "react";
import { Alert,FormFeedback,Jumbotron, Button, Card, CardHeader,CardBody, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import queryString from 'query-string';
import { Formik, Form as FormFormik } from 'formik';
import { webConfig, urlLoginEmployer} from '../../../GlobalConfig';
import CustomModal from '../../../components/UI/CustomModal';

// Redux
import { connect } from 'react-redux';
import { changePassword } from '../../../actions/usersActions';

class ChangePassword extends Component{

    constructor(props){
        super(props);
        this.state = {
            bShowResult: false,
            code: null,
            modal: false,
            /* Modal */
            classNameModal: '',
            titleModal: '',
            contentModal: null,
            isValidatingForm: false
            /* ***** */
        };

        this.recoveryPassword = this.recoveryPassword.bind(this);
        this.setOpenModal = this.setOpenModal.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.redirectToLoginEmployer = this.redirectToLoginEmployer.bind(this);
    }

    componentDidMount() {
        const values = queryString.parse(this.props.location.search);

        if(values.code){
            console.log(values.code);
            this.setState({code: values.code})
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextState){
     
        const {resultChangePassword} = nextProps;

        if(this.props.resultChangePassword !== resultChangePassword){
            console.log(resultChangePassword);
            if(resultChangePassword.result){
                this.setState({bShowResult: true});
            }else if(resultChangePassword.error){

                let msgError = [];
                if(Array.isArray(resultChangePassword.error)){
                    resultChangePassword.error.forEach((item,key) => {
                        msgError.push(
                            <Alert  key={key} color="danger">
                                {item.description}
                            </Alert>
                        );
                    });
                }else{
                    msgError.push(
                        <Alert key={0} color="danger">
                            {resultChangePassword.error}
                        </Alert>
                    );
                }

                this.setOpenModal(true, "modal-danger", "Completar Formulario", msgError);
                 
                this.setState({bShowResult: false});
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

    redirectToLoginEmployer = (e) =>{
        e.preventDefault();
        this.props.history.push(urlLoginEmployer);
    }

    recoveryPassword = (e) => {
        //e.preventDefault();
        this.setState({isValidatingForm:true});
        //this.setState({bShowResult: !this.state.bShowResult});

        //console.log("recoveryPassword");
    }

    render(){

        let formShow = null;

        if(!this.state.bShowResult){
            formShow=
            <Row>
                <Col>
                    <Card>
                        <CardHeader>
                            <strong>Cambiar Password</strong>
                            <small>&ensp; Escriba su Email asociado y el Nuevo Password...</small>
                        </CardHeader>
                        <CardBody>
                            <Formik
                                initialValues={{ 
                                    email: '',
                                    password: '',
                                    rePassword: ''
                                }}
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
                                    } else if(values.password.length < 6){
                                        errors.password = 'Campo Password debe ser de largo mínimo 6 caracteres.';
                                    }

                                    if (!values.rePassword) {
                                        errors.rePassword = 'Campo Confirmar Password es requerido.';
                                    } else if(values.rePassword !== values.password){
                                        errors.rePassword = 'Campos Password y Confirmar Password deben ser iguales.';
                                    }

                                    var listError = Object.keys(errors);
                                    //console.log(listError.length);
                                    if(this.state.isValidatingForm && listError.length > 0){
                                        this.setState({isValidatingForm:false});
                    
                                        let messageModalJsx = [];
                                        listError.forEach((item,key) => {
                                            console.log(errors[item]);
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
                                
                                onSubmit={(values, { setSubmitting }) => {
                                    this.setState({isValidatingForm:false});
                                    setSubmitting(false);

                                    values.token = this.state.code;
                                    this.props.changePassword(values); 
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
                                            <Row>
                                                <Col xs="12">
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
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs="12">
                                                    <InputGroup className="mb-3">
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText>
                                                            <i className="cui-lock-locked"></i>
                                                            </InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input type="password" id="password" 
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                    value={values.password}
                                                                    placeholder="Password..."
                                                                    valid={values.password !== '' && touched.password }
                                                                    invalid={errors.password !== undefined && touched.password } />
                                                        <FormFeedback className="help-block">{errors.password && touched.password && errors.password}</FormFeedback>
                                                    </InputGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs="12">
                                                    <InputGroup className="mb-3">
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText>
                                                            <i className="cui-lock-locked"></i>
                                                            </InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input type="password" id="rePassword" 
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                    value={values.rePassword}
                                                                    placeholder="Confirmar Password..."
                                                                    valid={values.rePassword !== '' && touched.rePassword }
                                                                    invalid={errors.rePassword !== undefined && touched.rePassword } />
                                                        <FormFeedback className="help-block">{errors.rePassword && touched.rePassword && errors.rePassword}</FormFeedback>
                                                    </InputGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs="12">
                                                    <Button block color="success"
                                                        type="submit"
                                                    disabled={isSubmitting} 
                                                    onClick={this.recoveryPassword}>Cambiar Password</Button>
                                                </Col>
                                            </Row>
                                            
                                        </FormFormik>
                                    );
                                }}
                            </Formik>
    
                        </CardBody>
                    </Card>           
                </Col>
            </Row>
        }else{
            formShow=
            <Row>
                <Col>
                    <Card>
                        <CardHeader>
                            <i className="cui-info icons"></i>
                            <strong>Password Cambiado</strong>
                            <div className="card-header-actions">
                                <a href={"#" + urlLoginEmployer} rel="noreferrer noopener" className="card-header-action">
                                    <small className="text-muted">login empleador</small>
                                </a>
                            </div>
                        </CardHeader>
                        <CardBody>
                            <Jumbotron>
                                <form onSubmit={this.redirectToLogin}>
                                    <h2>Tiene un Nuevo Password!</h2>
                                    <p className="lead">Intente autenticarse con el nuevo password que usted a cambiado.</p>
                                    <hr className="my-2" />
                                    <p>Si no puede ingresar a la plataforma con los datos de Email y Password que usted nos facilitó, por favor escribanos a: <strong className="text-danger">{ webConfig.supportEmail }</strong> </p>
                                    <p className="lead">
                                        <Button color="success" className="btn btn-success d-block w-100" onClick={this.redirectToLoginEmployer}>Entendido!</Button>
                                    </p>
                                </form>
                            </Jumbotron>
                            
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        }

        return(
        
            <div className="animated fadeIn">
                <div className="flex-row align-items-center">
                    <Container>
                    <CustomModal
                            isOpen={this.state.modal} 
                            toggle={this.toggleModal} 
                            classNameModal={this.state.classNameModal}
                            titleModal={this.state.titleModal}
                            contentModal={this.state.contentModal}
                            ></CustomModal>
                        <Row className="justify-content-center">
                            <Col md="8">
                                {formShow}
                            </Col>
                        </Row>
                    </Container>
                </div>
                
                
            </div>  
            );

    }

}

const mapStateToProps = state => ({
    resultChangePassword: state.userAuth.resultChangePassword,
    
})

export default connect(mapStateToProps, { 
    changePassword
})(ChangePassword);