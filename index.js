//requiring inquirer module and console.table to ask questions and show table
const inquirer = require('inquirer');
require('console.table');
//requiring mysql and establishing connection to js via db variable
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

//initial question and choices for the main menu
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
            'Update employee\'s manager',
            'View all roles',
            'Add role',
            'View all departments',
            'Add department',
            'View budget by department',
            'Log out'
        ]
    }
];

//initial choices; calling functions depending what choice is made
function menu() {
    inquirer
        .prompt(questions)
        .then(function (data) {
            if (data.menu === 'View all employees') {
                viewAllEmployees();
            } else if (data.menu === 'Add employee') {
                addEmployee();
            } else if (data.menu === 'Update employee role') {
                updateEmployeeRole();
            } else if (data.menu === 'Update employee\'s manager') {
                updateEmployeeMgr();
            } else if (data.menu === 'View all roles') {
                viewAllRoles();
            } else if (data.menu === 'Add role') {
                addRole();
            } else if (data.menu === 'View all departments') {
                viewAllDepartments();
            } else if (data.menu === 'Add department') {
                addDepartment();
            } else if (data.menu === 'View budget by department') {
                viewDeptBudget();
            } else {
                leave();
            }
        });
};

//views all employees table
function viewAllEmployees() {

    //prints specific columns in order to have a master employee table that shows data from roles and departments as well
    db.query(
        'SELECT employees.id, employees.first_name, employees.last_name, roles.title, roles.salary, departments.name AS department, CONCAT(manage_table.first_name, " ",  manage_table.last_name) AS manager FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id LEFT JOIN employees AS manage_table  ON employees.manager_id = manage_table.id',
        (err, data) => {
            if (err) {
                console.log('ERROR: Viewing all employees.')
            } else {
                console.table(data);
                //presents main menu question and choices after printing table
                empMenu();
                // menu(); might want to call this here
            }//ends the else in the cb fn
        })//ends dbquery
};

//presents a sub menu once inside the View All Employees section
function empMenu() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'empTable',
            message: 'Anything else?',
            choices: [
                'View employees by department',
                'View employees by manager',
                'Delete employee',
                'View all employees',
                'Back to main menu'
            ]
        }
    ]) //ends prompt
        .then(function empTableMenu(userChoice) {
            if (userChoice.empTable === 'View employees by department') {
                console.log('Viewing by dept.');
                sortEmpByDept();
            } else if (userChoice.empTable === 'View employees by manager') {
                console.log('Viewing by manager.');
                sortEmpByMgr();
            } else if (userChoice.empTable === 'Delete employee') {
                console.log('Deleting employee.');
                deleteEmployee();
            } else if (userChoice.empTable === 'View all employees') {
                viewAllEmployees();
            } else {
                //if they dont choose either of the above options, it will being back to main menu
                menu();
            }
            //sorts employees by department
            function sortEmpByDept() {
                db.query(
                    'SELECT departments.id, departments.name AS department, employees.id AS employee_id, employees.first_name, employees.last_name, roles.title, roles.salary, CONCAT(manage_table.first_name, " ",  manage_table.last_name) AS manager FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id LEFT JOIN employees AS manage_table  ON employees.manager_id = manage_table.id ORDER BY department',
                    (err, data) => {
                        if (err) {
                            console.log('Uh-oh, managers are not showing.')
                        } else {
                            console.table(data);
                            empMenu();
                        }
                    }
                )
            };//ends sortbyempdept fn

             //sorts employees by their manager
            function sortEmpByMgr() {
                db.query(
                    'SELECT employees.manager_id AS id, CONCAT(manage_table.first_name, " ",  manage_table.last_name) AS manager, employees.id AS employee_id, employees.first_name, employees.last_name, roles.title, roles.salary, departments.name AS department FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id LEFT JOIN employees AS manage_table  ON employees.manager_id = manage_table.id ORDER BY id',
                    (err, data) => {
                        if (err) {
                            console.log('Uh-oh, managers are not showing.')
                        } else {
                            console.table(data);
                            empMenu();
                        }
                    }
                )
            };//ends sortbyempmanager fn

            //delete employee function
            function deleteEmployee() {
                //makes dynamic list of employees, so if user adds an employee, they can now delete them too
                const empList = [];
                db.query('SELECT CONCAT(employees.first_name, " ", employees.last_name) AS fullName FROM employees',
                    (err, data) => {
                        if (err) {
                            console.log('Uh-oh, roles are not showing.')
                        } else {
                            data.forEach((empChoice) => {
                                empList.push(empChoice.fullName);
                            });
                            //adding option to go back to main menu
                            empList.push('Back to main menu');
                            inquirer
                                .prompt([
                                    {
                                        type: 'list',
                                        name: 'deleteEmp',
                                        message: 'Which employee would you like to delete?',
                                        choices: empList
                                    }
                                ])
                                .then(function (data) {
                                    //if user is at delete selection page and realizes they don't want to delete anyone, they can choose to go back to the main menu instead.
                                    if (data.deleteEmp === 'Back to main menu') {
                                        menu();
                                    } else {
                                        db.query(
                                            //deletes from employees table where first and last name combined matches the name the user selected
                                            'DELETE FROM employees WHERE CONCAT(first_name, " ", last_name) = (?)',
                                            [data.deleteEmp],
                                            (err, data) => {
                                                if (err) {
                                                    console.log('Could not delete employee.');
                                                } else {
                                                    console.log('Future endeavor\'d.');
                                                    empMenu();
                                                }
                                            }
                                        );//ends dbquery to delete role
                                    };//ends else
                                })
                        }//ends deleteEmployee fn
                    })//ends .then()
            }
        });//ends employee list top dbquery
};//ends sortEmp fn

