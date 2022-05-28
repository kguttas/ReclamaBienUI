import React, { Component } from 'react';
import { isIterable } from '../../utiles';
import { 
    // Alert, 
    
    Button,
    Card,
    //Label,
    //FormFeedback, 
    //FormGroup, 
    CardHeader,
    CardBody,   
    CardFooter,
    Col, 
    //Input,
    Modal, 
    ModalBody, 
    ModalFooter,
    ModalHeader, 
    Row, 
    Badge,
    UncontrolledCollapse ,
    // ButtonDropdown, 
    // DropdownItem, 
    // DropdownMenu, 
    // DropdownToggle
} from 'reactstrap';
import moment from 'moment-timezone';
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import CustomCVPreview from '../../components/UI/CustomCVPreview';
import { stateJobApplication } from '../../data/enums';
import uuidv5 from 'uuid/v5';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
//import { webConfig } from '../../GlobalConfig';
// Redux
import { connect } from 'react-redux';
import { getJobsOffersApplicationList, createStateJobApplication } from '../../actions/jobsOffersApplicationAction'
import { getCVById } from '../../actions/cvActions';
import { isMobile } from 'react-device-detect';

class jobApplications extends Component {

    constructor(props) {
        super(props);

        this.tz = moment.tz.guess();
    
        this.state = {

            /**
			 * Modal
			 */
            modal: false,
            modalSize: '',
            modalMsjButttoOk: 'Entendido!',
            classNameModal: "",
            titleModal: "",
            contentModal: <div></div>,
            hiddenFooterModal: false,
            modalShowDiscartButton: false,
            modalSubmitButton: false,
            
            // Data
            jobOfferApp: [],
            msgLoadData: "Buscando postulaciones",
            jobOffer: null,
        }

        this.previewCVFormat = this.previewCVFormat.bind(this);
        this.setOpenModal = this.setOpenModal.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.setStateJobApplication = this.setStateJobApplication.bind(this);
    }

