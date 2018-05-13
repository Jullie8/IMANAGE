DROP DATABASE IF EXISTS imanage;
CREATE DATABASE imanage;

\c imanage;

CREATE TABLE company (
    id SERIAL PRIMARY KEY,
    company_name VARCHAR(255)
);

CREATE TABLE worksites (
    id SERIAL PRIMARY KEY,
    address VARCHAR (255)
);


CREATE TABLE contracts (
    id SERIAL PRIMARY KEY,
    company_id INTEGER REFERENCES company(id) ON DELETE CASCADE,
    contract_name VARCHAR (255),
    site_id INTEGER REFERENCES worksites(id)     
);




CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    company_id INTEGER REFERENCES company(id) ON DELETE CASCADE,
    full_name VARCHAR (200),
    email VARCHAR (60) UNIQUE,
    password_digest VARCHAR (255),
    is_admin BOOLEAN 
    -- On Delete Cascade: when data is removed from a parent table, automatically data deleted from child table (foreign key table).
    --UNIQUE constraint, every time you insert a new row, PostgreSQL checks if value is already in the table. If new value is already there, gives back an error message and reject the changes.
);

CREATE TABLE shifts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    site_id INTEGER REFERENCES worksites(id),
    clock_in TIMESTAMP,
    clock_out TIMESTAMP
    --remember that clock needs to be updated from null 
    --but also needs to save all clock out for the week 
);


INSERT INTO company (id,company_name)
    VALUES (1,'Edward Classic');


-- ie. psql -f a.sql