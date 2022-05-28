import { 
    GET_CV,
    CREATE_CV,
    GET_CV_BY_ID
} from './types';

import { webConfig, stateSite, GetToken } from '../GlobalConfig';

import axios from 'axios';

export const getCV = () => async dispatch => {
    
    stateSite.setLoading(true);
    
    const token = GetToken();

    //console.log(pageIndex);

    const query ={
        query:
            `query GetCV {
              cv {
                statusCode
                errorMessage
                data {
                  cv {
                    id
                    titulo
                    descripcion
                    fechaRegistro
                    fechaUltimaActualizacion
                    bAnulado
                    idiomas{
                      id
                      idioma
                      nivel
                    }
                    otrosConocimientos{
                      id
                      experience
                      time
                    }
                    bInformatica
                    conocimientosInformatica{
                      id
                      collectionName
                      code
                      label
                    }
                    frk_AspNetUsers{
                      id
                      collectionName
                    }
                    experienciaLaboral {
                      areaEmpresa {
                        code
                        collectionName
                        id
                        label
                      }
                      bActualmenteTrabajaAqui
                      cargo
                      comuna {
                        code
                        collectionName
                        id
                        label
                      }
                      ciudad
                      descripcion
                      empresa
                      fechaFin
                      fechaInicio
                      id
                      pais {
                        code
                        collectionName
                        id
                        label
                      }
                      region {
                        code
                        collectionName
                        id
                        label
                      }
                      relacionLaboral {
                        code
                        collectionName
                        id
                        label
                      }
                      
                    }  
                    formacionEducacional{
                      id
                      centroEducacion
                      nivelEducacional{
                        id
                        collectionName
                        code
                        label
                      }
                      carrera{
                        id
                        collectionName
                        code
                        label
                      }
                      otrasCarreras
                      estadoEstudios{
                        id
                        collectionName
                        code
                        label
                      }
                      pais{
                      id
                      collectionName
                      code
                      label
                      }
                      region{
                      id
                      collectionName
                      code
                      label
                      }
                      comuna{
                      id
                      collectionName
                      code
                      label
                      }
                      ciudad
                      fechaInicio
                      fechaFin
                      bActualmenteEstudiaAqui
                      descripcion
                      bModalidadOnline
                      
                    }
                    aspectosPersonales
                    bDisponibilidadViajar
                    bSalidaTerreno
                    bCambioResidencia
                    bTurnos
                    bDisponibilidadInmediata
                    fechaComienzo
                    bHomeOffice
                    bHorarioFlexible
                    bRentaConvenir
                    rentaMinima
                    tipoMoneda{
                      id
                      collectionName
                      code
                      label
                    }
                    tipoPago{
                      id
                      collectionName
                      code
                      label
                    }
                    periodicidadPago{
                      id
                      collectionName
                      code
                      label
                    }
                  }
                }
              }
            }`,
        variables:{
            
        },
        operationName:"GetCV"
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
            type: GET_CV,
            payload: response.data.data.cv
        });

    }).catch(error => {
        //console.log(error);

        const infoError = { 
            error : true,
            msgError: "Hemos tenido un problema, intente más tarde por favor."
        };

        dispatch({
            type: GET_CV,
            payload: infoError
        });

    }).then((e) => {
        stateSite.setLoading(false);
    });

}

