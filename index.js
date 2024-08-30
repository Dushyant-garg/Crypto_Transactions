const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const transactionRoute = require('./routes/transactionRoute.js')
const totalExpenses = require('./routes/totalExpensesRoute.js')
const fetchEthereumPrice = require('./controllers/ethereumPriceController.js')

dotenv.config();

const app = express()
const PORT = process.env.PORT || 3000;

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("connected to mongodb")
    } catch (err) {
        throw err
    }
}

mongoose.connection.on("disconnected", () => {
    console.log("mongodb disconnected")
})

app.use(express.json());

app.use("/api/transaction",transactionRoute)
app.use("/api/expense",totalExpenses)
//call for ethereum price to get the latest value
fetchEthereumPrice()

app.listen(PORT, ()=>{
    connect()
    console.log("Server started")
})