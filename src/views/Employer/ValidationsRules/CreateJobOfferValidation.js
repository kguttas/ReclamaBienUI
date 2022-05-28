import React from 'react';
import { 
    Alert, 
    Badge,
    Button,
    Col,
    Row
} from 'reactstrap';
import { Formik, Form as FormFormik } from 'formik';

const CreateJobOfferValidation = (params) => {

    let { action, values, errors, setOpenModal, callbackModalPublish, callbackCloseModalPublish } = params;

    if(action === 'publish' && values){
         
        var listError = Object.keys(RulesValidation(params));
        //console.log(listError.length);
        if( listError.length > 0){
            //isValidatingForm = false;
            action = '';

            let messageModalJsx = [];
            listError.forEach((item,key) => {
                //console.log(errors[item]);
                messageModalJsx.push(
                        <Alert  key={key} color="danger">
                            {errors[item]}
                        </Alert>
                    );
            });
            
            setOpenModal(true, '', 'Entendido!', "modal-danger", "Completar Formulario", messageModalJsx, false);                    
        }
        else {

            const content =
            <React.Fragment>
                
                <Formik
                    // enableReinitialize={true}
                    initialValues={{ }}
                    validate={ (values) => {
    
                        let errors = {};
                    
                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
    
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
                                    Al <strong>publicar</strong> la oferta laboral, esta será revisada por el administrador para verificar que cumple con las políticas del sitio, por lo tanto, no podrá ser editada hasta después de la revisión. 
                                    Recibirá una notificación via email, que indicará si la oferta de empleo fue&nbsp;
                                    <Badge color="info">Publicada</Badge>,&nbsp;<Badge color="info">Observada</Badge>, o <Badge color="info">Rechazada</Badge>. En seguida, podrá volver a editar la oferta de empleo y repetir el proceso si desea hacer algún cambio.
                                    </p>
                                </Col>
                            </Row>
                            
                            <Row >
                                <Col xs="12" className="d-flex justify-content-end">
                                    <Button className="mr-1"  color="secondary" type="button" disabled={isSubmitting}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        callbackCloseModalPublish();
                                    }} >
                                        Cancelar
                                    </Button>
                                    <Button  color="success" type="button" disabled={isSubmitting} onClick={(e) => {
                                        e.preventDefault();
                                        callbackModalPublish(action);
                                    }} >
                                        Publicar
                                    </Button>
                                </Col>
                            </Row>
                            
                        </FormFormik>
                        );
                    }}
                    </Formik>
            </React.Fragment>
               
            setOpenModal(true, '', 'Listo!', 'modal-success', "Publicar Oferta", content, true);
        }
    } else if(action === 'rejected'){

        const content =
        <React.Fragment>
            
            <Formik
                // enableReinitialize={true}
                initialValues={{ }}
                validate={ (values) => {

                    let errors = {};
                
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {

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
                                Al <strong>publicar</strong> la oferta laboral, esta será revisada por el administrador para verificar que cumple con las políticas del sitio, por lo tanto, no podrá ser editada hasta después de la revisión. 
                                Recibirá una notificación via email, que indicará si la oferta de empleo fue&nbsp;
                                <Badge color="info">Publicada</Badge>,&nbsp;<Badge color="info">Observada</Badge>, o <Badge color="info">Rechazada</Badge>. En seguida, podrá volver a editar la oferta de empleo y repetir el proceso si desea hacer algún cambio.
                                </p>
                            </Col>
                        </Row>
                        
                        <Row >
                            <Col xs="12" className="d-flex justify-content-end">
                                <Button className="mr-1"  color="secondary" type="button" disabled={isSubmitting}
                                onClick={(e) => {
                                    e.preventDefault();
                                    callbackCloseModalPublish();
                                }} >
                                    Cancelar
                                </Button>
                                <Button  color="success" type="button" disabled={isSubmitting} onClick={(e) => {
                                    e.preventDefault();
                                    callbackModalPublish(action);
                                }} >
                                    Rechazar
                                </Button>
                            </Col>
                        </Row>
                        
                    </FormFormik>
                    );
                }}
                </Formik>
        </React.Fragment>
           
        setOpenModal(true, '', 'Listo!', 'modal-danger', "Rechazar Publicación", content, true);
    }


}

