import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteReview, getAllReviews } from '../../../../redux/actions';

import './reviews.scss';

function Reviews () {
    const dispatch = useDispatch();
    const { reviews } = useSelector(state => state);
    const [ input, setInput ] = useState({
        delete: false,
        id: null
    });

    useEffect(() => {
        dispatch(getAllReviews());
    }, [dispatch]);

    const handleToggle = (e) => {
        let { name, value } = e.target;
        setInput({
            ...input,
            [name]: !input[name],
            id: value
        });
    };

    const deleteFunction = (e) => {
        let { value, name } = e.target;
        dispatch(deleteReview(value));
        setInput({
            ...input,
            [name]: !input[name],
            id: null
        });
    };

    if(!reviews) return <h2>loading...</h2>;
    return (
        <>
            <div className={`deleteReview-${input.delete}`}>
                <div className='deleteBox'>
                    <button className='closeBtn' name='delete' onClick={handleToggle}>&times;</button>
                    <p>Are you sure you want to remove the review?</p>
                    <div className='buttons'>
                        <button className='yes' name='delete' value={input.id} onClick={deleteFunction}>Yes</button>
                        <button className='no' name='delete' onClick={handleToggle}>No</button>
                    </div>
                </div>
            </div>
            <table className='reviewsCnt'>
                <tr>
                    <th className='id'>Review ID</th>
                    <th>Date</th>
                    <th className='commentary'>Commentary</th>
                    <th className='rating'>Rating</th>
                    <th>From User</th>
                    <th>Product</th>
                    <th>Actions</th>
                </tr>
                {
                    reviews.map(r => (
                        <tr key={r.id}>
                            <td className='id'>{r.id}</td>
                            <td>{r.createdAt}</td>
                            <td className='commentary'>{r.commentary}</td>
                            <td className='rating'>{r.rating} star(s)</td>    
                            <td>{r.user?.username ? r.user.username : 'Anonymous'}</td>    
                            <td>{r.product?.name}</td>  
                            <td><button name='delete' value={r.id} onClick={handleToggle}>Delete Review</button></td>  
                        </tr>
                    ))
                }
            </table>
        </>
    )
};

export default Reviews;