// topic2_files/topic2_questions.js

const questions = [
  {
    question: "What does the `SHOW DATABASES` command do in MySQL?",
    shortAnswer: "It lists all databases on the server that the connected user has privileges to access.",
    explanation: "Executing `SHOW DATABASES` (or its synonym `SHOW SCHEMAS`) queries the MySQL internal data dictionary and outputs a table listing all databases visible to the current authentication session.",
    hint: "Think of it as directory listing `ls` or `dir` for database schemas.",
    level: "basic",
    codeExample: "SHOW DATABASES;"
  },
  {
    question: "What is the purpose of the `USE` statement in MySQL?",
    shortAnswer: "It designates a specific database as the default active database namespace for the current session.",
    explanation: "When a database is selected with `USE db_name;`, subsequent SQL statements can reference tables directly by their unqualified name (e.g. `SELECT * FROM students;`) rather than requiring `barrackpore_db.students`.",
    hint: "Setting the working directory for SQL commands.",
    level: "basic",
    codeExample: "USE barrackpore_college_db;\nSELECT * FROM students;"
  },
  {
    question: "What error occurs if you try to query a table before issuing a `USE` command or specifying a database prefix?",
    shortAnswer: "Error 1046 (3D000): 'No database selected'.",
    explanation: "MySQL does not assume a default database upon initial connection unless specified in the connection string. If you execute `SELECT * FROM products;` with no active database, MySQL raises Error 1046.",
    hint: "Error 1046 indicates missing default schema context.",
    level: "basic",
    codeExample: "-- ERROR 1046 (3D000): No database selected"
  },
  {
    question: "How do you check which database is currently active in your SQL session?",
    shortAnswer: "Using the built-in function `SELECT DATABASE();` (or `SELECT SCHEMA();`).",
    explanation: "`SELECT DATABASE();` returns the name of the currently active default database as a string, or `NULL` if no database has been selected yet.",
    hint: "Built-in function returning current session database name.",
    level: "basic",
    codeExample: "SELECT DATABASE(); -- Returns 'barrackpore_college_db'"
  },
  {
    question: "How can you filter `SHOW DATABASES` using wildcards and pattern matching?",
    shortAnswer: "By using the `LIKE` clause with `%` (zero or more characters) and `_` (single character) wildcards.",
    explanation: "In multi-tenant database clusters hosting hundreds of databases, `SHOW DATABASES LIKE 'pharmacy_%';` filters the list to only schemas matching that naming prefix.",
    hint: "The LIKE keyword with wildcard characters.",
    level: "basic",
    codeExample: "SHOW DATABASES LIKE 'kolkata_%';\nSHOW DATABASES LIKE '%_staging';"
  },
  {
    question: "Can you filter `SHOW DATABASES` using a `WHERE` clause?",
    shortAnswer: "Yes, by filtering on the column expression `Database`.",
    explanation: "MySQL supports `SHOW DATABASES WHERE \`Database\` NOT IN ('mysql', 'information_schema', 'performance_schema', 'sys');` to filter out default system schemas.",
    hint: "Using WHERE with backtick-escaped `Database` column.",
    level: "moderate",
    codeExample: "SHOW DATABASES WHERE `Database` NOT IN ('mysql', 'sys', 'information_schema', 'performance_schema');"
  },
  {
    question: "Why might two different users running `SHOW DATABASES;` on the same MySQL server see different lists of databases?",
    shortAnswer: "Because `SHOW DATABASES` enforces privilege filtering; users only see databases where they hold at least one grant.",
    explanation: "Unless a user holds global `SHOW DATABASES` privileges, MySQL automatically filters the output to only show schemas where the user has database-level or table-level grants, protecting unauthorized tenant schema names from being discovered.",
    hint: "Role-based access control and privilege isolation.",
    level: "moderate"
  },
  {
    question: "What global privilege allows a user to see all databases on the server regardless of individual schema grants?",
    shortAnswer: "The `SHOW DATABASES` administrative privilege.",
    explanation: "Granting `GRANT SHOW DATABASES ON *.* TO 'auditor_user'@'localhost';` allows that user to view the complete list of all databases on the server instance without granting them read or write access to data inside those tables.",
    hint: "Global administrative discovery grant.",
    level: "moderate",
    codeExample: "GRANT SHOW DATABASES ON *.* TO 'auditor'@'localhost';"
  },
  {
    question: "Can you perform joins between tables in two different databases on the same MySQL server?",
    shortAnswer: "Yes, by using fully qualified table names (`database_name.table_name`).",
    explanation: "MySQL supports cross-database queries as long as the connected user has `SELECT` privileges on both databases. You can join tables from `kolkata_bank_db` and `barrackpore_branch_db` in a single SQL query.",
    hint: "Cross-database joins using fully qualified identifiers.",
    level: "moderate",
    codeExample: "SELECT u.user_name, a.account_balance\nFROM user_service_db.users u\nJOIN ledger_service_db.accounts a ON u.user_id = a.user_id;"
  },
  {
    question: "Does the `USE` statement persist across different database connections or HTTP requests in web applications?",
    shortAnswer: "No, `USE` only alters the state of the single active TCP session connection.",
    explanation: "In stateless web architectures and connection-pooled backends (Node.js, Spring Boot, Django), each request acquires a pooled connection. Relying on `USE` in application code is an anti-pattern; instead, specify the database directly in the pool connection URL.",
    hint: "Connection pooling and connection state isolation.",
    level: "expert"
  },
  {
    question: "What happens if a user without permissions runs `USE secret_financial_db;`?",
    shortAnswer: "MySQL returns Error 1044 (42000): 'Access denied for user to database'.",
    explanation: "MySQL checks the authentication user's ACL tables. If no grants exist for that user on `secret_financial_db`, switching context is blocked with Access Denied.",
    hint: "Permission verification during USE execution.",
    level: "basic",
    codeExample: "-- ERROR 1044 (42000): Access denied for user 'guest'@'%' to database 'secret_financial_db'"
  },
  {
    question: "What is the equivalent ANSI SQL query to retrieve all non-system databases using `INFORMATION_SCHEMA`?",
    shortAnswer: "`SELECT schema_name FROM information_schema.schemata WHERE schema_name NOT IN ('mysql', 'information_schema', 'performance_schema', 'sys');`",
    explanation: "Querying `INFORMATION_SCHEMA.SCHEMATA` is standard ANSI SQL and returns metadata columns such as `DEFAULT_CHARACTER_SET_NAME`, `DEFAULT_COLLATION_NAME`, and `SQL_PATH`.",
    hint: "Querying the standard metadata view SCHEMATA.",
    level: "moderate",
    codeExample: "SELECT schema_name, default_character_set_name, default_collation_name\nFROM information_schema.schemata;"
  },
  {
    question: "Can a database trigger in `db_a` modify data in `db_b` on the same MySQL instance?",
    shortAnswer: "Yes, triggers can execute DML statements across multiple databases using qualified table names if permissions permit.",
    explanation: "An `AFTER INSERT` trigger on `store_db.orders` can execute `INSERT INTO audit_archive_db.order_logs ...` as long as the trigger's definer holds necessary privileges on both schemas.",
    hint: "Cross-schema trigger execution.",
    level: "expert",
    codeExample: "CREATE TRIGGER trg_audit AFTER INSERT ON store_db.orders\nFOR EACH ROW\nBEGIN\n    INSERT INTO audit_db.logs (order_id) VALUES (NEW.order_id);\nEND;"
  },
  {
    question: "What happens if you run `USE db_name;` when `db_name` does not exist?",
    shortAnswer: "MySQL returns Error 1049 (42000): 'Unknown database'.",
    explanation: "MySQL validates that the target database directory and data dictionary entry exist. If not found, it throws Error 1049.",
    hint: "Error code 1049 for non-existent database names.",
    level: "basic",
    codeExample: "-- ERROR 1049 (42000): Unknown database 'non_existent_db'"
  },
  {
    question: "How do you view all tables inside a specific database without first switching to it via `USE`?",
    shortAnswer: "Using `SHOW TABLES FROM database_name;` (or `SHOW TABLES IN database_name;`).",
    explanation: "You can inspect the contents of another database directly without changing your current session's default schema context.",
    hint: "SHOW TABLES FROM / IN syntax.",
    level: "basic",
    codeExample: "SHOW TABLES FROM barrackpore_college_db;"
  },
  {
    question: "How can you count the total number of tables in a database using SQL?",
    shortAnswer: "By querying `COUNT(*)` from `INFORMATION_SCHEMA.TABLES` for that `table_schema`.",
    explanation: "`SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'barrackpore_college_db';` counts all base tables and views in the specified schema.",
    hint: "Counting rows in information_schema.tables.",
    level: "moderate",
    codeExample: "SELECT table_schema, COUNT(*) AS total_tables\nFROM information_schema.tables\nWHERE table_schema = 'barrackpore_college_db'\nGROUP BY table_schema;"
  },
  {
    question: "What is the total disk size consumed by all tables in a specific database?",
    shortAnswer: "Sum of `data_length + index_length` from `INFORMATION_SCHEMA.TABLES`.",
    explanation: "You can calculate exact database disk footprint in Megabytes by summing `data_length` and `index_length` divided by 1024*1024.",
    hint: "Data length plus index length in MB.",
    level: "expert",
    codeExample: "SELECT table_schema AS `Database`,\n       ROUND(SUM(data_length + index_length) / 1024 / 1024, 2) AS `Size_MB`\nFROM information_schema.tables\nWHERE table_schema = 'barrackpore_college_db'\nGROUP BY table_schema;"
  },
  {
    question: "Why is `SHOW DATABASES` considered a lightweight command compared to querying complex information schema views?",
    shortAnswer: "`SHOW DATABASES` reads directly from cached in-memory data dictionary structures rather than scanning multiple system tables.",
    explanation: "In MySQL 8.0, `SHOW DATABASES` reads directly from the data dictionary cache without executing complex view joins, making it extremely fast.",
    hint: "In-memory metadata caching.",
    level: "moderate"
  },
  {
    question: "What does `SELECT CURRENT_USER();` return, and how does it relate to database visibility in `SHOW DATABASES`?",
    shortAnswer: "It returns the authenticated user and host string (e.g. `'mamata'@'192.168.1.%'`), which determines what databases are visible.",
    explanation: "MySQL checks privileges based on the authenticated user identity returned by `CURRENT_USER()` to filter the `SHOW DATABASES` output.",
    hint: "Authentication identity check.",
    level: "basic",
    codeExample: "SELECT CURRENT_USER(), DATABASE();"
  },
  {
    question: "How can you switch back to having 'no database selected' (NULL) in a MySQL CLI session?",
    shortAnswer: "MySQL does not have a direct `UNUSE` command; you can only switch to another database or disconnect/reconnect.",
    explanation: "Once a database context is established via `USE`, you cannot reset `DATABASE()` to `NULL` without closing the session or connecting to a dummy database.",
    hint: "Session state persistence until reconnect.",
    level: "moderate"
  },
  {
    question: "Can two tables in different databases have Foreign Key constraints referencing each other?",
    shortAnswer: "Yes, in InnoDB, foreign keys can reference tables across different databases on the same MySQL instance.",
    explanation: "An order table in `store_db` can have a foreign key pointing to `customer_db.customers(customer_id)` as long as both tables use the InnoDB storage engine.",
    hint: "Cross-database foreign key references in InnoDB.",
    level: "expert",
    codeExample: "CREATE TABLE store_db.orders (\n    order_id INT PRIMARY KEY,\n    customer_id INT,\n    FOREIGN KEY (customer_id) REFERENCES customer_db.customers(customer_id)\n);"
  },
  {
    question: "What is the difference between `SHOW TABLES` and `SHOW FULL TABLES` in a selected database?",
    shortAnswer: "`SHOW FULL TABLES` includes a second column `Table_type` indicating whether each object is a `BASE TABLE` or a `VIEW`.",
    explanation: "Regular `SHOW TABLES;` only outputs table names. `SHOW FULL TABLES;` displays whether each item is a physical table or a virtual view.",
    hint: "Distinguishing base tables from views.",
    level: "basic",
    codeExample: "SHOW FULL TABLES;"
  },
  {
    question: "What is the `SHOW OPEN TABLES` command used for?",
    shortAnswer: "It lists tables that are currently opened in the table cache, including their lock status.",
    explanation: "DBAs use `SHOW OPEN TABLES WHERE In_use > 0;` to identify tables that are currently locked by ongoing transactions or queries causing blocking.",
    hint: "Table cache and active table lock inspection.",
    level: "expert",
    codeExample: "SHOW OPEN TABLES WHERE In_use > 0;"
  },
  {
    question: "How do character set conversions behave when copying tables across databases with different default character sets?",
    shortAnswer: "The created table retains its source column character sets unless explicitly converted with `ALTER TABLE`.",
    explanation: "If `db_latin` uses `latin1` and `db_utf` uses `utf8mb4`, copying a table via `CREATE TABLE db_utf.t LIKE db_latin.t;` preserves the original `latin1` column encodings.",
    hint: "Table definition cloning retains column-level encodings.",
    level: "expert"
  },
  {
    question: "How do you check the default storage engine of a MySQL server?",
    shortAnswer: "`SHOW VARIABLES LIKE 'default_storage_engine';` (typically InnoDB in modern versions).",
    explanation: "When you create a table inside any database without specifying `ENGINE = ...`, MySQL automatically applies the `default_storage_engine`.",
    hint: "Server variable default_storage_engine.",
    level: "basic",
    codeExample: "SHOW VARIABLES LIKE 'default_storage_engine';"
  },
  {
    question: "What command shows the character set and collation of the currently selected database?",
    shortAnswer: "`SELECT @@character_set_database, @@collation_database;`.",
    explanation: "These session variables reflect the character set and collation inherited by the currently active database namespace.",
    hint: "Session variables character_set_database.",
    level: "basic",
    codeExample: "SELECT @@character_set_database, @@collation_database;"
  },
  {
    question: "Can you pass parameters or expressions into the `USE` statement?",
    shortAnswer: "No, `USE` only accepts a single static identifier literal and cannot take variables or subqueries.",
    explanation: "`USE` is a client/server utility command rather than a standard DML expression; dynamic switching in stored procedures requires dynamic SQL via `PREPARE` and `EXECUTE`.",
    hint: "Static identifier syntax rule.",
    level: "moderate"
  },
  {
    question: "What is the best practice for writing multi-database migration scripts in automated deployments?",
    shortAnswer: "Explicitly qualify all table names or include `USE` statements before every DDL block to avoid executing in the wrong schema context.",
    explanation: "If a migration runner connects with an unexpected default database, unqualified `CREATE TABLE` commands will create tables in the wrong schema. Explicit qualification guarantees correct placement.",
    hint: "Defensive SQL scripting.",
    level: "moderate",
    codeExample: "CREATE TABLE IF NOT EXISTS barrackpore_college_db.professors (...);"
  },
  {
    question: "How does MySQL Router handle default database context in high availability clusters?",
    shortAnswer: "MySQL Router passes client session database parameters transparently to the active primary or replica node.",
    explanation: "When client applications connect through MySQL Router proxies, session state including the active database namespace is preserved and routed to the designated node.",
    hint: "Proxy routing and transparent session tunneling.",
    level: "expert"
  },
  {
    question: "What is the recommended checklist when logging into a MySQL server via command line?",
    shortAnswer: "1) Check user and host: `SELECT USER(), @@hostname;`. 2) View available databases: `SHOW DATABASES;`. 3) Select target database: `USE db_name;`. 4) Verify active database: `SELECT DATABASE();`.",
    explanation: "Following this 4-step discovery routine ensures you always operate in the intended database context and avoids costly accidental modifications.",
    hint: "Identify, Discover, Select, Verify.",
    level: "basic",
    codeExample: "SELECT CURRENT_USER();\nSHOW DATABASES;\nUSE target_db;\nSELECT DATABASE();"
  }
];

export default questions;
