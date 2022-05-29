import { combineReducers } from 'redux';
import productosReducers from './productosReducers';
import usersReducers from './usersReducers';
import geographicsReducers from './geographicsReducers';
import parametersReducers from './parametersReducers';
import jobsOffersReducers from './jobsOffersReducers';
import cvReducers from './cvReducers';
import jobsOffersApplicaciontReducers from './jobsOffersApplicaciontReducers';
import GenerateDocumentsReducers from './GenerateDocumentsReducers'

export default combineReducers({
    productos: productosReducers,
    userAuth: usersReducers,
    geographics: geographicsReducers,
    parameters: parametersReducers,
    jobsOffers: jobsOffersReducers,
    cvPostulant: cvReducers, 
    jobsOffersApplication: jobsOffersApplicaciontReducers,
    ////////////////
    GenerateDocumentsReducers
});

