import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUserAdmin } from '../../../../redux/actions';

export default function AddUserAdmin() {
    const dispatch = useDispatch();
    const [input, setInput] = useState({
        name: '',
        username: '',
        email: '',
        isAdmin: false,
        password: '',
        adress: '',
    });
    const handleInputChange = function (e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    };

    const handleToggle = (e) => {
        let { name } = e.target;
        setInput({
            ...input,
            [name]: !input[name]
        });
    };
    
    const handleSubmit = function (e) {
        e.preventDefault();
        dispatch(addUserAdmin(input));
        setInput({
            name: '',
            username: '',
            email: '',
            password: '',
            adress: '',
            isAdmin: false
        });
        
    };
    return (
        <div className='formaddUser'>
            <form onSubmit={handleSubmit} className='userBox'>
                <h2>Create User</h2>
                <div className='div'>
                    <label >Name: </label>
                    <input
                        autoComplete="off"
                        type='text'
                        name='name'
                        value={input.name}
                        onChange={handleInputChange} />
                </div>
                <div className='div'>
                    <label>Username: </label>
                    <textarea
                        autoComplete="off"
                        type='text'
                        name='username'
                        value={input.username}
                        onChange={handleInputChange}
                        />
                </div>
                <div className='div'>
                    <label>Email: </label>
                    <textarea
                        autoComplete="off"
                        type='email'
                        name='email'
                        value={input.email}
                        onChange={handleInputChange}
                        />
                </div>
                <div className='div'>
                    <label>Is Admin?</label>
                    <input
                        type='checkbox'
                        className='checkbox'
                        name='isAdmin'
                        onClick={handleToggle}
                        />
                </div>
                <div className='div'>
                    <label>Password: </label>
                    <input
                        autoComplete="off"
                        type='password'
                        name='password'
                        value={input.password}
                        onChange={handleInputChange}
                        />
                </div>
                <div className='div'>
                    <label>Adress: </label>
                    <input
                        autoComplete="off"
                        type='text'
                        name='adress'
                        value={input.adress}
                        onChange={handleInputChange}
                        />
                </div>
                <input type='submit'
                    value='Add User'
                    disabled={!input.name || !input.username || !input.email || !input.password || !input.adress || false} className='btnAddUser'></input>
            </form>
        </div>
    )
};
