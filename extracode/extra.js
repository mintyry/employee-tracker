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