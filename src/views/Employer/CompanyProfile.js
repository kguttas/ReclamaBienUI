
import React, { Component } from 'react';
import { 
    Alert, 
    Button,
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
    Row  } from 'reactstrap';
import { Formik, Form as FormFormik } from 'formik';
import CustomSelect from '../../components/UI/CustomSelect';
import Thumb from '../../components/UI/Thumb';
import Linq from 'linq'; 
import { isIterable, validateUrl, ConvertFormatDateToBrowser, FormatDateFromInput} from '../../utiles';
import '../../css/inputFile.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';



// Site config
import { webConfig } from '../../GlobalConfig';

import { validate as validateRut, format as formatRut } from 'rut.js';

// Redux
import { connect } from 'react-redux';
import { updateEmployer, getEmployer } from '../../actions/usersActions';
import { getCountries, getRegions, getCommunes } from '../../actions/geographicsActions';
import { getCommercialSectors, getNumericalRanges, getTypesEmployers, getPositionsCompany } from '../../actions/parametersActions';

class CompanyProfile extends Component{

    constructor(props){
        super(props);

        this.state = {
            isCompany: 0,
            opcionesPaises: [],
            opcionesRegiones: [],
            opcionesComunas: [],
            opcionesSectorComercial: [],
            opcionesCantidadTrabajadores: [],
            opcionesTipoEmpleador: [],
            opcionesCargos: [],
            isValidatingForm: false,
            logoFile: null,
            modal: false,
            classNameModal: "",
            titleModal: "",
            contentModal: <div></div>,
            
            /* Formulario */
            employer: null,
            aspnetUser: null,
            /* Loading Select */
            isLoadingSectorComercial: true,
            isLoadingPaises: true,
            isLoadingCantidadTrabajadores: true,
            isLoadingTipoEmpleador: true,
            isLoadingRegiones: true,
            isLoadingComunas:true,
            isLoadingCargos: true
        }

        this.toggleModal = this.toggleModal.bind(this);
        this.setOpenModal = this.setOpenModal.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.onChangeQuitarLogo = this.onChangeQuitarLogo.bind(this);
        this.redirectToLogin = this.redirectToLogin.bind(this);
        this.initThisForm = this.initThisForm.bind(this);
        this.notify = this.notify.bind(this);
        this.dismissNotify = this.dismissNotify.bind(this);
        
        this.changedOpcionesComuna = false;
        this.changedOpcionesRegion = false;
        this.isChile = false;
        this.isCargoOtro = false;

        this.initPaisSelected = null;
        this.initRegionSelected = null;
        this.initComunaSelected = null;

        this.initSectorComercialSelected = null;
        this.initCargoSelected = null;
        this.intiTipoEmpleadorSelected = null;
        this.initCantidadTrabajadoresSelected = null;

        this.setSubmitting = null;
    }

    toastId = null;

    notify = (msj) => { 
        //console.log("Notify");
        this.toastId = toast.info(msj, {
            position: toast.POSITION.BOTTOM_RIGHT/*,
            autoClose: 3000*/
        }); 
    }

    dismissNotify = () =>  {

        //setTimeout(() => {
            if(this.toastId){
                toast.dismiss(this.toastId);
                this.toastId = null;
            }
        //}, 1000);
        
    }

    toggleModal() {
        this.setState({
          modal: !this.state.modal
        });
    }

    setOpenModal(isOpen,classNameModal, titleModal,contentModal) {
        this.setState({
          modal: isOpen,
          classNameModal: classNameModal,
          titleModal: titleModal,
          contentModal: contentModal
        });
    }

    validateForm(){
        this.setState({isValidatingForm:true});
    }

    componentDidUpdate(prevProps, prevState){

    }

    UNSAFE_componentWillReceiveProps(nextProps, nextState){

        const { countries, regions, communes, commercialSectors, numericalRanges, typesEmployers, positionsCompany, 
             updateDataEmployer } = nextProps;
        
        /*if(this.props.dataEmployer !== dataEmployer){
            //console.log(dataEmployer);
            this.initThisForm(dataEmployer);
        }*/

        if(isIterable(positionsCompany) && positionsCompany !== this.props.positionsCompany && positionsCompany.error === undefined && this.state.opcionesCargos.length === 0){
            //console.log(positionsCompany);

            let cargos = [...positionsCompany];

            cargos = Linq.from(cargos).orderBy(item => {
                return item.orden; 
            }).toArray();

            const opcionesCargos = cargos.map( item => {
                return { value: item.id, label: item.nombre };
            });

            this.setState({
                opcionesCargos: opcionesCargos,
                isLoadingCargos: false
            });
        }

        if(isIterable(typesEmployers) && typesEmployers !== this.props.typesEmployers && typesEmployers.error === undefined && this.state.opcionesTipoEmpleador.length === 0){
            //console.log(typesEmployers);

            let tiposEmpleadores = [...typesEmployers];

            tiposEmpleadores = Linq.from(tiposEmpleadores).orderBy(item => {
                return item.orden; 
            }).toArray();

            const opcionesTipoEmpleador = tiposEmpleadores.map( item => {
                return { value: item.id, label: item.nombre };
            });

            this.setState({
                opcionesTipoEmpleador: opcionesTipoEmpleador,
                isLoadingTipoEmpleador: false
            });
        }

        if(isIterable(numericalRanges) && numericalRanges !== this.props.numericalRanges && numericalRanges.error === undefined && this.state.opcionesCantidadTrabajadores.length === 0){
            //console.log(numericalRanges);

            let cantidadTrabajadores = [...numericalRanges];

            cantidadTrabajadores = Linq.from(cantidadTrabajadores).orderBy(item => {
                return item.orden; 
            }).toArray();

            const opcionesCantidadTrabajadores = cantidadTrabajadores.map( item => {
                return { value: item.id, label: item.rango };
            });

            this.setState({
                opcionesCantidadTrabajadores: opcionesCantidadTrabajadores,
                isLoadingCantidadTrabajadores: false
            });
        }

        if(isIterable(commercialSectors) && commercialSectors !== this.props.commercialSectors && commercialSectors.error === undefined && this.state.opcionesSectorComercial.length === 0){
            //console.log(commercialSectors);

            let sectoresComerciales = [...commercialSectors];

            sectoresComerciales = Linq.from(sectoresComerciales).orderBy(item => {
                return item.nombre; 
            }).toArray();

            const opcionesSectorComercial = sectoresComerciales.map( item => {
                return { value: item.id, label: item.nombre };
            });

            this.setState({
                opcionesSectorComercial: opcionesSectorComercial,
                isLoadingSectorComercial: false
            });
            
        }
        
        if(isIterable(countries) && countries !== this.props.countries && countries.error === undefined && this.state.opcionesPaises.length === 0){
            //console.log(countries);

            let paises = [...countries];

            paises = Linq.from(paises).orderBy(item => {
                return item.nombre; 
            }).toArray();

            const opcionesPaises = paises.map( item => {
                return { value: item.id, label: item.nombre };
            });

            this.setState({
                opcionesPaises: opcionesPaises,
                isLoadingPaises: false
            });

            
        }

        if(isIterable(regions) && regions !== this.props.regions && this.state.opcionesRegiones.length === 0){
            //console.log(regions);

            let regiones = [...regions];

            regiones = Linq.from(regiones).orderBy(item => {
                return item.nombre; 
            }).toArray();

            const opcionesRegiones = regiones.map( item => {
                return { value: item.id, label: item.nombre };
            });
            //console.log(opcionesRegiones);
            this.setState({
                opcionesRegiones: opcionesRegiones,
                isLoadingRegiones: false
                
            });
        }

        if(isIterable(communes) && communes !== this.props.communes  && this.state.opcionesComunas.length === 0){
            //console.log(communes);

            let comunas = [...communes];

            comunas = Linq.from(comunas).orderBy(item => {
                return item.nombre; 
            }).toArray();

            const opcionesComunas = comunas.map( item => {
                return { value: item.id, label: item.nombre };
            });

            this.setState({
                opcionesComunas: opcionesComunas,
                isLoadingComunas: false
            });
        }
       
        if((this.props.employer !== nextProps.employer) && (!this.state.employer)){

            //console.log("-----------------");

            this.setState({employer: nextState.employer});
            //this.props.setDataEmployer(nextProps.getDataEmployer);
            this.initThisForm(nextProps.employer);
        }

        if(this.props.updateDataEmployer !== updateDataEmployer){
            //console.log(updateDataEmployer);
            this.props.setDataEmployer(updateDataEmployer.updatedEmployer);
            this.setState({employer:updateDataEmployer.updatedEmployer})

            this.dismissNotify();

            this.setSubmitting(false);
        }
    }

