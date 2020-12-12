import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar/SearchBar';
import { findProductBySearchBar } from '../../Redux/actions';
import { connect } from 'react-redux';

import './Header.scss';

function Header ({ prueba, findProductBySearchBar }) {
    return (
        <header className='header'>
            <Link to='/' className='link'>
                <h3>ECOMMERCE GRUPO 2</h3>
            </Link>
            <SearchBar filterSearchBar={findProductBySearchBar} products={prueba}/>
            <div className='adds'>
                <Link to='/admin/' className='link'>
                    <button>Admin Panel</button>
                </Link>
            </div>
        </header>
    )
};

const mapStateToProps = (state) => {
    return {
        prueba: state
    }
};

export default connect(mapStateToProps, { findProductBySearchBar })(Header);