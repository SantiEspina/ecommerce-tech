import React from 'react';
import './Card.scss';

export default function Card ({ name, description, image, price, stock }) {
    return (
        <div>
            <div className='cardCnt'>
                <div className='imgName'>
                    <img src={image} className='imgProduct'/>
                    <span>{name}</span>
                </div>
                <div className='info'>
                    <p>${price}</p> 
                    <button className='btn-primary'>Add to Cart</button>
                </div>
                
            </div>
        </div>
    )
}