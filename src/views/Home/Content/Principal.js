import React, { Component } from 'react';
import axios from 'axios';
import { webConfig } from '../../../GlobalConfig';

import MetaTags from 'react-meta-tags';
//import JsonLd from './JsonLd';
import { 
    //UncontrolledCarousel,
    //Badge,
     Card, 
     CardBody, 
     Col,
     Row,
     Button} from 'reactstrap';

import '../../../css/general.css';
import imageAdmOfertas from '../../../assets/img/home/administrar ofertas.png';
import imageAdmPostulaciones from '../../../assets/img/home/administrar postulaciones.png';
//import logoJobsora from '../../../assets/img/logos/jobsora.png';

import {isMobile} from 'react-device-detect';

//import logoSite from '../../../assets/img/logos/Logo-N-Empleos-194x55-px.png';
import imageBackgroundCardTop from '../../../assets/img/logos/background2.jpg';

class Principal extends Component {

    constructor(props) {
        super(props);
    
          this.state = {
            uploadStatus: false,
            file:null
          }

          
    
        this.handleUploadImage = this.handleUploadImage.bind(this);
        this.onChange = this.onChange.bind(this);

        this.itemsImages = [
            {
              src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTLb9Q6HYgaVFgxGVQkP17q9aLaGbRco88dyNH0bIJ0Sbcf01S3&usqp=CAU',
              altText: 'Slide 1',
              caption: 'Slide 1',
              header: 'Slide 1 Header',
              key: '1'
            },
            {
              src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTop-3ooTtU_4uu-n0wyPZxtfAzS0isQN5zgka1lXODcBJon45a&usqp=CAU',
              altText: 'Slide 2',
              caption: 'Slide 2',
              header: 'Slide 2 Header',
              key: '2'
            },
            {
              src: 'https://ichef.bbci.co.uk/news/1024/cpsprodpb/ABF0/production/_85961044_mcdonalds.jpg',
              altText: 'Slide 3',
              caption: 'Slide 3',
              header: 'Slide 3 Header',
              key: '3'
            }
          ];
          

    }
    
    get _images(){
        return this.itemsImages;    
    }

    set _images(value){
        this.itemsImages.push(value);
    }

    onChange(e) {
        this.setState({file:e.target.files})
    }

