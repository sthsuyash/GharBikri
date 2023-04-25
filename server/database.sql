CREATE DATABASE gharbikri;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- set extension
CREATE TABLE users (
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name VARCHAR(255) UNIQUE NOT NULL,
    last_name VARCHAR(255) UNIQUE NOT NULL,
    user_email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL
);