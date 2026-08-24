// topic1_files/topic1_questions.js

const questions = [
  {
    question: "What is the standard SQL syntax to create a basic view?",
    shortAnswer: "`CREATE VIEW view_name AS SELECT column1, column2 FROM table_name WHERE condition;`",
    explanation: "Standard DDL statement establishing a virtual relation backed by a SELECT query.",
    hint: "CREATE VIEW view_name AS SELECT ...",
    level: "basic"
  },
  {
    question: "What happens if you execute `CREATE VIEW view_name AS ...` when a view with that name already exists?",
    shortAnswer: "MySQL throws Error 1050: `Table 'view_name' already exists`.",
    explanation: "Standard CREATE VIEW requires the object identifier to be unused in the database schema.",
    hint: "Throws Error 1050 indicating the view/table already exists.",
    level: "basic"
  },
  {
    question: "How can you make a view creation script idempotent so it doesn't fail if the view already exists?",
    shortAnswer: "Use `CREATE OR REPLACE VIEW view_name AS SELECT ...;`",
    explanation: "CREATE OR REPLACE VIEW creates a new view if it does not exist, or updates its definition if it already exists.",
    hint: "Use CREATE OR REPLACE VIEW.",
    level: "basic"
  },
  {
    question: "How do you specify explicit column names in a view header?",
    shortAnswer: "`CREATE VIEW view_name (col_alias1, col_alias2) AS SELECT raw_col1, raw_col2 FROM table_name;`",
    explanation: "Placing a parenthesized column list after the view name explicitly renames the view's output columns.",
    hint: "Place the list of aliases in parentheses right after the view name.",
    level: "basic"
  },
  {
    question: "What error occurs if the parenthesized column list in `CREATE VIEW v (a, b, c)` has 3 names but the `SELECT` query returns 4 columns?",
    shortAnswer: "Error 1353: `View's SELECT and view's field list have different column counts`.",
    explanation: "The number of column aliases specified in the header must exactly match the number of projected SELECT expressions.",
    hint: "Throws Error 1353 because the column counts do not match.",
    level: "moderate"
  },
  {
    question: "What is the syntax to modify an existing view without using `CREATE OR REPLACE`?",
    shortAnswer: "`ALTER VIEW view_name AS SELECT new_columns FROM table_name;`",
    explanation: "ALTER VIEW redefines an existing view while keeping its database permissions intact.",
    hint: "ALTER VIEW view_name AS SELECT ...",
    level: "basic"
  },
  {
    question: "What happens if you run `ALTER VIEW view_name AS ...` on a view that does NOT exist?",
    shortAnswer: "MySQL throws Error 1146: `Table 'database.view_name' doesn't exist`.",
    explanation: "ALTER VIEW strictly requires the target view to exist prior to modification.",
    hint: "Throws Error 1146 because the target view does not exist.",
    level: "moderate"
  },
  {
    question: "Do `ALTER VIEW` and `CREATE OR REPLACE VIEW` preserve user privileges previously granted on the view?",
    shortAnswer: "YES. Both commands update only the internal query definition without revoking existing user permissions.",
    explanation: "Object privileges remain bound to the view's entry in the grant tables.",
    hint: "Yes; existing user permissions on the view remain preserved.",
    level: "moderate"
  },
  {
    question: "What is the SQL command to delete a database view safely without throwing an error if it doesn't exist?",
    shortAnswer: "`DROP VIEW IF EXISTS view_name;`",
    explanation: "The IF EXISTS clause suppresses Error 1051 if the view has already been deleted.",
    hint: "Use DROP VIEW IF EXISTS view_name.",
    level: "basic"
  },
  {
    question: "Can multiple views be dropped in a single SQL statement?",
    shortAnswer: "YES: `DROP VIEW IF EXISTS view1, view2, view3;`",
    explanation: "Comma-separated view names allow bulk deletion of multiple views simultaneously.",
    hint: "Yes; separate view names with commas in DROP VIEW.",
    level: "basic"
  },
  {
    question: "What command displays the exact SQL definition used to create an existing view in MySQL?",
    shortAnswer: "`SHOW CREATE VIEW view_name;`",
    explanation: "SHOW CREATE VIEW outputs the full canonical CREATE VIEW DDL statement stored in MySQL's catalog.",
    hint: "Use SHOW CREATE VIEW view_name.",
    level: "basic"
  },
  {
    question: "How can you list all views (and exclude base tables) in the current database?",
    shortAnswer: "`SHOW FULL TABLES WHERE Table_type = 'VIEW';`",
    explanation: "SHOW FULL TABLES adds the Table_type column ('BASE TABLE' vs 'VIEW') which can be filtered.",
    hint: "SHOW FULL TABLES WHERE Table_type = 'VIEW';",
    level: "moderate"
  },
  {
    question: "Which system database catalog table stores the detailed definitions of all views across schemas?",
    shortAnswer: "`information_schema.VIEWS`",
    explanation: "The information_schema.VIEWS catalog contains metadata like VIEW_DEFINITION, IS_UPDATABLE, and SECURITY_TYPE.",
    hint: "information_schema.VIEWS",
    level: "basic"
  },
  {
    question: "What are the three possible values for the `ALGORITHM` clause in `CREATE ALGORITHM = ... VIEW`?",
    shortAnswer: "`UNDEFINED`, `MERGE`, and `TEMPTABLE`.",
    explanation: "ALGORITHM determines how MySQL executes the view: MERGE folds it into the outer query, TEMPTABLE materializes an internal temp table.",
    hint: "UNDEFINED, MERGE, and TEMPTABLE.",
    level: "expert"
  },
  {
    question: "What does `ALGORITHM = MERGE` do when querying a view?",
    shortAnswer: "MySQL combines the text of the view's query with the outer query into a single executable query plan without creating temporary tables.",
    explanation: "MERGE is the most efficient algorithm and allows the optimizer to push down WHERE predicates directly to base table indexes.",
    hint: "Merges view definition directly with caller query without temporary tables.",
    level: "expert"
  },
  {
    question: "What forces MySQL to use `ALGORITHM = TEMPTABLE` instead of `MERGE`?",
    shortAnswer: "When the view contains aggregate functions (SUM, COUNT), DISTINCT, GROUP BY, HAVING, UNION, or subqueries in the SELECT list.",
    explanation: "These relational operators prevent inline query expansion, forcing MySQL to create an internal temporary table.",
    hint: "Aggregations, GROUP BY, DISTINCT, and UNION prevent MERGE.",
    level: "expert"
  },
  {
    question: "Can a database view share the exact same name as an existing base table in the same database?",
    shortAnswer: "NO. Tables and views share the same namespace in a MySQL database schema, so names must be globally unique.",
    explanation: "An error 1050 occurs if you attempt to create a view with the same name as an existing base table.",
    hint: "No; tables and views share the same namespace in MySQL.",
    level: "basic"
  },
  {
    question: "What does the `WITH CHECK OPTION` clause do when creating a view?",
    shortAnswer: "It prevents `INSERT` or `UPDATE` operations through the view from creating rows that would violate the view's `WHERE` clause.",
    explanation: "WITH CHECK OPTION guarantees that modified or newly inserted rows remain visible within the view's filter boundary.",
    hint: "Enforces that inserted/updated rows must satisfy the view's WHERE condition.",
    level: "moderate"
  },
  {
    question: "What is the difference between `WITH LOCAL CHECK OPTION` and `WITH CASCADED CHECK OPTION`?",
    shortAnswer: "`CASCADED` (the default) checks the WHERE conditions of the current view and all underlying nested views, while `LOCAL` checks only the current view's WHERE condition.",
    explanation: "CASCADED ensures end-to-end integrity across an entire hierarchy of nested view definitions.",
    hint: "CASCADED checks all nested parent views; LOCAL checks only the current view.",
    level: "expert"
  },
  {
    question: "Can you create a view that queries another view?",
    shortAnswer: "YES. This is known as a nested view or 'view on view'.",
    explanation: "Relational composition allows views to be stacked on top of other virtual views.",
    hint: "Yes; views can freely reference other views in their SELECT queries.",
    level: "basic"
  },
  {
    question: "What happens if you drop a base table that is referenced by an active view?",
    shortAnswer: "The view is NOT automatically deleted; it remains in the catalog in a broken/invalid state and fails with Error 1146 when next queried.",
    explanation: "MySQL does not maintain automatic referential cascade deletion between base tables and views.",
    hint: "The view remains in catalog but throws an error when queried.",
    level: "moderate"
  },
  {
    question: "How do you rename an existing database view in MySQL?",
    shortAnswer: "`RENAME TABLE old_view_name TO new_view_name;`",
    explanation: "The RENAME TABLE command works identically on both base physical tables and virtual views.",
    hint: "Use RENAME TABLE old_name TO new_name.",
    level: "moderate"
  },
  {
    question: "Why does `SELECT *` inside a view definition expand to explicit columns in `SHOW CREATE VIEW`?",
    shortAnswer: "Because during `CREATE VIEW` execution, MySQL resolves the asterisk and permanently stores the explicit column names in the data dictionary at creation time.",
    explanation: "This freezes the column list as it existed at DDL compile time.",
    hint: "MySQL freezes and expands SELECT * into explicit column names at creation time.",
    level: "expert"
  },
  {
    question: "What is the recommended naming convention for database views in production systems?",
    shortAnswer: "Prefixing with `v_` or `vw_` (e.g. `vw_active_students`, `v_monthly_revenue`) or organizing views in dedicated reporting schemas.",
    explanation: "Clear prefixes prevent developers from mistaking expensive virtual views for simple base tables.",
    hint: "Use prefixes like v_ or vw_ to clearly distinguish views from physical tables.",
    level: "basic"
  },
  {
    question: "What permission is required to create a view in MySQL?",
    shortAnswer: "`CREATE VIEW` privilege on the database, and `SELECT` privilege on all referenced columns and tables.",
    explanation: "The creator must have read access to every column participating in the view query.",
    hint: "Requires CREATE VIEW and SELECT on underlying tables.",
    level: "moderate"
  },
  {
    question: "What permission is required to drop a view in MySQL?",
    shortAnswer: "`DROP` privilege on the view object.",
    explanation: "DROP privilege allows removing schema objects.",
    hint: "Requires DROP privilege.",
    level: "basic"
  },
  {
    question: "Can a `CREATE VIEW` statement include an `ORDER BY` clause?",
    shortAnswer: "YES, but if a query calling the view includes its own `ORDER BY`, the caller's sort order completely overrides the view's internal `ORDER BY`.",
    explanation: "Outer ORDER BY takes precedence in SQL standard evaluation.",
    hint: "Yes, but an outer ORDER BY in the caller query overrides the view's internal sorting.",
    level: "moderate"
  },
  {
    question: "Can a `CREATE VIEW` statement contain a `LIMIT` clause?",
    shortAnswer: "YES, views can specify a `LIMIT` clause to restrict the maximum number of rows returned by default.",
    explanation: "LIMIT in a view truncates output before returning rows to the calling session.",
    hint: "Yes, LIMIT is permitted inside view definitions.",
    level: "basic"
  },
  {
    question: "What happens if you run `DROP TABLE view_name;` on a database view?",
    shortAnswer: "Error 1051: `Unknown table 'database.view_name'`. You must explicitly use `DROP VIEW`.",
    explanation: "MySQL prevents accidental deletion of views using DROP TABLE and vice-versa.",
    hint: "Fails with an error; you must use DROP VIEW instead of DROP TABLE.",
    level: "moderate"
  },
  {
    question: "What is the best practice when updating view definitions in a continuous deployment (CI/CD) pipeline?",
    shortAnswer: "Store view definitions in version-controlled `.sql` files using `CREATE OR REPLACE VIEW` and execute them during automated migration runs.",
    explanation: "CREATE OR REPLACE VIEW ensures repeatable, idempotent deployments without manual drop-and-recreate downtime.",
    hint: "Use version-controlled .sql scripts containing CREATE OR REPLACE VIEW.",
    level: "expert"
  }
];

export default questions;
