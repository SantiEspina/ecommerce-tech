import React from 'react';
import Card from './Card';

import './Product.scss';


export default function Product ({prop}) {
    return (
        <div className='productCnt'>
            {
                prop.map((p, i) => <Card 
                    key={i}
                    name={p.name}
                    description={p.description}
                    image={p.image}
                    price={p.price}
                    stock={p.stock} 
                    />
                )
            }
        </div>
    )
}