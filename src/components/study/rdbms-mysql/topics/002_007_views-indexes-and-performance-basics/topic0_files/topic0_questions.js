// topic0_files/topic0_questions.js

const questions = [
  {
    question: "What is a database view in SQL?",
    shortAnswer: "A database view is a virtual table defined by an underlying stored SQL `SELECT` statement; it does not store physical data rows on disk.",
    explanation: "A view holds query metadata in the database data dictionary and dynamically retrieves data from base tables whenever queried.",
    hint: "It is a virtual table defined by a SELECT query that stores no physical data.",
    level: "basic"
  },
  {
    question: "Does creating a standard SQL view consume physical table storage space on the hard drive?",
    shortAnswer: "NO. A standard view stores only its SQL query definition (metadata) in the data dictionary, consuming zero data page storage.",
    explanation: "Base tables store the actual rows/bytes; standard views are pure logical abstractions.",
    hint: "Only stores metadata; consumes zero physical row data storage.",
    level: "basic"
  },
  {
    question: "How does a database engine process a query executed against a view (e.g. `SELECT * FROM student_view WHERE city = 'Barrackpore'`)?",
    shortAnswer: "The query optimizer merges the outer query's filters with the view's internal `SELECT` definition and executes the combined query against the underlying base tables.",
    explanation: "This process is known as View Merging or View Expansion in relational query planners.",
    hint: "It merges the outer WHERE clause with the view's internal SELECT definition.",
    level: "basic"
  },
  {
    question: "What is the primary security advantage of using database views?",
    shortAnswer: "Views provide column-level masking and row-level filtering, allowing administrators to grant users access to specific subsets of data without exposing sensitive columns (like passwords or financial balances).",
    explanation: "Database users can be granted SELECT permission on the view while permissions on the base tables remain completely revoked.",
    hint: "Enables column masking and row filtering to restrict access to sensitive base table data.",
    level: "basic"
  },
  {
    question: "What is Logical Data Independence, and how do views facilitate it?",
    shortAnswer: "It is the ability to change the physical or logical structure of base tables (such as splitting or renaming columns) without breaking external client applications, because views preserve the expected legacy interface.",
    explanation: "If a base table changes, updating the view definition keeps client queries functioning without modifying application source code.",
    hint: "Protects frontend applications from breaking when underlying table schemas are refactored.",
    level: "moderate"
  },
  {
    question: "What is the difference between a standard Virtual View and a Materialized View?",
    shortAnswer: "A standard view re-executes its underlying query dynamically on every invocation, whereas a materialized view physically stores the computed query results on disk and must be refreshed periodically.",
    explanation: "Materialized views provide fast read access for expensive analytical queries at the expense of storage and data freshness.",
    hint: "Standard views compute dynamically on-demand; materialized views cache precomputed results on disk.",
    level: "moderate"
  },
  {
    question: "Does MySQL natively support `CREATE MATERIALIZED VIEW` out-of-the-box?",
    shortAnswer: "NO. Standard MySQL Community Server does not support native materialized views; developers emulate them using summary cache tables, triggers, or event schedules.",
    explanation: "RDBMS engines like Oracle and PostgreSQL offer native materialized views, while MySQL requires explicit cache table emulation.",
    hint: "No; MySQL requires manual emulation via cache tables and triggers.",
    level: "moderate"
  },
  {
    question: "Why is the statement 'Creating a view will make my complex query run faster' a common misconception?",
    shortAnswer: "Because a standard view does not cache results; querying the view executes the same underlying query execution plan as running the raw SQL directly.",
    explanation: "Views provide query simplification and security, not automated performance indexing or query result caching.",
    hint: "Views do not cache data; they execute the underlying query every time.",
    level: "basic"
  },
  {
    question: "How do you grant a user permission to query a view while blocking them from the raw base table?",
    shortAnswer: "`GRANT SELECT ON database_name.view_name TO 'username'@'host';` (and do not grant permissions on the base tables).",
    explanation: "MySQL permissions can be assigned granularly per database object (table, view, routine).",
    hint: "Grant SELECT only on the view object, omitting base table grants.",
    level: "moderate"
  },
  {
    question: "How can a view be used to implement row-level security for a regional branch in West Bengal?",
    shortAnswer: "Create a view with a hardcoded `WHERE centre_city = 'Barrackpore'` clause and grant the Barrackpore branch coordinator access to that view exclusively.",
    explanation: "The WHERE clause inside the view acts as an impenetrable boundary for users querying only that view.",
    hint: "Include a WHERE condition on the branch location in the view definition.",
    level: "basic"
  },
  {
    question: "What is the risk of 'View Stacking' (creating views on top of views on top of views)?",
    shortAnswer: "It makes query execution plans complex, hinders query optimizer indexing choices, introduces hidden join overhead, and makes debugging query bottlenecks difficult.",
    explanation: "Deep nesting obscures physical table access paths and can lead to severe performance degradation.",
    hint: "Deep view nesting makes execution plans opaque and impedes optimizer index selection.",
    level: "expert"
  },
  {
    question: "Can a database view contain aggregate functions and `GROUP BY` clauses?",
    shortAnswer: "YES. Views can encapsulate grouping and aggregations (e.g. `SUM`, `COUNT`, `AVG`) to provide pre-packaged statistical summaries.",
    explanation: "Aggregated views are commonly used for executive dashboards and reporting pipelines.",
    hint: "Yes; views can freely contain GROUP BY, SUM, COUNT, and AVG.",
    level: "basic"
  },
  {
    question: "Can you perform `INSERT`, `UPDATE`, or `DELETE` operations on any arbitrary SQL view?",
    shortAnswer: "NO. Only 'Updatable Views' (views with a 1-to-1 relationship to a single base table without aggregations, DISTINCT, UNION, or complex joins) allow DML operations.",
    explanation: "The database engine must be able to unambiguously map a view row back to exactly one unique row in the physical base table.",
    hint: "Only simple 1-to-1 views without aggregations or joins are directly updatable.",
    level: "moderate"
  },
  {
    question: "What command displays the SQL definition of an existing view in MySQL?",
    shortAnswer: "`SHOW CREATE VIEW view_name;`",
    explanation: "SHOW CREATE VIEW retrieves the exact CREATE VIEW statement from the MySQL information schema.",
    hint: "Use SHOW CREATE VIEW view_name.",
    level: "basic"
  },
  {
    question: "Where does MySQL store view definitions internally?",
    shortAnswer: "In the `information_schema.VIEWS` metadata catalog and internal system data dictionary tables.",
    explanation: "The data dictionary persists the character set, definer, security mode, and query body for each view.",
    hint: "Stored in information_schema.VIEWS metadata catalog.",
    level: "moderate"
  },
  {
    question: "What happens to a view if an underlying base table column is renamed or dropped without updating the view?",
    shortAnswer: "The view becomes invalid (broken), and any subsequent query referencing the view will fail with an error stating that the referenced table column does not exist.",
    explanation: "Standard views do not auto-adapt to underlying schema changes; they must be re-created or altered.",
    hint: "The view breaks and throws an error when queried.",
    level: "moderate"
  },
  {
    question: "What is the purpose of column aliases inside a `CREATE VIEW` statement?",
    shortAnswer: "Aliases rename cryptic physical column names into user-friendly business terms and assign clean identifiers to computed expressions (e.g. `fee * 0.18 AS tax_inr`).",
    explanation: "Aliases present a clean, domain-driven API surface to frontend consumers.",
    hint: "Renames physical column names and gives names to calculated expressions.",
    level: "basic"
  },
  {
    question: "How do views enforce consistent business logic across multiple applications (e.g. Mobile App, Web Portal, BI Tool)?",
    shortAnswer: "By centralizing complex calculation formulas (like GST tax, discount rules, active status filters) in the view, guaranteeing all systems read identical computed metrics.",
    explanation: "Eliminates redundant and potentially diverging SQL calculation logic across separate client applications.",
    hint: "Centralizes formulas in the database so all client apps compute metrics identically.",
    level: "moderate"
  },
  {
    question: "What is the difference between `SQL SECURITY DEFINER` and `SQL SECURITY INVOKER` in a MySQL view?",
    shortAnswer: "`DEFINER` executes the view using the permissions of the user who created it, while `INVOKER` executes the view using the permissions of the user currently querying it.",
    explanation: "DEFINER allows granting unprivileged users access to restricted data through the view without granting base table access.",
    hint: "DEFINER uses view creator's permissions; INVOKER uses current caller's permissions.",
    level: "expert"
  },
  {
    question: "How can a view be used to mask sensitive Personal Identifiable Information (PII) like phone numbers?",
    shortAnswer: "Use string functions like `CONCAT('XXXXXX', RIGHT(phone_number, 4)) AS masked_phone` in the view's `SELECT` list.",
    explanation: "The view exposes only sanitized data, keeping raw PII values hidden in the base table.",
    hint: "Transform the column in the view using string functions like CONCAT and RIGHT.",
    level: "basic"
  },
  {
    question: "Can an index be created directly on a standard virtual view in MySQL?",
    shortAnswer: "NO. Because standard views do not store physical rows on disk, indexes cannot be built on them; indexes must be created on the underlying base tables instead.",
    explanation: "Indexes require physical storage and row pointers, which standard virtual views lack.",
    hint: "No; indexes can only be created on the underlying base tables.",
    level: "expert"
  },
  {
    question: "How does the query optimizer use indexes on base tables when a query filters on a view?",
    shortAnswer: "The optimizer pushes the filter down to the base table scan (Predicate Pushdown), using the base table's B-Tree indexes to accelerate lookup.",
    explanation: "Predicate pushdown allows views to benefit directly from underlying table indexing.",
    hint: "The optimizer pushes the filter down to the base table using Predicate Pushdown.",
    level: "expert"
  },
  {
    question: "What is the Relational Algebra representation of a View that filters active students from Barrackpore and shows their names and courses?",
    shortAnswer: "$\\text{View} = \\pi_{\\text{student\\_name, course\\_title}}(\\sigma_{\\text{city} = 'Barrackpore' \\land \\text{status} = 'ACTIVE'}(\\text{Students} \\bowtie \\text{Enrollments}))$",
    explanation: "Views are formal relational projections over selected and joined relations.",
    hint: "Projection of selected and joined base relations.",
    level: "expert"
  },
  {
    question: "Can a view join tables across different databases located on the same MySQL server instance?",
    shortAnswer: "YES. You can reference tables in other databases using qualified names like `SELECT * FROM db1.students JOIN db2.payments`.",
    explanation: "MySQL allows cross-database joins within the same server instance inside view definitions.",
    hint: "Yes; use qualified database.table syntax inside the view SELECT statement.",
    level: "moderate"
  },
  {
    question: "What is the advantage of using a View instead of a Common Table Expression (CTE)?",
    shortAnswer: "A View is permanently stored in the database catalog and can be reused by any query, session, or user, while a CTE exists only for the duration of a single query statement.",
    explanation: "Views provide persistent, system-wide abstraction; CTEs provide temporary single-statement modularity.",
    hint: "Views are permanent and globally accessible; CTEs are temporary and single-statement scoped.",
    level: "moderate"
  },
  {
    question: "What is the advantage of a CTE over a View?",
    shortAnswer: "CTEs require no database permissions to create objects, support recursion for tree traversal, and avoid polluting the global schema catalog with one-off queries.",
    explanation: "CTEs are lightweight, ad-hoc, and support recursive query logic.",
    hint: "CTEs do not require DDL permissions, support recursion, and are ad-hoc.",
    level: "moderate"
  },
  {
    question: "Can a view call User-Defined Functions (UDFs) or built-in scalar functions?",
    shortAnswer: "YES. Views can incorporate any valid deterministic or non-deterministic SQL functions (e.g. `NOW()`, `DATE_FORMAT()`, `UPPER()`).",
    explanation: "Any valid SELECT expression can be packaged inside a view definition.",
    hint: "Yes; views can freely use scalar and built-in functions.",
    level: "basic"
  },
  {
    question: "Why should you avoid using `SELECT *` inside a `CREATE VIEW` statement in production?",
    shortAnswer: "Because if columns are later added, deleted, or reordered in the base table, the view may exhibit unpredictable column mappings or fail to show new columns until recompiled.",
    explanation: "Explicit column enumeration ensures deterministic schema definitions and prevents silent schema drift bugs.",
    hint: "Always explicitly specify column names instead of SELECT * to avoid schema drift bugs.",
    level: "expert"
  },
  {
    question: "How does a view help in migrating an old legacy database schema to a modern architecture?",
    shortAnswer: "By creating views with the exact names and structures of legacy tables on top of the newly designed normalized schema, legacy client apps continue working during migration.",
    explanation: "Acts as an anti-corruption adapter layer between old software and modern database designs.",
    hint: "Acts as an adapter layer mimicking old table schemas over the new database design.",
    level: "expert"
  },
  {
    question: "What is the golden rule when designing database views for high-concurrency systems?",
    shortAnswer: "Keep views lightweight and single-purpose, avoid deep view-on-view nesting, ensure underlying base table join keys are indexed, and explicitly specify needed columns.",
    explanation: "Flat, well-indexed views allow the query optimizer to perform optimal predicate pushdown and efficient index seeks.",
    hint: "Keep views flat, index base table join keys, and enumerate explicit columns.",
    level: "expert"
  }
];

export default questions;
