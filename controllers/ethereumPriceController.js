const express = require('express')
const axios = require('axios')
const EthereumPrice = require('../models/EthereumPrice')

const fetchEthereumPrice = async () => {
    try {
        //get the latest price
        const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr')
        const priceInINR = response.data.ethereum.inr

        // Save the price to MongoDB
        const newPrice = new EthereumPrice({
            price: priceInINR,
            currency: 'INR'
        })

        await newPrice.save()
        console.log(`Ethereum price saved: Rs.${priceInINR}`)
    } 
    catch (error) {
        console.error('Error fetching Ethereum price:', error)
    }
}

// Fetch the price every 10 minutes
setInterval(fetchEthereumPrice, 10 * 60 * 1000)

module.exports = fetchEthereumPrice
