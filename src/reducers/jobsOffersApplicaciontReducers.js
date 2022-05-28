import { 
    CREATE_JOB_OFFER_APPLICATION,
    EXISTS_JOB_OFFER_APPLICATION,
    GET_JOB_OFFER_APPLICATION,
    CREATE_JOB_APPLICATION_STATE,
    RESET_REDUCER,
} from '../actions/types';

const initialStateJobsffersApplication = {
    
}

export default function (state = initialStateJobsffersApplication, action) {
    switch (action.type) {
        case RESET_REDUCER:
            //console.log("RESET_REDUCER - Jobs Offers Application");
            return initialStateJobsffersApplication;
        case EXISTS_JOB_OFFER_APPLICATION:
            return {
                ...state,
                existsJobOfferApplication: action.payload,
            }
        case CREATE_JOB_OFFER_APPLICATION:
            return {
                ...state,
                createJobOfferApplicacion: action.payload,
            }   
        case GET_JOB_OFFER_APPLICATION:
            return {
                ...state,
                getJobOfferApplicacionListData: action.payload,
            }
        case CREATE_JOB_APPLICATION_STATE:
            return {
                ...state,
                jooApplicationNewState: action.payload,
            }
        default:
            return state;
    }
}