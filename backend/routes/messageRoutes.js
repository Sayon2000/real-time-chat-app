const express = require('express')

const router = express.Router()

const auth = require('../middlewares/auth')
const messageControllers = require('../controllers/messageControllers')


router.post('/add-message' , auth , messageControllers.addMessage)

module.exports = router;