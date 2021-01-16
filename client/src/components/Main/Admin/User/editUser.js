import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getDetailsUser, editUser } from '../../../../Redux/actions';

export default function EditProduct({ match }) {
    const { id } = match.params;
    const dispatch = useDispatch();
    const { detailsUser, user } = useSelector(state => state);
    
    useEffect(() => {
        dispatch(getDetailsUser(id))
    }, [dispatch]);
    
    const [ input, setInput ] = useState({
        name: '',
        username:'',
        adress:'',
        email: '',
        password: ''
    });

    const handleInputChange = function (e) {
        setInput ({
            ...input,
            [e.target.name]: e.target.value 
        });
    };
    
    
    const handleSubmit = (e) => {
        e.preventDefault();
        for(let key in input) {
            if(!input[key]) {
                input[key] = detailsUser[key]
            }
        };
        dispatch(editUser(id, input));
        alert('Your profile was edited correctly!');
        setInput({
            name: '',
            username: '',
            adress: '',
            email: ''
        });
    };
    
    if(!detailsUser) return (<h3>Loading...</h3>);
    if (!user?.isAdmin) return window.location.replace('/login');

    return (
        <form onSubmit={handleSubmit} className='formAddProduct'>
            <div className='div'>
                <label>Name: </label>
                <input 
                    placeholder={detailsUser.name}
                    type='text'
                    autoComplete="off"
                    name='name'
                    value={input.name} 
                    onChange={handleInputChange} />   
            </div>
            <div className='div'>
                <label>Username: </label>
                <textarea 
                    placeholder={detailsUser.username}
                    type='text' 
                    autoComplete="off"
                    name='username' 
                    value={input.username} 
                    onChange={handleInputChange}
                />
            </div>
            <div className='div'> 
                <label>Email: </label>
                <textarea 
                    placeholder={detailsUser.email}
                    type='text' 
                    autoComplete="off"
                    name='email' 
                    value={input.email} 
                    onChange={handleInputChange} 
                />
            </div>
            <div className='div'>
                <label>Adress: </label>
                <textarea 
                    placeholder={detailsUser.adress}
                    type='text' 
                    name='adress' 
                    autoComplete="off"
                    value={input.adress} 
                    onChange={handleInputChange} 
                />
            </div>
            <div className='div'>
                <label>Password: </label>
                <Link to='/confirmEmail' className='link' >
                    <button>Change Password</button>
                </Link>
            </div>
            <input type='submit' value='Edit User' className='btnAddProduct' />
        </form>
    )
}