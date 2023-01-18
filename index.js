const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const { viewDepartments, viewEmployees, viewRoles } = require('./lib/queries');
const { createDept, createRole, createEmployee, updateEmployee } = require('./lib/inserts&updates');

const questions = require('./lib/questions');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '123',
        database: 'employee_db' 
    },
    console.log(`Connected to the employee_db database.`)
);

const init = () => {
    inquirer.prompt(questions.opening)
        .then((data) => {
            let choice = data.action;
            
            switch(choice) {
                case 'View all departments':
                    viewDepartments(db, init);
                    break;
                case 'View all roles':
                    viewRoles(db, init);
                    break;
                case 'View all employees':
                    viewEmployees(db, init);
                    break;
                case 'Add a department':
                    createDept(db, init);
                    break;
                case 'Add a role':
                    createRole(db, getDeptArray, init);
                    break;
                case 'Add an employee':
                    createEmployee(db, getEmployeeArray, getRoleArray, init)
                    break;
                case 'Update an employee':
                    updateEmployee(db, getEmployeeArray, getRoleArray, init)
                    break;
                case 'EXIT':
                    db.close();
                default:
                    break;
            };

        });
    
}

const getDeptArray = () => {
    let depArray = [];

    db.query('SELECT dept_name FROM department', (err, result) => {
        for (let { dept_name } of result) { 
            depArray.push(dept_name);        
        }
    });

    return depArray;
};

const getEmployeeArray = () => {    
    let empArray = [];

    db.query('SELECT CONCAT(first_name, " ", last_name) as employees FROM Employee', (err, result) => {
        for (let { employees } of result) { 
            empArray.push(employees);        
        }
    });

    return empArray;
};

const getRoleArray = () => {    
    let roArray = [];

    db.query('SELECT title as roles FROM role', (err, result) => {
        for (let { roles } of result) { 
            roArray.push(roles);        
        }
    });

    return roArray;
};

init();