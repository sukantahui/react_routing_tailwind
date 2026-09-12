-- ============================================================================
-- SQL-PRJ-16: Online Examination Portal & Student Result Classification
-- Author: Sukanta Hui (Coder & AccoTax)
-- Database: MySQL 8.0+
-- ============================================================================

CREATE DATABASE IF NOT EXISTS exam_portal_db;
USE exam_portal_db;

DROP TABLE IF EXISTS exam_submissions;
CREATE TABLE exam_submissions (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    reg_no VARCHAR(20) NOT NULL,
    student_name VARCHAR(80) NOT NULL,
    subject_code VARCHAR(15) NOT NULL,
    total_marks INT NOT NULL,
    attempt_number INT DEFAULT 1,
    grade VARCHAR(5) NOT NULL
);

INSERT INTO exam_submissions (reg_no, student_name, subject_code, total_marks, attempt_number, grade)
VALUES
    ('REG-202601', 'Arjun Sengupta',  'CS-101', 88, 1, 'O'),
    ('REG-202602', 'Payel Dey',       'MA-201', 52, 2, 'B'),
    ('REG-202603', 'Indranil Nandi',  'CS-101', 28, 1, 'F'),
    ('REG-202604', 'Koushik Saha',    'EC-301', 35, 1, 'F'),
    ('REG-202605', 'Bikash Roy',      'CS-101', 48, 2, 'C'),
    ('REG-202606', 'Megha Bhattacharya','CS-101', 94, 1, 'O'),
    ('REG-202607', 'Sayani Majumdar', 'MA-201', 34, 2, 'F'),
    ('REG-202608', 'Debabrata Pal',   'MA-201', 76, 1, 'A');

-- Query: CS-101 or MA-201 candidates needing remediation (< 40 marks OR repeat attempts)
SELECT 
    id,
    reg_no,
    student_name,
    subject_code,
    total_marks,
    attempt_number,
    grade
FROM exam_submissions
WHERE subject_code IN ('CS-101', 'MA-201')
  AND (total_marks < 40 OR attempt_number > 1)
ORDER BY total_marks ASC;
