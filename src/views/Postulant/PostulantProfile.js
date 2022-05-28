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
import { AppSwitch } from '@coreui/react';
import Thumb from '../../components/UI/Thumb';
import Linq from 'linq'; 
import { isIterable, ConvertFormatDateToBrowser, FormatDateFromInput} from '../../utiles';
import '../../css/inputFile.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

// Site config
import { webConfig } from '../../GlobalConfig';
import { validate as validateRut, format as formatRut } from 'rut.js';
import { toBase64 } from '../../utiles';

// Redux
import { connect } from 'react-redux';
import { updatePostulant, getPostulant } from '../../actions/usersActions';
import { getCountries, getRegions, getCommunes } from '../../actions/geographicsActions';
import { opcionesGenero, opcionesEstadoCivil, opcionesTipoLicenciaConducir } from '../../data/parameters';


class PostulantProfile extends Component{

    constructor(props){
        super(props);

        this.isLoadedData = false;

        this.opcionesGenero = [...opcionesGenero.filter(item => {
            return true;//item.label !== 'Indistinto';
        })];

        this.opcionesEstadoCivil = [...opcionesEstadoCivil.sort((a, b) => (a.value > b.value) ? 1 : -1)];

        this.opcionesTipoLicenciaConducir = [...opcionesTipoLicenciaConducir];

        this.state = {

            postulant: null,

            isCompany: 0,
            opcionesPaises: [],
            opcionesRegiones: [],
            opcionesComunas: [],
           
            isValidatingForm: false,
            logoFile: null,
            modal: false,
            classNameModal: "",
            titleModal: "",
            contentModal: <div></div>,
            
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
        this.initGeneroSelected = null;
        this.initNacionalidadSelected = null;
        this.initEstodoCivilSelected = null;
        this.initLicenciaConducir = null;

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

        const { countries, regions, communes, 
            updateDataPostulant } = nextProps;
        
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
       
        if(this.props.postulant !== nextProps.postulant){
            
            //console.log(nextProps.postulant);

            if(!nextProps.postulant.error){

                this.setState({postulant: nextProps.postulant});

                this.initThisForm(nextProps.postulant);
            }
            //this.props.setDataEmployer(nextProps.getDataEmployer);
            //this.initThisForm(nextProps.employer);
        }

        if(this.props.updateDataPostulant !== updateDataPostulant){
            
            this.props.setDataPostulant(updateDataPostulant.updatedPostulant);
            this.setState({postulant:updateDataPostulant.updatedPostulant})

            this.dismissNotify();

            this.setSubmitting(false);
        }
    }

    shouldComponentUpdate(nextProps, nextState) {

        //console.log(nextProps);

        /* Paises */
        if(this.state.postulant && (this.state.opcionesPaises !== nextState.opcionesPaises) && this.state.postulant.frk_Paises){
            
            if(this.state.postulant.frk_Paises){
                var opcionPais = nextState.opcionesPaises.find(_ => _.value === this.state.postulant.frk_Paises.id); 
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

            if(this.state.postulant.frk_Nacionalidad){
                var opcionNacionalidad = nextState.opcionesPaises.find(_ => _.value === this.state.postulant.frk_Nacionalidad.id); 

                if(opcionNacionalidad){
                    this.initNacionalidadSelected = opcionNacionalidad;
                }
            }
        }

        if((this.state.postulant) && (this.state.postulant.frk_Regiones) && (this.state.opcionesRegiones !== nextState.opcionesRegiones) && (nextState.opcionesRegiones.length > 0)){
            /*console.log("####");
            console.log(this.state.opcionesRegiones);
            console.log(nextState.opcionesRegiones);
            console.log("@@@@");*/
            //console.log(this.state.employer);
            var opcionRegion= nextState.opcionesRegiones.find(_ => _.value === this.state.postulant.frk_Regiones.id); 
             
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


        if((this.state.postulant) && (this.state.postulant.frk_Ciudades) && (this.state.opcionesComunas !== nextState.opcionesComunas) && (nextState.opcionesComunas.length > 0)){
            //console.log(this.state.employer.frk_Ciudades);
            var opcionComuna =  nextState.opcionesComunas.find(_ => _.value === this.state.postulant.frk_Ciudades.id);
            
            this.initComunaSelected = opcionComuna;
            
            //return true;
        }

        if(this.state.postulant !== nextState.postulant){

            const postulant = nextState.postulant;

            this.initGeneroSelected = opcionesGenero.find(_ => _.value === postulant.idGenero);

            this.initEstodoCivilSelected = opcionesEstadoCivil.find(_ => _.value === postulant.frk_EstadosCiviles);

            if(postulant.licenciasConducir){
                this.initLicenciaConducir = [];
                postulant.licenciasConducir.forEach(item => {

                    var licencia = opcionesTipoLicenciaConducir.find(_ => _.value === item);

                    this.initLicenciaConducir.push(licencia);
                });
            }
            
            const urlLogo = `${webConfig.urlImagesNotCache}/${postulant.urlImagen}`;

            this.setState({
                logoFile: postulant.urlImagen ? urlLogo : null
            });
        }

        return true;
    }



    componentDidMount() {
        
        this.props.getPostulant();

    }

    initThisForm = (postulant) => {
        
        if(postulant){

            this.props.getCountries({ action: "LOAD COUNTRIES"});

            const urlLogo = `${webConfig.urlImagesNotCache}/${postulant.urlImagen}`;

            this.setState({
                logoFile: postulant.urlImagen ? urlLogo : null
            });

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

    onChangeNacionalidad = (e) => {
        if(this.state.postulant){
            console.log(e);
            this.initNacionalidadSelected = e;
          
        }
    }

    onChangePais = (e) => {

        if(this.state.postulant){

            if(this.state.postulant.frk_Paises){
                
                const auxPostulant = {...this.state.postulant};
                auxPostulant.frk_Paises = e;
                auxPostulant.frk_Regiones = null;
                auxPostulant.frk_Ciudades = null;
                this.initPaisSelected = e;
                this.initRegionSelected = null;
                this.setState({postulant: auxPostulant});
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
        
        if(this.state.postulant){

            //if(this.state.employer.frk_Regiones){

                const auxPostulant = {...this.state.postulant};
                auxPostulant.frk_Regiones = e;
                auxPostulant.frk_Ciudades = null;

                this.initRegionSelected = e;
                this.initComunaSelected = null;

                this.setState({postulant: auxPostulant});
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
        if(this.state.postulant){

            //if(this.state.employer.frk_Regiones){

                const auxPostulant = {...this.state.postulant};
                
                auxPostulant.frk_Ciudades = e;

                this.initComunaSelected = e;

                //console.log(this.initComunaSelected);

                this.setState({postulant: auxPostulant});
            //}
        }
    }

    redirectToLogin = (e) => {
        e.preventDefault();
        this.props.history.push('/login/postulante');
    }

    formPeopleEmployerJsx = (postulant) => {

        let me  = this;
        
        if(!postulant) return null;
       
        return(<>
        <Formik
            //enableReinitialize={true}
            
            initialValues={{ 
                firtsName: postulant.nombrePersona ? postulant.nombrePersona : '', 
                lastName: postulant.apellidoPersona ? postulant.apellidoPersona : '', 
                rut: postulant.rut ? postulant.rut : '', 
                birthDate: ConvertFormatDateToBrowser(postulant.fechaNacimiento) ? ConvertFormatDateToBrowser(postulant.fechaNacimiento) : '', 
                genero:  me.initGeneroSelected, 
                pais:  me.initPaisSelected, 
                region: me.initRegionSelected, 
                comuna: me.initComunaSelected, 
                city: postulant.ciudad ? postulant.ciudad : '',
                fileLogo: postulant.urlImagen ? `${webConfig.urlImagesNotCache}/${postulant.urlImagen}` : null,
                fileImage: null,
                street: postulant.direccion ? postulant.direccion : '', 
                postalCode: postulant.codigoPostal ? postulant.codigoPostal : '', 
                telephone: postulant.telefono ? postulant.telefono : '', 
                mobil: postulant.celular ? postulant.celular : '' ,
                nacionalidad: me.initNacionalidadSelected,
                estadoCivil: me.initEstodoCivilSelected, 
                licenciaConducir: me.initLicenciaConducir,

                cbDiscapacidad: postulant.bDiscapacidad ? postulant.bDiscapacidad : false,
                cbVehiculo: postulant.bVehiculo ? postulant.bVehiculo : false,
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
                
                if(!values.genero){
                    errors.genero = 'Debe seleccionar su Género.';
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

                values.nacionalidad = this.initNacionalidadSelected;

                if(!values.nacionalidad){
                    errors.nacionalidad = 'Debe seleccionar su nacionalidad.';
                }
                
                if (values.fileImage && values.fileImage.name !== undefined) {
                    //console.log(values.fileImage);
                    const partNameFile =  values.fileImage.name.split('.');
                    const lastPartNameFile = partNameFile[partNameFile.length - 1];
                    const imageSize = Math.round(values.fileImage.size / (1024 ** 2));
                    if(!(
                        lastPartNameFile.includes('png') ||
                        lastPartNameFile.includes('jpg') ||
                        lastPartNameFile.includes('jpeg') ||
                        lastPartNameFile.includes('bmp')
                    )){
                        errors.fileLogo = 'La foto debe ser en formato jpg, bmp, o png.';
                    }
                    else if((values.fileImage.size / (1024 ** 2)) > 1.00){
                        errors.fileLogo = `El peso de la foto debe ser inferior a 1MB. Su foto esta pesando ${imageSize}MB`;
                    }
                    else{
                        values.fileLogo = this.state.logoFile;
                    }

                }

                if(!this.state.logoFile){
                    values.fileLogo = null;
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
                this.setState({isValidatingForm:false});
                this.notify("Actualizando datos...");

                this.setState({isValidatingForm:false});
                //console.log(values);

                let updateData = {};

                updateData.nombrePersona = values.firtsName;
                updateData.apellidoPersona = values.lastName;
                updateData.rut = values.rut; 
                updateData.fechaNacimiento = values.birthDate;// ConvertFormatDateToBrowser(postulant.fechaNacimiento) ? ConvertFormatDateToBrowser(postulant.fechaNacimiento) : '', 
                updateData.idGenero = values.genero ? values.genero.value : null;
                
                updateData.ciudad  = values.city;
                
                updateData.direccion = values.street;
                updateData.codigoPostal = values.postalCode;
                updateData.telefono = values.telephone;
                updateData.celular = values.mobil;
                updateData.fileLogo = values.fileImage;
                
                if(values.nacionalidad){
                    updateData.frk_Nacionalidad = {
                        id : values.nacionalidad !== null ? values.nacionalidad.value : null,
                        collectionName: "maestroPaises"
                    };
                }

                updateData.frk_EstadosCiviles = values.estadoCivil ? values.estadoCivil.value : null;

                if(values.pais){
                    updateData.frk_Paises = {
                        id : values.pais !== null ? values.pais.value : null,
                        collectionName: "maestroPaises"
                    };
                }
                
                if(values.region){
                    //console.log("values.region: " + values.region);
                    updateData.frk_Regiones = {
                        id : values.region !== null ? values.region.value : null,
                        collectionName: "maestroRegiones"
                    };          
                }
                
                if(values.comuna){
                    updateData.frk_Ciudades = {
                        id : values.comuna !== null ? values.comuna.value : null,
                        collectionName: "maestroComunas"
                    };
                }

                if(isIterable(values.licenciaConducir)){
                    //console.log(values.licenciaConducir);
                    updateData.licenciasConducir  = values.licenciaConducir.map(item => {
                        return item.value;
                    });
                }

                updateData.bDiscapacidad = values.cbDiscapacidad;
                updateData.bVehiculo = values.cbVehiculo;

                //console.log(this.state.aspnetUser);
                updateData.id = this.state.postulant.id;
                updateData.fechaNacimiento = FormatDateFromInput(values.birthDate);

                this.props.updatePostulant(updateData);
               
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
                            <Label htmlFor="fileLogo">Foto <small>(Peso máximo de 1 MB)</small></Label>
                        </Col>
                        <Col lg="12" className="mb-2">
                            { this.state.logoFile &&
                            // <Img 
                            //     className="img-avatar"
                            //     style={{maxHeight:"100px" , borderRadius: "0px"}}
                            //     src={[this.state.logoFile, loadingImage]}
                            //     loader={<img src={loadingImage} className="img-avatar" alt={values.firtsName + " " + values.lastName}  ></img>}
                            // ></Img>

                            <Thumb file={this.state.logoFile}  />
                            }
                            
                        </Col>
                        <Col xs="12">
                            <FormGroup>
                                
                                
                                <div className="custom-file" id="customFile">
                                    <input type="file" id="fileLogo" className="custom-file-input" aria-describedby="fileHelp"
                                        accept="image/*"
                                        onChange={async (e) => {
                                            
                                            if(e.currentTarget.files && e.currentTarget.files.length > 0){
                                                const file = e.currentTarget.files[0];
                                                values.fileImage = file;
                                                const result = await toBase64(file);
                                                
                                                this.setState({logoFile:  result});
                                                return setFieldValue("fileLogo", result);
                                            }

                                            //this.setState({logoFile:  e.currentTarget.files.length <= 0 ? null: e.currentTarget.files[0]});
                                            //return setFieldValue("fileLogo", e.currentTarget.files.length <= 0 ? null: e.currentTarget.files[0]);
                                        
                                        }} 
                                        onBlur={handleBlur}
                                        placeholder="Seleccione el logo de su empresa...">
                                    </input>
                                    <label className="custom-file-label" htmlFor="fileLogo">
                                        { (this.state.logoFile !== null && this.state.logoFile.name !== undefined) ?  this.state.logoFile.name : "Seleccionar Foto"}
                                    </label>
                                </div>
                                <div className="text-danger small">{errors.fileLogo && touched.fileLogo && errors.fileLogo}</div>
                                
                                <div className={ this.state.logoFile === null ? "d-none" : "mt-2"}>
                                    <button type="button" className="btn btn-info" onClick={this.onChangeQuitarLogo}>Quitar Foto</button>
                                </div>

                                
                            </FormGroup>
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
                                <Label htmlFor="lastName">Apellidos<i className="text-danger">★</i></Label>
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
                        <Col xs="12" md="4">
                            <FormGroup>
                                <Label htmlFor="selectGenero">Género<i className="text-danger">★</i></Label>
                                <CustomSelect
                                    id={"selectGenero"}
                                    placeholder={'Seleccione...'}
                                    nameAttr={'genero'}
                                    onChange={(e,a) => {
                                       
                                        return setFieldValue(e,a);
                                    }}
                                    onBlur={setFieldTouched}
                                    value={values.genero}
                                    options={this.opcionesGenero}
                                    errors={errors.genero}
                                    touched={touched.genero}
                                    invalid={errors.genero !== undefined  && touched.genero} 
                                ></CustomSelect>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12" md="4">
                            <FormGroup>
                                <Label htmlFor="selectNacionalidad">Nacionalidad<i className="text-danger">★</i></Label>
                                <CustomSelect
                                    id={"selectNacionalidad"}
                                    placeholder={'Seleccione...'}
                                    nameAttr={'nacionalidad'}
                                    onChange={(e,a) => {
                                        //this.onChangePais(a);
                                        this.onChangeNacionalidad(a);
                                        return setFieldValue(e,a);
                                    }}
                                    onBlur={setFieldTouched}
                                    isLoading={this.state.isLoadingPaises}
                                    options={this.state.opcionesPaises}
                                    
                                    value={me.initNacionalidadSelected ? me.initNacionalidadSelected : values.nacionalidad}
                                    errors={errors.nacionalidad}
                                    touched={touched.nacionalidad}
                                    invalid={errors.nacionalidad !== undefined  && touched.nacionalidad} 
                                ></CustomSelect>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12" md="4">
                            <FormGroup>
                                <Label htmlFor="selectEstadoCivil">Estado Civil<i className="text-danger">★</i></Label>
                                <CustomSelect
                                    id={"selectEstadoCivil"}
                                    placeholder={'Seleccione...'}
                                    nameAttr={'estadoCivil'}
                                    onChange={(e,a) => {
                                        //this.onChangePais(a);
                                        return setFieldValue(e,a);
                                    }}
                                    onBlur={setFieldTouched}
                                    value={values.estadoCivil}
                                    options={this.opcionesEstadoCivil}
                                    errors={errors.estadoCivil}
                                    touched={touched.estadoCivil}
                                    invalid={errors.estadoCivil !== undefined  && touched.estadoCivil} 
                                ></CustomSelect>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12" md="4">
                            <FormGroup>
                                <Label><strong>Domicilio</strong></Label>
                               
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
                            <FormGroup>
                                <Label htmlFor="selectLicenciaConducir">Licencia(s) de Conducir<i className="text-danger">★</i></Label>
                                <CustomSelect
                                    id={"selectLicenciaConducir"}
                                    placeholder={'Seleccione...'}
                                    nameAttr={'licenciaConducir'}
                                    onChange={(e,a) => {
                                        
                                        return setFieldValue(e,a);
                                    }}
                                    onBlur={setFieldTouched}
                                    value={values.licenciaConducir}
                                    options={this.opcionesTipoLicenciaConducir}
                                    errors={errors.licenciaConducir}
                                    touched={touched.licenciaConducir}
                                    isMulti={true}
                                    invalid={errors.licenciaConducir !== undefined  && touched.licenciaConducir} 
                                ></CustomSelect>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12">
                            <FormGroup >
                                <AppSwitch 
                                    id="cbVehiculo"
                                    className={'mx-0'} 
                                    defaultChecked={false} 
                                    label 
                                    dataOn={'Sí'} 
                                    dataOff={'No'}
                                    color={ errors.cbVehiculo ? 'danger' : 'primary' } 
                                    name="cbVehiculo"
                                    checked={values.cbVehiculo}
                                    onChange={handleChange}
                                    onBlur={handleBlur}> 
                                </AppSwitch>
                                
                                <Label htmlFor="cbVehiculo" style={{'verticalAlign':'bottom'}} className="ml-2">Dispone de vehículo propio?</Label>
                                
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
                                    color={ errors.cbDiscapacidad ? 'danger' : 'primary' } 
                                    name="cbDiscapacidad"
                                    checked={values.cbDiscapacidad}
                                    onChange={handleChange}
                                    onBlur={handleBlur}> 
                                </AppSwitch>
                                
                                <Label htmlFor="cbDiscapacidad" style={{'verticalAlign':'bottom'}} className="ml-2">Tiene alguna discapacidad?</Label>
                                
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
        
    </>);

        }


    formShowed = 
        <Row>
            <Col xs="12" className="text-center" >
                <strong>Buscando datos del perfil...</strong>
            </Col>
        </Row>;

    render(){
       
        const { postulant } = this.state;

        if(postulant){
            this.isLoadedData = true;
            this.formShowed = this.formPeopleEmployerJsx(postulant);   
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
                                <strong>Datos Personales del Postulante</strong>
                                <small>&ensp;clic en el botón <strong className="text-success">Actualizar Datos</strong> para guardar cambios...</small>
                            </CardHeader>
                            <CardBody>
                                
                                { this.formShowed }
                                    
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>  
        );

    }

}


const mapStateToProps = state => ({
    //getDataEmployer: state.userAuth.employer,
    postulant: state.userAuth.postulant,
    updateDataPostulant: state.userAuth.updatePostulant,
    countries: state.geographics.countries,
    regions: state.geographics.regions,
    communes: state.geographics.communes,
    //commercialSectors: state.parameters.commercialSectors,
    //numericalRanges: state.parameters.numericalRanges,
    //typesEmployers: state.parameters.typesEmployers,
    //positionsCompany: state.parameters.positionsCompany
})

export default connect(mapStateToProps, { 
    getPostulant,
    updatePostulant,
    getCountries,
    getRegions, 
    getCommunes,
})(PostulantProfile);
