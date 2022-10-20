-- Departments
-- Engineering
-- Finance
-- Legal
-- Sales

INSERT INTO department (dept_name)
VALUES  ('Engineering'),
        ('Finance'),
        ('Legal'),
        ('Sales');

-- Roles
-- Sales Lead (Sales) 100000
-- Salesperson (Sales) 80000
-- Lead Engineer (Engineering) 150000
-- Software Engineer (Engineering) 120000
-- Account Manager (Finance) 160000
-- Accountant (Finance) 125000
-- Legal Team Lead (Legal) 250000
-- Lawyer (Legal) 190000

INSERT INTO role (title, department_id, salary)
VALUES  ('Sales Lead', 4, 100000),
        ('Salesperson', 4, 80000),
        ('Lead Engineer', 1, 150000),
        ('Software Engineer', 1, 120000),
        ('Account Manager', 2, 1600000),
        ('Accountant', 2, 125000),
        ('Legal Team Lead', 3, 250000),
        ('Lawyer', 3, 190000);

-- Employees
-- John Doe Sales Lead null
-- Mike Chan Salesperson John Does
-- Ashley Rodriguez Lead Engineer null
-- Kevin Tupik Software Engineer Ashley Rodriguez
-- Kunal Singh Account Manager null
-- Malia Brown Accountant Kunal Singh
-- Sarah Lourd Legal Team Lead null
-- Tom Allen Lawyer Sarah Lourd

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('John', 'Doe', 1, null),
        ('Mike', 'Chan', 2, 1),
        ('Ashley', 'Rodriguez', 3, null),
        ('Kevin', 'Tupik', 4, 3),
        ('Kunal', 'Singh', 5, null),
        ('Malia', 'Brown', 6, 5),
        ('Sarah', 'Lourd', 7, null),
        ('Tom', 'Allen', 8, 7);