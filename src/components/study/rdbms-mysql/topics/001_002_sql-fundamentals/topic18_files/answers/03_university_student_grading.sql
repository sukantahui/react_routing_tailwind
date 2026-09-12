-- ============================================================================
-- SQL-PRJ-03: University Student Grading & Honors Directory
-- Author: Sukanta Hui (Coder & AccoTax)
-- Database: MySQL 8.0+
-- ============================================================================

CREATE DATABASE IF NOT EXISTS university_records_db;
USE university_records_db;

DROP TABLE IF EXISTS students;
CREATE TABLE students (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    roll_no INT NOT NULL UNIQUE,
    student_name VARCHAR(100) NOT NULL,
    department VARCHAR(30) NOT NULL,
    semester INT NOT NULL,
    gpa FLOAT
);

-- Schema Evolution via ALTER TABLE
ALTER TABLE students ADD COLUMN email VARCHAR(150);
ALTER TABLE students MODIFY COLUMN gpa DECIMAL(3, 2) NOT NULL;

INSERT INTO students (roll_no, student_name, department, semester, gpa, email)
VALUES
    (101, 'Debjit Roy', 'CSE', 6, 3.92, 'debjit.roy@univ.edu.in'),
    (102, 'Sourav Mukherjee', 'CSE', 6, 3.65, 'sourav.m@univ.edu.in'),
    (103, 'Madhurima Das', 'ECE', 6, 3.88, 'madhurima.d@univ.edu.in'),
    (104, 'Priya Chakraborty', 'IT', 6, 3.78, 'priya.c@univ.edu.in'),
    (105, 'Arpan Ghosh', 'CSE', 4, 3.95, 'arpan.g@univ.edu.in'),
    (106, 'Sneha Dutta', 'IT', 6, 3.40, 'sneha.d@univ.edu.in');

-- Query: CSE/IT Sem 6 Honors Students (GPA >= 3.50)
SELECT 
    id,
    roll_no,
    student_name,
    department,
    semester,
    gpa,
    email
FROM students
WHERE department IN ('CSE', 'IT')
  AND semester = 6
  AND gpa >= 3.50
ORDER BY gpa DESC;
