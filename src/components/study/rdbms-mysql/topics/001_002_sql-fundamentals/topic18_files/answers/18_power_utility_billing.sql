-- ============================================================================
-- SQL-PRJ-18: Smart Meter Power Utility & Commercial Bill Defaulters
-- Author: Sukanta Hui (Coder & AccoTax)
-- Database: MySQL 8.0+
-- ============================================================================

CREATE DATABASE IF NOT EXISTS power_distribution_db;
USE power_distribution_db;

DROP TABLE IF EXISTS power_meter_readings;
CREATE TABLE power_meter_readings (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    consumer_id VARCHAR(20) NOT NULL,
    consumer_name VARCHAR(80) NOT NULL,
    connection_type VARCHAR(20) NOT NULL,
    units_consumed INT NOT NULL,
    billing_month VARCHAR(7) NOT NULL,
    bill_amount DECIMAL(10, 2) NOT NULL,
    due_date DATE NOT NULL,
    payment_status VARCHAR(15) NOT NULL
);

INSERT INTO power_meter_readings (consumer_id, consumer_name, connection_type, units_consumed, billing_month, bill_amount, due_date, payment_status)
VALUES
    ('WBSED-DOM01', 'Swapan Kumar Paul',    'DOMESTIC',     210, '2026-08',  1470.00, '2026-09-15', 'PAID'),
    ('WBSED-COM02', 'Metro Cineplex',       'COMMERCIAL',  1850, '2026-08', 19420.00, '2026-09-10', 'UNPAID'),
    ('WBSED-DOM03', 'Alok Nath Ghosh',      'DOMESTIC',     150, '2026-08',   980.00, '2026-09-15', 'UNPAID'),
    ('WBSED-IND09', 'Bengal Jute Mills',    'INDUSTRIAL',  4200, '2026-08', 48500.00, '2026-09-08', 'UNPAID'),
    ('WBSED-DOM44', 'Soma Bhattacharya',    'DOMESTIC',     420, '2026-08',  3250.00, '2026-09-15', 'PAID'),
    ('WBSED-COM88', 'New Market ColdStore', 'COMMERCIAL',   620, '2026-08',  6820.00, '2026-09-10', 'UNPAID'),
    ('WBSED-COM91', 'Bhojohori Manna Cafe', 'COMMERCIAL',   310, '2026-08',  3250.00, '2026-09-10', 'PAID'),
    ('WBSED-IND12', 'Apex Plastic Molding', 'INDUSTRIAL',  3100, '2026-08', 35600.00, '2026-09-08', 'PAID');

-- Query: High-Value Commercial / Industrial Defaulters (>400 kWh or >₹5,000)
SELECT 
    id,
    consumer_id,
    consumer_name,
    connection_type,
    units_consumed,
    bill_amount,
    payment_status
FROM power_meter_readings
WHERE connection_type IN ('COMMERCIAL', 'INDUSTRIAL')
  AND payment_status = 'UNPAID'
  AND (units_consumed > 400 OR bill_amount > 5000.00)
ORDER BY bill_amount DESC;
