import axios from 'axios'
import React, { useState, useContext } from 'react'
import { CartContext } from '../CartContext'
import { useParams } from 'react-router-dom'
import "../styles/productDetails.css"
import useEssentialDetails from '../hooks/useEssentialDetails'

const EssentialDetails = () => {

    const { id } = useParams()

    const { details, isLoaded} = useEssentialDetails(id)
    
    const cart = useContext(CartContext)
    const productQuantity = cart.getProductQuantity(id)
  
    if(!isLoaded) return <h2>Loading...</h2>

    return (
        <div className="details-container">
            <div className='details-wrapper'>
                <section className='section-wrapper'>
                    <img src={details.imgUrl} alt={details.name} />
                    <div className="section-details">
                        <h3>{details.name}</h3>
                    <div className='section-add'>
                        <p>${details.new_price}</p>
                        {productQuantity > 0 ?
                        <>
                        <button onClick={() => cart.addOneToCart(id)} >+</button>
                        <h1>{productQuantity}</h1>
                        <button onClick={() => cart.removeOneFromCart(id)}>-</button>
                        </>
                        :    
                        <button onClick={() => cart.addOneToCart(id)}>Add to cart</button>
                    }
                    </div>
                    </div>
                </section>
                <section className='description-section'>
                    <h3>Product description</h3>
                    <p>{details.description}</p>
                    <div className="product-details">
                        { details.details.map((detail, index)=> (
                                    <div key={index}><ul><li>{detail}</li></ul></div>
                                ))                        
                        }
                    </div>
                </section>
            </div>
        </div>
    )
}

export default EssentialDetails