import React, { useEffect, useState } from 'react';
import jwt from 'jwt-decode';
import Product from './Product/Product.js';
import Categories from './Categories';
import Filter from './Filter';
import { useDispatch } from 'react-redux';
import { getProducts, createOrderToUser } from '../../redux/actions';


import './Main.scss';

function Main ({ location }) {
    const [input , setInput] =useState({
        limit:10,
        offset:0
    })
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProducts(input.limit, input.offset));
    }, [dispatch, input]);
    
    if(location.search) {
        const token = location.search.split('=')[1];
        window.localStorage.setItem('token', token);
        dispatch(createOrderToUser(jwt(token).id));   
        window.location.replace('/');
    };

    const handleInput = (e) => {
        setInput({
            ...input,
            offset: e.target.value
        })
    }    

    return (
        <div className='main'>
            <Filter />
            <div className='categoriesProduct'>
                <Categories />
                <Product />
            </div>
            <div className='contButton' >
                <button className='btn-primary' value='0' onClick={handleInput}>1</button>
                <button className='btn-primary' value ='10' onClick={handleInput}>2</button>
                <button className='btn-primary' value='20' onClick={handleInput}>3</button>
            </div>
        </div>
    )
};


export default Main;