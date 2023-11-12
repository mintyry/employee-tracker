   // const deptList = db.query('SELECT id AS value, name AS name FROM departments',
    //     (err, data) => {
    //         if (err) {
    //             console.log('Ain\'t happenin\' today.')
    //         } else {
    //             manageCoMenu();
    //         }

    //     });

    //showing dept id in roles table
   //  const dept = data.addRD;
   //  db.query('SELECT id FROM departments WHERE name = (?)',
   //      [dept],
   //      (err, data) => {
   //          if (err) {
   //              console.log('Welp, that ERROR wasn\'t meant to happen.')
   //          } else {
   //              const deptId = data[0].id;
   //              db.query(
   //                  'UPDATE roles SET department_id = (?) WHERE title = (?)',
   //                  [deptId.toString(), userRole],
   //                  (err, data) => {
   //                      if (err) {
   //                          console.log('Welp, that ERROR wasn\'t meant to happen.');
   //                      } else {
   //                          console.log('Role successfully entered.');
   //                          // viewAllRoles();
   //                          menu();
   //                      }
   //                  }
   //              );
   //          }
   //      });

//    db.query('SELECT * FROM departments', (err, data) => {
//       if (err) {
//           console.log('Welp, that ERROR wasn\'t meant to happen.')
//       } else {
//           data.forEach((deptChoice) => {
//               deptList.push({
//                   name: deptChoice.name, 
//                   value: deptChoice.id
//               });
//           });
//       }

//   })

// SELECT employees.id, employees.first_name AS "first name", employees.last_name AS "last name", roles.title, departments.name AS department, roles.salary, concat(manager.first_name, " ", manager.last_name) AS manager FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id LEFT JOIN employees manager ON manager.id = employees.manager_id;

// inquirer
// .prompt([
//     {
//         type: 'input',
//         name: 'addFirst',
//         message: 'What is the new employee\'s first name?'
//     },
//     {
//         type: 'input',
//         name: 'addLast',
//         message: 'What is the new employee\'s last name?'
//     },
//     {
//         type: 'list',
//         name: 'addER',
//         message: 'What is this employee\'s role?',
//         choices: knowYourRole
//     },
//     {
//         type: 'list',
//         name: 'addEM',
//         message: 'Who is this employee\'s manager?',
//         choices: uniqueManagerList
//     }

// ])
// .then(function (data) {
//     const first = data.addFirst;
//     const firstName = first.charAt(0).toUpperCase() + (first).slice(1);
//     db.query(
//         'INSERT INTO employees (first_name) VALUES (?)',
//         [firstName],
//         (err, data) => {
//             if (err) {
//                 console.log('Welp, that ERROR wasn\'t meant to happen.')
//             } else {
//                 console.log('First name added.')
//             }
//         }
//     );
//     const last = data.addLast;
//     const lastName = last.charAt(0).toUpperCase() + (last).slice(1);
//     db.query(
//         'UPDATE employees SET last_name = (?) WHERE first_name = (?)',
//         [lastName, firstName],
//         (err, data) => {
//             if (err) {
//                 console.log('Welp, that ERROR wasn\'t meant to happen.')
//             } else {
//                 console.log('Last name added.')
//                 menu();
//             }
//         }
//     );
//     const empRole = data.addER;
//     db.query('SELECT id FROM roles WHERE title = (?)',
//         [empRole],
//         (err, data) => {
//             if (err) {
//                 console.log('omg')
//             } else {
//                 const roleId = data[0].id;
//                 console.log(roleId);
//                 db.query(
//                     'UPDATE employees SET role_id = (?) WHERE first_name = (?)',
//                     [roleId.toString(), firstName],
//                     (err, data) => {
//                         if (err) {
//                             console.log('Welp, that ERROR wasn\'t meant to happen.');
//                         } else {
//                             console.log('Employee role entered.');
//                             menu();
//                         }
//                     }
//                 );
//             }
//         });


// });