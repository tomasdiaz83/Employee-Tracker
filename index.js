const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '123',
        database: 'employee_db' 
    },
    console.log(`Connected to the employee_db database.`)
);



db.query(`
    SELECT e.id as "Employee ID", 
        e.first_name AS "First Name", 
        e.last_name AS "Last Name",
        d.dept_name AS "Department", 
        r.title as "Title", 
        r.salary as "Salary",
        COALESCE(CONCAT(m.first_name, " ", m.last_name), "---") as "Manager"
    FROM employee AS e 
    JOIN role as r 
    ON e.role_id = r.id
    JOIN department as d 
    ON r.department_id = d.id
    LEFT JOIN employee as m
    ON m.id = e.manager_id
    ORDER BY e.id`,
    function(err, results) {
        if (err) {
            console.log(err);
        } else {
            console.table(results)
        }
    }
);