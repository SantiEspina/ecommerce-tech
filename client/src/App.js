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
import { getMe, getPendingOrder, getProductToOrder } from './redux/actions.js';
import Login from './components/Main/login';
import Users from './components/Main/users';
import axios from 'axios';



function App() {
  const dispatch = useDispatch();  
  
  useEffect(() => {
    let token = window.localStorage.getItem('token');
    if(token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
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
      <Route path="/" render={() => <Header />} />
      <Route exact path="/" render={() => <Main />} />
      <Route exact path="/admin/" render={() => <Admin />} />
      <Route exact path="/admin/addproduct" render={() => <AddProduct />} />
      <Route exact path="/admin/addcategory" render={() => <AddCategory />} />
      <Route exact path="/admin/editproduct/:id" component={EditProduct} />
      <Route exact path="/product/:id" component={ProductID} />
      <Route exact path="/admin/editcategory" component={EditCategory} />
      <Route exact path="/orders" render={() => <Orders />} />
      <Route exact path="/user" render={() => <User />} />
      <Route exact path="/order" render={() => <Card />} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/users" component={Users} />
      <Route path="/" render={() => <Footer />} />
    </>

  );
}

export default App;
