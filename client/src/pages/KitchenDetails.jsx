import axios from 'axios'; // Importing axios library for making API requests
import React, { useState, useContext } from 'react'; // Importing necessary hooks from React
import { Link, useParams } from 'react-router-dom'; // Importing Link and useParams components from React Router
import { CartContext } from '../CartContext'; // Importing CartContext for accessing cart state and methods
import useKitchenDetails from '../hooks/useKitchenDetails'; // Importing custom hook for fetching kitchen details from API
import '../styles/productDetails.css'; // Importing CSS file for component styling
import { userContext } from '../authContext'; // Importing user context for checking if user is logged in

const GroceryDetails = () => {
  const { id } = useParams(); // Retrieving the 'id' parameter from the URL
  const { details, isLoaded } = useKitchenDetails(id); // Retrieving kitchen details using custom hook
  const cart = useContext(CartContext); // Retrieving cart state and methods using CartContext
  const productQuantity = cart.getProductQuantity(id); // Retrieving the quantity of the product in the cart
  const { loggedIn } = useContext(userContext); // Retrieving logged-in state from user context

  if (!isLoaded) { // If the kitchen details are not loaded yet, display a loading message
    return <h2>Loading...</h2>;
  }

  function addToCart () {
    axios.get("/kitchen") // make GET request to server to fetch essential products
    .then(res => {
      res.data.map(item => {
        if (item._id === id) { // check if the ID of the current item matches the ID of the product we want to add to the cart
          const newCartObj = { // create new cart object to add to cart
            ...item, // include all properties of the essential item
            user: JSON.parse(localStorage.getItem("user"))._id, // set the user ID to the ID of the currently logged in user
            quantity: 1 // set the quantity to 1
          }

          cart.addOneToCart(id, newCartObj ) // add the new cart object to the cart
        }
      })
    })
    .catch(err => console.error(err))
  }

  return (
    <div className="details-container">
      <div className="details-wrapper">
        <section className="section-wrapper">
          <img src={details.imgUrl} alt={details.name} />
          <div className="section-details">
            <h3>{details.name}</h3>
            <div className="section-add">
              <p>${details.new_price}</p>
              {loggedIn ? ( // If the user is logged in, show add to cart buttons
                productQuantity > 0 ? ( // If the product is already in the cart, show buttons to increase or decrease quantity
                  <>
                    <button onClick={() => cart.addOneToCart(id)}>+</button>
                    <h1>{productQuantity}</h1>
                    <button onClick={() => cart.removeOneFromCart(id)}>-</button>
                  </>
                ) : ( // If the product is not in the cart, show button to add it to the cart
                  <button onClick={() => addToCart()}>Add to cart</button>
                )
              ) : ( // If the user is not logged in, show a button to sign in
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
            {details.details.map((detail, index) => ( // Displaying a list of details about the product
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

export default GroceryDetails;
