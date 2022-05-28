import React, {Component} from 'react';
import { Col, Row, Card, CardHeader, CardBody, Button, Collapse, CardFooter, Badge } from 'reactstrap';
import { connect } from 'react-redux';
import { webConfig } from '../../../GlobalConfig';
import Img from 'react-image';
import loadingImage from '../../../assets/img/loading.gif'
import { getJobsOffersPublics } from '../../../actions/jobsOffersActions';
import MetaTags from 'react-meta-tags';
import { customPaginator } from '../../../components/UI/CustomPaginator';
import CustomFilterForPublicJobsOffers from '../../../components/UI/CustomFilterForPublicJobsOffers';
import {isMobile} from 'react-device-detect';
import esLocale from 'moment/locale/es';
import moment from 'moment-timezone';
import { initFilter } from '../../../configs/JobsOffers'

class JobsOffers extends Component {

    constructor(props) {
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

        moment.updateLocale("es", esLocale);

        this.tz = moment.tz.guess();

        //console.log(this.props.params);

        let pageSize = 5,//this.props.params ? this.props.params.pageSize : 5,
        urlViewJobOffer = this.props.params && this.props.params.urlViewJobOffer ? this.props.params.urlViewJobOffer : '/buscador/oferta/';

        this.urlViewJobOffer = urlViewJobOffer;
        this.pageNumber = 1;
        this.pageSize = pageSize;
        this.keySearch = "";
        this.searchStartDate = moment().tz('America/Santiago').add(-4*12, 'M'); // .add(-7, 'days');
        this.searchEndDate = moment().tz('America/Santiago');
        this.bShowDisability = false;
        this.bShowRemote = true;

        this.dataFilterJobsOffers = {
            id: null, 
            pageSize: this.pageSize, 
            pageIndex: this.pageNumber - 1, 
            keySearch: this.keySearch, 
            startDate: this.searchStartDate,
            endDate: this.searchEndDate,
            sortField: null, 
            sortOrder: null,
            idCountry: initFilter.idCountry.value,
            selectedCountry: initFilter.idCountry,
            idRegion: null,
            selectedRegion: null,
            idCommune: null,
            selectedCommune: null,
            bShowDisability: this.bShowDisability,
            bShowRemote: this.bShowRemote,
            initFilteridCountry: initFilter.idCountry,
        };

        this.resetValuesFilter = {...this.dataFilterJobsOffers};


        if(initFilter.stateFilter){

            //console.log(initFilter.stateFilter);

            this.dataFilterJobsOffers = {
                ...initFilter.stateFilter, 
                pageSize: this.dataFilterJobsOffers.pageSize,
                pageNumber: this.dataFilterJobsOffers.pageIndex + 1
            };

            this.pageNumber = this.dataFilterJobsOffers.pageIndex + 1;
            this.pageSize = this.dataFilterJobsOffers.pageSize;
            
        }else{
            //console.log(this.dataFilterJobsOffers);
            initFilter.stateFilter = {...this.dataFilterJobsOffers};
        }

        this.state = {  
            /*
            Filter
            */
            collapseFilter: !isMobile,
            pageNumber: this.pageNumber,
            pageSize: this.pageSize,
            keySearch: this.keySearch ,
            searchStartDate: this.searchStartDate ,
            searchEndDate: this.searchEndDate,
            /*
            List data result
            */
            
            dataJobsOffer: [],
            totalRegister: 0
        };

        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleSizePageChange = this.handleSizePageChange.bind(this);

        this.onClickSearchText = this.onClickSearchText.bind(this);
        this.onClickGoTojobOffer = this.onClickGoTojobOffer.bind(this);
    }

    /*
    Lifecycle
    */
    componentDidMount() {
        //console.log(this.dataFilterJobsOffers)


        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
            // dev code
        } else {
            // production code
            
            
        }

        this.dataFilterJobsOffers.pageIndex = 0;
        this.props.getJobsOffersPublics(this.dataFilterJobsOffers);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
    
