-- ============================================================================
-- SQL-PRJ-05: Corporate HR Employee Payroll & Department Filter
-- Author: Sukanta Hui (Coder & AccoTax)
-- Database: MySQL 8.0+
-- ============================================================================

CREATE DATABASE IF NOT EXISTS corporate_hr_db;
USE corporate_hr_db;

DROP TABLE IF EXISTS employees;
CREATE TABLE employees (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    department VARCHAR(40) NOT NULL,
    designation VARCHAR(50) NOT NULL,
    basic_salary DECIMAL(10, 2) NOT NULL,
    hire_date DATE NOT NULL,
    manager_id BIGINT UNSIGNED NULL
);

INSERT INTO employees (first_name, last_name, department, designation, basic_salary, hire_date, manager_id)
VALUES
    ('Siddhartha', 'Ghosh',     'Executive',   'Chief Executive Officer', 250000.00, '2018-01-10', NULL),
    ('Rituparna',  'Sen',       'Engineering', 'Senior Backend Dev',       95000.00, '2021-03-15', 1),
    ('Amitava',    'Paul',      'Engineering', 'QA Automation Lead',       68000.00, '2022-07-01', 2),
    ('Pradeep',    'Kundu',     'Operations',  'Facility Supervisor',      35000.00, '2023-01-15', 1),
    ('Tanmay',     'Das',       'Analytics',   'Data Analyst',             62000.00, '2022-11-20', 1),
    ('Barnali',    'Roy',       'Finance',     'Senior Accountant',        58000.00, '2020-09-01', 1),
    ('Arindam',    'Mukherjee', 'Marketing',   'Growth Marketer',          52000.00, '2023-05-10', 1);

-- Query: Non-Executive Depts (45k - 120k) with valid reporting manager
SELECT 
    id,
    first_name,
    last_name,
    department,
    designation,
    basic_salary,
    manager_id
FROM employees
WHERE department IN ('Engineering', 'Finance', 'Analytics')
  AND basic_salary BETWEEN 45000.00 AND 120000.00
  AND manager_id IS NOT NULL
ORDER BY department ASC, basic_salary DESC;
