import { useState, useContext} from 'react'
import { CartContext } from '../CartContext'
import "../styles/cartItem.css"

export default function CartItem(props) {

  const [quantityState, setQuantityState] = useState(props.quantity)
  const cart = useContext(CartContext);
  // // cart.getProductQuantity(props.item._id) = props.quantity
  // const productQuantity = cart.getProductQuantity(props.item._id);
  // // const productQuantity = props.quantity;
  // console.log(props.quantity)

  function addOne () {
    cart.addOneToCart(props.item._id, null, false)
    console.log(props.item._id)
    setQuantityState(prevState => prevState + 1)
  }

  function deleteOne (params) {
    if (quantityState <= 1) {
      deleteAll()
    }
    cart.removeOneFromCart(props.item._id)
    setQuantityState(prevState => prevState - 1)
  }

  function deleteAll () {
    // console.log(props.item._id)
    cart.deleteFromCart(props.item._id, true)
  }

  return (
    <div className='cart-item-wrapper'>
    <section className="cart-product-details">
      <img src={props.item.imgUrl} alt={props.item.name} />
      <p className="product-name">{props.item.name}</p>
      <p className="product-price">${props.item.new_price}</p>
    </section>
      <div className='add-remove-wrapper'>
        <button onClick={() => deleteAll() } className='item-remove-button'>Remove</button>
        <div className='operators-wrapper'>
         <i onClick={() => deleteOne() } className="fa-solid fa-minus"></i>
         <p>{quantityState}</p>
         <i onClick={() => addOne() }className="fa-solid fa-plus"></i>
        </div>
      </div>
    </div>
  )
}