    shouldComponentUpdate(nextProps, nextState) {

        //console.log(nextProps);

        if(this.props.dataEmployer !== nextProps.dataEmployer){
            //console.log("shouldComponentUpdate");
            //this.initThisForm(nextProps.dataEmployer);
        }

        /* Paises */
        if(this.state.employer && (this.state.opcionesPaises !== nextState.opcionesPaises) && this.state.employer.frk_Paises){
            
            var opcionPais = nextState.opcionesPaises.find(_ => _.value === this.state.employer.frk_Paises.id); 
            //console.log(this.state.employer.frk_Paises);
            if(opcionPais){

                if(opcionPais.label === 'Chile'){
                    this.isChile = true;
                }else{
                    this.isChile = false;
                }

                //console.log(opcionPais);
                
                this.initPaisSelected = opcionPais;

                this.props.getRegions({ action: "LOAD REGIONS", idPais: opcionPais.value});          
                    
                //return true;
            }
        }

        if((this.state.employer) && (this.state.employer.frk_Regiones) && (this.state.opcionesRegiones !== nextState.opcionesRegiones) && (nextState.opcionesRegiones.length > 0)){
            /*console.log("####");
            console.log(this.state.opcionesRegiones);
            console.log(nextState.opcionesRegiones);
            console.log("@@@@");*/
            //console.log(this.state.employer);
            var opcionRegion= nextState.opcionesRegiones.find(_ => _.value === this.state.employer.frk_Regiones.id); 
             
            /*this.setState({
                opcionesComunas: []
            });*/

            this.initRegionSelected = opcionRegion;
            
            if(opcionRegion){
                //console.log(opcionRegion);
                this.props.getCommunes({ action: "LOAD REGIONS", idRegion: opcionRegion.value});
            }
            
            //return true;
        }


        if((this.state.employer) && (this.state.employer.frk_Ciudades) && (this.state.opcionesComunas !== nextState.opcionesComunas) && (nextState.opcionesComunas.length > 0)){
            //console.log(this.state.employer.frk_Ciudades);
            var opcionComuna =  nextState.opcionesComunas.find(_ => _.value === this.state.employer.frk_Ciudades.id);
            
            this.initComunaSelected = opcionComuna;
            
            //return true;
        }


        if((this.state.employer) && (this.state.employer.frk_Cargo) && 
        (this.state.opcionesCargos !== nextState.opcionesCargos) && 
        (nextState.opcionesCargos.length > 0)){
          
            
            var opcionCargo = nextState.opcionesCargos.find(_ => _.value === this.state.employer.frk_Cargo.id); 
            
            if(opcionCargo && opcionCargo.label === 'Otro'){
                this.isCargoOtro = true;
            }else{
                this.isCargoOtro = false;
            }
            //console.log(opcionCargo);
            this.initCargoSelected = opcionCargo;

           // return true;
            
        }

        
        if((this.state.employer) && (this.state.employer.frk_SectorComercial) &&
         (this.state.opcionesSectorComercial !== nextState.opcionesSectorComercial) && 
         (nextState.opcionesSectorComercial.length > 0)){
            
            var opcionSectorComercial = nextState.opcionesSectorComercial.find(_ => _.value === this.state.employer.frk_SectorComercial.id); 
            
            this.initSectorComercialSelected = opcionSectorComercial;

            //console.log(opcionSectorComercial);
            
            //return true;
            
        }
        
        if((this.state.employer) && (this.state.employer.frk_CantididadTrabajadores) &&
         (this.state.opcionesCantidadTrabajadores !== nextState.opcionesCantidadTrabajadores) && 
         (nextState.opcionesCantidadTrabajadores.length > 0)){
            
            var opcionCantidadTrabajadores = nextState.opcionesCantidadTrabajadores.find(_ => _.value === this.state.employer.frk_CantididadTrabajadores.id); 
            
            this.initCantidadTrabajadoresSelected = opcionCantidadTrabajadores;

            
            //return true;
            
        }

        if((this.state.employer) && (this.state.employer.frk_TipoEmpresa) &&
         (this.state.opcionesTipoEmpleador !== nextState.opcionesTipoEmpleador) && 
         (nextState.opcionesTipoEmpleador.length > 0)){
            
            var opcionTipoEmpleador = nextState.opcionesTipoEmpleador.find(_ => _.value === this.state.employer.frk_TipoEmpresa.id); 
            
            this.intiTipoEmpleadorSelected = opcionTipoEmpleador;

            
            //return true;
            
        }

        return true;
    }



    componentDidMount() {
        //console.log("componentDidMount");

        /*this.props.getCountries({ action: "LOAD COUNTRIES"});

        this.props.getCommercialSectors({action: "LOAD COMMERCIAL SECTORS"});

        this.props.getNumericalRanges({action: "LOAD NUMERICAL RANGES", category: "n_trabajadores"});

        this.props.getTypesEmployers({action: "LOAD TYPES EMPLOYERS"});

        this.props.getPositionsCompany({action: "LOAD POSITIONS COMPANY"});*/

        this.props.getEmployer();
                 
        //this.initThisForm(this.props.dataEmployer);
    }

    initThisForm = (dataEmployer) => {
        //console.log(dataEmployer);
        if(dataEmployer){

            const { employer , aspnetUser } = dataEmployer;
            //console.log(employer);
            if(employer && aspnetUser){

                this.props.getCountries({ action: "LOAD COUNTRIES"});

                if(employer.bPersonaJuridica){
                    
                    this.props.getCommercialSectors({action: "LOAD COMMERCIAL SECTORS"});

                    this.props.getNumericalRanges({action: "LOAD NUMERICAL RANGES", category: "n_trabajadores"});

                    this.props.getTypesEmployers({action: "LOAD TYPES EMPLOYERS"});

                    this.props.getPositionsCompany({action: "LOAD POSITIONS COMPANY"});
                }
                
                //console.log(`${webConfig.urlImages}/${employer.id}/${employer.rutaLogoEmpresa}`);
                const isCompany = (employer.bPersonaJuridica ? 2 : 1);
                
                const urlLogo = `${webConfig.urlImagesNotCache}/${employer.rutaLogoEmpresa}`;

                //console.log("URL LOGO: " + urlLogo);

                this.setState({
                    isCompany: isCompany,
                    employer: employer,
                    aspnetUser: aspnetUser,
                    logoFile: urlLogo
                });

               
            }
        }
    }

