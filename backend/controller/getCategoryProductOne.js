import productModel from "../models/productModel.js"

const getCategoryProduct = async (req, res) => {
    try {
        const productCategory = await productModel.distinct("category")

        console.log("Category:", productCategory)


        // Array to store 1 product from each category
        const productByCategory = []
        for (const category of productCategory) {
            const product = await productModel.findOne({category})

            if (product) {
                productByCategory.push(product)
            }
        }

        res.status(200).json({
            message: "Category Product",
            data: productByCategory,
            success: true,
            error: false
        })
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

export default getCategoryProduct;