function addEmployee() {
    const knowYourRole = [];
    db.query('SELECT title FROM roles', (err, data) => {
        if (err) {
            console.log('Uh-oh, roles are not showing.')
        } else {
            data.forEach((roleChoice) => {
                knowYourRole.push(roleChoice.title);
            });
        }
    });

    const managerList = [];
    db.query('SELECT CONCAT(employees.first_name, " ", employees.last_name) AS manager FROM employees',
        (err, data) => {
            if (err) {
                console.log('Uh-oh, managers are not showing.')
            } else {
                data.forEach((mgrChoice) => {
                    managerList.push(mgrChoice.manager);
                });
                const noNullMgr = managerList.filter((manager) => manager);
                const uniqueManagerList = [...new Set(noNullMgr), "No Manager"];
                addMgrList(uniqueManagerList);
            }
        });

    function addMgrList(uniqueManagerList) {
        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'addFirst',
                    message: 'What is the new employee\'s first name?'
                },
                {
                    type: 'input',
                    name: 'addLast',
                    message: 'What is the new employee\'s last name?'
                },
                {
                    type: 'list',
                    name: 'addER',
                    message: 'What is this employee\'s role?',
                    choices: knowYourRole
                },
                {
                    type: 'list',
                    name: 'addEM',
                    message: 'Who is this employee\'s manager?',
                    choices: uniqueManagerList
                }
            ])
            .then(function (data) {
                const first = data.addFirst;
                const firstName = first.charAt(0).toUpperCase() + (first).slice(1);
                db.query(
                    'INSERT INTO employees (first_name) VALUES (?)',
                    [firstName],
                    (err, data) => {
                        if (err) {
                            console.log('Welp, that ERROR wasn\'t meant to happen.')
                        } else {
                            console.log('First name added.')
                        }
                    }
                );
                const last = data.addLast;
                const lastName = last.charAt(0).toUpperCase() + (last).slice(1);
                const fullName = firstName + " " + lastName;
                db.query(
                    'UPDATE employees SET last_name = (?) WHERE first_name = (?)',
                    [lastName, firstName],
                    (err, data) => {
                        if (err) {
                            console.log('Welp, that ERROR wasn\'t meant to happen.')
                        } else {
                            console.log('Last name added.')
                        }
                    }
                );
                const empRole = data.addER;
                db.query('SELECT id FROM roles WHERE title = (?)',
                    [empRole],
                    (err, data) => {
                        if (err) {
                            console.log('omg, did not work.')
                        } else {
                            const roleId = data[0].id;
                            db.query(
                                'UPDATE employees SET role_id = (?) WHERE first_name = (?)',
                                [roleId.toString(), firstName],
                                (err, data) => {
                                    if (err) {
                                        console.log('Welp, that ERROR wasn\'t meant to happen.');
                                    } else {
                                        console.log('Employee role entered.');
                                    }
                                }
                            );
                        }
                    });
                const inputMgrId = data.addEM;
                db.query(
                    'SELECT id FROM employees WHERE CONCAT(employees.first_name, " ", employees.last_name) = (?)',
                    [inputMgrId],
                    (err, data) => {
                        if (err) {
                            console.log('Welp, that ERROR wasn\'t meant to happen.');
                        } else {
                            //optional chaining; if !== data[0], prevents type error, and carries undefined
                            const mgrId = data[0]?.id;
                            db.query(
                                'UPDATE employees SET manager_id = (?) WHERE CONCAT(employees.first_name, " ", employees.last_name) = (?)',
                                //short circuit to pass in null instead of undefined when mgrId is undefined (because of user choosing no Manager for the newly added employee)
                                [mgrId?.toString() || null, fullName],
                                (err, data) => {
                                    if (err) {
                                        console.log('Welp, that ERROR wasn\'t meant to happen.');
                                    } else {
                                        console.log('Employee successfully added.');
                                        menu();
                                    }
                                }
                            );
                        }
                    }
                )
            });//ends .then()
    }//ends function addMgrList
};//ends addEmployee()

