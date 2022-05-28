import { 
    LOGIN_USER, 
    CREATE_USER_POSTULANT, 
    CREATE_USER_EMPLOYER, 
    VALIDATE_EMAIL, 
    LOGIN_POSTULANT,
    LOGIN_EMPLOYER,
    LOGIN_ADMIN, 
    CHANGE_PASSWORD, 
    RESET_PASSWORD,
    GET_EMPLOYER,
    GET_POSTULANT,
    CHANGE_PASSWORD_USER,
    UPDATE_EMPLOYER,
    UPDATE_POSTULANT,
    RESET_REDUCER,
    SAVE_DATA_EMPLOYER,
    GET_DATA_EMPLOYER,
    GET_DATA_EMPLOYER_BY_ID,
    GET_FILTER_ADMIN,
    SET_FILTER_ADMIN,
    CONTACT_CAMPAIGN,
} from './types';

import { webConfig, stateSite, GetToken } from '../GlobalConfig';

import axios from 'axios';

export const loginUser = post => async dispatch => {
    let data = {};

    stateSite.setLoading(true);
    
    setTimeout(async (e) => {
        await axios.post(webConfig.urlBaseAPI + '/api/Account/login', post)
        .then(respuesta => {
            //console.log(respuesta.data);
            data = respuesta.data;
            data.error = false;

            const jwtParts = data.access_token.split('.');
            const decodedString = atob(jwtParts[1]);
            const claimsToken = JSON.parse(decodedString);
            
            data.claimsToken = claimsToken;

            localStorage.setItem('tokenResult', JSON.stringify(data));

            stateSite.isAuthenticate = true;
        }).catch(error => {
            //console.log(error.response.data.message);
            data = { error : true};

            stateSite.isAuthenticate = false;
        }).then((e) => {
            stateSite.setLoading(false);
        });
    
        dispatch({
            type: LOGIN_USER,
            payload: data
        });
    },0);

    
}

export const loginPostulant = post => async dispatch => {
    let data = {};

    stateSite.setLoading(true);
    
    await axios.post(webConfig.urlBaseAPI + '/api/Account/loginPostulant', post)
    .then(respuesta => {
       
        data = respuesta.data;
        data.error = false;

        /*const jwtParts = data.access_token.split('.');
        const decodedString = atob(jwtParts[1]);
        const claimsToken = JSON.parse(decodedString);
        
        data.claimsToken = claimsToken;*/

        //localStorage.setItem('tokenResult', JSON.stringify(data));

        data = {
            access_token: respuesta.data.access_token,
            error: null
        };

        stateSite.isAuthenticate = true;
    }).catch(error => {

        if(error.response){
            
            data = {
                access_token: null,
                error: error.response.data
            };
        }else{
            data = {
                access_token: null,
                error: null
            };
        }
        
        stateSite.isAuthenticate = false;
    }).then((e) => {
        stateSite.setLoading(false);
    });

    dispatch({
        type: LOGIN_POSTULANT,
        payload: data
    });
}

export const loginEmployer = post => async dispatch => {
    let data = {};

    stateSite.setLoading(true);
    
    await axios.post(webConfig.urlBaseAPI + '/api/Account/loginEmployer', post)
    .then(respuesta => {
        //console.log(respuesta.data);
        //data = respuesta.data;
        //data.error = false;
        /*let claimsToken = null;

        if(respuesta.data && respuesta.data.access_token){
            const jwtParts = respuesta.data.access_token.split('.');
            const decodedString = atob(jwtParts[1]);
            claimsToken = JSON.parse(decodedString);
        }*/
        
        data = {
            access_token: respuesta.data.access_token,
            //claimsToken,
            error: null
        };

        stateSite.isAuthenticate = true;
    }).catch(error => {

        if(error.response){
            
            data = {
                access_token: null,
                error: error.response.data
            };
        }else{
            data = {
                access_token: null,
                error: null
            };
        }
        
        stateSite.isAuthenticate = false;
    }).then((e) => {
        stateSite.setLoading(false);
    });

    dispatch({
        type: LOGIN_EMPLOYER,
        payload: data
    });
}

