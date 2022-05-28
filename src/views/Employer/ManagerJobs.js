import React, { Component } from 'react';
import { 
    //Alert,
    Badge,
    Card, 
    CardBody, 
    CardFooter, 
    CardHeader, 
    Col, 
    Collapse,
    FormFeedback,
    FormGroup,
    Label,
    Row, 
    Button,
    ButtonGroup,
    ButtonToolbar,
    Modal, 
    ModalBody, 
    ModalFooter,
    ModalHeader,
    Input,
    InputGroup,
    InputGroupAddon,
   
} from 'reactstrap';
import { AppSwitch } from '@coreui/react';
import ReactTooltip from 'react-tooltip';
import SimpleBar from 'simplebar-react';// or "import SimpleBar from 'simplebar';" if you want to use it manually.
import 'simplebar/dist/simplebar.css';
import '../../css/simpleBar.css';
import CustomJobOfferPreview from '../../components/UI/CustomJobOfferPreview';
import CustomPopover from '../../components/UI/CustomPopover';
/* Table Bootstrap 2 */

import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import Select from 'rc-select';
import 'rc-select/assets/index.css';
import '../../css/rc-pagination.css'
import { opcionesStateJobOffer } from '../../data/parameters';

import { Formik, Form as FormFormik } from 'formik';

//import '../../css/textSizes.css';

import {isMobile} from 'react-device-detect';

import CustomSelect from '../../components/UI/CustomSelect';

/**
 * Data Ranges
 */
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
//  import 'react-dates/lib/css/_datepicker.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';


import ThemedStyleSheet from 'react-with-styles/lib/ThemedStyleSheet';
import aphroditeInterface from 'react-with-styles-interface-aphrodite';
import DefaultTheme from 'react-dates/lib/theme/DefaultTheme';

import esLocale from 'moment/locale/es';
//import moment from 'moment';
import moment from 'moment-timezone';

import { isIterable } from '../../utiles';
//import 'moment/locale/es';
//import moment from 'moment/min/moment-with-locales';
//import Moment from 'react-moment';
/*
Moment.globalMoment = moment;
Moment.globalLocale = "es";
Moment.globalFormat = 'DD/MM/YYYY';
Moment.globalTimezone = 'America/Santiago';*/

import { webConfig } from '../../GlobalConfig';
import { getJobsOffers, createJobOffer, copyJobsOffers, disableJobsOffers } from '../../actions/jobsOffersActions';

// Redux
import { connect } from 'react-redux';


class ManagerJobs extends Component {

    columnsGridJobsOffers = [
        {
            dataField: 'actionButtons',
            isDummyField: true,
            text: 'Acciones',
            headerStyle: (colum, colIndex) => {
				return { width: '180px', textAlign: 'center' };
            },
            style: { 
                'whiteSpace': 'nowrap',
                "verticalAlign": "middle",
                textAlign: "center"
            },
            formatter: (cellContent, row) => {
                
                return(
                    <Row className="justify-content-center align-items-center">
                        <ReactTooltip id={"btnEditJobOffer_" + row.id}>
                        </ReactTooltip> 
                        <ReactTooltip id={"btnCopyJobOffer_" + row.id}>
                        </ReactTooltip>  
                        <ReactTooltip id={"btnDeleteJobOffer_" + row.id}>
                        </ReactTooltip>  
                        <ReactTooltip id={"btnViewPostulantJobOffer_" + row.id}>
                        </ReactTooltip>
                        <ReactTooltip id={"btnReviewJobOffer_" + row.id}>
                        </ReactTooltip>  
                        <ReactTooltip id={"btnPrivateJobOffer_" + row.id}>
                        </ReactTooltip>
                        <ButtonToolbar>
                            <ButtonGroup size="sm">
                                <Button disabled={row.estado === 'revision'} data-for={"btnEditJobOffer_" + row.id} data-tip={"Editar oferta cód: " +  row.codigo}  color="primary" onClick={(e) => { 
                                    
                                    this.props.history.push({
                                        pathname: `/area/empleador/ofertas/crearOferta/${row.idGuid}`,
                                        //search: '?idJobOffer=' + row.idGuid,
                                        state: { idJobOffer: row.idGuid }
                                    });
                                
                                } } >
                                    <i className="fa fa-edit"></i>
                                </Button>

                                <Button data-for={"btnCopyJobOffer_" + row.id} data-tip={"Copiar oferta cód: " +  row.codigo} color="secondary" onClick={(e) => { 
                                    this.onClick_CopyJobOffer(row);
                                } } >
                                    <i className="fa fa-copy"></i>
                                </Button>
                                
                               

                                <Button data-for={"btnViewPostulantJobOffer_" + row.id} data-tip={"Ver postulantes oferta cód: " +  row.codigo} color="success" onClick={(e) => { 
                                   this.props.history.push({
                                    pathname: `/area/empleador/ofertas/postulaciones/${row.idGuid}`,
                                    //search: '?idJobOffer=' + row.idGuid,
                                    state: { idJobOffer: row.idGuid }
                                });
                                    } } >
                                    <i className="fa fa-users"></i>
                                </Button>

                                <Button data-for={"btnReviewJobOffer_" + row.id} data-tip={"Ver oferta cód: " +  row.codigo} color="info" onClick={(e) => {
                                    
                                    this.previewJobOffer(row.idGuid); 
                                 } } >
                                    <i className="fa fa-file-text-o"></i>
                                </Button>

                                <Button data-for={"btnDeleteJobOffer_" + row.id} data-tip={( !row.bAnulado ? "Anular" : "Habilitar") + " oferta cód: " +  row.codigo} color="danger" onClick={(e) => { 
                                    this.onClick_DisableJobOffer(row);
                                } } >
                                    { !row.bAnulado ?  <i className="fa fa-eraser"></i> :  <i className="fa fa-check"></i>}
                                   
                                     
                                </Button>
{/* 
                                <Button data-for={"btnPrivateJobOffer_" + row.id} data-tip={"Cerrar oferta cód: " +  row.codigo} color="danger" onClick={(e) => { 
                                    this.onClick_CloseJobOffer(row);
                                } } >
                                    <i className="fa fa-eye-slash"></i>
                                </Button>
 */}
                                
                            </ButtonGroup>
                        </ButtonToolbar>
                    
                    </Row>
                );
                
            }
        },{
            dataField: 'id',
            text: 'Id',
            hidden: true,
            headerStyle: (colum, colIndex) => {
            return { width: '100px', textAlign: 'left' };
            },
            sort: true
        },{
            dataField: 'bAnulado',
            text: 'Anulado',
            hidden: true,
            headerStyle: (colum, colIndex) => {
            return { width: '100px', textAlign: 'left' };
            },
            sort: true
        },{
            dataField: 'codigo',
            text: 'Código',
            headerStyle: (colum, colIndex) => {
            return { width: '100px', textAlign: 'left' };
            },
            sort: true,
            style: { 'whiteSpace': 'nowrap',
            "verticalAlign": "middle"}
        }, {
            dataField: 'puesto',
            text: 'Puesto / Título Aviso',
            sort: true,
            
            headerStyle: (colum, colIndex) => {
            return { width: '300px', textAlign: 'left' };
            },
            style: { 'whiteSpace': 'wrap',
            "verticalAlign": "middle"}
        }, {
            dataField: 'fechaCreado',
            isDummyField: true,
            sort: true,
            text: 'F. Creada',
            headerStyle: (colum, colIndex) => {
				return { width: '250px', textAlign: 'center' };
			},
            formatter: (cellContent, row) => {

                if(row.fechaCreado){
                    
                    //var tz = moment.tz.guess();

                    return(
                        <div className="text-left">
                            {/* {  moment(row.fechaCreado).tz(tz).utcOffset(webConfig.utcOffset).format('D/M/YYYY, h:mm:ss a') } -  */}
                            {  moment(row.fechaCreado).format('DD/MM/YYYY, HH:mm:ss') }
                        </div>
                    );
                }

                return(
                    <div className="text-left">
                        No hay fecha
                    </div>
                );
                
            },
            style: {
                'whiteSpace': 'wrap',
                "verticalAlign": "middle"
            }
        }, {
            dataField: 'estado',
            isDummyField: true,
            sort: true,
            text: 'Estado',
            headerStyle: (colum, colIndex) => {
				return { width: '150px', textAlign: 'center' };
			},
            formatter: (cellContent, row) => {
                
                let estadoStr = '';
       
                switch(row.estado){
                    case 'editando':
                        estadoStr = 'Editando';
                        break;
                    case 'revision':
                        estadoStr = 'En revisión';
                        break;
                    case 'rejected':
                        estadoStr = 'Rechazada';
                        break;
                    case 'publish':
                        estadoStr = 'Publicada';
                        break;
                    default:
                        estadoStr = 'Sin estado';
                        break;
                }

                return(
                    <div className="text-left">
                        { estadoStr }
                    </div>
                );
                
            },
            style: {
                'whiteSpace': 'nowrap',
                "verticalAlign": "middle"
            }
        }, {
            dataField: 'cantidadPostulantes',
            
            sort: true,
            text: 'Postulantes',
            headerStyle: (colum, colIndex) => {
				return { width: '150px', textAlign: 'center' };
			},
            formatter: (cellContent, row) => {
                
                return(
                <div style={{paddingRight: "35px"}}>{row.cantidadPostulantes}</div>
                );
            },
            style: { 
                'whiteSpace': 'nowrap',
                "verticalAlign": "middle",
                textAlign: "right"
            }
        } /*{cantidadPostulantes
            dataField: 'price',
            text: 'Product Price',
            sort: true,
            headerStyle: (colum, colIndex) => {
            return { width: '300px', textAlign: 'left' };
            },
            style: {'whiteSpace': 'nowrap'}
        }, {
            dataField: 'price1',
            text: 'Product Price',
            sort: true,
            headerStyle: (colum, colIndex) => {
                return { width: '300px', textAlign: 'left' };
                },
            style: {'whiteSpace': 'nowrap'}
            }, {
            dataField: 'price2',
            text: 'Product Price',
            sort: true,
            headerStyle: (colum, colIndex) => {
                return { width: '300px', textAlign: 'left' };
                },
            style: {'whiteSpace': 'nowrap'}
            }*/];
      
