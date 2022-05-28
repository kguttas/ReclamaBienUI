import { 
    RESET_REDUCER,
    GET_JOBS_OFFERS,
    GET_JOBS_OFFERS_PUBLIC,
    GET_JOBS_OFFERS_EMPLOYERS,
    CREATE_JOB_OFFER,
    COPY_JOBS_OFFERS,
    DISABLE_JOBS_OFFERS,
} from './types';

import { webConfig, stateSite, GetToken } from '../GlobalConfig';


import axios from 'axios';

export const getJobsOffers = ({ 
    id = null, 
    pageSize = 1000, 
    pageIndex = 0, 
    keySearch = "", 
    code = "", 
    startDate = null,
    endDate = null,
    stateOffer = "",
    bShowDisableRegisters = null,  
    sortField = null, 
    sortOrder = null 
}) => async dispatch => {
    
    stateSite.setLoading(true);
    
    const token = GetToken();

    //console.log(pageIndex);

    const query ={
        query:
            `query ListOjbsOffers($pagination:PaginationJobsOffersInput!){
                jobsOffersList(input:$pagination){
                  errorMessage
                  statusCode
                  data{
                    itemsCount
                    data{
                        id
                        bEmpleadorConficencial
                        descripcionEmpresaConfidencial
                        puesto
                        codigo
                        bAnulado
                        fechaCreado
                        estado
                        descripcion
                        categoriaEmpleo{
                            id
                            label
                        }
                        genero{
                          id
                          collectionName
                          code
                          label
                        }
                        bDiscapacidad
                        bInformatica
                        conocimientosInformatica{
                            id
                            label
                        }
                        placeToWork
                        bRemotoTodoMundo
                        obsRemote
                        allowPlacesToWorkRemotly{
                            addressRemoteWork
                            cityRemoteWork
                            id
                            country{
                                id
                                label
                            }
                            region{
                                id
                                label
                            }
                            commune{
                                id
                                label
                            }
                        }
                        allowPlaceToWorkOnSite{
                            id
                            addressWork
                            cityWork
                            obsPresencial
                            commune{
                                id
                                label
                            }
                            region{
                                id
                                label
                            }
                            country{
                                id
                                label
                            }
                        }    
                        bDisponibilidadViajar
                        bSalidaTerreno
                        bCambioResidencia
                        bDisponibilidadInmediata
                        fechaComienzo
                        experiencies{
                            id
                            experience
                            time
                        }
                        profesiones{
                            id
                            label
                        }
                        nivelEducacional{
                            id
                            label
                        }
                        situacionActualMinima {
                            id
                            label
                        }
                        idiomas{
                            id
                            idioma
                            nivel
                        }
                        aspectosPersonales
                        otrosRequisitos
                        vacantes
                        tipoContrato {
                            id
                            label
                        }
                        jornada
                        horario
                        acercaContratacion
                        bRentaConvenir
                        bMostrarRenta
                        cantidadPostulantes
                        rentaMaxima
                        tipoMoneda {
                            id
                            code
                            label
                        }
                        tipoPago {
                            id
                            label
                        }
                        periodicidadPago {
                            id
                            label
                        }
                        acercaPago
                        beneficios
                        bHomeOffice
                        bHorarioFlexible
                        preguntas
                        observaciones
                        frk_Empleador{
                            id
                            collectionName
                        }
                        bRangoEtario
                        edadMaxima
                        edadMinima
                        empleador{
                          nombrePersona
                          apellidoPersona
                          bPersonaJuridica
                          nombreComercialEmpresa
                          razonSocial
                          rutaLogoEmpresa
                          urlEmpresa
                          id
                        }
                    }
                  }
                }
              }`,
        variables:{
            pagination: {
                "id": id,
                "pageSize": pageSize,
                "pageIndex": pageIndex,
                "keySearch": `${keySearch}`,
                "code": `${code}`,
                "bShowDisableRegisters": bShowDisableRegisters,
                "sortField": sortField,
                "sortOrder": sortOrder,
                "startDate": startDate,
                "stateOffer": stateOffer,
                "endDate": endDate,
            }
        },
        operationName:"ListOjbsOffers"
    };


    await axios.post(webConfig.urlBaseAPI + '/api/CustomGraphQL', query,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `bearer ${token}`
        }
      })
    .then(response => {
        //console.log(response.data.data);
        
        dispatch({
            type: GET_JOBS_OFFERS,
            payload: response.data.data.jobsOffersList
        });

    }).catch(error => {
        //console.log(error);

        const infoError = { 
            error : true,
            msgError: "Hemos tenido un problema, intente más tarde por favor."
        };

        dispatch({
            type: GET_JOBS_OFFERS,
            payload: infoError
        });

    }).then((e) => {
        stateSite.setLoading(false);
    });

}

