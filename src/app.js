const express = require("express")
const app = express()
const helmet = require("helmet")
const morgan = require("morgan")
const dotenv = require("dotenv")
dotenv.config({path:"../config/config.env"})
const PORT = process.env.PORT
require("../db/conn")
const userRoute = require("../router/users")
const authRoute = require("../router/auth")

app.use(express.json())
app.use(helmet)
app.use(morgan("combined"))


app.use("/api/user", userRoute)
app.use("/api/auth", authRoute)

app.listen(PORT, ()=>{
    console.log("server up")
})
