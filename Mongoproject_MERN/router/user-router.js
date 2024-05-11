const express = require('express') // importing express
const router = express.Router()    // making express object router

//const catController = require('../controller/category-controller')
const userController = require('../controller/user-controller')
// const validation = require('../helper/Validation')
const auth = require("../helper/authorization");

// const { validation } = require('joi')
router.get('/getuserdata',auth.verifyToken,userController.getuser)

router.post('/login',userController.loginUser)

router.post('/postuserdata',userController.adduserdata)

router.put('/putuserdata/:cid',userController.updateuser)

router.delete('/deleteuserdata/:cid',userController.deleteuser)

module.exports = router;