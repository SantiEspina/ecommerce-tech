import React from 'react';
import { Link } from 'react-router-dom';
import { addOrder } from '../../../Redux/actions';
import './Card.scss';
import { useDispatch, useSelector } from 'react-redux';


export default function Card({ id, name, description, image, price, stock }) {
    const { user } = useSelector(state => state);
    const dispatch = useDispatch();

    const handleButton = function (e) {
        dispatch(addOrder())
        //falta el id del usuario
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
