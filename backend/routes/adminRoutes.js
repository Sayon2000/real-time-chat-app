const express = require('express')

const router = express.Router()
const auth = require('../middlewares/auth')
const adminControllers = require('../controllers/adminControllers')

router.post('/remove-member/:groupId' , auth , adminControllers.removeMember)

router.post('/make-admin/:groupId' , auth , adminControllers.makeAdmin)

router.post('/remove-admin/:groupId' , auth , adminControllers.remoeAdmin)

module.exports = router;