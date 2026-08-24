/**
 * Topic 37: Saving SQL Scripts – FAQ Questions
 * 30 questions ranging from moderate to expert level.
 */
const questions = [
  {
    question: "Why is it important to save SQL scripts?",
    shortAnswer:
      "Saving SQL scripts ensures reusability, collaboration, version control, and prevents loss of work.",
    explanation:
      "Saved scripts become a library of reusable code. They also enable team collaboration and maintain a history of changes.",
    hint: "Think about why you wouldn't want to rewrite queries every time.",
    level: "basic",
  },
  {
    question: "What file extension is used for SQL scripts?",
    shortAnswer:
      "SQL scripts are saved with the `.sql` file extension.",
    explanation:
      "This extension is recognised by editors and databases as a SQL file. It's the standard for SQL scripts.",
    hint: "Think about the extension for SQL files.",
    level: "basic",
  },
  {
    question: "How do you save a SQL script in MySQL Workbench?",
    shortAnswer:
      "Use File → Save (Ctrl+S) to save the current query tab as a `.sql` file.",
    explanation:
      "You can also use 'Save As' to name the file. Workbench also allows exporting results.",
    hint: "Think about the Save option in Workbench.",
    level: "basic",
  },
  {
    question: "How do you save SQL output to a file from the command line?",
    shortAnswer:
      "Use output redirection: `mysql -u root -p -e \"SELECT * FROM users;\" > output.sql`.",
    explanation:
      "This captures the query result and saves it to a file. You can also use `tee` to log all output.",
    hint: "Think about the > redirect operator.",
    level: "intermediate",
  },
  {
    question: "What are some good naming conventions for SQL script files?",
    shortAnswer:
      "Use descriptive names, include dates (YYYY-MM-DD), group by function (ddl/, dml/), and use `.sql` extension.",
    explanation:
      "Examples: `create_users_table.sql`, `2024-01-15_migration.sql`, `ddl/alter_orders.sql`.",
    hint: "Think about names that are clear and sortable.",
    level: "intermediate",
  },
  {
    question: "What is the purpose of including metadata in a SQL script?",
    shortAnswer:
      "Metadata (author, date, purpose) helps document the script for future reference and maintenance.",
    explanation:
      "A header comment makes it clear who wrote the script, when, and what it does.",
    hint: "Think about the comments at the top of a file.",
    level: "basic",
  },
  {
    question: "What is the recommended folder structure for SQL scripts?",
    shortAnswer:
      "Common structure: ddl/, dml/, procs/, queries/, migrations/.",
    explanation:
      "This groups scripts by purpose: DDL (schema changes), DML (data manipulation), procedures, reports, and versioned migrations.",
    hint: "Think about organising by function.",
    level: "intermediate",
  },
  {
    question: "Why should SQL scripts be stored in version control?",
    shortAnswer:
      "Version control tracks changes, enables collaboration, allows rollback, and provides an audit trail.",
    explanation:
      "Git is the most common version control system. It keeps a history of all changes and supports team development.",
    hint: "Think about tracking changes over time.",
    level: "basic",
  },
  {
    question: "What are the benefits of using Git for SQL scripts?",
    shortAnswer:
      "Benefits include: history tracking, branching, collaboration, code reviews, and rollback capabilities.",
    explanation:
      "Git allows multiple developers to work on scripts simultaneously and merge changes safely.",
    hint: "Think about the advantages of version control.",
    level: "intermediate",
  },
  {
    question: "What is the purpose of the `migrations/` folder?",
    shortAnswer:
      "It stores versioned SQL scripts for applying incremental schema changes in order.",
    explanation:
      "Migrations are typically numbered or dated, and are applied sequentially to update the database schema.",
    hint: "Think about applying schema changes in a structured way.",
    level: "intermediate",
  },
  {
    question: "How can you make SQL scripts idempotent?",
    shortAnswer:
      "Use `IF NOT EXISTS`, `IF EXISTS`, and similar clauses so scripts can be run multiple times without errors.",
    explanation:
      "Idempotent scripts are safe to re-run, which is essential for migration scripts.",
    hint: "Think about scripts that don't fail on re-run.",
    level: "intermediate",
    codeExample: "CREATE TABLE IF NOT EXISTS users (id INT);",
  },
  {
    question: "What is a SQL script header comment?",
    shortAnswer:
      "A header comment is a block comment at the top of the script containing metadata like author, date, purpose, and dependencies.",
    explanation:
      "It serves as documentation for anyone reading the script.",
    hint: "Think about the information you'd want at the top of a file.",
    level: "basic",
  },
  {
    question: "How do you save a SQL script in phpMyAdmin?",
    shortAnswer:
      "In the SQL tab, write your query and click 'Export' to save it as a SQL file.",
    explanation:
      "You can also use the 'Export' feature to save the entire database structure and data.",
    hint: "Think about the export button in phpMyAdmin.",
    level: "intermediate",
  },
  {
    question: "What is the difference between saving a script and exporting a database?",
    shortAnswer:
      "Saving a script saves a specific query or set of statements. Exporting a database saves the entire structure and/or data.",
    explanation:
      "Exporting is a backup of the database; saving a script is preserving a query.",
    hint: "Think about the scope of the saved data.",
    level: "intermediate",
  },
  {
    question: "How do you save a query from the MySQL command line using `tee`?",
    shortAnswer:
      "Use `tee /path/to/output.log` to log all subsequent output to a file.",
    explanation:
      "`tee` captures everything displayed in the client session, including query results.",
    hint: "Think about logging output.",
    level: "expert",
  },
  {
    question: "What are the common mistakes when saving SQL scripts?",
    shortAnswer:
      "Common mistakes include: not saving at all, using vague names, not adding comments, and not using version control.",
    explanation:
      "These mistakes lead to lost work, confusion, and unmaintainable code.",
    hint: "Think about what can go wrong with script management.",
    level: "basic",
  },
  {
    question: "Why is it important to include the date in script filenames?",
    shortAnswer:
      "Dates help sort scripts chronologically and identify when the script was created or updated.",
    explanation:
      "Using YYYY-MM-DD format ensures proper chronological sorting.",
    hint: "Think about sorting by date.",
    level: "intermediate",
  },
  {
    question: "What is the role of a `README.md` in a scripts folder?",
    shortAnswer:
      "It provides an overview of the folder structure, how to use the scripts, and any dependencies.",
    explanation:
      "A README is essential for team collaboration and onboarding new developers.",
    hint: "Think about documentation for the folder.",
    level: "intermediate",
  },
  {
    question: "Can SQL scripts be saved as part of a programming project?",
    shortAnswer:
      "Yes, SQL scripts are often stored alongside application code in the same repository.",
    explanation:
      "For example, in a web application, the `database/` folder contains all SQL scripts.",
    hint: "Think about where database code lives.",
    level: "basic",
  },
  {
    question: "What is the purpose of the `ddl/` folder?",
    shortAnswer:
      "It stores Data Definition Language scripts for creating, altering, and dropping database objects.",
    explanation:
      "DDL scripts define the schema of the database.",
    hint: "Think about schema changes.",
    level: "basic",
  },
  {
    question: "What is the purpose of the `dml/` folder?",
    shortAnswer:
      "It stores Data Manipulation Language scripts for inserting, updating, and deleting data.",
    explanation:
      "DML scripts manage the data within the tables.",
    hint: "Think about data changes.",
    level: "basic",
  },
  {
    question: "What is the purpose of the `procs/` folder?",
    shortAnswer:
      "It stores stored procedures, functions, and triggers.",
    explanation:
      "These are database programmability objects that encapsulate business logic.",
    hint: "Think about stored procedures.",
    level: "intermediate",
  },
  {
    question: "What is the purpose of the `queries/` folder?",
    shortAnswer:
      "It stores reusable SELECT queries for reporting and analytics.",
    explanation:
      "These are often used by data analysts and for generating reports.",
    hint: "Think about SELECT statements.",
    level: "intermediate",
  },
  {
    question: "How do you automate the saving of SQL scripts?",
    shortAnswer:
      "Use scripts or cron jobs to capture query results and save them to files automatically.",
    explanation:
      "For example, a daily script can run a report query and save the output to a timestamped file.",
    hint: "Think about automation tools.",
    level: "expert",
  },
  {
    question: "What is the significance of the `.sql` extension?",
    shortAnswer:
      "It indicates that the file contains SQL code, and is recognised by databases and editors.",
    explanation:
      "Most tools will syntax-highlight and treat `.sql` files as SQL code.",
    hint: "Think about file extension recognition.",
    level: "basic",
  },
  {
    question: "How can you save SQL scripts in a text editor like VS Code?",
    shortAnswer:
      "Write your SQL, then use File → Save (Ctrl+S) and choose the `.sql` extension.",
    explanation:
      "VS Code and other editors support SQL syntax highlighting with the `.sql` extension.",
    hint: "Think about saving in a code editor.",
    level: "basic",
  },
  {
    question: "What is the difference between `.sql` and `.sql` backup files?",
    shortAnswer:
      "Both are SQL files. The `.sql` extension is standard for SQL scripts; backup files often have the same extension.",
    explanation:
      "Backup files are usually larger and contain the full database structure and data.",
    hint: "Think about the content of backup vs. script.",
    level: "intermediate",
  },
  {
    question: "How do you include comments in SQL scripts?",
    shortAnswer:
      "Use `--` for single-line comments and `/* ... */` for multi-line comments.",
    explanation:
      "Comments are ignored by the database engine but are valuable for documentation.",
    hint: "Think about comment syntax.",
    level: "basic",
    codeExample: "-- This is a comment\n/* Multi-line\n   comment */",
  },
  {
    question: "What is the benefit of using a consistent folder structure for scripts?",
    shortAnswer:
      "It makes it easy to find, use, and maintain scripts, especially in a team environment.",
    explanation:
      "Consistency reduces confusion and onboarding time for new team members.",
    hint: "Think about organisation.",
    level: "intermediate",
  },
  {
    question: "How do you save a script that creates a stored procedure?",
    shortAnswer:
      "Write the `CREATE PROCEDURE` statement in a file and save it with `.sql` extension in the `procs/` folder.",
    explanation:
      "This script can be run to create the procedure in the database.",
    hint: "Think about saving a procedure definition.",
    level: "intermediate",
  },
  {
    question: "What is the best practice for saving scripts used in production?",
    shortAnswer:
      "Production scripts should be version-controlled, reviewed, and tested in a staging environment before being applied.",
    explanation:
      "Always have a rollback plan and test any script on a copy of production data first.",
    hint: "Think about safe deployment practices.",
    level: "expert",
  },
];

export default questions;