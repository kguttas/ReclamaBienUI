import { 
    GET_COMMERCIAL_SECTORS, 
    GET_TYPES_EMPLOYERS, 
    GET_NUMERICAL_RANGES , 
    GET_POSITIONS_COMPANY,
    RESET_REDUCER,
    GET_EMPLOYMENT_CATEGORIES,
    GET_PROFESSIONS,
    GET_EDUCATIONAL_LEVEL,
    GET_IDIOMS,
    GET_TYPES_CONTRACTS,
    GET_TYPES_SALARIES,
    GET_TYPES_PAYMENT_PERIODICITY,
} from './types';

import { webConfig } from '../GlobalConfig';

import axios from 'axios';

export const getCommercialSectors = () => async dispatch => {
    //stateSite.setLoading(true);
    //console.log(post);
    const query ={
        query:
            `query ListCommercialSectors($pag:PaginationCommercialSectorsInput!){
                commercialSectorsList(input:$pag){
                  data{
                    itemsCount
                    data{
                      id
                      nombre
                      codigo
                      bAnulado
                    }
                  }
                }
              }`,
        variables:{
            pag: {
                "id": null,
                "pageSize": 1000,
                "pageIndex": 0,
                "keySearch": "",
                "bShowDisableRegisters": null
            }
        },
        operationName:"ListCommercialSectors"
    };

    await axios.post(webConfig.urlBaseAPI + '/api/CustomGraphQL', query, {
        headers: {
            //'Content-Type': 'application/json'/*,
            //Authorization: `bearer ${token}`*/
        }
      })
        .then(response => {
            //console.log(response.data.data.countriesList.data.data);
            
            dispatch({
                type: GET_COMMERCIAL_SECTORS,
                payload: response.data.data.commercialSectorsList.data.data
            });
            
        }).catch(error => {
            console.log(error);

            const infoError = { 
                error : true,
                msgError: "Hemos tenido un problema, intente más tarde por favor."
            };

            dispatch({
                type: GET_COMMERCIAL_SECTORS,
                payload: infoError
            });

        }).then((e) => {
            //stateSite.setLoading(false);
        });
    
   
}

export const getEmploymentCategories = () => async dispatch => {
    //stateSite.setLoading(true);
    //console.log(post);
    const query ={
        query:
            `query ListEmploymentCategories($pagination:PaginationEmploymentCategoriesInput!){
                employmentCategoriesList(input:$pagination){
                  data{
                    itemsCount
                    data{
                        id
                        nombre
                        orden
                        bAnulado
                    }
                  }
                }
              }`,
        variables:{
            pagination: {
                "id": null,
                "pageSize": 1000,
                "pageIndex": 0,
                "keySearch": "",
                "bShowDisableRegisters": null
            }
        },
        operationName:"ListEmploymentCategories"
    };

    await axios.post(webConfig.urlBaseAPI + '/api/CustomGraphQL', query, {
        headers: {
            //'Content-Type': 'application/json'/*,
            //Authorization: `bearer ${token}`*/
        }
      })
        .then(response => {
            //console.log(response.data.data.countriesList.data.data);
            
            dispatch({
                type: GET_EMPLOYMENT_CATEGORIES,
                payload: response.data.data.employmentCategoriesList.data.data
            });
            
        }).catch(error => {
            console.log(error);

            const infoError = { 
                error : true,
                msgError: "Hemos tenido un problema, intente más tarde por favor."
            };

            dispatch({
                type: GET_EMPLOYMENT_CATEGORIES,
                payload: infoError
            });

        }).then((e) => {
            //stateSite.setLoading(false);
        });
    
   
}

