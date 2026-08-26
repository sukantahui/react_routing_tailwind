// topic3_files/topic3_questions.js

const questions = [
  {
    question: "What is the 4-level character set and collation inheritance hierarchy in MySQL?",
    shortAnswer: "1) **Server Level** (Global default in `my.cnf`) &rarr; 2) **Database Level** (`CREATE DATABASE`) &rarr; 3) **Table Level** (`CREATE TABLE`) &rarr; 4) **Column Level** (`col VARCHAR(...)`).",
    explanation: "Each lower level inherits from its immediate parent unless explicitly overridden.",
    hint: "Server &rarr; Database &rarr; Table &rarr; Column.",
    level: "basic"
  },
  {
    question: "What happens if a column is created with `CHARACTER SET utf8mb4` but NO collation is specified?",
    shortAnswer: "MySQL automatically assigns the **default collation of that character set** (which is `utf8mb4_0900_ai_ci` in MySQL 8.0).",
    explanation: "Standard resolution rule: specifying charset assigns its default collation.",
    hint: "Assigns the default collation of that character set (utf8mb4_0900_ai_ci).",
    level: "basic"
  },
  {
    question: "What happens if a column is created with `COLLATE utf8mb4_bin` but NO character set is specified?",
    shortAnswer: "MySQL automatically assigns the **parent character set** associated with that collation (which is `utf8mb4`).",
    explanation: "Because a collation strictly belongs to exactly one character set.",
    hint: "Assigns the parent character set associated with that collation (utf8mb4).",
    level: "basic"
  },
  {
    question: "What happens if neither `CHARACTER SET` nor `COLLATE` is specified for a `VARCHAR` column in a table?",
    shortAnswer: "The column automatically **inherits the table's default character set and collation**.",
    explanation: "Propagates table settings to all unconfigured text columns.",
    hint: "Inherits the table's default character set and collation.",
    level: "basic"
  },
  {
    question: "What are the three core variables that govern the MySQL Client-Connection communication bridge?",
    shortAnswer: "1) `character_set_client` (incoming queries from app),\n2) `character_set_connection` (internal representation for literals),\n3) `character_set_results` (encoding returned to client).",
    explanation: "Controls character conversion between the application and database server.",
    hint: "character_set_client, character_set_connection, and character_set_results.",
    level: "expert"
  },
  {
    question: "What does the SQL command `SET NAMES 'utf8mb4';` do?",
    shortAnswer: "It simultaneously sets `character_set_client`, `character_set_connection`, and `character_set_results` to `utf8mb4` for the current session.",
    explanation: "Standard command executed immediately upon establishing a database connection.",
    hint: "Sets client, connection, and results character sets to utf8mb4 simultaneously.",
    level: "basic",
    codeExample: "SET NAMES 'utf8mb4';"
  },
  {
    question: "What is `character_set_system` in MySQL?",
    shortAnswer: "The internal character set used by the MySQL server to store **metadata, table names, and column identifiers** (always fixed as `utf8mb3` / `utf8` and cannot be modified).",
    explanation: "Ensures the database data dictionary can store international object names.",
    hint: "Fixed internal character set (utf8) used to store database object names and metadata.",
    level: "expert"
  },
  {
    question: "How do you inspect the default character set and collation of every database schema on the server?",
    shortAnswer: "Query `information_schema.schemata`: `SELECT schema_name, default_character_set_name, default_collation_name FROM information_schema.schemata;`",
    explanation: "Provides instant overview of all database-level defaults.",
    hint: "Query information_schema.schemata.",
    level: "basic",
    codeExample: "SELECT schema_name, default_character_set_name, default_collation_name \nFROM information_schema.schemata;"
  },
  {
    question: "How do you inspect the character set and collation of every column in a specific table?",
    shortAnswer: "`SELECT column_name, data_type, character_set_name, collation_name FROM information_schema.columns WHERE table_name = 'students';`",
    explanation: "Reveals any columns that deviate from the table's default encoding.",
    hint: "Query information_schema.columns for the table.",
    level: "basic",
    codeExample: "SELECT column_name, data_type, character_set_name, collation_name \nFROM information_schema.columns \nWHERE table_schema = 'college_admissions' AND table_name = 'students';"
  },
  {
    question: "Can a table have different columns using different character sets and collations?",
    shortAnswer: "Yes! A table can have general columns in `utf8mb4` with `utf8mb4_0900_ai_ci`, a password hash column in `ascii` with `ascii_bin`, and an API token in `utf8mb4` with `utf8mb4_bin`.",
    explanation: "Enables granular column-level optimization for performance and security.",
    hint: "Yes, character sets and collations can be customized per-column.",
    level: "basic"
  },
  {
    question: "What is 'Inheritance Drift' in database administration?",
    shortAnswer: "A situation where altering the database-level default charset does **not** update existing tables or columns, leaving older tables with legacy encodings while new tables use the new charset.",
    explanation: "Altering database defaults only applies to future tables created thereafter.",
    hint: "When existing tables retain older charsets after the database default is changed.",
    level: "expert"
  },
  {
    question: "How do you change the default character set of an existing database for all future tables?",
    shortAnswer: "`ALTER DATABASE database_name CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;`",
    explanation: "Updates the schema default in the data dictionary.",
    hint: "ALTER DATABASE db_name CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;",
    level: "basic"
  },
  {
    question: "What happens if a database is created with `CREATE DATABASE db_name;` when `character_set_server = utf8mb4`?",
    shortAnswer: "The database automatically inherits `utf8mb4` and `utf8mb4_0900_ai_ci` from the server level.",
    explanation: "Top-level inheritance propagation.",
    hint: "Inherits utf8mb4 and utf8mb4_0900_ai_ci from the server-level configuration.",
    level: "basic"
  },
  {
    question: "What is the difference between `SET NAMES 'utf8mb4'` and `SET CHARACTER SET 'utf8mb4'`?",
    shortAnswer: "- `SET NAMES 'utf8mb4'`: Sets client, results, and connection to `utf8mb4`.\n- `SET CHARACTER SET 'utf8mb4'`: Sets client and results to `utf8mb4`, but sets `character_set_connection` to the **database's default charset**.",
    explanation: "SET NAMES is almost always preferred for consistent encoding.",
    hint: "SET NAMES sets connection to utf8mb4; SET CHARACTER SET sets connection to database charset.",
    level: "expert"
  },
  {
    question: "How does the `character_set_connection` variable impact string literals in SQL queries?",
    shortAnswer: "It determines the character set used by the SQL parser to interpret unquoted string literals (e.g. `'Barrackpore'`) before comparing them against table columns.",
    explanation: "Translates query literals to match internal processing standards.",
    hint: "Interprets string literals before comparing them against table columns.",
    level: "expert"
  },
  {
    question: "What command in `my.cnf` sets the server-level default character set and collation?",
    shortAnswer: "`[mysqld]`\n`character-set-server = utf8mb4`\n`collation-server = utf8mb4_0900_ai_ci`",
    explanation: "Configures the top-level root of the 4-level hierarchy.",
    hint: "character-set-server and collation-server in my.cnf.",
    level: "basic"
  },
  {
    question: "What happens if you define a column as `col CHAR(10) CHARACTER SET ascii` inside a `utf8mb4` table?",
    shortAnswer: "That specific column will allocate exactly **10 bytes** (1 byte per char) on disk and in memory, ignoring the table's `utf8mb4` default.",
    explanation: "Column-level definition explicitly overrides table defaults.",
    hint: "Allocates 10 bytes strictly (1 byte per char), overriding the table default.",
    level: "basic"
  },
  {
    question: "How do you verify the active session character sets in MySQL?",
    shortAnswer: "`SHOW VARIABLES LIKE 'character_set%';` and `SHOW VARIABLES LIKE 'collation%';`",
    explanation: "Displays all active client, connection, server, and database settings.",
    hint: "SHOW VARIABLES LIKE 'character_set%';",
    level: "basic",
    codeExample: "SHOW VARIABLES LIKE 'character_set%';"
  },
  {
    question: "Why does converting a database with `ALTER DATABASE` NOT convert existing tables?",
    shortAnswer: "Because `ALTER DATABASE` only updates the metadata default for **future tables**; converting existing tables requires running `ALTER TABLE tbl CONVERT TO CHARACTER SET` on each table.",
    explanation: "Prevents accidental massive I/O table rewrites on simple database alterations.",
    hint: "ALTER DATABASE only affects future tables; existing tables require ALTER TABLE CONVERT TO.",
    level: "basic"
  },
  {
    question: "What is the primary architectural takeaway of Topic 3 in Module 004_002?",
    shortAnswer: "MySQL's 4-tier hierarchy (Server &rarr; Database &rarr; Table &rarr; Column) coupled with the Client-Connection bridge guarantees complete encoding inheritance while allowing granular per-column micro-optimizations, ensuring data integrity from backend applications down to physical disk blocks.",
    explanation: "Mastery of the hierarchy prevents charset mismatches and enables optimal schema design.",
    hint: "4-tier inheritance ensures consistent defaults with granular per-column optimization.",
    level: "basic"
  }
];

export default questions;
