async function userLogout(req,res){
    try{
        res.clearCookie("token")

        res.json({
            message:"Logged Out Successfully",
            error:false, 
            success:true,
            data :[]
        })
    }catch(err){
        res.status(400).json({
            msg: err.message,
            error: true,
            success: false
        });
    }
}

export default userLogout;