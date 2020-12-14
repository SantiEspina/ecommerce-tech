import React, { useEffect } from 'react';
import Product from './Product/Product.js';
import Categories from './Categories/Categories';
import Filter from './Filter/Filter.js';
import { useDispatch } from 'react-redux';
import { getProducts } from '../../Redux/actions';


import './Main.scss';

function Main () {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    return (
        <div className='main'>
            <Filter />
            <div className='categoriesProduct'>
                <Categories />
                <Product />
            </div>
        </div>
    )
};


export default Main;