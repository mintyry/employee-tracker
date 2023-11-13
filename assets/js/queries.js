function viewAllEmployees() {
    db.query('SELECT employees.id, employees.first_name, employees.last_name, roles.title, roles.salary, departments.name AS department, CONCAT(manage_table.first_name, " ",  manage_table.last_name) AS manager FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id LEFT JOIN employees AS manage_table  ON employees.manager_id = manage_table.id;', (err, data) => {
        if (err) {
            console.log('ERROR: Viewing all employees.')
        } else {
            console.table(data);
            menu();
        }

    })
};

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

    db.query('SELECT CONCAT(manage_table.first_name, " ", manage_table.last_name) AS manager FROM employees LEFT JOIN employees as manage_table ON employees.manager_id = manage_table.id;',
        (err, data) => {
            if (err) {
                console.log('Uh-oh, managers are not showing.')
            } else {
                data.forEach((mgrChoice) => {
                    managerList.push(mgrChoice.manager);
                });
                const noNullMgr = managerList.filter((manager) => manager !== null);
                const uniqueManagerList = [...new Set(noNullMgr)];
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
                console.log(fullName);
                db.query(
                    'UPDATE employees SET last_name = (?) WHERE first_name = (?)',
                    [lastName, firstName],
                    (err, data) => {
                        if (err) {
                            console.log('Welp, that ERROR wasn\'t meant to happen.')
                        } else {
                            console.log('Last name added.')
                            menu();
                        }
                    }
                );
                const empRole = data.addER;
                db.query('SELECT id FROM roles WHERE title = (?)',
                    [empRole],
                    (err, data) => {
                        if (err) {
                            console.log('omg')
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
                            console.log(data);
                            const mgrId = data[0].id;
                            console.log(mgrId);
                            console.log(inputMgrId);
                            db.query(
                                'UPDATE employees SET manager_id = (?) WHERE CONCAT(employees.first_name, " ", employees.last_name) = (?)',
                                [mgrId.toString(), fullName],
                                (err, data) => {
                                    if (err) {
                                        console.log('Welp, that ERROR wasn\'t meant to happen.');
                                    } else {
                                        console.log(data);
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
                askEmpRole(empList);
            });
        }
    });//ends employee list dbquery
    function askEmpRole(empList) {
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
                console.log('hello');
            })
    }
};

function viewAllRoles() {
    //prints all content from roles table
    db.query('SELECT roles.id, roles.title, roles.salary, departments.name AS department FROM roles LEFT JOIN departments ON roles.department_id = departments.id',
        (err, data) => {
            if (err) {
                console.log('Welp, that ERROR wasn\'t meant to happen.')
            } else {
                console.table(data);
                menu();
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

function viewAllDepartments() {
    //prints all content from departments table
    db.query('SELECT * FROM departments', (err, data) => {
        if (err) {
            console.log('Welp, that ERROR wasn\'t meant to happen.')
        } else {
            console.table(data);
            menu();
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
    // console.log(`I want to add ${data.addD}`)

    //
};

function leave() {
    console.log('Fine, leave me.');
    process.exit();
};

module.exports = { viewAllEmployees, addEmployee, updateEmployeeRole, viewAllRoles, addRole, viewAllDepartments, addDepartment, leave }