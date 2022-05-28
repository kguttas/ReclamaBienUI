import React, {Component} from 'react';
import { connect } from 'react-redux';
import CustomJobOfferPreview from '../../../components/UI/CustomJobOfferPreview';
import { isIterable } from '../../../utiles';
import { getJobsOffersPublics } from '../../../actions/jobsOffersActions';

import esLocale from 'moment/locale/es';
import moment from 'moment-timezone';
import { webConfig } from '../../../GlobalConfig';
import { 
    //Alert,
    //Badge,
    Card, 
    CardBody, 
    //CardFooter, 
    //CardHeader, 
    //Col, 
    //Collapse,
    //FormFeedback,
    //FormGroup,
    //Label,
    //Row, 
    //Button,
    //ButtonGroup,
    //ButtonToolbar,
    //Modal, 
    //ModalBody, 
    //ModalFooter,
    //ModalHeader,
    //Input,
    //InputGroup,
    //InputGroupAddon,
   
} from 'reactstrap';
import { Link } from 'react-router-dom';


class JobOffer extends Component {
    constructor(props) {
        super(props);

        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    
        } else {
            // production code
            window.dataLayer = window.dataLayer || [];
        
            function gtag(){
                window.dataLayer.push(arguments);
            }
        
            gtag('js', new Date());
        
            gtag('config', 'G-5Q43P7YZRQ');
        }

        moment.updateLocale("es", esLocale);

        this.state = { 

            dataJobOffer: null,
            idJobOffer: null
         };

