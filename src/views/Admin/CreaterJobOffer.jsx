import React, { Component } from 'react';
import { 
    Alert, 
    Badge,
    Button,
    ButtonGroup,
    Card,
    Label,
    FormFeedback, 
    FormGroup, 
    CardHeader,
    CardBody,
    Col, 
    Input,
    Modal, 
    ModalBody, 
    ModalFooter,
    ModalHeader, 
    Row ,
    Collapse,
} from 'reactstrap';
import { AppSwitch } from '@coreui/react';
import { Formik, Form as FormFormik } from 'formik';
import CustomSelect from '../../components/UI/CustomSelect';
import { CreateJobOfferValidation } from '../Employer/ValidationsRules/CreateJobOfferValidation';

import CustomJobOfferPreview from '../../components/UI/CustomJobOfferPreview';
import { webConfig } from '../../GlobalConfig';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
//import 'react-dates/lib/css/_datepicker.css';


import ThemedStyleSheet from 'react-with-styles/lib/ThemedStyleSheet';
import aphroditeInterface from 'react-with-styles-interface-aphrodite';
import DefaultTheme from 'react-dates/lib/theme/DefaultTheme';

import esLocale from 'moment/locale/es';
import moment from 'moment';


import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.css';
import '../../css/simpleBar.css';

//import queryString from 'query-string';

/* Table Bootstrap 2 */

import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
//import Thumb from '../../components/UI/Thumb';
import Linq from 'linq'; 
//import { isIterable, validateUrl, ConvertFormatDateToBrowser, FormatDateFromInput} from '../../utiles';
import '../../css/inputFile.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import {isMobile} from 'react-device-detect';
import { isIterable } from '../../utiles';
import CustomPopover from '../../components/UI/CustomPopover';
// Site config
//import { webConfig, stateSite } from '../../GlobalConfig';

//import { validate as validateRut, format as formatRut } from 'rut.js';

import { opcionesGenero, opcionesInformatica, opcionesEstadoNivelEducacionalRequisito, opcionesNivelesIdiomas, opcionesTiposMonedas } from '../../data/parameters';

// Redux
import { connect } from 'react-redux';
import { updateEmployer, getEmployer } from '../../actions/usersActions';
import { getCountries, getRegions, getCommunes } from '../../actions/geographicsActions';
import { getCommercialSectors, getNumericalRanges, getTypesEmployers, getPositionsCompany, getEmploymentCategories, getProfessions, getEducationalLevel, getIdioms, getTypesContracts, getTypesSalaries, getTypesPaymentPeriodicity} from '../../actions/parametersActions';
import { getJobsOffersEmployers, createJobOffer } from '../../actions/jobsOffersActions';

class CreaterJobOffer extends Component {

    columnsRemotePlaceToWork = [
        {
            dataField: 'actionButtons',
            isDummyField: true,
            text: 'Acción',
            headerStyle: (colum, colIndex) => {
				return { width: '100px', textAlign: 'center' };
			},
            formatter: (cellContent, row) => {
                
                return(
                    <div className="text-center">
                        <Button size="sm" color="danger" onClick={(e) => this.deleteRowRemoteLocation(row.id) } >
                            <i className="fa fa-trash"></i>
                        </Button>
                    </div>
                );
                
            }
        },
        {
			dataField: 'id',
			text: 'Key',
			hidden: true,
			headerStyle: (colum, colIndex) => {
				return { width: '100px', textAlign: 'right' };
			},
            sort: true,
            style: {
                verticalAlign: "text-bottom"
            }
		}, {
			dataField: 'country.label',
			text: 'País',
			sort: true,
			headerStyle: (colum, colIndex) => {
			return { width: '150px', textAlign: 'left' };
			},
			style: {
                'whiteSpace': 'nowrap',
                "verticalAlign": "middle"
            }
		}, {
			dataField: 'region.label',
			text: 'Región',
			sort: true,
			headerStyle: (colum, colIndex) => {
			return { width: '250px', textAlign: 'left' };
			},
			style: {
                'whiteSpace': 'nowrap',
                "verticalAlign": "middle"
            }
		}, {
			dataField: 'commune.label',
			text: 'Comuna',
			sort: true,
			headerStyle: (colum, colIndex) => {
			return { width: '250px', textAlign: 'left' };
			},
			style: {
                'whiteSpace': 'nowrap',
                "verticalAlign": "middle"
            }
		}, {
			dataField: 'cityRemoteWork',
			text: 'Ciudad',
			sort: true,
			headerStyle: (colum, colIndex) => {
				return { width: '150px', textAlign: 'left' };
			},
			style: {
                'whiteSpace': 'nowrap',
                "verticalAlign": "middle"
            }
		}, {
			dataField: 'addressRemoteWork',
			text: 'Dirección',
			sort: true,
			headerStyle: (colum, colIndex) => {
				return { width: '200px', textAlign: 'left' };
			},
			style: {
                'whiteSpace': 'nowrap',
                "verticalAlign": "middle"
            }
		}
	];

    columnsExperiencies = [
        {
            dataField: 'actionButtons',
            isDummyField: true,
            text: 'Acción',
            headerStyle: (colum, colIndex) => {
				return { width: '100px', textAlign: 'center' };
			},
            formatter: (cellContent, row) => {
                
                return(
                    <div className="text-center">
                        <Button size="sm" color="danger" onClick={(e) => this.deleteRowExperience(row.id) } >
                            <i className="fa fa-trash"></i>
                        </Button>
                    </div>
                );
                
            }
        },
        {
			dataField: 'id',
			text: 'Key',
			hidden: true,
			headerStyle: (colum, colIndex) => {
				return { width: '100px', textAlign: 'right' };
			},
            sort: true,
            style: {
                verticalAlign: "text-bottom"
            }
		}, {
			dataField: 'experience',
			text: 'Experiencia',
			sort: true,
			headerStyle: (colum, colIndex) => {
			return { width: '300px', textAlign: 'left' };
			},
			style: {
                'whiteSpace': 'nowrap',
                "verticalAlign": "middle"
            }
		}, {
			dataField: 'time',
			text: 'Tiempo / Necesidad',
			sort: true,
			headerStyle: (colum, colIndex) => {
			return { width: '150px', textAlign: 'left' };
			},
			style: {
                'whiteSpace': 'wrap',
                "verticalAlign": "middle"
            }
		}
    ];

    columnsIdioms = [
        {
            dataField: 'actionButtons',
            isDummyField: true,
            text: 'Acción',
            headerStyle: (colum, colIndex) => {
				return { width: '100px', textAlign: 'center' };
			},
            formatter: (cellContent, row) => {
                
                return(
                    <div className="text-center">
                        <Button size="sm" color="danger" onClick={(e) => this.deleteIdiom(row.id) } >
                            <i className="fa fa-trash"></i>
                        </Button>
                    </div>
                );
                
            }
        },
        {
			dataField: 'id',
			text: 'Key',
			hidden: true,
			headerStyle: (colum, colIndex) => {
				return { width: '100px', textAlign: 'right' };
			},
            sort: true,
            style: {
                verticalAlign: "text-bottom"
            }
		}, {
			dataField: 'idiom.label',
			text: 'Idioma',
			sort: true,
			headerStyle: (colum, colIndex) => {
			return { width: '300px', textAlign: 'left' };
			},
			style: {
                'whiteSpace': 'nowrap',
                "verticalAlign": "middle"
            }
		}, {
			dataField: 'nivel.label',
			text: 'Nivel',
			sort: true,
			headerStyle: (colum, colIndex) => {
			return { width: '150px', textAlign: 'left' };
			},
			style: {
                'whiteSpace': 'wrap',
                "verticalAlign": "middle"
            }
		}
    ];
    
    columnsQuestions  = [
        {
            dataField: 'actionButtons',
            isDummyField: true,
            text: 'Acción',
            headerStyle: (colum, colIndex) => {
				return { width: '100px', textAlign: 'center' };
			},
            formatter: (cellContent, row) => {
                
                return(
                    <div className="text-center">
                        <Button size="sm" color="danger" onClick={(e) => this.deleteQuestion(row.id) } >
                            <i className="fa fa-trash"></i>
                        </Button>
                    </div>
                );
                
            }
        },
        {
			dataField: 'id',
			text: 'Key',
			hidden: true,
			headerStyle: (colum, colIndex) => {
				return { width: '100px', textAlign: 'right' };
			},
            sort: true,
            style: {
                verticalAlign: "text-bottom"
            }
		}, {
			dataField: 'question',
			text: 'Pregunta',
			sort: true,
			headerStyle: (colum, colIndex) => {
			return { width: '300px', textAlign: 'left' };
			},
			style: {
                'whiteSpace': 'wrap',
                "verticalAlign": "middle"
            }
		}
    ];

    columnsObservations = [
        {
            dataField: 'actionButtons',
            isDummyField: true,
            text: 'Acción',
            headerStyle: (colum, colIndex) => {
				return { width: '100px', textAlign: 'center' };
			},
            formatter: (cellContent, row) => {
                
                return(
                    <div className="text-center">
                        <Button size="sm" color="danger" onClick={(e) => this.deleteObservation(row.id) } >
                            <i className="fa fa-trash"></i>
                        </Button>
                    </div>
                );
                
            }
        },
        {
			dataField: 'id',
			text: 'Key',
			hidden: true,
			headerStyle: (colum, colIndex) => {
				return { width: '100px', textAlign: 'right' };
			},
            sort: true,
            style: {
                verticalAlign: "text-bottom"
            }
		}, {
			dataField: 'observation',
			text: 'Observación',
			sort: true,
			headerStyle: (colum, colIndex) => {
			return { width: '300px', textAlign: 'left' };
			},
			style: {
                'whiteSpace': 'wrap',
                "verticalAlign": "middle"
            }
		}
    ];

