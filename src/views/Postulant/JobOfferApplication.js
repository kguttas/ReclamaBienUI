import React, { Component } from 'react'
import { isIterable } from '../../utiles';
import { 
    Alert, 
    // Badge,
    Button,
    Card,
    Label,
    FormFeedback, 
    FormGroup, 
    CardHeader,
    CardBody,   
    CardFooter,
    Col, 
    Input,
    // Modal, 
    // ModalBody, 
    // ModalFooter,
    // ModalHeader, 
    Row, 
    Badge,
    // Collapse,
    // ButtonDropdown, 
    // DropdownItem, 
    // DropdownMenu, 
    // DropdownToggle
} from 'reactstrap';
import { Formik, Form as FormFormik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import CustomModal from '../../components/UI/CustomModal';
// Redux
import { connect } from 'react-redux';
import { getJobsOffersPublics } from '../../actions/jobsOffersActions';
import { existsJobOfferApplication, upsertJobOfferApplication, getJobsOffersApplicationList } from '../../actions/jobsOffersApplicationAction'

class JobOfferApplication extends Component {

    initialState = {
        jobsOffersList: null,
        jobsOffers: null,
        idJobOffer: null,
        jobOfferApp: null,
        answers: {},
        questionAndAnswers: [],
        existsJobOffer: null,
        bJobOfferApplicated: false
    };

    constructor(props, context) {
        super(props, context);

        this.submitForm = null;

        this.isValidatingForm = false;

        this.state = {
            ...this.initialState,
            /* Modal */
            classNameModal: '',
            titleModal: '',
            contentModal: null,
            
            /* ***** */
        };

        this.setOpenModal = this.setOpenModal.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }

    // Event Life Cicle
    
    componentDidMount(){
        const { idJobOffer } = this.props.match.params;

        this.setState({idJobOffer});
        //this.props.existsJobOfferApplication({ idJobOffer : idJobOffer});
        
        this.props.getJobsOffersApplicationList({ idJobOffer: idJobOffer });    
        this.props.getJobsOffersPublics({ id: idJobOffer });     
        
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextConte){
        if(nextProps.jobsOffersListForApplication && 
            nextProps.jobsOffersListForApplication.data && 
            isIterable(nextProps.jobsOffersListForApplication.data.data) && 
            nextProps.jobsOffersListForApplication.data.data[0]!== this.state.jobsOffers){
                
            this.setState( { jobsOffers: nextProps.jobsOffersListForApplication.data.data[0]});
        }
        
        if(nextProps.existsJobOfferApplicationResult !== this.props.existsJobOfferApplicationResult){
            //console.log(nextProps.existsJobOfferApplicationResult);
            this.setState( { 
                existsJobOfferApplicationResult: nextProps.existsJobOfferApplicationResult,
                bJobOfferApplicated: nextProps.existsJobOfferApplicationResult.data
            });

        }

        

        if(nextProps.getJobOfferApplicacionListData !== this.props.getJobOfferApplicacionListData){
            
            
            const { data } = nextProps.getJobOfferApplicacionListData;

            if(data && isIterable(data.data)){

                const jobOfferApp = data.data[0];
                
                //console.log(jobOfferApp);

                this.setState( { 
                    jobOfferApp,
                    existsJobOfferApplicationResult: jobOfferApp ? true: false,
                    bJobOfferApplicated:  jobOfferApp ? true: false,
                });
            }else{
                this.setState( { 
                    jobOfferApp: [],
                    jobsOffers: [],
                    existsJobOfferApplicationResult: false,
                    bJobOfferApplicated: false,
                });
            }

        }
        
        if(nextProps.upsertJobOfferApplicationResult !== this.props.upsertJobOfferApplicationResult){
            //console.log(nextProps.existsJobOfferApplicationResult);
            this.setState( { upsertJobOfferApplicationResult: nextProps.upsertJobOfferApplicationResult});

            //const { upsertJobOfferApplicationResult } = this.state;
            //console.log(existsJobOffer);

            if(nextProps.upsertJobOfferApplicationResult){
                //console.log(nextProps.upsertJobOfferApplicationResult.data);
                setTimeout(() => {
                    this.props.history.push({
                        pathname: `/area/postulante/ofertas`,
                        //search: '?idJobOffer=' + row.idGuid,
                        state: { }
                    });
                }, 2000);

                this.dismissNotify();
            }
        }
    }

    // Event Controls UI

    onClick_Postular = (params) => {
        //alert(params.idJobOffer);

        this.props.upsertJobOfferApplication(
            {
                id: null,
                preguntasRespuestas: this.state.questionAndAnswers,
                frk_OfertasEmpleosPublic: {
                    "id": params.idJobOffer,
                    "collectionName": "ofertasEmpleosPublic"
                  }
            }
        );
    }

    toastId = null;

    notify = (msj) => { 
        
        this.toastId = toast.info(msj, {
            position: toast.POSITION.BOTTOM_RIGHT/*,
            autoClose: 3000*/
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

        //console.log(this.state.questionAndAnswers);
        const { jobsOffers, jobOfferApp } = this.state;

        if(jobOfferApp && jobsOffers){

            let valuesForm = {};

            if(jobsOffers.preguntas){
                for(let i = 0; i < jobsOffers.preguntas.length; i++) {
                    valuesForm[`respuesta_${i}`] = "";   
                }
            }
            
            return (
                <div className="animated fadeIn">
                    
                    <Row className="justify-content-center">
                        <Col xs="12" md="8">
                    <ToastContainer></ToastContainer>
                    <CustomModal
                    isOpen={this.state.modal} 
                    toggle={this.toggleModal} 
                    classNameModal={this.state.classNameModal}
                    titleModal={this.state.titleModal}
                    contentModal={this.state.contentModal}
                    ></CustomModal>
                    <Card>
                        <CardHeader>
                            <div className="d-flex justify-content-center">
                                {this.state.bJobOfferApplicated ? 
                                <Badge color="danger"><h4>Ya postuló a esta oferta de empleo</h4></Badge>   
                                : <Badge color="success"><h4>"Postular a la oferta de empleo"</h4></Badge> }
                                
                            </div>
                            <div>
                                <h5>Puesto: {jobsOffers.puesto}</h5>
                                <h6>Empleador: {

                                        jobsOffers.empleador ? 
                                        (jobsOffers.empleador.bPersonaJuridica ? jobsOffers.empleador.nombreComercialEmpresa 
                                            : "Persona Natural" ) : ""

                                }</h6>
                            </div>
                            <Row> 
                                <Col xs="12">
                                    <span style={{whiteSpace: "pre-wrap"}}>Lugar de Trabajo</span>
                                    
                                    { 
                                        jobsOffers.placeToWork === 2 &&
                                        <>
                                            <div>
                                                { jobsOffers.bRemotoTodoMundo && <span><i className="fa fa-check text-success">&nbsp;</i>De cualquier parte del mundo</span> }
                                            </div>
                                            <div className="mb-2">
                                                {
                                                    !jobsOffers.bRemotoTodoMundo &&

                                                        jobsOffers.allowPlacesToWorkRemotly.map((item,index) =>{

                                                        return(
                                                            <div key={index} >
                                                                <i className="fa fa-check text-success">&nbsp;</i>
                                                                <em>País:&nbsp;</em>{item.country ? item.country.label : 's/i'}
                                                                {   item.region && 
                                                                    <><em>, Región:&nbsp;</em><span>{item.region.label}</span></>
                                                                }
                                                                {   item.commune && 
                                                                    <><em>, Comuna:&nbsp;</em><span>{item.commune.label}</span></>
                                                                }
                                                                {   item.cityRemoteWork && 
                                                                    <><em>, Ciudad:&nbsp;</em><span>{item.cityRemoteWork}</span></>
                                                                }
                                                                {   item.addressRemoteWork && 
                                                                    <><em>, Dirección:&nbsp;</em><span>{item.addressRemoteWork}</span></>
                                                                }
                                                            
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                            {/* <div>
                                                {
                                                    jobsOffers.obsRemote &&
                                                    <>
                                                        <span style={{whiteSpace: "pre-wrap"}}><u>Observaciones</u></span>
                                                        <p className="text-justify" style={{whiteSpace: "pre-wrap"}}>{jobsOffers.obsRemote   }</p>
                                                    </>
                                                }
                                                
                                            </div> */}
                                        </>
                                    }
                                    {
                                        jobsOffers.placeToWork === 1 &&
                                        <>
                                            <div className="mb-2">
                                                <i className="fa fa-check text-success">&nbsp;</i>
                                                <em>País:&nbsp;</em>{jobsOffers.allowPlaceToWorkOnSite.country.label}
                                                {   jobsOffers.allowPlaceToWorkOnSite.region && 
                                                    <><em>, Región:&nbsp;</em><span>{jobsOffers.allowPlaceToWorkOnSite.region.label}</span></>
                                                }
                                                {   jobsOffers.allowPlaceToWorkOnSite.commune && 
                                                    <><em>, Comuna:&nbsp;</em><span>{jobsOffers.allowPlaceToWorkOnSite.commune.label}</span></>
                                                }
                                                {   jobsOffers.allowPlaceToWorkOnSite.cityWork && 
                                                    <><em>, Ciudad:&nbsp;</em><span>{jobsOffers.allowPlaceToWorkOnSite.cityWork}</span></>
                                                }
                                                {   jobsOffers.allowPlaceToWorkOnSite.addressWork && 
                                                    <><em>, Dirección:&nbsp;</em><span>{jobsOffers.allowPlaceToWorkOnSite.addressWork}</span></>
                                                }
                                            
                                            </div>
                                            <div>
                                                {
                                                    jobsOffers.allowPlaceToWorkOnSite.obsPresencial &&
                                                    <>
                                                        <span style={{whiteSpace: "pre-wrap"}}><u>Observaciones</u></span>
                                                        <p className="text-justify" style={{whiteSpace: "pre-wrap"}}>{jobsOffers.allowPlaceToWorkOnSite.obsPresencial   }</p>
                                                    </>
                                                }
                                                
                                            </div>
                                        </>
                                    }
                                
                                </Col>
                            </Row>
                        </CardHeader>
                        <CardBody>
                            <div>
                            
                                {
                                    (!jobsOffers.preguntas  ||  jobsOffers.preguntas.length <= 0) &&
                                    <strong>No hay preguntas que responder.</strong>     
                                }
                                <Formik
                                    enableReinitialize={false}
                                    initialValues={valuesForm}
                                    validate={ (values) => {
                                        let errors = {};

                                        if(isIterable(jobsOffers.preguntas)){
                                            for(let i = 0; i < jobsOffers.preguntas.length; i++){
                                                if(!values[`respuesta_${i}`]){
                                                    errors[`respuesta_${i}`] = `Debe contestar esta pregunta: ${jobsOffers.preguntas[i]}`;
                                                }
                                            }
                                        }
                                        
                                        var listError = Object.keys(errors);
                                        //console.log(listError.length);
                                        if(this.isValidatingForm && listError.length > 0){
                                            this.isValidatingForm = false;
                        
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

                                        this.isValidatingForm = false;

                                        this.setSubmitting = setSubmitting;
                                        this.setSubmitting(false);

                                        this.notify("Actualizando datos...");

                                        this.onClick_Postular({idJobOffer: this.state.idJobOffer });
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
                                        validateForm,
                                        submitForm, 
                                        /* and other goodies */
                                    }) => {
                                        
                                        this.submitForm = submitForm;

                                    
                                        return (
                                        <FormFormik onSubmit={handleSubmit}>
                                            {   jobsOffers.preguntas && isIterable(jobsOffers.preguntas) &&
                                                jobsOffers.preguntas.map((item, index) => {
                                                    
                                                    let qa = null;

                                                    if( this.state.jobOfferApp && isIterable( this.state.jobOfferApp.preguntasRespuestas)){
                                                        qa = this.state.jobOfferApp.preguntasRespuestas.find((item2) => 
                                                            item2.question === item
                                                        );

                                                        values[`respuesta_${index}`] = qa ? qa.answer : "";
                                                    }
                                                    //console.log(index);
                                                return(
                                                        <Row key={index}>
                                                            <Col xs="12">
                                                                <FormGroup>
                                                                    <Label htmlFor={`respuesta_${index}`}>Pregunta: {item}<i className="text-danger">★</i></Label>
                                                                    <Input type="textarea" id={`respuesta_${index}`}
                                                                        rows="9"
                                                                        name={`respuesta_${index}`}
                                                                        onChange={(e) => {

                                                                            const answers = {...this.state.answers};

                                                                            answers[`respuesta_${index}`] = e.target.value;

                                                                            this.setState({answers} );

                                                                            let result = this.state.questionAndAnswers.find(item => item.id === index);

                                                                            if(!result){

                                                                                let oldList = [...this.state.questionAndAnswers];
                                                                                
                                                                                oldList.push({
                                                                                    id: index,
                                                                                    question: item,
                                                                                    answer: e.target.value
                                                                                });

                                                                                this.setState({ questionAndAnswers : oldList});
                                                                            }else{
                                                                                const newQuestionAndAnswer = {
                                                                                    id: index,
                                                                                    question: item,
                                                                                    answer: e.target.value
                                                                                };

                                                                                let newList = [...this.state.questionAndAnswers.filter(element =>{
                                                                                    return element.id !== index;
                                                                                })];

                                                                                newList.push(newQuestionAndAnswer);

                                                                                this.setState({ questionAndAnswers : newList});
                                                                            }
                                                                        
                                                                            return setFieldValue(`respuesta_${index}`,e.target.value);
                                                                        }}
                                                                        onBlur={handleBlur}
                                                                        value={values[`respuesta_${index}`] || ''}
                                                                        placeholder='Escriba la respuesta la pregunta planteada.'
                                                                        valid={values[`respuesta_${index}`] !== '' && touched[`respuesta_${index}`] }
                                                                        invalid={errors[`respuesta_${index}`] !== undefined && touched[`respuesta_${index}`] } disabled={this.state.bJobOfferApplicated} ></Input>
                                                                    <FormFeedback className="help-block">
                                                                        {errors[`respuesta_${index}`] && touched[`respuesta_${index}`] ? errors[`respuesta_${index}`]: ""}
                                                                    </FormFeedback>
                                                                    <p className= { values[`respuesta_${index}`] && values[`respuesta_${index}`].length > 1000 ? "text-danger small" :"small"}>
                                                                        {values[`respuesta_${index}`] ? values[`respuesta_${index}`].length + " / 1000" : "0 / 1000" }</p>
                                                                </FormGroup>
                                                            </Col>
                                                        </Row>
                                                )
                                                })
                                            }
                                        </FormFormik>
                                        );
                                    }}
                                </Formik>

                            </div>
                        </CardBody>
                        <CardFooter>
                            <div className="d-flex justify-content-center">
                                <Button disabled={this.state.bJobOfferApplicated} color="success" type="button"  onClick={(e) => { 
                                        
                                        if(this.state.idJobOffer){
                                            
                                            if(this.submitForm){
                                                this.isValidatingForm = true;
                                                this.submitForm();
                                            }
                                        }
                                    }} >
                                    <div className="align-self-center">
                                        <span role="img" aria-label="Previsualizar Oferta de Empleo">💼</span>&nbsp;Postular al Empleo
                                    </div>
                                </Button>
                            </div>
                        </CardFooter>
                    </Card>
                    </Col>

                </Row>
                </div>
            );

        }else{
            return(
                <div className="animated fadeIn">
                    <Row className="justify-content-center">
                        <Col xs="12" md="8">
                            <div>Cargando...</div>
                        </Col>
                    </Row>
                </div>
            );

        }
    }
}

const mapStateToProps = state => ({
    jobsOffersListForApplication: state.jobsOffers.jobsOffersList,
    existsJobOfferApplicationResult: state.jobsOffersApplication.existsJobOfferApplication,
    upsertJobOfferApplicationResult: state.jobsOffersApplication.createJobOfferApplicacion,
    getJobOfferApplicacionListData: state.jobsOffersApplication.getJobOfferApplicacionListData
});


export default connect(mapStateToProps, { 
    getJobsOffersPublics,
    existsJobOfferApplication,
    upsertJobOfferApplication,
    getJobsOffersApplicationList
})(JobOfferApplication);
