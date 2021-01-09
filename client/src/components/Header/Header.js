import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import { useDispatch, useSelector } from 'react-redux';

import './Header.scss';
import { logout } from '../../redux/actions';

function Header () {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state);
    const [ input, setInput ] = useState({
        guest: false,
        user: false,
        logout: false
    });

    const handleToggle = (e) => {
        let { name } = e.target;
        setInput({
            ...input,
            [name]: !input[name]
        });
    };

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
        setInput({
            guest: false,
            user: false,
            logout: false
        })
    }

    return (
        <header className='header'>
            <Link to='/' className='link'>
                <h3>ECOMMERCE GRUPO 2</h3>
            </Link>
            <SearchBar/>
            <div className='adds'>
                {
                    user ? (
                        <>
                            <button name='user' onClick={handleToggle}>{user.username}</button>
                            <div className={`user-${input.user}`}>
                                <h4>Hi again {user.name}!</h4>
                                <Link to={`/user/${user.id}`} className='link'>
                                    <button name='user' onClick={handleToggle}>View Profile</button>
                                </Link>
                                {
                                    user.isAdmin ? (
                                        <div>
                                            <Link to='/admin/' className='link'>
                                                <button name='user' onClick={handleToggle}>Admin Panel</button>
                                            </Link>
                                        </div>
                                    ) : null
                                }
                                <button className='logout' name='logout' onClick={handleToggle}>Logout</button>
                                <div className={`logout-${input.logout}`}>
                                    <p>Are you sure you want to logout?</p>
                                    <div>
                                        <button onClick={handleLogout}>Yes</button>
                                        <button name='logout' onClick={handleToggle}>No</button>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <> 
                            <img src='https://cdn.discordapp.com/attachments/788030330405781511/796809516585844767/115-1150152_default-profile-picture-avatar-png-green.jpg' 
                                name='guest' 
                                onClick={handleToggle} 
                            />
                            <div className={`userGuest-${input.guest}`}>
                                <h4>Guest</h4>
                                <Link to='/login' className='link'>
                                    <button name='guest' onClick={handleToggle}>Login</button>
                                </Link>
                                <Link to='/user' className='link'>
                                    <button name='guest' onClick={handleToggle}>Sign up</button>
                                </Link>
                            </div>
                        </>
                    )
                }
                
            </div>
        </header>
    )
};

export default Header;