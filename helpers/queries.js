const viewDepartments = (db) => {
    db.query(`
        SELECT d.dept_name as "Department",
            d.id as "ID"
        FROM department as d 
        ORDER BY d.id`,
        function(err, results) {
            if (err) {
                console.log(err);
            } else {
                console.table(results)
            }
        }
    );
}

const viewRoles = (db) => {
    db.query(`
        SELECT r.title as "Job Title",
            r.id as "ID",
            d.dept_name as "Department",
            r.salary as "Salary"
        FROM role as r
        RIGHT JOIN department as d
        ON r.department_id = d.id
        ORDER BY d.id`,
        function(err, results) {
            if (err) {
                console.log(err);
            } else {
                console.table(results)
            }
        }
    );
}

const viewEmployees = (db) => {
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
}

module.exports = { viewDepartments, viewEmployees, viewRoles}