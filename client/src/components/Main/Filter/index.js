import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { orderByFilt, getProductToOrder, createOrderToUser } from '../../../redux/actions';


import '../Cart/Cart.scss';
import './Filter.scss';

function Filter() {
    // const { user } = useSelector(state => state);
    const { cart } = useSelector(state => state);
    const { products } = useSelector(state => state);
    const dispatch = useDispatch();
    let [input, setInput] = useState({
        openCart: false,
    });
    let cont = 0;
    const handleToggle = (e) => {
        let { name } = e.target;
        setInput({
            ...input,
            [name]: !input[name]
        });
    };
    const items = JSON.parse(window.localStorage.getItem("cart"));

    // const removeItem = (itemToBeDeleted) => {
    //     setInput(items.filter((item) => itemToBeDeleted !== item));
    // };

    const handleDelete = (e) => {

    }


    // useEffect(() => {
    //     const itemsLocal = JSON.parse(localStorage.getItem('cart'));
    //     if (itemsLocal) {
    //         setItems(itemsLocal);
    //     }
    // }, []);
    // useEffect(() => {
    //     localStorage.setItem('cart', JSON.stringify(items));
    // }, [items]);

    // useEffect(() => {
    //     dispatch((createOrderToUser(1)));
    // }, []);
    // useEffect(() => {
    //     dispatch((getProductToOrder(2)));
    // }, []);
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
                    <img src='https://icons555.com/images/icons-green/image_icon_shopping_cart_pic_512x512.png' name='openCart' />
                </button>
                <div className={`deleteCart-${input.openCart}`}>
                    <div className='deleteCartBox'>
                        <button className='closeCartBtn' name='openCart' onClick={handleToggle}>&times;</button>
                        <p>Cart</p>
                        <div className='cartCnt'>
                            <ul>
                                {
                                    items && items.products.map(p => {
                                        cont += p.orderProduct.price;
                                        return (
                                            <li key={p.id} className='cartItems'>
                                                <div className='infoCart'>
                                                    <p>{p.orderProduct.name}</p>
                                                    <span>{p.orderProduct.quantity} x ${p.orderProduct.price}</span>
                                                </div>
                                                {/* <button onClick={() => removeItem(item.products)}>X</button> */}
                                                <button value={p.id} onClick={(e) => items.products.filter(p => p.id !== e.target.value)} >X</button>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                            <span>TOTAL: $ {cont}</span>
                            <button onClick={() => {
                                //window.localStorage.clear();
                                //return window.localStorage.getItem('cart');
                                window.localStorage.removeItem('cart');
                                return ''
                            }}>Empty Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Filter;