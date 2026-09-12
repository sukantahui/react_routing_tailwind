-- ============================================================================
-- SQL-PRJ-11: Pharmacy Batch Inventory & Expiry Risk Alert System
-- Author: Sukanta Hui (Coder & AccoTax)
-- Database: MySQL 8.0+
-- ============================================================================

CREATE DATABASE IF NOT EXISTS pharmacy_retail_db;
USE pharmacy_retail_db;

DROP TABLE IF EXISTS pharmacy_batches;
CREATE TABLE pharmacy_batches (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    medicine_name VARCHAR(100) NOT NULL,
    manufacturer VARCHAR(80) NOT NULL,
    batch_no VARCHAR(25) NOT NULL UNIQUE,
    mfg_date DATE NOT NULL,
    expiry_date DATE NOT NULL,
    mrp DECIMAL(8, 2) NOT NULL,
    stock_qty INT NOT NULL
);

INSERT INTO pharmacy_batches (medicine_name, manufacturer, batch_no, mfg_date, expiry_date, mrp, stock_qty)
VALUES
    ('Amoxicillin 250mg DT',  'Sun Pharma',   'AMX-4401',   '2024-12-01', '2026-12-20',  85.00,  85),
    ('Azithromycin 500mg',    'Cipla Ltd',    'AZ-2024-09', '2024-09-15', '2026-09-30', 118.50,  15),
    ('Telmisartan 40mg',      'Torrent Labs', 'TEL-9912',   '2025-01-10', '2027-01-15', 145.00,  60),
    ('Montelukast 10mg',      'Mankind',      'MON-1002',   '2025-03-01', '2027-03-01',  92.00,  40),
    ('Paracetamol 650mg',     'Micro Labs',   'PCM-8910',   '2024-11-01', '2026-11-15',  32.00,  12),
    ('Cetirizine 10mg',       'Dr Reddys',    'CET-3301',   '2025-02-01', '2027-02-01',  45.00, 150),
    ('Pantoprazole 40mg',     'Alkem Labs',   'PAN-9002',   '2025-04-10', '2027-04-10',  95.00,   8),
    ('Vitamin C Chewable',    'Abbott',       'VTC-7721',   '2024-10-01', '2026-10-15',  75.00,  50);

-- Query: Impending Expiration (Sep-Dec 2026) OR Critical Stock Shortage (<= 20)
SELECT 
    id,
    medicine_name,
    batch_no,
    expiry_date,
    mrp AS 'mrp (INR)',
    stock_qty AS 'stock'
FROM pharmacy_batches
WHERE (expiry_date BETWEEN '2026-09-01' AND '2026-12-31')
   OR (stock_qty <= 20)
ORDER BY expiry_date ASC, stock_qty ASC;
