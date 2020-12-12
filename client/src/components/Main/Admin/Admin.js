import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { getProducts, deleteProduct } from '../../../Redux/actions';

import './Admin.scss';
import './deleteProduct.scss';


export default function Admin() {
    const { products } = useSelector(state => state);
    const dispatch = useDispatch();
    let [ input, setInput ] = useState({
        edit: false,
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

    const deleteFunction = (e) => {
        let { value, name } = e.target;
        dispatch(deleteProduct(value));
        setInput({
            ...input,
            [name]: !input[name]
        })
    }

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch, products]);

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
                                <Link to={`/admin/editProduct/${p.id}`}>
                                    <button className='edit' name='edit' value={p.id}>Edit Product</button>   
                                </Link>
                                <button className='danger' name='delete' value={p.id} onClick={handleToggle}>Delete Product</button>
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
            {/* <div className={`editCnt-${input.edit}`}>
                <div className='editBox'>
                    <button className='closeBtn' name='edit' onClick={handleToggle}>&times;</button>
                    <p>hola</p>
                </div>
            </div> */}
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
        </>
    )
}

