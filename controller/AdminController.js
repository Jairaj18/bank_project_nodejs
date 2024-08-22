const CustomerModal = require('../modal/CustomerModal');
const bcrypt = require('bcrypt');
const TransactionModal = require('../modal/transactionmodal')
const multipleDocumentModal = require('../modal/multipleDocumentModal')

const customerlist = async (req, res) => {
    try {
        var customerlist = await CustomerModal.find({})
        return res.status(200).json({
            "success": true,
            "customers": customerlist,
            "msg": "Get Customer List Successfully"
        })
    } catch (error) {
        return res.status(400).json({
            "success": false,
            "error": error
        })
    }
}

const customer = async (req, res) => {
    const { id } = req.query 
    console.log(id)
    try {
        var customer = await CustomerModal.findById({_id:id})
        return res.status(200).json({
            "success": true,
            "record": customer
        })
    } catch (error) {
        return res.status(400).json({
            "success": false,
            "error": error
        })
    }
}

const fetchtransactions = async (req,res)=>{
   try {
    var transactions = await TransactionModal.find({})
    res.status(200).json({
        success: true,
        history: transactions,
    })
   } catch (error) {
    res.status(400).json({
        success: false,
        history: "transaction history not found"
    })
   } 
}

const fetchMultipleDocument = async (req, res) => {
    try {
        var fetchdocs = await multipleDocumentModal.find({})
        return res.status(200).json({
            status: true,
            docs: fetchdocs
        })
    } catch (error) {
        return res.status(400).json({
            status: false,
            error: error
        })
    }
}

const manageCustomerStatus = async (req,res)=>{
    const { id, s } = req.query
    console.log("get id:===>", id,s)
    if (s == "block") {
        const result = await CustomerModal.findByIdAndUpdate({
            _id: id
        }, {
            $set: {
                status: 0
            }
        }, {
            new: true,
            useFindAndModify: false
        })
        res.status(200).json({
            success: true,
            msg: result,
        })
    }
    else if (s == "verify") {
        const result = await CustomerModal.findByIdAndUpdate({
            _id: id
        }, {
            $set: {
                status: 1
            }
        }, {
            new: true,
            useFindAndModify: false
        })
        res.status(200).json({
            success: true,
            msg: result,
        })
    }
    else{
        await CustomerModal.findByIdAndDelete({
            _id: id
        },{
            new: true,
            useFindAndModify: false
        })
        res.status(200).json({
            success: true,
            msg: "Record Delete Successfully!!",
        })
    }
}

module.exports = {
    customerlist,
    customer,
    fetchtransactions,
    fetchMultipleDocument,
    manageCustomerStatus
}