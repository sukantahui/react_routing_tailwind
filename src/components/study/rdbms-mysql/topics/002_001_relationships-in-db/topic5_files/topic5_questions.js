// topic5_files/topic5_questions.js

const questions = [
  {
    question: "What is a Self-Referencing (Recursive) Relationship in relational database design?",
    shortAnswer: "A relationship where a Foreign Key column in a table references the Primary Key of the SAME table.",
    explanation: "Used to model hierarchies, organizational charts, nested categories, and threaded discussion trees.",
    hint: "Foreign key referencing own table primary key.",
    level: "basic",
    codeExample: "CONSTRAINT fk_emp_mgr FOREIGN KEY (manager_id) REFERENCES employees(emp_id)"
  },
  {
    question: "Why MUST the self-referencing foreign key column (e.g. `manager_id`) be nullable (`NULL`) in an organizational schema?",
    shortAnswer: "Because the top-level root node of the tree (e.g. the CEO) has no manager; making it `NOT NULL` causes an impossible insert deadlock where no root record can ever be created.",
    explanation: "Tree roots require NULL parent pointers.",
    hint: "CEO/Root node has no parent.",
    level: "basic"
  },
  {
    question: "Why does an `INNER JOIN` fail when querying an employee table with its self-referencing manager?",
    shortAnswer: "Because `INNER JOIN` requires a match on `e.manager_id = m.emp_id`; since the CEO has `manager_id = NULL`, the CEO is silently filtered out of the query results.",
    explanation: "Always use `LEFT JOIN` on self-referencing joins to preserve the root node.",
    hint: "INNER JOIN excludes the root NULL node.",
    level: "basic",
    codeExample: "SELECT e.first_name, m.first_name AS manager\nFROM employees e\nLEFT JOIN employees m ON e.manager_id = m.emp_id;"
  },
  {
    question: "What SQL construct is used in MySQL 8.0 to traverse a multi-tier recursive hierarchy tree of arbitrary depth?",
    shortAnswer: "`WITH RECURSIVE` Common Table Expressions (Recursive CTEs).",
    explanation: "Combines an Anchor query (root) with a Recursive query (subordinates) using `UNION ALL`.",
    hint: "WITH RECURSIVE CTE.",
    level: "moderate",
    codeExample: "WITH RECURSIVE OrgTree AS (\n    SELECT emp_id, first_name, manager_id, 1 AS lvl FROM employees WHERE manager_id IS NULL\n    UNION ALL\n    SELECT e.emp_id, e.first_name, e.manager_id, o.lvl + 1 FROM employees e JOIN OrgTree o ON e.manager_id = o.emp_id\n)\nSELECT * FROM OrgTree;"
  },
  {
    question: "What is an 'Anchor Member' in a Recursive Common Table Expression?",
    shortAnswer: "The initial non-recursive SELECT statement in a CTE that returns the base starting rows (e.g. the top-level root node with `manager_id IS NULL`).",
    explanation: "Establishes the base result set from which recursion begins.",
    hint: "Initial starting query of recursive CTE.",
    level: "moderate"
  },
  {
    question: "What is the 'Recursive Member' in a Recursive CTE?",
    shortAnswer: "The secondary SELECT statement that references the CTE itself to fetch the next sequential level of child records iteratively until no rows are returned.",
    explanation: "Loops through child nodes level-by-level.",
    hint: "Iterative child query referencing the CTE.",
    level: "moderate"
  },
  {
    question: "How does `ON DELETE SET NULL` protect organizational employee hierarchies when a manager leaves the company?",
    shortAnswer: "Deleting a manager sets all their direct subordinates' `manager_id` to `NULL`, preserving all subordinate employee records instead of deleting them.",
    explanation: "Allows subordinates to remain in the company while awaiting a new manager assignment.",
    hint: "Sets subordinates' manager_id to NULL upon manager deletion.",
    level: "moderate"
  },
  {
    question: "When should `ON DELETE CASCADE` be used in a self-referencing relationship?",
    shortAnswer: "In strict hierarchical composition trees (e.g. deleting a parent Category should automatically delete all its subcategories and nested child categories).",
    explanation: "Subcategories cannot logically exist without their parent category.",
    hint: "Strict composition tree deletion.",
    level: "moderate",
    codeExample: "CONSTRAINT fk_cat_parent FOREIGN KEY (parent_id)\nREFERENCES categories(category_id) ON DELETE CASCADE"
  },
  {
    question: "What is a 'Cyclic Graph Deadlock' (Cycle) in self-referencing relationships?",
    shortAnswer: "A logical anomaly where Employee A manages Employee B, Employee B manages Employee C, and Employee C is assigned to manage Employee A, creating an infinite loop.",
    explanation: "Breaks tree invariants; requires validation triggers or cycle detection.",
    hint: "Circular reporting loop.",
    level: "expert"
  },
  {
    question: "How do you detect and prevent infinite recursion loops in MySQL 8.0 Recursive CTEs?",
    shortAnswer: "By using the `cte_max_recursion_depth` system variable (default 1000) or tracking an array/string path of visited IDs in the CTE.",
    explanation: "Aborts infinite recursion if depth exceeds threshold.",
    hint: "cte_max_recursion_depth system variable.",
    level: "expert"
  },
  {
    question: "How do you generate a breadcrumb path (e.g. 'Electronics > Laptops > Gaming Laptops') in a category tree using SQL?",
    shortAnswer: "Using a Recursive CTE with string concatenation: `CONCAT(parent.path, ' > ', child.name)`.",
    explanation: "Builds full hierarchical breadcrumb trails dynamically.",
    hint: "CONCAT breadcrumb trail in recursive CTE.",
    level: "expert",
    codeExample: "SELECT category_id, CONCAT(o.path, ' > ', c.category_name) AS full_path\nFROM categories c JOIN OrgTree o ON c.parent_category_id = o.category_id"
  },
  {
    question: "How do you find all employees who are 'Individual Contributors' (have ZERO direct reports)?",
    shortAnswer: "Using an anti-join: `SELECT e.* FROM employees e LEFT JOIN employees sub ON e.emp_id = sub.manager_id WHERE sub.emp_id IS NULL;`.",
    explanation: "Finds employees whose IDs never appear in any other row's `manager_id` column.",
    hint: "LEFT JOIN WHERE subordinate.emp_id IS NULL.",
    level: "moderate",
    codeExample: "SELECT e.first_name, e.job_title\nFROM employees e\nLEFT JOIN employees sub ON e.emp_id = sub.manager_id\nWHERE sub.emp_id IS NULL;"
  },
  {
    question: "How do you find all 'Managers' (employees who have at least one direct report)?",
    shortAnswer: "`SELECT DISTINCT m.* FROM employees e JOIN employees m ON e.manager_id = m.emp_id;` (or `WHERE emp_id IN (SELECT manager_id FROM employees WHERE manager_id IS NOT NULL)`).",
    explanation: "Filters to employees whose IDs are referenced by subordinates.",
    hint: "DISTINCT managers query.",
    level: "basic"
  },
  {
    question: "How do you count the number of direct subordinates for each manager?",
    shortAnswer: "`SELECT m.first_name, COUNT(e.emp_id) AS direct_reports FROM employees m JOIN employees e ON m.emp_id = e.manager_id GROUP BY m.emp_id, m.first_name;`.",
    explanation: "Groups by manager and counts direct subordinate rows.",
    hint: "GROUP BY manager and COUNT(employee_id).",
    level: "basic"
  },
  {
    question: "Can a self-referencing relationship be Many-to-Many (M:N)?",
    shortAnswer: "Yes (e.g. `user_friends` or `part_assemblies`), which is implemented using a dedicated self-referencing junction table with two foreign keys pointing to the same master table.",
    explanation: "Decomposes recursive M:N graphs (e.g. Bill of Materials).",
    hint: "Self-referencing junction table.",
    level: "expert"
  },
  {
    question: "In Crow's Foot notation, how is a Self-Referencing relationship depicted visually?",
    shortAnswer: "As a 'pig ear' loop line that originates from the entity box and curves back around to terminate on the SAME entity box.",
    explanation: "Visual standard for recursive relationships.",
    hint: "Curved loop line back to same entity.",
    level: "basic"
  },
  {
    question: "What is the Adjacency List Model for hierarchical data?",
    shortAnswer: "The classic relational design where each row stores a single `parent_id` foreign key referencing its direct parent row in the same table.",
    explanation: "The simplest and most intuitive hierarchical modeling pattern.",
    hint: "Parent ID column in each row.",
    level: "moderate"
  },
  {
    question: "What are alternative hierarchical design patterns to the Adjacency List Model?",
    shortAnswer: "1) Nested Sets (Modified Preorder Tree Traversal), 2) Path Enumeration / Materialized Path (e.g. storing `'1/4/12'`), 3) Closure Tables.",
    explanation: "Closure tables store all transitive ancestor-descendant pairs in a dedicated table.",
    hint: "Nested Sets, Materialized Path, Closure Tables.",
    level: "expert"
  },
  {
    question: "How do you find the immediate manager of 'Susmita Ghosh' (Employee #103)?",
    shortAnswer: "`SELECT m.first_name, m.job_title FROM employees e JOIN employees m ON e.manager_id = m.emp_id WHERE e.emp_id = 103;`.",
    explanation: "Simple self-join indexed on Primary Key.",
    hint: "Join on e.manager_id = m.emp_id WHERE e.emp_id = 103.",
    level: "basic"
  },
  {
    question: "What index should be created on a self-referencing table to optimize subordinate queries?",
    shortAnswer: "A secondary B-Tree index on `(manager_id)` (or `parent_category_id`).",
    explanation: "MySQL InnoDB automatically creates this index when the foreign key constraint is declared.",
    hint: "Secondary index on foreign key parent column.",
    level: "basic"
  },
  {
    question: "How do you calculate the total salary budget managed under each manager (including direct reports)?",
    shortAnswer: "`SELECT m.first_name AS manager, SUM(e.salary) AS direct_payroll FROM employees m JOIN employees e ON m.emp_id = e.manager_id GROUP BY m.emp_id, m.first_name;`.",
    explanation: "Aggregates salaries across direct subordinate joins.",
    hint: "SUM(e.salary) GROUP BY manager.",
    level: "basic",
    codeExample: "SELECT m.first_name, SUM(e.salary) AS total_direct_salary\nFROM employees m\nJOIN employees e ON m.emp_id = e.manager_id\nGROUP BY m.emp_id, m.first_name;"
  },
  {
    question: "What happens if you attempt to insert an employee with `manager_id = 999` when no employee with `emp_id = 999` exists?",
    shortAnswer: "MySQL rejects the insert with Error 1452: 'Cannot add or update a child row: a foreign key constraint fails'.",
    explanation: "Referential integrity applies to self-referencing foreign keys identically to standard foreign keys.",
    hint: "Error 1452 foreign key failure.",
    level: "basic"
  },
  {
    question: "Can an employee be their own manager (`manager_id = emp_id`)?",
    shortAnswer: "SQL allows it unless blocked by a `CHECK (manager_id != emp_id)` constraint.",
    explanation: "Best practice is adding a CHECK constraint to prevent self-management cycles.",
    hint: "CHECK (manager_id != emp_id) constraint.",
    level: "moderate",
    codeExample: "CONSTRAINT chk_no_self_manager CHECK (manager_id != emp_id)"
  },
  {
    question: "How do you query 2 levels of management hierarchy simultaneously (Employee, Direct Manager, and Grandparent Manager)?",
    shortAnswer: "Using two sequential `LEFT JOIN` operations on the same table: `LEFT JOIN employees m ON e.manager_id = m.emp_id LEFT JOIN employees gm ON m.manager_id = gm.emp_id`.",
    explanation: "Traverses 2 hops up the management tree.",
    hint: "Two sequential LEFT JOINs.",
    level: "moderate",
    codeExample: "SELECT e.first_name AS emp, m.first_name AS mgr, gm.first_name AS director\nFROM employees e\nLEFT JOIN employees m ON e.manager_id = m.emp_id\nLEFT JOIN employees gm ON m.manager_id = gm.emp_id;"
  },
  {
    question: "What happens when you update an employee's `emp_id` when the foreign key has `ON UPDATE CASCADE`?",
    shortAnswer: "All direct subordinates who report to that employee have their `manager_id` automatically updated to the new ID.",
    explanation: "Propagates key updates down the tree.",
    hint: "Automatically cascades manager ID updates.",
    level: "moderate"
  },
  {
    question: "How do you find the root ancestor (CEO) of a deep tree hierarchy in a single query?",
    shortAnswer: "`SELECT * FROM employees WHERE manager_id IS NULL;`.",
    explanation: "Root nodes have no parent references.",
    hint: "WHERE manager_id IS NULL.",
    level: "basic"
  },
  {
    question: "Can a self-referencing table have multiple root nodes (Forest of Trees)?",
    shortAnswer: "Yes, having multiple rows with `manager_id IS NULL` creates multiple independent tree hierarchies (a forest) within the same table.",
    explanation: "Common for multi-tenant or multi-division schemas.",
    hint: "Multiple NULL roots form a forest.",
    level: "moderate"
  },
  {
    question: "Why is the Closure Table pattern preferred over Adjacency List for extremely deep trees with frequent subtree queries?",
    shortAnswer: "Closure tables allow retrieving entire subtrees (all descendants at any depth) in a single non-recursive `JOIN` query without recursive CTE iteration.",
    explanation: "Pre-computes and indexes all ancestor-descendant paths.",
    hint: "Single non-recursive query for entire subtrees.",
    level: "expert"
  },
  {
    question: "What is the maximum tree depth recommended for the Adjacency List model with MySQL 8.0 Recursive CTEs?",
    shortAnswer: "Up to thousands of levels (governed by memory and `cte_max_recursion_depth`), though enterprise business org charts rarely exceed 10-15 levels.",
    explanation: "Handles deep corporate and taxonomy trees effortlessly.",
    hint: "Easily handles standard 10-15 depth hierarchies.",
    level: "basic"
  },
  {
    question: "What is the recommended checklist for implementing self-referencing relationships in MySQL schemas?",
    shortAnswer: "1) Define the foreign key column as `INT NULL` to allow root nodes. 2) Add a `CHECK (parent_id != id)` constraint to prevent immediate self-cycles. 3) Use `LEFT JOIN` on self-joins so root records are not filtered out. 4) Use `ON DELETE SET NULL` for staff org charts. 5) Use `WITH RECURSIVE` CTEs for multi-tier tree traversals.",
    explanation: "Following these 5 rules guarantees pristine recursive tree schemas without deadlocks or query bugs.",
    hint: "Nullable FK, Self-cycle check, LEFT JOIN, SET NULL for orgs, WITH RECURSIVE CTEs.",
    level: "basic"
  }
];

export default questions;
