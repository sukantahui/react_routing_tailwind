-- ============================================================================
-- CBSE CLASS XII IT (802) - MODULE 001 : TOPIC 10
-- SQL SCRIPT: PRACTICE BENCHMARK DRILLS & QUERY EXERCISES
-- EDUCATOR: SUKANTA HUI | CODER & ACCOTAX, BARRACKPORE
-- ============================================================================

CREATE DATABASE IF NOT EXISTS CBSE_PracticeBenchDB;
USE CBSE_PracticeBenchDB;

-- 1. Setup Practice Table
CREATE TABLE ExamPracticeTable (
    CandidateID INT PRIMARY KEY AUTO_INCREMENT,
    CandidateName VARCHAR(60) NOT NULL,
    SubjectCode VARCHAR(10) DEFAULT '802',
    ScoreObtained INT CHECK (ScoreObtained BETWEEN 0 AND 30),
    TestTimestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Insert Test Submissions
INSERT INTO ExamPracticeTable (CandidateName, ScoreObtained) VALUES
('Mamata Das', 30),
('Susmita Roy', 29),
('Debangshu Pal', 28),
('Sachin Roy', 27);

-- 3. Query Top Scorers
SELECT CandidateID, CandidateName, ScoreObtained, 
       ROUND((ScoreObtained / 30.0) * 100, 2) AS Percentage
FROM ExamPracticeTable
ORDER BY ScoreObtained DESC;
