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
        // const result =await User.findMessages(group)        
        return res.json(result)
        console.log(group)
        if (group != null) {
            // const group = groups[0]
            // const msg = await req.user.addMessage()
            const result = await req.user.addGroup(group, {through : {

                message: 'this is message from backend'
            }

            })
            // const result = await Message.create({
            //     userId : req.user.id,
            //     groupId : group.id,
            //     message : message
            // })
            console.log(result)
            return res.json({ success: true, result })
        } else {
            return res.status(403).json({ msg: "You don't have access" })
        }

    } catch (e) {
        console.log(e)
        return res.status(500).json({ success: false, msg: "Internal server error" })
    }

}

exports.getMessages = async (req, res) => {
    try {
        const id = req.body.groupId;
        const group = await Group.findByPk(id)
        const result = await group.getMessages();

        return res.json({ success: true, messages: result, id: req.user.id })
    } catch (e) {
        console.log(e)
        return res.status(500).json({ success: false, msg: "Internal server error" })

    }
}