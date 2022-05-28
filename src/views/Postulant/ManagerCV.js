import React, { Component } from 'react';
import { 
    Alert, 
    Badge,
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
    Modal, 
    ModalBody, 
    ModalFooter,
    ModalHeader, 
    Row ,
    Collapse,
    ButtonDropdown, 
    DropdownItem, 
    DropdownMenu, 
    DropdownToggle
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { AppSwitch } from '@coreui/react';
import { Formik, Form as FormFormik } from 'formik';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import CustomSelect from '../../components/UI/CustomSelect';

import CustomCVPreview from '../../components/UI/CustomCVPreview';
import CustomNewJobExperience from '../../components/UI/CustomNewJobExperience';
import CustomNewEducation from '../../components/UI/CustomNewEducation';
//import { webConfig } from '../../GlobalConfig';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import uuidv5 from 'uuid/v5';
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

import { opcionesGenero, opcionesInformatica, opcionesEstadoNivelEducacionalRequisito, opcionesNivelesIdiomas, opcionesTiposMonedas, opcionesIdioma } from '../../data/parameters';


// Redux
import { connect } from 'react-redux';
import { getPostulant } from '../../actions/usersActions';
import { getCountries, getRegions, getCommunes } from '../../actions/geographicsActions';
import { getCommercialSectors, getNumericalRanges, getTypesEmployers, getPositionsCompany, getEmploymentCategories, getProfessions, getEducationalLevel, getIdioms, getTypesContracts, getTypesSalaries, getTypesPaymentPeriodicity} from '../../actions/parametersActions';
import { getJobsOffers, createJobOffer } from '../../actions/jobsOffersActions';
import { getCV, createCV } from '../../actions/cvActions';

class ManagerCV extends Component {

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
			text: 'Experiencia / Conocimiento',
			sort: true,
			headerStyle: (colum, colIndex) => {
			return { width: '300px', textAlign: 'left' };
			},
			style: {
                'whiteSpace': 'wrap',
                "verticalAlign": "middle"
            }
		}, {
			dataField: 'time',
			text: 'Tiempo / Nivel',
			sort: true,
			headerStyle: (colum, colIndex) => {
			return { width: '150px', textAlign: 'left' };
			},
			style: {
                'whiteSpace': 'nowrap',
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
			dataField: 'idioma',
			text: 'Idioma',
			sort: true,
			headerStyle: (colum, colIndex) => {
			return { width: '300px', textAlign: 'left' };
			},
			style: {
                'whiteSpace': 'wrap',
                "verticalAlign": "middle"
            }
		}, {
			dataField: 'nivel',
			text: 'Nivel',
			sort: true,
			headerStyle: (colum, colIndex) => {
			return { width: '150px', textAlign: 'left' };
			},
			style: {
                'whiteSpace': 'nowrap',
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
    
	constructor(props, context) {
        super(props, context);
       
        this.refCustomNewJobExperience = React.createRef();

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

        this.tz = moment.tz.guess();
        
        /*const genero = Linq.from(opcionesGenero).firstOrDefault(item => {
            return item.value === 't'; 
        });*/

        this.dataFormCV = null;

        this.initialValuesForForm = null;
       
        this.actionForm = "";
        this.isValidatingForm = false;

        this.isDataJobOfferLoaded = false;
        this.isDataEducationLoaded = false;

		this.state = {

            /* UI */
            dropdownOpenOpcionesMenu: new Array(1).fill(false),
            bUpdateForm: false,
            /* Data */
            
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
            modalShowDiscartButton: false,
            modalSubmitButton: false,
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
            
            experiencies: [],
            idiomsRequire: [],
            

            /**
             * Datos formulario CV
             */
            dataForm: null,
		}

		this.toggleModal = this.toggleModal.bind(this);
        this.setOpenModal = this.setOpenModal.bind(this);
        this.previewCVFormat = this.previewCVFormat.bind(this);

		this.notify = this.notify.bind(this);
		this.dismissNotify = this.dismissNotify.bind(this);
		
        this.validateForm = this.validateForm.bind(this);
        
        this.onDismissAlertRemoteWork = this.onDismissAlertRemoteWork.bind(this);

        this.deleteRowExperience = this.deleteRowExperience.bind(this);
        this.addExperience = this.addExperience.bind(this);

        this.deleteIdiom = this.deleteIdiom.bind(this);
        this.addIdiom = this.addIdiom.bind(this);

        this.onFocusChange_fechaComienzo = this.onFocusChange_fechaComienzo.bind(this);

        this.redirectWhenPublishToManagerJobsOffer = this.redirectWhenPublishToManagerJobsOffer.bind(this);

        this.callbackCloseModalPublish = this.callbackCloseModalPublish.bind(this);
        this.callbackModalPublish = this.callbackModalPublish.bind(this);

        this.toggleOpcionesMenu = this.toggleOpcionesMenu.bind(this);

        this.openPopupAddJobExperience = this.openPopupAddJobExperience.bind(this);

        this.submitAddNewJobExperience = this.submitAddNewJobExperience.bind(this);

        this.openPopupAddEducation = this.openPopupAddEducation.bind(this);

    }
    
    submitForm = {}
  
    UNSAFE_componentWillReceiveProps(nextProps, nextState){

        const { countries, regions, communes, employmentCategories, professions, educationalLevel, idioms, typesContracts, typesSalaries, typesPaymentPeriodicity } = nextProps;

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

                this.isDataJobOfferLoaded = true;
                
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

                this.isDataJobOfferLoaded = true;
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
                    isLoadingIdiomas:false,
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
        
        // Get data CV
        if(nextProps.cv && nextProps.cv !== this.props.cv ){
            
            const { data } = nextProps.cv;

            if(data){
                const {cv} = data;
                //console.log(cv);
                let experienciaLaboral = isIterable(cv.experienciaLaboral) ? cv.experienciaLaboral.map(item => {
                    //console.log(item.fechaFin);
                    const obj = {
                        id: item.id, 
                        cargo: item.cargo,
                        empresa: item.empresa,
                        tipoContrato: item.relacionLaboral ? { value: item.relacionLaboral.id, label: item.relacionLaboral.label } : null,
                        selectCategoriaEmpleo: item.areaEmpresa ? { value: item.areaEmpresa.id, label: item.areaEmpresa.label } : null,
                        selectPresencialPais: item.pais ? { value: item.pais.id, label: item.pais.label } : null,
                        selectPresencialRegion: item.region ? { value: item.region.id, label: item.region.label } : null,
                        selectPresencialComuna: item.comuna ? { value: item.comuna.id, label: item.comuna.label } : null,
                        ciudadPresencial: item.ciudad,
                        fechaInicio: !item.fechaInicio ? new Date() : new Date(item.fechaInicio),
                        fechaTermino:  !item.fechaFin ? new Date() : new Date(item.fechaFin),
                        cbActualmente: item.bActualmenteTrabajaAqui ? item.bActualmenteTrabajaAqui : false,
                        descripcion: item.descripcion
                    };

                    return obj;
                }) : [];

                experienciaLaboral = Linq.from(experienciaLaboral).orderByDescending(item => {
                    return item.fechaInicio; 
                }).toArray();

                let educacion = isIterable(cv.formacionEducacional) ? cv.formacionEducacional.map(item => {
                    const obj = {
                        id: item.id, 
                        centro: item.centroEducacion,
                        selectNivelEstudios: item.nivelEducacional ? { value: item.nivelEducacional.id, label: item.nivelEducacional.label } : null,
                        selectCarrera: item.carrera ? { value: item.carrera.id, label: item.carrera.label } : null,
                        otraCarrera: item.otrasCarreras,
                        selectEstadoEstudio: item.estadoEstudios ? { value: item.estadoEstudios.id, label: item.estadoEstudios.label } : null,
                        selectPresencialPais: item.pais ? { value: item.pais.id, label: item.pais.label } : null,
                        selectPresencialRegion: item.region ? { value: item.region.id, label: item.region.label } : null,
                        selectPresencialComuna: item.comuna ? { value: item.comuna.id, label: item.comuna.label } : null,
                        ciudadPresencial: item.ciudad,
                        fechaInicio: !item.fechaInicio ? new Date() : new Date(item.fechaInicio),
                        fechaTermino:  !item.fechaFin ? new Date() : new Date(item.fechaFin),
                        cbActualmente: item.bActualmenteEstudiaAqui ? item.bActualmenteEstudiaAqui : false,
                        descripcion: item.descripcion,
                        cbModalidadOnline: item.bModalidadOnline ? item.bModalidadOnline : false,
                    };
    
                    return obj;
                }) : [];

                educacion = Linq.from(educacion).orderByDescending(item => {
                    return item.fechaInicio; 
                }).toArray();

                let informatica = [];
                if(isIterable(cv.conocimientosInformatica)){
                    informatica = cv.conocimientosInformatica.map(item => {
                        return {
                            value: item.id, 
                            label: item.label 
                        };
                    });
                }

                
                
                let tipoMoneda = cv.tipoMoneda ? { label: cv.tipoMoneda.label, value: cv.tipoMoneda.id } : null;

                let tipoPago = cv.tipoPago ? { label: cv.tipoPago.label, value: cv.tipoPago.id } : null;

                let periodicidadPago = cv.periodicidadPago ? {label: cv.periodicidadPago.label, value: cv.periodicidadPago.id} : null;

                const auxDataForm = {
                    ...cv,
                   
                    experienciaLaboral,
                    educacion,
                    cbInformatica: cv.bInformatica,
                    informatica,
                    tipoMoneda,
                    tipoPago,
                    periodicidadPago,
                };

               
                
                this.setState(prevState => ({
                    ...prevState,
                    
                    /*codigoOferta: jobsOffersData.codigo,
                    placeToWork: jobsOffersData.placeToWork,
                    allowPlacesToWorkRemotly: auxAllowPlacesToWorkRemotly,
                    experiencies: auxExperiences,
                    
                    questionsList: auxQuestionList,
                    observationsList: auxObservationsList,*/
                    experiencies: cv.otrosConocimientos || [],
                    idiomsRequire: cv.idiomas || [],
                    dataForm: {
                        ...prevState.dataForm,
                        ...auxDataForm, 
                    },
                    bUpdateForm: true
                }));

                //this.isDataJobOfferLoaded = true;
            } else {

                const auxDataForm = {
                    titulo: "",
                    descripcion: "",
                };

                

                this.setState(prevState => ({
                    ...prevState,
                    /*codigoOferta: jobsOffersData.codigo,
                    placeToWork: jobsOffersData.placeToWork,
                    allowPlacesToWorkRemotly: auxAllowPlacesToWorkRemotly,
                    experiencies: auxExperiences,
                    idiomsRequire: auxIdiomsRequire,
                    questionsList: auxQuestionList,
                    observationsList: auxObservationsList,*/
                    dataForm: {
                        ...prevState.dataForm,
                        ...auxDataForm, 
                    },
                    bUpdateForm: true
                }));

               // this.isDataJobOfferLoaded = true;
            }
            
        }

        // Update/Insert CV and retrieve data updated
        if(nextProps.newCV && nextProps.newCV !== this.props.newCV){
            //console.log(nextProps.newCV);

            const { data } = nextProps.newCV;

            if(data){
                let experienciaLaboral = isIterable(data.experienciaLaboral) ? data.experienciaLaboral.map(item => {
                    //console.log(item.fechaFin);
                    const obj = {
                        id: item.id, 
                        cargo: item.cargo,
                        empresa: item.empresa,
                        tipoContrato: item.relacionLaboral ? { value: item.relacionLaboral.id, label: item.relacionLaboral.label } : null,
                        selectCategoriaEmpleo: item.areaEmpresa ? { value: item.areaEmpresa.id, label: item.areaEmpresa.label } : null,
                        selectPresencialPais: item.pais ? { value: item.pais.id, label: item.pais.label } : null,
                        selectPresencialRegion: item.region ? { value: item.region.id, label: item.region.label } : null,
                        selectPresencialComuna: item.comuna ? { value: item.comuna.id, label: item.comuna.label } : null,
                        ciudadPresencial: item.ciudad,
                        fechaInicio: !item.fechaInicio ? new Date() : new Date(item.fechaInicio),
                        fechaTermino:  !item.fechaFin ? new Date() : new Date(item.fechaFin),
                        cbActualmente: item.bActualmenteTrabajaAqui ? item.bActualmenteTrabajaAqui : false,
                        descripcion: item.descripcion
                    };

                    return obj;
                }) : [];

                experienciaLaboral = Linq.from(experienciaLaboral).orderByDescending(item => {
                    return item.fechaInicio; 
                }).toArray();

                let educacion = isIterable(data.formacionEducacional) ? data.formacionEducacional.map(item => {
                    const obj = {
                        id: item.id, 
                        centro: item.centroEducacion,
                        selectNivelEstudios: item.nivelEducacional ? { value: item.nivelEducacional.id, label: item.nivelEducacional.label } : null,
                        selectCarrera: item.carrera ? { value: item.carrera.id, label: item.carrera.label } : null,
                        otraCarrera: item.otrasCarreras,
                        selectEstadoEstudio: item.estadoEstudios ? { value: item.estadoEstudios.id, label: item.estadoEstudios.label } : null,
                        selectPresencialPais: item.pais ? { value: item.pais.id, label: item.pais.label } : null,
                        selectPresencialRegion: item.region ? { value: item.region.id, label: item.region.label } : null,
                        selectPresencialComuna: item.comuna ? { value: item.comuna.id, label: item.comuna.label } : null,
                        ciudadPresencial: item.ciudad,
                        fechaInicio: !item.fechaInicio ? new Date() : new Date(item.fechaInicio),
                        fechaTermino:  !item.fechaFin ? new Date() : new Date(item.fechaFin),
                        cbActualmente: item.bActualmenteEstudiaAqui ? item.bActualmenteEstudiaAqui : false,
                        descripcion: item.descripcion,
                        cbModalidadOnline: item.bModalidadOnline ? item.bModalidadOnline : false,
                    };

                    return obj;
                }) : [];

                educacion = Linq.from(educacion).orderByDescending(item => {
                    return item.fechaInicio; 
                }).toArray();

                let informatica = [];
                    if(isIterable(data.conocimientosInformatica)){
                        informatica = data.conocimientosInformatica.map(item => {
                            return {
                                value: item.id, 
                                label: item.label 
                            };
                        });
                    }

                let tipoMoneda = data.tipoMoneda ? {label: data.tipoMoneda.label, value: data.tipoMoneda.id} : null;
            
                let tipoPago = data.tipoPago ? {label: data.tipoPago.label, value: data.tipoPago.id} : null;

                let periodicidadPago = data.periodicidadPago ? {label: data.periodicidadPago.label, value: data.periodicidadPago.id} : null;
            
                const auxDataForm = {
                    ...data,
                    // mapping other complex fields
                    experienciaLaboral,
                    educacion,
                    cbInformatica: data.bInformatica,
                    informatica: informatica,
                    tipoMoneda,
                    tipoPago,
                    periodicidadPago,
                };

                

                this.setState(prevState => ({
                    ...prevState,
                    /*codigoOferta: jobsOffersData.codigo,
                    placeToWork: jobsOffersData.placeToWork,
                    allowPlacesToWorkRemotly: auxAllowPlacesToWorkRemotly,
                    experiencies: auxExperiences,
                    idiomsRequire: auxIdiomsRequire,
                    questionsList: auxQuestionList,
                    observationsList: auxObservationsList,*/
                    experiencies: data.otrosConocimientos || [],
                    idiomsRequire: data.idiomas || [],
                    dataForm: {
                        ...prevState.dataForm,
                        ...auxDataForm, 
                    },
                    bUpdateForm: true
                }));

            //this.isDataJobOfferLoaded = true;
            }
            this.dismissNotify();

        }

        // Get Postulant Data
        if(this.props.postulant !== nextProps.postulant){
            
            //console.log(nextProps.postulant);

            if(!nextProps.postulant.error){

                this.setState({ postulant: nextProps.postulant });

            }
            
        }
    }

    UNSAFE_componentWillUpdate(nextProps, nextState){

        if(this.state.bUpdateForm !== nextState.bUpdateForm){
            this.isDataJobOfferLoaded = false;

            this.setState({bUpdateForm: false});
        }

    }

    componentDidMount(){

        this.props.getCV();

        this.props.getPostulant();

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

        if(isIterable(opcionesIdioma)){
            let idiomas = [...opcionesIdioma];

            idiomas = Linq.from(idiomas).orderBy(item => {
                return item.nombre; 
            }).toArray();

            const opcionesIdiomas = idiomas.map( item => {
                return { value: item.id, label: item.nombre };
            });

            this.setState({
                opcionesIdiomas: opcionesIdiomas,
                isLoadingIdiomas:false,
            });
        }
        
        this.props.getCountries({ action: "LOAD COUNTRIES"});
        this.props.getEmploymentCategories({action: "LOAD EMPLOYMENT CATEGORIES"});
        //this.props.getProfessions({action: "LOAD PROFESSIONS"});
        //this.props.getEducationalLevel({action: "LOAD EDUCATIONAL LEVELS"});
        //this.props.getIdioms({action: "LOAD IDIOMS"});
        this.setState({isLoadingIdiomas: true});
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

    setOpenModal(isOpen, size, modalMsjButttoOk,classNameModal, titleModal,contentModal,hiddenFooterModal = false, modalShowDiscartButton = false, modalSubmitButton = false) {
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

    previewCVFormat = (e) => {
        e.preventDefault();

        const content = <CustomCVPreview dataForm={{...this.dataFormCV}} postulant={{...this.state.postulant}}></CustomCVPreview>
            
        this.setOpenModal(true, 'lg', 'Listo!', 'modal-info', "Previsualización Curriculum Vitae", content, false, false);

        return true;
    }

    passReference = param => {
        this.setState({submitThisForm:param})
    }

    openPopupAddJobExperience = (e, params) => {
        e.preventDefault();
        
        if(!this.state.opcionesTiposContratos || this.state.opcionesTiposContratos.length <= 0) return;

        const content = <CustomNewJobExperience
        passReference={this.passReference}
        setDataNewJobExperience={this.setDataNewJobExperience} 
        dataForm={{...(params ? params.dataForm :  null)}}
        opcionesTiposContratos={[...this.state.opcionesTiposContratos]}
        opcionesPaises={[...this.state.opcionesPaises]}
        opcionesCategoriasEmpleos={[...this.state.opcionesCategoriasEmpleos]}
        ></CustomNewJobExperience>
            
        this.setOpenModal(true, 'lg', 'Agregar', 'modal-info', "Experiencia de Trabajo", content, false, true, true);

        return true;
    }

    submitAddNewJobExperience = (obj, data, callback) => {
        this.state.submitThisForm({ callback });
    }

    deleteDataJobExperience = (e, item) => {
        e.preventDefault();

        this.isDataJobOfferLoaded = true;
        let experiencies = [...this.state.dataForm.experienciaLaboral];

        const newExperiencies = experiencies.filter(element => {
            return element.id !== item.id;
        });

        this.setState(prevState => ({
            ...prevState,
            dataForm: {
                ...prevState.dataForm,
                experienciaLaboral: newExperiencies
            }
        }));

        this.submitForm();
    }

    setDataNewJobExperience = (params) => {
        this.isDataJobOfferLoaded = true;
        let experiencies = isIterable(this.state.dataForm.experienciaLaboral) ? [...this.state.dataForm.experienciaLaboral] : [];

        
        const exists = Linq.from(experiencies).firstOrDefault(item => {
            
            return item.id === params.id
        });

        if(exists) {
            //console.log();
            let newArrayExp = experiencies.map(obj => {
                if(params.id === obj.id){
                    return params;
                }
                return obj;
            });

            this.setState(prevState => ({
                ...prevState,
                dataForm: {
                    ...prevState.dataForm,
                    experienciaLaboral: newArrayExp
                }
            }));

        } else { // new element
            
            params.id = uuidv5(Math.random().toString(),'1b671a64-40d5-491e-99b0-da01ff1f3341');
            experiencies.push(params);
            
            this.setState(prevState => ({
                ...prevState,
                dataForm: {
                    ...prevState.dataForm,
                    experienciaLaboral: experiencies
                }
            }));
        }
        

       
        this.isDataJobOfferLoaded = false;

        this.submitForm();
    }

    confirmWindow = ({title = 'Confirm to submit', message = 'Are you sure to do this.', onClickYes = null, onClickNo = null }) => {
        confirmAlert({
          title: title,
          message: message,
          buttons: [
            {
              label: 'Sí',
              onClick: onClickYes
            },
            {
              label: 'No',
              onClick: onClickNo
            }
          ]
        });
      };
    
      
    // Method add Education

    openPopupAddEducation = (e, params) => {
        e.preventDefault();
        //console.log(params.dataForm);
        const content = <CustomNewEducation
        passReference={this.passReference}
        setDataNewEducation={this.setDataNewEducation} 
        dataForm={{...(params ? params.dataForm :  null)}}
        opcionesPaises={[...this.state.opcionesPaises]}
        ></CustomNewEducation>
            
        this.setOpenModal(true, 'lg', 'Agregar', 'modal-info', "Educación", content, false, true, true);

        return true;
    }

    setDataNewEducation = (params) => {
        
        this.isDataEducationLoaded = true;
        let educacion = [...this.state.dataForm.educacion];
        //console.log(educacion  );
        
        const exists = Linq.from(educacion).firstOrDefault(item => {
            
            return item.id === params.id
        });

        if(exists) {
            //console.log(exists);
            let newArrayExp = educacion.map(obj => {
                if(params.id === obj.id){
                    return params;
                }
                return obj;
            });

            this.setState(prevState => ({
                ...prevState,
                dataForm: {
                    ...prevState.dataForm,
                    educacion: newArrayExp
                }
            }));

        } else { // new element
            
            params.id = uuidv5(Math.random().toString(),'1b671a64-40d5-491e-99b0-da01ff1f3341');
            educacion.push(params);
            //console.log(educacion);
            this.setState(prevState => ({
                ...prevState,
                dataForm: {
                    ...prevState.dataForm,
                    educacion: educacion
                }
            }));
        }
        

       
        this.isDataEducationLoaded = false;

        this.submitForm();
    }

    deleteDataEducation = (e, item) => {
        e.preventDefault();

        this.isDataEducationLoaded = true;
        let educacion = [...this.state.dataForm.educacion];

        const newEducacion = educacion.filter(element => {
            return element.id !== item.id;
        });

        this.setState(prevState => ({
            ...prevState,
            dataForm: {
                ...prevState.dataForm,
                educacion: newEducacion
            }
        }));

        this.submitForm();
    }

    ///////////////////////

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
            pathname: '/area/empleador/ofertas'
        });
    }

    callbackModalPublish = (action) => {
        this.setState( {modal:false} );
        this.actionForm = action ;
        this.isValidatingForm = true;
        this.submitForm();
    }

    callbackCloseModalPublish = () => {
        this.setState( { modal:false } );
        this.actionForm = "";
        this.isValidatingForm = false;
    }


  
    deleteRowExperience = (idRow) => {
        
        const experiencies = [...this.state.experiencies];

        const newExperiencies = [...experiencies.filter( item => {
            
            return  item.id !== idRow;
        })];
        console.log(newExperiencies);
        this.setState({experiencies: newExperiencies});

        this.isDataJobOfferLoaded = true;
    }
    
    addExperience = (e, values) => {

        e.preventDefault();

        let experiencies = [...this.state.experiencies]; 
        //console.log(experiencie);
        const exists = Linq.from(experiencies).firstOrDefault(item => {
            //console.log(item);
            return item.experience === values.experience}
            );
        //console.log(exists);
        if(exists) return;
        
        let index = experiencies.length > 0 ? Linq.from(experiencies).max(item => {
            return item.id; 
        }) + 1 : 1;

        values.id = index;

        experiencies.push(values);

        this.setState({experiencies});
       
        this.isDataJobOfferLoaded = true;

    }
    
    addIdiom = (e, idiom) => {
        e.preventDefault();

        let idioms = [...this.state.idiomsRequire]; 
        
        const exists = Linq.from(idioms).firstOrDefault(item => {
            
            return item.idioma === idiom.idiom.label}
            );
        
        if(exists) return;
        
        /*let index = idioms.length > 0 ? Linq.from(idioms).max(item => {
            return item.id; 
        }) + 1 : 1;
        
        idiom.id = index;*/

        idiom.id = uuidv5(Math.random().toString(),'1b671a64-40d5-491e-99b0-da01ff1f3341');
        idiom.idioma = idiom.idiom.label;
        idiom.nivel = idiom.nivel.label;

        idioms.push(idiom);

        // let auxIdioms = [...this.state.opcionesIdiomas];

        // auxIdioms = [...Linq.from(auxIdioms)
        //     .where(item  => { 

        //         let contains = true;

        //         for(let i = 0; i < idioms.length; i++){
                    
        //             if(idioms[i].idioma === item.nombre){
        //                 contains = false;
        //                 break;
        //             }
        //         }

        //         return contains; } )
        //     .orderBy(item => {
        //         return item.idioma; 
        //     }).toArray()];
            
        // let opcionesIdiomas = auxIdioms.map( item => {
        //     return { value: item.value, label: item.label };
        // });

        this.setState({
            //opcionesIdiomas: opcionesIdiomas,
            idiomsRequire: idioms});

        this.isDataJobOfferLoaded = true;
    }

    deleteIdiom  = (idRow) => {
        const idioms = [...this.state.idiomsRequire];

        const newIdioms = [...idioms.filter( item => item.id !== idRow)];

        //let auxIdioms = [...this.state.opcionesIdiomas];

        // auxIdioms = [...Linq.from(auxIdioms)
        //     .where(item  => { 

        //         let contains = true;

        //         for(let i = 0; i < newIdioms.length; i++){
        //             if(newIdioms[i].id === item.id){
        //                 contains = false;
        //                 break;
        //             }
        //         }

        //         return contains; } )
        //     .orderBy(item => {
        //         return item.nombre; 
        //     }).toArray()];
            
        // let opcionesIdiomas = auxIdioms.map( item => {
        //     return { value: item.id, label: item.label };
        // });

        this.setState({
           // opcionesIdiomas: opcionesIdiomas,
            idiomsRequire: newIdioms});

        this.isDataJobOfferLoaded = true;
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
        for(let i = moment().year() ; i <= moment().year() + 3; i++) {
            years.push(<option key={this.randomNumber() } value={i}>{i}</option>);
        }
        return years;
    }

    /* UI */
    toggleOpcionesMenu(i) {
        const newArray = this.state.dropdownOpenOpcionesMenu.map((element, index) => { return (index === i ? !element : false); });
        this.setState({
            dropdownOpenOpcionesMenu: newArray,
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

    formCreateJobOfferJsx =
        <Row>
            <Col xs="12" className="text-center" >
                <strong>Buscando su CV...</strong>
            </Col>
        </Row>

	render() {
        //console.log("this.isDataJobOfferLoaded : " + this.isDataJobOfferLoaded);
        //console.log("this.state.bUpdateForm : " + this.state.isDataJobOfferLoaded);
        //console.log("this.dataForm : " + this.state.dataForm);
        if((this.isDataJobOfferLoaded || this.state.bUpdateForm) && this.state.dataForm){

            //console.log("Update Form");

            this.isDataJobOfferLoaded = false;

            const { dataForm } = this.state;
            
            this.dataFormCV = {...dataForm}

            this.initialValuesForForm = {

                titulo: dataForm.titulo || "",
                descripcion: dataForm.descripcion || "",
                experienciaLaboral: dataForm.experienciaLaboral || [],
                formacionEducacional: dataForm.formacionEducacional || [],
                cbInformatica: dataForm.cbInformatica || false,
                conocimientosInformatica: dataForm.informatica || [],
                experiencies: this.state.experiencies || [],
                aspectosPersonales: dataForm.aspectosPersonales || "",
                cbDisponibilidadViajar: dataForm.bDisponibilidadViajar || false,
                cbSalidaTerreno: dataForm.bSalidaTerreno || false,
                cbCambioResidencia: dataForm.bCambioResidencia || false,
                cbTurnos: dataForm.bTurnos || false,
                cbDisponibilidadInmediata: dataForm.bDisponibilidadInmediata || false,
                fechaComienzo: dataForm.fechaComienzo ? moment(dataForm.fechaComienzo) : moment().clone().add(1, 'days'),
                cbHomeOffice: dataForm.bHomeOffice || false,
                cbHorarioFlexible: dataForm.bHorarioFlexible || false,
                cbRentaConvenir: dataForm.bRentaConvenir || false,
                rentaMinima: dataForm.rentaMinima || 0,
                tipoMoneda: dataForm.tipoMoneda || [],
                tipoPago: dataForm.tipoPago || [],
                periodicidadPago: dataForm.periodicidadPago || [],
            };

            this.formCreateJobOfferJsx = 
        <div className="animated fadeIn">

            <Formik  
                enableReinitialize={false}
                initialValues={this.initialValuesForForm}
                validate={ (values) => {
                    let errors = {};

                    //CreateJobOfferValidation({action: this.actionForm, values, errors, setOpenModal: this.setOpenModal, callbackModalPublish: this.callbackModalPublish});
                    const { dataForm } = this.state;

                    this.dataFormCV = {
                        ...dataForm,
                        ...values,
                    };
                    
                    return errors; // RulesValidation({ values, errors, state: {...this.state}});

                }}
                
                onSubmit={(values, { setSubmitting }) => {

                    this.isValidatingForm = false;

                    this.setSubmitting = setSubmitting;
                    this.setSubmitting(false);

                    this.notify("Actualizando datos...");

                    let auxConocimientosInformatica = [];
                    if(values.conocimientosInformatica){
                        auxConocimientosInformatica = values.conocimientosInformatica.map((item) => {
                            return { id: item.value, label: item.label, code: "", collectionName: "opcionesInformatica"};
                        });
                    }

                    let auxExperiencies = [];

                    if(this.state.experiencies){
                        auxExperiencies = this.state.experiencies.map((item) => {
                            return {experience: item.experience, time: item.time };
                        });
                    }

                    let auxIdiomas = [];

                    if(this.state.idiomsRequire){

                        auxIdiomas = this.state.idiomsRequire.map((item) => {
                            return { idioma: item.idioma, nivel: item.nivel, id: item.id };

                        });
                    }

                    /*const auxTipoContrato = values.tipoContrato ? {
                        "id": values.tipoContrato.value,
                        "label": values.tipoContrato.label,
                    } : null;*/

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

                    const experienciaLaboral = isIterable(this.state.dataForm.experienciaLaboral) ? this.state.dataForm.experienciaLaboral.map(item =>{

                        const obj =
                        {
                            id: item.id,
                            cargo: item.cargo,
                            empresa: item.empresa,
                            relacionLaboral: item.tipoContrato ? { id: item.tipoContrato.value, label: item.tipoContrato.label, code: "", collectionName: "maestroTiposContratos"  } : null,
                            areaEmpresa: item.selectCategoriaEmpleo ? { id: item.selectCategoriaEmpleo.value, label: item.selectCategoriaEmpleo.label, code: "", collectionName: "maestroCategoriaEmpleos" } : null,
                            pais: item.selectPresencialPais ? { id: item.selectPresencialPais.value, label: item.selectPresencialPais.label , code: "", collectionName: "maestroPaises" } : null,
                            region: item.selectPresencialRegion ? { id: item.selectPresencialRegion.value, label: item.selectPresencialRegion.label , code: "", collectionName: "maestroRegiones" } : null,
                            comuna: item.selectPresencialComuna ? { id: item.selectPresencialComuna.value, label: item.selectPresencialComuna.label , code: "", collectionName: "maestroComunas" } : null,
                            ciudad: item.ciudadPresencial,
                            fechaInicio: item.fechaInicio ,
                            fechaFin: item.fechaTermino ,
                            bActualmenteTrabajaAqui: item.cbActualmente,
                            descripcion: item.descripcion
                        }

                        return obj;
                        
                    }) : null;

                    
                    const formacionEducacional =  isIterable(this.state.dataForm.educacion) ? this.state.dataForm.educacion.map(item => {
                        //console.log(item);
                        const obj = {
                            id: item.id,
                            centroEducacion: item.centro,
                            nivelEducacional: item.selectNivelEstudios ? { id: item.selectNivelEstudios.value, label: item.selectNivelEstudios.label, code: "", collectionName: "maestroNivelEducacional"  } : null,
                            carrera:  item.selectCarrera ? { id: item.selectCarrera.value, label: item.selectCarrera.label, code: "", collectionName: "maestroNivelEducacional"  } : null,
                            otrasCarreras: item.otraCarrera,
                            estadoEstudios:  item.selectEstadoEstudio ? { id: item.selectEstadoEstudio.value, label: item.selectEstadoEstudio.label, code: "", collectionName: "opcionesEstadoNivelEducacionalRequisito"  } : null,
                            pais: item.selectPresencialPais ? { id: item.selectPresencialPais.value, label: item.selectPresencialPais.label , code: "", collectionName: "maestroPaises" } : null,
                            region: item.selectPresencialRegion ? { id: item.selectPresencialRegion.value, label: item.selectPresencialRegion.label , code: "", collectionName: "maestroRegiones" } : null,
                            comuna: item.selectPresencialComuna ? { id: item.selectPresencialComuna.value, label: item.selectPresencialComuna.label , code: "", collectionName: "maestroComunas" } : null,
                            ciudad: item.ciudadPresencial,
                            fechaInicio: item.fechaInicio ,
                            fechaFin: item.fechaTermino ,
                            bActualmenteEstudiaAqui: item.cbActualmente,
                            descripcion: item.descripcion,
                            bModalidadOnline: item.cbModalidadOnline,
                        }

                        return obj;
                    }) : null;

                   // console.log(auxTipoMoneda);
                    this.props.createCV({
                        ...values,
                        experienciaLaboral,
                        formacionEducacional,
                        bInformatica: values.cbInformatica,
                        conocimientosInformatica: auxConocimientosInformatica,
                        otrosConocimientos: auxExperiencies,
                        idiomas: auxIdiomas,
                        bDisponibilidadViajar: values.cbDisponibilidadViajar,
                        bSalidaTerreno: values.cbSalidaTerreno,
                        bCambioResidencia: values.cbCambioResidencia,
                        bTurnos: values.cbTurnos,
                        bDisponibilidadInmediata: values.cbDisponibilidadInmediata,
                        fechaComienzo: values.fechaComienzo,
                        bHomeOffice: values.cbHomeOffice,
                        bHorarioFlexible: values.cbHorarioFlexible,
                        bRentaConvenir: values.cbRentaConvenir,
                        tipoMoneda: auxTipoMoneda,
                        tipoPago: auxTipoPago,
                        periodicidadPago: auxPeriodicidadPago,
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
                        <React.Fragment> {/* Generales */}
							<Row>
								<Col xs="12">
									<div className="p-3 mb-2 bg-gray-100 text-black border border-warning rounded">
										<span>General</span>
									</div>
								</Col>
							</Row>
                            <Row>
								<Col xs="12">
                                    <FormGroup>
										<Label htmlFor="titulo">Título<i className="text-danger">★</i></Label>
										<Input type="text" id="titulo" 
											name="titulo"
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.titulo || ''}
											placeholder='Por ej. "Diseñador gráfico creativo y con iniciativa", "Camarero con experiencia en pubs y discotecas", "Informático con conocimientos en C++ y administración LAN", etc.'
											valid={values.titulo !== '' && touched.titulo}
											invalid={errors.titulo !== undefined  && touched.titulo} ></Input>
										<FormFeedback className="help-block">{errors.titulo && touched.titulo}</FormFeedback>
                                        <p className={ values.titulo.length > 100 ? "text-danger small" :"small"}>{values.titulo.length + " / 100" }</p>
									</FormGroup>
								</Col>
							</Row>
                            <Row>
								<Col xs="12">
									<FormGroup>
										<Label htmlFor="descripcion">Descripción<i className="text-danger">★</i></Label>
										<Input type="textarea" id="descripcion" 
											rows="9"
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.descripcion || ''}
											placeholder='Resuma sus fortalezas, logros, y experiencia por ej. "Secretaria seria y leal. Soy crítica, honesta y detallista. Tengo más de 10 años de experiencia. Puedo ser sus oídos y sus ojos para ocuparme de organizar su trabajo de forma profesional y efectiva. Así, usted podrá dedicar su tiempo a sus prioridades", "Con años de experiencia en la gestión de sistemas, he sido capaz de adaptarme a los diferentes planes informáticos de las empresas para las que he trabajado. Adicionalmente, cuento con una gran capacidad de análisis de la información y experiencia en la gestión de equipos", etc.'
											valid={values.descripcion !== '' && touched.descripcion }
											invalid={errors.descripcion !== undefined && touched.descripcion } ></Input>
										<FormFeedback className="help-block">{errors.descripcion && touched.descripcion}</FormFeedback>
                                        <p className={ values.descripcion.length > 1000 ? "text-danger small" :"small"}>{values.descripcion.length + " / 1000" }</p>
                                    </FormGroup>
								</Col>
							</Row>
                            <Row>
								<Col xs="12">
									<div className="p-3 mb-2 bg-gray-100 text-black border border-warning rounded">
										<span>Experiencia Laboral</span>
									</div>
								</Col>
							</Row>
                            <Row className="justify-content-end">
                                <Col xs="12" md="6" className="text-right">
                                    <FormGroup>
                                        <Button color="info" block={isMobile} onClick={ e => {
                                            this.openPopupAddJobExperience(e, null);
                                        }}> 
                                            <div className="align-self-center">
                                                <i className="fa fa-plus"></i>  &nbsp;                                                    
                                                Agregar
                                            </div>
                                        </Button>
                                    </FormGroup>
                                </Col>
                            </Row>

                            { 
                                
                                this.state.dataForm.experienciaLaboral && isIterable(this.state.dataForm.experienciaLaboral) ? this.state.dataForm.experienciaLaboral.map((item, index) =>{
                                    
                                    let now = moment(item.fechaTermino); //todays date
                                    let end = moment(item.fechaInicio); // another date
                                    let duration = moment.duration(now.diff(end));
                                    
                                    let months = Math.floor(duration.asMonths() % 12);
                                    let years = Math.floor(duration.asYears());

                                    return (

                                        <Row key={index}>
                                            <Col xs="12">
                                                
                                                <Card>
                                                    <CardHeader>
                                                        <Row>
                                                            <Col xs="12" className="align-self-center">
                                                                <div className="font-weight-bold">
                                                                {item.cargo}
                                                                </div>
                                                                <div>
                                                                {item.empresa}
                                                                </div>
                                                                <div>
                                                                {moment(item.fechaInicio).tz(this.tz).format('MMM YYYY')} - { item.cbActualmente ? 'actualmente' : moment(item.fechaTermino).tz(this.tz).format('MMM YYYY') } 
                                                                &nbsp;📅&nbsp;{ years > 0 ? (years > 1 ? years + " años ": years + " año ") + ( months > 0 ? " y " + (months > 1 ? months + " meses " : months + " mes " ) : "" ) : ( months > 0 ? months + " meses " : " dias") 
                                                                
                                                                }
                                                                </div>
                                                                <div>
                                                                    {item.tipoContrato && item.selectCategoriaEmpleo ? item.tipoContrato.label + " - " + item.selectCategoriaEmpleo.label : 
                                                                    (item.tipoContrato && !item.selectCategoriaEmpleo ? item.tipoContrato.label: (!item.tipoContrato && item.selectCategoriaEmpleo ? item.selectCategoriaEmpleo.label : null))} 
                                                                   
                                                                </div>
                                                                <div>
                                                                    
                                                                    { item.selectPresencialComuna && item.selectPresencialRegion && item.selectPresencialPais && item.selectPresencialPais.label === 'Chile' ? item.selectPresencialComuna.label + ", " + item.selectPresencialRegion.label + ", " +  item.selectPresencialPais.label + " 🌎": 
                                                                    ( !item.selectPresencialComuna && item.selectPresencialRegion && item.selectPresencialPais && item.selectPresencialPais.label === 'Chile'? item.selectPresencialRegion.label + ", " +  item.selectPresencialPais.label  + " 🌎":
                                                                    ( !item.selectPresencialComuna && !item.selectPresencialRegion && item.selectPresencialPais && item.selectPresencialPais.label === 'Chile' ? item.selectPresencialPais.label  + " 🌎": 
                                                                    ( item.ciudadPresencial && item.selectPresencialPais && item.selectPresencialPais.label !== 'Chile' ? item.ciudadPresencial + ", " +  item.selectPresencialPais.label  + " 🌎": 
                                                                    ( item.selectPresencialPais && item.selectPresencialPais.label !== 'Chile' ? item.selectPresencialPais.label  + " 🌎": null))))} 
                                                                </div>
                                                            </Col>
                                                            
                                                        </Row>
                                                    </CardHeader>
                                                    <CardBody>
                                                        <p>
                                                            {item.descripcion}
                                                        </p>
                                                    </CardBody>
                                                    <CardFooter>
                                                        <Row className="justify-content-end">
                                                            <Col xs="12" md="6" className="text-right">

                                                                <div className="d-flex flex-wrap justify-content-end">
                                                                    
                                                                        <Button color="danger" size="sm" className="mr-3" block={isMobile} onClick={ e => {
                                                                                this.confirmWindow({title : 'Confirmar Eliminar', message : `Seguro que desea eliminar esta experiencia laboral (${item.cargo + " | " + item.empresa}) ?`, 
                                                                                onClickYes : () => this.deleteDataJobExperience(e, item), 
                                                                                onClickNo : null });
                                                                            }}> 
                                                                            <div className="align-self-center">
                                                                                <i className="fa fa-eraser "></i>  &nbsp;                                                    
                                                                                Eliminar
                                                                            </div>
                                                                        </Button>
                                                                    
                                                                    
                                                                        <Button color="info" size="sm" block={isMobile} onClick={ e => {
                                                                            
                                                                            this.openPopupAddJobExperience(e, {dataForm: item});
                                                                        }}> 
                                                                            <div className="align-self-center">
                                                                                <i className="fa fa-pencil "></i>  &nbsp;                                                    
                                                                                Editar
                                                                            </div>
                                                                        </Button>
                                                                    
                                                                </div>
                                                                
                                                            </Col>
                                                        </Row>
                                                    </CardFooter>
                                                </Card>
                                            </Col>
                                        </Row>
                                    )
                                })
                                : null
                            }

                            <Row>
								<Col xs="12">
									<div className="p-3 mb-2 bg-gray-100 text-black border border-warning rounded">
										<span>Educación</span>
									</div>
								</Col>
							</Row>

                            <Row className="justify-content-end">
                                <Col xs="12" md="6" className="text-right">
                                    <FormGroup>
                                        <Button color="info" block={isMobile} onClick={ e => {
                                            this.openPopupAddEducation(e, null);
                                        }}> 
                                            <div className="align-self-center">
                                                <i className="fa fa-plus"></i>  &nbsp;                                                    
                                                Agregar
                                            </div>
                                        </Button>
                                    </FormGroup>
                                </Col>
                            </Row>

{
    this.state.dataForm.educacion && this.state.dataForm.educacion.map((item, index) =>{
    
        let now = item.cbActualmente ? moment() : moment(item.fechaTermino); //todays date
        let end =  moment(item.fechaInicio); // another date
        let duration = moment.duration(now.diff(end));
        
        let months = Math.floor(duration.asMonths() % 12);
        let years = Math.floor(duration.asYears());
        return (
        <Row key={index}>
            
            <Col xs="12">

                <Card>
                    <CardHeader>
                        <Row>
                            <Col xs="12" className="align-self-center">
                                <div className="font-weight-bold">
                                {item.selectCarrera ? item.selectCarrera.label : ""}
                                </div>
                                <div className="font-weight-bold">
                                    {item.otraCarrera}
                                </div>
                                <div>
                                {item.selectNivelEstudios ? item.selectNivelEstudios.label : null}
                                </div>
                                <div>
                                {item.centro}
                                </div>
                                <div className="d-flex flex-wrap">

                                { item.cbModalidadOnline ? 
                                <Badge color="info" pill>Online</Badge>  :
                                <Badge color="warning" pill>Presencial</Badge>   
                                }

                                </div>
                                <div>
                                {moment(item.fechaInicio).tz(this.tz).format('MMM YYYY')} - { item.cbActualmente ? 'actualmente' : moment(item.fechaTermino).tz(this.tz).format('MMM YYYY') } 
                                &nbsp;📅&nbsp;{ years > 0 ? (years > 1 ? years + " años ": years + " año ") + ( months > 0 ? " y " + (months > 1 ? months + " meses " : months + " mes " ) : "" ) : ( months > 0 ? months + " meses " : " dias") 
                                
                                }
                                </div>
                                
                                <div>
                                    
                                    { item.selectPresencialComuna && item.selectPresencialRegion && item.selectPresencialPais && item.selectPresencialPais.label === 'Chile' ? item.selectPresencialComuna.label + ", " + item.selectPresencialRegion.label + ", " +  item.selectPresencialPais.label + " 🌎": 
                                    ( !item.selectPresencialComuna && item.selectPresencialRegion && item.selectPresencialPais && item.selectPresencialPais.label === 'Chile'? item.selectPresencialRegion.label + ", " +  item.selectPresencialPais.label  + " 🌎":
                                    ( !item.selectPresencialComuna && !item.selectPresencialRegion && item.selectPresencialPais && item.selectPresencialPais.label === 'Chile' ? item.selectPresencialPais.label  + " 🌎": 
                                    ( item.ciudadPresencial && item.selectPresencialPais && item.selectPresencialPais.label !== 'Chile' ? item.ciudadPresencial + ", " +  item.selectPresencialPais.label  + " 🌎": 
                                    ( item.selectPresencialPais && item.selectPresencialPais.label !== 'Chile' ? item.selectPresencialPais.label  + " 🌎": null))))} 
                                </div>
                            </Col>
                            
                        </Row>
                    </CardHeader>
                    <CardBody>
                        <p>
                            {item.descripcion}
                        </p>
                    </CardBody>
                    <CardFooter>
                        <Row className="justify-content-end">
                            <Col xs="12" md="6" className="text-right">

                                <div className="d-flex flex-wrap justify-content-end">
                                    
                                    <Button color="danger" size="sm" className="mr-3" block={isMobile} onClick={ e => {
                                            this.confirmWindow({title : 'Confirmar Eliminar', message : `Seguro que desea eliminar experiencia educacional(${item.centro + " | " + item.centro}) ?`, 
                                            onClickYes : () => this.deleteDataEducation(e, item), 
                                            onClickNo : null });
                                        }}> 
                                        <div className="align-self-center">
                                            <i className="fa fa-eraser "></i>  &nbsp;                                                    
                                            Eliminar
                                        </div>
                                    </Button>
                                    <Button color="info" size="sm" block={isMobile} onClick={ e => {
                                                                                                    
                                        this.openPopupAddEducation(e, {dataForm: item});
                                    }}> 
                                        <div className="align-self-center">
                                            <i className="fa fa-pencil "></i>  &nbsp;                                                    
                                            Editar
                                        </div>
                                    </Button>
                                    
                                </div>
                                
                            </Col>
                        </Row>
                    </CardFooter>
                </Card>

            </Col>
        </Row>
        );
    })
}

                           
                           
							
							
							

                            
                       

							
                            
							
                            
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
										
										<Label htmlFor="cbInformatica" style={{'verticalAlign':'bottom'}} className="ml-2">Conocimientos básicos de informática</Label>
										
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
                                                nameAttr={'conocimientosInformatica'}
                                                onChange={(e,a) => {
                                                    
                                                    return setFieldValue(e,a);
                                                }}
                                                onBlur={setFieldTouched}
                                                value={values.conocimientosInformatica}
                                                options={this.state.opcionesInformatica}
                                                errors={errors.conocimientosInformatica}
                                                touched={touched.conocimientosInformatica}
                                                isMulti={true}
                                                invalid={errors.conocimientosInformatica !== undefined  && touched.conocimientosInformatica} 
                                            ></CustomSelect>
                                        </FormGroup>
                                    </Col>

                                    
                                </Row>
                            </Collapse>
                            <Row>
                                <Col xs="12">
                                    <Card className="border-info ">
                                        <CardHeader>
                                            
                                            <Row>
                                                <Col xs="12" className="align-self-center">
                                                <span>Agrege otro(s) conocimientos(s) o experiencia(s)</span>
                                                </Col>
                                            </Row>
                                        </CardHeader>
                                        <CardBody>
                                            <Row>
                                                <Col xs="12">
                                                    <FormGroup>
                                                        <Label htmlFor="experiencia">Conocimiento / Experiencia</Label>
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
                                                        <Label htmlFor="tiempoExperiencia">Tiempo</Label>
                                                        <Input type="text" id="tiempoExperiencia" 
                                                            name="tiempoExperiencia"
                                                            min="1" max="999"
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.tiempoExperiencia || ''}
                                                            placeholder='Por ej. "3 meses", "5 años", "1 mes", "Avanzado", "Aprendiz", etc.'
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
                                                    {errors.experiencies ? <p className="text-danger small">{errors.experiencies} </p> : null}
                                                    { isIterable(this.state.experiencies) ?
                                                    <SimpleBar style={{maxHeight:"300px"}}>
                                                        <BootstrapTable
                                                            id="mapping_table_experiencies"
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
                                                            data={ this.state.experiencies || [] } 
                                                            
                                                            columns={ this.columnsExperiencies } 
                                                        ></BootstrapTable>
                                                    </SimpleBar> : null
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
                                    <Card className="border-info ">
                                        <CardHeader>
                                            <Row>
                                                <Col xs="12" className="align-self-center">
                                                <span>Agrege idioma(s) y su nivel de manejo</span>
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
                                                            // isLoading={this.state.isLoadingIdiomas}
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
                                                    { isIterable(this.state.idiomsRequire) ?
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
                                                            data={ this.state.idiomsRequire || []} 
                                                            
                                                            columns={ this.columnsIdioms } 
                                                        ></BootstrapTable>
                                                    </SimpleBar> : null
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
                        </React.Fragment>

                        <React.Fragment> {/* Disponibilidad */}
                            <Row>
								<Col xs="12">
									<div className="p-3 mb-2 bg-gray-100 text-black border border-warning rounded">
										<span>Disponibilidad</span>
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
                                            id="cbTurnos"
                                            className={'mx-0'} 
                                            defaultChecked={false} 
                                            label 
                                            dataOn={'Sí'} 
                                            dataOff={'No'}
                                            color={ errors.cbTurnos !== undefined ? 'danger' : 'primary' } 
                                            name="cbTurnos"
                                            checked={values.cbTurnos}
                                            onChange={handleChange}
                                            onBlur={handleBlur}> 
                                        </AppSwitch>
                                        
                                        <Label htmlFor="cbTurnos" style={{'verticalAlign':'bottom'}} className="ml-2">Disponibilidad para turnos</Label>
                                        
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

                            <Collapse isOpen={ !values.cbDisponibilidadInmediata } data-parent="#fechaComienzoAccordion" id="fechaComienzoAccordion">
                                <Row>
                                    <Col xs="12">
                                        <FormGroup>
                                            <Label htmlFor="fechaComienzo">Fecha para comenzar</Label>
                                            <SingleDatePicker
                                                id="fechaComienzo"
                                                key={"fechaComienzo"}
                                                date={values.fechaComienzo}
                                                onDateChange={date => {
                                                   
                                                    return setFieldValue("fechaComienzo",date);
                                                    //this.isDataJobOfferLoaded = true;
                                                }}
                                                focused={this.state.focusedFechaComeinzo}
                                                onFocusChange={({ focused }) =>{
                                                   
                                                    this.setState({ focusedFechaComeinzo: focused });
                                                    this.isDataJobOfferLoaded = true;
                                                }
                                                }
                                                placeholder="Seleccione una fecha..."
                                                isOutsideRange={(day) => day.isAfter(moment().clone().add(360, 'days')) ||  day.isBefore(moment().clone().add(-1, 'days'))  }
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
                            </Collapse>

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
                                            
                                        <CustomPopover placement="top-start" target="iconHelp_cbHomeOffice" title={"Home Office"} text={"Tiene disponibilidad para trabajar desde casa?."}></CustomPopover>
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
                                            <CustomPopover placement="top-start" target="iconHelp_cbHorarioFlexible" title={"Horario Flexible"} text={"Tiene disponibilidad para trabajar fuera de horarios?."}></CustomPopover>
                                    </FormGroup>
                                </Col>
                            </Row>

                        </React.Fragment>   

                        <React.Fragment> {/* Renta */}
                            <Row>
								<Col xs="12">
									<div className="p-3 mb-2 bg-gray-100 text-black border border-warning rounded">
										<span>Renta</span>
									</div>
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
                                        <FormGroup>
                                            <Label htmlFor="rentaMinima">Renta mínima<i className="text-danger">★</i></Label>
                                            <Input type="number" id="rentaMinima" 
                                                name="rentaMinima"
                                                min="0" max="999999999"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.rentaMinima}
                                                placeholder="Cantidad mínima a pagar según Tipo de Pago y Periodicidad de Pago..."
                                                valid={values.rentaMinima !== '' && touched.rentaMinima}
                                                invalid={errors.rentaMinima !== undefined  && touched.rentaMinima} ></Input>

                                            <FormFeedback className="help-block">{errors.rentaMinima && touched.rentaMinima && errors.rentaMinima}</FormFeedback>
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
                            </Collapse>
                            
                        </React.Fragment>



                           
						<React.Fragment>
							
							<Row>
								<Col xs="12">
									<Button block color="success" type="submit" disabled={isSubmitting} onClick={(e) => {
                                        
                                        this.actionForm = "save";
                                        this.isValidatingForm = true;
                                        } } >
									Actualizar Datos
									</Button>
								</Col>
							</Row>
						</React.Fragment>
                    </FormFormik>
                    );
                }}
                </Formik>
        </div>

        }
        
		return (
			<div className="animated fadeIn">
				<ToastContainer></ToastContainer>
				<Row className="justify-content-center">
					<Col xs="12" md="8">
                        
                        { this.state.observationsList  && this.state.observationsList.length > 0 &&
                            <Card>
                                <CardHeader>
                                    <Row>
                                        <Col xs="12" className="align-self-center">
                                            <strong>Observaciones</strong>
                                            &ensp;realice las siguiente correcciones.
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    { this.state.observationsList.map((item, key) => 
                                        <Alert key={key} color="danger">
                                            {item}
                                        </Alert>
                                    ) }
                                   
                                </CardBody>
                            </Card>
                        }
						<Card>
							<CardHeader>
                                <Row>
                                    <Col xs="8" className="align-self-center">
                                        <strong>Edite su Curriculum Vitae</strong>
                                        &ensp;<small>clic en el botón <strong className="text-success">Actualizar Datos</strong> para guardar cambios...</small>
                                        
                                    </Col>
                                    <Col xs="4">
                                        <div className="card-header-actions">
                                            <div className="pull-right d-xs-block d-sm-block  d-md-block d-lg-none d-xl-none">
                                                <div className="form-inline">
                                                    <ButtonDropdown className="mr-1" isOpen={this.state.dropdownOpenOpcionesMenu[0]} toggle={() => { this.toggleOpcionesMenu(0); }}>
                                                        <DropdownToggle caret color="danger">
                                                            Opciones
                                                        </DropdownToggle>
                                                        <DropdownMenu>
                                                            <DropdownItem header>Seleccione...</DropdownItem>
                                                            
                                                            {/* <DropdownItem>
                                                                <Link to={'#'} className="btn btn-danger nuevo-post mr-1" onClick={(e)=>{ return this.previewCVFormat(e);
                                                                    }}>
                                                                    <div className="align-self-center">
                                                                        <span role="img" aria-label="Exportar PDF">📩</span>&nbsp;Exportar PDF
                                                                    </div>
                                                                </Link>
                                                            </DropdownItem> */}
                                                            
                                                            <DropdownItem>
                                                                <Link to={'#'} className="btn btn-info nuevo-post mr-1" onClick={(e)=>{ return this.previewCVFormat(e);}}>
                                                                    <div className="align-self-center">
                                                                        <span role="img" aria-label="Previsualizar CV">📋</span>&nbsp;Previsualizar CV
                                                                    </div>
                                                                </Link>
                                                            </DropdownItem>
                                                        </DropdownMenu>
                                                    </ButtonDropdown>
                                                    
                                                </div>
                                            </div>
                                            <div className="pull-right d-none d-xs-none d-sm-none  d-md-none d-lg-block d-xl-block">
                                                <div className="form-inline">
                                                    {/* <Link to={'#'} className="btn btn-danger nuevo-post mr-1" onClick={(e)=>{ return this.previewCVFormat(e);
                                                        }}>
                                                        <div className="align-self-center">
                                                            <span role="img" aria-label="Exportar PDF">📩</span>&nbsp;Exportar PDF
                                                        </div>
                                                    </Link> */}
                                                    <Link to={'#'} className="btn btn-info nuevo-post mr-1" onClick={(e)=>{ return this.previewCVFormat(e);}}>
                                                        <div className="align-self-center">
                                                            <span role="img" aria-label="Previsualizar CV">📋</span>&nbsp;Previsualizar CV
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </CardHeader>
							<CardBody>
								
								{this.formCreateJobOfferJsx}
									
							</CardBody>
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
			</div>  
		)
	}
}

const mapStateToProps = state => ({
    postulant: state.userAuth.postulant,
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
    jobsOffersList: state.jobsOffers.jobsOffersList,
    resultJobOfferCreated: state.jobsOffers.resultJobOfferCreated,

    cv: state.cvPostulant.cv,
    newCV: state.cvPostulant.newCV
});


export default connect(mapStateToProps, { 
    getPostulant,
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
    getJobsOffers,
    createJobOffer,
    getCV,
    createCV
})(ManagerCV);
