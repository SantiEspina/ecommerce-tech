import {
    ADD_PRODUCT,
    FIND_PRODUCT_SUCCESS,
    ORDER_BY_FILT,
    GET_PRODUCTS,
    GET_CATEGORIES,
    GET_DETAILS,
    DELETE_PRODUCT,
    EDIT_PRODUCT,
    ADD_CATEGORY_TO_PRODUCT,
    REMOVE_CATEGORY_TO_PRODUCT,
    GET_PRODUCT_BY_CATEGORY,
    DELETE_CATEGORY,
    EDIT_CATEGORY,
    GET_ORDERS,
    ADD_USER,
    ADD_PRODUCT_TO_ORDER,
    GET_PRODUCTS_TO_ORDER,
    CREATE_ORDER_TO_USER
} from './constants';

import axios from 'axios';

const localhost = 'http://localhost:3001';

export const getProducts = (limit, offset) => {
    return function (dispatch) {
        if (limit && offset) {
            axios.get(`${localhost}/products/?limit=${limit}&offset=${offset}`)
                .then(data => dispatch({ type: GET_PRODUCTS, payload: data.data }))
        } else {
            axios.get(`${localhost}/products/`)
                .then(data => dispatch({ type: GET_PRODUCTS, payload: data.data }))
        }

    }
};


export const getDetails = (id) => {
    return function (dispatch) {
        axios.get(`${localhost}/products/${id}`)
            .then(data => dispatch({ type: GET_DETAILS, payload: data.data }))
    }
};

export const getCategories = () => {
    return function (dispatch) {
        axios.get(`${localhost}/categories/`)
            .then(data => dispatch({ type: GET_CATEGORIES, payload: data.data }))
    }
};

export const findProductBySearchBar = (value) => {
    return function (dispatch) {
        axios.get(`${localhost}/products/search?value=${value}`)
            .then(data => dispatch({ type: FIND_PRODUCT_SUCCESS, payload: data.data }))
    }
};

export const orderByFilt = (order) => {
    if (!order) return getProducts();
    let check = 'ASC';
    check = order === 'highest' ? 'DESC' : (
        order === 'newest' ? 'DESC' : ('ASC')
    );
    order = order === 'lowest' ? 'price' : (
        order === 'newest' ? ('id') : (
            'price'
        )
    );
    return function (dispatch) {
        axios.get(`${localhost}/products?order=[["${order}", "${check}"]]`)
            .then(data => dispatch({ type: ORDER_BY_FILT, payload: data.data }))
    }
};

export const addProduct = (input) => {
    let { name, description, image, price, stock } = input;
    return function (dispatch) {
        axios.post(`${localhost}/products`, { name, description, image, price, stock })
            .then(data => dispatch({ type: ADD_PRODUCT, payload: data.data }))
    }
};

export const deleteProduct = (idParams) => {
    return function (dispatch) {
        axios.delete(`${localhost}/products/${idParams}`)
            .then(data => dispatch({ type: DELETE_PRODUCT, payload: data.data }))
    }
};

export const editProduct = (id, input) => {
    let { name, description, image, price, stock } = input;
    return function (dispatch) {
        axios.put(`${localhost}/products/${id}`, { name, description, image, price, stock })
            .then(data => dispatch({ type: EDIT_PRODUCT, payload: data.data }))
    }
};

export const addCategoryToProduct = (idP, idC) => {
    return function (dispatch) {
        axios.post(`${localhost}/products/${idP}/category/${idC}`)
            .then(data => dispatch({ type: ADD_CATEGORY_TO_PRODUCT, payload: data.data }))
    }
};

export const removeCategoryToProduct = (idP, idC) => {
    return function (dispatch) {
        axios.delete(`${localhost}/products/${idP}/category/${idC}`)
            .then(data => dispatch({ type: REMOVE_CATEGORY_TO_PRODUCT, payload: data.data }))
    }
};


export const getProductByCategory = (nombreCat) => {
    if (!nombreCat) return getProducts();
    return function (dispatch) {
        axios.get(`${localhost}/products/categoria/${nombreCat}`)
            .then(data => dispatch({ type: GET_PRODUCT_BY_CATEGORY, payload: data.data }))
    }
};

export const deleteCategory = (idParams) => {
    return function (dispatch) {
        axios.delete(`${localhost}/categories/${idParams}`)
            .then(data => dispatch({ type: DELETE_CATEGORY, payload: data.data }))
    }
};

export const editCategory = (idC, name) => {
    return function (dispatch) {
        axios.put(`${localhost}/categories/${idC}`, { name })
            .then(data => dispatch({ type: EDIT_CATEGORY, payload: data.data }))
    }
};


export const getOrders = (status) => {
    return function (dispatch) {
        axios.get(`${localhost}/order`, { status })
            .then(data => dispatch({ type: GET_ORDERS, payload: data.data }))
    }
}

export const addUser = (input) => {
    let { name, username, email, password, direction } = input;
    return function (dispatch) {
        axios.post(`${localhost}/user/`, { name, username, email, password, direction })
            .then(data => dispatch({ type: ADD_USER, payload: data.data }) && alert("The user has been created !!"))
            .catch(error => alert(error.message))
    }
};

// !CREAR UNA ORDEN A UN USUARIO EN ESPECIFICO

export const createOrderToUser = (userId) => {
    return function (dispatch) {
        //81
        axios.post(`${localhost}/order/`, { userId })
            .then(data => dispatch({ type: CREATE_ORDER_TO_USER, payload: data.data }))
    }
};

// AÑADIR PRODUCTOS A UNA ORDEN
export const addProductToOrder = (input, idProduct) => {
    let { idOrder, name, price, quantity } = input;
    // return function (dispatch) {
    //     //106
    //     axios.post(`${localhost}/order/${idOrder}/product/${idProduct}`, { name, price, quantity })
    //         .then(data => dispatch({ type: ADD_PRODUCT_TO_ORDER, payload: data.data }))
    // }
    return function (dispatch) {
        let cart = window.localStorage.getItem("cart")
        if (cart) {
            cart = JSON.parse(cart);
            //falta ver los productos duplicados.
            cart.products = [
                ...cart.products,
                {
                    id: idProduct,
                    orderProduct: {
                        name,
                        price,
                        quantity
                    }
                }
            ]
        }
        else {
            cart = {
                products: [
                    {
                        id: idProduct,
                        orderProduct: {
                            name,
                            price,
                            quantity
                        }
                    }
                ]
            }
        }
        window.localStorage.setItem("cart", JSON.stringify(cart))
        dispatch({ type: CREATE_ORDER_TO_USER, payload: cart })
    }


};
//devolver una orden
export const getProductToOrder = (idOrder) => {
    return function (dispatch) {
        axios.get(`${localhost}/order/${idOrder}`)
            .then(data => dispatch({ type: GET_PRODUCTS_TO_ORDER, payload: data.data }))
    }
}

export const getPendingOrder = () => {
    //preguntar si el usuario esta logueado
    return function (dispatch) {
        let cart = window.localStorage.getItem("cart")
        if (cart) {
            cart = JSON.parse(cart);
        }
        dispatch({ type: CREATE_ORDER_TO_USER, payload: cart })
    }
}

