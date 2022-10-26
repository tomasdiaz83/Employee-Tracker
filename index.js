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
    inquirer.prompt(questions.opening)
        .then((data) => {
            let choice = data.action;
            
            // if (choice == 'View all departments') {
            //     return viewDepartments(db, init);
            // }
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
                case 'EXIT':
                    db.close();
                default:
                    break;
            };

        });
    //await selector(choice.action);
    
}

const selector = async (action) => {
    
    return init();
}

init();