// topic5_files/topic5_questions.js

const questions = [
  {
    question: "What are the two forms of the procedural `CASE` statement in MySQL?",
    shortAnswer: "1. Simple CASE (`CASE var WHEN val THEN ... END CASE;`) and 2. Searched CASE (`CASE WHEN condition THEN ... END CASE;`).",
    explanation: "The two canonical syntactical forms of CASE.",
    hint: "Simple CASE (exact match on a variable) and Searched CASE (boolean conditions).",
    level: "basic"
  },
  {
    question: "How does the procedural `CASE` statement terminate compared to the declarative `CASE` expression?",
    shortAnswer: "The procedural `CASE` statement terminates with `END CASE;` (two words with semicolon); the declarative `CASE` expression terminates simply with `END` (no `CASE`).",
    explanation: "Critical syntactic distinction between statement and expression.",
    hint: "Procedural terminates with END CASE;; declarative terminates with END.",
    level: "basic"
  },
  {
    question: "What error occurs if no `WHEN` branch matches in a procedural `CASE` statement and no `ELSE` clause is provided?",
    shortAnswer: "`Error 1339 (20000): Case not found for CASE statement`.",
    explanation: "The fatal unhandled case exception in procedural MySQL.",
    hint: "Error 1339 (Case not found for CASE statement).",
    level: "expert"
  },
  {
    question: "How does declarative `CASE` in `SELECT` handle unmatched branches without an `ELSE` clause?",
    shortAnswer: "It silently evaluates to `NULL` without throwing an error.",
    explanation: "Declarative CASE defaults to NULL; procedural CASE crashes with Error 1339.",
    hint: "Declarative returns NULL; procedural throws Error 1339.",
    level: "expert"
  },
  {
    question: "How do academy campus locations for Barrackpore, Kolkata, and Ichapur illustrate Simple `CASE` routing?",
    shortAnswer: "`CASE p_campus_code WHEN 'BKP' THEN SET p_hub = 'Barrackpore Central Hub'; WHEN 'KOL' THEN SET p_hub = 'Kolkata Sector V'; WHEN 'ICH' THEN SET p_hub = 'Ichapur Extension'; ELSE SET p_hub = 'Online Portal'; END CASE;`",
    explanation: "Demonstrates Simple CASE dispatching on campus codes.",
    hint: "Matches discrete string codes BKP, KOL, and ICH.",
    level: "basic"
  },
  {
    question: "When should you prefer a Simple `CASE` over a Searched `CASE`?",
    shortAnswer: "When comparing a single variable or expression for exact equality against a discrete list of literal constant values (e.g. status codes, country codes, department IDs).",
    explanation: "Design guideline for simple vs searched CASE.",
    hint: "Use Simple CASE for exact equality against discrete constant values.",
    level: "basic"
  },
  {
    question: "When should you prefer a Searched `CASE` over a Simple `CASE`?",
    shortAnswer: "When evaluating complex boolean expressions, inequality ranges (`>`, `<`), compound `AND`/`OR` conditions, or multiple different variables.",
    explanation: "Searched CASE provides maximum expressiveness.",
    hint: "Use Searched CASE for ranges, boolean logic, and multiple variables.",
    level: "basic"
  },
  {
    question: "Can multiple SQL statements execute inside a single `THEN` block of a procedural `CASE` statement?",
    shortAnswer: "YES; you can execute multiple sequential statements (`SET`, `INSERT`, `UPDATE`, `CALL`) inside a `THEN` branch.",
    explanation: "Multi-statement execution inside procedural branches.",
    hint: "Yes, multiple SQL statements can execute within a single THEN block.",
    level: "basic"
  },
  {
    question: "What happens if multiple `WHEN` conditions evaluate to TRUE in a Searched `CASE` statement?",
    shortAnswer: "MySQL executes only the FIRST matching TRUE branch and immediately exits the `CASE` statement (short-circuit execution).",
    explanation: "First-match short-circuit behavior.",
    hint: "Only the first matching branch executes.",
    level: "moderate"
  },
  {
    question: "How do you calculate student installment fee surcharges using Searched `CASE`?",
    shortAnswer: "`CASE WHEN p_installments = 1 THEN SET v_surcharge = 0; WHEN p_installments <= 3 THEN SET v_surcharge = 500; ELSE SET v_surcharge = 1200; END CASE;`",
    explanation: "Searched CASE for range-based calculations.",
    hint: "Check installment count ranges and assign surcharge amounts.",
    level: "basic"
  },
  {
    question: "Can a procedural `CASE` statement be nested inside another `CASE` or `IF` statement?",
    shortAnswer: "YES; nested control flow statements are fully supported in MySQL stored routines.",
    explanation: "Nested procedural logic.",
    hint: "Yes, nested CASE statements are fully supported.",
    level: "basic"
  },
  {
    question: "What error occurs if you write `END;` instead of `END CASE;` at the end of a procedural `CASE` statement?",
    shortAnswer: "`Error 1064 (42000): You have an error in your SQL syntax near 'END;'` (the parser mistakes `END;` for the end of the entire `BEGIN ... END` block).",
    explanation: "Syntax ambiguity when omitting the CASE token.",
    hint: "Error 1064 because the parser confuses END; with the block terminator.",
    level: "expert"
  },
  {
    question: "Can `NULL` values be matched in a Simple `CASE` statement (`WHEN NULL THEN ...`)?",
    shortAnswer: "NO; Simple `CASE` uses standard equality (`var = val`), and `var = NULL` evaluates to UNKNOWN/FALSE in SQL. To check for `NULL`, use a Searched `CASE` with `WHEN var IS NULL THEN ...`.",
    explanation: "Three-valued logic in Simple CASE equality matching.",
    hint: "No, use Searched CASE with WHEN var IS NULL THEN ...",
    level: "expert"
  },
  {
    question: "How do you convert a student numeric score into a letter grade using Searched `CASE`?",
    shortAnswer: "`CASE WHEN v_score >= 90 THEN SET p_grade = 'A+'; WHEN v_score >= 80 THEN SET p_grade = 'A'; WHEN v_score >= 70 THEN SET p_grade = 'B'; ELSE SET p_grade = 'C'; END CASE;`",
    explanation: "Standard academic letter grading using Searched CASE.",
    hint: "Descending threshold checks from A+ down to fallback C.",
    level: "basic"
  },
  {
    question: "Can a procedural `CASE` statement call other stored procedures via `CALL` inside a `THEN` branch?",
    shortAnswer: "YES; `WHEN 'PREMIUM' THEN CALL sp_setup_premium_account(p_id);` is fully supported.",
    explanation: "Procedural routine invocation from branches.",
    hint: "Yes, CALL proc_name() can be executed inside THEN branches.",
    level: "basic"
  },
  {
    question: "What is the primary difference between `IF ... ELSEIF` and Searched `CASE ... WHEN` in stored procedures?",
    shortAnswer: "Both provide identical conditional branching functionality and performance; choice is primarily a matter of developer stylistic preference and readability.",
    explanation: "Equivalence between IF-ELSEIF and Searched CASE.",
    hint: "Functionally equivalent; choice is based on code readability.",
    level: "moderate"
  },
  {
    question: "Why is an `ELSE` clause considered mandatory by senior database architects for procedural `CASE` statements?",
    shortAnswer: "To safeguard against fatal runtime `Error 1339` crashes when unexpected or unhandled input values enter the system.",
    explanation: "Defensive production software engineering practice.",
    hint: "Prevents fatal Error 1339 runtime exceptions on unexpected values.",
    level: "expert"
  },
  {
    question: "Can a procedural `CASE` statement be used inside a Database Trigger body?",
    shortAnswer: "YES; triggers fully support `CASE ... END CASE;` statements for event dispatching and validation.",
    explanation: "Trigger control flow support.",
    hint: "Yes, triggers support procedural CASE statements.",
    level: "basic"
  },
  {
    question: "Can a procedural `CASE` statement be used inside a User-Defined Stored Function?",
    shortAnswer: "YES; stored functions can use `CASE ... END CASE;` to determine return values.",
    explanation: "Function procedural control flow.",
    hint: "Yes, functions can use CASE statements.",
    level: "basic"
  },
  {
    question: "How do you map payment gateway channels ('RAZORPAY', 'PAYTM', 'STRIPE', 'CASH') using Simple `CASE`?",
    shortAnswer: "`CASE p_gateway WHEN 'RAZORPAY' THEN SET v_fee_rate = 0.02; WHEN 'PAYTM' THEN SET v_fee_rate = 0.018; ELSE SET v_fee_rate = 0.00; END CASE;`",
    explanation: "Mapping discrete gateway codes to fee rates.",
    hint: "Simple CASE matching gateway string codes.",
    level: "basic"
  },
  {
    question: "Can a `CASE` statement evaluate subqueries in its `WHEN` conditions?",
    shortAnswer: "YES; `WHEN (SELECT COUNT(*) FROM enrollments WHERE student_id = p_id) > 5 THEN ...` is valid.",
    explanation: "Subquery predicates in Searched CASE.",
    hint: "Yes, subqueries can be evaluated inside Searched CASE conditions.",
    level: "moderate"
  },
  {
    question: "What happens if an `ELSE` clause contains multiple SQL statements?",
    shortAnswer: "All statements in the `ELSE` block execute sequentially until `END CASE;` is reached.",
    explanation: "Multi-statement fallback execution.",
    hint: "All statements inside the ELSE block execute sequentially.",
    level: "basic"
  },
  {
    question: "How do you raise a custom business error using `SIGNAL` inside a `CASE` fallback `ELSE` branch?",
    shortAnswer: "`ELSE SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Unsupported campus code provided'; END CASE;`",
    explanation: "Defensive exception throwing on unhandled values.",
    hint: "Use SIGNAL SQLSTATE '45000' inside the ELSE branch.",
    level: "expert"
  },
  {
    question: "What is the CPU overhead difference between Simple `CASE` and Searched `CASE`?",
    shortAnswer: "Simple `CASE` evaluates the target expression once and does jump-table matching on constants; Searched `CASE` evaluates each boolean expression in sequence. The CPU difference is negligible in database routines.",
    explanation: "Bytecode compilation and evaluation details.",
    hint: "Negligible difference in compiled database bytecode.",
    level: "moderate"
  },
  {
    question: "Can a `CASE` statement modify multiple local variables simultaneously inside a single branch?",
    shortAnswer: "YES; `WHEN 'BKP' THEN SET v_hub = 'Barrackpore', v_tax = 0.18, v_active = TRUE;`.",
    explanation: "Multiple variable mutations per branch.",
    hint: "Yes, multiple variables can be updated in a single branch.",
    level: "basic"
  },
  {
    question: "Can `CASE` statements be used inside a loop to conditionally break out using `LEAVE`?",
    shortAnswer: "YES; `WHEN v_error_count > 3 THEN LEAVE proc_loop;`.",
    explanation: "Loop control inside CASE branches.",
    hint: "Yes, LEAVE loop_label can execute inside a WHEN branch.",
    level: "moderate"
  },
  {
    question: "How do you structure a procedure that routes student support tickets to departments based on category using `CASE`?",
    shortAnswer: "`CASE p_category WHEN 'BILLING' THEN SET p_queue = 'Accounts Dept'; WHEN 'TECH' THEN SET p_queue = 'IT Support'; ELSE SET p_queue = 'General Helpdesk'; END CASE;`",
    explanation: "Workflow dispatching with Simple CASE.",
    hint: "Simple CASE routing category strings to department queues.",
    level: "basic"
  },
  {
    question: "What happens if you use `CASE` inside a `SELECT` statement and write `END CASE`?",
    shortAnswer: "The query fails with a syntax error because declarative `CASE` expressions inside `SELECT` must end with `END` (no `CASE`).",
    explanation: "Common syntax collision between statement and expression.",
    hint: "Fails with syntax error; declarative expressions must use END.",
    level: "basic"
  },
  {
    question: "How does `CASE` statement improve procedural code maintainability over multiple nested `IF` statements?",
    shortAnswer: "It flattens deeply nested indentation into a clean, parallel list of conditions, dramatically improving code readability and reducing cyclomatic complexity.",
    explanation: "Code cleanliness and maintainability benefits.",
    hint: "Flattens nested code into readable parallel branches.",
    level: "basic"
  },
  {
    question: "What is the senior architect's summary rule for Control Flow CASE Statements in MySQL?",
    shortAnswer: "Use Simple `CASE` for discrete constant value dispatching and Searched `CASE` for complex ranges, always terminate with `END CASE;`, ALWAYS include an `ELSE` fallback branch to prevent fatal `Error 1339` crashes, and remember that declarative `CASE` inside `SELECT` terminates with `END` alone.",
    explanation: "Authoritative architectural best practices for procedural CASE statements.",
    hint: "Simple for constants + Searched for ranges + END CASE; termination + mandatory ELSE fallback.",
    level: "expert"
  }
];

export default questions;