    onChangeQuitarLogo = (e) => {
        
        this.setState({logoFile: null});
    }

    selectTypePerson = (value) => {
        this.setState({ isCompany: value});       
    }

    onMenuOpenPais = (e) => {
        //console.log("onMenuOpenPais");
    }

    onChangeCargo = (e) => {
        if(e !== null){

            if(e !== null && e.label === 'Otro'){
                this.isCargoOtro = true;
            }else{
                this.isCargoOtro = false;
            }    
        }

        if(this.state.employer){

            const auxEmployer = {...this.state.employer};
            
            auxEmployer.frk_Cargo = e;

            this.initCargoSelected = e;

            this.setState({employer: auxEmployer});
            
        }
    }

    onChangePais = (e) => {

        if(this.state.employer){

            if(this.state.employer.frk_Paises){
                
                const auxEmployer = {...this.state.employer};
                auxEmployer.frk_Paises = e;
                auxEmployer.frk_Regiones = null;
                auxEmployer.frk_Ciudades = null;
                this.initPaisSelected = e;
                this.initRegionSelected = null;
                this.setState({employer: auxEmployer});
            }else{
                this.initPaisSelected = e;
            }
        }

        this.changedOpcionesComuna = true;
        this.changedOpcionesRegion = true;

        this.setState({
            opcionesRegiones: [], 
            opcionesComunas: [],
        });

        if(e !== null){

            if(e !== null && e.label === 'Chile'){
                this.isChile = true;
            }else{
                this.isChile = false;
            }

            this.props.getRegions({ action: "LOAD REGIONS", idPais: e.value});          
        }
    }

    onChangeRegion = (e) => {
        
        if(this.state.employer){

            //if(this.state.employer.frk_Regiones){

                const auxEmployer = {...this.state.employer};
                auxEmployer.frk_Regiones = e;
                auxEmployer.frk_Ciudades = null;

                this.initRegionSelected = e;
                this.initComunaSelected = null;

                this.setState({employer: auxEmployer});
            //}
        }
        
        this.changedOpcionesComuna = true;

        this.setState({
            opcionesComunas: []
        });

        if(e !== null){
            
            this.props.getCommunes({ action: "LOAD REGIONS", idRegion: e.value});
        }

    }

    onChangeComuna = (e) => {
        if(this.state.employer){

            //if(this.state.employer.frk_Regiones){

                const auxEmployer = {...this.state.employer};
                
                auxEmployer.frk_Ciudades = e;

                this.initComunaSelected = e;

                //console.log(this.initComunaSelected);

                this.setState({employer: auxEmployer});
            //}
        }
    }

    onChangeSectorComercial = (e) => {
        if(this.state.employer){

            const auxEmployer = {...this.state.employer};
            
            auxEmployer.frk_SectorComercial = e;

            this.initSectorComercialSelected = e;

            this.setState({employer: auxEmployer});
            
        }
    }

    onChangeCantidadTrabajadore = (e) => {
        if(this.state.employer){

            const auxEmployer = {...this.state.employer};
            
            auxEmployer.frk_CantididadTrabajadores = e;

            this.initCantidadTrabajadoresSelected = e;

            this.setState({employer: auxEmployer});
            
        }
    }

    onChangeTipoEmpleador = (e) => {
        if(this.state.employer){

            const auxEmployer = {...this.state.employer};
            
            auxEmployer.frk_TipoEmpresa = e;

            this.intiTipoEmpleadorSelected = e;

            this.setState({employer: auxEmployer});
            
        }
    }

    redirectToLogin = (e) => {
        e.preventDefault();
        this.props.history.push('/login/empleador');
    }

