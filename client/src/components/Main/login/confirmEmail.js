import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { confirmEmail } from '../../../redux/actions';

function ConfirmEmail () {
    const dispatch = useDispatch();
    const [ email, setEmail ] = useState('');

    const handleChange = (e) => {
        let { value } = e.target;
        setEmail(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(confirmEmail(email));
        setEmail('');
    };
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Confirm email: </label>
                <input  type='email' value={email} onChange={handleChange} name='email'/>
            </div>
            <input type='submit' />
        </form>
    )
};

export default ConfirmEmail;