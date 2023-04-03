import React from "react";
import "../styles/allRecipes.css";
import { Link } from "react-router-dom";

const AllRecipes = ({
  name,
  description,
  ingredients,
  instructions,
  type,
  imgUrl,
  id,
}) => {
  return (
    <section className="recipe">
      <div className="image-container">
      <Link to={`/recipedetails/${id}`} style={{textDecoration: "none", color: "white"}}>
        <img src={imgUrl} alt={name} />
        </Link>
      </div>
      <button>
        <i className="fa-solid fa-plus"></i> Get Ingredients
      </button>
      <p className="recipe-name">{name}</p>
    </section>
  );
};

export default AllRecipes;
