-- ============================================================================
-- CBSE CLASS XII IT (802) - MODULE 001 : TOPIC 7
-- SQL SCRIPT: SELF-REFERENCING FOREIGN KEYS & SELF-JOIN QUERIES
-- EDUCATOR: SUKANTA HUI | CODER & ACCOTAX, BARRACKPORE
-- ============================================================================

CREATE DATABASE IF NOT EXISTS SelfReferencingLabDB;
USE SelfReferencingLabDB;

CREATE TABLE CompanyHierarchy (
    EmpID INT PRIMARY KEY,
    EmpName VARCHAR(60) NOT NULL,
    Designation VARCHAR(40) NOT NULL,
    MonthlySalary DECIMAL(10,2) NOT NULL,
    ManagerID INT,
    CONSTRAINT fk_self_mgr FOREIGN KEY (ManagerID) REFERENCES CompanyHierarchy(EmpID) ON DELETE SET NULL
);

INSERT INTO CompanyHierarchy VALUES
(1, 'Dr. Sukanta Hui', 'Founder & Director', 125000.00, NULL),
(2, 'Rajanya Ghosh', 'Senior Manager', 85000.00, 1),
(3, 'Mamata Das', 'Software Engineer', 55000.00, 2);

SELECT E.EmpName AS Employee, E.Designation, IFNULL(M.EmpName, 'Top Director') AS Manager
FROM CompanyHierarchy E
LEFT JOIN CompanyHierarchy M ON E.ManagerID = M.EmpID;
