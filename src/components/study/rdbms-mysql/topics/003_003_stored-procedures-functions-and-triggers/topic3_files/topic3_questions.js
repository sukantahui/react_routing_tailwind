// topic3_files/topic3_questions.js

const questions = [
  {
    question: "What keyword is used to declare local variables inside a MySQL Stored Procedure?",
    shortAnswer: "The `DECLARE` statement: `DECLARE variable_name data_type [DEFAULT default_value];`.",
    explanation: "Standard variable declaration statement.",
    hint: "DECLARE var_name data_type DEFAULT val;",
    level: "basic"
  },
  {
    question: "Where in a `BEGIN ... END` block MUST all `DECLARE` statements be placed in MySQL?",
    shortAnswer: "At the VERY TOP of the block, before any executable statements (`SET`, `IF`, `SELECT`, `INSERT`, etc.).",
    explanation: "Mandatory structural syntax rule in MySQL procedural code.",
    hint: "At the very top of the BEGIN ... END block before executable statements.",
    level: "basic"
  },
  {
    question: "What error occurs if you place a `DECLARE` statement after a `SET` statement in a procedure?",
    shortAnswer: "`Error 1064 (42000): You have an error in your SQL syntax; check the manual...`.",
    explanation: "Executable statements cannot precede declarations in the same block.",
    hint: "Error 1064 (Syntax error) because DECLARE cannot follow executable statements.",
    level: "basic"
  },
  {
    question: "What is the initial default value of a local variable if no `DEFAULT` clause is specified in `DECLARE`?",
    shortAnswer: "`NULL`.",
    explanation: "Uninitialized local variables default to NULL.",
    hint: "Defaults to NULL.",
    level: "basic"
  },
  {
    question: "How do student variables for Mamata, Susmita, Abhronila, and Debangshu illustrate `DECLARE` and `SET`?",
    shortAnswer: "`DECLARE v_score DECIMAL(5,2) DEFAULT 0.00; SET v_score = 94.50;` assigns Mamata Hui's exam score to a strongly-typed local variable.",
    explanation: "Demonstrates local variable declaration, initialization, and assignment.",
    hint: "DECLARE v_score DECIMAL DEFAULT 0.00; SET v_score = 94.50;",
    level: "basic"
  },
  {
    question: "What is the difference between a Local Variable (`v_total`) and a User Session Variable (`@total`)?",
    shortAnswer: "Local variables are strongly typed and scoped strictly to the enclosing `BEGIN ... END` block; User session variables (`@var`) are loosely typed and persist across queries throughout the entire client connection.",
    explanation: "Scope and typing distinction.",
    hint: "Local is block-scoped and typed; @var is connection-scoped and loosely typed.",
    level: "basic"
  },
  {
    question: "How do you assign values to multiple local variables from a database query using `SELECT ... INTO`?",
    shortAnswer: "`SELECT first_name, exam_score_pct INTO v_student_name, v_score FROM students WHERE student_id = p_id;`.",
    explanation: "Assigns multiple query columns to local variables in order.",
    hint: "SELECT col1, col2 INTO var1, var2 FROM table WHERE ...;",
    level: "basic"
  },
  {
    question: "What happens if a `SELECT ... INTO` query returns ZERO rows?",
    shortAnswer: "MySQL throws `Error 1329 (02000): No data to FETCH / SELECT INTO` (unless handled by a `NOT FOUND` handler).",
    explanation: "Zero-row exception in SELECT INTO.",
    hint: "Error 1329: No data - zero rows fetched.",
    level: "expert"
  },
  {
    question: "What happens if a `SELECT ... INTO` query returns MORE THAN ONE row (multiple rows)?",
    shortAnswer: "MySQL throws `Error 1172 (42000): Result consisted of more than one row`.",
    explanation: "Cardinality violation in scalar assignment.",
    hint: "Error 1172: Result consisted of more than one row.",
    level: "expert"
  },
  {
    question: "How do you ensure that a `SELECT ... INTO` query returns at most 1 row?",
    shortAnswer: "Filter by a unique primary key (`WHERE student_id = p_id`), use aggregate functions (`SUM`, `MAX`, `AVG`), or append `LIMIT 1`.",
    explanation: "Guarantees exact scalar cardinality.",
    hint: "Filter by primary key, aggregate functions, or use LIMIT 1.",
    level: "moderate"
  },
  {
    question: "Can multiple variables of the same data type be declared on a single `DECLARE` line?",
    shortAnswer: "YES; `DECLARE v_x, v_y, v_z INT DEFAULT 0;` declares three integer variables simultaneously.",
    explanation: "Compact multi-variable declaration syntax.",
    hint: "Yes: DECLARE var1, var2, var3 INT DEFAULT 0;",
    level: "basic"
  },
  {
    question: "How do you assign multiple values in a single `SET` statement?",
    shortAnswer: "`SET v_x = 10, v_y = 20, v_z = 30;` (comma-separated assignments).",
    explanation: "Multiple variable assignments with SET.",
    hint: "SET v_x = 10, v_y = 20, v_z = 30;",
    level: "basic"
  },
  {
    question: "Can an inner nested `BEGIN ... END` block declare its own local variables?",
    shortAnswer: "YES; inner blocks can declare their own local variables that exist only within that sub-block.",
    explanation: "Lexical block scoping in MySQL procedural code.",
    hint: "Yes, inner blocks can declare their own scoped variables.",
    level: "moderate"
  },
  {
    question: "What happens if an inner block declares a variable with the same name as an outer block variable (`Variable Shadowing`)?",
    shortAnswer: "Inside the inner block, the inner variable shadows (overrides) the outer variable; changes to the inner variable do not affect the outer variable.",
    explanation: "Lexical shadowing behavior.",
    hint: "Inner variable shadows outer variable within that block.",
    level: "expert"
  },
  {
    question: "What is the recommended naming convention for local variables to prevent shadowing column names?",
    shortAnswer: "Prefix local variable names with `v_` (e.g. `v_student_id`, `v_total_fee`) to distinguish them from table columns and parameters (`p_`).",
    explanation: "Enterprise variable naming standards.",
    hint: "Prefix local variables with v_.",
    level: "basic"
  },
  {
    question: "Can mathematical expressions and built-in functions be used in variable assignment?",
    shortAnswer: "YES; `SET v_discount = ROUND(v_fee * 0.20, 2);` or `SET v_expiry = DATE_ADD(NOW(), INTERVAL 30 DAY);`.",
    explanation: "Full expression support in SET statements.",
    hint: "Yes, any valid MySQL expression or function can be used in SET.",
    level: "basic"
  },
  {
    question: "What happens to local variables when a Stored Procedure finishes execution?",
    shortAnswer: "They are immediately destroyed and their memory is freed by the database engine.",
    explanation: "Automatic memory lifecycle management.",
    hint: "Destroyed immediately when routine execution terminates.",
    level: "basic"
  },
  {
    question: "Can user session variables (`@var`) be used inside a Stored Procedure body alongside local variables (`v_var`)?",
    shortAnswer: "YES; procedures can read and assign to `@session_vars`, but local `v_vars` are preferred for internal calculations to prevent accidental state pollution.",
    explanation: "Interoperability between local and session variables.",
    hint: "Yes, but local variables are preferred to avoid polluting session state.",
    level: "moderate"
  },
  {
    question: "How do you calculate a student's total attendance percentage and store it in a local variable?",
    shortAnswer: "`SELECT ROUND(SUM(is_present)/COUNT(*)*100, 1) INTO v_att_pct FROM attendance WHERE student_id = p_id;`.",
    explanation: "Scalar aggregate assignment into variable.",
    hint: "SELECT aggregate INTO v_var FROM table WHERE student_id = p_id;",
    level: "basic"
  },
  {
    question: "Can a `JSON` data type be used for local variables in MySQL 8.0?",
    shortAnswer: "YES; `DECLARE v_config JSON; SET v_config = JSON_OBJECT('status', 'ACTIVE', 'code', 200);`.",
    explanation: "Native JSON procedural variable support.",
    hint: "Yes, DECLARE v_data JSON is fully supported in MySQL 8.0.",
    level: "moderate"
  },
  {
    question: "What is the difference between `SET` and `SELECT ... INTO` when assigning a variable?",
    shortAnswer: "`SET` evaluates expressions or scalar assignments; `SELECT ... INTO` fetches column values directly from database tables.",
    explanation: "Expression evaluation vs table query data binding.",
    hint: "SET is for math/expressions; SELECT INTO is for fetching table data.",
    level: "basic"
  },
  {
    question: "What happens if a table column in `SELECT col INTO v_var` contains `NULL`?",
    shortAnswer: "`v_var` is assigned the value `NULL`.",
    explanation: "NULL value propagation in assignment.",
    hint: "v_var is set to NULL.",
    level: "basic"
  },
  {
    question: "How do you assign the total count of rows in a table to a local variable?",
    shortAnswer: "`SELECT COUNT(*) INTO v_total_count FROM students;`.",
    explanation: "Aggregate row count assignment.",
    hint: "SELECT COUNT(*) INTO v_var FROM table;",
    level: "basic"
  },
  {
    question: "Can local variables be declared inside a `LOOP` or `WHILE` construct directly?",
    shortAnswer: "NO; in MySQL, `DECLARE` must appear at the top of a `BEGIN ... END` block; to declare variables inside a loop, wrap the loop body in a new `BEGIN ... END` block.",
    explanation: "Block structural requirement.",
    hint: "No, wrap the loop body in a new BEGIN ... END block to declare local variables.",
    level: "expert"
  },
  {
    question: "What happens if you assign a string value `'Barrackpore'` to an `INT` variable using `SET`?",
    shortAnswer: "If strict SQL mode is enabled (`STRICT_TRANS_TABLES`), MySQL throws `Error 1366: Incorrect integer value`; otherwise, it converts to `0` with a warning.",
    explanation: "Data type conversion and strict mode enforcement.",
    hint: "Throws Error 1366 under strict SQL mode.",
    level: "moderate"
  },
  {
    question: "Can a local variable be passed into a dynamic query executed with `PREPARE` and `EXECUTE`?",
    shortAnswer: "No, `EXECUTE ... USING` only accepts user session variables (`@var`), so you must assign the local variable to a session variable (`SET @temp = v_id; EXECUTE stmt USING @temp;`).",
    explanation: "Dynamic SQL variable constraint in MySQL.",
    hint: "EXECUTE USING requires session variables (@var), not local variables.",
    level: "expert"
  },
  {
    question: "How do you increment an integer counter variable by 1?",
    shortAnswer: "`SET v_counter = v_counter + 1;`.",
    explanation: "Standard variable increment statement.",
    hint: "SET v_counter = v_counter + 1;",
    level: "basic"
  },
  {
    question: "Can a local variable be used in a `LIMIT` clause inside a stored procedure?",
    shortAnswer: "YES; in MySQL 8.0, local variables can be used directly in `LIMIT` clauses (`LIMIT v_offset, v_row_count`).",
    explanation: "Dynamic parameterized pagination in MySQL 8.0.",
    hint: "Yes, MySQL 8.0 allows local variables in LIMIT clauses.",
    level: "moderate"
  },
  {
    question: "What is the memory consumption of local variables in MySQL?",
    shortAnswer: "Negligible (a few bytes per variable on the stack within the thread's memory space).",
    explanation: "Stack-allocated local memory.",
    hint: "Negligible memory footprint on the thread execution stack.",
    level: "basic"
  },
  {
    question: "What is the senior architect's summary rule for Declaring Local Variables and Assignment?",
    shortAnswer: "Always declare all local variables at the very top of the `BEGIN ... END` block with `v_` prefixes and explicit `DEFAULT` values, use `SET` for scalar math, use `SELECT ... INTO` strictly for queries guaranteed to return exactly 1 row, and defend against zero rows using `NOT FOUND` exception handlers.",
    explanation: "Authoritative architectural best practices for procedural variable management.",
    hint: "DECLARE at top with v_ prefix + DEFAULT + SET for math + SELECT INTO for single rows + error handlers.",
    level: "expert"
  }
];

export default questions;
