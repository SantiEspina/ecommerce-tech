import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { getProducts } from '../../../Redux/actions';

import './Admin.scss';

export default function Admin() {
    const { products } = useSelector(state => state);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    if(!products) return (<h1>Loading...</h1>)
    return (
        <>
            <table className='admin'>
                <tr>
                    <th className='id'>id</th>
                    <th className='name'>name</th>
                    <th className='descr'>description</th>
                    <th className='img'>images</th>
                    <th className='price'>price</th>
                    <th className='stock'>stock</th>
                    <th className='categories'>categories</th>
                </tr>
                {
                    products.map((p,i) => (
                        <tr key={i}>
                            <td className='id'>{p.id}</td>
                            <td className='name'>{p.name}</td>
                            <td className='descr'>{p.description}</td>
                            <td className='img'>{p.image}</td>
                            <td className='price'>{p.price}</td>
                            <td className='stock'>{p.stock}</td>
                            <td className='categories'>{p.categories}</td>
                            <div className='btnsCRUD'>
                                <Link to='/admin/editProduct'>
                                    <button className='edit' value={p.id} onClick={() => {}}>Edit Product</button>   
                                </Link>
                                <button className='danger' value={p.id} onClick={() => {}}>Delete Product</button>
                            </div>
                        </tr>
                    ))
                }
            </table>
            <div className='btnAdd'>
                <Link to='/admin/addProduct'>
                    <button>Add New Product</button>
                </Link>
                <Link to='/admin/addCategory' >
                    <button className='addCategory' onClick={e => {}}>Add New Category</button>
                </Link>
            </div>
            {/* <div classname={`modal-bg-${check}`}> 
                <div className='modal'>
                    <span>Choose category to add: </span>
                    <select name='category' 
                        value={categories} 
                        onChange={handleInputChange} >
                            <option>Select Category...</option>
                        {
                            categories.map((c, i) => (
                                <option value={c} key={i}>{c}</option>
                            ))
                        }
                    </select>
                    <button>Finish</button>
                </div>
            </div>
            <div classname={`modal-bg-${check}`}>
                <div className='modal'>
                    <label for="stock">Choose how many products you want to remove: </label>
                    <input type="range" name="stock" id="stock" min="1" max="200" step="1" value="1"></input>
                    <div>
                        <button>Delete</button>
                        <button>Cancel</button>
                    </div>
                </div>
            </div> */}
        </>
    )
}

