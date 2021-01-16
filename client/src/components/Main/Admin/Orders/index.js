import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../../../../redux/actions';
import { Link } from 'react-router-dom';
import './Orders.scss'

function Orders () {
    const dispatch = useDispatch();
    const { orders, user } = useSelector(state => state);

    useEffect(() => {
        dispatch(getOrders());
    }, [dispatch]);

    const handleClick = (e) => {
        let { value } = e.target;
        dispatch(getOrders(value));
    };

    if(!orders) return <h4>loading...</h4>;
    if (!user?.isAdmin) return window.location.replace('/login');

    return (
        <>
            <div className='btn-orders'>
                <button value='pending' onClick={handleClick}>Pending Orders</button>
                <button value='complete' onClick={handleClick}>Complete Orders</button>
                <button value='' onClick={handleClick}>All Orders</button>
            </div>
            <table className='usersCnt'>
                <tr>
                    <th>ORDER ID</th>
                    <th>Date</th>
                    <th>State</th>
                    <th>UserID</th>
                    <th>Actions</th>
                </tr>
                {
                    orders && orders.map(o => (
                        <tr key={o.id}>
                            <td>{o.id}</td>
                            <td>{o.date}</td>
                            <td>{o.state.toUpperCase()}  </td>
                            <td>{o.userId ? o.userId : 'Guest'}</td>
                            <td>
                                <Link to={`/order/${o.id}`} className='link'>
                                    <button>View Order</button>
                                </Link>
                            </td>
                        </tr>
                    ))
                }
            </table>
        </>
    )
};

export default Orders;
