const express = require("express");
const { registerController, loginController, currUserController } = require("../controllers/authController"); // Destructure to get the function
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// registration
router.post('/register', registerController);

//Login 
router.post('/login',loginController);

 //get currentuser
 router.get('/current-user',authMiddleware, currUserController);

module.exports = router;
