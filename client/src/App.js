import React from 'react';
import Header from './components/Header/Header.js';
import Main from './components/Main/Main.js';
import { BrowserRouter, Route } from "react-router-dom";
import Footer from './components/Footer/Footer.js';
import Admin from './components/Main/Admin/Admin';
import AddProduct from './components/Main/Admin/Product/addProduct';
import AddCategory from './components/Main/Admin/Category/addCategory';
import ProductID from './components/Main/Product/ProductID';
import EditProduct from './components/Main/Admin/Product/EditProduct';
import EditCategory from './components/Main/Admin/Category/EditCategory';
import Orders from './components/Main/Admin/Orders/Orders.js';



function App() {
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
      <Route exact path="/orders/" render = {() => <Orders />} />
      <Route path="/" render={() => <Footer />} />
    </>
  );
}

export default App;
