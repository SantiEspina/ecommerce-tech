import React from 'react';
import Product from './Product/Product.js';

import './Main.scss';

export const prueba = [
    {
        nombre: 'teclado',
        descripcion: 'asdfdasf',
        imagen: 'http://www.lojafoxgames.com.br/admin/produtos/produto_04_06_2018_1528128984.jpg',
        precio: 20,
        stock: 5
    },
    {
        nombre: 'mouse',
        descripcion: 'asdfdasf',
        imagen: 'http://www.tecknet.co.uk/media/catalog/product/cache/1/thumbnail/9df78eab33525d08d6e5fb8d27136e95/m/2/m268-red-4-1.jpg',
        precio: 50,
        stock: 10
    },
    {
        nombre: 'monitor',
        descripcion: 'asdfdasf',
        imagen: 'https://images.anandtech.com/doci/11347/predator-01_678x452.jpg',
        precio: 100,
        stock: 15
    },
    {
        nombre: 'notebook',
        descripcion: 'asdfdasf',
        imagen: 'https://gamehall.com.br/wp-content/uploads/2017/01/predator-21x.jpg',
        precio: 200,
        stock: 20
    },
    {
        nombre: 'compu',
        descripcion: 'asdfdasf',
        imagen: 'https://cdn.mos.cms.futurecdn.net/B6sGQ8Rv5KGKfXDH7KUnVJ-1200-80.jpg',
        precio: 500,
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