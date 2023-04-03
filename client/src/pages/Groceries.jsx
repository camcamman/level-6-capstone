import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import AllGroceries from "../components/AllGroceries";
import useGroceries from "../hooks/useGroceries";
import "../styles/groceries.css";


const Groceries = () => {

  const { groceries, setGroceries, getGroceries, isGroceryLoaded} = useGroceries()


  function handleFilter(e){
    if(e.target.value === "reset"){
      getGroceries()
    } else {
        axios
      .get(`/groceries/search/type?type=${e.target.value}`)
      .then(res => setGroceries(res.data))
      .catch(err => console.error(err))
    }
  }

  if(!isGroceryLoaded) return <h2>Loading...</h2>

  return (
    <div className="groceries">
      <div className="filter-wrapper">
      <h3>{`More than ${groceries.length} results for "groceries"`}</h3>
      <div>
      <h4 className="filter-type">Filter by Type</h4>
      <select onChange={handleFilter} className="filter-form">
        <option value="reset">All Groceries</option>
        <option value="fruit">Fruits</option>
        <option value="produce">Produce</option>
      </select>
      </div>
      </div>
      <div className="groceries-wrapper">
        {groceries.map((groceries) => {
          return (
            <AllGroceries
              key={groceries._id}
              name={groceries.name}
              description={groceries.description}
              details={groceries.details}
              newPrice={groceries.new_price}
              oldPrice={groceries.old_price}
              type={groceries.type}
              imgUrl={groceries.imgUrl}
              id={groceries._id}
              fullState={groceries}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Groceries;
