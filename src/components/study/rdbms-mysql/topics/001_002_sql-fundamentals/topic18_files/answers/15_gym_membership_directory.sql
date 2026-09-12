-- ============================================================================
-- SQL-PRJ-15: Fitness Gym Member Directory & Phone Pattern Query
-- Author: Sukanta Hui (Coder & AccoTax)
-- Database: MySQL 8.0+
-- ============================================================================

CREATE DATABASE IF NOT EXISTS fitness_club_db;
USE fitness_club_db;

DROP TABLE IF EXISTS gym_members;
CREATE TABLE gym_members (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(80) NOT NULL,
    membership_tier VARCHAR(25) NOT NULL,
    phone_no VARCHAR(15) NOT NULL,
    join_date DATE NOT NULL,
    renewal_date DATE NOT NULL,
    monthly_fee DECIMAL(7, 2) NOT NULL,
    status VARCHAR(15) DEFAULT 'ACTIVE'
);

INSERT INTO gym_members (full_name, membership_tier, phone_no, join_date, renewal_date, monthly_fee, status)
VALUES
    ('Rakesh Karmakar',   'ANNUAL',       '9830124891', '2025-09-01', '2026-09-01', 1200.00, 'ACTIVE'),
    ('Pooja Shaw',        'MONTHLY',      '7003756890', '2026-07-10', '2026-08-10', 1800.00, 'ACTIVE'),
    ('Abhishek Bhattacharya','QUARTERLY', '8910452319', '2026-05-01', '2026-08-01', 1500.00, 'ACTIVE'),
    ('Debolina Sengupta', 'QUARTERLY',    '9831908421', '2026-06-15', '2026-09-15', 1500.00, 'ACTIVE'),
    ('Manish Tiwary',     'MONTHLY',      '9874551122', '2026-06-01', '2026-07-01', 1800.00, 'ACTIVE'),
    ('Avik Samanta',      'ANNUAL',       '9874192834', '2026-07-01', '2027-07-01', 1200.00, 'ACTIVE'),
    ('Moumita Roy',       'VIP_LIFETIME', '9830441100', '2024-01-10', '2029-01-10',  800.00, 'ACTIVE');

-- Batch Update: Mark overdue accounts as EXPIRED
UPDATE gym_members 
SET status = 'EXPIRED' 
WHERE renewal_date < '2026-09-01';

-- Query: Active Quarterly/Annual members with Kolkata 98-prefix mobile numbers
SELECT 
    id,
    full_name,
    membership_tier,
    phone_no,
    join_date,
    renewal_date,
    status
FROM gym_members
WHERE status = 'ACTIVE'
  AND membership_tier IN ('QUARTERLY', 'ANNUAL')
  AND phone_no LIKE '98%'
ORDER BY join_date ASC;
