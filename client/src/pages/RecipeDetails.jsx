import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const RecipeDetails = () => {

    const [details, setDetails] = useState({})
    const [isLoaded, setIsLoaded] = useState(false)

    const { id } = useParams()

    const getData = () => {
        axios
            .get(`/recipes/${id}`)
            .then(res => {
                setDetails(res.data)
                setIsLoaded(true)
            })
    }

    useEffect(() => {
        window.scrollTo(0, 0)
        getData()
    }, [])

    if (!isLoaded) return <h2>Loading...</h2>

    return (
        <div className="details-container">
            <div className='details-wrapper'>
                <section className='section-wrapper'>
                    <img src={details.imgUrl} alt={details.name} />
                    <div className="section-details">
                        <h3>{details.name}</h3>
                        <div className='section-add'>
                            <button><i className="fa-solid fa-plus"></i> Get ingredients</button>
                        </div>
                    </div>
                </section>
                <section className='description-section'>
                    <h3>Product description</h3>
                    <p>{details.description}</p>
                    <div className="product-details">
                        <h3>Ingredients</h3>
                        {
                            details.ingredients.map((detail, index) => (
                                <div key={index}><ul><li>{detail}</li></ul></div>
                            ))
                        }
                    </div>
                    <div className="product-instructions">
                        <h3>Instructions</h3>
                        {
                            details.instructions.map((detail, index) => (
                                <div key={index}><ol><li>{detail}</li></ol></div>
                            ))
                        }
                    </div>
                </section>
            </div>
        </div>
    )
}

export default RecipeDetails