// topic4_files/topic4_questions.js

const questions = [
  {
    question: "What is the 'Degree' of a Relationship in ER modeling?",
    shortAnswer: "The number of participating entity sets in that relationship (e.g. Unary = 1, Binary = 2, Ternary = 3, n-ary = n).",
    explanation: "Fundamental metric of relationship complexity.",
    hint: "Number of participating entity sets.",
    level: "basic"
  },
  {
    question: "What is a Unary (Recursive / Degree 1) Relationship?",
    shortAnswer: "A relationship where a single entity set is connected to itself in different roles (e.g. Employee supervises Employee).",
    explanation: "Models hierarchies within the same entity type.",
    hint: "Single entity set relating to itself.",
    level: "basic"
  },
  {
    question: "What is a Binary (Degree 2) Relationship?",
    shortAnswer: "A relationship connecting exactly TWO distinct entity sets (e.g. Student enrolls in Course).",
    explanation: "The most common relationship type in relational design.",
    hint: "Relationship connecting two entity sets.",
    level: "basic"
  },
  {
    question: "What is a Ternary (Degree 3) Relationship?",
    shortAnswer: "A relationship connecting THREE distinct entity sets simultaneously in a single atomic business event.",
    explanation: "Example: Doctor prescribes Medication to Patient.",
    hint: "Simultaneous 3-way entity association.",
    level: "basic"
  },
  {
    question: "Why are Role Names essential in Unary (Recursive) relationships?",
    shortAnswer: "Because the same entity set participates in the relationship in two different capacities (e.g. 'Supervisor' vs 'Supervisee'), and role names clarify which entity plays which role.",
    explanation: "Eliminates ambiguity on recursive relationship lines.",
    hint: "Distinguishes different roles played by the same entity.",
    level: "basic"
  },
  {
    question: "Why is a Ternary Relationship NOT equivalent to three separate Binary relationships?",
    shortAnswer: "Three binary relationships cannot prove the exact simultaneous 3-way intersection event (e.g. which specific doctor prescribed which specific medication to which specific patient).",
    explanation: "Binary decomposition loses atomic multi-way correlation context.",
    hint: "Loses 3-way atomic intersection context.",
    level: "expert"
  },
  {
    question: "How is a Ternary Relationship mapped into a relational schema?",
    shortAnswer: "As a dedicated 3-way Bridge Table containing Foreign Keys referencing all three participating entities, with a Composite Primary Key across all three Foreign Keys.",
    explanation: "`doctor_patient_prescriptions(doctor_id, patient_id, medication_id)`.",
    hint: "3-way bridge table with composite primary key.",
    level: "moderate",
    codeExample: "CREATE TABLE prescriptions (\n    doctor_id INT NOT NULL,\n    patient_id INT NOT NULL,\n    medication_id INT NOT NULL,\n    prescribed_date DATE NOT NULL,\n    PRIMARY KEY (doctor_id, patient_id, medication_id),\n    FOREIGN KEY (doctor_id) REFERENCES doctors(id),\n    FOREIGN KEY (patient_id) REFERENCES patients(id),\n    FOREIGN KEY (medication_id) REFERENCES medications(id)\n);"
  },
  {
    question: "How is a Unary 1:N Relationship mapped into a relational schema?",
    shortAnswer: "As a self-referencing foreign key column in the same table (e.g. `manager_id INT NULL` referencing `emp_id`).",
    explanation: "Adjacency list hierarchical pattern.",
    hint: "Self-referencing foreign key in the same table.",
    level: "basic"
  },
  {
    question: "How is a Unary M:N Relationship (e.g. Course Prerequisites or Social Friends) mapped into a relational schema?",
    shortAnswer: "As a dedicated self-referencing junction table containing two foreign keys that both reference the SAME table: `course_prerequisites(course_id, prerequisite_course_id)`.",
    explanation: "Decomposes recursive M:N graphs.",
    hint: "Self-referencing junction table with two foreign keys.",
    level: "moderate",
    codeExample: "CREATE TABLE course_prerequisites (\n    course_id INT NOT NULL,\n    prereq_course_id INT NOT NULL,\n    PRIMARY KEY (course_id, prereq_course_id),\n    FOREIGN KEY (course_id) REFERENCES courses(course_id),\n    FOREIGN KEY (prereq_course_id) REFERENCES courses(course_id)\n);"
  },
  {
    question: "What is an 'n-ary Relationship' (Degree n)?",
    shortAnswer: "A relationship involving $n$ entity sets simultaneously ($n > 3$).",
    explanation: "Rare in practice; typically refactored into an Associative Entity.",
    hint: "Relationship connecting n entity sets.",
    level: "moderate"
  },
  {
    question: "Why are higher-degree relationships ($n \\ge 4$) typically refactored into Associative Entities?",
    shortAnswer: "Because multi-way relationships are difficult to visualize, index, and enforce structural constraints upon; promoting them to full Entities simplifies schema design.",
    explanation: "Simplifies complex multi-dimensional models.",
    hint: "Promoted to associative entities for simpler indexing and constraint handling.",
    level: "expert"
  },
  {
    question: "How do you query a Ternary Prescription table to find all medications prescribed to 'Mamata Hui' by 'Dr. Sukanta Hui'?",
    shortAnswer: "`SELECT m.medication_name FROM doctor_patient_prescriptions p JOIN medications m ON p.medication_id = m.med_id WHERE p.doctor_id = 1 AND p.patient_id = 101;`.",
    explanation: "Indexed 2-table join starting from the ternary bridge.",
    hint: "WHERE doctor_id = 1 AND patient_id = 101.",
    level: "basic"
  },
  {
    question: "What is a 'Relationship Instance' in ER modeling?",
    shortAnswer: "A specific association between concrete entity instances (e.g. Student #101 enrolled in Course #1).",
    explanation: "Corresponds to a single row in a junction table.",
    hint: "Specific association between concrete entity instances.",
    level: "basic"
  },
  {
    question: "Can a relationship have descriptive attributes attached directly to it?",
    shortAnswer: "Yes, Relationship Attributes describe the relationship itself (e.g. `enrolled_date` on `Enrolls_In`, or `dosage` on `Prescribes`).",
    explanation: "Placed directly in the junction table during relational mapping.",
    hint: "Relationship attributes describe the association event.",
    level: "basic"
  },
  {
    question: "Where do Relationship Attributes get placed during relational mapping of 1:N binary relationships?",
    shortAnswer: "In the table on the 'MANY' (child) side alongside the Foreign Key.",
    explanation: "Because the child entity uniquely determines that relationship instance.",
    hint: "In the child table on the Many side.",
    level: "moderate"
  },
  {
    question: "Where do Relationship Attributes get placed during relational mapping of M:N binary or ternary relationships?",
    shortAnswer: "In the intermediate Bridge/Junction table.",
    explanation: "Because the attributes only exist at the multi-entity intersection.",
    hint: "In the intermediate junction/bridge table.",
    level: "moderate"
  },
  {
    question: "How does Peter Chen notation represent a Ternary Relationship visually?",
    shortAnswer: "A central diamond connected by three solid lines to three separate entity rectangles.",
    explanation: "Visual representation of degree 3 relationships.",
    hint: "Single central diamond connecting 3 entity rectangles.",
    level: "basic"
  },
  {
    question: "What is a 'Bill of Materials' (BOM) problem in relational modeling?",
    shortAnswer: "A classic Unary M:N relationship where a Manufactured Part is composed of multiple Sub-Parts, and Sub-Parts are used in multiple Finished Parts.",
    explanation: "Modeled via `part_assemblies(parent_part_id, component_part_id, quantity)`.",
    hint: "Unary M:N assembly hierarchy.",
    level: "expert",
    codeExample: "CREATE TABLE part_assemblies (\n    parent_part_id INT NOT NULL,\n    child_part_id INT NOT NULL,\n    quantity_needed INT NOT NULL,\n    PRIMARY KEY (parent_part_id, child_part_id)\n);"
  },
  {
    question: "How do you detect and prevent an assembly from containing itself in a Bill of Materials schema?",
    shortAnswer: "Add a `CHECK (parent_part_id != child_part_id)` constraint, and use Recursive CTEs or triggers to prevent circular graph cycles.",
    explanation: "Prevents infinite recursion in assembly trees.",
    hint: "CHECK constraint and recursive cycle detection.",
    level: "expert"
  },
  {
    question: "Can an entity set participate in MULTIPLE DISTINCT relationships with another entity set?",
    shortAnswer: "Yes (e.g. `Professor` can 'Teach' a `Course`, and `Professor` can 'Coordinate' a `Course`).",
    explanation: "Multiple independent relationship diamonds connecting the same two entities.",
    hint: "Multiple distinct relationships between the same two entities.",
    level: "moderate"
  },
  {
    question: "How are multiple relationships between the same two tables mapped into MySQL schemas?",
    shortAnswer: "Each relationship produces its own independent Foreign Key column or independent junction table.",
    explanation: "e.g. `instructor_id` and `coordinator_id` in the `courses` table.",
    hint: "Independent foreign keys or junction tables per relationship.",
    level: "moderate",
    codeExample: "CREATE TABLE courses (\n    course_id INT PRIMARY KEY,\n    teacher_id INT,\n    coordinator_id INT,\n    FOREIGN KEY (teacher_id) REFERENCES faculty(id),\n    FOREIGN KEY (coordinator_id) REFERENCES faculty(id)\n);"
  },
  {
    question: "What is an 'Associative Entity' vs a Ternary Relationship?",
    shortAnswer: "An Associative Entity promotes a multi-way relationship into a full first-class entity with its own independent primary key and lifecycle.",
    explanation: "Allows other child tables to maintain foreign keys pointing to the association.",
    hint: "Promoted to a first-class entity with independent PK.",
    level: "moderate"
  },
  {
    question: "How do you query a self-referencing Course Prerequisite table to find all prerequisites for 'React 19'?",
    shortAnswer: "`SELECT p.course_title FROM course_prerequisites cp JOIN courses p ON cp.prereq_course_id = p.course_id WHERE cp.course_id = 2;`.",
    explanation: "Standard join on the self-referencing junction table.",
    hint: "Join on prereq_course_id WHERE course_id = X.",
    level: "basic"
  },
  {
    question: "What is the cardinality of a Ternary Relationship in Peter Chen notation?",
    shortAnswer: "Specified on each of the 3 connecting lines (e.g. $1:1:1$, $1:1:N$, $1:M:N$, or $M:N:P$), defining how instances of two entities combine with the third.",
    explanation: "Defines multiplicity constraints across 3 dimensions.",
    hint: "3-way multiplicity ratios (1:M:N or M:N:P).",
    level: "expert"
  },
  {
    question: "How does `ON DELETE CASCADE` behave on a 3-way Ternary bridge table?",
    shortAnswer: "Deleting any of the three participating master entities automatically deletes all matching 3-way prescription links involving that entity.",
    explanation: "Preserves referential purity across all 3 dimensions.",
    hint: "Deleting any master entity wipes matching 3-way links.",
    level: "moderate"
  },
  {
    question: "Why is a Binary relationship preferred over a Ternary relationship whenever possible?",
    shortAnswer: "Binary relationships are simpler to understand, require fewer join constraints, index more cleanly, and are directly supported by all ORMs.",
    explanation: "Occam's razor in database design: keep relationships as simple as possible.",
    hint: "Simpler to index, query, and map to ORMs.",
    level: "basic"
  },
  {
    question: "How do you define secondary reverse indexes on a Ternary bridge table `(A, B, C)`?",
    shortAnswer: "Create secondary composite indexes on `(B, C, A)` and `(C, A, B)` so queries filtering by any entity execute via fast B-Tree seeks.",
    explanation: "Covers all leftmost prefix permutations.",
    hint: "Index permutations covering all 3 dimensions.",
    level: "expert",
    codeExample: "CREATE INDEX idx_ternary_b ON prescriptions(patient_id, medication_id, doctor_id);\nCREATE INDEX idx_ternary_c ON prescriptions(medication_id, doctor_id, patient_id);"
  },
  {
    question: "Can a Ternary relationship have a Weak Entity dependent on it?",
    shortAnswer: "Yes, though rare, a child weak entity can reference the composite primary key `(A, B, C)` of the ternary table.",
    explanation: "Hierarchical multi-tier compound keys.",
    hint: "Weak entity referencing ternary composite key.",
    level: "expert"
  },
  {
    question: "What is the maximum degree of a relationship supported in theoretical ER modeling?",
    shortAnswer: "Unbounded (any positive integer $n$), though in practical database engineering $n \\le 3$ represents 99.9% of real-world schemas.",
    explanation: "Theoretical relational completeness supports n-ary relations.",
    hint: "Theoretically unbounded; practically n <= 3.",
    level: "basic"
  },
  {
    question: "What is the recommended checklist for modeling Relationship Types and Degrees in ER diagrams?",
    shortAnswer: "1) Identify Unary relationships and label explicit Role Names. 2) Model standard 2-entity interactions as Binary links. 3) Identify atomic 3-way events as Ternary links. 4) Map Ternary links into 3-way bridge tables with Composite PKs. 5) Create permutation reverse indexes on multi-column bridges.",
    explanation: "Following these 5 rules guarantees precise semantic modeling and high-speed multi-way querying.",
    hint: "Role names on Unary, Binary for standard, Ternary for 3-way events, 3-way bridge tables, Permutation indexes.",
    level: "basic"
  }
];

export default questions;
