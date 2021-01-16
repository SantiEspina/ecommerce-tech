import React, { useEffect, useState } from 'react';
import jwt from 'jwt-decode';
import Header from './components/Header/Header.js';
import Main from './components/Main/Main.js';
import { Route, Switch } from "react-router-dom";
import Footer from './components/Footer/index.js';
import Admin from './components/Main/Admin/Admin';
import AddProduct from './components/Main/Admin/Product/addProduct';
import AddCategory from './components/Main/Admin/Category/addCategory';
import ProductID from './components/Main/Product/ProductID';
import EditProduct from './components/Main/Admin/Product/EditProduct';
import EditCategory from './components/Main/Admin/Category/EditCategory';
import Orders from './components/Main/Admin/Orders/index.js';
import User from './components/Main/Admin/User';
import Card from './components/Main/Product/Card.js';
import { useDispatch, useSelector } from 'react-redux';
import { createOrderToUser, getMe, getPendingOrder, getProductToOrder } from './redux/actions.js';
import Login from './components/Main/login';
import ConfirmEmail from './components/Main/login/confirmEmail';
import ResetPassword from './components/Main/login/resetPassword';
import Users from './components/Main/users';
import axios from 'axios';
import AddUserAdmin from './components/Main/Admin/User/admin';
import UserID from './components/Main/Admin/User/userID';
import OrdersUser from './components/Main/Admin/User/ordersUser';
import ReviewsUser from './components/Main/Admin/User/reviewsUser';
import EditUser from './components/Main/Admin/User/editUser';
import OrderID from './components/Main/Admin/Orders/orderId';
import Reviews from './components/Main/Admin/reviews';
import Checkout from './components/Main/checkout';



function App() {
  const { user } = useSelector(state => state);
  const dispatch = useDispatch();  
  
  useEffect(() => {
    let token = window.localStorage.getItem('token');
    if(token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      dispatch(createOrderToUser(jwt(token).id));
      dispatch(getMe());
    } else {
      dispatch((getPendingOrder()));
    }
    // preg si existe token en ls
    // si existe agregar a axios 
    // decodificar con jwt y mandar a redux
  }, [dispatch]);
  return (

    <>
      <Route path="/" component={Header} />
      <Route exact path="/" component={Main} />
      <Route exact path="/admin/" component={Admin} />
      <Route exact path="/admin/addproduct" component={AddProduct} />
      <Route exact path="/admin/addcategory" component={AddCategory} />
      <Route exact path="/admin/editproduct/:id" component={EditProduct} />
      <Route exact path="/product/:id" component={ProductID} />
      <Route exact path="/admin/editcategory" component={EditCategory} />
      <Route exact path="/orders" component={Orders} />
      <Route exact path="/user" component={User} />
      <Route exact path="/user/:id" component={UserID} />
      <Route exact path="/orders/user/:id" component={OrdersUser} />
      <Route exact path="/reviews/user/:id" component={ReviewsUser} />
      <Route exact path="/edit/user/:id" component={EditUser} />
      <Route exact path="/order/:id" component={OrderID} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/confirmEmail" component={ConfirmEmail} />
      <Route exact path="/resetPassword" component={ResetPassword} />
      <Route exact path="/users" component={Users} />
      <Route exact path="/reviews" component={Reviews} />
      <Route exact path="/addUserAdmin" component={AddUserAdmin} />
      <Route exact path="/checkout" component={Checkout} />
      <Route path="/" render={() => <Footer />} />
    </>

  );
}

export default App;
