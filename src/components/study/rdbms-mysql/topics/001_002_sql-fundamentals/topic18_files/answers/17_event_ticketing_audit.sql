-- ============================================================================
-- SQL-PRJ-17: Concert & Event Ticketing Missing Contact Auditor
-- Author: Sukanta Hui (Coder & AccoTax)
-- Database: MySQL 8.0+
-- ============================================================================

CREATE DATABASE IF NOT EXISTS mega_events_db;
USE mega_events_db;

DROP TABLE IF EXISTS event_tickets;
CREATE TABLE event_tickets (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    event_name VARCHAR(100) NOT NULL,
    attendee_name VARCHAR(80) NOT NULL,
    attendee_email VARCHAR(120) NULL,
    attendee_mobile VARCHAR(15) NULL,
    seat_category VARCHAR(25) NOT NULL,
    ticket_price DECIMAL(8, 2) NOT NULL,
    booking_channel VARCHAR(30) NOT NULL
);

INSERT INTO event_tickets (event_name, attendee_name, attendee_email, attendee_mobile, seat_category, ticket_price, booking_channel)
VALUES
    ('Kolkata Rock Fest',    'Joyita Sen',         'joyita.s@gmail.com', '9830099881', 'VIP_LOUNGE', 4500.00, 'ONLINE_APP'),
    ('Kolkata Rock Fest',    'Tapan Paul',         NULL,                 '9831990011', 'VIP_LOUNGE', 4500.00, 'BOX_OFFICE'),
    ('Kolkata Rock Fest',    'Swapan Majhi',       'swapan.m@yahoo.com', '9831122334', 'GOLD',       1500.00, 'ONLINE_APP'),
    ('Classical Symphony',   'Sandip Ganguly',     'sandip.g@gmail.com', NULL,         'SILVER',      800.00, 'PARTNER_PORTAL'),
    ('Classical Symphony',   'Arindam Roy',        'arindam.r@gmail.com','9874112233', 'PLATINUM',   2800.00, 'ONLINE_APP'),
    ('Classical Symphony',   'Goutam Das',         NULL,                 '9830114455', 'PLATINUM',   2800.00, 'BOX_OFFICE'),
    ('International Jazz Eve','Poulomi Roy',       'poulomi.r@gmail.com','9830991122', 'GOLD',       1800.00, 'ONLINE_APP'),
    ('International Jazz Eve','Subhasish Banerjee',NULL,                 NULL,         'VIP_LOUNGE', 4500.00, 'BOX_OFFICE');

-- Query A: VIP/Platinum Patrons with Missing Email Address
SELECT 
    id,
    event_name,
    attendee_name,
    seat_category,
    ticket_price
FROM event_tickets
WHERE seat_category IN ('VIP_LOUNGE', 'PLATINUM')
  AND attendee_email IS NULL;

-- Query B: Bookings with Verified Mobile Numbers Sorted by Price
SELECT 
    id,
    attendee_name,
    seat_category,
    attendee_mobile,
    ticket_price
FROM event_tickets
WHERE attendee_mobile IS NOT NULL
ORDER BY ticket_price DESC;
