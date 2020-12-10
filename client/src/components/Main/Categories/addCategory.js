import React, {useState, useEffect} from 'react'

import './Categories.scss';

export default function Categories() {
    const [input, setInput] = useState({
        name: "",
      });

    const handleInputChange = function (e) {
        setInput ({
            ...input,
            [e.target.name]: e.target.value
            
        });
    }

    const handleSubmit = function (e) {
        e.preventDefault();
        // axios falta importar axios
        //     .post('http://localhost:3001/categories', {
        //     name:`${input.name}`,
        // })
        setInput({
            name:'',
        })
    }
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
                <input type='submit' value='Add Category' className='btnAddCategory'></input>
            </form>
        )
    
}

