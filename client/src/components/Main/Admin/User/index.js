import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../../../../Redux/actions';
import './user.scss';


function AddUser() {
    const dispatch = useDispatch();
    const [input, setInput] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        direction: '',
    });
    const handleInputChange = function (e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    };
    const handleSubmit = function (e) {
        e.preventDefault();
        dispatch(addUser(input));
        setInput({
            name: '',
            username: '',
            email: '',
            password: '',
            direction: '',
        });
        window.alert("The user has been created !!");
    };
    return (
        <form onSubmit={handleSubmit} className='formaddUser'>
            <div className='div'>
                <label>Name: </label>
                <input
                    type='text'
                    name='name'
                    value={input.name}
                    onChange={handleInputChange} />
            </div>
            <div className='div'>
                <label>Username: </label>
                <textarea
                    type='text'
                    name='username'
                    value={input.username}
                    onChange={handleInputChange}
                />
            </div>
            <div className='div'>
                <label>Email: </label>
                <textarea
                    type='email'
                    name='email'
                    value={input.email}
                    onChange={handleInputChange}
                />
            </div>
            <div className='div'>
                <label>Password: </label>
                <input
                    type='password'
                    name='password'
                    value={input.password}
                    onChange={handleInputChange}
                />
            </div>
            <div className='div'>
                <label>Direction: </label>
                <input
                    type='text'
                    name='direction'
                    value={input.direction}
                    onChange={handleInputChange}
                />
            </div>
            <input type='submit'
                value='Add User'
                disabled={!input.name || !input.username || !input.email || !input.password || !input.direction || false} className='btnAddUser'></input>
        </form>
    )
}

export default AddUser