-- ============================================================================
-- SQL-PRJ-02: Hospital Inpatient Admission & Active Patient Audit
-- Author: Sukanta Hui (Coder & AccoTax)
-- Database: MySQL 8.0+
-- ============================================================================

CREATE DATABASE IF NOT EXISTS hospital_care_db;
USE hospital_care_db;

DROP TABLE IF EXISTS inpatient_admissions;
CREATE TABLE inpatient_admissions (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    patient_name VARCHAR(80) NOT NULL,
    ward_no VARCHAR(10) NOT NULL,
    admission_date DATE NOT NULL,
    discharge_date DATE NULL,
    attending_doctor VARCHAR(80)
);

INSERT INTO inpatient_admissions (patient_name, ward_no, admission_date, discharge_date, attending_doctor)
VALUES
    ('Ramesh Chandra Roy', 'GEN-04', '2026-07-28', '2026-08-04', 'Dr. S. Chatterjee'),
    ('Ananya Sen', 'ICU-02', '2026-08-05', NULL, 'Dr. P. Mukherjee'),
    ('Bimal Krishna Das', 'GEN-11', '2026-08-10', '2026-08-16', 'Dr. S. Chatterjee'),
    ('Rajesh Mukherjee', 'GEN-14', '2026-08-18', NULL, 'Dr. A. Sengupta'),
    ('Kalyani Banerjee', 'PVT-08', '2026-07-15', '2026-08-02', 'Dr. P. Mukherjee'),
    ('Sunita Ghosh', 'CCU-01', '2026-08-25', NULL, 'Dr. A. Sengupta');

-- Query: Active August Admissions (Discharge is NULL)
SELECT 
    id,
    patient_name,
    ward_no,
    admission_date,
    discharge_date,
    attending_doctor
FROM inpatient_admissions
WHERE discharge_date IS NULL
  AND admission_date BETWEEN '2026-08-01' AND '2026-08-31'
ORDER BY admission_date ASC;
