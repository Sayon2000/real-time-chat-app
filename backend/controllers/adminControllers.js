const Group = require('../models/Group');
const Member = require('../models/Member');



exports.removeMember = async(req,res)=>{
    try{
        const groups = await req.user.getGroups({where : {id : req.params.groupId}})
        const member = groups[0].member

        const groupId = req.params.groupId;
        const userId = req.body.userId;
        if(member.admin){

        
        const members = await groups[0].getUsers({
            where :{
               id : userId
            }
        })
        if(members.length == 1)
        {
            const user = members[0].member
            if(user.creator){
                return res.status(403).json({msg:"You don't have permission"})
            }else{

                await user.destroy()
                return res.json({success : true , msg:"User removed"})
            }
        }else{
            return res.status(404).json({msg:"User does not exist"})
        }    
        
    }else{
        return res.status(403).json({msg:"You don't have permission"})
    }
    }catch(e){
        console.log(e)
        return res.status(500).json({success : false , msg :"Internal server error"})
    }
}

exports.makeAdmin = async(req,res)=>{
changeAdmin(true ,req,res)
}

exports.remoeAdmin = async(req,res)=>{
changeAdmin(false , req,res)
}

async function changeAdmin(value , req,res){
    try{
        const groups = await req.user.getGroups({where : {id : req.params.groupId}})
        const member = groups[0].member

        const groupId = req.params.groupId;
        const userId = req.body.userId;
        if(member.admin){

        
        const members = await groups[0].getUsers({
            where :{
               id : userId
            }
        })
        if(members.length == 1)
        {
            const user = members[0].member
            

                user.admin = value
                await user.save()
                let msg;
                if(value)
                    msg ="User promoted to admin"
                else
                    msg ="Admin status removed from user"
                return res.json({success : true , msg})
            
        }else{
            return res.status(404).json({msg:"User does not exist"})
        }    
        
    }else{
        return res.status(403).json({msg:"You don't have permission"})
    }
    }catch(e){
        console.log(e)
        return res.status(500).json({success : false , msg :"Internal server error"})
    }
}