	constructor(props, context) {
        super(props, context);

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
            border: {

                input: {
          
                  border: '2px solid red',
          
                  borderTop: 0,
          
                  borderRight: 0,
          
                  borderBottom: '2px solid transparent',
          
                  borderLeft: 0,
          
                  outlineFocused: 0,
          
                  borderFocused: 0,
          
                  borderTopFocused: 0,
          
                  borderLeftFocused: 0,
          
                  borderBottomFocused: `2px solid red`,
          
                  borderRightFocused: 0,
          
                  borderRadius: 14,
          
                },
          
                pickerInput: {
          
                  borderWidth: 1,
          
                  borderStyle: 'solid',
          
                  borderRadius: 0,
          
                },
          
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
        
        const genero = Linq.from(opcionesGenero).firstOrDefault(item => {
            return item.value === 't'; 
        });

        this.dataFormJobOffer = null;

        this.actionForm = "";
        this.isValidatingForm = false;

		this.state = {
            
            isDataJobOfferLoaded: false,
            idJobOffer: null,
            codigoOferta: '',

            /**
             * Context
             */
            bPersonaJuridica: null,
            dataEmployer: null,
			
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
             * Lista resultados API
             */
            countries: [],
            regions: [],
            communes: [],
            professions: [],
            idioms: [],
            typesContracts: [],
            typesSalaries: [],
            typesPaymentPeriodicity: [],
            /** 
             * Opciones
             */
            opcionesCategoriasEmpleos: [],
            opcionesGenero: [],
            opcionesInformatica: [],
            opcionesPaises: [],
            opcionesRegiones: [],
            opcionesComunas: [],
            opcionesProfesiones: [],
            opcionesNivelesEducacionales: [],
            opcionesEstadoNivelEducacionalRequisito: [],
            opcionesIdiomas: [],
            opcionesNivelesIdiomas: [],
            opcionesTiposContratos: [],
            opcionesTiposSalarios: [],
            opcionesTiposPeriodidadPago: [],
            /**
             * Lugar de trabajo
             */
            placeToWork: 0, //0,1,2
            isLoadingSelectRemotoPais: true,
            isLoadingSelectRemotoRegiones: true,
            isLoadingSelectRemotoComunas: true,
            isLoadingSelectPresencialPais: true,
            isLoadingSelectPresencialRegiones: true,
            isLoadingSelectPresencialComunas: true,
        
            /**
             * Lugar de trabajo: presencial
             */
            selectedPresencialCountry: null,
            selectedPresencialRegion: null,
            selectedPresencialCommune: null,
            
            /**
             * Lugar de trabajo: remoto
             */
            alertRemoteWork: true,
            allowPlacesToWorkRemotly: [],
            selectedRemoteCountry: null,
            selectedRemoteRegion: null, 
            selectedRemoteCommune: null,

            cityRemoteWork: '',
            addressRemoteWork: '',

            experiencies: [],
            idiomsRequire: [],
            questionsList: [],

            pregunta: '',

            /**
             * Datos formulario oferta de trabajo
             */
            dataForm: {
                cbEmpleadorConficencial: false,
                descripcionEmpresaConfidencial: '',
                puesto: '',
                descripcionPuesto: '',
                selectCategoriaEmpleo: null,
                cbDiscapacidad: false,
                genero: genero,
                cbRangoEtario: false,
                edadMinima: 19,
                edadMaxima: 24,
                cbInformatica: false,
                informatica: null,
                
                ciudadPresencial: '',
                direccionPresencial: '',
                obsPresencial: '',

                cbRemotoTodoMundo: false,
                obsRemote: '',

                cbDisponibilidadViajar: false,
                cbSalidaTerreno: false,
                cbCambioResidencia: false,
                cbDisponibilidadInmediata: false,
                fechaComienzo: moment().clone().add(1, 'days'),
                professions: [],
                nivelEducacional: null,
                situacionActualMinima: null,

                aspectosPersonales: '',
                otrosRequisitos: '',
                
                
                
                
                
                
                /**
                 * Oferta
                 */
                vacantes: 1,
                tipoContrato: null,
                jornada: '',
                horario: '',
                acercaContratacion: '',
                cbMostrarRenta: true,
                rentaMaxima: '',
                tipoMoneda: null,
                tipoPago: null,
                periodicidadPago: null,
                cbRentaConvenir: false,
                acercaPago: '',
                beneficios: '',
                cbHomeOffice: false,
                cbHorarioFlexible: false,
            },
		}

		this.toggleModal = this.toggleModal.bind(this);
        this.setOpenModal = this.setOpenModal.bind(this);
        this.previewJobOffer = this.previewJobOffer.bind(this);

		this.notify = this.notify.bind(this);
		this.dismissNotify = this.dismissNotify.bind(this);
		
        this.validateForm = this.validateForm.bind(this);
        
        this.selectPlaceToWork = this.selectPlaceToWork.bind(this);

        this.onChangePaisRemoto = this.onChangePaisRemoto.bind(this);

        this.deleteRowRemoteLocation = this.deleteRowRemoteLocation.bind(this);
        
        this.onDismissAlertRemoteWork = this.onDismissAlertRemoteWork.bind(this);

        this.deleteRowExperience = this.deleteRowExperience.bind(this);
        this.addExperience = this.addExperience.bind(this);

        this.deleteIdiom = this.deleteIdiom.bind(this);
        this.addIdiom = this.addIdiom.bind(this);

        this.addQuestion = this.addQuestion.bind(this);
        this.addObservation = this.addObservation.bind(this);
        this.deleteQuestion = this.deleteQuestion.bind(this);

        this.onFocusChange_fechaComienzo = this.onFocusChange_fechaComienzo.bind(this);

        this.redirectWhenPublishToManagerJobsOffer = this.redirectWhenPublishToManagerJobsOffer.bind(this);

        this.notifyWhenPublish = this.notifyWhenPublish.bind(this);
        this.callbackCloseModalPublish = this.callbackCloseModalPublish.bind(this);
        this.callbackModalPublish = this.callbackModalPublish.bind(this);
    }
    
    submitForm = {}
  
    UNSAFE_componentWillReceiveProps(nextProps, nextState){

        const { countries, regions, communes, employmentCategories, professions, educationalLevel, idioms, typesContracts, typesSalaries, typesPaymentPeriodicity, jobsOffersEmployersList, resultJobOfferCreated} = nextProps;

        if(this.props.jobsOffersEmployersList !== jobsOffersEmployersList){
            
            if(jobsOffersEmployersList && jobsOffersEmployersList.data){
                
                const listJobsOffers = [...jobsOffersEmployersList.data.data];
                
                if(listJobsOffers.length > 0){
                    //console.log(listJobsOffers);
                    
                    const jobsOffersData = listJobsOffers[0];
                    
                    if(jobsOffersData.empleador){
                        const { bPersonaJuridica } = jobsOffersData.empleador;
                        
                        this.setState({
                            dataEmployer: jobsOffersData.empleador,
                            bPersonaJuridica
                        });
            
                    }
                    
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

                        if(jobsOffersData.allowPlaceToWorkOnSite.country){
                            
                            this.props.getRegions({ action: "LOAD REGIONS", idPais: jobsOffersData.allowPlaceToWorkOnSite.country.id});        
                        }

                        if(jobsOffersData.allowPlaceToWorkOnSite.region){
                            
                            this.props.getCommunes({ action: "LOAD COMMUNES", idRegion: jobsOffersData.allowPlaceToWorkOnSite.region.id});    
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

                    let auxObservationList = [];

                    if(jobsOffersData.observaciones){
                        auxObservationList = jobsOffersData.observaciones.map((item, index) => {
                            return {id: index, observation: item};
                        });
                    }

                    let genero = null;

                    if(jobsOffersData.genero){
                        genero = {
                            value: jobsOffersData.genero.id,
                            label: jobsOffersData.genero.label,
                            code: jobsOffersData.genero.code,
                        }
                    }
                    //console.log(jobsOffersData);
                    const auxDataForm =  {
                        bPersonaJuridica:  jobsOffersData.empleador.bPersonaJuridica ? jobsOffersData.empleador.bPersonaJuridica : false,
                        cbEmpleadorConficencial: jobsOffersData.bEmpleadorConficencial,
                        descripcionEmpresaConfidencial: jobsOffersData.descripcionEmpresaConfidencial ? jobsOffersData.descripcionEmpresaConfidencial : '',
                        puesto: jobsOffersData.puesto ? jobsOffersData.puesto : '',
                        descripcionPuesto: jobsOffersData.descripcion ? jobsOffersData.descripcion : '',
                        selectCategoriaEmpleo: selectCategoriaEmpleo,
                        cbDiscapacidad: jobsOffersData.bDiscapacidad ? jobsOffersData.bDiscapacidad : false,
                        cbInformatica: jobsOffersData.bInformatica ? jobsOffersData.bInformatica : false,
                        informatica: auxConocimientosInformatica,
                        cbRemotoTodoMundo: jobsOffersData.bRemotoTodoMundo ? jobsOffersData.bRemotoTodoMundo : false,
                        obsRemote: jobsOffersData.obsRemote ? jobsOffersData.obsRemote : '',
                        
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

                        aspectosPersonales: jobsOffersData.aspectosPersonales ? jobsOffersData.aspectosPersonales : '',
                        otrosRequisitos: jobsOffersData.otrosRequisitos ? jobsOffersData.otrosRequisitos : '',
                        
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
                        cbRangoEtario: jobsOffersData.bRangoEtario ? jobsOffersData.bRangoEtario : false,
                        edadMaxima: jobsOffersData.edadMaxima ? jobsOffersData.edadMaxima : 120,
                        edadMinima: jobsOffersData.edadMinima ? jobsOffersData.edadMinima : 18,
                        genero: genero
                    };

                    this.dataFormJobOffer = {...auxDataForm};

                    this.setState(prevState => ({
                        ...prevState,
                        isDataJobOfferLoaded: true,
                        codigoOferta: jobsOffersData.codigo,
                        placeToWork: jobsOffersData.placeToWork,
                        allowPlacesToWorkRemotly: auxAllowPlacesToWorkRemotly,
                        experiencies: auxExperiences,
                        idiomsRequire: auxIdiomsRequire,
                        questionsList: auxQuestionList,
                        observationList: auxObservationList,
                        dataForm: {
                            ...prevState.dataForm,
                            ...auxDataForm, 
                        }
                    }));

                    

                }
            }

        }
        
        if(this.props.resultJobOfferCreated !== resultJobOfferCreated){

            if(resultJobOfferCreated){

                //console.log(resultJobOfferCreated);
                this.dismissNotify();
            }

            if(this.actionForm === 'publish'){
                this.redirectWhenPublishToManagerJobsOffer();
            }
            
        }

        if(this.props.typesPaymentPeriodicity !== typesPaymentPeriodicity){
            //console.log(typesPaymentPeriodicity);

            if(isIterable(typesPaymentPeriodicity)){
                let tiposPeriodidadPago = [...typesPaymentPeriodicity];

                tiposPeriodidadPago = Linq.from(tiposPeriodidadPago).orderBy(item => {
                    return item.orden; 
                }).toArray();

                const opcionesTiposPeriodidadPago = tiposPeriodidadPago.map( item => {
                    return { value: item.id, label: item.nombre };
                });

                this.setState({
                    typesPaymentPeriodicity: typesPaymentPeriodicity,
                    opcionesTiposPeriodidadPago: opcionesTiposPeriodidadPago,
                });
            }
        }

        if(this.props.typesSalaries !== typesSalaries){
            //console.log(typesSalaries);

            if(isIterable(typesSalaries)){
                let tiposSalarios = [...typesSalaries];

                tiposSalarios = Linq.from(tiposSalarios).orderBy(item => {
                    return item.orden; 
                }).toArray();

                const opcionesTiposSalarios = tiposSalarios.map( item => {
                    return { value: item.id, label: item.nombre };
                });

                this.setState({
                    typesSalaries: typesSalaries,
                    opcionesTiposSalarios: opcionesTiposSalarios,
                });
            }
        }

        if(this.props.typesContracts !== typesContracts){
            //console.log(typesContracts);

            if(isIterable(typesContracts)){
                let tiposContratos = [...typesContracts];

                tiposContratos = Linq.from(tiposContratos).orderBy(item => {
                    return item.orden; 
                }).toArray();

                const opcionesTiposContratos = tiposContratos.map( item => {
                    return { value: item.id, label: item.nombre };
                });

                this.setState({
                    typesContracts: typesContracts,
                    opcionesTiposContratos: opcionesTiposContratos,
                });
            }
        }

        if(this.props.idioms !== idioms){
            //console.log(idioms);

            if(isIterable(idioms)){
                let idiomas = [...idioms];

                idiomas = Linq.from(idiomas).orderBy(item => {
                    return item.nombre; 
                }).toArray();

                const opcionesIdiomas = idiomas.map( item => {
                    return { value: item.id, label: item.nombre };
                });

                this.setState({
                    idioms: idioms,
                    opcionesIdiomas: opcionesIdiomas,
                });
            }
        }

        if(this.props.educationalLevel !== educationalLevel){
            //console.log(educationalLevel);

            if(isIterable(educationalLevel)){
                let nivelesEducacionales = [...educationalLevel];

                nivelesEducacionales = Linq.from(nivelesEducacionales).orderBy(item => {
                    return item.orden; 
                }).toArray();

                const opcionesNivelesEducacionales = nivelesEducacionales.map( item => {
                    return { value: item.id, label: item.nombre };
                });

                this.setState({
                    educationalLevel: educationalLevel,
                    opcionesNivelesEducacionales: opcionesNivelesEducacionales,
                });
            }
        }

        if(this.props.professions !== professions){
            //console.log(professions);
            if(isIterable(professions)){
                let profesiones = [...professions];

                profesiones = Linq.from(profesiones).orderBy(item => {
                    return item.nombre; 
                }).toArray();

                const opcionesProfesiones = profesiones.map( item => {
                    return { value: item.id, label: item.nombre };
                });

                this.setState({
                    professions: professions,
                    opcionesProfesiones: opcionesProfesiones,
                });
            }
        }

        if(this.props.countries !== countries  /*&& isIterable(countries) && !countries.error*/){
            //console.log(countries);
            if(isIterable(countries)){
                let paises = [...countries];

                paises = Linq.from(paises).orderBy(item => {
                    return item.nombre; 
                }).toArray();

                const opcionesPaises = paises.map( item => {
                    return { value: item.id, label: item.nombre };
                });

                this.setState({
                    countries: countries,
                    opcionesPaises: opcionesPaises,
                    isLoadingSelectRemotoPais: false,
                    isLoadingSelectPresencialPais: false,
                });
            }
        }

        if(this.props.regions !== regions){
            //console.log(regions);
            if(isIterable(regions)){
                let regiones = [...regions];

                regiones = Linq.from(regiones).orderBy(item => {
                    return item.nombre; 
                }).toArray();

                const opcionesRegiones = regiones.map( item => {
                    return { value: item.id, label: item.nombre };
                });
                //console.log(opcionesRegiones);
                this.setState({
                    regions: regions,
                    opcionesRegiones: opcionesRegiones,
                    isLoadingSelectRemotoRegiones: false,
                    isLoadingSelectPresencialRegiones: false,
                });
            }
        }

        if(this.props.communes !== communes){
            //console.log(communes);

            /*let comunas = [...communes];

            comunas = Linq.from(comunas).orderBy(item => {
                return item.nombre; 
            }).toArray();

            const opcionesComunas = comunas.map( item => {
                return { value: item.id, label: item.nombre };
            });

            this.setState({
                communes: communes,
                opcionesComunas: opcionesComunas,
                isLoadingSelectRemotoComunas: false
			});*/
			
            if(isIterable(communes)){

                let comunas = [...communes];

                /*comunas = [...Linq.from(comunas)
                    .where(item  => { 

                        let contains = false;

                        for(let i = 0; i < this.state.allowPlacesToWorkRemotly.length; i++){
                            if(this.state.allowPlacesToWorkRemotly[i].commune 
                                && this.state.allowPlacesToWorkRemotly[i].commune.value === item.id){
                                contains = true;
                                break;
                            }
                        }

                        return !contains; } )
                    .orderBy(item => {
                        return item.nombre; 
                    }).toArray()];*/
                    
                //console.log(paises);
                
                const opcionesComunas = comunas.map( item => {
                    //console.log(item);
                    return { value: item.id, label: item.nombre };
                });

                this.setState({
                    communes: communes,
                    opcionesComunas: opcionesComunas,
                    isLoadingSelectRemotoComunas: false,
                    isLoadingSelectPresencialComunas: false,
                });
            }

        }

        if(this.props.employmentCategories !== employmentCategories){
            //console.log(employmentCategories);
            if(isIterable(employmentCategories)){
                let categoriasEmpleos = [...employmentCategories];

                categoriasEmpleos = Linq.from(categoriasEmpleos).orderBy(item => {
                    return item.nombre; 
                }).toArray();

                const opcionesCategoriasEmpleos = categoriasEmpleos.map( item => {
                    return { value: item.id, label: item.nombre };
                });
                //console.log(opcionesRegiones);
                this.setState({
                    opcionesCategoriasEmpleos:opcionesCategoriasEmpleos
                });
            }
        }
        
        
    }

    componentDidMount(){

        const { idJobOffer } = this.props.match.params;
        
        //const {idJobOffer} = this.props.history.location;
        if(idJobOffer){  
            this.props.getJobsOffersEmployers({ id: idJobOffer, pageSize: 1, pageIndex: 0, keySearch: "", bShowDisableRegisters: null });
        }
        else{
            this.props.history.push({
                pathname: '/area/admin/ofertas',
                //search: '?the=search',
                state: { idJobOffer: null }
            });
        }

        this.setState(() => ({idJobOffer}));

        //window.addEventListener('beforeunload', this.keepOnPage);

        let opcionesInformaticaOrdered = [...opcionesInformatica];

        opcionesInformaticaOrdered = Linq.from(opcionesInformaticaOrdered).orderBy(item => {
                return item.orden; 
            }).toArray();
   
        this.setState({
            opcionesNivelesIdiomas: opcionesNivelesIdiomas,
            opcionesGenero: opcionesGenero,
            opcionesInformatica: opcionesInformaticaOrdered,
            opcionesEstadoNivelEducacionalRequisito: opcionesEstadoNivelEducacionalRequisito
        });

        
        this.props.getCountries({ action: "LOAD COUNTRIES"});
        this.props.getEmploymentCategories({action: "LOAD EMPLOYMENT CATEGORIES"});
        this.props.getProfessions({action: "LOAD PROFESSIONS"});
        this.props.getEducationalLevel({action: "LOAD EDUCATIONAL LEVELS"});
        this.props.getIdioms({action: "LOAD IDIOMS"});
        this.props.getTypesContracts({ action: "LOAD TYPES CONTRACTS" });
        this.props.getTypesSalaries({ action: "LOAD TYPES SALARIES" });
        this.props.getTypesPaymentPeriodicity({ action: "LOAD TYPES PAYMENT PERIODICITY" });
    }

      
    keepOnPage(e) {
        var message = 'Warning!\n\nNavigating away from this page will delete your text if you haven\'t already saved it.';
        e.returnValue = message;
        
        return message;
    }
    
	toastId = null;

    notify = (msj) => { 
        
        this.toastId = toast.info(msj, {
            position: toast.POSITION.BOTTOM_RIGHT/*,
            autoClose: 3000*/
        }); 
    }

    onDismissAlertRemoteWork() {
        this.setState({ alertRemoteWork: false });
    }

    dismissNotify = () =>  {

        setTimeout(() => {
            if(this.toastId){
                toast.dismiss(this.toastId);
                this.toastId = null;
            }
        }, 1000);
        
    }

    toggleModal() {
        this.setState({
          modal: !this.state.modal
        });
    }

    setOpenModal(isOpen, size, modalMsjButttoOk,classNameModal, titleModal,contentModal,hiddenFooterModal = false) {
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


    previewJobOffer = (e) => {
        e.preventDefault();

        /*const listKnowledgeTI = this.state.dataForm.informatica ? this.state.dataForm.informatica.map((item, index) => {
            return item.label;
        }) : [];*/      

        const { cbEmpleadorConficencial, descripcionEmpresaConfidencial, puesto, selectCategoriaEmpleo, descripcionPuesto, cbDiscapacidad, informatica, cbInformatica ,cbRemotoTodoMundo, obsRemote, 
            selectPresencialPais, selectPresencialRegion, selectPresencialComuna, ciudadPresencial, direccionPresencial, obsPresencial, cbDisponibilidadViajar, cbSalidaTerreno, cbCambioResidencia, cbDisponibilidadInmediata, fechaComienzo, 
            profesiones, nivelEducacional, situacionActualMinima, aspectosPersonales, otrosRequisitos,
            vacantes, tipoContrato, jornada, horario, acercaContratacion, cbRentaConvenir,
            cbMostrarRenta, rentaMaxima, tipoMoneda, tipoPago, periodicidadPago, acercaPago, beneficios, cbHomeOffice, cbHorarioFlexible, bPersonaJuridica} = this.dataFormJobOffer || {};
       
        const auxAllowPlacesToWorkRemotly =isIterable(nivelEducacional) ?  this.state.allowPlacesToWorkRemotly.map((item) => {

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

        const auxIdiomsRequire =isIterable(this.state.idiomsRequire) ?  this.state.idiomsRequire.map((item) => {
            return {idiom: item.idiom.label, nivel: item.nivel.label};
        }) : null;

        const auxQuestionsList =isIterable(this.state.questionsList) ?  this.state.questionsList.map((item) => {
            return item.question;
        }) : null;

        const content = 
            <CustomJobOfferPreview dataForm={{
                bEmpleadorConficencial: cbEmpleadorConficencial,
                empresa: cbEmpleadorConficencial ? descripcionEmpresaConfidencial : this.state.dataEmployer.nombreComercialEmpresa ,
                urlImgAvatar: `${webConfig.urlImages}/${this.state.dataEmployer.rutaLogoEmpresa}`,
                puesto: puesto,
                descripcionPuesto: descripcionPuesto,
                categoriaEmpleo: selectCategoriaEmpleo ? selectCategoriaEmpleo.label : '',
                bDiscapacidad: cbDiscapacidad,
                informatica: (cbInformatica && informatica.map((item) => { return item.label;})) || null,
                placeToWork: this.state.placeToWork,
                bRemotoTodoMundo: cbRemotoTodoMundo,
                obsRemote: obsRemote,
                allowPlacesToWorkRemotly: auxAllowPlacesToWorkRemotly,
                bPersonaJuridica: bPersonaJuridica ? bPersonaJuridica : false,
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
                experiencies: this.state.experiencies,
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
            
        this.setOpenModal(true, 'lg', 'Listo!', 'modal-info', "Previsualización Oferta de Trabajo", content, false);

        return true;
    }
	
	validateForm(e, action){
        if(action === 'save'){
           // e.preventDefault();
        }
        
        this.actionForm = action;
        this.isValidatingForm = true;
		
        this.submitForm(); 

        
    }
    
    redirectWhenPublishToManagerJobsOffer = () => {
        this.props.history.push({
            pathname: '/area/admin/ofertas'
        });
    }

    notifyWhenPublish = (e, action, values, errors) => {
        
        e.preventDefault();
        
        CreateJobOfferValidation({action, values, errors, setOpenModal: this.setOpenModal, callbackModalPublish: this.callbackModalPublish, callbackCloseModalPublish: this.callbackCloseModalPublish, state: {...this.state}});
    }

    callbackModalPublish = (action) => {
        this.setState( {modal:false} );
        this.actionForm = action;
        this.isValidatingForm = true;
        this.submitForm();
    }

    callbackCloseModalPublish = () => {
        this.setState( { modal:false } );
        this.actionForm = "";
        this.isValidatingForm = false;
    }

    selectPlaceToWork(value){
        this.setState({placeToWork:value});
    }

    onChangePaisPresencial = (e) => {
		
        this.setState({
            opcionesRegiones: [], 
            opcionesComunas: [],
            cityRemoteWork: '',
        });

        if(e){
            this.setState({

				selectedPresencialCountry: e,
				selectedPresencialRegion: null,
				selectedPresencialCommune: null,
                isLoadingSelectPresencialRegiones: true, });
            this.props.getRegions({ action: "LOAD REGIONS", idPais: e.value});          
        }
    }

    onChangeRegionPresencial = (e) => {
       
        this.setState({
            opcionesComunas: []
        });

        if(e){
            
            this.setState({
				selectedPresencialRegion: e,
				selectedPresencialCommune: null,
                isLoadingSelectPresencialComunas: true});
            this.props.getCommunes({ action: "LOAD COMMUNES", idRegion: e.value});
        }

    }

    onChangeCommunePresencial = (e) => {
        //console.log(e);
        if(e){
            this.setState({selectedPresencialCommune: e});
        }
    }

    onChangePaisRemoto = (e) => {
		
        this.setState({
            opcionesRegiones: [], 
            opcionesComunas: [],
            cityRemoteWork: '',
        });

        if(e){
            this.setState({

				selectedRemoteCountry: e,
				selectedRemoteRegion: null,
				selectedRemoteCommune: null,
                isLoadingSelectRemotoRegiones: true, });
            this.props.getRegions({ action: "LOAD REGIONS", idPais: e.value});          
        }
    }

    onChangeRegionRemoto = (e) => {
       
        this.setState({
            opcionesComunas: []
        });

        if(e){
            
            this.setState({
				selectedRemoteRegion: e,
				selectedRemoteCommune: null,
                isLoadingSelectRemotoComunas: true});
            this.props.getCommunes({ action: "LOAD COMMUNES", idRegion: e.value});
        }

    }

    onChangeCommuneRemoto = (e) => {
        //console.log(e);
        if(e){
            this.setState({selectedRemoteCommune: e});
        }
    }

    deleteRowRemoteLocation = (idRow) => {
        
        const allowPlacesToWorkRemotly = [...this.state.allowPlacesToWorkRemotly];

        const newAllowPlacesToWorkRemotly = [...allowPlacesToWorkRemotly.filter( item => item.id !== idRow)];

        this.setState({allowPlacesToWorkRemotly: newAllowPlacesToWorkRemotly});
        
        // Recargar Selects
        let paises = [...this.state.countries];

        paises = [...Linq.from(paises)
            .where(item  => { 

                let contains = false;

                for(let i = 0; i < newAllowPlacesToWorkRemotly.length; i++){
                    if(newAllowPlacesToWorkRemotly[i].country && newAllowPlacesToWorkRemotly[i].country.value === item.id
                        && !newAllowPlacesToWorkRemotly[i].region
                        && !newAllowPlacesToWorkRemotly[i].commune){
                        contains = true;
                        break;
                    }
                }

                return !contains; } )
            .orderBy(item => {
                return item.nombre; 
            }).toArray()];
           
        const opcionesPaises = paises.map( item => {
            return { value: item.id, label: item.nombre };
        });

        let regiones = [...this.state.regions];

        regiones = [...Linq.from(regiones)
            .where(item  => { 

                let contains = false;

                for(let i = 0; i < newAllowPlacesToWorkRemotly.length; i++){
                    if(newAllowPlacesToWorkRemotly[i].region && newAllowPlacesToWorkRemotly[i].region.value === item.id
                        && !newAllowPlacesToWorkRemotly[i].commune){
                        contains = true;
                        break;
                    }
                }

                return !contains; } )
            .orderBy(item => {
                return item.nombre; 
            }).toArray()];

        const opcionesRegiones = regiones.map( item => {
            return { value: item.id, label: item.nombre };
		});
		
		let comunas = [...this.state.communes];
	
        comunas = [...Linq.from(comunas)
            .where(item  => { 
                let contains = false;
                
                for(let i = 0; i < newAllowPlacesToWorkRemotly.length; i++){
                    if(newAllowPlacesToWorkRemotly[i].commune && newAllowPlacesToWorkRemotly[i].commune.value === item.id){
                        contains = true;
                        break;
                    }
                }

                return !contains; } )
            .orderBy(item => {
                return item.nombre; 
            }).toArray()];
		
        const opcionesComunas = comunas.map( item => {
            return { value: item.id, label: item.nombre };
		});

        this.setState({
            opcionesPaises: opcionesPaises,
			opcionesRegiones: opcionesRegiones,
			opcionesComunas: opcionesComunas,
        });
    }

    addAllowPlacesToWorkRemotly = (e, cityRemoteWork, addressRemoteWork) => {
		e.preventDefault();
		
        let { allowPlacesToWorkRemotly, selectedRemoteCountry, selectedRemoteRegion, selectedRemoteCommune } = {...this.state};

		if(!selectedRemoteCountry) return;

        let existsLocation = false;

        const selectIdCountry = selectedRemoteCountry ? selectedRemoteCountry.value : null;
        const selectIdRegion = selectedRemoteRegion ? selectedRemoteRegion.value : null;
        const selectIdCommune = selectedRemoteCommune ? selectedRemoteCommune.value : null;
        
		for(let i = 0; i < allowPlacesToWorkRemotly.length; i++){

            const country = allowPlacesToWorkRemotly[i].country ? allowPlacesToWorkRemotly[i].country.value: null;
            const region = allowPlacesToWorkRemotly[i].region ? allowPlacesToWorkRemotly[i].region.value: null;
            const commune = allowPlacesToWorkRemotly[i].commune ? allowPlacesToWorkRemotly[i].commune.value: null;
            const cityRemoteWorkSaved = allowPlacesToWorkRemotly[i].cityRemoteWork ? allowPlacesToWorkRemotly[i].cityRemoteWork: null;
            const addressRemoteWorkSaved = allowPlacesToWorkRemotly[i].addressRemoteWork ? allowPlacesToWorkRemotly[i].addressRemoteWork: null;

            
            if(country === selectIdCountry &&  region === selectIdRegion && commune === selectIdCommune && 
                cityRemoteWorkSaved === cityRemoteWork && addressRemoteWorkSaved === addressRemoteWork){
                return;
            }
            else if(country === selectIdCountry &&  region === selectIdRegion && commune === selectIdCommune && cityRemoteWorkSaved === cityRemoteWork && !addressRemoteWork){
                return;
            }
            else if(country === selectIdCountry &&  region === selectIdRegion && commune === selectIdCommune && !cityRemoteWork && !addressRemoteWork){
                return;
            }
            else if(country === selectIdCountry &&  region === selectIdRegion && !selectIdCommune && !cityRemoteWork && !addressRemoteWork){
                return;
            }
            else if(country === selectIdCountry &&  !selectIdRegion && !selectIdCommune && !cityRemoteWork && !addressRemoteWork){
                return;
            }
        }
        
        if(existsLocation) return;
        
        let index = allowPlacesToWorkRemotly.length > 0 ? Linq.from(allowPlacesToWorkRemotly).max(item => {
                 return item.id; 
            }) + 1 : 1;

        allowPlacesToWorkRemotly.push({
            id: index,
            country: selectedRemoteCountry,
            region: selectedRemoteRegion,
            commune: selectedRemoteCommune,
            cityRemoteWork: cityRemoteWork,
            addressRemoteWork: addressRemoteWork,
        });


        this.setState({allowPlacesToWorkRemotly});
    }

    deleteRowExperience = (idRow) => {
        const experiencies = [...this.state.experiencies];

        const newExperiencies = [...experiencies.filter( item => item.id !== idRow)];

        this.setState({experiencies: newExperiencies});
    }
    
    addExperience = (e, experiencie) => {

        e.preventDefault();

        let experiencies = [...this.state.experiencies]; 
        //console.log(experiencie);
        const exists = Linq.from(experiencies).firstOrDefault(item => {
            //console.log(item);
            return item.experience === experiencie.experience}
            );
        //console.log(exists);
        if(exists) return;
        
        let index = experiencies.length > 0 ? Linq.from(experiencies).max(item => {
            return item.id; 
        }) + 1 : 1;

        experiencie.id = index;

        experiencies.push(experiencie);
        this.setState({experiencies});
        
    }
    
    addIdiom = (e, idiom) => {
        e.preventDefault();
        
        let idioms = [...this.state.idiomsRequire]; 
        
        const exists = Linq.from(idioms).firstOrDefault(item => {
            
            return item.idiom.label === idiom.idiom.label}
            );
        
        if(exists) return;
        
        let index = idioms.length > 0 ? Linq.from(idioms).max(item => {
            return item.id; 
        }) + 1 : 1;
        
        idiom.id = index;
        
        idioms.push(idiom);

        let auxIdioms = [...this.state.idioms];

        auxIdioms = [...Linq.from(auxIdioms)
            .where(item  => { 

                let contains = true;

                for(let i = 0; i < idioms.length; i++){
                    if(idioms[i].idiom.label === item.nombre){
                        contains = false;
                        break;
                    }
                }

                return contains; } )
            .orderBy(item => {
                return item.nombre; 
            }).toArray()];
            
        let opcionesIdiomas = auxIdioms.map( item => {
            return { value: item.id, label: item.nombre };
        });

        this.setState({
            opcionesIdiomas: opcionesIdiomas,
            idiomsRequire: idioms});
    }

    deleteIdiom  = (idRow) => {
        const idioms = [...this.state.idiomsRequire];

        const newIdioms = [...idioms.filter( item => item.id !== idRow)];

        let auxIdioms = [...this.state.idioms];

        auxIdioms = [...Linq.from(auxIdioms)
            .where(item  => { 

                let contains = true;

                for(let i = 0; i < newIdioms.length; i++){
                    if(newIdioms[i].idiom.value === item.id){
                        contains = false;
                        break;
                    }
                }

                return contains; } )
            .orderBy(item => {
                return item.nombre; 
            }).toArray()];
            
        let opcionesIdiomas = auxIdioms.map( item => {
            return { value: item.id, label: item.nombre };
        });

        this.setState({
            opcionesIdiomas: opcionesIdiomas,
            idiomsRequire: newIdioms});
    }

    addQuestion = (e, question) => {
        e.preventDefault();

        const item = { id: 0, question: question};

        let questionsList = [...this.state.questionsList];

        let index = questionsList.length > 0 ? Linq.from(questionsList).max(item => {
            return item.id; 
        }) + 1 : 1;
        
        item.id = index;

        questionsList.push(item);

        this.setState({
            questionsList
        });
    }

    addObservation = (e, observation) => {
        e.preventDefault();

        const item = { id: 0, observation: observation};

        let observationList = [...this.state.observationList];

        let index = observationList.length > 0 ? Linq.from(observationList).max(item => {
            return item.id; 
        }) + 1 : 1;
        
        item.id = index;

        observationList.push(item);

        this.setState({
            observationList
        });
    }

    deleteQuestion = (questionId) => {
        let questionsList = [...this.state.questionsList];
        const newQuestionList = [...questionsList.filter( item => item.id !== questionId)];

        this.setState({
            questionsList: newQuestionList
        });
    }

    deleteObservation = (observationId) => {
        let observationList = [...this.state.observationList];
        const newObservationList = [...observationList.filter( item => item.id !== observationId)];

        this.setState({
            observationList: newObservationList
        });
    }

    onFocusChange_fechaComienzo({ focused }) {
        this.setState(() => ({
          focused
        }));
    }

    randomNumber() {
        const min = 1;
        const max = 100;
        const rand = min + Math.random() * (max - min);
        return rand;
    }

    returnYears = () => {
        let years = []
        for(let i = moment().year() - 5 ; i <= moment().year() + 3; i++) {
            years.push(<option key={this.randomNumber() } value={i}  >{i}</option>);
        }
        return years;
    }

    renderMonthElement = ({ month, onMonthSelect, onYearSelect }) => {
    
        return(
<div style={{ display: 'flex', justifyContent: 'center' }}>
            <div>
                <select
                    value={month.month()}
                    onChange={(e) => onMonthSelect(month, e.target.value)}
                >
                    {moment.months().map((label, value) => (
                        <option key={this.randomNumber() } value={value} >{label}</option>
                    ))}
                </select>
            </div>
            <div>
                <select value={month.year()} onChange={(e) => onYearSelect(month, e.target.value)}>
                    {this.returnYears()}
                </select>
            </div>
        </div>
        )
    }

	render() {

        let formCreateJobOfferJsx =  
        <Row>
            <Col xs="12" className="text-center" >
                <strong>Buscando la oferta de empleo...</strong>
            </Col>
        </Row>
        
        
        if(this.state.isDataJobOfferLoaded){
            formCreateJobOfferJsx = 
        <>
            <Formik
                enableReinitialize={false}
                initialValues={{  
                    cbEmpleadorConficencial: this.state.dataForm.cbEmpleadorConficencial, 
                    descripcionEmpresaConfidencial: this.state.dataForm.descripcionEmpresaConfidencial,
                    puesto: this.state.dataForm.puesto, 
                    descripcionPuesto: this.state.dataForm.descripcionPuesto,
                    selectCategoriaEmpleo: this.state.dataForm.selectCategoriaEmpleo,
                    cbDiscapacidad: this.state.dataForm.cbDiscapacidad,
                    genero:  this.state.dataForm.genero,
                    cbRangoEtario: this.state.dataForm.cbRangoEtario,
                    edadMinima: this.state.dataForm.edadMinima,
                    edadMaxima: this.state.dataForm.edadMaxima,
                    cbInformatica: this.state.dataForm.cbInformatica,
                    informatica: this.state.dataForm.informatica,
                    placeToWork: this.state.placeToWork,

                    cbRemotoTodoMundo: this.state.dataForm.cbRemotoTodoMundo,
                    obsRemote: this.state.dataForm.obsRemote,
                    selectRemotoPais: null,
                    selectRemotoRegion: null,
                    selectRemotoComuna: null,
                    ciudadRemoto: '',
                    direccionRemoto: '',
                    allowPlacesToWorkRemotly: this.state.allowPlacesToWorkRemotly,

                    selectPresencialPais: this.state.dataForm.selectPresencialPais,
                    selectPresencialRegion: this.state.dataForm.selectPresencialRegion,
                    selectPresencialComuna: this.state.dataForm.selectPresencialComuna,
                    ciudadPresencial: this.state.dataForm.ciudadPresencial,
                    direccionPresencial: this.state.dataForm.direccionPresencial,
                    obsPresencial: this.state.dataForm.obsPresencial,

                    cbDisponibilidadViajar: this.state.dataForm.cbDisponibilidadViajar,
                    cbSalidaTerreno: this.state.dataForm.cbSalidaTerreno,
                    cbCambioResidencia: this.state.dataForm.cbCambioResidencia,
                    cbDisponibilidadInmediata: this.state.dataForm.cbDisponibilidadInmediata,
                    fechaComienzo: this.state.dataForm.fechaComienzo,
                    experiencies: this.state.experiencies,
                    experiencia: '',
                    nivelEducacional: this.state.dataForm.nivelEducacional,
                    situacionActualMinima: this.state.dataForm.situacionActualMinima,
                    profesiones: this.state.dataForm.profesiones,
                    aspectosPersonales: this.state.dataForm.aspectosPersonales,
                    otrosRequisitos: this.state.dataForm.otrosRequisitos,
                    /**
                     * Oferta
                     */
                    vacantes: this.state.dataForm.vacantes,
                    tipoContrato: this.state.dataForm.tipoContrato,
                    jornada: this.state.dataForm.jornada,
                    horario: this.state.dataForm.horario,
                    acercaContratacion: this.state.dataForm.acercaContratacion,
                    cbRentaConvenir: this.state.dataForm.cbRentaConvenir,

                    cbMostrarRenta: this.state.dataForm.cbMostrarRenta,
                    rentaMaxima: this.state.dataForm.rentaMaxima,
                    tipoMoneda: this.state.dataForm.tipoMoneda,
                    tipoPago: this.state.dataForm.tipoPago,
                    periodicidadPago: this.state.dataForm.periodicidadPago,
                    acercaPago: this.state.dataForm.acercaPago,

                    beneficios: this.state.dataForm.beneficios,
                    cbHomeOffice: this.state.dataForm.cbHomeOffice,
                    cbHorarioFlexible: this.state.dataForm.cbHorarioFlexible,

                    /* Otros */
                    pregunta: '',

                    /* Observaciones */
                    observacion: '',
                }}
                validate={ (values) => {
                    let errors = {};
                    
                    //CreateJobOfferValidation({action: this.actionForm, values, errors, setOpenModal: this.setOpenModal, callbackModalPublish: this.callbackModalPublish});

                    this.dataFormJobOffer = {
                        cbEmpleadorConficencial: values.cbEmpleadorConficencial,
                        descripcionEmpresaConfidencial: values.descripcionEmpresaConfidencial,
                        puesto: values.puesto,
                        descripcionPuesto: values.descripcionPuesto,
                        selectCategoriaEmpleo: values.selectCategoriaEmpleo, 
                        cbDiscapacidad: values.cbDiscapacidad,
                        informatica: values.informatica,
                        cbInformatica: values.cbInformatica,
                        placeToWork: this.state.placeToWork,
                        cbRemotoTodoMundo: values.cbRemotoTodoMundo,
                        obsRemote: values.obsRemote,
                        allowPlacesToWorkRemotly: this.state.allowPlacesToWorkRemotly,

                        selectPresencialPais: values.selectPresencialPais,
                        selectPresencialRegion: values.selectPresencialRegion,
                        selectPresencialComuna: values.selectPresencialComuna,
                        ciudadPresencial: values.ciudadPresencial,
                        direccionPresencial: values.direccionPresencial,
                        obsPresencial: values.obsPresencial,
                        cbDisponibilidadViajar: values.cbDisponibilidadViajar,
                        cbSalidaTerreno: values.cbSalidaTerreno,
                        cbCambioResidencia: values.cbCambioResidencia,
                        cbDisponibilidadInmediata: values.cbDisponibilidadInmediata,
                        fechaComienzo: values.fechaComienzo,
                        experiencies: this.state.experiencies,
                        profesiones: values.profesiones,
                        nivelEducacional: values.nivelEducacional,
                        situacionActualMinima: values.situacionActualMinima,
                        idiomsRequire: this.state.idiomsRequire,
                        aspectosPersonales: values.aspectosPersonales,
                        otrosRequisitos: values.otrosRequisitos,
                        vacantes: values.vacantes,
                        tipoContrato: values.tipoContrato,
                        jornada: values.jornada,
                        horario: values.horario,
                        acercaContratacion: values.acercaContratacion,
                        cbRentaConvenir: values.cbRentaConvenir,
                        cbMostrarRenta: values.cbMostrarRenta,
                        rentaMaxima: values.rentaMaxima,
                        tipoMoneda: values.tipoMoneda,
                        tipoPago: values.tipoPago,
                        periodicidadPago: values.periodicidadPago,
                        acercaPago: values.acercaPago,
                        beneficios: values.beneficios,
                        cbHomeOffice: values.cbHomeOffice,
                        cbHorarioFlexible: values.cbHorarioFlexible,
                        questionsList: this.state.questionsList,
                        observationList: this.state.observationList,
                        cbRangoEtario: values.cbRangoEtario,
                        edadMaxima: values.edadMaxima,
                        edadMinima: values.edadMinima
                    };
                    
                    return errors;
                }}
                
                onSubmit={(values, { setSubmitting }) => {

					//const {actionForm} = this.state;
					//console.log(values);
                    this.isValidatingForm = false;

                    this.setSubmitting = setSubmitting;
                    this.setSubmitting(false);

                    this.notify("Actualizando datos...");

                    
                    const auxCategoriaEmpleo = values.selectCategoriaEmpleo ? {
                        "id": values.selectCategoriaEmpleo.value,
                        "label": values.selectCategoriaEmpleo.label,
                    } : null;

                    let auxConocimientosInformatica = null;
                    if(values.informatica){
                        auxConocimientosInformatica = values.informatica.map((item) => {
                            return { id: item.value, label: item.label};
                        });
                    }

                    let auxAllowPlacesToWorkRemotly = null;
                    if(this.state.allowPlacesToWorkRemotly){
                        auxAllowPlacesToWorkRemotly = this.state.allowPlacesToWorkRemotly.map((item) => {
                            
                            let country = null;

                            if(item.country){
                                country = {
                                    id: item.country.value,
                                    label: item.country.label,
                                };
                            }

                            let region = null;

                            if(item.region){
                                region = {
                                    id: item.region.value,
                                    label: item.region.label,
                                };
                            }

                            let commune = null;

                            if(item.commune){
                                commune = {
                                    id: item.commune.value,
                                    label: item.commune.label,
                                };
                            }
                            

                            return { id: item.id, addressRemoteWork: item.addressRemoteWork, cityRemoteWork: item.cityRemoteWork, country: country,region: region, commune: commune};
                        });
                    }

                    const auxPaisPresencial = values.selectPresencialPais ? { id: values.selectPresencialPais.value, label:values.selectPresencialPais.label } : null;
                    const auxRegionPresencial = values.selectPresencialRegion ? { id: values.selectPresencialRegion.value, label:values.selectPresencialRegion.label } : null;
                    const auxComunaPresencial = values.selectPresencialComuna ? { id: values.selectPresencialComuna.value, label:values.selectPresencialComuna.label } : null;

                    let auxAllowPlaceToWorkOnSite = null;
                    if(auxPaisPresencial){
                        auxAllowPlaceToWorkOnSite = {
                            id: null,
                            addressWork: values.direccionPresencial,
                            cityWork: values.ciudadPresencial,
                            obsPresencial: values.obsPresencial,
                            country: auxPaisPresencial,
                            region: auxRegionPresencial,
                            commune: auxComunaPresencial,
                        }
                    }

                    let auxExperiencies = [];

                    if(this.state.experiencies){
                        auxExperiencies = this.state.experiencies.map( (item) => {
                            return {experience: item.experience, time: item.time };
                        });
                    }

                    let auxProfesiones = [];
                    if(values.profesiones){
                        auxProfesiones = values.profesiones.map((item) => {
                            return  { id: item.value, label: item.label};
                        });
                    }

                    let auxNivelEducacional = [];
                    if(values.nivelEducacional){
                        auxNivelEducacional = values.nivelEducacional.map((item) => {
                            return  { id: item.value, label: item.label};
                        });
                    }

                    

                    const auxSituacionActualMinima = values.situacionActualMinima ? {
                        "id": values.situacionActualMinima.value,
                        "label": values.situacionActualMinima.label,
                    } : null;

                    let auxIdiomas = [];

                    if(this.state.idiomsRequire){

                        auxIdiomas = this.state.idiomsRequire.map((item) => {
                            return { idioma: item.idiom.label, nivel: item.nivel.label };

                        });
                    }

                    const auxTipoContrato = values.tipoContrato ? {
                        "id": values.tipoContrato.value,
                        "label": values.tipoContrato.label,
                    } : null;

                    const auxTipoMoneda = values.tipoMoneda ? {
                        "id": values.tipoMoneda.value,
                        "code": values.tipoMoneda.code,
                        "label": values.tipoMoneda.label,
                    } : null;

                    const auxTipoPago = values.tipoPago ? {
                        "id": values.tipoPago.value,
                        "label": values.tipoPago.label,
                    } : null;

                    const auxPeriodicidadPago = values.periodicidadPago ? {
                        "id": values.periodicidadPago.value,
                        "label": values.periodicidadPago.label,
                    } : null;

                    let auxQuestionList = [];

                    if(this.state.questionsList){
                        auxQuestionList = this.state.questionsList.map((item) => {
                            return item.question;
                        });
                    }

                    let auxObservationList = [];

                    if(this.state.observationList){
                        auxObservationList = this.state.observationList.map((item) => {
                            return item.observation;
                        });
                    }

                    let genero = null;
                    if(values.genero){
                        
                        genero = {
                            id: values.genero.value,
                            label: values.genero.label,
                            collectionName: 'opcionesGenero',
                            code: values.genero.code,
                        };
                    }
                    console.log(this.actionForm);
                    this.props.createJobOffer({
                        id: this.state.idJobOffer,
                        bEmpleadorConficencial: values.cbEmpleadorConficencial,
                        descripcionEmpresaConfidencial: values.descripcionEmpresaConfidencial,
                        puesto: values.puesto, 
                        descripcion: values.descripcionPuesto,
                        categoriaEmpleo: auxCategoriaEmpleo,
                        bDiscapacidad: values.cbDiscapacidad,
                        bInformatica: values.cbInformatica,
                        conocimientosInformatica: auxConocimientosInformatica,
                        placeToWork: this.state.placeToWork,
                        bRemotoTodoMundo: values.cbRemotoTodoMundo,
                        obsRemote: values.obsRemote,
                        allowPlacesToWorkRemotly: auxAllowPlacesToWorkRemotly,
                        allowPlaceToWorkOnSite: auxAllowPlaceToWorkOnSite,
                        bDisponibilidadViajar: values.cbDisponibilidadViajar,
                        bSalidaTerreno: values.cbSalidaTerreno,
                        bCambioResidencia: values.cbCambioResidencia,
                        bDisponibilidadInmediata: values.cbDisponibilidadInmediata,
                        fechaComienzo: values.fechaComienzo,
                        experiencies: auxExperiencies,
                        profesiones: auxProfesiones,
                        nivelEducacional: auxNivelEducacional,
                        situacionActualMinima: auxSituacionActualMinima,
                        idiomas: auxIdiomas,
                        aspectosPersonales: values.aspectosPersonales,
                        otrosRequisitos: values.otrosRequisitos,
                        vacantes: values.vacantes,
                        tipoContrato: auxTipoContrato,
                        jornada: values.jornada,
                        horario: values.horario,
                        acercaContratacion: values.acercaContratacion,
                        bRentaConvenir: values.cbRentaConvenir,
                        bMostrarRenta: values.cbMostrarRenta,
                        rentaMaxima: values.rentaMaxima,
                        tipoMoneda: auxTipoMoneda,
                        tipoPago: auxTipoPago,
                        periodicidadPago: auxPeriodicidadPago,
                        acercaPago: values.acercaPago,
                        beneficios: values.beneficios,
                        bHomeOffice: values.cbHomeOffice,
                        bHorarioFlexible: values.cbHorarioFlexible,
                        preguntas: auxQuestionList,
                        stateOffer: this.actionForm,
                        bRangoEtario: values.cbRangoEtario,
                        edadMaxima: values.edadMaxima,
                        edadMinima: values.edadMinima,
                        genero: genero,
                        observaciones: auxObservationList
                    });
					
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
                        <React.Fragment> {/** Generales */}
							<Row>
								<Col xs="12">
									<div className="p-3 mb-2 bg-gray-100 text-black border border-warning rounded">
										<span>General</span>
									</div>
								</Col>
							</Row>
                            <Row>
								<Col xs="12">
									<FormGroup >
										<AppSwitch 
											id="cbEmpleadorConficencial"
											className={'mx-0'} 
											defaultChecked={false} 
											label 
											dataOn={'Sí'} 
											dataOff={'No'}
											color={ errors.cbEmpleadorConficencial !== undefined ? 'danger' : 'primary' } 
											name="cbEmpleadorConficencial"
											checked={values.cbEmpleadorConficencial}
                                            
                                            onChange={handleChange}
											onBlur={handleBlur}> 
										</AppSwitch>
										
										<Label htmlFor="cbEmpleadorConficencial" style={{'verticalAlign':'bottom'}} className="ml-2">
                                        { this.state.bPersonaJuridica !== null ? (this.state.bPersonaJuridica ? "Empresa Confidencial?" : "Empleador Confidencial?") : "Cargando..."}
                                        </Label>
										
									</FormGroup>
								</Col>
							</Row>
                           
                           <Collapse isOpen={values.cbEmpleadorConficencial } data-parent="#empleadorConficencialAccordion" id="empleadorConficencialAccordion">
                            <Row>
								<Col xs="12">
									<FormGroup>
										<Label htmlFor="descripcionEmpresaConfidencial">Descripción empresa<i className="text-danger">★</i></Label>
										<Input type="text" id="descripcionEmpresaConfidencial" 
											name="descripcionEmpresaConfidencial"
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.descripcionEmpresaConfidencial || ''}
											placeholder='Por ej. "Empresa del sector productivo", "Empresa de alimentos"...'
											valid={values.descripcionEmpresaConfidencial !== '' && touched.descripcionEmpresaConfidencial}
											invalid={errors.descripcionEmpresaConfidencial !== undefined  && touched.descripcionEmpresaConfidencial} ></Input>
										<FormFeedback className="help-block">{errors.descripcionEmpresaConfidencial && touched.descripcionEmpresaConfidencial && errors.descripcionEmpresaConfidencial}</FormFeedback>
                                        <p className={ values.descripcionEmpresaConfidencial.length > 100 ? "text-danger small" :"small"}>{values.descripcionEmpresaConfidencial.length + " / 100" }</p>
									</FormGroup>
								</Col>
							</Row>
                            </Collapse>
                           
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
							
							<Row>
								<Col xs="12">
									<FormGroup>
										<Label htmlFor="descripcionPuesto">Descripción<i className="text-danger">★</i></Label>
										<Input type="textarea" id="descripcionPuesto" 
											rows="9"
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.descripcionPuesto || ''}
											placeholder="Describa el puesto de trabajo ofrecido, tareas a realizar, perfil requerido, resultados esperados, etc..."
											valid={values.descripcionPuesto !== '' && touched.descripcionPuesto }
											invalid={errors.descripcionPuesto !== undefined && touched.descripcionPuesto } ></Input>
										<FormFeedback className="help-block">{errors.descripcionPuesto && touched.descripcionPuesto && errors.descripcionPuesto}</FormFeedback>
                                        <p className={ values.descripcionPuesto.length > 1000 ? "text-danger small" :"small"}>{values.descripcionPuesto.length + " / 1000" }</p>
                                    </FormGroup>
								</Col>
							</Row>

                            <Row>
								
								<Col xs="12">
									<FormGroup>
										<Label htmlFor="selectCategoriaEmpleo">Área de Trabajo<i className="text-danger">★</i></Label>
										<CustomSelect
											id={"selectCategoriaEmpleo"}
											placeholder={'Seleccione...'}
											nameAttr={'selectCategoriaEmpleo'}
											onChange={(e,a) => {
												
												return setFieldValue(e,a);
											}}
											onBlur={setFieldTouched}
											value={values.selectCategoriaEmpleo}
											options={this.state.opcionesCategoriasEmpleos}
											errors={errors.selectCategoriaEmpleo}
											touched={touched.selectCategoriaEmpleo}
											isMulti={false}
											invalid={errors.selectCategoriaEmpleo !== undefined  && touched.selectCategoriaEmpleo} 
										></CustomSelect>
									</FormGroup>
								</Col>

								
							</Row>
                       

							<Row>
								<Col xs="12">
									<FormGroup >
										<AppSwitch 
											id="cbDiscapacidad"
											className={'mx-0'} 
											defaultChecked={false} 
											label 
											dataOn={'Sí'} 
											dataOff={'No'}
											color={ errors.cbDiscapacidad !== undefined ? 'danger' : 'primary' } 
											name="cbDiscapacidad"
											checked={values.cbDiscapacidad}
											onChange={handleChange}
											onBlur={handleBlur}> 
										</AppSwitch>
										
										<Label htmlFor="cbDiscapacidad" style={{'verticalAlign':'bottom'}} className="ml-2">Apto para personas con discapacidad?</Label>
										<p className="text-danger small">{errors.cbDiscapacidad && touched.cbDiscapacidad && errors.cbDiscapacidad}</p>
										
									</FormGroup>
								</Col>
							</Row>
                            
							<Row>
								<Col xs="12" md="4">
									<FormGroup>
										<Label htmlFor="selectGenero">Género<i className="text-danger">★</i></Label>
										<CustomSelect
											id={"selectGenero"}
											placeholder={'Seleccione...'}
											nameAttr={'genero'}
											onChange={(e,a) => {
												//this.onChangePais(a);
												return setFieldValue(e,a);
											}}
											onBlur={setFieldTouched}
											value={values.genero}
											options={this.state.opcionesGenero}
											errors={errors.genero}
											touched={touched.genero}
											invalid={errors.genero !== undefined  && touched.genero} 
										></CustomSelect>
									</FormGroup>
								</Col>
							</Row>
                            
                            
							<Row>
								<Col xs="12">
									<FormGroup >
										<AppSwitch 
											id="cbRangoEtario"
											className={'mx-0'} 
											defaultChecked={false} 
											label 
											dataOn={'Sí'} 
											dataOff={'No'}
											color={ errors.cbRangoEtario !== undefined ? 'danger' : 'primary' } 
											name="cbRangoEtario"
											checked={values.cbRangoEtario}
											onChange={handleChange}
											onBlur={handleBlur}> 
										</AppSwitch>
										
										<Label htmlFor="cbRangoEtario" style={{'verticalAlign':'bottom'}} className="ml-2">Rango Etario?</Label>
										
									</FormGroup>
								</Col>
                            </Row>
                            
                            <Collapse isOpen={values.cbRangoEtario } data-parent="#rangoEtarioAccordion" id="rangoEtarioAccordion">
							<Row>
								
								<Col xs="12" md="3">
									<FormGroup>
											<Label htmlFor="edadMinima">Edad Mínima<i className="text-danger">★</i></Label>
											<Input type="number" id="edadMinima" 
												name="edadMinima"
												min="1" max="999"
												onChange={handleChange}
												onBlur={handleBlur}
												value={values.edadMinima || ''}
												placeholder="Ingrese Edad Mínima..."
												valid={values.edadMinima !== '' && touched.edadMinima}
												invalid={errors.edadMinima !== undefined  && touched.edadMinima} ></Input>
										<FormFeedback className="help-block">{errors.edadMinima && touched.edadMinima && errors.edadMinima}</FormFeedback>
									</FormGroup>
								</Col>

								<Col xs="12" md="3">
									<FormGroup>
											<Label htmlFor="edadMaxima">Edad Máxima<i className="text-danger">★</i></Label>
											<Input type="number" id="edadMaxima" 
												name="edadMaxima"
												min="1" max="999"
												onChange={handleChange}
												onBlur={handleBlur}
												value={values.edadMaxima || ''}
												placeholder="Ingrese Edad Máxima..."
												valid={values.edadMaxima !== '' && touched.edadMaxima}
												invalid={errors.edadMaxima !== undefined  && touched.edadMaxima} ></Input>
										<FormFeedback className="help-block">{errors.edadMaxima && touched.edadMaxima && errors.edadMaxima}</FormFeedback>
									</FormGroup>
								</Col>
							</Row>
                            </Collapse>
                            
							<Row>
								<Col xs="12">
									<FormGroup >
										<AppSwitch 
											id="cbInformatica"
											className={'mx-0'} 
											defaultChecked={false} 
											label 
											dataOn={'Sí'} 
											dataOff={'No'}
											color={ errors.cbInformatica !== undefined ? 'danger' : 'primary' } 
											name="cbInformatica"
											checked={values.cbInformatica}
											onChange={handleChange}
											onBlur={handleBlur}> 
										</AppSwitch>
										
										<Label htmlFor="cbInformatica" style={{'verticalAlign':'bottom'}} className="ml-2">Conocimientos básicos de informática?</Label>
										
									</FormGroup>
								</Col>
							</Row>
                            <Collapse isOpen={values.cbInformatica } data-parent="#conocimientosAccordion" id="conocimientosAccordion">
							<Row>
								
								<Col xs="12">
									<FormGroup>
										<Label htmlFor="selectInformatica">Conocimientos generales de informática<i className="text-danger">★</i></Label>
										<CustomSelect
											id={"selectInformatica"}
											placeholder={'Seleccione...'}
											nameAttr={'informatica'}
											onChange={(e,a) => {
												
												return setFieldValue(e,a);
											}}
											onBlur={setFieldTouched}
											value={values.informatica}
											options={this.state.opcionesInformatica}
											errors={errors.informatica}
											touched={touched.informatica}
											isMulti={true}
											invalid={errors.informatica !== undefined  && touched.informatica} 
										></CustomSelect>
									</FormGroup>
								</Col>

								
							</Row>
                            </Collapse>
                        </React.Fragment>
                        
                        <React.Fragment> {/** Lugar de Trabajo */}
                            <Row>
                                <Col xs="12">
                                    <div className="p-3 mb-2 bg-gray-100 text-black border border-warning rounded">
                                        <span>Lugar de Trabajo</span>
                                    </div>
                                </Col>
                            </Row>

                            <Row>
                                <Col xs="12" className="text-center" >
                                    <FormGroup>
                                        <ButtonGroup>
                                            <Button className="btn btn-info" onClick={() => { this.selectPlaceToWork(1); setFieldValue("placeToWork",1); }} active={this.state.placeToWork === 1}>Presencial<i className={this.state.placeToWork === 1 ? "text-danger font-weight-bold" :"d-none"}>&nbsp;✓</i></Button>
                                            <Button className="btn btn-info" onClick={() => { this.selectPlaceToWork(2); setFieldValue("placeToWork",2); }} active={this.state.placeToWork === 2}>Remoto<i className={this.state.placeToWork === 2 ? "text-danger font-weight-bold" :"d-none"}>&nbsp;✓</i></Button>
                                        </ButtonGroup>
                                        {
                                            errors.placeToWork ? 
                                            <p className="text-danger small">{errors.placeToWork}</p> :
                                            null
                                        }
                                    </FormGroup>
                                </Col>
                            </Row>

                            
                                 <Collapse isOpen={this.state.placeToWork === 1} data-parent="#presencialAccordion" id="presencialAccordion">
                                <React.Fragment>
                                    <Row>
                                        <Col xs="12" lg="4">
                                            <FormGroup>
                                                <Label htmlFor="selectPresencialPais">País<i className="text-danger">★</i></Label>
                                                <CustomSelect
                                                    id={"selectPresencialPais"}
                                                    placeholder={'Seleccione el país...'}
                                                    nameAttr={'selectPresencialPais'}
                                                    onChange={(e,a) => {
                                                        values.selectPresencialRegion = null;
                                                        values.selectPresencialComuna= null;
                                                        this.onChangePaisPresencial(a);
                                                        return setFieldValue(e,a);
                                                    }}
                                                    //onMenuOpen={this.onMenuOpenPais}
                                                    onBlur={setFieldTouched}
                                                    value={values.selectPresencialPais}
                                                    isLoading={this.state.isLoadingSelectPresencialPais}
                                                    options={this.state.opcionesPaises}
                                                    errors={errors.selectPresencialPais}
                                                    touched={touched.selectPresencialPais}
                                                    invalid={errors.selectPresencialPais !== undefined && touched.selectPresencialPais }
                                                ></CustomSelect>
                                            </FormGroup>
                                        </Col>
                                        <Col xs="12" lg="4" className={ !((values.selectPresencialPais ? values.selectPresencialPais.label : "") === 'Chile' ) ? "d-none" : ""}>
                                            <FormGroup>
                                                <Label htmlFor="selectPresencialRegion">Región</Label>
                                                <CustomSelect
                                                    id={"selectPresencialRegion"}
                                                    placeholder={'Seleccione la región...'}
                                                    nameAttr={'selectPresencialRegion'}
                                                    onChange={(e,a) => {
                                                        values.selectPresencialComuna= null;
                                                        this.onChangeRegionPresencial(a);
                                                        return setFieldValue(e,a);
                                                    }}
                                                    onBlur={setFieldTouched}
                                                    value={ values.selectPresencialRegion}
                                                    isLoading={this.state.isLoadingSelectPresencialRegiones}
                                                    options={this.state.opcionesRegiones}
                                                    errors={errors.selectPresencialRegion}
                                                    touched={touched.selectPresencialRegion}
                                                    invalid={errors.selectPresencialRegion !== undefined && touched.selectPresencialRegion }
                                                ></CustomSelect>
                                            </FormGroup>
                                        </Col>
                                        <Col  xs="12" lg="4" className={ !((values.selectPresencialPais ? values.selectPresencialPais.label : "") === 'Chile' ) ? "d-none" : ""}>
                                            <FormGroup>
                                                <Label htmlFor="selectPresencialComuna">Comuna</Label>
                                                <CustomSelect
                                                    id={"selectPresencialComuna"}
                                                    placeholder={'Seleccione la comuna...'}
                                                    nameAttr={'selectPresencialComuna'}
                                                    onChange={(e,a) => {
                                                        this.onChangeCommunePresencial(a);
                                                        return setFieldValue(e,a);
                                                    }}
                                                    onBlur={setFieldTouched}
                                                    value={values.selectPresencialComuna}
                                                    isLoading={this.state.isLoadingSelectPresencialComunas}
                                                    options={this.state.opcionesComunas}
                                                    errors={errors.selectPresencialComuna}
                                                    touched={touched.selectPresencialComuna}
                                                    invalid={errors.selectPresencialComuna !== undefined && touched.selectPresencialComuna }
                                                ></CustomSelect>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row className={ ((values.selectPresencialPais ? values.selectPresencialPais.label : "") === 'Chile' ) ? "d-none" : ""}>
                                        <Col xs="12">
                                            <FormGroup>
                                                <Label htmlFor="ciudadPresencial">Ciudad</Label>
                                                <Input type="text" id="ciudadPresencial" 
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.ciudadPresencial}
                                                    placeholder="Ingrese la ciudad..."
                                                    valid={values.ciudadPresencial !== '' && touched.ciudadPresencial }
                                                    invalid={errors.ciudadPresencial !== undefined && touched.ciudadPresencial } ></Input>
                                                <FormFeedback className="help-block">{errors.ciudadPresencial && touched.ciudadPresencial}</FormFeedback>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="12">
                                            <FormGroup>
                                                <Label htmlFor="direccionPresencial">Dirección</Label>
                                                <Input type="text" id="direccionPresencial" 
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.direccionPresencial}
                                                    placeholder="Ingrese dirección..."
                                                    valid={values.direccionPresencial !== '' && touched.direccionPresencial }
                                                    invalid={errors.direccionPresencial !== undefined && touched.direccionPresencial } ></Input>
                                                <FormFeedback className="help-block">{errors.direccionPresencial && touched.direccionPresencial}</FormFeedback>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="12">
                                            <FormGroup>
                                                <Label htmlFor="obsPresencial">Observaciones</Label>
                                                <Input type="textarea" rows="9" id="obsPresencial" 
                                                    name="obsPresencial"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.obsPresencial}
                                                    placeholder="Detalles de la modalidad de trabajo presencial, si hay lugar para almozar en la empresa, casilleros para los empleados, se marca entrada/salida, se firma libro, etc."
                                                    valid={values.obsPresencial !== '' && touched.obsPresencial}
                                                    invalid={errors.obsPresencial !== undefined  && touched.obsPresencial} ></Input>
                                                <FormFeedback className="help-block">{errors.obsPresencial && touched.obsPresencial ? errors.obsPresencial  : null}</FormFeedback>
                                                <p className={ values.obsPresencial.length > 1000 ? "text-danger small" :"small"}>{values.obsPresencial.length + " / 1000" }</p>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </React.Fragment>
                                </Collapse>
                            

                            
                            <Collapse isOpen={this.state.placeToWork === 2} data-parent="#remotoAccordion" id="remotoAccordion">
                                <React.Fragment>
                                    <Row>
                                        <Col xs="12">
                                        <Alert color="info" className="text-justify" isOpen={this.state.alertRemoteWork}>
                                                    Si la modalidad de trabajo <strong>NO</strong> es 100% remota, 
                                                    y solo son algunos días con la opción de Home Office, seleccione la opción <Badge color="info" pill>Presencial</Badge> y en la sección <Badge color="info" pill>Oferta</Badge> seleccione la opción <Badge color="info" pill>Home Office</Badge>.
                                                </Alert>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col xs="12">
                                            <FormGroup >
                                            
                                                
                                                <AppSwitch 
                                                    id="cbRemotoTodoMundo"
                                                    className={'mx-0'} 
                                                    defaultChecked={false} 
                                                    label 
                                                    dataOn={'Sí'} 
                                                    dataOff={'No'}
                                                    color={ errors.cbRemotoTodoMundo !== undefined ? 'danger' : 'primary' } 
                                                    name="cbRemotoTodoMundo"
                                                    checked={values.cbRemotoTodoMundo}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}> 
                                                </AppSwitch>
                                                
                                                <Label htmlFor="cbRemotoTodoMundo" style={{'verticalAlign':'bottom'}} className="ml-2">De cualquier parte del mundo?</Label>
                                                
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    
                                    <Collapse isOpen={!values.cbRemotoTodoMundo} data-parent="#todoElMundoAccordion" id="todoElMundoAccordion">
                                    <Row>
                                        <Col xs="12">
                                            <Alert color="info" className="text-justify" isOpen={true}>
                                                Debe ingresar los datos de la ubicación remota habilitada y agregarlas haciendo clic en el botón <Badge color="info" pill><i className="fa fa-plus"></i>&nbsp;Agregar</Badge>.
                                            </Alert>
                                        </Col>
                                    </Row>
                                        <Row>
                                            <Col xs="12" lg="4">
                                                <FormGroup>
                                                    
                                                    <Label htmlFor="selectRemotoPais">País<i className="text-danger">★</i></Label>
                                                    <CustomSelect
                                                        id={"selectRemotoPais"}
                                                        placeholder={'Seleccione el país...'}
                                                        nameAttr={'selectRemotoPais'}
                                                        onChange={(e,a) => {
                                                            this.onChangePaisRemoto(a);
                                                            return setFieldValue(e,a);
                                                        }}
                                                        //onMenuOpen={this.onMenuOpenPais}
                                                        onBlur={setFieldTouched}
                                                        value={values.selectRemotoPais}
                                                        isLoading={this.state.isLoadingSelectRemotoPais}
                                                        options={this.state.opcionesPaises}
                                                        errors={errors.selectRemotoPais}
                                                        touched={touched.selectRemotoPais}
                                                        invalid={errors.selectRemotoPais !== undefined && touched.selectRemotoPais }
                                                    ></CustomSelect>
                                                </FormGroup>
                                            </Col>
                                            <Col xs="12" lg="4" className={ !((values.selectRemotoPais ? values.selectRemotoPais.label : "") === 'Chile' ) ? "d-none" : ""}>
                                                <FormGroup>
                                                    <Label htmlFor="selectRemotoRegion">Región</Label>
                                                    <CustomSelect
                                                        id={"selectRemotoRegion"}
                                                        placeholder={'Seleccione la región...'}
                                                        nameAttr={'selectRemotoRegion'}
                                                        onChange={(e,a) => {
                                                            this.onChangeRegionRemoto(a);
                                                            return setFieldValue(e,a);
                                                        }}
                                                        onBlur={setFieldTouched}
                                                        value={values.selectRemotoRegion}
                                                        isLoading={this.state.isLoadingSelectRemotoRegiones}
                                                        options={this.state.opcionesRegiones}
                                                        errors={errors.selectRemotoRegion}
                                                        touched={touched.selectRemotoRegion}
                                                        invalid={errors.selectRemotoRegion !== undefined && touched.selectRemotoRegion }
                                                    ></CustomSelect>
                                                </FormGroup>
                                            </Col>
                                            <Col  xs="12" lg="4" className={ !((values.selectRemotoPais ? values.selectRemotoPais.label : "") === 'Chile' ) ? "d-none" : ""}>
                                                <FormGroup>
                                                    <Label htmlFor="selectRemotoComuna">Comuna</Label>
                                                    <CustomSelect
                                                        id={"selectRemotoComuna"}
                                                        placeholder={'Seleccione la comuna...'}
                                                        nameAttr={'selectRemotoComuna'}
                                                        onChange={(e,a) => {
                                                            this.onChangeCommuneRemoto(a);
                                                            return setFieldValue(e,a);
                                                        }}
                                                        onBlur={setFieldTouched}
                                                        value={values.selectRemotoComuna}
                                                        isLoading={this.state.isLoadingSelectRemotoComunas}
                                                        options={this.state.opcionesComunas}
                                                        errors={errors.selectRemotoComuna}
                                                        touched={touched.selectRemotoComuna}
                                                        invalid={errors.selectRemotoComuna !== undefined && touched.selectRemotoComuna }
                                                    ></CustomSelect>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row className={ ((values.selectRemotoPais ? values.selectRemotoPais.label : "") === 'Chile' ) ? "d-none" : ""}>
                                            <Col xs="12">
                                                <FormGroup>
                                                    <Label htmlFor="ciudadRemoto">Ciudad</Label>
                                                    <Input type="text" id="ciudadRemoto" 
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.ciudadRemoto}
                                                        placeholder="Ingrese la ciudad..."
                                                        valid={values.ciudadRemoto !== '' && touched.ciudadRemoto }
                                                        invalid={errors.ciudadRemoto !== undefined && touched.ciudadRemoto } ></Input>
                                                    <FormFeedback className="help-block">{errors.ciudadRemoto && touched.ciudadRemoto}</FormFeedback>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs="12">
                                                <FormGroup>
                                                    <Label htmlFor="direccionRemoto">Dirección</Label>
                                                    <Input type="text" id="direccionRemoto" 
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.direccionRemoto}
                                                        placeholder="Ingrese dirección..."
                                                        valid={values.direccionRemoto !== '' && touched.direccionRemoto }
                                                        invalid={errors.direccionRemoto !== undefined && touched.direccionRemoto } ></Input>
                                                    <FormFeedback className="help-block">{errors.direccionRemoto && touched.direccionRemoto}</FormFeedback>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row className="justify-content-end">
                                            <Col xs="12" md="6" className="text-right">
                                                <FormGroup>
                                                    <Button color="info" block={isMobile} onClick={ e => {
                                                        let { selectedRemoteRegion, selectedRemoteCommune } = this.state;

                                                        this.addAllowPlacesToWorkRemotly(e,values.ciudadRemoto, values.direccionRemoto);
                                                        setFieldValue("allowPlacesToWorkRemotly",this.state.allowPlacesToWorkRemotly);

                                                        values.ciudadRemoto = "";
                                                        values.direccionRemoto = "";

                                                        if(!values.selectRemotoPais) return;
                                                        
                                                        if(values.selectRemotoPais.label === "Chile"){
                                                            //console.log("Es Chile");
                                                            values.selectRemotoComuna = null;
                                                            selectedRemoteCommune = null;
                                                            this.setState({selectedRemoteCommune});

                                                        }else{
                                                            if(values.ciudadRemoto){
                                                                values.selectRemotoPais = null;
                                                            }
                                                            values.selectRemotoRegion = null;
                                                            selectedRemoteRegion = null;
                                                            this.setState({selectedRemoteRegion});
                                                            values.selectRemotoComuna = null;
                                                            selectedRemoteCommune = null;
                                                            this.setState({selectedRemoteCommune});
                                                        }
                                                    }}> 
                                                        <div className="align-self-center">
                                                            <i className="fa fa-plus"></i>  &nbsp;                                                    
                                                            Agregar
                                                        </div>
                                                    </Button>
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col>
                                                <FormGroup>
                                                    {errors.allowPlacesToWorkRemotly ? <p className="text-danger small">{errors.allowPlacesToWorkRemotly}</p> : null}
                                                    { this.state.allowPlacesToWorkRemotly.length > 0 &&
                                                    <SimpleBar 
                                                        style={{maxHeight:"300px"}}
                                                        >
                                                        <BootstrapTable
                                                            id="mapping_table"
                                                            striped
                                                            hover
                                                            condensed
                                                            bootstrap4
                                                            classNames={{
                                                                // defaults
                                                                content: 'simplebar-content',
                                                                scrollContent: 'simplebar-scroll-content',
                                                                scrollbar: 'simplebar-scrollbar',
                                                                track: 'simplebar-track'
                                                                }}
                                                            
                                                            ref={ n => this.node = n }
                                                            
                                                            keyField='id'
                                                            //caption="Plain text header"
                                                            noDataIndication={"Sin información..."}
                                                            data={ this.state.allowPlacesToWorkRemotly } 
                                                            
                                                            columns={ this.columnsRemotePlaceToWork } 
                                                        ></BootstrapTable>
                                                    </SimpleBar>
                                                    }
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </Collapse>
                                    
                                    <Row>
                                        <Col xs="12">
                                            <FormGroup>
                                                <Label htmlFor="obsRemote">Observaciones</Label>
                                                <Input type="textarea" rows="9" id="obsRemote" 
                                                    name="obsRemote"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.obsRemote}
                                                    placeholder="Detalles de la modalidad de trabajo remoto, metodología de trabajo, registro de actividades, etc."
                                                    valid={values.obsRemote !== '' && touched.obsRemote}
                                                    invalid={errors.obsRemote !== undefined  && touched.obsRemote} ></Input>
                                                <FormFeedback className="help-block">{errors.obsRemote && touched.obsRemote ? errors.obsRemote  : null}</FormFeedback>
                                                <p className={ values.obsRemote.length > 1000 ? "text-danger small" :"small"}>{values.obsRemote.length + " / 1000" }</p>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </React.Fragment>
                            </Collapse>
                            
                            
                            
							
                        </React.Fragment>
                        
                        <React.Fragment> {/* Requisitos */}
                            <Row>
								<Col xs="12">
									<div className="p-3 mb-2 bg-gray-100 text-black border border-warning rounded">
										<span>Requisitos</span>
									</div>
								</Col>
							</Row>
                            <Row>
                                <Col xs="12">
                                    <FormGroup >
                                        <AppSwitch 
                                            id="cbDisponibilidadViajar"
                                            className={'mx-0'} 
                                            defaultChecked={false} 
                                            label 
                                            dataOn={'Sí'} 
                                            dataOff={'No'}
                                            color={ errors.cbDisponibilidadViajar !== undefined ? 'danger' : 'primary' } 
                                            name="cbDisponibilidadViajar"
                                            checked={values.cbDisponibilidadViajar}
                                            onChange={handleChange}
                                            onBlur={handleBlur}> 
                                        </AppSwitch>
                                        
                                        <Label htmlFor="cbDisponibilidadViajar" style={{'verticalAlign':'bottom'}} className="ml-2">Disponibilidad para viajar</Label>
                                        
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs="12">
                                    <FormGroup >
                                        <AppSwitch 
                                            id="cbSalidaTerreno"
                                            className={'mx-0'} 
                                            defaultChecked={false} 
                                            label 
                                            dataOn={'Sí'} 
                                            dataOff={'No'}
                                            color={ errors.cbSalidaTerreno !== undefined ? 'danger' : 'primary' } 
                                            name="cbSalidaTerreno"
                                            checked={values.cbSalidaTerreno}
                                            onChange={handleChange}
                                            onBlur={handleBlur}> 
                                        </AppSwitch>
                                        
                                        <Label htmlFor="cbSalidaTerreno" style={{'verticalAlign':'bottom'}} className="ml-2">Salidas a terreno</Label>
                                        
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs="12">
                                    <FormGroup >
                                        <AppSwitch 
                                            id="cbCambioResidencia"
                                            className={'mx-0'} 
                                            defaultChecked={false} 
                                            label 
                                            dataOn={'Sí'} 
                                            dataOff={'No'}
                                            color={ errors.cbCambioResidencia !== undefined ? 'danger' : 'primary' } 
                                            name="cbCambioResidencia"
                                            checked={values.cbCambioResidencia}
                                            onChange={handleChange}
                                            onBlur={handleBlur}> 
                                        </AppSwitch>
                                        
                                        <Label htmlFor="cbCambioResidencia" style={{'verticalAlign':'bottom'}} className="ml-2">Disponibilidad cambio de residencia</Label>
                                        
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col xs="12">
                                    <FormGroup >
                                        <AppSwitch 
                                            id="cbDisponibilidadInmediata"
                                            className={'mx-0'} 
                                            defaultChecked={false} 
                                            label 
                                            dataOn={'Sí'} 
                                            dataOff={'No'}
                                            color={ errors.cbDisponibilidadInmediata !== undefined ? 'danger' : 'primary' } 
                                            name="cbDisponibilidadInmediata"
                                            checked={values.cbDisponibilidadInmediata}
                                            onChange={handleChange}
                                            onBlur={handleBlur}> 
                                        </AppSwitch>
                                        
                                        <Label htmlFor="cbDisponibilidadInmediata" style={{'verticalAlign':'bottom'}} className="ml-2">Disponibilidad inmediata</Label>
                                        
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col xs="12">
                                    <FormGroup>
                                        <Label htmlFor="fechaComienzo">Fecha de contratación</Label>
                                        <SingleDatePicker
                                            id="fechaComienzo"
                                            key={"fechaComienzo"}
                                            date={values.fechaComienzo}
                                            onDateChange={date => {
                                                return setFieldValue("fechaComienzo",date);
                                            }}
                                            focused={this.state.focusedFechaComeinzo}
                                            onFocusChange={({ focused }) =>
                                                this.setState({ focusedFechaComeinzo: focused })

                                            }
                                            placeholder="Seleccione una fecha..."
                                            isOutsideRange={(day) => day.isAfter(moment().clone().add(360, 'days')) ||  day.isBefore(moment().clone().add(0, 'days'))  }
                                            numberOfMonths={3}
                                            renderMonthElement={this.renderMonthElement}
                                            withFullScreenPortal={true}
                                            showClearDate={true}
                                            orientation={isMobile ? "vertical" : "horizontal"}
                                            withPortal={isMobile}
                                            hideKeyboardShortcutsPanel ={true} 
                                            showDefaultInputIcon={false} inputIconPosition="before"
                                            small
                                            block
                                            displayFormat="DD MMMM YYYY"
                                        ></SingleDatePicker>
                                     </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col xs="12">
                                    <Card className="border-info ">
                                        <CardHeader>
                                            
                                            <Row>
                                                <Col xs="12" className="align-self-center">
                                                <span>Agrege la(s) experiencia(s) requeridas</span>
                                                </Col>
                                            </Row>
                                        </CardHeader>
                                        <CardBody>
                                            <Row>
                                                <Col xs="12">
                                                    <FormGroup>
                                                        <Label htmlFor="experiencia">Experiencia</Label>
                                                        <Input type="text" id="experiencia" 
                                                            name="experiencia"
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.experiencia || ''}
                                                            placeholder='Por ej. "Experiencia en ventas en terreno", "Experiencia en departamentos de mantención de Empresas"'
                                                        	valid={values.experiencia !== '' && touched.experiencia}
											                invalid={errors.experiencia !== undefined  && touched.experiencia} ></Input>
										                    <FormFeedback className="help-block">{errors.experiencia && touched.experiencia ? errors.experiencia : ""}</FormFeedback>
                                                    </FormGroup>

                                                    
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs="12">
                                                    <FormGroup>
                                                        <Label htmlFor="tiempoExperiencia">Tiempo / Necesidad de experiencia</Label>
                                                        <Input type="text" id="tiempoExperiencia" 
                                                            name="tiempoExperiencia"
                                                            min="1" max="999"
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.tiempoExperiencia || ''}
                                                            placeholder='Por ej. "3 meses", "5 años", "No se requiere"'
                                                        ></Input>
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row className="justify-content-end">
                                                <Col xs="12" md="6" className="text-right">
                                                <FormGroup>
                                                    <Button color="info" block={isMobile} onClick={ e => {


                                                        
                                                        if(!values.experiencia || !values.tiempoExperiencia) {
                                                            const messageModalJsx =
                                                            <Alert  key={0} color="danger">
                                                                Debe ingrear campos Experiencia y Tiempo / Necesidad de Experiencia
                                                            </Alert>
                                                            
                                                            this.setOpenModal(true, '', 'Entendido!', "modal-danger", "Completar Campos Experiencia", messageModalJsx, false);  
                                                            
                                                            return;
                                                        }

                                                        const experience = {
                                                            experience: values.experiencia,
                                                            time: values.tiempoExperiencia,
                                                        }
                                                        this.addExperience(e, experience);


                                                        
                                                    }}> 
                                                        <div className="align-self-center">
                                                            <i className="fa fa-plus"></i>  &nbsp;                                                    
                                                            Agregar
                                                        </div>
                                                    </Button>
                                                </FormGroup>
                                            </Col>
                                            </Row>
                                            <Row>
                                            <Col>
                                                <FormGroup>
                                                    {errors.experiencies ? <p className="text-danger small">{errors.experiencies}</p> : null}
                                                    { this.state.experiencies && this.state.experiencies.length > 0 &&
                                                    <SimpleBar 
                                                        style={{maxHeight:"300px"}}
                                                        >
                                                        <BootstrapTable
                                                            id="mapping_table"
                                                            striped
                                                            hover
                                                            condensed
                                                            bootstrap4
                                                            classNames={{
                                                                // defaults
                                                                content: 'simplebar-content',
                                                                scrollContent: 'simplebar-scroll-content',
                                                                scrollbar: 'simplebar-scrollbar',
                                                                track: 'simplebar-track'
                                                              }}
                                                            
                                                            ref={ n => this.node = n }
                                                            
                                                            keyField='id'
                                                            //caption="Plain text header"
                                                            noDataIndication={"Sin información..."}
                                                            data={ this.state.experiencies } 
                                                            
                                                            columns={ this.columnsExperiencies } 
                                                        ></BootstrapTable>
                                                    </SimpleBar>
                                                    }
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                                
                            </Row>

