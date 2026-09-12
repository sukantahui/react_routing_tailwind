-- ============================================================================
-- SQL-PRJ-13: Automobile Dealership Inventory & Schema Refactoring
-- Author: Sukanta Hui (Coder & AccoTax)
-- Database: MySQL 8.0+
-- ============================================================================

CREATE DATABASE IF NOT EXISTS auto_showroom_db;
USE auto_showroom_db;

DROP TABLE IF EXISTS vehicles;
CREATE TABLE vehicles (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    vin VARCHAR(20) NOT NULL UNIQUE,
    make VARCHAR(40) NOT NULL,
    model VARCHAR(60) NOT NULL,
    model_year INT NOT NULL,
    fuel_type VARCHAR(20) NOT NULL,
    showroom_price DECIMAL(12, 2) NOT NULL,
    dealer_notes TEXT
);

-- Schema Refactoring
ALTER TABLE vehicles RENAME COLUMN showroom_price TO ex_showroom_price;
ALTER TABLE vehicles DROP COLUMN dealer_notes;

INSERT INTO vehicles (vin, make, model, model_year, fuel_type, ex_showroom_price)
VALUES
    ('VIN-EV-2025-0019', 'Tata',    'Nexon EV LR',   2025, 'ELECTRIC', 1699000.00),
    ('VIN-PT-2024-8801', 'Hyundai', 'Creta SX(O)',   2024, 'PETROL',   1850000.00),
    ('VIN-HY-2025-0482', 'Toyota',  'Hyryder',       2025, 'HYBRID',   1985000.00),
    ('VIN-EV-2024-9182', 'MG',      'ZS EV',         2024, 'ELECTRIC', 2250000.00),
    ('VIN-EV-2026-0001', 'Kia',     'EV6 GT-Line',   2026, 'ELECTRIC', 6590000.00),
    ('VIN-HY-2023-1104', 'Honda',   'City e:HEV',    2023, 'HYBRID',   1920000.00),
    ('VIN-DS-2024-7719', 'Mahindra','XUV700 AX7',    2024, 'DIESEL',   2150000.00);

-- Query: EV or Hybrid (2023-2026) under ₹30 Lakhs
SELECT 
    id,
    vin,
    make,
    model,
    model_year,
    fuel_type,
    ex_showroom_price
FROM vehicles
WHERE fuel_type IN ('ELECTRIC', 'HYBRID')
  AND model_year BETWEEN 2023 AND 2026
  AND ex_showroom_price <= 3000000.00
ORDER BY model_year DESC, ex_showroom_price ASC;
