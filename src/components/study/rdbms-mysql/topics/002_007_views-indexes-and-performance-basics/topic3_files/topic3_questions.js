// topic3_files/topic3_questions.js

const questions = [
  {
    question: "What is an updatable view in MySQL?",
    shortAnswer: "An updatable view is a virtual table that allows `INSERT`, `UPDATE`, and `DELETE` operations that are directly and deterministically mapped to the underlying physical base table.",
    explanation: "The database engine translates the DML operation on the view into corresponding modifications on the base table.",
    hint: "A view that supports INSERT, UPDATE, and DELETE directly to base tables.",
    level: "basic"
  },
  {
    question: "What fundamental mathematical condition is required for a view to be updatable?",
    shortAnswer: "There must be an unambiguous 1-to-1 relationship between each row in the view and a unique physical row in the underlying base table.",
    explanation: "If a view row is an aggregation or combination of multiple rows, the engine cannot determine which base row to modify.",
    hint: "A 1-to-1 relationship between each view row and base table row.",
    level: "basic"
  },
  {
    question: "Which of the following clauses makes a view NON-updatable in MySQL?",
    shortAnswer: "`GROUP BY`, `DISTINCT`, `HAVING`, `UNION`, and aggregate functions (e.g. `SUM()`, `AVG()`).",
    explanation: "Any construct that compresses, combines, or summarizes multiple rows prevents direct reverse-mapping.",
    hint: "GROUP BY, DISTINCT, UNION, and aggregate functions destroy updatability.",
    level: "basic"
  },
  {
    question: "How can you check if a view is updatable in MySQL using system catalogs?",
    shortAnswer: "`SELECT TABLE_NAME, IS_UPDATABLE FROM information_schema.VIEWS WHERE TABLE_SCHEMA = 'database_name';`",
    explanation: "The IS_UPDATABLE column returns 'YES' if DML is supported or 'NO' if the view is read-only.",
    hint: "Query information_schema.VIEWS and inspect the IS_UPDATABLE column.",
    level: "basic"
  },
  {
    question: "What is the 'Ghost Row' or 'Vanishing Tuple' problem when updating rows through a view?",
    shortAnswer: "When an `UPDATE` through a filtered view modifies a row's column value such that the row no longer satisfies the view's `WHERE` clause, causing the row to disappear from the view.",
    explanation: "The update succeeds in the base table, but the row vanishes from the view's result set.",
    hint: "Updating a row so it no longer satisfies the view's WHERE clause, causing it to disappear.",
    level: "moderate"
  },
  {
    question: "What is the purpose of the `WITH CHECK OPTION` clause in a `CREATE VIEW` statement?",
    shortAnswer: "It prevents `INSERT` and `UPDATE` operations executed through the view from creating or modifying rows that violate the view's `WHERE` clause.",
    explanation: "WITH CHECK OPTION acts as an active constraint guard ensuring all modified rows remain visible in the view.",
    hint: "Guarantees that all inserted/updated rows must satisfy the view's WHERE condition.",
    level: "basic"
  },
  {
    question: "What MySQL error is thrown when an `UPDATE` or `INSERT` through a view violates `WITH CHECK OPTION`?",
    shortAnswer: "Error 1369 (HY000): `CHECK OPTION failed 'database_name.view_name'`.",
    explanation: "The transaction is aborted and rolled back to maintain view boundary integrity.",
    hint: "Error 1369: CHECK OPTION failed.",
    level: "moderate"
  },
  {
    question: "What is the difference between `WITH CASCADED CHECK OPTION` and `WITH LOCAL CHECK OPTION` in nested views?",
    shortAnswer: "`CASCADED` (default) checks the WHERE conditions of the current view and all underlying parent views, while `LOCAL` checks only the current view's WHERE condition (unless underlying views also have CHECK OPTION).",
    explanation: "CASCADED ensures full hierarchical constraint validation across the entire ancestry chain of views.",
    hint: "CASCADED checks all nested parent views; LOCAL checks only the current view.",
    level: "expert"
  },
  {
    question: "If no keyword is specified with `WITH CHECK OPTION`, which mode is used by default in MySQL?",
    shortAnswer: "`CASCADED`",
    explanation: "Standard ANSI SQL and MySQL defaults to CASCADED check option.",
    hint: "CASCADED is the default behavior.",
    level: "moderate"
  },
  {
    question: "Can you `INSERT` a row through a multi-table `JOIN` view in MySQL?",
    shortAnswer: "YES, provided that the `INSERT` modifies columns in exactly ONE base table at a time and all non-nullable base table columns have values or defaults.",
    explanation: "MySQL allows modifying only one underlying base table per DML statement in a join view.",
    hint: "Yes, but it must affect columns in only one base table at a time.",
    level: "expert"
  },
  {
    question: "Can you `DELETE` a row through a multi-table `JOIN` view in MySQL?",
    shortAnswer: "NO. In general, `DELETE` statements through multi-table join views are disallowed in MySQL to prevent ambiguous deletions.",
    explanation: "Deleting from a multi-table view could inadvertently cascade or delete unintended parent entities.",
    hint: "No; DELETE on multi-table join views is generally prohibited in MySQL.",
    level: "expert"
  },
  {
    question: "What happens if you try to `INSERT` a row through a view that does NOT include a `NOT NULL` column from the base table?",
    shortAnswer: "The insert fails with Error 1364 (Field doesn't have a default value), unless that column has a `DEFAULT` constraint or is an `AUTO_INCREMENT` primary key.",
    explanation: "Physical base table constraints must still be satisfied by every insert routed through the view.",
    hint: "Fails with Error 1364 unless the omitted column has a DEFAULT value or AUTO_INCREMENT.",
    level: "moderate"
  },
  {
    question: "Can a view defined with `ALGORITHM = TEMPTABLE` be updatable in MySQL?",
    shortAnswer: "NO. Views created with `ALGORITHM = TEMPTABLE` are permanently read-only (IS_UPDATABLE = 'NO').",
    explanation: "Temporary tables exist in RAM/scratch files and cannot propagate writes back to physical base table pages.",
    hint: "No; TEMPTABLE views are always strictly read-only.",
    level: "expert"
  },
  {
    question: "If a view contains calculated columns (e.g. `fee * 0.18 AS tax`), can you `UPDATE` the calculated column?",
    shortAnswer: "NO. Calculated expressions cannot be updated directly; you can only update underlying raw columns present in the view.",
    explanation: "The database engine cannot reverse-calculate source column values from arbitrary mathematical expressions.",
    hint: "No; derived/calculated columns cannot be updated directly.",
    level: "basic"
  },
  {
    question: "Can you `UPDATE` raw columns in a view that also happens to contain calculated columns?",
    shortAnswer: "YES. As long as you update only the raw physical base table columns and the view meets all other updatability rules.",
    explanation: "Updating non-derived columns in a 1-to-1 view is fully supported.",
    hint: "Yes, as long as you only update the raw uncalculated columns.",
    level: "moderate"
  },
  {
    question: "How does `WITH CHECK OPTION` handle `INSERT` statements with values that fail the `WHERE` clause?",
    shortAnswer: "The insert is rejected immediately with Error 1369, and no rows are added to the physical base table.",
    explanation: "WITH CHECK OPTION guards both INSERT and UPDATE statements identically.",
    hint: "Rejects the INSERT with Error 1369.",
    level: "basic"
  },
  {
    question: "Suppose View A has `WHERE marks >= 50` (no check option), and View B is `SELECT * FROM View A WHERE marks <= 100 WITH CASCADED CHECK OPTION`. What happens if you insert `marks = 40` through View B?",
    shortAnswer: "It is rejected because `CASCADED` checks View A's condition (`marks >= 50`) as well as View B's condition.",
    explanation: "Cascaded check option enforces the entire chain of view conditions all the way to the base table.",
    hint: "Rejected because CASCADED enforces parent View A's condition (>= 50).",
    level: "expert"
  },
  {
    question: "In the previous scenario, what happens if View B had `WITH LOCAL CHECK OPTION` instead?",
    shortAnswer: "The insert succeeds because View B checks only its own condition (`marks <= 100`), and View A had no check option defined.",
    explanation: "LOCAL checks only views that explicitly define a CHECK OPTION in the hierarchy.",
    hint: "Succeeds because LOCAL checks only View B's condition.",
    level: "expert"
  },
  {
    question: "Can you update a view that has a subquery in the `WHERE` clause (e.g. `WHERE dept_id IN (SELECT id FROM depts)`)?",
    shortAnswer: "YES, in MySQL 8.0+, subqueries in the WHERE clause are allowed in updatable views, provided the subquery does not reference the view's base table.",
    explanation: "Subqueries in WHERE do not violate 1-to-1 row determinism.",
    hint: "Yes, as long as the subquery is in the WHERE clause, not in the SELECT list.",
    level: "expert"
  },
  {
    question: "Why does `WITH CHECK OPTION` act like an automated database business rule validator?",
    shortAnswer: "Because it prevents client applications from inserting invalid state transitions or violating domain boundaries defined in the view's `WHERE` clause.",
    explanation: "Provides declarative constraint validation at the database layer.",
    hint: "Enforces declarative data validation rules at the database level.",
    level: "moderate"
  },
  {
    question: "What happens if you update a row through an updatable view that has database triggers attached to the base table?",
    shortAnswer: "The base table's `BEFORE UPDATE` and `AFTER UPDATE` triggers fire normally and execute their procedural logic.",
    explanation: "DML through views invokes base table triggers identically to direct base table updates.",
    hint: "Base table triggers fire normally on all DML routed through the view.",
    level: "moderate"
  },
  {
    question: "Can an `AUTO_INCREMENT` column be generated automatically during an `INSERT` through a view?",
    shortAnswer: "YES. If the auto-increment column is omitted from the view's INSERT statement, MySQL generates the next ID automatically.",
    explanation: "Base table auto-increment sequences function transparently through views.",
    hint: "Yes; the base table generates the next AUTO_INCREMENT sequence value.",
    level: "basic"
  },
  {
    question: "How do you create an updatable view for the Barrackpore academy campus that strictly forbids adding non-Barrackpore students?",
    shortAnswer: "`CREATE VIEW v_bkp_students AS SELECT * FROM students WHERE centre_city = 'Barrackpore' WITH CHECK OPTION;`",
    explanation: "WITH CHECK OPTION blocks any attempt to insert or update a student with a different city.",
    hint: "Add WITH CHECK OPTION to the view definition with WHERE centre_city = 'Barrackpore'.",
    level: "basic"
  },
  {
    question: "Can you use `DELETE FROM view_name WHERE condition;` on a single-table updatable view?",
    shortAnswer: "YES. It deletes matching physical rows directly from the underlying base table.",
    explanation: "Single-table views with 1-to-1 mappings support DELETE operations seamlessly.",
    hint: "Yes; it deletes the corresponding rows from the physical base table.",
    level: "basic"
  },
  {
    question: "What happens if a view contains `LIMIT` in its definition and you attempt to `UPDATE` through it?",
    shortAnswer: "In MySQL, views with `LIMIT` are NOT updatable (IS_UPDATABLE = 'NO').",
    explanation: "LIMIT introduces non-determinism regarding which specific subset of rows are represented.",
    hint: "Views containing LIMIT in their definition are read-only.",
    level: "expert"
  },
  {
    question: "What happens if a view uses `UNION ALL` to combine two tables and you try to insert into it?",
    shortAnswer: "The insert fails with an error stating that the target table of the INSERT is not insertable-into.",
    explanation: "UNION views cannot determine which underlying table should receive the inserted tuple.",
    hint: "UNION views are read-only and reject INSERT operations.",
    level: "basic"
  },
  {
    question: "How does `WITH CHECK OPTION` interact with `NULL` values in the view's filter (e.g. `WHERE marks >= 50`)?",
    shortAnswer: "If an insert/update provides a `NULL` for `marks`, `NULL >= 50` evaluates to `UNKNOWN`, which fails the CHECK OPTION and is rejected.",
    explanation: "CHECK OPTION requires the condition to evaluate strictly to TRUE.",
    hint: "UNKNOWN conditions fail the CHECK OPTION and are rejected.",
    level: "expert"
  },
  {
    question: "Why are updatable views with `WITH CHECK OPTION` often used in Multi-Tenant SaaS databases?",
    shortAnswer: "To provide tenant-specific views (e.g. `WHERE tenant_id = 42 WITH CHECK OPTION`) that prevent Tenant 42 from accidentally inserting or modifying another tenant's records.",
    explanation: "Guarantees strict tenant isolation for both read and write database operations.",
    hint: "Prevents cross-tenant data corruption by enforcing tenant_id boundaries on writes.",
    level: "expert"
  },
  {
    question: "Can an `INSTEAD OF` trigger be used in MySQL to make complex non-updatable views updatable?",
    shortAnswer: "NO. MySQL does NOT support `INSTEAD OF` triggers (unlike Oracle and SQL Server); only native updatability rules apply.",
    explanation: "MySQL triggers are strictly BEFORE and AFTER on base physical tables.",
    hint: "No; MySQL does not support INSTEAD OF triggers on views.",
    level: "expert"
  },
  {
    question: "What is the golden rule when designing an updatable view for production applications?",
    shortAnswer: "Tie the view 1-to-1 to a single base table, include the primary key, avoid aggregations/unions, and always append `WITH CHECK OPTION` to enforce integrity.",
    explanation: "Ensures reliable, deterministic, and secure write operations through the virtual schema layer.",
    hint: "1-to-1 single table mapping + primary key + WITH CHECK OPTION.",
    level: "expert"
  }
];

export default questions;
