const express = require("express")
const mongoose = require("mongoose")
const morgan = require("morgan")
const routes = require("./src/routes/index")
const swaggerUi = require("swagger-ui-express")
const swaggerDoc = require("./swagger.json");
const cors = require("cors")
// const swaggerDoc = require("./documentation/index")
require("dotenv").config()

const app = express()
const port = process.env.PORT || 3000
const server = async () => {
    try {
        await mongoose.connect(process.env.MONGO_CONNECT, { useNewUrlParser: true })
            .then(() => {
                console.log("MongoDB connected")
            })
        app.use(cors())
        app.use(express.json())
        app.use(morgan("dev"))
        app.use(
            "/api-docs",
            swaggerUi.serve,
            swaggerUi.setup(swaggerDoc, { extended: true })
          );
        app.use("/api/v1", routes)
        
        app.get("/", (req, res) => {
            res.send("Welcome to our API")
        })
        app.use("*", (req, res) => {
            res.status(404).send("page not found")
        })

        app.listen(port, () => {
            console.log("server up running on port", port)
        })
    } catch (error) {
        console.log(error)
    }
}

server()