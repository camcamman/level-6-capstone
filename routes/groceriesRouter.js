const express = require("express")
const groceryRouter = express.Router()
const Grocery = require("../models/Grocery")

// Get all Grocerys
groceryRouter.get("/", (req, res, next) => {
    Grocery.find((err, groceries) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(groceries)
    })
})

// Get one
groceryRouter.get("/:groceryId", (req, res, next) => {
    Grocery.findOne({
        _id: req.params.groceryId
    }, (err, foundGrocery) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(foundGrocery)
    })
})

// Get by Type
groceryRouter.get("/search/type", (req, res, next) => {
    Grocery.find(
        {type: req.query.type}, 
        (err, groceries) => {
            if(err){
                res.status(500)
                return next(200)
            }
            return res.status(200).send(groceries)
        }
    )
})

// Poste one
groceryRouter.post("/", (req, res, next) => {
    const newGrocery = new Grocery(req.body)
    newGrocery.save((err, savedGrocery) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedGrocery)
    })
})

// Delete one
groceryRouter.delete("/:groceryId", (req, res, next) => {
    Grocery.findOneAndDelete({
            _id: req.params.groceryId
        },
        (err, deletedGrocery) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(`Successfully deleted ${deletedGrocery.name}`)
        })
})

// Update one
groceryRouter.put("/:groceryId", (req, res, next) => {
    Grocery.findOneAndUpdate(
        {_id: req.params.groceryId}, // find this one to updateS
        (req.body), // update the object
        {new: true}, // send back the updated version
        (err, updatedGrocery) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedGrocery)
        }
    )
})

module.exports = groceryRouter