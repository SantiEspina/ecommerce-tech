import React from 'react';
import Product from './Product/Product.js';

import './Main.scss';

export const prueba = [
    {
        name: 'teclado',
        description: 'asdfdasf',
        image: 'http://www.lojafoxgames.com.br/admin/produtos/produto_04_06_2018_1528128984.jpg',
        price: 20,
        stock: 5
    },
    {
        name: 'mouse',
        description: 'asdfdasf',
        image: 'http://www.tecknet.co.uk/media/catalog/product/cache/1/thumbnail/9df78eab33525d08d6e5fb8d27136e95/m/2/m268-red-4-1.jpg',
        price: 50,
        stock: 10
    },
    {
        name: 'monitor',
        description: 'asdfdasf',
        image: 'https://images.anandtech.com/doci/11347/predator-01_678x452.jpg',
        price: 100,
        stock: 15
    },
    {
        name: 'notebook',
        description: 'asdfdasf',
        image: 'https://gamehall.com.br/wp-content/uploads/2017/01/predator-21x.jpg',
        price: 200,
        stock: 20
    },
    {
        name: 'compu',
        description: 'asdfdasf',
        image: 'https://cdn.mos.cms.futurecdn.net/B6sGQ8Rv5KGKfXDH7KUnVJ-1200-80.jpg',
        price: 500,
        stock: 2
    }
]

export default function Main () {
    return (
        <div className='main'>
            <Product prop={prueba}/>
        </div>
    )
}