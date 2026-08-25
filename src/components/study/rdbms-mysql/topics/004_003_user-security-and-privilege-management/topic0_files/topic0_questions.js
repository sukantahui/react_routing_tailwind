// topic0_files/topic0_questions.js

const questions = [
  {
    question: "What are the two distinct stages of access control in MySQL's security architecture?",
    shortAnswer: "1) **Stage 1: Connection Verification (Authentication)**: Validates username, client IP/host, and password credentials.\n2) **Stage 2: Request Verification (Authorization)**: Validates whether the authenticated user has sufficient privileges to execute the specific SQL statement on the target object.",
    explanation: "Two-step gatekeeper model separating authentication from authorization.",
    hint: "Stage 1: Connection/Authentication; Stage 2: Request/Authorization.",
    level: "basic"
  },
  {
    question: "Why is a MySQL user account identified by both username and host (`'username'@'hostname'`)?",
    shortAnswer: "Because MySQL binds permissions not just to a user identity, but to the **exact network location or host from which the user connects**, allowing distinct passwords and privileges for `'mamata'@'localhost'` vs `'mamata'@'192.168.1.%'`.",
    explanation: "Fundamental account model providing granular network perimeter control.",
    hint: "MySQL binds credentials and privileges to both the username and client host.",
    level: "basic"
  },
  {
    question: "What are the 5 hierarchical tiers of privileges in MySQL?",
    shortAnswer: "1) **Global Scope** (`*.*`)\n2) **Database Scope** (`database_name.*`)\n3) **Table Scope** (`database_name.table_name`)\n4) **Column Scope** (`database_name.table_name(column_name)`)\n5) **Routine Scope** (`PROCEDURE` / `FUNCTION`)",
    explanation: "Hierarchical ACL structure from server-wide to individual field level.",
    hint: "Global -> Database -> Table -> Column -> Routine.",
    level: "basic"
  },
  {
    question: "Which system table stores Global-level privileges in MySQL?",
    shortAnswer: "**`mysql.user`**",
    explanation: "Stores user account credentials, authentication plugins, and global server-wide administrative privileges.",
    hint: "mysql.user.",
    level: "basic"
  },
  {
    question: "Which system table stores Database-level privileges (`GRANT ... ON db.*`)?",
    shortAnswer: "**`mysql.db`**",
    explanation: "Stores database-scoped permissions for each user.",
    hint: "mysql.db.",
    level: "basic"
  },
  {
    question: "Which system tables store Table, Column, and Routine-level privileges?",
    shortAnswer: "- Table: **`mysql.tables_priv`**\n- Column: **`mysql.columns_priv`**\n- Routine: **`mysql.procs_priv`**",
    explanation: "Fine-grained object-level access control tables.",
    hint: "mysql.tables_priv, mysql.columns_priv, and mysql.procs_priv.",
    level: "basic"
  },
  {
    question: "What is the common misconception regarding `FLUSH PRIVILEGES`?",
    shortAnswer: "The misconception is that `FLUSH PRIVILEGES` is required after every `GRANT` or `REVOKE` command. In reality, **`GRANT`, `REVOKE`, `CREATE USER`, and `ALTER USER` update both disk tables AND in-memory caches immediately and atomically**; `FLUSH PRIVILEGES` is only needed if you mutate `mysql.user` with direct `INSERT`/`UPDATE` SQL statements.",
    explanation: "A legacy habit from MySQL 3.23 that is completely unnecessary with standard DDL statements.",
    hint: "GRANT and REVOKE update memory caches automatically; FLUSH PRIVILEGES is not needed.",
    level: "expert"
  },
  {
    question: "How does MySQL resolve permissions when a user has both database-level and table-level privileges?",
    shortAnswer: "MySQL checks privileges hierarchically: if a privilege is granted at the **Global** or **Database** level, the user automatically has it for all underlying tables; if not granted at a higher level, MySQL checks for explicit grants at the **Table** or **Column** level.",
    explanation: "Permissions are cumulative and top-down additive.",
    hint: "Higher-level grants automatically cascade down to underlying objects.",
    level: "basic"
  },
  {
    question: "What are Dynamic Privileges in MySQL 8.0?",
    shortAnswer: "Fine-grained administrative privileges (e.g. `SYSTEM_VARIABLES_ADMIN`, `REPLICATION_SLAVE_ADMIN`, `BACKUP_ADMIN`) that can be granted individually **without giving the all-powerful `SUPER` privilege**, adhering to the Principle of Least Privilege.",
    explanation: "Introduced in MySQL 8.0 to break down the monolithic SUPER privilege.",
    hint: "Fine-grained admin privileges introduced in MySQL 8.0 to replace the monolithic SUPER privilege.",
    level: "expert"
  },
  {
    question: "What error code is returned when connection authentication fails in Stage 1?",
    shortAnswer: "**Error 1045 (28000): Access denied for user 'username'@'host' (using password: YES/NO)**",
    explanation: "Standard authentication failure error in MySQL.",
    hint: "Error 1045 (Access denied).",
    level: "basic"
  },
  {
    question: "What error code is returned when request authorization fails in Stage 2?",
    shortAnswer: "**Error 1142 (42000): command command denied to user 'username'@'host' for table 'table_name'**",
    explanation: "Standard permission authorization failure error.",
    hint: "Error 1142 (command denied to user).",
    level: "basic"
  },
  {
    question: "How does MySQL order host matches when multiple accounts match a connecting client (e.g. `'user'@'192.168.1.%'` vs `'user'@'%'`)?",
    shortAnswer: "MySQL sorts host patterns from **most specific to most general** (literal IP addresses first, followed by specific subnet masks, with wildcard `%` evaluated last).",
    explanation: "Most specific host matching rule prevents unintended wildcard matching.",
    hint: "Most specific host pattern matches first; % wildcard matches last.",
    level: "expert"
  },
  {
    question: "What is the default administrative superuser account created during MySQL installation?",
    shortAnswer: "`'root'@'localhost'`",
    explanation: "The default superuser account with unrestricted global privileges.",
    hint: "'root'@'localhost'.",
    level: "basic"
  },
  {
    question: "Why should production web applications NEVER connect using the `'root'` account?",
    shortAnswer: "Because the `'root'` account has unrestricted `DROP DATABASE`, `SHUTDOWN`, and administrative privileges; a single SQL injection or compromised credential would grant attackers **total control over the entire database server**.",
    explanation: "Violates the fundamental Principle of Least Privilege.",
    hint: "Exposes the entire database instance to catastrophic takeover via SQL injection.",
    level: "basic"
  },
  {
    question: "What is a MySQL Role in MySQL 8.0?",
    shortAnswer: "A named collection of privileges that can be granted to users (or other roles), simplifying access control administration across large development and operational teams.",
    explanation: "Role-Based Access Control (RBAC) foundation in MySQL 8.0.",
    hint: "A named collection of privileges assigned to users for RBAC.",
    level: "basic"
  },
  {
    question: "Where are role assignment relationships stored in MySQL 8.0?",
    shortAnswer: "**`mysql.role_edges`** and **`mysql.default_roles`**",
    explanation: "Stores the directed graph of role inheritances and default active roles.",
    hint: "mysql.role_edges and mysql.default_roles.",
    level: "expert"
  },
  {
    question: "What is the difference between an in-memory privilege cache and disk tables?",
    shortAnswer: "MySQL reads privilege tables into **in-memory RAM hash tables and arrays at server startup** so that every incoming SQL query verifies authorization in nanoseconds without performing disk I/O.",
    explanation: "Critical for high-performance sub-millisecond query execution.",
    hint: "RAM caching eliminates disk I/O during query authorization checks.",
    level: "expert"
  },
  {
    question: "What does the `GRANT OPTION` privilege allow a user to do?",
    shortAnswer: "It permits the user to **grant their own privileges to other users**, but only for the specific privileges and scopes that they themselves possess.",
    explanation: "Delegates privilege administration without granting full superuser access.",
    hint: "Allows granting their own privileges to other users.",
    level: "basic"
  },
  {
    question: "Can column-level privileges restrict a user to seeing only non-sensitive columns (e.g. `SELECT (id, name)` but NOT `salary`)?",
    shortAnswer: "Yes! `GRANT SELECT (id, name) ON db.employees TO 'analyst'@'%'` allows reading only specified columns, blocking queries requesting the ungranted `salary` column.",
    explanation: "Column-level ACL enforcement directly in the database engine.",
    hint: "Yes, column-level grants restrict queries to specified columns only.",
    level: "basic",
    codeExample: "GRANT SELECT (student_id, student_name, course) \nON college_db.students \nTO 'clerk'@'localhost';"
  },
  {
    question: "What is the primary architectural takeaway of Topic 0 in Module 004_003?",
    shortAnswer: "MySQL enforces a rigorous two-stage security model (Authentication at connection handshake & Authorization on every SQL request) backed by a 5-tier privilege hierarchy cached in RAM; understanding this architecture is essential for building secure, least-privilege enterprise database environments.",
    explanation: "The foundational bedrock of database security and user administration.",
    hint: "Two-stage access control and 5-tier RAM-cached privilege hierarchy form the foundation of MySQL security.",
    level: "basic"
  }
];

export default questions;
