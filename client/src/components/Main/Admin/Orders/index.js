import React, { useState } from 'react'



export default function Orders() {
    const [input , setInput]=useState({
        lista:[
            {name :'jorge',id:'1',description:'flaquito',price:5000,stock:1,categories:'klasnfjkfnasdbnjabsfa',img:'hola'},
            {name :'cristian',id:'2',description:'no lo se rick',price:4999,stock:2,categories:'klasnfjkfnasdbnjabsfa',img:'hola'},
            {name :'pablo',id:'3',description:'gordito',price:6000,stock:1,categories:'klasnfjkfnasdbnjabsfa',img:'hola'}
        ]
    })

    return (
        
        <div>
            <table className='admin'>
                <tr>
                    <th className='id'>id</th>
                    <th className='name'>name</th>
                    <th className='descr'>description</th>
                    <th className='img'>images</th>
                    <th className='price'>price</th>
                    <th className='stock'>stock</th>
                    <th className='categories'>categories</th>
                </tr>
                {
                    
                    input.lista.map((p,i) => (
                        <tr key={i}>
                            <td className='id'>{p.id}</td>
                            <td className='name'>{p.name}</td>
                            <td className='descr'>{p.description}</td>
                            <td className='img'>{p.image}</td>
                            <td className='price'>{p.price}</td>
                            <td className='stock'>{p.stock}</td>
                            <td className='categories'>{p.categories}</td>
                        </tr>
                    ))
                }
            </table>
        </div>
    )
}