                            <Row >
								<Col xs="12">
									<FormGroup>
										<Label htmlFor="selectProfessions">Profesión(es) / Título(s) requerida(s)</Label>
										<CustomSelect
											id={"selectProfessions"}
											placeholder={'Seleccione...'}
											nameAttr={'profesiones'}
											onChange={(e,a) => {
												
												return setFieldValue(e,a);
											}}
											onBlur={setFieldTouched}
											value={values.profesiones}
											options={this.state.opcionesProfesiones}
											errors={errors.profesiones}
											touched={touched.profesiones}
											isMulti={true}
											invalid={errors.profesiones !== undefined  && touched.profesiones} 
										></CustomSelect>
									</FormGroup>
								</Col>
							</Row>
                            

                            <Row>
                                <Col xs="12">
                                    <Card className="border-info ">
                                        <CardHeader>
                                            
                                            <Row>
                                                <Col xs="12" className="align-self-center">
                                                <span>Nivel Educacional Requerido</span>
                                                </Col>
                                            </Row>
                                        </CardHeader>
                                        <CardBody>
                                            <Row>
                                                <Col xs="12">
                                                    <FormGroup>
                                                        <Label htmlFor="nivelEducacional">Nivel educacional mínimo</Label>
                                                        <CustomSelect
                                                            id={"nivelEducacional"}
                                                            placeholder={'Seleccione...'}
                                                            nameAttr={'nivelEducacional'}
                                                            onChange={(e,a) => {
                                                                
                                                                return setFieldValue(e,a);
                                                            }}
                                                            onBlur={setFieldTouched}
                                                            value={values.nivelEducacional}
                                                            options={this.state.opcionesNivelesEducacionales}
                                                            errors={errors.nivelEducacional}
                                                            touched={touched.nivelEducacional}
                                                            isMulti={true}
                                                            invalid={errors.nivelEducacional !== undefined  && touched.nivelEducacional} 
                                                        ></CustomSelect>
                                                    </FormGroup>
                                                    
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs="12">
                                                    <FormGroup>
                                                        <Label htmlFor="situacionActualMinima">Situación actual mínima</Label>
                                                        <CustomSelect
                                                            id={"situacionActualMinima"}
                                                            placeholder={'Seleccione...'}
                                                            nameAttr={'situacionActualMinima'}
                                                            onChange={(e,a) => {
                                                                
                                                                return setFieldValue(e,a);
                                                            }}
                                                            onBlur={setFieldTouched}
                                                            value={values.situacionActualMinima}
                                                            options={this.state.opcionesEstadoNivelEducacionalRequisito}
                                                            errors={errors.situacionActualMinima}
                                                            touched={touched.situacionActualMinima}
                                                            isMulti={false}
                                                            invalid={errors.situacionActualMinima !== undefined  && touched.situacionActualMinima} 
                                                        ></CustomSelect>
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            
                                        </CardBody>
                                    </Card>
                                </Col>
                                
