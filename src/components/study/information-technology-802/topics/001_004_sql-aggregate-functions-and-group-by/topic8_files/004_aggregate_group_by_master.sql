-- ==============================================================================
-- CBSE CLASS XII IT (802) - MODULE 001_004 MASTER AGGREGATE BENCHMARK SCRIPT
-- Educator: Sukanta Hui, Barrackpore
-- ==============================================================================

USE CBSE_IT802_DML;

-- 1. All Aggregate Functions
SELECT 
  COUNT(*) AS TotalRows,
  COUNT(Commission) AS NonNullCommissions,
  SUM(BasicSalary) AS TotalSalary,
  AVG(BasicSalary) AS AvgSalary,
  MAX(BasicSalary) AS MaxSalary,
  MIN(BasicSalary) AS MinSalary
FROM Employee;

-- 2. GROUP BY with HAVING
SELECT 
  Department,
  COUNT(*) AS Headcount,
  AVG(BasicSalary) AS AvgDeptSalary
FROM Employee
GROUP BY Department
HAVING AVG(BasicSalary) > 50000;