import React, { Component } from 'react';
import Img from 'react-image';
import loadingImage from '../../assets/img/loading.gif';
import '../../css/general.css';
import { webConfig } from '../../GlobalConfig';
//import moment from 'moment';
import MetaTags from 'react-meta-tags';
import JsonLd from './JsonLd';
import moment from 'moment-timezone';

import { 
    //Alert,
    Badge,
    Col,
    Container, 
    Row, 
    Card,
    CardBody,
    Button,
} from 'reactstrap';
import { isIterable } from 'core-js';

class CustomJobOfferPreview extends Component{

    constructor(props, context) {
        super(props, context);

        this.tz = moment.tz.guess();

        //console.log(props.dataForm);

        const jobOfferData = props.dataForm;
//#region employmentType = 'CONTRACTOR';
        let employmentType = 'CONTRACTOR';
        switch(jobOfferData.tipoContrato)
        {
            case "A Prueba luego Indefinido":  
            employmentType = 'CONTRACTOR';
            break;
            case "Part time": 
            employmentType = 'PART_TIME';
            break;
            case "Plazo Indefinido":  
            employmentType = 'FULL_TIME';
            break;
            case "Artistas":  
            employmentType = 'CONTRACTOR';
            break;
            case "Plazo Fijo":  
            employmentType = 'TEMPORARY';
            break;
            case "Reemplazo":  
            employmentType = 'CONTRACTOR';
            break;
            case "Práctica":  
            employmentType = 'INTERN';
            break;
            case "Otro":  
            employmentType = 'OTHER';
            break;
            case "Trabajadores Portuarios":  
            employmentType = 'FULL_TIME';
            break;
            case "Honorarios":  
            employmentType = 'FULL_TIME';
            break;
            case "Trabajadores Temporeros":  
            employmentType = 'FULL_TIME';
            break;
            case "Por Obra o Faena":  
            employmentType = 'FULL_TIME';
            break;
            case "Trabajadores de Casa Particular":  
            employmentType = 'FULL_TIME';
            break;
            case "Trabajadores Agrícolas":  
            employmentType = 'FULL_TIME';
            break;
            case "Formación y Aprendizaje":  
            employmentType = 'CONTRACTOR';
            break;
            default: break;
        }
//#endregion
        

        let periodicidadPago = 'MONTH';
        switch(jobOfferData.periodicidadPago){
            case "Mensual":
                periodicidadPago = 'MONTH';
                break;
            case "Diario":
                periodicidadPago = 'DAY';
                break;
            case "Semanal":
                periodicidadPago = 'WEEK';
                break;
            case "Por Horas":
                periodicidadPago = 'HOUR';
                break;
            case "Anual":
                periodicidadPago = 'YEAR';
                break;
            case "Otro":
                periodicidadPago = 'MONTH';
                break;
            default: break;
        }

        this.jsonInfoJobOffer = 
        {
            "@context" : "https://schema.org/",
            "@type" : "JobPosting",
            "title" : jobOfferData.puesto,
            "description" : `<p>${jobOfferData.descripcionPuesto}</p>`,
            "identifier": {
                "@type": "PropertyValue",
                "name": jobOfferData.empresa,
                "value": jobOfferData.id
            },
            "datePosted" : moment(jobOfferData.fechaPublicado).tz(this.tz).toISOString(),
            "validThrough" : moment(jobOfferData.fechaPublicado).tz(this.tz).add(1, 'months').toISOString(),
            "employmentType" : employmentType,
            
            
            "baseSalary": {
                "@type": "MonetaryAmount",
                "currency": jobOfferData.tipoMoneda,
                "value": {
                "@type": "QuantitativeValue",
                "value": jobOfferData.rentaMaxima,
                "unitText": periodicidadPago
                }
            }
        }
        ;

        if(jobOfferData.placeToWork === 2){
            this.jsonInfoJobOffer.jobLocationType = "TELECOMMUTE";
        }else{
            this.jsonInfoJobOffer.jobLocation = {
                "@type": "Place",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": jobOfferData.direccionPresencial ? jobOfferData.direccionPresencial : "",
                    "addressLocality": "," + jobOfferData.selectPresencialComuna,
                    "addressRegion": jobOfferData.selectPresencialRegion,
                    ///"postalCode": "8340518", //Chile
                    "addressCountry": jobOfferData.selectPresencialPais
                }
            };
        }

