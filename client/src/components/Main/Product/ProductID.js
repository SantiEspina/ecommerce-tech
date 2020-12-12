import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDetails } from '../../../Redux/actions';
import './ProductID.scss';

export default function ProductID({ match })  {
    const { id } = match.params;
    const dispatch = useDispatch();
    const { details } = useSelector(state => state);

    useEffect(() => {
        dispatch(getDetails(id))
    }, [dispatch]);

    if(!details) return (<h2>Loading...</h2>)
    return (
        <div className='productID'>
            hola
        </div>
    )
};
