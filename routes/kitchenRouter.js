const express = require("express");
const kitchenRouter = express.Router();
const Kitchen = require("../models/Kitchen");

// Get all Essentails
kitchenRouter.get("/", (req, res, next) => {
  Kitchen.find((err, kitchen) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(200).send(kitchen);
  });
});

// Get one
kitchenRouter.get("/:essentialId", (req, res, next) => {
  Kitchen.findOne(
    {
      _id: req.params.essentialId,
    },
    (err, foundEssential) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      return res.status(200).send(foundEssential);
    }
  );
});

// Get by Type
kitchenRouter.get("/search/type", (req, res, next) => {
  Kitchen.find({ type: req.query.type }, (err, kitchen) => {
    if (err) {
      res.status(500);
      return next(200);
    }
    return res.status(200).send(kitchen);
  });
});

// Poste one
kitchenRouter.post("/", (req, res, next) => {
  const newEssential = new Kitchen(req.body);
  newEssential.save((err, savedEssential) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(201).send(savedEssential);
  });
});

// Delete one
kitchenRouter.delete("/:essentialId", (req, res, next) => {
  Kitchen.findOneAndDelete(
    { _id: req.params.essentialId },
    (err, deletedEssential) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      return res
        .status(200)
        .send(
          `You have successfully deleted ${deletedEssential.name} from the database`
        );
    }
  );
});

// Update one
kitchenRouter.put("/:essentialId", (req, res, next) => {
  Kitchen.findOneAndUpdate(
    { _id: req.params.essentialId }, // find this one to update
    req.body, // update the object
    { new: true }, // send back the updated version
    (err, updatedEssential) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      return res.status(201).send(updatedEssential);
    }
  );
});

module.exports = kitchenRouter;
