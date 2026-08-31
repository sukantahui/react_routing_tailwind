// topic1_files/topic1_questions.js

const questions = [
  {
    question: "What is the difference between CREATE DATABASE and CREATE SCHEMA in MySQL?",
    shortAnswer: "There is no difference; in MySQL, DATABASE and SCHEMA are exact interchangeable synonyms.",
    explanation: "In ANSI SQL standards, a database can contain multiple schemas. However, in MySQL, the database and schema are completely synonymous concepts. Writing `CREATE SCHEMA my_db;` executes the exact same underlying internal command as `CREATE DATABASE my_db;`.",
    hint: "Think about how MySQL maps schemas to namespaces.",
    level: "basic",
    codeExample: "CREATE SCHEMA IF NOT EXISTS college_db;\n-- Identical to CREATE DATABASE IF NOT EXISTS college_db;"
  },
  {
    question: "Why is the `IF NOT EXISTS` clause essential in production database scripts?",
    shortAnswer: "It makes the DDL script idempotent, preventing runtime errors (Error 1007) if the database has already been created.",
    explanation: "Without `IF NOT EXISTS`, attempting to create a database that already exists causes MySQL to terminate script execution with Error 1007: 'Can\'t create database; database exists'. With `IF NOT EXISTS`, MySQL generates a non-fatal warning instead and continues executing the remainder of the script.",
    hint: "Idempotent script execution in automated CI/CD pipelines.",
    level: "basic",
    codeExample: "CREATE DATABASE IF NOT EXISTS school_db;"
  },
  {
    question: "What happens on the host file system when a `CREATE DATABASE` statement is executed in MySQL 8.0?",
    shortAnswer: "MySQL creates a subdirectory under `datadir` with the database name and registers the schema in the transactional data dictionary.",
    explanation: "Under the server's data directory (e.g. `/var/lib/mysql/` on Linux or `C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Data\\` on Windows), a folder matching the database identifier is created. In MySQL 8.0, metadata is atomically written into the centralized InnoDB data dictionary (`mysql.ibd`).",
    hint: "Physical directory under the server's datadir.",
    level: "moderate",
    codeExample: "SHOW VARIABLES LIKE 'datadir';"
  },
  {
    question: "What happens on the host file system when a `DROP DATABASE` statement is executed?",
    shortAnswer: "All tables, views, stored routines, triggers, and physical `.ibd` tablespace files are permanently deleted, and the folder is removed from disk.",
    explanation: "Executing `DROP DATABASE` recursively deletes every object in the database and unlinks physical tablespace files from the operating system disk. This operation is irreversible and cannot be rolled back or undone.",
    hint: "Permanent unlinking of OS files and data dictionary entries.",
    level: "basic",
    codeExample: "DROP DATABASE IF EXISTS test_sandbox_db;"
  },
  {
    question: "Why does `DROP DATABASE` not move files to a Recycle Bin or Trash folder?",
    shortAnswer: "RDBMS engines perform direct low-level file system unlink system calls for immediate storage reclamation and transactional cleanup.",
    explanation: "Relational database engines like MySQL manage disk storage directly for performance and transactional integrity. Dropping a schema directly unlinks OS inodes/file handles and marks tablespace extents as free. Recovery is only possible via backup files (`mysqldump`) or binary log replays.",
    hint: "Low-level POSIX unlink and Windows DeleteFile operations.",
    level: "basic"
  },
  {
    question: "What is the recommended character set and collation when creating a new MySQL database in 2026?",
    shortAnswer: "CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci.",
    explanation: "`utf8mb4` supports full 4-byte Unicode encoding (including Indian scripts like Bengali/Devanagari, mathematical symbols, and emojis). `utf8mb4_0900_ai_ci` uses the Unicode 9.0 weight standard with accent-insensitive (`ai`) and case-insensitive (`ci`) sorting rules.",
    hint: "Modern 4-byte UTF-8 standard with Unicode 9.0 collation.",
    level: "moderate",
    codeExample: "CREATE DATABASE app_db\nCHARACTER SET utf8mb4\nCOLLATE utf8mb4_0900_ai_ci;"
  },
  {
    question: "How do table character sets inherit from the database level?",
    shortAnswer: "If a CREATE TABLE statement does not explicitly specify a character set and collation, it automatically inherits the database's defaults.",
    explanation: "Setting `utf8mb4` and `utf8mb4_0900_ai_ci` at the database level ensures that any new tables or string columns created inside that database will automatically adopt these settings unless explicitly overridden at table or column level.",
    hint: "Cascading inheritance from database → table → column.",
    level: "moderate",
    codeExample: "USE app_db;\nCREATE TABLE users (name VARCHAR(50)); -- Automatically uses utf8mb4"
  },
  {
    question: "What is the consequence of operating system case sensitivity on database names in MySQL?",
    shortAnswer: "On Linux (case-sensitive OS), database names are case-sensitive; on Windows and macOS, they are case-insensitive by default.",
    explanation: "Because database names correspond to directories on disk, the underlying file system dictates sensitivity based on the `lower_case_table_names` setting. On Linux (`lower_case_table_names=0`), `CREATE DATABASE SchoolDB;` and `USE schooldb;` refer to two completely different directories.",
    hint: "Operating system file systems: ext4 (Linux) vs NTFS (Windows).",
    level: "expert",
    codeExample: "SHOW VARIABLES LIKE 'lower_case_table_names';"
  },
  {
    question: "Why should you always name MySQL databases using lowercase `snake_case`?",
    shortAnswer: "To prevent portability issues, deployment crashes, and case-mismatch bugs when moving databases across Linux, Windows, and macOS environments.",
    explanation: "By adopting all-lowercase `snake_case` (e.g. `student_management_db`), identifier resolution remains 100% consistent across Linux servers in production, developer Mac laptops, and Windows test environments.",
    hint: "Cross-platform migration consistency.",
    level: "moderate",
    codeExample: "CREATE DATABASE IF NOT EXISTS hospital_billing_db;"
  },
  {
    question: "What are the four default system databases created upon MySQL installation, and why should you never drop them?",
    shortAnswer: "mysql, information_schema, performance_schema, and sys; they are critical for user authentication, server metadata, diagnostics, and engine health.",
    explanation: "Dropping or corrupting `mysql` destroys user logins and privileges. `information_schema` is a virtual read-only ANSI schema. `performance_schema` and `sys` are required for query profiling, server metrics, and DBA management.",
    hint: "The four core engines and metadata namespaces.",
    level: "basic",
    codeExample: "SHOW DATABASES;\n-- mysql, information_schema, performance_schema, sys"
  },
  {
    question: "How can you query existing databases programmatically in SQL without using `SHOW DATABASES`?",
    shortAnswer: "By querying the `INFORMATION_SCHEMA.SCHEMATA` system view.",
    explanation: "The `SCHEMATA` table provides detailed metadata about all databases on the server, including schema names, default character set names, default collation names, and encryption status.",
    hint: "Querying the ANSI standard metadata catalog view.",
    level: "moderate",
    codeExample: "SELECT schema_name, default_character_set_name, default_collation_name\nFROM information_schema.schemata\nWHERE schema_name NOT IN ('mysql', 'information_schema', 'performance_schema', 'sys');"
  },
  {
    question: "What minimum MySQL user privilege is required to execute a `CREATE DATABASE` statement?",
    shortAnswer: "The global `CREATE` privilege on `*.*`.",
    explanation: "Because creating a database affects the entire MySQL server instance rather than a specific existing schema, the user account must hold the global `CREATE` privilege assigned at the `*.*` scope.",
    hint: "Global privilege scope vs schema-level privilege scope.",
    level: "moderate",
    codeExample: "GRANT CREATE ON *.* TO 'dev_user'@'localhost';"
  },
  {
    question: "What privilege is required to execute `DROP DATABASE` on a specific database?",
    shortAnswer: "The `DROP` privilege, either globally on `*.*` or specifically on `db_name.*`.",
    explanation: "If a user has `DROP` on `school_db.*`, they have permission to drop any table inside `school_db` and also drop the entire `school_db` database itself.",
    hint: "Principle of least privilege for destructive DDL commands.",
    level: "moderate",
    codeExample: "REVOKE DROP ON *.* FROM 'app_service'@'%';"
  },
  {
    question: "What error occurs if you try to create a database with a reserved keyword (e.g. `ORDER` or `SELECT`) without backticks?",
    shortAnswer: "MySQL raises Error 1064 (42000): 'You have an error in your SQL syntax near ...'.",
    explanation: "SQL parsers interpret unquoted reserved words as grammar tokens. To use a reserved keyword as a database identifier, it must be enclosed in backtick characters (`` ` ``). However, best practice is to avoid reserved words altogether.",
    hint: "Enclosing identifiers in backticks vs syntax errors.",
    level: "basic",
    codeExample: "CREATE DATABASE `order`; -- Valid with backticks, but 'order_db' is preferred"
  },
  {
    question: "How do you check the exact character set and collation of a currently selected database?",
    shortAnswer: "Using `SELECT @@character_set_database, @@collation_database;` or `SHOW CREATE DATABASE db_name;`.",
    explanation: "`SHOW CREATE DATABASE db_name;` outputs the exact DDL statement used to create the database along with its explicit character set and collation settings.",
    hint: "System session variables or SHOW CREATE DATABASE statement.",
    level: "basic",
    codeExample: "SHOW CREATE DATABASE college_db;\n-- Displays: CREATE DATABASE `college_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */"
  },
  {
    question: "How can you modify the default character set and collation of an existing database without dropping it?",
    shortAnswer: "Using the `ALTER DATABASE` statement.",
    explanation: "Executing `ALTER DATABASE db_name CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;` updates the default metadata for future tables. (Note: Existing tables must be altered individually with `ALTER TABLE ... CONVERT TO CHARACTER SET`).",
    hint: "ALTER DATABASE command modifies default inheritance.",
    level: "moderate",
    codeExample: "ALTER DATABASE pharmacy_db\nCHARACTER SET utf8mb4\nCOLLATE utf8mb4_0900_ai_ci;"
  },
  {
    question: "How can you make a database read-only in MySQL 8.0 to prevent accidental data changes?",
    shortAnswer: "Using `ALTER DATABASE db_name READ ONLY = 1;`.",
    explanation: "MySQL 8.0.22 introduced the `READ ONLY` database option. When set to `1` (or `DEFAULT`), all DDL and DML write statements (`INSERT`, `UPDATE`, `DELETE`, `DROP TABLE`) against that database are blocked for regular users.",
    hint: "MySQL 8.0.22+ READ ONLY schema attribute.",
    level: "expert",
    codeExample: "ALTER DATABASE legacy_archive_db READ ONLY = 1;\n-- To revert: ALTER DATABASE legacy_archive_db READ ONLY = 0;"
  },
  {
    question: "What happens if a database is created with `DEFAULT ENCRYPTION = 'Y'` in MySQL 8.0?",
    shortAnswer: "All tables created inside the database will automatically have InnoDB tablespace encryption (TDE) enabled by default.",
    explanation: "Schema-level encryption enforces that any new table automatically encrypts its `.ibd` disk file using the server's master encryption keyring, protecting stored data at rest.",
    hint: "Transparent Data Encryption (TDE) at rest.",
    level: "expert",
    codeExample: "CREATE DATABASE secure_bank_db\nDEFAULT ENCRYPTION = 'Y';"
  },
  {
    question: "Why should application connection pools connect to a specific database rather than running `USE db_name;`?",
    shortAnswer: "Specifying the database in the connection string eliminates round-trip `USE` queries and isolates connection state safely.",
    explanation: "When database connection strings specify the database (e.g. `mysql://user:pass@host:3306/ecommerce_db`), the TCP connection initializes directly in the target schema namespace without requiring extra SQL statements.",
    hint: "Connection URL database path.",
    level: "moderate",
    codeExample: "// jdbc:mysql://localhost:3306/ecommerce_db"
  },
  {
    question: "What is the maximum allowed length for a database identifier name in MySQL?",
    shortAnswer: "64 characters.",
    explanation: "MySQL restricts schema names, table names, column names, and index identifiers to a maximum length of 64 characters (encoded in UTF-8).",
    hint: "Standard 64-character identifier ceiling.",
    level: "basic",
    codeExample: "-- Database names must be <= 64 characters"
  },
  {
    question: "Which characters are invalid or discouraged when naming a MySQL database?",
    shortAnswer: "Forward slashes (`/`), backslashes (`\\`), periods (`.`), spaces, and non-printable control characters.",
    explanation: "Because database names map to file system directories on disk, path delimiters like `/` and `\\` can cause path injection vulnerabilities or file system directory failures. Stick strictly to alphanumeric characters and underscores (`[a-z0-9_]`).",
    hint: "File system directory naming restrictions.",
    level: "basic"
  },
  {
    question: "What happens if you execute `DROP DATABASE IF EXISTS non_existent_db;`?",
    shortAnswer: "MySQL does not raise an error; it returns a Note/Warning (Code 1008) and exits cleanly with 0 rows affected.",
    explanation: "The `IF EXISTS` clause suppresses Error 1008: 'Can\'t drop database; database doesn\'t exist'. This ensures that teardown and deployment scripts do not crash unexpectedly when initializing fresh environments.",
    hint: "Suppression of Error 1008 to prevent script aborts.",
    level: "basic",
    codeExample: "DROP DATABASE IF EXISTS temp_scratch_db;\n-- Output: Query OK, 0 rows affected, 1 warning (Note 1008)"
  },
  {
    question: "How can a DBA take a logical backup before dropping a database?",
    shortAnswer: "Using the `mysqldump` command line utility to export schema and data to an SQL script.",
    explanation: "Running `mysqldump -u root -p --routines --triggers --events db_name > backup_db_name.sql` creates a complete, restorable text file containing all DDL and DML statements before any destructive DROP action is taken.",
    hint: "Standard mysqldump command line tool.",
    level: "moderate",
    codeExample: "mysqldump -u root -p --single-transaction college_db > college_db_backup.sql"
  },
  {
    question: "Why should `DROP DATABASE` be restricted in production environments via Role-Based Access Control (RBAC)?",
    shortAnswer: "To prevent accidental drops, rogue administrative scripts, and catastrophic downtime caused by human error or SQL injection.",
    explanation: "Application service accounts only need `SELECT`, `INSERT`, `UPDATE`, `DELETE`, and occasionally `CREATE`/`ALTER` permissions. Under the Principle of Least Privilege, no production application account should ever possess the `DROP` privilege.",
    hint: "Principle of Least Privilege and blast-radius minimization.",
    level: "moderate",
    codeExample: "REVOKE DROP ON prod_db.* FROM 'web_app_user'@'%';"
  },
  {
    question: "What happens if MySQL server crashes while executing a `CREATE DATABASE` statement in MySQL 8.0?",
    shortAnswer: "The transaction is rolled back atomically via the InnoDB transactional data dictionary, leaving no orphaned directories or broken metadata.",
    explanation: "Prior to MySQL 8.0, DDL statements were non-transactional and could leave orphaned folders if crashed. MySQL 8.0 introduced Atomic DDL, meaning schema creation either succeeds completely or rolls back entirely without disk pollution.",
    hint: "Atomic DDL architecture in MySQL 8.0.",
    level: "expert",
    codeExample: "-- Atomic DDL ensures all-or-nothing schema creation"
  },
  {
    question: "How does the `USE` statement interact with database contexts in a multi-tenant application?",
    shortAnswer: "`USE db_name` sets the default database for subsequent unqualified table queries on that specific connection session.",
    explanation: "When you execute `USE barrackpore_db;`, any query like `SELECT * FROM students;` is automatically resolved as `barrackpore_db.students`. You can still query other databases by prefixing: `SELECT * FROM kolkata_db.students;`.",
    hint: "Session-level default schema namespace.",
    level: "basic",
    codeExample: "USE barrackpore_db;\nSELECT * FROM students; -- Resolved inside barrackpore_db"
  },
  {
    question: "Can you create a database with the exact name of a table located in another database?",
    shortAnswer: "Yes, because database names reside in a global server namespace, while table names reside within their respective database namespaces.",
    explanation: "Namespace hierarchy in MySQL is `server → database → table → column`. A database named `students` can coexist alongside a table named `students` inside another database `college_db` without any naming collision.",
    hint: "Hierarchical namespaces.",
    level: "basic",
    codeExample: "CREATE DATABASE students;\n-- Coexists with college_db.students"
  },
  {
    question: "What is the difference between `COLLATE utf8mb4_0900_ai_ci` and `COLLATE utf8mb4_bin` at the database level?",
    shortAnswer: "`utf8mb4_0900_ai_ci` compares strings case-insensitively and accent-insensitively; `utf8mb4_bin` compares raw binary character bytes strictly case-sensitively.",
    explanation: "Under `_ci`, `'mamata'` equals `'Mamata'`. Under `_bin`, `'mamata'` does not equal `'Mamata'` because the ASCII/binary byte value of 'm' (0x6D) is different from 'M' (0x4D). Financial codes, cryptographic hashes, and case-sensitive tokens often use binary collation.",
    hint: "Case/accent insensitive collation vs binary byte comparison.",
    level: "moderate",
    codeExample: "CREATE DATABASE crypto_ledger_db\nCHARACTER SET utf8mb4\nCOLLATE utf8mb4_bin;"
  },
  {
    question: "How can you drop multiple databases in a single SQL statement in standard MySQL?",
    shortAnswer: "You cannot; MySQL syntax only allows dropping one database per `DROP DATABASE` statement.",
    explanation: "Unlike `DROP TABLE t1, t2;` which supports a comma-separated list, `DROP DATABASE` only accepts a single database identifier. Dropping multiple databases requires individual `DROP DATABASE` statements or a shell loop script.",
    hint: "Single-identifier grammar constraint in MySQL DDL.",
    level: "moderate",
    codeExample: "DROP DATABASE IF EXISTS db_one;\nDROP DATABASE IF EXISTS db_two;"
  },
  {
    question: "What is the industry best practice checklist before executing `DROP DATABASE` in any environment?",
    shortAnswer: "1) Verify current server connection and host. 2) Confirm database name. 3) Take a fresh mysqldump backup. 4) Obtain peer review or change approval ticket.",
    explanation: "Because `DROP DATABASE` is completely irreversible, enterprise database administration guidelines require strict verification protocols (ensuring you are not connected to production), full snapshot backups, and dual-confirmation workflows.",
    hint: "Verify, Backup, Double-check host, Execute.",
    level: "basic",
    codeExample: "SELECT @@hostname, DATABASE(); -- Verify host and active database before any drop"
  }
];

export default questions;
