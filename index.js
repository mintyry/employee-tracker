const inquirer = require('inquirer');
const fs = require('fs');
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
                console.log('employees');//replace with dbquery function
                manageCoMenu();
            } else if (data.menu === 'Add employee') {
                console.log('added e');//replace with dbquery function
                manageCoMenu();
            } else if (data.menu === 'Update employee role') {
                console.log('updated e');//replace with dbquery function
                manageCoMenu();
            } else if (data.menu === 'View all roles') {
                console.log('roles');//replace with dbquery function
                manageCoMenu();
            } else if (data.menu === 'Add role') {
                console.log('added r');//replace with dbquery function
                manageCoMenu();
            } else if (data.menu === 'View all departments') {
                console.log('depts');//replace with dbquery function
                manageCoMenu();
            } else if (data.menu === 'Add department') {
                console.log('added d');//replace with dbquery function
                manageCoMenu();
            } else {
                console.log('Fine, leave me.');
                process.exit();
            }
           
        });
};

manageCoMenu();