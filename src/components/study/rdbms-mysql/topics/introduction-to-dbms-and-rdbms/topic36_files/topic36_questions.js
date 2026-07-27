/**
 * Topic 36: Executing SQL Statements – FAQ Questions
 * 30 questions ranging from moderate to expert level.
 */
const questions = [
  {
    question: "What are the main ways to execute SQL statements in MySQL?",
    shortAnswer:
      "The main ways are: command line (`mysql` client), MySQL Workbench, phpMyAdmin, and executing scripts from files.",
    explanation:
      "Each method has its use cases: command line for quick queries, Workbench for development, phpMyAdmin for web-based management, and scripts for automation.",
    hint: "Think about the different tools you can use.",
    level: "basic",
  },
  {
    question: "How do you execute a SQL statement from the command line?",
    shortAnswer:
      "Connect using `mysql -u username -p` and type your statement followed by a semicolon (`;`).",
    explanation:
      "Example: `mysql> SELECT * FROM users;` Press Enter to execute. You can also use `-e` for one-line execution.",
    hint: "Think about the mysql command.",
    level: "basic",
    codeExample: "mysql> SELECT * FROM users;",
  },
  {
    question: "How do you execute a SQL statement in MySQL Workbench?",
    shortAnswer:
      "Type your query in the SQL Editor and click the 'Execute' button (lightning bolt) or use `Ctrl+Enter`.",
    explanation:
      "Workbench provides a visual interface with syntax highlighting, auto-completion, and results grid.",
    hint: "Think about the lightning bolt icon.",
    level: "basic",
  },
  {
    question: "What is the shortcut to execute the current SQL statement in Workbench?",
    shortAnswer:
      "The shortcut is `Ctrl+Enter` (or `Cmd+Enter` on macOS).",
    explanation:
      "This executes only the currently selected statement. `Ctrl+Shift+Enter` executes all statements.",
    hint: "Think about the keyboard shortcut for execution.",
    level: "basic",
  },
  {
    question: "How do you execute a SQL script from a file?",
    shortAnswer:
      "Use `mysql -u username -p < script.sql` in the command line, or use `SOURCE script.sql` from the mysql client.",
    explanation:
      "You can also use Workbench's 'Run SQL Script' option under the File menu.",
    hint: "Think about running a file.",
    level: "intermediate",
    codeExample: "mysql -u root -p < script.sql",
  },
  {
    question: "What is the purpose of the `SOURCE` command in the mysql client?",
    shortAnswer:
      "The `SOURCE` command executes SQL statements from a file while in the mysql client.",
    explanation:
      "Example: `mysql> SOURCE /path/to/script.sql;` This is useful for running large scripts.",
    hint: "Think about executing a file from within the client.",
    level: "intermediate",
  },
  {
    question: "What happens when you execute a SELECT statement?",
    shortAnswer:
      "The database returns a result set containing the rows that match the query.",
    explanation:
      "The result set is displayed as a table with columns and rows. The number of rows returned is shown in the output.",
    hint: "Think about the output of a SELECT query.",
    level: "basic",
  },
  {
    question: "What does 'Query OK, 1 row affected' mean?",
    shortAnswer:
      "It means the statement (INSERT, UPDATE, DELETE) executed successfully and affected one row.",
    explanation:
      "This is a success message. The number indicates how many rows were modified by the operation.",
    hint: "Think about the success message after a DML operation.",
    level: "basic",
  },
  {
    question: "How do you execute only part of a query in Workbench?",
    shortAnswer:
      "Highlight the specific statement you want to execute and press `Ctrl+Enter`.",
    explanation:
      "Only the highlighted text will be executed. This is useful when you have multiple statements in one tab.",
    hint: "Think about selecting text before executing.",
    level: "intermediate",
  },
  {
    question: "What is the difference between executing a query and explaining a query?",
    shortAnswer:
      "Executing runs the query and returns results. Explaining (EXPLAIN) shows the execution plan without running the query.",
    explanation:
      "`EXPLAIN` is used for performance tuning to see how MySQL will execute the query.",
    hint: "Think about analysing vs. running.",
    level: "intermediate",
  },
  {
    question: "How do you limit the number of rows returned by a SELECT query?",
    shortAnswer:
      "Use the `LIMIT` clause: `SELECT * FROM users LIMIT 10;`",
    explanation:
      "This limits the result set to the specified number of rows. It's useful for previewing data.",
    hint: "Think about the LIMIT clause.",
    level: "basic",
    codeExample: "SELECT * FROM users LIMIT 10;",
  },
  {
    question: "What should you do before running an UPDATE or DELETE query?",
    shortAnswer:
      "Run a SELECT query with the same WHERE clause to see which rows will be affected.",
    explanation:
      "This is a safety practice to avoid accidentally updating or deleting the wrong data.",
    hint: "Think about previewing the affected rows.",
    level: "intermediate",
    codeExample: "SELECT * FROM users WHERE id = 5; -- then UPDATE",
  },
  {
    question: "What is the `mysql` command-line option to execute a single query and exit?",
    shortAnswer:
      "Use the `-e` or `--execute` option: `mysql -u root -p -e \"SELECT * FROM users;\"`",
    explanation:
      "This is useful for scripting and automation.",
    hint: "Think about the -e option.",
    level: "intermediate",
    codeExample: "mysql -u root -p -e \"SELECT NOW();\"",
  },
  {
    question: "How do you execute SQL statements with a different database selected?",
    shortAnswer:
      "Use `USE database_name;` before your query, or specify the database in the connection command: `mysql -u root -p mydb`.",
    explanation:
      "Specifying the database at connection time sets the default database.",
    hint: "Think about selecting a database.",
    level: "basic",
  },
  {
    question: "What is the significance of the semicolon (`;`) in SQL execution?",
    shortAnswer:
      "The semicolon terminates a SQL statement in the command line client.",
    explanation:
      "In Workbench, it's optional for single statements but recommended for scripts with multiple statements.",
    hint: "Think about the statement terminator.",
    level: "basic",
  },
  {
    question: "How do you execute a SQL script in MySQL Workbench?",
    shortAnswer:
      "Go to File → Run SQL Script, select the file, and click 'Run'.",
    explanation:
      "This executes the script and shows the results in the Workbench interface.",
    hint: "Think about the File menu option.",
    level: "intermediate",
  },
  {
    question: "What does the output 'Rows matched: 5 Changed: 3' mean?",
    shortAnswer:
      "An UPDATE statement matched 5 rows but only changed 3 (2 rows already had the target values).",
    explanation:
      "This is informative — you see how many rows met the condition and how many were actually modified.",
    hint: "Think about the UPDATE feedback.",
    level: "intermediate",
  },
  {
    question: "How do you cancel a running query in the command line?",
    shortAnswer:
      "Press `Ctrl+C` to interrupt and cancel the currently running query.",
    explanation:
      "This sends an interrupt signal to the MySQL server, stopping the query execution.",
    hint: "Think about the interrupt shortcut.",
    level: "intermediate",
  },
  {
    question: "What is the purpose of the `LIMIT` clause with `UPDATE` and `DELETE`?",
    shortAnswer:
      "The `LIMIT` clause restricts the number of rows affected by UPDATE or DELETE.",
    explanation:
      "Example: `DELETE FROM users WHERE inactive = 1 LIMIT 100;` — deletes only 100 rows at a time.",
    hint: "Think about limiting the impact of DML.",
    level: "intermediate",
  },
  {
    question: "How do you execute SQL statements from a file in Workbench?",
    shortAnswer:
      "Open the file (File → Open SQL Script) and then execute the statements in the editor.",
    explanation:
      "You can also use the 'Run SQL Script' option to run a file directly without opening it.",
    hint: "Think about opening a script file.",
    level: "intermediate",
  },
  {
    question: "What is the `GO` command in SQL scripts?",
    shortAnswer:
      "`GO` is not a MySQL command. In MySQL, statements are separated by semicolons (`;`).",
    explanation:
      "The `GO` command is used in Microsoft SQL Server, not MySQL. In MySQL, use semicolons.",
    hint: "Think about the MySQL statement separator.",
    level: "intermediate",
  },
  {
    question: "How do you execute SQL statements with variables in MySQL?",
    shortAnswer:
      "Use user-defined variables: `SET @var = 'value'; SELECT * FROM users WHERE name = @var;`",
    explanation:
      "User variables are session-scoped and persist for the duration of the connection.",
    hint: "Think about variables in SQL.",
    level: "expert",
    codeExample: "SET @search = 'Swadeep'; SELECT * FROM users WHERE name = @search;",
  },
  {
    question: "What is the maximum number of rows returned by default in Workbench?",
    shortAnswer:
      "By default, Workbench limits SELECT results to 1000 rows.",
    explanation:
      "You can change this limit in Edit → Preferences → SQL Queries → Limit Rows.",
    hint: "Think about the default result limit.",
    level: "intermediate",
  },
  {
    question: "How do you execute a multi-statement script safely?",
    shortAnswer:
      "Wrap multiple statements in a transaction so you can rollback if something fails.",
    explanation:
      "Use `START TRANSACTION;` before the script and `COMMIT;` at the end, or `ROLLBACK;` on error.",
    hint: "Think about transaction safety.",
    level: "expert",
    codeExample: "START TRANSACTION; -- statements -- COMMIT;",
  },
  {
    question: "What is the `\G` command in the mysql client?",
    shortAnswer:
      "`\G` (capital G) displays query results vertically (one column per row) instead of horizontally.",
    explanation:
      "This is useful for wide tables where horizontal display is hard to read.",
    hint: "Think about vertical display.",
    level: "intermediate",
  },
  {
    question: "How do you execute SQL statements with error handling?",
    shortAnswer:
      "Use `DECLARE EXIT HANDLER` in stored procedures to catch errors, or check the affected rows and warnings.",
    explanation:
      "In scripts, you can check the exit code or error messages. In Workbench, check the Output panel.",
    hint: "Think about error handling.",
    level: "expert",
  },
  {
    question: "What are the common SQL execution errors?",
    shortAnswer:
      "Common errors include: syntax errors, access denied, unknown table/database, and duplicate entry.",
    explanation:
      "Read the error message carefully — it usually tells you exactly what's wrong and where.",
    hint: "Think about common error types.",
    level: "basic",
  },
  {
    question: "How do you view query execution time in Workbench?",
    shortAnswer:
      "After executing a query, the time is displayed in the Output panel or at the bottom of the results grid.",
    explanation:
      "Example: '0.015 sec' — this helps identify slow queries.",
    hint: "Think about the execution time display.",
    level: "intermediate",
  },
  {
    question: "Can you execute SQL statements from a web application?",
    shortAnswer:
      "Yes, through database connectors like PDO for PHP, PyMySQL for Python, JDBC for Java, etc.",
    explanation:
      "Applications execute SQL programmatically using prepared statements to prevent SQL injection.",
    hint: "Think about programmatic execution.",
    level: "intermediate",
  },
  {
    question: "What is the difference between interactive and batch execution?",
    shortAnswer:
      "Interactive execution is done in real-time with immediate feedback. Batch execution runs multiple statements as a script, often automated.",
    explanation:
      "Batch execution is used for migrations, backups, and scheduled tasks.",
    hint: "Think about manual vs. automated execution.",
    level: "intermediate",
  },
];

export default questions;