export const getJobsOffersPublics = ({ 
    id = null, 
    pageSize = 1000, 
    pageIndex = 0, 
    keySearch = "",
    startDate = null,
    endDate = null,
    sortField = null, 
    sortOrder = null,
    idCountry = null,
    idRegion = null,
    idCommune = null,
    bShowDisability = null,
    bShowRemote = null,
}) => async dispatch => {
    
    stateSite.setLoading(true);
    
    const token = GetToken();
    
    const query ={
        query:
            `query ListOjbsOffers($pagination: PaginationJobsOffersPublicsInput!) {
                jobsOffersPublicList(input: $pagination) {
                  errorMessage
                  statusCode
                  data {
                    itemsCount
                    data {
                      id
                      bEmpleadorConficencial
                      descripcionEmpresaConfidencial
                      puesto
                      codigo
                      bAnulado
                      fechaCreado
                      estado
                      descripcion
                      categoriaEmpleo {
                        id
                        label
                      }
                      bDiscapacidad
                      bInformatica
                      conocimientosInformatica {
                        id
                        label
                      }
                      placeToWork
                      bRemotoTodoMundo
                      obsRemote
                      allowPlacesToWorkRemotly {
                        addressRemoteWork
                        cityRemoteWork
                        id
                        country {
                          id
                          label
                        }
                        region {
                          id
                          label
                        }
                        commune {
                          id
                          label
                        }
                      }
                      allowPlaceToWorkOnSite {
                        id
                        addressWork
                        cityWork
                        obsPresencial
                        commune {
                          id
                          label
                        }
                        region {
                          id
                          label
                        }
                        country {
                          id
                          label
                        }
                      }
                      bDisponibilidadViajar
                      bSalidaTerreno
                      bCambioResidencia
                      bDisponibilidadInmediata
                      fechaComienzo
                      experiencies {
                        id
                        experience
                        time
                      }
                      profesiones {
                        id
                        label
                      }
                      nivelEducacional {
                        id
                        label
                      }
                      situacionActualMinima {
                        id
                        label
                      }
                      idiomas {
                        id
                        idioma
                        nivel
                      }
                      aspectosPersonales
                      otrosRequisitos
                      vacantes
                      tipoContrato {
                        id
                        label
                      }
                      jornada
                      horario
                      acercaContratacion
                      bRentaConvenir
                      bMostrarRenta
                      cantidadPostulantes
                      rentaMaxima
                      tipoMoneda {
                        id
                        code
                        label
                      }
                      tipoPago {
                        id
                        label
                      }
                      periodicidadPago {
                        id
                        label
                      }
                      acercaPago
                      beneficios
                      bHomeOffice
                      bHorarioFlexible
                      preguntas
                      observaciones
                      fechaPublicado
                      frk_Empleador {
                        id
                        collectionName
                      }
                      empleador{
                        bPersonaJuridica
                        nombreComercialEmpresa
                        razonSocial
                        rutaLogoEmpresa
                        urlEmpresa
                        id
                      }
                    }
                  }
                }
              }`,
        variables:{
            pagination: {
                "id": id,
                "pageSize": pageSize,
                "pageIndex": pageIndex,
                "keySearch": `${keySearch}`,
               
                "sortField": sortField,
                "sortOrder": sortOrder,
                "startDate": startDate,
                
                "endDate": endDate,
                "idCountry": idCountry,
                "idRegion": idRegion,
                "idCommune": idCommune,
                "bShowDisability": bShowDisability,
                "bShowRemote": bShowRemote,
            }
        },
        operationName:"ListOjbsOffers"
    };
    
    await axios.post(webConfig.urlBaseAPI + '/api/CustomGraphQL', query,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `bearer ${token}`
        }
      })
    .then(response => {
      //console.log(response);
        dispatch({
            type: GET_JOBS_OFFERS_PUBLIC,
            payload: response.data.data.jobsOffersPublicList
        });

    }).catch(error => {
       
        const infoError = { 
            error : true,
            msgError: "Hemos tenido un problema, intente más tarde por favor."
        };

        dispatch({
            type: GET_JOBS_OFFERS_PUBLIC,
            payload: infoError
        });

    }).then((e) => {
        stateSite.setLoading(false);
    });

}

