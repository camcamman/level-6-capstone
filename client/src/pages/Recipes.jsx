import axios from "axios";
import React, { useEffect, useState } from "react";
import AllRecipes from "../components/AllRecipes";
import "../styles/recipes.css";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);

  const getRecipes = () => {
    axios
      .get("/recipes")
      .then((res) => setRecipes(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getRecipes();
  }, []);

  return (
    <div className="recipes">
      <h3>{`More than ${recipes.length} results for "recipes"`}</h3>
      <div className="recipe-wrapper">
        {recipes.map((recipe) => {
          return (
            <AllRecipes
              key={recipe._id}
              name={recipe.name}
              description={recipe.description}
              ingredients={recipe.details}
              instructions={recipe.instructions}
              type={recipe.type}
              imgUrl={recipe.imgUrl}
              id={recipe._id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Recipes;
