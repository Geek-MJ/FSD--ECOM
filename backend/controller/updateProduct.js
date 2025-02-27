import uploadProductPermission from "../helpers/permission.js";
import productModel from "../models/productModel.js";

async function updateProductController(req,res){
    try{

        if(!uploadProductPermission(req.userId)){
            throw new Error("Permission Denied!")
        }

        const { _id, ...updateFields } = req.body;
        const updateProduct = await productModel.findByIdAndUpdate(_id,updateFields,{ new: true })

       res.json({
        message: "Product Updated Successfully",
        data :updateProduct,
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


export default updateProductController;