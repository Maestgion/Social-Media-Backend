const mongoose = require("mongoose")
const dotenv = require("dotenv")

dotenv.config({path: "./config/config.env"})
const DB = process.env.DB
mongoose.set("strictQuery", false)

mongoose.connect(DB, { useNewUrlParser: true })
  .then(() => {
    console.log('DB connected successfully!!');
   
  })
  .catch(err => {
    console.error('DB connection error:', err);
  });