import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../../../../redux/actions';
import { Link } from 'react-router-dom';
import './Orders.scss'

function Orders () {
    const dispatch = useDispatch();
    const { orders } = useSelector(state => state);

    useEffect(() => {
        dispatch(getOrders());
    }, [dispatch]);

    if(!orders) return <h4>loading...</h4>;
    return (
        <table className='usersCnt'>
            <tr>
                <th>ORDER ID</th>
                <th>Date</th>
                <th>State</th>
                <th>UserID</th>
                <th>Actions</th>
            </tr>
            {
                orders.map(o => (
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
    )
};

export default Orders;
