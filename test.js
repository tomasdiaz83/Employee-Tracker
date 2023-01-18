const mysql = require('mysql2');
const cTable = require('console.table');
const { viewDepartments } = require('./lib/queries');

const init = () => {}

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '123',
        database: 'employee_db' 
    },
    console.log(`Connected to the employee_db database.`)
);

const getEmployeeArray = () => {
    //let array = [];

    const sql = 'SELECT CONCAT(first_name, " ", last_name) as employees FROM Employee';

    const employeeArray = db.query(sql)
        .then( (response) => {
            let array = []
            for (let { employees } of response[0]) { 
                
                array.push(employees);
            }  
            return array
        })
    
    console.log(employeeArray);
    // //console.log(employeeList);
    
    // //console.log(result)
    // for (let { employees } of employeeList[0]) { 
    //     array.push(employees);
    // }  
    // //console.log(array);
    // return array;
};

console.log(getEmployeeArray())
//getEmployeeArray()
//console.log(getEmployeeArray());

// const test = getEmployeeArray();

// console.log(test);