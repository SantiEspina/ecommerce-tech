import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Categories.scss';
import { getCategories } from '../../../Redux/actions';

export default function Categories() {
    const dispatch = useDispatch();
    const { categories } = useSelector(state => state);

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);


    if(!categories) return (<h1>Loading...</h1>)
    return (
        <ul className='categoriesCnt'>
            <h2>Categories:</h2>
            <li>All Products</li>
            {
                categories.map(c => (
                    <li key={c.id}>{c.name}</li>
                ))
            }
        </ul>
    )
    
}

