import React, { Component } from "react";
import { Alert,FormFeedback,Jumbotron, Button, Card, CardHeader,CardBody, Col, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import queryString from 'query-string';
import { Formik, Form as FormFormik } from 'formik';
import { webConfig, urlLoginEmployer} from '../../GlobalConfig';
import CustomModal from '../../components/UI/CustomModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

// Redux
import { connect } from 'react-redux';
import { changePasswordUser } from '../../actions/usersActions';

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

        this.notify = this.notify.bind(this);
        this.dismissNotify = this.dismissNotify.bind(this);

        this.setSubmitting = null;
    }

    toastId = null;

    notify = (msj) => { 
        //console.log("Notify");
        this.toastId = toast.info(msj, {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 3000
        }); 
    }

    dismissNotify = () =>  {

        setTimeout(() => {
            if(this.toastId){
                toast.dismiss(this.toastId);
                this.toastId = null;
            }
        }, 1000);
        
    }

    componentDidMount() {
      
        const values = queryString.parse(this.props.location.search);

        if(values.code){
            console.log(values.code);
            this.setState({code: values.code})
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextState){
     
        const {resultChangePasswordUser} = nextProps;

        if(this.props.resultChangePasswordUser !== resultChangePasswordUser){

            this.dismissNotify();

            this.setSubmitting(false);
            
            //console.log(resultChangePasswordUser);
            if(resultChangePasswordUser.result){
                
                this.setState({bShowResult: true});
            }else if(resultChangePasswordUser.error){

                let msgError = [];
                if(Array.isArray(resultChangePasswordUser.error)){
                    resultChangePasswordUser.error.forEach((item,key) => {

                        let textError = "";
                        switch(item.code){
                            case "PasswordMismatch":
                                textError = "Password incorrecto.";
                                break;
                            case "SamePassword":
                                textError = "El Password Nuevo debe distinto al Password Actual";
                                break;
                            default:
                                textError = "Se ha producido un error, vuelva a intentarlo.";
                                break;

                        }
                        msgError.push(
                            <Alert  key={key} color="danger">
                                {textError}
                            </Alert>
                        );
                    });
                }else{
                    msgError.push(
                        <Alert key={0} color="danger">
                            {resultChangePasswordUser.error}
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
    
    logout = (e) => {
        this.props.signOut(e);
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
                            <small>&ensp; Necesita ingresar su password actual...</small>
                        </CardHeader>
                        <CardBody>
                            <Formik
                                initialValues={{ 
                                    oldPassword: '',
                                    newPassword: '',
                                    rePassword: ''
                                }}
                                validate={ (values) => {
                                    let errors = {};
                                    
                                    if (!values.oldPassword) {
                                        errors.oldPassword = 'Campo Password Actual es requerido.';
                                    }

                                    if (!values.newPassword) {
                                        errors.newPassword = 'Campo Password Nuevo es requerido.';
                                    } else if(values.newPassword.length < 6){
                                        errors.newPassword = 'Campo Password Nuevo debe ser de largo mínimo 6 caracteres.';
                                    }

                                    if (!values.rePassword) {
                                        errors.rePassword = 'Campo Confirmar Nuevo Password es requerido.';
                                    } else if(values.rePassword !== values.newPassword){
                                        errors.rePassword = 'Campos Password Nuevo y Confirmar Password deben ser iguales.';
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

                                    this.setSubmitting = setSubmitting;
                                    this.setSubmitting(true);

                                    this.notify("Actualizando datos...");
                                    this.setState({isValidatingForm:false});
                                    
                                    values.token = this.state.code;
                                    this.props.changePasswordUser(values); 
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
                                                            <i className="cui-lock-locked"></i>
                                                            </InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input type="password" id="oldPassword" 
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                    value={values.oldPassword}
                                                                    placeholder="Password Actual..."
                                                                    valid={values.oldPassword !== '' && touched.oldPassword }
                                                                    invalid={errors.oldPassword !== undefined && touched.oldPassword } />
                                                        <FormFeedback className="help-block">{errors.oldPassword && touched.oldPassword && errors.oldPassword}</FormFeedback>
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
                                                        <Input type="password" id="newPassword" 
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                    value={values.newPassword}
                                                                    placeholder="Password Nuevo..."
                                                                    valid={values.newPassword !== '' && touched.newPassword }
                                                                    invalid={errors.newPassword !== undefined && touched.newPassword } />
                                                        <FormFeedback className="help-block">{errors.newPassword && touched.newPassword && errors.newPassword}</FormFeedback>
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
                                                                    placeholder="Confirmar Nuevo Password..."
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
                            <strong>Nuevo Password</strong>
                            <div className="card-header-actions">
                                <a href={"#" + urlLoginEmployer} rel="noreferrer noopener" onClick={this.logout} className="card-header-action">
                                    <small className="text-muted">Salir de la sesión</small>
                                </a>
                            </div>
                        </CardHeader>
                        <CardBody>
                            <Jumbotron>
                                <form onSubmit={this.redirectToLogin}>
                                    <h2>Tiene un Nuevo Password!</h2>
                                    <p className="lead">Salga de la sesión e ingrese con su nuevo password.</p>
                                    <hr className="my-2" />
                                    <p>Si no puede ingresar a la plataforma con el Nuevo Password y no puede resuperar su Password, escribanos a: <strong className="text-danger">{ webConfig.supportEmail }</strong> </p>
                                    <p className="lead">
                                        <Button color="success" className="btn btn-success d-block w-100" onClick={this.logout}>Entendido y Salir de la Sesión!</Button>
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
                <ToastContainer></ToastContainer>
                <CustomModal
                    isOpen={this.state.modal} 
                    toggle={this.toggleModal} 
                    classNameModal={this.state.classNameModal}
                    titleModal={this.state.titleModal}
                    contentModal={this.state.contentModal}
                    ></CustomModal>
                <Row className="justify-content-center">
                    <Col xs="12" md="6">
                        {formShow}
                    </Col>
                </Row>
            </div>  
            );

    }

}

const mapStateToProps = state => ({
    resultChangePasswordUser: state.userAuth.resultChangePasswordUser,
    
})

export default connect(mapStateToProps, { 
    changePasswordUser
})(ChangePassword);