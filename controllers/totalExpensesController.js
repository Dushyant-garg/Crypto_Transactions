const express = require('express')
const Transaction = require("../models/Transaction")
const EthereumPrice = require("../models/EthereumPrice")

const totalExpenses = async (req, res) => {
    //get address from the query
    const { address } = req.query;

    if (!address) {
        return res.status(400).json({ error: 'Address is required' });
    }
    try {
        // Fetch transactions from the database for the given address
        const transactions = await Transaction.find({ address });

        if (!transactions.length) {
            return res.status(404).json({ error: 'No transactions found for this address' });
        }

        // Calculate total expenses for each transaction related to the given address
        let totalExpenses = 0;
        transactions.forEach(tx => {
            const gasUsed = parseFloat(tx.gasUsed);
            const gasPrice = parseFloat(tx.gasPrice);
            totalExpenses += (gasUsed * gasPrice) / 1e18;
        });

        // Fetch the latest Ethereum price
        const latestPrice = await EthereumPrice.findOne().sort({ createdAt: -1 });

        if (!latestPrice) {
            return res.status(500).json({ error: 'Failed to retrieve the current Ethereum price' });
        }

        // Return the total expenses and the current price of Ethereum
        return res.status(200).json({
            address,
            totalExpenses: totalExpenses.toFixed(18),
            currentEtherPrice: latestPrice.price,
            currency: latestPrice.currency
        });
    }
    catch (error) {
        console.error('Error calculating expenses:', error.message);
        return res.status(500).json({ error: 'Failed to calculate expenses' });
    }
}

module.exports = totalExpenses