-- ============================================================================
-- CBSE CLASS XII IT (802) - MODULE 001 : TOPIC 8
-- SQL SCRIPT: ESSENTIAL MYSQL CLIENT NAVIGATION WORKFLOW
-- EDUCATOR: SUKANTA HUI | CODER & ACCOTAX, BARRACKPORE
-- ============================================================================

-- Step 1: Check server session and diagnostics
SELECT VERSION(), CURRENT_USER(), DATABASE();

-- Step 2: List all databases on server
SHOW DATABASES;

-- Step 3: Create and switch to the Organization database
CREATE DATABASE IF NOT EXISTS CoderAccoTaxOrganization;
USE CoderAccoTaxOrganization;

-- Step 4: Verify active database
SELECT DATABASE();

-- Step 5: Create a sample master table
CREATE TABLE StaffRegistry (
    StaffID INT PRIMARY KEY AUTO_INCREMENT,
    StaffName VARCHAR(60) NOT NULL,
    Role VARCHAR(40) NOT NULL,
    MonthlySalary DECIMAL(10,2) NOT NULL,
    JoinDate DATE NOT NULL
);

-- Step 6: List all tables in current database
SHOW TABLES;

-- Step 7: Inspect column structure using DESCRIBE
DESCRIBE StaffRegistry;
-- or shorthand:
DESC StaffRegistry;

-- Step 8: View exact CREATE DDL syntax
SHOW CREATE TABLE StaffRegistry;
