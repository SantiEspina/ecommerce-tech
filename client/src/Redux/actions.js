import { ADD_PRODUCT, FIND_PRODUCT_SUCCESS, ORDER_BY_FILT } from './constants';

export const findProductBySearchBar = (payload) => {
    return {
        type: FIND_PRODUCT_SUCCESS,
        payload
    }
};

export const orderByFilt = (payload) => {
    return {
        type: ORDER_BY_FILT,
        payload
    }
};

export const addProduct = (payload) => {
    return {
        type: ADD_PRODUCT,
        payload
    }
};