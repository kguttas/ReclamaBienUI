import { 
GENERATE_DOCUMENTS_EXP_A
  } from './types';
  
import { webConfig } from '../GlobalConfig';
import { DownloadFilePost } from '../utiles'
  
import axios from 'axios';
  
export const getExperimentA = post => async dispatch => {
    
    const dataBody = post

    DownloadFilePost('Carta Reclamo Tipo A', webConfig.urlBaseAPI + '/api/GenerateDocuments/ExpA', "", dataBody, dispatch, GENERATE_DOCUMENTS_EXP_A)
}