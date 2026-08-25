// topic6_files/topic6_questions.js
// Topic 6: Assigning Privileges with GRANT and Removing Privileges with REVOKE

const questions = [
  {
    question: "What is the standard syntax for assigning database-level privileges to a user in MySQL 8.0?",
    shortAnswer: "`GRANT privilege_list ON database_name.* TO 'username'@'host';`",
    explanation: "The `GRANT` statement assigns one or more privileges to an account. Specifying `db_name.*` limits the granted capabilities strictly to tables and views within that named schema.",
    hint: "Use GRANT ... ON database.* TO 'user'@'host';",
    level: "basic",
    codeExample: `GRANT SELECT, INSERT, UPDATE, DELETE 
ON kolkata_retail.* 
TO 'app_service'@'10.10.%.%';`
  },
  {
    question: "What is the standard syntax for revoking privileges from a user in MySQL 8.0?",
    shortAnswer: "`REVOKE privilege_list ON object_level FROM 'username'@'host';`",
    explanation: "The `REVOKE` statement removes previously assigned privileges. The target object level in the `REVOKE` statement must match the exact scope where the privilege was originally granted.",
    hint: "Use REVOKE ... ON object FROM 'user'@'host';",
    level: "basic",
    codeExample: `REVOKE DELETE, DROP 
ON kolkata_retail.* 
FROM 'app_service'@'10.10.%.%';`
  },
  {
    question: "What does the `WITH GRANT OPTION` clause do when appended to a `GRANT` statement?",
    shortAnswer: "It allows the recipient user to grant their own existing privileges to other user accounts.",
    explanation: "When an administrator assigns privileges `WITH GRANT OPTION`, the user receives delegated administrative authority. The user can create new accounts and grant any privileges they personally hold to others.",
    hint: "Think about delegating the ability to give permissions to other users.",
    level: "intermediate",
    codeExample: `GRANT SELECT, INSERT ON kolkata_retail.* 
TO 'team_lead'@'10.0.%.%' 
WITH GRANT OPTION;`
  },
  {
    question: "How do you revoke the `GRANT OPTION` capability without removing the user's underlying data privileges?",
    shortAnswer: "`REVOKE GRANT OPTION ON object_level FROM 'username'@'host';`",
    explanation: "Executing `REVOKE GRANT OPTION ON db.* FROM 'user'@'host'` removes only the delegation right while preserving the user's existing `SELECT`, `INSERT`, `UPDATE` permissions intact.",
    hint: "Use REVOKE GRANT OPTION specifically.",
    level: "intermediate",
    codeExample: `REVOKE GRANT OPTION ON kolkata_retail.* FROM 'team_lead'@'10.0.%.%';`
  },
  {
    question: "What is the command to strip ALL privileges and grant options from a user account simultaneously?",
    shortAnswer: "`REVOKE ALL PRIVILEGES, GRANT OPTION FROM 'username'@'host';`",
    explanation: "This command cleanses the account of all static and dynamic grants across all scopes, reverting the account back to baseline `USAGE` on `*.*`.",
    hint: "Use REVOKE ALL PRIVILEGES, GRANT OPTION FROM user.",
    level: "basic",
    codeExample: `REVOKE ALL PRIVILEGES, GRANT OPTION FROM 'former_employee'@'%';`
  },
  {
    question: "Why is `FLUSH PRIVILEGES` NOT required after running `GRANT` or `REVOKE` statements?",
    shortAnswer: "Because GRANT and REVOKE statements automatically update both the disk data dictionary tables and the server's in-memory privilege hash structures in real time.",
    explanation: "In MySQL 8.0, DDL privilege commands execute atomic synchronization. `FLUSH PRIVILEGES` is only necessary if an administrator manually runs DML (`INSERT`/`UPDATE`) directly on `mysql.user` or `mysql.db`, which is an obsolete anti-pattern.",
    hint: "GRANT and REVOKE sync in-memory structures automatically.",
    level: "basic",
    codeExample: `-- Running FLUSH PRIVILEGES after GRANT is redundant:
GRANT SELECT ON db.* TO 'user'@'%';
-- No FLUSH PRIVILEGES needed!`
  },
  {
    question: "What are 'Partial Revokes' in MySQL 8.0.16+, and what system variable enables them?",
    shortAnswer: "Partial Revokes allow granting a Global privilege (like SELECT on *.*) while explicitly revoking access to specific restricted databases; enabled via `partial_revokes = ON`.",
    explanation: "Prior to MySQL 8.0.16, permissions were strictly non-subtractive. If you granted global `SELECT ON *.*`, you could not block access to an internal HR database. With `partial_revokes = ON`, MySQL allows `REVOKE SELECT ON hr_payroll.* FROM 'auditor'@'%'`, adding an `AS RESTRICT ON` restriction.",
    hint: "Think about global grants with database-level exclusion rules.",
    level: "expert",
    codeExample: `-- Enabling Partial Revokes:
SET PERSIST partial_revokes = ON;

-- Global grant with specific database restriction:
GRANT SELECT ON *.* TO 'auditor'@'%';
REVOKE SELECT ON hr_payroll.* FROM 'auditor'@'%';`
  },
  {
    question: "How does `SHOW GRANTS` display a Partial Revoke restriction?",
    shortAnswer: "It appends `AS RESTRICT ON \`restricted_db\`.*` to the global grant line.",
    explanation: "When an account has a partial revoke applied, `SHOW GRANTS` outputs: `GRANT SELECT ON *.* TO 'auditor'@'%' AS RESTRICT ON \`hr_payroll\`.*`.",
    hint: "Look for AS RESTRICT ON in the SHOW GRANTS output.",
    level: "expert",
    codeExample: `SHOW GRANTS FOR 'auditor'@'%';
-- Output:
-- GRANT SELECT ON *.* TO 'auditor'@'%' AS RESTRICT ON \`hr_payroll\`.*`
  },
  {
    question: "What happens if you attempt to revoke a privilege at Table scope when it was granted at Database scope without partial_revokes?",
    shortAnswer: "MySQL throws `ERROR 1147 (42000): There is no such grant defined for user on table`.",
    explanation: "By default, `REVOKE` checks the exact tier where the privilege was originally stored in the data dictionary. Since `mysql.tables_priv` has no record for that table (the grant is in `mysql.db`), MySQL rejects the statement.",
    hint: "Error 1147 indicates scope mismatch during REVOKE.",
    level: "intermediate",
    codeExample: `-- Fails without partial_revokes:
-- GRANT SELECT ON store_db.* TO 'user'@'%';
-- REVOKE SELECT ON store_db.sales FROM 'user'@'%'; -- ERROR 1147!`
  },
  {
    question: "How do you grant Dynamic Privileges (like `BACKUP_ADMIN` or `CONNECTION_ADMIN`) in MySQL 8.0?",
    shortAnswer: "`GRANT BACKUP_ADMIN, CONNECTION_ADMIN ON *.* TO 'username'@'host';`",
    explanation: "Dynamic Privileges always operate at the Global scope (`*.*`) and are granted using standard `GRANT` syntax. They are stored in the `mysql.global_grants` data dictionary table.",
    hint: "Dynamic privileges are always granted on *.* and stored in mysql.global_grants.",
    level: "intermediate",
    codeExample: `GRANT BACKUP_ADMIN, BINLOG_ADMIN ON *.* TO 'backup_operator'@'localhost';
SELECT * FROM mysql.global_grants WHERE USER = 'backup_operator';`
  },
  {
    question: "How do you revoke a Dynamic Privilege from a user in MySQL 8.0?",
    shortAnswer: "`REVOKE BACKUP_ADMIN ON *.* FROM 'username'@'host';`",
    explanation: "Dynamic privileges are removed by specifying the dynamic privilege name at the global scope in a `REVOKE` statement.",
    hint: "Use REVOKE privilege_name ON *.* FROM user.",
    level: "basic",
    codeExample: `REVOKE BACKUP_ADMIN ON *.* FROM 'backup_operator'@'localhost';`
  },
  {
    question: "In Mamata & Susmita's Barrackpore retail store, a third-party accounting contractor finished their 3-month audit. What was the exact sequence to decommission their access safely?",
    shortAnswer: "1. `REVOKE ALL PRIVILEGES, GRANT OPTION FROM 'auditor'@'192.168.1.%';` 2. `DROP USER 'auditor'@'192.168.1.%';`.",
    explanation: "Revoking all privileges prior to dropping the user ensures that any residual table, column, or routine grant rows in `mysql.tables_priv`, `mysql.columns_priv`, or `mysql.procs_priv` are purged cleanly without leaving orphaned security artifacts.",
    hint: "Revoke all privileges and grant options, then drop the user.",
    level: "moderate",
    codeExample: `-- Decommissioning contractor in Barrackpore:
REVOKE ALL PRIVILEGES, GRANT OPTION FROM 'contractor_auditor'@'192.168.1.%';
DROP USER 'contractor_auditor'@'192.168.1.%';`
  },
  {
    question: "In Abhronila & Debangshu's Kolkata fintech bank, an automated microservice required `SELECT` and `INSERT` on the `transactions` table, but `DELETE` was forbidden. How was this enforced with `GRANT`?",
    shortAnswer: "Debangshu executed `GRANT SELECT, INSERT ON kolkata_bank.transactions TO 'txn_service'@'10.10.%.%';` explicitly omitting DELETE.",
    explanation: "By explicitly enumerating only the required operations (`SELECT, INSERT`) at the Table level, the microservice possesses zero deletion rights. Any SQL injection or malfunctioning code attempting `DELETE FROM transactions` is rejected with Error 1142.",
    hint: "Enumerate only required privileges explicitly; do not use ALL PRIVILEGES.",
    level: "expert",
    codeExample: `-- Least privilege table grant in Kolkata:
GRANT SELECT, INSERT 
ON kolkata_bank.transactions 
TO 'txn_service'@'10.10.%.%';`
  },
  {
    question: "What is the difference between `GRANT PROXY` and standard object grants?",
    shortAnswer: "GRANT PROXY allows an external user (like an LDAP or PAM authenticated user) to assume the identity and privileges of another local MySQL account.",
    explanation: "In proxy authentication architectures, corporate users authenticate via LDAP with generic credentials, but MySQL proxies them to a local role account: `GRANT PROXY ON 'local_app_user' TO 'ldap_external_user';`.",
    hint: "Proxy grants allow one user to impersonate another user's privileges.",
    level: "expert",
    codeExample: `GRANT PROXY ON 'finance_app_user'@'localhost' TO 'ldap_emp_982'@'%';`
  },
  {
    question: "How do you grant column-level `UPDATE` privilege on a `customer_status` column while allowing `SELECT` on all columns of the `customers` table?",
    shortAnswer: "Execute `GRANT SELECT ON db.customers TO 'user'@'host';` and `GRANT UPDATE (customer_status) ON db.customers TO 'user'@'host';`.",
    explanation: "MySQL allows combining table-level `SELECT` with column-level `UPDATE`. The user can read all customer details, but can only write updates to the `customer_status` column.",
    hint: "Combine table-level SELECT with column-level UPDATE.",
    level: "intermediate",
    codeExample: `GRANT SELECT ON kolkata_retail.customers TO 'support_rep'@'%';
GRANT UPDATE (customer_status) ON kolkata_retail.customers TO 'support_rep'@'%';`
  },
  {
    question: "What happens if you run `GRANT SELECT ON db.* TO 'user'@'host'` when the user does not already exist?",
    shortAnswer: "In MySQL 8.0, it throws `ERROR 1410 (42000): You are not allowed to create a user with GRANT`.",
    explanation: "In older MySQL versions (5.6/5.7 with NO_AUTO_CREATE_USER disabled), `GRANT` would silently create a user with an empty password. In MySQL 8.0, implicit account creation via `GRANT` is completely removed; accounts MUST be explicitly created with `CREATE USER` first.",
    hint: "MySQL 8.0 forbids creating user accounts via GRANT statements.",
    level: "basic",
    codeExample: `-- Must create user first:
CREATE USER 'new_user'@'localhost' IDENTIFIED BY 'StrongP@ss2026!';
GRANT SELECT ON db.* TO 'new_user'@'localhost';`
  },
  {
    question: "How do you revoke column-level `UPDATE` privilege while leaving column-level `SELECT` privilege intact?",
    shortAnswer: "`REVOKE UPDATE (column_name) ON db.table_name FROM 'user'@'host';`",
    explanation: "Specifying the privilege type and column list in the `REVOKE` statement removes that specific column capability from `mysql.columns_priv`.",
    hint: "Specify the exact column in parentheses after the privilege in the REVOKE statement.",
    level: "intermediate",
    codeExample: `REVOKE UPDATE (customer_status) ON kolkata_retail.customers FROM 'support_rep'@'%';`
  },
  {
    question: "What is the `SHOW DATABASES` privilege, and how does granting it impact user visibility in `SHOW SCHEMAS`?",
    shortAnswer: "It allows a user to see all database names on the server; without it, users only see databases for which they hold explicit object privileges.",
    explanation: "By default, when a user executes `SHOW DATABASES;`, MySQL only lists databases where the user possesses at least one privilege. Granting global `SHOW DATABASES ON *.*` exposes the names of all schemas across the server.",
    hint: "Controls visibility of database names in SHOW DATABASES output.",
    level: "basic",
    codeExample: `-- Granting visibility of all database names:
GRANT SHOW DATABASES ON *.* TO 'dba_assistant'@'localhost';`
  },
  {
    question: "Can `REVOKE` remove privileges from multiple users in a single statement?",
    shortAnswer: "Yes, by listing multiple user accounts separated by commas in the `FROM` clause.",
    explanation: "Syntax: `REVOKE SELECT ON db.* FROM 'user1'@'host', 'user2'@'host';`. MySQL processes the revocations atomically.",
    hint: "List multiple users separated by commas in the FROM clause.",
    level: "basic",
    codeExample: `REVOKE DELETE ON kolkata_retail.orders 
FROM 'clerk1'@'10.0.%.%', 'clerk2'@'10.0.%.%';`
  },
  {
    question: "What is the `REPLICATION SLAVE` privilege, and which scope is required when granting it?",
    shortAnswer: "It allows a replication replica to connect to the primary source binary log; it must be granted at the Global (*.*) scope.",
    explanation: "Replication replicas stream binary log events across the entire MySQL instance. Therefore, `REPLICATION SLAVE` is a global administrative privilege stored in `mysql.user`.",
    hint: "Replication privileges must be granted globally on *.*.",
    level: "intermediate",
    codeExample: `GRANT REPLICATION SLAVE ON *.* TO 'repl_user'@'192.168.1.100';`
  },
  {
    question: "How do you inspect the exact `GRANT` statements required to reconstruct a user's permissions?",
    shortAnswer: "Execute `SHOW GRANTS FOR 'username'@'host';`.",
    explanation: "`SHOW GRANTS` displays the exact canonical `GRANT` statements reflecting the user's current effective static, dynamic, and role privileges.",
    hint: "Run SHOW GRANTS FOR 'user'@'host'.",
    level: "basic",
    codeExample: `SHOW GRANTS FOR 'app_service'@'10.10.%.%';`
  },
  {
    question: "What is the `SHUTDOWN` privilege, and what commands does it permit?",
    shortAnswer: "It permits executing the `SHUTDOWN` SQL statement and using `mysqladmin shutdown` to stop the MySQL server daemon.",
    explanation: "A critical global administrative privilege that should only be assigned to local system administrators or cluster orchestration daemons.",
    hint: "Permits stopping the MySQL server process.",
    level: "intermediate",
    codeExample: `GRANT SHUTDOWN ON *.* TO 'cluster_manager'@'localhost';`
  },
  {
    question: "What happens to Table and Column grants if the underlying table is dropped via `DROP TABLE`?",
    shortAnswer: "The privileges remain recorded in `mysql.tables_priv` and `mysql.columns_priv` as orphaned grant entries until explicitly revoked.",
    explanation: "Dropping a table does not automatically clean up rows in the privilege tables. If a new table is later created with the exact same name in that database, the user will automatically inherit the old table privileges.",
    hint: "Table grants survive DROP TABLE and attach to newly created tables of the same name.",
    level: "expert",
    codeExample: `-- Best Practice: Revoke table privileges before dropping the table:
REVOKE ALL PRIVILEGES ON kolkata_retail.legacy_table FROM 'app_user'@'%';
DROP TABLE kolkata_retail.legacy_table;`
  },
  {
    question: "What is the `CREATE TEMPORARY TABLES` privilege, and why is it safer than standard `CREATE`?",
    shortAnswer: "It allows creating session-scoped temporary tables that are invisible to other sessions and automatically deleted upon disconnection, without granting rights to create permanent tables.",
    explanation: "Analytics and ETL pipelines often need to stage intermediate calculations in temporary tables. Granting `CREATE TEMPORARY TABLES` enables this without giving users the power to create clutter or modify the schema permanently.",
    hint: "Enables session-isolated temporary tables for ETL without permanent schema pollution.",
    level: "intermediate",
    codeExample: `GRANT SELECT, CREATE TEMPORARY TABLES ON kolkata_retail.* TO 'etl_worker'@'%';`
  },
  {
    question: "What is the `FILE` privilege in MySQL, and why is it considered a high-risk security privilege?",
    shortAnswer: "It allows reading and writing files on the database server host operating system using `LOAD DATA INFILE` and `SELECT ... INTO OUTFILE`.",
    explanation: "If granted to an untrusted account or compromised via SQL injection, an attacker with `FILE` privilege can read `/etc/passwd` or write PHP web shells to the web server's document root (restricted by `secure_file_priv`).",
    hint: "Think of server-side operating system file read/write access.",
    level: "expert",
    codeExample: `-- Only grant FILE to dedicated backup/export administrators:
GRANT FILE ON *.* TO 'export_admin'@'localhost';`
  },
  {
    question: "How does `GRANT OPTION` interact with `REVOKE` when multiple grantors have assigned privileges?",
    shortAnswer: "Any administrator with sufficient privileges can revoke a user's permissions regardless of who originally executed the GRANT.",
    explanation: "MySQL does not maintain a cascading dependency tree where revoking a grantor's privileges automatically cascades to users they granted privileges to (unlike PostgreSQL/Oracle CASCADE options).",
    hint: "Revocations are not dependent on the original grantor identity.",
    level: "expert",
    codeExample: `REVOKE ALL PRIVILEGES, GRANT OPTION FROM 'sub_admin'@'%';`
  },
  {
    question: "What is the `ROLE_ADMIN` dynamic privilege in MySQL 8.0?",
    shortAnswer: "It allows a user to create, drop, grant, and revoke MySQL 8.0 roles without requiring full global administrative privileges.",
    explanation: "Enables delegating role-based access control (RBAC) administration to security officers without giving them rights to read business data or change server configuration.",
    hint: "Grants administrative authority over roles and role assignments.",
    level: "intermediate",
    codeExample: `GRANT ROLE_ADMIN ON *.* TO 'security_officer'@'localhost';`
  },
  {
    question: "Can you grant privileges on a database that does not yet exist in MySQL?",
    shortAnswer: "Yes, MySQL allows executing `GRANT ... ON non_existent_db.* TO ...` without throwing an error.",
    explanation: "Because database grants are simply metadata rows inserted into `mysql.db`, MySQL does not validate whether the physical schema directory exists at the time of the grant. When the database is created later, the user automatically possesses the granted access.",
    hint: "Grants are metadata entries; schema pre-existence is not validated.",
    level: "intermediate",
    codeExample: `GRANT ALL PRIVILEGES ON future_q4_project.* TO 'project_lead'@'%';`
  },
  {
    question: "How do you revoke all privileges on a specific database while leaving privileges on other databases untouched?",
    shortAnswer: "`REVOKE ALL PRIVILEGES ON db_name.* FROM 'username'@'host';`",
    explanation: "Confining the `ALL PRIVILEGES` specifier to a specific database (`db_name.*`) strips all permissions within that schema without affecting grants in other databases.",
    hint: "Use REVOKE ALL PRIVILEGES ON specific_db.* FROM user.",
    level: "basic",
    codeExample: `REVOKE ALL PRIVILEGES ON temporary_sandbox.* FROM 'dev_user'@'localhost';`
  },
  {
    question: "What is the primary operational takeaway of Topic 6 in Module 004_003?",
    shortAnswer: "GRANT and REVOKE provide atomic, real-time control over database authorization: enforce the Principle of Least Privilege by explicitly scoping grants, avoid over-granting WITH GRANT OPTION, and leverage partial revokes in multi-tenant architectures.",
    explanation: "Mastering `GRANT` and `REVOKE` ensures database integrity and security compliance. By assigning exact privileges at the appropriate scope and executing atomic revocations when decommissioning accounts, administrators eliminate privilege creep and protect critical enterprise assets.",
    hint: "Summarize atomic privilege provisioning, least privilege scoping, and secure decommissioning.",
    level: "basic",
    codeExample: `-- Production Golden Rule for Application Provisioning:
CREATE USER 'billing_service'@'10.10.%.%' IDENTIFIED WITH caching_sha2_password BY 'StrongVaultPass#2026' REQUIRE SSL;
GRANT SELECT, INSERT, UPDATE ON kolkata_billing.invoices TO 'billing_service'@'10.10.%.%';
GRANT EXECUTE ON PROCEDURE kolkata_billing.sp_process_payment TO 'billing_service'@'10.10.%.%';`
  }
];

export default questions;
