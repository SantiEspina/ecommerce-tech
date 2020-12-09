import React from 'react';
// import { Link } from 'react-router-dom';
import SearchBar from './SearchBar/SearchBar';
import { filterSearchBar } from '../../utils';
import { prueba } from '../Main/Main';

import './Header.scss';

export default function Header () {
    return (
        <header className='header'>
            {/* <Link to='/'>
                <span>ECOMMERCE GRUPO 2</span>
            </Link> */}
            <h1>asdfdas</h1>
            <SearchBar filterSearchBar={filterSearchBar} products={prueba}/>
        </header>
    )
}