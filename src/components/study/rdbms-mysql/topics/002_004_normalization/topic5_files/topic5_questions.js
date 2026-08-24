// topic5_files/topic5_questions.js

const questions = [
  {
    question: "What is a Transitive Functional Dependency?",
    shortAnswer: "A functional dependency X → Z is transitive if there exists an intermediate attribute set Y such that X → Y and Y → Z hold, but Y → X does not hold and Z is not a subset of X or Y.",
    explanation: "Formal mathematical definition of transitive functional dependency.",
    hint: "X determines Y, and Y determines Z (indirect dependency X → Y → Z).",
    level: "basic"
  },
  {
    question: "In plain business terms, what does a Transitive Dependency mean?",
    shortAnswer: "A non-key attribute is functionally determining another non-key attribute within the same table.",
    explanation: "Intuitive meaning of transitive dependency.",
    hint: "A non-key column determines another non-key column.",
    level: "basic"
  },
  {
    question: "Which Normal Form is specifically designed to eliminate Transitive Dependencies?",
    shortAnswer: "Third Normal Form (3NF).",
    explanation: "Core purpose of 3NF in database normalization.",
    hint: "Third Normal Form (3NF).",
    level: "basic"
  },
  {
    question: "Give a concrete real-world example of a Transitive Dependency.",
    shortAnswer: "In `Students(student_id, student_name, department_id, department_name, department_head)`, `student_id → department_id` and `department_id → department_head` create a transitive dependency `student_id → department_head`.",
    explanation: "Real-world student department hierarchy example.",
    hint: "student_id determines department_id, which in turn determines department_head.",
    level: "basic"
  },
  {
    question: "What are the two formal conditions in the definition of Third Normal Form (3NF)?",
    shortAnswer: "For every non-trivial functional dependency X → A, either 1) X is a Super Key, OR 2) A is a Prime Attribute.",
    explanation: "Two disjunctive conditions of 3NF definition.",
    hint: "X is a Super Key OR A is a Prime Attribute.",
    level: "basic"
  },
  {
    question: "Why does a Transitive Dependency cause an Update Anomaly?",
    shortAnswer: "Because the dependent attribute (e.g. `department_head`) is redundantly repeated across hundreds of student rows; updating it in some rows but not all causes contradictory data.",
    explanation: "Mechanism of update anomaly caused by transitive dependencies.",
    hint: "Redundant repetition across hundreds of rows leads to desynchronization on updates.",
    level: "basic"
  },
  {
    question: "Why does a Transitive Dependency cause an Insertion Anomaly?",
    shortAnswer: "Because a new department (with its name, head, and building) cannot be inserted into the database without creating a fictional student, because `student_id` cannot be NULL.",
    explanation: "Mechanism of insertion anomaly in 3NF violations.",
    hint: "Cannot insert a new department without having an enrolled student.",
    level: "basic"
  },
  {
    question: "Why does a Transitive Dependency cause a Deletion Anomaly?",
    shortAnswer: "Because deleting the last enrolled student in a department permanently erases all details of that department from the database.",
    explanation: "Mechanism of deletion anomaly in 3NF violations.",
    hint: "Deleting the only student in a department wipes out the entire department.",
    level: "basic"
  },
  {
    question: "How is a table decomposed to eliminate a Transitive Dependency X → Y → Z?",
    shortAnswer: "Create table R1(Y, Z) with Y as Primary Key, and retain Y as a Foreign Key in table R2(X, Y) with X as Primary Key, dropping Z from R2.",
    explanation: "3NF decomposition procedure.",
    hint: "Create R1(Y, Z) with Y as PK, and keep Y as FK in R2(X, Y).",
    level: "moderate"
  },
  {
    question: "In the relation `Employee(emp_id, emp_name, zip_code, city, state)` where `emp_id → zip_code` and `zip_code → {city, state}`, what is the transitive dependency?",
    shortAnswer: "`emp_id → {city, state}` through intermediate non-key attribute `zip_code`.",
    explanation: "Classic zip code location transitive dependency.",
    hint: "emp_id → zip_code and zip_code → {city, state}.",
    level: "basic"
  },
  {
    question: "How is the `Employee(emp_id, emp_name, zip_code, city, state)` table decomposed into 3NF?",
    shortAnswer: "Into `Zip_Codes(zip_code [PK], city, state)` and `Employees(emp_id [PK], emp_name, zip_code [FK])`.",
    explanation: "3NF decomposition of zip code dependency.",
    hint: "Zip_Codes table and an Employees table with zip_code as foreign key.",
    level: "basic"
  },
  {
    question: "Can a Transitive Dependency exist if the intermediate determinant Y is a Candidate Key?",
    shortAnswer: "NO. If Y is a candidate key (Y → X holds), then X and Y are equivalent keys, so X → Z is a direct dependency on a candidate key, NOT a 3NF violation.",
    explanation: "Candidate key exception in transitive dependency definition.",
    hint: "No, if Y is a candidate key, it does not violate 3NF.",
    level: "moderate"
  },
  {
    question: "What is the difference between a Partial Dependency (2NF) and a Transitive Dependency (3NF)?",
    shortAnswer: "A partial dependency involves a proper subset of a composite primary key determining a non-prime attribute. A transitive dependency involves a non-prime attribute determining another non-prime attribute.",
    explanation: "Comparison of 2NF partial dependency vs 3NF transitive dependency.",
    hint: "Partial: part of key → non-key; Transitive: non-key → non-key.",
    level: "moderate"
  },
  {
    question: "If a table is already in 2NF, is it guaranteed to be in 3NF?",
    shortAnswer: "NO. A 2NF table can still contain transitive dependencies between non-prime attributes.",
    explanation: "2NF vs 3NF hierarchy.",
    hint: "No, 2NF tables can still contain transitive dependencies.",
    level: "basic"
  },
  {
    question: "If a table has single-column primary key and NO transitive dependencies, what normal form is it in?",
    shortAnswer: "It is automatically in at least Third Normal Form (3NF).",
    explanation: "Single-column PK + zero transitive FDs implies 3NF.",
    hint: "At least 3NF.",
    level: "basic"
  },
  {
    question: "What rule of Armstrong's Axioms mathematically formalizes the transitive chain X → Y and Y → Z?",
    shortAnswer: "The Axiom of Transitivity: If X → Y and Y → Z, then X → Z.",
    explanation: "Armstrong's Transitivity Axiom.",
    hint: "The Axiom of Transitivity.",
    level: "basic"
  },
  {
    question: "In relation R(A, B, C, D) with candidate key A and FDs {A → B, B → C, C → D}, how many transitive dependencies exist?",
    shortAnswer: "Two: A → C (via B) and A → D (via C or B).",
    explanation: "Chained transitive dependencies.",
    hint: "A → C and A → D.",
    level: "moderate"
  },
  {
    question: "How do you normalize a chained transitive dependency {A → B, B → C, C → D} into 3NF?",
    shortAnswer: "Decompose into 3 separate tables: R1(A, B) with PK=A, R2(B, C) with PK=B, and R3(C, D) with PK=C.",
    explanation: "3NF decomposition of transitive chains.",
    hint: "Three tables: R1(A, B), R2(B, C), and R3(C, D).",
    level: "moderate"
  },
  {
    question: "Does 3NF decomposition guarantee Lossless Join?",
    shortAnswer: "YES. 3NF decomposition algorithms mathematically guarantee the Lossless Join property.",
    explanation: "3NF lossless join property.",
    hint: "Yes, 3NF guarantees lossless join.",
    level: "basic"
  },
  {
    question: "Does 3NF decomposition guarantee Dependency Preservation?",
    shortAnswer: "YES. Unlike BCNF, standard 3NF synthesis algorithms ALWAYS preserve all functional dependencies.",
    explanation: "3NF dependency preservation guarantee.",
    hint: "Yes, 3NF synthesis always preserves dependencies.",
    level: "moderate"
  },
  {
    question: "In an e-commerce order table `Orders(order_id, customer_id, customer_name, customer_city)`, what is the transitive dependency?",
    shortAnswer: "`order_id → {customer_name, customer_city}` through intermediate non-key attribute `customer_id`.",
    explanation: "E-commerce customer transitive dependency.",
    hint: "order_id determines customer_id, which determines customer details.",
    level: "basic"
  },
  {
    question: "How does 3NF decomposition improve database storage efficiency?",
    shortAnswer: "By storing customer/department details once in their own table, saving millions of duplicate string bytes across order/student records.",
    explanation: "Storage efficiency gain in 3NF.",
    hint: "Stores parent details once instead of duplicating across millions of rows.",
    level: "basic"
  },
  {
    question: "What is the second condition of 3NF ('A is a Prime Attribute') designed to allow?",
    shortAnswer: "It allows overlapping candidate keys where a non-key determinant determines part of a candidate key without forcing lossy decomposition.",
    explanation: "Role of the prime attribute clause in 3NF.",
    hint: "Handles overlapping candidate keys while preserving dependencies.",
    level: "expert"
  },
  {
    question: "If relation R(A, B, C) has candidate keys AB and BC, and FD C → A holds, is R in 3NF?",
    shortAnswer: "YES. Although C is not a super key, A is a prime attribute (part of candidate key AB), so condition 2 of 3NF is satisfied.",
    explanation: "3NF prime attribute rule verification.",
    hint: "Yes, because A is a prime attribute.",
    level: "expert"
  },
  {
    question: "In healthcare, if `Patient_Visits(visit_id, patient_id, doctor_id, doctor_phone)` has PK `visit_id`, why is it not 3NF?",
    shortAnswer: "Because `visit_id → doctor_id` and `doctor_id → doctor_phone`, meaning `doctor_phone` transitively depends on `visit_id`.",
    explanation: "Healthcare domain transitive dependency.",
    hint: "doctor_phone transitively depends on visit_id via doctor_id.",
    level: "basic"
  },
  {
    question: "How do Foreign Keys connect tables after a 3NF decomposition?",
    shortAnswer: "The original table retains the intermediate determinant column as a FOREIGN KEY referencing the PRIMARY KEY of the newly created master table.",
    explanation: "Foreign key linkage in 3NF schemas.",
    hint: "Intermediate determinant becomes a foreign key referencing the new table.",
    level: "basic"
  },
  {
    question: "What happens if you query a 3NF normalized database when a report needs combined student and department information?",
    shortAnswer: "You execute an SQL `INNER JOIN` or `LEFT JOIN` between `Students` and `Departments` on the `department_id` key.",
    explanation: "Querying 3NF decomposed tables via SQL JOIN.",
    hint: "Use an SQL JOIN on the shared foreign key column.",
    level: "basic"
  },
  {
    question: "Can a table with only 2 attributes ever violate 3NF?",
    shortAnswer: "NO. A 2-attribute table in 1NF is automatically in BCNF (and therefore 3NF) because no intermediate non-key attribute can exist.",
    explanation: "Binary relation theorem in normalization.",
    hint: "No, 2-attribute tables are automatically in 3NF and BCNF.",
    level: "moderate"
  },
  {
    question: "What is the risk of allowing transitive dependencies to remain in an enterprise production database?",
    shortAnswer: "Severe data corruption, desynchronized reports, inability to add master catalog records, and accidental permanent data loss on row deletion.",
    explanation: "Production risks of unaddressed transitive dependencies.",
    hint: "Data corruption, desynchronization, and accidental data erasure.",
    level: "basic"
  },
  {
    question: "What is the ultimate takeaway for database engineers regarding Transitive Dependencies?",
    shortAnswer: "Always inspect non-key attributes: if any non-key attribute determines another non-key attribute (X → Y → Z), immediately decompose into 3NF dedicated tables.",
    explanation: "Final summary conclusion for Topic 5.",
    hint: "Decompose non-key determinants into dedicated tables to achieve 3NF.",
    level: "basic"
  }
];

export default questions;
