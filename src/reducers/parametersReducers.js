import { 
    GET_COMMERCIAL_SECTORS, 
    GET_TYPES_EMPLOYERS, 
    GET_NUMERICAL_RANGES,
    GET_POSITIONS_COMPANY,
    RESET_REDUCER,
    GET_EMPLOYMENT_CATEGORIES,
    GET_PROFESSIONS,
    GET_EDUCATIONAL_LEVEL,
    GET_IDIOMS,
    GET_TYPES_CONTRACTS,
    GET_TYPES_SALARIES,
    GET_TYPES_PAYMENT_PERIODICITY,
} from '../actions/types';

const initialState = {
    commercialSectors: [],
    typesEmployers: [],
    numericalRanges: [],
}

export default function (state = initialState, action) {
    switch (action.type) {
        case RESET_REDUCER:
        //console.log("RESET_REDUCER - Parameters");
            return initialState;
        case GET_COMMERCIAL_SECTORS:
         
            return {
                ...state,
                commercialSectors: action.payload
            }
        case GET_EMPLOYMENT_CATEGORIES:
        
            return {
                ...state,
                employmentCategories: action.payload
            }
        case GET_TYPES_EMPLOYERS:
         
            return {
                ...state,
                typesEmployers: action.payload
            }
        case GET_NUMERICAL_RANGES:
         
            return {
                ...state,
                numericalRanges: action.payload
            }
        case GET_POSITIONS_COMPANY:
            
            return {
                ...state,
                positionsCompany: action.payload
            }
        case GET_PROFESSIONS:
            
            return {
                ...state,
                professions: action.payload
            }
        case GET_EDUCATIONAL_LEVEL:
            
            return {
                ...state,
                educationalLevel: action.payload
            }
        case GET_IDIOMS:
            
            return {
                ...state,
                idioms: action.payload
            }
        case GET_TYPES_CONTRACTS:
            
            return {
                ...state,
                typesContracts: action.payload
            }
        case GET_TYPES_SALARIES:
            
            return {
                ...state,
                typesSalaries: action.payload
            }
        case GET_TYPES_PAYMENT_PERIODICITY:
            
            return {
                ...state,
                typesPaymentPeriodicity: action.payload
            }
        default:
            return state;
    }
}