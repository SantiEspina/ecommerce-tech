import React, { useEffect } from 'react';
import { getUsers } from '../../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';

import './users.scss';

function Users() {
    const dispatch = useDispatch();
    const { users } = useSelector(state => state);
    
    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    if(!users) return <h2>Loading...</h2>;
    return(
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
                        <td>{u.direction}</td>
                        <td>{u.isAdmin.toString()}</td>
                    </tr>
                ))
            }
        </table>
    )
}

export default Users;