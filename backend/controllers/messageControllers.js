const Message = require('../models/Message')

exports.addMessage = async(req,res)=>{
    try{
        const message  =req.body.message;
        const result = await req.user.createMessage({message : message})
        return res.json({success : true , message : result})
    }catch(e){
        console.log(e)
        return res.status(500).json({success : false , msg : "Internal server error"})
    }

}