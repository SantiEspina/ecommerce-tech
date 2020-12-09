import React from 'react';
import './Card.scss';

export default function Card ({ nombre, descripcion, imagen, precio, stock }) {
    return (
        <div>
            <div className='cardCnt'>
                <div className='imgName'>
                    <img src={imagen} className='imgProduct'/>
                    <span>{nombre}</span>
                </div>
                <div className='info'>
                    <p>${precio}</p> 
                    <button className='btn-primary'>Add to Cart</button>
                </div>
                
            </div>
        </div>
    )
}