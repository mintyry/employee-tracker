//    // const deptList = db.query('SELECT id AS value, name AS name FROM departments',
//     //     (err, data) => {
//     //         if (err) {
//     //             console.log('Ain\'t happenin\' today.')
//     //         } else {
//     //             manageCoMenu();
//     //         }

//     //     });

//     //showing dept id in roles table
//    //  const dept = data.addRD;
//    //  db.query('SELECT id FROM departments WHERE name = (?)',
//    //      [dept],
//    //      (err, data) => {
//    //          if (err) {
//    //              console.log('Welp, that ERROR wasn\'t meant to happen.')
//    //          } else {
//    //              const deptId = data[0].id;
//    //              db.query(
//    //                  'UPDATE roles SET department_id = (?) WHERE title = (?)',
//    //                  [deptId.toString(), userRole],
//    //                  (err, data) => {
//    //                      if (err) {
//    //                          console.log('Welp, that ERROR wasn\'t meant to happen.');
//    //                      } else {
//    //                          console.log('Role successfully entered.');
//    //                          // viewAllRoles();
//    //                          menu();
//    //                      }
//    //                  }
//    //              );
//    //          }
//    //      });

// //    db.query('SELECT * FROM departments', (err, data) => {
// //       if (err) {
// //           console.log('Welp, that ERROR wasn\'t meant to happen.')
// //       } else {
// //           data.forEach((deptChoice) => {
// //               deptList.push({
// //                   name: deptChoice.name, 
// //                   value: deptChoice.id
// //               });
// //           });
// //       }

// //   })



// // const managerList = [];

// // db.query('SELECT CONCAT(manage_table.first_name, " ", manage_table.last_name) AS manager FROM employees LEFT JOIN employees as manage_table ON employees.manager_id = manage_table.id;',
// //     (err, data) => {
// //         if (err) {
// //             console.log('Uh-oh, managers are not showing.')
// //         } else {
// //             data.forEach((mgrChoice) => {
// //                 managerList.push(mgrChoice.manager);
// //             });
// //             const noNullMgr = managerList.filter((managers) => {
// //                 return managers !== null
// //             })
// //             const uniqueManagerList = [...new Set(noNullMgr)];
// //             console.log(uniqueManagerList);

// //         }
// //     });





// // SELECT employees.id, employees.first_name AS "first name", employees.last_name AS "last name", roles.title, departments.name AS department, roles.salary, concat(manager.first_name, " ", manager.last_name) AS manager FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id LEFT JOIN employees manager ON manager.id = employees.manager_id;

// // inquirer
// // .prompt([
// //     {
// //         type: 'input',
// //         name: 'addFirst',
// //         message: 'What is the new employee\'s first name?'
// //     },
// //     {
// //         type: 'input',
// //         name: 'addLast',
// //         message: 'What is the new employee\'s last name?'
// //     },
// //     {
// //         type: 'list',
// //         name: 'addER',
// //         message: 'What is this employee\'s role?',
// //         choices: knowYourRole
// //     },
// //     {
// //         type: 'list',
// //         name: 'addEM',
// //         message: 'Who is this employee\'s manager?',
// //         choices: uniqueManagerList
// //     }

// // ])
// // .then(function (data) {
// //     const first = data.addFirst;
// //     const firstName = first.charAt(0).toUpperCase() + (first).slice(1);
// //     db.query(
// //         'INSERT INTO employees (first_name) VALUES (?)',
// //         [firstName],
// //         (err, data) => {
// //             if (err) {
// //                 console.log('Welp, that ERROR wasn\'t meant to happen.')
// //             } else {
// //                 console.log('First name added.')
// //             }
// //         }
// //     );
// //     const last = data.addLast;
// //     const lastName = last.charAt(0).toUpperCase() + (last).slice(1);
// //     db.query(
// //         'UPDATE employees SET last_name = (?) WHERE first_name = (?)',
// //         [lastName, firstName],
// //         (err, data) => {
// //             if (err) {
// //                 console.log('Welp, that ERROR wasn\'t meant to happen.')
// //             } else {
// //                 console.log('Last name added.')
// //                 menu();
// //             }
// //         }
// //     );
// //     const empRole = data.addER;
// //     db.query('SELECT id FROM roles WHERE title = (?)',
// //         [empRole],
// //         (err, data) => {
// //             if (err) {
// //                 console.log('omg')
// //             } else {
// //                 const roleId = data[0].id;
// //                 console.log(roleId);
// //                 db.query(
// //                     'UPDATE employees SET role_id = (?) WHERE first_name = (?)',
// //                     [roleId.toString(), firstName],
// //                     (err, data) => {
// //                         if (err) {
// //                             console.log('Welp, that ERROR wasn\'t meant to happen.');
// //                         } else {
// //                             console.log('Employee role entered.');
// //                             menu();
// //                         }
// //                     }
// //                 );
// //             }
// //         });


