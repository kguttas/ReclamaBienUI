import { 
    EXISTS_JOB_OFFER_APPLICATION,
    CREATE_JOB_OFFER_APPLICATION,
    GET_JOB_OFFER_APPLICATION,
    CREATE_JOB_APPLICATION_STATE
} from './types';

import { webConfig, stateSite, GetToken } from '../GlobalConfig';

import axios from 'axios';

export const existsJobOfferApplication = (
    {
        idJobOffer
    }
) => async dispatch => {
    
    stateSite.setLoading(true);
    
    const token = GetToken();

    //console.log(pageIndex);

    const query ={
        query:
            `query ExistsJobOfferApplication($idJobOffer:GuidGraphType!){
                existsJobOfferApplication(input:$idJobOffer){
                  errorMessage
                  statusCode
                  data
                }
              }`,
        variables:{
            "idJobOffer": idJobOffer
        },
        operationName:"ExistsJobOfferApplication"
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
            type: EXISTS_JOB_OFFER_APPLICATION,
            payload: response.data.data.existsJobOfferApplication
        });
    }).catch(error => {
        //console.log(error);

        const infoError = { 
            error : true,
            msgError: "Hemos tenido un problema, intente más tarde por favor."
        };

        dispatch({
            type: EXISTS_JOB_OFFER_APPLICATION,
            payload: infoError
        });

    }).then((e) => {
        stateSite.setLoading(false);
    });

}

export const upsertJobOfferApplication = (
    {
        id = null,
        preguntasRespuestas = null,
        frk_OfertasEmpleosPublic = null
    }
) => async dispatch => {
    
    stateSite.setLoading(true);
    
    const token = GetToken();

    //console.log(pageIndex);

    const query ={
        query:
            `mutation UpsertJobOfferApp($jobOffer:JobOfferApplicationInput!){
                upsertJobOfferApplication(input: $jobOffer){
                  statusCode
                  errorMessage
                  data{
                    id
                    bAnulado
                    estado {
                        id
                        estado
                        fecha
                        avance
                    }
                    fechaPostulacion
                    fechaUltimaActualizacion
                    frk_AspNetUsers_Postulante {
                        id
                        collectionName
                    }
                    frk_AspNetUsers_Empleador {
                        id
                        collectionName
                    }
                    frk_OfertasEmpleosPublic {
                        id
                        collectionName
                    }
                    preguntasRespuestas {
                        id
                        question
                        answer
                    }
                  }
                }
              }`,
        variables:{

            jobOffer: {
                id,
                preguntasRespuestas,
                frk_OfertasEmpleosPublic
            }
            
        },
        operationName:"UpsertJobOfferApp"
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
            type: CREATE_JOB_OFFER_APPLICATION,
            payload: response.data.data.upsertJobOfferApplication
        });
    }).catch(error => {
        //console.log(error);

        const infoError = { 
            error : true,
            msgError: "Hemos tenido un problema, intente más tarde por favor."
        };

        dispatch({
            type: CREATE_JOB_OFFER_APPLICATION,
            payload: infoError
        });

    }).then((e) => {
        stateSite.setLoading(false);
    });

}

export const getJobsOffersApplicationList = (
    {
        id = null,
        pageIndex = 0,
        pageSize = 10,
        keySearch = "",
        bShowDisableRegisters = null,
        sortField = "",
        sortOrder = "",
        idJobOffer = null
    }
) => async dispatch => {
    
    stateSite.setLoading(true);
    
    const token = GetToken();

    //console.log(pageIndex);

    const query ={
        query:
            `query GetListJobsOffersApp($pagination: PaginationJobsOffersApplicationInput!) {
                jobsOffersApplicationList(input: $pagination) {
                  statusCode
                  errorMessage
                  data {
                    itemsCount
                    data {
                      id
                      bAnulado
                      estado {
                        id
                        fecha
                        estado
                        avance
                      }
                      fechaPostulacion
                      fechaUltimaActualizacion
                      frk_AspNetUsers_Postulante {
                        id
                        collectionName
                      }
                      frk_AspNetUsers_Empleador {
                        id
                        collectionName
                      }
                      frk_OfertasEmpleosPublic {
                        id
                        collectionName
                      }
                      preguntasRespuestas {
                        id
                        answer
                        question
                      }
                      ofertaEmpleoPublica {
                        puesto
                        fechaPublicado
                        placeToWork
                        bEmpleadorConficencial
                        bRemotoTodoMundo
                        codigo
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
                      }
                      empleador {
                        bPersonaJuridica
                        nombreComercialEmpresa
                        razonSocial
                        rutaLogoEmpresa
                        urlEmpresa
                        id
                      }
                      postulante {
                        id
                        nombrePersona
                        apellidoPersona
                        fechaNacimiento
                        ciudad
                        urlImagen
                        frk_Nacionalidad {
                          id
                          collectionName
                        }
                        pais
                        region
                        comuna
                      }
                      cV {
                        id
                        titulo
                        descripcion
                        fechaUltimaActualizacion
                      }
                    }
                  }
                }
              }`,
        variables:{
            pagination: {
                id,
                pageIndex,
                pageSize,
                keySearch,
                bShowDisableRegisters,
                sortField,
                sortOrder,
                idJobOffer
            }
        },
        operationName:"GetListJobsOffersApp"
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
            type: GET_JOB_OFFER_APPLICATION,
            payload: response.data.data.jobsOffersApplicationList
        });
    }).catch(error => {
        //console.log(error);

        const infoError = { 
            error : true,
            msgError: "Hemos tenido un problema, intente más tarde por favor."
        };

        dispatch({
            type: GET_JOB_OFFER_APPLICATION,
            payload: infoError
        });

    }).then((e) => {
        stateSite.setLoading(false);
    });

}

export const createStateJobApplication = (
  {
      id = null,
      state = '',
  }
) => async dispatch => {
  
  stateSite.setLoading(true);
  
  const token = GetToken();

  //console.log(pageIndex);

  const query ={
      query:
          `mutation CreateStateJobApplication($newState: CreateStateJobApplicationInput!)
          {
            createState(input: $newState){
              errorMessage
              statusCode
              data{
                id
                estado{
                  id
                  fecha
                  estado
                  avance
                }
              }
            }
          }`,
      variables:{
        newState: {
          id,
          state
        }
      },
      operationName:"CreateStateJobApplication"
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
          type: CREATE_JOB_APPLICATION_STATE,
          payload: response.data.data.createState
      });
  }).catch(error => {
      //console.log(error);

      const infoError = { 
          error : true,
          msgError: "Hemos tenido un problema, intente más tarde por favor."
      };

      dispatch({
          type: CREATE_JOB_APPLICATION_STATE,
          payload: infoError
      });

  }).then((e) => {
      stateSite.setLoading(false);
  });

}