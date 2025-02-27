import userModel from '../models/userModel.js';
import bcrypt from 'bcryptjs';


async function userSignupController(req, res) {
    try {
        const { email, password, name } = req.body;
        const user = await userModel.findOne({email})

        if(user){
            throw new Error("Already User Exists")
        }

        if (!email) {
            throw new Error("Please Provide Email");
        }
        if (!password) {
            throw new Error("Please Provide Password");
        }
        if (!name) {
            throw new Error("Please Provide Name");
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10); // Use async method
        const hashPassword = await bcrypt.hash(password, salt); // Use async method

        if (!hashPassword) {
            throw new Error("Something went wrong with password hashing");
        }

        // Prepare payload for the new user
        const payload = {
            ...req.body,
            role : "GENERAL",
            password: hashPassword
        };

        // Create new user instance and save it to the database
        const userData = new userModel(payload);
        const saveUser = await userData.save(); // Await the save operation

        // Send response back
        res.status(201).json({
            data: saveUser,
            success: true,
            error: false,
            msg: "User Created Successfully"
        });
    } catch (err) {
        res.status(400).json({
            msg:  err.message, // Return only the error message
            error: true,
            success: false
        });
    }
}

export default userSignupController;
