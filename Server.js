require('dotenv').config()
const cors = require('cors')
const express =require('express')
const mongoose= require('mongoose')


const userRoutes = require("./Routes/userRoutes");
const trainingRoutes = require("./Routes/TrainingRoutes");
const formerRoutes = require("./Routes/FormerRoutes");
const depositRoutes = require("./Routes/DepositRoutes");
const eventRoutes = require("./Routes/EventRoutes");
const incomeRoutes = require("./Routes/IncomeRoutes");
const sponsoringRoutes = require("./Routes/SponsoringRoutes");

const app =express()
const port = process.env.PORT;

const userrouter=require('./Routes/user.routes')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected to MongoDB");
}).catch((e) => {
    console.error("Error connecting to MongoDB:", error);
})

//ha4a route mte3i lkol /api
app.use("/user",userRoutes); //------> login w kel fazet mte3 zebbi
app.use("/trainings", trainingRoutes);//-----> wa4e7
app.use("/formers", formerRoutes);//-----> wa4e7
app.use("/deposits", depositRoutes);//-----> wa4e7
app.use("/events", eventRoutes);//-----> wa4e7
app.use("/incomes", incomeRoutes);//-----> wa4e7
app.use("/sponsorings", sponsoringRoutes);//-----> wa4e7

app.use('/',userrouter);

app.listen(port, () => {
    console.log(`App is running on port :${port}`);
})

