// topic14_files/topic14_questions.js

const questions = [
  {
    question: "How do you list all Stored Procedures defined in the current database?",
    shortAnswer: "`SHOW PROCEDURE STATUS WHERE Db = DATABASE();` (or query `information_schema.ROUTINES WHERE ROUTINE_TYPE = 'PROCEDURE'`).",
    explanation: "Standard command to inspect procedure metadata.",
    hint: "SHOW PROCEDURE STATUS WHERE Db = DATABASE();",
    level: "basic"
  },
  {
    question: "How do you list all Stored Functions defined in the current database?",
    shortAnswer: "`SHOW FUNCTION STATUS WHERE Db = DATABASE();` (or query `information_schema.ROUTINES WHERE ROUTINE_TYPE = 'FUNCTION'`).",
    explanation: "Standard command to inspect function metadata.",
    hint: "SHOW FUNCTION STATUS WHERE Db = DATABASE();",
    level: "basic"
  },
  {
    question: "How do you list all Database Triggers defined on tables in the current database?",
    shortAnswer: "`SHOW TRIGGERS;` (or query `information_schema.TRIGGERS`).",
    explanation: "Standard command to inspect trigger metadata.",
    hint: "SHOW TRIGGERS; or query information_schema.TRIGGERS.",
    level: "basic"
  },
  {
    question: "How do you inspect the complete creation DDL statement of a stored procedure named `sp_calculate_fees`?",
    shortAnswer: "`SHOW CREATE PROCEDURE sp_calculate_fees;`.",
    explanation: "Viewing stored procedure DDL source code.",
    hint: "SHOW CREATE PROCEDURE sp_calculate_fees;",
    level: "basic"
  },
  {
    question: "How do you inspect the complete creation DDL statement of a stored function named `fn_compute_tax`?",
    shortAnswer: "`SHOW CREATE FUNCTION fn_compute_tax;`.",
    explanation: "Viewing stored function DDL source code.",
    hint: "SHOW CREATE FUNCTION fn_compute_tax;",
    level: "basic"
  },
  {
    question: "How do you inspect the complete creation DDL statement of a trigger named `trg_audit_payments`?",
    shortAnswer: "`SHOW CREATE TRIGGER trg_audit_payments;`.",
    explanation: "Viewing trigger DDL source code.",
    hint: "SHOW CREATE TRIGGER trg_audit_payments;",
    level: "basic"
  },
  {
    question: "Can `ALTER PROCEDURE` change the parameters or procedural body of an existing procedure?",
    shortAnswer: "NO; `ALTER PROCEDURE` can only modify routine metadata (`COMMENT`, `SQL SECURITY`, `DEFINER`); modifying parameters or code requires `DROP PROCEDURE` and `CREATE PROCEDURE`.",
    explanation: "Alteration limits on stored routines.",
    hint: "No, ALTER PROCEDURE only modifies metadata (COMMENT, SQL SECURITY), not code.",
    level: "basic"
  },
  {
    question: "Is there an `ALTER TRIGGER` statement in MySQL 8.0?",
    shortAnswer: "NO; MySQL does not support `ALTER TRIGGER`. To modify a trigger, you MUST execute `DROP TRIGGER` and re-create it with `CREATE TRIGGER`.",
    explanation: "Trigger modification constraints in MySQL.",
    hint: "No ALTER TRIGGER exists; must DROP TRIGGER and CREATE TRIGGER.",
    level: "basic"
  },
  {
    question: "How do student routines for Mamata, Susmita, Abhronila, and Debangshu illustrate idempotent CI/CD deployment scripts?",
    shortAnswer: "Using `DROP PROCEDURE IF EXISTS sp_enroll_student; DELIMITER // CREATE PROCEDURE sp_enroll_student(...) ... END // DELIMITER ;` ensures seamless re-runs without duplicate object errors.",
    explanation: "Idempotent deployment scripts.",
    hint: "Wrap DDL with DROP IF EXISTS before CREATE.",
    level: "basic"
  },
  {
    question: "What is the difference between `SQL SECURITY DEFINER` and `SQL SECURITY INVOKER`?",
    shortAnswer: "`DEFINER` executes the routine with the privileges of the user who *created* it (default); `INVOKER` executes the routine with the privileges of the user who *called* it.",
    explanation: "Security execution context in MySQL stored routines.",
    hint: "DEFINER runs with creator's privileges; INVOKER runs with caller's privileges.",
    level: "expert"
  },
  {
    question: "How do you change an existing procedure's execution security to `INVOKER` using `ALTER PROCEDURE`?",
    shortAnswer: "`ALTER PROCEDURE sp_calculate_fees SQL SECURITY INVOKER;`.",
    explanation: "Altering routine security model.",
    hint: "ALTER PROCEDURE sp_name SQL SECURITY INVOKER;",
    level: "basic"
  },
  {
    question: "How do you safely drop a stored procedure named `sp_cleanup_temp` only if it exists?",
    shortAnswer: "`DROP PROCEDURE IF EXISTS sp_cleanup_temp;`.",
    explanation: "Idempotent procedure deletion syntax.",
    hint: "DROP PROCEDURE IF EXISTS sp_cleanup_temp;",
    level: "basic"
  },
  {
    question: "How do you safely drop a stored function named `fn_calc_discount` only if it exists?",
    shortAnswer: "`DROP FUNCTION IF EXISTS fn_calc_discount;`.",
    explanation: "Idempotent function deletion syntax.",
    hint: "DROP FUNCTION IF EXISTS fn_calc_discount;",
    level: "basic"
  },
  {
    question: "How do you safely drop a trigger named `trg_log_admissions` only if it exists?",
    shortAnswer: "`DROP TRIGGER IF EXISTS trg_log_admissions;`.",
    explanation: "Idempotent trigger deletion syntax.",
    hint: "DROP TRIGGER IF EXISTS trg_log_admissions;",
    level: "basic"
  },
  {
    question: "What privilege is required to execute a Stored Procedure or Stored Function?",
    shortAnswer: "The `EXECUTE` privilege on that specific routine or database (`GRANT EXECUTE ON PROCEDURE db.sp_name TO 'user'@'%';`).",
    explanation: "Routine execution privilege.",
    hint: "The EXECUTE privilege.",
    level: "basic"
  },
  {
    question: "What privilege is required to create or drop Database Triggers on a table?",
    shortAnswer: "The `TRIGGER` privilege on that table or database (`GRANT TRIGGER ON db.table_name TO 'user'@'%';`).",
    explanation: "Trigger creation and management privilege.",
    hint: "The TRIGGER privilege.",
    level: "basic"
  },
  {
    question: "What table in `information_schema` stores source code and metadata for all stored procedures and functions?",
    shortAnswer: "`information_schema.ROUTINES`.",
    explanation: "Data dictionary table for routines.",
    hint: "information_schema.ROUTINES.",
    level: "basic"
  },
  {
    question: "What table in `information_schema` stores metadata and definitions for all triggers?",
    shortAnswer: "`information_schema.TRIGGERS`.",
    explanation: "Data dictionary table for triggers.",
    hint: "information_schema.TRIGGERS.",
    level: "basic"
  },
  {
    question: "How do you find all routines modified in the last 7 days?",
    shortAnswer: "`SELECT ROUTINE_NAME, ROUTINE_TYPE, LAST_ALTERED FROM information_schema.ROUTINES WHERE LAST_ALTERED >= NOW() - INTERVAL 7 DAY;`.",
    explanation: "Audit queries on routine data dictionary.",
    hint: "Filter information_schema.ROUTINES by LAST_ALTERED.",
    level: "moderate"
  },
  {
    question: "What happens if a user without `EXECUTE` privilege attempts to call a stored procedure?",
    shortAnswer: "MySQL rejects the query with `ERROR 1370 (42000): execute command denied to user for routine 'sp_name'`.",
    explanation: "Access control enforcement on stored routines.",
    hint: "Error 1370 (Execute command denied).",
    level: "basic"
  },
  {
    question: "How does `SQL SECURITY DEFINER` allow least-privilege security encapsulation?",
    shortAnswer: "Users can be granted `EXECUTE` on the procedure without granting direct `SELECT`, `INSERT`, or `UPDATE` privileges on the underlying sensitive tables; the procedure acts as a secure, controlled API.",
    explanation: "Security encapsulation via stored procedures.",
    hint: "Allows users to run procedures without giving them direct table permissions.",
    level: "expert"
  },
  {
    question: "What is an orphaned trigger or routine?",
    shortAnswer: "A routine whose `DEFINER` user account has been deleted from `mysql.user`, causing subsequent executions to fail with Error 1449 ('The user specified as a definer does not exist').",
    explanation: "Definer user dependency hazard.",
    hint: "A routine whose creator user account was deleted, throwing Error 1449.",
    level: "expert"
  },
  {
    question: "How do you fix Error 1449 ('Definer does not exist') on an orphaned stored procedure?",
    shortAnswer: "Re-create the missing user account, or drop and re-create the procedure using an active administrator definer account (`ALTER PROCEDURE ...` does not support changing definer directly in older versions; re-creating with `CREATE DEFINER = 'admin'@'%' PROCEDURE ...` resolves it).",
    explanation: "Fixing orphaned routine definer errors.",
    hint: "Re-create the procedure with an active DEFINER account.",
    level: "expert"
  },
  {
    question: "Can you filter `SHOW PROCEDURE STATUS` using a `LIKE` pattern?",
    shortAnswer: "YES; `SHOW PROCEDURE STATUS LIKE 'sp_fee_%';` lists all procedures matching the naming prefix.",
    explanation: "Pattern filtering on SHOW status commands.",
    hint: "Yes, use LIKE 'pattern%' with SHOW PROCEDURE STATUS.",
    level: "basic"
  },
  {
    question: "How do you find which table and event a specific trigger is attached to via `information_schema`?",
    shortAnswer: "`SELECT TRIGGER_NAME, EVENT_MANIPULATION, EVENT_OBJECT_TABLE, ACTION_TIMING FROM information_schema.TRIGGERS WHERE TRIGGER_NAME = 'trg_name';`.",
    explanation: "Trigger attachment inspection.",
    hint: "Query EVENT_OBJECT_TABLE and ACTION_TIMING from information_schema.TRIGGERS.",
    level: "moderate"
  },
  {
    question: "What privilege allows a developer to view routine definitions using `SHOW CREATE PROCEDURE`?",
    shortAnswer: "The developer must have `EXECUTE` privilege on that procedure, or `SELECT` on `mysql.proc` / `information_schema.ROUTINES`.",
    explanation: "DDL visibility privileges.",
    hint: "Requires EXECUTE privilege or SELECT on metadata tables.",
    level: "moderate"
  },
  {
    question: "How do you change the comment description on a function using `ALTER FUNCTION`?",
    shortAnswer: "`ALTER FUNCTION fn_calculate_gst COMMENT 'Calculates 18% GST on course tuition fees';`.",
    explanation: "Metadata alteration on stored functions.",
    hint: "ALTER FUNCTION fn_name COMMENT 'description';",
    level: "basic"
  },
  {
    question: "Why is it best practice to include `DROP ... IF EXISTS` at the beginning of database migration scripts?",
    shortAnswer: "To ensure idempotency, allowing the migration script to be safely re-run multiple times during CI/CD pipelines without failing with 'Object already exists' errors.",
    explanation: "Idempotent CI/CD migration best practice.",
    hint: "Guarantees scripts can be re-run safely without crashing on duplicate objects.",
    level: "basic"
  },
  {
    question: "Can you drop multiple triggers in a single `DROP TRIGGER` statement in MySQL?",
    shortAnswer: "NO; MySQL requires separate `DROP TRIGGER` statements for each trigger to be dropped.",
    explanation: "Single-object drop constraint.",
    hint: "No, each trigger must be dropped individually.",
    level: "basic"
  },
  {
    question: "What is the senior architect's summary rule for Managing Procedures, Functions, and Triggers?",
    shortAnswer: "Use `SHOW` and `information_schema` for discovery and auditing; remember that `ALTER` only modifies routine metadata (never code or triggers); structure all CI/CD migrations with idempotent `DROP IF EXISTS` $\to$ `DELIMITER //` $\to$ `CREATE` blocks; and leverage `SQL SECURITY DEFINER` for least-privilege table encapsulation.",
    explanation: "Authoritative architectural best practices for routine lifecycle management.",
    hint: "Inspect via SHOW/information_schema + idempotent DROP/CREATE in migrations + least-privilege security.",
    level: "expert"
  }
];

export default questions;
