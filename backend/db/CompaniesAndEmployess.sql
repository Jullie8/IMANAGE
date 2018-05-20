DROP DATABASE IF EXISTS imanage;
CREATE DATABASE imanage;

\c imanage;

CREATE TABLE company (
    id SERIAL PRIMARY KEY,
    company_name VARCHAR(255),
    company_inviteurl VARCHAR(255)
);

CREATE TABLE worksites (
    id SERIAL PRIMARY KEY,
    street_address VARCHAR (255),
    borough VARCHAR (255),
    zipcode VARCHAR (5)
);

CREATE TABLE contracts (
    id SERIAL PRIMARY KEY,
    company_id INTEGER REFERENCES company(id) ON DELETE CASCADE,
    contract_name VARCHAR (255),
    contract_address INTEGER REFERENCES worksites(id) ON DELETE CASCADE   
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    employed_by INTEGER REFERENCES company(id) ON DELETE CASCADE,
    user_name VARCHAR (200),
    email VARCHAR (60) UNIQUE,
    password_digest VARCHAR (255),
    is_admin BOOLEAN
    --employees are going to be filtered based on the status 
    -- future implementation may hold another row for is_manager yesorno so that managers can also checkin employees
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

CREATE TABLE memberships(
    id SERIAL PRIMARY KEY,
    related_userid INTEGER REFERENCES users(id) ON DELETE CASCADE,
    related_company_id INTEGER REFERENCES company(id) ON DELETE CASCADE,
    related_role INTEGER REFERENCES users(is_admin) ON DELETE CASCADE,
    user_email INTEGER REFERENCES users(email) ON DELETE CASCADE

);

-- ie. psql -f a.sql                    

--associating users to multiple accounts
--in that a company wants to access users account
--membership table holds foreign keys to both users and accounts so that we can both associate any number of users to an account (employees in a company)