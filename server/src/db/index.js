const { Pool } = require('pg');
const { DB } = require('../constants');

const pool = new Pool({
    user: DB.DB_USER,
    host: DB.DB_HOST,
    database: DB.DB_NAME,
    password: DB.DB_PASSWORD,
    port: DB.DB_PORT,
});

module.exports = {
    query: (text, params) => pool.query(text, params),
}