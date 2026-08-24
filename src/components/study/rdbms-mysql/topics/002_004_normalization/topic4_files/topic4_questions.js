// topic4_files/topic4_questions.js

const questions = [
  {
    question: "What is a Full Functional Dependency (FFD)?",
    shortAnswer: "A functional dependency X → Y is a full functional dependency if removal of any attribute from determinant X causes the dependency to no longer hold.",
    explanation: "Formal mathematical definition of full functional dependency.",
    hint: "Y depends on the entire determinant X, not any of its subsets.",
    level: "basic"
  },
  {
    question: "What is a Partial Dependency?",
    shortAnswer: "A functional dependency X → Y is a partial dependency if Y is functionally determined by a proper subset of composite determinant X.",
    explanation: "Formal mathematical definition of partial dependency.",
    hint: "Y depends on only a part of a composite primary key.",
    level: "basic"
  },
  {
    question: "Under what specific condition can a Partial Dependency exist in a table?",
    shortAnswer: "ONLY when the relation possesses a Composite Candidate Key (a candidate key composed of 2 or more attributes).",
    explanation: "Structural requirement for partial dependencies.",
    hint: "Only when the primary key or candidate key is composite.",
    level: "basic"
  },
  {
    question: "If a table has a single-column Primary Key (e.g. `student_id`), can it have a partial dependency?",
    shortAnswer: "NO. A single-column key has no proper non-empty subsets, so the table is automatically free of partial dependencies.",
    explanation: "Single-column primary key 2NF rule.",
    hint: "No, single-column keys cannot have partial dependencies.",
    level: "basic"
  },
  {
    question: "Which Normal Form is specifically designed to eliminate Partial Dependencies?",
    shortAnswer: "Second Normal Form (2NF).",
    explanation: "2NF objective in database normalization.",
    hint: "Second Normal Form (2NF).",
    level: "basic"
  },
  {
    question: "Give a concrete example of a Partial Dependency from an academy enrollment table.",
    shortAnswer: "In `(student_id, course_id) → student_name`, `student_name` depends solely on `student_id` (a proper subset of the composite PK).",
    explanation: "Real-world partial dependency example.",
    hint: "student_id determines student_name without needing course_id.",
    level: "basic"
  },
  {
    question: "Give a concrete example of a Full Functional Dependency from an academy enrollment table.",
    shortAnswer: "`(student_id, course_id) → final_grade` (neither student_id alone nor course_id alone can determine the final grade).",
    explanation: "Real-world full functional dependency example.",
    hint: "Both student_id and course_id together determine final_grade.",
    level: "basic"
  },
  {
    question: "What is a 'Prime Attribute' in relational normalization theory?",
    shortAnswer: "An attribute that is a member of at least one Candidate Key in the relation schema.",
    explanation: "Definition of prime attribute.",
    hint: "An attribute that belongs to any candidate key.",
    level: "basic"
  },
  {
    question: "What is a 'Non-Prime Attribute'?",
    shortAnswer: "An attribute that does not belong to ANY candidate key of the relation.",
    explanation: "Definition of non-prime attribute.",
    hint: "An attribute not part of any candidate key.",
    level: "basic"
  },
  {
    question: "State the formal definition of Second Normal Form (2NF).",
    shortAnswer: "A relation schema R is in 2NF if it is in 1NF and every non-prime attribute is FULLY functionally dependent on every candidate key of R.",
    explanation: "Formal definition of 2NF.",
    hint: "1NF + No non-prime attribute is partially dependent on any candidate key.",
    level: "basic"
  },
  {
    question: "How do you decompose a table to eliminate partial dependencies into 2NF?",
    shortAnswer: "For each partial dependency X_sub → Y, create a new table with schema (X_sub, Y) where X_sub is the PK, and remove Y from the original composite table.",
    explanation: "2NF decomposition procedure.",
    hint: "Split the partial dependency into its own table with the subset as the primary key.",
    level: "moderate"
  },
  {
    question: "What anomalies are caused by Partial Dependencies in an unnormalized table?",
    shortAnswer: "Insertion anomalies (cannot add courses without students), update anomalies (updating student name in 500 rows), and deletion anomalies (deleting a student deletes course data).",
    explanation: "Anomalies directly caused by 2NF violations.",
    hint: "All three modification anomalies (Insertion, Update, Deletion).",
    level: "moderate"
  },
  {
    question: "In relation R(A, B, C, D) with candidate key (A, B) and FDs {AB → C, B → D}, which FD is a partial dependency?",
    shortAnswer: "B → D (because attribute D depends on B, which is a proper subset of candidate key AB).",
    explanation: "Identifying partial dependency in formal schema.",
    hint: "B → D is partial because B is a proper subset of AB.",
    level: "basic"
  },
  {
    question: "In the relation R(A, B, C, D) with FDs {AB → C, B → D}, how is it decomposed into 2NF?",
    shortAnswer: "R1(B, D) with PK = B, and R2(A, B, C) with PK = (A, B) and FK = B referencing R1.",
    explanation: "Decomposition into 2NF relations.",
    hint: "R1(B, D) and R2(A, B, C).",
    level: "moderate"
  },
  {
    question: "Does 2NF require that prime attributes be fully functionally dependent on candidate keys?",
    shortAnswer: "No. 2NF strictly prohibits partial dependencies of NON-PRIME attributes on candidate keys.",
    explanation: "Scope of 2NF rule on non-prime attributes.",
    hint: "2NF strictly applies to non-prime attributes.",
    level: "moderate"
  },
  {
    question: "Why does a composite primary key of 3 attributes (A, B, C) increase the risk of partial dependencies?",
    shortAnswer: "Because there are 6 possible proper non-empty subsets (A, B, C, AB, AC, BC) that could each determine non-prime attributes.",
    explanation: "Combinatorial increase of partial dependency risks.",
    hint: "More proper subsets (A, B, C, AB, AC, BC) create more partial dependency possibilities.",
    level: "moderate"
  },
  {
    question: "If relation R(A, B, C) has candidate key (A, B) and FD {AB → C}, is it in 2NF?",
    shortAnswer: "YES. C depends on the entire candidate key AB, so there are zero partial dependencies.",
    explanation: "Validation of 2NF compliance.",
    hint: "Yes, C is fully dependent on AB.",
    level: "basic"
  },
  {
    question: "In an e-commerce order-items table `(order_id, item_id, item_name, unit_price, quantity)`, what are the partial dependencies?",
    shortAnswer: "`item_id → {item_name, unit_price}` is a partial dependency on composite key `(order_id, item_id)`.",
    explanation: "E-commerce order lines 2NF violation.",
    hint: "item_id determines item_name and unit_price.",
    level: "basic"
  },
  {
    question: "How is the e-commerce order-items table decomposed into 2NF?",
    shortAnswer: "Into `Items(item_id [PK], item_name, unit_price)` and `Order_Items(order_id [FK], item_id [FK], quantity, PK = (order_id, item_id))`.",
    explanation: "2NF decomposition of order lines.",
    hint: "Items table and an Order_Items junction table.",
    level: "basic"
  },
  {
    question: "Does achieving 2NF guarantee that a relation is free of all anomalies?",
    shortAnswer: "NO. 2NF only eliminates partial dependencies; transitive dependencies may still exist, requiring 3NF.",
    explanation: "2NF limitations vs 3NF.",
    hint: "No, transitive dependencies can still cause anomalies in 2NF.",
    level: "basic"
  },
  {
    question: "Can a partial dependency involve multiple attributes on the right-hand side (e.g. A → {C, D} when PK is AB)?",
    shortAnswer: "YES. Both C and D are partially dependent on proper subset A.",
    explanation: "Multi-attribute dependent partial dependency.",
    hint: "Yes, both attributes are partially dependent on A.",
    level: "basic"
  },
  {
    question: "What test determines if a functional dependency X → Y is a Full Functional Dependency?",
    shortAnswer: "For every attribute A ∈ X, compute (X - {A})+; if Y is NOT in (X - {A})+, then X → Y is fully functionally dependent.",
    explanation: "Algorithmic test for FFD using attribute closure.",
    hint: "Check if removing any attribute from X fails to determine Y.",
    level: "expert"
  },
  {
    question: "If relation R(A, B, C) has FDs {A → B, B → C} and candidate key A, is R in 2NF?",
    shortAnswer: "YES! Candidate key A is single-column (no partial dependencies), though it violates 3NF due to transitive dependency B → C.",
    explanation: "Distinction between 2NF and 3NF.",
    hint: "Yes, it is in 2NF because key A is not composite.",
    level: "moderate"
  },
  {
    question: "What is the primary benefit of decomposing a relation from 1NF into 2NF in terms of storage?",
    shortAnswer: "It eliminates redundant repetition of parent entity attributes (e.g. course title, fee) across multiple enrollment records.",
    explanation: "Storage efficiency gain of 2NF.",
    hint: "Stops repeating parent entity attributes across millions of child rows.",
    level: "basic"
  },
  {
    question: "How does 2NF decomposition preserve the relationship between decomposed tables?",
    shortAnswer: "By preserving foreign key references from the junction table back to the newly created parent entity tables.",
    explanation: "Foreign key linkage in 2NF decomposition.",
    hint: "Through Foreign Key constraints in the bridge table.",
    level: "basic"
  },
  {
    question: "What is an 'Extraneous Attribute' on the left-hand side of a functional dependency?",
    shortAnswer: "An attribute in determinant X that can be discarded without losing the ability to determine Y (indicating a partial dependency).",
    explanation: "LHS extraneous attribute definition.",
    hint: "An unnecessary attribute in the determinant.",
    level: "expert"
  },
  {
    question: "In hospital management, if an appointment table has PK `(doctor_id, patient_id, appointment_date)` and `doctor_id → doctor_specialty`, is this 2NF?",
    shortAnswer: "NO. `doctor_specialty` depends only on `doctor_id`, which is a partial dependency violating 2NF.",
    explanation: "Healthcare domain 2NF violation.",
    hint: "No, doctor_specialty partially depends on doctor_id.",
    level: "basic"
  },
  {
    question: "What is the result of rejoining tables after a valid 2NF decomposition?",
    shortAnswer: "A Lossless Join that reconstructs the exact original relation without producing spurious rows.",
    explanation: "Lossless join guarantee of 2NF decomposition.",
    hint: "A lossless natural join producing the exact original tuples.",
    level: "basic"
  },
  {
    question: "Why is 2NF rarely sufficient on its own for enterprise transactional systems?",
    shortAnswer: "Because non-key attributes can still determine other non-key attributes (transitive dependencies), causing update and deletion anomalies.",
    explanation: "Need for 3NF and BCNF beyond 2NF.",
    hint: "Transitive dependencies between non-key attributes still cause anomalies.",
    level: "moderate"
  },
  {
    question: "What is the core takeaway for database engineers regarding Full vs Partial Dependencies?",
    shortAnswer: "Identify all composite candidate keys, check if any non-prime attribute depends on a subset of those keys (partial dependency), and decompose into 2NF dedicated entity tables.",
    explanation: "Summary conclusion for Topic 4.",
    hint: "Decompose partial dependencies into dedicated entity tables to achieve 2NF.",
    level: "basic"
  }
];

export default questions;
