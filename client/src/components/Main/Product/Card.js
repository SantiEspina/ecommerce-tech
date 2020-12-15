import React from 'react';
import { Link } from 'react-router-dom';
import './Card.scss';

export default function Card ({ id, name, description, image, price, stock }) {
    return (
        <div>
            <div className='cardCnt'>
                <div className='imgName'>
                    <Link to={`/product/${id}`} className='link'>
                        <img src={image} className='imgProduct'/>
                        <span className='name' value={name} onClick={(e) => {}}>{name}</span>
                    </Link>
                </div>
                <div className='info'>
                <button className='btn-primary' 
                    disabled={stock>0 ? false : true} >
                    Add to Cart <span> {stock>0 ? "$ " + price : "Sin Stock"}</span>
                    onClick={addItemToCart}
                </button>
                </div>             
            </div>
        </div>
    )
}
