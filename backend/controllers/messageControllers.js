const { fn , Sequelize , col,Op } = require('sequelize');
const Message = require('../models/Message')
const User = require('../models/User')

exports.addMessage = async (req, res) => {
    try {
        const message = req.body.message;
        const result = await req.user.createMessage({ message: message })
        return res.json({ success: true, message: result })
    } catch (e) {
        console.log(e)
        return res.status(500).json({ success: false, msg: "Internal server error" })
    }

}

exports.getMessages = async (req, res) => {
    try {
        const result = await Message.findAll();
        
        return res.json({success : true , messages : result , id : req.user.id})
    } catch (e) {
        console.log(e)
        return res.status(500).json({ success: false, msg: "Internal server error" })

    }
}