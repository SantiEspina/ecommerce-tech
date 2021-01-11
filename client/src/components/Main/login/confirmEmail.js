import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { confirmEmail } from '../../../redux/actions';

import './confirmEmail.scss';

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
        <form onSubmit={handleSubmit} className='confirmEmailCnt'>
            <div className='confirmEmailBox'>
                <div>
                    <label>Confirm email: </label>
                    <input  
                    type='email' 
                    value={email} 
                    autoComplete="off"
                    onChange={handleChange} 
                    name='email'/>
                </div>
                <input type='submit' value='Submit' className='input' disabled={!email} />
            </div>
        </form>
    )
};

export default ConfirmEmail;