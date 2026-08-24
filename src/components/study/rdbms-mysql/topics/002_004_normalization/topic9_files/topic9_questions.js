// topic9_files/topic9_questions.js

const questions = [
  {
    question: "What is the formal definition of Second Normal Form (2NF)?",
    shortAnswer: "A relation schema R is in 2NF if it is in 1NF and no non-prime attribute is partially dependent on any candidate key of R.",
    explanation: "Dr. E.F. Codd's definition of Second Normal Form.",
    hint: "1NF + every non-prime attribute is fully dependent on every candidate key.",
    level: "basic"
  },
  {
    question: "What is a Partial Dependency in 2NF theory?",
    shortAnswer: "A functional dependency X → A where A is a non-prime attribute and X is a proper subset of a composite candidate key.",
    explanation: "Definition of partial dependency.",
    hint: "A non-prime attribute depends on only part of a composite key.",
    level: "basic"
  },
  {
    question: "Under what condition is a 1NF relation AUTOMATICALLY in Second Normal Form (2NF)?",
    shortAnswer: "When all of its Candidate Keys consist of single attributes (no composite candidate keys exist).",
    explanation: "Single-attribute candidate key theorem.",
    hint: "When all candidate keys are single-column.",
    level: "basic"
  },
  {
    question: "What is a 'Prime Attribute'?",
    shortAnswer: "An attribute that is a member of at least one Candidate Key in the relation schema.",
    explanation: "Definition of prime attribute.",
    hint: "Any attribute that belongs to a candidate key.",
    level: "basic"
  },
  {
    question: "What is a 'Non-Prime Attribute'?",
    shortAnswer: "An attribute that is NOT a member of any candidate key in the relation schema.",
    explanation: "Definition of non-prime attribute.",
    hint: "An attribute not part of any candidate key.",
    level: "basic"
  },
  {
    question: "Give an example of a 2NF violation from a student enrollment table.",
    shortAnswer: "In `(student_id, course_id) → student_name`, `student_name` depends only on `student_id`, which is a proper subset of the composite PK `(student_id, course_id)`.",
    explanation: "Enrollment partial dependency example.",
    hint: "student_name depends only on student_id.",
    level: "basic"
  },
  {
    question: "Why does a 2NF violation cause an Update Anomaly?",
    shortAnswer: "Because parent entity attributes (e.g. course fees or student cities) are duplicated across hundreds of enrollment rows; updating one row without the others creates inconsistent data.",
    explanation: "Update anomaly mechanism in 2NF violations.",
    hint: "Redundant parent attributes across multiple child rows get desynchronized.",
    level: "basic"
  },
  {
    question: "Why does a 2NF violation cause an Insertion Anomaly?",
    shortAnswer: "Because a new course or student cannot be created in the database until they are enrolled together, because composite primary key components cannot be NULL.",
    explanation: "Insertion anomaly mechanism in 2NF violations.",
    hint: "Cannot insert a course without an enrolled student because PK cannot be NULL.",
    level: "basic"
  },
  {
    question: "Why does a 2NF violation cause a Deletion Anomaly?",
    shortAnswer: "Because deleting the only student enrolled in a course deletes all records of the course's existence, title, and fee.",
    explanation: "Deletion anomaly mechanism in 2NF violations.",
    hint: "Deleting the last enrolled student wipes out course details.",
    level: "basic"
  },
  {
    question: "How do you decompose a relation into 2NF to eliminate partial dependencies?",
    shortAnswer: "Create separate tables for each partial dependency where the partial determinant becomes the Primary Key, and retain only fully dependent attributes in the composite junction table.",
    explanation: "2NF decomposition procedure.",
    hint: "Move partial dependencies into dedicated tables with the subset as Primary Key.",
    level: "moderate"
  },
  {
    question: "In relation R(A, B, C, D) with candidate key (A, B) and FDs {AB → C, A → D}, is R in 2NF?",
    shortAnswer: "NO. A → D is a partial dependency because D is a non-prime attribute dependent on proper subset A.",
    explanation: "Identification of 2NF violation in formal schema.",
    hint: "No, A → D is a partial dependency.",
    level: "basic"
  },
  {
    question: "How is R(A, B, C, D) with PK (A, B) and FDs {AB → C, A → D} decomposed into 2NF?",
    shortAnswer: "R1(A, D) with PK = A, and R2(A, B, C) with PK = (A, B) and FK = A referencing R1.",
    explanation: "2NF decomposition result.",
    hint: "R1(A, D) and R2(A, B, C).",
    level: "moderate"
  },
  {
    question: "Does 2NF decomposition guarantee a Lossless Join?",
    shortAnswer: "YES. Since the common attribute between decomposed tables is a super key of one of the tables (by Heath's Theorem), the join is always lossless.",
    explanation: "Lossless join guarantee via Heath's Theorem.",
    hint: "Yes, 2NF decomposition is mathematically lossless.",
    level: "moderate"
  },
  {
    question: "Does 2NF eliminate transitive dependencies?",
    shortAnswer: "NO. 2NF only eliminates partial dependencies; transitive dependencies between non-prime attributes are eliminated in 3NF.",
    explanation: "Scope of 2NF vs 3NF.",
    hint: "No, transitive dependencies require 3NF.",
    level: "basic"
  },
  {
    question: "In an e-commerce order lines table `(order_id, item_id, item_name, unit_price, quantity)`, what are the prime attributes?",
    shortAnswer: "`{order_id, item_id}`.",
    explanation: "Prime attributes in composite order lines.",
    hint: "order_id and item_id.",
    level: "basic"
  },
  {
    question: "In the order lines table, which attribute is FULLY functionally dependent on `(order_id, item_id)`?",
    shortAnswer: "`quantity` (neither order_id alone nor item_id alone determines the quantity purchased in that order).",
    explanation: "Full functional dependency in order lines.",
    hint: "quantity.",
    level: "basic"
  },
  {
    question: "How is the order lines table decomposed into 2NF?",
    shortAnswer: "`Items(item_id [PK], item_name, unit_price)` and `Order_Items(order_id [FK], item_id [FK], quantity, PK = (order_id, item_id))`.",
    explanation: "Decomposition into 2NF items and order items.",
    hint: "Items table and Order_Items junction table.",
    level: "basic"
  },
  {
    question: "If relation R(A, B, C) has candidate key (A, B) and FD {AB → C}, is it in 2NF?",
    shortAnswer: "YES. C is non-prime and depends on the entire candidate key AB (zero partial dependencies).",
    explanation: "Validation of 2NF table.",
    hint: "Yes, C is fully dependent on AB.",
    level: "basic"
  },
  {
    question: "If relation R(A, B, C) has candidate keys (A, B) and (B, C), and FD A → C holds, is R in 2NF?",
    shortAnswer: "YES! Because attribute C is a Prime Attribute (member of candidate key (B, C)), 2NF is not violated (2NF only prohibits partial dependencies of NON-PRIME attributes).",
    explanation: "Prime attribute exemption in 2NF definition.",
    hint: "Yes, because C is a prime attribute.",
    level: "expert"
  },
  {
    question: "Why is a table with a 3-attribute composite primary key more prone to 2NF violations than a 2-attribute key?",
    shortAnswer: "Because it has more proper subsets (single attributes and pairs) that can potentially determine non-prime columns.",
    explanation: "Subset expansion in higher-order composite keys.",
    hint: "More proper subsets create more opportunities for partial dependencies.",
    level: "moderate"
  },
  {
    question: "How do Foreign Keys connect tables after a 2NF decomposition in SQL?",
    shortAnswer: "The child/junction table defines FOREIGN KEY constraints on the subset columns referencing the PRIMARY KEYs of the decomposed parent tables.",
    explanation: "Foreign key linkage in 2NF schemas.",
    hint: "Foreign key constraints in the junction table referencing parent tables.",
    level: "basic"
  },
  {
    question: "In hospital management, if `Prescriptions(patient_id, medication_id, patient_name, dosage)` has PK `(patient_id, medication_id)`, why is it not 2NF?",
    shortAnswer: "Because `patient_name` depends solely on `patient_id` (a proper subset of the composite PK), violating 2NF.",
    explanation: "Healthcare domain 2NF violation.",
    hint: "patient_name depends only on patient_id.",
    level: "basic"
  },
  {
    question: "What is the 2NF normalized schema for the prescriptions table?",
    shortAnswer: "`Patients(patient_id [PK], patient_name)` and `Prescriptions(patient_id [FK], medication_id [FK], dosage, PK = (patient_id, medication_id))`.",
    explanation: "2NF prescription decomposition.",
    hint: "Patients table and Prescriptions junction table.",
    level: "basic"
  },
  {
    question: "What SQL syntax is used to define a Composite Primary Key in 2NF junction tables?",
    shortAnswer: "`PRIMARY KEY (column1, column2)` inside the `CREATE TABLE` statement.",
    explanation: "Composite primary key SQL syntax.",
    hint: "PRIMARY KEY (column1, column2).",
    level: "basic"
  },
  {
    question: "Can a relation with zero non-prime attributes (all attributes are prime) violate 2NF?",
    shortAnswer: "NO. If all attributes are prime, there are no non-prime attributes to be partially dependent, so the relation is automatically in 2NF (and 3NF).",
    explanation: "All-prime relation theorem.",
    hint: "No, all-prime relations automatically satisfy 2NF and 3NF.",
    level: "expert"
  },
  {
    question: "What is the impact of 2NF on data redundancy across multiple rows?",
    shortAnswer: "It dramatically reduces data redundancy by storing parent entity attributes once in their own table rather than repeating them in every child record.",
    explanation: "Storage and redundancy benefits of 2NF.",
    hint: "Dramatically reduces duplicate parent data.",
    level: "basic"
  },
  {
    question: "How does 2NF facilitate independent entity lifecycles?",
    shortAnswer: "Courses and students can exist in their master tables without requiring an active enrollment, solving insertion and deletion anomalies.",
    explanation: "Entity lifecycle independence in 2NF.",
    hint: "Allows parent entities to exist independently of child junction records.",
    level: "basic"
  },
  {
    question: "If a database table has composite key `(order_id, item_id)` and column `order_date`, is it in 2NF?",
    shortAnswer: "NO. `order_date` depends solely on `order_id` (a partial dependency), so it must be moved to an `Orders` parent table.",
    explanation: "Partial dependency on order_date.",
    hint: "No, order_date depends only on order_id.",
    level: "basic"
  },
  {
    question: "What happens when you execute a query on a 2NF schema requiring both student and course names?",
    shortAnswer: "You write an SQL `JOIN` across `Students`, `Enrollments`, and `Courses` on their foreign key relationships.",
    explanation: "SQL multi-table join across 2NF schemas.",
    hint: "Perform an SQL JOIN across the parent and junction tables.",
    level: "basic"
  },
  {
    question: "What is the ultimate takeaway for database engineers regarding Second Normal Form (2NF)?",
    shortAnswer: "Whenever you have a composite candidate key, ensure every non-prime attribute requires the ENTIRE key to exist; move any partially dependent attributes into dedicated parent tables.",
    explanation: "Final summary conclusion for Topic 9.",
    hint: "Move partial dependencies on composite key subsets into dedicated parent tables.",
    level: "basic"
  }
];

export default questions;
