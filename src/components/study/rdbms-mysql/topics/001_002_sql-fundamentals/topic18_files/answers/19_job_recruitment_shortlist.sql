-- ============================================================================
-- SQL-PRJ-19: IT Job Recruitment Portal & Candidate Shortlisting Pipeline
-- Author: Sukanta Hui (Coder & AccoTax)
-- Database: MySQL 8.0+
-- ============================================================================

CREATE DATABASE IF NOT EXISTS recruitment_portal_db;
USE recruitment_portal_db;

DROP TABLE IF EXISTS job_candidates;
CREATE TABLE job_candidates (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    candidate_name VARCHAR(80) NOT NULL,
    applied_role VARCHAR(50) NOT NULL,
    experience_years DECIMAL(3, 1) NOT NULL,
    primary_skill VARCHAR(80) NOT NULL,
    expected_ctc_lpa DECIMAL(4, 2) NOT NULL,
    notice_period_days INT NOT NULL,
    status VARCHAR(20) DEFAULT 'APPLIED'
);

INSERT INTO job_candidates (candidate_name, applied_role, experience_years, primary_skill, expected_ctc_lpa, notice_period_days, status)
VALUES
    ('Sayantan Ghosh',   'Frontend Engineer',    2.5, 'React, Tailwind, HTML5',   7.50, 15, 'APPLIED'),
    ('Nilanjan Dutta',   'Full Stack Developer', 4.5, 'React, Node, MySQL',       12.50, 15, 'APPLIED'),
    ('Aniket Chakraborty','Data Scientist',      5.0, 'Python, Scikit-learn, SQL', 18.00, 60, 'APPLIED'),
    ('Deepanjan Roy',    'Full Stack Developer', 9.5, 'React, Spring Boot, MySQL',24.00, 30, 'APPLIED'),
    ('Somnath Banerjee', 'DevOps Engineer',      5.0, 'Python, Docker, AWS',      15.00, 30, 'APPLIED'),
    ('Rupak Mondal',     'Frontend Engineer',    4.0, 'Vue.js, CSS, JavaScript',  10.00, 15, 'APPLIED'),
    ('Anwesha Roy',      'Full Stack Developer', 6.0, 'React, Django, SQL',       17.50, 30, 'APPLIED'),
    ('Kaushik Paul',     'DevOps Engineer',      3.5, 'Linux, Bash, Kubernetes',  14.00, 90, 'APPLIED');

-- Query: Senior Full Stack / DevOps (3-8 Yrs Exp, CTC <= 18.5 LPA, Notice <= 30 Days, React/Python)
SELECT 
    id,
    candidate_name,
    applied_role,
    experience_years,
    primary_skill,
    expected_ctc_lpa,
    notice_period_days
FROM job_candidates
WHERE applied_role IN ('Full Stack Developer', 'DevOps Engineer')
  AND experience_years BETWEEN 3.0 AND 8.0
  AND expected_ctc_lpa <= 18.50
  AND notice_period_days <= 30
  AND (primary_skill LIKE '%React%' OR primary_skill LIKE '%Python%')
ORDER BY expected_ctc_lpa ASC;
