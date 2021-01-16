import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './addCategories.scss';
import { useSelector } from 'react-redux';

export default function Categories() {
    const [input, setInput] = useState({
        name: "",
      });

    const { user } = useSelector(state => state);

    const handleInputChange = function (e) {
        setInput ({
            ...input,
            [e.target.name]: e.target.value
            
        });
    }

    const handleSubmit = function (e) {
        e.preventDefault();
        axios
            .post('/categories', {
            name:`${input.name}`,
        })
        .then((data) => {
            return (data);
        });
        setInput({
            name:'',
        })
        window.alert("Your category was created successfully!");

    }
    if (!user?.isAdmin) return window.location.replace('/login');

        return (
            <form onSubmit={(e) => handleSubmit(e)} className='formAddCategory'>
                <div className='div'>
                    <label>Name: </label>
                    <input 
                     type='text'
                     name='name'
                     value={input.name} 
                     onChange={handleInputChange} />   
                </div>
                <input type='submit' value='Add Category' disabled={!input.name && 'true'} className='btnAddCategory'></input>
            </form>
        )
    
}

