const express = require('express');
const adminController = require('../controller/AdminController');
var router = express.Router()

router.get('/customerlist',adminController.customerlist)
router.get('/customer',adminController.customer)
router.get('/transactionhistory',adminController.fetchtransactions)
router.get('/fetchmultipledoc',adminController.fetchMultipleDocument)
router.get('/managecustomer',adminController.manageCustomerStatus)
module.exports = router