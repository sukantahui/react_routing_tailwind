// topic8_files/topic8_questions.js

const questions = [
  {
    question: "What are the four discrete lifecycle states of a MySQL database cursor?",
    shortAnswer: "1. `DECLARE` (define query) → 2. `OPEN` (materialize result set) → 3. `FETCH` (retrieve row into variables) → 4. `CLOSE` (deallocate memory).",
    explanation: "The 4 fundamental phases of cursor execution.",
    hint: "DECLARE, OPEN, FETCH, CLOSE.",
    level: "basic"
  },
  {
    question: "What does the `OPEN cursor_name;` statement actually do in the MySQL database engine?",
    shortAnswer: "It executes the cursor's underlying `SELECT` query, evaluates query parameters, materializes the active result set, and positions the internal row pointer just before the first row.",
    explanation: "Mechanics of the OPEN statement.",
    hint: "Executes the query, materializes the result set, and positions pointer before row 1.",
    level: "basic"
  },
  {
    question: "What does the `FETCH cursor_name INTO var1, var2, ...;` statement do?",
    shortAnswer: "It advances the row pointer to the next row and copies the column values into the declared local variables.",
    explanation: "Mechanics of the FETCH INTO statement.",
    hint: "Advances the pointer and copies row values into variables.",
    level: "basic"
  },
  {
    question: "How do student records for Mamata, Susmita, Abhronila, and Debangshu illustrate the cursor lifecycle?",
    shortAnswer: "1. DECLARE for students → 2. OPEN cur → 3. FETCH Mamata → FETCH Susmita → FETCH Abhronila → FETCH Debangshu → 4. FETCH triggers NOT FOUND → 5. CLOSE cur.",
    explanation: "Step-by-step cursor progression through student rows.",
    hint: "Sequential fetch from Mamata through Debangshu until NOT FOUND triggers CLOSE.",
    level: "basic"
  },
  {
    question: "What happens if you attempt to execute `OPEN` on a cursor that is already open?",
    shortAnswer: "MySQL throws Error `1325` (`ER_SP_CURSOR_ALREADY_OPEN`: Cursor is already open).",
    explanation: "Error 1325 duplicate open error.",
    hint: "Throws Error 1325 (cursor already open).",
    level: "basic"
  },
  {
    question: "What happens if you attempt to execute `FETCH` from a cursor that has not been opened yet?",
    shortAnswer: "MySQL throws Error `1326` (`ER_SP_CURSOR_NOT_OPEN`: Cursor is not open).",
    explanation: "Error 1326 fetch unopened cursor error.",
    hint: "Throws Error 1326 (cursor is not open).",
    level: "basic"
  },
  {
    question: "What error condition is raised when `FETCH` is executed on an exhausted cursor with no more rows?",
    shortAnswer: "MySQL raises Error `1329` (SQLSTATE `'02000'`: No data to FETCH), which triggers the `NOT FOUND` handler.",
    explanation: "End of cursor data condition.",
    hint: "Raises Error 1329 / SQLSTATE '02000' (trapped by NOT FOUND).",
    level: "basic"
  },
  {
    question: "What happens if the number of variables in `FETCH cur INTO ...` does NOT match the number of columns in the `SELECT` query?",
    shortAnswer: "MySQL throws Error `1328` (`ER_SP_WRONG_NO_OF_FETCH_ARGS`: Incorrect number of FETCH variables).",
    explanation: "Column count mismatch error.",
    hint: "Throws Error 1328 (incorrect number of FETCH variables).",
    level: "expert"
  },
  {
    question: "Must the data types of local variables match the data types of the cursor columns?",
    shortAnswer: "They must be compatible; MySQL attempts implicit type coercion, but incompatible types throw conversion errors or data truncation warnings.",
    explanation: "Type compatibility in FETCH INTO.",
    hint: "Must be type-compatible to prevent truncation or conversion errors.",
    level: "basic"
  },
  {
    question: "What happens if you modify a procedure variable referenced in a cursor's `WHERE` clause AFTER the cursor has been opened?",
    shortAnswer: "The result set is frozen when `OPEN` executes; changing the variable afterwards has NO effect on the open cursor.",
    explanation: "Variable binding snapshot at OPEN time.",
    hint: "No effect; parameter values are locked in when OPEN executes.",
    level: "expert"
  },
  {
    question: "Can you re-open a cursor that has been closed with `CLOSE cur;`?",
    shortAnswer: "YES; executing `CLOSE cur;` deallocates the previous result set, and a subsequent `OPEN cur;` re-evaluates the query and opens a fresh result set.",
    explanation: "Cursor re-opening lifecycle.",
    hint: "Yes, you can CLOSE and re-OPEN a cursor multiple times.",
    level: "basic"
  },
  {
    question: "Why is it critical to explicitly execute `CLOSE cur;` inside stored procedures?",
    shortAnswer: "To release server memory and temporary table resources immediately rather than waiting for procedure termination.",
    explanation: "Resource deallocation best practice.",
    hint: "Releases memory and temporary table buffers immediately.",
    level: "basic"
  },
  {
    question: "Where in the procedure declaration order must `DECLARE cursor_name CURSOR FOR ...` be placed?",
    shortAnswer: "AFTER all `DECLARE variable` and `DECLARE condition` statements, but BEFORE any `DECLARE handler` statements.",
    explanation: "Strict MySQL declaration grammar ordering.",
    hint: "After variables/conditions and before handlers.",
    level: "basic"
  },
  {
    question: "Can a cursor `SELECT` query use `ORDER BY` and `JOIN` clauses?",
    shortAnswer: "YES; cursor queries support full standard SQL `SELECT` syntax including `JOIN`, `WHERE`, `GROUP BY`, `HAVING`, and `ORDER BY`.",
    explanation: "SQL query complexity in cursor declarations.",
    hint: "Yes, cursors support full SQL SELECT syntax including JOINs and ORDER BY.",
    level: "basic"
  },
  {
    question: "What position is the cursor pointer in immediately after `OPEN cur;` executes?",
    shortAnswer: "It is positioned *before* the first row (at index 0); the first `FETCH` is required to advance the pointer to row 1.",
    explanation: "Initial cursor pointer positioning.",
    hint: "Positioned before row 1; first FETCH moves pointer to row 1.",
    level: "expert"
  },
  {
    question: "Can a cursor fetch into a user-defined session variable (e.g. `@var`) directly?",
    shortAnswer: "NO; MySQL `FETCH INTO` requires declared local variables (e.g. `v_var`), not session variables (`@var`).",
    explanation: "Local variable requirement in FETCH INTO.",
    hint: "No, FETCH INTO requires declared local variables (v_id), not @session_vars.",
    level: "expert"
  },
  {
    question: "What happens if a procedure terminates while a cursor is still open?",
    shortAnswer: "MySQL automatically closes and deallocates all open cursors when the procedure's enclosing `BEGIN ... END` block exits.",
    explanation: "Automatic deallocation on routine exit.",
    hint: "MySQL closes open cursors automatically when the procedure block exits.",
    level: "moderate"
  },
  {
    question: "Can you pass an `OUT` parameter directly into `FETCH cur INTO p_out_param`?",
    shortAnswer: "YES; procedure parameters (`INOUT` and `OUT`) function as valid target variables for `FETCH INTO`.",
    explanation: "Parameter targets for FETCH INTO.",
    hint: "Yes, OUT and INOUT parameters can receive fetched values.",
    level: "basic"
  },
  {
    question: "How do you check if a cursor is currently open using SQL in MySQL 8.0?",
    shortAnswer: "MySQL has no built-in `IS_OPEN()` function; developers track state using a boolean variable (e.g. `v_is_cur_open`).",
    explanation: "Tracking cursor state with boolean flags.",
    hint: "Use a local boolean flag variable (v_is_open) to track cursor state.",
    level: "expert"
  },
  {
    question: "Can a single stored procedure declare multiple cursors simultaneously?",
    shortAnswer: "YES; you can declare multiple cursors (e.g. `cur_students`, `cur_courses`) in the declaration section.",
    explanation: "Multiple cursor declarations in one procedure.",
    hint: "Yes, declare multiple named cursors in the declaration section.",
    level: "basic"
  },
  {
    question: "What happens if you execute `CLOSE` on a cursor that is already closed?",
    shortAnswer: "MySQL throws Error `1326` (`ER_SP_CURSOR_NOT_OPEN`).",
    explanation: "Closing already closed cursor error.",
    hint: "Throws Error 1326.",
    level: "basic"
  },
  {
    question: "Can you declare a cursor that selects from a Temporary Table created in the same procedure?",
    shortAnswer: "YES; as long as the temporary table exists when the `OPEN` statement executes, the cursor will query it successfully.",
    explanation: "Cursors on temporary tables.",
    hint: "Yes, provided the temporary table exists before OPEN executes.",
    level: "basic"
  },
  {
    question: "What is the return value of `FETCH` when an unhandled error occurs during data conversion?",
    shortAnswer: "The fetch operation fails, triggering the procedure's active `SQLEXCEPTION` handler.",
    explanation: "Data conversion errors during fetch.",
    hint: "Triggers SQLEXCEPTION handler.",
    level: "moderate"
  },
  {
    question: "Can a cursor `SELECT` statement contain subqueries and Common Table Expressions (CTEs)?",
    shortAnswer: "YES; MySQL 8.0 allows CTEs (`WITH ... SELECT`) and subqueries in cursor declarations.",
    explanation: "CTE and subquery support in cursors.",
    hint: "Yes, cursors support CTEs (WITH clause) and nested subqueries.",
    level: "expert"
  },
  {
    question: "How do you prevent a cursor from returning duplicate rows?",
    shortAnswer: "Include the `DISTINCT` keyword in the cursor's `SELECT` declaration: `DECLARE cur CURSOR FOR SELECT DISTINCT dept_id FROM students;`.",
    explanation: "DISTINCT filtering in cursor queries.",
    hint: "Use SELECT DISTINCT in the cursor declaration.",
    level: "basic"
  },
  {
    question: "Does `FETCH` lock the row it fetches in InnoDB?",
    shortAnswer: "No, a standard `SELECT` cursor does not acquire row locks unless `FOR UPDATE` or `FOR SHARE` is explicitly specified in the query.",
    explanation: "Locking behavior in cursor queries.",
    hint: "No locks unless SELECT ... FOR UPDATE is specified in the query.",
    level: "expert"
  },
  {
    question: "Can a cursor declaration use the `FOR UPDATE` locking clause?",
    shortAnswer: "YES; `DECLARE cur CURSOR FOR SELECT id FROM ledgers FOR UPDATE;` acquires exclusive row locks as rows are read.",
    explanation: "Pessimistic locking in cursor queries.",
    hint: "Yes, use SELECT ... FOR UPDATE in the cursor query.",
    level: "expert"
  },
  {
    question: "What happens if a cursor query returns 0 rows when `OPEN` executes?",
    shortAnswer: "`OPEN` succeeds with an empty result set; the very first `FETCH` immediately triggers the `NOT FOUND` condition.",
    explanation: "Empty result set cursor behavior.",
    hint: "OPEN succeeds; the very first FETCH triggers NOT FOUND.",
    level: "basic"
  },
  {
    question: "Can you pass a cursor as a parameter to another stored procedure?",
    shortAnswer: "NO; MySQL does not support cursor reference parameters (`SYS_REFCURSOR` in Oracle); cursors cannot be passed across procedure boundaries.",
    explanation: "Cursor parameter limitation in MySQL.",
    hint: "No, MySQL does not support passing cursors as procedure parameters.",
    level: "expert"
  },
  {
    question: "What is the senior architect's summary rule for the Cursor Lifecycle?",
    shortAnswer: "Master the 4-phase sequence: always `DECLARE` cursors after variables and before handlers; `OPEN` to materialize result sets; `FETCH` into compatible local variables while strictly monitoring the `NOT FOUND` flag; and always explicitly `CLOSE` cursors to release memory and temporary table resources immediately.",
    explanation: "Authoritative architectural best practices for cursor lifecycle management.",
    hint: "DECLARE (order) → OPEN → FETCH (check NOT FOUND) → CLOSE (resource cleanup).",
    level: "expert"
  }
];

export default questions;
