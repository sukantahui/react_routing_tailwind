#!/bin/bash
# Practical example: Database configuration script
# For Barrackpore College student management

DB_NAME="student_db"
TABLE_NAME="students_2024"
ADMIN_EMAIL="admin@barrackporecollege.edu"

# Generate SQL script using here document
cat <<SQL_SCRIPT
-- Database: $DB_NAME
-- Generated: $(date)
-- Admin: $ADMIN_EMAIL

CREATE DATABASE IF NOT EXISTS \`$DB_NAME\`;
USE \`$DB_NAME\`;

CREATE TABLE IF NOT EXISTS \`$TABLE_NAME\` (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id VARCHAR(20) UNIQUE NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    department VARCHAR(50),
    enrollment_date DATE DEFAULT (CURRENT_DATE),
    email VARCHAR(100),
    phone VARCHAR(15),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert sample data for Shyamnagar branch
INSERT INTO \`$TABLE_NAME\` 
    (student_id, full_name, department, email, phone)
VALUES
    ('2024BC001', 'Tuhina Das', 'Computer Science', 'tuhina@student.bc.edu', '9876543210'),
    ('2024BC002', 'Swadeep Roy', 'Mathematics', 'swadeep@student.bc.edu', '9876543211'),
    ('2024BC003', 'Abhronila Sen', 'Physics', 'abhronila@student.bc.edu', '9876543212'),
    ('2024BC004', 'Debangshu Ghosh', 'Chemistry', 'debangshu@student.bc.edu', '9876543213');

-- Create indexes for better performance
CREATE INDEX idx_department ON \`$TABLE_NAME\`(department);
CREATE INDEX idx_enrollment_date ON \`$TABLE_NAME\`(enrollment_date);

-- Generate report
SELECT 
    department,
    COUNT(*) as total_students,
    MIN(enrollment_date) as first_enrollment,
    MAX(enrollment_date) as latest_enrollment
FROM \`$TABLE_NAME\`
GROUP BY department
ORDER BY total_students DESC;
SQL_SCRIPT

echo "SQL script generated successfully!"
echo "Use: mysql -u root -p < this_script.sql"