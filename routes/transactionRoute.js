const express = require('express')
const transactions = require('../controllers/transactionController.js')
const router = express.Router()

router.post('/get-transactions', transactions)

module.exports = router