// topic5_files/topic5_questions.js
// Topic 5: Granular Privilege Levels – Global, Database, Table, Column, and Routine Privileges

const questions = [
  {
    question: "What are the 5 granular privilege levels in MySQL 8.0, from broadest to most specific?",
    shortAnswer: "1. Global (*.*), 2. Database (db.*), 3. Table (db.table), 4. Column (db.table(col1, col2)), and 5. Routine (PROCEDURE / FUNCTION).",
    explanation: "MySQL's access control subsystem operates across five distinct scope boundaries. A privilege granted at a higher tier automatically encompasses all lower objects in that scope. For example, `SELECT ON *.*` grants read access to all databases, tables, and columns server-wide.",
    hint: "Think of the hierarchy: Server → Database → Table → Column / Stored Routine.",
    level: "basic",
    codeExample: `-- The 5 privilege scopes:
GRANT SELECT ON *.* TO 'global_user'@'%';                 -- 1. Global
GRANT SELECT ON kolkata_db.* TO 'db_user'@'%';           -- 2. Database
GRANT SELECT ON kolkata_db.orders TO 'tbl_user'@'%';     -- 3. Table
GRANT SELECT (order_id, status) ON kolkata_db.orders TO 'col_user'@'%'; -- 4. Column
GRANT EXECUTE ON PROCEDURE kolkata_db.sp_process TO 'rtn_user'@'%';   -- 5. Routine`
  },
  {
    question: "Which specific system tables in the MySQL data dictionary store each of the 5 privilege levels?",
    shortAnswer: "Global in `mysql.user`, Database in `mysql.db`, Table in `mysql.tables_priv`, Column in `mysql.columns_priv`, and Routine in `mysql.procs_priv`.",
    explanation: "When MySQL Server starts or receives a `FLUSH PRIVILEGES` command, it loads permission definitions from these five system tables into high-speed memory structures. When queries are received, the engine checks these tables in order.",
    hint: "Recall the tables: user, db, tables_priv, columns_priv, and procs_priv.",
    level: "basic",
    codeExample: `SELECT User, Host, Select_priv FROM mysql.user;
SELECT User, Host, Db, Select_priv FROM mysql.db;
SELECT User, Host, Db, Table_name, Table_priv, Column_priv FROM mysql.tables_priv;
SELECT User, Host, Db, Table_name, Column_name, Column_priv FROM mysql.columns_priv;
SELECT User, Host, Db, Routine_name, Routine_type, Proc_priv FROM mysql.procs_priv;`
  },
  {
    question: "How does the MySQL authorization engine evaluate permissions when a user executes a `SELECT` query?",
    shortAnswer: "It performs an upward-breadth seek: checking Global (mysql.user) → Database (mysql.db) → Table (mysql.tables_priv) → Column (mysql.columns_priv), granting access as soon as a matching tier is found.",
    explanation: "If the user has `SELECT` in `mysql.user`, MySQL approves the query immediately without checking lower tables. If not, it checks `mysql.db`. If not present there, it checks `mysql.tables_priv`. Finally, it checks `mysql.columns_priv` for the specific requested columns. If no level matches, it returns Error 1142.",
    hint: "Follow the cascading check from Global down to Column.",
    level: "intermediate",
    codeExample: `-- Flow: mysql.user → mysql.db → mysql.tables_priv → mysql.columns_priv`
  },
  {
    question: "Why can't `DELETE`, `TRIGGER`, `INDEX`, or `ALTER` privileges be granted at the Column level in MySQL?",
    shortAnswer: "Because those operations structurally affect the entire row or table definition rather than individual attribute values.",
    explanation: "`DELETE` removes entire rows, not individual cell values. `INDEX` and `ALTER` modify table metadata, and `TRIGGER` fires on table-level DML events. Therefore, only `SELECT`, `INSERT`, `UPDATE`, and `REFERENCES` can be granted at the Column level.",
    hint: "Think about whether an operation acts on an individual column value or an entire row/table structure.",
    level: "intermediate",
    codeExample: `-- Allowed Column Grants:
GRANT SELECT (order_id), UPDATE (order_status) ON retail.orders TO 'app'@'%';

-- Prohibited Column Grant (Throws Syntax Error):
-- GRANT DELETE (order_id) ON retail.orders TO 'app'@'%';`
  },
  {
    question: "What is the syntax to grant a user permission to view only the `customer_id` and `order_status` columns of an `orders` table?",
    shortAnswer: "`GRANT SELECT (customer_id, order_status) ON retail.orders TO 'support_rep'@'10.0.%.%';`",
    explanation: "Enclosing column names in parentheses directly following the privilege name binds the grant strictly to those specific attributes. Querying `SELECT order_total FROM retail.orders;` will throw Error 1142 (SELECT command denied).",
    hint: "Specify column names in parentheses after the privilege keyword.",
    level: "basic",
    codeExample: `GRANT SELECT (customer_id, order_status) 
ON kolkata_retail.orders 
TO 'support_rep'@'10.0.%.%';`
  },
  {
    question: "What are 'Dynamic Privileges' in MySQL 8.0, and how do they improve security over the legacy `SUPER` privilege?",
    shortAnswer: "Dynamic Privileges are fine-grained operational rights registered at runtime, allowing administrators to grant specific capabilities without giving full SUPER root access.",
    explanation: "In MySQL 5.7, the `SUPER` privilege was an all-or-nothing administrative master key that allowed changing system variables, terminating queries, replication administration, and binary log purges. MySQL 8.0 deprecated `SUPER` and introduced over 30 Dynamic Privileges (`SYSTEM_VARIABLES_ADMIN`, `BACKUP_ADMIN`, `CONNECTION_ADMIN`), enforcing the Principle of Least Privilege.",
    hint: "Think of breaking down a single dangerous master key into dozens of specific security badges.",
    level: "intermediate",
    codeExample: `-- Granting specific DBA duties without SUPER:
GRANT BACKUP_ADMIN, BINLOG_ADMIN ON *.* TO 'backup_operator'@'localhost';
GRANT SYSTEM_VARIABLES_ADMIN ON *.* TO 'config_manager'@'localhost';`
  },
  {
    question: "What is the difference between `SQL SECURITY DEFINER` and `SQL SECURITY INVOKER` on stored routines?",
    shortAnswer: "DEFINER executes the routine with the privileges of the routine's creator; INVOKER executes the routine with the privileges of the calling user.",
    explanation: "By default, routines are `SQL SECURITY DEFINER`. This allows an administrator to grant a restricted user `EXECUTE` on a stored procedure that updates a sensitive table without granting the user direct `INSERT` or `UPDATE` table privileges. `INVOKER` requires the caller to possess direct privileges on all referenced tables.",
    hint: "Differentiate between running with the creator's authority vs the caller's authority.",
    level: "expert",
    codeExample: `CREATE PROCEDURE sp_process_refund(IN p_order_id INT)
SQL SECURITY DEFINER
BEGIN
  -- Updates finance ledger even if caller lacks direct UPDATE rights on ledger table!
  UPDATE finance_ledger SET status = 'REFUNDED' WHERE order_id = p_order_id;
END;`
  },
  {
    question: "How do you grant a user permission to execute a specific stored procedure in MySQL?",
    shortAnswer: "`GRANT EXECUTE ON PROCEDURE db_name.procedure_name TO 'user'@'host';`",
    explanation: "The `EXECUTE` privilege allows users to invoke stored procedures and functions. In MySQL 8.0, stored program privileges are stored in `mysql.procs_priv`.",
    hint: "Use GRANT EXECUTE ON PROCEDURE db.proc TO user.",
    level: "basic",
    codeExample: `GRANT EXECUTE ON PROCEDURE kolkata_retail.sp_generate_monthly_gst_report 
TO 'susmita_accountant'@'192.168.1.%';`
  },
  {
    question: "What happens if a user is granted `SELECT` on `db.*` and later revoked `SELECT` on `db.table_name`?",
    shortAnswer: "The revoke fails with an error (`ERROR 1147: There is no such grant defined for user on table`), because permissions are not subtractive.",
    explanation: "MySQL permissions are strictly additive. You cannot define an exclusion or 'deny' rule at a lower tier. If a user has `SELECT ON hr_db.*`, they can select from every table in `hr_db`. To restrict access to one table, you must revoke the database-level grant and grant table-level privileges on only the permitted tables.",
    hint: "Remember: MySQL privileges are purely additive, never subtractive.",
    level: "expert",
    codeExample: `-- Anti-pattern that fails:
-- GRANT SELECT ON hr_db.* TO 'user'@'%';
-- REVOKE SELECT ON hr_db.salaries FROM 'user'@'%'; -- ERROR 1147!

-- Correct pattern:
GRANT SELECT ON hr_db.employees TO 'user'@'%';
GRANT SELECT ON hr_db.departments TO 'user'@'%';`
  },
  {
    question: "In Mamata & Susmita's Barrackpore store, customer service agents needed to update `order_status` but must not see customer credit card numbers. How was this solved with Column Privileges?",
    shortAnswer: "Mamata granted `SELECT (order_id, customer_name, order_status), UPDATE (order_status) ON orders` to the agents, completely hiding the `credit_card_hash` column.",
    explanation: "By avoiding a table-level `SELECT`, the agents could view order numbers and change statuses from 'PENDING' to 'DISPATCHED'. Any attempt by an agent or compromised script to execute `SELECT credit_card_hash FROM orders` is blocked at the database engine level with Error 1142.",
    hint: "Use column-level SELECT and UPDATE lists to quarantine sensitive PII columns.",
    level: "moderate",
    codeExample: `-- Granular column access control in Barrackpore:
GRANT SELECT (order_id, customer_name, order_status),
      UPDATE (order_status)
ON barrackpore_store.orders 
TO 'support_agent'@'192.168.1.%';`
  },
  {
    question: "In Abhronila & Debangshu's Kolkata fintech bank, junior engineers needed to run monthly GST tax calculations without direct access to the ₹10 Crore transaction table. How was this solved with Routine Privileges?",
    shortAnswer: "Debangshu created a stored procedure with `SQL SECURITY DEFINER` and granted only `EXECUTE` on the procedure to the junior engineers.",
    explanation: "The stored procedure encapsulates complex GST calculation logic and executes with DBA definer privileges to read transactions. The junior engineers have 0 direct table privileges, preventing any accidental data leakage, direct queries, or modifications.",
    hint: "Encapsulate data access inside a DEFINER stored procedure and grant only EXECUTE.",
    level: "expert",
    codeExample: `-- Secure routine abstraction in Kolkata:
GRANT EXECUTE ON PROCEDURE kolkata_bank.sp_calculate_gst_summary 
TO 'junior_analyst'@'10.10.%.%';`
  },
  {
    question: "What is the `GRANT OPTION` privilege, and what security risks does it introduce?",
    shortAnswer: "It allows the user to grant any of their own existing privileges to other user accounts.",
    explanation: "When a privilege is granted `WITH GRANT OPTION`, that user can create new accounts or elevate other users to their own privilege level. If granted at the Global level (`*.*`), the user effectively possesses delegated administrative authority.",
    hint: "Look for WITH GRANT OPTION and the ability to delegate privileges.",
    level: "intermediate",
    codeExample: `GRANT SELECT, INSERT ON kolkata_retail.* 
TO 'team_lead'@'10.0.%.%' 
WITH GRANT OPTION;`
  },
  {
    question: "What is the `USAGE` privilege in MySQL?",
    shortAnswer: "A placeholder privilege that represents an account with no actual privileges (access to login only).",
    explanation: "When an account is created without grants, `SHOW GRANTS` displays `GRANT USAGE ON *.* TO 'user'@'host'`. It signifies that the account can successfully authenticate, but cannot read, write, or alter any database objects.",
    hint: "USAGE represents zero database privileges beyond authentication.",
    level: "basic",
    codeExample: `-- Newly created user shows:
-- GRANT USAGE ON *.* TO 'new_user'@'localhost';`
  },
  {
    question: "How do you inspect all Table-level grants across all users in the system?",
    shortAnswer: "Query `SELECT * FROM mysql.tables_priv;`.",
    explanation: "The `mysql.tables_priv` table contains rows for every explicit table grant, detailing `User`, `Host`, `Db`, `Table_name`, `Grantor`, `Timestamp`, `Table_priv`, and `Column_priv` sets.",
    hint: "Query the mysql.tables_priv data dictionary table.",
    level: "intermediate",
    codeExample: `SELECT Host, User, Db, Table_name, Table_priv 
FROM mysql.tables_priv 
ORDER BY Db, Table_name;`
  },
  {
    question: "What is the difference between `RELOAD` and `FLUSH_PRIVILEGES` / `FLUSH_STATUS` dynamic privileges in MySQL 8.0?",
    shortAnswer: "RELOAD is a legacy static global privilege; MySQL 8.0 introduced specific dynamic privileges (like RELOAD_TLS, FLUSH_STATUS) to replace broad server reload rights.",
    explanation: "Legacy `RELOAD` granted broad rights to flush caches, re-read configuration, and reset logs. MySQL 8.0 introduces granular alternatives so operators managing TLS cert rotations only receive certificate reload rights.",
    hint: "Dynamic privileges partition broad administrative commands like RELOAD into granular actions.",
    level: "expert",
    codeExample: `GRANT SYSTEM_VARIABLES_ADMIN, SERVICE_CONNECTION_ADMIN ON *.* TO 'ops_bot'@'localhost';`
  },
  {
    question: "How does granting `CREATE VIEW` privilege interact with Table-level and Database-level access?",
    shortAnswer: "CREATE VIEW allows creating virtual views, but querying or defining the view requires appropriate SELECT privileges on the underlying source tables.",
    explanation: "To create a view, the user must hold `CREATE VIEW` on the target database, plus `SELECT` on every column referenced in the view definition. When other users query the view, security is evaluated according to the view's `DEFINER` or `INVOKER` attribute.",
    hint: "Creating a view requires CREATE VIEW plus SELECT on source columns.",
    level: "intermediate",
    codeExample: `GRANT CREATE VIEW, SELECT ON kolkata_retail.* TO 'bi_developer'@'10.0.%.%';`
  },
  {
    question: "Can a user with only `INSERT` privilege on a table execute a `SELECT` query on that same table?",
    shortAnswer: "No, INSERT only allows writing new rows; attempting to SELECT throws Error 1142 (SELECT command denied).",
    explanation: "Privileges are strictly orthogonal in MySQL. A data ingestion daemon or IoT telemetry collector can be granted pure `INSERT` rights without `SELECT` rights, ensuring that if the daemon is compromised, the attacker cannot read historical database records.",
    hint: "Privileges are independent; INSERT does not include SELECT capability.",
    level: "basic",
    codeExample: `-- Write-only telemetry ingestion account:
GRANT INSERT ON iot_telemetry.sensor_logs TO 'sensor_collector'@'192.168.10.%';`
  },
  {
    question: "What is the `REFERENCES` privilege, and at which levels can it be granted?",
    shortAnswer: "It allows creating Foreign Key constraints referencing a parent table; it can be granted at Global, Database, Table, or Column levels.",
    explanation: "To define a foreign key referencing `departments.department_id`, the user creating the child table must hold `REFERENCES` privilege on the parent column or table. Without it, `CREATE TABLE` with `FOREIGN KEY` fails with Error 1142.",
    hint: "Required to create foreign key relationships referencing another table's columns.",
    level: "expert",
    codeExample: `GRANT REFERENCES (department_id) ON company.departments TO 'dev_user'@'localhost';`
  },
  {
    question: "How does `SHOW GRANTS` display Column-level privileges compared to Table-level privileges?",
    shortAnswer: "It appends the column list in parentheses after each specific privilege (e.g. `GRANT SELECT (col1), UPDATE (col2) ON ...`).",
    explanation: "Running `SHOW GRANTS FOR 'user'@'host'` breaks down the exact column bindings, clearly demarcating which fields are readable and which are editable.",
    hint: "Look for parenthesized column lists in the SHOW GRANTS output.",
    level: "basic",
    codeExample: `SHOW GRANTS FOR 'support_rep'@'10.0.%.%';
-- Output includes:
-- GRANT SELECT (order_id, order_status), UPDATE (order_status) ON \`kolkata_retail\`.\`orders\` TO 'support_rep'@'10.0.%.%'`
  },
  {
    question: "What is the `PROCESS` privilege in MySQL, and why is it dangerous to grant to untrusted application users?",
    shortAnswer: "It allows viewing all currently executing queries across all users in the system via `SHOW PROCESSLIST` or `information_schema.processlist`.",
    explanation: "Users without `PROCESS` can only see their own active queries. Users with `PROCESS` can inspect queries running on all databases, potentially viewing cleartext passwords in `CREATE USER` statements or sensitive customer data passed in unparameterized SQL queries.",
    hint: "Think about viewing other users' active SQL statements in process lists.",
    level: "expert",
    codeExample: `-- Only grant PROCESS to dedicated monitoring tools:
GRANT PROCESS ON *.* TO 'prometheus_exporter'@'localhost';`
  },
  {
    question: "What is the `ALTER ROUTINE` privilege in MySQL?",
    shortAnswer: "It permits modifying or dropping existing stored procedures and functions.",
    explanation: "`ALTER ROUTINE` can be granted at Global, Database, or specific Routine levels. By default, the creator of a stored routine is automatically granted `ALTER ROUTINE` and `EXECUTE` on that routine.",
    hint: "Grants ability to modify or drop stored procedures.",
    level: "intermediate",
    codeExample: `GRANT ALTER ROUTINE ON PROCEDURE kolkata_retail.sp_calculate_tax TO 'lead_architect'@'%';`
  },
  {
    question: "How does `GRANT ALL PRIVILEGES ON db_name.*` differ from `GRANT ALL PRIVILEGES ON *.*`?",
    shortAnswer: "db_name.* grants all database, table, and routine privileges strictly within that specific database; *.* grants all static database privileges plus global administrative privileges server-wide.",
    explanation: "Global `*.*` grants `SHUTDOWN`, `PROCESS`, `RELOAD`, `SUPER`, and access to all customer databases. Database `db_name.*` confines administrative control strictly within the borders of that single schema.",
    hint: "Differentiate between schema-bound administrator vs server-wide root administrator.",
    level: "basic",
    codeExample: `-- Safe project administrator:
GRANT ALL PRIVILEGES ON project_jupiter.* TO 'project_lead'@'%';

-- Dangerous root-level administrator:
GRANT ALL PRIVILEGES ON *.* TO 'project_lead'@'%';`
  },
  {
    question: "What is the `EVENT` privilege in MySQL, and where can it be granted?",
    shortAnswer: "It allows creating, altering, and dropping MySQL scheduled events; granted at Global and Database levels.",
    explanation: "MySQL Event Scheduler executes automated SQL tasks on a timer. To define events via `CREATE EVENT`, the user must hold the `EVENT` privilege on that database.",
    hint: "Required to schedule recurring database background jobs.",
    level: "intermediate",
    codeExample: `GRANT EVENT ON kolkata_retail.* TO 'cron_scheduler'@'localhost';`
  },
  {
    question: "What privilege is required to execute `LOCK TABLES` on tables where a user already has `SELECT` access?",
    shortAnswer: "The `LOCK TABLES` privilege at Global or Database level.",
    explanation: "Holding `SELECT` on a table is not sufficient to acquire an explicit table-level lock using `LOCK TABLES table_name READ/WRITE;`. The user must also hold the `LOCK TABLES` privilege.",
    hint: "Explicit table locking requires the LOCK TABLES privilege.",
    level: "intermediate",
    codeExample: `GRANT SELECT, LOCK TABLES ON kolkata_retail.* TO 'backup_script'@'localhost';`
  },
  {
    question: "How does column-level security impact query execution performance in MySQL?",
    shortAnswer: "It introduces minor per-column permission check overhead during the parsing/optimization phase, with zero impact on physical index or data retrieval speed.",
    explanation: "During statement preparation and parse tree validation, MySQL checks the requested columns against the user's in-memory column hash table. Once parsed and validated, query execution runs at full native engine speed.",
    hint: "Authorization checks occur during query parsing and compilation, not during row scanning.",
    level: "expert",
    codeExample: `-- In-memory column privilege lookup occurs once during query compilation.`
  },
  {
    question: "What is the `TRIGGER` privilege in MySQL, and at which scopes can it be assigned?",
    shortAnswer: "It allows creating, modifying, dropping, and executing database triggers; granted at Global, Database, or Table levels.",
    explanation: "`TRIGGER` cannot be granted at the Column level because triggers execute against whole-row state mutations (`BEFORE INSERT`, `AFTER UPDATE`).",
    hint: "Grants control over row-level triggers at Database or Table scope.",
    level: "intermediate",
    codeExample: `GRANT TRIGGER ON kolkata_retail.orders TO 'schema_migrator'@'localhost';`
  },
  {
    question: "How do you view which user granted a specific privilege on a table?",
    shortAnswer: "Check the `Grantor` column in `mysql.tables_priv` or `mysql.columns_priv`.",
    explanation: "The `Grantor` column records the `'grantor_user'@'grantor_host'` identity of the administrator who executed the `GRANT` statement, providing valuable security audit trails.",
    hint: "Inspect the Grantor column in the tables_priv system table.",
    level: "intermediate",
    codeExample: `SELECT User, Host, Table_name, Grantor, Timestamp 
FROM mysql.tables_priv 
WHERE Db = 'kolkata_retail';`
  },
  {
    question: "What error code is returned when a user attempts an operation for which they lack sufficient privileges?",
    shortAnswer: "`ERROR 1142 (42000): command command denied to user 'user'@'host' for table/column/routine 'target'`.",
    explanation: "Error 1142 indicates an authorization failure at Table, Column, or Routine scope. For database-level command failures (e.g. `CREATE DATABASE`), MySQL returns `ERROR 1044 (42000): Access denied for user to database`.",
    hint: "Error 1142 represents command denied for specific database objects.",
    level: "basic",
    codeExample: `-- SELECT salary FROM employees;
-- Output:
-- ERROR 1142 (42000): SELECT command denied to user 'intern'@'localhost' for column 'salary' in table 'employees'`
  },
  {
    question: "Why are SQL Views often preferred over Column-level Privileges for complex reporting access?",
    shortAnswer: "Views provide simplified querying (`SELECT * FROM v_safe_orders`), allow row-level filtering (WHERE clauses), and prevent application ORM mapping errors that occur with restricted column lists.",
    explanation: "While Column Privileges restrict attribute access, they do not provide row filtering (e.g. only seeing Kolkata orders). A view can combine column projection and row filtering, allowing developers to grant `SELECT` on the view while granting zero permissions on the base tables.",
    hint: "Views combine column masking with row-level filtering and clean ORM compatibility.",
    level: "expert",
    codeExample: `CREATE VIEW v_public_orders AS 
SELECT order_id, customer_id, order_status 
FROM orders 
WHERE store_city = 'Kolkata';

GRANT SELECT ON kolkata_retail.v_public_orders TO 'reporter'@'%';`
  },
  {
    question: "What is the primary operational takeaway of Topic 5 in Module 004_003?",
    shortAnswer: "MySQL's 5-tier authorization hierarchy provides granular defense-in-depth: allowing organizations to enforce least privilege by restricting application accounts to specific databases, tables, columns, or routine execution wrappers.",
    explanation: "Architecting database security according to the 5 privilege levels prevents data exfiltration and unauthorized schema modification. By replacing `SUPER` with Dynamic Privileges and using Column grants or Views for sensitive data, enterprises maintain robust compliance.",
    hint: "Summarize the 5 privilege scopes and least privilege enforcement.",
    level: "basic",
    codeExample: `-- Enterprise Least Privilege Security Profile:
GRANT SELECT, INSERT, UPDATE ON kolkata_retail.orders TO 'order_service'@'10.10.%.%';
GRANT SELECT (item_id, item_name, price) ON kolkata_retail.products TO 'catalog_service'@'10.10.%.%';
GRANT EXECUTE ON PROCEDURE kolkata_retail.sp_charge_payment TO 'payment_service'@'10.10.%.%';`
  }
];

export default questions;
