const jwt = require('jsonwebtoken'); // import the jwt module
const { JWT } = require('../constants'); // import the jwt secret

// export the middleware function
module.exports = async (req, res, next) => { // this is the middleware function that will be used in the routes to protect the routes
    try {
        const jwtToken = req.header("token"); // get the token from the header

        if (!jwtToken) {
            return res.status(403).json({
                success: false,
                message: "Not authorized"
            })
        }

        const payload = jwt.verify(jwtToken, JWT.JWT_SECRET); // verify the token

        req.user = payload.user; // set the user in the request object

    } catch (error) {
        return res.status(403).json({
            success: false,
            message: "Not authorized"
        })
    }
    next(); // call the next middleware function
}