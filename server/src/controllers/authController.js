const db = require('../db')
const bcrypt = require('bcrypt')
const jwtGenerator = require('../utils/jwtGenerator')

// method to get all the users in db
exports.getUsers = async (req, res) => {
    try {
        const { rows } = await db.query(`SELECT 
        first_name, 
        last_name, 
        user_email, 
        phone_number, 
        address_city, 
        address_state,
        property_count,
        created_at,
        updated_at
        FROM users`);
        // res.send(rows);
        return res.status(200).json({
            success: true,
            users: rows
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// register controller
exports.register = async (req, res) => {
    // desctructure the req.body
    const {
        first_name,
        last_name,
        user_email,
        password,
        phone_number,
        address_city,
        address_state
    } = req.body;
    try {
        // check if user exists (if user exists then throw error)
        // done by validator in '../validators/authValidation.js'

        // Bcrypt to hash the password
        const saltRound = 10; //saltRound is the number of rounds to generate a salt
        const salt = await bcrypt.genSaltSync(saltRound); // generate the salt with the number of rounds specified

        const bcryptPassword = await bcrypt.hash(password, salt); // hash the password

        if (!bcryptPassword) {
            return res.status(401).json({
                success: false,
                message: 'Error hashing password',
            })
        }

        // Enter the new user inside our db
        const newUser = await db.query(`INSERT INTO users (
            first_name, 
            last_name, 
            user_email, 
            password, 
            created_at, 
            updated_at, 
            phone_number, 
            address_city, 
            address_state,
            property_count
            ) VALUES (
                $1, $2, $3, $4, NOW(), NOW(), $5, $6, $7, 0
            )
            RETURNING *`,
            [
                first_name,
                last_name,
                user_email,
                bcryptPassword,
                phone_number,
                address_city,
                address_state
            ]);

        // generate jwt token
        const token = jwtGenerator(newUser.rows[0].user_id);
        res.json({ token });

    } catch (error) {
        // console.log(error.message);
        return res.status(401).json({
            success: false,
            message: error.message, // error.message is the error message from the validator
        })
    }
}

// login controller
exports.login = async (req, res) => {
    try {
        // destructure the req.body
        const { user_email, password } = req.body;

        // console.log(user_email, password)

        // check if user doesn't exist, if not then throw error
        const user = await db.query("SELECT * FROM users WHERE user_email = $1", [user_email]);

        if (user.rows.length === 0) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials',
            })
        }

        // if exists, check if the password is correct, decrypt the password
        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        // console.log(validPassword);

        if (!validPassword) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials',
            })
        }

        // give them the jwt token
        const token = jwtGenerator(user.rows[0].user_id);
        res.json({ token });

        // for cookie based authentication
        // return res.status(200).cookie('token', token, { httpOnly: true }).json({
        //     success: true,
        //     message: 'Logged in successfully',
        // })

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

exports.isVerify = async (req, res) => {
    try {
        res.json(true);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// logout token based authentication
exports.logout = async (req, res) => {
    try {
        res.clearCookie('token').json({
            success: true,
            message: 'Logged out successfully',
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}