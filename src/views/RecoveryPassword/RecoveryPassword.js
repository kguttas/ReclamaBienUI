import React, { Component } from 'react';
import { Alert,FormFeedback,Jumbotron, Button, Card, CardHeader,CardBody, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import queryString from 'query-string';
import { Formik, Form as FormFormik } from 'formik';
import { webConfig, urlLoginEmployer} from '../../GlobalConfig';
import CustomModal from '../../components/UI/CustomModal';

// Redux
import { connect } from 'react-redux';
import { resetPassword } from '../../actions/usersActions';

class RecoveryPassword extends Component{

    constructor(props){
        super(props);

        this.state = {
            msgValidateEmail: "",
            bShowResult: false,
            modal: false,
            classNameModal: '',
            titleModal: '',
            contentModal: null,
            isValidatingForm: false
        };

        this.recoveryPassword = this.recoveryPassword.bind(this);
        this.setOpenModal = this.setOpenModal.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.redirectToLoginEmployer = this.redirectToLoginEmployer.bind(this);
    }

    componentDidMount(){
        const values = queryString.parse(this.props.location.search);

        if(values.code){
            console.log(values.code);
        }
        
    }
    
    UNSAFE_componentWillReceiveProps(nextProps, nextState){
     
        const {resultResetPassword} = nextProps;

        if(this.props.resultResetPassword !== resultResetPassword){
            //console.log(resultResetPassword);
            if(resultResetPassword.result){
                this.setState({bShowResult: true});
            }else if(resultResetPassword.error){
                this.setOpenModal(true, "modal-danger", "Completar Formulario", 
                <Alert color="danger">
                    {resultResetPassword.error}
                </Alert>); 
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

    recoveryPassword = (e) => {
        //e.preventDefault();
        this.setState({isValidatingForm:true});
        //this.setState({bShowResult: !this.state.bShowResult});

        //console.log("recoveryPassword");
    }

    redirectToLoginEmployer = (e) =>{
        e.preventDefault();
        this.props.history.push(urlLoginEmployer);
    }

    render(){

        let contentForm = null;

        if(!this.state.bShowResult){
            contentForm =
            <Row>
                <Col>
                    <Card>
                        <CardHeader>
                            <strong>Recuperar Password</strong>
                            <small>&ensp; Ingrese su email...</small>
                        </CardHeader>
                        <CardBody>
                            <Formik
                            initialValues={{ 
                                email: ''
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
                                this.props.resetPassword(values); 
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
                                            <Button block color="success"
                                                type="submit"
                                            disabled={isSubmitting} 
                                            onClick={this.recoveryPassword}>Recuperar Password</Button>
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
            contentForm =
            <Row>
                <Col>
                    <Card>
                        <CardHeader>
                            <i className="cui-info icons"></i>
                            <strong>Reiniciar Password</strong>
                            <div className="card-header-actions">
                                <a href={"#"+urlLoginEmployer} rel="noreferrer noopener" className="card-header-action">
                                    <small className="text-muted">login empleador</small>
                                </a>
                            </div>
                        </CardHeader>
                        <CardBody>
                            <Jumbotron>
                                <form onSubmit={this.redirectToLogin}>
                                    <h2>Email enviado exitosamente!</h2>
                                    <p className="lead">Le hemos enviado un email con instrucciones para que pueda cambiar su password.</p>
                                    <hr className="my-2" />
                                    <p>Si el email no ha llegado o no puede cambiar el password, por favor escribanos a: <strong className="text-danger">{ webConfig.supportEmail }</strong> </p>
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
                                
                                {contentForm}
                            </Col>
                        </Row>
                    </Container>
                </div>
                
                
            </div>  
        )

    }

}


const mapStateToProps = state => ({
    resultResetPassword: state.userAuth.resultResetPassword,
    
})

export default connect(mapStateToProps, { 
    resetPassword
})(RecoveryPassword);