// topic4_files/topic4_questions.js

const questions = [
  {
    question: "What is the correct syntax for an `IF` statement in a MySQL Stored Procedure?",
    shortAnswer: "`IF condition THEN ... [ELSEIF condition THEN ...] [ELSE ...] END IF;`",
    explanation: "Standard procedural IF syntax in MySQL.",
    hint: "IF condition THEN ... ELSEIF ... ELSE ... END IF;",
    level: "basic"
  },
  {
    question: "How does the procedural `IF ... THEN ... END IF` statement differ from the built-in `IF(expr1, expr2, expr3)` function?",
    shortAnswer: "The procedural `IF` statement controls execution flow across multiple independent SQL statements inside stored routines; the `IF()` function is a ternary inline scalar expression used inside `SELECT` queries.",
    explanation: "Procedural control flow statement vs inline query function.",
    hint: "Statement controls execution flow; function returns a scalar value in SELECT.",
    level: "basic"
  },
  {
    question: "What spelling is used for intermediate branches in MySQL: `ELSEIF` or `ELSIF`?",
    shortAnswer: "`ELSEIF` (one word without spaces); `ELSIF` is used in Oracle PL/SQL, while MySQL uses `ELSEIF`.",
    explanation: "MySQL specific keyword spelling.",
    hint: "ELSEIF (no space, with an 'E').",
    level: "basic"
  },
  {
    question: "How do student scores for Mamata, Susmita, Abhronila, and Debangshu illustrate `IF ... ELSEIF` grading?",
    shortAnswer: "Abhronila (96.2%) and Mamata (94.5%) match `v_score >= 90` -> `'Distinction 🥇'`; Susmita (88.0%) matches `v_score >= 75` -> `'First Class 🥈'`; Debangshu (82.4%) matches `v_score >= 75` -> `'First Class 🥈'`.",
    explanation: "Multi-branch grading logic execution.",
    hint: "Matches top-to-bottom conditions based on student exam scores.",
    level: "basic"
  },
  {
    question: "What happens if a condition in an `IF` statement evaluates to `NULL`?",
    shortAnswer: "MySQL treats `NULL` as FALSE, causing execution to skip the `THEN` block and proceed to the next `ELSEIF` or `ELSE` branch.",
    explanation: "Three-valued logic in procedural conditions.",
    hint: "NULL is treated as FALSE and falls through to the next branch.",
    level: "moderate"
  },
  {
    question: "How does short-circuit evaluation work in a multi-branch `IF ... ELSEIF` construct?",
    shortAnswer: "Branches are evaluated in order from top to bottom; as soon as a condition evaluates to TRUE, its block executes and the entire `IF` statement terminates immediately, ignoring all subsequent `ELSEIF` and `ELSE` branches.",
    explanation: "Early termination upon first true condition match.",
    hint: "Terminates immediately after executing the first matching TRUE branch.",
    level: "expert"
  },
  {
    question: "Can `IF` statements be nested inside another `IF` statement?",
    shortAnswer: "YES; `IF` statements can be nested indefinitely inside `THEN`, `ELSEIF`, or `ELSE` blocks.",
    explanation: "Nested conditional branching.",
    hint: "Yes, nested IF statements are fully supported.",
    level: "basic"
  },
  {
    question: "Is the `ELSE` branch mandatory in a MySQL `IF` statement?",
    shortAnswer: "NO; the `ELSE` branch is optional. If all conditions evaluate to FALSE and no `ELSE` is provided, execution simply continues after `END IF;`.",
    explanation: "Optional fallback branch.",
    hint: "No, ELSE is optional; if omitted, execution continues past END IF.",
    level: "basic"
  },
  {
    question: "Can multiple SQL statements be placed inside a single `THEN` block?",
    shortAnswer: "YES; any number of statements (variable assignments, inserts, updates, deletes) can be placed between `THEN` and the next `ELSEIF`/`ELSE`/`END IF`.",
    explanation: "Block execution within conditional branches.",
    hint: "Yes, multiple SQL statements can execute within a single THEN block.",
    level: "basic"
  },
  {
    question: "How do you combine multiple conditions using logical operators in an `IF` statement?",
    shortAnswer: "`IF (v_score >= 90.00 AND v_attendance >= 95.0) THEN ...` or `IF (v_is_scholarship = 1 OR v_is_sibling = 1) THEN ...`.",
    explanation: "Compound boolean condition evaluation.",
    hint: "Use AND, OR, and NOT inside condition expressions.",
    level: "basic"
  },
  {
    question: "Can subqueries or `EXISTS` conditions be used inside an `IF` statement?",
    shortAnswer: "YES; `IF EXISTS (SELECT 1 FROM students WHERE student_id = p_id) THEN ...` is fully valid.",
    explanation: "Direct relational predicate evaluation inside IF.",
    hint: "Yes, IF EXISTS (SELECT ...) THEN is fully supported.",
    level: "moderate"
  },
  {
    question: "What closing token MUST terminate an `IF` statement in MySQL?",
    shortAnswer: "`END IF;` (two words with semicolon).",
    explanation: "Mandatory termination token.",
    hint: "END IF;",
    level: "basic"
  },
  {
    question: "What error occurs if you write `ENDIF;` (one word) instead of `END IF;`?",
    shortAnswer: "`Error 1064 (42000): You have an error in your SQL syntax near 'ENDIF;'`.",
    explanation: "Requires space between END and IF.",
    hint: "Error 1064 (Syntax error) because END IF must be two words.",
    level: "basic"
  },
  {
    question: "How do you validate student payment amounts to prevent negative values using `IF`?",
    shortAnswer: "`IF p_amount <= 0 THEN SET p_status = 'ERR_INVALID_AMOUNT'; ELSE ... END IF;`.",
    explanation: "Defensive input validation.",
    hint: "Check if amount <= 0 and set error status.",
    level: "basic"
  },
  {
    question: "Can an `IF` statement be used inside a Database Trigger body?",
    shortAnswer: "YES; triggers fully support procedural `IF ... THEN ... ELSE ... END IF;` statements to validate incoming `NEW` data values.",
    explanation: "Trigger conditional logic.",
    hint: "Yes, triggers fully support procedural IF statements.",
    level: "basic"
  },
  {
    question: "Can an `IF` statement be used inside a User-Defined Stored Function?",
    shortAnswer: "YES; stored functions use `IF` statements to return different scalar values based on input conditions.",
    explanation: "Function conditional return pathways.",
    hint: "Yes, functions use IF statements to return conditional scalar values.",
    level: "basic"
  },
  {
    question: "How do you check if a local variable is NULL in an `IF` condition?",
    shortAnswer: "`IF v_student_id IS NULL THEN ...` (or `IF v_student_id IS NOT NULL THEN ...`).",
    explanation: "Standard NULL checking predicate.",
    hint: "Use IS NULL or IS NOT NULL.",
    level: "basic"
  },
  {
    question: "What is the difference between `IF ... ELSEIF` and procedural `CASE ... WHEN`?",
    shortAnswer: "`IF ... ELSEIF` is best for evaluating complex boolean expressions with varying operators (`>`, `<`, `AND`, `OR`); `CASE ... WHEN` is best for matching a single variable against discrete constant values.",
    explanation: "Design guideline for conditional control flow selection.",
    hint: "IF is for complex ranges and operators; CASE is for matching discrete values.",
    level: "expert"
  },
  {
    question: "How do you calculate tiered scholarship discounts using `IF ... ELSEIF`?",
    shortAnswer: "`IF v_score >= 95 THEN SET v_disc = 30; ELSEIF v_score >= 90 THEN SET v_disc = 20; ELSEIF v_score >= 80 THEN SET v_disc = 10; ELSE SET v_disc = 0; END IF;`.",
    explanation: "Classic tiered discount calculation.",
    hint: "Descending threshold checks from highest to lowest tier.",
    level: "basic"
  },
  {
    question: "Why should threshold conditions in `IF ... ELSEIF` be sorted in descending order when checking `>` or `>=`?",
    shortAnswer: "Because if you check `v_score >= 80` first, a score of 95% will match the 80% branch and exit immediately, preventing the 95% tier from ever executing.",
    explanation: "Logical precedence ordering in short-circuit evaluation.",
    hint: "Checking smaller thresholds first causes higher scores to match prematurely.",
    level: "expert"
  },
  {
    question: "Can an `IF` statement trigger an explicit transaction rollback?",
    shortAnswer: "YES; `IF v_has_error = TRUE THEN ROLLBACK; SET p_status = 'FAILED'; ELSE COMMIT; SET p_status = 'SUCCESS'; END IF;`.",
    explanation: "Conditional transaction boundary control.",
    hint: "Yes, conditional ROLLBACK or COMMIT inside IF blocks.",
    level: "moderate"
  },
  {
    question: "Can an `IF` statement contain a `SIGNAL` statement to raise custom exceptions?",
    shortAnswer: "YES; `IF p_age < 18 THEN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Student must be at least 18 years old'; END IF;`.",
    explanation: "Custom exception raising based on business rules.",
    hint: "Yes, IF condition THEN SIGNAL SQLSTATE ... END IF;",
    level: "expert"
  },
  {
    question: "How do you check string equality in an `IF` condition in MySQL?",
    shortAnswer: "`IF v_status = 'ACTIVE' THEN ...` (MySQL string comparisons are case-insensitive by default under standard collations).",
    explanation: "Standard string equality predicate.",
    hint: "IF string_var = 'LITERAL' THEN ...",
    level: "basic"
  },
  {
    question: "What happens if a procedure contains an unclosed `IF` statement without `END IF;`?",
    shortAnswer: "The client parser fails to compile the procedure, throwing `Error 1064: Unexpected end of statement`.",
    explanation: "Unclosed block syntax error.",
    hint: "Error 1064 due to missing END IF token.",
    level: "basic"
  },
  {
    question: "Can `IF` statements be used outside a `BEGIN ... END` block in MySQL?",
    shortAnswer: "NO; procedural `IF` statements are strictly valid only inside compiled routine bodies (`BEGIN ... END`).",
    explanation: "Procedural context restriction.",
    hint: "No, strictly valid only inside BEGIN ... END blocks.",
    level: "basic"
  },
  {
    question: "How do you check if a student is enrolled in either 'CS101' or 'IT102' using `IF`?",
    shortAnswer: "`IF v_course_code IN ('CS101', 'IT102') THEN ...`.",
    explanation: "IN list membership predicate in IF conditions.",
    hint: "IF var IN ('A', 'B') THEN ...",
    level: "basic"
  },
  {
    question: "Can an `IF` condition compare two database columns directly?",
    shortAnswer: "YES; after fetching column values into local variables, you can compare `IF v_amount_paid < v_amount_due THEN ...`.",
    explanation: "Multi-variable business rule evaluation.",
    hint: "Yes, compare local variables fetched from columns.",
    level: "basic"
  },
  {
    question: "What is the CPU performance impact of evaluating 10 `ELSEIF` branches in MySQL?",
    shortAnswer: "Negligible (sub-microsecond in-memory CPU register evaluation).",
    explanation: "High-speed compiled bytecode branching.",
    hint: "Virtually instantaneous in-memory execution.",
    level: "basic"
  },
  {
    question: "How do you structure an `IF` statement to handle early exits inside a loop?",
    shortAnswer: "`IF v_counter >= 100 THEN LEAVE my_loop; END IF;`.",
    explanation: "Loop termination condition.",
    hint: "IF condition THEN LEAVE loop_label; END IF;",
    level: "moderate"
  },
  {
    question: "What is the senior architect's summary rule for Control Flow IF Statements in MySQL?",
    shortAnswer: "Use `IF ... ELSEIF ... ELSE ... END IF;` for multi-range and complex boolean conditions, order range thresholds in descending order (`>= 90`, `>= 75`, `>= 60`), always terminate with `END IF;`, handle `NULL` fallback with `ELSE`, and validate inputs defensively before executing DML operations.",
    explanation: "Authoritative architectural best practices for procedural conditional branching.",
    hint: "Descending thresholds + ELSE fallback + END IF termination + defensive DML validation.",
    level: "expert"
  }
];

export default questions;