export const getNumericalRanges = post => async dispatch => {
    //stateSite.setLoading(true);
    //console.log(post);
    const query ={
        query:
            `query ListNumericalRanges($pag:PaginationNumericalRangesInput!){
                numericalRangesList(input:$pag){
                  data{
                    itemsCount
                    data
                    {
                      id
                      rango
                      categoria
                      orden
                      bAnulado
                    }
                  }
                }
              }`,
        variables:{
            pag: {
                "id": null,
                "pageSize": 1000,
                "pageIndex": 0,
                "keySearch": "",
                "bShowDisableRegisters": null,
                "category": post.category
            }
        },
        operationName:"ListNumericalRanges"
    };

    await axios.post(webConfig.urlBaseAPI + '/api/CustomGraphQL', query, {
        headers: {
            //'Content-Type': 'application/json'/*,
            //Authorization: `bearer ${token}`*/
        }
      })
        .then(response => {
            //console.log(response.data.data.countriesList.data.data);
            
            dispatch({
                type: GET_NUMERICAL_RANGES,
                payload: response.data.data.numericalRangesList.data.data
            });
            
        }).catch(error => {
            console.log(error);

            const infoError = { 
                error : true,
                msgError: "Hemos tenido un problema, intente más tarde por favor."
            };

            dispatch({
                type: GET_NUMERICAL_RANGES,
                payload: infoError
            });

        }).then((e) => {
            //stateSite.setLoading(false);
        });
    
   
}

export const getTypesEmployers = post => async dispatch => {
    //stateSite.setLoading(true);
    //console.log(post);
    const query ={
        query:
            `query ListTypesEmployers($pag:PaginationTypesEmployersInput!){
                typesEmployersList(input:$pag){
                  data{
                    itemsCount
                    data{
                      id
                      nombre
                      descripcion
                      codigo
                      bAnulado
                    }
                  }
                }
              }`,
        variables:{
            pag: {
                "id": null,
                "pageSize": 1000,
                "pageIndex": 0,
                "keySearch": "",
                "bShowDisableRegisters": null
            }
        },
        operationName:"ListTypesEmployers"
    };

    await axios.post(webConfig.urlBaseAPI + '/api/CustomGraphQL', query, {
        headers: {
            //'Content-Type': 'application/json'/*,
            //Authorization: `bearer ${token}`*/
        }
      })
        .then(response => {
            //console.log(response.data.data.countriesList.data.data);
            
            dispatch({
                type: GET_TYPES_EMPLOYERS,
                payload: response.data.data.typesEmployersList.data.data
            });
            
        }).catch(error => {
            console.log(error);

            const infoError = { 
                error : true,
                msgError: "Hemos tenido un problema, intente más tarde por favor."
            };

            dispatch({
                type: GET_TYPES_EMPLOYERS,
                payload: infoError
            });

        }).then((e) => {
            //stateSite.setLoading(false);
        });
    
   
}

export const getPositionsCompany = post => async dispatch => {
    //stateSite.setLoading(true);
    //console.log(post);
    const query ={
        query:
            `query ListPositionsCompany($pagPC:PaginationPositionsCompanyInput!){
                positionsCompanyList(input:$pagPC){
                  data{
                    itemsCount
                    data{
                      id
                      nombre
                      descripcion
                      orden
                      bAnulado
                    }
                  }
                }
              }`,
        variables:{
            pagPC: {
                "id": null,
                "pageSize": 1000,
                "pageIndex": 0,
                "keySearch": "",
                "bShowDisableRegisters": null
            }
        },
        operationName:"ListPositionsCompany"
    };

    await axios.post(webConfig.urlBaseAPI + '/api/CustomGraphQL', query, {
        headers: {
            //'Content-Type': 'application/json'/*,
            //Authorization: `bearer ${token}`*/
        }
      })
        .then(response => {
            //console.log(response.data.data.positionsCompanyList.data.data);
            
            dispatch({
                type: GET_POSITIONS_COMPANY,
                payload: response.data.data.positionsCompanyList.data.data
            });
            
        }).catch(error => {
            console.log(error);

            const infoError = { 
                error : true,
                msgError: "Hemos tenido un problema, intente más tarde por favor."
            };

            dispatch({
                type: GET_POSITIONS_COMPANY,
                payload: infoError
            });

        }).then((e) => {
           // stateSite.setLoading(false);
        });
    
   
}

