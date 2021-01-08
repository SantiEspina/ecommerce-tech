import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductToOrder } from '../../../../redux/actions';

import './orderId.scss';

export default function OrderID({ match }) {
    const { id } = match.params;
    const dispatch = useDispatch();
    const { cart } = useSelector(state => state);
    let cont = 0;

    useEffect(() => {
        dispatch(getProductToOrder(id));
    }, [dispatch]);

    if(!cart) return <h3>loading...</h3>;
    return (
        <div>
            <table className='productsCnt'>
                <tr>
                    <th>ORDER ID</th>
                    <th>Date</th>
                    <th>State</th>
                    <th className='products'>Products</th>
                    <th>UserID</th>
                    <th>Total</th>
                </tr>
                <tr>
                    <td>{cart.id}</td>
                    <td>{cart.date}</td>
                    <td>{cart.state}</td>
                    <td className='products'><ul>
                        {
                            cart.products?.map(p => {
                                cont += p.orderProduct.price * p.orderProduct.quantity;
                                return (
                                    <li className='infoCart' key={p.id}>
                                        <p>idProduct: {p.id} {' '} ('{p.orderProduct.name}')</p>
                                        <span>{p.orderProduct.quantity} x ${p.orderProduct.price}</span>
                                    </li>
                                )
                            })
                        }
                        </ul>
                    </td>
                    <td>{cart.userId}</td>
                    <td>$ {cont}</td>
                </tr>
            </table>
        </div>
    )
};
