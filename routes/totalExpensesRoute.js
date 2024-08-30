const express = require('express')
const totalExpenses = require('../controllers/totalExpensesController.js')
const router = express.Router()

router.get("/get-expenses", totalExpenses)

module.exports = router
