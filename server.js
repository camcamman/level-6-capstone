const express = require("express")
const app = express()
const morgan = require("morgan")
const mongoose = require("mongoose")
require('dotenv').config()
const {expressjwt} = require('express-jwt')

//Middleware (for every request)
app.use(express.json())
app.use(morgan("dev"))

// Connect to DB
mongoose.set("strictQuery", false)
// mongoose.connect(process.env.MONGO_URL,
mongoose.connect('mongodb://127.0.0.1:27017/Level6Capstone',
() => console.log("Connected to MongoDB")
)

// Routes //
app.use("/groceries", require("./routes/groceriesRouter"))
app.use("/essentials", require("./routes/essentialsRouter"))
app.use("/kitchen", require("./routes/kitchenRouter"))
app.use("/recipes", require("./routes/recipeRouter"))
app.use("/sales", require("./routes/salesRouter"))
app.use('/auth', require("./routes/authRouter"))
// app.use('/api', expressjwt({ secret: process.env.SECRET, algorithms: ['HS256'] })) 

// Error Handling
app.use((err, req, res, next) => {
    console.log(err)
    return res.send({errMsg: err.message})
})

// Server Listen
const port = process.env.PORT || 8666
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})