export const getCVById = ({idCV = null, idPostulant = null}) => async dispatch => {
    
  stateSite.setLoading(true);
  
  const token = GetToken();

  //console.log(pageIndex);

  const query ={
      query:
          `query GetCVById($idCV:  GuidGraphType!, $idPostulant: GuidGraphType!){
            cvById(input:$idCV){
              statusCode
              errorMessage
              data {
                cv {
                  id
                  titulo
                  descripcion
                  fechaRegistro
                  fechaUltimaActualizacion
                  bAnulado
                  idiomas{
                    id
                    idioma
                    nivel
                  }
                  otrosConocimientos{
                    id
                    experience
                    time
                  }
                  bInformatica
                  conocimientosInformatica{
                    id
                    collectionName
                    code
                    label
                  }
                  frk_AspNetUsers{
                    id
                    collectionName
                  }
                  experienciaLaboral {
                    areaEmpresa {
                      code
                      collectionName
                      id
                      label
                    }
                    bActualmenteTrabajaAqui
                    cargo
                    comuna {
                      code
                      collectionName
                      id
                      label
                    }
                    ciudad
                    descripcion
                    empresa
                    fechaFin
                    fechaInicio
                    id
                    pais {
                      code
                      collectionName
                      id
                      label
                    }
                    region {
                      code
                      collectionName
                      id
                      label
                    }
                    relacionLaboral {
                      code
                      collectionName
                      id
                      label
                    }
                    
                  }  
                  formacionEducacional{
                    id
                    centroEducacion
                    nivelEducacional{
                      id
                      collectionName
                      code
                      label
                    }
                    carrera{
                      id
                      collectionName
                      code
                      label
                    }
                    otrasCarreras
                    estadoEstudios{
                      id
                      collectionName
                      code
                      label
                    }
                    pais{
                    id
                    collectionName
                    code
                    label
                    }
                    region{
                    id
                    collectionName
                    code
                    label
                    }
                    comuna{
                    id
                    collectionName
                    code
                    label
                    }
                    ciudad
                    fechaInicio
                    fechaFin
                    bActualmenteEstudiaAqui
                    descripcion
                    bModalidadOnline
                    
                  }
                  aspectosPersonales
                  bDisponibilidadViajar
                  bSalidaTerreno
                  bCambioResidencia
                  bTurnos
                  bDisponibilidadInmediata
                  fechaComienzo
                  bHomeOffice
                  bHorarioFlexible
                  bRentaConvenir
                  rentaMinima
                  tipoMoneda{
                    id
                    collectionName
                    code
                    label
                  }
                  tipoPago{
                    id
                    collectionName
                    code
                    label
                  }
                  periodicidadPago{
                    id
                    collectionName
                    code
                    label
                  }
                }
              }
            }
            postulantById(input: $idPostulant) {
              statusCode
              errorMessage
              data {
                postulant {
                  id
                  nombrePersona
                  apellidoPersona
                  fechaNacimiento
                  idGenero
                  celular
                  telefono
                  frk_Paises {
                    id
                    collectionName
                  }
                  frk_Regiones {
                    id
                    collectionName
                  }
                  frk_Ciudades {
                    id
                    collectionName
                  }
                  ciudad
                  direccion
                  codigoPostal
                  frk_EstadosCiviles
                  bVehiculo
                  licenciasConducir
                  bDiscapacidad
                  urlImagen
                  fechaRegistro
                  fechaUltimaActualizacion
                  frk_AspNetUsers {
                    id
                    collectionName
                  }
                  bAnulado
                  rut
                  frk_Nacionalidad {
                    id
                    collectionName
                  }
                  pais
                  region
                  comuna
                  email
                }
              }
            }


          }`,
      variables:{
        "idCV": idCV,
        "idPostulant": idPostulant
      },
      operationName:"GetCVById"
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
          type: GET_CV_BY_ID,
          payload: response.data.data
      });

  }).catch(error => {
      //console.log(error);

      const infoError = { 
          error : true,
          msgError: "Hemos tenido un problema, intente más tarde por favor."
      };

      dispatch({
          type: GET_CV_BY_ID,
          payload: infoError
      });

  }).then((e) => {
      stateSite.setLoading(false);
  });

}


