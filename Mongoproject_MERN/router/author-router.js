const express = require ('express')
const router = express.Router()
let controller = require("../controller/author-controller")



router.get('/getrouter', controller.getAuthorData)
router.get('/getonerouter/:id',controller.getOne)
router.post('/addrouter', controller.addauthordetails)
router.put('/updaterouter/:_id', controller.updatauthorDetails)
router.delete('/deleterouter/:_id', controller.deleAuthorData)

module.exports  = router