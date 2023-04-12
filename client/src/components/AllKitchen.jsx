import {useContext} from "react";
import "../styles/allKitchen.css"
import { CartContext } from '../CartContext'
import { Link } from "react-router-dom"
import { userContext } from "../authContext";

const Kitchen = ({
  name,
  description, 
  details, 
  newPrice, 
  oldPrice, 
  type, 
  imgUrl, 
  id, 
  fullState}) => {

  const cart = useContext(CartContext)
  const { loggedIn } = useContext(userContext)

    return(
        <section className='kitchen-product'>
          <Link to={`/kitchendetails/${id}`} style={{textDecoration: "none", color: "white"}}>
            <img src={imgUrl} alt={name} />
          </Link>
          {loggedIn  
        ? 
        // <button onClick={() => cart.addOneToCart(id)}>
        //   <i className="fa-solid fa-plus"></i> Add
        // </button>

        // <button onClick={() => {
        //   const newCartObj = {
        //     ...fullState, 
        //     user: JSON.parse(localStorage.getItem("user"))._id,
        //     quantity: 1
        //   }

        //   cart.addOneToCart(id, newCartObj)
        // }}>
        //   <i className="fa-solid fa-plus"></i> Add
        // </button>
        // }}>
        // : 
          <button onClick={() => {
          const newCartObj = {
            ...fullState, 
            user: JSON.parse(localStorage.getItem("user"))._id,
            quantity: 1
          }

          cart.addOneToCart(id, newCartObj)
        }}>
          <i className="fa-solid fa-plus"></i> Add
        </button>
      : 

      <Link to={"/auth"}>
          <button>
            Sign in 
          </button>
      </Link>}
      
        <div className='price-wrapper'>
          <p className='product-new-price'>Now ${newPrice}</p>
          <p className='product-old-price'>${oldPrice}</p>
        </div>
        <p className='product-name'>{name}</p>
      </section>
    )
}

export default Kitchen