    render(){

        let titleForm = "Empleador...";
        
        const formPeopleEmployerJsx =
        <>
            <Formik
                //enableReinitialize={true}
                
                initialValues={{ 
                    pais:  this.initPaisSelected, 
                    region: this.initRegionSelected, 
                    comuna: this.initComunaSelected, 
                    city: this.state.employer ? this.state.employer.ciudad : '',
                    firtsName: this.state.employer ? this.state.employer.nombrePersona : '', 
                    lastName: this.state.employer ? this.state.employer.apellidoPersona : '', 
                    birthDate: this.state.employer ? ConvertFormatDateToBrowser(this.state.employer.fechaNacimiento) : '', 
                    rut: this.state.employer ? this.state.employer.rut : '', 
                    street: this.state.employer ? this.state.employer.direccion : '', 
                    postalCode: this.state.employer ? this.state.employer.codigoPostal : '', 
                    telephone: this.state.employer ? this.state.employer.telefono : '', 
                    mobil: this.state.employer ? this.state.employer.celular : '' 
                }}
                validate={ (values) => {
                    let errors = {};
                    
                    if (!values.firtsName) {
                        errors.firtsName = 'Campo Nombre es requerido.';
                        
                    }

                    if (!values.lastName) {
                        errors.lastName = 'Campo Apellido es requerido.';
                    }

                    let date = new Date();
                    //date.setDate( date.getDate() - 0 );
                    date.setFullYear( date.getFullYear() - 18 );
                    //console.log(date.getMonth()  + '/' + date.getDate()+ '/' + date.getFullYear());

                    let auxDateBirthDate = FormatDateFromInput(values.birthDate);
                    //console.log(values.birthDate)
                    //console.log((auxDateBirthDate.getMonth() + 1) + '/' + auxDateBirthDate.getDate()+ '/' + auxDateBirthDate.getFullYear());
                    //console.log(FormatDateFromInput(values.birthDate));
                    if (!values.birthDate) {
                        errors.birthDate = 'Campo Fecha de Nacimiento es requerido.';
                    }else if(auxDateBirthDate >= date){
                        errors.birthDate = 'Debe ser mayor de edad.';
                    }

                    if (!values.rut) {
                        errors.rut = 'Campo RUT/DNI es requerido';
                    }else if(this.isChile && !validateRut(values.rut)){
                        errors.rut = 'Debe ser un RUT valido.';
                        
                    }else{
                        if(this.isChile){
                            values.rut = formatRut(values.rut);
                        }
                    }

                    if (!values.street) {
                        errors.street = 'Campo Dirección es requerido.';
                    }

                    if (!values.postalCode) {
                        errors.postalCode = 'Campo Código Postal es requerido.';
                    }

                    if (!values.telephone && !values.mobil) {
                        errors.telephone = 'Debe proporcianar un teléfono ó celular.';
                        errors.mobil = 'Debe proporcianar un teléfono ó celular.';
                    }

                    values.pais = this.initPaisSelected;
                    values.region = this.initRegionSelected;
                    values.comuna = this.initComunaSelected;
                    
                    if(!values.pais){
                        errors.pais = 'Debe seleccionar el pais.';
                    }

                    if(this.changedOpcionesRegion && this.isChile){
                        this.changedOpcionesRegion = false;
                        values.region = null;
                    }

                    if(!values.region && this.isChile){
                        errors.region = 'Debe seleccionar la región.';
                    }

                    if(this.changedOpcionesComuna && this.isChile){
                        
                        this.changedOpcionesComuna = false;
                        values.comuna = null;
                    }

                    if(!values.comuna && this.isChile){
                        errors.comuna = 'Debe seleccionar la comuna.';
                    }

                    

                    if(!values.city && !this.isChile){
                        errors.city = 'Campo Ciudad es requerido.';
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
                    
                    //console.log("Error: values.region: " + values.region);

                    /*const auxEmployer = {...this.state.employer};
                
                    auxEmployer.ciudad = values.city;
                    auxEmployer.nombrePersona = values.firtsName;
                    auxEmployer.apellidoPersona = values.lastName;
                    const auxFechaNacimiento = FormatDateFromInput(values.birthDate);
                    if(auxFechaNacimiento){
                        //auxEmployer.fechaNacimiento = auxFechaNacimiento; 
                    }
                    
                    auxEmployer.rut = values.rut;
                    auxEmployer.direccion  = values.street;
                    auxEmployer.codigoPostal  = values.postalCode;
                    auxEmployer.telefono = values.telephone; 
                    auxEmployer.telefono = values.mobil; 
    
                    this.setState({employer: auxEmployer});*/

                    return errors;
                }}
                
                onSubmit={(values, { setSubmitting }) => {
                    this.setSubmitting = setSubmitting;
                    this.setSubmitting(true);

                    this.notify("Actualizando datos...");

                    this.setState({isValidatingForm:false});
                    //console.log(values);

                    if(values.pais){
                        values.frk_Paises = {
                            id : values.pais !== null ? values.pais.value : null,
                            collectionName: "maestroPaises"
                        };
                    }
                    
                    if(values.region){
                        //console.log("values.region: " + values.region);
                        values.frk_Regiones = {
                            id : values.region !== null ? values.region.value : null,
                            collectionName: "maestroRegiones"
                        };          
                    }
                    
                    if(values.comuna){
                        values.frk_Ciudades = {
                            id : values.comuna !== null ? values.comuna.value : null,
                            collectionName: "maestroComunas"
                        };
                    }
                    
                    //console.log(this.state.aspnetUser);
                    values.employerId = this.state.employer.id;
                    values.aspnetUserId = this.state.aspnetUser.id;
                    values.bPersonaJuridica = this.state.isCompany === 1 ? false : true;
                    values.fechaNacimiento = FormatDateFromInput(values.birthDate);

                    this.props.updateEmployer(values);
                   
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
                                <FormGroup>
                                    <Label htmlFor="firtsName">Nombre<i className="text-danger">★</i></Label>
                                    <Input type="text" id="firtsName" 
                                        name="firtsName"
                                        
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.firtsName}
                                        placeholder="Ingrese su nombre..."
                                        valid={values.firtsName !== '' && touched.firtsName}
                                        invalid={errors.firtsName !== undefined  && touched.firtsName} ></Input>
                                    <FormFeedback className="help-block">{errors.firtsName && touched.firtsName && errors.firtsName}</FormFeedback>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12">
                                <FormGroup>
                                    <Label htmlFor="lastName">Apellido<i className="text-danger">★</i></Label>
                                    <Input type="text" id="lastName" 
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.lastName}
                                        placeholder="Ingrese su apellido..."
                                        valid={values.lastName !== '' && touched.lastName }
                                        invalid={errors.lastName !== undefined && touched.lastName } ></Input>
                                    <FormFeedback className="help-block">{errors.lastName && touched.lastName && errors.lastName}</FormFeedback>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12">
                                <FormGroup>
                                    <Label htmlFor="birthDate">Fecha de Nacimiento<i className="text-danger">★</i></Label>
                                    <Input type="date" id="birthDate" 
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.birthDate}
                                        placeholder="Ingrese su fecha de nacimiento..."
                                        valid={values.birthDate !== '' && touched.birthDate}
                                        invalid={errors.birthDate !== undefined && touched.birthDate} ></Input>
                                    <FormFeedback className="help-block">{errors.birthDate && touched.birthDate && errors.birthDate}</FormFeedback>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12">
                                <FormGroup>
                                    <Label htmlFor="rut">Rut<i className="text-danger">★</i></Label>
                                    <Input type="text" id="rut" 
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.rut}
                                        placeholder="Ingrese su Rut..."
                                        valid={values.rut !== '' && touched.rut }
                                        invalid={errors.rut !== undefined && touched.rut } ></Input>
                                    <FormFeedback className="help-block">{errors.rut && touched.rut && errors.rut}</FormFeedback>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12" lg="4">
                                <FormGroup>
                                    <Label htmlFor="selectPais">País<i className="text-danger">★</i></Label>
                                    <CustomSelect
                                        id={"selectPais"}
                                        placeholder={'Seleccione el país...'}
                                        nameAttr={'pais'}
                                        onChange={(e,a) => {
                                            this.onChangePais(a);
                                            return setFieldValue(e,a);
                                        }}
                                        onMenuOpen={this.onMenuOpenPais}
                                        onBlur={setFieldTouched}
                                        value={this.initPaisSelected ? this.initPaisSelected : values.pais}
                                        isLoading={this.state.isLoadingPaises}
                                        options={this.state.opcionesPaises}
                                        errors={errors.pais}
                                        touched={touched.pais}
                                        invalid={errors.pais !== undefined && touched.pais }
                                    ></CustomSelect>
                                </FormGroup>
                            </Col>
                            <Col xs="12" lg="4" className={!this.isChile ? "d-none" : ""}>
                                <FormGroup>
                                    <Label htmlFor="selectRegion">Región<i className="text-danger">★</i></Label>
                                    <CustomSelect
                                        id={"selectRegion"}
                                        placeholder={'Seleccione la región...'}
                                        nameAttr={'region'}
                                        onChange={(e,a) => {
                                            this.onChangeRegion(a);
                                            return setFieldValue(e,a);
                                        }}
                                        onBlur={setFieldTouched}
                                        value={this.initRegionSelected ? this.initRegionSelected : values.region}
                                       
