-- Complete Module 002 Master DDL Script
CREATE DATABASE IF NOT EXISTS CBSE_IT802_Module002;
USE CBSE_IT802_Module002;

CREATE TABLE Movie (
    MovieID INT PRIMARY KEY AUTO_INCREMENT,
    Title VARCHAR(80) NOT NULL,
    ReleaseYear INT NOT NULL,
    Genre VARCHAR(30) DEFAULT 'Drama',
    IMDb_Rating DECIMAL(3,2) CHECK (IMDb_Rating >= 0.0 AND IMDb_Rating <= 9.99)
);

CREATE TABLE Student (
    RollNo INT PRIMARY KEY,
    StudentName VARCHAR(50) NOT NULL,
    Email VARCHAR(80) UNIQUE,
    City VARCHAR(30) DEFAULT 'Barrackpore'
);

ALTER TABLE Student ADD BloodGroup CHAR(2);