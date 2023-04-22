const db = require("../db");

exports.getRent = async (req, res) => {
    try{
        const user = await db.query("SELECT user_id, username, user_email FROM users WHERE user_id = $1", [req.user]);
        // your rent logic goes here
         res.status(200).json({
            success: true,
            message: 'Rent successful',
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}