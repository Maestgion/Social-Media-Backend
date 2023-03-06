const express = require("express")
const app = express()
const helmet = require("helmet")
const morgan = require("morgan")
const dotenv = require("dotenv")
dotenv.config({path:"../config/config.env"})
const PORT = process.env.PORT
require("../db/conn")


app.listen(PORT, ()=>{
    console.log("server up")
})
