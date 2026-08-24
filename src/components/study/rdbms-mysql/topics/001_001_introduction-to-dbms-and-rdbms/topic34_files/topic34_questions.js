/**
 * Topic 34: Creating the First Database – FAQ Questions
 * 30 questions ranging from moderate to expert level.
 */
const questions = [
  {
    question: "What is the SQL command to create a database?",
    shortAnswer:
      "The command is `CREATE DATABASE database_name;`",
    explanation:
      "Replace `database_name` with your desired database name. You can also add `IF NOT EXISTS` and character set options.",
    hint: "Think about the CREATE command.",
    level: "basic",
    codeExample: "CREATE DATABASE mydb;",
  },
  {
    question: "What is the recommended character set for a MySQL database?",
    shortAnswer:
      "The recommended character set is `utf8mb4` with collation `utf8mb4_unicode_ci`.",
    explanation:
      "`utf8mb4` supports all Unicode characters, including emojis, and is the modern standard for multilingual applications.",
    hint: "Think about the character set that supports all Unicode.",
    level: "basic",
    codeExample: "CREATE DATABASE mydb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;",
  },
  {
    question: "Why should I specify a character set when creating a database?",
    shortAnswer:
      "Specifying a character set ensures that all tables and columns inherit the correct encoding, preventing character corruption.",
    explanation:
      "Default character sets may not support all languages or emojis. Specifying `utf8mb4` ensures compatibility across languages.",
    hint: "Think about avoiding character encoding issues.",
    level: "intermediate",
  },
  {
    question: "What are the naming rules for MySQL database names?",
    shortAnswer:
      "Database names must start with a letter, can contain letters, numbers, and underscores, and must not be reserved keywords.",
    explanation:
      "Maximum length is 64 characters. Avoid spaces and special characters. Use lowercase with underscores for readability.",
    hint: "Think about valid and invalid names.",
    level: "basic",
  },
  {
    question: "How do I check if a database exists before creating it?",
    shortAnswer:
      "Use `CREATE DATABASE IF NOT EXISTS database_name;`",
    explanation:
      "This prevents errors if the database already exists. It's a safe practice for scripts and automation.",
    hint: "Think about avoiding duplicate creation errors.",
    level: "intermediate",
    codeExample: "CREATE DATABASE IF NOT EXISTS mydb;",
  },
  {
    question: "How do I view all databases on a MySQL server?",
    shortAnswer:
      "Use the command `SHOW DATABASES;`",
    explanation:
      "This lists all databases the current user has permission to see.",
    hint: "Think about listing all databases.",
    level: "basic",
    codeExample: "SHOW DATABASES;",
  },
  {
    question: "How do I switch to a specific database?",
    shortAnswer:
      "Use `USE database_name;`",
    explanation:
      "This sets the default database for subsequent queries. You can also specify the database in connection parameters.",
    hint: "Think about changing the current database.",
    level: "basic",
    codeExample: "USE mydb;",
  },
  {
    question: "What is the difference between a database and a schema in MySQL?",
    shortAnswer:
      "In MySQL, `DATABASE` and `SCHEMA` are synonyms. They mean the same thing.",
    explanation:
      "Both are used interchangeably. You can use `CREATE SCHEMA` or `CREATE DATABASE`.",
    hint: "Think about whether they are the same.",
    level: "intermediate",
  },
  {
    question: "What privileges are needed to create a database?",
    shortAnswer:
      "You need the `CREATE DATABASE` privilege or `ALL PRIVILEGES`.",
    explanation:
      "Typically, root or a user with administrative privileges can create databases. Application users should have limited privileges.",
    hint: "Think about the required permissions.",
    level: "intermediate",
  },
  {
    question: "What is the default storage engine for MySQL tables?",
    shortAnswer:
      "The default storage engine in MySQL is InnoDB.",
    explanation:
      "InnoDB supports transactions, foreign keys, and ACID compliance. It's the recommended engine for most applications.",
    hint: "Think about the default engine.",
    level: "basic",
  },
  {
    question: "How do I delete a database in MySQL?",
    shortAnswer:
      "Use `DROP DATABASE database_name;`",
    explanation:
      "⚠️ This permanently deletes the database and all its data. Use with extreme caution!",
    hint: "Think about deleting a database.",
    level: "basic",
    codeExample: "DROP DATABASE mydb;",
  },
  {
    question: "Can I create a database with spaces in the name?",
    shortAnswer:
      "Yes, but you must use backticks: `CREATE DATABASE `my database`;`",
    explanation:
      "However, it's strongly recommended to avoid spaces and use underscores instead.",
    hint: "Think about escaping with backticks.",
    level: "intermediate",
  },
  {
    question: "What is the maximum length of a database name in MySQL?",
    shortAnswer:
      "The maximum length is 64 characters.",
    explanation:
      "Keep names concise but descriptive. Use abbreviations if necessary.",
    hint: "Think about the character limit.",
    level: "basic",
  },
  {
    question: "How do I specify a character set when creating a database?",
    shortAnswer:
      "Use the `CHARACTER SET` and `COLLATE` options: `CREATE DATABASE mydb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`",
    explanation:
      "This sets the default character set for all tables in the database.",
    hint: "Think about the CHARACTER SET option.",
    level: "intermediate",
  },
  {
    question: "What is the difference between `utf8` and `utf8mb4` in MySQL?",
    shortAnswer:
      "`utf8` only supports 3-byte Unicode characters, while `utf8mb4` supports full 4-byte Unicode (including emojis).",
    explanation:
      "`utf8mb4` is the recommended character set for modern applications. `utf8` is limited and may cause issues with certain characters.",
    hint: "Think about emoji support.",
    level: "intermediate",
  },
  {
    question: "How do I create a database using MySQL Workbench?",
    shortAnswer:
      "Open Workbench, connect to a server, right-click in the Navigator, select 'Create Schema', enter the name, and apply.",
    explanation:
      "Workbench provides a visual interface for creating databases. You can also specify character set and collation.",
    hint: "Think about the visual tool.",
    level: "basic",
  },
  {
    question: "How do I create a database using phpMyAdmin?",
    shortAnswer:
      "Log in to phpMyAdmin, click 'New' in the sidebar, enter the database name, and click 'Create'.",
    explanation:
      "phpMyAdmin is a web-based tool included with XAMPP/WAMP. It's a simple way to manage databases.",
    hint: "Think about the web-based tool.",
    level: "basic",
  },
  {
    question: "What happens if I create a database with the same name as an existing one?",
    shortAnswer:
      "The command will fail with an error unless you use `IF NOT EXISTS`.",
    explanation:
      "Using `IF NOT EXISTS` prevents errors and makes your scripts more robust.",
    hint: "Think about duplicate names.",
    level: "basic",
  },
  {
    question: "How do I grant a user permissions on a specific database?",
    shortAnswer:
      "Use `GRANT ALL ON database_name.* TO 'user'@'host';`",
    explanation:
      "This gives the user full access to the specified database. Always use the principle of least privilege.",
    hint: "Think about the GRANT command.",
    level: "intermediate",
    codeExample: "GRANT ALL ON mydb.* TO 'app_user'@'localhost';",
  },
  {
    question: "What is the data directory for MySQL databases?",
    shortAnswer:
      "The default data directory is `/var/lib/mysql` on Linux and `C:\\ProgramData\\MySQL\\MySQL Server X.X\\Data` on Windows.",
    explanation:
      "Each database is stored as a subdirectory within the data directory.",
    hint: "Think about where database files are stored.",
    level: "intermediate",
  },
  {
    question: "Can a MySQL database have no tables?",
    shortAnswer:
      "Yes, a database can exist without any tables. You can create tables later.",
    explanation:
      "A database is just a container. It can be empty until you add tables and data.",
    hint: "Think about empty databases.",
    level: "basic",
  },
  {
    question: "What is the `INFORMATION_SCHEMA` database?",
    shortAnswer:
      "`INFORMATION_SCHEMA` is a system database that contains metadata about all other databases and objects.",
    explanation:
      "It provides read-only access to database metadata, such as table names, column types, and privileges.",
    hint: "Think about the metadata database.",
    level: "intermediate",
  },
  {
    question: "How do I list all databases using SQL?",
    shortAnswer:
      "Use `SHOW DATABASES;` or query `SELECT schema_name FROM information_schema.schemata;`",
    explanation:
      "Both commands list all databases the user has access to.",
    hint: "Think about listing databases.",
    level: "basic",
  },
  {
    question: "What is the role of the `mysql` system database?",
    shortAnswer:
      "The `mysql` database stores user accounts, privileges, and system metadata.",
    explanation:
      "It's used for authentication and authorisation. Do not modify it directly.",
    hint: "Think about the system database.",
    level: "intermediate",
  },
  {
    question: "How do I create a database from a script?",
    shortAnswer:
      "Write the `CREATE DATABASE` statement in a `.sql` file and execute it: `mysql -u root -p &lt; script.sql`.",
    explanation:
      "Scripts are useful for automating database setup. You can include multiple statements in one file.",
    hint: "Think about script execution.",
    level: "intermediate",
  },
  {
    question: "What is the `CREATE SCHEMA` command?",
    shortAnswer:
      "In MySQL, `CREATE SCHEMA` is a synonym for `CREATE DATABASE`. They are identical.",
    explanation:
      "You can use either command. Some developers prefer `SCHEMA` for clarity.",
    hint: "Think about the synonym.",
    level: "basic",
  },
  {
    question: "What should I consider when naming a database?",
    shortAnswer:
      "Use lowercase letters, underscores, meaningful names, avoid reserved words, and keep it under 64 characters.",
    explanation:
      "Good naming makes your database easier to use and maintain.",
    hint: "Think about naming conventions.",
    level: "basic",
  },
  {
    question: "How do I verify that a database was created successfully?",
    shortAnswer:
      "Use `SHOW DATABASES;` and check if the new database appears in the list.",
    explanation:
      "You can also use `USE new_database;` and then `SELECT DATABASE();` to confirm.",
    hint: "Think about verification methods.",
    level: "basic",
  },
  {
    question: "What is the purpose of the `COLLATE` option when creating a database?",
    shortAnswer:
      "It defines the sorting and comparison rules for text data in the database.",
    explanation:
      "`utf8mb4_unicode_ci` is case-insensitive and supports Unicode sorting rules.",
    hint: "Think about sorting and comparison.",
    level: "intermediate",
  },
  {
    question: "How do I create a database with a specific character set using the command line?",
    shortAnswer:
      "Connect to MySQL and run: `CREATE DATABASE mydb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`",
    explanation:
      "This sets the character set and collation at creation time.",
    hint: "Think about the CREATE command with options.",
    level: "intermediate",
  },
];

export default questions;