-- ============================================================================
-- SQL-PRJ-08: Hotel Room Booking & Table Maintenance (TRUNCATE vs DROP)
-- Author: Sukanta Hui (Coder & AccoTax)
-- Database: MySQL 8.0+
-- ============================================================================

CREATE DATABASE IF NOT EXISTS grand_resort_db;
USE grand_resort_db;

-- 1. Main Booking Relation
DROP TABLE IF EXISTS room_bookings;
CREATE TABLE room_bookings (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    guest_name VARCHAR(100) NOT NULL,
    room_category VARCHAR(40) NOT NULL,
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    nightly_rate DECIMAL(10, 2) NOT NULL,
    total_bill DECIMAL(10, 2) NOT NULL
);

-- 2. Staging Table for Marketing Leads
DROP TABLE IF EXISTS temp_web_leads;
CREATE TABLE temp_web_leads (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    guest_name VARCHAR(100),
    phone VARCHAR(15)
);

-- 3. Obsolete Table for Demonstration of DROP
CREATE TABLE IF NOT EXISTS legacy_scratchpad_2020 (id BIGINT UNSIGNED);

-- Populate Main Bookings
INSERT INTO room_bookings (guest_name, room_category, check_in_date, check_out_date, nightly_rate, total_bill)
VALUES
    ('Rahul Banerjee',  'Deluxe Suite',   '2026-10-02', '2026-10-06', 8000.00, 32000.00),
    ('Moumita Sen',     'Standard Room',  '2026-10-05', '2026-10-07', 3500.00,  7000.00),
    ('Kalyan Roy',      'Executive Room', '2026-10-08', '2026-10-09', 6500.00,  6500.00),
    ('Saptarshi Sen',   'Executive Room', '2026-10-10', '2026-10-13', 6500.00, 19500.00),
    ('Deepak Sharma',   'Standard Room',  '2026-10-15', '2026-10-18', 3500.00, 10500.00),
    ('Sharmistha Roy',  'Deluxe Suite',   '2026-10-18', '2026-10-22', 8500.00, 34000.00);

-- Populate Temp Leads
INSERT INTO temp_web_leads (guest_name, phone) VALUES ('Lead Test User', '9830011223');

-- Maintenance: Wipe staging table while keeping schema
TRUNCATE TABLE temp_web_leads;

-- Maintenance: Permanently remove legacy relation
DROP TABLE IF EXISTS legacy_scratchpad_2020;

-- Query: Premium Suite/Executive Stays >= 15k
SELECT 
    id,
    guest_name,
    room_category,
    check_in_date,
    check_out_date,
    total_bill
FROM room_bookings
WHERE room_category IN ('Deluxe Suite', 'Executive Room')
  AND total_bill >= 15000.00
ORDER BY check_in_date ASC;
