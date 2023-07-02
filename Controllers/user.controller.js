const User =require('../Models/user.model');
const bcrypt = require('bcrypt');
const jwt =require('jsonwebtoken');

const login_User =async (req,res)=>{
    try{
let {Email,Password}=req.body;
let user=await User.findOne({Email:Email});
if(user){
    let verifP=await bcrypt.compare(Password,user.Password);
    if(verifP){
        let token =jwt.sign({user:user.Email},process.env.TOKEN_SECRET,{expiresIn:'24h'});
        res.json({
            success:true,
            result:{
                token:token,
                role:user.role,
                FullName:user.FullName

            }
        })
    }else{
        res.status(400).json({
            success:false,
            message:'password incorrect'
        })
    }
}else{
    res.status(400).json({
        success:false,
        message:'Email incorrect'
    })
}
    }catch(error){
        res.status(500).json({
            success: false,
            result:error.message
        })

    }
}
const add_membre= async(req,res)=>{
    try{
let {Email,Password, }=req.body
let verif=await User.findOne({Email:Email});
console.log(verif);
if(verif){
    res.status(400).json({
       success:false,
       result: "membre existe"
    })

}else{  

    let hash =await bcrypt.hash(Password,10);
    let new_membre =new User({
    Email,Password:hash,role:"membre",
    });
    let result =await new_membre.save();
    res.status(200).json({
        success:true,
        result:result,
    })
}
        }catch(error){
            res.status(500).json({
            success:false,
            result:error.message
        })
        
        }
  

}
const add_office_member= async(req,res)=>{
    try{
let {Email,role }=req.body
let office = await User.findOneAndUpdate({Email:Email},{role:role})
if(office){
    res.status(200).json({
        success:true,
        result:office,
    })
}else{
    res.status(400).json({
        success:false,
        result:office,
    })
}
        }catch(error){
            res.status(500).json({
            success:false,
            result:error.message
        })
        
        }
}
const delete_membre= async( req,res)=>{
    try{
        let { Email } = req.body
        let Delete = await User.findOneAndDelete({Email:Email})
        console.log(Delete);
        if(Delete){
            res.status(200).json({
                success:true,
                result:Delete,
            })
        }else{
            res.status(400).json({
                success:false,
                result:Delete,
            })
        }
    }catch(error){
        res.status(500).json({
            success:false,
            result:error.message
        })
    }

}
module.exports = {
    login_User,add_membre,add_office_member,delete_membre
}