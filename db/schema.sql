-- when this runs, it will first delete databases of this name
DROP DATABASE IF EXISTS manageco;
-- creates database from scratch
CREATE DATABASE manageco;
-- uses this database
USE manageco;

CREATE TABLE departments (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    name VARCHAR(30)
);

CREATE TABLE roles (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    -- deleting a role will leave it as null in related tables
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL
);

CREATE TABLE employees(
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    -- if you delete an employee, all related info is also deleted
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
);