export const getProfessions = post => async dispatch => {
    //stateSite.setLoading(true);
    //console.log(post);
    const query ={
        query:
            `query ListProfessions($pagination:PaginationProfessionsInput!){
                professionsList(input: $pagination){
                  data{
                    itemsCount
                    data{
                      id
                      nombre
                      bAnulado
                      orden
                    }
                  }
                }
              }`,
        variables:{
            pagination: {
                "id": null,
                "pageSize": 1000,
                "pageIndex": 0,
                "keySearch": "",
                "bShowDisableRegisters": null
            }
        },
        operationName:"ListProfessions"
    };

    await axios.post(webConfig.urlBaseAPI + '/api/CustomGraphQL', query, {
        headers: {
            //'Content-Type': 'application/json'/*,
            //Authorization: `bearer ${token}`*/
        }
      })
        .then(response => {
            //console.log(response.data.data.professionsList.data.data);
            
            dispatch({
                type: GET_PROFESSIONS,
                payload: response.data.data.professionsList.data.data
            });
            
        }).catch(error => {
            console.log(error);

            const infoError = { 
                error : true,
                msgError: "Hemos tenido un problema, intente más tarde por favor."
            };

            dispatch({
                type: GET_PROFESSIONS,
                payload: infoError
            });

        }).then((e) => {
           // stateSite.setLoading(false);
        });
    
   
}

export const getEducationalLevel = post => async dispatch => {
    //stateSite.setLoading(true);
    //console.log(post);
    const query ={
        query:
            `query ListEducationLevel($pagination: PaginationEducationLevelInput!){
                educationLevelList(input:$pagination){
                    data{
                   itemsCount
                   data{
                     id
                     nombre
                     bAnulado
                     orden
                   }
                 }
               }
             }`,
        variables:{
            pagination: {
                "id": null,
                "pageSize": 1000,
                "pageIndex": 0,
                "keySearch": "",
                "bShowDisableRegisters": null
            }
        },
        operationName:"ListEducationLevel"
    };

    await axios.post(webConfig.urlBaseAPI + '/api/CustomGraphQL', query, {
        headers: {
            //'Content-Type': 'application/json'/*,
            //Authorization: `bearer ${token}`*/
        }
      })
        .then(response => {
            //console.log(response.data.data.professionsList.data.data);
            
            dispatch({
                type: GET_EDUCATIONAL_LEVEL,
                payload: response.data.data.educationLevelList.data.data
            });
            
        }).catch(error => {
            console.log(error);

            const infoError = { 
                error : true,
                msgError: "Hemos tenido un problema, intente más tarde por favor."
            };

            dispatch({
                type: GET_EDUCATIONAL_LEVEL,
                payload: infoError
            });

        }).then((e) => {
           // stateSite.setLoading(false);
        });
    
   
}

export const getIdioms = post => async dispatch => {
    //stateSite.setLoading(true);
    //console.log(post);
    const query ={
        query:
            `query ListIdiomas($pagination: PaginationIdiomsInput!){
                idiomsList(input:$pagination){
                  data{
                    itemsCount
                    data{
                      id
                      nombre
                      codigo
                      bAnulado
                    }
                  }
                }
              }`,
        variables:{
            pagination: {
                "id": null,
                "pageSize": 1000,
                "pageIndex": 0,
                "keySearch": "",
                "bShowDisableRegisters": null
            }
        },
        operationName:"ListIdiomas"
    };

    await axios.post(webConfig.urlBaseAPI + '/api/CustomGraphQL', query, {
        headers: {
            //'Content-Type': 'application/json'/*,
            //Authorization: `bearer ${token}`*/
        }
      })
        .then(response => {
            //console.log(response.data.data.professionsList.data.data);
            
            dispatch({
                type: GET_IDIOMS,
                payload: response.data.data.idiomsList.data.data
            });
            
        }).catch(error => {
            console.log(error);

            const infoError = { 
                error : true,
                msgError: "Hemos tenido un problema, intente más tarde por favor."
            };

            dispatch({
                type: GET_IDIOMS,
                payload: infoError
            });

        }).then((e) => {
           // stateSite.setLoading(false);
        });
    
   
}

