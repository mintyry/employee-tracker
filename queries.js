// require('console.table')
const mysql = require('mysql2');
const db = mysql.createConnection(
    {
        host: 'localhost',
        database: 'manageco',
        user: 'root',
        password: ''
    },
    console.log('Thanks for visiting my database.\nIt\'s nice to finally have some company around here.\nLet\'s get to work, shall we?')
);

function viewAllEmployees() {
    db.query('')
};

function addEmployee() {
    console.log('added e');//replace with dbquery function
};

function updateEmployeeRole() {
    console.log('update e');//replace with dbquery function
};

function viewAllRoles() {
    console.log('roles');//replace with dbquery function
};

function addRole() {
    console.log('added r');//replace with dbquery function
};

function viewAllDepartments() {
    console.log('depts');//replace with dbquery function
};

function addDepartment() {
    console.log('added d');//replace with dbquery function
};

function leave() {
    console.log('Fine, leave me.');
    process.exit();
};


module.exports = { viewAllEmployees, addEmployee, updateEmployeeRole, viewAllRoles, addRole, viewAllDepartments, addDepartment, leave };