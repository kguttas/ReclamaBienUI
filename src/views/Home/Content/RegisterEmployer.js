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
    ButtonGroup,
    Col, 
    
    Input,
    Modal, 
    ModalBody, 
    ModalFooter,
    ModalHeader, 
    Row,
    Jumbotron  } from 'reactstrap';
import { Formik, Form as FormFormik } from 'formik';
import { AppSwitch } from '@coreui/react';
import CustomSelect from '../../../components/UI/CustomSelect';
import Thumb from '../../../components/UI/Thumb';
import Linq from 'linq'; 
import { isIterable, validateUrl, FormatDateFromInput } from '../../../utiles';
import '../../../css/inputFile.css';
import LegalCondition from '../../../components/UI/LegalCondition';
import { Link } from 'react-router-dom';
// Site config
import { webConfig } from '../../../GlobalConfig';

import { validate as validateRut, format as formatRut } from 'rut.js';

// Redux
import { connect } from 'react-redux';
import { createUserEmployer } from '../../../actions/usersActions';
import { getCountries, getRegions, getCommunes } from '../../../actions/geographicsActions';
import { getCommercialSectors, getNumericalRanges, getTypesEmployers, getPositionsCompany } from '../../../actions/parametersActions';



class RegisterEmployer extends Component{

    constructor(props){
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
            isUserCreated: false
        }

        this.toggleModal = this.toggleModal.bind(this);
        this.setOpenModal = this.setOpenModal.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.onChangeQuitarLogo = this.onChangeQuitarLogo.bind(this);
        this.redirectToLogin = this.redirectToLogin.bind(this);
        
