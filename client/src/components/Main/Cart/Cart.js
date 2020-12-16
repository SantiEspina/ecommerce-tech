import React from 'react';
import './Cart.scss';
import { Link } from 'react-router-dom';

export default function Cart () {
    var botton = true;
    
    const handleChange = (e) => {
        botton=true;
    }

    return (
        <div>
            <div className={`deleteCart-${botton}`}>
                <div className='deleteCartBox'>
                    <p>Are you sure you want to remove the product?</p>
                    <button className='closeCartBtn' name='delete' onClick={() => {}}>&times;</button>
                </div>
            </div>
        </div>
    )


};