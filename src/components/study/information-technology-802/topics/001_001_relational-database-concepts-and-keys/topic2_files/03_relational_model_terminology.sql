-- ============================================================================
-- CBSE CLASS XII IT (802) - MODULE 001 : TOPIC 2
-- SQL SCRIPT: DEMONSTRATING RELATIONAL MODEL TERMINOLOGY IN MYSQL
-- EDUCATOR: SUKANTA HUI | CODER & ACCOTAX, BARRACKPORE
-- ============================================================================

CREATE DATABASE IF NOT EXISTS RelationalModelTerminologyDB;
USE RelationalModelTerminologyDB;

-- ----------------------------------------------------------------------------
-- 1. Defining a Relation (Table Schema) with 5 Attributes (Degree = 5)
-- ----------------------------------------------------------------------------
CREATE TABLE StudentMarksheet (
    RollNo INT PRIMARY KEY,                       -- Attribute 1 (Domain: 1-100)
    StudentName VARCHAR(60) NOT NULL,             -- Attribute 2 (Domain: Text Strings)
    Class VARCHAR(5) NOT NULL,                    -- Attribute 3 (Domain: Roman Numerals)
    TheoryMarks DECIMAL(5,2) NOT NULL,            -- Attribute 4 (Domain: 0.00 to 70.00)
    PracticalMarks DECIMAL(5,2) NOT NULL,         -- Attribute 5 (Domain: 0.00 to 30.00)
    
    -- Domain Constraint Validations
    CONSTRAINT chk_theory CHECK (TheoryMarks BETWEEN 0.00 AND 70.00),
    CONSTRAINT chk_practical CHECK (PracticalMarks BETWEEN 0.00 AND 30.00)
);

-- ----------------------------------------------------------------------------
-- 2. Inserting Tuples (Rows/Records) -> Each INSERT creates 1 Tuple
-- ----------------------------------------------------------------------------
INSERT INTO StudentMarksheet (RollNo, StudentName, Class, TheoryMarks, PracticalMarks) VALUES
(101, 'Mamata Das', 'XII', 68.50, 30.00),    -- Tuple 1
(102, 'Susmita Roy', 'XII', 65.00, 29.50),   -- Tuple 2
(103, 'Debangshu Pal', 'XII', 62.00, 28.00), -- Tuple 3
(104, 'Sachin Roy', 'XII', 58.00, 27.00),    -- Tuple 4
(105, 'Swadeep Roy', 'XII', 66.50, 29.00);   -- Tuple 5

-- ----------------------------------------------------------------------------
-- 3. Inspecting Table Dimensions (Degree & Cardinality)
-- ----------------------------------------------------------------------------
-- In this state:
-- Degree = 5 (Attributes: RollNo, StudentName, Class, TheoryMarks, PracticalMarks)
-- Cardinality = 5 (5 student tuples)

-- Inspecting column definitions (Attributes & Domains)
DESCRIBE StudentMarksheet;

-- Calculating Total Marks Declaratively
SELECT 
    RollNo, 
    StudentName, 
    TheoryMarks, 
    PracticalMarks, 
    (TheoryMarks + PracticalMarks) AS TotalScore,
    CASE 
        WHEN (TheoryMarks + PracticalMarks) >= 90 THEN 'A+'
        WHEN (TheoryMarks + PracticalMarks) >= 80 THEN 'A'
        WHEN (TheoryMarks + PracticalMarks) >= 70 THEN 'B'
        ELSE 'C'
    END AS Grade
FROM StudentMarksheet
ORDER BY TotalScore DESC;
