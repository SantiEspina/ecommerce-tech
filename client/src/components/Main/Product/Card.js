import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addProductToOrder, getMe } from '../../../Redux/actions';

import './Card.scss';


export default function Card({ id, name, description, image, price, stock }) {
    const { order, token } = useSelector(state => state);
    const dispatch = useDispatch();

    const [input, setInput] = useState({
        idOrder: order?.id,
        name,
        price,
        quantity: 1
    });
    useEffect(() => {
        setInput({
            ...input,
            idOrder: order?.id
        })
    }, [order])

    const handleButton = function (e) {
        e.preventDefault();
        if(token) {
            dispatch(getMe());
        }
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