    constructor(props) {
        super(props);
        
        ThemedStyleSheet.registerInterface(aphroditeInterface);

        ThemedStyleSheet.registerTheme({
        reactDates: {
            ...DefaultTheme.reactDates,
            zIndex: 9999999,
            sizing: {
            inputWidth: 100,
            inputWidth_small: 97,    
            arrowWidth: 24,
            },
            spacing: {

            dayPickerHorizontalPadding: 9,
        
            captionPaddingTop: 22,
        
            captionPaddingBottom: 37,
        
            inputPadding: 0,
        
            displayTextPaddingVertical: undefined,
        
            displayTextPaddingTop: 6,
        
            displayTextPaddingBottom: 7,
        
            displayTextPaddingHorizontal: undefined,
        
            displayTextPaddingLeft: 11,
        
            displayTextPaddingRight: 11,
        
            displayTextPaddingVertical_small: undefined,
        
            displayTextPaddingTop_small: 7,
        
            displayTextPaddingBottom_small: 5,
        
            displayTextPaddingHorizontal_small: undefined,
        
            displayTextPaddingLeft_small: 7,
        
            displayTextPaddingRight_small: 7,
        
            },
            font: {
            size: 14,
            captionSize: 14,
            input: {
                size: 14,
                lineHeight: '14px',
                size_small: 14,
                lineHeight_small: '14px',
                letterSpacing_small: '0.2px',
                styleDisabled: 'italic',
            },
            },
            color: {
            ...DefaultTheme.reactDates.color,
            highlighted: {
                backgroundColor: '#ff0000',
                backgroundColor_active: '#ff0000',
                backgroundColor_hover: '#ff0000',
                color: '#ff0000',
                color_active: '#ff0000',
                color_hover: '#ff0000',
            },
            },
        },
        });

        moment.updateLocale("es", esLocale);

        const newdate = new Date();
        newdate.setDate(newdate.getDate() - 7);

        this.dataFormJobOffer = [];

        this.state = {
            
            collapseFilter: false,

            jobsOffersList: [],
            dataEmployer: null,
            /* Grid */
            pageNumber: 1,
            pageSize: 10,
            totalRegister: 0,
            sortFieldGridJobsOffers: null, 
            sortOrderGridJobsOffers: null,
            /**
             * Buscador
             */
            bSearchByFilter: false,
            searchCode: '',
            searchText: '',
            selectedSearchEstado: opcionesStateJobOffer[0],
            searchStartDate: null,// moment().add(-6, 'days'),
            searchEndDate: null, // moment(),
            bShowDisable: false,
            searchFocusedInput: null, //'startDate' //'endDate'
        
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

            /**
             * Form crear oferta de trabajo
             */
            isValidatingForm: false,
            actionFormCreateJobOffer: '',
            puesto: '',
        }

        this.notify = this.notify.bind(this);
        this.dismissNotify = this.dismissNotify.bind(this);
        
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleSizePageChange = this.handleSizePageChange.bind(this);
        this.createFrom = this.createFrom.bind(this);
        this.onClick_CreateJobOffer = this.onClick_CreateJobOffer.bind(this);
        this.onClick_CopyJobOffer = this.onClick_CopyJobOffer.bind(this);
        this.onClick_DisableJobOffer = this.onClick_DisableJobOffer.bind(this);
        this.onClick_CloseJobOffer = this.onClick_CloseJobOffer.bind(this);

        this.toggleModal = this.toggleModal.bind(this);
        this.setOpenModal = this.setOpenModal.bind(this);

        this.products = [];

        this.handleTableChange = this.handleTableChange.bind(this);

        this.onClickSearchText = this.onClickSearchText.bind(this);
        this.onClickSearchCode = this.onClickSearchCode.bind(this);
        this.onChangeDateRange = this.onChangeDateRange.bind(this);
        this.onClickClearFilter = this.onClickClearFilter.bind(this);
        this.onChangeShowDisable = this.onChangeShowDisable.bind(this);

        this.previewJobOffer = this.previewJobOffer.bind(this);
        
    }
    
