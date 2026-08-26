// topic8_files/topic8_questions.js
// Topic 8: MySQL 8.0 Roles – Creating Roles, Granting Privileges to Roles, Assigning Roles to Users, Activating Default Roles

const questions = [
  {
    question: "What is a Role in MySQL 8.0, and what major administrative advantage does it provide?",
    shortAnswer: "A role is a named collection of privileges; it allows centralized permission management, eliminating privilege drift and the need to grant dozens of individual permissions to separate user accounts.",
    explanation: "Prior to MySQL 8.0, DBAs had to manually grant identical privileges to every single user account. With MySQL 8.0 Roles, permissions are granted once to a role, and users are assigned the role. Updating the role instantly updates effective permissions for all assigned members.",
    hint: "Think of a named security container that groups privileges together.",
    level: "basic",
    codeExample: `CREATE ROLE 'app_read_only';
GRANT SELECT ON kolkata_retail.* TO 'app_read_only';
GRANT 'app_read_only' TO 'mamata'@'192.168.1.%', 'susmita'@'192.168.1.%';`
  },
  {
    question: "What are the 4 fundamental steps to implement a working Role in MySQL 8.0?",
    shortAnswer: "1. `CREATE ROLE`, 2. `GRANT privileges TO role`, 3. `GRANT role TO user`, and 4. `SET DEFAULT ROLE role TO user`.",
    explanation: "Step 1 provisions the role object. Step 2 assigns database capabilities to the role. Step 3 binds the role to user accounts. Step 4 activates the role automatically on login so users do not receive 'command denied' errors.",
    hint: "Recall: Create -> Grant Privs -> Assign to User -> Set Default Role.",
    level: "basic",
    codeExample: `-- Step 1: Create
CREATE ROLE 'finance_editor';
-- Step 2: Grant privs to role
GRANT SELECT, INSERT, UPDATE ON kolkata_finance.* TO 'finance_editor';
-- Step 3: Assign to user
GRANT 'finance_editor' TO 'debangshu'@'localhost';
-- Step 4: Set default role
SET DEFAULT ROLE 'finance_editor' TO 'debangshu'@'localhost';`
  },
  {
    question: "Why do newly assigned roles appear to have no effect when a user logs in for the first time?",
    shortAnswer: "Because by default, assigned roles are INACTIVE upon login unless configured as default roles or activated via `SET ROLE`.",
    explanation: "When a user connects, MySQL starts the session with only direct privileges enabled. Assigned roles remain dormant until the user executes `SET ROLE ALL` or an administrator configures `SET DEFAULT ROLE ALL TO 'user'@'host'`.",
    hint: "Assigned roles start in an inactive dormant state by default.",
    level: "intermediate",
    codeExample: `-- User logs in and queries:
-- SELECT * FROM orders; -> ERROR 1142 (command denied)
-- Solution in session:
SET ROLE ALL;`
  },
  {
    question: "What SQL statement configures an account so that ALL assigned roles activate automatically upon every connection?",
    shortAnswer: "`SET DEFAULT ROLE ALL TO 'username'@'host';`",
    explanation: "This command writes an entry into `mysql.default_roles`, instructing the server to automatically activate every assigned role in the user's graph as soon as the client handshake completes.",
    hint: "Use SET DEFAULT ROLE ALL TO 'user'@'host'.",
    level: "basic",
    codeExample: `SET DEFAULT ROLE ALL TO 'mamata'@'192.168.1.%';`
  },
  {
    question: "What global system variable makes ALL assigned roles automatically active for all users across the entire MySQL server?",
    shortAnswer: "`activate_all_roles_on_login` (set to `ON`).",
    explanation: "When `SET PERSIST activate_all_roles_on_login = ON;` is configured, MySQL automatically activates all assigned roles for every user upon connection, eliminating the need to run `SET DEFAULT ROLE` for each account.",
    hint: "Look at the activate_all_roles_on_login system variable.",
    level: "intermediate",
    codeExample: `SET PERSIST activate_all_roles_on_login = ON;`
  },
  {
    question: "How can a user inspect which roles are currently active in their active session?",
    shortAnswer: "Execute `SELECT CURRENT_ROLE();`.",
    explanation: "The `CURRENT_ROLE()` function returns a comma-separated list of active roles (e.g. `'finance_reader'@'%','audit_role'@'%'`) or `'NONE'` if no roles are active.",
    hint: "Call the CURRENT_ROLE() SQL function.",
    level: "basic",
    codeExample: `SELECT CURRENT_ROLE();
-- Output: \`finance_reader\`@\`%\``
  },
  {
    question: "How does a user switch or deactivate active roles in their current session?",
    shortAnswer: "Using `SET ROLE ALL`, `SET ROLE 'role_name'`, `SET ROLE ALL EXCEPT 'role_name'`, or `SET ROLE NONE`.",
    explanation: "The `SET ROLE` statement provides dynamic runtime control over the session's security context. `SET ROLE NONE` drops all role privileges, temporarily restricting the session to baseline direct privileges.",
    hint: "Use SET ROLE with ALL, NONE, or specific role names.",
    level: "intermediate",
    codeExample: `-- Activate only audit role:
SET ROLE 'audit_role';

-- Temporarily drop all role privileges:
SET ROLE NONE;`
  },
  {
    question: "How does Role Inheritance work in MySQL 8.0?",
    shortAnswer: "A role can be granted to another role using `GRANT 'sub_role' TO 'parent_role';`, forming a directed acyclic privilege graph.",
    explanation: "Hierarchical role trees allow building composite roles. For example, a `developer_role` can inherit from `reader_role`, and a `lead_role` can inherit from `developer_role`. Any user assigned `lead_role` automatically receives permissions from all 3 tiers.",
    hint: "Grant child roles directly to parent roles to build inheritance trees.",
    level: "intermediate",
    codeExample: `CREATE ROLE 'reader_role', 'editor_role', 'admin_role';
GRANT SELECT ON app_db.* TO 'reader_role';
GRANT 'reader_role' TO 'editor_role';
GRANT INSERT, UPDATE, DELETE ON app_db.* TO 'editor_role';
GRANT 'editor_role' TO 'admin_role';
GRANT ALL PRIVILEGES ON app_db.* TO 'admin_role';`
  },
  {
    question: "How are Roles physically represented inside the `mysql.user` system table?",
    shortAnswer: "Roles are represented as user accounts with `account_locked = 'Y'` and empty authentication strings.",
    explanation: "Under the hood in MySQL 8.0, a role is stored as a row in `mysql.user`. Because roles cannot directly log into the database over TCP, their `account_locked` flag is permanently set to `'Y'`.",
    hint: "Roles are stored as locked user accounts in mysql.user.",
    level: "expert",
    codeExample: `SELECT User, Host, account_locked, plugin 
FROM mysql.user 
WHERE User = 'finance_reader';
-- Returns: account_locked = 'Y'`
  },
  {
    question: "Which system table stores the role assignment relationships and edges between users and roles in MySQL 8.0?",
    shortAnswer: "`mysql.role_edges`.",
    explanation: "The `mysql.role_edges` table records directed edges with columns: `FROM_HOST`, `FROM_USER` (the role), `TO_HOST`, `TO_USER` (the grantee user or parent role), and `WITH_ADMIN_OPTION`.",
    hint: "Inspect the mysql.role_edges table.",
    level: "intermediate",
    codeExample: `SELECT FROM_USER AS Role_Name, TO_USER AS Assigned_User, WITH_ADMIN_OPTION 
FROM mysql.role_edges;`
  },
  {
    question: "In Mamata & Susmita's Barrackpore retail store, 20 store cashiers needed identical access to the POS system. How did MySQL 8.0 Roles simplify this?",
    shortAnswer: "Mamata created a single `cashier_role`, granted `SELECT` and `INSERT` on `pos_orders` to the role, and assigned the role to all 20 cashiers.",
    explanation: "When a new `discounts` table was added to the POS system, Mamata executed a single statement: `GRANT SELECT ON discounts TO 'cashier_role';`. All 20 cashier accounts instantly gained access without executing 20 separate GRANT statements.",
    hint: "Centralize cashier permissions into one role; update once to propagate everywhere.",
    level: "moderate",
    codeExample: `-- Barrackpore Retail Role Setup:
CREATE ROLE 'barrackpore_cashier';
GRANT SELECT, INSERT ON store_pos.orders TO 'barrackpore_cashier';
GRANT SELECT ON store_pos.inventory TO 'barrackpore_cashier';
GRANT 'barrackpore_cashier' TO 'cashier1'@'192.168.1.%', 'cashier2'@'192.168.1.%';
SET DEFAULT ROLE ALL TO 'cashier1'@'192.168.1.%', 'cashier2'@'192.168.1.%';`
  },
  {
    question: "In Abhronila & Debangshu's Kolkata fintech bank, how did they use Role Inheritance across Junior, Senior, and Lead banking engineers managing ₹100 Crore ledgers?",
    shortAnswer: "They built a 3-tier hierarchy: `junior_analyst_role` (read-only) -> `senior_analyst_role` (inherits junior + execute procedures) -> `lead_dba_role` (inherits senior + DDL).",
    explanation: "By structuring roles hierarchically, privileges were managed modularly without duplicate grants. When reporting requirements changed, updating the base `junior_analyst_role` automatically propagated up to seniors and leads.",
    hint: "Nest roles using multi-tiered inheritance.",
    level: "expert",
    codeExample: `-- Kolkata Fintech Role Hierarchy:
CREATE ROLE 'junior_analyst', 'senior_analyst', 'lead_fintech_dba';
GRANT SELECT ON kolkata_bank.ledger TO 'junior_analyst';
GRANT 'junior_analyst' TO 'senior_analyst';
GRANT EXECUTE ON PROCEDURE kolkata_bank.sp_reconcile TO 'senior_analyst';
GRANT 'senior_analyst' TO 'lead_fintech_dba';
GRANT ALL PRIVILEGES ON kolkata_bank.* TO 'lead_fintech_dba';`
  },
  {
    question: "What is the `WITH ADMIN OPTION` clause when assigning roles in MySQL 8.0?",
    shortAnswer: "It allows the user to grant or revoke that specific role to other users without holding global `ROLE_ADMIN` privileges.",
    explanation: "Syntax: `GRANT 'finance_reader' TO 'mamata'@'%' WITH ADMIN OPTION;`. Mamata can now assign or remove the `finance_reader` role for her department colleagues.",
    hint: "Similar to WITH GRANT OPTION, but specifically for delegating role assignment.",
    level: "intermediate",
    codeExample: `GRANT 'dev_team_role' TO 'team_lead'@'10.0.%.%' WITH ADMIN OPTION;`
  },
  {
    question: "What is the `ROLE_ADMIN` dynamic privilege in MySQL 8.0?",
    shortAnswer: "A dynamic privilege that grants server-wide administrative authority to create, alter, drop, grant, and revoke any role.",
    explanation: "Allows security administrators to manage RBAC models across the company without needing root `SUPER` or data `SELECT` privileges.",
    hint: "Global administrative privilege for managing RBAC roles.",
    level: "intermediate",
    codeExample: `GRANT ROLE_ADMIN ON *.* TO 'security_lead'@'localhost';`
  },
  {
    question: "What system variable specifies mandatory roles that are automatically assigned and activated for EVERY connecting user on the server?",
    shortAnswer: "`mandatory_roles`.",
    explanation: "Configured in `my.cnf` as `mandatory_roles = 'baseline_audit_role, public_policy_role'`, MySQL automatically attaches these roles to all accounts upon connection, ensuring baseline security policies cannot be bypassed.",
    hint: "Check the mandatory_roles system configuration variable.",
    level: "expert",
    codeExample: `-- In my.cnf:
[mysqld]
mandatory_roles='corp_compliance_role'`
  },
  {
    question: "What happens when a role is dropped using `DROP ROLE 'role_name';`?",
    shortAnswer: "The role is deleted, all edges in `mysql.role_edges` referencing that role are automatically removed, and assigned users lose the role's privileges on their next session/statement.",
    explanation: "MySQL cleans up all data dictionary references in `mysql.role_edges` and `mysql.default_roles` automatically when a role is dropped.",
    hint: "DROP ROLE removes the role and cleans up all assignment edges automatically.",
    level: "basic",
    codeExample: `DROP ROLE 'temporary_audit_role';`
  },
  {
    question: "How do you revoke a role from a user without dropping the role itself?",
    shortAnswer: "`REVOKE 'role_name' FROM 'username'@'host';`",
    explanation: "The `REVOKE` statement removes the edge between the role and the user in `mysql.role_edges`.",
    hint: "Use REVOKE role_name FROM user.",
    level: "basic",
    codeExample: `REVOKE 'finance_writer' FROM 'debangshu'@'localhost';`
  },
  {
    question: "What is the output of `ROLES_GRAPHML()` in MySQL 8.0?",
    shortAnswer: "It returns an XML-formatted GraphML string representing the entire server-wide role inheritance graph, suitable for visualization in tools like Gephi or yEd.",
    explanation: "`SELECT ROLES_GRAPHML();` outputs the full directed graph of users, roles, and edges in standard GraphML format for enterprise compliance visualization.",
    hint: "Generates an XML GraphML representation of role relationships.",
    level: "expert",
    codeExample: `SELECT ROLES_GRAPHML();`
  },
  {
    question: "Can a role be assigned privileges on specific columns of a table?",
    shortAnswer: "Yes, column-level privileges can be granted to roles using standard syntax (`GRANT SELECT (col1, col2) ON table TO 'role_name';`).",
    explanation: "Roles support all 5 privilege tiers: Global, Database, Table, Column, and Routine. Granting column privileges to a role propagates attribute-level protection to all users who activate that role.",
    hint: "Roles support column-level SELECT, INSERT, and UPDATE grants.",
    level: "intermediate",
    codeExample: `GRANT SELECT (item_id, item_name, price) ON kolkata_retail.products TO 'catalog_viewer_role';`
  },
  {
    question: "Can a user possess multiple active roles simultaneously in a single session?",
    shortAnswer: "Yes, running `SET ROLE ALL` or activating multiple default roles enables the union of privileges across all assigned roles.",
    explanation: "MySQL combines the permissions of all active roles. If `role_a` grants `SELECT` on `orders` and `role_b` grants `SELECT` on `customers`, the user can query both tables simultaneously.",
    hint: "Privileges of all active roles are combined additively in the session.",
    level: "basic",
    codeExample: `SET ROLE 'sales_reader', 'inventory_editor';
SELECT CURRENT_ROLE();
-- Returns: \`sales_reader\`@\`%\`,\`inventory_editor\`@\`%\``
  },
  {
    question: "What happens if a user executes `SET ROLE NONE;`?",
    shortAnswer: "All active roles are deactivated, leaving the session operating strictly with the direct privileges assigned to the user account.",
    explanation: "Useful for testing baseline permissions or executing statements under a restricted security profile.",
    hint: "Deactivates all active roles for the current session.",
    level: "basic",
    codeExample: `SET ROLE NONE;
SELECT CURRENT_ROLE();
-- Returns: NONE`
  },
  {
    question: "What does `SHOW GRANTS FOR 'user'@'host'` output when the user has assigned roles?",
    shortAnswer: "It outputs the direct `GRANT` statements followed by `GRANT 'role_name' TO 'user'@'host';` statements.",
    explanation: "To see the underlying permissions granted through the role, the query must be executed with `USING 'role_name'`.",
    hint: "Shows role assignment lines; use USING to expand role privileges.",
    level: "intermediate",
    codeExample: `SHOW GRANTS FOR 'mamata'@'192.168.1.%';
-- Output:
-- GRANT USAGE ON *.* TO 'mamata'@'192.168.1.%'
-- GRANT 'cashier_role' TO 'mamata'@'192.168.1.%'`
  },
  {
    question: "How do you revoke all default role settings for a user so that no roles activate automatically on login?",
    shortAnswer: "`SET DEFAULT ROLE NONE TO 'username'@'host';`",
    explanation: "This removes all rows for that user in `mysql.default_roles`, forcing the user to manually execute `SET ROLE` in each session.",
    hint: "Use SET DEFAULT ROLE NONE TO user.",
    level: "basic",
    codeExample: `SET DEFAULT ROLE NONE TO 'contractor_dev'@'localhost';`
  },
  {
    question: "What error occurs if an anonymous user or a non-existent role is referenced in `GRANT 'role' TO user`?",
    shortAnswer: "`ERROR 3605 (HY000): Unknown authorization ID \`role_name\`@\`%\``.",
    explanation: "MySQL validates that the role exists in `mysql.user` before creating an edge in `mysql.role_edges`.",
    hint: "Error 3605 indicates an invalid or non-existent role name.",
    level: "intermediate",
    codeExample: `-- Attempting to grant non-existent role throws:
-- ERROR 3605 (HY000): Unknown authorization ID \`fake_role\`@\`%\``
  },
  {
    question: "Can roles be created with specific hostnames (e.g. `'finance_role'@'10.0.%.%'`)?",
    shortAnswer: "Yes, but by default if the host part is omitted, MySQL automatically assigns `%` as the host (e.g. `'finance_role'@'%'`).",
    explanation: "Standard practice is to create roles with default `%` host matching so they can be assigned to users connecting from any network segment.",
    hint: "Omitted host in CREATE ROLE defaults to '%'.",
    level: "intermediate",
    codeExample: `CREATE ROLE 'global_bi_role';
-- Stored in mysql.user as: 'global_bi_role'@'%'`
  },
  {
    question: "How does role-based access control (RBAC) improve compliance audits for SOC 2 and HIPAA?",
    shortAnswer: "It enforces clear separation of duties (SoD), prevents ad-hoc permission granting, and provides standardized job-function role profiles that auditors can verify instantly.",
    explanation: "Auditors can evaluate a single role definition (`finance_auditor`) rather than auditing 200 individual employee grant configurations, proving consistent least-privilege enforcement.",
    hint: "Standardizes access profiles and provides simple proof of separation of duties.",
    level: "expert",
    codeExample: `-- Auditing single role definition covers all 50 staff members:
SHOW GRANTS FOR 'hipaa_compliance_role';`
  },
  {
    question: "Can a user assigned a role modify the privileges granted to that role?",
    shortAnswer: "No, only users holding `ROLE_ADMIN` or users granted the role `WITH ADMIN OPTION` can modify or reassign role memberships.",
    explanation: "Role definitions remain protected from tampering by standard users who merely possess membership in the role.",
    hint: "Standard role members cannot modify role privilege definitions.",
    level: "basic",
    codeExample: `-- Standard member cannot alter role privileges without administrative rights.`
  },
  {
    question: "What is the recommended design pattern for creating Application Service Account roles?",
    shortAnswer: "Create functional service roles (e.g. `order_svc_role`, `payment_svc_role`), grant minimal required DML/Routine rights to the role, assign to service accounts, and set as default role.",
    explanation: "Allows microservice credentials to be rotated or scaled across Kubernetes namespaces without re-engineering database authorization rules.",
    hint: "Map microservice functionalities to dedicated functional roles.",
    level: "intermediate",
    codeExample: `CREATE ROLE 'order_microservice_role';
GRANT SELECT, INSERT, UPDATE ON orders_db.* TO 'order_microservice_role';
GRANT 'order_microservice_role' TO 'k8s_order_pod'@'10.244.%.%';
SET DEFAULT ROLE ALL TO 'k8s_order_pod'@'10.244.%.%';`
  },
  {
    question: "What query lists all users currently assigned to a specific role?",
    shortAnswer: "Query `SELECT TO_USER, TO_HOST FROM mysql.role_edges WHERE FROM_USER = 'role_name';`.",
    explanation: "Filtering `mysql.role_edges` by `FROM_USER` provides a complete membership list for that role.",
    hint: "Query mysql.role_edges filtering by FROM_USER.",
    level: "intermediate",
    codeExample: `SELECT TO_USER, TO_HOST, WITH_ADMIN_OPTION 
FROM mysql.role_edges 
WHERE FROM_USER = 'barrackpore_cashier';`
  },
  {
    question: "What is the primary operational takeaway of Topic 8 in Module 004_003?",
    shortAnswer: "MySQL 8.0 Roles provide modern, enterprise-grade Role-Based Access Control (RBAC): remember the 4-step lifecycle (Create -> Grant -> Assign -> Set Default Role) and structure modular role inheritance hierarchies.",
    explanation: "Adopting Roles eliminates administrative overhead and security vulnerabilities. By centralizing permissions into role graphs and automating role activation via `SET DEFAULT ROLE ALL` or `activate_all_roles_on_login`, database operations remain clean, secure, and compliant.",
    hint: "Summarize RBAC lifecycle, role inheritance, and automatic activation.",
    level: "basic",
    codeExample: `-- Master RBAC Deployment Pattern:
CREATE ROLE 'retail_analyst';
GRANT SELECT ON kolkata_retail.* TO 'retail_analyst';
GRANT 'retail_analyst' TO 'susmita'@'192.168.1.%';
SET DEFAULT ROLE ALL TO 'susmita'@'192.168.1.%';`
  }
];

export default questions;
