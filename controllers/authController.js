const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const registerController = async (req, res) => {
    try {
        // Check if the user already exists by email
        const existingUser = await userModel.findOne({ email: req.body.email });
        if (existingUser) {
            console.log("User already exists");
            return res.status(400).send({
                success: false,
                msg: 'User already exists'
            });
        }

        // Hash the password using bcrypt
        const salt = await bcrypt.genSalt(10);
        const hashedPW = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPW;

        // Create a new user with the hashed password
        const user = new userModel(req.body);

        // Attempt to save the user, catch any validation errors
        try {
            await user.save();
            console.log("User registered successfully");
            return res.status(201).send({
                success: true,
                msg: 'User registered successfully',
                user
            });
        } catch (saveError) {
            console.log("Error in saving user:", saveError.message);
            return res.status(400).send({
                success: false,
                msg: "Error in saving user. Please check required fields and role-based data.",
                error: saveError.message // Send the validation error message
            });
        }

    } catch (error) {
        console.log("Unexpected error during registration:", error.message);
        return res.status(500).send({
            success: false,
            msg: 'Error in registering user',
            error: error.message
        });
    }
};


// Login callback
const loginController = async (req, res) => {
    try {
        const existingUser = await userModel.findOne({ email: req.body.email });
        if (!existingUser) {
            return res.status(400).send({
                success: false,
                msg: 'Invalid credentials'
            });
        }

        // Check role 
        if (existingUser.role !== req.body.role) {
            return res.status(500).send({
                success: false,
                msg: `Role doesn't match`
            });
        }

        // Compare password
        const comparePW = await bcrypt.compare(req.body.password, existingUser.password);
        if (!comparePW) {
            return res.status(400).send({
                success: false,
                msg: 'Invalid credentials'
            });
        }

        const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '20d' });
        return res.status(200).send({
            success: true,
            msg: 'Logged in successfully',
            token,
            existingUser
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            msg: 'Error in login',
            error
        });
    }
}

// Get current user
const currUserController = async (req, res) => {
    try {
        // Assuming the user ID is in the JWT payload
        const user = await userModel.findById(req.body.userId); // Use req.user set by the middleware
        return res.status(200).send({
            success: true,
            msg: 'User fetched successfully',
            user
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            msg: 'Unable to get current user',
            error
        });
    }
}

module.exports = { registerController, loginController, currUserController };
