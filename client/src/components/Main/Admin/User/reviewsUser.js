import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editReview, getReviewsUser } from '../../../../redux/actions';

import './reviewUser.scss';

function ReviewsUser ({ match }) {
    const { id } = match.params;
    const dispatch = useDispatch();
    const { reviews } = useSelector(state => state);
    const [ input, setInput ] = useState({
        review: false,
        commentary: '',
        rating: null
    })

    useEffect(() => {
        dispatch(getReviewsUser(id));
    }, [dispatch]);

    const handleToggle = (e) => {
        let { name, value } = e.target;
        setInput({
            ...input,
            [name]: !input[name],
            idReview: parseInt(value)
        });
    };

    const handleInputChange = (e) => {
        let { name, value } = e.target;
        value = parseInt(value) ? parseInt(value) : value;
        setInput({
            ...input,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault(); 
        dispatch(editReview(input, id));
        setInput({
            ...input,
            review: false,
            commentary: '',
            rating: null
        })
    };

    if(!reviews) return <h2>loading...</h2>;
    return (
        <>
            <div className={`add-Review-${input.review}`}>
                <div className='add-ReviewBox'>
                    <form onSubmit={handleSubmit} className='form'>
                        <div>
                            <label>Commentary</label>
                            <input 
                                autoComplete="off"
                                type='textarea'
                                name='commentary'
                                value={input.commentary}
                                onChange={handleInputChange}
                            />
                        </div>
                        <p className='clasification'>
                            <input id='radio1' type='radio' value='5' name='rating' onClick={handleInputChange}/>
                            <label for='radio1'>&#9733;</label>
                            <input id='radio2' type='radio' value='4' name='rating' onClick={handleInputChange}/>
                            <label for='radio2'>&#9733;</label>
                            <input id='radio3' type='radio' value='3' name='rating' onClick={handleInputChange}/>
                            <label for='radio3'>&#9733;</label>
                            <input id='radio4' type='radio' value='2' name='rating' onClick={handleInputChange}/>
                            <label for='radio4'>&#9733;</label>
                            <input id='radio5' type='radio' value='1' name='rating' onClick={handleInputChange}/>
                            <label  for='radio5'>&#9733;</label>
                        </p>
                        <input type='submit' value='Edit Review' />
                    </form>
                </div>
            </div>
            <table className='reviewsCnt'>
                <tr>
                    <th className='id'>Review ID</th>
                    <th>Date</th>
                    <th className='commentary'>Commentary</th>
                    <th className='rating'>Rating</th>
                    <th>Product</th>
                </tr>
                {
                    reviews && reviews.map(r => (
                        <tr key={r.id}>
                            <td className='id'>{r.id}</td>
                            <td>{r.createdAt}</td>
                            <td className='commentary'>{r.commentary}</td>
                            <td className='rating'>{r.rating} star(s)</td>    
                            <td>{r.product?.name}</td>  
                            <button name='review' value={r.id} onClick={handleToggle}>Edit Review</button>  
                        </tr>
                    ))
                }
            </table>
        </>
    )
};

export default ReviewsUser;