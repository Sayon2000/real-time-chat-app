const { fn, Sequelize, col, Op } = require('sequelize');
const Message = require('../models/Message')
const User = require('../models/User');
const Group = require('../models/Group');
const Member = require('../models/Member');

exports.addMessage = async (req, res) => {
    try {
        const groupId = req.body.groupId;
        const memberId = req.body.memberId;
        const message = req.body.message;
        const member = await Member.findOne({groupId , id : memberId})
        const result = await member.createMessage({message , groupId})
        return res.json(result)
        

    } catch (e) {
        console.log(e)
        return res.status(500).json({ success: false, msg: "Internal server error" })
    }

}

exports.getMessages = async (req, res) => {
    try {
        const id = req.body.groupId;
        const group = await Group.findByPk(id)
        const member = await req.user.getGroups({where : {id }})
        if(member.length == 0 ){
            return res.status(401).json({msg :"unauthorized access"})
        }
        // return res.json(member)
        const result = await group.getMessages();

        return res.json({ success: true, messages: result, id: req.user.id })
    } catch (e) {
        console.log(e)
        return res.status(500).json({ success: false, msg: "Internal server error" })

    }
}