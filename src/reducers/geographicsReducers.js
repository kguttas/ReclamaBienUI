import { 
    GET_COUNTRIES,
    GET_REGIONS , 
    GET_COMMUNES,
    RESET_REDUCER} from '../actions/types';

const initialState = {
    countries: [],
    regions: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case RESET_REDUCER:
            //console.log("RESET_REDUCER - Geographics");
            return initialState;
        case GET_COUNTRIES:
            
            return {
                ...state,
                countries: action.payload
            }
        case GET_REGIONS:
            
            return {
                ...state,
                regions: action.payload
            }
        case GET_COMMUNES:
            
            return {
                ...state,
                communes: action.payload
            }
        default:
            return state;
    }
}