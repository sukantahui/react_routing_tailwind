-- ==============================================================================
-- CBSE CLASS XII IT (802) - MODULE 001_003 MASTER DML BENCHMARK SCRIPT
-- Educator: Sukanta Hui, Barrackpore
-- ==============================================================================

CREATE DATABASE IF NOT EXISTS CBSE_IT802_DML;
USE CBSE_IT802_DML;

-- 1. Create Sample Tables
DROP TABLE IF EXISTS STOCKDATA;
DROP TABLE IF EXISTS Student;
DROP TABLE IF EXISTS Employee;

CREATE TABLE Student (
  RollNo INT PRIMARY KEY,
  FullName VARCHAR(40) NOT NULL,
  AdmissionDate DATE NOT NULL,
  Stream VARCHAR(20) NOT NULL,
  City VARCHAR(30) NOT NULL,
  TotalMarks DECIMAL(5,2)
);

CREATE TABLE Employee (
  EmpNo INT PRIMARY KEY,
  EmpName VARCHAR(40) NOT NULL,
  Department VARCHAR(20),
  BasicSalary DECIMAL(10,2),
  Commission DECIMAL(8,2)
);

CREATE TABLE STOCKDATA (
  StockId INT PRIMARY KEY,
  StockName VARCHAR(30),
  Category VARCHAR(20),
  Units INT,
  Value DECIMAL(10,2)
);

-- 2. Populate Data (INSERT INTO)
INSERT INTO Student VALUES 
  (101, 'Amit Kumar Sharma', '2024-04-12', 'Science', 'Barrackpore', 92.50),
  (102, 'Susmita Roy', '2024-04-15', 'Science', 'Shyamnagar', 88.00),
  (103, 'Debangshu Pal', '2024-04-20', 'Commerce', 'Kolkata', 95.00),
  (104, 'Mamata Sharma', '2024-05-02', 'Commerce', 'Barrackpore', 91.00),
  (105, 'Ajoy Kumar Sen', '2024-05-10', 'Humanities', 'Naihati', 78.50);

INSERT INTO Employee VALUES 
  (1, 'Rajesh Khanna', 'IT', 65000.00, 5000.00),
  (2, 'Priya Nair', 'HR', 48000.00, NULL),
  (3, 'Suresh Menon', 'Finance', 72000.00, 8000.00),
  (4, 'Sunita Rao', 'IT', 62000.00, NULL);

INSERT INTO STOCKDATA VALUES 
  (101, 'Alpha Growth', 'Equity', 500, 1000.00),
  (102, 'Beta Tech', 'Equity', 300, 2400.00),
  (103, 'Govt Bond A', 'Debt', 1000, 500.00);

-- 3. Arithmetic Updates (25% appreciation)
UPDATE STOCKDATA SET Value = Value * 1.25 WHERE Category = 'Equity';

-- 4. Pattern Matching Queries
SELECT * FROM Student WHERE FullName LIKE '%Kumar%';
SELECT * FROM Student WHERE FullName LIKE 'A%';
SELECT * FROM Student WHERE FullName LIKE '_u%';

-- 5. NULL Checks (3VL)
SELECT * FROM Employee WHERE Commission IS NULL;
SELECT * FROM Employee WHERE Commission IS NOT NULL;

-- 6. Set & Range Queries
SELECT * FROM Student WHERE City IN ('Barrackpore', 'Kolkata');
SELECT * FROM Student WHERE TotalMarks BETWEEN 85.00 AND 95.00;

-- 7. DISTINCT & ORDER BY
SELECT DISTINCT City FROM Student;
SELECT * FROM Student ORDER BY Stream ASC, TotalMarks DESC;