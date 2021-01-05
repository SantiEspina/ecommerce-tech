import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDetails } from '../../../redux/actions';
import './ProductID.scss';

export default function ProductID({ match })  {
    const { id } = match.params;
    const dispatch = useDispatch();
    const { details } = useSelector(state => state);

    useEffect(() => {
        dispatch(getDetails(id));
    }, [dispatch]);

    if(!details) return (<h2>Loading...</h2>)
    return (
        <div className='productID'>
            <div className='idBox'>
                <h3>{details.name}</h3>
                <img src={details.image}/>
            </div>
            <div className='info'>
                <p>{details.description}</p>
                <div className='details'>
                    <span>Price: $ {details.price}</span> 
                    <span>Stock: {details.stock}</span>
                </div>
            </div>
        </div>
    )
};
