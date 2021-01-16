import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../../../Redux/actions';

import './resetPassword.scss';

function ResetPassword ({ location }) {
    const token = location.search.split('=')[1];
    const dispatch = useDispatch();
    const [ input, setInput ] = useState({
        password: '',
        password2: '',
        visibility: false
    });

    const handleInputChange = (e) => {
        let { name, value } = e.target;
        setInput({
            ...input,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(resetPassword(token, input));
        setInput({
            password: '',
            password2: '',
        })
    };

    const handleToggle = () => {
        setInput({
            ...input,
            visibility: input.visibility ? false : true
        })
    };

    return(
        <form onSubmit={handleSubmit} className='resetPasswordCnt'>
            <div className='resetPasswordBox'>
                <div>
                    <label>New Password: </label>
                    <input type={input.visibility ? 'text' : 'password'} name='password' value={input.password} onChange={handleInputChange} />
                    <span name='visibility' onClick={handleToggle}>&#128065;</span>
                </div>
                <div>
                    <label>Repeat Password: </label>
                    <input type={input.visibility ? 'text' : 'password'} name='password2' value={input.password2} onChange={handleInputChange} />
                    <span name='visibility' onClick={handleToggle}>&#128065;</span>
                </div>
                {
                    !(input.password === input.password2) ? (
                        <p>Passwords are not the same</p>
                        ) : null
                    }
                <input type='submit' value='Submit' disabled={input.password && (input.password === input.password2) ? false : true} className='input' />
            </div>
        </form>
    )
};

export default ResetPassword;