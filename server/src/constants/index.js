const { config } = require('dotenv')
config();  // load .env file into process.env object

exports.DB = {
    DB_PORT: process.env.DB_PORT,
    DB_NAME: process.env.DB_NAME,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_HOST: process.env.DB_HOST,
}

exports.SERVER = {
    SERVER_PORT: process.env.SERVER_PORT || 3000
}

exports.JWT = {
    JWT_SECRET: process.env.JWT_SECRET
}