function updateEmployeeRole() {
    const knowYourRole = [];
    db.query('SELECT title FROM roles', (err, data) => {
        if (err) {
            console.log('Uh-oh, roles are not showing.')
        } else {
            data.forEach((roleChoice) => {
                knowYourRole.push(roleChoice.title);
            });
        }
    });//ends role dbquery

    const empList = [];
    db.query('SELECT CONCAT(employees.first_name, " ", employees.last_name) AS fullName FROM employees', (err, data) => {
        if (err) {
            console.log('Uh-oh, roles are not showing.')
        } else {
            data.forEach((empChoice) => {
                empList.push(empChoice.fullName);
            });
            updateEmpQuery(empList);
        }
    });//ends employee list dbquery
    function updateEmpQuery(empList) {
        inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'pickEmp',
                    message: 'Whose role would you like to update?',
                    choices: empList
                },
                {
                    type: 'list',
                    name: 'pickRole',
                    message: 'What is this employee\'s new role?',
                    choices: knowYourRole
                }
            ])
            .then(function (data) {
                const chosenEmp = data.pickEmp;
                const newRole = data.pickRole;
                db.query(
                    'SELECT id FROM roles WHERE title = (?)',
                    [newRole],
                    (err, data) => {
                        if (err) {
                            console.log('ERROR: role_id not updated.')
                        } else {
                            console.log('role_id selected.')
                            const newRoleId = data[0].id;
                            db.query(
                                'UPDATE employees SET role_id = (?) WHERE CONCAT(employees.first_name, " ", employees.last_name) = (?)',
                                [newRoleId, chosenEmp],
                                (err, data) => {
                                    if (err) {
                                        console.log('Welp, that ERROR wasn\'t meant to happen.')
                                    } else {
                                        console.log('Role title added.');
                                        menu();
                                    }
                                }
                            );
                        }
                    }
                );
            })
    }
};

