/**
 * Topic 39: Exporting Databases – FAQ Questions
 * 30 questions ranging from moderate to expert level.
 */
const questions = [
  {
    question: "What is the most common tool for exporting a MySQL database from the command line?",
    shortAnswer:
      "The most common tool is `mysqldump`.",
    explanation:
      "`mysqldump` is a command‑line utility that creates a SQL dump of a database, including structure and/or data.",
    hint: "Think about the command that starts with 'mysqldump'.",
    level: "basic",
    codeExample: "mysqldump -u root -p db_name > backup.sql",
  },
  {
    question: "What is the basic syntax for exporting a single database with mysqldump?",
    shortAnswer:
      "`mysqldump -u username -p database_name > backup.sql`",
    explanation:
      "This exports the entire database (structure + data) to a file named backup.sql.",
    hint: "Think about the redirect to a file.",
    level: "basic",
  },
  {
    question: "How do you export only the structure (no data) of a database?",
    shortAnswer:
      "Use the `--no-data` option: `mysqldump -u root -p --no-data db_name > structure.sql`",
    explanation:
      "This produces a SQL file with only CREATE TABLE and other DDL statements.",
    hint: "Think about the `--no-data` flag.",
    level: "intermediate",
  },
  {
    question: "How do you export only the data (no structure) of a database?",
    shortAnswer:
      "Use the `--no-create-info` option: `mysqldump -u root -p --no-create-info db_name > data.sql`",
    explanation:
      "This produces INSERT statements for all rows, without the table definitions.",
    hint: "Think about the `--no-create-info` flag.",
    level: "intermediate",
  },
  {
    question: "What option ensures a consistent backup for InnoDB tables without locking them?",
    shortAnswer:
      "The `--single-transaction` option.",
    explanation:
      "This starts a transaction and dumps the consistent state of the database without locking tables.",
    hint: "Think about the `--single-transaction` flag.",
    level: "intermediate",
    codeExample: "mysqldump -u root -p --single-transaction db_name > backup.sql",
  },
  {
    question: "How do you include stored procedures and functions in a mysqldump export?",
    shortAnswer:
      "Use the `--routines` option.",
    explanation:
      "By default, `mysqldump` does not export stored procedures, functions, or triggers. `--routines` includes them.",
    hint: "Think about the `--routines` flag.",
    level: "intermediate",
  },
  {
    question: "How do you compress a mysqldump export on the fly?",
    shortAnswer:
      "Pipe the output to `gzip`: `mysqldump -u root -p db_name | gzip > backup.sql.gz`",
    explanation:
      "This creates a compressed `.sql.gz` file, saving storage.",
    hint: "Think about piping to gzip.",
    level: "intermediate",
  },
  {
    question: "How do you export multiple databases with mysqldump?",
    shortAnswer:
      "Use the `--databases` option: `mysqldump -u root -p --databases db1 db2 > multi.sql`",
    explanation:
      "This exports two or more databases into a single SQL file.",
    hint: "Think about the `--databases` flag.",
    level: "intermediate",
  },
  {
    question: "How do you export all databases with mysqldump?",
    shortAnswer:
      "Use the `--all-databases` option: `mysqldump -u root -p --all-databases > all.sql`",
    explanation:
      "This exports every database on the server.",
    hint: "Think about the `--all-databases` flag.",
    level: "basic",
  },
  {
    question: "What option adds `DROP TABLE` statements before each `CREATE TABLE`?",
    shortAnswer:
      "The `--add-drop-table` option.",
    explanation:
      "This ensures that the import will replace existing tables, which is useful for restoring a backup.",
    hint: "Think about the `--add-drop-table` flag.",
    level: "intermediate",
  },
  {
    question: "What is the purpose of the `--no-create-db` option?",
    shortAnswer:
      "It prevents the `CREATE DATABASE` statement from being included in the dump.",
    explanation:
      "This is useful when you want to import into an existing database.",
    hint: "Think about the `--no-create-db` flag.",
    level: "intermediate",
  },
  {
    question: "How do you export specific tables from a database?",
    shortAnswer:
      "List the table names after the database: `mysqldump -u root -p db_name table1 table2 > tables.sql`",
    explanation:
      "Only the specified tables are exported.",
    hint: "Think about listing table names.",
    level: "intermediate",
  },
  {
    question: "What is the difference between `mysqldump` and `mysql`?",
    shortAnswer:
      "`mysqldump` is used to export data; `mysql` is the client for executing SQL statements (including imports).",
    explanation:
      "`mysqldump` produces a SQL file; `mysql` can execute that file.",
    hint: "Think about the purpose of each tool.",
    level: "basic",
  },
  {
    question: "How do you export a database to a file with a different character set?",
    shortAnswer:
      "Use `--default-character-set=utf8mb4` in mysqldump.",
    explanation:
      "This ensures the exported file uses the correct character set.",
    hint: "Think about the character set option.",
    level: "intermediate",
  },
  {
    question: "What is the MySQL Workbench Data Export tool used for?",
    shortAnswer:
      "It is a visual tool for exporting databases, tables, or specific data to SQL files.",
    explanation:
      "It provides options to export structure, data, or both, and can include routines and triggers.",
    hint: "Think about Workbench's export feature.",
    level: "basic",
  },
  {
    question: "How do you export a database using MySQL Workbench?",
    shortAnswer:
      "Server → Data Export → select the database(s) → choose export options → Start Export.",
    explanation:
      "You can export to a self‑contained file or to separate files per table.",
    hint: "Think about the Data Export menu item.",
    level: "basic",
  },
  {
    question: "How do you export a database using phpMyAdmin?",
    shortAnswer:
      "Select the database, click the 'Export' tab, choose Quick or Custom, select format (SQL), and click 'Go'.",
    explanation:
      "phpMyAdmin will generate a SQL file for download.",
    hint: "Think about the Export tab in phpMyAdmin.",
    level: "basic",
  },
  {
    question: "What are the limitations of exporting via phpMyAdmin?",
    shortAnswer:
      "File size is limited by PHP settings (upload_max_filesize, memory_limit), and large exports may time out.",
    explanation:
      "For large databases, use `mysqldump` instead.",
    hint: "Think about PHP memory and timeout limits.",
    level: "intermediate",
  },
  {
    question: "How can you automate database exports on Linux?",
    shortAnswer:
      "Write a shell script with `mysqldump` and schedule it using `cron`.",
    explanation:
      "The script can compress the backup and store it with a timestamp.",
    hint: "Think about cron and shell scripts.",
    level: "intermediate",
  },
  {
    question: "How can you automate database exports on Windows?",
    shortAnswer:
      "Create a batch file with `mysqldump` and schedule it using Task Scheduler.",
    explanation:
      "The batch file can include compression and date stamping.",
    hint: "Think about Task Scheduler and batch files.",
    level: "intermediate",
  },
  {
    question: "What is the best practice for storing backup files?",
    shortAnswer:
      "Store backups off‑site (e.g., cloud storage, separate server) and maintain multiple copies with retention policies.",
    explanation:
      "Having a single copy on the same server is risky; off‑site storage protects against hardware failure.",
    hint: "Think about redundancy and off‑site storage.",
    level: "basic",
  },
  {
    question: "What is the purpose of the `--lock-tables` option in mysqldump?",
    shortAnswer:
      "It locks all tables during the dump to ensure consistency, but it blocks writes.",
    explanation:
      "For InnoDB, `--single-transaction` is preferred over `--lock-tables`.",
    hint: "Think about locking for consistency.",
    level: "intermediate",
  },
  {
    question: "What is the difference between `--lock-tables` and `--single-transaction`?",
    shortAnswer:
      "`--lock-tables` locks tables (blocks writes) for consistency; `--single-transaction` uses a transaction (for InnoDB) without locking.",
    explanation:
      "`--single-transaction` is less intrusive and preferred for InnoDB.",
    hint: "Think about locking vs. transaction.",
    level: "expert",
  },
  {
    question: "How do you export only the triggers of a database?",
    shortAnswer:
      "`mysqldump` does not export only triggers directly. You can export the whole database with `--no-create-info --no-data` and filter triggers, or use `--triggers` and then extract the trigger definitions.",
    explanation:
      "Usually you export the full schema (with `--no-data`) and that includes triggers.",
    hint: "Think about the `--triggers` option combined with others.",
    level: "expert",
  },
  {
    question: "What is the role of `mysqldump` in database migration?",
    shortAnswer:
      "It exports the source database to a SQL file that can be imported into a target database (same or different server).",
    explanation:
      "This is a common migration method between servers.",
    hint: "Think about moving data.",
    level: "basic",
  },
  {
    question: "How do you export a database without the `CREATE DATABASE` statement?",
    shortAnswer:
      "Use `--no-create-db` option: `mysqldump -u root -p --no-create-db db_name > backup.sql`",
    explanation:
      "This is useful when importing into an existing database.",
    hint: "Think about the `--no-create-db` flag.",
    level: "intermediate",
  },
  {
    question: "What is the impact of `--compress` on mysqldump?",
    shortAnswer:
      "It compresses the data sent between the client and server, reducing network bandwidth.",
    explanation:
      "It is useful for remote exports over slow networks.",
    hint: "Think about network compression.",
    level: "intermediate",
  },
  {
    question: "How do you export a database and ignore a specific table?",
    shortAnswer:
      "Use `--ignore-table=db_name.table_name` for each table to skip.",
    explanation:
      "You can use multiple `--ignore-table` options to skip several tables.",
    hint: "Think about the `--ignore-table` option.",
    level: "expert",
  },
  {
    question: "What is the advantage of exporting in `--compact` mode?",
    shortAnswer:
      "It produces a smaller dump by omitting comments and some options.",
    explanation:
      "Useful for quick transfers where readability is not a priority.",
    hint: "Think about compact output.",
    level: "intermediate",
  },
  {
    question: "How do you verify that a mysqldump export was successful?",
    shortAnswer:
      "Check the exit code of the command (`echo $?` in Linux) and look for errors in the output.",
    explanation:
      "Also, you can check the file size and test restore on a test database.",
    hint: "Think about checking the return code.",
    level: "intermediate",
  },
];

export default questions;