export const getJobsOffersEmployers = ({ 
    id = null, 
    pageSize = 1000, 
    pageIndex = 0, 
    keySearch = "", 
    code = "", 
    startDate = null,
    endDate = null,
    stateOffer = "",
    bShowDisableRegisters = null,  
    sortField = null, 
    sortOrder = null 
}) => async dispatch => {
    
    stateSite.setLoading(true);
    
    const token = GetToken();

    //console.log(pageIndex);

    const query ={
        query:
            `query ListJobsOffersEmployters($pagination: PaginationJobsOffersEmployersInput!) {
                jobsOffersEmployersList(input: $pagination) {
                  statusCode
                  errorMessage
                  data {
                    itemsCount
                    data {
                      id
                      bEmpleadorConficencial
                      descripcionEmpresaConfidencial
                      puesto
                      codigo
                      bAnulado
                      fechaCreado
                      estado
                      descripcion
                      bRangoEtario
                      edadMaxima
                      edadMinima
                      genero{
                        id
                        collectionName
                        code
                        label
                      }
                      categoriaEmpleo {
                        id
                        label
                      }
                      bDiscapacidad
                      bInformatica
                      conocimientosInformatica {
                        id
                        label
                      }
                      placeToWork
                      bRemotoTodoMundo
                      obsRemote
                      allowPlacesToWorkRemotly {
                        addressRemoteWork
                        cityRemoteWork
                        id
                        country {
                          id
                          label
                        }
                        region {
                          id
                          label
                        }
                        commune {
                          id
                          label
                        }
                      }
                      allowPlaceToWorkOnSite {
                        id
                        addressWork
                        cityWork
                        obsPresencial
                        commune {
                          id
                          label
                        }
                        region {
                          id
                          label
                        }
                        country {
                          id
                          label
                        }
                      }
                     
                      bDisponibilidadViajar
                      bSalidaTerreno
                      bCambioResidencia
                      bDisponibilidadInmediata
                      fechaComienzo
                      experiencies {
                        id
                        experience
                        time
                      }
                      profesiones {
                        id
                        label
                      }
                      nivelEducacional {
                        id
                        label
                      }
                      situacionActualMinima {
                        id
                        label
                      }
                      idiomas {
                        id
                        idioma
                        nivel
                      }
                      aspectosPersonales
                      otrosRequisitos
                      vacantes
                      tipoContrato {
                        id
                        label
                      }
                      jornada
                      horario
                      acercaContratacion
                      bRentaConvenir
                      bMostrarRenta
                      cantidadPostulantes
                      rentaMaxima
                      tipoMoneda {
                        id
                        code
                        label
                      }
                      tipoPago {
                        id
                        label
                      }
                      periodicidadPago {
                        id
                        label
                      }
                      acercaPago
                      beneficios
                      bHomeOffice
                      bHorarioFlexible
                      preguntas
                      observaciones
                      frk_Empleador {
                        id
                        collectionName
                      }
                      nombreEmpleador
                      empleador {
                        id
                        nombreComercialEmpresa
                        razonSocial
                        nombrePersona
                        apellidoPersona
                        fechaNacimiento
                        fechaCreacion
                        bPersonaJuridica
                        rut
                        frk_Paises {
                          id
                        }
                        frk_Regiones {
                          id
                        }
                        frk_Ciudades {
                          id
                        }
                        ciudad
                        direccion
                        codigoPostal
                        telefono
                        celular
                        frk_SectorComercial {
                          id
                        }
                        frk_CantididadTrabajadores {
                          id
                        }
                        frk_TipoEmpresa {
                          id
                        }
                        frk_Cargo {
                          id
                        }
                        otroCargo
                        descripcionEmpresa
                        urlEmpresa
                        rutaLogoEmpresa
                        frk_AspNetUsers {
                          id
                        }
                        bAnulado
                      }
                    }
                  }
                }
              }
              `,
        variables:{
            pagination: {
                "id": id,
                "pageSize": pageSize,
                "pageIndex": pageIndex,
                "keySearch": `${keySearch}`,
                "code": `${code}`,
                "bShowDisableRegisters": bShowDisableRegisters,
                "sortField": sortField,
                "sortOrder": sortOrder,
                "startDate": startDate,
                "stateOffer": stateOffer,
                "endDate": endDate,
            }
        },
        operationName:"ListJobsOffersEmployters"
    };


    await axios.post(webConfig.urlBaseAPI + '/api/CustomGraphQL', query,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `bearer ${token}`
        }
      })
    .then(response => {
        console.log(response);
        
        dispatch({
            type: GET_JOBS_OFFERS_EMPLOYERS,
            payload: response.data.data.jobsOffersEmployersList
        });

    }).catch(error => {
        console.log(error);

        const infoError = { 
            error : true,
            msgError: "Hemos tenido un problema, intente más tarde por favor."
        };

        dispatch({
            type: GET_JOBS_OFFERS_EMPLOYERS,
            payload: infoError
        });

    }).then((e) => {
        stateSite.setLoading(false);
    });

}


