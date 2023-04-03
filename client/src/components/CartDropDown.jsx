import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import CartItem from './CartItem'
import { CartContext } from '../CartContext'
import "../styles/cartDropDown.css";

const CartDropdown = () => {

  //set state 
  const [essentials, setEssentials] = useState([])
  const [kitchenState, setKitchenState] = useState([])
  const [groceries, setGroceries] = useState([]);
  const [sales, setSales] = useState([]);

  // set context
  const cart = useContext(CartContext);

  //show how many items in cart 
  const productCount = cart.items.reduce(
    (sum, product) => sum + product.quantity,
    0
  );

  useEffect(() => {
    apiCall("essentials", setEssentials)
    apiCall("groceries", setGroceries)
    apiCall("kitchen", setKitchenState)
    apiCall("sales", setSales)
  }, [])

  function apiCall (url, setState) {
    axios
      .get(`/${url}`)
      .then((res) => 
      res.data.map((item) => {
        cart.items.map((product) => {
          if (item._id === product.id) {
            setState((prevItems) => {
              return [
                ...prevItems, item
              ]
            })
          }
        })
      }))
    .catch((err) => console.error(err));
  };

  return (
    <div className="cart-dropdown">
      <h3>Cart (<span>{productCount} items</span>)</h3>
      <div className="cart-items">

      {essentials.map(item => {
        console.log(item._id)
        return(
          <CartItem
            item={item}
            key={item._id}
          />
        )
      })}

{kitchenState.map(item => {
        console.log(item._id)
        return(
          <CartItem
            item={item}
            key={item._id}
          />
        )
      })}

      {groceries.map(item => {
        return(
          <CartItem
            item={item}
            key={item._id}
            quantity={cart.getProductQuantity(item.id)}
          />
        )
      })}
      {essentials.map(item => {
        return(
          <CartItem
            item={item}
            key={item._id}
            quantity={cart.getProductQuantity(item.id)}
          />
        )
      })}
      {kitchenState.map(item => {
        return(
          <CartItem
            item={item}
            key={item._id}
            quantity={cart.getProductQuantity(item.id)}
          />
        )
      })}
      {sales.map(item => {
        return(
          <CartItem
            item={item}
            key={item._id}
            quantity={cart.getProductQuantity(item.id)}
          />
        )
      })}
        <button>Checkout ({productCount} Items)</button>
      </div>
        <button className='checkout-button'>Checkout</button>
    </div>
  );
};

export default CartDropdown;