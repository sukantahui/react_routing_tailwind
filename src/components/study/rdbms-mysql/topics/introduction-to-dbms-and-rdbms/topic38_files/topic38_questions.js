/**
 * Topic 38: Importing SQL Scripts – FAQ Questions
 * 30 questions ranging from moderate to expert level.
 */
const questions = [
  {
    question: "What is the most common way to import a SQL file using the command line?",
    shortAnswer:
      "Use `mysql -u username -p database_name < file.sql` to import a SQL file.",
    explanation:
      "This redirects the content of the file into the mysql client, executing all statements. It's fast and reliable for large files.",
    hint: "Think about the input redirection operator.",
    level: "basic",
    codeExample: "mysql -u root -p mydb < backup.sql",
  },
  {
    question: "How do you import a SQL file from within the mysql client?",
    shortAnswer:
      "Use the `SOURCE` command: `mysql> SOURCE /path/to/file.sql;`",
    explanation:
      "This executes the SQL file from the client. You must first connect to MySQL and select the database.",
    hint: "Think about the SOURCE command.",
    level: "basic",
    codeExample: "mysql> SOURCE /home/user/backup.sql;",
  },
  {
    question: "What is the difference between using `<` and `SOURCE` for import?",
    shortAnswer:
      "The `<` redirect is used from the shell (outside MySQL). `SOURCE` is used from within the MySQL client.",
    explanation:
      "Both execute the SQL file, but they are used in different contexts.",
    hint: "Think about the environment (shell vs. mysql prompt).",
    level: "intermediate",
  },
  {
    question: "How do you import a compressed SQL file (e.g., .sql.gz)?",
    shortAnswer:
      "Use `gunzip -c file.sql.gz | mysql -u username -p database_name`",
    explanation:
      "This decompresses the file on the fly and pipes it to the mysql client.",
    hint: "Think about piping decompressed output.",
    level: "intermediate",
    codeExample: "gunzip -c backup.sql.gz | mysql -u root -p mydb",
  },
  {
    question: "How do you import a SQL file into a specific database?",
    shortAnswer:
      "Specify the database name in the command: `mysql -u username -p database_name < file.sql`",
    explanation:
      "You can also include `USE database_name;` at the top of the script.",
    hint: "Think about the database name in the command.",
    level: "basic",
  },
  {
    question: "What is the MySQL Workbench 'Run SQL Script' feature?",
    shortAnswer:
      "It's a feature that allows you to execute a SQL file directly from Workbench.",
    explanation:
      "You can find it under File → Run SQL Script. It executes the script and shows progress.",
    hint: "Think about the Workbench file menu.",
    level: "basic",
  },
  {
    question: "What is the Data Import feature in MySQL Workbench?",
    shortAnswer:
      "It's a tool for restoring a database from a SQL dump or importing data from CSV files.",
    explanation:
      "It's the reverse of Data Export and is useful for restoring backups.",
    hint: "Think about the Server menu option.",
    level: "intermediate",
  },
  {
    question: "How do you import a SQL file in phpMyAdmin?",
    shortAnswer:
      "Go to the target database, click the 'Import' tab, choose the file, and click 'Go'.",
    explanation:
      "phpMyAdmin provides a web interface for imports, but it's limited by file size.",
    hint: "Think about the Import tab in phpMyAdmin.",
    level: "basic",
  },
  {
    question: "What are the limitations of importing through phpMyAdmin?",
    shortAnswer:
      "phpMyAdmin has file size limits (controlled by PHP), can timeout for large files, and may not handle very large imports.",
    explanation:
      "For large files, use the command line or split the file into smaller chunks.",
    hint: "Think about PHP upload limits and timeouts.",
    level: "intermediate",
  },
  {
    question: "How can you increase the file upload limit in phpMyAdmin?",
    shortAnswer:
      "Modify `upload_max_filesize` and `post_max_size` in `php.ini`, and set `max_execution_time` and `memory_limit`.",
    explanation:
      "These PHP settings control the maximum file size and execution time.",
    hint: "Think about PHP configuration.",
    level: "expert",
  },
  {
    question: "What is the purpose of `--force` when importing with mysql?",
    shortAnswer:
      "It forces the import to continue even if errors are encountered.",
    explanation:
      "This is useful for debugging, but use with caution as it may skip important errors.",
    hint: "Think about the --force option.",
    level: "intermediate",
    codeExample: "mysql -u root -p --force mydb < backup.sql",
  },
  {
    question: "How do you disable foreign key checks during import?",
    shortAnswer:
      "Add `SET FOREIGN_KEY_CHECKS=0;` at the beginning and `SET FOREIGN_KEY_CHECKS=1;` at the end of the script.",
    explanation:
      "This speeds up imports and avoids foreign key constraint errors.",
    hint: "Think about the FOREIGN_KEY_CHECKS variable.",
    level: "intermediate",
    codeExample: "SET FOREIGN_KEY_CHECKS=0;\n-- import statements\nSET FOREIGN_KEY_CHECKS=1;",
  },
  {
    question: "What is the role of `max_allowed_packet` in SQL imports?",
    shortAnswer:
      "It controls the maximum size of a packet that MySQL can receive. Large imports may exceed this limit.",
    explanation:
      "Increase `max_allowed_packet` in `my.cnf` or use the command line to avoid packet size errors.",
    hint: "Think about packet size limits.",
    level: "intermediate",
  },
  {
    question: "How do you import a SQL file with a different character set?",
    shortAnswer:
      "Use `--default-character-set=utf8mb4` in the mysql command.",
    explanation:
      "This ensures that the import uses the correct character set to avoid data corruption.",
    hint: "Think about the character set option.",
    level: "intermediate",
    codeExample: "mysql -u root -p --default-character-set=utf8mb4 mydb < backup.sql",
  },
  {
    question: "What is the best practice for importing large SQL files?",
    shortAnswer:
      "Use the command line with `mysql` and consider splitting the file, using `--force`, and increasing `max_allowed_packet`.",
    explanation:
      "The command line is more reliable for large files than GUI tools.",
    hint: "Think about the most robust method.",
    level: "intermediate",
  },
  {
    question: "How can you monitor the progress of a large SQL import?",
    shortAnswer:
      "Use `pv` (pipe viewer) to show progress: `pv large.sql | mysql -u root -p mydb`",
    explanation:
      "`pv` shows a progress bar, elapsed time, and throughput.",
    hint: "Think about the `pv` tool.",
    level: "expert",
  },
  {
    question: "What should you do before importing into a production database?",
    shortAnswer:
      "Take a backup of the production database and test the import on a staging environment.",
    explanation:
      "Always have a rollback plan and verify the import in a safe environment first.",
    hint: "Think about safety precautions.",
    level: "basic",
  },
  {
    question: "What are the common errors during SQL import?",
    shortAnswer:
      "Common errors include: file not found, permission denied, syntax errors, foreign key constraint failures, and packet size errors.",
    explanation:
      "Check the file path, user permissions, and the SQL syntax in the script.",
    hint: "Think about typical import problems.",
    level: "intermediate",
  },
  {
    question: "How do you import a SQL script that creates a database?",
    shortAnswer:
      "If the script contains `CREATE DATABASE`, you don't need to specify a database in the command. Just run `mysql -u root -p < script.sql`.",
    explanation:
      "The script will create the database and then switch to it.",
    hint: "Think about the script containing `CREATE DATABASE`.",
    level: "basic",
  },
  {
    question: "Can you import a SQL file from a remote server?",
    shortAnswer:
      "Yes, you can use `mysql -u username -p -h remote_host database < file.sql` or pipe the file over SSH.",
    explanation:
      "Example: `ssh user@remote 'cat /path/file.sql' | mysql -u root -p`",
    hint: "Think about remote connections.",
    level: "expert",
  },
  {
    question: "How do you handle a script that uses absolute paths for `LOAD DATA INFILE`?",
    shortAnswer:
      "You may need to adjust the paths or use `LOCAL` if the file is on the client machine.",
    explanation:
      "Use `LOAD DATA LOCAL INFILE` and ensure `local_infile` is enabled.",
    hint: "Think about the `LOCAL` keyword.",
    level: "expert",
  },
  {
    question: "What is the `mysqlimport` command used for?",
    shortAnswer:
      "`mysqlimport` is a command-line tool for importing data from text files (CSV) into MySQL tables.",
    explanation:
      "It's faster than using `LOAD DATA INFILE` for many files.",
    hint: "Think about a dedicated import tool.",
    level: "intermediate",
  },
  {
    question: "How do you import a CSV file using `mysqlimport`?",
    shortAnswer:
      "Use `mysqlimport --fields-terminated-by=',' --lines-terminated-by='\\n' database_name table_name.csv`",
    explanation:
      "The file name must match the table name.",
    hint: "Think about the mysqlimport syntax.",
    level: "expert",
  },
  {
    question: "What is the difference between importing a SQL file and using `mysqlimport`?",
    shortAnswer:
      "`mysqlimport` is specifically for loading delimited text files (CSV) into tables, while `mysql` can execute any SQL statements.",
    explanation:
      "`mysqlimport` is faster for simple CSV imports.",
    hint: "Think about the purpose of each.",
    level: "intermediate",
  },
  {
    question: "How do you import data from a CSV file using SQL?",
    shortAnswer:
      "Use `LOAD DATA INFILE '/path/file.csv' INTO TABLE table_name FIELDS TERMINATED BY ',' ENCLOSED BY '\"' LINES TERMINATED BY '\\n';`",
    explanation:
      "This is a powerful SQL statement that can handle various CSV formats.",
    hint: "Think about the LOAD DATA INFILE command.",
    level: "intermediate",
  },
  {
    question: "What is the purpose of the `--skip-opt` option in mysqldump when importing?",
    shortAnswer:
      "This is not an import option; it's a dump option to skip optimizations. It's not relevant for import.",
    explanation:
      "For importing, focus on mysql client options.",
    hint: "Think about the difference between dump and import.",
    level: "expert",
  },
  {
    question: "How do you import a SQL dump with a different collation?",
    shortAnswer:
      "Use `--default-character-set` and `--collation-server` options to match the dump's collation.",
    explanation:
      "Make sure the database and connection use the same collation.",
    hint: "Think about collation settings.",
    level: "expert",
  },
  {
    question: "What is the best way to import a SQL script without locking tables?",
    shortAnswer:
      "For InnoDB tables, you can use `--skip-lock-tables` in mysqldump, but for import, you can use `SET autocommit=0;` and commit periodically.",
    explanation:
      "Use transactions to avoid locking issues during import.",
    hint: "Think about transaction handling.",
    level: "expert",
  },
  {
    question: "How do you verify a successful import?",
    shortAnswer:
      "Check the output messages for errors, verify the row counts in tables, and run test queries.",
    explanation:
      "A successful import will show 'Query OK' messages and no errors.",
    hint: "Think about verification steps.",
    level: "basic",
  },
  {
    question: "What is the role of `mysqlbinlog` in import?",
    shortAnswer:
      "`mysqlbinlog` is used to read binary logs, not for import. It's for replication and point-in-time recovery.",
    explanation:
      "It's a different tool, not for importing SQL dumps.",
    hint: "Think about binary logs.",
    level: "expert",
  },
];

export default questions;