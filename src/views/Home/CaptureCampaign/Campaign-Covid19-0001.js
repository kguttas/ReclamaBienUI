import React, { Component } from 'react';
import {
    Card, CardBody, CardGroup,
    Row, Col,
    Alert, 
    Button, 
     
    Input, 
    InputGroup,
    InputGroupAddon, 
    InputGroupText, 
    
    FormFeedback
} from 'reactstrap';

import { Formik, Form as FormFormik } from 'formik';
import CustomModal from '../../../components/UI/CustomModal';
import imageAdmOfertas from '../../../assets/img/home/empleo1.jpg';
import MetaTags from 'react-meta-tags';
import { webConfig } from '../../../GlobalConfig';
// Redux
import { connect } from 'react-redux';
import { captureContact } from '../../../actions/usersActions';

class CampaignCovid190001 extends Component {

    constructor(props) {
        super(props);

        this.state = {
            modal: false,
            classNameModal: '',
            titleModal: '',
            contentModal: null,
            isValidatingForm: false,
            resultContactCampaign: null,
        }

        this.validateForm = this.validateForm.bind(this);
        this.setOpenModal = this.setOpenModal.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }

    componentDidMount() {
        
        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
            // dev code
        } else {
            // production code
            
            
        }

        /*
        this.props.captureContact({
            "firtsName": "Mauricio",
            "secondName": "Estrada",
            "email": "mauricioestradacelis@gmail.com",
            "codeCampaign": "CAMP-0001",
            "campaignDescription": "Como Conseguir Empleo en Durante la Pandemia: Covid-19"
        });*/
    }

    static getDerivedStateFromProps(nextProps, prevState) {
    
        if(nextProps.resultContactCampaign !== prevState.resultContactCampaign){
            return { resultContactCampaign: nextProps.resultContactCampaign};
        }
        else{ 
            return null;
        }
    }

    componentDidUpdate(prevProps, prevState) {

        if (prevState.resultContactCampaign !== this.state.resultContactCampaign) {
          
           //console.log(this.state.resultContactCampaign);
        }
    }

    validateForm(){
        this.setState({isValidatingForm:true});
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

    render() {

        const initialValues = {
            firtsName: '',
            lastName: '',
            email: ''

        };

        return (
            <>
             <MetaTags>
                    <title>{ "Como Encontrar Trabajo por Internet | " + webConfig.title}</title>
                    <meta property="og:type" content={"website"} ></meta>
                    <meta name="title" content={"Como Encontrar Trabajo por Internet | " + webConfig.title} ></meta>
                    <meta name="description" content={"Descarga completamente gratis una guía de ruta de como encontrar empleo durante la pandemia Covid19, entiende el actual escenario y como ha cambiado el mundo laboral."} ></meta>
                    <meta property="og:description" content={"Descarga completamente gratis una guía de ruta de como encontrar empleo durante la pandemia Covid19, entiende el actual escenario y como ha cambiado el mundo laboral."} ></meta>
                    <meta property="og:title" content={"Como Encontrar Trabajo por Internet | " + webConfig.title} />
                    <meta property="og:url" content={window.location.href} ></meta>
                    {/* <meta property="og:image" content={this.state.urlImgAvatar} /> */}
                    <meta property="og:image" content={webConfig.imageURL} ></meta>
                    <meta property="og:site_name" content={webConfig.siteName} ></meta>

                    <meta property="twitter:card" content="summary_large_image"></meta>
                    <meta property="twitter:url" content="https://nempleos.cl/"></meta>
                    <meta property="twitter:title" content={ "Como Encontrar Trabajo por Internet | " + webConfig.title}></meta>
                    <meta property="twitter:description" content="Descarga completamente gratis una guía de ruta de como encontrar empleo durante la pandemia Covid19, entiende el actual escenario y como ha cambiado el mundo laboral."></meta>
                    <meta property="twitter:image" content="https://nempleos.cl/logo.png"></meta>
                                    
                </MetaTags>
            <Card>
                <CardBody>


                    <Row className="mb-4">
                        <Col xs="12" md="3">
                            
                            <img src={imageAdmOfertas} alt="Gestionar ofertas de empleos" className="img-fluid img-thumbnail"></img>

                        </Col>
                        <Col xs="12" md="9" className="d-flex align-items-center">
                           
                            <h1 className="text-center text-primary">Como Encontrar Trabajo por Internet</h1>

                        </Col>
                    </Row>

                    <Row>
                        <Col xs="12">
                            <h5><span role="img"  aria-label="Obtén completamente gratis una guía para encontrar empleo durante esta pandemia de Covid19">✔️</span>Obtén completamente gratis una guía para encontrar empleo en estos tiempos</h5>
                        </Col>
                        <Col xs="12">
                            <h5><span role="img"  aria-label="Entérate de como se ha transformado el mercado laboral y como puedes volver a entrar en él">✔️</span>Entérate de como se ha transformado el mercado laboral y como puedes volver a entrar en él</h5>
                        </Col>
                        <Col xs="12">
                            <h5><span role="img"  aria-label="Consejos y trucos de como desenvolverse en esta pandemia para encontrar empleo">✔️</span>Consejos y trucos de como desenvolverse en este mercado laboral y encontrar empleo</h5>
                        </Col>
                        <Col xs="12">
                            <h5><span role="img"  aria-label="En solo minutos con este documento de lectura rápida comprenderás que debes hacer alinearte con el mercado laboral">✔️</span>En solo minutos con este documento de lectura rápida comprenderás que debes hacer alinearte con el mercado laboral</h5>
                        </Col>
                    </Row>
                    
                    <Row className="justify-content-center">
                                <Col xs="12" md="8">
                                <CustomModal
                                isOpen={this.state.modal} 
                                toggle={this.toggleModal} 
                                classNameModal={this.state.classNameModal}
                                titleModal={this.state.titleModal}
                                contentModal={this.state.contentModal}
                                ></CustomModal>
                                    <CardGroup>
                                        <Card className="p-4">
                                            <CardBody>
                                                <Formik
                                                    initialValues={initialValues}
                                                    validate={ (values) => {
                                                        let errors = {};

                                                        if(!values.firtsName){
                                                            errors.firtsName = 'Campo Nombre es requerido.';
                                                        }

                                                        if(!values.lastName){
                                                            errors.lastName = 'Campo Apellido es requerido.';
                                                        }
                                                        
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

                                                        this.props.captureContact({
                                                            "firtsName": values.firtsName,
                                                            "secondName": values.lastName,
                                                            "email": values.email,
                                                            "codeCampaign": "CAMP-0001",
                                                            "campaignDescription": "Como Conseguir Empleo en Durante la Pandemia: Covid-19"
                                                        });

                                                        //setSubmitting(false); 

                                                        //resetForm(initialValues);
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

                                                            <InputGroup className="mb-4">
                                                                <InputGroupAddon addonType="prepend">
                                                                    <InputGroupText>
                                                                    <i className="icon-user"></i>
                                                                    </InputGroupText>
                                                                </InputGroupAddon>
                                                                <Input type="text" id="firtsName" 
                                                                            onChange={handleChange}
                                                                            onBlur={handleBlur}
                                                                            value={values.firtsName}
                                                                            placeholder="Ingrese su nombre..."
                                                                            valid={values.firtsName !== '' && touched.firtsName }
                                                                            invalid={errors.firtsName !== undefined && touched.firtsName }/>
                                                                <FormFeedback className="help-block">{errors.firtsName && touched.firtsName && errors.firtsName}</FormFeedback>
                                                            </InputGroup>

                                                            <InputGroup className="mb-4">
                                                                <InputGroupAddon addonType="prepend">
                                                                    <InputGroupText>
                                                                    <i className="icon-user"></i>
                                                                    </InputGroupText>
                                                                </InputGroupAddon>
                                                                <Input type="text" id="lastName" 
                                                                            onChange={handleChange}
                                                                            onBlur={handleBlur}
                                                                            value={values.lastName}
                                                                            placeholder="Ingrese su apellido..."
                                                                            valid={values.lastName !== '' && touched.lastName }
                                                                            invalid={errors.lastName !== undefined && touched.lastName }/>
                                                                <FormFeedback className="help-block">{errors.lastName && touched.lastName && errors.lastName}</FormFeedback>
                                                            </InputGroup>
                                                           
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
                                                                            placeholder="Ingrese su email..."
                                                                            valid={values.email !== '' && touched.email }
                                                                            invalid={errors.email !== undefined && touched.email } />
                                                                <FormFeedback className="help-block">{errors.email && touched.email && errors.email}</FormFeedback>
                                                            </InputGroup>
                                                           
                                                            <Row>
                                                                <Col xs="12">
                                                                    <Button color="danger" type="submit"
                                                                    disabled={isSubmitting} block
                                                                    onClick={(e) => {
                                                                        this.validateForm(e);
                                                                        
                                                                        }}><strong>OBTIENE LA GUÍA AHORA</strong></Button>
                                                                </Col>
                                                               
                                                            </Row>

                                                            {
                                                                this.state.resultContactCampaign ? 
                                                                <h5 className="text-danger text-center">Se ha enviado un email con el documento.</h5>
                                                                : null
                                                            }
                                                            
                                                        </FormFormik>
                                                        );
                                                    }}
                                                    </Formik>
                                                   
                                                   
                                            
                                            </CardBody>
                                        </Card>
                                       
                                    </CardGroup>
                                </Col>
                            </Row>


                </CardBody>
            </Card>
            </>
        )
    }
}

const mapStateToProps = state => ({
    resultContactCampaign: state.userAuth.resultContactCampaign,
})

export default connect(mapStateToProps, { 
    captureContact,
})(CampaignCovid190001);