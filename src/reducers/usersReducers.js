import { 
    LOGIN_USER, 
    CREATE_USER_POSTULANT,
    CREATE_USER_EMPLOYER, 
    VALIDATE_EMAIL, 
    LOGIN_POSTULANT,
    LOGIN_EMPLOYER, 
    LOGIN_ADMIN,
    RESET_PASSWORD,
    CHANGE_PASSWORD, 
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
} from '../actions/types';

const initialState = {
    token: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_FILTER_ADMIN:
            return {
                ...state,
                filterAdmin: action.payload
            };
        case GET_FILTER_ADMIN:
            
            return {
                ...state
            };

        case RESET_REDUCER:
            //console.log("RESET_REDUCER - Users");
            return initialState;
        case LOGIN_USER:
            
            return {
                ...state,
                token: action.payload
            }
        case LOGIN_POSTULANT:
            return{
                ...state,
                token: action.payload
            }
        case LOGIN_EMPLOYER:
            return{
                ...state,
                token: action.payload
            }
        case LOGIN_ADMIN:
            return{
                ...state,
                token: action.payload
            }
        case RESET_PASSWORD:
            return {
                ...state,
                resultResetPassword: action.payload
            }
        case CHANGE_PASSWORD:
            return {
                ...state,
                resultChangePassword: action.payload
            }
        case CHANGE_PASSWORD_USER:
            return {
                ...state,
                resultChangePasswordUser: action.payload
            }
        case CREATE_USER_POSTULANT:
            return {
                ...state,
                newUser: action.payload
            }
        case CREATE_USER_EMPLOYER:
            return {
                ...state,
                newUserEmployer: action.payload
            }
        case UPDATE_EMPLOYER:
            return {
                ...state,
                updateEmployer: action.payload
            }
        case UPDATE_POSTULANT:

            return {
                ...state,
                updatePostulant: action.payload
            }
            
        case GET_EMPLOYER:
            
            return {
                ...state,
                employer: action.payload
            }
            
        case GET_DATA_EMPLOYER_BY_ID:
            return {
                ...state,
                resultGetEmployerById:action.payload
            }
        case GET_POSTULANT:
        
            return {
                ...state,
                postulant: action.payload
            }
        case VALIDATE_EMAIL:
            return {
                ...state,
                validatedEmailResult: action.payload
            }
        case SAVE_DATA_EMPLOYER:
        //console.log(action.payload);
            return {
                ...state,
                resultDataEmployer: action.payload
            }
        case GET_DATA_EMPLOYER:
            
            return {
                ...state
            }
        case CONTACT_CAMPAIGN:
            return{
                ...state,
                resultContactCampaign: action.payload,
            }

        default:
            return state;
    }
}