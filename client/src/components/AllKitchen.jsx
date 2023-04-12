import { useContext } from "react";
import "../styles/allKitchen.css";
import { CartContext } from '../CartContext';
import { Link } from "react-router-dom";
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
  fullState
}) => {

  // use CartContext to get access to cart object and update the cart
  const cart = useContext(CartContext);

  // use userContext to get access to loggedIn state
  const { loggedIn } = useContext(userContext);

  return(
    <section className='kitchen-product'>

      {/* use Link from react-router-dom to navigate to kitchendetails page */}
      <Link to={`/kitchendetails/${id}`} style={{textDecoration: "none", color: "white"}}>
        <img src={imgUrl} alt={name} />
      </Link>

      {/* if user is logged in */}
      {loggedIn ? (
        <button onClick={() => {
          // create a new cart object to add the product to the cart
          const newCartObj = {
            ...fullState, 
            user: JSON.parse(localStorage.getItem("user"))._id,
            quantity: 1
          }

          // call addOneToCart function from cart object to add product to the cart
          cart.addOneToCart(id, newCartObj);
        }}>
          <i className="fa-solid fa-plus"></i> Add
        </button>
      ) : (
        // if user is not logged in, navigate to auth page to sign in
        <Link to={"/auth"}>
          <button>
            Sign in 
          </button>
        </Link>
      )}

      {/* show product prices */}
      <div className='price-wrapper'>
        <p className='product-new-price'>Now ${newPrice}</p>
        <p className='product-old-price'>${oldPrice}</p>
      </div>

      {/* show product name */}
      <p className='product-name'>{name}</p>
    </section>
  )
}

export default Kitchen;
