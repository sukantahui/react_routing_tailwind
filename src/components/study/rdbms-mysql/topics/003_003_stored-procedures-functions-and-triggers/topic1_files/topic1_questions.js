// topic1_files/topic1_questions.js

const questions = [
  {
    question: "What is the primary purpose of the `DELIMITER` command in MySQL?",
    shortAnswer: "To change the client-side statement terminator from the default semicolon (`;`) to a custom symbol (e.g. `//` or `$$`) so that stored routines with internal semicolons can be sent to the server as a single unbroken unit.",
    explanation: "Prevents premature statement termination during stored routine definition.",
    hint: "Changes statement terminator so procedures with internal semicolons don't terminate prematurely.",
    level: "basic"
  },
  {
    question: "What error occurs if you attempt to create a multi-statement stored procedure without changing the `DELIMITER`?",
    shortAnswer: "`Error 1064 (42000): You have an error in your SQL syntax near ''`.",
    explanation: "The client cuts the statement at the first internal semicolon and sends an incomplete fragment.",
    hint: "Error 1064 (Syntax error) on the first internal semicolon.",
    level: "basic"
  },
  {
    question: "Is `DELIMITER` a MySQL server SQL keyword or a client-side command?",
    shortAnswer: "It is a **Client-Side** command processed by the `mysql` CLI and GUI tools; it is NEVER sent to the MySQL server engine.",
    explanation: "Understood strictly by the client parser.",
    hint: "Client-side command; not sent to the server.",
    level: "expert"
  },
  {
    question: "Why don't programmatic database drivers (such as JDBC in Java or PyMySQL in Python) require the `DELIMITER` command?",
    shortAnswer: "Because programmatic drivers send the entire SQL string directly to the server via the MySQL wire protocol without relying on a CLI delimiter parser.",
    explanation: "Direct network protocol transmission bypasses client-side delimiter parsing.",
    hint: "Drivers pass the full SQL string directly to the server API.",
    level: "expert"
  },
  {
    question: "What are the most popular custom delimiters used by MySQL developers?",
    shortAnswer: "Double slash (`//`) and Double dollar (`$$`).",
    explanation: "Standard developer conventions for routine definitions.",
    hint: "// and $$ are standard.",
    level: "basic"
  },
  {
    question: "How do student registration routines for Mamata, Susmita, Abhronila, and Debangshu illustrate `DELIMITER` usage?",
    shortAnswer: "Writing `DELIMITER // CREATE PROCEDURE sp_enroll_mamata() BEGIN DECLARE v_id INT; INSERT INTO students ...; END // DELIMITER ;` allows multiple statements inside `BEGIN ... END`.",
    explanation: "Enables multiple internal SQL statements inside the procedure body.",
    hint: "Wraps procedure body containing multiple semicolons with DELIMITER // and // at END.",
    level: "basic"
  },
  {
    question: "Why MUST you reset the delimiter back to `DELIMITER ;` after creating a stored procedure?",
    shortAnswer: "Because subsequent normal SQL queries (like `SELECT * FROM students;`) will fail to execute if the client is still waiting for `//` to terminate commands.",
    explanation: "Restores normal semicolon command execution in the client session.",
    hint: "Restores default semicolon execution for regular queries.",
    level: "basic"
  },
  {
    question: "Can any arbitrary string be used as a custom delimiter in MySQL?",
    shortAnswer: "Yes, any characters except the backslash escape character (`\\`) can be used, though standard multi-character symbols like `//` or `$$` are strongly recommended.",
    explanation: "Backslash is reserved for escaping.",
    hint: "Yes, except the backslash character (\\).",
    level: "moderate"
  },
  {
    question: "Why should developers avoid using single characters or words (e.g. `DELIMITER a` or `DELIMITER END`) as delimiters?",
    shortAnswer: "Because if that character or word appears anywhere inside column names, strings, or SQL keywords, the client parser will accidentally cut the command at that word.",
    explanation: "Collision risk with SQL identifiers and text literals.",
    hint: "Causes accidental statement cuts when the word/letter appears in code.",
    level: "expert"
  },
  {
    question: "Does `DELIMITER` require a semicolon at the end of its own statement (`DELIMITER //;`)?",
    shortAnswer: "NO; `DELIMITER` does not take a terminating semicolon—writing `DELIMITER //;` sets the new delimiter to `//;` (including the semicolon).",
    explanation: "Delimiter assignment takes all characters following the keyword.",
    hint: "No, write DELIMITER // with no trailing semicolon.",
    level: "expert"
  },
  {
    question: "How does MySQL Workbench handle delimiters when creating procedures via GUI tools?",
    shortAnswer: "MySQL Workbench's visual routine editor automatically wraps procedural code with `DELIMITER $$` behind the scenes when executing the DDL script.",
    explanation: "GUI client automated delimiter wrapping.",
    hint: "Workbench handles delimiter switching automatically in routine editors.",
    level: "basic"
  },
  {
    question: "Can `DELIMITER` be used inside a MySQL Stored Procedure body?",
    shortAnswer: "NO; `DELIMITER` cannot be executed inside a stored procedure because it is a client-side command, not a valid server-side procedural statement.",
    explanation: "Prohibited inside compiled routine bodies.",
    hint: "No, DELIMITER cannot be used inside procedure bodies.",
    level: "expert"
  },
  {
    question: "What happens if a SQL migration script (e.g. in Flyway or Liquibase) encounters a `DELIMITER` command?",
    shortAnswer: "Migration tools must be configured to recognize custom delimiters (e.g. `spring.flyway.default-schema` or Flyway's delimiter configurations) or execute raw multi-line scripts properly.",
    explanation: "CI/CD database migration parser configurations.",
    hint: "Migration tools must be configured to support non-standard delimiters.",
    level: "expert"
  },
  {
    question: "How do you define a trigger that uses `DELIMITER $$`?",
    shortAnswer: "`DELIMITER $$ CREATE TRIGGER trg_audit BEFORE INSERT ON students FOR EACH ROW BEGIN INSERT INTO audit_log VALUES (NEW.id, NOW()); END $$ DELIMITER ;`",
    explanation: "Standard trigger definition pattern with custom delimiter.",
    hint: "DELIMITER $$ before CREATE TRIGGER and $$ after END.",
    level: "basic"
  },
  {
    question: "Why do single-statement procedures (without `BEGIN ... END`) sometimes NOT require a delimiter change?",
    shortAnswer: "If the procedure consists of exactly one single SQL statement without internal semicolons (`CREATE PROCEDURE sp_list() SELECT * FROM students;`), the final semicolon terminates both the statement and the routine.",
    explanation: "Single statement exception.",
    hint: "Single statements have only 1 semicolon at the end.",
    level: "moderate"
  },
  {
    question: "What character sequence should you write at the end of a procedure body when using `DELIMITER //`?",
    shortAnswer: "`END //` (the `END` keyword followed by space and the `//` custom terminator).",
    explanation: "Terminates the routine block in the client parser.",
    hint: "END //",
    level: "basic"
  },
  {
    question: "Can multiple stored procedures be defined in a single `.sql` file using `DELIMITER //`?",
    shortAnswer: "YES; you can define multiple procedures sequentially by ending each with `END //` and finally resetting to `DELIMITER ;` at the end of the file.",
    explanation: "Batch procedural DDL script structuring.",
    hint: "Yes, separate each procedure definition with END //.",
    level: "basic"
  },
  {
    question: "What happens if you execute `DELIMITER ;` while the delimiter is currently `//`?",
    shortAnswer: "If the delimiter is `//`, typing `DELIMITER ;` will not execute until you type `//` because the client is still waiting for `//` to submit the line.",
    explanation: "Client parser state synchronization.",
    hint: "The command is submitted only when the active delimiter is entered.",
    level: "expert"
  },
  {
    question: "How do you change the delimiter in the standard MySQL Command Line Client (`mysql -u root -p`)?",
    shortAnswer: "Simply type `DELIMITER //` at the `mysql>` prompt and press Enter.",
    explanation: "Interactive CLI delimiter command.",
    hint: "Type DELIMITER // at the prompt.",
    level: "basic"
  },
  {
    question: "What is the case sensitivity of the `DELIMITER` command?",
    shortAnswer: "The keyword `DELIMITER` is case-insensitive (`delimiter //` or `DELIMITER //`), but the custom terminator itself preserves exact character casing.",
    explanation: "Command keyword vs symbol casing.",
    hint: "Keyword is case-insensitive; custom symbols preserve casing.",
    level: "moderate"
  },
  {
    question: "Why is `DELIMITER |` or `DELIMITER @` sometimes avoided in complex stored procedures?",
    shortAnswer: "Because `|` is the bitwise OR operator in SQL and `@` is used for user session variables (`@my_var`), which could cause parsing ambiguity in rare edge cases.",
    explanation: "Operator and identifier collision prevention.",
    hint: "Avoid operators (|) and variable symbols (@) to prevent collisions.",
    level: "expert"
  },
  {
    question: "Can comments (`--` or `/* ... */`) appear inside a stored procedure block when using `DELIMITER //`?",
    shortAnswer: "YES; comments are fully valid and preserved inside the stored procedure body.",
    explanation: "Comments inside routine bodies.",
    hint: "Yes, comments are fully supported inside routine bodies.",
    level: "basic"
  },
  {
    question: "How does phpMyAdmin handle custom delimiters during SQL import?",
    shortAnswer: "phpMyAdmin provides an explicit 'Delimiter' input box at the bottom of the SQL query tab where users can specify `//` or `$$`.",
    explanation: "Web GUI delimiter interface configuration.",
    hint: "phpMyAdmin provides an explicit Delimiter input field on the SQL tab.",
    level: "basic"
  },
  {
    question: "What is the memory or performance impact of changing the delimiter in MySQL?",
    shortAnswer: "ZERO; changing the delimiter is a client-side parsing instruction that has zero CPU or memory footprint on the MySQL database server.",
    explanation: "Purely client-side string buffering.",
    hint: "Zero performance impact on the database server.",
    level: "basic"
  },
  {
    question: "How do you define a User-Defined Stored Function using `DELIMITER $$`?",
    shortAnswer: "`DELIMITER $$ CREATE FUNCTION fn_add(a INT, b INT) RETURNS INT DETERMINISTIC BEGIN RETURN a + b; END $$ DELIMITER ;`",
    explanation: "Function definition with custom delimiter.",
    hint: "DELIMITER $$ ... CREATE FUNCTION ... END $$ DELIMITER ;",
    level: "basic"
  },
  {
    question: "What happens if you omit the space between `DELIMITER` and the symbol (`DELIMITER//`)?",
    shortAnswer: "The client throws a syntax error because it treats `DELIMITER//` as an unrecognized single command.",
    explanation: "Requires whitespace token separation.",
    hint: "Throws an error; whitespace is required after DELIMITER.",
    level: "moderate"
  },
  {
    question: "Can DBeaver execute stored procedure scripts without manual `DELIMITER` statements?",
    shortAnswer: "YES; DBeaver automatically detects procedural blocks when selected and executed as a single script block using `Alt+X`.",
    explanation: "Modern IDE intelligent block execution.",
    hint: "Yes, modern IDEs like DBeaver detect and execute routine blocks as a single script.",
    level: "moderate"
  },
  {
    question: "Why should developers always place `DELIMITER ;` at the very end of every SQL DDL script file?",
    shortAnswer: "To guarantee that subsequent scripts running in the same deployment batch or connection session do not fail due to an unreset custom delimiter.",
    explanation: "Script hygiene and batch pipeline reliability.",
    hint: "Ensures subsequent scripts in the deployment batch execute normally.",
    level: "expert"
  },
  {
    question: "How does changing the delimiter enable multi-statement transaction scripts inside procedures?",
    shortAnswer: "It allows statements like `START TRANSACTION;`, multiple `INSERT/UPDATE;` statements, and `COMMIT;` to be parsed together within a single `BEGIN ... END` block.",
    explanation: "Enables multi-statement atomic procedural blocks.",
    hint: "Allows multiple transactional SQL statements to be bundled inside BEGIN ... END.",
    level: "basic"
  },
  {
    question: "What is the senior architect's summary rule for The DELIMITER Keyword?",
    shortAnswer: "Use `DELIMITER //` or `DELIMITER $$` in CLI/migration scripts whenever defining multi-statement stored procedures, functions, or triggers, always terminate the routine with `END //`, immediately reset with `DELIMITER ;`, and recognize that programmatic connectors (JDBC/Python) pass SQL directly without delimiter commands.",
    explanation: "Authoritative architectural best practices for MySQL delimiter management.",
    hint: "DELIMITER // for routine DDL + END // + DELIMITER ; reset + programmatic drivers bypass delimiters.",
    level: "expert"
  }
];

export default questions;
