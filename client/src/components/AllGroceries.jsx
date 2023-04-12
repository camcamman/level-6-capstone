import { useContext } from "react";
import { CartContext } from '../CartContext';
import { Link } from "react-router-dom";
import { userContext } from '../authContext';
import "../styles/allGroceries.css";

const AllGroceries = ({
  name,
  description,
  details,
  newPrice,
  oldPrice,
  type,
  imgUrl,
  id,
  fullState,
}) => {
  // Import the CartContext and userContext contexts
  const cart = useContext(CartContext);
  // const { loggedIn } = useContext(userContext);

  return (
    <section className="grocery-product">
      {/* Link to the grocery details page */}
      <Link to={`/grocerydetails/${id}`} style={{textDecoration: "none", color: "white"}}>
        <img src={imgUrl} alt={name} />
      </Link>

      {/* Check whether the user is logged in */}
      {localStorage.getItem("token") 
        // If the user is logged in, render an "Add" button
        ? (
          <button onClick={() => {
            // Create a new cart object with the product details and user ID
            const newCartObj = {
              ...fullState, 
              user: JSON.parse(localStorage.getItem("user"))._id,
              quantity: 1
            }
            // Call the addOneToCart function from the CartContext context and pass in the product ID and cart object
            cart.addOneToCart(id, newCartObj)
          }}>
            <i className="fa-solid fa-plus"></i> Add
          </button>
        )
        // If the user is not logged in, render a "Sign in" button that links to the authentication page
        : (
          <Link to={"/auth"}>
            <button>
              Sign in 
            </button>
          </Link>
        )
      }

      {/* Render the new and old prices and the name of the product */}
      <div className="price-wrapper">
        <p className="product-new-price">Now ${newPrice}</p>
        <p className="product-old-price">${oldPrice}</p>
      </div>
      <p className="product-name">{name}</p>
    </section>
  );
};

export default AllGroceries;
