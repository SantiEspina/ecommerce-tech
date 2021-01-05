import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCategories, editCategory } from '../../../../redux/actions';

import './EditCategory.scss';


export default function EditProduct () {
    const dispatch = useDispatch();
    const { categories } = useSelector(state => state);
    const [ input, setInput ] = useState({
        id: false,
        name: ''
    });

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch, input]);

    const handleInputChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(editCategory(input.id, input.name));
        alert('Your category was edited correctly');
        setInput({
            id: false,
            name: ''
        });
    };

    if(!categories) return (<h2>Loading...</h2>)
    return (
        <div className='containerEdit'>
            <div className='infoCategories'>
                <h2>Select Category to edit: </h2>
                <select name='id' 
                    value={input.id} 
                    onChange={handleInputChange} >
                        <option value=''>Categories...</option>
                    {   
                        categories.map((c, i) => (
                            <option value={c.id} key={c.id}>{c.name}</option>
                            ))
                        }
                </select>
            </div>
            {
                input.id ? (
                    <div className='editInfo'>
                        <div className='info'>
                            <label>New name: </label>
                            <input 
                                type='text'
                                name='name'
                                value={input.name} 
                                onChange={handleInputChange} /> 
                        </div>
                        <button disabled={input.name ? false : true} onClick={handleSubmit}>Edit</button>
                    </div>
                ) : null
            }
        </div>
    )

};