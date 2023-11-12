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