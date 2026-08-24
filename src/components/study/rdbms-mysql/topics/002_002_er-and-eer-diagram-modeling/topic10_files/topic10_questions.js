// topic10_files/topic10_questions.js

const questions = [
  {
    question: "What are the two types of inheritance in Extended ER (EER) modeling?",
    shortAnswer: "1) Attribute Inheritance (inheriting all parent attributes and primary keys) and 2) Relationship Inheritance (inheriting all relationships in which the parent participates).",
    explanation: "Foundational pillars of EER type inheritance.",
    hint: "Attribute Inheritance and Relationship Inheritance.",
    level: "basic"
  },
  {
    question: "How does Attribute Inheritance work in a multi-level specialization hierarchy (e.g. Person -> Employee -> Manager)?",
    shortAnswer: "The leaf subclass (Manager) inherits all attributes of its immediate parent (Employee) PLUS all attributes of the root ancestor (Person), in addition to its own local attributes.",
    explanation: "Inheritance flows transitively down the hierarchy tree.",
    hint: "Transitive inheritance from root to leaf.",
    level: "basic"
  },
  {
    question: "Does a Subclass inherit the Primary Key of its Superclass?",
    shortAnswer: "Yes, a subclass always inherits the exact same Primary Key identifier from its superclass.",
    explanation: "Enforces 1:1 IS-A identity across tables.",
    hint: "Inherits the superclass primary key.",
    level: "basic"
  },
  {
    question: "What is Relationship Inheritance in EER modeling?",
    shortAnswer: "The principle that any relationship type that applies to a superclass automatically applies to all of its subclasses.",
    explanation: "If Person participates in 'Has_Insurance', Students and Instructors automatically participate.",
    hint: "Subclasses inherit all superclass relationships.",
    level: "basic"
  },
  {
    question: "Why is duplicating superclass attributes (like `full_name`) inside subclass tables considered a database anti-pattern?",
    shortAnswer: "Because it introduces data redundancy, risks update anomalies when a name changes, and violates 3NF normalization principles.",
    explanation: "Attributes must live in only one table.",
    hint: "Causes data redundancy and update anomalies.",
    level: "basic"
  },
  {
    question: "How is a 3-tier hierarchy (`Person` -> `Employee` -> `Engineering_Manager`) mapped to relational tables in MySQL?",
    shortAnswer: "Create three tables (`persons`, `employees`, `engineering_managers`), each using `person_id` as its Primary Key, linked via cascading Foreign Keys.",
    explanation: "Multi-tier Table-Per-Type mapping.",
    hint: "Three tables linked by shared person_id PK/FK.",
    level: "moderate",
    codeExample: "CREATE TABLE persons (person_id INT PRIMARY KEY, name VARCHAR(100));\nCREATE TABLE employees (person_id INT PRIMARY KEY, salary DECIMAL(10,2), FOREIGN KEY (person_id) REFERENCES persons(person_id) ON DELETE CASCADE);\nCREATE TABLE engineering_managers (person_id INT PRIMARY KEY, budget DECIMAL(12,2), FOREIGN KEY (person_id) REFERENCES employees(person_id) ON DELETE CASCADE);"
  },
  {
    question: "How do you query a multi-level hierarchy table to produce a full employee profile in SQL?",
    shortAnswer: "Using consecutive `INNER JOIN` operations along the shared Primary Key column (`persons p JOIN employees e ON p.person_id = e.person_id JOIN engineering_managers m ON e.person_id = m.person_id`).",
    explanation: "Chained primary key join path.",
    hint: "Chained INNER JOINs on person_id.",
    level: "basic"
  },
  {
    question: "What happens when `DELETE FROM persons WHERE person_id = 1;` is executed on a person who is an Engineering Manager?",
    shortAnswer: "MySQL InnoDB automatically cascades the deletion through `employees` down to `engineering_managers`, cleanly wiping all 3 rows in a single atomic transaction.",
    explanation: "Multi-tier cascading deletion cleanup.",
    hint: "All 3 rows are automatically purged via cascading FKs.",
    level: "basic"
  },
  {
    question: "What is 'Multiple Inheritance' (Specialization Lattice) in EER modeling?",
    shortAnswer: "A modeling scenario where a single subclass inherits attributes and relationships from TWO OR MORE distinct superclasses simultaneously.",
    explanation: "Example: `Teaching_Assistant` inheriting from both `Student` and `Instructor`.",
    hint: "Subclass inheriting from multiple superclasses.",
    level: "expert"
  },
  {
    question: "How is Multiple Inheritance mapped into relational tables?",
    shortAnswer: "The subclass table inherits the primary key from a primary superclass, and maintains foreign keys to all other parent superclasses.",
    explanation: "Multiple foreign key links to parent superclass tables.",
    hint: "Primary key + foreign keys to all parent superclasses.",
    level: "expert",
    codeExample: "CREATE TABLE teaching_assistants (\n    student_id INT PRIMARY KEY,\n    instructor_id INT NOT NULL UNIQUE,\n    stipend DECIMAL(10,2),\n    FOREIGN KEY (student_id) REFERENCES students(person_id) ON DELETE CASCADE,\n    FOREIGN KEY (instructor_id) REFERENCES instructors(person_id) ON DELETE CASCADE\n);"
  },
  {
    question: "Can a Subclass OVERRIDE an inherited attribute from its Superclass?",
    shortAnswer: "No, in relational EER modeling, attribute overriding is not supported; subclasses inherit the exact schema definition of superclass attributes.",
    explanation: "Relational schemas enforce strict structural typing.",
    hint: "Attribute overriding is not supported in relational EER.",
    level: "moderate"
  },
  {
    question: "What is a 'Local Attribute' (Specific Attribute) of a subclass?",
    shortAnswer: "An attribute that applies ONLY to that specific subclass and is not shared with the superclass or sibling subclasses.",
    explanation: "e.g. `tuition_fee` is local to `Student`.",
    hint: "Attribute specific only to that subclass.",
    level: "basic"
  },
  {
    question: "What is a 'Local Relationship' (Specific Relationship) of a subclass?",
    shortAnswer: "A relationship in which only members of that specific subclass participate (e.g. only `Student` participates in `Enrolls_In_Course`).",
    explanation: "Relationships unique to that subclass.",
    hint: "Relationship unique to that subclass.",
    level: "basic"
  },
  {
    question: "How does a View simplify querying complex multi-tier inheritance hierarchies in MySQL?",
    shortAnswer: "A database view can pre-join `persons`, `employees`, and `engineering_managers`, allowing developers to query `vw_engineering_managers` as a simple virtual table.",
    explanation: "Encapsulates multi-table join complexity.",
    hint: "Pre-joins all hierarchy tables into a clean virtual table.",
    level: "moderate",
    codeExample: "CREATE VIEW vw_engineering_managers AS\nSELECT p.person_id, p.full_name, p.email, e.monthly_salary, m.team_budget\nFROM persons p\nJOIN employees e ON p.person_id = e.person_id\nJOIN engineering_managers m ON e.person_id = m.person_id;"
  },
  {
    question: "What is the performance trade-off of multi-level Table-Per-Type inheritance schemas?",
    shortAnswer: "Read queries require multi-table `JOIN` operations (which can be slower on large datasets without proper indexes), but storage is 100% normalized with zero NULL bloat.",
    explanation: "Classic join cost vs normalization integrity trade-off.",
    hint: "Join overhead on reads vs normalized 3NF storage.",
    level: "moderate"
  },
  {
    question: "How can B-Tree indexes be optimized for multi-tier Table-Per-Type inheritance queries?",
    shortAnswer: "Since all joins occur on the Primary Key `person_id`, InnoDB's clustered index provides instant $O(\\log N)$ B-Tree lookups on every joined table.",
    explanation: "Clustered primary keys make 1:1 joins extremely fast.",
    hint: "Clustered primary key B-Trees ensure fast 1:1 join lookups.",
    level: "expert"
  },
  {
    question: "What is the difference between Generalization and Specialization in terms of attribute movement?",
    shortAnswer: "Specialization pushes specific attributes DOWN to subclasses; Generalization pulls common attributes UP to the superclass.",
    explanation: "Top-down vs bottom-up attribute placement.",
    hint: "Specialization pushes down; Generalization pulls up.",
    level: "moderate"
  },
  {
    question: "Can an abstract superclass have zero entity instances that are not members of a subclass?",
    shortAnswer: "Yes, in Total Specialization (Mandatory Completeness), the superclass is abstract and every instance exists only as a member of a subclass.",
    explanation: "Analogous to an abstract base class in Object-Oriented programming.",
    hint: "Total specialization creates an abstract superclass.",
    level: "expert"
  },
  {
    question: "How do you insert an Engineering Manager record atomically across 3 tables?",
    shortAnswer: "Wrap all 3 insert statements inside a `START TRANSACTION` ... `COMMIT` block using `LAST_INSERT_ID()`.",
    explanation: "Atomic multi-tier insertion pattern.",
    hint: "3 inserts inside a transaction with LAST_INSERT_ID.",
    level: "moderate",
    codeExample: "START TRANSACTION;\nINSERT INTO persons (full_name, email) VALUES ('Mamata Hui', 'mamata@barrackpore.in');\nSET @pid = LAST_INSERT_ID();\nINSERT INTO employees (person_id, monthly_salary) VALUES (@pid, 45000.00);\nINSERT INTO engineering_managers (person_id, team_budget) VALUES (@pid, 500000.00);\nCOMMIT;"
  },
  {
    question: "How do you query for employees who are NOT managers in a multi-tier hierarchy?",
    shortAnswer: "Using a `LEFT JOIN` between `employees` and `engineering_managers` with `WHERE engineering_managers.person_id IS NULL`.",
    explanation: "Anti-join pattern filtering out specialized subclasses.",
    hint: "LEFT JOIN WHERE subclass.id IS NULL.",
    level: "basic"
  },
  {
    question: "Why should each subclass foreign key be explicitly declared `ON UPDATE CASCADE`?",
    shortAnswer: "To ensure that if a superclass `person_id` is ever modified, the update automatically propagates across all child and grandchild tables.",
    explanation: "Preserves identity synchronization on update.",
    hint: "Propagates primary key updates across all tiers.",
    level: "basic"
  },
  {
    question: "What is a 'Subclass Entity Type' vs a 'Subclass Entity Set'?",
    shortAnswer: "The Type is the schema definition (attributes and constraints); the Set is the collection of concrete entity instances belonging to that subclass at a given moment.",
    explanation: "Intension (Type) vs Extension (Set).",
    hint: "Schema definition vs current data instance collection.",
    level: "moderate"
  },
  {
    question: "Can a subclass have a relationship with its own superclass?",
    shortAnswer: "Yes (e.g. `Employee` [Subclass] 'Supervises' `Person` [Superclass]).",
    explanation: "Recursive cross-tier relationships.",
    hint: "Yes, cross-tier relationships are valid.",
    level: "expert"
  },
  {
    question: "How does JPA / Hibernate map multi-level inheritance hierarchies with `@Inheritance(strategy = InheritanceType.JOINED)`?",
    shortAnswer: "It generates separate tables for each class in the hierarchy and performs automatic multi-table polymorphic joins when fetching entities.",
    explanation: "ORM mapping of multi-tier TPT schemas.",
    hint: "Generates separate tables and multi-table joins.",
    level: "expert"
  },
  {
    question: "What is the maximum depth of a specialization hierarchy supported in relational database modeling?",
    shortAnswer: "Theoretically unlimited, though in practice hierarchies rarely exceed 3-4 levels to avoid excessive join overhead.",
    explanation: "Practical limit of 3-4 levels for query performance.",
    hint: "Theoretically unlimited; practically 3-4 levels max.",
    level: "basic"
  },
  {
    question: "How do you count total spending across all employee salaries and manager budgets?",
    shortAnswer: "`SELECT SUM(e.monthly_salary) AS total_salaries, SUM(m.team_budget) AS total_budgets FROM employees e LEFT JOIN engineering_managers m ON e.person_id = m.person_id;`.",
    explanation: "Polymorphic aggregation across hierarchy tables.",
    hint: "LEFT JOIN with SUM aggregation.",
    level: "moderate"
  },
  {
    question: "What happens if a developer creates a separate `manager_id AUTO_INCREMENT` in the `engineering_managers` table instead of using `person_id`?",
    shortAnswer: "It breaks the 1:1 IS-A relationship, requires maintaining two separate ID columns, and creates unnecessary secondary index lookups.",
    explanation: "Severe design anti-pattern.",
    hint: "Breaks 1:1 identity linkage and requires redundant indexes.",
    level: "moderate"
  },
  {
    question: "Why are Views recommended for full-stack developers working with multi-tier Table-Per-Type schemas?",
    shortAnswer: "Because views hide the complexity of 3-way inner joins, allowing ORMs and frontend API endpoints to interact with clean, unified virtual entity tables.",
    explanation: "Abstraction layer for application developers.",
    hint: "Hides join complexity behind a unified virtual table.",
    level: "basic"
  },
  {
    question: "How do you verify referential integrity across a 3-tier hierarchy using `information_schema`?",
    shortAnswer: "Query `information_schema.REFERENTIAL_CONSTRAINTS` to confirm that all child tables reference their parent table with `DELETE_RULE = 'CASCADE'`.",
    explanation: "Automated schema auditing.",
    hint: "information_schema.REFERENTIAL_CONSTRAINTS.",
    level: "expert"
  },
  {
    question: "What is the recommended checklist for modeling Attribute and Relationship Inheritance in EER schemas?",
    shortAnswer: "1) Define common attributes at the root superclass. 2) Define specialized attributes only in leaf subclasses. 3) Propagate the Root PK down all subclass tiers. 4) Configure `ON DELETE CASCADE` across all FKs. 5) Create unified database views to simplify polymorphic querying.",
    explanation: "Following these 5 rules guarantees seamless inheritance modeling and high-speed querying.",
    hint: "Common attrs at root, Specific attrs at leaf, Root PK propagated, ON DELETE CASCADE, Unified Views.",
    level: "basic"
  }
];

export default questions;
