require('dotenv').config()
const cors = require('cors')
const express =require('express')
const mongoose= require('mongoose')
const app =express()
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('connected to database')
}).catch((e) => {
    console.log('unable to connect to database ')
})

const port = process.env.PORT 
app.listen(port, () => {
    console.log('app is running')
})