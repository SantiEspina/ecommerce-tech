import { ORDER_BY_FILT, ADD_PRODUCT, GET_PRODUCTS, GET_CATEGORIES, GET_DETAILS, FIND_PRODUCT_SUCCESS, DELETE_PRODUCT, EDIT_PRODUCT } from './constants';

let initialState = {};

export default function findProductReducer(state = initialState, action) {
    switch(action.type) {
        case GET_PRODUCTS:
            return {
                ...state,
                products: action.payload,
            } 
        case GET_DETAILS:
            return {
                ...state,
                details: action.payload,
            }
        case GET_CATEGORIES:
            return {
                ...state,
                categories: action.payload,
            }
        case ORDER_BY_FILT:
            return {
                ...state,
                products: action.payload
            }
        case FIND_PRODUCT_SUCCESS:  
            return {
                ...state,
                products: action.payload
            }
        case ADD_PRODUCT:
            return {
                ...state,
                products: action.payload
            }
            case DELETE_PRODUCT:
                return {
                    ...state
                }
            case EDIT_PRODUCT:
                return {
                    ...state,
                    products: [...state.products, action.payload]
                }
        default: return state;
    }
}