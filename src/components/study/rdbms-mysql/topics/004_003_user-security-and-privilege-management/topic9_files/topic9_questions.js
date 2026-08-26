// topic9_files/topic9_questions.js
// Topic 9: The Principle of Least Privilege: Designing Secure Application Service Accounts

const questions = [
  {
    question: "What is the Principle of Least Privilege (PoLP) in database security architecture?",
    shortAnswer: "The security principle that every user, service, and process must possess only the minimum necessary permissions required to fulfill its specific operational function, and nothing more.",
    explanation: "Applying PoLP ensures that if an application component is compromised (via SQL injection or a vulnerable third-party library), the attacker's blast radius is strictly confined to the minimal privileges of that specific service account.",
    hint: "Think of limiting access strictly to what is necessary for the job.",
    level: "basic",
    codeExample: `-- Least privilege: Only SELECT and INSERT on the orders table:
GRANT SELECT, INSERT ON ecommerce.orders TO 'checkout_service'@'10.0.%.%';`
  },
  {
    question: "Why should runtime web application accounts NEVER possess DDL privileges like `DROP`, `ALTER`, or `CREATE`?",
    shortAnswer: "To prevent accidental schema destruction and ensure that SQL injection vulnerabilities cannot be used by attackers to drop tables or alter schema definitions.",
    explanation: "Web applications in production execute DML statements (`SELECT`, `INSERT`, `UPDATE`, `DELETE`) to process business data. Schema modifications should only ever be executed by dedicated, ephemeral CI/CD migration runners.",
    hint: "Runtime applications only need DML; DDL exposes the database to catastrophic dropping.",
    level: "basic",
    codeExample: `-- Production Application Account (DML Only):
GRANT SELECT, INSERT, UPDATE, DELETE ON app_db.* TO 'app_runtime'@'10.10.%.%';
-- Zero DDL rights (CREATE, DROP, ALTER)!`
  },
  {
    question: "How should schema migrations (e.g. Flyway or Liquibase) be architected to adhere to the Principle of Least Privilege?",
    shortAnswer: "Use a dedicated, isolated migration runner account with DDL permissions that executes strictly during CI/CD deployment pipelines, while the runtime application uses a separate DML-only account.",
    explanation: "Separating the deployment identity from the runtime identity ensures that 99.99% of database interactions occur under accounts that cannot physically modify table definitions or drop columns.",
    hint: "Separate CI/CD deployment accounts from runtime application accounts.",
    level: "intermediate",
    codeExample: `-- Migration runner account (used during deployments only):
CREATE USER 'flyway_deployer'@'10.0.1.50' IDENTIFIED BY 'EphemeralSecretPass#2026';
GRANT CREATE, ALTER, DROP, INDEX, REFERENCES ON ecommerce.* TO 'flyway_deployer'@'10.0.1.50';`
  },
  {
    question: "Why is creating a single shared `app_user` for all microservices considered a dangerous architectural anti-pattern?",
    shortAnswer: "Because compromising a single low-security microservice gives the attacker access to all data across every microservice in the entire company.",
    explanation: "If a low-priority blog microservice and a high-priority payment microservice share the same database user, an exploit in the blog service allows reading financial payment tokens. Each microservice must have its own isolated service account.",
    hint: "Shared accounts create a single point of catastrophic failure.",
    level: "basic",
    codeExample: `-- Anti-pattern: One shared user for everything
-- Correct pattern: Dedicated per-service accounts:
-- 'order_service'@'10.0.1.%', 'payment_service'@'10.0.2.%', 'inventory_service'@'10.0.3.%'`
  },
  {
    question: "How does binding service accounts to specific private VPC subnets (e.g. `'10.244.%.%'`) protect against network-level attacks?",
    shortAnswer: "It ensures that even if database credentials are leaked or stolen, the credentials cannot be used to connect from external IP addresses or unauthorized office subnets.",
    explanation: "Restricting the host part of the MySQL account enforces network segmentation at the database authentication layer. An attacker connecting from the public internet is rejected immediately before password verification.",
    hint: "Restricts connection acceptance strictly to trusted private application subnets.",
    level: "intermediate",
    codeExample: `CREATE USER 'payment_svc'@'10.244.12.0/255.255.255.0'
  IDENTIFIED WITH caching_sha2_password BY 'VaultPass#2026'
  REQUIRE SSL;`
  },
  {
    question: "Why should `PASSWORD EXPIRE NEVER` be explicitly configured on unattended application service accounts?",
    shortAnswer: "To prevent sudden production outages caused by automated password expiration countdowns on headless background daemons.",
    explanation: "Human users should rotate passwords periodically, but microservices and cron jobs will crash if passwords expire without manual intervention. Service account credentials should be rotated intentionally via Dual Passwords or secret managers (HashiCorp Vault).",
    hint: "Prevents automated password expirations from breaking unattended microservices.",
    level: "basic",
    codeExample: `ALTER USER 'order_daemon'@'10.0.%.%' PASSWORD EXPIRE NEVER;`
  },
  {
    question: "How does configuring `WITH MAX_USER_CONNECTIONS N` protect a database cluster against connection pool exhaustion attacks?",
    shortAnswer: "It limits the maximum number of simultaneous concurrent connections that a single service account can open, preventing a misconfigured or compromised microservice from consuming the entire server connection limit (`max_connections`).",
    explanation: "If a runaway microservice opens 5,000 connections during a traffic spike, setting `WITH MAX_USER_CONNECTIONS 50` caps its usage, ensuring other critical services (like payment processing) retain available connection slots.",
    hint: "Limits connection pool consumption per user account.",
    level: "intermediate",
    codeExample: `ALTER USER 'reporting_app'@'10.0.%.%' WITH MAX_USER_CONNECTIONS 20;`
  },
  {
    question: "What is an 'Append-Only' service account, and when should it be used?",
    shortAnswer: "An account granted only `INSERT` privilege on specific tables, used for IoT sensor ingestion, security audit logging, and telemetry collectors.",
    explanation: "If an IoT device or logging daemon in the field is compromised, an attacker possessing the database credentials cannot read past logs (`SELECT`), modify audit records (`UPDATE`), or delete evidence (`DELETE`).",
    hint: "An account with write-only INSERT permissions.",
    level: "intermediate",
    codeExample: `CREATE USER 'iot_collector'@'192.168.10.%' IDENTIFIED BY 'Sens0rPass#2026';
GRANT INSERT ON telemetry.device_events TO 'iot_collector'@'192.168.10.%';`
  },
  {
    question: "In Mamata & Susmita's Barrackpore retail store, an online order service was compromised via a vulnerable Node.js package. How did the Principle of Least Privilege save the store?",
    shortAnswer: "Because Mamata had provisioned the account with DML privileges (`SELECT, INSERT, UPDATE`) on `orders` and zero DDL or global privileges, the attacker could not drop tables, access employee salaries, or compromise the database server.",
    explanation: "The attacker attempted to run `DROP TABLE orders;` and `SELECT * FROM hr_salaries;`. Both queries were rejected by MySQL with Error 1142. The breach was isolated to recent orders while core business data and system integrity remained 100% intact.",
    hint: "Least privilege isolates compromises to narrow operational boundaries.",
    level: "moderate",
    codeExample: `-- Hardened Barrackpore service account:
CREATE USER 'barrackpore_web_order'@'10.0.1.%'
  IDENTIFIED WITH caching_sha2_password BY 'StrongVaultPass#2026'
  REQUIRE SSL
  PASSWORD EXPIRE NEVER
  WITH MAX_USER_CONNECTIONS 40;

GRANT SELECT, INSERT, UPDATE ON barrackpore_store.orders TO 'barrackpore_web_order'@'10.0.1.%';`
  },
  {
    question: "In Abhronila & Debangshu's Kolkata fintech bank, how did they structure the payment gateway service account handling ₹100 Crores in volume?",
    shortAnswer: "They granted zero direct table privileges and gave only `EXECUTE` privilege on a stored procedure (`sp_process_payment`) that verified transaction checksums and updated balances.",
    explanation: "By abstracting data mutations behind a stored procedure with `SQL SECURITY DEFINER`, the payment gateway service account could not issue ad-hoc `UPDATE accounts SET balance = ...` queries. Any attempted SQL injection was neutralized at the procedure boundary.",
    hint: "Use stored procedure execution privileges to encapsulate critical financial ledger mutations.",
    level: "expert",
    codeExample: `-- Kolkata Fintech Payment Gateway Least Privilege:
CREATE USER 'payment_gateway_svc'@'10.10.20.%'
  IDENTIFIED WITH caching_sha2_password BY 'FintechVaultKey#2026'
  REQUIRE SSL
  PASSWORD EXPIRE NEVER;

GRANT EXECUTE ON PROCEDURE kolkata_bank.sp_process_payment TO 'payment_gateway_svc'@'10.10.20.%';`
  },
  {
    question: "Why should production database accounts always enforce `REQUIRE SSL`?",
    shortAnswer: "To prevent plaintext password and data transmission over internal network switches, eliminating eavesdropping and Man-in-the-Middle (MITM) attacks.",
    explanation: "Even within private cloud VPCs, unencrypted database traffic is vulnerable to packet sniffing from compromised neighbouring virtual machines. `REQUIRE SSL` enforces TLS encryption on all network packets.",
    hint: "Enforces TLS encryption for all data in transit.",
    level: "basic",
    codeExample: `ALTER USER 'order_service'@'10.0.%.%' REQUIRE SSL;`
  },
  {
    question: "What is the security risk of granting `ALL PRIVILEGES ON db_name.*` to a runtime microservice?",
    shortAnswer: "It gives the microservice the power to `DROP TABLE`, `TRUNCATE`, `ALTER`, `CREATE TRIGGER`, and `LOCK TABLES`, exposing the database to accidental or malicious schema deletion.",
    explanation: "`ALL PRIVILEGES` includes administrative DDL within the schema. If an ORM bug or attacker executes a malicious query, entire tables can be dropped in milliseconds.",
    hint: "ALL PRIVILEGES includes destructive DDL commands like DROP and TRUNCATE.",
    level: "basic",
    codeExample: `-- Dangerous anti-pattern:
-- GRANT ALL PRIVILEGES ON app_db.* TO 'app_svc'@'%';

-- Correct Least Privilege:
GRANT SELECT, INSERT, UPDATE, DELETE ON app_db.* TO 'app_svc'@'10.0.%.%';`
  },
  {
    question: "How can secret management tools (like HashiCorp Vault or AWS Secrets Manager) integrate with MySQL 8.0 Dual Passwords?",
    shortAnswer: "Vault dynamically rotates credentials using `RETAIN CURRENT PASSWORD`, rolls new secrets out to application pods, verifies connectivity, and then executes `DISCARD OLD PASSWORD` automatically.",
    explanation: "This allows fully automated, continuous credential rotation every 30 days without human intervention and with zero microservice downtime.",
    hint: "Secret managers orchestrate dual-password rotation workflows automatically.",
    level: "expert",
    codeExample: `-- Vault automated rotation step:
ALTER USER 'vault_managed_svc'@'10.%.%.%' 
  IDENTIFIED BY 'NewDynamicVaultKey#2026' 
  RETAIN CURRENT PASSWORD;`
  },
  {
    question: "Why should `SELECT` privilege on the `mysql` system database NEVER be granted to application service accounts?",
    shortAnswer: "Because it allows reading `mysql.user` and `mysql.global_grants`, exposing authentication hashes and server-wide security configurations.",
    explanation: "Granting access to `mysql.*` gives attackers reconnaissance intelligence about other accounts, password hashes, and privilege structures on the database cluster.",
    hint: "Protects internal password hashes and security metadata from reconnaissance.",
    level: "basic",
    codeExample: `-- Application users must have ZERO access to mysql.* system database.`
  },
  {
    question: "What is a 'Read-Only Analytics' service account archetype?",
    shortAnswer: "An account provisioned with only `SELECT` privilege on specific reporting views or replica database tables.",
    explanation: "Analytics, BI dashboards (Metabase, Tableau), and data export tools should never hold `INSERT`, `UPDATE`, or `DELETE` rights, ensuring that analytics queries cannot mutate production state.",
    hint: "Read-only accounts with SELECT permissions on views or replicas.",
    level: "basic",
    codeExample: `CREATE USER 'bi_reporting'@'10.0.50.%' IDENTIFIED BY 'BiReportPass#2026' REQUIRE SSL;
GRANT SELECT ON ecommerce.v_daily_sales_summary TO 'bi_reporting'@'10.0.50.%';`
  },
  {
    question: "How do you audit all service accounts in the database that currently have unauthorized DDL privileges (`Create_priv`, `Drop_priv`, `Alter_priv`) in `mysql.db`?",
    shortAnswer: "Query `SELECT User, Host, Db FROM mysql.db WHERE Create_priv = 'Y' OR Drop_priv = 'Y' OR Alter_priv = 'Y';`.",
    explanation: "Regular compliance auditing ensures that temporary DDL grants handed out during production emergencies are revoked promptly.",
    hint: "Filter mysql.db for DDL privilege flags set to 'Y'.",
    level: "intermediate",
    codeExample: `SELECT User, Host, Db, Create_priv, Drop_priv, Alter_priv 
FROM mysql.db 
WHERE (Create_priv = 'Y' OR Drop_priv = 'Y' OR Alter_priv = 'Y')
  AND User NOT LIKE '%dba%' AND User NOT LIKE '%migrator%';`
  },
  {
    question: "What is the recommended approach for providing developer access to staging vs production databases?",
    shortAnswer: "Developers should have individual accounts with restricted DML/Read access in staging, and ZERO direct read/write credentials in production (relying instead on automated CI/CD and observability tools).",
    explanation: "Direct developer access to production databases introduces human error risks and violates SOC 2 / PCI-DSS compliance mandates.",
    hint: "Zero direct developer credentials in production; rely on automated deployment pipelines.",
    level: "expert",
    codeExample: `-- Staging developer account:
CREATE USER 'debangshu_dev'@'10.1.%.%' IDENTIFIED BY 'DevPass#2026';
GRANT SELECT, INSERT, UPDATE ON staging_db.* TO 'debangshu_dev'@'10.1.%.%';`
  },
  {
    question: "How does granting `EXECUTE` on a stored procedure prevent SQL injection vulnerabilities in microservices?",
    shortAnswer: "Stored procedures use parameterized inputs, ensuring that user-supplied values are treated strictly as data literals and can never alter the query execution structure.",
    explanation: "When combined with revoking direct table access, an application cannot execute dynamic concatenated SQL strings against the database.",
    hint: "Parameterization inside stored routines ensures inputs cannot alter SQL execution syntax.",
    level: "intermediate",
    codeExample: `CALL sp_fetch_customer_orders(1001); -- Parameter is safely treated as an integer literal`
  },
  {
    question: "What is the security risk of using the `root` account in web application configuration files (e.g. `application.yml` or `.env`)?",
    shortAnswer: "Any remote code execution (RCE) or SQL injection vulnerability instantly grants the attacker full root control over the entire database server, operating system files, and all customer schemas.",
    explanation: "Running web applications as `root` completely demolishes defense-in-depth, making any minor application vulnerability catastrophic.",
    hint: "Root access gives full control over all databases, files, and server shutdown commands.",
    level: "basic",
    codeExample: `# NEVER do this in .env or application.yml:
# DB_USER=root
# DB_PASSWORD=rootpassword`
  },
  {
    question: "How can MySQL Views be used to implement row-level security for multi-tenant service accounts?",
    shortAnswer: "By defining a view with a `WHERE tenant_id = 'kolkata_store'` clause and granting `SELECT` on the view instead of the base table.",
    explanation: "This guarantees that the service account physically cannot query or see records belonging to other tenants, even if application-level filtering fails.",
    hint: "Use Views with hardcoded tenant WHERE clauses to enforce row-level isolation.",
    level: "expert",
    codeExample: `CREATE VIEW v_kolkata_orders AS 
SELECT * FROM orders WHERE store_city = 'Kolkata';

GRANT SELECT, INSERT ON ecommerce.v_kolkata_orders TO 'kolkata_store_svc'@'10.0.%.%';`
  },
  {
    question: "Why should connection strings in microservices specify explicit database names rather than connecting without a default schema?",
    shortAnswer: "To prevent accidental query execution against wrong databases when table names match across multiple schemas.",
    explanation: "Connecting with an explicit default database ensures all unqualified table queries resolve to the intended schema.",
    hint: "Ensures queries default strictly to the designated application schema.",
    level: "basic",
    codeExample: `// JDBC connection string with explicit schema:
// jdbc:mysql://db.kolkata.internal:3306/kolkata_retail?useSSL=true`
  },
  {
    question: "What is the `REFERENCES` privilege, and why is it needed by migration accounts but not runtime accounts?",
    shortAnswer: "`REFERENCES` allows creating Foreign Key constraints; migration accounts need it to define relationships during schema setup, but runtime applications only query and mutate data.",
    explanation: "Runtime DML (`INSERT`/`UPDATE`) validates foreign keys automatically without requiring the runtime user to hold the `REFERENCES` privilege.",
    hint: "Only required when executing CREATE TABLE with FOREIGN KEY definitions.",
    level: "intermediate",
    codeExample: `GRANT REFERENCES ON parent_db.* TO 'migration_runner'@'10.0.1.50';`
  },
  {
    question: "How does setting `max_user_connections` on service accounts assist in capacity planning?",
    shortAnswer: "It allows database administrators to allocate explicit connection budgets to each microservice according to expected throughput and SLA.",
    explanation: "For example, dedicating 50 connections to Orders, 30 to Billing, and 10 to Notifications ensures fair resource allocation across the cluster.",
    hint: "Allocates explicit connection budgets per microservice.",
    level: "intermediate",
    codeExample: `ALTER USER 'order_svc'@'%' WITH MAX_USER_CONNECTIONS 50;
ALTER USER 'billing_svc'@'%' WITH MAX_USER_CONNECTIONS 30;`
  },
  {
    question: "What is the difference between `DELETE` and `TRUNCATE` from a privilege standpoint in MySQL?",
    shortAnswer: "`DELETE` is a DML privilege; `TRUNCATE` is a DDL operation that requires the `DROP` privilege on the table.",
    explanation: "An application account granted `DELETE` cannot execute `TRUNCATE table_name;` unless it was also granted `DROP`. This prevents fast, unlogged table wipes.",
    hint: "TRUNCATE requires DROP privilege; DELETE is a standard DML privilege.",
    level: "intermediate",
    codeExample: `-- User with only DELETE privilege:
DELETE FROM orders WHERE order_id = 10; -- OK
TRUNCATE TABLE orders;                  -- ERROR 1142: DROP command denied!`
  },
  {
    question: "Why should database credentials be stored in environment variables or secret vaults rather than hardcoded in source code repositories?",
    shortAnswer: "To prevent credential leakage through git commit history, third-party code review platforms, and unauthorized repository access.",
    explanation: "Hardcoded credentials in git repositories are frequently scanned and harvested by automated botnets within minutes of public exposure.",
    hint: "Prevents credential harvesting from source code repositories.",
    level: "basic",
    codeExample: `// Load from environment:
const dbPassword = process.env.DB_PASSWORD;`
  },
  {
    question: "What is the recommended privilege profile for an audit logging microservice?",
    shortAnswer: "`GRANT INSERT ON audit_db.security_logs TO 'audit_svc'@'10.0.%.%';`",
    explanation: "An audit service should only write new log entries. It should have 0 `UPDATE`, `DELETE`, or `DROP` permissions, guaranteeing immutability of historical audit trails.",
    hint: "Append-only INSERT rights guarantee immutable audit logs.",
    level: "basic",
    codeExample: `GRANT INSERT ON compliance_audit.events TO 'audit_logger'@'10.0.%.%';`
  },
  {
    question: "How do you revoke all table privileges from a service account while leaving its database-level grants intact?",
    shortAnswer: "Query `mysql.tables_priv` to find table-level rows for that user and execute `REVOKE ALL PRIVILEGES ON db.table FROM 'user'@'host';` for each.",
    explanation: "Cleans up granular overrides and forces the user to inherit purely from the database-level grant baseline.",
    hint: "Remove table-specific entries to fall back to database-level rules.",
    level: "expert",
    codeExample: `REVOKE ALL PRIVILEGES ON kolkata_retail.orders FROM 'app_svc'@'10.0.%.%';`
  },
  {
    question: "Can an application account granted `UPDATE` on specific columns execute an `UPDATE` that affects other columns?",
    shortAnswer: "No, attempting to modify ungranted columns in the `SET` clause results in `ERROR 1142 (42000): UPDATE command denied for column`.",
    explanation: "MySQL validates each target column in the `SET` clause against `mysql.columns_priv`.",
    hint: "Target columns in the SET clause must be explicitly permitted.",
    level: "basic",
    codeExample: `GRANT UPDATE (status) ON orders TO 'status_svc'@'%';
-- UPDATE orders SET total_amount = 500 WHERE id = 1; -> ERROR 1142!`
  },
  {
    question: "What is the relationship between Connection Pooling (e.g. HikariCP) and Service Account `MAX_USER_CONNECTIONS`?",
    shortAnswer: "The maximum pool size in the application configuration (e.g. `maximumPoolSize = 20`) must be configured to stay safely within the account's `MAX_USER_CONNECTIONS` limit across all running pod replicas.",
    explanation: "If 3 pod replicas each configure a pool size of 20 connections (60 total), setting `MAX_USER_CONNECTIONS 50` will cause the 3rd pod to fail connection initialization. Connection limits must account for horizontal scaling.",
    hint: "Total connections across all microservice replicas must stay within MAX_USER_CONNECTIONS.",
    level: "expert",
    codeExample: `-- Pod Pool Size (20) x 3 Replicas = 60 connections needed:
ALTER USER 'order_svc'@'10.0.%.%' WITH MAX_USER_CONNECTIONS 75;`
  },
  {
    question: "What is the primary operational takeaway of Topic 9 in Module 004_003?",
    shortAnswer: "Designing secure application service accounts following the Principle of Least Privilege is the most effective database defense: enforce dedicated per-service identities, bind to private CIDRs, restrict to DML only, set connection quotas, and isolate DDL migrations into separate CI/CD accounts.",
    explanation: "Least privilege minimizes the blast radius of application compromises, prevents accidental schema destruction, and satisfies enterprise compliance mandates. By adhering to the 6 Golden Rules of Service Account Design, database architectures remain resilient against modern cyber threats.",
    hint: "Summarize dedicated accounts, private CIDR binding, DML restriction, and CI/CD separation.",
    level: "basic",
    codeExample: `-- Golden Least Privilege Service Account Template:
CREATE USER 'billing_service'@'10.244.10.%'
  IDENTIFIED WITH caching_sha2_password BY 'StrongVaultPass#2026'
  REQUIRE SSL
  PASSWORD EXPIRE NEVER
  WITH MAX_USER_CONNECTIONS 50;

GRANT SELECT, INSERT, UPDATE ON kolkata_billing.invoices TO 'billing_service'@'10.244.10.%';
GRANT EXECUTE ON PROCEDURE kolkata_billing.sp_process_payment TO 'billing_service'@'10.244.10.%';`
  }
];

export default questions;
