-- ============================================================================
-- SQL-PRJ-10: Central Digital Library Circulation & Overdue Tracker
-- Author: Sukanta Hui (Coder & AccoTax)
-- Database: MySQL 8.0+
-- ============================================================================

CREATE DATABASE IF NOT EXISTS central_library_db;
USE central_library_db;

DROP TABLE IF EXISTS book_borrow_records;
CREATE TABLE book_borrow_records (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    member_id VARCHAR(15) NOT NULL,
    member_name VARCHAR(80) NOT NULL,
    book_title VARCHAR(120) NOT NULL,
    isbn VARCHAR(20) NOT NULL,
    borrow_date DATE NOT NULL,
    due_date DATE NOT NULL,
    return_date DATE NULL,
    fine_assessed DECIMAL(6, 2) DEFAULT 0.00
);

INSERT INTO book_borrow_records (member_id, member_name, book_title, isbn, borrow_date, due_date, return_date, fine_assessed)
VALUES
    ('LIB-8801', 'Subham Chatterjee', 'Database System Concepts',    '978-0078022159', '2026-08-10', '2026-08-25', NULL,         75.00),
    ('LIB-7420', 'Ankita Banerjee',   'Clean Code Handbook',         '978-0132350884', '2026-08-15', '2026-08-30', '2026-08-29',  0.00),
    ('LIB-9024', 'Rimpa Mondal',      'Intro to Algorithms (CLRS)',  '978-0262033848', '2026-08-18', '2026-09-01', NULL,         45.00),
    ('LIB-3319', 'Joydeep Pal',       'Design Patterns: GoF',        '978-0201633610', '2026-08-20', '2026-09-05', '2026-09-04',  0.00),
    ('LIB-4401', 'Sagnik Ghosh',      'Modern Operating Systems',    '978-0133591620', '2026-09-01', '2026-09-15', NULL,          0.00),
    ('LIB-8801', 'Subham Chatterjee', 'Clean Architecture',          '978-0134494166', '2026-08-22', '2026-09-05', NULL,         25.00),
    ('LIB-5512', 'Poulomi Das',       'Python Data Science Handbook','978-1491957660', '2026-08-25', '2026-09-09', '2026-09-08',  0.00);

-- Query: Overdue Loans as of audit date '2026-09-10'
SELECT 
    id,
    member_id,
    member_name,
    book_title,
    due_date,
    return_date,
    fine_assessed AS 'fine_amount'
FROM book_borrow_records
WHERE return_date IS NULL
  AND due_date < '2026-09-10'
ORDER BY due_date ASC;
