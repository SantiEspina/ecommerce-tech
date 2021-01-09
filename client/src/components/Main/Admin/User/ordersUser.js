import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrdersUser, getProductToOrder } from '../../../../redux/actions';
import { Link } from 'react-router-dom';

import './orderUsers.scss';

function OrdersUser ({ match }) {
    const { id } = match.params;
    const dispatch = useDispatch();
    const { ordersUser } = useSelector(state => state);

    useEffect(() => {
        dispatch(getOrdersUser(id));
    }, [dispatch]);

    if(!ordersUser) return <h4>loading...</h4>;
    return (
        <table className='usersCnt'>
            <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>State</th>
            </tr>
            {
                ordersUser.map(o => (
                    <tr key={o.id}>
                        <td>{o.id}</td>
                        <td>{o.date}</td>
                        <td>{o.state}</td>
                        <Link to={`/order/${o.id}`}>
                            <button>View Order</button>
                        </Link>
                    </tr>
                ))
            }
        </table>
    )
};

export default OrdersUser;