        if(jobOfferData.bPersonaJuridica){
            this.jsonInfoJobOffer.hiringOrganization = {
                "@type" : "Organization",
                "name" : jobOfferData.empresa,
                "sameAs" : jobOfferData.urlEmpresa,
                "logo" : jobOfferData.urlImgAvatar
            };
        }else{
            this.jsonInfoJobOffer.hiringOrganization = {
                "@type" : "Organization",
                "name" : "Particular",
                "sameAs" : "Persona Natural"
            };
        }
        
        this.state = {
            ...props.dataForm,
            onClick_Postular: props.onClick_Postular,
        };

       

    }

    componentDidMount(){

    }
    
    render(){

        return(
            <Container>
                 <MetaTags>
                    <title>{this.state.puesto + " | " + webConfig.title}</title>
                    <meta property="og:type" content={"website"} />
                    <meta name="title" content={this.state.puesto + " | " + webConfig.title} />
                    <meta name="description" content={this.state.descripcionPuesto} />
                    <meta name="og:description" content={this.state.descripcionPuesto} />
                    <meta property="og:title" content={this.state.puesto + " | " + webConfig.title} />
                    <meta property="og:url" content={window.location.href} />
                    {/* <meta property="og:image" content={this.state.urlImgAvatar} /> */}
                    <meta property="og:image" content={webConfig.imageURL} />
                    <meta property="og:site_name" content={webConfig.siteName} />
                    {
                        this.jsonInfoJobOffer && 
                        <JsonLd data={this.jsonInfoJobOffer} />
                    }
                </MetaTags>

                
                <Card>
                    <CardBody>

                    
                <Row> 
                    <Col xs="12">
                        <small>{this.state.categoriaEmpleo}</small>   
                    </Col>
                    
                </Row>
                <Row> 
                    <Col xs="12">
                        <h3>{this.state.puesto}</h3>
                        
                        <div className="d-flex flex-wrap">
                            { this.state.bDiscapacidad && 
                                <div>
                                    <h5><Badge color="info" pill><i className="fa fa-wheelchair">&nbsp;</i>Inclusión</Badge><span>&nbsp;</span></h5>
                                </div>
                            }
                            {   this.state.placeToWork === 2 ? 
                                <div>
                                    <h5><Badge color="warning" pill><i className="fa fa-paper-plane-o">&nbsp;</i>Remoto </Badge><span>&nbsp;</span></h5>
                                </div> 
                            : 
                                <div>
                                    <h5><Badge color="danger" pill><i className="fa fa-building-o">&nbsp;</i>Presencial</Badge><span>&nbsp;</span></h5>
                                </div>
                            }
                            { this.state.bDisponibilidadInmediata && 
                                <div>
                                    <h5><Badge color="success" pill><i className="fa fa-thumbs-o-up">&nbsp;</i>Disponibilidad inmediata</Badge><span>&nbsp;</span></h5>
                                </div>
                            }
                            { this.state.bHorarioFlexible && 
                                <div>
                                    <h5><Badge color="primary" pill><i className="fa fa-clock-o">&nbsp;</i>Horario Flexible</Badge><span>&nbsp;</span></h5>
                                </div>
                            }
                            { this.state.bHomeOffice && 
                                <div>
                                    <h5><Badge color="secondary" pill><i className="fa fa-home">&nbsp;</i>Home Office</Badge><span>&nbsp;</span></h5>
                                </div>
                            }
                            { !this.state.bPersonaJuridica ? 
                                <div>
                                    <h5><Badge color="success" pill><i className="fa fa-user">&nbsp;</i>Empleador Persona Natural</Badge><span>&nbsp;</span></h5>
                                </div>
                                : null
                            }
                        </div>
                    </Col>
                </Row>
                
                

                { 
                    
                    <>
                        <div className="line-separator">
                        </div>
                        <Row className="d-flex"> 
                            <Col xs="12" className="d-flex justify-content-start ">
                                {!this.state.bEmpleadorConficencial ? 
                                    <Img 
                                        className="img-avatar  mr-2"
                                        style={{maxHeight:"100px" , borderRadius: "0px"}}
                                        src={[this.state.urlImgAvatar, loadingImage]}
                                        loader={<img src={loadingImage} className="img-avatar" alt={this.state.empresa}  ></img>}
                                    ></Img>
                                    : null
                                }
                                
                                <h4 className="align-self-center">{this.state.empresa}</h4>
                            </Col>
                        </Row>
                        <div className="line-separator">
                        </div>
                    </> 
                }
                
                
                <Row> 
                    <Col xs="12">
                    {
                                this.state.fechaPublicado &&
                                <div className="mb-2">
                                <span><em>Fecha de Publicación&nbsp;</em><Badge pill color="danger">{moment(this.state.fechaPublicado).tz(this.tz).format('DD/MM/YYYY, HH:mm:ss') }</Badge></span>
                                </div>
                            }
                        <p className="text-justify" style={{whiteSpace: "pre-wrap"}}>
                            <strong>Descripción</strong><br></br>
                            {this.state.descripcionPuesto}
                        </p>
                    </Col>
                </Row>
                <Row hidden={(!(isIterable(this.state.informatica) && this.state.informatica.length) && !this.state.bDisponibilidadViajar && !this.state.bSalidaTerreno && !this.state.bCambioResidencia && !this.state.fechaComienzo)   }> 
                    <Col xs="12">
                        <strong>Requisitos Generales</strong><br></br>
                       

                            { 
                                isIterable(this.state.informatica) && this.state.informatica.length ? 
                                <div className="mb-2"><span><em>Informática: </em></span> {this.state.informatica.join(', ') + "."}</div>
                                : null
                            }
                            
                       <div className="mb-2" hidden={ !this.state.bDisponibilidadViajar && !this.state.bSalidaTerreno && !  this.state.bCambioResidencia}>
                            {
                                this.state.bDisponibilidadViajar && 
                                <><i className="fa fa-check text-success">&nbsp;</i><span>Disponibilidad para viajar</span>&nbsp;
                                </>
                            }
                            {
                                this.state.bSalidaTerreno &&  
                                <><i className="fa fa-check text-success">&nbsp;</i><span>Salidas a terreno</span>&nbsp;
                                </>
                            }
                            {
                                this.state.bCambioResidencia &&  
                                <><i className="fa fa-check text-success">&nbsp;</i><span>Disponibilidad cambio de residencia</span>&nbsp;
                                </>
                            }
                        </div>
                        
                            {
                                this.state.fechaComienzo &&
                                <div className="mb-2">
                                <span><em>Fecha de contratación&nbsp;</em><Badge pill color="info">{moment(this.state.fechaComienzo).tz(this.tz).utcOffset(webConfig.utcOffset).format('D MMMM YYYY') }</Badge></span>
                                </div>
                            }
                        
                    </Col>
                </Row>
                {/* Requisitos específicos */}
                <Row>
                    <Col xs="12">
                        <span style={{whiteSpace: "pre-wrap"}}><strong>Requisitos Específicos</strong></span>

                        <div>

                            {
                                isIterable(this.state.profesiones) && this.state.profesiones.length > 0 &&
                                <div className="mb-2">
                                    <span><em>Carreras: </em></span>
                                    {this.state.profesiones.join(', ')}
                                    
                                </div>
                            } 
                        </div>

                        <div>
                            {
                                isIterable(this.state.nivelEducacional) && this.state.nivelEducacional.length > 0 &&
                                <div className="mb-2">
                                    <span><em>Formación académica miníma: </em></span>
                                    {this.state.nivelEducacional.join(', ')}
                                </div>
                            }
                        </div>
                        <div>
                            {
                                this.state.situacionActualMinima &&
                                <div className="mb-2">
                                    <span><em>Situación académica mínima: </em></span>
                                    {this.state.situacionActualMinima}
                                </div>
                            }
                        </div>
                        <div>
                            {
                                isIterable(this.state.experiencies) && this.state.experiencies.length > 0  &&
                                <>
                                    <span><em>Conocimientos / Experiencias</em></span>
                                    <ul>
                                    {this.state.experiencies.map((item,index) =>{

                                        return(
                                            <li key={index} >
                                                {item.experience }, {item.time}
                                            </li>
                                        )
                                    })}
                                    </ul>
                                </>
                            }
                        </div>
                        <div>
                            {
                                (isIterable(this.state.idiomsRequire) && this.state.idiomsRequire.length) > 0  ?
                                <>
                                    <span><em>Idioma(s)</em></span>
                                    <ul>
                                    {this.state.idiomsRequire.map((item,index) =>{

                                        return(
                                            <li key={index} >
                                                {item.idiom }, {item.nivel}
                                            </li>
                                        )
                                    })}
                                    </ul>
                                </>
                                : null
                            }
                        </div>
                        <div>
                            {
                                this.state.aspectosPersonales &&
                                <div style={{whiteSpace: "pre-wrap"}} className="mb-2">
                                    <span><em>Aspectos personales / Habilidades blandas: </em></span>
                                    {this.state.aspectosPersonales}
                                    
                                </div>
                            }
                        </div>
                        <div>
                            {
                                this.state.otrosRequisitos &&
                                
                                <div style={{whiteSpace: "pre-wrap"}} className="mb-2">
                                    <span><em>Otros requisitos: </em></span>
                                    {this.state.otrosRequisitos}
                                    
                                </div>
                                
                            }
                        </div>
                    </Col>
                </Row>

                {/* Lugar de Trabajo */}
                <Row> 
                    <Col xs="12">
                        <span style={{whiteSpace: "pre-wrap"}}><strong>Lugar de Trabajo</strong></span>
                        
                        { 
                            this.state.placeToWork === 2 ?
                            <>
                                <div>
                                    { this.state.bRemotoTodoMundo && <span><i className="fa fa-check text-success">&nbsp;</i>De cualquier parte del mundo</span> }
                                </div>
                                <div className="mb-2">
                                    {
                                        !this.state.bRemotoTodoMundo &&

                                            this.state.allowPlacesToWorkRemotly.map((item,index) =>{

                                            return(
                                                <div key={index} >
                                                    <i className="fa fa-check text-success">&nbsp;</i>
                                                    <em>País:&nbsp;</em>{item.country}
                                                    {   item.region && 
                                                        <><em>, Región:&nbsp;</em><span>{item.region}</span></>
                                                    }
                                                    {   item.commune && 
                                                        <><em>, Comuna:&nbsp;</em><span>{item.commune}</span></>
                                                    }
                                                    {   item.cityRemoteWork && 
                                                        <><em>, Ciudad:&nbsp;</em><span>{item.cityRemoteWork}</span></>
                                                    }
                                                    {   item.addressRemoteWork && 
                                                        <><em>, Dirección:&nbsp;</em><span>{item.addressRemoteWork}</span></>
                                                    }
                                                
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <div>
                                    {
                                        this.state.obsRemote &&
                                        <>
                                            <span style={{whiteSpace: "pre-wrap"}}><u>Observaciones</u></span>
                                            <p className="text-justify" style={{whiteSpace: "pre-wrap"}}>{this.state.obsRemote   }</p>
                                        </>
                                    }
                                    
                                </div>
                            </> : null
                        }
                        {
                            this.state.placeToWork === 1 ?
                            <>
                                <div className="mb-2">
                                    <i className="fa fa-check text-success">&nbsp;</i>
                                    <em>País:&nbsp;</em>{this.state.selectPresencialPais}
                                    {   this.state.selectPresencialRegion && 
                                        <><em>, Región:&nbsp;</em><span>{this.state.selectPresencialRegion}</span></>
                                    }
                                    {   this.state.selectPresencialComuna && 
                                        <><em>, Comuna:&nbsp;</em><span>{this.state.selectPresencialComuna}</span></>
                                    }
                                    {   this.state.ciudadPresencial && 
                                        <><em>, Ciudad:&nbsp;</em><span>{this.state.ciudadPresencial}</span></>
                                    }
                                    {   this.state.direccionPresencial && 
                                        <><em>, Dirección:&nbsp;</em><span>{this.state.direccionPresencial}</span></>
                                    }
                                
                                </div>
                                <div>
                                    {
                                        this.state.obsPresencial &&
                                        <>
                                            <span style={{whiteSpace: "pre-wrap"}}><u>Observaciones</u></span>
                                            <p className="text-justify" style={{whiteSpace: "pre-wrap"}}>{this.state.obsPresencial   }</p>
                                        </>
                                    }
                                    
                                </div>
                            </> : null
                        }
                       
                    </Col>
                </Row>
                
                {/* Oferta */}
                <Row>
                    <Col xs="12">
                        <span style={{whiteSpace: "pre-wrap"}}><strong>Oferta</strong></span>
                        {
                            this.state.vacantes &&
                            <div className="mb-2">
                                <span><em>Vacantes: </em></span>
                                {this.state.vacantes}   
                            </div>
                        } 
                        
                        {
                            this.state.tipoContrato &&
                            <div className="mb-2">
                                <span><em>Tipo de Contrato: </em></span>
                                {this.state.tipoContrato}
                            </div>
                        }

                        {
                            this.state.jornada &&
                            <div className="mb-2">
                                <span><em>Jornada: </em></span>
                                {this.state.jornada}
                            </div>
                        }

                        {
                            this.state.horario &&
                            <div className="mb-2">
                                <span><em>Horario: </em></span>
                                {this.state.horario}
                            </div>
                        }

                        {
                            this.state.acercaContratacion &&
                            <div className="mb-2">
                                <span><em>Contratación: </em></span>
                                {this.state.acercaContratacion}
                            </div>
                        }

                        {
                            this.state.bRentaConvenir &&
                            <div className="mb-2"><i className="fa fa-check text-success">&nbsp;</i><span>Renta a convenir</span>&nbsp;
                            </div>
                        }
                        {
                            this.state.bMostrarRenta &&
                            <div className="mb-2">
                                 <span><em>Renta: </em>
                                 { new Intl.NumberFormat('es-CL', {
                                        style: 'currency',
                                        currency: 'CLP'
                                    }).format(this.state.rentaMaxima )}&nbsp;
                                 {this.state.tipoMoneda}&nbsp;
                                 {this.state.tipoPago}&nbsp;
                                 {this.state.periodicidadPago}&nbsp;
                                 </span>
                            </div>
                        }
                        {
                            this.state.acercaPago &&
                            <div style={{whiteSpace: "pre-wrap"}} className="mb-2">
                                <span><em>Acerca del pago: </em></span>
                                {this.state.acercaPago}
                                
                            </div>
                        }
                        {
                            this.state.beneficios &&
                            <div style={{whiteSpace: "pre-wrap"}} className="mb-2">
                                <span><em>Beneficios: </em></span>
                                {this.state.beneficios}
                                
                            </div>
                        }
                        
                    </Col>
                </Row>
                <Row>
                    <Col xs="12">
                       

                        {
                                isIterable(this.state.questionsList) && this.state.questionsList.length > 0  &&
                                <div>
                                     <span style={{whiteSpace: "pre-wrap"}}><strong>Otros</strong></span>
                                    <div><em>Pregunta(s) al postulante</em></div>
                                    <ul>
                                    {this.state.questionsList.map((item,index) =>{

                                        return(
                                            <li key={index} >
                                                {item }
                                            </li>
                                        )
                                    })}
                                    </ul>
                                </div>
                            }
                    </Col>
                </Row>
                { this.props.onClick_Postular &&
                <Row>
                    <Col xs="12">
                        <div className="d-flex justify-content-center mb-5">
                            <Button color="success" type="button"  onClick={(e) => { 
                                    if(this.state.id){
                                        this.props.onClick_Postular(e, {idJobOffer: this.state.id });
                                    }
                                }} >
                                <div className="align-self-center">
                                    <span role="img" aria-label="Previsualizar Oferta de Empleo">💼</span>&nbsp;Postular al Empleo
                                </div>
                            </Button>
                        </div>
                    </Col>
                </Row>
                }
                </CardBody>
                
                </Card>
            </Container>
        )
    }
}

export default CustomJobOfferPreview;
