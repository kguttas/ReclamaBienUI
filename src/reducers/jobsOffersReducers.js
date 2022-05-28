import { 
    RESET_REDUCER,
    GET_JOBS_OFFERS,
    GET_JOBS_OFFERS_PUBLIC,
    GET_JOBS_OFFERS_EMPLOYERS,
    CREATE_JOB_OFFER,
    COPY_JOBS_OFFERS,
    DISABLE_JOBS_OFFERS,
} from '../actions/types';

const initialStateJobsOffers = {
    
}

export default function (state = initialStateJobsOffers, action) {
    switch (action.type) {
        case RESET_REDUCER:
            //console.log("RESET_REDUCER - Jobs Offers");
            return initialStateJobsOffers;
        
        case GET_JOBS_OFFERS:
        //console.log(action.payload);
            return {
                ...state,
                jobsOffersList: action.payload,
            }
        case GET_JOBS_OFFERS_PUBLIC:
        //console.log(action.payload);
            return {
                ...state,
                jobsOffersList: action.payload,
            }
        case GET_JOBS_OFFERS_EMPLOYERS:
            return {
                ...state,
                jobsOffersEmployersList: action.payload,
            }
        case CREATE_JOB_OFFER:
            return {
                ...state,
                resultJobOfferCreated: action.payload,
            }
        case COPY_JOBS_OFFERS:
                return {
                    ...state,
                    resultJobOfferCopied: action.payload,
                }
        case DISABLE_JOBS_OFFERS:
            return {
                ...state,
                resultJobOfferDisable: action.payload,
            }
        default:
            return state;
    }
}