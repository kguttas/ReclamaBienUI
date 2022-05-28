import React, { Component } from 'react';
import { isIterable } from '../../utiles';
import { 
    // Alert, 
    
    //Button,
    Card,
    //Label,
    //FormFeedback, 
    //FormGroup, 
    CardHeader,
    CardBody,   
    CardFooter,
    Col, 
    //Input,
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
import moment from 'moment-timezone';
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";

// Redux
import { connect } from 'react-redux';
import { getJobsOffersApplicationList } from '../../actions/jobsOffersApplicationAction'

class jobApplications extends Component {

    constructor(props) {
        super(props);

        this.tz = moment.tz.guess();
    
        this.state = {
            jobOfferApp: [],
            msgLoadData: "Buscando postulaciones",
           
        }
    }

    componentDidMount(){
        
        this.props.getJobsOffersApplicationList({});
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextState){

        if(nextProps.getJobOfferApplicacionListData !== this.props.getJobOfferApplicacionListData){
            
            const { data } = nextProps.getJobOfferApplicacionListData;

            if(data && isIterable(data.data)){

                const jobOfferApp = [...data.data];
                
                console.log(jobOfferApp);

                this.setState( { 
                    jobOfferApp,
                    msgLoadData: ""
                });
            }else{
                this.setState( { 
                    jobOfferApp: [],
                    msgLoadData: "No se han encontrado postulaciones."
                });
            }

        }
    }
    

    render() {
        return (
            <div className="animated fadeIn">
				
				<Row className="justify-content-center">
					<Col xs="12" md="8">
                        <Card>
                            <CardHeader>
                                <h4>Postulaciones Realizadas</h4>
                            </CardHeader>
                            <CardBody>
                                
                                {
                                    this.state.jobOfferApp && isIterable(this.state.jobOfferApp) && this.state.jobOfferApp.length > 0 ? 
                                    this.state.jobOfferApp.map((item,index) => {

                                        const jobOffer = {...item.ofertaEmpleoPublica};
                                        const employer = {...item.empleador};

                                        const { estado } = item;

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
                
                                        let newEstado = [...estado];
                                        newEstado.sort(compare);

                                        const estadoActual = newEstado[0].estado;

                                        let progressState = 0;

                                        let finalState = "Finalizada";

                                        switch(estadoActual){
                                            case 'visto':
                                                progressState = 33.3333;
                                                break;
                                            case 'proceso':
                                                progressState = 66.6666;
                                                break;
                                            case 'finalista' :
                                                progressState = 100.0;
                                                finalState = "Finalista";
                                                break;
                                            case 'descartado':
                                                progressState = 100.0;
                                                finalState = "Descartado";
                                                break;
                                            case 'cerrada':
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
                                                            <h5>{jobOffer.puesto}</h5>

                                                            { 
                                                                employer.bPersonaJuridica ?
                                                                <>
                                                                    <strong className="align-self-center">{employer.nombreComercialEmpresa}</strong>                                                                        
                                                                </> 
                                                               : null
                                                            }

                                                            
 { 
                            jobOffer.placeToWork === 2 &&
                            <>
                                <div>
                                    { jobOffer.bRemotoTodoMundo && <span><i className="fa fa-check text-success">&nbsp;</i>De cualquier parte del mundo</span> }
                                </div>
                                <div className="mb-2">
                                    {
                                        !jobOffer.bRemotoTodoMundo ?

                                            jobOffer.allowPlacesToWorkRemotly.map((item,index) =>{

                                            return(
                                                <div key={index} >
                                                    <i className="fa fa-check text-success">&nbsp;</i>
                                                    <em>País:&nbsp;</em>{item.country && item.country.label}
                                                    {   item.region && 
                                                        <><em>, Región:&nbsp;</em><span>{item.region && item.region.label}</span></>
                                                    }
                                                    {   item.commune && 
                                                        <><em>, Comuna:&nbsp;</em><span>{item.commune && item.commune.label}</span></>
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
                                        : null
                                    }
                                </div>
                                
                            </>
                        }
                        {
                            jobOffer.placeToWork === 1 && jobOffer.allowPlaceToWorkOnSite ?
                            <>
                                <div className="mb-2">
                                    <i className="fa fa-check text-success">&nbsp;</i>
                                    <em>País:&nbsp;</em>{jobOffer.allowPlaceToWorkOnSite.country.label}
                                    
                                
                                    {   jobOffer.allowPlaceToWorkOnSite.region.label && 
                                        <><em>, Región:&nbsp;</em><span>{jobOffer.allowPlaceToWorkOnSite.region.label}</span></>
                                    }

                                    {   jobOffer.allowPlaceToWorkOnSite.commune && 
                                        <><em>, Comuna:&nbsp;</em><span>{jobOffer.allowPlaceToWorkOnSite.commune.label}</span></>
                                    }
                                    {   jobOffer.allowPlaceToWorkOnSite.cityWork && 
                                        <><em>, Ciudad:&nbsp;</em><span>{jobOffer.allowPlaceToWorkOnSite.cityWork}</span></>
                                    }
                                    {   jobOffer.allowPlaceToWorkOnSite.addressWork && 
                                        <><em>, Dirección:&nbsp;</em><span>{jobOffer.allowPlaceToWorkOnSite.addressWork}</span></>
                                    }
                                    
                                </div>
                            </>
                            : null
                        }
                                                            
                                                        </CardHeader>
                                                        <CardBody>
                                                            <Row>

                                                                <Col xs="12" className="px-5" >
                                                                
                                                        <ProgressBar
                                                            filledBackground="linear-gradient(to right, #63c2de, #20a8d8)"
                                                            percent={progressState}
                                                            >
                                                            <Step transition="skew" transitionDuration={1000}>
                                                                {({ accomplished, index }) => (
                                                                <div
                                                                    className={`transitionStep ${accomplished ? "accomplished" : null}`}
                                                                >
                                                                    <Badge pill color={ estadoActual === 'postulada' ? "danger": "warning"}><span style={{fontSize: "1.2em"}}>Postulación</span></Badge>
                                                                </div>
                                                                )}
                                                            </Step>
                                                            <Step transition="skew" transitionDuration={1000}>
                                                                {({ accomplished, index }) => (
                                                                <div
                                                                    className={`transitionStep ${accomplished ? "accomplished" : null}`}
                                                                >
                                                                    <Badge pill color={ estadoActual === 'visto' ? "danger": "warning"}><span style={{fontSize: "1.2em"}}>CV Visto</span></Badge>
                                                                </div>
                                                                )}
                                                            </Step>
                                                            <Step transition="skew" transitionDuration={1000}>
                                                                {({ accomplished, index }) => (
                                                                <div
                                                                    className={`transitionStep ${accomplished ? "accomplished" : null}`}
                                                                >
                                                                    <Badge pill color={ estadoActual === 'proceso' ? "danger": "warning"}><span style={{fontSize: "1.2em"}}>En Proceso</span></Badge>
                                                                </div>
                                                                )}
                                                            </Step>
                                                            <Step transition="skew" transitionDuration={1000}>
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
                                                            <div>
                                                                <span><em>Fecha de postulación&nbsp;</em>
                                                                <Badge pill color="success">{moment(item.fechaPostulacion).tz(this.tz).format('DD/MM/YYYY, HH:mm:ss') }</Badge>
                                                                </span>
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
            </div>
        );
    }
}

const mapStateToProps = state => ({
    getJobOfferApplicacionListData: state.jobsOffersApplication.getJobOfferApplicacionListData
});


export default connect(mapStateToProps, { 
    getJobsOffersApplicationList
})(jobApplications);