import React from 'react';
import Header from './components/Header/Header.js';
import Main from './components/Main/Main.js';
import AddProduct from './components/Main/Product/addProduct';
import AddCategory from './components/Main/Categories/addCategory';
import { BrowserRouter, Route } from "react-router-dom";
import Footer from './components/Footer/Footer.js';


function App() {
  return (
    <>
      <Route path="/" render={() => <Header />} />
      <Route exact path="/" render={() => <Main />} />
      <Route exact path="/admin/addproduct" render={() => <AddProduct />} />
      <Route exact path="/admin/addcategory" render={() => <AddCategory />} />
      <Route path="/" render={() => <Footer />} />
    </>
  );
}

export default App;
