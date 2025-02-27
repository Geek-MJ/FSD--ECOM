import userModel from "../models/userModel.js";

async function allUsers(req,res){
    try{
        console.log("userID All users",req.userId)
        
        const allUsers = await userModel.find()

        res.json({
            message: "All Users",
            data :allUsers,
            success:true,
            error:false
        })
    }catch(err){
        res.status(400).json({
            msg:  err.message || err,
            error: true,
            success: false
        });
    }
}

export default allUsers;