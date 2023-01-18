const inquirer = require('inquirer');
const questions = require('./questions')
const { viewDepartments, viewRoles, viewEmployees } = require('./queries');

const createDept = async(db, init) => {
    const dname = await inquirer.prompt(questions.newDept).then((data) => {return data.newDept});

    const sql = `INSERT INTO department (dept_name) VALUES ("${dname}")`;
    
    db.query(sql, function(err, results) {
            if (err) {console.log(err);} 
        }
    );
    viewDepartments(db, init);
}

const createRole = async(db, getDeptArray, init) => {
    const role = await inquirer.prompt(questions.newRole(getDeptArray)).then((data) => {return data});

    const sql = `INSERT INTO role (title, salary, department_id) VALUES ("${role.name}", ${role.salary}, (SELECT id FROM department WHERE dept_name = '${role.dept}'))`;
    
    db.query(sql, function(err, results) {
            if (err) {console.log(err)}
        }
    );
    viewRoles(db, init);
}

const createEmployee = async(db, getEmployeeArray, getRoleArray, init) => {
    const employee = await inquirer.prompt(questions.newEmployee(getEmployeeArray, getRoleArray)).then((data) => {return data});

    let fn = employee.manager.split(" ")[0]
    let ln = employee.manager.split(" ")[1]

    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${employee.firstName}", "${employee.lastName}", (SELECT id FROM role WHERE title = "${employee.role}"), (SELECT id FROM(SELECT id FROM employee WHERE first_name = "${fn}" AND last_name = "${ln}") as x ))`;
    
    db.query(sql, function(err, results) {
            if (err) {console.log(err)}
        }
    );
    
    viewEmployees(db, init);
}

const updateEmployee = async(db, getEmployeeArray, getRoleArray, init) => {

    eArray = await getEmployeeArray()
    rArray = await getRoleArray()
    let mfn = ""
    let mln = ""
    let efn = ""
    let eln = ""
    let sql = ""

    const upEmployee = await inquirer.prompt(questions.updateEmployee(rArray, eArray)).then((data) => {return data});

    if (upEmployee.manager) {
        mfn = upEmployee.manager.split(" ")[0]
        mln = upEmployee.manager.split(" ")[1]
        
        efn = upEmployee.who.split(" ")[0]
        eln = upEmployee.who.split(" ")[1]
        
        sql = `UPDATE employee 
        SET manager_id = (SELECT id FROM (SELECT id FROM employee WHERE first_name = "${mfn}" AND last_name = "${mln}") as x ) 
        WHERE id = (SELECT id FROM (SELECT id FROM employee WHERE first_name = "${efn}" AND last_name = "${eln}") as x )`;
    } else {
        efn = upEmployee.who.split(" ")[0]
        eln = upEmployee.who.split(" ")[1]

        sql = `UPDATE employee 
        SET role_id = (SELECT id FROM role WHERE title = "${upEmployee.role}")
        WHERE id = (SELECT id FROM (SELECT id FROM employee WHERE first_name = "${efn}" AND last_name = "${eln}") as x )`;
    }

    db.query(sql, function(err, results) {
            if (err) {console.log(err)}
        }
    );
    
    console.log("employee updated")
    viewEmployees(db, init);
}

module.exports = { createDept, createRole, createEmployee, updateEmployee };