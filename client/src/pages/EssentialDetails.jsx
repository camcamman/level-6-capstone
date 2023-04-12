import { useContext, useEffect } from 'react'; // import necessary hooks
import { CartContext } from '../CartContext'; // import CartContext for cart management
import { Link, useParams } from 'react-router-dom'; // import Link and useParams for routing
import useEssentialDetails from '../hooks/useEssentialDetails'; // import custom hook
import { userContext } from '../authContext'; // import userContext for user authentication
import '../styles/productDetails.css'; // import component-specific styles
import axios from 'axios';

const EssentialDetails = () => {
  const { id } = useParams(); // get the ID from the URL params
  const { details, isLoaded } = useEssentialDetails(id); // use custom hook to get product details
  const cart = useContext(CartContext); // use CartContext to manage the cart
  const productQuantity = cart.getProductQuantity(id); // get the quantity of this product in the cart
  const { loggedIn } = useContext(userContext); // get the logged-in status from the user context

    if (!isLoaded) return <h2>Loading...</h2>; // show loading message while data is being fetched
    
  // return the JSX for the component
  return (
    <div className="details-container">
      <div className="details-wrapper">
        <section className="section-wrapper">
          <img src={details.imgUrl} alt={details.name} />
          <div className="section-details">
            <h3>{details.name}</h3>
            <div className="section-add">
              {/* show "Add to cart" or quantity buttons depending on cart state and login status */}
              {loggedIn ? (
                productQuantity > 0 ? (
                  <>
                    <button onClick={() => cart.addOneToCart(id)}>+</button>
                    <h1>{productQuantity}</h1>
                    <button onClick={() => cart.removeOneFromCart(id)}>-</button>
                  </>
                ) : (
                  <button onClick={() => cart.addOneToCart(id)}>Add to cart</button>
                )
              ) : (
                <Link to={'/auth'}>
                  <button>Sign in</button>
                </Link>
              )}
            </div>
          </div>
        </section>
        <section className="description-section">
          <h3>Product description</h3>
          <p>{details.description}</p>
          <div className="product-details">
            {/* map through the details array and render each item in a list */}
            {details.details.map((detail, index) => (
              <div key={index}>
                <ul>
                  <li>{detail}</li>
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default EssentialDetails;
