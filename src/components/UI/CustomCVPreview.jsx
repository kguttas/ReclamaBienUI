import React, { Component } from 'react';
import Img from 'react-image';
import loadingImage from '../../assets/img/loading.gif';
import '../../css/general.css';
import { webConfig } from '../../GlobalConfig';
//import moment from 'moment';
import moment from 'moment-timezone';
import esLocale from 'moment/locale/es';
import { 
    //Alert,
    Badge,
    
    Col,
    Container, 
    Row,
    Card, CardBody
} from 'reactstrap';
import { isIterable } from 'core-js';

export default class CustomCVPreview extends Component {

    constructor(props, context) {
        super(props, context);
        
        this.state = {
            ...props.dataForm,
            postulant: {...props.postulant}
        };

        //console.log(this.state);
        moment.updateLocale("es", esLocale);

        this.tz = moment.tz.guess();
    }

    render() {

        const pos = {...this.state.postulant}
        let edad = 0;

        if(pos && pos.fechaNacimiento){
            let now = moment();
            let end =  moment(pos.fechaNacimiento); // another date
            let duration = moment.duration(now.diff(end));

            //let months = Math.floor(duration.asMonths() % 12);
            let years = Math.floor(duration.asYears());
            edad = years;
        }
        
        const urlAvatar = pos.urlImagen ? `${webConfig.urlImages}/${pos.urlImagen}` : null;

        const { titulo, descripcion, experienciaLaboral, educacion ,
            cbInformatica, conocimientosInformatica, otrosConocimientos, idiomas, aspectosPersonales,
            bDisponibilidadViajar,
            bSalidaTerreno,
            bCambioResidencia,
            bTurnos,
            bDisponibilidadInmediata,
            fechaComienzo,
            bHomeOffice,
            bHorarioFlexible,
            bRentaConvenir,
            rentaMinima,
            tipoMoneda,
            tipoPago,
            periodicidadPago
        } = this.state;
        return (
            <Container>
                <Row className="line-separator">
                    <Col xs="12">
                        <Row>
                            <Col xs="12" md="3" className="d-flex justify-content-start align-items-center">
                                <Img 
                                    className="img-avatar"
                                    style={{maxHeight:"100px" , borderRadius: "0px"}}
                                    src={[urlAvatar, loadingImage]}
                                    loader={<img src={loadingImage} className="img-avatar" alt={pos.nombrePersona + " " + pos.apellidoPersona}  ></img>}
                                ></Img>
                            </Col>
                            <Col xs="12" md="9" className="align-top mt-2">
                                <div>{`Nombre: ${pos.nombrePersona + " " + pos.apellidoPersona}`}</div>
                                    <div>{edad > 0 ? `Edad: ${edad} años` : ``}</div>
                                    <div>{pos.telefono ? `Teléfono: ${pos.telefono}` : ``}</div>
                                    <div>{pos.celular ? `Celular: ${pos.celular}` : ``}</div>
                                    <div>{pos.email ? `Email: ${pos.email}` : ``}</div>
                                    <div>
                                        {pos.pais ? pos.pais + (pos.region ? ", Región " + pos.region + (pos.comuna ? ", Comuna de " + pos.comuna : (pos.ciudad ? ", Cuidad de " + pos.ciudad : ``)) : ``) : ``}
                                    </div>
                                    <div>
                                        {
                                            this.state.fechaUltimaActualizacion &&
                                            <div className="mb-2">
                                            <span><em>Última actualización&nbsp;</em><Badge pill color="danger">{moment(this.state.fechaUltimaActualizacion).tz(this.tz).format('DD/MM/YYYY, HH:mm:ss') }</Badge></span>
                                            </div>
                                        }
                                    </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className="line-separator"> 
                    <Col xs="12">
                        <h3 className="mt-2">{titulo}</h3>
                    </Col>
                </Row>
                <Row> 
                    <Col xs="12">
                        <h5>Extracto</h5>
                        { descripcion ? 
                        <p className="text-justify" style={{whiteSpace: "pre-wrap"}}>
                            {descripcion}
                        </p>
                        : null
                        }
                       
                    </Col>
                </Row>
                <Row>
                    <Col  xs="12"><h5>Experiencia</h5></Col>
                
                {
                    isIterable(experienciaLaboral) && experienciaLaboral.length ?
                     
                        experienciaLaboral.map((item, index) =>{
                            
                            let now = moment(item.fechaTermino); //todays date
                            let end = moment(item.fechaInicio); // another date
                            let duration = moment.duration(now.diff(end));
                            
                            let months = Math.floor(duration.asMonths() % 12);
                            let years = Math.floor(duration.asYears());

                            return (
                                <Col xs="12" key={index}>
                                    
                                    <Card>
                                        
                                        <CardBody>
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
                                                    <p className="line-separator">
                                                        {item.descripcion}
                                                    </p>
                                                </Col>
                                                
                                            </Row>
                                            
                                        </CardBody>
                                        
                                    </Card>
                                </Col>
                            )
                        })
                    
                    : null
                } 
                                        
                </Row>
                <Row>
                    <Col  xs="12"><h5>Educación</h5></Col>
                    {
                        isIterable(educacion) && educacion.length ?
                        
                        educacion.map((item, index) =>{
                            
                                let now = item.cbActualmente ? moment() : moment(item.fechaTermino); //todays date
                                let end =  moment(item.fechaInicio); // another date
                                let duration = moment.duration(now.diff(end));
                                
                                let months = Math.floor(duration.asMonths() % 12);
                                let years = Math.floor(duration.asYears());
                                return (
                                    <Col xs="12" key={index}>
                        
                                        <Card>
                                        <CardBody>
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
                                                        <p className="line-separator">
                                                            {item.descripcion}
                                                        </p>
                                                    </Col>
                                                    
                                                </Row>
                                            
                                                
                                            </CardBody>
                                            
                                        </Card>
                        
                                    </Col>
                                );
                            })
                        : null
                    }
                </Row>
                
                <Row>
                    <Col  xs="12">
                        <h5>Otros Conocimientos</h5>
                        <div>{ isIterable(otrosConocimientos) && otrosConocimientos.length > 0 ? 
                        <>
                            <ul>
                            { 
                                otrosConocimientos.map((item, index) => {
                                    return(
                                        <li key={index} >
                                            { item.experience }, { item.time }
                                        </li>

                                    );
                                })
                            }
                            </ul>
                        </>
                        : null}</div>
                        <div>{cbInformatica ? 
                        <>
                            <h6>Conocimientos básicos de informática</h6>
                            <ul>
                            { 
                                
                                conocimientosInformatica.map((item, index) => {
                                    return(
                                        <li key={index} >
                                            { item.label }
                                        </li>

                                    );
                                })
                            }
                            </ul>
                        </>
                        : null}</div>

                        <div>
                            {(isIterable(idiomas) && idiomas.length > 0) ? 
                        <>
                            <h6>Idioma(s)</h6>
                            <ul>
                            { 
                                
                                idiomas.map((item, index) => {
                                    return(
                                        <li key={index} >
                                            {item.idioma }, {item.nivel}
                                        </li>

                                    );
                                })
                            }
                            </ul>
                        </>
                        : null}</div>

                        <div>{ aspectosPersonales ? 
                        <>
                            <h6>Aspectos personales / Habilidades blandas</h6>
                            <p>
                            { aspectosPersonales }
                            </p>
                        </>
                        : null}</div>


                        
                        
                    </Col>
                </Row>
                    
                <Row>
                    <Col xs="12">
                    <h5>Disponibilidad(es)</h5>
                    <div>
                            
                            <div className="mb-2" hidden={ !bDisponibilidadViajar && !bSalidaTerreno && !bCambioResidencia && !bTurnos && !bDisponibilidadInmediata && !bHomeOffice && !bHorarioFlexible}>
                            {
                                bDisponibilidadViajar && 
                                <><i className="fa fa-check text-success">&nbsp;</i><span>Disponibilidad para viajar</span>&nbsp;
                                </>
                            }
                            {
                                bSalidaTerreno &&  
                                <><i className="fa fa-check text-success">&nbsp;</i><span>Salidas a terreno</span>&nbsp;
                                </>
                            }
                            {
                                bCambioResidencia &&  
                                <><i className="fa fa-check text-success">&nbsp;</i><span>Disponibilidad cambio de residencia</span>&nbsp;
                                </>
                            }
                            {
                                bTurnos &&  
                                <><i className="fa fa-check text-success">&nbsp;</i><span>Disponibilidad para turnos</span>&nbsp;
                                </>
                            }  
                            {
                                bDisponibilidadInmediata &&  
                                <><i className="fa fa-check text-success">&nbsp;</i><span>Disponibilidad inmediata</span>&nbsp;
                                </>
                            }  
                            {
                                bHomeOffice &&  
                                <><i className="fa fa-check text-success">&nbsp;</i><span>Disponibilidad Home Office</span>&nbsp;
                                </>
                            }  
                            {
                                bHorarioFlexible &&  
                                <><i className="fa fa-check text-success">&nbsp;</i><span>Disponibilidad horario flexible</span>&nbsp;
                                </>
                            }
                        </div>
                        
                        {
                            !bDisponibilidadInmediata && fechaComienzo &&
                            <div className="mb-2">
                            <span><em>Fecha para comenzar&nbsp;</em><Badge pill color="info">{moment(fechaComienzo).tz(this.tz).format('D MMMM YYYY') }</Badge></span>
                            </div>
                        }
                        
                    </div>
                    </Col>
                </Row>
                
                {/* Renta */}
                <Row>
                    <Col xs="12">
                        <h5>Renta</h5>
                        
                        
                        {
                            !bRentaConvenir &&
                            <div className="mb-2">
                                 
                                 { rentaMinima ? new Intl.NumberFormat('es-CL', {
                                        style: 'currency',
                                        currency: 'CLP'
                                    }).format(rentaMinima) : null
                                }&nbsp;
                                 
                                 {tipoMoneda ? tipoMoneda.label : ''}&nbsp;
                                 
                                 {tipoPago ? tipoPago.label: ''}&nbsp;
                                 
                                 {periodicidadPago ? periodicidadPago.label : ''}&nbsp;
                                
                            </div>
                        }
                        {
                            bRentaConvenir &&  
                            <><i className="fa fa-check text-success">&nbsp;</i><span>A convenir</span>&nbsp;
                            </>
                        }
                        
                    </Col>
                </Row>
                
            </Container>
        )
    }
}