const RulesValidation = (params) => {

    let { values, errors, state } = params;

    if(values.cbEmpleadorConficencial){
        if(!values.descripcionEmpresaConfidencial){
            errors.descripcionEmpresaConfidencial = 'Ingrese una descripción para la empresa confidencial.';
        }
    }

    if (!values.puesto) {
        errors.puesto = 'Campo Puesto / Título del Aviso es requerido.';
    }else if(values.puesto.length > 100){
        errors.puesto = 'Campo Puesto / Título del Aviso debe ser de largo máximo 1000 carácteres.';
    }

    if (!values.descripcionPuesto) {
        errors.descripcionPuesto = 'Campo Descripción es requerido.';
    }else if(values.descripcionPuesto.length > 1000){
        errors.descripcionPuesto = 'Campo Descripción debe ser de largo máximo 1000 carácteres.';
    }

    if(!values.selectCategoriaEmpleo){
        errors.selectCategoriaEmpleo = 'Debe selecccionar Área de Trabajo';
    }

    

    /*if(!values.cbDiscapacidad || values.cbDiscapacidad === undefined){
        errors.cbDiscapacidad = 'Debe indicar Sí en Apto para Personas con Discapacidad.'
    }*/
    
    /*if(!values.genero){
        errors.genero = 'Debe seleccionar Género.';
    }*/

    if(values.cbRangoEtario){
        
        if(!values.edadMinima){
            errors.edadMinima = 'Debe ingresar un valor númerico para Edad Mínima.';
        }else if(!Number.isInteger(values.edadMinima)){
            errors.edadMinima = 'Debe ingresar un valor númerico.';
        }else{
            values.edadMinima = parseInt(values.edadMinima);

            if(values.edadMinima < 18){
                errors.edadMinima = 'Edad Mínima debe ser mayor que 18.';
            }
        }
        
        if(!values.edadMaxima){
            errors.edadMaxima = 'Debe ingresar un valor númerico para Edad Máxima.';
        }else if(!Number.isInteger(values.edadMaxima)){
            errors.edadMinima = 'Debe ingresar un valor númerico.';
        }else{
            values.edadMaxima = parseInt(values.edadMaxima);

            if(values.edadMaxima < 1){
                errors.edadMaxima = 'Edad Máxima debe ser mayor que 0.';
            }else if(values.edadMaxima < values.edadMinima){
                errors.edadMaxima = 'Edad Máxima debe ser mayor que edad mínima.';
            }
        }
    }

    if(values.cbInformatica){
        if(!values.informatica || values.informatica.length <= 0){
            errors.informatica = "Debe seleccionar algún conocimiento de informática.";
        }
    }

    if(!values.placeToWork){
        errors.placeToWork = "Debe indicar si es Presencial o Remoto."
    }

    if(state.placeToWork === 1){ // Presencial

    }else if(state.placeToWork ===2){ // Remoto

        // setState({
        //     cityRemoteWork: values.ciudadRemoto,
        //     addressRemoteWork: values.direccionRemoto,
        // });

        if(!values.cbRemotoTodoMundo){
            if(
                (values.allowPlacesToWorkRemotly && (values.allowPlacesToWorkRemotly.length <= 0))
                || (state.allowPlacesToWorkRemotly.length <= 0)){
                errors.allowPlacesToWorkRemotly = "Debe asignar alguna localidad para el trabajo remoto.";
            }
        }

        /*if(!values.obsRemote){
            errors.obsRemote = "Debe indicar si hay alguna observación en la modalidad remota.";
        }*/
    }

    /**
     * Requisitos
     */
    //console.log(values.fechaComienzo);
    /**
     * Oferta
     */
    
    if(!Number.isInteger(values.vacantes)){
        errors.vacantes = "El campo Número de Vacantes debe ser un número."
    }else if(values.vacantes < 1){
        errors.vacantes = "El número de vacantes debe ser mayor a 1."
    }

    if(!values.tipoContrato){
        errors.tipoContrato = 'Debe seleccionar un Tipo de Contrato.';
    }

    if(values.jornada.length > 500){
        errors.jornada = 'Campo Jornada debe ser de largo máximo 500 carácteres.';
    }

    if(values.horario.length > 500){
        errors.horario = 'Campo Horario debe ser de largo máximo 500 carácteres.';
    }
    
    if(values.acercaContratacion.length > 1000){
        errors.acercaContratacion = 'Campo Acerca de la Contratación debe ser de largo máximo 1000 carácteres.';
    }

    if(!values.cbRentaConvenir){

        if(!values.rentaMaxima){
            errors.rentaMaxima = "El campo Renta Máxima debe ser un número mayor que cero."
        }

        if(!values.tipoMoneda){
            errors.tipoMoneda = "Debe seleccionar el Tipo de Moneda que corresponde con el pago de la renta.";
        }

        if(!values.tipoPago){
            errors.tipoPago = "Debe seleccionar el Tipo de Pago de la renta.";
        }

        if(!values.periodicidadPago){
            errors.periodicidadPago = "Debe seleccionar Periodicidad de Pago."
        }

        if(values.acercaPago.length > 1000){
            errors.acercaPago = 'Campo Acerca del Pago debe ser de largo máximo 1000 carácteres.';
        }

    }

    if(values.beneficios.length > 1000){
        errors.beneficios = 'Campo Acerca del Pago debe ser de largo máximo 1000 carácteres.';
    }
    
    return errors;
}

export { CreateJobOfferValidation, RulesValidation };
