import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editProduct, getDetails, getCategories, addCategoryToProduct } from '../../../../Redux/actions';

export default function EditProduct({ match }) {
    const dispatch = useDispatch();
    const { details, categories, user } = useSelector(state => state);
    const { id } = match.params;
    
    useEffect(() => {
        dispatch(getDetails(id));
        dispatch(getCategories());
    }, [dispatch]);
    
    const [ input, setInput ] = useState({
        name: '',
        category:'',
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
        for(let key in input) {
            if(!input[key]) {
                input[key] = details[key]
            }
        };
        dispatch(editProduct(id, input));
        dispatch(addCategoryToProduct(id, input.category));
        alert('The product was edited correctly!');
        setInput({
            name: '',
            category: '',
            description: '',
            image: '',
            price: '',
            stock: ''
        })
    };
    
    if(!details || !categories) return (<h3>Loading...</h3>);
    if (!user?.isAdmin) return window.location.replace('/login');

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
            <div className='div'> 
                <label>Categories: </label>
                <select name='category' 
                    value={input.category} 
                    onChange={handleInputChange} >
                        <option value=''>Select Category...</option>
                    {   
                        categories.map((c, i) => (
                            <option value={c.id} key={c.id}>{c.name}</option>
                        ))
                    }
                </select> 
            </div>
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
            <input type='submit' value='Edit Product' className='btnAddProduct'></input>
        </form>
    )
    
}