                            </Row>
                            
                            <Row>
                                <Col xs="12">
                                    <Card className="border-info ">
                                        <CardHeader>
                                            <Row>
                                                <Col xs="12" className="align-self-center">
                                                <span>Agrege idioma(s) requerido(s)</span>
                                                </Col>
                                            </Row>
                                        </CardHeader>
                                        <CardBody>
                                            <Row>
                                                <Col xs="12">
                                                    <FormGroup>
                                                        <Label htmlFor="idiomas">Idioma</Label>
                                                        <CustomSelect
                                                            id={"idiomas"}
                                                            placeholder={'Seleccione...'}
                                                            nameAttr={'idiomas'}
                                                            onChange={(e,a) => {
                                                                
                                                                return setFieldValue(e,a);
                                                            }}
                                                            onBlur={setFieldTouched}
                                                            value={values.idiomas}
                                                            options={this.state.opcionesIdiomas}
                                                            errors={errors.idiomas}
                                                            touched={touched.idiomas}
                                                            isMulti={false}
                                                            invalid={errors.idiomas !== undefined  && touched.idiomas} 
                                                        ></CustomSelect>
                                                    </FormGroup>

                                                    
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs="12">
                                                    <FormGroup>
                                                        <Label htmlFor="nivelIdioma">Nivel</Label>
                                                        <CustomSelect
                                                            id={"nivelIdioma"}
                                                            placeholder={'Seleccione...'}
                                                            nameAttr={'nivelIdioma'}
                                                            onChange={(e,a) => {
                                                                
                                                                return setFieldValue(e,a);
                                                            }}
                                                            onBlur={setFieldTouched}
                                                            value={values.nivelIdioma}
                                                            options={this.state.opcionesNivelesIdiomas}
                                                            errors={errors.nivelIdioma}
                                                            touched={touched.nivelIdioma}
                                                            isMulti={false}
                                                            invalid={errors.nivelIdioma !== undefined  && touched.nivelIdioma} 
                                                        ></CustomSelect>
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row className="justify-content-end">
                                            <Col xs="12" md="6" className="text-right">
                                                <FormGroup>
                                                    <Button color="info" block={isMobile} onClick={ e => {

                                                        if(!values.nivelIdioma || !values.idiomas) {
                                                            const messageModalJsx =
                                                            <Alert  key={0} color="danger">
                                                                Debe ingrear campos Idioma y Nivel
                                                            </Alert>
                                                            
                                                            this.setOpenModal(true, '', 'Entendido!', "modal-danger", "Completar Campos Experiencia", messageModalJsx);  
                                                            
                                                            return;
                                                        }

                                                        const idiom = {
                                                            idiom: values.idiomas,
                                                            nivel: values.nivelIdioma,
                                                        }
                                                        this.addIdiom(e, idiom);
                                                    }}> 
                                                        <div className="align-self-center">
                                                            <i className="fa fa-plus"></i>  &nbsp;                                                    
                                                            Agregar
                                                        </div>
                                                    </Button>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <FormGroup>
                                                    {errors.idiomsRequire ? <p className="text-danger small">{errors.idiomsRequire}</p> : null}
                                                    { this.state.idiomsRequire && this.state.idiomsRequire.length > 0 &&
                                                    <SimpleBar 
                                                        style={{maxHeight:"300px"}}
                                                        >
                                                        <BootstrapTable
                                                            id="mapping_table"
                                                            striped
                                                            hover
                                                            condensed
                                                            bootstrap4
                                                            classNames={{
                                                                // defaults
                                                                content: 'simplebar-content',
                                                                scrollContent: 'simplebar-scroll-content',
                                                                scrollbar: 'simplebar-scrollbar',
                                                                track: 'simplebar-track'
                                                              }}
                                                            
                                                            ref={ n => this.node = n }
                                                            
                                                            keyField='id'
                                                            //caption="Plain text header"
                                                            noDataIndication={"Sin información..."}
                                                            data={ this.state.idiomsRequire } 
                                                            
                                                            columns={ this.columnsIdioms } 
                                                        ></BootstrapTable>
                                                    </SimpleBar>
                                                    }
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                                
                            </Row>
                        
