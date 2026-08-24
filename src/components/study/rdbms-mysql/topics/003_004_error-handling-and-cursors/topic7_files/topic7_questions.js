// topic7_files/topic7_questions.js

const questions = [
  {
    question: "What is a Database Cursor in MySQL stored procedures?",
    shortAnswer: "A temporary procedural pointer that points to a specific row in an active query result set, allowing sequential row-by-row data retrieval.",
    explanation: "Fundamental definition of a database cursor.",
    hint: "A procedural pointer for traversing query results row-by-row.",
    level: "basic"
  },
  {
    question: "What are the three fundamental characteristics of MySQL cursors?",
    shortAnswer: "1. Read-Only (cannot update through cursor), 2. Non-Scrollable (forward-only traversal), 3. Asensitive (may operate on an internal snapshot).",
    explanation: "The three core properties of MySQL cursors.",
    hint: "Read-Only, Non-Scrollable (forward-only), and Asensitive.",
    level: "basic"
  },
  {
    question: "What is the primary difference between Set-Based SQL and Cursor-Based processing?",
    shortAnswer: "Set-based SQL operates on entire collections of rows simultaneously using relational algebra and optimizer plans; cursors process records sequentially one row at a time in procedural loops.",
    explanation: "Set-based vs procedural processing paradigm.",
    hint: "Set-based processes all rows at once; cursors iterate one row at a time.",
    level: "basic"
  },
  {
    question: "How do student records for Mamata, Susmita, Abhronila, and Debangshu illustrate cursor processing?",
    shortAnswer: "A cursor opens a query on all 4 students, fetches Mamata into local variables, calculates her multi-tiered scholarship, then fetches Susmita, Abhronila, and Debangshu sequentially.",
    explanation: "Row-by-row student iteration using cursors.",
    hint: "Iterates through Mamata, Susmita, Abhronila, and Debangshu one by one.",
    level: "basic"
  },
  {
    question: "Why should set-based SQL queries be preferred over cursors whenever possible?",
    shortAnswer: "Because the MySQL optimizer can parallelize, index-accelerate, and execute set-based SQL hundreds of times faster with vastly lower CPU and memory overhead.",
    explanation: "Performance advantage of set-based operations.",
    hint: "Set-based SQL is optimized, index-accelerated, and drastically faster.",
    level: "basic"
  },
  {
    question: "What is a legitimate architectural use case where a database cursor is strictly necessary?",
    shortAnswer: "Iterating through `information_schema` to dynamically construct and execute DDL commands (`DROP TABLE`, `OPTIMIZE TABLE`) across multiple tables using Prepared Statements.",
    explanation: "Dynamic DDL generation using cursors.",
    hint: "Dynamic DDL generation across metadata tables.",
    level: "expert"
  },
  {
    question: "What does 'Non-Scrollable' mean for MySQL cursors?",
    shortAnswer: "Rows can only be fetched sequentially in a forward direction from first to last; you cannot jump backwards, skip to arbitrary offsets, or fetch the last row directly.",
    explanation: "Non-scrollable cursor mechanics.",
    hint: "Can only move forward row by row; cannot move backwards.",
    level: "basic"
  },
  {
    question: "What does 'Asensitive' mean for MySQL cursors?",
    shortAnswer: "The server may use a temporary copy of the data; modifications made to the underlying table during cursor iteration may or may not be visible to the cursor.",
    explanation: "Asensitive cursor behavior.",
    hint: "Cursor may operate on a temporary snapshot rather than live base data.",
    level: "expert"
  },
  {
    question: "What does 'Read-Only' mean for MySQL cursors?",
    shortAnswer: "You cannot execute `UPDATE ... WHERE CURRENT OF cursor_name` or mutate table rows directly through the cursor pointer.",
    explanation: "Read-only cursor constraint.",
    hint: "Cannot modify rows directly through the cursor pointer.",
    level: "basic"
  },
  {
    question: "Where in the declaration section must cursors be declared?",
    shortAnswer: "AFTER local variables and named conditions, but BEFORE handler declarations: Variables -> Conditions -> Cursors -> Handlers.",
    explanation: "Grammar placement rule for cursors.",
    hint: "After variables/conditions and before handlers.",
    level: "basic"
  },
  {
    question: "Can a cursor be declared inside a Database Trigger in MySQL?",
    shortAnswer: "YES; database triggers support declaring and iterating cursors, though doing so should be minimized to avoid slowing down DML statements.",
    explanation: "Cursor support in triggers.",
    hint: "Yes, triggers support cursors, though with performance costs.",
    level: "expert"
  },
  {
    question: "Can a cursor be declared inside a User-Defined Stored Function (UDF)?",
    shortAnswer: "YES; stored functions can declare and iterate read-only cursors to compute aggregate return values.",
    explanation: "Cursor support in stored functions.",
    hint: "Yes, functions can use cursors for internal calculations.",
    level: "moderate"
  },
  {
    question: "How do cursors help prevent long-held lock contention during massive batch updates (e.g. 500,000 rows)?",
    shortAnswer: "By processing rows in chunks (e.g. fetching 500 rows per loop, updating, and committing periodically), releasing locks frequently.",
    explanation: "Batch chunking with cursors.",
    hint: "Enables periodic batch commits to release locks in small increments.",
    level: "expert"
  },
  {
    question: "What is the memory impact of opening a cursor with a large result set (e.g. 10,000,000 rows)?",
    shortAnswer: "MySQL may materialize the entire result set into an internal temporary table in memory (or disk if it exceeds `tmp_table_size`), consuming substantial RAM and I/O.",
    explanation: "Memory consumption of cursor result sets.",
    hint: "Materializes query results in memory or disk temporary tables.",
    level: "expert"
  },
  {
    question: "Can a cursor query accept local stored procedure variables in its `WHERE` clause?",
    shortAnswer: "YES; `DECLARE cur CURSOR FOR SELECT id, name FROM students WHERE dept_id = v_dept_id;` binds local variables dynamically.",
    explanation: "Variable binding in cursor declarations.",
    hint: "Yes, cursor SELECT queries can reference procedure variables.",
    level: "basic"
  },
  {
    question: "What happens if the local variable referenced in a cursor declaration changes value AFTER the cursor is opened?",
    shortAnswer: "The result set is determined when the cursor is OPENED; modifying the variable after `OPEN` has NO effect on the active cursor result set.",
    explanation: "Result set binding at OPEN time.",
    hint: "Query parameters are bound when OPEN executes, not during subsequent fetches.",
    level: "expert"
  },
  {
    question: "What built-in condition handler is mandatory when iterating a cursor?",
    shortAnswer: "`DECLARE CONTINUE HANDLER FOR NOT FOUND SET v_is_done = TRUE;`.",
    explanation: "Essential NOT FOUND cursor iteration handler.",
    hint: "CONTINUE HANDLER FOR NOT FOUND.",
    level: "basic"
  },
  {
    question: "What happens if a cursor loop fails to check the `NOT FOUND` flag after `FETCH`?",
    shortAnswer: "The loop enters an infinite loop, continuously processing the last fetched row's values repeatedly until MySQL times out.",
    explanation: "The infamous cursor infinite loop trap.",
    hint: "Enters an infinite loop reprocessing the last row endlessly.",
    level: "basic"
  },
  {
    question: "How does a developer choose between a Window Function (e.g., `ROW_NUMBER()`) and a Cursor?",
    shortAnswer: "Always choose Window Functions for analytical rankings, running totals, and offsets; use Cursors only when procedural DDL or external actions are required per row.",
    explanation: "Window functions vs cursors.",
    hint: "Use Window Functions for analytics; use Cursors for procedural actions.",
    level: "expert"
  },
  {
    question: "Can a procedure open multiple cursors sequentially one after another?",
    shortAnswer: "YES; you can open cursor 1, process and close it, then reset the `NOT FOUND` flag to `FALSE`, and open cursor 2.",
    explanation: "Sequential cursor execution.",
    hint: "Yes, close the first cursor, reset flag to FALSE, and open the next.",
    level: "basic"
  },
  {
    question: "Can a procedure open multiple cursors simultaneously in a nested parent-child relationship?",
    shortAnswer: "YES; but each cursor loop must be enclosed in its own inner `BEGIN ... END` block with its own scoped `NOT FOUND` handler.",
    explanation: "Nested cursor scoping architecture.",
    hint: "Yes, inside nested BEGIN...END blocks with separate handlers.",
    level: "expert"
  },
  {
    question: "What happens if you attempt to `OPEN` a cursor that is already open?",
    shortAnswer: "MySQL throws Error `1325` (`ER_SP_CURSOR_ALREADY_OPEN`: Cursor is already open).",
    explanation: "Cursor already open error.",
    hint: "Throws Error 1325 (cursor already open).",
    level: "basic"
  },
  {
    question: "What happens if you attempt to `FETCH` from a cursor that has NOT been opened?",
    shortAnswer: "MySQL throws Error `1326` (`ER_SP_CURSOR_NOT_OPEN`: Cursor is not open).",
    explanation: "Cursor not open error.",
    hint: "Throws Error 1326 (cursor not open).",
    level: "basic"
  },
  {
    question: "What happens if you attempt to `CLOSE` a cursor that is not open?",
    shortAnswer: "MySQL throws Error `1326` (`ER_SP_CURSOR_NOT_OPEN`).",
    explanation: "Closing an unopened cursor error.",
    hint: "Throws Error 1326.",
    level: "basic"
  },
  {
    question: "Does MySQL automatically close open cursors when a stored procedure terminates?",
    shortAnswer: "YES; when the `BEGIN ... END` block terminates, MySQL deallocates and closes all open cursors automatically, though explicit `CLOSE` is best practice.",
    explanation: "Automatic cursor cleanup on routine exit.",
    hint: "Yes, MySQL auto-closes cursors on exit, but explicit CLOSE is best practice.",
    level: "moderate"
  },
  {
    question: "How do you count total rows processed during a cursor loop?",
    shortAnswer: "Declare a counter variable (`DECLARE v_count INT DEFAULT 0;`) and increment it (`SET v_count = v_count + 1;`) inside the loop body.",
    explanation: "Iterative row counting in cursor loops.",
    hint: "Increment a counter variable inside the loop body.",
    level: "basic"
  },
  {
    question: "Can you pass cursor result set rows to another stored procedure via `CALL`?",
    shortAnswer: "YES; inside the loop, fetch the row into local variables and invoke `CALL sp_process_single_student(v_id, v_fee);`.",
    explanation: "Delegating row processing to child procedures.",
    hint: "Yes, fetch into variables and execute CALL sp_sub_routine(variables).",
    level: "basic"
  },
  {
    question: "Why do cursor loops perform slower than `UPDATE ... WHERE` statements?",
    shortAnswer: "Because each cursor iteration incurs procedural virtual machine context switching, variable assignments, and row-by-row parsing overhead.",
    explanation: "Context switching overhead of procedural loops.",
    hint: "Row-by-row context switching and procedural interpreter overhead.",
    level: "expert"
  },
  {
    question: "What is an RBAR anti-pattern in database engineering?",
    shortAnswer: "'Row-By-Agonizing-Row' — the anti-pattern of using cursors or procedural loops to perform operations that could be done with a single set-based SQL query.",
    explanation: "The RBAR anti-pattern.",
    hint: "Row-By-Agonizing-Row: using slow loops instead of single set-based queries.",
    level: "expert"
  },
  {
    question: "What is the senior architect's summary rule for Introduction to Database Cursors?",
    shortAnswer: "Treat cursors as a specialized tool of last resort: always write set-based SQL (`UPDATE`, `INSERT ... SELECT`, Window Functions) for data transformations; use Cursors only when procedural orchestration (dynamic DDL, chunked batch commits, external workflows) is strictly required.",
    explanation: "Authoritative architectural best practices for database cursors.",
    hint: "Set-based SQL first; use Cursors only for dynamic DDL, chunked batch commits, and external workflows.",
    level: "expert"
  }
];

export default questions;
