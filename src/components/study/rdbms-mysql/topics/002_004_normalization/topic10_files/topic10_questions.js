// topic10_files/topic10_questions.js

const questions = [
  {
    question: "What is the formal definition of Third Normal Form (3NF)?",
    shortAnswer: "A relation schema R is in 3NF if it is in 2NF and no non-prime attribute is transitively dependent on any candidate key of R.",
    explanation: "Dr. E.F. Codd's standard definition of Third Normal Form.",
    hint: "2NF + no non-prime attribute transitively dependent on candidate keys.",
    level: "basic"
  },
  {
    question: "State the two mathematical conditions in the modern definition of 3NF for every non-trivial FD X → A.",
    shortAnswer: "At least one of the following must hold: 1) X is a Super Key of R, OR 2) A is a Prime Attribute of R.",
    explanation: "Standard disjunctive definition of 3NF.",
    hint: "X is a Super Key OR A is a Prime Attribute.",
    level: "basic"
  },
  {
    question: "What is a Transitive Dependency in 3NF theory?",
    shortAnswer: "A dependency between non-prime attributes where a non-key column functionally determines another non-key column (e.g. X → Y → Z where Y is not a candidate key).",
    explanation: "Definition of transitive dependency.",
    hint: "A non-key column determines another non-key column.",
    level: "basic"
  },
  {
    question: "What is the famous database normalization mantra?",
    shortAnswer: "'Every non-key attribute must provide a fact about the key (1NF), the whole key (2NF), and nothing but the key (3NF), so help me Codd!'",
    explanation: "The mnemonic summarizing 1NF, 2NF, and 3NF.",
    hint: "The key, the whole key, and nothing but the key.",
    level: "basic"
  },
  {
    question: "Give an example of a 3NF violation from a student admissions table.",
    shortAnswer: "In `Students(student_id, name, department_id, department_head)`, `student_id → department_id` and `department_id → department_head` create a transitive dependency `student_id → department_head`.",
    explanation: "Classic 3NF violation example.",
    hint: "department_id determines department_head inside the Students table.",
    level: "basic"
  },
  {
    question: "Why does a 3NF violation cause an Update Anomaly?",
    shortAnswer: "Because the dependent non-key attribute (e.g. `department_head`) is redundantly stored across all students in that department; updating one row without the others causes inconsistent data.",
    explanation: "Mechanism of update anomaly in 3NF violations.",
    hint: "Redundant department data across student rows gets out of sync on updates.",
    level: "basic"
  },
  {
    question: "Why does a 3NF violation cause an Insertion Anomaly?",
    shortAnswer: "Because a new department (name, head, building) cannot be added to the database until at least one student enrolls in it, because `student_id` cannot be NULL.",
    explanation: "Mechanism of insertion anomaly in 3NF violations.",
    hint: "Cannot insert a new department without having an enrolled student.",
    level: "basic"
  },
  {
    question: "Why does a 3NF violation cause a Deletion Anomaly?",
    shortAnswer: "Because deleting the last enrolled student in a department permanently erases all details of that department from the database.",
    explanation: "Mechanism of deletion anomaly in 3NF violations.",
    hint: "Deleting the only student in a department deletes the entire department.",
    level: "basic"
  },
  {
    question: "How do you decompose a relation to eliminate a 3NF violation X → Y → Z?",
    shortAnswer: "Create table R1(Y, Z) with Y as Primary Key, and retain Y as a Foreign Key in table R2(X, Y) with X as Primary Key, dropping Z from R2.",
    explanation: "3NF decomposition procedure.",
    hint: "Create R1(Y, Z) with Y as PK, and retain Y as FK in R2(X, Y).",
    level: "moderate"
  },
  {
    question: "In the relation `Employee(emp_id, emp_name, zip_code, city, state)` where `emp_id → zip_code` and `zip_code → {city, state}`, how is it decomposed into 3NF?",
    shortAnswer: "`Zip_Codes(zip_code [PK], city, state)` and `Employees(emp_id [PK], emp_name, zip_code [FK])`.",
    explanation: "3NF decomposition of zip code dependency.",
    hint: "Zip_Codes table and Employees table with zip_code as foreign key.",
    level: "basic"
  },
  {
    question: "What is the role of the 'A is a Prime Attribute' clause in the 3NF definition?",
    shortAnswer: "It allows overlapping candidate keys where a non-key determinant determines a prime attribute without forcing lossy decomposition (which BCNF would force).",
    explanation: "Purpose of the second condition in 3NF.",
    hint: "Allows overlapping candidate keys while preserving all dependencies.",
    level: "expert"
  },
  {
    question: "If relation R(A, B, C) has candidate keys AB and BC, and FD C → A holds, is R in 3NF?",
    shortAnswer: "YES. Although C is not a super key, attribute A is a Prime Attribute (member of candidate key AB), so condition 2 is satisfied.",
    explanation: "3NF prime attribute rule verification.",
    hint: "Yes, because attribute A is a prime attribute.",
    level: "expert"
  },
  {
    question: "Is the relation in the previous question (R(A, B, C) with candidate keys AB, BC and FD C → A) in Boyce-Codd Normal Form (BCNF)?",
    shortAnswer: "NO. BCNF strictly requires every determinant to be a super key; since C is not a super key, it violates BCNF.",
    explanation: "Distinction between 3NF and BCNF.",
    hint: "No, C is not a super key so it violates BCNF.",
    level: "expert"
  },
  {
    question: "Does 3NF synthesis always guarantee Dependency Preservation?",
    shortAnswer: "YES. Standard 3NF synthesis algorithms mathematically guarantee that ALL original functional dependencies are preserved across decomposed tables.",
    explanation: "Dependency preservation guarantee of 3NF.",
    hint: "Yes, 3NF always preserves all functional dependencies.",
    level: "moderate"
  },
  {
    question: "Does 3NF decomposition always guarantee Lossless Join?",
    shortAnswer: "YES. 3NF decomposition is mathematically guaranteed to be lossless.",
    explanation: "Lossless join guarantee of 3NF.",
    hint: "Yes, 3NF guarantees lossless joins.",
    level: "basic"
  },
  {
    question: "What is the difference between 2NF and 3NF violations?",
    shortAnswer: "2NF violations involve a proper subset of a composite primary key determining a non-prime attribute (partial). 3NF violations involve a non-prime attribute determining another non-prime attribute (transitive).",
    explanation: "Comparison of 2NF vs 3NF violations.",
    hint: "2NF: part of key → non-key; 3NF: non-key → non-key.",
    level: "moderate"
  },
  {
    question: "Can a relation with a single-column primary key violate 2NF?",
    shortAnswer: "NO. A single-column key cannot have proper subsets, so it is automatically in 2NF.",
    explanation: "Single-column primary key property in 2NF.",
    hint: "No, single-column primary keys cannot violate 2NF.",
    level: "basic"
  },
  {
    question: "Can a relation with a single-column primary key violate 3NF?",
    shortAnswer: "YES! If any non-key attribute determines another non-key attribute, it violates 3NF regardless of whether the primary key is single or composite.",
    explanation: "Single-column primary key vulnerability to 3NF violations.",
    hint: "Yes, transitive dependencies can easily exist in single-PK tables.",
    level: "basic"
  },
  {
    question: "In an e-commerce order table `Orders(order_id, customer_id, customer_name, customer_email)`, what is the transitive dependency?",
    shortAnswer: "`order_id → customer_id` and `customer_id → {customer_name, customer_email}`.",
    explanation: "E-commerce customer transitive dependency.",
    hint: "customer_id determines customer details inside the Orders table.",
    level: "basic"
  },
  {
    question: "How is the orders table decomposed into 3NF?",
    shortAnswer: "`Customers(customer_id [PK], customer_name, customer_email)` and `Orders(order_id [PK], customer_id [FK], order_date)`.",
    explanation: "3NF decomposition of orders table.",
    hint: "Customers table and Orders table with customer_id foreign key.",
    level: "basic"
  },
  {
    question: "What SQL syntax is used to reconnect 3NF decomposed tables in reports?",
    shortAnswer: "`SELECT ... FROM table1 JOIN table2 ON table1.fk = table2.pk`.",
    explanation: "Rejoining 3NF tables using SQL JOIN.",
    hint: "SQL INNER JOIN or LEFT JOIN.",
    level: "basic"
  },
  {
    question: "Can a binary relation R(A, B) with only 2 attributes ever violate 3NF?",
    shortAnswer: "NO. Every binary relation in 1NF is automatically in 3NF and BCNF.",
    explanation: "Binary relation normal form theorem.",
    hint: "No, 2-attribute tables automatically satisfy 3NF.",
    level: "moderate"
  },
  {
    question: "What is an 'Extraneous Attribute' in 3NF minimal cover algorithms?",
    shortAnswer: "An attribute in a functional dependency that can be deleted without reducing the set of reachable dependencies (closure).",
    explanation: "Definition of extraneous attribute in 3NF minimal covers.",
    hint: "An unnecessary attribute that can be removed without altering the closure.",
    level: "expert"
  },
  {
    question: "Why is 3NF considered the industry standard target for most Online Transaction Processing (OLTP) databases?",
    shortAnswer: "Because it eliminates almost all practical data anomalies while guaranteeing both lossless joins and dependency preservation with high write throughput.",
    explanation: "Industry standard rationale for 3NF.",
    hint: "Eliminates anomalies while preserving dependencies and ensuring lossless joins.",
    level: "basic"
  },
  {
    question: "In hospital management, if `Prescriptions(rx_id, doctor_id, doctor_hospital, patient_id)` has PK `rx_id`, why is it not in 3NF?",
    shortAnswer: "Because `rx_id → doctor_id` and `doctor_id → doctor_hospital`, creating a transitive dependency where `doctor_id` is a non-key determinant.",
    explanation: "Healthcare domain 3NF violation.",
    hint: "doctor_hospital transitively depends on rx_id via doctor_id.",
    level: "basic"
  },
  {
    question: "What is the 3NF decomposed schema for the hospital prescription table?",
    shortAnswer: "`Doctors(doctor_id [PK], doctor_hospital)` and `Prescriptions(rx_id [PK], doctor_id [FK], patient_id)`.",
    explanation: "3NF decomposition for doctors and prescriptions.",
    hint: "Doctors master table and Prescriptions table with doctor_id foreign key.",
    level: "basic"
  },
  {
    question: "How does 3NF decomposition improve database indexing efficiency?",
    shortAnswer: "By shrinking wide tables with redundant string columns into narrow tables with clean integer foreign keys, fitting more rows per buffer pool page.",
    explanation: "Buffer pool and indexing efficiency in 3NF.",
    hint: "Shrinks table width, fitting more rows per database page in RAM.",
    level: "moderate"
  },
  {
    question: "What happens if a database is left in 2NF without achieving 3NF?",
    shortAnswer: "Non-key updates will continue to cause desynchronization, new master catalog records cannot be created without child rows, and deletions will wipe out master data.",
    explanation: "Risks of stopping at 2NF.",
    hint: "Persistent update anomalies, insertion blocks, and accidental deletions.",
    level: "basic"
  },
  {
    question: "If all candidate keys in relation R are single attributes, does 3NF imply BCNF?",
    shortAnswer: "YES. When all candidate keys are single attributes, every prime attribute belongs to a single-attribute key, meaning 3NF and BCNF coincide completely.",
    explanation: "Equivalence theorem between 3NF and BCNF for single-attribute keys.",
    hint: "Yes, 3NF and BCNF are identical when all candidate keys are single-column.",
    level: "expert"
  },
  {
    question: "What is the ultimate takeaway for database engineers regarding Third Normal Form (3NF)?",
    shortAnswer: "Ensure every non-key attribute provides a direct fact about the primary key alone; if any non-key column determines another non-key column, decompose it into a dedicated table.",
    explanation: "Final summary conclusion for Topic 10.",
    hint: "Eliminate non-key to non-key dependencies by creating dedicated master tables.",
    level: "basic"
  }
];

export default questions;
