import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editProduct, getDetails } from '../../../Redux/actions';

import './editProduct.scss';

export default function EditProduct({ match }) {
    const dispatch = useDispatch();
    const { details } = useSelector(state => state);
    const { id } = match.params;
    
    useEffect(() => {
        dispatch(getDetails(id))
    }, [dispatch]);
    
    const [ input, setInput ] = useState({
        name: '',
        description: '',
        image: '',
        price: '',
        stock: ''
    });

    const handleInputChange = function (e) {
        setInput ({
            ...input,
            [e.target.name]: e.target.value 
        });
    };
    
    
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(editProduct(id, input));
        alert('The product was edited correctly!');
        setInput({
            name: '',
            description: '',
            image: '',
            price: '',
            stock: ''
        })
    };
    
    if(!details) return (<h3>Loading...</h3>);
    return (
        <form onSubmit={handleSubmit} className='formAddProduct'>
            <div className='div'>
                <label>Name: </label>
                <input 
                    placeholder={details.name}
                    type='text'
                    name='name'
                    value={input.name} 
                    onChange={handleInputChange} />   
            </div>
            <div className='div'>
                <label>Description: </label>
                <textarea 
                    placeholder={details.description}
                    type='text' 
                    name='description' 
                    value={input.description} 
                    onChange={handleInputChange}
                />
            </div>
            {/* <div className='div'> 
                <label>Categories: </label>
                <select name='category' 
                    value={input.category} 
                    onChange={handleInputChange} >
                        <option value=''>Select Category...</option>
                    {
                        categories.map((c, i) => (
                            <option value={c.name} key={c.id}>{c.name}</option>
                        ))
                    }
                </select> 
            </div> */}
            <div className='div'> 
                <label>URL or URLS of images: </label>
                <textarea 
                    placeholder={details.image}
                    type='text' 
                    name='image' 
                    value={ input.image} 
                    onChange={handleInputChange} 
                />
            </div>
            <div className='div'>
                <label>Price: </label>
                <input 
                    placeholder={details.price}
                    type='number' 
                    name='price' 
                    value={input.price} 
                    onChange={handleInputChange} 
                />
            </div>
            <div className='div'>
                <label>Stock: </label>
                <input 
                    type='number'
                    placeholder={details.stock}
                    name='stock' 
                    value={input.stock} 
                    onChange={handleInputChange}
                    />
            </div>
            <input type='submit' value='Edit Product' disabled={!input.name || !input.price || !input.stock || false} className='btnAddProduct'></input>
        </form>
    )
    
}