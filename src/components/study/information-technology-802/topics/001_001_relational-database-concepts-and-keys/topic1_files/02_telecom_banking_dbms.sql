-- ============================================================================
-- CBSE CLASS XII IT (802) - MODULE 001 : TOPIC 1
-- SQL SCRIPT: MULTI-DOMAIN ENTERPRISE DATABASE SCHEMAS
-- EDUCATOR: SUKANTA HUI | CODER & ACCOTAX, BARRACKPORE
-- ============================================================================

CREATE DATABASE IF NOT EXISTS EnterpriseDomainsDB;
USE EnterpriseDomainsDB;

-- 1. TELECOM CDR TABLE
CREATE TABLE TelecomCDR (
    CallID BIGINT AUTO_INCREMENT PRIMARY KEY,
    CallerMSISDN VARCHAR(15) NOT NULL,
    ReceiverMSISDN VARCHAR(15) NOT NULL,
    CallStartTime DATETIME NOT NULL,
    DurationSeconds INT NOT NULL CHECK (DurationSeconds >= 0),
    TowerID VARCHAR(20) NOT NULL,
    CallRatePerMinute DECIMAL(4,2) DEFAULT 1.20,
    TotalCost DECIMAL(8,2) GENERATED ALWAYS AS (CEIL(DurationSeconds / 60.0) * CallRatePerMinute) STORED
);

-- 2. RAILWAY BERTH RESERVATION TABLE
CREATE TABLE RailwayReservation (
    PNR VARCHAR(10) PRIMARY KEY,
    TrainNumber INT NOT NULL,
    PassengerName VARCHAR(50) NOT NULL,
    TravelDate DATE NOT NULL,
    CoachNumber VARCHAR(5) NOT NULL,
    BerthNumber INT NOT NULL,
    CONSTRAINT unq_train_seat UNIQUE (TrainNumber, TravelDate, CoachNumber, BerthNumber)
);

-- Insert Sample Data
INSERT INTO TelecomCDR (CallerMSISDN, ReceiverMSISDN, CallStartTime, DurationSeconds, TowerID) VALUES
('9830112233', '9830998877', '2026-10-08 09:15:00', 145, 'BKPORE-TWR-01'),
('7003756860', '9831445566', '2026-10-08 09:20:10', 42, 'KOL-TWR-08');

INSERT INTO RailwayReservation VALUES
('PNR802001', 12301, 'Sukanta Hui', '2026-10-15', 'B1', 25);
