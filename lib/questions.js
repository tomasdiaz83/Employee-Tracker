const getEmployeeArray2 = require('../index')

module.exports = questions = {
    opening: [
        {
            type: 'list',
            name: 'action',
            message: "What whould you like to do?",
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee', 'EXIT']
        },
    ],
    // WHEN I choose to add a department
    // THEN I am prompted to enter the name of the department and that department is added to the database
    newDept: [
        {
            type: 'input',
            name: 'newDept',
            message: 'What is the name of the department?',
            validate: (input) => {
                if (!input) {
                    console.log ("\n     Please enter a name.");
                    return false;
                } else {
                    return true;
                }
            }
        },
    ],
    
    // // WHEN I choose to add a role
    // // THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
    newRole: (getDeptArray) => {
        return [
            {
                type: 'input',
                name: 'name',
                message: 'What is the name of the role?',
                validate: (input) => {
                    if (!input) {
                        console.log ("\n     Please enter a name.");
                        return false;
                    } else {
                        return true;
                    }
                }
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the salary of the role?',
                validate: (input) => {
                    if (!input) {
                        console.log ("\n     Please enter a number.");
                        return false;
                    } else if (isNaN(input)) {
                        console.log ("\n     Please enter a number.");
                        return false;
                    } else {
                        return true;
                    }
                }
            },
            {
                type: 'list',
                name: 'dept',
                message: "What department does the role belong to?",
                choices: getDeptArray()
            },
        ];
    },
    
    // WHEN I choose to add an employee
    // THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
    newEmployee: (getEmployeeArray, getRoleArray) => {
            return [
            {
                type: 'input',
                name: 'firstName',
                message: 'What is the first name of the new employee?',
                validate: (input) => {
                    if (!input) {
                        console.log ("\n     Please enter a name.");
                        return false;
                    } else {
                        return true;
                    }
                }
            },
            {
                type: 'input',
                name: 'lastName',
                message: 'What is the last name of the new employee?',
                validate: (input) => {
                    if (!input) {
                        console.log ("\n     Please enter a name.");
                        return false;
                    } else {
                        return true;
                    }
                }
            },
            {
                type: 'list',
                name: 'role',
                message: `What role does the employee hold?`,
                choices: getRoleArray()
            },
            {
                type: 'list',
                name: 'manager',
                message: "Who does the employee report to?",
                choices: getEmployeeArray()
            },
        ];
    },
    // WHEN I choose to update an employee role
    // THEN I am prompted to select an employee to update and their new role and this information is updated in the database
    updateEmployee: (roles, employees) => {

        return [
            {
                type: 'list',
                name: 'update',
                message: "What would you like to update?",
                choices: ["Role", "Manager"]
            },
            {
                type: 'list',
                name: 'who',
                message: "Which employee will you update?",
                choices: employees
            },
            {
                type: 'list',
                name: 'manager',
                message: "Who does the employee report to?",
                choices: employees,
                when: (answers) => {
                    if (answers.update == "Manager") {
                        return true
                    } else {
                        return false
                    }
                }
            },
            {
                type: 'list',
                name: 'role',
                message: `What role does the employee now hold?`,
                choices: roles,
                when: (answers) => {
                    if (answers.update == "Role") {
                        return true
                    } else {
                        return false
                    }
                }
            }
        ];
    }
}