    componentDidMount(){

        const { idJobOffer } = this.props.match.params;

        if(idJobOffer){
            this.props.getJobsOffersApplicationList({ idJobOffer });
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextState){

        if(nextProps.getJobOfferApplicacionListData !== this.props.getJobOfferApplicacionListData){
            
            const { data } = nextProps.getJobOfferApplicacionListData;

            if(data && isIterable(data.data)){

                const jobOfferApp = [...data.data];
                
                const jobOffer = jobOfferApp && jobOfferApp.length > 0 ? jobOfferApp[0].ofertaEmpleoPublica : null;

                //console.log(jobOfferApp);

                this.setState( { 
                    jobOfferApp,
                    jobOffer,
                    msgLoadData: ""
                });
            }else{
                this.setState( { 
                    jobOfferApp: [],
                    msgLoadData: "No se han encontrado postulaciones."
                });
            }

        }

        if(nextProps.cvById !== this.props.cvById){
            
            const { cvById } = nextProps;
            //console.log(cvById);
            const cv = cvById.cvById;
            const postulant = cvById.postulantById;

            
           
            if(cv.data && cv.data.cv && postulant.data && postulant.data.postulant){

                const cvData =cv.data.cv;
                const postulantData = postulant.data.postulant;

                //console.log(postulantData);

                const content = <CustomCVPreview dataForm={{...cvData}} postulant={{...postulantData}}></CustomCVPreview>
            
                this.setOpenModal(true, 'lg', 'Listo!', 'modal-info', "Previsualización Curriculum Vitae", content, false, false);

            }

        }

        if(nextProps.jooApplicationNewState !== this.props.jooApplicationNewState){
            this.dismissNotify();
        }
        
    }

    setOpenModal = (isOpen, size, modalMsjButttoOk,classNameModal, titleModal,contentModal,hiddenFooterModal = false, modalShowDiscartButton = false, modalSubmitButton = false) => {
        this.setState({
          modal: isOpen,
          modalSize: size,
          modalMsjButttoOk: modalMsjButttoOk,
          classNameModal: classNameModal,
          titleModal: titleModal,
          contentModal: contentModal,
          hiddenFooterModal: hiddenFooterModal,
          modalShowDiscartButton: modalShowDiscartButton,
          modalSubmitButton: modalSubmitButton
        });
    }

    submitAddNewJobExperience = (obj, data, callback) => {
        this.state.submitThisForm({ callback });
    }
    
    toggleModal = () => {
        this.setState({
          modal: !this.state.modal
        });
    }

    previewCVFormat = (e, cv, postulant) => {
        e.preventDefault();

        
        //console.log( cv.id);

        this.props.getCVById({idCV: cv.id, idPostulant: postulant.id}); 
    }

    setStateJobApplication = (e, stateJobApp, data) => {
       
        const idJobApplication = data.id;

        let jobApplication = {...this.state.jobOfferApp.find((item) => {
            return item.id === idJobApplication;
        })};

        let newJobOfferApp = [...this.state.jobOfferApp.filter((item) => {
            return item.id !== idJobApplication;
        })];

        let estado = [...jobApplication.estado];

        let compare = function (a, b) {

            if (!a.avance ) {
                return 1;
            }

            if (!b.avance) {
                return -1;
            }
          
            if (a.avance  < b.avance) {
                return 1;
            }
            if (a.avance > b.avance) {
                return -1;
            }
            return 0;
        }

        estado.sort(compare);

        //console.log(stateJobApp);
        //console.log(estado[0].estado); // Ultimo estado

        if(isIterable(estado)){

            let avance = estado[0].avance + 1;
            let finalEstado = '';
            
            if(stateJobApplication.PROCESO === stateJobApp){
                finalEstado = stateJobApplication.PROCESO;
                 
            }else if(stateJobApplication.FINALISTA === stateJobApp){
                finalEstado = stateJobApplication.FINALISTA;
            }else if(stateJobApplication.DESCARTADO === stateJobApp){
                finalEstado = stateJobApplication.DESCARTADO;
            }else if(stateJobApplication.CERRADA === stateJobApp){
                finalEstado = stateJobApplication.CERRADA;
            }else if(stateJobApplication.VISTO === stateJobApp && estado[0].estado === stateJobApplication.POSTULADA){
                finalEstado = stateJobApplication.VISTO;
            }else if(stateJobApplication.POSTULADA === stateJobApp){
                finalEstado = stateJobApplication.POSTULADA;
            }
            
            if(finalEstado === ''){
                finalEstado = estado[0].estado;
               
            }else{
                
                this.notify("Actualizando datos...");

                this.props.createStateJobApplication({
                    id:idJobApplication,
                    state: finalEstado
                });
            }
            
            estado.push({
                avance: avance,
                estado: finalEstado,
                fecha: new Date(),
                id: uuidv5(Math.random().toString(),'1b671a64-40d5-491e-99b0-da01ff1f3341')
            });
        }

        
        //console.log(estado);
        jobApplication.estado = [...estado];
        //console.log(jobApplication);

        newJobOfferApp.push(jobApplication);
        //console.log(newJobOfferApp);

        let compareFechaPostulacion = function (a, b) {
            if (a.fechaPostulacion < b.fechaPostulacion) {
                return 1;
            }
            if (a.fechaPostulacion > b.fechaPostulacion) {
                return -1;
            }
            return 0;
        }

        newJobOfferApp.sort(compareFechaPostulacion);

        this.setState({
            jobOfferApp: [...newJobOfferApp]
        });
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

    render() {

        const { jobOffer } = this.state;

        //console.log(this.state.jobOfferApp);

        return (
            <div className="animated fadeIn">
				
				<Row className="justify-content-center">
					<Col xs="12" md="8">
                        <Card>
                            <CardHeader>
                                <h4>Postulaciones Realizadas - { jobOffer ? jobOffer.puesto + " - Código: " + jobOffer.codigo: null}</h4>
                            </CardHeader>
                            <CardBody>
                                
                                {
                                    this.state.jobOfferApp && isIterable(this.state.jobOfferApp) && this.state.jobOfferApp.length > 0 ? 
                                    this.state.jobOfferApp.map((item,index) => {

                                        //const jobOffer = {...item.ofertaEmpleoPublica};
                                        //const employer = {...item.empleador};
                                        const postulant = {...item.postulante};
                                        const cv = {...item.cV};

                                        const { estado } = item;

                                        let years = null; 

                                        if(postulant && postulant.fechaNacimiento){
                                            let now = moment(); //todays date
                                            let end = moment(postulant.fechaNacimiento); // another date
                                            let duration = moment.duration(now.diff(end));
                                            
                                            //let months = Math.floor(duration.asMonths() % 12);
                                            years = Math.floor(duration.asYears()); 
                                        }

                                        let compare = function (a, b) {
                                            
                                            if (!a.avance ) {
                                                return 1;
                                            }

                                            if (!b.avance) {
                                                return -1;
                                            }
                                            
                                            if (a.avance  < b.avance) {
                                                return 1;
                                            }
                                            if (a.avance > b.avance) {
                                                return -1;
                                            }
                                            return 0;
                                        }

                                        //console.log(estado);

                                        let newEstado = [...estado];
                                        newEstado.sort(compare);

                                        const estadoActual = newEstado[0].estado;

                                        
                                        let progressState = 0;

                                        let finalState = "Finalizada";

                                        switch(estadoActual){
                                            case stateJobApplication.VISTO:
                                                progressState = 33.3333;
                                                break;
                                            case stateJobApplication.PROCESO:
                                                progressState = 66.6666;
                                                break;
                                            case stateJobApplication.FINALISTA:
                                                progressState = 100.0;
                                                finalState = "Finalista";
                                                break;
                                            case stateJobApplication.DESCARTADO:
                                                progressState = 100.0;
                                                finalState = "Descartado";
                                                break;
                                            case stateJobApplication.CERRADA:
                                                progressState = 100.0;
                                                finalState = "Cerrado";
                                                break;
                                            default:
                                                progressState = 0;
                                                finalState = "Finalizada";
                                                break;
                                        }

                                        
                                        return(
                                            <Row key={index}  className="animated fadeIn">
                                                <Col xs="12">
                                                    <Card>
                                                        <CardHeader>
                                                            
                                                            <div className="d-md-flex justify-content-between">
                                                                <h5>{cv.titulo}</h5>
                                                                <Button color="success" block={isMobile} onClick={(e)=>{ 
                                                                    //this.setStateJobApplication(e, stateJobApplication.VISTO, item);
                                                                    return this.previewCVFormat(e, cv, postulant);
                                                                    }}>
                                                                    <div className="align-self-center">
                                                                        <span role="img" aria-label="Ver CV">📋</span>&nbsp;Ver CV
                                                                    </div>
                                                                </Button>
                                                            </div>
                                                            <strong>{ postulant.nombrePersona + " " + postulant.apellidoPersona  }</strong>
                                                            <div>
                                                                Edad: {years ? years : 's/i'}
                                                            </div>
                                                            <div>
                                                                {/* <i className="fa fa-check text-success">&nbsp;</i> */}
                                                                <em>País:&nbsp;</em>{postulant.pais && postulant.pais}
                                                                {   postulant.region && 
                                                                    <><em>, Región:&nbsp;</em><span>{postulant.region && postulant.region}</span></>
                                                                }
                                                                {   postulant.comuna && 
                                                                    <><em>, Comuna:&nbsp;</em><span>{postulant.comuna && postulant.comuna}</span></>
                                                                }
                                                            </div>
                                                            <div className="mt-2">
                                                                <p>
                                                                    { cv.descripcion.length > 128 ? cv.descripcion.substring(0,128) + "..." :  cv.descripcion }
                                                                </p>
                                                            </div>
                                                            
                                                                                                                        
                                                        </CardHeader>
                                                        <CardBody>
                                                        
                                                                {
                                                                    item.preguntasRespuestas && item.preguntasRespuestas.length > 0 ?
                                                                    <Button color="primary" id={`togglerPR_${index}`} style={{ marginBottom: '1rem' }} block={isMobile}>
                                                                        Ver Preguntas / Respuestas
                                                                    </Button>
                                                                    : null
                                                                }
                                                           
                                                            
                                                           
                                                                {
                                                                    item.preguntasRespuestas && item.preguntasRespuestas.length > 0 ?
                                                                    <UncontrolledCollapse toggler={`#togglerPR_${index}`}>
                                                                        {
                                                                            item.preguntasRespuestas.map( (pr, index) => {

                                                                                return(
                                                                                    <div key={index}>
                                                                                        <span><em>{(index + 1) + ". " + pr.question}</em></span>
                                                                                        <p className="text-justify" style={{whiteSpace: "pre-wrap"}}>{pr.answer}</p>
                                                                                    </div>
                                                                                )

                                                                            })
                                                                        }
                                                                    </UncontrolledCollapse>
                                                                    :null
                                                                }
                                                            
                                                            
                                                            <Row>

                                                                <Col xs="12" className="px-5" >
                                                               
                                                        <ProgressBar
                                                            filledBackground="linear-gradient(to right, #63c2de, #20a8d8)"
                                                            percent={progressState}
                                                            >
                                                            <Step transition="skew" transitionDuration={0}>
                                                                {({ accomplished, index }) => (
                                                                <div
                                                                    className={`transitionStep ${accomplished ? "accomplished" : null}`}
                                                                >
                                                                    <Badge pill color={ estadoActual === 'postulada' ? "danger": "warning"}><span style={{fontSize: "1.2em"}}>Postulación</span></Badge>
                                                                    
                                                                </div>
                                                                )}
                                                            </Step>
                                                            <Step transition="skew" transitionDuration={0}>
                                                                {({ accomplished, index }) => (
                                                                <div
                                                                    className={`transitionStep ${accomplished ? "accomplished" : null}`}
                                                                >
                                                                    <Badge pill color={ estadoActual === 'visto' ? "danger": "warning"}><span style={{fontSize: "1.2em"}}>CV Visto</span></Badge>
                                                                </div>
                                                                )}
                                                            </Step>
                                                            <Step transition="skew" transitionDuration={0}>
                                                                {({ accomplished, index }) => (
                                                                <div
                                                                    className={`transitionStep ${accomplished ? "accomplished" : null}`}
                                                                >
                                                                    <Badge pill color={ estadoActual === 'proceso' ? "danger": "warning"}><span style={{fontSize: "1.2em"}}>En Proceso</span></Badge>
                                                                </div>
                                                                )}
                                                            </Step>
                                                            <Step transition="skew" transitionDuration={0}>
                                                                {({ accomplished, index }) => (
                                                                <div
                                                                    className={`transitionStep ${accomplished ? "accomplished" : null}`}
                                                                >
                                                                    <Badge pill color={ estadoActual === 'finalista' || estadoActual === 'descartado' || estadoActual === 'cerrada' ? "danger": "warning"}><span style={{fontSize: "1.2em"}}>{finalState}</span></Badge>
                                                                </div>
                                                                )}
                                                            </Step>
                                                           
                                                            </ProgressBar>
                                                            </Col>
                                                            </Row>
                                                        </CardBody>
                                                        <CardFooter>
                                                            
                                                            <div className="d-md-flex justify-content-between">
                                                                <div>
                                                                <span><em>Fecha de postulación&nbsp;</em>
                                                                    <Badge pill color="success">{moment(item.fechaPostulacion).tz(this.tz)/*.utcOffset(webConfig.utcOffset)*/.format('DD/MM/YYYY, HH:mm:ss') }</Badge>
                                                                    </span>
                                                                </div>
                                                                <div>
                                                                <Button color="primary" className="mr-md-2" block={isMobile} onClick={(e)=>{ this.setStateJobApplication(e, stateJobApplication.POSTULADA, item); }}>
                                                                        <div className="align-self-center">
                                                                            <span role="img" aria-label="Visto">💼</span>&nbsp;A Postulada
                                                                        </div>
                                                                </Button>
                                                                <Button color="info" className="mr-md-2" block={isMobile} onClick={(e)=>{ this.setStateJobApplication(e, stateJobApplication.VISTO, item); }}>
                                                                        <div className="align-self-center">
                                                                            <span role="img" aria-label="Visto">📋</span>&nbsp;A Visto
                                                                        </div>
                                                                </Button>
                                                                <Button color="danger" className="mr-md-2" block={isMobile} onClick={(e)=>{ this.setStateJobApplication(e, stateJobApplication.DESCARTADO, item); }}>
                                                                        <div className="align-self-center">
                                                                            <span role="img" aria-label="En Proceso">❌</span>&nbsp;Descartado
                                                                        </div>
                                                                </Button>
                                                                <Button color="warning" className="mr-md-2" block={isMobile} onClick={(e)=>{ this.setStateJobApplication(e, stateJobApplication.PROCESO, item); }}>
                                                                        <div className="align-self-center">
                                                                            <span role="img" aria-label="En Proceso">👁️</span>&nbsp;En Proceso
                                                                        </div>
                                                                </Button>
                                                                <Button color="success" block={isMobile} onClick={(e)=>{ this.setStateJobApplication(e, stateJobApplication.FINALISTA, item); }}>
                                                                        <div className="align-self-center">
                                                                            <span role="img" aria-label="Finalista">✔️</span>&nbsp;Finalista
                                                                        </div>
                                                                </Button>
                                                            </div>
                                                            </div>

                                                            
                                                        </CardFooter>
                                                    </Card>
                                                </Col>
                                            </Row>
                                        );
                                    })
                                    
                                    
                                : <><h6>{this.state.msgLoadData}</h6></>
                                }

                            </CardBody>
                            <CardFooter>

                            </CardFooter>
                        </Card>
                    </Col>
                </Row>

                <Modal isOpen={this.state.modal} toggle={this.toggleModal} size={this.state.modalSize}  backdrop={"static"}
                    className={this.state.classNameModal + " " + this.props.className}>
                    <ModalHeader toggle={this.toggleModal}>{this.state.titleModal}</ModalHeader>
                    <ModalBody>
                        { this.state.contentModal }
                    </ModalBody>
                    <ModalFooter hidden={this.state.hiddenFooterModal}>
                        {
                            this.state.modalShowDiscartButton &&
                            <Button color="warning" onClick={this.toggleModal}>Descartar</Button>
                        }
                        &nbsp;
                        {
                            this.state.modalSubmitButton ?  
                            <Button color="success" onClick={(e)=>{  
                                //this.toggleModal();
                                return this.submitAddNewJobExperience(e, null, this.toggleModal);
                            }
                            }>{ this.state.modalMsjButttoOk }</Button> :
                            <Button color="info" onClick={this.toggleModal}>{ this.state.modalMsjButttoOk }</Button>
                        }
                        {' '}
                    </ModalFooter>
                </Modal>
                <ToastContainer></ToastContainer>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    getJobOfferApplicacionListData: state.jobsOffersApplication.getJobOfferApplicacionListData,
    jooApplicationNewState: state.jobsOffersApplication.jooApplicationNewState,
    cvById: state.cvPostulant.cvById,
});


export default connect(mapStateToProps, { 
    getJobsOffersApplicationList,
    createStateJobApplication,
    getCVById
})(jobApplications);