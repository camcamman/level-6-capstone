const express = require("express")
const essentialsRouter = express.Router()
const Essentials = require("../models/Essentials")

// Get all Essentails
essentialsRouter.get("/", (req, res, next) => {
    Essentials.find((err, essentials) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(essentials)
    })
})

// Get one
essentialsRouter.get("/:essentialId", (req, res, next) => {
    Essentials.findOne({
        _id: req.params.essentialId
    }, (err, foundEssential) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(foundEssential)
    })
})

// Get by Type
essentialsRouter.get("/search/type", (req, res, next) => {
    Essentials.find(
        {type: req.query.type}, 
        (err, essentials) => {
            if(err){
                res.status(500)
                return next(200)
            }
            return res.status(200).send(essentials)
        }
    )
})

// Poste one
essentialsRouter.post("/", (req, res, next) => {
    const newEssential = new Essentials(req.body)
    newEssential.save((err, savedEssential) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedEssential)
    })
})

// Delete one 
essentialsRouter.delete("/:essentialId", (req, res, next) => {
    Essentials.findOneAndDelete(
        {_id: req.params.essentialId},
        (err, deletedEssential) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(`You have successfully deleted ${deletedEssential.name} from the database`)
        })
})

// Update one 
essentialsRouter.put("/:essentialId", (req, res, next) => {
    Essentials.findOneAndUpdate(
        {_id: req.params.essentialId}, // find this one to update
        (req.body), // update the object
        {new: true}, // send back the updated version
        (err, updatedEssential) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedEssential)
        }
    )
})

module.exports = essentialsRouter