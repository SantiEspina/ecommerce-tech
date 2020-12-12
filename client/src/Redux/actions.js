import { ADD_PRODUCT, FIND_PRODUCT_SUCCESS, ORDER_BY_FILT, GET_PRODUCTS, GET_CATEGORIES, GET_DETAILS } from './constants';
import axios from 'axios';

const localhost = 'http://localhost:3001';

export const getProducts = () => {
    return function(dispatch) {
        axios.get(`${localhost}/products/`)
            .then(data => dispatch ({ type: GET_PRODUCTS, payload: data.data }))
    }
};

export const getDetails = (id) => {
    return function(dispatch) {
        axios.get(`${localhost}/products/${id}`)
            .then(data => dispatch ({ type: GET_DETAILS, payload: data.data }))
    }
};

export const getCategories = () => {
    return function(dispatch) {
        axios.get(`${localhost}/categories/`)
            .then(data => dispatch ({ type: GET_CATEGORIES, payload: data.data }))
    }
};

export const findProductBySearchBar = (value) => {
    return function(dispatch) {
        axios.get(`${localhost}/products/search?value=${value}`)
            .then(data => dispatch({ type: FIND_PRODUCT_SUCCESS, payload: data.data }))
    }
};

export const orderByFilt = (order) => {
    let check = 'ASC';
    check = order === 'highest' ? 'DESC' : (
        order === 'newest' ? 'DESC' : ('ASC')
    );
    order = order === 'lowest' ? 'price' : (
        order === 'newest' ? ('id') : (
            'price'
        )
    );
    return function(dispatch) {
        axios.get(`${localhost}/products?order=[["${order}", "${check}"]]`)
            .then(data => dispatch({ type: ORDER_BY_FILT, payload: data.data }))
    }
};

export const addProduct = (payload) => {
    return {
        type: ADD_PRODUCT,
        payload
    }
};