const User = require('../models/User')

const bcrpt = require('bcrypt')
const {Op} = require('sequelize')


exports.createUser = async(req,res)=>{
    try{
        const {name , email ,phone, password} = req.body;

        let user =await User.findOne({
            where :  {
                [Op.or] : [
                    {email : email},
                    {phone : phone}

                ]
                }
        })
        if(user){
            return res.status(403).json({success : false , msg : "User already exists"})
        }

        const hash = await bcrpt.hash(password , 10)
        user = await User.create({
            name : name,email : email , password : hash ,phone
        })
        return res.json({success : true , msg : "User created successfully"})
    }catch(e){
        console.log(e)
        return res.status(500).json({success : false , msg : "Internal server error"})
    }
}