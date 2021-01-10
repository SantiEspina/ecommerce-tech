import React, { useEffect, useState } from 'react';
import { degradeAdmin, deleteUser, getUsers, promoteToAdmin } from '../../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';

import './users.scss';

function Users() {
    const dispatch = useDispatch();
    const { users } = useSelector(state => state);
    const [ input, setInput ] = useState({
        delete: false,
        id: null,
        check: false
    });
    
    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch, input]);

    const handleToggle = (e) => {
        let { name, value } = e.target;
        setInput({
            ...input,
            [name]: !input[name],
            id: value
        });
    };

    const deleteFunction = (e) => {
        let { name, value } = e.target;
        dispatch(deleteUser(value));
        setInput({
            ...input,
            [name]: !input[name],
            id: null
        });
    };

    const promoteFunction = (e) => {
        let { name, value } = e.target;
        dispatch(promoteToAdmin(value));
        setInput({
            ...input,
            [name]: !input[name]
        });
    };

    const degradeFunction = (e) => {
        let { name, value } = e.target;
        dispatch(degradeAdmin(value));
        setInput({
            ...input,
            [name]: !input[name]
        });
    }
    
    if(!users) return <h2>Loading...</h2>;
    return(
        <>
            <table className='usersCnt'>
                <tr>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Adress</th>
                    <th>isAdmin</th>
                </tr>
                {
                    users.map(u => (
                        <tr key={u.id}>
                            <td>{u.name}</td>
                            <td>{u.username}</td>
                            <td>{u.email}</td>
                            <td>{u.adress}</td>
                            <td>
                                {u.isAdmin.toString()}
                                <button name='check' value={u.id} onClick={u.isAdmin ? degradeFunction : promoteFunction}>{u.isAdmin ? 'Degrade' : 'Promote'}</button>
                            </td>
                            <div>
                                <button name='delete' value={u.id} onClick={handleToggle}>Delete User</button>
                            </div>
                        </tr>
                    ))
                }
            </table>
            <div className={`deleteCnt-${input.delete}`}>
                <div className='deleteBox'>
                    <button className='closeBtn' name='delete' onClick={handleToggle}>&times;</button>
                    <p>Are you sure you want to remove the user?</p>
                    <div className='buttons'>
                        <button className='yes' name='delete' value={input.id} onClick={deleteFunction}>Yes</button>
                        <button className='no' name='delete' onClick={handleToggle}>No</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Users;