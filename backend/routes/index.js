import express from 'express'
const router = express.Router()


import userSignupController from '../controller/userSignup.js'
import userSignInController from '../controller/userSignin.js'
import userDetailsController from '../controller/userDetails.js'
import authToken from '../middleware/authToken.js' 
import userLogout from '../controller/userLogout.js'
import allUsers from '../controller/allUsers.js'
import updateUser from '../controller/updateUser.js'
import UploadProductController from '../controller/uploadProduct.js'
import getProductController from '../controller/getProduct.js'
import updateProductController from '../controller/updateProduct.js'
import getCategoryProduct from '../controller/getCategoryProductOne.js'
import getCategoryWiseProduct from '../controller/getCategoryWiseProduct.js'
import getProductDetails from '../controller/getProductDetails.js'
import addToCartController from '../controller/addToCartController.js'
import countAddToCartProduct from '../controller/countAddToCartProduct.js'
import addToCartView from '../controller/addToCartView.js'
import updateAddToCartProduct from '../controller/updateAddToCartProduct.js'
import deleteAddToCartProduct from '../controller/deleteAddToCartProduct.js'
import searchProduct from '../controller/searchProduct.js'
import filterProductController from '../controller/filterProduct.js'



router.post("/signup",userSignupController)
router.post("/signin",userSignInController)
router.get("/user-details",authToken,userDetailsController)
router.get("/userLogout",userLogout)

// admin panel 
router.get('/all-user',authToken,allUsers)
router.post('/update-user',authToken,updateUser)


//  product
router.post("/upload-product",authToken,UploadProductController)

router.get("/get-product",getProductController)
router.post("/update-product",authToken,updateProductController)

router.get("/get-categoryProduct",getCategoryProduct)
router.post("/category-product",getCategoryWiseProduct)
router.post("/product-details",getProductDetails)
router.get("/search",searchProduct)
router.post("/filter-product",filterProductController)

// User Add to cart
router.post("/addtocart",authToken,addToCartController)
router.get("/countAddToCartProduct",authToken,countAddToCartProduct)
router.get("/view-cart-product",authToken,addToCartView)
router.post("/update-cart-product",authToken,updateAddToCartProduct)
router.post("/delete-cart-product",authToken,deleteAddToCartProduct)





export default router