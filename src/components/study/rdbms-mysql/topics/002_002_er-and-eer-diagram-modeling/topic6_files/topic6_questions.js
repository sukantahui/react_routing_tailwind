// topic6_files/topic6_questions.js

const questions = [
  {
    question: "What is `(min, max)` constraint notation in ER modeling?",
    shortAnswer: "A formal structural notation where a pair `(min, max)` is written on each entity's relationship edge to define both participation (min) and cardinality (max) simultaneously.",
    explanation: "Standardized ISO constraint notation for relational data models.",
    hint: "(min, max) pair on relationship edges.",
    level: "basic"
  },
  {
    question: "What does `min` represent in `(min, max)` notation?",
    shortAnswer: "The MINIMUM number of relationship instances each entity instance MUST participate in ($0$ = partial/optional; $\\ge 1$ = total/mandatory).",
    explanation: "Specifies participation modality.",
    hint: "Minimum participation instances.",
    level: "basic"
  },
  {
    question: "What does `max` represent in `(min, max)` notation?",
    shortAnswer: "The MAXIMUM number of relationship instances each entity instance CAN participate in ($1$ = single association; $N$ = multiple associations).",
    explanation: "Specifies upper bound cardinality.",
    hint: "Maximum relationship instances.",
    level: "basic"
  },
  {
    question: "What does `(0, 1)` signify in `(min, max)` notation?",
    shortAnswer: "Optional One (Zero or One): the entity can exist without participating (min = 0), and can participate at most once (max = 1).",
    explanation: "Equivalent to Crow's Foot `o|` (Circle + Bar).",
    hint: "Optional One.",
    level: "basic"
  },
  {
    question: "What does `(1, 1)` signify in `(min, max)` notation?",
    shortAnswer: "Mandatory Exactly One: every entity instance MUST participate in exactly one relationship instance.",
    explanation: "Equivalent to Crow's Foot `||` (Double Bar).",
    hint: "Mandatory Exactly One.",
    level: "basic"
  },
  {
    question: "What does `(0, N)` signify in `(min, max)` notation?",
    shortAnswer: "Optional Many (Zero or More): participation is optional (min = 0), and an entity can participate in multiple instances (max = N).",
    explanation: "Equivalent to Crow's Foot `>o` (Circle + Crow).",
    hint: "Optional Many.",
    level: "basic"
  },
  {
    question: "What does `(1, N)` signify in `(min, max)` notation?",
    shortAnswer: "Mandatory Many (One or More): every entity instance MUST participate in at least one instance, and can participate in multiple instances.",
    explanation: "Equivalent to Crow's Foot `>|` (Bar + Crow).",
    hint: "Mandatory Many.",
    level: "basic"
  },
  {
    question: "What is the mathematical constraint rule on `min` and `max` values?",
    shortAnswer: "$0 \\le min \\le max$ and $max \\ge 1$.",
    explanation: "Ensures logical and mathematical consistency.",
    hint: "0 <= min <= max and max >= 1.",
    level: "basic"
  },
  {
    question: "What is the fundamental difference between Peter Chen Notation vs `(min, max)` Notation perspectives?",
    shortAnswer: "Chen notation uses 'Look-Across' semantics (the '1' or 'N' near Entity B describes associations with Entity A); `(min, max)` notation uses 'Look-Here' semantics (describes Entity A's own local bounds).",
    explanation: "A major source of confusion in database design exams.",
    hint: "Look-Across vs Look-Here local semantics.",
    level: "expert"
  },
  {
    question: "In `Student (1, N) ───< Enrolls_In >─── (0, M) Course`, what are the exact business rules?",
    shortAnswer: "1) Every Student MUST enroll in at least 1 course, and may enroll in up to N courses. 2) A Course may have 0 enrolled students (e.g. newly introduced course), up to M students.",
    explanation: "Deconstructs local participation bounds for both entities.",
    hint: "Student must enroll in >=1; Course can have >=0 students.",
    level: "moderate"
  },
  {
    question: "In `Employee (0, 1) ───< Manages >─── (1, 1) Department`, what are the exact business rules?",
    shortAnswer: "1) An Employee manages 0 departments (normal staff) or at most 1 department. 2) A Department MUST have EXACTLY 1 manager.",
    explanation: "Classic 1:1 Partial/Total relationship expressed in min-max notation.",
    hint: "Employee manages 0 or 1; Department has exactly 1.",
    level: "basic"
  },
  {
    question: "How is `Department (1, 1)` mapped into SQL DDL?",
    shortAnswer: "By placing `manager_emp_id INT NOT NULL UNIQUE` in the `departments` table.",
    explanation: "Total participation enforced via NOT NULL; 1:1 enforced via UNIQUE.",
    hint: "NOT NULL UNIQUE column in departments table.",
    level: "moderate",
    codeExample: "CREATE TABLE departments (\n    dept_id INT PRIMARY KEY,\n    manager_emp_id INT NOT NULL UNIQUE,\n    FOREIGN KEY (manager_emp_id) REFERENCES employees(id)\n);"
  },
  {
    question: "Can `max` be a specific fixed integer (e.g. `max = 4`) instead of `N`?",
    shortAnswer: "Yes, explicit integer bounds can be specified (e.g. `(1, 4)` for a student taking minimum 1 and maximum 4 courses per semester).",
    explanation: "Min-max notation supports precise numerical bounds.",
    hint: "Supports precise numerical bounds like (1, 4).",
    level: "moderate"
  },
  {
    question: "How is a precise numerical bound like `(1, 4)` enforced at the physical database level in MySQL?",
    shortAnswer: "Using a `BEFORE INSERT` trigger or stored procedure to count existing associations and raise an exception if `COUNT(*) >= 4`.",
    explanation: "Standard DDL cannot enforce multi-row count limits without triggers.",
    hint: "BEFORE INSERT trigger validating row count.",
    level: "expert",
    codeExample: "CREATE TRIGGER trg_max_courses BEFORE INSERT ON student_enrollments\nFOR EACH ROW\nBEGIN\n    IF (SELECT COUNT(*) FROM student_enrollments WHERE student_id = NEW.student_id) >= 4 THEN\n        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Maximum 4 courses allowed per student';\n    END IF;\nEND;"
  },
  {
    question: "What does `(0, 0)` represent in `(min, max)` notation?",
    shortAnswer: "An invalid pair: `max` must be $\\ge 1$ (an entity that participates in 0 instances maximum has no relationship to that set).",
    explanation: "Relationship participation must be non-zero at the upper bound.",
    hint: "Invalid pair; max must be >= 1.",
    level: "basic"
  },
  {
    question: "How does `(min, max)` notation represent Weak Entity participation in an Identifying Relationship?",
    shortAnswer: "The Weak Entity ALWAYS has `(1, 1)` participation: every weak entity instance must belong to EXACTLY one owner entity instance.",
    explanation: "Existence dependency requires mandatory single owner.",
    hint: "(1, 1) on weak entity edge.",
    level: "moderate"
  },
  {
    question: "In `(min, max)` notation, what would a Strong Owner's participation with its Weak Entity dependents typically be?",
    shortAnswer: "`(0, N)`: an owner entity can have zero dependents (e.g. single student) or multiple dependents.",
    explanation: "Optional multiple dependents per parent.",
    hint: "(0, N) on owner entity edge.",
    level: "basic"
  },
  {
    question: "How does UML Class Diagram notation compare with `(min, max)` notation?",
    shortAnswer: "UML multiplicity notations like `0..1`, `1..1` (or `1`), `0..*`, and `1..*` directly correspond to `(0, 1)`, `(1, 1)`, `(0, N)`, and `(1, N)`. UML uses look-across semantics.",
    explanation: "Direct mapping between ISO min-max and UML multiplicity ranges.",
    hint: "UML 0..1, 1..1, 0..*, 1..* correspond to min-max.",
    level: "moderate"
  },
  {
    question: "In `Customer (0, N) ───< Places >─── (1, 1) Order`, what does `(1, 1)` on Order signify?",
    shortAnswer: "Every Order MUST be placed by EXACTLY one Customer (an order cannot exist without a customer, and cannot belong to multiple customers).",
    explanation: "Mandatory single customer per order.",
    hint: "Order belongs to exactly one customer.",
    level: "basic"
  },
  {
    question: "Where should the Foreign Key be placed for `Customer (0, N) ───< Places >─── (1, 1) Order` in SQL?",
    shortAnswer: "In the `orders` table as `customer_id INT NOT NULL` referencing `customers(customer_id)`.",
    explanation: "1:N relationship with total participation on the Many side.",
    hint: "In the orders table with NOT NULL.",
    level: "basic",
    codeExample: "CREATE TABLE orders (\n    order_id INT PRIMARY KEY,\n    customer_id INT NOT NULL,\n    FOREIGN KEY (customer_id) REFERENCES customers(id)\n);"
  },
  {
    question: "Can an entity have `(2, 2)` participation?",
    shortAnswer: "Yes (e.g. in an aircraft modeling schema, `Commercial_Flight (2, 2) ───< Piloted_By >─── Pilot` signifies exactly two pilots per flight: Captain and First Officer).",
    explanation: "Fixed cardinality bounds.",
    hint: "Exactly two participants required.",
    level: "moderate"
  },
  {
    question: "Why is `(min, max)` notation considered superior to Peter Chen's 1:N / M:N notation by many relational theorists?",
    shortAnswer: "Because `(min, max)` explicitly combines both upper (cardinality) and lower (participation) bounds into a single localized mathematical tuple without needing separate double-line symbols.",
    explanation: "Eliminates visual ambiguity by unifying constraints.",
    hint: "Unifies lower and upper bounds into a single mathematical pair.",
    level: "expert"
  },
  {
    question: "What happens if you write `(min, max)` on a Ternary relationship?",
    shortAnswer: "It defines how many times an entity can participate in the 3-way association across combinations of the other two entities.",
    explanation: "Extends min-max constraints into 3-dimensional associations.",
    hint: "Defines 3-way participation bounds.",
    level: "expert"
  },
  {
    question: "How do you query for customers who have `min = 0` participation in the `orders` table using SQL?",
    shortAnswer: "`SELECT c.full_name FROM customers c LEFT JOIN orders o ON c.customer_id = o.customer_id WHERE o.order_id IS NULL;`.",
    explanation: "Anti-join pattern identifying zero-participation records.",
    hint: "LEFT JOIN WHERE o.order_id IS NULL.",
    level: "basic"
  },
  {
    question: "In `Citizen (0, 1) ───< Holds >─── (0, 1) Passport`, what does `(0, 1)` on both sides signify?",
    shortAnswer: "1:1 Optional-Optional relationship: a citizen may or may not hold a passport (0 or 1), and a passport may or may not be assigned to a citizen (0 or 1).",
    explanation: "Both entities have partial participation.",
    hint: "1:1 Optional on both sides.",
    level: "basic"
  },
  {
    question: "Where should the Foreign Key be placed for `Citizen (0, 1) ───< Holds >─── (0, 1) Passport`?",
    shortAnswer: "In either table with `UNIQUE` (and nullable `NULL`), typically in `passports(citizen_id INT UNIQUE NULL)`.",
    explanation: "Nullable UNIQUE foreign key in either table.",
    hint: "In either table with UNIQUE NULL.",
    level: "moderate"
  },
  {
    question: "How does `(min, max)` notation prevent design ambiguities during software requirements reviews?",
    shortAnswer: "By forcing developers and domain stakeholders to explicitly declare both lower bounds ('Can this be zero?') and upper bounds ('Can there be more than one?').",
    explanation: "Guarantees that nullability and cardinality are formally specified.",
    hint: "Forces explicit declaration of lower and upper bounds.",
    level: "moderate"
  },
  {
    question: "What is the equivalent Crow's Foot symbol for `(1, 1)`?",
    shortAnswer: "Two parallel vertical tick marks (`||`) on the entity boundary.",
    explanation: "Mandatory One symbol in Crow's Foot notation.",
    hint: "Double vertical bar (||).",
    level: "basic"
  },
  {
    question: "What is the equivalent Crow's Foot symbol for `(0, N)`?",
    shortAnswer: "An open circle followed by a 3-pronged crow's foot (`>o`).",
    explanation: "Optional Many symbol in Crow's Foot notation.",
    hint: "Circle and crow's foot (>o).",
    level: "basic"
  },
  {
    question: "What is the recommended checklist for specifying `(min, max)` constraints in ER models?",
    shortAnswer: "1) Check lower bound: can instance exist without relationship? (min = 0 vs min = 1). 2) Check upper bound: can instance relate to multiple entities? (max = 1 vs max = N). 3) Verify $0 \\le min \\le max$ and $max \\ge 1$. 4) Map `(1, 1)` to `NOT NULL UNIQUE` in DDL. 5) Map `(0, N)` to child FK or bridge table.",
    explanation: "Following these 5 rules guarantees precise semantic constraints and clean DDL.",
    hint: "Lower bound (min), Upper bound (max), Verify math bounds, Map (1,1) to NOT NULL UNIQUE, Map (0,N) to FK/bridge.",
    level: "basic"
  }
];

export default questions;
