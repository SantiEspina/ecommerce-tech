import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { orderByFilt } from '../../../Redux/actions';
import { Link } from 'react-router-dom';

import './Filter.scss';

function Filter () {
    const { products } = useSelector(state => state);
    const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(orderByFilt())
    // }, [dispatch])

    if(!products) return (<h1></h1>)
    return (
        <div className='filterCnt'>
            <div>{products.length} Products</div>
            <div>
                Order By: {''}
                <select className='selectFilter' onChange={(e) => dispatch(orderByFilt(e.target.value))}> 
                    <option value=''>Select Order</option>
                    <option value='newest'>Newest</option>
                    <option value='lowest'>Lowest</option>
                    <option value='highest'>Highest</option>
                </select>
            </div>
            <div ClassName= "Carrito">
                <Link to={`/cart`} className='Cartlink'>
                    <button className='buttonCart'  >
                     Cart
                    </button>   
                 </Link>    
            </div>
        </div>
    )
};  

export default Filter;