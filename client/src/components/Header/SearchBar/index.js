import React, {useState, useEffect} from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { findProductBySearchBar } from '../../../redux/actions';

import './SearchBar.scss';

export default function SearchBar () {
    const [ input, setInput ] = useState('');
    const dispatch = useDispatch();

    const handleChange = (e) => {
      setInput(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(findProductBySearchBar(input));
        setInput('');
    }
    
    const check = useRouteMatch('/');

    return (
        <form 
        onSubmit={(e) => 
        handleSubmit(e)} 
        className={`searchBar-${check?.isExact ? 'active' : 'inactive'}`}>
            <input 
                type='text' 
                className='input' 
                value={input} 
                placeholder='What are you looking for?' 
                onChange={(e) => handleChange(e)}>     
            </input>
            <input 
                type='submit' 
                value='Search' 
                className='btnSearch'>
            </input>
        </form>
    )
}
