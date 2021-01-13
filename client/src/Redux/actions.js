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
    ADD_REVIEW,
    EDIT_REVIEW,
    DELETE_REVIEW,
    GET_REVIEWS,
    DEGRADE_ADMIN,
    GET_ALL_REVIEWS,
    GET_REVIEWS_USER,
    CONFIRM_EMAIL,
    RESET_PASSWORD
} from './constants';


import jwt from 'jwt-decode';
import axios from 'axios';

const localhost = 'http://localhost:3001';
const token = window.localStorage.getItem('token');

(function () {
    axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : undefined;
})();


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


export const getOrders = (state = undefined) => {
    return function (dispatch) {
        axios.get(`${localhost}/order`, { state })
            .then(data => dispatch({ type: GET_ORDERS, payload: data.data }))
    }
}

export const addUser = (input) => {
    let { name, username, email, password, adress } = input;
    return function (dispatch) {
        axios.post(`${localhost}/auth/register`, { name, username, email, password, adress })
            // .then(data => dispatch({ type: ADD_USER, payload: data.data }) && window.location.replace('/'))
            .then(data => {
                window.localStorage.removeItem('cart');
                window.localStorage.setItem("token", data.data);
                window.location.replace('/');
                dispatch({ type: LOGIN_USER, payload: data.data });
                dispatch(getMe());
            })
            .catch(error => alert(error.response.data))
    }
};

// !CREAR UNA ORDEN A UN USUARIO EN ESPECIFICO

export const createOrderToUser = (userId) => {
    return function (dispatch) {
        axios.post(`${localhost}/order/`, { userId })
            .then(data => {
                dispatch({ type: CREATE_ORDER_TO_USER, payload: data.data });
                dispatch(getProductToOrder(data.data.id));
            })
    }
};

