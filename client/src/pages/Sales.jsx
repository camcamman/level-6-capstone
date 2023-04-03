import axios from "axios";
import React, { useEffect, useState } from "react";
import AllSales from "../components/AllSales";
import "../styles/sales.css"

const Sales = () => {
  const [sales, setSales] = useState([]);

  const getsales = () => {
    axios
      .get("/sales")
      .then((res) => setSales(res.data))
      .catch((err) => console.error(err));
  };

  function handleFilter(e){
    if(e.target.value === "reset"){
      getsales()
    } else {
        axios
      .get(`/sales/search/type?type=${e.target.value}`)
      .then(res => setSales(res.data))
      .catch(err => console.error(err))
    }
  }

  useEffect(() => {
    getsales();
  }, []);

  return (
    <div className="sales">
      <div className="filter-wrapper">
      <h3>{`More than ${sales.length} results for "sales"`}</h3>
      <div>
      <h4 className="filter-type">Filter by Type</h4>
      <select onChange={handleFilter} className="filter-form">
        <option value="reset">All Sales</option>
        <option value="fruit">Fruits</option>
        <option value="produce">Produce</option>
      </select>
      </div>
      </div>
      <div className="sales-wrapper">
        {sales.map((sales) => {
          return (
            <AllSales
              key={sales._id}
              name={sales.name}
              description={sales.description}
              details={sales.details}
              newPrice={sales.new_price}
              oldPrice={sales.old_price}
              type={sales.type}
              imgUrl={sales.imgUrl}
              id={sales._id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Sales;
