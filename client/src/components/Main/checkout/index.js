import React, { useState } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import './Checkout.scss';
import '../Product/Card'

function Checkout () {
    const { cart }= useSelector(state => state);
    
    var cont=0;
    
    return (
        <div className ='cnt'>
        <div className='cartItems'>
          {
            cart && cart?.products.map(p => {
                cont += p.orderProduct.price * p.orderProduct.quantity;
            return (
                <li key={p.id} className='product'>
                    <p>{p.orderProduct.name}</p>
                     <span>{p.orderProduct.quantity} x ${p.orderProduct.price}</span>
                </li>  
                )
            })
          }
        </div>  
          <span>TOTAL: $ {cont}</span>
          <div>
              <p>Confirm your adress</p>
              <input type = "text"></input>
              <button className = 'btnBuy'>Buy</button>
          </div>
      </div>
  )

}

export default Checkout;
