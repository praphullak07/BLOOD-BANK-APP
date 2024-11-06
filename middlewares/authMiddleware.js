const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
    try {
        // Check if token exists
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            return res.status(401).send({
                success: false,
                msg: 'No token provided, authentication failed'
            });
        }

        const token = authHeader.split(' ')[1];
        JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                return res.status(401).send({
                    success: false,
                    msg: 'Authentication failed',
                });
            } else {
                // Set both userId for creating inventory and req.user for getting inventory in a single step
                req.body.userId = decode.userId; 
                req.user = { _id: decode.userId };
    
                next(); // Call next() once after both assignments
            
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(401).send({
            success: false,
            error,
            msg: 'Authentication failed'
        });
    }
};
