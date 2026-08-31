// topic11_files/topic11_questions.js

const questions = [
  {
    question: "What is the formal definition of Boyce-Codd Normal Form (BCNF)?",
    shortAnswer: "A relation schema R is in BCNF if and only if for every non-trivial functional dependency X → Y holding on R, X is a Super Key of R.",
    explanation: "Standard formal definition of BCNF (also called 3.5NF).",
    hint: "Every determinant X must be a Super Key.",
    level: "basic"
  },
  {
    question: "Who formulated Boyce-Codd Normal Form and in what year?",
    shortAnswer: "Raymond F. Boyce and Edgar F. Codd in 1974.",
    explanation: "Historical background of BCNF.",
    hint: "Raymond F. Boyce and Edgar F. Codd (1974).",
    level: "basic"
  },
  {
    question: "What is the key difference between 3NF and BCNF?",
    shortAnswer: "3NF allows a dependency X → A if A is a Prime Attribute (even if X is not a super key). BCNF has NO prime attribute exception: X MUST be a super key.",
    explanation: "Comparison of 3NF vs BCNF rules.",
    hint: "BCNF removes the 'A is a Prime Attribute' exception.",
    level: "basic"
  },
  {
    question: "Is every BCNF relation automatically in 3NF?",
    shortAnswer: "YES. BCNF is strictly stronger than 3NF (BCNF ⊂ 3NF ⊂ 2NF ⊂ 1NF).",
    explanation: "Normal form hierarchy.",
    hint: "Yes, BCNF is a stricter subset of 3NF.",
    level: "basic"
  },
  {
    question: "Is every 3NF relation automatically in BCNF?",
    shortAnswer: "NO. A 3NF relation with overlapping candidate keys where a non-key determines a prime attribute violates BCNF.",
    explanation: "3NF relations that fail BCNF.",
    hint: "No, overlapping candidate keys can cause 3NF tables to violate BCNF.",
    level: "basic"
  },
  {
    question: "Give the classic benchmark example of a relation that is in 3NF but NOT in BCNF.",
    shortAnswer: "`Student_Advisor(student_id, major, advisor_name)` with FDs `(student_id, major) → advisor_name` and `advisor_name → major`.",
    explanation: "The standard student-advisor 3NF vs BCNF benchmark.",
    hint: "Student_Advisor with candidate keys (student_id, major) and (student_id, advisor_name).",
    level: "basic"
  },
  {
    question: "In the `Student_Advisor` table, why does `advisor_name → major` violate BCNF?",
    shortAnswer: "Because `advisor_name` is NOT a Super Key of the relation (it cannot determine `student_id`).",
    explanation: "Why advisor_name → major fails BCNF.",
    hint: "advisor_name is not a super key.",
    level: "basic"
  },
  {
    question: "Why does the `Student_Advisor` table satisfy 3NF?",
    shortAnswer: "Because in `advisor_name → major`, attribute `major` is a Prime Attribute (member of candidate key `(student_id, major)`).",
    explanation: "3NF prime attribute condition satisfaction.",
    hint: "major is a prime attribute.",
    level: "moderate"
  },
  {
    question: "What anomalies exist in the 3NF `Student_Advisor` table if it is not decomposed to BCNF?",
    shortAnswer: "Redundant repetition of an advisor's major across all advised students, inability to insert an advisor with no students, and loss of advisor major if the only student drops out.",
    explanation: "Modification anomalies in 3NF non-BCNF tables.",
    hint: "Update, insertion, and deletion anomalies on advisor major.",
    level: "basic"
  },
  {
    question: "How is `Student_Advisor(student_id, major, advisor_name)` decomposed into BCNF?",
    shortAnswer: "Into `Advisors(advisor_name [PK], major)` and `Student_Advisors(student_id, advisor_name, PK = (student_id, advisor_name))`.",
    explanation: "BCNF decomposition of Student_Advisor.",
    hint: "Advisors table and Student_Advisors junction table.",
    level: "basic"
  },
  {
    question: "What is the major trade-off when decomposing a 3NF relation into BCNF?",
    shortAnswer: "BCNF decomposition is always Lossless, but it may NOT preserve all functional dependencies (Dependency Preservation may be lost).",
    explanation: "The classic BCNF dependency preservation dilemma.",
    hint: "Lossless Join is guaranteed, but Dependency Preservation may be lost.",
    level: "moderate"
  },
  {
    question: "Which original FD is lost (not preserved within a single table) after decomposing `Student_Advisor` to BCNF?",
    shortAnswer: "`(student_id, major) → advisor_name` cannot be checked without an SQL join between `Student_Advisors` and `Advisors`.",
    explanation: "Lost dependency in BCNF decomposition.",
    hint: "(student_id, major) → advisor_name.",
    level: "moderate"
  },
  {
    question: "If all candidate keys in a relation are single attributes (no composite keys), is 3NF equivalent to BCNF?",
    shortAnswer: "YES. If every candidate key is a single column, every 3NF relation is guaranteed to be in BCNF.",
    explanation: "Equivalence theorem for single-attribute keys.",
    hint: "Yes, 3NF and BCNF are identical for single-attribute candidate keys.",
    level: "moderate"
  },
  {
    question: "Can a binary relation R(A, B) with only 2 attributes ever violate BCNF?",
    shortAnswer: "NO. Any relation with only 2 attributes in 1NF is automatically in BCNF.",
    explanation: "Binary relation BCNF theorem.",
    hint: "No, 2-attribute tables automatically satisfy BCNF.",
    level: "basic"
  },
  {
    question: "How does the BCNF decomposition algorithm operate recursively?",
    shortAnswer: "For any violating FD X → Y in R, split R into R1 = X ∪ Y and R2 = (R - Y) ∪ X, then recursively check and decompose R1 and R2 until all components satisfy BCNF.",
    explanation: "Recursive BCNF decomposition algorithm.",
    hint: "Split R into (X ∪ Y) and ((R - Y) ∪ X) recursively.",
    level: "expert"
  },
  {
    question: "Why does BCNF decomposition always guarantee a Lossless Join?",
    shortAnswer: "Because the intersection of decomposed tables R1 and R2 is X (R1 ∩ R2 = X), and X is the primary key of R1, satisfying Heath's Lossless Join Theorem.",
    explanation: "Proof of lossless join in BCNF.",
    hint: "Common attribute X is a super key of R1.",
    level: "expert"
  },
  {
    question: "In property management, if `Property_Rental(property_id, county, lot_no, tax_rate)` has PK `(county, lot_no)` and FD `county → tax_rate`, is it BCNF?",
    shortAnswer: "NO. `county` is not a super key, so `county → tax_rate` violates BCNF (and 2NF).",
    explanation: "Property domain BCNF violation.",
    hint: "county is not a super key.",
    level: "basic"
  },
  {
    question: "What is the BCNF solution for the `Property_Rental` schema?",
    shortAnswer: "`County_Taxes(county [PK], tax_rate)` and `Properties(property_id [PK], county [FK], lot_no)`.",
    explanation: "BCNF decomposition for property taxes.",
    hint: "County_Taxes table and Properties table.",
    level: "basic"
  },
  {
    question: "When should a database architect choose 3NF over BCNF in production?",
    shortAnswer: "When preserving a critical cross-column functional dependency is more important than eliminating the minor redundancy caused by overlapping candidate keys.",
    explanation: "Practical engineering decision between 3NF and BCNF.",
    hint: "When dependency preservation is required without cross-table join constraints.",
    level: "moderate"
  },
  {
    question: "How can a lost functional dependency in BCNF be enforced in MySQL?",
    shortAnswer: "Via application-level transaction locks, SQL materialized views (where supported), or database `BEFORE INSERT/UPDATE` triggers with JOIN checks.",
    explanation: "Enforcing cross-table dependencies in BCNF using triggers.",
    hint: "Using SQL triggers or application-level transactions.",
    level: "moderate"
  },
  {
    question: "If relation R(A, B, C) has FDs {AB → C, C → B}, what are the candidate keys?",
    shortAnswer: "{A, B} and {A, C}.",
    explanation: "Candidate key calculation for classic BCNF counter-example.",
    hint: "{A, B} and {A, C}.",
    level: "moderate"
  },
  {
    question: "In relation R(A, B, C) with FDs {AB → C, C → B}, why does C → B violate BCNF?",
    shortAnswer: "Because C is not a super key (its closure C+ is only {B, C}, missing attribute A).",
    explanation: "Analysis of C → B BCNF violation.",
    hint: "C+ does not contain A, so C is not a super key.",
    level: "moderate"
  },
  {
    question: "Is relation R(A, B, C) with FDs {AB → C, C → B} in 3NF?",
    shortAnswer: "YES, because in C → B, B is a prime attribute (member of candidate key AB).",
    explanation: "3NF validation of R(A, B, C).",
    hint: "Yes, B is a prime attribute.",
    level: "moderate"
  },
  {
    question: "What is the BCNF decomposition of R(A, B, C) with FDs {AB → C, C → B}?",
    shortAnswer: "R1(C, B) with PK = C, and R2(A, C) with PK = (A, C).",
    explanation: "BCNF decomposition of R(A,B,C).",
    hint: "R1(C, B) and R2(A, C).",
    level: "moderate"
  },
  {
    question: "What happens to the dependency AB → C after decomposing R into R1(C, B) and R2(A, C)?",
    shortAnswer: "It is LOST (not dependency preserving) because neither R1 nor R2 contains all three attributes {A, B, C}.",
    explanation: "Loss of dependency in BCNF decomposition.",
    hint: "The dependency AB → C cannot be preserved within a single table.",
    level: "moderate"
  },
  {
    question: "Can a relation with zero non-prime attributes violate BCNF?",
    shortAnswer: "YES! The classic example R(student_id, major, advisor_name) has only prime attributes yet violates BCNF due to advisor_name → major.",
    explanation: "All-prime relation BCNF vulnerability.",
    hint: "Yes, all-prime relations can violate BCNF.",
    level: "expert"
  },
  {
    question: "Why is BCNF considered simpler in definition than 3NF?",
    shortAnswer: "Because it has only ONE clean condition ('every determinant must be a super key') without needing prime attribute definitions or subset tests.",
    explanation: "Conceptual simplicity of BCNF.",
    hint: "Only one condition: every determinant must be a super key.",
    level: "basic"
  },
  {
    question: "In clinic scheduling, if `Appointment(patient_id, date, time, doctor_id)` has PKs `(patient_id, date, time)` and `(doctor_id, date, time)`, and `doctor_id → room`, what normal form is it?",
    shortAnswer: "It violates BCNF and 3NF because `doctor_id` is a non-key determinant (doctor_id → room).",
    explanation: "Clinic scheduling normal form analysis.",
    hint: "Violates BCNF and 3NF.",
    level: "basic"
  },
  {
    question: "What is the primary benefit of reaching BCNF in a write-intensive database?",
    shortAnswer: "Complete elimination of functional dependency-based redundancy, ensuring every single update touches exactly one primary key record.",
    explanation: "Write performance and integrity benefits of BCNF.",
    hint: "Completely eliminates FD-based redundancy.",
    level: "basic"
  },
  {
    question: "What is the ultimate takeaway for database engineers regarding Boyce-Codd Normal Form (BCNF)?",
    shortAnswer: "BCNF strictly requires every determinant to be a super key. If overlapping candidate keys create anomalies, decompose to BCNF if dependency loss is acceptable, or retain 3NF if dependency preservation is mandatory.",
    explanation: "Final summary conclusion for Topic 11.",
    hint: "Strict super key determinants: choose BCNF for zero redundancy or 3NF for dependency preservation.",
    level: "basic"
  }
];

export default questions;
