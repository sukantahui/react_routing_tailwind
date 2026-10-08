-- ============================================================================
-- CBSE CLASS XII IT (802) - MODULE 001 : TOPIC 6
-- SQL SCRIPT: DEMONSTRATING FOREIGN KEYS & REFERENTIAL INTEGRITY IN MYSQL
-- EDUCATOR: SUKANTA HUI | CODER & ACCOTAX, BARRACKPORE
-- ============================================================================

CREATE DATABASE IF NOT EXISTS ReferentialIntegrityLabDB;
USE ReferentialIntegrityLabDB;

-- ----------------------------------------------------------------------------
-- Step 1: Create PARENT Table (PARENTS) FIRST
-- ----------------------------------------------------------------------------
CREATE TABLE PARENTS (
    ParentID VARCHAR(10) PRIMARY KEY,
    ParentName VARCHAR(60) NOT NULL,
    ContactMobile VARCHAR(15) NOT NULL,
    ResidentialCity VARCHAR(40) DEFAULT 'Barrackpore'
);

-- ----------------------------------------------------------------------------
-- Step 2: Create CHILD Table (STUDENT) with Foreign Key Constraint
-- ----------------------------------------------------------------------------
CREATE TABLE STUDENT (
    StudentID VARCHAR(10) PRIMARY KEY,
    StudentName VARCHAR(60) NOT NULL,
    Class VARCHAR(5) NOT NULL,
    Section CHAR(1) NOT NULL,
    RollNumber INT NOT NULL,
    ParentID VARCHAR(10), -- FOREIGN KEY referencing PARENTS(ParentID)
    
    CONSTRAINT fk_student_parent
        FOREIGN KEY (ParentID) 
        REFERENCES PARENTS(ParentID)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- ----------------------------------------------------------------------------
-- Step 3: Insert Parent Data FIRST (Correct Sequence)
-- ----------------------------------------------------------------------------
INSERT INTO PARENTS VALUES
('P001', 'Subhash Das', '9830112233', 'Barrackpore'),
('P002', 'Biplab Roy', '9830223344', 'Barrackpore'),
('P003', 'Tapan Pal', '9830334455', 'Naihati');

-- ----------------------------------------------------------------------------
-- Step 4: Insert Child Records
-- ----------------------------------------------------------------------------
INSERT INTO STUDENT VALUES
('S101', 'Mamata Das', 'XII', 'A', 1, 'P001'),
('S102', 'Susmita Roy', 'XII', 'A', 2, 'P002'),
('S103', 'Debangshu Pal', 'XII', 'B', 1, 'P003'),
('S104', 'Sachin Roy', 'XII', 'A', 3, 'P002'); -- Same parent P002 (Siblings - 1:N relationship!)

-- ----------------------------------------------------------------------------
-- Step 5: Test Foreign Key Violation (Inserting non-existent parent 'P999')
-- ----------------------------------------------------------------------------
-- The following query will FAIL with Error 1452:
-- INSERT INTO STUDENT VALUES ('S105', 'Ghost Student', 'XII', 'A', 5, 'P999');

-- ----------------------------------------------------------------------------
-- Step 6: Demonstrating ON DELETE CASCADE
-- ----------------------------------------------------------------------------
-- Deleting parent 'P002' will automatically delete students S102 (Susmita) and S104 (Sachin)
DELETE FROM PARENTS WHERE ParentID = 'P002';

-- Check resulting student table:
SELECT * FROM STUDENT;
