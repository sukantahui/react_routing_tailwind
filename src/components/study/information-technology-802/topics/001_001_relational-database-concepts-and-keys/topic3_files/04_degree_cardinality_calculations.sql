-- ============================================================================
-- CBSE CLASS XII IT (802) - MODULE 001 : TOPIC 3
-- SQL SCRIPT: DEMONSTRATING DEGREE & CARDINALITY TABLE ALTERATIONS
-- EDUCATOR: SUKANTA HUI | CODER & ACCOTAX, BARRACKPORE
-- ============================================================================

CREATE DATABASE IF NOT EXISTS DegreeCardinalityLabDB;
USE DegreeCardinalityLabDB;

-- Step 1: Create Initial Table with 8 Columns (Degree = 8)
CREATE TABLE ItemMaster (
    ItemID INT PRIMARY KEY,
    ItemName VARCHAR(50) NOT NULL,
    Category VARCHAR(30) NOT NULL,
    UnitPrice DECIMAL(8,2) NOT NULL,
    QuantityInStock INT NOT NULL,
    SupplierCode VARCHAR(10) NOT NULL,
    ManufactureDate DATE NOT NULL,
    WarrantyMonths INT NOT NULL
);

-- Step 2: Insert 15 Rows (Cardinality = 15)
-- Step 3: Delete 4 Rows (Cardinality becomes 15 - 4 = 11)
-- Step 4: Add 3 Columns (Degree becomes 8 + 3 = 11)
ALTER TABLE ItemMaster 
    ADD Barcode VARCHAR(30),
    ADD DiscountRate DECIMAL(4,2),
    ADD MinOrderQty INT;
