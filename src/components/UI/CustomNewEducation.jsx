import React, { Component } from 'react';
import { Formik, Form as FormFormik } from 'formik';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import "react-datepicker/dist/react-datepicker.css";
import CustomSelect from '../../components/UI/CustomSelect';
import { AppSwitch } from '@coreui/react';
import CustomPopover from '../../components/UI/CustomPopover';
import DatePicker, { registerLocale } from "react-datepicker";
import es from 'date-fns/locale/es';
import esLocale from 'moment/locale/es';
import moment from 'moment';



import { 

    Label,
    FormFeedback, 
    FormGroup, 

    Col, 
    Input,
 
    Row ,

} from 'reactstrap';
import Linq from 'linq'; 
import { isIterable } from '../../utiles';
import { connect } from 'react-redux';
import { getRegions, getCommunes } from '../../actions/geographicsActions';
import { getEducationalLevel, getProfessions } from '../../actions/parametersActions';
import { opcionesEstadoNivelEducacionalRequisito } from '../../data/parameters';

class CustomNewJobExperience extends Component {

    constructor(props, context) {
        super(props, context);

        registerLocale('es', es);

        moment.updateLocale("es", esLocale);

        this.state ={
            opcionesPaises: this.props.opcionesPaises,
            opcionesRegiones: null,
            opcionesComunas: null,
            opcionesNivelEstudio: [],
            opcionesProfesiones: [],
        };
        
        this.submitForm = null;

        this.submitThisForm = this.submitThisForm.bind(this);

        this.dataform = props.dataForm ? {...props.dataForm} : null;

        
        //console.log(this.dataform );

        this.props.passReference(this.submitThisForm);

        this.callbackToogleModal = null;
    }

    //#region Life Cycle