        this.GetDataFromServiceJobsOffersPublicResult = this.GetDataFromServiceJobsOffersPublicResult.bind(this);
        this.SetContentPreviewJobOffer = this.SetContentPreviewJobOffer.bind(this);
        this.onClick_Postular = this.onClick_Postular.bind(this);
    }

    /*
    Lifecycle
    */

    componentDidMount(){
        const { idJobOffer } = this.props.match.params;

        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
            // dev code
        } else {
            // production code
            
            
        }
        //console.log(this.props.location.state.jobOfferData);

        //console.log(idJobOffer);
        if(idJobOffer){
            this.setState({idJobOffer});
            
            this.props.getJobsOffersPublics({id: idJobOffer});
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
    
        if(nextProps.jobsOffersList !== prevState.jobsOffersList){
            return { jobsOffersList: nextProps.jobsOffersList};
        }
        else return null;
    }

    componentDidUpdate(prevProps, prevState) {

        if (prevState.jobsOffersList !== this.state.jobsOffersList) {
            
            if(this.state.jobsOffersList && this.state.jobsOffersList.data && this.state.jobsOffersList.data.data){
                
                //console.log(this.state.jobsOffersList.data.data);

                const dataFromService = this.GetDataFromServiceJobsOffersPublicResult(this.state.jobsOffersList.data.data);

                const contentJobOffer = this.SetContentPreviewJobOffer(dataFromService);
               
                //console.log(dataFromService);

                this.setState({
                    dataJobOffer: dataFromService,
                    contentJobOffer: contentJobOffer
                });
            }else{
                this.setState({
                    dataJobOffer: null,
                    contentJobOffer: null
                });
            }
        }
    }    

    

    /*
    Methods 
    */
    GetDataFromServiceJobsOffersPublicResult = (data) => {

        let result = null;

        if(data){
            
            if(!isIterable(data)) return;
            const listJobsOffers = [...data];

            // Data for show in job offer
            listJobsOffers.forEach((item) => {
                const jobsOffersData = item;
                
                const selectCategoriaEmpleo =  jobsOffersData.categoriaEmpleo ? {value: jobsOffersData.categoriaEmpleo.id , label: jobsOffersData.categoriaEmpleo.label } : null;
                
                let auxConocimientosInformatica = null;
                if(jobsOffersData.conocimientosInformatica){
                    auxConocimientosInformatica = jobsOffersData.conocimientosInformatica.map((item) => {
                        return {value: item.id, label: item.label};
                    });
                    
                }

                let auxAllowPlacesToWorkRemotly = [];

                if(jobsOffersData.allowPlacesToWorkRemotly){
                    
                    auxAllowPlacesToWorkRemotly = jobsOffersData.allowPlacesToWorkRemotly.map((item) => {
                        let country = null;
                        if(item.country){
                            country = {
                                value: item.country.id,
                                label: item.country.label,
                            }
                        }

                        let region = null;
                        if(item.region){
                            region = {
                                value: item.region.id,
                                label: item.region.label,
                            }
                        }

                        let commune = null;
                        if(item.commune){
                            commune = {
                                value: item.commune.id,
                                label: item.commune.label,
                            }
                        }

                        return { id: item.id, addressRemoteWork: item.addressRemoteWork, cityRemoteWork: item.cityRemoteWork, country, region, commune};
                    });
                }
                
                let auxAllowPlaceToWorkOnSite = null;
                if(jobsOffersData.allowPlaceToWorkOnSite){

                    this.setState(prevState => ({
                        ...prevState,
                        isLoadingSelectPresencialPais: false,
                        isLoadingSelectPresencialRegiones: false,
                        isLoadingSelectPresencialComunas: false,
                    }));

                    auxAllowPlaceToWorkOnSite = {
                        id: null,
                        addressWork: jobsOffersData.allowPlaceToWorkOnSite.addressWork,
                        cityWork: jobsOffersData.allowPlaceToWorkOnSite.cityWork,
                        obsPresencial: jobsOffersData.allowPlaceToWorkOnSite.obsPresencial,
                        country: jobsOffersData.allowPlaceToWorkOnSite.country,
                        region: jobsOffersData.allowPlaceToWorkOnSite.region,
                        commune: jobsOffersData.allowPlaceToWorkOnSite.commune,
                    }
                    
                }

                let auxExperiences = [];

                if(jobsOffersData.experiencies){
                    auxExperiences = jobsOffersData.experiencies.map((item) => {
                        return { id: item.id, experience: item.experience, time: item.time };
                    });
                    
                }

                let auxProfesiones = [];

                if(jobsOffersData.profesiones){
                    auxProfesiones = jobsOffersData.profesiones.map((item) => {
                        return { value: item.id, label: item.label };
                    });
                }

                let auxNivelEducacional = null;
                if(jobsOffersData.nivelEducacional){
                    auxNivelEducacional = jobsOffersData.nivelEducacional.map((item) => {
                        return  { value: item.id, label: item.label};
                    });
                }

                const auxSituacionActualMinima = jobsOffersData.situacionActualMinima ? {
                    "value": jobsOffersData.situacionActualMinima.id,
                    "label": jobsOffersData.situacionActualMinima.label,
                } : null;

                

                let auxIdiomsRequire = null;
                if(jobsOffersData.idiomas){

                    auxIdiomsRequire = jobsOffersData.idiomas.map((item) => {
                        return  { id: item.id, idiom: { label: item.idioma}, nivel: { label: item.nivel}};
                    });
                }
                

                const auxTipoContrato = jobsOffersData.tipoContrato ? {
                    "value": jobsOffersData.tipoContrato.id,
                    "label": jobsOffersData.tipoContrato.label,
                } : null;


                const auxTipoMoneda = jobsOffersData.tipoMoneda ? {
                    "value": jobsOffersData.tipoMoneda.id,
                    "label": jobsOffersData.tipoMoneda.label,
                } : null;

                const auxTipoPago = jobsOffersData.tipoPago ? {
                    "value": jobsOffersData.tipoPago.id,
                    "label": jobsOffersData.tipoPago.label,
                } : null;

                const auxPeriodicidadPago = jobsOffersData.periodicidadPago ? {
                    "value": jobsOffersData.periodicidadPago.id,
                    "label": jobsOffersData.periodicidadPago.label,
                } : null;

                let auxQuestionList = [];

                if(jobsOffersData.preguntas){
                    auxQuestionList = jobsOffersData.preguntas.map((item, index) => {
                        return {id: index, question: item};
                    });
                }

                let auxObservationsList = [];
                
                if(jobsOffersData.observaciones){
                    auxObservationsList = jobsOffersData.observaciones.map((item, index) => {
                        return item;
                    });
                }
                
                const auxDataForm =  {
                    id: jobsOffersData.id,
                    bPersonaJuridica:  jobsOffersData.empleador ? jobsOffersData.empleador.bPersonaJuridica : false,
                    cbEmpleadorConficencial: jobsOffersData.bEmpleadorConficencial,
                    descripcionEmpresaConfidencial: jobsOffersData.descripcionEmpresaConfidencial ? jobsOffersData.descripcionEmpresaConfidencial : '',
                    puesto: jobsOffersData.puesto ? jobsOffersData.puesto : '',
                    descripcionPuesto: jobsOffersData.descripcion ? jobsOffersData.descripcion : '',
                    selectCategoriaEmpleo: selectCategoriaEmpleo,
                    cbDiscapacidad: jobsOffersData.bDiscapacidad ? jobsOffersData.bDiscapacidad : false,
                    cbInformatica: jobsOffersData.bInformatica ? jobsOffersData.bInformatica : false,
                    informatica: auxConocimientosInformatica,
                    placeToWork: jobsOffersData.placeToWork,
                    cbRemotoTodoMundo: jobsOffersData.bRemotoTodoMundo ? jobsOffersData.bRemotoTodoMundo : false,
                    obsRemote: jobsOffersData.obsRemote ? jobsOffersData.obsRemote : '',
                    allowPlacesToWorkRemotly: auxAllowPlacesToWorkRemotly,
                    selectPresencialPais: auxAllowPlaceToWorkOnSite && auxAllowPlaceToWorkOnSite.country ? { value: auxAllowPlaceToWorkOnSite.country.id, label: auxAllowPlaceToWorkOnSite.country.label } : '',
                    selectPresencialRegion: auxAllowPlaceToWorkOnSite && auxAllowPlaceToWorkOnSite.region ? { value: auxAllowPlaceToWorkOnSite.region.id, label: auxAllowPlaceToWorkOnSite.region.label } : '',
                    selectPresencialComuna: auxAllowPlaceToWorkOnSite && auxAllowPlaceToWorkOnSite.commune ? { value: auxAllowPlaceToWorkOnSite.commune.id, label: auxAllowPlaceToWorkOnSite.commune.label } : '',

                    ciudadPresencial: auxAllowPlaceToWorkOnSite && auxAllowPlaceToWorkOnSite.cityWork ? auxAllowPlaceToWorkOnSite.cityWork : '',
                    direccionPresencial: auxAllowPlaceToWorkOnSite && auxAllowPlaceToWorkOnSite.addressWork ? auxAllowPlaceToWorkOnSite.addressWork : '',
                    obsPresencial: auxAllowPlaceToWorkOnSite && auxAllowPlaceToWorkOnSite.obsPresencial ? auxAllowPlaceToWorkOnSite.obsPresencial : '',
                
                    cbDisponibilidadViajar: jobsOffersData.bDisponibilidadViajar ? jobsOffersData.bDisponibilidadViajar : false,
                    cbSalidaTerreno: jobsOffersData.bSalidaTerreno ? jobsOffersData.bSalidaTerreno : false,
                    cbCambioResidencia: jobsOffersData.bCambioResidencia ? jobsOffersData.bCambioResidencia : false,
                    cbDisponibilidadInmediata: jobsOffersData.bDisponibilidadInmediata ? jobsOffersData.bDisponibilidadInmediata : false,
                    fechaComienzo: jobsOffersData.fechaComienzo,
                    profesiones: auxProfesiones,
                    nivelEducacional: auxNivelEducacional,
                    situacionActualMinima: auxSituacionActualMinima,
                    experiencies: auxExperiences,
                    aspectosPersonales: jobsOffersData.aspectosPersonales ? jobsOffersData.aspectosPersonales : '',
                    otrosRequisitos: jobsOffersData.otrosRequisitos ? jobsOffersData.otrosRequisitos : '',
                    idiomsRequire: auxIdiomsRequire,
                    vacantes: jobsOffersData.vacantes ? jobsOffersData.vacantes : 1,
                    tipoContrato: auxTipoContrato,
                    jornada: jobsOffersData.jornada ? jobsOffersData.jornada : '',
                    horario: jobsOffersData.horario ? jobsOffersData.horario : '',
                    acercaContratacion: jobsOffersData.acercaContratacion ? jobsOffersData.acercaContratacion : '',
                    cbRentaConvenir: jobsOffersData.bRentaConvenir ? jobsOffersData.bRentaConvenir : false,

                    cbMostrarRenta: jobsOffersData.bMostrarRenta,
                    rentaMaxima:  jobsOffersData.rentaMaxima ? jobsOffersData.rentaMaxima : 0,
                    tipoMoneda: auxTipoMoneda,
                    tipoPago: auxTipoPago,
                    periodicidadPago: auxPeriodicidadPago,
                    acercaPago: jobsOffersData.acercaPago ? jobsOffersData.acercaPago : '',
                    beneficios: jobsOffersData.beneficios ? jobsOffersData.beneficios : '',
                    cbHomeOffice: jobsOffersData.bHomeOffice ? jobsOffersData.bHomeOffice : false ,
                    cbHorarioFlexible: jobsOffersData.bHorarioFlexible ? jobsOffersData.bHorarioFlexible : false,
                    questionsList: auxQuestionList,
                    observationsList: auxObservationsList,
                    empleador: jobsOffersData.empleador,
                    fechaPublicado: jobsOffersData.fechaPublicado
                };
               
                result = {...auxDataForm};

            });
        }

        return result;
    }

    SetContentPreviewJobOffer = (dataFromService) => {

        if(!dataFromService) return null;
        //console.log(dataFromService);
        const { id, bPersonaJuridica, cbEmpleadorConficencial, descripcionEmpresaConfidencial, puesto, selectCategoriaEmpleo, descripcionPuesto, cbDiscapacidad, informatica, cbInformatica ,cbRemotoTodoMundo, obsRemote, 
            selectPresencialPais, selectPresencialRegion, selectPresencialComuna, ciudadPresencial, direccionPresencial, obsPresencial, cbDisponibilidadViajar, cbSalidaTerreno, cbCambioResidencia, cbDisponibilidadInmediata, fechaComienzo, 
            profesiones, nivelEducacional, situacionActualMinima, aspectosPersonales, otrosRequisitos,
            vacantes, tipoContrato, jornada, horario, acercaContratacion, cbRentaConvenir,
            cbMostrarRenta, rentaMaxima, tipoMoneda, tipoPago, periodicidadPago, acercaPago, beneficios, cbHomeOffice, cbHorarioFlexible, allowPlacesToWorkRemotly, idiomsRequire, questionsList, placeToWork, experiencies, empleador,fechaPublicado} = dataFromService || {};
       
       
        const auxAllowPlacesToWorkRemotly = isIterable(allowPlacesToWorkRemotly) ? allowPlacesToWorkRemotly.map((item) => {

            return {
                addressRemoteWork: item.addressRemoteWork,
                cityRemoteWork: item.cityRemoteWork,
                commune: item.commune ? item.commune.label : '',
                region: item.region ? item.region.label : '',
                country: item.country ? item.country.label : '',
            }

        }) : null;

        const auxProfesiones = isIterable(profesiones) ? profesiones.map((item) => {
            return item.label;
        }) : null;

        const auxNivelEducacional = isIterable(nivelEducacional) ? nivelEducacional.map((item) => {
            return item.label;
        }) : null;

        const auxIdiomsRequire = isIterable(idiomsRequire) ? idiomsRequire.map((item) => {
            return {idiom: item.idiom.label, nivel: item.nivel.label};
        }) : null;

        const auxQuestionsList = isIterable(questionsList) ? questionsList.map((item) => {
            return item.question;
        }) : null;

        const urlImageEmployer = empleador ? `${webConfig.urlImages}/${empleador.rutaLogoEmpresa}` : '#';

        let content = null;

        
            content = <CustomJobOfferPreview dataForm={{
                id,
                bPersonaJuridica: bPersonaJuridica ? bPersonaJuridica : false,
                bEmpleadorConficencial: cbEmpleadorConficencial,
                empresa: cbEmpleadorConficencial ? descripcionEmpresaConfidencial : empleador.nombreComercialEmpresa ,
                urlImgAvatar: urlImageEmployer,
                urlEmpresa: empleador.urlEmpresa ,
                puesto: puesto,
                descripcionPuesto: descripcionPuesto,
                categoriaEmpleo: selectCategoriaEmpleo ? selectCategoriaEmpleo.label : '',
                bDiscapacidad: cbDiscapacidad,
                informatica: (cbInformatica && informatica.map((item) => { return item.label;})) || null,
                placeToWork: placeToWork,
                bRemotoTodoMundo: cbRemotoTodoMundo,
                obsRemote: obsRemote,
                allowPlacesToWorkRemotly: auxAllowPlacesToWorkRemotly,

                selectPresencialPais: selectPresencialPais ? selectPresencialPais.label : null,
                selectPresencialRegion: selectPresencialRegion ? selectPresencialRegion.label : null,
                selectPresencialComuna: selectPresencialComuna ? selectPresencialComuna.label : null,
                ciudadPresencial: ciudadPresencial,
                direccionPresencial: direccionPresencial,
                obsPresencial: obsPresencial,
                bDisponibilidadViajar: cbDisponibilidadViajar,
                bSalidaTerreno: cbSalidaTerreno,
                bCambioResidencia: cbCambioResidencia,
                bDisponibilidadInmediata: cbDisponibilidadInmediata,
                fechaComienzo: fechaComienzo,
                fechaPublicado: fechaPublicado,
                experiencies: experiencies,
                profesiones: auxProfesiones,
                nivelEducacional: auxNivelEducacional,
                situacionActualMinima: situacionActualMinima ? situacionActualMinima.label : null,
                idiomsRequire: auxIdiomsRequire,
                aspectosPersonales: aspectosPersonales,
                otrosRequisitos: otrosRequisitos,
                vacantes, 
                tipoContrato: tipoContrato ? tipoContrato.label : null, 
                jornada, 
                horario, 
                acercaContratacion, 
                bRentaConvenir: cbRentaConvenir,
                bMostrarRenta: cbMostrarRenta,
                rentaMaxima: rentaMaxima,
                tipoMoneda: tipoMoneda ? tipoMoneda.label : null,
                tipoPago: tipoPago ? tipoPago.label : null,
                periodicidadPago: periodicidadPago ? periodicidadPago.label : null,
                acercaPago,
                beneficios,
                bHomeOffice: cbHomeOffice,
                bHorarioFlexible: cbHorarioFlexible,
                questionsList: auxQuestionsList
            }}
            onClick_Postular={this.onClick_Postular}
            ></CustomJobOfferPreview>
        

        return content;
    }

    /*
    Event UI
    */
 
    onClick_Postular = (e, data) => {
        e.preventDefault();
        //console.log(data.idJobOffer);

        if(data.idJobOffer){
            this.props.history.push({
                pathname: `/area/postulante/ofertas/${data.idJobOffer}/postular`,
                //search: '?idJobOffer=' + row.idGuid,
                state: { 
                    idJobOffer: data.idJobOffer,
                    urlRedirect: `/area/postulante/ofertas/${data.idJobOffer}/postular`
                }
            });
        }
    }

    render() {

        return (
            <>
        {
            this.state.contentJobOffer !== null ?
                <div>{this.state.contentJobOffer}</div>
            : 
            <Card>
                <CardBody>
                    <h4 className="text-center">No se encuentra disponible esta oferta de empleo</h4>
                    <div className="text-center">
                        <Link className="btn btn-success" to="/buscador">Seguir buscando</Link>
                    </div>
                </CardBody>
               
            </Card>
        }
            
              </>  
        );
    }
}

const mapStateToProps = state => ({
    jobsOffersList: state.jobsOffers.jobsOffersList
});

export default connect(mapStateToProps, { 
    getJobsOffersPublics
})(JobOffer);