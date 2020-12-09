import React from 'react';
import Card from './Card';

import './Product.scss';


export default function Product ({prop}) {
    return (
        <div className='productCnt'>
            {
                prop.map((p, i) => <Card 
                    key={i}
                    nombre={p.nombre}
                    descripcion={p.descripcion}
                    imagen={p.imagen}
                    precio={p.precio}
                    stock={p.stock} 
                    />
                )
            }
        </div>
    )
}