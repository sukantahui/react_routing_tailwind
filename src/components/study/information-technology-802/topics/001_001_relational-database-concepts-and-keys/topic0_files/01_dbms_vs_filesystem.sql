-- ============================================================================
-- CBSE CLASS XII IT (802) - MODULE 001 : TOPIC 0
-- SQL SCRIPT: DEMONSTRATING CENTRALIZED RELATIONAL SCHEMA VS FLAT FILES
-- EDUCATOR: SUKANTA HUI | CODER & ACCOTAX, BARRACKPORE
-- ============================================================================

-- Step 1: Create a Centralized School Database
CREATE DATABASE IF NOT EXISTS CentralizedSchoolDB;
USE CentralizedSchoolDB;

-- Step 2: Master Student Table (Stores personal details ONCE - Zero Redundancy)
CREATE TABLE StudentMaster (
    StudentID VARCHAR(10) PRIMARY KEY,
    FullName VARCHAR(60) NOT NULL,
    Gender CHAR(1) CHECK (Gender IN ('M', 'F', 'O')),
    DOB DATE NOT NULL,
    GuardianName VARCHAR(60) NOT NULL,
    ContactPhone VARCHAR(15) NOT NULL,
    Address VARCHAR(100) DEFAULT 'Barrackpore, Kolkata',
    EnrollmentDate DATE NOT NULL
);

-- Step 3: Academic Marks Table (Referencing Master table via Foreign Key)
CREATE TABLE AcademicMarks (
    MarkID INT PRIMARY KEY AUTO_INCREMENT,
    StudentID VARCHAR(10) NOT NULL,
    SubjectCode VARCHAR(10) NOT NULL,
    SubjectName VARCHAR(40) NOT NULL,
    TheoryMarks DECIMAL(5,2) CHECK (TheoryMarks BETWEEN 0 AND 70),
    PracticalMarks DECIMAL(5,2) CHECK (PracticalMarks BETWEEN 0 AND 30),
    TotalMarks DECIMAL(5,2) GENERATED ALWAYS AS (TheoryMarks + PracticalMarks) STORED,
    CONSTRAINT fk_marks_student FOREIGN KEY (StudentID) REFERENCES StudentMaster(StudentID) ON DELETE CASCADE
);

-- Step 4: Fees Ledger Table (Referencing Master table - Guaranteed Consistency)
CREATE TABLE FeesLedger (
    ReceiptNo INT PRIMARY KEY AUTO_INCREMENT,
    StudentID VARCHAR(10) NOT NULL,
    Quarter VARCHAR(10) NOT NULL,
    AmountPaid DECIMAL(8,2) NOT NULL,
    PaymentDate DATE NOT NULL,
    PaymentMode VARCHAR(20) DEFAULT 'UPI',
    CONSTRAINT fk_fees_student FOREIGN KEY (StudentID) REFERENCES StudentMaster(StudentID) ON DELETE RESTRICT
);

-- Step 5: Insert Sample Master Records
INSERT INTO StudentMaster (StudentID, FullName, Gender, DOB, GuardianName, ContactPhone, Address, EnrollmentDate) VALUES
('S1001', 'Mamata Das', 'F', '2008-04-12', 'Subhash Das', '9830112233', 'Chandan Pukur, Barrackpore', '2025-04-01'),
('S1002', 'Susmita Roy', 'F', '2008-09-25', 'Biplab Roy', '9830223344', 'Shibtala Road, Barrackpore', '2025-04-01'),
('S1003', 'Debangshu Pal', 'M', '2008-01-18', 'Tapan Pal', '9830334455', 'Naihati, West Bengal', '2025-04-01'),
('S1004', 'Sachin Roy', 'M', '2007-11-05', 'Ashok Roy', '9830445566', 'Shyamnagar, West Bengal', '2025-04-01');

-- Step 6: Insert Marks for CBSE IT (802)
INSERT INTO AcademicMarks (StudentID, SubjectCode, SubjectName, TheoryMarks, PracticalMarks) VALUES
('S1001', '802', 'Information Technology', 58.50, 29.00),
('S1002', '802', 'Information Technology', 64.00, 30.00),
('S1003', '802', 'Information Technology', 62.00, 28.50),
('S1004', '802', 'Information Technology', 55.00, 27.00);

-- Step 7: Declarative ANSI SQL Query replacing custom procedural code
SELECT 
    S.StudentID,
    S.FullName,
    S.ContactPhone,
    M.SubjectName,
    M.TheoryMarks,
    M.PracticalMarks,
    M.TotalMarks
FROM StudentMaster S
JOIN AcademicMarks M ON S.StudentID = M.StudentID
WHERE M.TotalMarks >= 80.00
ORDER BY M.TotalMarks DESC;
