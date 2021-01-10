import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../../redux/actions';

import './login.scss';

function Login () {
    const dispatch = useDispatch();
    const token = window.localStorage.getItem('token');

    let [ input, setInput ] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser(input))
        setInput({
            email: '',
            password: ''
        })
    };

    return (
        <>
            {
                !token ? (
                    <div className='loginCnt'>
                        <div className='loginBox'>
                            <h2>Login</h2>
                            <form onSubmit={handleSubmit}>
                                <div className='user-box'>
                                    <input type='text' name='email' autoComplete="off" value={input.email} onChange={handleChange} />
                                    <label>E-Mail</label>
                                </div>
                                <div className='user-box'>
                                    <input type='password' name='password' value={input.password} onChange={handleChange} />
                                    <label>Password</label>
                                </div>
                                <input type='submit' value='Submit' disabled={!input.email || !input.password || false} className='loginSubmit'/>
                            </form>
                            <div className='extras'>
                                <Link to='/confirmEmail' className='link'>
                                    <p>Forgot your password?</p>
                                </Link>
                                <p>or</p>
                                <Link to='/user' className='link'>
                                    <p>SIGN UP</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                ) : (<h1>logout</h1>)
            }
        </>
    )
};

export default Login;