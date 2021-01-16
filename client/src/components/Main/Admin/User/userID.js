import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDetailsUser } from '../../../../Redux/actions';
import { Link } from 'react-router-dom';

import './userID.scss';

function UserID ({ match }) {
    const { id } = match.params;
    const dispatch = useDispatch();
    const { detailsUser } = useSelector(state => state);

    useEffect(() => {
        dispatch(getDetailsUser(id))
    }, [dispatch]);

    if(!detailsUser) return <h4>loading...</h4>;
    const { adress, createdAt, email, name, photoURL, username, orders, reviews } = detailsUser;
    return (
        <div className='userIDcnt'>
            <div className='info'>
                <h1>Hi: </h1>
                <h3>{name}</h3>
                <p>Your username is: <span>{username}</span></p>
                <p>Your email is: <span>{email}</span></p>
                <p>Your account was created at: <span>{createdAt}</span></p>
                <p>Your adress is: <span>{adress}</span></p>
                <p>You have: <span>{orders.length} order(s)</span></p>
                <p>You have: <span>{reviews.length} review(s)</span></p>
                <div className='actions'>
                    <Link to={`/orders/user/${id}`} className='link'>
                        <button>View my Order(s)</button>
                    </Link>
                    <Link to={`/reviews/user/${id}`} className='link'>
                        <button>View my Review(s)</button>
                    </Link>
                    <Link to={`/edit/user/${id}`} className='link'>
                        <button>Edit my Profile</button>
                    </Link>
                </div>
            </div>
        </div>
    )
};

export default UserID;