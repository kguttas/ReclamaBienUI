import { 
  GET_COUNTRIES, 
  GET_REGIONS, 
  GET_COMMUNES,
  RESET_REDUCER
} from './types';

import { webConfig } from '../GlobalConfig';

import axios from 'axios';

export const getCountries = () => async dispatch => {
  
    //stateSite.setLoading(true);
    const query ={
        query:
            `query ListCountries($pagCountries:PaginationCountriesInput!){
                countriesList(input:$pagCountries){
                  data{
                    itemsCount
                    data
                    {
                      id
                      codigo
                      nombre
                      tld
                      bAnulado
                    }
                  }
                }
              }`,
        variables:{
            pagCountries: {
                "id": null,
                "pageSize": 1000,
                "pageIndex": 0,
                "keySearch": "",
                "bShowDisableRegisters": null
            }
        },
        operationName:"ListCountries"
    };
    
    await axios.post(webConfig.urlBaseAPI + '/api/CustomGraphQL', query, {
      crossDomain: true,
        headers: {
            //'Content-Type': 'application/json'/*,
            //Authorization: `bearer ${token}`*/
        }
      })
        .then(response => {
            //console.log(response.data.data.countriesList.data.data);
            
            dispatch({
                type: GET_COUNTRIES,
                payload: response.data.data.countriesList.data.data
            });
            
        }).catch(error => {
            console.log(error);

            const infoError = { 
                error : true,
                msgError: "Hemos tenido un problema, intente más tarde por favor."
            };

            dispatch({
                type: GET_COUNTRIES,
                payload: infoError
            });

        }).then((e) => {
            //stateSite.setLoading(false);
        });
    
   
}

export const getRegions = post => async dispatch => {
    //stateSite.setLoading(true);
    const query ={
        query:
            `query ListRegions($pagRegions:PaginationRegionsInput!){
                regionsList(input:$pagRegions){
                  data{
                    data{
                      id
                      nombre
                      codigo
                      bAnulado
                      frk_paises{
                        id
                        collectionName
                      }
                    }
                  }
                }
              }`,
        variables:{
            pagRegions: {
                "id": null,
                "pageSize": 1000,
                "pageIndex": 0,
                "keySearch": "",
                "bShowDisableRegisters": null,
                "idPais": post.idPais
              }
        },
        operationName:"ListRegions"
    };

   await axios.post(webConfig.urlBaseAPI + '/api/CustomGraphQL', query, {
        headers: {
            //'Content-Type': 'application/json',
            //Authorization: `bearer ${token}`
        }
      })
        .then(response => {
            //console.log(response.data.data.regionsList.data.data);
            
           dispatch({
                type: GET_REGIONS,
                payload: response.data.data.regionsList.data.data
            });
            
        }).catch(error => {
            console.log(error);

            const infoError = { 
                error : true,
                msgError: "Hemos tenido un problema, intente más tarde por favor."
            };

            dispatch({
                type: GET_REGIONS,
                payload: infoError
            });

        }).then((e) => {
            //stateSite.setLoading(false);
        });
   
}

export const getCommunes = post => async dispatch => {
    //stateSite.setLoading(true);
    //let data = {};
    //console.log(JSON.stringify(post));
    //stateSite.setLoading(true);

    const query ={
        query:
            `query ListCommunes($pagCommunes:PaginationCommunesInput!){
                communesList(input:$pagCommunes){
                  data{
                    itemsCount
                    data
                    {
                      id
                      codigo
                      nombre
                      bAnulado
                      frk_regiones
                      {
                        id
                        collectionName
                      }
                    }
                  }
                }
              }`,
        variables:{
            pagCommunes: {
                "id": null,
                "pageSize": 1000,
                "pageIndex": 0,
                "keySearch": "",
                "bShowDisableRegisters": null,
                "idRegion": post.idRegion
              }
        },
        operationName:"ListCommunes"
    };

   await axios.post(webConfig.urlBaseAPI + '/api/CustomGraphQL', query, {
        headers: {
            //'Content-Type': 'application/json',
            //Authorization: `bearer ${token}`
        }
      })
        .then(response => {
            //console.log(response.data.data.communesList.data.data);
            
            dispatch({
                type: GET_COMMUNES,
                payload: response.data.data.communesList.data.data
            });
            
        }).catch(error => {
            console.log(error);

            const infoError = { 
                error : true,
                msgError: "Hemos tenido un problema, intente más tarde por favor."
            };

            dispatch({
                type: GET_COMMUNES,
                payload: infoError
            });

        }).then((e) => {
            //stateSite.setLoading(false);
        });
   
}

export const resetReducer = () => async dispatch => {
    
  dispatch({
      type: RESET_REDUCER
  });
}