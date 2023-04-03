const express = require("express")
const app = express()
const morgan = require("morgan")
const mongoose = require("mongoose")
require('dotenv').config()

//Middleware (for every request)
app.use(express.json())
app.use(morgan("dev"))

// Connect to DB
mongoose.set("strictQuery", false)
mongoose.connect(process.env.MONGO_URL,
() => console.log("Connected to MongoDB")
)

// Routes //
app.use("/groceries", require("./routes/groceriesRouter"))
app.use("/essentials", require("./routes/essentialsRouter"))
app.use("/kitchen", require("./routes/kitchenRouter"))
app.use("/recipes", require("./routes/recipeRouter"))
app.use("/sales", require("./routes/salesRouter"))

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