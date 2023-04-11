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
                            <button onClick={() => cart.addOneToCart(id)}>Add to cart</button>
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