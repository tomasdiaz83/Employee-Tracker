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

const getDeptArray = () => {
    let array = [];
    
    const sql = 'SELECT dept_name FROM department';

    db.query(sql, (err, result) => {
        //console.log(result)
        if (err) {console.log(err)}
        for (let { dept_name } of result) { 
            array.push(dept_name);        
        }
        console.log(array);
    });

    return array;
};

const getEmployeeArray = async () => {
    const sql = 'SELECT CONCAT(first_name, " ", last_name) as employees FROM Employee';
    
    let array = [];

    let data = await db.promise().query(sql);
       /* .then( data => {
            console.log(data[0]);
            array.push(data[0]);
            return array;
        })
        .catch(err => {
            console.log(err);
        })
        */

   /* db.query(sql, (err, result) => {
        
        //console.log(result)
        for (let { employees } of result) { 
            array.push(employees);        
        }
        
        //console.log(array);
    })
    */
    console.log(data[0]);
    array.push(data[0])
    return data[0];
};

console.log(getEmployeeArray())

//console.log(getEmployeeArray());

// const test = getEmployeeArray();

// console.log(test);