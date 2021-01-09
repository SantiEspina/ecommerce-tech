import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDetails, getReviews } from '../../../redux/actions';
import './ProductID.scss';

export default function ProductID({ match })  {
    const { id } = match.params;
    const dispatch = useDispatch();
    const { details, reviews } = useSelector(state => state);

    useEffect(() => {
        dispatch(getDetails(id));
        dispatch(getReviews(id));
    }, [dispatch]);

    if(!details) return (<h2>Loading...</h2>)
    return (
        <div className='productID'>
            <div className='box'>
                <div className='idBox'>
                    <h3>{details.name}</h3>
                    <img src={details.image}/>
                </div>
                <div className='info'>
                    <h5>Description: </h5>
                    <p>{details.description}</p>
                    <div className='details'>
                        <span>Price: $ {details.price}</span> 
                        <span>Stock: {details.stock}</span>
                    </div>
                </div>
            </div>
            <div className='box'>
                <h2>Reviews:</h2>
                <ul>
                    {
                        reviews && reviews.map(r => {
                            return (
                                <li key={r.id}>
                                    <h4>Review for: '{r.user?.username ? r.user.username : 'Anonymous'}'</h4>
                                    <div>
                                        <p>"{r.commentary}"</p>
                                        <form className='stars'>
                                            <label value='1' onClick={(e) => console.log(e.target.value)}>&#9733;</label>
                                            <input type='radio' value='1' onClick={(e) => console.log(e.target.value)}/>
                                            <label>&#9733;</label>
                                            <input type='radio' value='2' onClick={(e) => console.log(e.target.value)}/>
                                            <label>&#9733;</label>
                                            <input type='radio' value='3' onClick={(e) => console.log(e.target.value)}/>
                                            <label>&#9733;</label>
                                            <input type='radio' value='4' onClick={(e) => console.log(e.target.value)}/>
                                            <label>&#9733;</label>
                                            <input type='radio' value='5' onClick={(e) => console.log(e.target.value)}/>
                                        </form>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
};