function updateEmployeeMgr() {
    const listOfMgrs = []
    db.query(
        'SELECT CONCAT(employees.first_name, " ", employees.last_name) AS fullName FROM employees',
        (err, data) => {
            if (err) {
                console.log('ERROR: No list of employees.');
            } else {
                data.forEach((selectedEmp) => {
                    listOfMgrs.push(selectedEmp.fullName)
                })
                console.log('Here is the list of available managers.');

                inquirer
                    .prompt([
                        {
                            type: 'list',
                            name: 'pickEmp',
                            message: 'Which employee would you like to update?',
                            choices: listOfMgrs
                        }
                    ])//ends prompt questions
                    .then(function (data) {
                        const pickedEmployee = data.pickEmp;
                        const availableMgrs = [];
                        db.query(
                            'SELECT CONCAT(employees.first_name, " ", employees.last_name) AS fullName FROM employees WHERE CONCAT(employees.first_name, " ", employees.last_name) != (?)',
                            [pickedEmployee],
                            (err, data) => {
                                if (err) {
                                    console.log('ERROR: No list of employees.');
                                } else {
                                    data.forEach((mgrs) => {
                                        availableMgrs.push(mgrs.fullName);
                                    })
                                    availableMgrs.push('No Manager');
                                    inquirer
                                        .prompt([
                                            {
                                                type: 'list',
                                                name: 'pickMgr',
                                                message: 'Who is this employee\'s new manager?',
                                                choices: availableMgrs
                                            }
                                        ])
                                        .then(function (data) {
                                            const newManager = data.pickMgr;
                                            db.query(
                                                'SELECT id FROM employees WHERE CONCAT(employees.first_name, " ", employees.last_name) = (?)',
                                                [newManager],
                                                (err, data) => {
                                                    if (err) {
                                                        console.log('ERROR: No list of employees.');
                                                    } else {
                                                        const newMgrId = data[0]?.id;
                                                        db.query(
                                                            'UPDATE employees SET manager_id = (?) WHERE CONCAT(employees.first_name, " ", employees.last_name) = (?)',
                                                            [newMgrId?.toString() || null, pickedEmployee],
                                                            (err, data) => {
                                                                if (err) {
                                                                    console.log('Welp, that ERROR wasn\'t meant to happen.');
                                                                } else {
                                                                    console.log('Employee\'s manager was successfully updated.');
                                                                    menu();
                                                                }
                                                            })
                                                    }
                                                }
                                            )
                                        })
                                }
                            }
                        )
                    })//ends prompt's.then()
            }//ends first else block of first cbfn
        }//ends firstcbfn
    )//ends db.query to select employee
}//ends updateEmployeeMgr function

function viewAllRoles() {
    //prints all content from roles table
    db.query('SELECT roles.id, roles.title, roles.salary, departments.name AS department FROM roles LEFT JOIN departments ON roles.department_id = departments.id',
        (err, data) => {
            if (err) {
                console.log('Welp, that ERROR wasn\'t meant to happen.')
            } else {
                console.table(data);
                roleMenu();
            }
        })
};

function addRole() {
    const deptList = [];
    db.query('SELECT name FROM departments', (err, data) => {
        if (err) {
            console.log('Welp, that ERROR wasn\'t meant to happen.')
        } else {
            data.forEach((deptChoice) => {
                deptList.push(deptChoice.name);
            });
        }
    });
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
                choices: deptList
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
                        console.log('Welp, that ERROR wasn\'t meant to happen.')
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
                        console.log('Welp, that ERROR wasn\'t meant to happen.');
                    } else {
                        console.log('Role salary added.');
                    }
                }
            );
            //showing dept id in roles table
            const dept = data.addRD;
            db.query('SELECT id FROM departments WHERE name = (?)',
                [dept],
                (err, data) => {
                    if (err) {
                        console.log('Welp, that ERROR wasn\'t meant to happen.')
                    } else {
                        const deptId = data[0].id;
                        db.query(
                            'UPDATE roles SET department_id = (?) WHERE title = (?)',
                            [deptId.toString(), userRole],
                            (err, data) => {
                                if (err) {
                                    console.log('Welp, that ERROR wasn\'t meant to happen.');
                                } else {
                                    console.log('Role successfully entered.');
                                    menu();
                                }
                            }
                        );
                    }
                });
        })
};

function roleMenu() {
    const knowYourRole = [];
    db.query('SELECT title FROM roles', (err, data) => {
        if (err) {
            console.log('Uh-oh, roles are not showing.')
        } else {
            data.forEach((roleChoice) => {
                knowYourRole.push(roleChoice.title);
            });
            knowYourRole.push('Back to main menu');
        }
    });//ends dbquery
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'roleQ',
                message: 'Anything else?',
                choices: [
                    'Delete role',
                    'View all roles',
                    'Back to main menu'
                ]
            }
        ])
        .then(function (userChoice) {
            if (userChoice.roleQ === 'Delete role') {
                deleteRole();
            } else if (userChoice.roleQ === 'View all roles') {
                viewAllRoles();
            } else {
                menu();
            }
            function deleteRole() {
                inquirer
                    .prompt([
                        {
                            type: 'list',
                            name: 'deleteRole',
                            message: 'Which role would you like to delete?',
                            choices: knowYourRole
                        }
                    ])
                    .then(function (data) {

                        if (data.deleteRole === 'Back to main menu') {
                            menu();
                        } else {
                            db.query(
                                'DELETE FROM roles WHERE title = (?)',
                                [data.deleteRole],
                                (err, data) => {
                                    if (err) {
                                        console.log('Could not delete role.');
                                    } else {
                                        console.log('Role deleted.');
                                        roleMenu();
                                    }
                                }
                            );//ends dbquery to delete role
                        };//ends else
                    })
            }//ends deleteRolefn
        })//ends .then()
};//ends roleMenu()