        this.changedOpcionesComuna = false;
        this.changedOpcionesRegion = false;
        this.isChile = false;
        this.isCargoOtro = false;
    }

    toggleModal() {
        this.setState({
          modal: !this.state.modal
        });
    }


    setOpenModal(isOpen,classNameModal, titleModal,contentModal, size = "md") {
        this.setState({
          modal: isOpen,
          classNameModal: classNameModal,
          titleModal: titleModal,
          contentModal: contentModal,
          sizeModal: size
        });
    }

    validateForm(){
        this.setState({isValidatingForm:true});
    }

    componentDidUpdate(prevProps, prevState){
       
        //if(prevState.opcionesComunas !== this.state.opcionesComunas){
            //console.log("cambios en el state de comunas");
            //this.changedOpcionesComuna = true;
        //}
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextState){

        const { countries, regions, communes, commercialSectors, numericalRanges, typesEmployers, positionsCompany} = nextProps;
        
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
                opcionesCargos: opcionesCargos
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
                opcionesTipoEmpleador: opcionesTipoEmpleador
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
                opcionesCantidadTrabajadores: opcionesCantidadTrabajadores
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
                opcionesSectorComercial: opcionesSectorComercial
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
                opcionesPaises: opcionesPaises
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

            this.setState({
                opcionesRegiones: opcionesRegiones
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
                opcionesComunas: opcionesComunas
            });
        }

        if(nextProps.newUserEmployer !== this.props.newUserEmployer){
            //console.log("newUserEmployer");

            //console.log(nextProps.newUserEmployer);

            const { codeErrors, bUserCreated } = nextProps.newUserEmployer;
            //console.log(codeErrors);
            if(isIterable(codeErrors)){

                let messageModalJsx = [];

                messageModalJsx.push(<div key={0}><span className={"h6 text-danger pb-5"}>Corriga los siguientes errores:</span></div>);
                
                codeErrors.forEach((item,key) => {
                    const contentMessageError = item.split(';');
                    
                    let msgError = "";
                    
                    console.log(contentMessageError[0]);
                    
                    if(contentMessageError[0] === "DuplicateEmail"){
                        msgError = "Este Email ya ha sido registrado. Intente con otro email.";
                    }/*else if(contentMessageError[0] === "DuplicateUserName"){
                        msgError = "Este Usuario ya ha sido registrado. Intente con otro email.";
                    }*/
                    else if(contentMessageError[0] === "PasswordTooShort"){
                        msgError = "El Password debe contener al menos 6 caracteres.";
                    }
 
                    if(msgError !== ""){
                        messageModalJsx.push(
                                <Alert  key={key + 1} color="danger">
                                    {msgError}
                                </Alert>
                            );
                    }
                });

                this.setOpenModal(true, "modal-danger", "Observaciones", messageModalJsx);
            }else if(bUserCreated){
                this.setState({isUserCreated:true});
            }
        
        }
        
    }

    componentDidMount(){
        //console.log("RegisterEmployer");
        this.props.getCountries({ action: "LOAD COUNTRIES"});

        this.props.getCommercialSectors({action: "LOAD COMMERCIAL SECTORS"});

        this.props.getNumericalRanges({action: "LOAD NUMERICAL RANGES", category: "n_trabajadores"});

        this.props.getTypesEmployers({action: "LOAD TYPES EMPLOYERS"});

        this.props.getPositionsCompany({action: "LOAD POSITIONS COMPANY"});
    }

    onChangeQuitarLogo = (e) => {
        console.log(this.state.logoFile);
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
    }

    onChangePais = (e) => {

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

        this.changedOpcionesComuna = true;

        this.setState({
            opcionesComunas: []
        });

        if(e !== null){
            
            this.props.getCommunes({ action: "LOAD REGIONS", idRegion: e.value});
        }

    }

    redirectToLogin = (e) => {
        e.preventDefault();
        this.props.history.push('/login/empleador');
    }

    render(){

        let titleForm = "Empleador";

        const formPeopleEmployerJsx =
        <React.Fragment>
            <Formik
              
                initialValues={{ 
                    email: '', password: '', repassword: '', 
                    pais: [], 
                    region: [], 
                    comuna: [], 
                    city:'', 
                    accept: false, 
                    firtsName: '', 
                    lastName: '', 
                    birthDate: '', 
                    rut: '', 
                    street: '', 
                    postalCode: '', 
                    telephone: '', 
                    mobil: '' 
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

                    if (!values.email) {
                        errors.email = 'Campo Email es requerido.';
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                        errors.email = 'Debe proporcial un email valido.';
                    }

                    if (!values.password) {
                        errors.password = 'Campo Password es requerido.';
                    }

                    if (!values.repassword) {
                        errors.repassword = 'Campo Rescribir Password es requerido.';
                    }

                    if(values.password !== values.repassword){
                        errors.repassword = 'Password y Rescribir Password deben ser iguales.';
                    }

                    if(!values.accept || values.accept === undefined){
                        errors.accept = 'Debe aceptar las condiciones y términos.'
                    }
                    
                    if(values.pais === null || values.pais.length === 0){
                        errors.pais = 'Debe seleccionar el pais.';
                    }

                    if(this.changedOpcionesRegion && this.isChile){
                        this.changedOpcionesRegion = false;
                        values.region = null;
                    }

                    if((values.region === null || values.region.length === 0) && this.isChile){
                        errors.region = 'Debe seleccionar la región.';
                    }

                    if(this.changedOpcionesComuna && this.isChile){
                        
                        this.changedOpcionesComuna = false;
                        values.comuna = null;
                    }

                    if((values.comuna === null || values.comuna.length === 0) && this.isChile){
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
                    

                    return errors;

                    
                }}
                
                onSubmit={(values, { setSubmitting }) => {
                    this.setState({isValidatingForm:false});

                    values.frk_Paises = {
                        id : values.pais !== null ? values.pais.value : null,
                        collectionName: "maestroPaises"
                    };

                    values.frk_Regiones = {
                        id : values.region !== null ? values.region.value : null,
                        collectionName: "maestroRegiones"
                    };

                    values.frk_Ciudades = {
                        id : values.comuna !== null ? values.comuna.value : null,
                        collectionName: "maestroComunas"
                    };

                    values.bPersonaJuridica = this.state.isCompany === 1 ? false : true;
                    values.fechaNacimiento = FormatDateFromInput(values.birthDate);

                    this.props.createUserEmployer(values);
                   // console.log(values);
                    setTimeout(() => {
                        //alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 1000);
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
                                        value={values.pais}
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
                                        value={values.region}
                                       
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
                                        onChange={setFieldValue}
                                        onBlur={setFieldTouched}
                                        value={values.comuna}
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
                                <div className="p-3 mb-2 bg-light text-black border border-info rounded">
                                    <span>Acceso a Cuenta</span>
                                </div>
                            </Col>
                        
                        </Row>
                        <Row>
                            <Col xs="12">
                                <FormGroup>
                                    <Label htmlFor="email">Email<i className="text-danger">★</i></Label>
                                    <Input type="email" id="email" 
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                        placeholder="Ingrese su email..."
                                        valid={values.email !== '' && touched.email }
                                        invalid={errors.email !== undefined && touched.email } ></Input>
                                    <FormFeedback className="help-block">{errors.email && touched.email && errors.email}</FormFeedback>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12">
                                <FormGroup>
                                    <Label htmlFor="password">Password<i className="text-danger">★</i></Label>
                                    <Input type="password" id="password" 
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.password}
                                        placeholder="Ingrese su password..."
                                        valid={values.password !== '' && touched.password }
                                        invalid={errors.password !== undefined && touched.password } ></Input>
                                    <FormFeedback className="help-block">{errors.password && touched.password && errors.password}</FormFeedback>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12">
                                <FormGroup>
                                    <Label htmlFor="repassword">Rescribir Password<i className="text-danger">★</i></Label>
                                    <Input type="password" id="repassword" 
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.repassword}
                                        placeholder="Ingrese su password..."
                                        valid={values.repassword !== '' && touched.repassword }
                                        invalid={errors.repassword !== undefined && touched.repassword } ></Input>
                                    <FormFeedback className="help-block">{errors.repassword && touched.repassword && errors.repassword}</FormFeedback>
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs="12">
                                <FormGroup >
                                    <AppSwitch 
                                        id="customCheck"
                                        className={'mx-0'} 
                                        defaultChecked={false} 
                                        label 
                                        dataOn={'Sí'} 
                                        dataOff={'No'}
                                        color={ errors.accept !== undefined ? 'danger' : 'primary' } 
                                        name="accept"
                                        checked={values.accept}
                                        onChange={handleChange}
                                        onBlur={handleBlur}> 
                                    </AppSwitch>
                                    
                                    <Label htmlFor="customCheck" style={{'verticalAlign':'bottom'}} className="ml-2">He leído y acepto las Condiciones legales y la Politica de privacidad de {webConfig.siteName}.*</Label>
                                    <p className="text-danger small">{errors.accept && touched.accept && errors.accept}</p>
                                    <Link to="" className="text-info" onClick={(e) => {
                                        e.preventDefault();
                                        const contentAdvertising = <LegalCondition></LegalCondition>
                                        this.setOpenModal(true, "modal-info", "Condiciones Legales y la Politica de Privacidad", contentAdvertising, "lg");  
                                    }}>Ver condiciones</Link>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12">
                                <Button block color="success" type="submit" disabled={isSubmitting} onClick={this.validateForm} >REGISTRAR EMPLEADOR</Button>
                            </Col>
                        </Row>
                    </FormFormik>
                    );
                }}
                </Formik>
            
        </React.Fragment>

        const formCompanyEmployerJsx = 
        <React.Fragment>
            <Formik
             enableReinitialize={true}
                initialValues={{ 
                    email: '', 
                    password: '', 
                    repassword: '', 
                    nombreComercialEmpresa: '',
                    razonSocial: '',
                    rut: '', 
                    sectorComercial: [],
                    cantidadTrabajadores: [],
                    tipoEmpleador: [],
                    cargos: [],
                    pais: [], 
                    region: [], 
                    comuna: [], 
                    city:'', 
                    accept: false, 
                    firtsName: '', 
                    lastName: '', 
                    indicarOtroCargo: '',
                    birthDate: '', 
                    descripcionEmpresa: '',
                    urlEmpresa: '',
                    fileLogo: null,
                    street: '', 
                    postalCode: '', 
                    telephone: '', 
                    mobil: '' 
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
                    
                    if(values.sectorComercial === null || values.sectorComercial.length === 0){
                        errors.sectorComercial = 'Debe seleccionar Sector Comercial.';
                    }

                    if(values.cantidadTrabajadores === null || values.cantidadTrabajadores.length === 0){
                        errors.cantidadTrabajadores = 'Debe seleccionar Cantidad de Trabajadores.';
                    }

                    if(values.tipoEmpleador === null || values.tipoEmpleador.length === 0){
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

                    if(values.cargos === null || values.cargos.length === 0){
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

                    if (!values.email) {
                        errors.email = 'Campo Email es requerido.';
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                        errors.email = 'Debe proporcial un email valido.';
                    }

                    if (!values.password) {
                        errors.password = 'Campo Password es requerido.';
                    }

                    if (!values.repassword) {
                        errors.repassword = 'Campo Rescribir Password es requerido.';
                    }

                    if(values.password !== values.repassword){
                        errors.repassword = 'Password y Rescribir Password deben ser iguales.';
                    }

                    if(!values.accept || values.accept === undefined){
                        errors.accept = 'Debe aceptar las condiciones y términos.'
                    }

                    
                    
                    if(values.pais === null || values.pais.length === 0){
                        errors.pais = 'Debe seleccionar el pais.';
                    }

                    if(this.changedOpcionesRegion && this.isChile){
                        this.changedOpcionesRegion = false;
                        values.region = null;
                    }

                    if((values.region === null || values.region.length === 0) && this.isChile){
                        errors.region = 'Debe seleccionar la región.';
                    }

                    if(this.changedOpcionesComuna && this.isChile){
                        
                        this.changedOpcionesComuna = false;
                        values.comuna = null;
                    }

                    if((values.comuna === null || values.comuna.length === 0) && this.isChile){
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
                    

                    return errors;

                    
                }}
                
                onSubmit={(values, { setSubmitting }) => {
                    this.setState({isValidatingForm:false});

                    values.frk_Paises = {
                        id : values.pais !== null ? values.pais.value : null,
                        collectionName: "maestroPaises"
                    };

                    values.frk_Regiones = {
                        id : values.region !== null ? values.region.value : null,
                        collectionName: "maestroRegiones"
                    };

                    values.frk_Ciudades = {
                        id : values.comuna !== null ? values.comuna.value : null,
                        collectionName: "maestroComunas"
                    };

                    values.frk_SectorComercial = {
                        id : values.sectorComercial !== null ? values.sectorComercial.value : null,
                        collectionName: "maestroSectoresComerciales"
                    };

                    values.frk_CantididadTrabajadores = {
                        id : values.cantidadTrabajadores !== null ? values.cantidadTrabajadores.value : null,
                        collectionName: "maestroRangosNumericos"
                    };

                    values.frk_TipoEmpresa = {
                        id : values.tipoEmpleador !== null ? values.tipoEmpleador.value : null,
                        collectionName: "maestroTiposEmpleadores"
                    };

                    values.frk_Cargo = {
                        id : values.cargos !== null ? values.cargos.value : null,
                        collectionName: "maestroCargos"
                    };

                    if (values.fileLogo && values.fileLogo.name !== undefined) {
                        values.rutaLogo = values.fileLogo.name;
                    }
                   
                    values.bPersonaJuridica = this.state.isCompany === 2 ? true : false;
                    values.fechaNacimiento = FormatDateFromInput(values.birthDate);     
                    
                    this.props.createUserEmployer(values);
                   // console.log(values);
                    setTimeout(() => {
                        //alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 1000);
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
                                            //this.onChangePais(a);
                                            return setFieldValue(e,a);
                                        }}
                                        
                                        onBlur={setFieldTouched}
                                        value={values.sectorComercial}
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
                                            //this.onChangeRegion(a);
                                            return setFieldValue(e,a);
                                        }}
                                        onBlur={setFieldTouched}
                                        value={values.cantidadTrabajadores}
                                       
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
                                        onChange={setFieldValue}
                                        onBlur={setFieldTouched}
                                        value={values.tipoEmpleador}
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
                                        value={values.pais}
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
                                        value={values.region}
                                       
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
                                        onChange={setFieldValue}
                                        onBlur={setFieldTouched}
                                        value={values.comuna}
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
                                        value={values.cargos}
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
                                        placeholder="Ingrese el carga que posee dentro de la empresa..."
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
                                <div className="p-3 mb-2 bg-light text-black border border-info rounded">
                                    <span>Acceso a Cuenta</span>
                                </div>
                            </Col>
                        
                        </Row>
                        <Row>
                            <Col xs="12">
                                <FormGroup>
                                    <Label htmlFor="email">Email<i className="text-danger">★</i></Label>
                                    <Input type="email" id="email" 
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                        placeholder="Ingrese su email..."
                                        valid={values.email !== '' && touched.email }
                                        invalid={errors.email !== undefined && touched.email } ></Input>
                                    <FormFeedback className="help-block">{errors.email && touched.email && errors.email}</FormFeedback>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12">
                                <FormGroup>
                                    <Label htmlFor="password">Password<i className="text-danger">★</i></Label>
                                    <Input type="password" id="password" 
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.password}
                                        placeholder="Ingrese su password..."
                                        valid={values.password !== '' && touched.password }
                                        invalid={errors.password !== undefined && touched.password } ></Input>
                                    <FormFeedback className="help-block">{errors.password && touched.password && errors.password}</FormFeedback>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12">
                                <FormGroup>
                                    <Label htmlFor="repassword">Rescribir Password<i className="text-danger">★</i></Label>
                                    <Input type="password" id="repassword" 
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.repassword}
                                        placeholder="Ingrese su password..."
                                        valid={values.repassword !== '' && touched.repassword }
                                        invalid={errors.repassword !== undefined && touched.repassword } ></Input>
                                    <FormFeedback className="help-block">{errors.repassword && touched.repassword && errors.repassword}</FormFeedback>
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs="12">
                                <FormGroup >
                                    <AppSwitch 
                                        id="customCheck"
                                        className={'mx-0'} 
                                        defaultChecked={false} 
                                        label 
                                        dataOn={'Sí'} 
                                        dataOff={'No'}
                                        color={ errors.accept !== undefined ? 'danger' : 'primary' } 
                                        name="accept"
                                        checked={values.accept}
                                        onChange={handleChange}
                                        onBlur={handleBlur}> 
                                    </AppSwitch>
                                    
                                    <Label htmlFor="customCheck" style={{'verticalAlign':'bottom'}} className="ml-2">He leído y acepto las Condiciones legales y la Politica de privacidad de {webConfig.siteName}.*</Label>
                                    <p className="text-danger small">{errors.accept && touched.accept && errors.accept}</p>
                                    <Link to="" className="text-info" onClick={(e) => {
                                        e.preventDefault();
                                        const contentAdvertising = <LegalCondition></LegalCondition>
                                        this.setOpenModal(true, "modal-info", "Condiciones Legales y la Política de Privacidad", contentAdvertising, "lg");  
                                    }}>Ver condiciones</Link>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12">
                                <Button block color="success" type="submit" disabled={isSubmitting} onClick={this.validateForm} >REGISTRAR EMPLEADOR</Button>
                            </Col>
                        </Row>
                    </FormFormik>
                    );
                }}
                </Formik>
            
        </React.Fragment>

        let formShowed = null;

        if(this.state.isCompany === 1){
            formShowed = formPeopleEmployerJsx;
            titleForm = "Persona Natural";
        }else if(this.state.isCompany === 2){
            formShowed = formCompanyEmployerJsx;
            titleForm = "Empresa";
        }

        let contentForm = null;

        if(!this.state.isUserCreated){
            contentForm = 
            <Card>
                <CardHeader>
                    <strong>{ titleForm }</strong>
                    <small>&ensp;complete el formulario para registrarse...</small>
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col xs="12">
                            <FormGroup>
                                <Label>El empleador es persona natural o empresa?</Label>
                                <Row>
                                    <Col xs="12" className="text-center" >
                                        <ButtonGroup>
                                            <Button className="btn btn-info" onClick={() => { this.selectTypePerson(1); }} active={this.state.isCompany === 1}>Persona<i className={this.state.isCompany === 1 ? "text-danger font-weight-bold" :"d-none"}>&nbsp;✓</i></Button>
                                            <Button className="btn btn-info" onClick={() => { this.selectTypePerson(2); }} active={this.state.isCompany === 2}>Empresa<i className={this.state.isCompany === 2 ? "text-danger font-weight-bold" :"d-none"}>&nbsp;✓</i></Button>
                                        </ButtonGroup>
                                    </Col>
                                </Row>
                            </FormGroup>
                            
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12">
                            { formShowed }
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        }else{
            contentForm =
            <Row>
                <Col>
                    <Card>
                    <CardHeader>
                        <i className="cui-info icons"></i>
                        <strong>Empleador Registrado</strong>
                        <div className="card-header-actions">
                            <a href="/#/login/empleador" rel="noreferrer noopener" className="card-header-action">
                                <small className="text-muted">login empleador</small>
                            </a>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <Jumbotron>
                            <form onSubmit={this.redirectToLogin}>
                                <h2>Se ha Registrado Exitosamente!</h2>
                                <p className="lead">Le hemos enviado en email para confirmar que su cuenta ha sido creada de manera correcta.</p>
                                <hr className="my-2" />
                                <p>Si el email no ha llegado o no puede ingresar a la plataforma con los datos de Email y Password que usted previamente nos facilitó, por favor escribanos a: <strong className="text-danger">{ webConfig.supportEmail }</strong> </p>
                                <p className="lead">
                                    <Button color="success" className="btn btn-success d-block w-100">Entendido!</Button>
                                </p>
                            </form>
                        </Jumbotron>
                    </CardBody>
                    </Card>
                </Col>
            </Row>
        }

        return(
            <div className="animated fadeIn">
                   
                        
                        <Row className="justify-content-center">
                            <Col xs="12" md="8">
                                <Modal size={this.state.sizeModal}  isOpen={this.state.modal} toggle={this.toggleModal} className={this.state.classNameModal + " " + this.props.className}>
                                    <ModalHeader toggle={this.toggleModal}>{this.state.titleModal}</ModalHeader>
                                    <ModalBody>
                                        { this.state.contentModal }
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="primary" onClick={this.toggleModal}>Entendido!</Button>{' '}
                                    </ModalFooter>
                                </Modal>
                                {contentForm}
                            </Col>
                        </Row>
                    
                    
                       
                </div>  
        );

    }

}


const mapStateToProps = state => ({
    newUserEmployer: state.userAuth.newUserEmployer,
    countries: state.geographics.countries,
    regions: state.geographics.regions,
    communes: state.geographics.communes,
    commercialSectors: state.parameters.commercialSectors,
    numericalRanges: state.parameters.numericalRanges,
    typesEmployers: state.parameters.typesEmployers,
    positionsCompany: state.parameters.positionsCompany
})

export default connect(mapStateToProps, { 
    createUserEmployer,
    getCountries,
    getRegions, 
    getCommunes,
    getCommercialSectors,
    getNumericalRanges,
    getTypesEmployers,
    getPositionsCompany
})(RegisterEmployer);
