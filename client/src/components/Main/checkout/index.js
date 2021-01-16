import React, { useDebugValue, useEffect, useState } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import './Checkout.scss';
import { confirmPurchase } from '../../../redux/actions';

function Checkout () {
    const { cart, user, order }= useSelector(state => state);
    const dispatch = useDispatch();
    const [ input, setInput ] = useState({
      adress: '',
      email: user?.email,
      username: user?.username,
      idOrder: order?.id
    });
    
    var cont=0;

    useEffect(() => {
      setInput({
        ...input,
        email: user?.email,
        username: user?.username,
        idOrder: order?.id
      })
    }, [user, order]);

    const handleChange = (e) => {
      let { value } = e.target;
      setInput({
        ...input,
        adress: value
      });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(confirmPurchase(input));
    };
    
    return (
        <div className ='cnt'>
        <table className='cartItems'>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
          {
            cart && cart?.products.map(p => {
                cont += p.orderProduct.price * p.orderProduct.quantity;
            return (
                <tr key={p.id} className='product'>
                    <td>{p.orderProduct.name}</td>
                    <td>$ {p.orderProduct.price}</td>
                    <td>{p.orderProduct.quantity}</td>
                </tr>  
                )
            })
          }
        </table>  
          <span>TOTAL: $ {cont}</span>
          <form 
            onSubmit={handleSubmit}
            className='form'
          >
              <label>Confirm your adress please:</label>
              <textarea type = "text" value={input.adress} onChange={handleChange} />
              <input className = 'btnBuy' value='Buy' type='submit' disabled={!input.adress ? true : false}/>
          </form>
      </div>
  )

}

export default Checkout;
