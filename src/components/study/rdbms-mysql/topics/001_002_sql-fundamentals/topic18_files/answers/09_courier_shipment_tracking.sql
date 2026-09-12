-- ============================================================================
-- SQL-PRJ-09: Courier Logistics & Express Parcel Shipment Tracker
-- Author: Sukanta Hui (Coder & AccoTax)
-- Database: MySQL 8.0+
-- ============================================================================

CREATE DATABASE IF NOT EXISTS express_logistics_db;
USE express_logistics_db;

DROP TABLE IF EXISTS shipments;
CREATE TABLE shipments (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    tracking_no VARCHAR(15) NOT NULL UNIQUE,
    sender_city VARCHAR(40) NOT NULL,
    dest_city VARCHAR(40) NOT NULL,
    weight_kg DECIMAL(5, 2) NOT NULL,
    dispatch_date DATE NOT NULL,
    delivery_status VARCHAR(20) NOT NULL,
    cod_amount DECIMAL(8, 2) DEFAULT 0.00
);

INSERT INTO shipments (tracking_no, sender_city, dest_city, weight_kg, dispatch_date, delivery_status, cod_amount)
VALUES
    ('EXP-10492', 'Kolkata',   'Delhi',     1.20, '2026-09-01', 'IN_TRANSIT',       650.00),
    ('EXP-20419', 'Kolkata',   'Mumbai',    5.80, '2026-09-02', 'IN_TRANSIT',      1450.00),
    ('STD-99018', 'Bengaluru', 'Kolkata',   3.50, '2026-09-01', 'OUT_FOR_DELIVERY',   0.00),
    ('EXP-8812',  'Delhi',     'Kolkata',   2.80, '2026-09-02', 'IN_TRANSIT',       890.00),
    ('EXP-38102', 'Chennai',   'Kolkata',   4.20, '2026-09-03', 'OUT_FOR_DELIVERY',   0.00),
    ('EXP-99041', 'Kolkata',   'Hyderabad', 0.80, '2026-09-03', 'BOOKED',           450.00),
    ('EXP-77120', 'Pune',      'Kolkata',   6.10, '2026-08-30', 'DELIVERED',          0.00);

-- Update status of specific tracking parcel
UPDATE shipments 
SET delivery_status = 'DELIVERED' 
WHERE tracking_no = 'EXP-10492';

-- Query: Active Express ('EXP-_____') shipments > 2.5kg
SELECT 
    id,
    tracking_no,
    sender_city,
    dest_city,
    weight_kg,
    dispatch_date,
    delivery_status,
    cod_amount
FROM shipments
WHERE tracking_no LIKE 'EXP-_____'
  AND delivery_status IN ('IN_TRANSIT', 'OUT_FOR_DELIVERY')
  AND weight_kg > 2.50
ORDER BY weight_kg DESC;
