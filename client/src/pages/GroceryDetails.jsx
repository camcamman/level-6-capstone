import axios from 'axios'
import React, { useState, useEffect, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { CartContext } from '../CartContext'
import useGroceryDetails from '../hooks/useGroceryDetails'
import "../styles/productDetails.css"
import { userContext } from '../authContext'

const GroceryDetails = () => {
    const { id } = useParams()
    const { details, isLoaded} = useGroceryDetails(id)
    const cart = useContext(CartContext)
    const productQuantity = cart.getProductQuantity(id)
    const { loggedIn } = useContext(userContext)

    if (!isLoaded) return <h2>Loading...</h2>

    function addToCart () {
        axios.get("/groceries") // make GET request to server to fetch essential products
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
            <div className='details-wrapper'>
                <section className='section-wrapper'>
                    <img src={details.imgUrl} alt={details.name} />
                    <div className="section-details">
                        <h3>{details.name}</h3>
                        <div className='section-add'>
                        <p>${details.new_price}</p>
                        {loggedIn 
                        ? 
                            productQuantity > 0 
                            ?
                                <>
                                <button onClick={() => cart.addOneToCart(id)} >+</button>
                                <h1>{productQuantity}</h1>
                                <button onClick={() => cart.removeOneFromCart(id)}>-</button>
                                </>
                            :    
                            <button onClick={() => addToCart()}>Add to cart</button>
                        : 
                        <Link to={"/auth"}>
                            <button>
                                Sign in 
                            </button>
                        </Link>}
                        
                        </div>
                    </div>
                </section>
                <section className='description-section'>
                    <h3>Product description</h3>
                    <p>{details.description}</p>
                    <div className="product-details">
                        {details.details.map((detail, index) => (
                            <div key={index}><ul><li>{detail}</li></ul></div>
                        ))
                        }
                    </div>
                </section>
            </div>
        </div>
    )
}

export default GroceryDetails