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
    GET_ORDERS,
    ADD_USER,
    ADD_PRODUCT_TO_ORDER,
    GET_PRODUCTS_TO_ORDER,
    CREATE_ORDER_TO_USER,
    GET_USER,
    LOGIN_USER,
    GET_ME,
    LOG_OUT,
    DELETE_ORDER,
    DELETE_PRODUCT_ORDER,
    DELETE_USER,
    ADD_USER_ADMIN,
    GET_DETAILS_USER,
    GET_ORDERS_USER,
    EDIT_USER,
    PROMOTE_TO_ADMIN,
    GET_REVIEWS,
    ADD_REVIEW
} from './constants';

let initialState = {};

export default function findProductReducer(state = initialState, action) {
    switch (action.type) {
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
        case GET_ORDERS:
            return {
                ...state,
                orders: action.payload.sort((a, b) => a.id - b.id)
            }
        case ADD_USER:
            return {
                ...state,
                user: action.payload
            }
        case ADD_PRODUCT_TO_ORDER:
            return {
                ...state,
                cart: action.payload
            }
        case GET_PRODUCTS_TO_ORDER:
            return {
                ...state,
                cart: action.payload
            }
        case CREATE_ORDER_TO_USER:
            return {
                ...state,
                order: action.payload
            }
        case GET_USER:
            return {
                ...state,
                users: action.payload.sort((a, b) => a.id - b.id)
            }
        case LOGIN_USER:
            return {
                ...state,
                token: action.payload
            }
        case GET_ME:
            return {
                ...state,
                user: action.payload
            }
        case LOG_OUT:
            return {
                ...state,
                user: ''
            }
        case DELETE_ORDER:
            return {
                ...state,
            }
        case DELETE_PRODUCT_ORDER:
            return {
                ...state,
            }
        case DELETE_USER:
            return {
                ...state,
                users: [].concat(state.users)
            }
        case ADD_USER_ADMIN:
            return {
                ...state,
                users: [].concat(action.payload, state.users)
            }
        case GET_DETAILS_USER:
            return {
                ...state,
                detailsUser: action.payload
            }
        case GET_ORDERS_USER:
            return {
                ...state,
                ordersUser: action.payload
            }
        case EDIT_USER:
            return {
                ...state,
                user: action.payload
            }
        case PROMOTE_TO_ADMIN:
            return {
                ...state,
                users: [].concat(action.payload, state.users)
            }
        case GET_REVIEWS:
            return {
                ...state,
                reviews: action.payload
            }
        case ADD_REVIEW:
            return {
                ...state,
                reviews: [].concat(action.payload, state.reviews)
            }
        default: return state;
    }
}