export const createJobOffer = (
    { 
        id = null,
        bEmpleadorConficencial = false,
        descripcionEmpresaConfidencial = "",
        puesto = "" ,
        descripcion = "",
        categoriaEmpleo = null,
        bDiscapacidad = null,
        bInformatica = null,
        conocimientosInformatica = null,
        placeToWork = 0,
        bRemotoTodoMundo = null,
        obsRemote = "",
        allowPlacesToWorkRemotly = null,
        allowPlaceToWorkOnSite = null,
        bDisponibilidadViajar = null,
        bSalidaTerreno = null,
        bCambioResidencia = null,
        bDisponibilidadInmediata = null,
        fechaComienzo = null,
        experiencies = null,
        profesiones = null,
        nivelEducacional = null,
        situacionActualMinima = null,
        idiomas = null,
        aspectosPersonales = null,
        otrosRequisitos = null,
        vacantes= null,
        tipoContrato= null,
        jornada= null,
        horario= null,
        acercaContratacion= null,
        bRentaConvenir= null,
        bMostrarRenta = null,
        rentaMaxima = null,
        tipoMoneda = null,
        tipoPago = null,
        periodicidadPago = null,
        acercaPago = null,
        beneficios = null,
        bHomeOffice = null,
        bHorarioFlexible = null,
        preguntas = null,
        observaciones = null,
        stateOffer = null,
        bRangoEtario = null,
        edadMaxima = null,
        edadMinima = null,
        genero = null,

    }) => async dispatch => {
    
    stateSite.setLoading(true);
    
    const token = GetToken();

    const query ={
        query:
            `mutation CreateJobOffer($jobOffer: JobOfferInput!){
                createJobOffer(input: $jobOffer){
                    errorMessage
                    statusCode
                    data{
                        id
                        bEmpleadorConficencial
                        descripcionEmpresaConfidencial
                        puesto
                        descripcion
                        categoriaEmpleo{
                            id
                            label
                        }
                        bDiscapacidad
                        bInformatica
                        conocimientosInformatica{
                            id
                            label
                        }
                        placeToWork 
                        bRemotoTodoMundo
                        obsRemote
                        genero{
                          id
                          collectionName
                          code
                          label
                        }
                        allowPlacesToWorkRemotly{
                            addressRemoteWork
                            cityRemoteWork
                            id
                            country{
                                id
                                label
                            }
                            region{
                                id
                                label
                            }
                            commune{
                                id
                                label
                            }
                        }
                        allowPlaceToWorkOnSite{
                            id
                            addressWork
                            cityWork
                            obsPresencial
                            commune{
                                id
                                label
                            }
                            region{
                                id
                                label
                            }
                            country{
                                id
                                label
                            }
                        }   
                        bDisponibilidadViajar
                        bSalidaTerreno
                        bCambioResidencia
                        bDisponibilidadInmediata
                        fechaComienzo 
                        experiencies{
                            id
                            experience
                            time
                        }
                        profesiones{
                            id
                            label
                        }
                        nivelEducacional{
                            id
                            label
                        }
                        situacionActualMinima {
                            id
                            label
                        }
                        idiomas{
                            id
                            idioma
                            nivel
                        }
                        aspectosPersonales
                        otrosRequisitos
                        vacantes
                        tipoContrato {
                            id
                            label
                        }
                        jornada
                        horario
                        acercaContratacion
                        bRentaConvenir
                        bMostrarRenta
                        rentaMaxima
                        tipoMoneda {
                            id
                            code
                            label
                        }
                        tipoPago {
                            id
                            label
                        }
                        periodicidadPago {
                            id
                            label
                        }
                        acercaPago
                        beneficios
                        bHomeOffice
                        bHorarioFlexible
                        preguntas
                        observaciones
                        stateOffer
                        bRangoEtario
                        edadMaxima
                        edadMinima
                    }
                }
            }`,
        variables:{
            jobOffer: {
                "id": id,
                "bEmpleadorConficencial": bEmpleadorConficencial,
                "descripcionEmpresaConfidencial": descripcionEmpresaConfidencial,
                "puesto": puesto,
                "descripcion": descripcion,
                "categoriaEmpleo": categoriaEmpleo,
                "bDiscapacidad": bDiscapacidad,
                "bInformatica": bInformatica,
                "conocimientosInformatica": conocimientosInformatica,
                "placeToWork": placeToWork,
                "bRemotoTodoMundo": bRemotoTodoMundo,
                "obsRemote": obsRemote,
                "allowPlacesToWorkRemotly": allowPlacesToWorkRemotly,
                "allowPlaceToWorkOnSite": allowPlaceToWorkOnSite,
                "bDisponibilidadViajar": bDisponibilidadViajar,
                "bSalidaTerreno": bSalidaTerreno,
                "bCambioResidencia": bCambioResidencia,
                "bDisponibilidadInmediata": bDisponibilidadInmediata,
                "fechaComienzo": fechaComienzo ,
                "experiencies": experiencies,
                "profesiones": profesiones,
                "nivelEducacional": nivelEducacional,
                "situacionActualMinima": situacionActualMinima,
                "idiomas": idiomas,
                "aspectosPersonales": aspectosPersonales,
                "otrosRequisitos": otrosRequisitos,
                "vacantes": vacantes,
                "tipoContrato": tipoContrato,
                "jornada": jornada,
                "horario": horario,
                "acercaContratacion": acercaContratacion,
                "bRentaConvenir": bRentaConvenir,
                "bMostrarRenta": bMostrarRenta,
                "rentaMaxima": parseFloat( rentaMaxima),
                "tipoMoneda": tipoMoneda,
                "tipoPago": tipoPago,
                "periodicidadPago": periodicidadPago,
                "acercaPago": acercaPago,
                "beneficios": beneficios,
                "bHomeOffice": bHomeOffice,
                "bHorarioFlexible": bHorarioFlexible,
                "preguntas": preguntas,
                "observaciones": observaciones,
                "stateOffer": stateOffer,
                "bRangoEtario": bRangoEtario,
                "edadMaxima": edadMaxima,
                "edadMinima": edadMinima,
                "genero": genero
            }
        },
        operationName:"CreateJobOffer"
    };

    await axios.post(webConfig.urlBaseAPI + '/api/CustomGraphQL', query,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `bearer ${token}`
        }
      })
    .then(response => {
        //console.log(response.data);
        
        dispatch({
            type: CREATE_JOB_OFFER,
            payload: response.data.data.createJobOffer
        });

    }).catch(error => {
        //console.log(error);

        const infoError = { 
            error : true,
            msgError: "Hemos tenido un problema, intente más tarde por favor."
        };

        dispatch({
            type: CREATE_JOB_OFFER,
            payload: infoError
        });

    }).then(() => {
        
        stateSite.setLoading(false);
    });

}