    /**
     * Notify
     */
    toastId = null;

    notify = (msj, autoClose) => { 
        
        this.toastId = toast.info(msj, {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose
        }); 
    }

    dismissNotify = () =>  {

        setTimeout(() => {
            if(this.toastId){
                toast.dismiss(this.toastId);
                this.toastId = null;

                
            }
        }, 10);
        
    }

    /**
     * Eventos de REACT
     */

    UNSAFE_componentWillReceiveProps(nextProps, nextState){
        
        const { jobsOffersList, resultJobOfferCreated, resultJobOfferCopied, resultJobOfferDisable } = nextProps;

        if(nextProps.dataEmployer !== this.state.dataEmployer){

            if(nextProps.dataEmployer.employer){
                const { bPersonaJuridica } = nextProps.dataEmployer.employer;
                //console.log(nextProps.dataEmployer);

                this.setState({
                    dataEmployer: nextProps.dataEmployer,
                    bPersonaJuridica
                });
            }else{
                this.setState({
                    dataEmployer: null,
                    bPersonaJuridica: false
                });
            }

        }

        if(this.props.jobsOffersList !== jobsOffersList){
            
            if(jobsOffersList && jobsOffersList.data){

                if(isIterable(jobsOffersList.data.data))
                {
                    const listJobsOffers = [...jobsOffersList.data.data];

                    const dataGridJobsOffers = listJobsOffers.map( (item, index) => {
                        
                        return { id: index, idGuid: item.id, codigo: item.codigo, puesto: item.puesto, fechaCreado: item.fechaCreado , estado: item.estado, descripcion: item.descripcion, cantidadPostulantes: item.cantidadPostulantes, bAnulado: item.bAnulado, observaciones: item.observaciones};
                    });
                    
                    if(this.state.bSearchByFilter && this.state.pageNumber > 1){
                        
                        this.setState({
                            pageNumber: 1 ,
                            bSearchByFilter: false,
                            totalRegister: jobsOffersList.data.itemsCount,
                            jobsOffersList: dataGridJobsOffers,
                        });
                    }else{
                        this.setState({
                            
                            bSearchByFilter: false,
                            totalRegister: jobsOffersList.data.itemsCount,
                            jobsOffersList: dataGridJobsOffers,
                        });
                    
                    }    
                    
                    // Datos para previsualización
                    this.dataFormJobOffer = [];
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

                        const auxDataForm =  {
                        
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
                            fechaComienzo: jobsOffersData.fechaComienzo ?  moment(jobsOffersData.fechaComienzo ) : null,
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
                        };

                        this.dataFormJobOffer[item.id] = {...auxDataForm};


                    });
                
                }else {
                    this.dataFormJobOffer = [];
                    this.setState({
                        pageNumber: 1 ,
                        bSearchByFilter: false,
                        totalRegister: 0,
                        jobsOffersList: [],
                    });
                }
            }

        }

        if(this.props.resultJobOfferCreated !== resultJobOfferCreated){
            //console.log(resultJobOfferCreated);
            if(resultJobOfferCreated.data){
                this.dismissNotify();
                setTimeout(() => {
                    
                    this.props.history.push({
                        pathname: `/area/empleador/ofertas/crearOferta/${ resultJobOfferCreated.data.id}`,
                        //search: '?idJobOffer=' + resultJobOfferCreated.data.id,
                        state: { idJobOffer: resultJobOfferCreated.data.id }
                    });
                }, 600);

                
            }
        }

        if(this.props.resultJobOfferCopied !== resultJobOfferCopied){
            //console.log(resultJobOfferCopied);
            if(resultJobOfferCopied.data){
                this.dismissNotify();
                
                setTimeout(() => {
                    
                    this.props.history.push({
                        pathname: `/area/empleador/ofertas/crearOferta/${ resultJobOfferCopied.data.id}`,
                        //search: '?idJobOffer=' + resultJobOfferCopied.data.id,
                        state: { idJobOffer: resultJobOfferCopied.data.id }
                    });
                }, 600);

                
            }
        }

        if(this.props.resultJobOfferDisable !== resultJobOfferDisable){
            
            if(resultJobOfferDisable.data){
                this.dismissNotify();

                this.props.getJobsOffers({ 
                    id: null, 
                    pageSize: this.state.pageSize, 
                    pageIndex: this.state.pageNumber - 1, 
                    keySearch: this.state.searchText, 
                    code: this.state.searchCode, 
                    startDate: this.state.searchStartDate, 
                    endDate: this.state.searchEndDate, 
                    stateOffer: this.state.selectedSearchEstado ? this.state.selectedSearchEstado.value : null,
                    bShowDisableRegisters: this.state.bShowDisable,
                    sortField: this.state.sortFieldGridJobsOffers,
                    sortOrder: this.state.sortOrderGridJobsOffers});
            }
        }

    }

    componentDidMount(){

        this.props.getJobsOffers({ id: null, pageSize: this.state.pageSize, pageIndex: this.state.pageNumber - 1, keySearch: "", bShowDisableRegisters: this.state.bShowDisable });
        
    }

    /**
     * Eventos del componente
     */

    handlePageChange(pageNumber, pageSize) {
       
        this.setState({
            pageNumber: pageNumber,
            pageSize:pageSize
        });

        this.props.getJobsOffers({ id: null, pageSize: pageSize, pageIndex: pageNumber - 1,
            keySearch: this.state.searchText, 
            stateOffer: this.state.selectedSearchEstado ? this.state.selectedSearchEstado.value : null,
            startDate: this.state.searchStartDate, 
            endDate: this.state.searchEndDate, 
            bShowDisableRegisters: this.state.bShowDisable, sortField: this.state.sortFieldGridJobsOffers, sortOrder: this.state.sortOrderGridJobsOffers, code: this.state.searchCode });
    }

    handleSizePageChange(pageNumber, pageSize){
        this.setState({
            pageNumber: pageNumber,
            pageSize:pageSize
        });

        this.props.getJobsOffers({ id: null, pageSize: pageSize, pageIndex: pageNumber - 1, 
            keySearch: this.state.searchText, 
            stateOffer: this.state.selectedSearchEstado ? this.state.selectedSearchEstado.value : null,
            startDate: this.state.searchStartDate, 
            endDate: this.state.searchEndDate, 
            bShowDisableRegisters: this.state.bShowDisable, sortField: this.state.sortFieldGridJobsOffers, sortOrder: this.state.sortOrderGridJobsOffers,code: this.state.searchCode  });
    }

    randomNumber() {
        const min = 1;
        const max = 100;
        const rand = min + Math.random() * (max - min);
        return rand;
      }

    returnYears = () => {
        let years = []
        for(let i = 2017 /*moment().year() - 100*/; i <= moment().year(); i++) {
            years.push(<option key={this.randomNumber() } value={i}>{i}</option>);
        }
        return years;
    }

    createFrom = (e, action) => {

        //console.log(action);

        this.setState({
            isValidatingForm: true,
            actionFormCreateJobOffer: action,
        });

        
        
    }

    previewJobOffer = (idOffer) => {
        
        /*const listKnowledgeTI = this.state.dataForm.informatica ? this.state.dataForm.informatica.map((item, index) => {
            return item.label;
        }) : [];*/      

        const { cbEmpleadorConficencial, descripcionEmpresaConfidencial, puesto, selectCategoriaEmpleo, descripcionPuesto, cbDiscapacidad, informatica, cbInformatica ,cbRemotoTodoMundo, obsRemote, 
            selectPresencialPais, selectPresencialRegion, selectPresencialComuna, ciudadPresencial, direccionPresencial, obsPresencial, cbDisponibilidadViajar, cbSalidaTerreno, cbCambioResidencia, cbDisponibilidadInmediata, fechaComienzo, 
            profesiones, nivelEducacional, situacionActualMinima, aspectosPersonales, otrosRequisitos,
            vacantes, tipoContrato, jornada, horario, acercaContratacion, cbRentaConvenir,
            cbMostrarRenta, rentaMaxima, tipoMoneda, tipoPago, periodicidadPago, acercaPago, beneficios, cbHomeOffice, cbHorarioFlexible, allowPlacesToWorkRemotly, idiomsRequire, questionsList, placeToWork, experiencies} = this.dataFormJobOffer[idOffer] || {};
       
       
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

        const content = 
            <CustomJobOfferPreview dataForm={{
                bPersonaJuridica:  this.state.dataEmployer.employer.bPersonaJuridica,
                bEmpleadorConficencial: cbEmpleadorConficencial,
                empresa: cbEmpleadorConficencial ? descripcionEmpresaConfidencial : this.state.dataEmployer.employer.nombreComercialEmpresa ,
                urlImgAvatar: this.state.dataEmployer.employer.rutaLogoEmpresa ? 
                    `${webConfig.urlImages}/${this.state.dataEmployer.employer.rutaLogoEmpresa}` : "",
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
            }}></CustomJobOfferPreview>
            
            
        this.setOpenModal(true, 'lg', 'Listo!', 'modal-info', "Previsualización Oferta de Trabajo", false, content);
        return true;
    }

    onClick_CreateJobOffer = (e) => {

        const content =
        <React.Fragment>
            
            <Formik
                // enableReinitialize={true}
                initialValues={{  
                    puesto: this.state.puesto, 
                }}
                validate={ (values) => {

                    let errors = {};
                    
                    if (!values.puesto) {
                        errors.puesto = 'Campo Puesto / Título del Aviso es requerido.';
                    }else if(values.puesto.length > 100){
                        errors.puesto = 'Campo Puesto / Título del Aviso debe ser de largo máximo 1000 carácteres.';
                    }

                    /*var listError = Object.keys(errors);
                    console.log(listError.length);
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
                        
                        this.setOpenModal(true, '', 'Entendido!', "modal-danger", "Completar Formulario", false, messageModalJsx);                    
                    
                    }*/
                    
                    this.setState({puesto: values.puesto});

                    return errors;

                    
                }}
                
                onSubmit={(values, { setSubmitting }) => {

					const {actionFormCreateJobOffer} = this.state;
					console.log(actionFormCreateJobOffer);
                    this.setState({isValidatingForm:false});

                    this.setSubmitting = setSubmitting;
                    this.setSubmitting(false);

                    this.notify("Creando oferta de trabajo...", false);

                    this.props.createJobOffer({puesto: values.puesto});
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
                        <React.Fragment> {/** Crear Oferta de Trabajo */}
							
							<Row>
								<Col xs="12">
									<FormGroup>
										<Label htmlFor="puesto">Puesto / Título del Aviso<i className="text-danger">★</i></Label>
										<Input type="text" id="puesto" 
											name="puesto"
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.puesto || ''}
											placeholder='Por ej. "Ejecutivo en Relaciones Públicas", "Ingeniero de Software .NET"...'
											valid={values.puesto !== '' && touched.puesto}
											invalid={errors.puesto !== undefined  && touched.puesto} ></Input>
										<FormFeedback className="help-block">{errors.puesto && touched.puesto && errors.puesto}</FormFeedback>
                                        <p className={ values.puesto.length > 100 ? "text-danger small" :"small"}>{values.puesto.length + " / 100" }</p>
									</FormGroup>
								</Col>
							</Row>
							
                        </React.Fragment>
                        
						<React.Fragment>
							<Row>
								<Col xs="12">
									<Button block color="success" type="submit" disabled={isSubmitting} onClick={(e) => this.createFrom(e, "create")} >
									Crear
									</Button>
								</Col>
							</Row>
						</React.Fragment>
                    </FormFormik>
                    );
                }}
                </Formik>
       
        </React.Fragment>

        this.setOpenModal(true, '', 'Listo!', 'modal-info', "Crear Oferta de Trabajo", true, content);

    }

    onClick_CopyJobOffer = (rowData) => {

        const content =
        <React.Fragment>
            
            <Formik
                // enableReinitialize={true}
                initialValues={{  
                    puesto: "Copia - " + rowData.puesto, 
                }}
                validate={ (values) => {

                    let errors = {};
                    
                    if (!values.puesto) {
                        errors.puesto = 'Campo Puesto / Título del Aviso es requerido.';
                    }else if(values.puesto.length > 100){
                        errors.puesto = 'Campo Puesto / Título del Aviso debe ser de largo máximo 100 carácteres.';
                    }
                    
                    return errors;
                }}
                
                onSubmit={(values, { setSubmitting }) => {

					const {actionFormCreateJobOffer} = this.state;
					console.log(actionFormCreateJobOffer);
                    this.setState({isValidatingForm:false});

                    this.setSubmitting = setSubmitting;
                    this.setSubmitting(false);

                    this.notify("Copiando oferta de trabajo...", false);
                    console.log(rowData);
                    // Copiar
                    this.props.copyJobsOffers({idOffer: rowData.idGuid, puesto: values.puesto});
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
                        <React.Fragment> {/** Crear Oferta de Trabajo */}
							
							<Row>
								<Col xs="12">
									<FormGroup>
										<Label htmlFor="puesto">Puesto / Título del Aviso<i className="text-danger">★</i></Label>
										<Input type="text" id="puesto" 
											name="puesto"
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.puesto || ''}
											placeholder='Por ej. "Ejecutivo en Relaciones Públicas", "Ingeniero de Software .NET"...'
											valid={values.puesto !== '' && touched.puesto}
											invalid={errors.puesto !== undefined  && touched.puesto} ></Input>
										<FormFeedback className="help-block">{errors.puesto && touched.puesto && errors.puesto}</FormFeedback>
                                        <p className={ values.puesto.length > 100 ? "text-danger small" :"small"}>{values.puesto.length + " / 100" }</p>
									</FormGroup>
								</Col>
							</Row>
							
                        </React.Fragment>
                        
						<React.Fragment>
							<Row>
								<Col xs="12">
									<Button block color="success" type="submit" disabled={isSubmitting} onClick={(e) => this.createFrom(e, "copy")} >
									Copiar
									</Button>
								</Col>
							</Row>
						</React.Fragment>
                    </FormFormik>
                    );
                }}
                </Formik>
       
        </React.Fragment>

        const titleModal = <>Copiar Oferta de Trabajo - Código: <Badge color="primary">{rowData.codigo}</Badge></> 
           
        this.setOpenModal(true, '', 'Listo!', 'modal-secondary', titleModal, true, content);

    }

    onClick_DisableJobOffer = (rowData) => {

        const content =
        <React.Fragment>
            
            <Formik
                // enableReinitialize={true}
                initialValues={{  
                     
                }}
                validate={ (values) => {

                    let errors = {};
                
                    return errors;
                }}
                
                onSubmit={(values, { setSubmitting }) => {

					//const {actionFormCreateJobOffer} = this.state;
					//console.log(actionFormCreateJobOffer);
                    this.setState({isValidatingForm:false, modal: false});

                    this.setSubmitting = setSubmitting;
                    this.setSubmitting(false);

                    let msgNotification = '';
                    if(!rowData.bAnulado){
                        msgNotification = "Deshabilitando oferta de trabajo...";
                    }else{
                        msgNotification = "Habilitando oferta de trabajo...";
                    }
                    this.notify(msgNotification, false);
                    
                    // Copiar
                    this.props.disableJobsOffers({idOffer: rowData.idGuid, bAnulado: !rowData.bAnulado});
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
                        <React.Fragment> {/** Crear Oferta de Trabajo */}
							{ !rowData.bAnulado ?
							<Row>
								<Col xs="12">
									<p>
                                        La oferta de empleo código <Badge color="info">{rowData.codigo}</Badge> será deshabilitada, quedando oculta en los datos mostrados en la tabla de datos de ofertas de empleos.
                                    </p>

                                    <p>
                                        Postariormente, podrá visualizarla si activa en el filtro <Badge color="primary">Mostrar ofertas anuladas</Badge>, y se necesita volver activarla podrá hacerlo mediante el mismo botón.
                                    </p>

                                    <p>
                                        Además, la oferta quedara oculta para los resultados de búsqueda públicos y por lo tanto no podrá recibir más postulaciones.
                                    </p>

                                    <p>
                                        Posteriormente podrá habilitarla para volver a editarla y solicitar la publicación de esta.
                                    </p>
								</Col>
							</Row>
                            : 
                            <p> La oferta código <Badge color="info">{rowData.codigo}</Badge> será habilitada, quedando así disponible en la tabla de datos de ofertas de empleos.</p>
                            }
							
                        </React.Fragment>
                        
						<React.Fragment>
							<Row>
								<Col xs="12">
									<Button block color="success" type="submit" disabled={isSubmitting} onClick={(e) => this.createFrom(e, "disable")} >
									
                                    { 
                                        !rowData.bAnulado ? "Deshabilitar Oferta" : "Habilitar Oferta"
                                    }
									</Button>
								</Col>
							</Row>
						</React.Fragment>
                    </FormFormik>
                    );
                }}
                </Formik>
       
        </React.Fragment>

        let titleModal = null;
        if(!rowData.bAnulado){
            titleModal = <>Deshabilitar Oferta de Trabajo - Código: <Badge color="primary">{rowData.codigo}</Badge></> 
        }else{
            titleModal = <>Habilitar Oferta de Trabajo - Código: <Badge color="primary">{rowData.codigo}</Badge></> 
        }
        
           
        this.setOpenModal(true, '', 'Listo!', 'modal-danger', titleModal, true, content);

    }

    onClick_CloseJobOffer= (rowData) => {

        const content =
        <React.Fragment>
            
            <Formik
                // enableReinitialize={true}
                initialValues={{  
                     
                }}
                validate={ (values) => {

                    let errors = {};
                
                    return errors;
                }}
                
                onSubmit={(values, { setSubmitting }) => {

					//const {actionFormCreateJobOffer} = this.state;
					//console.log(actionFormCreateJobOffer);
                    this.setState({isValidatingForm:false, modal: false});

                    this.setSubmitting = setSubmitting;
                    this.setSubmitting(false);

                    this.notify("Deshabilitando oferta de trabajo...", false);
                    
                    // Copiar
                    this.props.disableJobsOffers({idOffer: rowData.idGuid, bAnulado: !rowData.bAnulado});
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
									<p>
                                        La oferta código <Badge color="info">{rowData.codigo}</Badge> será cerrarada, quendado oculta en los resultados de búsqueda.
                                    </p>

                                    <p>
                                        De esta forma no podrá recibir más postulaciones, y todas las postulaciones recibidas pasaran a estado <Badge color="danger">Cerrada</Badge>.
                                    </p>
								</Col>
							</Row>
                            
							<Row>
								<Col xs="12">
									<Button block color="success" type="submit" disabled={isSubmitting} onClick={(e) => this.createFrom(e, "close")} >
									Cerrar Oferta
									</Button>
								</Col>
							</Row>
                    </FormFormik>
                    );
                }}
                </Formik>
       
        </React.Fragment>

        let titleModal =  <>Cerrar Oferta de Trabajo - Código: <Badge color="primary">{rowData.codigo}</Badge></> 
        
        
           
        this.setOpenModal(true, '', 'Listo!', 'modal-danger', titleModal, true, content);

    }

    /**
     * Modal
     */
    toggleModal() {
        this.setState({
          modal: !this.state.modal
        });
    }

    setOpenModal(isOpen, size, modalMsjButttoOk,classNameModal, titleModal, hiddenFooterModal,contentModal) {
        this.setState({
          modal: isOpen,
          modalSize: size,
          modalMsjButttoOk: modalMsjButttoOk,
          classNameModal: classNameModal,
          titleModal: titleModal,
          contentModal: contentModal,
          hiddenFooterModal: hiddenFooterModal,
        });
    }

    renderMonthElement = ({ month, onMonthSelect, onYearSelect }) =>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div>
                <select
                    value={month.month()}
                    onChange={(e) => onMonthSelect(month, e.target.value)}
                >
                    {moment.months().map((label, value) => (
                        <option key={this.randomNumber() } value={value}>{label}</option>
                    ))}
                </select>
            </div>
            <div>
                <select value={month.year()} onChange={(e) => onYearSelect(month, e.target.value)}>
                    {this.returnYears()}
                </select>
            </div>
        </div>


    handleTableChange = (type, { sortField, sortOrder, data }) => {
        
        if(type === 'sort'){
            this.props.getJobsOffers({ id: null, pageSize:  this.state.pageSize, pageIndex: this.state.pageNumber - 1,
                keySearch: this.state.searchText, 
                stateOffer: this.state.selectedSearchEstado ? this.state.selectedSearchEstado.value : null,
                startDate: this.state.searchStartDate, 
                endDate: this.state.searchEndDate, 
                bShowDisableRegisters: this.state.bShowDisable,  sortField: sortField, sortOrder: sortOrder, code: this.state.searchCode  });
        }
        

        this.setState(() => (
            {
                sortFieldGridJobsOffers: sortField, 
                sortOrderGridJobsOffers: sortOrder
            }
        ));
    }

    onClickSearchText = (text) => {

        this.setState({ bSearchByFilter: true,})
        
        this.props.getJobsOffers({ 
            id: null, 
            pageSize: this.state.pageSize,
            pageIndex: 0, 
            keySearch: text,
            startDate: this.state.searchStartDate, 
            endDate: this.state.searchEndDate, 
            stateOffer: this.state.selectedSearchEstado ? this.state.selectedSearchEstado.value : null,
            bShowDisableRegisters: this.state.bShowDisable, code: this.state.searchCode  });
        
    
    }

    onClickSearchCode = (code) => {
        this.setState({ searchCode: code, });
        this.props.getJobsOffers({ 
            id: null, 
            pageSize: this.state.pageSize, 
            pageIndex: 0, 
            keySearch: this.state.searchText, 
            code: code, 
            bShowDisableRegisters: this.state.bShowDisable,
            startDate: this.state.searchStartDate, 
            endDate: this.state.searchEndDate,
            stateOffer: this.state.selectedSearchEstado ? this.state.selectedSearchEstado.value : null,
         });
    }

    onChangeDateRange = (startDate, endDate) => {
        //console.log(startDate);
        //console.log(endDate);
        const auxSD = startDate ? moment(startDate).utc().format('YYYY-MM-DD HH:mm:ss') : null;
        const auxED = endDate ? moment(endDate).utc().format('YYYY-MM-DD HH:mm:ss') : null;

        this.setState({ searchStartDate: startDate, searchEndDate: endDate, bSearchByFilter: true, /*pageNumber: 1*/ });
        
        this.props.getJobsOffers({ 
            id: null, 
            pageSize: this.state.pageSize, 
            pageIndex: 0, 
            keySearch: this.state.searchText, 
           
            startDate: auxSD, 
            endDate: auxED, 
            stateOffer: this.state.selectedSearchEstado ? this.state.selectedSearchEstado.value : null,
            bShowDisableRegisters: this.state.bShowDisable, code: this.state.searchCode  });
   
    }

    onChangeStateOffer = (value) => {
        
        this.setState({selectedSearchEstado: value, bSearchByFilter: true, /*pageNumber: 1*/});

        this.props.getJobsOffers({ 
            id: null, 
            pageSize: this.state.pageSize,
            pageIndex: 0, 
            keySearch: this.state.searchText, 
            startDate: this.state.searchStartDate, 
            endDate: this.state.searchEndDate, 
            stateOffer: value ? value.value : null,
            bShowDisableRegisters: this.state.bShowDisable, code: this.state.searchCode  });
        
    }

    onClickClearFilter = (e) => {

        this.props.getJobsOffers({ id: null, pageSize: this.state.pageSize, pageIndex: 0, keySearch: "", bShowDisableRegisters: false, bSearchByFilter: false, code: '' });
        this.setState({/*pageNumber: 1,*/searchCode: '', searchText: '', searchStartDate: null, searchEndDate: null, selectedSearchEstado: opcionesStateJobOffer[0], bShowDisable: false});
    }

    onChangeShowDisable = (checked) => {
        //console.log(this.state.pageNumber);
        this.setState({ /*pageNumber: 1,*/ bShowDisable:checked, bSearchByFilter: true, });

        
        this.props.getJobsOffers({ 
            id: null, 
            pageSize: this.state.pageSize,
            pageIndex: 0, 
            keySearch: this.state.searchText, 
            startDate: this.state.searchStartDate, 
            endDate: this.state.searchEndDate, 
            stateOffer: this.state.selectedSearchEstado ? this.state.selectedSearchEstado.value : null,
            bShowDisableRegisters:checked, code: this.state.searchCode });
    }

    render() {

        const expandRow = {
            renderer: row => {
                //console.log(row);
                return(
                    <div style={{whiteSpace: "pre-wrap"}}>
                        <p>{  row.descripcion }</p>
                    </div>
                );
            },
            showExpandColumn: true,
            expandByColumnOnly: true,
          };

        const customPaginator = (handlePageChange, pageNumber, pageSize, total) => {

            const arrowPath = 'M869 487.8L491.2 159.9c-2.9-2.5-6.6-3.9-10.5-3.9h' +
            '-88.5c-7.4 0-10.8 9.2-5.2 14l350.2 304H152c-4.4 0-8 3.6-8 8v' +
            '60c0 4.4 3.6 8 8 8h585.1L386.9 854c-5.6 4.9-2.2 14 5.2 14h91' +
            '.5c1.9 0 3.8-0.7 5.2-2L869 536.2c14.7-12.8 14.7-35.6 0-48.4z';

            const doublePath = [
            'M533.2 492.3L277.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H188c-6' +
            '.7 0-10.4 7.7-6.3 12.9L447.1 512 181.7 851.1c-4.1 5.2-0' +
            '.4 12.9 6.3 12.9h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.' +
            '1c9.1-11.7 9.1-27.9 0-39.5z',
            'M837.2 492.3L581.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H492c-6' +
            '.7 0-10.4 7.7-6.3 12.9L751.1 512 485.7 851.1c-4.1 5.2-0' +
            '.4 12.9 6.3 12.9h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.' +
            '1c9.1-11.7 9.1-27.9 0-39.5z',
            ];

            const getSvgIcon = (path, reverse, type) => {
            const paths = Array.isArray(path) ? path : [path];
            const renderPaths = paths.map((p, i) => {
                return (
                <path key={i} d={p} />
                );
            });
            return (
                <i className={`custom-icon-${type}`} style={{
                fontSize: '16px',
                }}
                >
                <svg
                    viewBox="0 0 1024 1024"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    style={{
                    verticalAlign: '-.125em',
                    transform: `rotate(${reverse ?  180 : 0}deg)`,
                    }}
                >
                    {renderPaths}
                </svg>
                </i>
            );
            };

            const nextIcon = getSvgIcon(arrowPath, false, 'next');
            const prevIcon = getSvgIcon(arrowPath, true, 'prev');
            const jumpNextIcon = () => getSvgIcon(doublePath, false, 'jump-next');
            const jumpPrevIcon = () => getSvgIcon(doublePath, true, 'jump-prev');

            const iconsProps = {
                prevIcon,
                nextIcon,
                jumpPrevIcon,
                jumpNextIcon,
              } ;

            
              
            if(isMobile){

                return (   
                    <Row>
                        
                        <Col xs="12" className="align-self-center">
                            <div className="d-flex justify-content-center justify-content-lg-end">
                                <Pagination 
                                    onChange={handlePageChange} 
                                    onShowSizeChange={this.handleSizePageChange}
                                    current={pageNumber} 
                                    total={total} 
                                    pageSize={pageSize}
                                    selectComponentClass={Select}
                                    {...iconsProps}
                                    showLessItems
                                    showTitle={false}
                                    
                                ></Pagination>
                            </div>                                   
                        </Col>
                    </Row>
    
                );
            }

            return (   
                <Row>
                    
                    <Col xs="12" className="align-self-center">
                        <div className="d-flex justify-content-center justify-content-lg-end">
                            <Pagination 
                                onChange={handlePageChange} 
                                onShowSizeChange={this.handleSizePageChange}
                                current={pageNumber} 
                                total={total} 
                                pageSizeOptions={["5","10","20","30","40","50"]}
                                pageSize={pageSize}
                                selectComponentClass={Select}
                                showQuickJumper
                                showSizeChanger
                                showLessItems
                                showTitle={false}
                                showPrevNextJumpers={true}
                                {...iconsProps}
                                showTotal={(total, range) => (
                                    <div>
                                        mostrando {range[0]} - {range[1]} de {total} registros
                                    </div>
                                )}
                                 
                                locale={{
                                    // Options.jsx
                                    items_per_page: '/ ofertas',
                                    jump_to: 'Ir a',
                                    jump_to_confirm: 'confirmar',
                                    page: '',
                                  
                                    // Pagination.jsx
                                    prev_page: 'Página anterior',
                                    next_page: 'Página siguiente',
                                    prev_5: '5 páginas previas',
                                    next_5: '5 páginas siguientes',
                                    prev_3: '3 páginas previas',
                                    next_3: '3 páginas siguientes'
                                  }}
                                ></Pagination>
                        </div>                                   
                    </Col>
                </Row>

            );
        }

        const rowStyleFormat = (row, rowIdx) => {
           
            if(row.bAnulado){
                return { backgroundColor: "#FFD0D0" };
            }

            if(row.estado === 'revision'){
                return { backgroundColor: "#d5f3f4" };
            }else if(row.estado === 'rejected'){
                return { backgroundColor: "#ffcccc" };
            }else if(row.observaciones && row.observaciones.length > 0){
                return { backgroundColor: "#ffff99" };
            }

            return null;
          }

        return (
            <div className="animated fadeIn">
                <ToastContainer></ToastContainer>
                <Modal isOpen={this.state.modal} toggle={this.toggleModal} size={this.state.modalSize} 
                    className={this.state.classNameModal + " " + this.props.className}>
                    <ModalHeader toggle={this.toggleModal}>{this.state.titleModal}</ModalHeader>
                    <ModalBody>
                        { this.state.contentModal }
                    </ModalBody>
                    <ModalFooter hidden={this.state.hiddenFooterModal}>
                        <Button color="info" onClick={this.toggleModal}>{ this.state.modalMsjButttoOk }</Button>{' '}
                    </ModalFooter>
                </Modal>
                <Row>
                    <Col xs="12">
                        <Card>
                            <CardHeader>
                                <Row >
                                    <Col className="align-self-center">
                                        <strong >Gestionar Ofertas de Empleo</strong>
                                    </Col>
                                    <Col>
                                        <div className="card-header-actions">
                                            <Button block color="success" onClick={this.onClick_CreateJobOffer}> 
                                                <div className="align-self-center">
                                                    <span role="img" aria-label="Crear Oferta de Empleo">📢</span>&nbsp;Crear Oferta
                                                </div>
                                            </Button>
                                        </div>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Row className="justify-content-end" style={{marginBottom: "24px"}}>
                                    <Col xs="12" md="12" className="text-right">
                                        <Button color="info" block={isMobile} onClick={(e) => { this.setState({collapseFilter: !this.state.collapseFilter}) }}> 
                                            <div className="align-self-center">
                                                <i className="fa fa-filter"></i>  &nbsp;                                                    
                                                Filtros
                                            </div>
                                        </Button>

                                    </Col>
                                </Row>
                                <Collapse isOpen={this.state.collapseFilter} >
                                    <Card>
                                        <CardBody>
                                            <Row className="mb-0 mb-md-2">
                                                <Col xs="12" md="3" className="align-self-center mb-2 mb-md-0 d-flex justify-content-center justify-content-lg-start">
                                                    <InputGroup>
                                                        
                                                        <Input type="text" id="buscarCodigoInput" value={this.state.searchCode} name="input1-group2" placeholder="Buscar por código.." onChange={(e) => { this.setState({ searchCode: e.target.value }); }}  />
                                                        <InputGroupAddon addonType="append">
                                                            <Button type="button" color="info" onClick={(e) => { this.onClickSearchCode(this.state.searchCode); }}><i className="fa fa-search"></i> Buscar</Button>
                                                        </InputGroupAddon>
                                                    </InputGroup>
                                                </Col>

                                                <Col xs="12" md="3" className="align-self-center mb-2 mb-md-0 d-flex justify-content-center justify-content-lg-start">
                                                    <InputGroup>
                                                        
                                                        <Input type="text" id="buscarTextoInput" value={this.state.searchText} name="input1-group2" placeholder="Buscar por texto..." onChange={(e) => { this.setState({ searchText: e.target.value }); }} />
                                                        <InputGroupAddon addonType="append">
                                                            <Button type="button" color="info" onClick={(e) => { this.onClickSearchText(this.state.searchText); }}><i className="fa fa-search" ></i> Buscar</Button>
                                                        </InputGroupAddon>
                                                    </InputGroup>
                                                </Col>
{/* className="align-self-center mb-2 mb-md-0 d-flex justify-content-center justify-content-lg-center" */}
                                                <Col xs="12" md="6">
                                                    <div className="form-inline float-right">
                                                        <div className={"col-md-12 form-group  " + (!isMobile ? " text-right" : "text-center")}>
                                                            <Label htmlFor="datesIdUnique">Fecha creada &nbsp;&nbsp;</Label>
                                                            <DateRangePicker 
                                                                key="datesIdUnique"
                                                                startDatePlaceholderText="Comienzo"
                                                                endDatePlaceholderText="Fin"
                                                                startDate={this.state.searchStartDate} // momentPropTypes.momentObj or null,
                                                                startDateId="startDate" // PropTypes.string.isRequired,
                                                                endDate={this.state.searchEndDate} // momentPropTypes.momentObj or null,
                                                                endDateId="endDate" // PropTypes.string.isRequired,
                                                                onDatesChange={({ startDate, endDate }) => {
                                                                    //console.log(startDate);
                                                                    //this.onChangeDateRange(startDate, endDate);
                                                                    
                                                                    this.onChangeDateRange(startDate, endDate);

                                                                    
                                                                }} // PropTypes.func.isRequired,
                                                                isOutsideRange={() => false}
                                                                renderMonthElement={this.renderMonthElement}
                                                                orientation={isMobile ? "vertical" : "horizontal"}
                                                                numberOfMonths={2}
                                                                withFullScreenPortal={true}
                                                                hideKeyboardShortcutsPanel ={true}
                                                                withPortal={isMobile}
                                                                focusedInput={this.state.searchFocusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                                                                onFocusChange={searchFocusedInput => this.setState({ searchFocusedInput })} // PropTypes.func.isRequired,
                                                               
                                                            ></DateRangePicker>
                                                        </div>
                                                    </div>
                                                </Col>    
                                                
                                            </Row>
                                            <Row className="d-flex">
                                               
                                                <Col xs="12" md="3" className="p-2">
                                                    <CustomSelect
                                                        
                                                        id={"selectStateJobOffer"}
                                                        placeholder={'Estado de la oferta...'}
                                                        nameAttr={'selectStateJobOffer'}
                                                        onChange={(e,a) => {

                                                            this.onChangeStateOffer(a);
                                                            
                                                        
                                                        }}
                                                        //onBlur={setFieldTouched}
                                                        value={this.state.selectedSearchEstado}
                                                        options={opcionesStateJobOffer}
                                                        //errors={errors.nivelEducacional}
                                                        //touched={touched.nivelEducacional}
                                                        //isMulti={true}
                                                        //invalid={errors.nivelEducacional !== undefined  && touched.nivelEducacional} 
                                                    ></CustomSelect>
                                                </Col>
                                                <Col xs="12" md="6" className="p-2 align-self-center">
                                                    <AppSwitch 
                                                        id="cbShowDisable"
                                                       
                                                        defaultChecked={false} 
                                                        label 
                                                        dataOn={'Sí'} 
                                                        dataOff={'No'}
                                                        color="info" 
                                                        name="cbShowDisable"
                                                        checked={this.state.bShowDisable}
                                                        onChange={(e) => {
                                                            
                                                            this.onChangeShowDisable(e.target.checked);
                                                        }}
                                                        > 
                                                    </AppSwitch>
                                                    
                                                    <Label htmlFor="cbShowDisable" style={{'verticalAlign':'bottom'}} className="ml-2">
                                                        Mostrar ofertas anuladas&ensp;
                                                        
                                                    </Label>
                                                    <i id="iconHelp_cbShowDisable" className="fa fa-question-circle fa-lg text-info" style={{verticalAlign: "8px", cursor: "pointer"}}></i>
                                                        
                                                    <CustomPopover placement="top-start" target="iconHelp_cbShowDisable" title={"Mostrar Ofertas Anuladas"} text={"Las filas de color en la grilla son ofertas que han sido deshabilitadas."}></CustomPopover>
                                                </Col>
                                                
                                                <Col xs="12" md="3" className="ml-auto p-2 text-right">
                                                    <Button color="info" block={isMobile} onClick={this.onClickClearFilter} className="mt-0"> 
                                                        <div className="align-self-center">
                                                            <i className="fa fa-check"></i>  &nbsp;                                                    
                                                            Limpiar Filtro
                                                        </div>
                                                    </Button>

                                                </Col>
                                            
                                                
                          
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Collapse>
                                
                                
                                <Row className="mb-2">
                                    <Col>
                                        <SimpleBar 
                                            
                                            //style={{maxHeight:"420px"}}
                                            >
                                            
                                            <BootstrapTable
                                                id="mapping_table"
                                                striped
                                                hover
                                                condensed
                                                bootstrap4
                                                remote
                                                expandRow={ expandRow }
                                                ref={ n => this.node = n }
                                                rowStyle={rowStyleFormat}
                                                keyField='id'
                                                //caption="Plain text header"
                                                noDataIndication={ 
                                                    () =>
                                                    <strong>Inicie una oferta de empleo...</strong>
                                                }
                                                data={ this.state.jobsOffersList } 
                                                
                                                columns={ this.columnsGridJobsOffers } 

                                                onTableChange={ this.handleTableChange }
                                            ></BootstrapTable>
                                           
                                        </SimpleBar>
                                        
                                    </Col>
                                </Row>
                                {customPaginator(this.handlePageChange, this.state.pageNumber, this.state.pageSize, this.state.totalRegister)}
                               
                            </CardBody>
                            <CardFooter >
                                
                                
                            </CardFooter>
                        </Card>

                    </Col>
                </Row>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    jobsOffersList: state.jobsOffers.jobsOffersList,
    resultJobOfferCreated: state.jobsOffers.resultJobOfferCreated,
    resultJobOfferCopied: state.jobsOffers.resultJobOfferCopied,
    resultJobOfferDisable: state.jobsOffers.resultJobOfferDisable,
});


export default connect(mapStateToProps, { 
    getJobsOffers,
    createJobOffer,
    copyJobsOffers,
    disableJobsOffers,
})(ManagerJobs);