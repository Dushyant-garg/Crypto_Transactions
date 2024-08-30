const express = require('express')
const axios = require('axios')
const Transaction = require("../models/Transaction")

const transactions = async (req, res) => {
    //get the address from the query
    const { address } = req.query;
    if (!address) {
        return res.status(400).json({ error: 'Address is required' });
    }

    try {
        //api call to get the transactions
        const response = await axios.get(`https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${process.env.ETHERSCAN_API_KEY}`);

        if (response.data.status === "0") {
            return res.status(404).json({ error: 'No transactions found' });
        }
        
        const transactions = response.data.result;

        // Save transactions in MongoDB
        for (let tx of transactions) {
            const newTransaction = new Transaction({ ...tx, address });
            await newTransaction.save();
        }

        return res.status(200).json(transactions);
    } 
    catch (error) {
        return res.status(500).json({ error: 'Error fetching transactions' });
    }
}

module.exports = transactions