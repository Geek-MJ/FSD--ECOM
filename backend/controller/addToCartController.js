import addToCartModel from "../models/cartProduct.js"

const addToCartController = async (req,res) =>{
    try{
        const { productId } = req?.body
        const currentUser = req?.userId

        const isProductAvaialable = await addToCartModel.findOne({ productId })


        console.log("cart",isProductAvaialable)

        if(isProductAvaialable){
            return res.json({
                message : "Product Already Exists in the cart",
                success : false,
                error: true

            })
        }
        const payload = {
            productId : productId,
           quantity : 1,
           userId : currentUser,
        }
          

        const newAddToCart = await addToCartModel(payload)
        const saveProduct = await newAddToCart.save()

        res.json({
            data : saveProduct,
            message : "Product Added in the cart ",
            success :true,
            error : false

        })
    }catch(err){
        res.json({
            message :err?.message || err,
            error : true,
            success: false
        })
    }
}

export default addToCartController;