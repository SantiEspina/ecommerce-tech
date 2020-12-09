import React, {useState} from 'react';

import './SearchBar.scss';

export default function SearchBar ({ filterSearchBar, products }) {
    const [ input, setInput ] = useState('');

    const handleChange = (e) => {
      setInput(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        filterSearchBar(input, products);
        setInput('');
    }
    return (
        <form onSubmit={(e) => handleSubmit(e)} className='searchBar'>
            <input type='text' value={input} placeholder='Que estas buscando?' onChange={(e) => handleChange(e)}></input>
            <input type='submit' value='Buscar' className='btnSearch'></input>
        </form>
    )
}