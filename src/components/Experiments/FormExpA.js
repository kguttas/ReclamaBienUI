import { ConvertFormatDateToBrowser } from '../../utiles'
import { FormikProvider, useFormik } from 'formik'

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
    Row,
    Jumbotron  
} from 'reactstrap';

import { validate as validateRut, format as formatRut } from 'rut.js';

// Redux
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

import { getExperimentA } from '../../actions/GenerateDocuments'

// Syncfusion
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';

//////////////////////////////

const validate = (values) => {
    const errors = {}

    

    if (!values.firstName) {
      errors.firstName = 'Requerido'
    } else if (values.firstName.length <= 3) {
      errors.firstName = 'El nombre es muy corto'
    }
  
    if(!values.lastname) {
      errors.lastname = 'Requerido'
    } else if (values.lastname.length <= 3) {
      errors.lastname = 'El apellido es muy corto'
    }

    if (!values.rut) {
        errors.rut = 'Campo RUT/DNI es requerido';
    }else if(!validateRut(values.rut)){
        errors.rut = 'Debe ser un RUT valido.';
        
    }else{
        values.rut = formatRut(values.rut);
    }
  
    if (!values.email) {
        errors.email = 'Campo Email es requerido.';
    } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    ) {
        errors.email = 'Debe proporcial un email valido.';
    }

    Date.prototype.addDays = function(days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    }

    console.log(values.date)

    if (!values.date) {
        errors.date = 'Debe seleccionar primero el mes y a continuación la fecha'
        
    } else if ((new Date(values.date)) > new Date()) {
        errors.date = `Fecha debe igual o anterior a la de hoy ${ConvertFormatDateToBrowser(new Date())}`
    }

    return errors
}

const FormExpA = () => { 

    const { experimentA } = useSelector(state => ({
        experimentA: state.GenerateDocumentsReducers.experimentA
      }), shallowEqual);

    const dispatch = useDispatch();
    
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastname: '',
            email: '',
            rut: '',
            date: new Date()
        },
        validate,
        onSubmit: values => {
            console.log(values)

            dispatch(getExperimentA(values))
        }
    })

    return (
          
        <div className="animated fadeIn">
                {experimentA === 'OK' ? 'Documeto generado' : null }
                <Row className="justify-content-center">
                    <Col xs="12" md="10">
                        {/* <Modal size={this.state.sizeModal} isOpen={this.state.modal} toggle={this.toggleModal} className={this.state.classNameModal + " " + this.props.className}>
                            <ModalHeader toggle={this.toggleModal}>{this.state.titleModal}</ModalHeader>
                            <ModalBody>
                                
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={this.toggleModal}>Entendido!</Button>{' '}
                            </ModalFooter>
                        </Modal> */}
                    
                        <Card>
                            <CardHeader>
                                <strong>Genere su reclamo</strong>
                                <small>&ensp;complete el formulario para obtener un documento...</small>
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col xs="12">
                                    <form onSubmit={formik.handleSubmit}>
                                        
                                        <Row>
                                            <Col xs="12">
                                                <FormGroup>
                                                    <Label htmlFor="firstName">Nombre<i className="text-danger">★</i></Label>
                                                    <Input type="text" {...formik.getFieldProps('firstName')}
                                                        placeholder="Ingrese su nombre..."
                                                        invalid={(formik.touched.firstName && formik.errors.firstName) ? true : false}></Input>
                                                    <FormFeedback className="help-block">{ formik.errors.firstName}</FormFeedback>
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col xs="12">
                                                <FormGroup>
                                                    <Label htmlFor="lastname">Apellido<i className="text-danger">★</i></Label>
                                                    <Input type="text" {...formik.getFieldProps('lastname')}
                                                        placeholder="Ingrese su apellido..."
                                                        invalid={(formik.touched.lastname && formik.errors.lastname) ? true : false}></Input>
                                                    <FormFeedback className="help-block">{ formik.errors.lastname}</FormFeedback>
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col xs="12">
                                                <FormGroup>
                                                    <Label htmlFor="rut">RUT<i className="text-danger">★</i></Label>
                                                    <Input type="text" {...formik.getFieldProps('rut')}
                                                        placeholder="Ingrese su RUT..."
                                                        invalid={(formik.touched.rut && formik.errors.rut) ? true : false}></Input>
                                                    <FormFeedback className="help-block">{ formik.errors.rut}</FormFeedback>
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col xs="12">
                                                <FormGroup>
                                                    <Label htmlFor="email">Email<i className="text-danger">★</i></Label>
                                                    <Input type="text" {...formik.getFieldProps('email')}
                                                        placeholder="Ingrese su email..."
                                                        invalid={(formik.touched.email && formik.errors.email) ? true : false}></Input>
                                                    <FormFeedback className="help-block">{ formik.errors.email}</FormFeedback>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                      

                                        <Row>
                                            <Col xs="12">
                                                <FormGroup>
                                                    <Label htmlFor="date">Fecha del ilícito<i className="text-danger">★</i></Label>
                                                    <DatePickerComponent id="datepicker"
                                                        placeholder="Ingrese la fecha del ilícto..."
                                                        strictMode={true}
                                                        value={formik.values.date}
                                                        {...formik.getFieldProps('date')} format="yyyy-MM-dd" onBlur={formik.handleChange} />
                                                    <FormFeedback className="help-block" style={{
                                                        display: formik.errors.date ? 'block' : 'none'
                                                    }}>{formik.errors.date}</FormFeedback>
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col xs="12">
                                                <Button block color="success" type="submit">Generar reclamo</Button>
                                            </Col>
                                        </Row>
                                        </form>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            
            
                
        </div>  
          
    );
}


// const mapStateToProps = state => ({
//     countries: state.geographics.countries,
//     regions: state.geographics.regions,
//     communes: state.geographics.communes,
// });
  
// const mapDispatchToProps = {
//     getCountries,
//     getRegions, 
//     getCommunes
// };
  
// export default connect(mapStateToProps, mapDispatchToProps)(FormExpA);

export default FormExpA;