-- ============================================================================
-- SQL-PRJ-07: OTT Movie Streaming Catalog & Paginated Browser
-- Author: Sukanta Hui (Coder & AccoTax)
-- Database: MySQL 8.0+
-- ============================================================================

CREATE DATABASE IF NOT EXISTS ott_platform_db;
USE ott_platform_db;

DROP TABLE IF EXISTS movies;
CREATE TABLE movies (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(120) NOT NULL,
    genre VARCHAR(40) NOT NULL,
    release_year INT NOT NULL,
    imdb_rating DECIMAL(3, 1) NOT NULL,
    duration_mins INT NOT NULL,
    maturity_rating VARCHAR(5) NOT NULL
);

INSERT INTO movies (title, genre, release_year, imdb_rating, duration_mins, maturity_rating)
VALUES
    ('Oppenheimer',                 'Drama',   2023, 8.9, 180, 'A'),
    ('Top Gun: Maverick',           'Action',  2022, 8.3, 130, 'UA'),
    ('Interstellar',                'Sci-Fi',  2014, 8.7, 169, 'UA'),
    ('Spider-Man: No Way Home',     'Action',  2021, 8.2, 148, 'UA'),
    ('Dune: Part Two',              'Sci-Fi',  2024, 8.6, 166, 'UA'),
    ('Everything Everywhere',       'Sci-Fi',  2022, 7.8, 139, 'A'),
    ('Knives Out: Glass Onion',     'Mystery', 2022, 7.1, 139, 'UA'),
    ('The Batman',                  'Action',  2022, 7.8, 176, 'UA');

-- Query A: Distinct Genres List
SELECT DISTINCT genre 
FROM movies
ORDER BY genre ASC;

-- Query B: Pagination - Page 2 (3 items/page) for Rating >= 7.5 and Year >= 2018
SELECT 
    id,
    title,
    genre,
    release_year,
    imdb_rating,
    duration_mins
FROM movies
WHERE imdb_rating >= 7.5 
  AND release_year >= 2018
ORDER BY imdb_rating DESC
LIMIT 3 OFFSET 3;