function viewAllDepartments() {
    //prints all content from departments table
    db.query('SELECT * FROM departments', (err, data) => {
        if (err) {
            console.log('Welp, that ERROR wasn\'t meant to happen.')
        } else {
            console.table(data);
            deptMenu();
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
                        console.log('Welp, that ERROR wasn\'t meant to happen.')
                    } else {
                        console.log('Department successfully added.')
                        menu();
                    }
                })
        })
};

function deptMenu() {
    const listofDept = [];
    db.query(
        'SELECT name FROM departments',
        (err, data) => {
            if (err) {
                console.log('Welp, that ERROR wasn\'t meant to happen.')
            } else {
                data.forEach((whichDeptDelete) => {
                    listofDept.push(whichDeptDelete.name);
                });
                listofDept.push('Back to main menu');
            }
        })
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'deptQ',
                message: 'Anything else?',
                choices: [
                    'Delete department',
                    'View all departments',
                    'Back to main menu'
                ]
            }
        ])
        .then(function (userChoice) {
            if (userChoice.deptQ === 'Delete department') {
                deleteDept();
            } else if (userChoice.deptQ === 'View all departments') {
                viewAllDepartments();
            } else {
                menu();
            }
            function deleteDept() {
                inquirer
                    .prompt([
                        {
                            type: 'list',
                            name: 'deleteDept',
                            message: 'Which department would you like to delete?',
                            choices: listofDept
                        }
                    ])
                    .then(function (data) {
                        if (data.deleteDept === 'Back to main menu') {
                            menu();
                        } else {
                            db.query(
                                'DELETE FROM departments WHERE name = (?)',
                                [data.deleteDept],
                                (err, data) => {
                                    if (err) {
                                        console.log('Could not delete department.');
                                    } else {
                                        console.log('Department deleted.');
                                        deptMenu();
                                    }
                                }
                            );//ends dbquery to delete dept
                        }
                    })//ends closest .then
            }//ends deleteDept fn
        });//ends .then()
};

function viewDeptBudget() {
    const budgetDept = [];
    db.query(
        'SELECT name FROM departments',
        (err, data) => {
            if (err) {
                console.log('Welp, that ERROR wasn\'t meant to happen.')
            } else {
                data.forEach((whichDeptDelete) => {
                    budgetDept.push(whichDeptDelete.name);
                });
                budgetDept.push('Back to main menu');

                inquirer
                    .prompt([
                        {
                            type: 'list',
                            name: 'deptBud',
                            message: 'Please select a department below to view its current total utilized budget.',
                            choices: budgetDept
                        }
                    ])
                    .then(function (selectedDept) {
                        if (selectedDept.deptBud === 'Back to main menu') {
                            menu();
                        } else {
                            db.query(
                                'SELECT departments.id, departments.name AS department, total_salary, COUNT(employees.id) AS total_employees FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id LEFT JOIN employees AS manage_table ON employees.manager_id = manage_table.id JOIN (SELECT roles.department_id, SUM(roles.salary) AS total_salary FROM roles GROUP BY roles.department_id) AS department_salary ON departments.id = department_salary.department_id WHERE departments.name = (?) GROUP BY departments.id, departments.name, total_salary ORDER BY department',
                                [selectedDept.deptBud],
                                (err, data) => {
                                    if (err) {
                                        console.log('Out of moolah for that one.');
                                    } else {
                                        console.log('Presenting total utilized budget for selected department.');
                                        console.table(data);
                                        menu();
                                    }
                                }
                            );//ends dbquery to show total salary
                        } //ends else
                    })//ends .then()
            }

        })
};

function leave() {
    console.log('Fine, leave me.');
    process.exit();
};

menu();