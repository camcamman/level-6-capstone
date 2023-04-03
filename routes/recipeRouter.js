const express = require("express");
const recipeRouter = express.Router();
const recipe = require("../models/Recipe");

// Get all Recipes
recipeRouter.get("/", (req, res, next) => {
  recipe.find((err, recipe) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(200).send(recipe);
  });
});

// Get one
recipeRouter.get("/:recipeId", (req, res, next) => {
  recipe.findOne(
    {
      _id: req.params.recipeId,
    },
    (err, foundRecipe) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      return res.status(200).send(foundRecipe);
    }
  );
});

// Get by Type
recipeRouter.get("/search/type", (req, res, next) => {
  recipe.find({ type: req.query.type }, (err, recipe) => {
    if (err) {
      res.status(500);
      return next(200);
    }
    return res.status(200).send(recipe);
  });
});

// Poste one
recipeRouter.post("/", (req, res, next) => {
  const newRecipe = new recipe(req.body);
  newRecipe.save((err, savedRecipe) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(201).send(savedRecipe);
  });
});

// Delete one
recipeRouter.delete("/:recipeId", (req, res, next) => {
  recipe.findOneAndDelete(
    { _id: req.params.recipeId },
    (err, deletedRecipe) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      return res
        .status(200)
        .send(
          `You have successfully deleted ${deletedRecipe.name} from the database`
        );
    }
  );
});

// Update one
recipeRouter.put("/:recipeId", (req, res, next) => {
  recipe.findOneAndUpdate(
    { _id: req.params.recipeId }, // find this one to update
    req.body, // update the object
    { new: true }, // send back the updated version
    (err, updatedRecipe) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      return res.status(201).send(updatedRecipe);
    }
  );
});

module.exports = recipeRouter;
