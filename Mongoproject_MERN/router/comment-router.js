
const express = require('express')
const router=express.Router()
const controller = require('../controller/comment-controller')

router.get('/getcomment',controller.getComment)
router.post('/addrouter',controller.addComment)
router.put('/updaterouter/:_id',controller.updateComment)
router.delete('/deleterouter/:_id',controller.deleteComment)

module.exports = router