export const loginAdmin = post => async dispatch => {
    let data = {};

    stateSite.setLoading(true);
    
    await axios.post(webConfig.urlBaseAPI + '/api/Account/loginAdmin', post)
    .then(respuesta => {
        //console.log(respuesta.data);
        data = respuesta.data;
        data.error = false;

        /*const jwtParts = data.access_token.split('.');
        const decodedString = atob(jwtParts[1]);
        const claimsToken = JSON.parse(decodedString);
        
        data.claimsToken = claimsToken;*/

        //localStorage.setItem('tokenResult', JSON.stringify(data));

        data = {
            access_token: respuesta.data.access_token,
            error: null
        };

        stateSite.isAuthenticate = true;
    }).catch(error => {
        
        if(error.response){
            
            data = {
                access_token: null,
                error: error.response.data
            };
        }else{
            data = {
                access_token: null,
                error: null
            };
        }
        
        stateSite.isAuthenticate = false;
    }).then((e) => {
        stateSite.setLoading(false);
    });

    dispatch({
        type: LOGIN_ADMIN,
        payload: data
    });
}

export const getEmployer = () => async dispatch => {
    let data = {};

    stateSite.setLoading(true);
    
    const token = GetToken();

    //console.log(token);

    const query ={
        query:
            `query Employer{
                employer{
                  data{
                    aspnetUser{
                      email
                      id
                    }
                    employer{
                        id
                        nombreComercialEmpresa
                        razonSocial
                        nombrePersona
                        apellidoPersona
                        fechaNacimiento
                        email
                        fechaCreacion
                        bPersonaJuridica
                        rut
                        frk_Paises{
                            id
                        }
                        frk_Regiones{
                            id
                        }
                        frk_Ciudades{
                            id
                        }
                        ciudad
                        direccion
                        codigoPostal
                        telefono
                        celular
                        frk_SectorComercial{
                            id
                        }
                        frk_CantididadTrabajadores{
                            id
                        }
                        frk_TipoEmpresa{
                            id
                        }
                        frk_Cargo{
                            id
                        }
                        otroCargo
                        descripcionEmpresa
                        urlEmpresa
                        rutaLogoEmpresa
                        frk_AspNetUsers{
                            id
                        }
                        bAnulado
                    }
                  }
                }
              }`,
        variables:{ },
        operationName:"Employer"
    };

    await axios.post(webConfig.urlBaseAPI + '/api/CustomGraphQL', query,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `bearer ${token}`
        }
      })
    .then(respuesta => {
        //console.log(respuesta.data);
        
        if(Array.isArray(respuesta.data.errors)){
            data = {
                employer: null,
                aspnetUser: null,
                error: respuesta.data.errors
            };
        }else{
            data = {
                employer: respuesta.data.data.employer.data.employer,
                aspnetUser: respuesta.data.data.employer.data.aspnetUser,
                error: respuesta.data.errors
            };
        }
        

    }).catch(error => {
        console.log(error);
        
        data = {
            employer: null,
            aspnetUser: null,
            error: error.response
        };

    }).then((e) => {
        stateSite.setLoading(false);
    });

    dispatch({
        type: GET_EMPLOYER,
        payload: data
    });
}

export const getEmployerById = ({idEmployer = null}) => async dispatch => {
    let data = {};

    stateSite.setLoading(true);
    
    const token = GetToken();

    //console.log(token);

    const query ={
        query:
            `query GetEmployerById($idEmployer: GuidGraphType!) {
                employerById(input: $idEmployer) {
                  statusCode
                  errorMessage
                  data {
                    aspnetUser {
                      email
                      id
                    }
                    employer {
                      id
                      pais
                      region
                      comuna
                      sectorComercial
                      cantidadTrabajadores
                      tipoEmpresa
                      cargo
                      nombreComercialEmpresa
                      razonSocial
                      nombrePersona
                      apellidoPersona
                      fechaNacimiento
                      fechaCreacion
                      fechaActualizacion
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
              }`,
        variables:{ 
            "idEmployer": idEmployer
        },
        operationName:"GetEmployerById"
    };

    await axios.post(webConfig.urlBaseAPI + '/api/CustomGraphQL', query,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `bearer ${token}`
        }
      })
    .then(respuesta => {
        //console.log(respuesta.data);
        
        if(Array.isArray(respuesta.data.errors)){
            data = {
                employer: null,
                aspnetUser: null,
                error: respuesta.data.errors
            };
        }else{
            data = {
                employer: respuesta.data.data.employerById.data.employer,
                aspnetUser: respuesta.data.data.employerById.data.aspnetUser,
                error: respuesta.data.errors
            };
        }
        

    }).catch(error => {
        console.log(error);
        
        data = {
            employer: null,
            aspnetUser: null,
            error: error.response
        };

    }).then((e) => {
        stateSite.setLoading(false);
    });

    dispatch({
        type: GET_DATA_EMPLOYER_BY_ID,
        payload: data
    });
}

