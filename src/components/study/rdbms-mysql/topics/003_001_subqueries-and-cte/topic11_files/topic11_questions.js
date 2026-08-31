// topic11_files/topic11_questions.js

const questions = [
  {
    question: "What is the Adjacency List model for hierarchical data in relational databases?",
    shortAnswer: "A relational design pattern where each row stores a self-referencing foreign key column (e.g. `parent_id` or `manager_id`) pointing to the primary key of its parent in the same table.",
    explanation: "The standard and most intuitive model for storing tree hierarchies.",
    hint: "A table with a self-referencing foreign key pointing to its parent row in the same table.",
    level: "basic"
  },
  {
    question: "What is the difference between Top-Down and Bottom-Up hierarchical traversal?",
    shortAnswer: "Top-Down starts at the root/ancestor node and traverses downward to all children and leaves; Bottom-Up starts at a leaf/descendant node and traverses upward to its parent chain.",
    explanation: "Top-Down finds subordinates; Bottom-Up finds breadcrumbs and ancestor chains.",
    hint: "Top-Down goes from Root to Leaves; Bottom-Up goes from Leaf to Root.",
    level: "basic"
  },
  {
    question: "How do you identify the Root node(s) in an Adjacency List table?",
    shortAnswer: "Records where the parent foreign key is `NULL` (e.g. `WHERE manager_id IS NULL` or `WHERE parent_category_id IS NULL`).",
    explanation: "Root entities have no parent above them.",
    hint: "Rows where parent_id / manager_id IS NULL.",
    level: "basic"
  },
  {
    question: "Why must you use `CAST(name AS CHAR(N))` on the breadcrumb path column in the Anchor Member?",
    shortAnswer: "Because the Anchor Member fixes the column's data type and width; without an explicit `CAST()` to a large width (e.g. `CHAR(500)`), concatenating path segments in downstream iterations will silently truncate.",
    explanation: "Critical defense against silent string truncation during tree traversal.",
    hint: "Anchor column width fixes schema; CAST allocates buffer for expanding breadcrumb paths.",
    level: "expert"
  },
  {
    question: "How do you calculate tree depth/level during a recursive hierarchy traversal?",
    shortAnswer: "Set `1 AS hierarchy_level` in the Anchor Member, and increment with `hierarchy_level + 1` in the Recursive Member.",
    explanation: "Tracks the exact generational depth of each node in the tree.",
    hint: "Anchor sets level = 1; Recursive member increments with level + 1.",
    level: "basic"
  },
  {
    question: "How do you visually format an indented tree hierarchy in SQL?",
    shortAnswer: "Using string repetition: `CONCAT(REPEAT('   ', hierarchy_level - 1), node_name) AS indented_tree`.",
    explanation: "Creates visual tree indentation directly in the SQL result set.",
    hint: "CONCAT(REPEAT('   ', level - 1), node_name)",
    level: "basic"
  },
  {
    question: "How do you construct a breadcrumb navigation path (e.g. 'Electronics > Laptops > Gaming') in a recursive CTE?",
    shortAnswer: "`CONCAT(p.breadcrumb_path, ' > ', c.category_name)` in the Recursive Member.",
    explanation: "Appends the current node's name to the accumulated parent path.",
    hint: "CONCAT(parent.breadcrumb_path, ' > ', child.name)",
    level: "basic"
  },
  {
    question: "What is a Bill of Materials (BOM) in relational manufacturing and assembly databases?",
    shortAnswer: "A hierarchical representation of raw components, sub-assemblies, and finished goods specifying the exact quantity of each part required to build a product.",
    explanation: "Multi-tier component breakdown in supply chain systems.",
    hint: "A hierarchical tree of parts and sub-assemblies required to build a product.",
    level: "moderate"
  },
  {
    question: "How do you calculate total part quantities across multi-tier assembly levels in a BOM recursive CTE?",
    shortAnswer: "Multiply parent quantity by child requirement: `p.total_qty * c.quantity_per_assembly AS accumulated_qty`.",
    explanation: "Multiplies component ratios down the assembly tree.",
    hint: "Multiply parent total quantity by child quantity_per_assembly.",
    level: "expert"
  },
  {
    question: "What is a Cycle / Circular Reference hazard in hierarchical data?",
    shortAnswer: "When flawed data creates an infinite loop where a descendant points back to an ancestor as its parent ($A \\to B \\to C \\to A$), causing runaway recursion.",
    explanation: "Corrupted parent-child links that crash unconstrained recursive queries.",
    hint: "A circular loop in parent pointers that causes infinite recursive iterations.",
    level: "expert"
  },
  {
    question: "How do you implement Cycle Detection inside a Recursive CTE in MySQL 8.0?",
    shortAnswer: "Track the visited node IDs in a path string (e.g. `'/1/4/7/'`) and add a termination guard: `WHERE o.visited_path NOT LIKE CONCAT('%/', e.emp_id, '/%')`.",
    explanation: "Prevents visiting the same node twice along any single branch.",
    hint: "Guard against already-visited node IDs in the accumulated path string.",
    level: "expert"
  },
  {
    question: "How do faculty and course hierarchies for Mamata, Susmita, Abhronila, and Debangshu illustrate recursive trees?",
    shortAnswer: "By modeling an academy faculty management chart (Director Sukanta Hui → Senior Instructors → Teaching Assistants) and resolving multi-tier course prerequisite chains.",
    explanation: "Demonstrates organizational and academic prerequisite dependency resolution.",
    hint: "Faculty org charts and course prerequisite dependency chains.",
    level: "basic"
  },
  {
    question: "How do you find all prerequisites required to enroll in an advanced course using a bottom-up recursive CTE?",
    shortAnswer: "Anchor starts at the target advanced course, and the recursive member joins `prerequisite_course_id` upward until all required foundational courses are retrieved.",
    explanation: "Bottom-up traversal resolves all upstream dependencies.",
    hint: "Anchor starts at target course; recursive member traverses prerequisite_course_id upward.",
    level: "basic"
  },
  {
    question: "What index is required to optimize a Top-Down hierarchical recursive CTE on `employees`?",
    shortAnswer: "A secondary B-Tree index on `employees (manager_id, emp_id)`.",
    explanation: "Accelerates the join `e.manager_id = o.emp_id` on every recursive iteration.",
    hint: "Index on employees(manager_id, emp_id).",
    level: "expert"
  },
  {
    question: "What index is required to optimize a Bottom-Up hierarchical recursive CTE on `employees`?",
    shortAnswer: "The Primary Key index on `employees (emp_id)`.",
    explanation: "Accelerates looking up the single parent record `e.emp_id = o.manager_id`.",
    hint: "Primary Key index on employees(emp_id).",
    level: "moderate"
  },
  {
    question: "How do you filter only the Leaf nodes (employees with no subordinates) from a recursive CTE?",
    shortAnswer: "`WHERE e.emp_id NOT IN (SELECT manager_id FROM employees WHERE manager_id IS NOT NULL)` or using `NOT EXISTS`.",
    explanation: "Leaves have no child records referencing them as parent.",
    hint: "Nodes that do not appear as a manager_id in any other row.",
    level: "moderate"
  },
  {
    question: "Can a recursive CTE traverse trees with multiple roots (Forest / Disjoint Trees)?",
    shortAnswer: "YES; if the Anchor Member selects `WHERE parent_id IS NULL`, it will seed ALL root nodes simultaneously and traverse each tree in parallel.",
    explanation: "Handles multi-root forests in a single unified execution.",
    hint: "Yes, Anchor seeds all root nodes where parent_id IS NULL simultaneously.",
    level: "basic"
  },
  {
    question: "How do you calculate the total headcount of all direct and indirect subordinates under each department head?",
    shortAnswer: "Traverse subordinates with a top-down recursive CTE, and apply `COUNT(*) - 1` grouped by the root manager ID.",
    explanation: "Aggregates complete tree branches.",
    hint: "Traverse tree with recursive CTE and COUNT(*) grouped by root manager.",
    level: "expert"
  },
  {
    question: "What is the Nested Set Model vs the Adjacency List Model?",
    shortAnswer: "Adjacency List stores `parent_id` and requires recursive CTEs to query; Nested Set stores `lft` and `rgt` boundaries, allowing non-recursive tree queries but making tree updates complex.",
    explanation: "Two distinct paradigms for relational tree storage.",
    hint: "Adjacency List uses parent_id + CTEs; Nested Set uses lft/rgt boundary integers.",
    level: "expert"
  },
  {
    question: "Why did MySQL 8.0 recursive CTEs make the Adjacency List model the preferred standard over Nested Sets?",
    shortAnswer: "Because recursive CTEs eliminate the query complexity of Adjacency Lists while retaining easy, single-row `INSERT/UPDATE` operations, avoiding the expensive re-indexing of Nested Sets.",
    explanation: "Best of both worlds: simple writes and declarative hierarchical reads.",
    hint: "Simple single-row writes combined with declarative recursive reads.",
    level: "expert"
  },
  {
    question: "How do you find only direct subordinates (Level 1) vs all indirect subordinates?",
    shortAnswer: "Direct subordinates are filtered with `WHERE hierarchy_level = 2` (or a simple non-recursive join); all subordinates include `hierarchy_level >= 2`.",
    explanation: "Level depth filtering isolates specific generational tiers.",
    hint: "Level 2 gives direct subordinates; level >= 2 gives all descendants.",
    level: "basic"
  },
  {
    question: "Can you calculate the cumulative department budget rollup by summing salaries down an org chart?",
    shortAnswer: "YES; traverse each subtree using a recursive CTE and sum the salaries of all descendant employees in the main query.",
    explanation: "Hierarchical financial rollups in pure SQL.",
    hint: "Yes, traverse descendants and SUM(salary) grouped by branch root.",
    level: "expert"
  },
  {
    question: "What happens if an Adjacency List table contains orphan records where `parent_id` points to a non-existent ID?",
    shortAnswer: "Top-down traversals starting from root (`WHERE parent_id IS NULL`) will never reach the orphan records, silently omitting them from the tree.",
    explanation: "Enforce Foreign Key constraints to prevent orphan subtrees.",
    hint: "Orphan records are missed by top-down root traversals; use FK constraints.",
    level: "moderate"
  },
  {
    question: "How do you detect all orphan records in an Adjacency List table?",
    shortAnswer: "`SELECT * FROM categories c WHERE c.parent_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM categories p WHERE p.category_id = c.parent_id);`",
    explanation: "Anti-join identifying broken parent pointers.",
    hint: "Anti-join finding parent_ids that do not exist in the primary key column.",
    level: "moderate"
  },
  {
    question: "What is the maximum tree depth supported by recursive CTEs in MySQL?",
    shortAnswer: "Up to `4,294,967,295` levels (governed by `cte_max_recursion_depth`), allowing traversal of arbitrary real-world hierarchy depths.",
    explanation: "Practically unlimited for enterprise organization trees.",
    hint: "Up to 4.29 billion levels using cte_max_recursion_depth.",
    level: "basic"
  },
  {
    question: "How do you update employee reporting lines in bulk using a recursive CTE in MySQL 8.0?",
    shortAnswer: "Use a multi-table `UPDATE employees e JOIN OrgHierarchy h ON e.emp_id = h.emp_id SET e.org_path = h.breadcrumb_path;`.",
    explanation: "Synchronizes materialized hierarchy paths dynamically.",
    hint: "Join recursive CTE directly in an UPDATE statement to write paths.",
    level: "expert"
  },
  {
    question: "Can a recursive CTE be used to find the Shortest Path between two nodes in a network graph?",
    shortAnswer: "YES; by traversing connections level-by-level (Breadth-First Search) and halting when the destination node is reached with `ORDER BY level LIMIT 1`.",
    explanation: "Graph algorithms in relational SQL.",
    hint: "Yes, BFS traversal ordered by depth level with LIMIT 1.",
    level: "expert"
  },
  {
    question: "Why should `ORDER BY` be placed in the final outer query rather than inside the recursive member?",
    shortAnswer: "Because SQL standards forbid `ORDER BY` in the recursive member, and sorting the final output ensures consistent visual hierarchy display.",
    explanation: "Final query controls output presentation order.",
    hint: "ORDER BY is forbidden in the recursive member; place it in the outer SELECT.",
    level: "basic"
  },
  {
    question: "How do you generate a breadcrumb path with custom node IDs rather than names?",
    shortAnswer: "`CONCAT(p.id_path, '/', c.id)` in the recursive member.",
    explanation: "Generates standardized URI-like hierarchy paths.",
    hint: "CONCAT(parent.id_path, '/', child.id)",
    level: "basic"
  },
  {
    question: "What is the senior architect's summary rule for Hierarchical Recursive CTEs?",
    shortAnswer: "Model with self-referencing Adjacency Lists, index parent foreign keys, cast breadcrumb strings in the Anchor Member, enforce cycle detection guards on unvalidated data, and leverage top-down or bottom-up traversal based on business query requirements.",
    explanation: "Authoritative architectural best practices for enterprise relational tree traversal.",
    hint: "Adjacency List + indexed parent FK + cast anchor strings + cycle guard + choose traversal direction.",
    level: "expert"
  }
];

export default questions;
