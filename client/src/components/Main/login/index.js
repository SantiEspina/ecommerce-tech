import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../../Redux/actions';
import google from '../../../assets/img/google.png';
import './login.scss';
import dotenv from "dotenv";
dotenv.config();


function Login () {
    const dispatch = useDispatch();
    const token = window.localStorage.getItem('token');

    let [ input, setInput ] = useState({
        email: '',
        password: '',
        visibility: false
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

    const handleToggle = () => {
        setInput({
            ...input,
            visibility: input.visibility ? false : true
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
                                    <input 
                                    type='text' 
                                    name='email' 
                                    autoComplete="off" 
                                    value={input.email} 
                                    onChange={handleChange} />
                                    <label>E-Mail</label>
                                </div>
                                <div className='user-box'>
                                    <input 
                                    type={input.visibility ? 'text' : 'password'} 
                                    name='password'
                                    value={input.password}
                                    onChange={handleChange} />
                                    <span onClick={handleToggle}>&#128065;</span>
                                    <label>Password</label>
                                </div>
                                <input type='submit' value='Submit' disabled={!input.email || !input.password || false} className='loginSubmit'/>
                            </form>
                            <div className='extras'>
                                <a href={process.env.REACT_APP_API + '/auth/google' || "http://localhost:3001" + '/auth/google'} className='google'><img src={google} />Login with Google</a>
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