        if(nextProps.jobsOffersList !== prevState.jobsOffersList){
            return { jobsOffersList: nextProps.jobsOffersList};
        }
        else return null;
    }
    
    componentDidUpdate(prevProps, prevState) {

        if (prevState.jobsOffersList !== this.state.jobsOffersList) {
          
            if(this.state.jobsOffersList && this.state.jobsOffersList.data && this.state.jobsOffersList.data.data){
                
                //console.log(this.state.jobsOffersList.data.data);
                window.scrollTo(0, 0);
                this.setState({
                    dataJobsOffer: [...this.state.jobsOffersList.data.data],
                    totalRegister: this.state.jobsOffersList.data.itemsCount
                });
            }
        }

        if(prevProps.params !== this.props.params){
            console.log(this.props.params);

            this.pageSize = this.props.params.pageSize;
            this.urlViewJobOffer = this.props.params.urlViewJobOffer;
        }

    }

    /*
    Events UI controls
    */

    onClickGoTojobOffer = (e, idJobOffer) =>{

      

        if(idJobOffer){
            initFilter.stateFilter = {...this.dataFilterJobsOffers};

            const jobOfferData = this.state.dataJobsOffer.find( item => item.id === idJobOffer);

            //console.log(jobOfferData);

            this.props.history.push({
                pathname: `${this.urlViewJobOffer + idJobOffer}`,
                //search: '?idJobOffer=' + row.idGuid,
                state: { 
                    idJobOffer: idJobOffer,
                    jobOfferData
                }
            });
        }
    }

    /*
    Events Paginator
    */

    handlePageChange(pageNumber, pageSize) {

        this.setState({
            pageNumber: pageNumber,
            pageSize: pageSize
        });

        this.dataFilterJobsOffers = {...this.dataFilterJobsOffers};
        this.dataFilterJobsOffers.pageIndex = pageNumber - 1;
        this.dataFilterJobsOffers.pageSize = pageSize;
        
        this.props.getJobsOffersPublics(this.dataFilterJobsOffers);
    }

    handleSizePageChange(pageNumber, pageSize){
        
        this.setState({
            pageNumber: pageNumber,
            pageSize: pageSize
        });

        this.dataFilterJobsOffers = {...this.dataFilterJobsOffers};
        this.dataFilterJobsOffers.pageIndex = pageNumber - 1;
        this.dataFilterJobsOffers.pageSize = pageSize;

        this.props.getJobsOffersPublics(this.dataFilterJobsOffers);
    }

    /*
    Callback for filter
    */

    onClickSearchText = (filter) => {

        this.setState(prevState => ({
            ...prevState,
            pageNumber: 1
        }));
        
        this.dataFilterJobsOffers = {...filter};
        
        this.dataFilterJobsOffers.pageIndex = 0; // indexPage del servicio comienza en 0, y el indexPage del paginador en 1

        this.props.getJobsOffersPublics(this.dataFilterJobsOffers);

    }

   onClickClearFilter = (filter) => {
        //console.log(filter);
        this.setState(prevState => ({
            ...prevState,
            pageNumber: filter.pageIndex + 1,
            pageSize: filter.pageSize,
           
        }));
        
        this.dataFilterJobsOffers = {...filter};
       
        this.dataFilterJobsOffers.pageIndex = 0; // indexPage del servicio comienza en 0, y el indexPage del paginador en 1

        this.props.getJobsOffersPublics(this.dataFilterJobsOffers );

        initFilter.stateFilter = null;
    }

    render() {

        const dataToShow = [...this.state.dataJobsOffer];
        
        return (
            <div className="animated fadeIn">
                <MetaTags>
                    <title>{"BUSCAR OFERTAS DE EMPLEO | " + webConfig.title}</title>
                    <meta property="og:type" content="website" />
                    <meta name="description" content={webConfig.description} />
                    <meta name="og:description" content={webConfig.description} />
                    <meta property="og:title" content={webConfig.description} />
                    <meta property="og:url" content={webConfig.url} />
                    <meta property="og:site_name" content={webConfig.siteName} />
                    <meta property="og:image" content={webConfig.imageURL} />
                </MetaTags>
                <div className="h3 mx-2">Ofertas de Trabajo</div>
                
                
                <Row>
                    <Col xs="12" md="12" sm="12" lg="4" xl="4">
                        
                        <Card>
                            <CardHeader>

                                <Row>
                                    <Col className="align-self-center">
                                        <strong className="h4">Filtros</strong>
                                    </Col>
                                    <Col> 
                                    <div className="card-header-actions">
                                        <Button color="info" block={isMobile} onClick={(e) => { this.setState({collapseFilter: !this.state.collapseFilter}) }} > 
                                            <div className="align-self-center">
                                                <i className="fa fa-filter"></i>  &nbsp;                                                    
                                                Filtros
                                            </div>
                                        </Button>
                                        </div>
                                    </Col>
                                </Row>
                                
                            </CardHeader>
                            <Collapse isOpen={this.state.collapseFilter} >
                            <CardBody>
                            
                                <CustomFilterForPublicJobsOffers
                                    resetValuesFilter={{...this.resetValuesFilter}}
                                    dataFilter={{...this.dataFilterJobsOffers}}
                                    onClickSearchText={this.onClickSearchText}
                                    onClickClearFilter={this.onClickClearFilter}
                                ></CustomFilterForPublicJobsOffers>
                                
                            </CardBody>
                            </Collapse>
                        </Card>
                        
                    </Col>

                    <Col xs="12" md="12" sm="12" lg="8" xl="8">
                        { dataToShow.length > 0 ? 
                        <>
                        <div>
                            { dataToShow.map((item,key) => {
                                return(
                                    <div key={item.id + "_" + key} className="animated fadeIn">
                                    
                                    <Card>
                                        <CardHeader>
                                            <Col className="align-self-center px-0">
                                                <div>
                                                <small>{item.categoriaEmpleo ? item.categoriaEmpleo.label : ""}</small>
                                                </div>
                                                <div>
                                                <strong className="h4">{item.puesto}</strong> - Código: {item.codigo}
                                                </div>
                                                <div>
                                                    
                                                    <div className="d-flex flex-wrap">
                                                        { item.bDiscapacidad && 
                                                            <div>
                                                                <h5><Badge color="info" pill><i className="fa fa-wheelchair">&nbsp;</i>Inclusión</Badge><span>&nbsp;</span></h5>
                                                            </div>
                                                        }
                                                        { item.placeToWork === 2 ? 
                                                            <div>
                                                                <h5><Badge color="warning" pill><i className="fa fa-paper-plane-o">&nbsp;</i>Remoto </Badge><span>&nbsp;</span></h5>
                                                            </div> 
                                                        : 
                                                            <div>
                                                                <h5><Badge color="danger" pill><i className="fa fa-building-o">&nbsp;</i>Presencial</Badge><span>&nbsp;</span></h5>
                                                            </div>
                                                        }
                                                        { item.bDisponibilidadInmediata && 
                                                            <div>
                                                                <h5><Badge color="success" pill><i className="fa fa-thumbs-o-up">&nbsp;</i>Disponibilidad inmediata</Badge><span>&nbsp;</span></h5>
                                                            </div>
                                                        }
                                                        { item.bHorarioFlexible && 
                                                            <div>
                                                                <h5><Badge color="primary" pill><i className="fa fa-clock-o">&nbsp;</i>Horario Flexible</Badge><span>&nbsp;</span></h5>
                                                            </div>
                                                        }
                                                        { item.bHomeOffice && 
                                                            <div>
                                                                <h5><Badge color="secondary" pill><i className="fa fa-home">&nbsp;</i>Home Office</Badge><span>&nbsp;</span></h5>
                                                            </div>
                                                        }
                                                        { item.empleador && !item.empleador.bPersonaJuridica && 
                                                            <div>
                                                                <h5><Badge color="success" pill><i className="fa fa-user">&nbsp;</i>Empleador Persona Natural</Badge><span>&nbsp;</span></h5>
                                                            </div>
                                                        }
                                                    </div>
                                                </div>
                                            </Col>
                                        </CardHeader>
                                        <CardBody>
                                            <div><strong>Publicado</strong>:&nbsp;{moment(item.fechaPublicado).tz(this.tz).format('DD/MM/YYYY, HH:mm:ss')}</div>
                                            <div>
                                            <strong>Ubicación</strong>:&nbsp;
                                            { item.placeToWork === 1 && item.allowPlaceToWorkOnSite ? 
                                            
                                            (item.allowPlaceToWorkOnSite.country ? item.allowPlaceToWorkOnSite.country.label + (item.allowPlaceToWorkOnSite.region ?  ", región " + item.allowPlaceToWorkOnSite.region.label + (item.allowPlaceToWorkOnSite.commune ? ", comuna de " + item.allowPlaceToWorkOnSite.commune.label : "") : "") : "")
                                              
                                              
                                              :
                                              (item.placeToWork === 2 ? 'Remoto': null)
                                            }
                                            </div>
                                            <p className="text-justify" style={{whiteSpace: "pre-wrap"}}>
                                                <strong>Descripción</strong>:&nbsp;
                                                { item.descripcion.length > 256 ? item.descripcion.substring(0,256) + "..." :  item.descripcion }
                                            </p>
                                            
                                            {
                                                item.empleador && item.empleador.bPersonaJuridica &&
                                                
                                                <div className="text-right">
                                                    <Img
                                                        className="img-avatar rounded float-left" style={{width: "auto", height: "64px"}}
                                                        src={[ `${webConfig.urlImages}/${item.empleador.rutaLogoEmpresa}`   , loadingImage]}
                                                        loader={<img src={loadingImage} className="img-avatar rounded float-left" alt={this.state.altAvatarImg} ></img>}
                                                    ></Img>
                                                    { item.empleador.urlEmpresa &&
                                                    <div className="align-self-center">
                                                        <a className="btn btn-warning" href={item.empleador.urlEmpresa ? item.empleador.urlEmpresa : "#"} target="_blank" rel="noopener noreferrer"><i className="fa fa-building"></i>  &nbsp;{item.empleador.nombreComercialEmpresa}</a> 
                                                    </div>
                                                    }
                                                </div>
                                            }
                                            
                                        </CardBody>
                                        <CardFooter>
                                          
                                                <div className="text-right align-self-center">
                                                    <Button type="button" color="success" block={isMobile} onClick={event => (this.onClickGoTojobOffer(event, item.id))} className="mt-0"> 
                                                        <div className="align-self-center">
                                                            <i className="fa fa-briefcase"></i>  &nbsp;                                                    
                                                            Ver Oferta
                                                        </div>
                                                    </Button>
                                                </div>
                                           
                                        </CardFooter>
                                    </Card>
                                    
                                    </div>
                                    );
                            })}
                        </div>
                        
                        {customPaginator(this.handlePageChange, this.state.pageNumber, this.state.pageSize, this.state.totalRegister, this.handleSizePageChange)}
                        </>
                        :
                        <div>Buscando ofertas de empleo...</div>
                    
                        }
                    </Col>

                    
                </Row>
                <div>
                
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    jobsOffersList: state.jobsOffers.jobsOffersList
});


export default connect(mapStateToProps, { 
    getJobsOffersPublics
})(JobsOffers);