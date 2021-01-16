import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDetails, getReviews } from '../../../Redux/actions';
import './ProductID.scss';

export default function ProductID({ match })  {
    const { id } = match.params;
    const dispatch = useDispatch();
    const { details, reviews } = useSelector(state => state);

    useEffect(() => {
        dispatch(getDetails(id));
        dispatch(getReviews(id));
    }, [dispatch]);

    if(!details) return (<h2>Loading...</h2>)
    return (
        <div className='productID'>
            <div className='box'>
                <div className='idBox'>
                    <h3>{details.name}</h3>
                    <img src={details.image}/>
                </div>
                <div className='info'>
                    <h5>Description: </h5>
                    <p>{details.description}</p>
                    <div className='details'>
                        <span>Price: $ {details.price}</span> 
                        <span>Stock: {details.stock}</span>
                    </div>
                </div>
            </div>
            <div className='box'>
                <h2>Reviews:</h2>
                <ul>
                    {
                        reviews && reviews.map(r => {
                            let input = {};
                            input = r.rating === '5' ? (
                                {
                                    cinco: true,
                                    cuatro: true,
                                    tres: true,
                                    dos: true
                                }
                            ) : (
                                r.rating === '4' ? (
                                    {
                                        cuatro: true,
                                        tres: true,
                                        dos: true
                                    }
                                ) : r.rating === '3' ? (
                                    {
                                        tres: true,
                                        dos: true
                                    }
                                ) : r.rating === '2' ? ( 
                                    { dos: true } 
                                ) : input
                            );
                            return (
                                <li key={r.id}>
                                    <h4>Review for: '{r.user?.username ? r.user.username : 'Anonymous'}'</h4>
                                    <div>
                                        <p>"{r.commentary}"</p>
                                        <form className='stars'>
                                            <p className='clasification'>
                                                <label className={`label-${input.cinco ? true : false}`}>&#9733;</label>
                                                <label className={`label-${input.cuatro ? true : false}`}>&#9733;</label>
                                                <label className={`label-${input.tres ? true : false}`}>&#9733;</label>
                                                <label className={`label-${input.dos ? true : false}`}>&#9733;</label>
                                                <label className={`label-true`}>&#9733;</label>
                                            </p>
                                        </form>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
};
