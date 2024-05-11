const express = require('express')
const router = express.Router()
const controller = require('../controller/category-controller')


router.get('/getcatrouter',controller.getCatDetails)
router.post('/addcatrouter',controller.addCatDetails)
router.put('/updatecatrouter/:_id',controller.updateCatDetails)
router.delete('/deleterouter/:_id',controller.deletecatDeatils)

module.exports=router
