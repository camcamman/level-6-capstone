const express = require("express")
const salesRouter = express.Router()
const Sale = require("../models/Sale")

// Get all Saless
salesRouter.get("/", (req, res, next) => {
    Sale.find((err, sales) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(sales)
    })
})

// Get one
salesRouter.get("/:saleId", (req, res, next) => {
    Sale.findOne({
        _id: req.params.saleId
    }, (err, foundSales) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(foundSales)
    })
})

// Get by Type
salesRouter.get("/search/type", (req, res, next) => {
    Sale.find(
        {type: req.query.type}, 
        (err, sales) => {
            if(err){
                res.status(500)
                return next(200)
            }
            return res.status(200).send(sales)
        }
    )
})

// Poste one
salesRouter.post("/", (req, res, next) => {
    const newSales = new Sale(req.body)
    newSales.save((err, savedSale) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedSale)
    })
})

// Delete one
salesRouter.delete("/:saleId", (req, res, next) => {
    Sale.findOneAndDelete({
            _id: req.params.saleId
        },
        (err, deletedSale) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(`Successfully deleted ${deletedSale.name}`)
        })
})

// Update one
salesRouter.put("/:saleId", (req, res, next) => {
    Sale.findOneAndUpdate(
        {_id: req.params.saleId}, // find this one to updateS
        (req.body), // update the object
        {new: true}, // send back the updated version
        (err, updatedSale) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedSale)
        }
    )
})

module.exports = salesRouter