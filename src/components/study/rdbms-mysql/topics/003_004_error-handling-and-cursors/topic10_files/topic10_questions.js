// topic10_files/topic10_questions.js

const questions = [
  {
    question: "What is a Nested Cursor architecture in MySQL stored routines?",
    shortAnswer: "A pattern where an outer cursor iterates through master records (e.g. Departments), and for each master record, an inner cursor iterates through related detail records (e.g. Students in that Department).",
    explanation: "Master-Detail hierarchical cursor architecture.",
    hint: "Outer cursor for master rows; inner cursor for detail rows.",
    level: "basic"
  },
  {
    question: "What is the 'Handler Collision' problem in nested cursor stored procedures?",
    shortAnswer: "When both outer and inner cursors are declared in the same block and share a single `NOT FOUND` handler, the inner cursor's EOF sets the shared flag, prematurely killing the outer loop.",
    explanation: "The shared NOT FOUND collision defect.",
    hint: "Inner cursor's EOF triggers the shared NOT FOUND handler, killing the outer loop.",
    level: "basic"
  },
  {
    question: "How do you solve the Handler Collision problem when implementing nested cursors?",
    shortAnswer: "Enclose the inner cursor and its dedicated `NOT FOUND` handler inside its own inner `BEGIN ... END` block, isolating the inner handler scope from the outer loop.",
    explanation: "Nested block scoping solution.",
    hint: "Declare inner cursor and its own handler inside an inner BEGIN...END block.",
    level: "basic"
  },
  {
    question: "How do department and student records for Mamata, Susmita, Abhronila, and Debangshu illustrate nested cursors?",
    shortAnswer: "Outer cursor iterates Departments (Computer Science, Business). When Computer Science is active, inner cursor iterates Mamata and Susmita; when Business is active, inner cursor iterates Abhronila and Debangshu.",
    explanation: "Hierarchical master-detail student processing trace.",
    hint: "Dept 1 iterates Mamata and Susmita; Dept 2 iterates Abhronila and Debangshu.",
    level: "basic"
  },
  {
    question: "Can an inner cursor's `SELECT` query reference variables fetched by the outer cursor?",
    shortAnswer: "YES; `DECLARE cur_students CURSOR FOR SELECT id FROM students WHERE dept_id = v_outer_dept_id;` binds the current outer record's ID dynamically.",
    explanation: "Parameter binding in inner cursors.",
    hint: "Yes, inner cursor queries reference variables fetched by the outer cursor.",
    level: "basic"
  },
  {
    question: "When is the inner cursor materialized into memory during nested execution?",
    shortAnswer: "Each time `OPEN cur_inner;` executes inside the outer loop body, evaluating the query with the current outer variable value.",
    explanation: "Per-iteration materialization of inner cursors.",
    hint: "Every time OPEN executes in each outer loop iteration.",
    level: "expert"
  },
  {
    question: "What happens if you forget to `CLOSE cur_inner;` inside the inner block before the outer loop repeats?",
    shortAnswer: "On the second outer iteration, executing `OPEN cur_inner;` throws Error `1325` (`ER_SP_CURSOR_ALREADY_OPEN`) and crashes the procedure.",
    explanation: "Error 1325 on unclosed inner cursors.",
    hint: "Throws Error 1325 (cursor already open) on the next outer iteration.",
    level: "expert"
  },
  {
    question: "How many levels of nested cursors does MySQL support?",
    shortAnswer: "MySQL supports arbitrary levels of nested `BEGIN ... END` blocks and cursors, limited only by server memory and execution timeouts.",
    explanation: "Nesting depth limits in MySQL.",
    hint: "Arbitrary levels, constrained only by RAM and timeout limits.",
    level: "basic"
  },
  {
    question: "What is the computational time complexity of nested cursors processing N outer rows and M inner rows?",
    shortAnswer: "`O(N * M)` quadratic complexity, leading to severe performance bottlenecks on large datasets.",
    explanation: "Computational complexity of nested loops.",
    hint: "O(N * M) quadratic time complexity.",
    level: "expert"
  },
  {
    question: "How can nested cursors often be replaced with high-performance set-based SQL?",
    shortAnswer: "Using a single `SELECT ... JOIN` or `UPDATE ... JOIN` statement, which lets the MySQL optimizer perform hash or index-nested-loop joins in `O(N + M)` time.",
    explanation: "Refactoring nested cursors into set-based joins.",
    hint: "Use a single SQL JOIN query instead of nested procedural loops.",
    level: "expert"
  },
  {
    question: "Can an outer cursor loop be given a different label from the inner cursor loop?",
    shortAnswer: "YES; you must give them distinct labels (e.g. `dept_loop: LOOP ...` and `student_loop: LOOP ...`).",
    explanation: "Distinct loop labeling in nested cursors.",
    hint: "Yes, use distinct labels for outer and inner loops.",
    level: "basic"
  },
  {
    question: "What happens if an `EXIT HANDLER FOR SQLEXCEPTION` is declared inside the inner block?",
    shortAnswer: "If an error occurs while processing a student, the handler executes, catches the error, and terminates ONLY that student's inner block; the outer department loop continues running!",
    explanation: "Fault isolation in nested cursor blocks.",
    hint: "Halts only the inner block, allowing the outer department loop to continue.",
    level: "expert"
  },
  {
    question: "Can you declare a 3-tier nested cursor (e.g. Faculty → Department → Student)?",
    shortAnswer: "YES; by nesting three `BEGIN ... END` blocks, each with its own cursor, local variables, and scoped `NOT FOUND` handler.",
    explanation: "3-tier cursor nesting.",
    hint: "Yes, by creating three nested BEGIN...END blocks.",
    level: "basic"
  },
  {
    question: "Why should `DECLARE v_inner_done BOOLEAN DEFAULT FALSE;` be re-initialized at the start of the inner block?",
    shortAnswer: "Because each new execution of the inner block creates a fresh stack frame with `v_inner_done` reset to `FALSE`, ensuring the inner loop iterates correctly for every outer record.",
    explanation: "Inner variable initialization per outer iteration.",
    hint: "Ensures the inner loop starts with v_inner_done = FALSE on every outer cycle.",
    level: "basic"
  },
  {
    question: "What happens if an outer department has 0 enrolled students when the inner cursor opens?",
    shortAnswer: "`OPEN cur_inner;` succeeds; the very first `FETCH cur_inner` immediately sets `v_inner_done = TRUE`, the inner loop exits with 0 iterations, and the outer loop proceeds to the next department.",
    explanation: "Zero-row inner result set handling.",
    hint: "Inner loop exits immediately on first FETCH, outer loop continues.",
    level: "basic"
  },
  {
    question: "Can the inner cursor perform an `INSERT` into an audit table using both outer and inner fetched variables?",
    shortAnswer: "YES; the inner block has access to its own variables (`v_student_id`) as well as all variables declared in the outer parent block (`v_dept_id`).",
    explanation: "Variable scope inheritance in nested blocks.",
    hint: "Yes, inner blocks inherit variable scope from outer enclosing blocks.",
    level: "basic"
  },
  {
    question: "Does `OPEN cur_inner;` re-use the previous iteration's result set if the outer variable did not change?",
    shortAnswer: "No, `OPEN` always executes a brand-new query evaluation against the database storage engine.",
    explanation: "Query re-evaluation on every OPEN.",
    hint: "Executes a brand-new query on every OPEN call.",
    level: "expert"
  },
  {
    question: "How do you count the total number of inner rows processed across all outer iterations?",
    shortAnswer: "Declare a grand total counter variable in the OUTER block (`DECLARE v_grand_total INT DEFAULT 0;`) and increment it inside the INNER loop.",
    explanation: "Cross-loop accumulation in outer variables.",
    hint: "Declare counter in outer block, increment in inner loop.",
    level: "basic"
  },
  {
    question: "Can an inner cursor loop execute a `LEAVE` statement referencing the outer loop's label?",
    shortAnswer: "YES; executing `LEAVE dept_loop;` from inside the inner loop terminates both the inner and outer loops simultaneously.",
    explanation: "Multi-level loop exit with LEAVE.",
    hint: "Yes, LEAVE outer_label breaks out of both loops immediately.",
    level: "expert"
  },
  {
    question: "Can an inner cursor loop execute `ITERATE dept_loop;`?",
    shortAnswer: "YES; it aborts the remaining inner iterations and jumps directly to the next cycle of the outer department loop.",
    explanation: "Outer loop skipping from inner loop.",
    hint: "Yes, skips to the next iteration of the outer loop.",
    level: "expert"
  },
  {
    question: "What is the impact of nested cursors on InnoDB buffer pool cache?",
    shortAnswer: "Opening and closing hundreds of inner cursors repeatedly causes churn in the query cache and temporary table space, degrading database performance.",
    explanation: "Buffer pool and memory churn from nested cursors.",
    hint: "Repeated cursor instantiation causes memory and cache churn.",
    level: "expert"
  },
  {
    question: "Can nested cursors be avoided by using `GROUP_CONCAT()` in a single cursor?",
    shortAnswer: "YES; an outer cursor can fetch `dept_id, GROUP_CONCAT(student_id)` in a single query, eliminating the inner cursor entirely.",
    explanation: "GROUP_CONCAT simplification pattern.",
    hint: "Yes, use GROUP_CONCAT() to aggregate child IDs in a single query.",
    level: "expert"
  },
  {
    question: "What happens if a deadlock occurs inside the inner cursor loop?",
    shortAnswer: "The transaction is aborted with Error 1213 / SQLSTATE '40001', which will trigger the active `SQLEXCEPTION` handler in the procedure.",
    explanation: "Deadlock handling in nested cursor transactions.",
    hint: "Triggers SQLEXCEPTION handler and rolls back transaction.",
    level: "basic"
  },
  {
    question: "Can you execute `START TRANSACTION` and `COMMIT` per outer loop iteration in nested cursors?",
    shortAnswer: "YES; committing per department ensures that each department's student updates are saved atomically and row locks are released before the next department starts.",
    explanation: "Per-department transaction boundaries.",
    hint: "Yes, commit per outer record to release locks in small increments.",
    level: "basic"
  },
  {
    question: "Can nested cursors be used to generate hierarchical JSON documents?",
    shortAnswer: "YES; although MySQL 8.0's `JSON_ARRAYAGG()` and `JSON_OBJECT()` can generate hierarchical JSON in a single query much faster.",
    explanation: "JSON generation: Cursors vs JSON_ARRAYAGG.",
    hint: "Yes, but JSON_ARRAYAGG() in a single query is drastically faster.",
    level: "expert"
  },
  {
    question: "What is the effect on performance if the inner cursor's `WHERE` clause column is NOT indexed?",
    shortAnswer: "MySQL performs a FULL TABLE SCAN on the child table for EVERY outer row, resulting in catastrophic performance degradation (e.g. 1,000 table scans).",
    explanation: "Missing index penalty in nested cursors.",
    hint: "Performs a full table scan for every outer row, destroying performance.",
    level: "expert"
  },
  {
    question: "How do you ensure resources are deallocated if the inner loop exits via an error?",
    shortAnswer: "Declare an `EXIT HANDLER` in the inner block that executes `CLOSE cur_inner;` before leaving.",
    explanation: "Defensive cursor deallocation in inner blocks.",
    hint: "Include CLOSE cur_inner inside the inner error handler.",
    level: "expert"
  },
  {
    question: "Can you declare a cursor that uses a temporary table populated by the outer loop?",
    shortAnswer: "YES; the outer loop can insert data into a temporary table, and the inner block cursor can query that temporary table.",
    explanation: "Dynamic temporary table staging in nested cursors.",
    hint: "Yes, inner cursors can query temporary tables populated by outer loops.",
    level: "basic"
  },
  {
    question: "What happens if you declare two cursors in the same flat block without nesting?",
    shortAnswer: "MySQL allows declaring multiple cursors, but because they share a single `NOT FOUND` handler, you cannot nest their iteration loops without collision bugs.",
    explanation: "Flat multi-cursor limitation.",
    hint: "Allowed for sequential execution, but nesting requires separate blocks.",
    level: "expert"
  },
  {
    question: "What is the senior architect's summary rule for Nested Cursors?",
    shortAnswer: "Avoid nested cursors whenever possible by refactoring to single-query `JOIN`s or `GROUP_CONCAT`; when nested procedural logic is mandatory, always enclose the inner cursor in its own nested `BEGIN ... END` block with dedicated variables, scoped `NOT FOUND` handlers, and explicit `CLOSE` statements.",
    explanation: "Authoritative architectural best practices for nested cursors.",
    hint: "Prefer SQL JOINs; if mandatory, isolate inner cursors in nested BEGIN...END blocks.",
    level: "expert"
  }
];

export default questions;
