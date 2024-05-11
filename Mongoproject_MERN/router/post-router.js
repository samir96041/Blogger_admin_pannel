const express = require ('express')
const router = express.Router()
let controller = require("../controller/post-controller")


router.get('/getrouter', controller.getpostdetails)
router.post('/addrouter', controller.addpostdetails)
router.put('/putrouter/:_id', controller.updatepostDetails)
router.delete('/deleterouter/:_id', controller.deletepostData)

module.exports = router

