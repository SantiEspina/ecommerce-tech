import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addReview, getProductToOrder } from '../../../../redux/actions';

import './orderId.scss';

export default function OrderID({ match }) {
    const { id } = match.params;
    const dispatch = useDispatch();
    const { cart, user } = useSelector(state => state);
    const [ input, setInput ] = useState({
        commentary: '',
        rating: '',
        idUser: user?.id,
        idProduct: null,
        review: false
    });
    let cont = 0;

    useEffect(() => {
        dispatch(getProductToOrder(id));
    }, [dispatch]);

    useEffect(() => {
        setInput({
            ...input,
            idUser: user?.id
        })
    }, [user]);

    const handleToggle = (e) => {
        let { name, value } = e.target;
        setInput({
            ...input,
            [name]: !input[name],
            idProduct: parseInt(value)
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
        dispatch(addReview(input));
        setInput({
            commentary: '',
            rating: '',
            idProduct: null,
            review: false
        });
    };

    if(!cart) return <h3>loading...</h3>;
    return (
        <div>
            <div className={`add-Review-${input.review}`}>
                <div className='add-ReviewBox'>
                    <form onSubmit={handleSubmit} className='form'>
                        <div>
                            <label>Commentary</label>
                            <input 
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
                        <input type='submit' value='Add Review' disabled={!input.commentary || !input.rating} />
                    </form>
                </div>
            </div>
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
                                        <div>
                                            <p>idProduct: {p.id} {' '} ('{p.orderProduct.name}')</p>
                                            <span>{p.orderProduct.quantity} x ${p.orderProduct.price}</span>
                                        </div>
                                        {
                                            cart.state === 'complete' ? (
                                                <button name='review' value={p.id} onClick={handleToggle}>Add Review</button>
                                            ) : null
                                        }
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
