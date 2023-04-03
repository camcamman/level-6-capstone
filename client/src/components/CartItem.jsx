import { useState, useContext} from 'react'
import { CartContext } from '../CartContext'
import "../styles/cartItem.css"

export default function CartItem(props) {

  const cart = useContext(CartContext);
  const productQuantity = cart.getProductQuantity(props.item._id);

    return (
    <div className='cart-item-wrapper'>
    <section className="cart-product-details">
      <img src={props.item.imgUrl} alt={props.item.name} />
      <p className="product-name">{props.item.name}</p>
      <p className="product-price">${props.item.new_price}</p>
    </section>
      <div className='add-remove-wrapper'>
        <button onClick={() => cart.deleteFromCart(props.item._id)} className='item-remove-button'>Remove</button>
        <div className='operators-wrapper'>
         <i onClick={() => cart.removeOneFromCart(props.item._id)} className="fa-solid fa-minus"></i>
         <p>{productQuantity}</p>
         <i onClick={() => cart.addOneToCart(props.item._id)}className="fa-solid fa-plus"></i>
        </div>
      </div>
    </div>
  )
}