export const copyJobsOffers = ({ 
    idOffer = null,
    puesto = "",
}) => async dispatch => {
    
    stateSite.setLoading(true);
    
    const token = GetToken();

    //console.log(idOffer);

    const query ={
        query:
            `mutation CopyJobOffer($jobOffer: JobOfferCopyInput!){
                copyJobOffer(input:$jobOffer){
                  statusCode
                  errorMessage
                  data{
                    id
                    puesto
                    fechaCreado
                  }
                }
              }`,
        variables:{
            jobOffer: {
                "idOffer": idOffer,
                "puesto": puesto
            }
        },
        operationName:"CopyJobOffer"
    };


    await axios.post(webConfig.urlBaseAPI + '/api/CustomGraphQL', query,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `bearer ${token}`
        }
      })
    .then(response => {
        //console.log(response.data.data.jobsOffersList);
        
        dispatch({
            type: COPY_JOBS_OFFERS,
            payload: response.data.data.copyJobOffer
        });

    }).catch(error => {
        console.log(error);

        const infoError = { 
            error : true,
            msgError: "Hemos tenido un problema, intente más tarde por favor."
        };

        dispatch({
            type: COPY_JOBS_OFFERS,
            payload: infoError
        });

    }).then((e) => {
        stateSite.setLoading(false);
    });

}

