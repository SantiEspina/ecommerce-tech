import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import './addProduct.scss';
import { getCategories } from '../../../Redux/actions';
import { addProduct } from '../../../Redux/actions';


function AddProduct(){
    const { categories } = useSelector(state => state);
    const dispatch = useDispatch();

    const [input, setInput] = useState({
        name:'',
        // category:'',
        description:'',
        image:'',
        price: '',
        stock: ''
    });

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);
    
    const handleInputChange = function (e) {
        setInput ({
            ...input,
            [e.target.name]: e.target.value 
        });
    };
    
    const handleSubmit = function(e) {
        e.preventDefault();
        dispatch(addProduct(input));
        setInput({
            name: '',
            description: '',
            image: '',
            price: '',
            stock: ''
        });
        
        window.alert("Your product was created successfully!");
    };

    if(!categories) return (<h2>Loading...</h2>)
    return (
        <form onSubmit={handleSubmit} className='formAddProduct'>
            <div className='div'>
                <label>Name: </label>
                <input 
                    type='text'
                    name='name'
                    value={input.name} 
                    onChange={handleInputChange} />   
            </div>
            <div className='div'>
                <label>Description: </label>
                <textarea 
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
                    type='text' 
                    name='image' 
                    value={input.image} 
                    onChange={handleInputChange} 
                />
            </div>
            <div className='div'>
                <label>Price: </label>
                <input 
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
                    name='stock' 
                    value={input.stock} 
                    onChange={handleInputChange}
                    />
            </div>
            <input type='submit' value='Add Product' disabled={!input.name || !input.price || !input.stock || false} className='btnAddProduct'></input>
        </form>
    )
}

export default AddProduct;
