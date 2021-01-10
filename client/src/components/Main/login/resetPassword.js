import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../../../redux/actions';

function ResetPassword ({ location }) {
    const token = location.search.split('=')[1];
    const dispatch = useDispatch();
    const [ input, setInput ] = useState({
        password: '',
        password2: '',
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

    return(
        <form onSubmit={handleSubmit}>
            <div>
                <label>New Password: </label>
                <input type='password' name='password' value={input.password} onChange={handleInputChange} />
            </div>
            <div>
                <label>Repeat Password: </label>
                <input type='password' name='password2' value={input.password2} onChange={handleInputChange} />
            </div>
            {
                !(input.password === input.password2) ? (
                    <p>Passwords are not the same</p>
                ) : null
            }
            <input type='submit' disabled={input.password && (input.password === input.password2) ? false : true} />
        </form>
    )
};

export default ResetPassword;