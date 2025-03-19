const express = require("express");
const { login, signup, editProfile, getProfile, forgotPassword, resetPassword,getallproduct } = require("../controllers/usercontroller");
const { registerValidation, loginValidation } = require("../middlewares/validation");
const authMiddleware = require("../middlewares/authmiddleware");
const {getAllUsers,deleteUser} = require("../controllers/usercontroller");
const router = express.Router();

// ✅ Authentication routes
router.post("/login", loginValidation, login);
router.post("/signup", registerValidation, signup);

router.post("/forgotpass",forgotPassword)
router.post("/resetpass/:token",resetPassword)   ;




// ✅ User profile routes
router.get("/profile", authMiddleware, getProfile);
router.put("/profile/update", authMiddleware, editProfile);

//admin user details
router.get("/",authMiddleware,getAllUsers)
router.delete("/:id",authMiddleware,deleteUser)

// product view and order
router.get("/product",getallproduct)


module.exports = router;
