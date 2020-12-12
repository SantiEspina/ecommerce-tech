import React from 'react';
import Card from './Card';
import { useSelector } from 'react-redux';

import './Product.scss';


function Product () {
    const { products } = useSelector(state => state);
    return (
        <div className='productCnt'>
            {
                products ?  
                products.map((p, i) => <Card 
                    key={i}
                    id={p.id}
                    name={p.name}
                    description={p.description}
                    image={p.image}
                    price={p.price}
                    stock={p.stock} 
                    />
                ) : (<h1>Loading...</h1>)
            }
        </div>
    )
};


export default Product;