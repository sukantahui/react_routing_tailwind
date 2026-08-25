// topic7_files/topic7_questions.js
// Topic 7: Verifying Permissions with SHOW GRANTS and Inspecting mysql.user System Table

const questions = [
  {
    question: "What is the primary SQL command used to display the active privileges granted to the current session user?",
    shortAnswer: "`SHOW GRANTS;` (or `SHOW GRANTS FOR CURRENT_USER;` / `SHOW GRANTS FOR CURRENT_USER();`).",
    explanation: "Executing `SHOW GRANTS;` returns a list of canonical `GRANT` statements that accurately reconstruct the user's currently effective privileges across all scopes.",
    hint: "Use SHOW GRANTS or SHOW GRANTS FOR CURRENT_USER.",
    level: "basic",
    codeExample: `SHOW GRANTS;
-- Or explicitly:
SHOW GRANTS FOR CURRENT_USER();`
  },
  {
    question: "What privilege is required for a user to execute `SHOW GRANTS FOR 'other_user'@'host'`?",
    shortAnswer: "The user must hold `SELECT` privilege on the `mysql` system database or the `SYSTEM_USER` dynamic privilege.",
    explanation: "Any user can inspect their own grants via `SHOW GRANTS FOR CURRENT_USER`. However, inspecting other users' permissions requires reading the data dictionary tables, which requires `SELECT` on `mysql.*`.",
    hint: "Requires SELECT on mysql schema or SYSTEM_USER privilege.",
    level: "intermediate",
    codeExample: `-- Granting permission to an auditor to inspect all users' grants:
GRANT SELECT ON mysql.* TO 'security_auditor'@'10.0.%.%';`
  },
  {
    question: "What does `SHOW GRANTS FOR 'user'@'host' USING 'role_name'` do in MySQL 8.0?",
    shortAnswer: "It displays the combined effective privileges the user would possess if the specified role were actively enabled in their session.",
    explanation: "In MySQL 8.0 RBAC, roles assigned to users may not be active by default. The `USING` clause simulates the role activation, showing all direct grants plus all role-inherited permissions.",
    hint: "Look at the USING role_name clause for simulating role activation.",
    level: "intermediate",
    codeExample: `SHOW GRANTS FOR 'susmita_analyst'@'%' USING 'finance_reporting_role';`
  },
  {
    question: "Which system table stores Global static privileges, account credentials, and locking status in MySQL 8.0?",
    shortAnswer: "`mysql.user`.",
    explanation: "The `mysql.user` table is the central account registry. It stores the account identity (`User`, `Host`), authentication plugin, encrypted password hash, global static privilege flags (`Select_priv`, `Insert_priv`), resource limits, and account lock flags.",
    hint: "Inspect the mysql.user table.",
    level: "basic",
    codeExample: `SELECT User, Host, plugin, account_locked, password_expired 
FROM mysql.user 
ORDER BY User;`
  },
  {
    question: "Which system table stores Database-level privileges in MySQL?",
    shortAnswer: "`mysql.db`.",
    explanation: "The `mysql.db` table records grants scoped to specific schemas (`db_name.*`). Columns include `Host`, `Db`, `User`, followed by individual privilege flags (`Select_priv`, `Insert_priv`, `Update_priv`, `Create_priv`, etc.).",
    hint: "Query the mysql.db table.",
    level: "basic",
    codeExample: `SELECT Host, Db, User, Select_priv, Insert_priv, Update_priv 
FROM mysql.db 
WHERE Db = 'kolkata_retail';`
  },
  {
    question: "Which system table stores Table-level privileges, and what data type is used for the `Table_priv` column?",
    shortAnswer: "`mysql.tables_priv`, which stores granted privileges as a MySQL `SET` data type containing comma-separated privilege names.",
    explanation: "`mysql.tables_priv` records grants on individual tables. The `Table_priv` column contains a `SET('Select','Insert','Update','Delete','Create','Drop','Grant','References','Index','Alter','Create View','Show view','Trigger')`.",
    hint: "Inspect Table_priv in mysql.tables_priv.",
    level: "intermediate",
    codeExample: `SELECT Host, Db, User, Table_name, Table_priv, Column_priv 
FROM mysql.tables_priv 
WHERE User = 'support_rep';`
  },
  {
    question: "Which system table stores Column-level privileges, and how are individual column names recorded?",
    shortAnswer: "`mysql.columns_priv`, where each row specifies `User`, `Host`, `Db`, `Table_name`, `Column_name`, and the `Column_priv` SET.",
    explanation: "Unlike `mysql.tables_priv` which aggregates table privileges into one row per table, `mysql.columns_priv` stores one distinct row for each granted column on a table.",
    hint: "Look at mysql.columns_priv where each column grant has its own row.",
    level: "intermediate",
    codeExample: `SELECT User, Host, Db, Table_name, Column_name, Column_priv 
FROM mysql.columns_priv 
ORDER BY Table_name, Column_name;`
  },
  {
    question: "Which system table stores privileges on Stored Procedures and Stored Functions?",
    shortAnswer: "`mysql.procs_priv`.",
    explanation: "`mysql.procs_priv` stores routine grants, detailing `Host`, `Db`, `User`, `Routine_name`, `Routine_type` ('FUNCTION' or 'PROCEDURE'), `Grantor`, and `Proc_priv` (`SET('Execute','Alter Routine','Grant')`).",
    hint: "Query mysql.procs_priv for stored program grants.",
    level: "basic",
    codeExample: `SELECT Host, Db, User, Routine_name, Routine_type, Proc_priv 
FROM mysql.procs_priv;`
  },
  {
    question: "Where are Dynamic Privileges (such as `SYSTEM_VARIABLES_ADMIN` and `BACKUP_ADMIN`) stored in MySQL 8.0?",
    shortAnswer: "In the `mysql.global_grants` system table.",
    explanation: "Because Dynamic Privileges can be added dynamically at runtime by plugins or components, they are not stored as fixed columns in `mysql.user`. Instead, they are stored as individual rows in `mysql.global_grants`.",
    hint: "Dynamic privileges are stored in mysql.global_grants.",
    level: "intermediate",
    codeExample: `SELECT USER, HOST, PRIVILEGE, WITH_GRANT_OPTION 
FROM mysql.global_grants 
ORDER BY PRIVILEGE, USER;`
  },
  {
    question: "What is the difference between querying `information_schema.USER_PRIVILEGES` versus querying `mysql.user` directly?",
    shortAnswer: "`information_schema.USER_PRIVILEGES` provides an ANSI SQL-standard, read-only view of effective global privileges without requiring root access to the mysql system schema.",
    explanation: "`information_schema` tables (`USER_PRIVILEGES`, `SCHEMA_PRIVILEGES`, `TABLE_PRIVILEGES`, `COLUMN_PRIVILEGES`) present authorization metadata in a standardized, database-agnostic format accessible to non-root users based on their active session grants.",
    hint: "information_schema provides ANSI-standard views without exposing raw internal mysql tables.",
    level: "expert",
    codeExample: `SELECT GRANTEE, PRIVILEGE_TYPE, IS_GRANTABLE 
FROM information_schema.USER_PRIVILEGES;`
  },
  {
    question: "In Mamata & Susmita's Barrackpore retail store, an automated audit query was written to detect any accounts holding dangerous administrative privileges. What SQL query did they run?",
    shortAnswer: "`SELECT User, Host, Super_priv, Reload_priv, Shutdown_priv FROM mysql.user WHERE Super_priv = 'Y' OR Reload_priv = 'Y';`",
    explanation: "Automated compliance checks should regularly verify that no unauthorized service accounts have escalated privileges. Running this query guarantees that only designated DBA accounts hold global administrative rights.",
    hint: "Filter mysql.user for Super_priv = 'Y' or Reload_priv = 'Y'.",
    level: "moderate",
    codeExample: `-- Security compliance audit query in Barrackpore:
SELECT User, Host, plugin, account_locked 
FROM mysql.user 
WHERE Super_priv = 'Y' OR Reload_priv = 'Y' OR Shutdown_priv = 'Y';`
  },
  {
    question: "In Abhronila & Debangshu's Kolkata fintech bank, how did they audit accounts that had not rotated their passwords in over 180 days across ₹50 Crore transaction ledgers?",
    shortAnswer: "By querying `mysql.user` for `password_last_changed < NOW() - INTERVAL 180 DAY`.",
    explanation: "The `password_last_changed` column in `mysql.user` records the timestamp of the last password modification, allowing security teams to audit compliance with quarterly or semi-annual rotation mandates.",
    hint: "Compare password_last_changed against NOW() - INTERVAL N DAY.",
    level: "expert",
    codeExample: `-- Stale password audit query in Kolkata:
SELECT User, Host, password_last_changed, 
       DATEDIFF(NOW(), password_last_changed) AS days_since_rotation 
FROM mysql.user 
WHERE password_last_changed < NOW() - INTERVAL 180 DAY
  AND account_locked = 'N';`
  },
  {
    question: "What does the `password_expired` column in `mysql.user` indicate?",
    shortAnswer: "It indicates whether the user's password is in an expired state (`Y` or `N`), forcing them into sandbox mode on their next login.",
    explanation: "If `password_expired = 'Y'`, the user must execute `ALTER USER USER() IDENTIFIED BY ...` before any normal database queries can be executed.",
    hint: "Indicates whether the account is currently in expired password sandbox mode.",
    level: "basic",
    codeExample: `SELECT User, Host, password_expired FROM mysql.user WHERE password_expired = 'Y';`
  },
  {
    question: "What does the `account_locked` column in `mysql.user` indicate?",
    shortAnswer: "It indicates whether the account is administratively locked (`Y` or `N`), refusing all new connection attempts.",
    explanation: "Accounts with `account_locked = 'Y'` return Error 3118 immediately during connection handshake.",
    hint: "Indicates administrative or automated brute-force account locking.",
    level: "basic",
    codeExample: `SELECT User, Host, account_locked FROM mysql.user WHERE account_locked = 'Y';`
  },
  {
    question: "What columns in `mysql.user` enforce resource quotas and connection throttling on user accounts?",
    shortAnswer: "`max_questions`, `max_updates`, `max_connections`, and `max_user_connections`.",
    explanation: "These columns record per-hour resource limits (queries, updates, connections) and maximum concurrent simultaneous connections (`max_user_connections`), preventing connection pool starvation attacks.",
    hint: "Look for max_questions, max_updates, and max_user_connections.",
    level: "intermediate",
    codeExample: `SELECT User, Host, max_questions, max_user_connections 
FROM mysql.user 
WHERE max_user_connections > 0;`
  },
  {
    question: "What does a line starting with `GRANT USAGE ON *.* TO 'user'@'host'` in `SHOW GRANTS` mean?",
    shortAnswer: "It means the account has permission to connect and authenticate to the server, but possesses zero database privileges.",
    explanation: "`USAGE` is a synonym for 'no privileges'. Every valid MySQL account has at least `GRANT USAGE ON *.*`.",
    hint: "USAGE represents baseline connection rights without data access permissions.",
    level: "basic",
    codeExample: `-- Output of SHOW GRANTS for a newly created user with no permissions:
-- GRANT USAGE ON *.* TO 'intern'@'localhost'`
  },
  {
    question: "How can you audit all accounts that do NOT enforce SSL/TLS encryption in MySQL 8.0?",
    shortAnswer: "Query `mysql.user` for `ssl_type = ''` (empty string indicates no SSL requirement).",
    explanation: "The `ssl_type` column stores `ANY`, `X509`, `SPECIFIED`, or `''`. An empty string signifies that the user is permitted to connect over unencrypted plaintext TCP.",
    hint: "Check the ssl_type column in mysql.user.",
    level: "intermediate",
    codeExample: `SELECT User, Host, ssl_type 
FROM mysql.user 
WHERE ssl_type = '' AND Host != 'localhost';`
  },
  {
    question: "How do you inspect the role assignment relationships and edges between users and roles in MySQL 8.0?",
    shortAnswer: "Query the `mysql.role_edges` and `mysql.default_roles` system tables.",
    explanation: "`mysql.role_edges` records the graph edges between `FROM_USER` (the role) and `TO_USER` (the grantee user), while `mysql.default_roles` records roles automatically activated on login.",
    hint: "Query mysql.role_edges and mysql.default_roles.",
    level: "expert",
    codeExample: `SELECT FROM_USER AS Role_Name, TO_USER AS Assigned_User, TO_HOST 
FROM mysql.role_edges;`
  },
  {
    question: "What is the `information_schema.SCHEMA_PRIVILEGES` table used for?",
    shortAnswer: "It lists all database-level privileges (`db.*`) across all users in an ANSI SQL-standard view.",
    explanation: "Columns include `GRANTEE`, `TABLE_CATALOG`, `TABLE_SCHEMA`, `PRIVILEGE_TYPE`, and `IS_GRANTABLE`.",
    hint: "ANSI-compliant view for database-level permissions.",
    level: "intermediate",
    codeExample: `SELECT GRANTEE, TABLE_SCHEMA, PRIVILEGE_TYPE 
FROM information_schema.SCHEMA_PRIVILEGES 
WHERE TABLE_SCHEMA = 'kolkata_retail';`
  },
  {
    question: "What is the `information_schema.TABLE_PRIVILEGES` table used for?",
    shortAnswer: "It displays explicit Table-level grants across all schemas in an ANSI SQL-standard view.",
    explanation: "Provides readable audit rows showing which users hold `SELECT`, `INSERT`, `UPDATE`, or `DELETE` on specific individual tables.",
    hint: "ANSI-compliant view for table-level permissions.",
    level: "intermediate",
    codeExample: `SELECT GRANTEE, TABLE_NAME, PRIVILEGE_TYPE 
FROM information_schema.TABLE_PRIVILEGES 
WHERE TABLE_NAME = 'orders';`
  },
  {
    question: "What is the `information_schema.COLUMN_PRIVILEGES` table used for?",
    shortAnswer: "It displays fine-grained Column-level grants across all tables in an ANSI SQL-standard view.",
    explanation: "Columns include `GRANTEE`, `TABLE_SCHEMA`, `TABLE_NAME`, `COLUMN_NAME`, and `PRIVILEGE_TYPE`.",
    hint: "ANSI-compliant view for column-level permissions.",
    level: "intermediate",
    codeExample: `SELECT GRANTEE, TABLE_NAME, COLUMN_NAME, PRIVILEGE_TYPE 
FROM information_schema.COLUMN_PRIVILEGES;`
  },
  {
    question: "How do you check if a specific user possesses the `SYSTEM_VARIABLES_ADMIN` dynamic privilege?",
    shortAnswer: "Query `mysql.global_grants` for `USER = 'username'` and `PRIVILEGE = 'SYSTEM_VARIABLES_ADMIN'`.",
    explanation: "Checking `mysql.global_grants` confirms dynamic privilege assignments directly.",
    hint: "Query mysql.global_grants filtering by user and privilege name.",
    level: "basic",
    codeExample: `SELECT * FROM mysql.global_grants 
WHERE USER = 'config_admin' AND PRIVILEGE = 'SYSTEM_VARIABLES_ADMIN';`
  },
  {
    question: "What happens if a user account exists in `mysql.user` but has no matching row in `mysql.db` or `mysql.tables_priv`?",
    shortAnswer: "The user has only whatever global privileges are enabled in `mysql.user` (or USAGE if all global flags are 'N'), and zero database/table-level rights.",
    explanation: "MySQL evaluates permissions per tier. Without rows in `mysql.db` or lower tables, the user cannot access any databases unless global privileges (like `SELECT ON *.*`) were granted.",
    hint: "The account operates purely on its global privilege set.",
    level: "basic",
    codeExample: `-- Account with only USAGE in mysql.user and no lower grants:
-- Can connect, but cannot SELECT from any database.`
  },
  {
    question: "How can you programmatically export `SHOW GRANTS` for all users into an SQL backup script?",
    shortAnswer: "Using a SQL cursor or shell script that queries `mysql.user` and executes `SHOW GRANTS FOR ...` for each account.",
    explanation: "DBAs use automated export scripts to snapshot user permissions into version control or replication failover scripts.",
    hint: "Loop through mysql.user and execute SHOW GRANTS for each account.",
    level: "expert",
    codeExample: `# Shell script exporting all grants:
mysql -B -N -e "SELECT CONCAT('SHOW GRANTS FOR \`', user, '\`@\`', host, '\`;') FROM mysql.user;" | mysql`
  },
  {
    question: "What does the `Grantor` column in `mysql.tables_priv` indicate during a security audit?",
    shortAnswer: "It records the identity (`'grantor_user'@'grantor_host'`) of the administrator who executed the `GRANT` statement, creating an audit trail of privilege delegation.",
    explanation: "This enables forensic investigators to trace who assigned permissions to a compromised or rogue service account.",
    hint: "Audit trail identifying which DBA executed the GRANT.",
    level: "intermediate",
    codeExample: `SELECT User, Host, Table_name, Grantor, Timestamp 
FROM mysql.tables_priv;`
  },
  {
    question: "What does `CURRENT_USER()` return compared to `USER()` during privilege inspection?",
    shortAnswer: "`CURRENT_USER()` returns the authenticated account identity used for privilege checking (e.g. 'app'@'%'); `USER()` returns the client-supplied connection string (e.g. 'app'@'192.168.1.55').",
    explanation: "When host wildcards or anonymous accounts are used, `USER()` shows what the client typed, but `CURRENT_USER()` shows the exact rule in `mysql.user` that matched and governs authorization.",
    hint: "CURRENT_USER() shows the authorized rule; USER() shows the raw client string.",
    level: "expert",
    codeExample: `SELECT USER(), CURRENT_USER();
-- USER(): 'mamata'@'192.168.1.45'
-- CURRENT_USER(): 'mamata'@'192.168.1.%'`
  },
  {
    question: "How do you verify if an account is configured with `caching_sha2_password` vs `mysql_native_password` in `mysql.user`?",
    shortAnswer: "Query the `plugin` column in `mysql.user`.",
    explanation: "The `plugin` column records the exact authentication plugin name governing that account's password verification.",
    hint: "Check the plugin column in mysql.user.",
    level: "basic",
    codeExample: `SELECT User, Host, plugin FROM mysql.user ORDER BY plugin;`
  },
  {
    question: "What does `Timestamp` column in `mysql.tables_priv` and `mysql.columns_priv` record?",
    shortAnswer: "The date and time when the table or column privilege was granted or last modified.",
    explanation: "Provides forensic timestamps for privilege changes without requiring external audit plugins.",
    hint: "Records the timestamp when the grant was executed.",
    level: "intermediate",
    codeExample: `SELECT Table_name, Table_priv, Timestamp FROM mysql.tables_priv;`
  },
  {
    question: "Can an administrator query `mysql.user` without holding the `SELECT` privilege on the `mysql` database?",
    shortAnswer: "No, access to the mysql system database is restricted to administrators holding global privileges.",
    explanation: "Standard users querying `SELECT * FROM mysql.user;` receive `ERROR 1142: SELECT command denied to user for table 'user'`. They should query `information_schema.USER_PRIVILEGES` instead.",
    hint: "Direct access to mysql.* tables requires administrative SELECT rights.",
    level: "basic",
    codeExample: `-- Standard user should query information_schema:
SELECT * FROM information_schema.USER_PRIVILEGES;`
  },
  {
    question: "What is the primary operational takeaway of Topic 7 in Module 004_003?",
    shortAnswer: "Verifying permissions with `SHOW GRANTS` and auditing the data dictionary tables (`mysql.user`, `mysql.db`, `mysql.tables_priv`, `mysql.columns_priv`, `mysql.procs_priv`, `mysql.global_grants`) provides full transparency and visibility into database access control.",
    explanation: "Regular privilege audits protect enterprises against privilege creep, orphaned permissions, and misconfigured service accounts. By mastering `SHOW GRANTS` and data dictionary inspection, DBAs ensure strict adherence to least privilege security and regulatory compliance.",
    hint: "Summarize SHOW GRANTS and data dictionary inspection as essential auditing tools.",
    level: "basic",
    codeExample: `-- Universal Security Audit Query:
SHOW GRANTS FOR 'app_service'@'10.10.%.%';
SELECT User, Host, plugin, account_locked, password_expired, password_last_changed 
FROM mysql.user 
WHERE User = 'app_service';`
  }
];

export default questions;
