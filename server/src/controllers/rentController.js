const db = require("../db");

exports.getRent = async (req, res) => {
    try{
        const user = await db.query("SELECT user_id, username, user_email FROM users WHERE user_id = 'e8cff7c5-b774-4d69-89d9-0d88dd32dc40'");
        // your rent logic goes here
         res.status(200).json({
            success: true,
            message: 'Rent successful',
            user: user
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}