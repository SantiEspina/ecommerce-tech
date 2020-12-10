import React, {useState} from 'react';

import './SearchBar.scss';

export default function SearchBar ({ filterSearchBar, products }) {
    const [ input, setInput ] = useState('');
    let check = 'active';

    const handleChange = (e) => {
      setInput(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        filterSearchBar(input, products);
        setInput('');
    }
    if (window.location.pathname != '/') {
        check = 'inactive';
    }
    return (
        <form onSubmit={(e) => handleSubmit(e)} className={`searchBar-${check}`}>
            <input type='text' value={input} placeholder='What are you looking for?' onChange={(e) => handleChange(e)}></input>
            <input type='submit' value='Search' className='btnSearch'></input>
        </form>
    )
}