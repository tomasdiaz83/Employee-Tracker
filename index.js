const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const { viewDepartments, viewEmployees, viewRoles } = require('./helpers/queries')

const questions = require('./helpers/questions');

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
    inquirer
        .prompt(questions.opening)
        .then(choice => {
            switch(choice.action) {
                case 'View all departments':
                    return viewDepartments(db);
                case 'View all roles':
                    return viewRoles(db);
                case 'View all employees':
                    return viewEmployees(db);
                default:
                    break;
            }
        })
}

init();