const inquirer = require('inquirer');
require('console.table');
// const { viewAllEmployees, addEmployee, updateEmployeeRole, viewAllRoles, addRole, viewAllDepartments, addDepartment, leave } = require('./queries.js')

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

const questions = [
    //initial menu question
    {
        type: 'list',
        name: 'menu',
        message: 'What would you like to do?',
        choices: [
            'View all employees',
            'Add employee',
            'Update employee role',
            'View all roles',
            'Add role',
            'View all departments',
            'Add department',
            'Log out'
        ]
    }
]

function manageCoMenu() {
    inquirer
        .prompt(questions)
        .then(function (data) {
            if (data.menu === 'View all employees') {
                viewAllEmployees();
            } else if (data.menu === 'Add employee') {
                addEmployee();
                manageCoMenu();
            } else if (data.menu === 'Update employee role') {
                updateEmployeeRole();
                manageCoMenu();
            } else if (data.menu === 'View all roles') {
                viewAllRoles();
                manageCoMenu();
            } else if (data.menu === 'Add role') {
                addRole();
                manageCoMenu();
            } else if (data.menu === 'View all departments') {
                viewAllDepartments();
                manageCoMenu();
            } else if (data.menu === 'Add department') {
                addDepartment();
                manageCoMenu();
            } else {
                leave();
            }
        });
};



function viewAllEmployees() {
    db.query('SELECT * FROM departments', (err, data) => {
        if (err) {
            console.log('Ain\'t happenin\' today.')
        } else {
            console.table(data);
            manageCoMenu();
        }

    })
};

function addEmployee() {
    db.query('SELECT * FROM departments', (err, data) => {
        if (err) {
            console.log('Ain\'t happenin\' today.')
        } else {
            console.table(data);
            manageCoMenu();
        }

    })
};

function updateEmployeeRole() {
    db.query('SELECT * FROM departments', (err, data) => {
        if (err) {
            console.log('Ain\'t happenin\' today.')
        } else {
            console.table(data);
            manageCoMenu();
        }

    })
};

function viewAllRoles() {
    db.query('SELECT * FROM roles', (err, data) => {
        if (err) {
            console.log('Ain\'t happenin\' today.')
        } else {
            console.table(data);
            manageCoMenu();
        }

    })
};

function addRole() {
    db.query('SELECT * FROM departments', (err, data) => {
        if (err) {
            console.log('Ain\'t happenin\' today.')
        } else {
            console.table(data);
            manageCoMenu();
        }

    })
};

function viewAllDepartments() {
    db.query('SELECT * FROM departments', (err, data) => {
        if (err) {
            console.log('Ain\'t happenin\' today.')
        } else {
            console.table(data);
            manageCoMenu();
        }

    })
};

function addDepartment() {
    db.query('SELECT * FROM departments', (err, data) => {
        if (err) {
            console.log('Ain\'t happenin\' today.')
        } else {
            console.table(data);
            manageCoMenu();
        }

    })
};

function leave() {
    console.log('Fine, leave me.');
    process.exit();
};

manageCoMenu();