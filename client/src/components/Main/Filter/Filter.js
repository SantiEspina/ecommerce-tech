import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { orderByFilt } from '../../../Redux/actions';

import './Filter.scss';

function Filter () {
    const { products } = useSelector(state => state);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(orderByFilt())
    }, [dispatch])

    if(!products) return (<h1></h1>)
    return (
        <div className='filterCnt'>
            <div>{products.length} Products</div>
            <div>
                Order By: {''}
                <select className='selectFilter' onChange={(e) => dispatch(orderByFilt(e.target.value))}> 
                    <option value='newest'>Newest</option>
                    <option value='lowest'>Lowest</option>
                    <option value='highest'>Highest</option>
                </select>
            </div>
        </div>
    )
};  

export default Filter;