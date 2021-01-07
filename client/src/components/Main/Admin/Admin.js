import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProducts, deleteProduct, removeCategoryToProduct, getCategories, deleteCategory, addUser } from '../../../redux/actions';

import './Admin.scss';
import './Product/deleteProduct.scss';
import './Category/removeCategory.scss';


export default function Admin() {
    const { products, categories } = useSelector(state => state);
    const dispatch = useDispatch();
    let [input, setInput] = useState({
        removeCategory: false,
        delete: false,
        id: 0
    });

    const handleToggle = (e) => {
        let { name, value } = e.target;
        setInput({
            ...input,
            [name]: !input[name],
            id: value
        });
    };

    const handleInputChange = function (e) {
        setInput({
            ...input,
            id: e.target.value
        });
    }

    const deleteFunction = (e) => {
        let { value, name } = e.target;
        dispatch(deleteProduct(value));
        setInput({
            ...input,
            [name]: !input[name]
        })
    };

    const deleteCategoryToProduct = (e, id) => {
        let { value } = e.target;
        dispatch(removeCategoryToProduct(id, value));
        window.location.reload()
    };

    const removeCategory = (e) => {
        let { value, name } = e.target;
        dispatch(deleteCategory(value));
        setInput({
            ...input,
            [name]: !input[name]
        })
    }

    useEffect(() => {
        dispatch(getProducts());
        dispatch(getCategories());
    }, [dispatch, input]);

    if (!products || !categories) return (<h1>Loading...</h1>)
    return (
        <>
            <div className='btnAdd'>
                <Link to='/admin/addProduct'>
                    <button>Add New Product</button>
                </Link>
                <Link to='/admin/addCategory' >
                    <button className='addCategory' onClick={e => { }}>Add New Category</button>
                </Link>
                <button name='removeCategory' onClick={handleToggle}>Delete A Category</button>
                <Link to='/admin/editCategory' >
                    <button className='addCategory' onClick={e => { }}>Edit A Category</button>
                </Link>
                <Link to='/orders' >
                    <button className='addCategory' onClick={e => { }}>TableOrders</button>
                </Link>
                <Link to='/users'>
                    <button className='addCategory' onClick={e => { }}>All Users</button>
                </Link>
            </div>
            <div className={`removeCnt-${input.removeCategory}`}>
                <div className='removeBox'>
                    <button className='closeBtn' name='removeCategory' onClick={handleToggle}>&times;</button>
                    <p>Select a category to remove: </p>
                    <div className='infoCategories'>
                        <select name='category'
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
                    <div className='buttons'>
                        <button className='yes' name='removeCategory' value={input.id} onClick={removeCategory}>Delete</button>
                        <button className='no' name='removeCategory' onClick={handleToggle}>Cancel</button>
                    </div>
                </div>
            </div>
            <div className={`deleteCnt-${input.delete}`}>
                <div className='deleteBox'>
                    <button className='closeBtn' name='delete' onClick={handleToggle}>&times;</button>
                    <p>Are you sure you want to remove the product?</p>
                    <div className='buttons'>
                        <button className='yes' name='delete' value={input.id} onClick={deleteFunction}>Yes</button>
                        <button className='no' name='delete' onClick={handleToggle}>No</button>
                    </div>
                </div>
            </div>
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
                    products.map((p, i) => (
                        <tr key={i}>
                            <td className='id'>{p.id}</td>
                            <td className='name'>{p.name}</td>
                            <td className='descr'>{p.description}</td>
                            <td className='img'>{p.image}</td>
                            <td className='price'>{p.price}</td>
                            <td className='stock'>{p.stock}</td>
                            <td className='categories'>{
                                p.categories ? (
                                    p.categories.map(c => (
                                        <div key={c.id} className='categCnt'>
                                            <span>{c.name} </span>
                                            <button value={c.id} name='remove' onClick={(e) => deleteCategoryToProduct(e, p.id)}>&times;</button>
                                        </div>
                                    ))
                                ) : null
                            }
                            </td>
                            <div className='btnsCRUD'>
                                <Link to={`/admin/editProduct/${p.id}`}>
                                    <button className='edit' name='edit' value={p.id}>Edit Product</button>
                                </Link>
                                <button className='danger' name='delete' value={p.id} onClick={handleToggle}>Delete Product</button>
                            </div>
                        </tr>
                    ))
                }
            </table>
        </>
    )
}

