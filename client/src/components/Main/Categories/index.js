import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Categories.scss';
import { getCategories, getProductByCategory } from '../../../redux/actions';

export default function Categories() {
    const dispatch = useDispatch();
    const { categories } = useSelector(state => state);

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    const filterCategory = (e) => {
        let { value } = e.target;
        dispatch(getProductByCategory(value))
    };


    if(!categories) return (<h1></h1>)
    return (
        <div className='categoriesCnt'>
            <h2>Categories</h2>
            <button value='' onClick={filterCategory}>All Products</button>
            {
                categories.map(c => (
                    <button key={c.id} value={c.name} onClick={filterCategory}>{c.name}</button>
                ))
            }
        </div>
    )
    
}

