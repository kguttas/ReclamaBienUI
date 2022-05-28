import { MOSTRAR_PRODUCTOS, ELIMINAR_PRODUCTO, AGREGAR_PRODUCTO, MOSTRAR_PRODUCTO , EDITAR_PRODUCTO} from '../actions/types';

const initialState = {
    productos: []
}

export default function(state = initialState, action){
    switch(action.type){
        case MOSTRAR_PRODUCTOS:
            return {
                ...state,
                productos: action.payload
            }
        case MOSTRAR_PRODUCTO:
            return {
                ...state,
                producto: action.payload
            }
        case EDITAR_PRODUCTO:
            return {
                ...state,
                productos: state.productos.map(producto => 
                    producto.id === action.payload.id ?
                    (producto = action.payload) : 
                    producto)
            }
        case ELIMINAR_PRODUCTO:
            return {
                ...state,
                productos: state.productos.filter(item => item.id !== action.payload)
            }
        case AGREGAR_PRODUCTO:
            return {
                ...state,
                productos: [...state.productos, action.payload]
            }
        default:
            return state;
    }
}