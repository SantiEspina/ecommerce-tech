import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addProductToOrder } from '../../../redux/actions';

import './Card.scss';


export default function Card({ id, name, description, image, price, stock }) {

    const [input, setInput] = useState({
        idOrder: 1,
        name,
        price,
        quantity: 1
    });

    const dispatch = useDispatch();

    const handleButton = function (e) {
        e.preventDefault();
        dispatch(addProductToOrder(input, id))
    }

    return (
        <div>
            <div className='cardCnt'>
                <div className='imgName'>
                    <Link to={`/product/${id}`} className='link'>
                        <img src={image} className='imgProduct' />
                        <span className='name' value={name} onClick={(e) => { }}>{name}</span>
                    </Link>
                </div>
                <div className='info'>
                    <button
                        className='btn-primary'
                        value={id}
                        disabled={stock > 0 ? false : true}
                        onClick={handleButton}
                    >
                        Add to Cart <span>{stock > 0 ? "$ " + price : "Sin Stock"}</span>
                    </button>
                </div>
            </div>
        </div>
    )
}
