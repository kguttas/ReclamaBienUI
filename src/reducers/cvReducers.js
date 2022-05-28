import { 
    GET_CV,
    CREATE_CV,
    GET_CV_BY_ID,
    RESET_REDUCER
} from '../actions/types';

const initialStateCV = {
    
}

export default function (state = initialStateCV, action) {
    switch (action.type) {
        case RESET_REDUCER:
            console.log("RESET_REDUCER - CVs");
            return initialStateCV;
        case GET_CV:
            return {
                ...state,
                cv: action.payload,
            }
        case CREATE_CV:
            return {
                ...state,
                newCV: action.payload,
            }     
        case GET_CV_BY_ID:
            return {
                ...state,
                cvById: action.payload,
            }     
        default:
            return state;
    }
}