-- ============================================================================
-- SQL-PRJ-20: SaaS Cloud Subscription Lifecycle & Renewal Management
-- Author: Sukanta Hui (Coder & AccoTax)
-- Database: MySQL 8.0+
-- ============================================================================

CREATE DATABASE IF NOT EXISTS cloud_saas_db;
USE cloud_saas_db;

DROP TABLE IF EXISTS saas_subscriptions;
CREATE TABLE saas_subscriptions (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    tenant_id VARCHAR(20) NOT NULL UNIQUE,
    company_name VARCHAR(100) NOT NULL,
    plan_tier VARCHAR(30) NOT NULL,
    mrr_usd DECIMAL(10, 2) NOT NULL,
    auto_renewal TINYINT(1) DEFAULT 1,
    start_date DATE NOT NULL,
    next_billing_date DATE NOT NULL,
    last_login DATE NOT NULL,
    churn_risk VARCHAR(15) DEFAULT 'LOW'
);

INSERT INTO saas_subscriptions (tenant_id, company_name, plan_tier, mrr_usd, auto_renewal, start_date, next_billing_date, last_login, churn_risk)
VALUES
    ('TNT-US-9018', 'FinTech Global Inc',  'ENTERPRISE_ANNUAL', 4500.00, 1, '2024-08-01', '2027-08-01', '2026-09-03', 'LOW'),
    ('TNT-IN-4412', 'Nexa Logistics',     'ENTERPRISE_ANNUAL', 3200.00, 1, '2025-06-15', '2027-06-15', '2026-09-02', 'LOW'),
    ('TNT-EU-1102', 'CloudScale AI',      'PRO_MONTHLY',        899.00, 1, '2026-01-10', '2026-10-01', '2026-09-01', 'LOW'),
    ('TNT-SG-8891', 'Zenith Retail Apps', 'PRO_MONTHLY',        599.00, 1, '2026-03-01', '2026-09-01', '2026-07-20', 'LOW'),
    ('TNT-US-3301', 'Hyperion Media',     'ENTERPRISE_ANNUAL', 2800.00, 0, '2025-02-01', '2026-10-01', '2026-09-02', 'MEDIUM'),
    ('TNT-UK-4419', 'Apex Consulting',    'PRO_MONTHLY',        750.00, 0, '2025-11-15', '2026-09-15', '2026-06-10', 'HIGH'),
    ('TNT-IN-1002', 'QuickCart E-Shop',   'PRO_MONTHLY',        499.00, 1, '2026-04-01', '2026-10-01', '2026-08-05', 'LOW'),
    ('TNT-AU-7711', 'Pacific HealthTech', 'ENTERPRISE_ANNUAL', 5200.00, 1, '2024-10-01', '2026-10-01', '2026-09-03', 'LOW');

-- DML Batch Maintenance: Flag inactive Pro monthly users as HIGH churn risk
UPDATE saas_subscriptions 
SET churn_risk = 'HIGH' 
WHERE plan_tier = 'PRO_MONTHLY' 
  AND last_login < '2026-08-15';

-- Executive DQL: Top 3 Revenue generating accounts with Active Auto-Renewal and Healthy status
SELECT 
    id AS 'ID',
    tenant_id AS 'Account ID',
    company_name AS 'Company',
    plan_tier AS 'Plan Tier',
    CONCAT('$', FORMAT(mrr_usd, 2)) AS 'Monthly Rev',
    next_billing_date AS 'Next Billing Date'
FROM saas_subscriptions
WHERE auto_renewal = 1
  AND churn_risk != 'HIGH'
ORDER BY mrr_usd DESC
LIMIT 3;