                                        options={this.state.opcionesRegiones}
                                        errors={errors.region}
                                        touched={touched.region}
                                        invalid={errors.region !== undefined && touched.region }
                                    ></CustomSelect>
                                </FormGroup>
                            </Col>
                            <Col  xs="12" lg="4" className={!this.isChile ? "d-none" : ""}>
                                <FormGroup>
                                    <Label htmlFor="selectComuna">Comuna<i className="text-danger">★</i></Label>
                                    <CustomSelect
                                        id={"selectComuna"}
                                        placeholder={'Seleccione la comuna...'}
                                        nameAttr={'comuna'}
                                        onChange={(e,a) => {
                                            this.onChangeComuna(a);
                                            return setFieldValue(e,a);
                                        }}
                                        onBlur={setFieldTouched}
                                        value={this.initComunaSelected ? this.initComunaSelected : values.comuna}
                                        options={this.state.opcionesComunas}
                                        errors={errors.comuna}
                                        touched={touched.comuna}
                                        invalid={errors.comuna !== undefined && touched.comuna }
                                    ></CustomSelect>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row className={this.isChile ? "d-none" : ""}>
                            <Col xs="12">
                                <FormGroup>
                                    <Label htmlFor="city">Ciudad<i className="text-danger">★</i></Label>
                                    <Input type="text" id="city" 
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.city}
                                        placeholder="Ingrese la ciudad..."
                                        valid={values.city !== '' && touched.city }
                                        invalid={errors.city !== undefined && touched.city } ></Input>
                                    <FormFeedback className="help-block">{errors.city && touched.city && errors.city}</FormFeedback>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12">
                                <FormGroup>
                                    <Label htmlFor="street">Dirección<i className="text-danger">★</i></Label>
                                    <Input type="text" id="street" 
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.street}
                                        placeholder="Ingrese su dirección..."
                                        valid={values.street !== '' && touched.street }
                                        invalid={errors.street !== undefined && touched.street } ></Input>
                                    <FormFeedback className="help-block">{errors.street && touched.street && errors.street}</FormFeedback>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12">
                                <FormGroup>
                                    <Label htmlFor="postalCode">Código Postal<i className="text-danger">★</i></Label>
                                    <Input type="text" id="postalCode" 
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.postalCode}
                                        placeholder="Ingrese su código postal..."
                                        valid={values.postalCode !== '' && touched.postalCode }
                                        invalid={errors.postalCode !== undefined && touched.postalCode } ></Input>
                                    <FormFeedback className="help-block">{errors.postalCode && touched.postalCode && errors.postalCode}</FormFeedback>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12">
                                <FormGroup>
                                    <Label htmlFor="telephone">Teléfono</Label>
                                    <Input type="text" id="telephone" 
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.telephone}
                                        placeholder="Ingrese su teléfono..."
                                        valid={values.telephone !== '' && touched.telephone }
                                        invalid={errors.telephone !== undefined && touched.telephone } ></Input>
                                    <FormFeedback className="help-block">{errors.telephone && touched.telephone && errors.telephone}</FormFeedback>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12">
                                <FormGroup>
                                    <Label htmlFor="mobil">Celular<i className="text-danger">★</i></Label>
                                    <Input type="text" id="mobil" 
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.mobil}
                                        placeholder="Ingrese su celular..."
                                        valid={values.mobil !== '' && touched.mobil }
                                        invalid={errors.mobil !== undefined && touched.mobil } ></Input>
                                    <FormFeedback className="help-block">{errors.mobil && touched.mobil && errors.mobil}</FormFeedback>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12">
                                <Button block color="success" type="submit" disabled={isSubmitting} onClick={this.validateForm} >Actualizar Datos</Button>
                            </Col>
                        </Row>
                    </FormFormik>
                    );
                }}
                </Formik>
            
        </>

        //console.log(this.initPaisSelected);

        const formCompanyEmployerJsx = 
        <>
            <Formik
                // enableReinitialize={true}
                initialValues={{  
                    nombreComercialEmpresa: this.state.employer ? this.state.employer.nombreComercialEmpresa : '',
                    razonSocial: this.state.employer ? this.state.employer.razonSocial : '',
                    rut: this.state.employer ? this.state.employer.rut : '', 
                    sectorComercial: this.initSectorComercialSelected,
                    cantidadTrabajadores: this.initCantidadTrabajadoresSelected,
                    tipoEmpleador: this.intiTipoEmpleadorSelected,
                    cargos: this.initCargoSelected,
                    pais: this.initPaisSelected, 
                    region: this.initRegionSelected, 
                    comuna: this.initComunaSelected, 
                    city: this.state.employer ? this.state.employer.ciudad : '',
                    firtsName: this.state.employer ? this.state.employer.nombrePersona : '', 
                    lastName: this.state.employer ? this.state.employer.apellidoPersona : '', 
                    indicarOtroCargo: this.state.employer ? this.state.employer.otroCargo : '',
                    birthDate: this.state.employer ? ConvertFormatDateToBrowser(this.state.employer.fechaNacimiento) : '', 
                    descripcionEmpresa: this.state.employer ? this.state.employer.descripcionEmpresa : '',
                    urlEmpresa: this.state.employer ? this.state.employer.urlEmpresa : '',
                    fileLogo: null,
                    street: this.state.employer ? this.state.employer.direccion : '', 
                    postalCode: this.state.employer ? this.state.employer.codigoPostal : '', 
                    telephone: this.state.employer ? this.state.employer.telefono : '', 
                    mobil: this.state.employer ? this.state.employer.celular : '' 
                }}
                validate={ (values) => {
                    let errors = {};
                    
                    //console.log(values.nombreComercialEmpresa)

                    if (!values.nombreComercialEmpresa) {
                        errors.nombreComercialEmpresa = 'Campo Nombre Comercial es requerido.';
                    }

                    if (!values.razonSocial) {
                        errors.razonSocial = 'Campo Razón Social (SII) es requerido.';
                    }

                    if (!values.rut) {
                        errors.rut = 'Campo RUT es requerido';
                    }else if(this.isChile && !validateRut(values.rut)){
                        errors.rut = 'Debe ser un RUT valido de empresa.';
                        
                    }else{
                        if(this.isChile){
                            values.rut = formatRut(values.rut);
                        }
                    }
                    
                    values.sectorComercial = this.initSectorComercialSelected;

                    if(!values.sectorComercial || values.sectorComercial.length === 0){
                        errors.sectorComercial = 'Debe seleccionar Sector Comercial.';
                    }

                    values.cantidadTrabajadores = this.initCantidadTrabajadoresSelected;

                    if(!values.cantidadTrabajadores || values.cantidadTrabajadores.length === 0){
                        errors.cantidadTrabajadores = 'Debe seleccionar Cantidad de Trabajadores.';
                    }

                    values.tipoEmpleador = this.intiTipoEmpleadorSelected;

                    if(!values.tipoEmpleador || values.tipoEmpleador.length === 0){
                        errors.tipoEmpleador = 'Debe seleccionar Tipo de Empleador.';
                    }
                    
                    if (!values.descripcionEmpresa) {
                        errors.descripcionEmpresa = 'Campo Descripción Empresa es requerido.';
                        
                    }

                    if (values.urlEmpresa && !(validateUrl(values.urlEmpresa))) {
                        errors.urlEmpresa = 'Debe ser un URL válido.';
                        
                    }

                    if (values.fileLogo && values.fileLogo.name !== undefined) {
                        //console.log(values.fileLogo);
                        const partNameFile =  values.fileLogo.name.split('.');
                        const lastPartNameFile = partNameFile[partNameFile.length - 1];

                        if(!(
                            lastPartNameFile.includes('png') ||
                            lastPartNameFile.includes('jpg') ||
                            lastPartNameFile.includes('jpeg') ||
                            lastPartNameFile.includes('bmp')
                        )){
                            errors.fileLogo = 'El logo debe ser en formato jpg, bmp, o png.';
                        }else if((values.fileLogo.size / (1024 ** 2)) > 1.00){
                            errors.fileLogo = 'El peso del logo debe ser inferior a 1MB.';
                        }else{
                            values.fileLogo = this.state.logoFile;
                        }

                    }

                    if (!values.firtsName) {
                        errors.firtsName = 'Campo Nombre es requerido.';
                    }

                    if (!values.lastName) {
                        errors.lastName = 'Campo Apellido es requerido.';
                    }
                    
                    values.cargos = this.initCargoSelected;

                    if(!values.cargos || values.cargos.length === 0){
                        errors.cargos = 'Debe seleccionar Cargo.';
                    }
                    
                    if(this.isCargoOtro && !values.indicarOtroCargo){
                        errors.indicarOtroCargo = 'Debe indicar su Cargo.';
                    }

                    if (!values.street) {
                        errors.street = 'Campo Dirección es requerido.';
                    }

                    /*if (!values.postalCode) {
                        errors.postalCode = 'Campo Código Postal es requerido.';
                    }*/

                    if (!values.telephone && !values.mobil) {
                        errors.telephone = 'Debe proporcianar un teléfono ó celular.';
                        errors.mobil = 'Debe proporcianar un teléfono ó celular.';
                    }

                    values.pais = this.initPaisSelected;
                    values.region = this.initRegionSelected;
                    values.comuna = this.initComunaSelected;
                    
                    //console.log(values.pais);
                    if(!values.pais || values.pais.length === 0){
                        errors.pais = 'Debe seleccionar el País.';
                    }

                    if(this.changedOpcionesRegion && this.isChile){
                        this.changedOpcionesRegion = false;
                        values.region = null;
                    }

                    if((!values.region || values.region.length === 0) && this.isChile){
                        errors.region = 'Debe seleccionar la Región.';
                    }

                    if(this.changedOpcionesComuna && this.isChile){
                        
                        this.changedOpcionesComuna = false;
                        values.comuna = null;
                    }

                    if((!values.comuna || values.comuna.length === 0) && this.isChile){
                        errors.comuna = 'Debe seleccionar la Comuna.';
                    }

                    if(!values.city && !this.isChile){
                        errors.city = 'Campo Ciudad es requerido.';
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
                
                onSubmit={(values, { setSubmitting }) => {
                    this.setState({isValidatingForm:false});

                    this.setSubmitting = setSubmitting;
                    //this.setSubmitting(true);

                    this.notify("Actualizando datos...");


                    values.frk_Paises = {
                        id : values.pais ? values.pais.value : null,
                        collectionName: "maestroPaises"
                    };

                    values.frk_Regiones = {
                        id : values.region ? values.region.value : null,
                        collectionName: "maestroRegiones"
                    };

                    values.frk_Ciudades = {
                        id : values.comuna ? values.comuna.value : null,
                        collectionName: "maestroComunas"
                    };

                    values.frk_SectorComercial = {
                        id : values.sectorComercial ? values.sectorComercial.value : null,
                        collectionName: "maestroSectoresComerciales"
                    };

                    values.frk_CantididadTrabajadores = {
                        id : values.cantidadTrabajadores ? values.cantidadTrabajadores.value : null,
                        collectionName: "maestroRangosNumericos"
                    };

                    values.frk_TipoEmpresa = {
                        id : values.tipoEmpleador ? values.tipoEmpleador.value : null,
                        collectionName: "maestroTiposEmpleadores"
                    };

                    values.frk_Cargo = {
                        id : values.cargos ? values.cargos.value : null,
                        collectionName: "maestroCargos"
                    };

                    //console.log(values.fileLogo);
                    if (values.fileLogo && values.fileLogo.name !== undefined) {
                        values.rutaLogo = values.fileLogo.name;
                        //console.log(values.rutaLogo);
                    }
                   
                    values.bPersonaJuridica = this.state.isCompany === 2 ? true : false;
                    values.fechaNacimiento = FormatDateFromInput(values.birthDate);

                    this.props.updateEmployer(values);

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
                                <FormGroup>
                                    <Label htmlFor="nombreComercialEmpresa">Nombre Comercial<i className="text-danger">★</i></Label>
                                    <Input type="text" id="nombreComercialEmpresa" 
                                        name="nombreComercialEmpresa"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.nombreComercialEmpresa || ''}
                                        placeholder="Ingrese Nombre Comercial de la empresa..."
                                        valid={values.nombreComercialEmpresa !== '' && touched.nombreComercialEmpresa}
                                        invalid={errors.nombreComercialEmpresa !== undefined  && touched.nombreComercialEmpresa} ></Input>
                                    <FormFeedback className="help-block">{errors.nombreComercialEmpresa && touched.nombreComercialEmpresa && errors.nombreComercialEmpresa}</FormFeedback>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12">
                                <FormGroup>
                                    <Label htmlFor="razonSocial">Razón Social<i className="text-danger">★</i></Label>
                                    <Input type="text" id="razonSocial" 
                                        name="razonSocial"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.razonSocial || ''}
                                        placeholder="Ingrese Razón Social de la empresa..."
                                        valid={values.razonSocial !== '' && touched.razonSocial}
                                        invalid={errors.razonSocial !== undefined  && touched.razonSocial} ></Input>
                                    <FormFeedback className="help-block">{errors.razonSocial && touched.razonSocial && errors.razonSocial}</FormFeedback>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12" lg="4">
                                <FormGroup>
                                    <Label htmlFor="selectSectorComercial">Sector Comercial<i className="text-danger">★</i></Label>
                                    <CustomSelect
                                        id={"selectSectorComercial"}
                                        placeholder={'Seleccione...'}
                                        nameAttr={'sectorComercial'}
                                        onChange={(e,a) => {
                                            this.onChangeSectorComercial(a);
                                            return setFieldValue(e,a);
                                        }}
                                        
                                        onBlur={setFieldTouched}
                                        value={this.initSectorComercialSelected ? this.initSectorComercialSelected : values.sectorComercial}
                                        isLoading={this.state.isLoadingSectorComercial}
                                        options={this.state.opcionesSectorComercial}
                                        errors={errors.sectorComercial}
                                        touched={touched.sectorComercial}
                                        invalid={errors.sectorComercial !== undefined  && touched.sectorComercial} 
                                    ></CustomSelect>
                                </FormGroup>
                            </Col>
                            <Col xs="12" lg="4">
                                <FormGroup>
                                    <Label htmlFor="selectCantidadTrabajadores">Trabajadores<i className="text-danger">★</i></Label>
                                    <CustomSelect
                                        id={"selectCantidadTrabajadores"}
                                        placeholder={'Seleccione...'}
                                        nameAttr={'cantidadTrabajadores'}
                                        onChange={(e,a) => {
                                            this.onChangeCantidadTrabajadore(a);
                                            return setFieldValue(e,a);
                                        }}
                                        onBlur={setFieldTouched}
                                        value={ this.initCantidadTrabajadoresSelected ? this.initCantidadTrabajadoresSelected : values.cantidadTrabajadores}
                                        isLoading={this.state.isLoadingCantidadTrabajadores}
                                        options={this.state.opcionesCantidadTrabajadores}
                                        errors={errors.cantidadTrabajadores}
                                        touched={touched.cantidadTrabajadores}
                                        invalid={errors.cantidadTrabajadores !== undefined  && touched.cantidadTrabajadores} 
                                    ></CustomSelect>
                                </FormGroup>
                            </Col>
                            <Col  xs="12" lg="4">
                                <FormGroup>
                                    <Label htmlFor="selectTipoEmpleador">Tipo de Empleador<i className="text-danger">★</i></Label>
                                    <CustomSelect
                                        id={"selectTipoEmpleador"}
                                        placeholder={'Seleccione...'}
                                        nameAttr={'tipoEmpleador'}
                                        onChange={(e,a) => {
                                            this.onChangeTipoEmpleador(a);
                                            return setFieldValue(e,a);
                                        }}
                                        onBlur={setFieldTouched}
                                        value={this.intiTipoEmpleadorSelected ? this.intiTipoEmpleadorSelected : values.tipoEmpleador}
                                        isLoading={this.state.isLoadingTipoEmpleador}
                                        options={this.state.opcionesTipoEmpleador}
                                        errors={errors.tipoEmpleador}
                                        touched={touched.tipoEmpleador}
                                        invalid={errors.tipoEmpleador !== undefined  && touched.tipoEmpleador} 
                                    ></CustomSelect>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12">
                                <FormGroup>
                                    <Label htmlFor="rut">Rut<i className="text-danger">★</i></Label>
                                    <Input type="text" id="rut" 
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.rut}
                                        placeholder="Ingrese Rut de la empresa..."
                                        valid={values.rut !== '' && touched.rut }
                                        invalid={errors.rut !== undefined && touched.rut } ></Input>
                                    <FormFeedback className="help-block">{errors.rut && touched.rut && errors.rut}</FormFeedback>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12">
                                <FormGroup>
                                    <Label htmlFor="birthDate">Fecha Creación Empresa</Label>
                                    <Input type="date" id="birthDate" 
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.birthDate}
                                        placeholder="Ingrese fecha creación de la empresa..."
                                        valid={values.birthDate !== '' && touched.birthDate}
                                        invalid={errors.birthDate !== undefined && touched.birthDate} ></Input>
                                    <FormFeedback className="help-block">{errors.birthDate && touched.birthDate && errors.birthDate}</FormFeedback>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12">
                                <FormGroup>
                                    <Label htmlFor="descripcionEmpresa">Descripción de la empresa<i className="text-danger">★</i></Label>
                                    <Input type="textarea" id="descripcionEmpresa" 
                                        rows="9"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.descripcionEmpresa || ''}
                                        placeholder="Describa la empresa en algunas lineas..."
                                        valid={values.descripcionEmpresa !== '' && touched.descripcionEmpresa }
                                        invalid={errors.descripcionEmpresa !== undefined && touched.descripcionEmpresa } ></Input>
                                    <FormFeedback className="help-block">{errors.descripcionEmpresa && touched.descripcionEmpresa && errors.descripcionEmpresa}</FormFeedback>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12">
                                <FormGroup>
                                    <Label htmlFor="urlEmpresa">Sitio WEB de la Empresa</Label>
                                    <Input type="url" id="urlEmpresa" 
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.urlEmpresa || ''}
                                        placeholder="http://www.sitioweb.cl"
                                        valid={values.urlEmpresa !== '' && touched.urlEmpresa }
                                        invalid={errors.urlEmpresa !== undefined && touched.urlEmpresa } ></Input>
                                    <FormFeedback className="help-block">{errors.urlEmpresa && touched.urlEmpresa && errors.urlEmpresa}</FormFeedback>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg="8">
                                <FormGroup>
                                    <Label htmlFor="fileLogo">Logo de la Empresa <small>(Peso máximo de 1 MB)</small></Label>
                                    
                                    <div className="custom-file" id="customFile">
                                        <input type="file" id="fileLogo" className="custom-file-input" aria-describedby="fileHelp"
                                            accept="image/*"
                                            onChange={(e) => {
                                                this.setState({logoFile:  e.currentTarget.files.length <= 0 ? null: e.currentTarget.files[0]});
                                                return setFieldValue("fileLogo", e.currentTarget.files.length <= 0 ? null: e.currentTarget.files[0]);
                                            
                                            }} 
                                            onBlur={handleBlur}
                                            placeholder="Seleccione el logo de su empresa...">
                                        </input>
                                        <label className="custom-file-label" htmlFor="fileLogo">
                                            { (this.state.logoFile !== null && this.state.logoFile.name !== undefined) ?  this.state.logoFile.name : "Seleccionar Archivo"}
                                        </label>
                                    </div>
                                    <div className="text-danger small">{errors.fileLogo && touched.fileLogo && errors.fileLogo}</div>
                                    
                                    <div className={ this.state.logoFile === null ? "d-none" : "mt-2"}>
                                        <button type="button" className="btn btn-info" onClick={this.onChangeQuitarLogo}>Quitar logo</button>
                                    </div>

                                    
                                </FormGroup>
                            </Col>
                            <Col lg="4">
                                <Thumb file={this.state.logoFile} />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12" lg="4">
                                <FormGroup>
                                    <Label htmlFor="selectPais">País<i className="text-danger">★</i></Label>
                                    <CustomSelect
                                        id={"selectPais"}
                                        placeholder={'Seleccione el país...'}
                                        nameAttr={'pais'}
                                        onChange={(e,a) => {
                                            this.onChangePais(a);
                                            return setFieldValue(e,a);
                                        }}
                                        onMenuOpen={this.onMenuOpenPais}
                                        onBlur={setFieldTouched}
                                        value={this.initPaisSelected ? this.initPaisSelected : values.pais}
                                        isLoading={this.state.isLoadingPaises}
                                        options={this.state.opcionesPaises}
                                        errors={errors.pais}
                                        touched={touched.pais}
                                        invalid={errors.pais !== undefined  && touched.pais} 
                                    ></CustomSelect>
                                </FormGroup>
                            </Col>
                            <Col xs="12" lg="4" className={!this.isChile ? "d-none" : ""}>
                                <FormGroup>
                                    <Label htmlFor="selectRegion">Región<i className="text-danger">★</i></Label>
                                    <CustomSelect
                                        id={"selectRegion"}
                                        placeholder={'Seleccione la región...'}
                                        nameAttr={'region'}
                                        onChange={(e,a) => {
                                            this.onChangeRegion(a);
                                            return setFieldValue(e,a);
                                        }}
                                        onBlur={setFieldTouched}
                                        value={this.initRegionSelected ? this.initRegionSelected : values.region}
                                        isLoading={this.state.isLoadingRegiones}
                                        options={this.state.opcionesRegiones}
                                        errors={errors.region}
                                        touched={touched.region}
                                        invalid={errors.region !== undefined  && touched.region}
                                    ></CustomSelect>
                                </FormGroup>
                            </Col>
                            <Col  xs="12" lg="4" className={!this.isChile ? "d-none" : ""}>
                                <FormGroup>
                                    <Label htmlFor="selectComuna">Comuna<i className="text-danger">★</i></Label>
                                    <CustomSelect
                                        id={"selectComuna"}
                                        placeholder={'Seleccione la comuna...'}
                                        nameAttr={'comuna'}
                                        onChange={(e,a) => {
                                            this.onChangeComuna(a);
                                            return setFieldValue(e,a);
                                        }}
                                        onBlur={setFieldTouched}
                                        value={this.initComunaSelected ? this.initComunaSelected : values.comuna}
                                        isLoading={this.state.isLoadingComunas}
                                        options={this.state.opcionesComunas}
                                        errors={errors.comuna}
                                        touched={touched.comuna}
                                        invalid={errors.comuna !== undefined  && touched.comuna}
                                    ></CustomSelect>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row className={this.isChile ? "d-none" : ""}>
                            <Col xs="12">
                                <FormGroup>
                                    <Label htmlFor="city">Ciudad<i className="text-danger">★</i></Label>
                                    <Input type="text" id="city" 
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.city}
                                        placeholder="Ingrese la ciudad..."
                                        valid={values.city !== '' && touched.city }
                                        invalid={errors.city !== undefined && touched.city } ></Input>
                                    <FormFeedback className="help-block">{errors.city && touched.city && errors.city}</FormFeedback>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12">
                                <FormGroup>
                                    <Label htmlFor="street">Dirección<i className="text-danger">★</i></Label>
                                    <Input type="text" id="street" 
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.street}
                                        placeholder="Ingrese su dirección..."
                                        valid={values.street !== '' && touched.street }
                                        invalid={errors.street !== undefined && touched.street } ></Input>
                                    <FormFeedback className="help-block">{errors.street && touched.street && errors.street}</FormFeedback>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12">
                                <FormGroup>
                                    <Label htmlFor="postalCode">Código Postal</Label>
                                    <Input type="text" id="postalCode" 
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.postalCode}
                                        placeholder="Ingrese su código postal..."
                                        valid={values.postalCode !== '' && touched.postalCode }
                                        invalid={errors.postalCode !== undefined && touched.postalCode } ></Input>
                                    <FormFeedback className="help-block">{errors.postalCode && touched.postalCode && errors.postalCode}</FormFeedback>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12">
                                <div className="p-3 mb-2 bg-light text-black border border-info rounded">
                                    <span>Persona de Contacto</span>
                                </div>
                            </Col>
                        
                        </Row>

                        <Row>
                            <Col xs="12">
                                <FormGroup>
                                    <Label htmlFor="firtsName">Nombre<i className="text-danger">★</i></Label>
                                    <Input type="text" id="firtsName" 
                                        name="firtsName"
                                        
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.firtsName}
                                        placeholder="Ingrese su nombre..."
                                        valid={values.firtsName !== '' && touched.firtsName}
                                        invalid={errors.firtsName !== undefined  && touched.firtsName} ></Input>
                                    <FormFeedback className="help-block">{errors.firtsName && touched.firtsName && errors.firtsName}</FormFeedback>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12">
                                <FormGroup>
                                    <Label htmlFor="lastName">Apellido<i className="text-danger">★</i></Label>
                                    <Input type="text" id="lastName" 
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.lastName}
                                        placeholder="Ingrese su apellido..."
                                        valid={values.lastName !== '' && touched.lastName }
                                        invalid={errors.lastName !== undefined && touched.lastName } ></Input>
                                    <FormFeedback className="help-block">{errors.lastName && touched.lastName && errors.lastName}</FormFeedback>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12">
                                <FormGroup>
                                    <Label htmlFor="cargos">Cargo<i className="text-danger">★</i></Label>
                                    <CustomSelect
                                        id={"cargos"}
                                        placeholder={'Seleccione...'}
                                        nameAttr={'cargos'}
                                        onChange={(e,a) => {
                                            this.onChangeCargo(a);
                                            return setFieldValue(e,a);
                                        }}
                                        
                                        onBlur={setFieldTouched}
                                        value={this.initCargoSelected ? this.initCargoSelected : values.cargos}
                                        isLoading={this.state.isLoadingCargos}
                                        options={this.state.opcionesCargos}
                                        errors={errors.cargos}
                                        touched={touched.cargos}
                                        invalid={errors.cargos !== undefined && touched.cargos } 
                                    ></CustomSelect>
                                </FormGroup>
                            </Col>
                            
                        </Row>

                        <Row className={!this.isCargoOtro ? "d-none" : ""}>
                            <Col xs="12">
                                <FormGroup>
                                    <Label htmlFor="indicarOtroCargo">Indique su cargo<i className="text-danger">★</i></Label>
                                    
                                    <Input type="text" id="indicarOtroCargo" 
                                      
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.indicarOtroCargo || ''}
                                        placeholder="Ingrese Nombre Comercial de la empresa..."
                                        valid={values.indicarOtroCargo !== '' && touched.indicarOtroCargo}
                                        invalid={errors.indicarOtroCargo !== undefined  && touched.indicarOtroCargo} ></Input>

                                    <FormFeedback className="help-block">{errors.indicarOtroCargo && touched.indicarOtroCargo && errors.indicarOtroCargo}</FormFeedback>
                                </FormGroup>
                            </Col>
                        </Row>
                        
                        
                        <Row>
                            <Col xs="12">
                                <FormGroup>
                                    <Label htmlFor="telephone">Teléfono</Label>
                                    <Input type="text" id="telephone" 
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.telephone}
                                        placeholder="Ingrese su teléfono..."
                                        valid={values.telephone !== '' && touched.telephone }
                                        invalid={errors.telephone !== undefined && touched.telephone } ></Input>
                                    <FormFeedback className="help-block">{errors.telephone && touched.telephone && errors.telephone}</FormFeedback>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12">
                                <FormGroup>
                                    <Label htmlFor="mobil">Celular<i className="text-danger">★</i></Label>
                                    <Input type="text" id="mobil" 
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.mobil}
                                        placeholder="Ingrese su celular..."
                                        valid={values.mobil !== '' && touched.mobil }
                                        invalid={errors.mobil !== undefined && touched.mobil } ></Input>
                                    <FormFeedback className="help-block">{errors.mobil && touched.mobil && errors.mobil}</FormFeedback>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12">
                                <Button block color="success" type="submit" disabled={isSubmitting} onClick={this.validateForm} >
                                Actualizar Datos
                                </Button>
                            </Col>
                        </Row>
                    </FormFormik>
                    );
                }}
                </Formik>
            
        </>

        let formShowed = 
        <Row>
            <Col xs="12" className="text-center" >
                <strong>Buscando datos del perfil...</strong>
            </Col>
        </Row>;

        if(this.state.employer){
            if(this.state.isCompany === 1){
                formShowed = formPeopleEmployerJsx;
                titleForm = "Empleador Persona Natural";
            }else if(this.state.isCompany === 2){
                formShowed = formCompanyEmployerJsx;
                titleForm = "Empleador Empresa";
            }
        }

        return(
            <div className="animated fadeIn">
                <ToastContainer></ToastContainer>
                <Row className="justify-content-center">
                    <Col xs="12" md="8">
                        <Modal isOpen={this.state.modal} toggle={this.toggleModal} className={this.state.classNameModal + " " + this.props.className}>
                            <ModalHeader toggle={this.toggleModal}>{this.state.titleModal}</ModalHeader>
                            <ModalBody>
                                { this.state.contentModal }
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={this.toggleModal}>Entendido!</Button>{' '}
                            </ModalFooter>
                        </Modal>
                        <Card>
                            <CardHeader>
                                <strong>{ titleForm }</strong>
                                <small>&ensp;clic en el botón <strong className="text-success">Actualizar Datos</strong> para guardar cambios...</small>
                            </CardHeader>
                            <CardBody>
                                
                                { formShowed }
                                    
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>  
        );

    }

}


const mapStateToProps = state => ({
    getDataEmployer: state.userAuth.employer,
    employer: state.userAuth.employer,
    updateDataEmployer: state.userAuth.updateEmployer,
    countries: state.geographics.countries,
    regions: state.geographics.regions,
    communes: state.geographics.communes,
    commercialSectors: state.parameters.commercialSectors,
    numericalRanges: state.parameters.numericalRanges,
    typesEmployers: state.parameters.typesEmployers,
    positionsCompany: state.parameters.positionsCompany
})

export default connect(mapStateToProps, { 

    getEmployer,
    updateEmployer,
    getCountries,
    getRegions, 
    getCommunes,
    getCommercialSectors,
    getNumericalRanges,
    getTypesEmployers,
    getPositionsCompany
})(CompanyProfile);
