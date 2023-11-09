const inquirer = require('inquirer');
const fs = require('fs');
const { viewAllEmployees, addEmployee, updateEmployeeRole, viewAllRoles, addRole, viewAllDepartments, addDepartment, leave } = require('./queries.js')
// const mysql = require('mysql2');
// const db = mysql.createConnection(
//     {
//         host: 'localhost',
//         database: 'manageco',
//         user: 'root',
//         password: ''
//     },
//     console.log('Thanks for visiting my database.\nIt\'s nice to finally have some company around here.\nLet\'s get to work, shall we?')
// );

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
                manageCoMenu();
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

manageCoMenu();