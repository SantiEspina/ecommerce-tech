import React, { useEffect, useState } from 'react';
import { degradeAdmin, deleteUser, getUsers, promoteToAdmin } from '../../../Redux/actions';
import { useDispatch, useSelector } from 'react-redux';

import './users.scss';

function Users() {
    const dispatch = useDispatch();
    const { users, user } = useSelector(state => state);
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
    if (!user?.isAdmin) return window.location.replace('/login');

    return(
        <>
            <table className='usersCnt'>
                <tr>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Adress</th>
                    <th>isAdmin</th>
                    <th>Actions</th>
                </tr>
                {
                    users.map(u => (
                        <tr key={u.id}>
                            <td>{u.name}</td>
                            <td>{u.username}</td>
                            <td>{u.email}</td>
                            <td>{u.adress}</td>
                            <td>
                                <p>
                                    {u.isAdmin.toString().toUpperCase()}
                                </p>
                                <button 
                                    name='check' 
                                    value={u.id} 
                                    onClick={u.isAdmin ? degradeFunction : promoteFunction}
                                    className={u.isAdmin ? 'degrade' : 'promote'}
                                >
                                    {u.isAdmin ? 'Degrade' : 'Promote'}
                                </button>
                            </td>
                            <td>
                                <button name='delete' value={u.id} onClick={handleToggle} className='dltUser'>Delete User</button>
                            </td>
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