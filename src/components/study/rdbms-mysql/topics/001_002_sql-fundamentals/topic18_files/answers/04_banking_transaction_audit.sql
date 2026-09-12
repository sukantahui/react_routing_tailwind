-- ============================================================================
-- SQL-PRJ-04: Banking High-Value Transaction Tracker & Fraud Alert Filter
-- Author: Sukanta Hui (Coder & AccoTax)
-- Database: MySQL 8.0+
-- ============================================================================

CREATE DATABASE IF NOT EXISTS core_banking_db;
USE core_banking_db;

DROP TABLE IF EXISTS bank_transactions;
CREATE TABLE bank_transactions (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    account_no VARCHAR(20) NOT NULL,
    txn_type VARCHAR(15) NOT NULL,
    amount DECIMAL(12, 2) NOT NULL,
    txn_time DATETIME NOT NULL,
    status VARCHAR(15) NOT NULL
);

INSERT INTO bank_transactions (account_no, txn_type, amount, txn_time, status)
VALUES
    ('HDFC00124981', 'WITHDRAWAL', 85000.00, '2026-09-01 09:15:30', 'SUCCESS'),
    ('ICIC00994123', 'DEPOSIT',    120000.00, '2026-09-01 10:05:12', 'SUCCESS'),
    ('SBIN00451299', 'WITHDRAWAL', 15000.00, '2026-09-01 10:45:00', 'SUCCESS'),
    ('SBIN00982341', 'WITHDRAWAL', 50000.00, '2026-09-01 11:45:00', 'SUCCESS'),
    ('HDFC00124981', 'TRANSFER',   95000.00, '2026-09-01 12:30:15', 'FAILED'),
    ('SBIN00982341', 'TRANSFER',  150000.00, '2026-09-01 14:22:10', 'SUCCESS'),
    ('AXIS00118822', 'WITHDRAWAL', 62000.00, '2026-09-01 15:10:45', 'PENDING'),
    ('ICIC00994123', 'TRANSFER',   55000.00, '2026-09-01 16:00:20', 'SUCCESS');

-- High-Value Outflow Audit Query (Top 3 Successful Debits >= 50k)
SELECT 
    id,
    account_no,
    txn_type,
    amount,
    txn_time,
    status
FROM bank_transactions
WHERE txn_type IN ('WITHDRAWAL', 'TRANSFER')
  AND amount >= 50000.00
  AND status = 'SUCCESS'
ORDER BY amount DESC
LIMIT 3;
