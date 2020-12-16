import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { orderByFilt } from '../../../Redux/actions';


import '../Cart/Cart.scss';
import './Filter.scss';

function Filter () {
    const { products } = useSelector(state => state);
    const dispatch = useDispatch();

    let [ input, setInput ] = useState({
        openCart: false,
    });

    const handleToggle = (e) => {
        let { name } = e.target;
        setInput({
            ...input,
            [name]: !input[name]
        });
    };
  

    if(!products) return (<h1></h1>)
    return (
        <div className='filterCnt'>
            <div>{products.length} Products</div>
            <div>
                Order By: {''}
                <select className='selectFilter' onChange={(e) => dispatch(orderByFilt(e.target.value))}> 
                    <option value=''>Select Order</option>
                    <option value='newest'>Newest</option>
                    <option value='lowest'>Lowest</option>
                    <option value='highest'>Highest</option>
                </select>
            </div>
            <div ClassName= "Carrito">
                <button className='buttonCart' onClick={handleToggle}> 
                    <img src='https://icons555.com/images/icons-green/image_icon_shopping_cart_pic_512x512.png' name='openCart'/>
                </button>
                <div className={`deleteCart-${input.openCart}`}>
                    <div className='deleteCartBox'>
                        <button className='closeCartBtn' name='openCart' onClick={handleToggle}>&times;</button>
                        <p>the products</p>
                        <div>
                            <ul>
                                <li>Hola</li>
                                <li>Hola</li>
                                <li>Hola</li>
                                <li>Hola</li>
                                <li>Hola</li>
                                <li>Hola</li>
                                <li>Hola</li>
                                <li>Hola</li>
                                <li>Hola</li>
                                <li>Hola</li>
                                <li>Hola</li>
                                <li>Hola</li>
                                <li>Hola</li>
                                <li>Hola</li>
                                <li>Hola</li>
                                <li>Hola</li>
                                <li>Hola</li>
                                <li>chau</li>
                                <li>chau</li>
                                <li>chau</li>
                                <li>chau</li>
                                <li>chau</li>
                                <li>chau</li>
                                <li>chau</li>
                                <li>chau</li>
                                <li>chau</li>

                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};  

export default Filter;