// AÑADIR PRODUCTOS A UNA ORDEN
export const addProductToOrder = (input, idProduct) => {
    let { idOrder, name, price, quantity } = input;
    
    if(!token) {
        return function (dispatch) {
            let cart = window.localStorage.getItem("cart")
            if (cart) {
                cart = JSON.parse(cart);
                const result = cart.products.find(({ id }) => id === parseInt(idProduct));
                if(result) {
                    cart.products = cart.products.filter(p => p.id !== parseInt(idProduct));
                    result.orderProduct.quantity++;
                    cart.products = [
                        ...cart.products,
                        result
                    ]
                } else {
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
            } else {
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
            dispatch({ type: ADD_PRODUCT_TO_ORDER, payload: cart })
        }
    } else {
        return function (dispatch) {
            axios.post(`${localhost}/order/${idOrder}/product/${idProduct}`, { name, price, quantity })
                .then(data => dispatch({ type: ADD_PRODUCT_TO_ORDER, payload: data.data }))
        }
    }
};
//devolver una orden
export const getProductToOrder = (idOrder) => {
    return function (dispatch) {
        axios.get(`${localhost}/order/${idOrder}`)
            .then(data => dispatch({ type: GET_PRODUCTS_TO_ORDER, payload: data.data }))
    }
};

export const getPendingOrder = () => {
    //preguntar si el usuario esta logueado
    return function (dispatch) {
        let cart = window.localStorage.getItem("cart")
        if (cart) {
            cart = JSON.parse(cart);
        }
        dispatch({ type: ADD_PRODUCT_TO_ORDER, payload: cart })
    }
};

export const getUsers = () => {
    return function (dispatch) {
        axios.get(`${localhost}/user/`)
            .then(data => dispatch({ type: GET_USER, payload: data.data }))
    }
};

export const loginUser = (input) => {
    const { email, password } = input;
    return function (dispatch) {
        axios.post(`${localhost}/auth/login`, { email, password })
            .then(data => {
                window.localStorage.removeItem('cart');
                window.localStorage.setItem("token", data.data);
                window.location.replace('/');
                dispatch({ type: LOGIN_USER, payload: data.data });
                dispatch(getMe());
            })
            .catch(err => alert('Email or password are incorrect'))  
    }
};

export const getMe = () => {
    return function (dispatch) {
        axios.get(`${localhost}/auth/me`)
            .then(data => {
                dispatch({ type: GET_ME, payload: data.data });
                dispatch(createOrderToUser(jwt(token).id));
            })
            .catch(err => console.log(err))
    }
};

export const logout = () => {
    window.localStorage.removeItem('token');
    return {
        type: LOG_OUT
    }
};

export const deleteOrder = (idOrder) => {
    return function (dispatch) {
        axios.delete(`${localhost}/order/${idOrder}`)
            .then(data => {
                dispatch({ type: DELETE_ORDER });
                dispatch(getMe());
            })
    }
};

export const deleteProductToOrder = (idOrder, idProduct) => {
    return function (dispatch) {
        axios.delete(`${localhost}/order/${idOrder}/product/${idProduct}`)
            .then(data => dispatch({ type: DELETE_PRODUCT_ORDER }))
    }
};

export const deleteUser = (userId) => {
    return function (dispatch) {
        axios.delete(`${localhost}/user/${userId}`)
            .then(data => {
                dispatch(getUsers());
                dispatch ({ type: DELETE_USER });
            })
    }
};

export const addUserAdmin = (input) => {
    let { name, username, email, password, adress, isAdmin } = input;

    return function (dispatch) {
        axios.post(`${localhost}/user/`, { name, username, email, password, adress, isAdmin })
            .then(data => {
                dispatch({ type: ADD_USER_ADMIN, payload: data.data });
                window.location.replace('/admin');
            })
            .catch(err => alert(err))
    }
};

export const getDetailsUser = (idUser) => {
    return function (dispatch) {
        axios.get(`${localhost}/user/${idUser}`)
            .then(data => dispatch({ type: GET_DETAILS_USER, payload: data.data }))
    }
};

export const getOrdersUser = (idUser) => {
    return function (dispatch) {
        axios.get(`${localhost}/order/user/${idUser}`)
            .then(data => dispatch({ type: GET_ORDERS_USER, payload: data.data }))
    }
};

export const editUser = (id, input) => {
    let { name, username, email, adress, password } = input;
    return function (dispatch) {
        axios.put(`${localhost}/user/${id}`, {  name, username, email, adress, password })
            .then(data => {
                dispatch({ type: EDIT_USER, payload: data.data });
                window.location.replace(`/user/${id}`);
            })
    }
};

export const promoteToAdmin = (id) => {
    return function (dispatch) {
        axios.post(`${localhost}/auth/promote/${id}`, { isAdmin: true })
            .then(data => dispatch({ type: PROMOTE_TO_ADMIN, payload: data.data }))
            .catch(err => alert(err))
    }
};

export const getReviews = (idProduct) => {
    return function (dispatch) {
        axios.get(`${localhost}/review/${idProduct}`)
            .then(data => dispatch({ type: GET_REVIEWS, payload: data.data }))
            .catch(err => alert(err))
    }
};

export const addReview = (input) => {
    let { commentary, rating, idUser, idProduct } = input;
    return function (dispatch) {
        axios.post(`${localhost}/review/`, { commentary, rating, idUser, idProduct })
            .then (data => dispatch({ type: ADD_REVIEW, payload: data.data}))
            .catch(err => alert(err))
    }
};

export const deleteReview = (idReview) => {
    return function (dispatch) {
        axios.delete(`${localhost}/review/${idReview}`)
            .then(data => {
                dispatch({ type: DELETE_REVIEW });
                dispatch(getAllReviews());
            })
            .catch(err => alert(err))
    }
};  

export const degradeAdmin = (id) => {
    return function (dispatch) {
        axios.post(`${localhost}/auth/degrade/${id}`)
            .then(data => dispatch({ type: DEGRADE_ADMIN, payload: data.data }))
            .catch(err => alert(err))
    }
};

export const getAllReviews = () => {
    return function (dispatch) {
        axios.get(`${localhost}/review`)
            .then(data => dispatch({ type: GET_ALL_REVIEWS, payload: data.data }))
            .catch(err => alert(err))
    }
};

export const getReviewsUser = (idUser) => {
    return function (dispatch) {
        axios.get(`${localhost}/review/user/${idUser}`)
            .then(data => {
                dispatch({ type: GET_REVIEWS_USER, payload: data.data })
            })
            .catch(err => alert(err))
    }
};

export const editReview = (input, idUser) => {
    let { idReview, commentary, rating } = input;
    return function (dispatch) {
        axios.put(`${localhost}/review/${idReview}`, { commentary, rating })
        .then(data => {
            dispatch({ type: EDIT_REVIEW });
            dispatch(getReviewsUser(idUser));
        })
        .catch(err => alert(err))
    }
};

export const confirmEmail = (email) => {
    return function (dispatch) {
        axios.post(`${localhost}/user/confirmEmail`, { email })
            .then(data => {
                dispatch({ type: CONFIRM_EMAIL, payload: data.data });
                window.location.replace(`/resetPassword?token=${data.data}`);
            })
            .catch(err => alert('Email incorrect'))
    }
};

export const resetPassword = (token, input) => {
    let { password } = input;
    return function (dispatch) {
        axios.post(`${localhost}/user/updatePassword?token=${token}`, { password }, {
            headers: { Authorization: "Bearer " + token }
        })
            .then(data => {
                dispatch({ type: RESET_PASSWORD, payload: data.data });
                alert('Password was changed');
                let aux = window.localStorage.getItem('token');
                if(aux) {
                    window.location.replace('/')
                } else {
                    window.location.replace('/login');
                }
            })
            .catch(err => alert(err))
    }
};