    UNSAFE_componentWillReceiveProps(nextProps, nextState){

        const { regions, communes, educationalLevel, professions } = nextProps;

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
                    opcionesRegiones: opcionesRegiones,
                    isLoadingSelectRemotoRegiones: false,
                    isLoadingSelectPresencialRegiones: false,
                });
            }
        }

        if(this.props.communes !== communes){
            
            if(isIterable(communes)){

                let comunas = [...communes];

                const opcionesComunas = comunas.map( item => {
                    //console.log(item);
                    return { value: item.id, label: item.nombre };
                });

                this.setState({
                    opcionesComunas: opcionesComunas,
                    isLoadingSelectRemotoComunas: false,
                    isLoadingSelectPresencialComunas: false,
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

                const opcionesNivelEstudio = nivelesEducacionales.filter(item => {
                    return item.nombre !== 'No se requieren estudios';
                }).map( item => {
                    return { value: item.id, label: item.nombre };
                });

                this.setState({
                    educationalLevel: educationalLevel,
                    opcionesNivelEstudio: opcionesNivelEstudio,
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

    }
    
    componentDidMount(){

        this.props.getEducationalLevel({action: "LOAD EDUCATIONAL LEVELS"});
        this.props.getProfessions({action: "LOAD PROFESSIONS"});

        if(this.dataform.selectPresencialPais){
            
            const idPais = this.dataform.selectPresencialPais.value;
            
            this.props.getRegions({ action: "LOAD REGIONS", idPais});        
                    
        }

        if(this.dataform.selectPresencialRegion){
            
            const idRegion = this.dataform.selectPresencialRegion.value;
            
            this.props.getCommunes({ action: "LOAD COMMUNES", idRegion});      
                    
        }
            
    }
    //#endregion
    //#region Events 

    submitThisForm = (params) => {
        //console.log(params);
        if(typeof this.submitForm === 'function'){

            this.submitForm();
            this.callbackToogleModal = params.callback;
        }
    }

    onChangePaisPresencial = (e) => {
		
        this.setState({
            opcionesRegiones: [], 
            opcionesComunas: [],
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
        
        if(e){
            this.setState({selectedPresencialCommune: e});
        }
    }

   
    setStartDate = (date)  =>{

    }
    //#endregion

    render() {
        
        
        let content = <div>Hola</div>;

        if(this.dataform){
            //  console.log(this.dataform)
            content = 
            <div>
                
                <Formik
                enableReinitialize={false}
                initialValues={{
                    id: this.dataform.id ? this.dataform.id : null,
                    centro: this.dataform.centro || '',
                    selectNivelEstudios: this.dataform.selectNivelEstudios,
                    selectCarrera: this.dataform.selectCarrera,
                    otraCarrera: this.dataform.otraCarrera || '',
                    selectEstadoEstudio: this.dataform.selectEstadoEstudio,
                    selectCategoriaEducacional: this.dataform.selectCategoriaEducacional,
                    selectPresencialPais: this.dataform.selectPresencialPais,
                    selectPresencialRegion: this.dataform.selectPresencialRegion,
                    selectPresencialComuna: this.dataform.selectPresencialComuna,
                    ciudadPresencial: this.dataform.ciudadPresencial ? this.dataform.ciudadPresencial : '',
                    fechaInicio: this.dataform.fechaInicio ? this.dataform.fechaInicio : new Date(),
                    fechaTermino: this.dataform.fechaTermino ? this.dataform.fechaTermino : new Date(),
                    cbActualmente: this.dataform.cbActualmente ? this.dataform.cbActualmente : false,
                    descripcion: this.dataform.descripcion ? this.dataform.descripcion : '',
                    cbModalidadOnline: this.dataform.cbModalidadOnline ? this.dataform.cbModalidadOnline : false,
                }}
                validate={ (values) => {
                    let errors = {};
                    
                    // if (!values.cargo) {
                    //     errors.cargo = 'Campo Cargo / Puesto es requerido.';
                    // }else if(values.cargo.length > 100){
                    //     errors.cargo = 'Campo Cargo / Puesto debe ser de largo máximo 100 carácteres.';
                    // }

                    // if (!values.empresa) {
                    //     errors.empresa = 'Campo Empresa / Institución es requerido.';
                    // }else if(values.empresa.length > 100){
                    //     errors.empresa = 'Campo Empresa / Institución debe ser de largo máximo 100 carácteres.';
                    // }
                
                    //console.log(values);
                    this.dataform ={
                        ...values
                    };

                    return errors; 
                }}
                onSubmit={(values, { setSubmitting }) => {

                    this.isValidatingForm = false;
                    this.setSubmitting = setSubmitting;
                    this.setSubmitting(false);

                    if (typeof this.props.setDataNewEducation === 'function') {
                      
                        this.props.setDataNewEducation(this.dataform);
                    }

                    if (typeof this.props.setDataNewEducation === 'function') {
                        this.callbackToogleModal();
                    }

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
                    submitForm
                }) => {
                    
                    this.submitForm = submitForm;

                    return (
                    <FormFormik onSubmit={handleSubmit}>
                        <Row>
                            <Col xs="12">
                                <FormGroup>
                                    <Label htmlFor="centro">Centro Educacional<i className="text-danger">★</i></Label>
                                    <Input type="text" id="centro" 
                                        name="centro"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.centro || ''}
                                        placeholder='Por ej. "CFT la Araucana", "Inacap", "U. de Chile", etc.'
                                        valid={values.centro !== '' && touched.centro}
                                        invalid={errors.centro !== undefined  && touched.centro} ></Input>
                                    <FormFeedback className="help-block">{errors.centro && touched.centro && errors.centro}</FormFeedback>
                                    <p className={ values.centro.length > 100 ? "text-danger small" :"small"}>{values.centro.length + " / 100" }</p>
                                </FormGroup>
                            </Col>
                        </Row>
						<Row>
                            <Col xs="12">
                                <FormGroup>
                                    <Label htmlFor="selectNivelEstudios">Nivel de Estudios<i className="text-danger">★</i></Label>
                                    <CustomSelect
                                        id={"selectNivelEstudios"}
                                        placeholder={'Seleccione...'}
                                        nameAttr={'selectNivelEstudios'}
                                        onChange={(e,a) => {
                                            
                                            return setFieldValue(e,a);
                                        }}
                                        onBlur={setFieldTouched}
                                        value={values.selectNivelEstudios}
                                        options={this.state.opcionesNivelEstudio}
                                        errors={errors.selectNivelEstudios}
                                        touched={touched.selectNivelEstudios}
                                        isMulti={false}
                                        invalid={errors.selectNivelEstudios !== undefined  && touched.selectNivelEstudios} 
                                    ></CustomSelect>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12">
                                <FormGroup>
                                    <Label htmlFor="selectCarrera">Carrera / Título<i className="text-danger">★</i></Label>
                                    <CustomSelect
                                        id={"selectCarrera"}
                                        placeholder={'Seleccione...'}
                                        nameAttr={'selectCarrera'}
                                        onChange={(e,a) => {
                                            
                                            return setFieldValue(e,a);
                                        }}
                                        onBlur={setFieldTouched}
                                        value={values.selectCarrera}
                                        options={this.state.opcionesProfesiones}
                                        errors={errors.selectCarrera}
                                        touched={touched.selectCarrera}
                                        isMulti={false}
                                        invalid={errors.selectCarrera !== undefined  && touched.selectCarrera} 
                                    ></CustomSelect>
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs="12">
                                <FormGroup>
                                    <Label htmlFor="otraCarrera">Otra Carrera / Título<i className="text-danger">★</i></Label>
                                    <Input type="text" id="otraCarrera" 
                                        name="otraCarrera"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.otraCarrera || ''}
                                        placeholder='Por ej. "Analista Programador", "Operario de Bodega", "Soldador", "Operario de Retroescavadora", etc.'
                                        valid={values.otraCarrera !== '' && touched.otraCarrera}
                                        invalid={errors.otraCarrera !== undefined  && touched.otraCarrera} ></Input>
                                    <FormFeedback className="help-block">{errors.otraCarrera && touched.otraCarrera && errors.otraCarrera}</FormFeedback>
                                    <p className={ values.otraCarrera.length > 1000 ? "text-danger small" :"small"}>{values.otraCarrera.length + " / 1000" }</p>
                                </FormGroup>
                            </Col>
                        </Row>


                        <Row>
                            <Col xs="12">
                                <FormGroup>
                                    <Label htmlFor="selectEstadoEstudio">Estado del Estudio<i className="text-danger">★</i></Label>
                                    <CustomSelect
                                        id={"selectEstadoEstudio"}
                                        placeholder={'Seleccione...'}
                                        nameAttr={'selectEstadoEstudio'}
                                        onChange={(e,a) => {
                                            
                                            return setFieldValue(e,a);
                                        }}
                                        onBlur={setFieldTouched}
                                        value={values.selectEstadoEstudio}
                                        options={opcionesEstadoNivelEducacionalRequisito}
                                        errors={errors.selectEstadoEstudio}
                                        touched={touched.selectEstadoEstudio}
                                        isMulti={false}
                                        invalid={errors.selectEstadoEstudio !== undefined  && touched.selectEstadoEstudio} 
                                    ></CustomSelect>
                                </FormGroup>
                            </Col>
                        </Row>

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
                            <Col xs="12" md="3">
                                <Label htmlFor="fechaInicio">Fecha de Inicio</Label>
                                <div>
                                 <DatePicker className="form-control"
                                    id="fechaInicio"
                                    dateFormat="dd MMM yyyy"
                                    showYearDropdown
                                    showMonthDropdown
                                    locale="es"
                                    selected={values.fechaInicio}
                                    onChange={date => {
                                        return setFieldValue("fechaInicio",date);
                                    }}
                                ></DatePicker> 
                                </div>
                            </Col>
                            <Col xs="12" md="3" className={ values.cbActualmente  ? "d-none" : "" }>
                                <Label htmlFor="fechaTermino">Fecha de Término</Label>
                                <div>
                                <DatePicker className="form-control"
                                    id="fechaTermino"
                                    dateFormat="dd MMM yyyy"
                                    showYearDropdown
                                    showMonthDropdown
                                    locale="es"
                                    selected={values.fechaTermino}
                                    onChange={date => {
                                        return setFieldValue("fechaTermino",date);
                                    }}
                                   
                                ></DatePicker>
                                </div>
                            </Col>
                            <Col xs="12" md="6"  className="d-flex align-items-end">
                                <FormGroup className="mb-0">
                                    <AppSwitch 
                                        id="cbActualmente"
                                        
                                        defaultChecked={false} 
                                        label 
                                        dataOn={'Sí'} 
                                        dataOff={'No'}
                                        color={ errors.cbActualmente !== undefined ? 'danger' : 'primary' } 
                                        name="cbActualmente"
                                        checked={values.cbActualmente}
                                        onChange={handleChange}
                                        onBlur={handleBlur}> 
                                    </AppSwitch>
                                    
                                    <Label htmlFor="cbHomeOffice" style={{'verticalAlign':'bottom'}} className="ml-2">
                                    Actualmente estudio aquí&ensp;
                                        
                                    </Label>
                                    <i id="iconHelp_cbActualmente" className="fa fa-question-circle fa-lg text-info" style={{verticalAlign: "8px", cursor: "pointer"}}></i>
                                        
                                    <CustomPopover placement="top-start" target="iconHelp_cbActualmente" title={"Actualmente estudio aquí"} text={"La fecha de término no se incluye ya que aún estudia en esta institución."}></CustomPopover>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col xs="12" md="6" >
                                <FormGroup>
                                    <AppSwitch 
                                        id="cbModalidadOnline"
                                        className={'mx-0'} 
                                        defaultChecked={false} 
                                        label 
                                        dataOn={'Sí'} 
                                        dataOff={'No'}
                                        color={ errors.cbModalidadOnline !== undefined ? 'danger' : 'primary' } 
                                        name="cbModalidadOnline"
                                        checked={values.cbModalidadOnline}
                                        onChange={handleChange}
                                        onBlur={handleBlur}> 
                                    </AppSwitch>
                                    
                                    <Label htmlFor="cbModalidadOnline" style={{'verticalAlign':'bottom'}} className="ml-2">
                                    Modalidad Online&ensp;
                                        
                                    </Label>
                                    <i id="iconHelp_cbModalidadOnline" className="fa fa-question-circle fa-lg text-info" style={{verticalAlign: "8px", cursor: "pointer"}}></i>
                                        
                                    <CustomPopover placement="top-start" target="iconHelp_cbModalidadOnline" title={"Modalidad Online"} text={"Si la modalidad de la carrera / estudios fue o es en modalidad remota online (No presencial)."}></CustomPopover>
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
                                        placeholder='Describa actividades, deportes, logros, ayudantias, etc. realizadas mientra era estudiante,'
                                        valid={values.descripcion !== '' && touched.descripcion }
                                        invalid={errors.descripcion !== undefined && touched.descripcion } ></Input>
                                    <FormFeedback className="help-block">{errors.descripcion && touched.descripcion}</FormFeedback>
                                    <p className={ values.descripcion.length > 1000 ? "text-danger small" :"small"}>{values.descripcion.length + " / 1000" }</p>
                                </FormGroup>
                            </Col>
                        </Row>
                        
                    </FormFormik>
                    );
                }}
                </Formik>
            </div>
        }
        
        
        return (
            <>
            {content}
            </>
        )
    }
}

const mapStateToProps = state => ({
    regions: state.geographics.regions,
    communes: state.geographics.communes,
    educationalLevel: state.parameters.educationalLevel,
    professions: state.parameters.professions,
});


export default connect(mapStateToProps, { 
    getRegions, 
    getCommunes,
    getEducationalLevel,
    getProfessions,
})(CustomNewJobExperience);
