import userModel from "../models/userModel.js"

const uploadProductPermission = async (userId) =>{
    const user = await userModel.findById(userId)

    if (!user) {
        console.error("User not found with the provided userId.");
        return false;
    }
    
    if(user.role!== 'ADMIN'){
        return false
    }
    return true
}

export default uploadProductPermission;