    handleUploadImage(ev) {

        if(!this.state.file) {

            alert("Debe seleccionar el o los archivos!");

            ev.preventDefault();

            return;
        }
        ev.preventDefault();
    
        const fileObj = 
        {
            "Title": "HOLA",
            "Body": "Hola",
            "Tags": ["Chile","Argentina","Perú"]
        };
        const data = new FormData();

        for (var i = 0; i < this.state.file.length; i++)
        {
            data.append("Files", this.state.file[i]);
        }

        //data.append('Files', this.state.file);
        data.append('json',JSON.stringify(fileObj));
    
        axios.post(webConfig.urlBaseAPI + '/api/Files/upload', data,{ 
            //timeout: 1000 * 600,
            //maxContentLength: 50000 * 1024 *1024,
            headers:{crossDomain: true,
                //'Access-Control-Allow-Origin': '*',
            },
            onUploadProgress: function(progressEvent) {

                var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total )
          
                console.log(percentCompleted)
          
              }
        })
        .then(function (response) {
            console.log(response.data);
            //this.setState({ imageURL: `http://localhost:8000/${body.file}`, uploadStatus: true });

        })
        .catch(function (error) {
            console.log(error);
        });
    }

    render() {
        return (
           
        <div className="animated fadeIn">
             <MetaTags>
                <title>{webConfig.title}</title>
                <meta property="og:type" content="website" />
                <meta name="description" content={webConfig.description} />
                <meta name="og:description" content={webConfig.description} />
                <meta property="og:title" content={webConfig.title} />
                <meta property="og:url" content={webConfig.url} />
                <meta property="og:site_name" content={webConfig.siteName} />
                <meta property="og:image" content={webConfig.imageURL} />
            </MetaTags>

            <Card>
                <CardBody style={{height: (isMobile ? "100%": "auto")}}>
                    <div style={{backgroundImage: `url(${imageBackgroundCardTop})`, 
                    height: "100%", width: "100%", backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center center", opacity: "0.15",
                    position: "absolute",
                    //zIndex: "-1",
                    top: "0", bottom: "0", left: "0", right: "0"}}></div>
                    <Row className="mb-5 mb-md-2">
                        <Col xs="12">
                            <h1 className="text-center text-primary">Portal de Empleos para Informáticos</h1>
                            <br></br>
                            <h3 className="text-center text-dark">N Empleos es un portal de empleos para informáticos que gracias a su algoritmo realiza un MATCH perfecto entre postulantes y ofertas de empleos para informáticos</h3>
                            <br></br>
                            {/* <p className="text-center text-success h4">En esta misma plataforma podrás buscar o publica tus ofertas de empleo</p>
                            <br></br> */}
                        </Col>
                       
                    </Row>

                    <Row  className="mb-1 mb-md-5">
                        <Col xs="12" md="6" className="text-center text-md-right"> 
                            <Button color="primary" size="lg" className="mb-5 mb-md-0 text-uppercase" onClick={(e) => {
                                this.props.history.push({pathname: `/buscador`});
                            }}>
                                 <div className="align-self-center">
                                     <i className="fa fa-search fa-lg"></i>&nbsp;Ver Ofertas de Trabajo
                                </div>
                                </Button>
                        </Col>
                        <Col xs="12" md="6" className="text-center text-md-left"> 
                            <Button color="dark" size="lg"  className="mb-5 mb-md-0 text-uppercase" onClick={(e) => {
                                this.props.history.push({pathname: `/area/empleador/ofertas`});
                            }}>
                                 <div className="align-self-center">
                                    <i className="fa fa-briefcase fa-lg"></i>&nbsp;Publicar Ofertas de Trabajo
                                </div>
                            </Button>
                        </Col>

                        
                    </Row>
                    
                    <Row className="mb-5 mb-md-2">
                        <Col xs="12">
                            <h3 className="text-center text-danger text-uppercase">REGISTRATE PARA PUBLICAR O POSTULAR A OFERTAS DE EMPLEO</h3>
                            <h3 className="text-center text-danger text-uppercase"><i className="fa fa-laptop fa-lg text-danger"></i></h3>
                        </Col>
                       
                    </Row>
                </CardBody>
            </Card>

            {/* <Card>
                <CardBody>
                    
                    <Row>
                        <Col xs="12">
                            <h3 className="text-justify text-uppercase text-primary text-center">¿Estas con poco tiempo para publicar tus anuncios de empleo?</h3>
                        </Col>
                        
                    </Row>

                    <Row>
                        <Col xs="12">
                            <h5 className="text-center"><i className="fa fa-check fa-lg text-primary"></i>&nbsp;No te preocupes, envíanos los datos a <Badge pill color="success">contacto@nempleos.cl</Badge> y nosotros te creamos tu perfil y anuncios de empleo para que no pierdas tiempo.</h5>
                        </Col>
                        
                    </Row>
                </CardBody>
            </Card> */}

            <Card>
                <CardBody>
                    
                    <Row>
                        <Col xs="12">
                            <h3 className="text-justify text-uppercase text-primary text-center">Accede a herramientas que facilitaran tu trabajo de selección de personal, como?</h3>
                        </Col>
                        
                    </Row>

                    <Row>
                        <Col xs="12">
                            <h5 className="text-center"><i className="fa fa-code-fork fa-lg text-danger"></i>&nbsp;Workflow para gestionar anuncios de empleos y filtros de postulantes</h5>
                        </Col>
                        
                    </Row>

                    <Row>
                        <Col xs="12" md="4">
                            <h5 className="text-center"><i className="fa fa-file-text fa-lg text-primary"></i>&nbsp;Crea y gestiona ofertas de empleo fácilmente</h5>
                        </Col>
                        <Col xs="12" md="4">
                            <h5 className="text-center"><i className="fa fa-filter fa-lg text-primary"></i>&nbsp;Gestiona las postulaciones de tus candidatos, filtra y selecciona</h5>
                        </Col>
                        <Col xs="12" md="4">
                            <h5 className="text-center"><i className="fa fa-id-badge fa-lg text-primary"></i>&nbsp;Revisa en detalle el currículum vitae de postulantes</h5>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs="12">
                            <h5 className="text-center"><i className="fa fa-google fa-lg text-primary"></i>&nbsp;Todas las ofertas de empleo son automáticamente indexadas por Google</h5>
                        </Col>
                        
                    </Row>
                </CardBody>

            </Card>


            <Card>
                <CardBody>
                    <Row>
                        <Col xs="12">
                            <h3 className="text-center text-primary">Panel de Control</h3>
                            
                        </Col>
                    </Row>

                    <Row className="mt-4">
                        <Col xs="12" md="6">
                            <h5 className="text-center text-primary">CV Actualizados</h5>
                            <p>Se recomienda mantener un CV actualizado y lo más completo posible, de esta forma nuestro motor de inteligencia artificial podrá realizar MATCH concordante entre postulantes y ofertas de empleos, de manera de asignar a cada perfil la oferta de empleo que más la satisface.</p>
                            
                        </Col>
                        <Col xs="12" md="6">
                            <h5 className="text-center text-primary">Una Oferta de Empleo Detallada</h5>
                            <p>Una oferta de empleos detallada ayuda a hacer MATCH entre los mejores perfiles y la oferta adecuada, además permite indexar de mejor manera la oferta de empleo en los buscadores, permitiendo ser encontrada entre los primeros resultados de una búsqueda.</p>
                            
                        </Col>
                    </Row>

                    <Row className="mt-4">
                        <Col xs="12" md="6">
                            <h5 className="text-center text-primary">Búsqueda de Candidatos</h5>
                            <p>N Empleos, como portal de empleo y herramienta de reclutamiento y selección de personal, potenciado con inteligencia artificial (IA), permite a los reclutadores realizar búsquedas inteligentes en la base de datos de curriculum vitae, permitiéndoles preseleccionar candidatos para sus ofertas de empleo incluso antes de publicarlas. N Empleo mediante un mecanismo de alerta notifica a los postulantes para que estos mantengan actualizado su curriculum vitae, de esta forma la plataforma realiza un MATCH inteligente entre curriculum vitae y oferta de empleo, gracias a la estructuración de ambos conjuntos de datos y nuestro algoritmo de MATCH.</p>
                            
                        </Col>
                        <Col xs="12" md="6">
                            <h5 className="text-center text-primary">Selección de Postulantes</h5>
                            <p>N Empleos, como portal de empleo y herramienta de reclutamiento y selección de personal, permite a los reclutadores filtrar y seleccionar de manera inteligente a los postulantes de cada oferta, esto gracias a nuestro algoritmo de MATCH, donde la plataforma sugiere cuales son los postulantes que mejor satisfacen la oferta de empleo. De esta forma el trabajo del reclutador es agilizado permitiéndole enfocarse en su tarea de análisis de perfiles de candidatos y dejar el trabajo de filtro de postulantes en manos de nuestro algoritmo de MATCH.</p>
                            
                        </Col>
                    </Row>

                    <Row>
                        <Col xs="12" md="6">
                            <h5 className="text-center text-primary">Gestión de Ofertas de Empleos</h5>
                            <img src={imageAdmOfertas} alt="Gestionar ofertas de empleos" className="img-fluid img-thumbnail"></img>

                        </Col>
                        <Col xs="12" md="6">
                            <h5 className="text-center text-primary">Gestión de Postulaciones</h5>
                            <img src={imageAdmPostulaciones} alt="Gestionar postulaciones a ofertas de empleo" className="img-fluid img-thumbnail"></img>

                        </Col>
                    </Row>

                </CardBody>

            </Card>

            {/* <Card>
                <CardBody>
                    <Row>
                        <Col xs="12" md="3">
                            
                            <img src={logoJobsora} alt="Gestionar ofertas de empleos" className="img-fluid img-thumbnail"></img>

                        </Col>
                        <Col xs="12" md="9" className="d-flex align-items-center">
                           
                            <a className="btn btn-success" href="https://cl.jobsora.com/" target="_blank"  rel="noopener noreferrer">Visite Jobsora</a>

                        </Col>
                    </Row>
                </CardBody>

            </Card> */}

        </div> 
        );
    }
}

export default Principal;