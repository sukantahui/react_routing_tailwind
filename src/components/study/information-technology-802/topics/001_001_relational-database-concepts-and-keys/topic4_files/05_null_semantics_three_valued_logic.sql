-- ============================================================================
-- CBSE CLASS XII IT (802) - MODULE 001 : TOPIC 4
-- SQL SCRIPT: DEMONSTRATING NULL SEMANTICS & THREE-VALUED LOGIC (3VL)
-- EDUCATOR: SUKANTA HUI | CODER & ACCOTAX, BARRACKPORE
-- ============================================================================

CREATE DATABASE IF NOT EXISTS NullSemanticsLabDB;
USE NullSemanticsLabDB;

-- ----------------------------------------------------------------------------
-- 1. Create Employee Table with Nullable Commission
-- ----------------------------------------------------------------------------
CREATE TABLE StaffCompensation (
    EmpID INT PRIMARY KEY,
    EmpName VARCHAR(50) NOT NULL,
    Department VARCHAR(30) NOT NULL,
    BasicSalary DECIMAL(10,2) NOT NULL,
    Commission DECIMAL(10,2) -- NULLable column
);

-- Insert Sample Staff Records (Barrackpore branch)
INSERT INTO StaffCompensation VALUES
(101, 'Mamata Das', 'Sales', 45000.00, 5000.00),
(102, 'Susmita Roy', 'Sales', 48000.00, 4500.00),
(103, 'Debangshu Pal', 'Operations', 40000.00, NULL), -- No commission assigned
(104, 'Sachin Roy', 'Sales', 42000.00, 3500.00),
(105, 'Swadeep Roy', 'Management', 65000.00, NULL); -- No commission assigned

-- ----------------------------------------------------------------------------
-- 2. Demonstrating Why '= NULL' Fails vs 'IS NULL'
-- ----------------------------------------------------------------------------

-- FAILS: Returns 0 rows because 'Commission = NULL' evaluates to UNKNOWN
SELECT * FROM StaffCompensation WHERE Commission = NULL;

-- SUCCEEDS: Returns Debangshu Pal & Swadeep Roy
SELECT EmpID, EmpName, Department, BasicSalary 
FROM StaffCompensation 
WHERE Commission IS NULL;

-- SUCCEEDS: Returns Mamata, Susmita, and Sachin
SELECT EmpID, EmpName, Commission 
FROM StaffCompensation 
WHERE Commission IS NOT NULL;

-- ----------------------------------------------------------------------------
-- 3. Arithmetic with NULL & The IFNULL() Solution
-- ----------------------------------------------------------------------------
SELECT 
    EmpName,
    BasicSalary,
    Commission,
    (BasicSalary + Commission) AS DirectSumWithNull_YieldsNull,
    (BasicSalary + IFNULL(Commission, 0.00)) AS CorrectTotalEarnings
FROM StaffCompensation;

-- ----------------------------------------------------------------------------
-- 4. Aggregate Function Behavior with NULLs
-- ----------------------------------------------------------------------------
-- AVG(Commission) computes (5000 + 4500 + 3500) / 3 = 4333.33 (Ignores 2 NULLs)
-- COUNT(Commission) returns 3 (counts non-null entries)
-- COUNT(*) returns 5 (total table rows)
SELECT 
    COUNT(*) AS TotalStaffCount,
    COUNT(Commission) AS StaffWithCommission,
    SUM(Commission) AS TotalCommissionPaid,
    AVG(Commission) AS AvgCommissionPaid
FROM StaffCompensation;
