import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { orderByFilt, getProductToOrder, createOrderToUser, deleteOrder, deleteProductToOrder } from '../../../Redux/actions';
import { ADD_PRODUCT_TO_ORDER } from '../../../Redux/constants';
import { Link } from 'react-router-dom';
import carrito from '../../../assets/img/carrito.png'


import '../Cart/Cart.scss';
import './Filter.scss';

function Filter() {
    const { products, cart, order, user } = useSelector(state => state);
    const dispatch = useDispatch();
    let cont = 0;

    let [input, setInput] = useState({
        openCart: false,
        idOrder: order?.id
    });
    

    useEffect(() => {
        setInput({
            ...input,
            idOrder: order?.id
        })
    }, [order])

    useEffect(() => {
        if(input.idOrder) {
            dispatch(getProductToOrder(input.idOrder))
        }
    }, [dispatch]);

    const handleToggle = (e) => {
        let { name } = e.target;
        setInput({
            ...input,
            [name]: !input[name]
        });
    };
    // const items = JSON.parse(window.localStorage.getItem("cart"));

    if (!products) return (<h1></h1>)
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
            {/** Empieza nuestro carrito*/}
            <div className="Carrito">
                <button className='buttonCart' onClick={handleToggle}>
                    <img src={carrito} name='openCart' />
                </button>
                <div className={`deleteCart-${input.openCart}`}>
                    <div className='deleteCartBox'>
                        <div className='titleCart'>
                            <button className='closeCartBtn' name='openCart' onClick={handleToggle}>&times;</button>
                            <p>Your Cart</p>
                        </div>
                        <div className='cartCnt'>
                            <ul className='products-cart'>
                                {
                                    cart && cart.products?.map(p => {
                                        cont += p.orderProduct.price * p.orderProduct.quantity;
                                        return (
                                            <li key={p.id} className='cartItems'>
                                                <div className='infoCart'>
                                                    <p>{p.orderProduct.name}</p>
                                                    <span>{p.orderProduct.quantity} x ${p.orderProduct.price}</span>
                                                </div>
                                                <button value={p.id} onClick={(e) => {
                                                    const order = {...cart,
                                                        products:cart.products.filter(p => p.id !== parseInt(e.target.value))
                                                    };
                                                    if(!cart?.id) {
                                                        window.localStorage.setItem("cart",JSON.stringify(order))
                                                    } else {
                                                        dispatch(deleteProductToOrder(cart?.id, e.target.value))
                                                    };
                                                    dispatch({
                                                        type:ADD_PRODUCT_TO_ORDER,
                                                        payload:order
                                                    });                                                    
                                                }} >&times;</button>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                            <div className='total-cart'>
                                <span>TOTAL: $ {cont}</span>
                                <button value={cart?.id} onClick={(e) => {
                                    if(!cart?.id) {
                                        window.localStorage.removeItem('cart')
                                    } else {
                                        dispatch(deleteOrder(e.target.value))
                                    }
                                    dispatch({
                                        type:ADD_PRODUCT_TO_ORDER,
                                        payload:[]
                                    })
                                }}>Empty Cart</button>
                            </div>
                                {
                                    user?(  <Link to='/checkout' className='link'>
                                                <button className='btn-check' onClick={e => { }}>Checkout</button>
                                            </Link>):
                                            (<Link to='/login' className='link'>
                                                <button className='btn-check' onClick={e => { }}>Login</button>
                                            </Link>)
                                }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Filter;