-- used postgresql

CREATE DATABASE gharbikri;

-- connect to the database
-- set extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- users table
CREATE TABLE users (
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name varchar(255) NOT NULL,
    last_name varchar(255),
    user_email varchar(255) UNIQUE,
    password varchar(100) NOT NULL,
    created_at timestamp DEFAULT now(),
    updated_at timestamp DEFAULT now(),
    phone_number varchar NOT NULL
);

-- property table
CREATE TABLE property (
    p_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    p_name varchar(255) NOT NULL,
    p_address_street_num integer NOT NULL,
    p_address_street_name varchar(255),
    p__address_city varchar(255) NOT NULL,
    p_address_state varchar(255) NOT NULL,
    user_id uuid REFERENCES users(user_id),
    image_id integer REFERENCES image(image_id),
    p_description text NOT NULL,
    p_type varchar(255) NOT NULL,
    p_bed integer NOT NULL,
    p_bath integer NOT NULL,
    p_area_sq_ft integer NOT NULL,
    p_repair_quality varchar(255) NOT NULL,
    p_year integer NOT NULL,
    p_price numeric NOT NULL,
    p_listingType varchar(255) NOT NULL,
    availability_status boolean NOT NULL,
    created_at timestamp DEFAULT now(),
    updated_at timestamp DEFAULT now()
);

-- image table
CREATE TABLE image (
    image_id integer PRIMARY KEY,
    frontal varchar(255) NOT NULL,
    bath varchar(255) NOT NULL,
    kitchen varchar(255) NOT NULL,
    living varchar(255) NOT NULL
);