export const disableJobsOffers = ({ 
    idOffer = null,
    bAnulado = "",
}) => async dispatch => {
    
    stateSite.setLoading(true);
    
    const token = GetToken();

    //console.log(idOffer);

    const query ={
        query:
            `mutation DisableJobOffer($jobOffer: JobOfferDisableInput!){
                disableJobOffer(input:$jobOffer){
                  errorMessage
                  statusCode
                  data{
                    id
                    bAnulado
                  }
                }
              }`,
        variables:{
            jobOffer: {
                "idOffer": idOffer,
                "bAnulado": bAnulado
            }
        },
        operationName:"DisableJobOffer"
    };


    await axios.post(webConfig.urlBaseAPI + '/api/CustomGraphQL', query,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `bearer ${token}`
        }
      })
    .then(response => {
        //console.log(response);
        
        dispatch({
            type: DISABLE_JOBS_OFFERS,
            payload: response.data ? response.data.data.disableJobOffer : null
        });

    }).catch(error => {
        console.log(error);

        const infoError = { 
            error : true,
            msgError: "Hemos tenido un problema, intente más tarde por favor."
        };

        dispatch({
            type: DISABLE_JOBS_OFFERS,
            payload: infoError
        });

    }).then((e) => {
        stateSite.setLoading(false);
    });

}

export const resetReducer = () => async dispatch => {
    dispatch({
        type: RESET_REDUCER
    });
}