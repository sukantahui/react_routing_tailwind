-- ==============================================================================
-- CBSE CLASS XII IT (802) - MODULE 001_005 MASTER JOINS BENCHMARK SCRIPT
-- Educator: Sukanta Hui, Barrackpore
-- ==============================================================================

CREATE DATABASE IF NOT EXISTS CBSE_IT802_JOINS;
USE CBSE_IT802_JOINS;

-- 1. Create Parent Table: PARENTS
DROP TABLE IF EXISTS STUDENT;
DROP TABLE IF EXISTS PARENTS;

CREATE TABLE PARENTS (
  ParentID VARCHAR(10) PRIMARY KEY,
  FatherName VARCHAR(50) NOT NULL,
  MotherName VARCHAR(50),
  Phone VARCHAR(15) NOT NULL,
  City VARCHAR(30) DEFAULT 'Kolkata'
);

-- 2. Create Child Table: STUDENT with Foreign Key
CREATE TABLE STUDENT (
  RollNo INT PRIMARY KEY,
  Name VARCHAR(50) NOT NULL,
  ParentID VARCHAR(10),
  Class VARCHAR(5) NOT NULL,
  BirthYear INT NOT NULL,
  Marks DECIMAL(5,2) DEFAULT 0.00,
  FOREIGN KEY (ParentID) REFERENCES PARENTS(ParentID)
);

-- 3. Populate Sample Data
INSERT INTO PARENTS VALUES
('P1', 'Rajesh Kumar', 'Sunita Kumar', '9830011223', 'Kolkata'),
('P2', 'Bimal Roy', 'Ananya Roy', '9831122334', 'Barrackpore'),
('P3', 'Chandan Pal', 'Mousumi Pal', '9832233445', 'Shyamnagar'),
('P4', 'Tapan Sen', 'Rita Sen', '9833344556', 'Kolkata');

INSERT INTO STUDENT VALUES
(101, 'Amit Kumar', 'P1', 'XII', 2007, 92.50),
(102, 'Susmita Roy', 'P2', 'XI', 2008, 88.00),
(103, 'Debangshu Pal', 'P3', 'XII', 2007, 95.00),
(104, 'Mamata Sharma', 'P1', 'X', 2009, 91.00),
(105, 'Ajoy Sen', 'P4', 'XII', 2006, 78.50);

-- ==============================================================================
-- 4. BENCHMARK QUERIES
-- ==============================================================================

-- Q1: Cartesian Product (Cross Join) -> 5 * 4 = 20 Rows
SELECT S.RollNo, S.Name, P.FatherName, P.Phone
FROM STUDENT S, PARENTS P;

-- Q2: Implicit Equi-Join on ParentID -> 5 Matching Rows
SELECT S.RollNo, S.Name, S.Class, P.FatherName, P.Phone
FROM STUDENT S, PARENTS P
WHERE S.ParentID = P.ParentID;

-- Q3: Explicit ANSI INNER JOIN
SELECT S.RollNo, S.Name, S.Class, P.FatherName, P.Phone
FROM STUDENT S
INNER JOIN PARENTS P ON S.ParentID = P.ParentID;

-- Q4: Filtered Join (BirthYear < 2019 AND Class <> 'X')
SELECT S.RollNo, S.Name, S.Class, S.BirthYear, P.FatherName
FROM STUDENT S, PARENTS P
WHERE S.ParentID = P.ParentID
  AND S.BirthYear < 2008
  AND S.Class <> 'X';

-- Q5: Join with Descending Sorting on Roll Number
SELECT S.RollNo, S.Name, S.Class, P.FatherName, P.Phone
FROM STUDENT S, PARENTS P
WHERE S.ParentID = P.ParentID
ORDER BY S.RollNo DESC;

-- Q6: Multi-Table Aggregation with GROUP BY
SELECT P.FatherName, COUNT(S.RollNo) AS TotalChildren
FROM PARENTS P, STUDENT S
WHERE P.ParentID = S.ParentID
GROUP BY P.FatherName;
