import React, { useEffect, useState } from 'react';
import Product from './Product/Product.js';
import Categories from './Categories';
import Filter from './Filter';
import { useDispatch } from 'react-redux';
import { getProducts } from '../../redux/actions';


import './Main.scss';

function Main () {
    const [input , setInput] =useState({
        limit:10,
        offset:0
    })
    const dispatch = useDispatch();
    useEffect(() => {
        
        dispatch(getProducts(input.limit,input.offset));
    }, [dispatch,input]);

    const handleInput = (e) => {
        
        setInput({
            ...input,
            
            offset:e.target.value
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