// // });

// //UPDATE MANAGER
// function updateEmpMgr() {

//    function otherEmpsMgr(selectedEmployee) {
//        const mgrList = [];
//        db.query('SELECT CONCAT(employees.first_name, " ", employees.last_name) AS fullName FROM employees WHERE CONCAT(employees.first_name, " ", employees.last_name) !== (?)',
//            [selectedEmployee],
//            (err, data) => {
//                if (err) {
//                    console.log('Uh-oh, roles are not showing.')
//                } else {
//                    data.forEach((chooseMgr) => {
//                        mgrList.push(chooseMgr.fullName);
//                        return mgrList;
//                    });
//                }
//            });//ends dbquery
//    }//ends otherEmpsMgr fn

//    const empList = [];

//    db.query('SELECT CONCAT(employees.first_name, " ", employees.last_name) AS fullName FROM employees', (err, data) => {
//        if (err) {
//            console.log('Uh-oh, roles are not showing.')
//        } else {
//            data.forEach((empChoice) => {
//                empList.push(empChoice.fullName);
//            });
//            updateEmpQuery(empList);
//        }
//    });//ends employee list dbquery


//    function updateEmpQuery(empList) {

//        inquirer
//            .prompt([
//                {
//                    type: 'list',
//                    name: 'pickEmp',
//                    message: 'Whose manager would you like to update?',
//                    choices: empList
//                },
//            ])
//            .then(function (data) {
//                const chosenEmp = data.pickEmp;
//                Promise.resolve(otherEmpsMgr(chosenEmp))
//                    .then((mgrList) => {
//                        inquirer.prompt([
//                            {
//                                type: 'list',
//                                name: 'pickMgr',
//                                message: 'Who is this employee\'s new manager?',
//                                choices: otherEmpsMgr()
//                            },
//                        ])
//                            .then(function (data) {
//                                const chosenMgr = data.pickMgr;
//                                // db.query(
//                                //     'SELECT id FROM roles WHERE title = (?)',
//                                //     [newRole],
//                                //     (err, data) => {
//                                //         if (err) {
//                                //             console.log('ERROR: role_id not updated.')
//                                //         } else {
//                                //             console.log('role_id selected.')
//                                //             const newRoleId = data[0].id;
//                                //             db.query('UPDATE employees SET role_id = (?) WHERE CONCAT(employees.first_name, " ", employees.last_name) = (?)',
//                                //                 [newRoleId, chosenEmp],
//                                //                 (err, data) => {
//                                //                     if (err) {
//                                //                         console.log('Welp, that ERROR wasn\'t meant to happen.')
//                                //                     } else {
//                                //                         console.log('Role title added.');
//                                //                         menu();
//                                //                     }
//                                //                 }
//                                //             )
//                                //         }
//                                //     }
//                                // )
//                            }
//                            )
//                        }
//                    )
//            })
//        }
//    }

// SELECT departments.id, departments.name AS department, total_salary, COUNT(employees.id) AS total_employees
//     FROM employees
//     LEFT JOIN roles ON employees.role_id = roles.id
//     LEFT JOIN departments ON roles.department_id = departments.id
//     LEFT JOIN employees AS manage_table ON employees.manager_id = manage_table.id
//     JOIN (
//         SELECT roles.department_id, SUM(roles.salary) AS total_salary
//         FROM roles
//         GROUP BY roles.department_id
//     ) AS department_salary ON departments.id = department_salary.department_id
//     WHERE departments.name = (?)
//     GROUP BY departments.id, departments.name, total_salary
//     ORDER BY department;

//query statement for total salaries


// SELECT
//   departments.id AS department_id,
//   departments.name AS department_name,
//   (
//     SELECT SUM(roles.salary)
//     FROM roles
//     JOIN employees ON roles.id = employees.role_id
//     WHERE departments.id = roles.department_id
//   ) AS total_salary,
//   COUNT(employees.id) AS total_employees
// FROM
//   departments
// LEFT JOIN
//   roles ON departments.id = roles.department_id
// LEFT JOIN
//   employees ON roles.id = employees.role_id
// WHERE
//   departments.name = "Legal"
// GROUP BY
//   departments.id, departments.name;