export const getTypesContracts = post => async dispatch => {
    //stateSite.setLoading(true);
    //console.log(post);
    const query ={
        query:
            `query ListTypesContracts($pagination: PaginationTypesContractsInput!){
                typesContractsList(input: $pagination){
                  statusCode
                  errorMessage
                  data{
                    itemsCount
                    data{
                      id
                      nombre
                      orden
                      bAnulado
                    }
                  }
                }
              }`,
        variables:{
            pagination: {
                "id": null,
                "pageSize": 1000,
                "pageIndex": 0,
                "keySearch": "",
                "bShowDisableRegisters": null
            }
        },
        operationName:"ListTypesContracts"
    };

    await axios.post(webConfig.urlBaseAPI + '/api/CustomGraphQL', query, {
        headers: {
            //'Content-Type': 'application/json'/*,
            //Authorization: `bearer ${token}`*/
        }
      })
        .then(response => {
            //console.log(response.data.data.professionsList.data.data);
            
            dispatch({
                type: GET_TYPES_CONTRACTS,
                payload: response.data.data.typesContractsList.data.data
            });
            
        }).catch(error => {
            console.log(error);

            const infoError = { 
                error : true,
                msgError: "Hemos tenido un problema, intente más tarde por favor."
            };

            dispatch({
                type: GET_TYPES_CONTRACTS,
                payload: infoError
            });

        }).then((e) => {
           // stateSite.setLoading(false);
        });
    
   
}

export const getTypesSalaries = post => async dispatch => {
    //stateSite.setLoading(true);
    //console.log(post);
    const query ={
        query:
            `query ListTypesSalaries($pagination: PaginationTypesSalariesInput!){
                typesSalariesList(input:$pagination){
                  errorMessage
                  statusCode
                  data{
                    itemsCount
                    data{
                      id
                      nombre
                      orden
                      bAnulado
                    }
                  }
                }
              }`,
        variables:{
            pagination: {
                "id": null,
                "pageSize": 1000,
                "pageIndex": 0,
                "keySearch": "",
                "bShowDisableRegisters": null
            }
        },
        operationName:"ListTypesSalaries"
    };

    await axios.post(webConfig.urlBaseAPI + '/api/CustomGraphQL', query, {
        headers: {
            //'Content-Type': 'application/json'/*,
            //Authorization: `bearer ${token}`*/
        }
      })
        .then(response => {
            //console.log(response.data.data.typesSalariesList.data.data);
            
            dispatch({
                type: GET_TYPES_SALARIES,
                payload: response.data.data.typesSalariesList.data.data
            });
            
        }).catch(error => {
            console.log(error);

            const infoError = { 
                error : true,
                msgError: "Hemos tenido un problema, intente más tarde por favor."
            };

            dispatch({
                type: GET_TYPES_SALARIES,
                payload: infoError
            });

        }).then((e) => {
           // stateSite.setLoading(false);
        });
    
   
}

export const getTypesPaymentPeriodicity = post => async dispatch => {
    //stateSite.setLoading(true);
    //console.log(post);
    const query ={
        query:
            `query ListPaymentPeriodicity($pagination: PaginationTypesPaymentPeriodicityInput!){
                typesPaymentPeriodicityList(input:$pagination){
                  errorMessage
                  statusCode
                  data{
                    itemsCount
                    data{
                      id
                      nombre
                      orden
                      bAnulado
                    }
                  }
                }
              }`,
        variables:{
            pagination: {
                "id": null,
                "pageSize": 1000,
                "pageIndex": 0,
                "keySearch": "",
                "bShowDisableRegisters": null
            }
        },
        operationName:"ListPaymentPeriodicity"
    };

    await axios.post(webConfig.urlBaseAPI + '/api/CustomGraphQL', query, {
        headers: {
            //'Content-Type': 'application/json'/*,
            //Authorization: `bearer ${token}`*/
        }
      })
        .then(response => {
            //console.log(response.data.data.typesPaymentPeriodicityList.data.data);
            
            dispatch({
                type: GET_TYPES_PAYMENT_PERIODICITY,
                payload: response.data.data.typesPaymentPeriodicityList.data.data
            });
            
        }).catch(error => {
            console.log(error);

            const infoError = { 
                error : true,
                msgError: "Hemos tenido un problema, intente más tarde por favor."
            };

            dispatch({
                type: GET_TYPES_PAYMENT_PERIODICITY,
                payload: infoError
            });

        }).then((e) => {
           // stateSite.setLoading(false);
        });
    
   
}

export const resetReducer = () => async dispatch => {
    
    dispatch({
        type: RESET_REDUCER
    });
}

