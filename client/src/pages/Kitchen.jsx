import axios from 'axios'
import { useEffect, useState, useContext } from 'react'
import AllKitchen from '../components/AllKitchen'
import useKitchen from '../hooks/useKitchen'
import "../styles/allKitchen.css"

const Kitchen = () => {

  const {kitchen, setKitchen, getKitchen, isKitchenLoaded} = useKitchen()
 
  function handleFilter(e){
    if(e.target.value === "reset"){
      getKitchen()
    } else {
        axios
      .get(`/kitchen/search/type?type=${e.target.value}`)
      .then(res => setKitchen(res.data))
      .catch(err => console.error(err))
    }
  }

  if(!isKitchenLoaded) return <h2>Loading...</h2>

  return (
    <div className='kitchen'>
      <div className="filter-wrapper">
      <h3>{`More than ${kitchen.length} results for "kitchen"`}</h3>
      <div>
      <h4 className="filter-type">Filter by Type</h4>
      <select onChange={handleFilter} className="filter-form">
        <option value="reset">All Kitchen</option>
        <option value="cookware">Cookware</option>
        <option value="bag">Bags</option>
        <option value="soap">Soap</option>
      </select>
      </div>
      </div>
      <div className='kitchen-wrapper'>
      {kitchen.map(kitchen => {
        // cartFunctions.addToCart (kitchen)
        return (
          <AllKitchen 
            key={kitchen._id}
            name={kitchen.name}
            description={kitchen.description}
            details={kitchen.details}
            newPrice={kitchen.new_price}
            oldPrice={kitchen.old_price}
            type={kitchen.type}
            imgUrl={kitchen.imgUrl}
            id={kitchen._id}
            fullState={kitchen}
          />
        )
      })}
      </div>

    </div>
  )
}

export default Kitchen