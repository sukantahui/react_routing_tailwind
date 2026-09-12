-- ============================================================================
-- SQL-PRJ-01: E-Commerce Product Catalog Schema & Price Filter
-- Author: Sukanta Hui (Coder & AccoTax)
-- Database: MySQL 8.0+
-- ============================================================================

-- Step 1: Create Database & Select Schema
CREATE DATABASE IF NOT EXISTS ecommerce_store_db;
USE ecommerce_store_db;

-- Step 2: DDL - Create Table Definition with BIGINT UNSIGNED Primary Key
DROP TABLE IF EXISTS products;
CREATE TABLE products (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    stock_qty INT DEFAULT 0,
    supplier_email VARCHAR(120)
);

-- Step 3: DML - Batch Insert Seed Records
INSERT INTO products (product_name, category, unit_price, stock_qty, supplier_email)
VALUES 
    ('Noise-Cancel Headset Pro', 'Electronics', 6999.00, 30, 'techsupply@audiohub.in'),
    ('Solid Teak Study Table', 'Furniture', 14500.00, 10, 'crafts@bengaltimber.com'),
    ('Wireless Mouse M330 Silent', 'Electronics', 899.00, 120, 'sales@peripherals.co.in'),
    ('Ultra HD 4K Monitor 27-inch', 'Electronics', 28500.00, 15, 'displays@visiontech.in'),
    ('RGB Mechanical Gaming Keyboard', 'Electronics', 3499.00, 45, 'gaming@peripherals.co.in');

-- Step 4: DQL - Targeted Analytical Query with Aliasing & Sorting
SELECT 
    id AS 'ID',
    product_name AS 'Item Name',
    category AS 'Category',
    unit_price AS 'Price (INR)',
    stock_qty AS 'In Stock'
FROM products
WHERE category = 'Electronics' 
  AND unit_price <= 25000.00
ORDER BY unit_price ASC;
