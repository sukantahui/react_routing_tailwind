// topic5_files/topic5_questions.js

const questions = [
  {
    question: "What is the purpose of the `SQL SECURITY` clause in a MySQL view definition?",
    shortAnswer: "It determines whether privileges on the underlying base tables are checked against the view's creator (`DEFINER`) or the current user querying the view (`INVOKER`).",
    explanation: "Controls the security execution context under which the view runs.",
    hint: "Controls whether base table permissions are checked against DEFINER or INVOKER.",
    level: "basic"
  },
  {
    question: "What is the default security mode for a view if `SQL SECURITY` is omitted in MySQL?",
    shortAnswer: "`SQL SECURITY DEFINER`",
    explanation: "By default, views execute with the privileges of their definer/creator.",
    hint: "SQL SECURITY DEFINER is the default.",
    level: "basic"
  },
  {
    question: "How does `SQL SECURITY DEFINER` enable secure column and row data masking?",
    shortAnswer: "It allows unprivileged users to query sanitized views without requiring them to have any read access to the underlying sensitive base tables.",
    explanation: "The DEFINER's permissions satisfy the base table access checks.",
    hint: "Allows callers to query the view without needing access to raw base tables.",
    level: "basic"
  },
  {
    question: "What happens when a user queries an `SQL SECURITY INVOKER` view if they do NOT have `SELECT` permission on the base table?",
    shortAnswer: "The query fails with Error 1142: `SELECT command denied to user for table 'table_name'`.",
    explanation: "INVOKER mode evaluates base table permissions against the caller's active database account.",
    hint: "Fails with Error 1142 because the caller lacks base table SELECT privileges.",
    level: "basic"
  },
  {
    question: "What is the syntax to explicitly create a view with `SQL SECURITY INVOKER`?",
    shortAnswer: "`CREATE SQL SECURITY INVOKER VIEW view_name AS SELECT ...;`",
    explanation: "Instructs MySQL to evaluate base table permissions using the caller's credentials.",
    hint: "CREATE SQL SECURITY INVOKER VIEW view_name AS ...",
    level: "basic"
  },
  {
    question: "What is the 'Orphaned DEFINER' problem in MySQL views?",
    shortAnswer: "When the database user account defined in the `DEFINER = user@host` clause is dropped or renamed, causing all queries on that view to fail with Error 1449.",
    explanation: "MySQL cannot execute a DEFINER view if the definer account no longer exists in `mysql.user`.",
    hint: "Occurs when the DEFINER account is dropped, throwing Error 1449.",
    level: "moderate"
  },
  {
    question: "What is MySQL Error 1449?",
    shortAnswer: "`The user specified as a definer ('username'@'host') does not exist`.",
    explanation: "Thrown when querying a view or routine whose DEFINER account was deleted.",
    hint: "Error 1449: Definer user does not exist.",
    level: "moderate"
  },
  {
    question: "How can you fix an orphaned view that throws Error 1449?",
    shortAnswer: "Recreate or alter the view with an existing active account: `ALTER DEFINER = 'active_admin'@'localhost' VIEW view_name AS ...;`",
    explanation: "Reassigns a valid definer account in the database data dictionary.",
    hint: "Use ALTER DEFINER = 'valid_user'@'host' VIEW view_name AS ...",
    level: "moderate"
  },
  {
    question: "Where in MySQL system catalogs can you audit the `DEFINER` and `SECURITY_TYPE` of all views?",
    shortAnswer: "`SELECT TABLE_SCHEMA, TABLE_NAME, DEFINER, SECURITY_TYPE FROM information_schema.VIEWS;`",
    explanation: "The information_schema.VIEWS catalog stores all view security metadata.",
    hint: "Query information_schema.VIEWS and inspect DEFINER and SECURITY_TYPE columns.",
    level: "basic"
  },
  {
    question: "Why should you use dedicated service accounts (e.g. `app_view_definer@localhost`) rather than individual developer accounts as DEFINERs in production?",
    shortAnswer: "To prevent view failure outages (Error 1449) when individual developers leave the organization and their personal database accounts are deleted.",
    explanation: "Dedicated system accounts ensure long-term stability across personnel changes.",
    hint: "Prevents views from breaking when individual developer accounts are deleted.",
    level: "moderate"
  },
  {
    question: "Can an `SQL SECURITY DEFINER` view be used for privilege escalation if improperly configured?",
    shortAnswer: "YES. If a privileged account creates a DEFINER view that exposes broad data or joins without proper row filters, unprivileged callers gain indirect access to elevated data.",
    explanation: "DEFINER views act as security tunnels and must be carefully restricted.",
    hint: "Yes; unprivileged users can access elevated data if the view lacks strict filtering.",
    level: "expert"
  },
  {
    question: "What permission must a database user have to query an `SQL SECURITY DEFINER` view?",
    shortAnswer: "Only the `SELECT` privilege on the view object itself (`GRANT SELECT ON db.view_name TO 'user';`).",
    explanation: "No permissions on underlying base tables are required for the caller in DEFINER mode.",
    hint: "Only SELECT privilege on the view itself.",
    level: "basic"
  },
  {
    question: "What permissions must a database user have to query an `SQL SECURITY INVOKER` view?",
    shortAnswer: "`SELECT` privilege on the view object **AND** `SELECT` privilege on all referenced underlying base tables and columns.",
    explanation: "INVOKER mode enforces full end-to-end authorization across the entire relational tree.",
    hint: "SELECT on the view AND SELECT on all referenced base tables.",
    level: "moderate"
  },
  {
    question: "Can an `SQL SECURITY INVOKER` view be used for data masking of confidential payroll data from clerks?",
    shortAnswer: "NO. Because in INVOKER mode, clerks must be granted SELECT on the raw payroll table for the view to run, which defeats data masking.",
    explanation: "Data masking requires DEFINER mode so that base table access can remain revoked.",
    hint: "No; clerks would need access to the raw table, defeating data masking.",
    level: "moderate"
  },
  {
    question: "When is `SQL SECURITY INVOKER` the recommended choice?",
    shortAnswer: "When views are used by developers or analytical teams as query shortcuts, and you want to enforce each user's existing security clearance.",
    explanation: "Ensures users cannot bypass their individual permission boundaries via the view.",
    hint: "For convenience query shortcuts among users who already have base table access.",
    level: "moderate"
  },
  {
    question: "What happens if the DEFINER user account loses its base table permissions after the view is created?",
    shortAnswer: "Any user querying the `SQL SECURITY DEFINER` view will fail with Error 1142 because the definer can no longer access the base tables.",
    explanation: "Permissions are evaluated dynamically on each execution.",
    hint: "Queries on the view fail because the definer lacks required base table grants.",
    level: "expert"
  },
  {
    question: "Can you change a view's security mode from DEFINER to INVOKER using `ALTER VIEW`?",
    shortAnswer: "YES: `ALTER SQL SECURITY INVOKER VIEW view_name AS SELECT ...;`",
    explanation: "ALTER VIEW allows redefining the SQL SECURITY clause without dropping the view.",
    hint: "Yes; use ALTER SQL SECURITY INVOKER VIEW ...",
    level: "basic"
  },
  {
    question: "How does `SHOW CREATE VIEW view_name;` display security properties?",
    shortAnswer: "It displays `ALGORITHM=... DEFINER=... SQL SECURITY {DEFINER|INVOKER} VIEW ...` in the output statement.",
    explanation: "SHOW CREATE VIEW outputs the complete security configuration.",
    hint: "Includes the DEFINER and SQL SECURITY clauses in the output statement.",
    level: "basic"
  },
  {
    question: "Can a non-root user create a view with `DEFINER = 'root'@'localhost'`?",
    shortAnswer: "NO, unless that user possesses the `SET_USER_ID` or `SUPER` administrative privilege.",
    explanation: "Prevents unprivileged users from arbitrarily impersonating elevated accounts.",
    hint: "No; assigning another user as DEFINER requires the SET_USER_ID or SUPER privilege.",
    level: "expert"
  },
  {
    question: "If a view definition calls a Stored Function, whose privileges are evaluated for the function execution in DEFINER mode?",
    shortAnswer: "The view's DEFINER privileges are used to check function execution permission (and the function's own SQL SECURITY mode then applies).",
    explanation: "Security contexts cascade through nested relational routines and views.",
    hint: "The view DEFINER's permissions are checked for calling the function.",
    level: "expert"
  },
  {
    question: "How do views with `SQL SECURITY DEFINER` support the Principle of Least Privilege in database architecture?",
    shortAnswer: "By allowing client microservices to connect with low-privilege accounts granted access strictly to sanitized views rather than granting full table access.",
    explanation: "Limits attack surface if application credentials are compromised.",
    hint: "Microservices get access only to sanitized views, not full tables.",
    level: "basic"
  },
  {
    question: "What is the result of running `CREATE OR REPLACE VIEW v AS SELECT * FROM base;` without specifying DEFINER?",
    shortAnswer: "MySQL automatically sets the DEFINER to the currently connected user (`CURRENT_USER`) and the mode to `DEFINER`.",
    explanation: "Default MySQL behavior assigns the session user as DEFINER.",
    hint: "Sets DEFINER to CURRENT_USER and SQL SECURITY to DEFINER.",
    level: "basic"
  },
  {
    question: "Can `SQL SECURITY DEFINER` views be created on top of other `SQL SECURITY DEFINER` views?",
    shortAnswer: "YES. Each view in the nested hierarchy executes within the security context of its respective DEFINER.",
    explanation: "Nested views chain their respective definer permissions during execution.",
    hint: "Yes; each nested view evaluates against its own DEFINER.",
    level: "expert"
  },
  {
    question: "How can a database administrator prevent developers from deploying views with `SQL SECURITY DEFINER` that reference root?",
    shortAnswer: "By not granting developers the `SET_USER_ID` or `SUPER` privilege, restricting them to creating views with their own definer accounts.",
    explanation: "MySQL privilege controls prevent unauthorized definer impersonation.",
    hint: "Revoke SET_USER_ID and SUPER privileges from developer accounts.",
    level: "expert"
  },
  {
    question: "If a table column is renamed, does an `SQL SECURITY DEFINER` view fail differently than an `INVOKER` view?",
    shortAnswer: "NO. Both fail identically with Error 1054 (`Unknown column in field list`), because schema resolution fails regardless of security context.",
    explanation: "Syntax and schema validation occur prior to security permission checks.",
    hint: "Both fail identically with Error 1054.",
    level: "moderate"
  },
  {
    question: "Can an `SQL SECURITY INVOKER` view have an assigned DEFINER in MySQL?",
    shortAnswer: "YES. MySQL records the creator in the DEFINER metadata column, but the `SECURITY_TYPE = 'INVOKER'` flag ensures the caller's credentials are used at runtime.",
    explanation: "The DEFINER attribute records authorship but is bypassed during execution.",
    hint: "Yes; the DEFINER is recorded for authorship, but INVOKER governs runtime execution.",
    level: "moderate"
  },
  {
    question: "How do you create a public admission roster view for the Barrackpore academy that web visitors can query without accessing raw student records?",
    shortAnswer: "`CREATE DEFINER = 'dba'@'localhost' SQL SECURITY DEFINER VIEW v_public_roster AS SELECT id, name, stream, city FROM students WHERE status = 'CONFIRMED';`",
    explanation: "Definer mode allows web visitors to query the roster while raw tables remain locked.",
    hint: "Use SQL SECURITY DEFINER with a restricted SELECT list.",
    level: "basic"
  },
  {
    question: "What error is returned if a user tries to query a view on which they have NO `SELECT` permission?",
    shortAnswer: "Error 1142: `SELECT command denied to user 'user'@'host' for table 'view_name'`.",
    explanation: "Object-level access checks on the view itself always take precedence.",
    hint: "Error 1142: SELECT command denied for view.",
    level: "basic"
  },
  {
    question: "Why should database backup scripts (`mysqldump`) be inspected for DEFINER clauses before restoring to another server?",
    shortAnswer: "Because `mysqldump` includes hardcoded `DEFINER=user@host` clauses that will cause Error 1449 if those specific accounts do not exist on the target server.",
    explanation: "Restoring views on new environments requires matching definer accounts or stripping definer headers.",
    hint: "Hardcoded DEFINER accounts in dumps will fail if those accounts don't exist on the target server.",
    level: "expert"
  },
  {
    question: "What is the ultimate security best practice for database views in production?",
    shortAnswer: "Use dedicated, non-login service accounts as DEFINERs for data-masking views, use INVOKER for shared developer query shortcuts, and routinely audit `information_schema.VIEWS`.",
    explanation: "Combines robust access control with high operational reliability.",
    hint: "Dedicated service accounts for DEFINER, INVOKER for shortcuts, and regular audits.",
    level: "expert"
  }
];

export default questions;
