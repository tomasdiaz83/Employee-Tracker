const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const { viewDepartments, viewEmployees, viewRoles } = require('./lib/queries');
const { createDept, createRole, createEmployee } = require('./lib/inserts&updates');

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
                    createEmployee(db, getEmployeeArray, init)
                    break;
                case 'EXIT':
                    db.close();
                default:
                    break;
            };

        });
    
}

const getDeptArray = () => {
    let array = [];

    db.query('SELECT dept_name FROM department', (err, result) => {
        for (let { dept_name } of result) { 
            array.push(dept_name);        
        }
    });

    return array;
};

const getEmployeeArray = () => {
    let array = [];

    db.query('SELECT CONCAT(first_name, " ", last_name) as employees FROM Employee', (err, result) => {
        for (let i = 0; i<result.length; i++) { 
            let employees = result[i];
            let { employee } = employees;
            array.push(employee);        
        }
    });

    return array;
};

init();