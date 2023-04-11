import { useContext } from "react";
import { CartContext } from "../CartContext";
import { Link } from "react-router-dom";
import { userContext } from "../authContext";

const GroceriesCarousel = ({
  name,
  description,
  details,
  newPrice,
  oldPrice,
  type,
  imgUrl,
  id,
}) => {

  // Get the cart and loggedIn state from the contexts
  const cart = useContext(CartContext);
  const { loggedIn } = useContext(userContext);
  
  return (
    <section className="grocery-product">

      {/* Link to the grocery details page */}
      <Link to={`/grocerydetails/${id}`} style={{textDecoration: "none", color: "white"}}>
        <img src={imgUrl} alt={name} />
      </Link>

      {/* If the user is logged in, show the Add to Cart button */}
      {loggedIn 
      ? 
        <button onClick={() => cart.addOneToCart(id)}>
          <i className="fa-solid fa-plus"></i> Add
        </button>
      : 
      
    // If the user is not logged in, show the Sign in button
      <Link to={"/auth"}>
          <button>
            Sign in 
          </button>
      </Link>}

      {/* Show the price information and product name */}
      <div className="price-wrapper">
        <p className="product-new-price">Now ${newPrice}</p>
        <p className="product-old-price">${oldPrice}</p>
      </div>
      <p className="product-name">{name}</p>
    </section>
  );
};

export default GroceriesCarousel;