export const createCV = ({
  titulo,
  descripcion,
  experienciaLaboral,
  formacionEducacional,
  bInformatica,
  conocimientosInformatica,
  otrosConocimientos,
  idiomas,
  aspectosPersonales,
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
  periodicidadPago,
}) => async dispatch => {
    
  stateSite.setLoading(true);
  
  const token = GetToken();

  //console.log(fechaComienzo);

  const query ={
      query:
          `mutation CreateCV($cv: CVInput!){
            upsertCV(input:$cv){
              statusCode
              errorMessage
              data{
                id
                titulo
                descripcion
                fechaRegistro
                fechaUltimaActualizacion
                bAnulado
                otrosConocimientos{
                  id
                  experience
                  time
                }
                idiomas{
                  id
                  idioma
                  nivel
                }
                bInformatica
                conocimientosInformatica{
                  id
                  collectionName
                  code
                  label
                }
                frk_AspNetUsers{
                  id
                  collectionName
                }
                experienciaLaboral {
                  areaEmpresa {
                    code
                    collectionName
                    id
                    label
                  }
                  bActualmenteTrabajaAqui
                  cargo
                  comuna {
                    code
                    collectionName
                    id
                    label
                  }
                  ciudad
                  descripcion
                  empresa
                  fechaFin
                  fechaInicio
                  id
                  pais {
                    code
                    collectionName
                    id
                    label
                  }
                  region {
                    code
                    collectionName
                    id
                    label
                  }
                  relacionLaboral {
                    code
                    collectionName
                    id
                    label
                  }
                 
                }
                formacionEducacional{
                  id
                  centroEducacion
                  nivelEducacional{
                    id
                    collectionName
                    code
                    label
                  }
                  carrera{
                    id
                    collectionName
                    code
                    label
                  }
                  otrasCarreras
                  estadoEstudios{
                    id
                    collectionName
                    code
                    label
                  }
                  pais{
                    id
                    collectionName
                    code
                    label
                  }
                  region{
                    id
                    collectionName
                    code
                    label
                  }
                  comuna{
                    id
                    collectionName
                    code
                    label
                  }
                  ciudad
                  fechaInicio
                  fechaFin
                  bActualmenteEstudiaAqui
				          descripcion
                  bModalidadOnline
                  
                }
                aspectosPersonales
                bDisponibilidadViajar
                bSalidaTerreno
                bCambioResidencia
                bTurnos
                bDisponibilidadInmediata
                fechaComienzo
                bHomeOffice
                bHorarioFlexible
                bRentaConvenir
                rentaMinima
                tipoMoneda{
                  id
                  collectionName
                  code
                  label
                }
                tipoPago{
                  id
                  collectionName
                  code
                  label
                }
                periodicidadPago{
                  id
                  collectionName
                  code
                  label
                }
              }
            }
          }`,
      variables:{
        "cv": {
          "id": null,
          "titulo": titulo,
          "descripcion": descripcion,
          "experienciaLaboral": experienciaLaboral,
          "formacionEducacional": formacionEducacional,
          "bInformatica": bInformatica,
          "conocimientosInformatica": conocimientosInformatica,
          "otrosConocimientos": otrosConocimientos,
          "idiomas": idiomas,
          "aspectosPersonales": aspectosPersonales,
          "bDisponibilidadViajar": bDisponibilidadViajar,
          "bSalidaTerreno": bSalidaTerreno,
          "bCambioResidencia": bCambioResidencia,
          "bTurnos": bTurnos,
          "bDisponibilidadInmediata": bDisponibilidadInmediata,
          "fechaComienzo": fechaComienzo,
          "bHomeOffice": bHomeOffice,
          "bHorarioFlexible": bHorarioFlexible,
          "bRentaConvenir": bRentaConvenir,
          "rentaMinima":  parseFloat(rentaMinima),
          "tipoMoneda": tipoMoneda,
          "tipoPago": tipoPago,
          "periodicidadPago": periodicidadPago,
        }
      },
      operationName:"CreateCV"
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
          type: CREATE_CV,
          payload: response.data.data.upsertCV
      });

  }).catch(error => {
      console.log(error);

      const infoError = { 
          error : true,
          msgError: "Hemos tenido un problema, intente más tarde por favor."
      };

      dispatch({
          type: CREATE_CV,
          payload: infoError
      });

  }).then((e) => {
      stateSite.setLoading(false);
  });

}