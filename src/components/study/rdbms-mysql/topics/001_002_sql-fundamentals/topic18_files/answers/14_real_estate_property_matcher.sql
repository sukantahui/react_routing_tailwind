-- ============================================================================
-- SQL-PRJ-14: Real Estate Property Listings & Budget Matcher
-- Author: Sukanta Hui (Coder & AccoTax)
-- Database: MySQL 8.0+
-- ============================================================================

CREATE DATABASE IF NOT EXISTS realestate_db;
USE realestate_db;

DROP TABLE IF EXISTS properties;
CREATE TABLE properties (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(120) NOT NULL,
    property_type VARCHAR(30) NOT NULL,
    locality VARCHAR(50) NOT NULL,
    carpet_area_sqft INT NOT NULL,
    price_lakhs DECIMAL(6, 2) NOT NULL,
    possession_status VARCHAR(25) NOT NULL,
    agent_phone VARCHAR(15)
);

INSERT INTO properties (title, property_type, locality, carpet_area_sqft, price_lakhs, possession_status, agent_phone)
VALUES
    ('Riverside Greens 3BHK',    'Apartment', 'Barrackpore', 1280,  68.50, 'READY_TO_MOVE',      '9830012345'),
    ('Silver Oak Studio 1BHK',   'Apartment', 'New Town',     480,  32.00, 'READY_TO_MOVE',      '9831122334'),
    ('Merlin Waterfront 2BHK',   'Apartment', 'Howrah',       890,  55.00, 'UNDER_CONSTRUCTION', '9874112233'),
    ('EcoSpace Urban Heights',   'Apartment', 'Rajarhat',    1350,  88.00, 'READY_TO_MOVE',      '9830099887'),
    ('Skyline Penthouse 4BHK',   'Penthouse', 'New Town',    2400, 210.00, 'READY_TO_MOVE',      '9831001122'),
    ('Greenfield Prime Plot',    'Plot',      'Barrackpore', 1500,  45.00, 'READY_TO_MOVE',      '9830012345'),
    ('Magnolia Lakefront Villa', 'Villa',     'New Town',    1850, 125.00, 'UNDER_CONSTRUCTION', '9874112233');

-- Query: 3BHK/Villa in Barrackpore/Rajarhat/New Town, Area >= 1100, Budget 65-135 Lakhs
SELECT 
    id,
    title,
    property_type,
    locality,
    carpet_area_sqft,
    price_lakhs,
    possession_status
FROM properties
WHERE property_type IN ('Apartment', 'Villa')
  AND locality IN ('Barrackpore', 'Rajarhat', 'New Town')
  AND carpet_area_sqft >= 1100
  AND price_lakhs BETWEEN 65.00 AND 135.00
ORDER BY price_lakhs ASC;