                            <Row>
								<Col xs="12">
									<FormGroup>
										<Label htmlFor="aspectosPersonales">Aspectos personales / Habilidades blandas <span className="text-danger" role="img" aria-label="Habilidades y destrezas">💪</span></Label>
										<Input type="textarea" id="aspectosPersonales" 
											rows="9"
                                            onChange={handleChange}
                                            
											onBlur={handleBlur}
											value={values.aspectosPersonales || ''}
											placeholder="Agregue aspectos de la personalidad que necesite resaltar, por ej., buen trato con el público, personalidad innovadora, creatividad, buena iniciativa, autodidacta, motivado, etc."
											valid={values.aspectosPersonales !== '' && touched.aspectosPersonales }
											invalid={errors.aspectosPersonales !== undefined && touched.aspectosPersonales } ></Input>
										<FormFeedback className="help-block">{errors.aspectosPersonales && touched.aspectosPersonales && errors.aspectosPersonales}</FormFeedback>
                                        <p className={ values.aspectosPersonales.length > 1000 ? "text-danger small" :"small"}>{values.aspectosPersonales.length + " / 1000" }</p>
                                    </FormGroup>
								</Col>
							</Row>

                            <Row>
								<Col xs="12">
									<FormGroup>
										<Label htmlFor="otrosRequisitos">Otros requisitos</Label>
										<Input type="textarea" id="otrosRequisitos" 
											rows="9"
                                            onChange={handleChange}
                                            
