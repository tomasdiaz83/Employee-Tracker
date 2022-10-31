INSERT INTO department (dept_name)
    VALUES ("test");

SELECT e.id as "Employee ID", 
    e.first_name AS "First Name", 
    e.last_name AS "Last Name",
    d.dept_name AS "Department", 
    r.title as "Title", 
    r.salary as "Salary",
    r.id as "Role", 
    e.manager_id as "Manager"
FROM employee AS e 
JOIN role as r 
ON e.role_id = r.id
JOIN department as d 
ON r.department_id = d.id
ORDER BY e.id

-- // db.query(`
-- //     Select * 
-- //     FROM employee`,
-- //     function(err, results) {
-- //         if (err) {
-- //             console.log(err);
-- //         } else {
-- //             console.table(results)
-- //         }
-- //     }
-- // );

-- // db.query(`
-- //     Select * 
-- //     FROM role`,
-- //     function(err, results) {
-- //         if (err) {
-- //             console.log(err);
-- //         } else {
-- //             console.table(results)
-- //         }
-- //     }
-- // );

-- // db.query(`
-- //     Select * 
-- //     FROM department`,
-- //     function(err, results) {
-- //         if (err) {
-- //             console.log(err);
-- //         } else {
-- //             console.table(results)
-- //         }
-- //     }
-- // );

-- // db.query(`
-- //     SELECT r.title as "Title", 
-- //         r.salary as "Salary",
-- //         r.id as "Role",
-- //         d.dept_name as "Department"
-- //     FROM role AS r
-- //     INNER JOIN department as d
-- //     ON r.department_id = d.id`,
-- //     function(err, results) {
-- //         console.table(results);
-- //     }
-- // );