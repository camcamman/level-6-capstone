import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../CartContext";
import { userContext } from "../authContext";

const EssentialsCarousel = ({
  name,
  description,
  details,
  newPrice,
  oldPrice,
  type,
  imgUrl,
  id,
}) => {

  // Access cart state and functions using context
  const cart = useContext(CartContext)

  // Access loggedIn state from userContext using context
  const { loggedIn } = useContext(userContext)

  return (
    // Render a section for each product
    <section className="essential-product">
      {/* Link to the product details page */}
      <Link to={`/essentialdetails/${id}`} style={{textDecoration: "none", color: "white"}}>
        {/* Render the product image */}
        <img src={imgUrl} alt={name} />
      </Link>
      {/* If user is logged in, render a button to add the product to the cart */}
      {loggedIn 
      ? 
        <button onClick={() => cart.addOneToCart(id)}>
          <i className="fa-solid fa-plus"></i> Add
        </button>
      // If user is not logged in, render a button to navigate to the authentication page
      : 
      <Link to={"/auth"}>
          <button>
            Sign in 
          </button>
      </Link>}
      {/* Render the product prices */}
      <div className="price-wrapper">
        <p className="product-new-price">Now ${newPrice}</p>
        <p className="product-old-price">${oldPrice}</p>
      </div>
      {/* Render the product name */}
      <p className="product-name">{name}</p>
    </section>
  );
};

export default EssentialsCarousel;
