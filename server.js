const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const authRoutes = require("./routes/auth")

dotenv.config()

const app = express()
app.use(express.json())

app.use("/api/auth", authRoutes)

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("mongodb is Runing"))
    .catch(err => console.log("mongodb is not Runing"))

app.listen(process.env.PORT, () => console.log(`Server is running on 5000`))
