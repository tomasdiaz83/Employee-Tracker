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

const createEmployee = async(db, getEmployeeArray, init) => {
    const role = await inquirer.prompt(questions.newEmployee(getEmployeeArray)).then((data) => {return data});

    // const sql = `INSERT INTO role (title, salary, department_id) VALUES ("${role.name}", ${role.salary}, (SELECT id FROM department WHERE dept_name = '${role.dept}'))`;
    
    // db.query(sql, function(err, results) {
    //         if (err) {console.log(err)}
    //     }
    // );
    viewEmployees(db, init);
}

module.exports = { createDept, createRole, createEmployee };