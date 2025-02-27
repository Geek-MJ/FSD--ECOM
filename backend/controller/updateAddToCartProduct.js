import addToCartModel from "../models/cartProduct.js"

const updateAddToCartProduct = async (req, res) => {
    try {
        const currentUserId = req?.userId
        const addToCartProductId = req.body?._id
        const qty = req.body.quantity

        const upadateProduct = await addToCartModel.updateOne({_id: addToCartProductId},{
            ...(qty && {quantity : qty})
        })

        res.json({
            message: "Product Updated!",
            success: true,
            error: false,
            data : upadateProduct
        })
    } catch (err) {
        res.json({
            message: err.message || err,
            success: false,
            error: true
        })
    }
}

export default updateAddToCartProduct;