											onBlur={handleBlur}
											value={values.otrosRequisitos || ''}
											placeholder="Agregue otros requisitos, por ej., disponibilidad horaria, licencia clase A4, curso de guardia OS10, certificado de antecedentes y cédula de identidad vigente, certificaciones, etc."
											valid={values.otrosRequisitos !== '' && touched.otrosRequisitos }
											invalid={errors.otrosRequisitos !== undefined && touched.otrosRequisitos } ></Input>
										<FormFeedback className="help-block">{errors.otrosRequisitos && touched.otrosRequisitos && errors.otrosRequisitos}</FormFeedback>
                                        <p className={ values.otrosRequisitos.length > 1000 ? "text-danger small" :"small"}>{values.otrosRequisitos.length + " / 1000" }</p>
                                    </FormGroup>
								</Col>
							</Row>
                        </React.Fragment>   

                        <React.Fragment> {/* Oferta */}
                            <Row>
								<Col xs="12">
									<div className="p-3 mb-2 bg-gray-100 text-black border border-warning rounded">
										<span>Oferta</span>
									</div>
								</Col>
							</Row>
                            <Row>
								<Col xs="12">
                                    <FormGroup>
                                        <Label htmlFor="vacantes">Número de vacantes<i className="text-danger">★</i></Label>
                                        <Input type="number" id="vacantes" 
                                            name="vacantes"
                                            min="0" max="999999999"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.vacantes}
                                            placeholder="Ingrese Número de Vacantes..."
                                            valid={values.vacantes !== '' && touched.vacantes}
                                            invalid={errors.vacantes !== undefined  && touched.vacantes} ></Input>

                                        <FormFeedback className="help-block">{errors.vacantes && touched.vacantes && errors.vacantes}</FormFeedback>
                                    </FormGroup>
								</Col>
							</Row>
                            <Row>
								<Col xs="12">
									<FormGroup>
										<Label htmlFor="selectTiposContratos">Tipo de contrato<i className="text-danger">★</i></Label>
										<CustomSelect
											id={"selectTiposContratos"}
											placeholder={'Seleccione...'}
											nameAttr={'tipoContrato'}
											onChange={(e,a) => {
												
												return setFieldValue(e,a);
											}}
											onBlur={setFieldTouched}
											value={values.tipoContrato}
											options={this.state.opcionesTiposContratos}
											errors={errors.tipoContrato}
											touched={touched.tipoContrato}
											isMulti={false}
											invalid={errors.tipoContrato !== undefined  && touched.tipoContrato} 
										></CustomSelect>
									</FormGroup>
								</Col>
							</Row>

                            <Row>
                                <Col xs="12">
                                    <FormGroup>
                                        <Label htmlFor="jornada">Jornada</Label>
                                        <Input type="textarea" id="jornada" 
                                            rows="4"
                                            onChange={handleChange}
                                            
                                            onBlur={handleBlur}
                                            value={values.jornada || ''}
                                            placeholder="Indique detalles de la jornada laboral, por ej., 45 horas semanales, de lunes a viernes, turnos rotativos, etc."
                                            valid={values.jornada !== '' && touched.jornada }
                                            invalid={errors.jornada !== undefined && touched.jornada } ></Input>
                                        <FormFeedback className="help-block">{errors.jornada && touched.jornada && errors.jornada}</FormFeedback>
                                        <p className={ values.jornada.length > 500 ? "text-danger small" :"small"}>{values.jornada.length + " / 500" }</p>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col xs="12">
                                    <FormGroup>
                                        <Label htmlFor="horario">Horario</Label>
                                        <Input type="textarea" id="horario" 
                                            rows="4"
                                            onChange={handleChange}
                                            
                                            onBlur={handleBlur}
                                            value={values.horario || ''}
                                            placeholder="Indique el horario, por ej., de 9 a 18, horario de oficina, turno noche, etc."
                                            valid={values.horario !== '' && touched.horario }
                                            invalid={errors.horario !== undefined && touched.horario } ></Input>
                                        <FormFeedback className="help-block">{errors.horario && touched.horario && errors.horario}</FormFeedback>
                                        <p className={ values.horario.length > 500 ? "text-danger small" :"small"}>{values.horario.length + " / 500" }</p>
                                    </FormGroup>
                                </Col>
                            </Row>


                            <Row>
								<Col xs="12">
									<FormGroup>
										<Label htmlFor="acercaContratacion">Acerca de la contratación</Label>
										<Input type="textarea" id="acercaContratacion" 
											rows="9"
                                            onChange={handleChange}
                                            
											onBlur={handleBlur}
											value={values.acercaContratacion || ''}
											placeholder="Agregue cualquier aclaración respecto a la contratación, por ejemplo, si hay periodos a prueba, art. 22 del código del trabajo, duración de la contratación, etc."
											valid={values.acercaContratacion !== '' && touched.acercaContratacion }
											invalid={errors.acercaContratacion !== undefined && touched.acercaContratacion } ></Input>
										<FormFeedback className="help-block">{errors.acercaContratacion && touched.acercaContratacion && errors.acercaContratacion}</FormFeedback>
                                        <p className={ values.acercaContratacion.length > 1000 ? "text-danger small" :"small"}>{values.acercaContratacion.length + " / 1000" }</p>
                                    </FormGroup>
								</Col>
							</Row>
                            <Row>
                                <Col xs="12">
                                    <FormGroup >
                                        <AppSwitch 
                                            id="cbRentaConvenir"
                                            className={'mx-0'} 
                                            defaultChecked={false} 
                                            label 
                                            dataOn={'Sí'} 
                                            dataOff={'No'}
                                            color={ errors.cbRentaConvenir !== undefined ? 'danger' : 'primary' } 
                                            name="cbRentaConvenir"
                                            checked={values.cbRentaConvenir}
                                            onChange={handleChange}
                                            onBlur={handleBlur}> 
                                        </AppSwitch>
                                        
                                        
                                        <Label htmlFor="cbRentaConvenir" style={{'verticalAlign':'bottom'}} className="ml-2">Renta a convenir?</Label>
                                        
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Collapse isOpen={!values.cbRentaConvenir} data-parent="#rentaAccordion" id="rentaAccordion">
                                <Row>
                                    <Col xs="12">
                                        <Card className="border-info ">
                                            <CardHeader>
                                                
                                                <Row>
                                                    <Col xs="12" className="align-self-center">
                                                    <span>Detalles de la renta</span>
                                                    </Col>
                                                </Row>
                                            </CardHeader>
                                            <CardBody>
                                                <Row>
                                                    <Col xs="12">
                                                        <FormGroup >
                                                            <AppSwitch 
                                                                id="cbMostrarRenta"
                                                                className={'mx-0'} 
                                                                defaultChecked={false} 
                                                                label 
                                                                dataOn={'Sí'} 
                                                                dataOff={'No'}
                                                                color={ errors.cbMostrarRenta !== undefined ? 'danger' : 'primary' } 
                                                                name="cbMostrarRenta"
                                                                checked={values.cbMostrarRenta}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}> 
                                                            </AppSwitch>
                                                            
                                                            
                                                            <Label htmlFor="cbMostrarRenta" style={{'verticalAlign':'bottom'}} className="ml-2">Mostrar renta?</Label>
                                                            
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col xs="12">
                                                        <FormGroup>
                                                            <Label htmlFor="rentaMaxima">Renta máxima<i className="text-danger">★</i></Label>
                                                            <Input type="number" id="rentaMaxima" 
                                                                name="rentaMaxima"
                                                                min="0" max="999999999"
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.rentaMaxima}
                                                                placeholder="Cantidad máxima a pagar según Tipo de Pago y Periodicidad de Pago..."
                                                                valid={values.rentaMaxima !== '' && touched.rentaMaxima}
                                                                invalid={errors.rentaMaxima !== undefined  && touched.rentaMaxima} ></Input>

                                                            <FormFeedback className="help-block">{errors.rentaMaxima && touched.rentaMaxima && errors.rentaMaxima}</FormFeedback>
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col xs="12">
                                                        <FormGroup>
                                                            <Label htmlFor="selectTipoMonedaRenta">Tipo de moneda<i className="text-danger">★</i></Label>
                                                            <CustomSelect
                                                                id={"selectTipoMonedaRenta"}
                                                                placeholder={'Seleccione...'}
                                                                nameAttr={'tipoMoneda'}
                                                                onChange={(e,a) => {
                                                                    
                                                                    return setFieldValue(e,a);
                                                                }}
                                                                onBlur={setFieldTouched}
                                                                value={values.tipoMoneda}
                                                                options={opcionesTiposMonedas}
                                                                errors={errors.tipoMoneda}
                                                                touched={touched.tipoMoneda}
                                                                isMulti={false}
                                                                invalid={errors.tipoMoneda !== undefined  && touched.tipoMoneda} 
                                                            ></CustomSelect>
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col xs="12">
                                                        <FormGroup>
                                                            <Label htmlFor="selectTipoPago">Tipo de Pago<i className="text-danger">★</i></Label>
                                                            <CustomSelect
                                                                id={"selectTipoPago"}
                                                                placeholder={'Seleccione...'}
                                                                nameAttr={'tipoPago'}
                                                                onChange={(e,a) => {
                                                                    
                                                                    return setFieldValue(e,a);
                                                                }}
                                                                onBlur={setFieldTouched}
                                                                value={values.tipoPago}
                                                                options={this.state.opcionesTiposSalarios}
                                                                errors={errors.tipoPago}
                                                                touched={touched.tipoPago}
                                                                isMulti={false}
                                                                invalid={errors.tipoPago !== undefined  && touched.tipoPago} 
                                                            ></CustomSelect>
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col xs="12">
                                                        <FormGroup>
                                                            <Label htmlFor="selectPeriodicidadPago">Periodicidad de Pago<i className="text-danger">★</i></Label>
                                                            <CustomSelect
                                                                id={"selectPeriodicidadPago"}
                                                                placeholder={'Seleccione...'}
                                                                nameAttr={'periodicidadPago'}
                                                                onChange={(e,a) => {
                                                                    
                                                                    return setFieldValue(e,a);
                                                                }}
                                                                onBlur={setFieldTouched}
                                                                value={values.periodicidadPago}
                                                                options={this.state.opcionesTiposPeriodidadPago}
                                                                errors={errors.periodicidadPago}
                                                                touched={touched.periodicidadPago}
                                                                isMulti={false}
                                                                invalid={errors.periodicidadPago !== undefined  && touched.periodicidadPago} 
                                                            ></CustomSelect>
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col xs="12">
                                                        <FormGroup>
                                                            <Label htmlFor="acercaPago">Acerca del pago</Label>
                                                            <Input type="textarea" id="acercaPago" 
                                                                rows="9"
                                                                onChange={handleChange}
                                                                
                                                                onBlur={handleBlur}
                                                                value={values.acercaPago || ''}
                                                                placeholder="Agregue cualquier observación respecto del pago, por ej., tres primeros meses el 70% del sueldo, sueldo base más comisión, etc."
                                                                valid={values.acercaPago !== '' && touched.acercaPago }
                                                                invalid={errors.acercaPago !== undefined && touched.acercaPago } ></Input>
                                                            <FormFeedback className="help-block">{errors.acercaPago && touched.acercaPago && errors.acercaPago}</FormFeedback>
                                                            <p className={ values.acercaPago.length > 1000 ? "text-danger small" :"small"}>{values.acercaPago.length + " / 1000" }</p>
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                        
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    
                                </Row>
                            </Collapse>
                                
                            
                        </React.Fragment>

                        <React.Fragment> {/* Beneficios */}
                            <Row>
                                <Col xs="12">
                                    <FormGroup>
                                        <Label htmlFor="beneficios">Beneficios</Label>
                                        <Input type="textarea" id="beneficios" 
                                            rows="9"
                                            onChange={handleChange}
                                            
                                            onBlur={handleBlur}
                                            value={values.beneficios || ''}
                                            placeholder="Agregue los beneficios que contempla la oferta, por ej., renta acorde al mercado, seguro dental, bonos esfuerzo, reales posibilidades de crecimiento profesional, etc."
                                            valid={values.beneficios !== '' && touched.beneficios }
                                            invalid={errors.beneficios !== undefined && touched.beneficios } ></Input>
                                        <FormFeedback className="help-block">{errors.beneficios && touched.beneficios && errors.beneficios}</FormFeedback>
                                        <p className={ values.beneficios.length > 1000 ? "text-danger small" :"small"}>{values.beneficios.length + " / 1000" }</p>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col xs="12">
                                    <FormGroup >
                                        <AppSwitch 
                                            id="cbHomeOffice"
                                            className={'mx-0'} 
                                            defaultChecked={false} 
                                            label 
                                            dataOn={'Sí'} 
                                            dataOff={'No'}
                                            color={ errors.cbHomeOffice !== undefined ? 'danger' : 'primary' } 
                                            name="cbHomeOffice"
                                            checked={values.cbHomeOffice}
                                            onChange={handleChange}
                                            onBlur={handleBlur}> 
                                        </AppSwitch>
                                        
                                        <Label htmlFor="cbHomeOffice" style={{'verticalAlign':'bottom'}} className="ml-2">
                                            Home office&ensp;
                                            
                                        </Label>
                                        <i id="iconHelp_cbHomeOffice" className="fa fa-question-circle fa-lg text-info" style={{verticalAlign: "8px", cursor: "pointer"}}></i>
                                            
                                        <CustomPopover placement="top-start" target="iconHelp_cbHomeOffice" title={"Home Office"} text={"Es permitido trabajar algunos días hábiles desde casa u otro lugar que no sea la empresa."}></CustomPopover>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col xs="12">
                                    <FormGroup >
                                        <AppSwitch 
                                            id="cbHorarioFlexible"
                                            className={'mx-0'} 
                                            defaultChecked={false} 
                                            label 
                                            dataOn={'Sí'} 
                                            dataOff={'No'}
                                            color={ errors.cbHorarioFlexible !== undefined ? 'danger' : 'primary' } 
                                            name="cbHorarioFlexible"
                                            checked={values.cbHorarioFlexible}
                                            onChange={handleChange}
                                            onBlur={handleBlur}> 
                                        </AppSwitch>
                                        
                                        <Label htmlFor="cbHorarioFlexible" style={{'verticalAlign':'bottom'}} className="ml-2">
                                            Horario flexible&ensp;
                                            
                                        </Label>
                                        
                                        <i id="iconHelp_cbHorarioFlexible" className="fa fa-question-circle fa-lg text-info" style={{verticalAlign: "8px", cursor: "pointer"}}></i>
                                            <CustomPopover placement="top-start" target="iconHelp_cbHorarioFlexible" title={"Horario Flexible"} text={"Se refiere a que los horarios de entrada, salida, colación, etc. no son estrictos, por ej. si se aplica art. 22, o se requiere horario extiendo."}></CustomPopover>
                                    </FormGroup>
                                </Col>
                            </Row>

                        </React.Fragment>

                        <React.Fragment> {/* Otros */}
                            <Row>
								<Col xs="12">
									<div className="p-3 mb-2 bg-gray-100 text-black border border-warning rounded">
										<span>Otros</span>
									</div>
								</Col>
							</Row>
                            <Row>
                                <Col xs="12">
                                    <Card className="border-info ">
                                        <CardHeader>
                                            <Row>
                                                <Col xs="12" className="align-self-center">
                                                    <span>Preguntas al postulante</span>&ensp;
                                                    <i id="iconHelp_pregunta" className="fa fa-question-circle fa-lg text-info" style={{verticalAlign: "0px", cursor: "pointer"}}></i>
                                                    <CustomPopover placement="top-start" target="iconHelp_pregunta" title={"Preguntas"} text={"Agregue las preguntas que necesiten responderse por le el postulante al momento de la postulación."}></CustomPopover>
                                                </Col>
                                            </Row>
                                        </CardHeader>
                                        <CardBody>
                                            <Row>
                                                <Col xs="12">
                                                    <FormGroup>
                                                        <Label htmlFor="pregunta">Pregunta</Label>
                                                        <Input type="textarea" id="pregunta" 
                                                            rows="9"
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.pregunta || ''}
                                                            placeholder="Por ej., ¿Cuente su experiencia en su último trabajo?, ¿Ha tenido personal a su cargo?, ¿Que le motiva a postular a este empleo?, etc."
                                                            valid={values.pregunta !== '' && touched.pregunta }
                                                            invalid={errors.pregunta !== undefined && touched.pregunta } ></Input>
                                                        <FormFeedback className="help-block">{errors.pregunta && touched.pregunta && errors.pregunta}</FormFeedback>
                                                        <p className={ values.pregunta.length > 1000 ? "text-danger small" :"small"}>{values.pregunta.length + " / 1000" }</p>
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            
                                            <Row className="justify-content-end">
                                                <Col xs="12" md="6" className="text-right">
                                                    <FormGroup>
                                                        <Button color="info" block={isMobile} onClick={ e => {

                                                            if(!values.pregunta) {
                                                                const messageModalJsx =
                                                                <Alert  key={0} color="danger">
                                                                    Debe escribir la pregunta
                                                                </Alert>
                                                                
                                                                this.setOpenModal(true, '', 'Entendido!', "modal-danger", "Completar Campos", messageModalJsx);  
                                                                
                                                                return;
                                                            }

                                                            this.addQuestion(e, values.pregunta);
                                                        }}> 
                                                            <div className="align-self-center">
                                                                <i className="fa fa-plus"></i>  &nbsp;                                                    
                                                                Agregar
                                                            </div>
                                                        </Button>
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <FormGroup>
                                                        
                                                        { this.state.questionsList.length > 0 &&
                                                        <SimpleBar 
                                                            style={{maxHeight:"300px"}}
                                                            >
                                                            <BootstrapTable
                                                                id="mapping_table"
                                                                striped
                                                                hover
                                                                condensed
                                                                bootstrap4
                                                                classNames={{
                                                                    // defaults
                                                                    content: 'simplebar-content',
                                                                    scrollContent: 'simplebar-scroll-content',
                                                                    scrollbar: 'simplebar-scrollbar',
                                                                    track: 'simplebar-track'
                                                                }}
                                                                
                                                                ref={ n => this.node = n }
                                                                
                                                                keyField='id'
                                                                //caption="Plain text header"
                                                                noDataIndication={"Sin información..."}
                                                                data={ this.state.questionsList } 
                                                                
                                                                columns={ this.columnsQuestions } 
                                                            ></BootstrapTable>
                                                        </SimpleBar>
                                                        }
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                                
                            </Row>
                        </React.Fragment>
                                       
                        <React.Fragment> {/* Observaciones */}
                            <Row>
								<Col xs="12">
									<div className="p-3 mb-2 bg-gray-100 text-black border border-warning rounded">
										<span>Observaciones</span>
									</div>
								</Col>
							</Row>
                            <Row>
                                <Col xs="12">
                                    <Card className="border-info ">
                                        <CardHeader>
                                            <Row>
                                                <Col xs="12" className="align-self-center">
                                                    <span>Agregar Observaciones</span>&ensp;
                                                    <i id="iconHelp_observaciones" className="fa fa-question-circle fa-lg text-info" style={{verticalAlign: "0px", cursor: "pointer"}}></i>
                                                    <CustomPopover placement="top-start" target="iconHelp_observaciones" title={"Observaciones"} text={"Agregue las observaciones necesarias para que la oferta de empleo sea validada y publicada."}></CustomPopover>
                                                </Col>
                                            </Row>
                                        </CardHeader>
                                        <CardBody>
                                            <Row>
                                                <Col xs="12">
                                                    <FormGroup>
                                                        <Label htmlFor="observacion">Observación</Label>
                                                        <Input type="textarea" id="observacion" 
                                                            rows="9"
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.observacion || ''}
                                                            placeholder="Por ej., ¿Falta indicar descripción del empleo?, ¿No se ajusta a las políticas del sitio?, ¿No se puede utilizar lenguaje obsceno?, etc."
                                                            valid={values.observacion !== '' && touched.observacion }
                                                            invalid={errors.observacion !== undefined && touched.observacion } ></Input>
                                                        <FormFeedback className="help-block">{errors.observacion && touched.observacion && errors.observacion}</FormFeedback>
                                                        <p className={ values.observacion.length > 1000 ? "text-danger small" :"small"}>{values.observacion.length + " / 1000" }</p>
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            
                                            <Row className="justify-content-end">
                                                <Col xs="12" md="6" className="text-right">
                                                    <FormGroup>
                                                        <Button color="info" block={isMobile} onClick={ e => {

                                                            if(!values.observacion) {
                                                                const messageModalJsx =
                                                                <Alert  key={0} color="danger">
                                                                    Debe escribir la observación
                                                                </Alert>
                                                                
                                                                this.setOpenModal(true, '', 'Entendido!', "modal-danger", "Completar Campos", messageModalJsx);  
                                                                
                                                                return;
                                                            }

                                                            this.addObservation(e, values.observacion);
                                                        }}> 
                                                            <div className="align-self-center">
                                                                <i className="fa fa-plus"></i>  &nbsp;                                                    
                                                                Agregar
                                                            </div>
                                                        </Button>
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <FormGroup>
                                                        
                                                        { this.state.observationList.length > 0 ?
                                                        <SimpleBar 
                                                            style={{maxHeight:"300px"}}
                                                            >
                                                            <BootstrapTable
                                                                id="mapping_table"
                                                                striped
                                                                hover
                                                                condensed
                                                                bootstrap4
                                                                classNames={{
                                                                    // defaults
                                                                    content: 'simplebar-content',
                                                                    scrollContent: 'simplebar-scroll-content',
                                                                    scrollbar: 'simplebar-scrollbar',
                                                                    track: 'simplebar-track'
                                                                }}
                                                                
                                                                ref={ n => this.node = n }
                                                                
                                                                keyField='id'
                                                                //caption="Plain text header"
                                                                noDataIndication={"Sin información..."}
                                                                data={ this.state.observationList } 
                                                                
                                                                columns={ this.columnsObservations } 
                                                            ></BootstrapTable>
                                                        </SimpleBar>
                                                        : null
                                                        }
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                                
                            </Row>
                        </React.Fragment>
                           
						<React.Fragment>
							
							<Row>
								<Col xs="4">
									<Button block color="warning" type="submit" disabled={isSubmitting} onClick={(e) => {
                                        
                                        this.actionForm = "save";
                                        this.isValidatingForm = true;
                                        
                                        } } >
									Guardar
									</Button>
								</Col>
                                <Col xs="4">
                                    <Button block color="danger" type="submit" disabled={isSubmitting} onClick={(e) => {
                                        
                                        this.notifyWhenPublish(e, "rejected", values, errors);
                                        }} >
									Rechazar
									</Button>
								</Col>
								<Col xs="4">
                                    <Button block color="success" type="submit" disabled={isSubmitting} onClick={(e) => {
                                        
                                        this.notifyWhenPublish(e, "publish", values, errors);
                                        }} >
									Publicar
									</Button>
								</Col>
							</Row>
						</React.Fragment>
                    </FormFormik>
                    );
                }}
                </Formik>
        </>

        }

		return (
			<div className="animated fadeIn">
				<ToastContainer></ToastContainer>
				<Row className="justify-content-center">
					<Col xs="12" md="8">
                        <Modal isOpen={this.state.modal} toggle={this.toggleModal} size={this.state.modalSize}  unmountOnClose={true}
                            className={this.state.classNameModal + " " + this.props.className}>
							<ModalHeader toggle={this.toggleModal}>{this.state.titleModal}</ModalHeader>
							<ModalBody>
								{ this.state.contentModal }
							</ModalBody>
							<ModalFooter hidden={this.state.hiddenFooterModal}>
								<Button color="info" onClick={this.toggleModal}>{ this.state.modalMsjButttoOk }</Button>{' '}
							</ModalFooter>
						</Modal>
      
						<Card>
							<CardHeader>
                                <Row>
                                    <Col xs="8" className="align-self-center">
                                        <strong>Edite Oferta de Trabajo - Código: {this.state.codigoOferta}</strong>
								        &ensp;no olvide <Badge className="mr-1" color="warning" onClick={(e) => {  
                                            this.validateForm(e, "save");
                                        
                                            }} style={{cursor:"pointer"}}>Guardar</Badge>
                                    </Col>
                                    <Col xs="4">
                                        <div className="card-header-actions">
                                            <Button block color="info" onClick={(e)=>{ return this.previewJobOffer(e);}}> 
                                                <div className="align-self-center">
                                                    <span role="img" aria-label="Previsualizar Oferta de Empleo">📋</span>&nbsp;Previsualizar
                                                </div>
                                            </Button>
                                        </div>
                                    </Col>
                                </Row>
                            </CardHeader>
							<CardBody>
								
								{formCreateJobOfferJsx}
									
							</CardBody>
						</Card>
					</Col>
				</Row>
			</div>  
		)
	}
}

