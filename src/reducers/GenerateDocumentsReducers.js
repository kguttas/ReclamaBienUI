import { 
    GENERATE_DOCUMENTS_EXP_A
} from '../actions/types';

const initialState = {
    experimentA: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GENERATE_DOCUMENTS_EXP_A:
            return {
                ...state,
                experimentA: action.payload
            }
        default:
            return state;
    }
}