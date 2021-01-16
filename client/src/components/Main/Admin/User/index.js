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
        adress: '',
        visibility: false
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
        // try {
        //     window.alert("The user has been created !!");
        // } catch (error) {

        //     window.alert(error);
        // }
        setInput({
            name: '',
            username: '',
            email: '',
            password: '',
            adress: '',
        }); 
    };


    const handleToggle = () => {
        setInput({
            ...input,
            visibility: input.visibility ? false : true
        })
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
                    <label>Password: </label>
                    <input
                        autoComplete="off"
                        type={input.visibility ? 'text' : 'password'}
                        name='password'
                        value={input.password}
                        onChange={handleInputChange}
                        className='password'
                        />
                        <span name='visibility' onClick={handleToggle}>&#128065;</span>
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
}

export default AddUser