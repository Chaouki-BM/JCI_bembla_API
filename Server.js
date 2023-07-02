require('dotenv').config()
const cors = require('cors')
const express =require('express')
const mongoose= require('mongoose')
const userRoutes = require("./Routes/userRoutes");
const app =express()
const port = process.env.PORT;

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())


mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected to MongoDB");
}).catch((e) => {
    console.error("Error connecting to MongoDB:", error);
})

app.use('/api',userRoutes);


app.listen(port, () => {
    console.log(`App is running on port :${port}`);
})