const mapStateToProps = state => ({
    employer: state.userAuth.employer,
    updateDataEmployer: state.userAuth.updateEmployer,
    countries: state.geographics.countries,
    regions: state.geographics.regions,
    communes: state.geographics.communes,
    commercialSectors: state.parameters.commercialSectors,
    numericalRanges: state.parameters.numericalRanges,
    typesEmployers: state.parameters.typesEmployers,
    positionsCompany: state.parameters.positionsCompany,
    employmentCategories: state.parameters.employmentCategories,
    professions: state.parameters.professions,
    educationalLevel: state.parameters.educationalLevel,
    idioms: state.parameters.idioms,
    typesContracts: state.parameters.typesContracts,
    typesSalaries: state.parameters.typesSalaries,
    typesPaymentPeriodicity: state.parameters.typesPaymentPeriodicity,
    jobsOffersEmployersList: state.jobsOffers.jobsOffersEmployersList,
    resultJobOfferCreated: state.jobsOffers.resultJobOfferCreated,
});


export default connect(mapStateToProps, { 
    getEmployer,
    updateEmployer,
    getCountries,
    getRegions, 
    getCommunes,
    getCommercialSectors,
    getNumericalRanges,
    getTypesEmployers,
    getPositionsCompany,
    getEmploymentCategories,
    getProfessions,
    getEducationalLevel,
    getIdioms,
    getTypesContracts,
    getTypesSalaries, 
    getTypesPaymentPeriodicity,
    getJobsOffersEmployers,
    createJobOffer,
})(CreaterJobOffer);
