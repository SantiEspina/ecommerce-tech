import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import { findProductBySearchBar } from '../../redux/actions';
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
                {/* <Link to='/admin/' className='link'>
                    <button></button>
                </Link> */}
                <Link to='/login' className='link'>
                    <button>Login</button>
                </Link>
                <Link to='/user' className='link'>
                    <button>Sign up</button>
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