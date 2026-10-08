-- ============================================================================
-- CBSE CLASS XII IT (802) - MODULE 001 : TOPIC 5
-- SQL SCRIPT: DEMONSTRATING RELATIONAL KEYS ARCHITECTURE IN MYSQL
-- EDUCATOR: SUKANTA HUI | CODER & ACCOTAX, BARRACKPORE
-- ============================================================================

CREATE DATABASE IF NOT EXISTS RelationalKeysLabDB;
USE RelationalKeysLabDB;

CREATE TABLE StudentRegistration (
    AdmissionNo VARCHAR(10) PRIMARY KEY,       -- PRIMARY KEY
    AadhaarNo CHAR(12) NOT NULL UNIQUE,        -- ALTERNATE KEY 1
    StudentEmail VARCHAR(80) UNIQUE,           -- ALTERNATE KEY 2
    FullName VARCHAR(60) NOT NULL,
    DOB DATE NOT NULL
);

CREATE TABLE ClassRollMaster (
    Class VARCHAR(5) NOT NULL,
    Section CHAR(1) NOT NULL,
    RollNumber INT NOT NULL,
    StudentName VARCHAR(60) NOT NULL,
    PRIMARY KEY (Class, Section, RollNumber) -- COMPOSITE PRIMARY KEY
);
