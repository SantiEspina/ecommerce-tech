import React, {useState, useEffect} from 'react'
// import axios from 'axios';
import './addProduct.scss';


function AddProduct(){
    const [input, setInput] = useState({
        name:'',
        category:'',
        description:'',
        image:'',
        price:'',
        stock:''
    })
    const [categories, setCategories] = useState(['teclados', 'mouse'])
    
    const handleInputChange = function (e) {
        setInput ({
            ...input,
            [e.target.name]: e.target.value 
        });
    }
    
    const handleInputCategoryChange = function(e) {
        var categories = ''
        categories = e.target.name
        setInput ({
            ...input,
            category: categories,
        })
    }
    
    const handleSubmit = function(e) {
        e.preventDefault();
        // axios falta importar axios
        //     .post('http://localhost:3001/products', {
        //     name:`${input.name}`,
        //     description:`${input.description}`,
        //     category:`${input.category}`,
        //     image:`${input.image}`,
        //     price:`${input.price}`,
        //     stock:`${input.stock}`,
        // })
        setInput({
            name:'',
            category:'',
            description:'',
            image:'',
            price:'',
            stock:''
        })
    }

    
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
                <div className='div'> 
                    <label>Categories: </label>
                    <select name='category' 
                        value={input.category} 
                        onChange={handleInputChange} >
                            <option>Select Category...</option>
                        {
                            categories.map((c, i) => (
                                <option value={c} key={i}>{c}</option>
                            ))
                        }
                    </select> 
                </div>
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
                        type='text' 
                        name='price' 
                        value={input.price} 
                        onChange={handleInputChange} 
                    />
                </div>
                <div className='div'>
                    <label>Stock: </label>
                    <input 
                        type='text'
                        name='stock' 
                        value={input.stock} 
                        onChange={handleInputChange}
                     />
                </div>
                <input type='submit' value='Add Product' className='btnAddProduct'></input>
            </form>
        )
}

export default AddProduct
