-- ============================================================================
-- SQL-PRJ-06: Airline Flight Schedule & Dynamic Fare Search
-- Author: Sukanta Hui (Coder & AccoTax)
-- Database: MySQL 8.0+
-- ============================================================================

CREATE DATABASE IF NOT EXISTS airline_operations_db;
USE airline_operations_db;

DROP TABLE IF EXISTS flights;
CREATE TABLE flights (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    flight_code VARCHAR(10) NOT NULL,
    airline_name VARCHAR(50) NOT NULL,
    origin_city VARCHAR(40) NOT NULL,
    dest_city VARCHAR(40) NOT NULL,
    departure_time TIME NOT NULL,
    arrival_time TIME NOT NULL,
    economy_fare DECIMAL(8, 2) NOT NULL
);

INSERT INTO flights (flight_code, airline_name, origin_city, dest_city, departure_time, arrival_time, economy_fare)
VALUES
    ('6E-205',  'IndiGo',     'Kolkata', 'Bengaluru', '06:15:00', '08:45:00', 4850.00),
    ('SG-401',  'SpiceJet',   'Kolkata', 'Delhi',     '07:00:00', '09:20:00', 3600.00),
    ('AI-742',  'Air India',  'Kolkata', 'Delhi',     '09:30:00', '11:50:00', 5900.00),
    ('UK-812',  'Vistara',    'Kolkata', 'Mumbai',    '11:00:00', '13:40:00', 6800.00),
    ('6E-881',  'IndiGo',     'Kolkata', 'Delhi',     '18:40:00', '21:05:00', 6400.00),
    ('QP-1102', 'Akasa Air',  'Kolkata', 'Bengaluru', '20:15:00', '22:50:00', 3800.00),
    ('AI-519',  'Air India',  'Kolkata', 'Bengaluru', '14:10:00', '16:40:00', 7800.00);

-- Query: Kolkata -> Delhi/BLR, Fare 4k-9.5k, IndiGo or Air India
SELECT 
    id,
    flight_code,
    airline_name,
    origin_city,
    dest_city,
    departure_time,
    arrival_time,
    economy_fare
FROM flights
WHERE origin_city = 'Kolkata'
  AND dest_city IN ('Delhi', 'Bengaluru')
  AND (flight_code LIKE '6E%' OR flight_code LIKE 'AI%')
  AND economy_fare BETWEEN 4000.00 AND 9500.00
ORDER BY economy_fare ASC;
