import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { orderByFilt, getProductToOrder } from '../../../redux/actions';


import '../Cart/Cart.scss';
import './Filter.scss';

function Filter() {

    const { products } = useSelector(state => state);
    const { user } = useSelector(state => state);
    const { order } = useSelector(state => state);
    const dispatch = useDispatch();

    let [input, setInput] = useState({
        openCart: false,

    });
    // let [inputUserOrder, setInputUserOrder] = useState({
    //     idUser: user.id,
    //     idOrder: 
    // })

    const handleToggle = (e) => {
        let { name } = e.target;
        setInput({
            ...input,
            [name]: !input[name]
        });
    };

    useEffect(() => {
        //console.log(order.userId);
        dispatch((getProductToOrder(1)));
    }, []);




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
                        <p>the products</p>
                        <div>
                            {
                                order.products && order.products.map((p, i) =>
                                    <tr>
                                        <td>{p.name}</td>
                                        <td>{p.quantity}</td>
                                        <td>{p.price}</td>
                                    </tr>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Filter;