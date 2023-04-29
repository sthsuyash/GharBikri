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
    phone_number varchar NOT NULL,
    address_city varchar NOT NULL,
    address_state varchar NOT NULL,
    property_count integer NOT NULL
);

-- property table
CREATE TABLE property (
    p_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    p_name varchar(255) NOT NULL,
    p_address_street_num integer NOT NULL,
    p_address_street_name varchar(255),
    p_address_city varchar(255) NOT NULL,
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
    p_availability_status boolean NOT NULL,
    created_at timestamp DEFAULT now(),
    updated_at timestamp DEFAULT now(),
    p_count integer NOT NULL 
);

-- image table
CREATE TABLE image (
    image_id integer PRIMARY KEY,
    frontal varchar(255) NOT NULL,
    bath varchar(255) NOT NULL,
    kitchen varchar(255) NOT NULL,
    living varchar(255) NOT NULL
);

-- Trigger function to update user property count
CREATE OR REPLACE FUNCTION update_user_property_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE users SET property_count = property_count + 1 WHERE user_id = NEW.user_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE users SET property_count = property_count - 1 WHERE user_id = OLD.user_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to increment user property count on property insert
CREATE TRIGGER increment_user_property_count
AFTER INSERT ON property
FOR EACH ROW
EXECUTE FUNCTION update_user_property_count();

-- Trigger to decrement user property count on property delete
CREATE TRIGGER decrement_user_property_count
AFTER DELETE ON property
FOR EACH ROW
EXECUTE FUNCTION update_user_property_count();
