-- ============================================================================
-- SQL-PRJ-12: Online Food Delivery Menu & Vegetarian Gourmet Finder
-- Author: Sukanta Hui (Coder & AccoTax)
-- Database: MySQL 8.0+
-- ============================================================================

CREATE DATABASE IF NOT EXISTS food_delivery_db;
USE food_delivery_db;

DROP TABLE IF EXISTS menu_items;
CREATE TABLE menu_items (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    item_name VARCHAR(100) NOT NULL,
    restaurant_name VARCHAR(80) NOT NULL,
    cuisine VARCHAR(30) NOT NULL,
    price DECIMAL(7, 2) NOT NULL,
    is_veg TINYINT(1) NOT NULL DEFAULT 1,
    rating DECIMAL(2, 1) NOT NULL
);

INSERT INTO menu_items (item_name, restaurant_name, cuisine, price, is_veg, rating)
VALUES
    ('Dal Makhani Royale',      'Haveli Dine',       'North Indian', 220.00, 1, 4.7),
    ('Chicken Dum Biryani',      'Arsalan Express',   'Mughlai',      340.00, 0, 4.9),
    ('Paneer Tikka Butter',      'Punjab Sweet House','North Indian', 280.00, 1, 4.8),
    ('Crispy Chilli Babycorn',   'Mainland Delight',  'Chinese',      260.00, 1, 4.5),
    ('Tandoori Roti (4pc)',      'Punjab Sweet House','North Indian',  80.00, 1, 4.4),
    ('Shahi Paneer Korma',       'Aminia Deluxe',     'Mughlai',      310.00, 1, 4.6),
    ('Mutton Galouti Kebab',     'Aminia Deluxe',     'Mughlai',      420.00, 0, 4.8),
    ('Paneer Lababdar',          'Haveli Dine',       'North Indian', 380.00, 1, 4.3);

-- Query: Top 4 Veg dishes (North Indian / Mughlai) under ₹350
SELECT 
    id,
    item_name,
    restaurant_name,
    cuisine,
    price,
    rating
FROM menu_items
WHERE is_veg = 1
  AND cuisine IN ('North Indian', 'Mughlai')
  AND price <= 350.00
ORDER BY rating DESC, price ASC
LIMIT 4;
