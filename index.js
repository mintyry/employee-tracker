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

            } else if (data.menu === 'Update employee role') {
                updateEmployeeRole();

            } else if (data.menu === 'View all roles') {
                viewAllRoles();

            } else if (data.menu === 'Add role') {
                addRole();

            } else if (data.menu === 'View all departments') {
                viewAllDepartments();

            } else if (data.menu === 'Add department') {
                addDepartment();

            } else {
                leave();
            }
        });
};



function viewAllEmployees() {
    db.query('SELECT * FROM employees', (err, data) => {
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
    //prints all content from roles table
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
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'addR',
                message: 'What is the name of this new role?'
            },
            {
                type: 'input',
                name: 'addRS',
                message: 'What is the salary of this role?'
            },
            {
                type: 'list',
                name: 'addRD',
                message: 'To which department does this role belong?',
                choices: ['hi']
            }
        ])
        .then(function (data) {
            const role = data.addR;
            const userRole = role.charAt(0).toUpperCase() + (role).slice(1)
            db.query(
                'INSERT INTO roles (title) VALUES (?)',
                [userRole],
                (err, data) => {
                    if (err) {
                        console.log('Ain\'t happenin\' today.')
                    } else {
                        console.log('Role title added.')
                    }
                }
            );
            const roleSalary = data.addRS;
            db.query(
                'UPDATE roles SET salary = (?) WHERE title = (?)',
                [roleSalary, userRole],
                (err, data) => {
                    if (err) {
                        console.log('Ain\'t happenin\' today.');
                    } else {
                        console.log('Role salary added.');
                        manageCoMenu();
                    }
                }
            );
            const dept = data.addRD;
            const roleDept = [dept.charAt(0).toUpperCase() + (dept).slice(1)]
            db.query(
                'UPDATE roles SET department_id = (?) WHERE title = (?)',
                [roleDept, userRole],
                (err, data) => {
                    if (err) {
                        console.log('Ain\'t happenin\' today.')
                    } else {
                        console.log('Role title added.')
                    }
                }
            );
        })
};

function viewAllDepartments() {
    //prints all content from departments table
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

    inquirer
        .prompt([{
            type: 'input',
            name: 'addD',
            message: 'What is the name of this department?'
        }])
        .then(function (data) {
            //makes user's input lowercase, first parameter of this query is SQL prepared statement;allowing uppercase for acronyms
            const userDept = data.addD;
            //adds user's input into the table; also capitalizes first letter of their entry.
            db.query('INSERT INTO departments (name) VALUES (?)',
                //second parameter is the data we write; in this case, it is userDept
                [userDept.charAt(0).toUpperCase() + (userDept).slice(1)],
                //third parameter is callback fn
                (err, data) => {
                    if (err) {
                        console.log('Ain\'t happenin\' today.')
                    } else {
                        manageCoMenu();
                    }

                })
        })
    // console.log(`I want to add ${data.addD}`)

    //
};

function leave() {
    console.log('Fine, leave me.');
    process.exit();
};

manageCoMenu();