export const getPostulant = () => async dispatch => {
    let data = {};

    stateSite.setLoading(true);
    
    const token = GetToken();

    //console.log(token);

    const query ={
        query:
            `query Postulant{
                postulant{
                    statusCode
                    errorMessage
                    data{
                        
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
                            frk_Nacionalidad{
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
        variables:{ },
        operationName:"Postulant"
    };

    await axios.post(webConfig.urlBaseAPI + '/api/CustomGraphQL', query,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `bearer ${token}`
        }
      })
    .then(respuesta => {
        
        //console.log(respuesta);
        if(Array.isArray(respuesta.data.errors)){
            data = {
                error: respuesta.data.errors
            };
        }else{
            data = respuesta.data.data.postulant.data.postulant;
        }
        

    }).catch(error => {
        console.log(error);
        
        data = {
            error: error
        };

    }).then((e) => {
        stateSite.setLoading(false);
    });
    
    dispatch({
        type: GET_POSTULANT,
        payload: data
    });
}

export const resetPassword = post => async dispatch => {
    let data = {};

    stateSite.setLoading(true);
    
    await axios.post(webConfig.urlBaseAPI + '/api/Account/resetPasswordEmail', post)
    .then(respuesta => {
        console.log(respuesta);
        data = {
            result: respuesta.data.result,
            error: null
        };

    }).catch(error => {
        console.log(error.response);

        if(error.response !== undefined){
            data = {
                result: null,
                error: error.response.data
            };
        }
        

    }).then((e) => {
        stateSite.setLoading(false);
    });

    dispatch({
        type: RESET_PASSWORD,
        payload: data
    });
}

export const changePassword = post => async dispatch => {
    let data = {};

    stateSite.setLoading(true);
    
    await axios.post(webConfig.urlBaseAPI + '/api/Account/changePasswordEmail', post)
    .then(respuesta => {
        console.log(respuesta);
        data = {
            result: respuesta.data.result,
            error: null
        };

    }).catch(error => {
        console.log(error.response);
        data = {
            result: null,
            error: error.response.data
        };

    }).then((e) => {
        stateSite.setLoading(false);
    });

    dispatch({
        type: CHANGE_PASSWORD,
        payload: data
    });
}

export const changePasswordUser = post => async dispatch => {
    let data = {};

    stateSite.setLoading(true);

    const token = GetToken();
    
    await axios.post(webConfig.urlBaseAPI + '/api/Account/changePasswordUser', post,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `bearer ${token}`
        }
      })
    .then(respuesta => {
        //console.log(respuesta);
        data = {
            result: respuesta.data.result,
            error: null
        };

    }).catch(error => {
        //console.log(error.response);
        data = {
            result: null,
            error: error.response.data
        };

    }).then((e) => {
        stateSite.setLoading(false);
    });

    dispatch({
        type: CHANGE_PASSWORD_USER,
        payload: data
    });
}

export const createUserEmployer = post => async dispatch => {
    let data = null;
    stateSite.setLoading(true);

    //console.log("createUserEmployer");

    const params = {        
        "Email": post.email,
        "Password": post.password,
        "RePassword": post.repassword,
        "Employer": {
            "id": null,
            "nombreComercialEmpresa" : post.nombreComercialEmpresa,
            "razonSocial" : post.razonSocial,
            "nombrePersona" : post.firtsName,
            "apellidoPersona" : post.lastName,
            "fechaNacimiento" : post.fechaNacimiento,
            "fechaCreacion" : null, //post.birthDate,
            "bPersonaJuridica" : null,// post.bPersonaJuridica,
            "rut" : post.rut,
            "frk_Paises" : post.frk_Paises,
            "frk_Regiones" : post.frk_Regiones,
            "frk_Ciudades" : post.frk_Ciudades,
            "ciudad" : post.city,
            "direccion" : post.street,
            "codigoPostal" : post.postalCode,
            "telefono" : post.telephone,
            "celular" : post.mobil,
            "frk_SectorComercial" : post.frk_SectorComercial,
            "frk_CantididadTrabajadores" : post.frk_CantididadTrabajadores,
            "frk_TipoEmpresa" : post.frk_TipoEmpresa,
            "frk_Cargo": post.frk_Cargo,
            "otroCargo": post.indicarOtroCargo,
            "descripcionEmpresa" : post.descripcionEmpresa,
            "urlEmpresa" : post.urlEmpresa,
            "rutaLogoEmpresa" : post.rutaLogo,
            "frk_AspNetUsers" : null,
            "bAnulado" : null,
            "password": post.password,
            "rePassword": post.rePassword,
            "email": post.email
        }
    };

    const formData = new FormData();
    formData.append("json", JSON.stringify(params)); 
    formData.append("Files",post.fileLogo);
    //console.log(params);

    await axios.post(webConfig.urlBaseAPI + '/api/Account/createEmployer', formData, { 
        headers:{crossDomain: true},
        onUploadProgress: function(progressEvent) {

            var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total )
            stateSite.setPercentajeUpload(percentCompleted >= 100 ? "Espere un momento por favor..." : percentCompleted + "%");

            //console.log(percentCompleted)
      
          }
    })
        .then(response => {
            //console.log(response);
            data = {
                bUserCreated: response.data.data,
                error:false,
                codeErrors: null
            }
            data.error = false;
        }).catch((error) => {
            console.log(error.response);

            data = { 
                bUserCreated: null,
                error : true,
                codeErrors: error.response.data
            };
        }).then((e) => {
            stateSite.setLoading(false);
            stateSite.setPercentajeUpload("");
        });
    
    dispatch({
        type: CREATE_USER_EMPLOYER,
        payload: data
    });
}

export const createUserPostulant = post => async dispatch => {
    let data = null;
    stateSite.setLoading(true);

    //console.log("createUserEmployer");

    const params = {        
        "Email": post.email,
        "Password": post.password,
        "RePassword": post.repassword,
        "Postulant": {
            "id": null,
            "nombrePersona" : post.firtsName,
            "apellidoPersona" : post.lastName,
            "fechaNacimiento" : post.fechaNacimiento,
            "frk_Paises" : post.frk_Paises,
            "frk_Regiones" : post.frk_Regiones,
            "frk_Ciudades" : post.frk_Ciudades,
            "ciudad" : post.city,
            "telefono" : post.telephone,
            "celular" : post.mobil,
        }
    };

    const formData = new FormData();
    formData.append("json", JSON.stringify(params)); 
    formData.append("Files",post.fileLogo);

    await axios.post(webConfig.urlBaseAPI + '/api/Account/createPostulant', formData, { 
        headers:{crossDomain: true},
        onUploadProgress: function(progressEvent) {

            var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total )
            stateSite.setPercentajeUpload(percentCompleted >= 100 ? "Espere un momento por favor..." : percentCompleted + "%");

            //console.log(percentCompleted)
      
          }
    })
        .then(response => {
            //console.log(response);
            data = {
                bUserCreated: response.data.data,
                error:false,
                codeErrors: null
            }
            data.error = false;
        }).catch((error) => {
            //console.log(error.response);

            data = { 
                bUserCreated: null,
                error : true,
                codeErrors: error.response.data
            };
        }).then((e) => {
            stateSite.setLoading(false);
            stateSite.setPercentajeUpload("");
        });
    
    dispatch({
        type: CREATE_USER_POSTULANT,
        payload: data
    });
}

export const updateEmployer = post => async dispatch => {
    let data = null;
    stateSite.setLoading(true);

    //console.log(post);

    const token = GetToken();

    const query ={
        query:
            `mutation UpdateEmployer($employer: EmployerInput!){
                updateEmployer(input:$employer){
                  data{
                    id
                    nombreComercialEmpresa
                    razonSocial
                    nombrePersona
                    apellidoPersona
                    fechaNacimiento
                    fechaCreacion
                    bPersonaJuridica
                    rut
                    frk_Paises{
                        id
                    }
                    frk_Regiones{
                        id
                    }
                    frk_Ciudades{
                        id
                    }
                    ciudad
                    direccion
                    codigoPostal
                    telefono
                    celular
                    frk_SectorComercial{
                        id
                    }
                    frk_CantididadTrabajadores{
                        id
                    }
                    frk_TipoEmpresa{
                        id
                    }
                    frk_Cargo{
                        id
                    }
                    otroCargo
                    descripcionEmpresa
                    urlEmpresa
                    rutaLogoEmpresa
                    frk_AspNetUsers{
                        id
                    }
                    bAnulado
                  }
                  errorMessage
                  statusCode
                }
              }`,
        variables:{
            employer: {
                "id": post.employerId,
                "nombreComercialEmpresa": post.nombreComercialEmpresa,
                "razonSocial": post.razonSocial,
                "nombrePersona": post.firtsName,
                "apellidoPersona": post.lastName,
                "fechaNacimiento": post.fechaNacimiento,
                //"fechaCreacion": null,
                //"bPersonaJuridica": null,
                "rut": post.rut,
                "ciudad": post.city,
                "direccion": post.street,
                "codigoPostal": post.postalCode,
                "telefono": post.telephone,
                "celular": post.mobil,
                "otroCargo": post.indicarOtroCargo,
                "descripcionEmpresa": post.descripcionEmpresa,
                "urlEmpresa": post.urlEmpresa,
                //"rutaLogoEmpresa": post.rutaLogo,
                /*"frk_AspNetUsers": {
                    "id": post.aspnetUserId
                },*/
                "frk_Paises" : post.frk_Paises,
                //"bAnulado": null,
                //"password": null,
                //"rePassword": null,
                //"email": null,
                "frk_Regiones" : post.frk_Regiones,

                "frk_Ciudades" : post.frk_Ciudades,

                "frk_SectorComercial" : post.frk_SectorComercial,

                "frk_CantididadTrabajadores" : post.frk_CantididadTrabajadores,

                "frk_TipoEmpresa" : post.frk_TipoEmpresa,

                "frk_Cargo" : post.frk_Cargo
            }
        },
        operationName:"UpdateEmployer"
    };

    const formData = new FormData();
    formData.append("json", JSON.stringify(query)); 
    formData.append("Files",post.fileLogo);
    //console.log(params);
    
    await axios.post(webConfig.urlBaseAPI + '/api/CustomGraphQLFormData', formData, { 
        headers:{
            crossDomain: true,
            'Authorization': `bearer ${token}`
        },
        onUploadProgress: function(progressEvent) {

            var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total )
            stateSite.setPercentajeUpload(percentCompleted >= 100 ? "Espere un momento por favor..." : percentCompleted + "%");

            //console.log(percentCompleted)
      
          }
        })
        .then(response => {
            //console.log(response);
            data = {
                updatedEmployer: response.data.data.updateEmployer.data,
                errorMessage: response.data.data.updateEmployer.errorMessage,
                statusCode: response.data.data.updateEmployer.statusCode,
                error: false
            }
        }).catch((error) => {
            console.log(error);

            data = { 
                bUserCreated: null,
                error : true,
                codeErrors: error.response.data
            };
        }).then((e) => {
            stateSite.setLoading(false);
            stateSite.setPercentajeUpload("");
        });
    
    dispatch({
        type: UPDATE_EMPLOYER,
        payload: data
    });
}

export const updatePostulant = post => async dispatch => {
    let data = null;
    stateSite.setLoading(true);

    const token = GetToken();

    const query ={
        query:
            `mutation UpdatePostulant($postulant: PostulanteInput!) {
                updatePostulant(input: $postulant) {
                  statusCode
                  errorMessage
                  data {
                    id
                    nombrePersona
                    apellidoPersona
                    fechaNacimiento
                    email
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
                    frk_Nacionalidad {
                        id
                        collectionName
                    }
                    rut
                  }
                }
              }`,
        variables:{
            "postulant": {
                "id": post.id,
                "nombrePersona": post.nombrePersona,
                "apellidoPersona": post.apellidoPersona,
                "fechaNacimiento": post.fechaNacimiento,
                "rut": post.rut,
                "idGenero": post.idGenero,
                "celular": post.celular,
                "telefono":  post.telefono,
                "frk_Paises": post.frk_Paises,
                "frk_Regiones": post.frk_Regiones,
                "frk_Ciudades": post.frk_Ciudades,
                "ciudad":  post.ciudad,
                "direccion":  post.direccion,
                "codigoPostal":  post.codigoPostal,
                "frk_EstadosCiviles":  post.frk_EstadosCiviles,
                "bVehiculo": post.bVehiculo,
                "licenciasConducir":  post.licenciasConducir,
                "bDiscapacidad": post.bDiscapacidad,
                "urlImagen": null,
                "fechaRegistro": null,
                "fechaUltimaActualizacion": null,
                "frk_AspNetUsers": null,
                "bAnulado": null,
                "frk_Nacionalidad": post.frk_Nacionalidad
              }
        },
        operationName:"UpdatePostulant"
    };

    const formData = new FormData();
    formData.append("json", JSON.stringify(query)); 
    formData.append("Files", post.fileLogo);
    //console.log(params);
    
    await axios.post(webConfig.urlBaseAPI + '/api/CustomGraphQLFormData', formData, { 
        headers:{
            crossDomain: true,
            'Authorization': `bearer ${token}`
        },
        onUploadProgress: function(progressEvent) {

            var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total )
            stateSite.setPercentajeUpload(percentCompleted >= 100 ? "Espere un momento por favor..." : percentCompleted + "%");

          }
        })
        .then(response => {
           
            data = {
                updatedPostulant: response.data.data.updatePostulant.data,
                errorMessage: response.data.data.updatePostulant.errorMessage,
                statusCode: response.data.data.updatePostulant.statusCode,
                error: false
            }
        }).catch((error) => {
            console.log(error);

            data = { 
                bUserCreated: null,
                error : true,
                codeErrors: error.response.data
            };
        }).then((e) => {
            stateSite.setLoading(false);
            stateSite.setPercentajeUpload("");
        });
    
    dispatch({
        type: UPDATE_POSTULANT,
        payload: data
    });
}
export const validateEmail = post => async dispatch => {
    let data = null;
    stateSite.setLoading(true);


    await axios.get(webConfig.urlBaseAPI + `/api/account/validateEmail?code=${post.code}&userId=${post.userId}`, {
        headers: {
          'Content-Type': 'application/json'/*,
          Authorization: `bearer ${token}`*/
        }
      })
        .then(response => {
            console.log(response);
            data = {
                result: response.data,
                error:false,
                codeErrors: null
            }
            data.error = false;
        }).catch((error) => {
            console.log(error.response);

            data = { 
                result: error.response.data[0].code,
                error : true,
                codeErrors: error.response.data
            };
        }).then((e) => {
            stateSite.setLoading(false);
        });
    
    dispatch({
        type: VALIDATE_EMAIL,
        payload: data
    });
}

export const saveDataEmployer = post => async dispatch => {

    dispatch({
        type: SAVE_DATA_EMPLOYER,
        payload: post
    });

}

export const getDataEmployer = () => async dispatch => {
    
    dispatch({
        type: GET_DATA_EMPLOYER
    });
    
}

export const resetReducer = () => async dispatch => {
    
    dispatch({
        type: RESET_REDUCER
    });
}

export const getFilterAdmin = () => async dispatch => {
    
    dispatch({
        type: GET_FILTER_ADMIN
    });
}

export const setFilterAdmin = (data) => async dispatch => {
    
    dispatch({
        type: SET_FILTER_ADMIN,
        payload: data
    });
}

export const captureContact = ({
    firtsName = "",
    secondName = "",
    email = "",
    codeCampaign = "",
    campaignDescription = ""
}) => async dispatch => {
    
  stateSite.setLoading(true);
  
  const token = GetToken();

  //console.log(fechaComienzo);

  const query ={
      query:
          `mutation ContactCampaign($contact: ContactSubscriberInput!) {
            captureContact(input: $contact) {
              statusCode
              errorMessage
              data {
                id
                campaignDescription
                codeCampaign
                email
                firtsName
                secondName
              }
            }
          }`,
        variables:{
            "contact": {
                "firtsName": firtsName,
                "secondName": secondName,
                "email": email,
                "codeCampaign": codeCampaign,
                "campaignDescription": campaignDescription
            }
        },
        operationName:"ContactCampaign"
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
          type: CONTACT_CAMPAIGN,
          payload: response.data.data.captureContact
      });

  }).catch(error => {
      console.log(error);

      const infoError = { 
          error : true,
          msgError: "Hemos tenido un problema, intente más tarde por favor."
      };

      dispatch({
          type: CONTACT_CAMPAIGN,
          payload: infoError
      });

  }).then((e) => {
      stateSite.setLoading(false);
  });
}