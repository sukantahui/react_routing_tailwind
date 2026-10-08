-- ============================================================================
-- CBSE CLASS XII IT (802) - MODULE 001 : TOPIC 9
-- MASTER SQL LABORATORY STARTER SCRIPT (COMPLETE MODULE 001 ENVIRONMENT)
-- EDUCATOR: SUKANTA HUI | CODER & ACCOTAX, BARRACKPORE
-- ============================================================================

CREATE DATABASE IF NOT EXISTS CBSE_IT802_Module001_Master;
USE CBSE_IT802_Module001_Master;

CREATE TABLE ParentsMaster (
    ParentID VARCHAR(10) PRIMARY KEY,
    FatherName VARCHAR(60) NOT NULL,
    MotherName VARCHAR(60) NOT NULL,
    EmergencyPhone VARCHAR(15) NOT NULL,
    City VARCHAR(40) DEFAULT 'Barrackpore'
);

CREATE TABLE StudentMaster (
    StudentID VARCHAR(10) PRIMARY KEY,
    AadhaarNumber CHAR(12) NOT NULL UNIQUE,
    StudentEmail VARCHAR(80) UNIQUE,
    FullName VARCHAR(60) NOT NULL,
    Class VARCHAR(5) NOT NULL,
    Section CHAR(1) NOT NULL,
    RollNumber INT NOT NULL,
    ParentID VARCHAR(10),
    CONSTRAINT fk_stu_parent FOREIGN KEY (ParentID) REFERENCES ParentsMaster(ParentID) ON DELETE CASCADE
);

CREATE TABLE AcademicMarks (
    MarkID INT PRIMARY KEY AUTO_INCREMENT,
    StudentID VARCHAR(10) NOT NULL,
    SubjectCode VARCHAR(10) NOT NULL,
    TheoryMarks DECIMAL(5,2),
    PracticalMarks DECIMAL(5,2),
    CONSTRAINT fk_marks_student FOREIGN KEY (StudentID) REFERENCES StudentMaster(StudentID) ON DELETE CASCADE
);
