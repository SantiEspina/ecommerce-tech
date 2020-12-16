import { 
    ORDER_BY_FILT, 
    ADD_PRODUCT,
    GET_PRODUCTS, 
    GET_CATEGORIES, 
    GET_DETAILS, 
    FIND_PRODUCT_SUCCESS, 
    DELETE_PRODUCT, 
    EDIT_PRODUCT,
    REMOVE_CATEGORY_TO_PRODUCT, 
    GET_PRODUCT_BY_CATEGORY,
    DELETE_CATEGORY,
    EDIT_CATEGORY,
    ADD_TO_CART,
    GET_ORDERS
} from './constants';

let initialState = {};

export default function findProductReducer(state = initialState, action) {
    switch(action.type) {
        case GET_PRODUCTS:
            return {
                ...state,
                products: action.payload.sort((a, b) => a.id - b.id)
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
                products: state.products
            }
        case REMOVE_CATEGORY_TO_PRODUCT:
            return {
                ...state,
                products: state.products
            }
        case GET_PRODUCT_BY_CATEGORY:
            return {
                ...state,
                products: action.payload
            }
        case DELETE_CATEGORY:
            return {
                ...state
            }
        case EDIT_CATEGORY:
            return {
                ...state,
                categories: state.categories
            }
        case ADD_TO_CART:
            return {
                ...state,
                product: action.payload
            }
        case GET_ORDERS:
            return {
                ...state,
                product:action.payload
            } 
        default: return state;
    }
}