// topic12_files/topic12_questions.js

const questions = [
  {
    question: "What is a Multi-valued Dependency (MVD) denoted as X ↠ Y?",
    shortAnswer: "A constraint where a determinant attribute set X determines a set of values for Y independently of the remaining attributes Z in the relation.",
    explanation: "Standard relational definition of multi-valued dependency.",
    hint: "X determines a set of Y values independently of other columns.",
    level: "basic"
  },
  {
    question: "Who introduced Multi-valued Dependencies and Fourth Normal Form (4NF)?",
    shortAnswer: "Ronald Fagin in 1977.",
    explanation: "Historical background of 4NF theory.",
    hint: "Ronald Fagin (1977).",
    level: "basic"
  },
  {
    question: "What is the Complementarity Property of Multi-valued Dependencies?",
    shortAnswer: "If X ↠ Y holds in relation R, then X ↠ (R - X - Y) automatically holds as well (MVDs always occur in complementary pairs: X ↠ Y | Z).",
    explanation: "Complementarity rule of MVDs.",
    hint: "MVDs always occur in symmetric pairs.",
    level: "basic"
  },
  {
    question: "What is a Trivial Multi-valued Dependency?",
    shortAnswer: "An MVD X ↠ Y where Y ⊆ X, or where X ∪ Y = R (the combination of X and Y contains all attributes in the relation).",
    explanation: "Definition of trivial MVD.",
    hint: "Y ⊆ X or X ∪ Y = R.",
    level: "basic"
  },
  {
    question: "What is the formal definition of Fourth Normal Form (4NF)?",
    shortAnswer: "A relation schema R is in 4NF if it is in BCNF and for every non-trivial multi-valued dependency X ↠ Y in R, X is a Super Key of R.",
    explanation: "Formal definition of 4NF.",
    hint: "BCNF + every non-trivial MVD has a super key determinant.",
    level: "basic"
  },
  {
    question: "Give an example of a relation that violates 4NF.",
    shortAnswer: "`Instructor(instructor_name, course_taught, hobby)` where courses and hobbies are independent multi-valued facts.",
    explanation: "Classic 4NF violation benchmark.",
    hint: "Instructor table tracking independent courses and hobbies.",
    level: "basic"
  },
  {
    question: "What is the Cartesian Multiplicative Explosion caused by 4NF violations?",
    shortAnswer: "Storing two independent multi-valued attributes in the same table forces an M × N cross-product of duplicate rows (e.g. 3 courses × 4 hobbies = 12 tuples).",
    explanation: "Row proliferation in 4NF violations.",
    hint: "Forces an M × N cross product of rows.",
    level: "basic"
  },
  {
    question: "How is an unnormalized 4NF relation decomposed into 4NF?",
    shortAnswer: "Decompose relation R into two independent binary relations: R1(X, Y) and R2(X, Z) where Z = R - (X ∪ Y).",
    explanation: "4NF decomposition rule via Fagin's Theorem.",
    hint: "Split into R1(X, Y) and R2(X, Z).",
    level: "basic"
  },
  {
    question: "What does Fagin's Theorem state regarding lossless decomposition and MVDs?",
    shortAnswer: "A binary decomposition of relation R into R1(A, B) and R2(A, C) is lossless if and only if the multi-valued dependency A ↠ B (or A ↠ C) holds on R.",
    explanation: "Fagin's Lossless Join Theorem.",
    hint: "Decomposition into (A, B) and (A, C) is lossless iff A ↠ B holds.",
    level: "expert"
  },
  {
    question: "Can a relation with only 2 attributes ever violate 4NF?",
    shortAnswer: "NO. A binary relation in 1NF is automatically in 4NF because every MVD in a 2-attribute table is trivial.",
    explanation: "Binary relation 4NF theorem.",
    hint: "No, 2-attribute tables automatically satisfy 4NF.",
    level: "basic"
  },
  {
    question: "Is every Functional Dependency (FD) also a Multi-valued Dependency (MVD)?",
    shortAnswer: "YES. If X → Y holds, then X ↠ Y automatically holds (a functional dependency is a special case of an MVD where the set has cardinality 1).",
    explanation: "Relationship between FDs and MVDs.",
    hint: "Yes, every FD is a special case of an MVD.",
    level: "moderate"
  },
  {
    question: "Does an MVD X ↠ Y imply the functional dependency X → Y?",
    shortAnswer: "NO. An MVD allows X to map to multiple values of Y, whereas an FD restricts X to mapping to exactly one value of Y.",
    explanation: "MVD does not imply FD.",
    hint: "No, MVDs allow one-to-many mappings.",
    level: "basic"
  },
  {
    question: "In an employee database, if `Employee_Skills_Languages(emp_id, skill, spoken_language)` has PK `(emp_id, skill, spoken_language)`, is it in BCNF?",
    shortAnswer: "YES, it is in BCNF (all attributes are prime, no non-trivial FDs exist), but it VIOLATES 4NF due to MVDs `emp_id ↠ skill` and `emp_id ↠ spoken_language`.",
    explanation: "Distinction between BCNF and 4NF.",
    hint: "Yes, in BCNF but violates 4NF.",
    level: "moderate"
  },
  {
    question: "How is the `Employee_Skills_Languages` table decomposed into 4NF?",
    shortAnswer: "`Employee_Skills(emp_id, skill)` and `Employee_Languages(emp_id, spoken_language)`.",
    explanation: "4NF decomposition of employee skills and languages.",
    hint: "Employee_Skills and Employee_Languages tables.",
    level: "basic"
  },
  {
    question: "What anomaly occurs when adding a new skill to an unnormalized 4NF employee table?",
    shortAnswer: "You must insert multiple rows (one row for every spoken language the employee knows) to maintain data consistency.",
    explanation: "Insertion anomaly in 4NF violations.",
    hint: "Must insert one row per spoken language.",
    level: "basic"
  },
  {
    question: "What anomaly occurs when an employee forgets a spoken language in an unnormalized 4NF table?",
    shortAnswer: "You must delete multiple rows (one for every skill the employee has) rather than deleting a single row.",
    explanation: "Deletion anomaly in 4NF violations.",
    hint: "Must delete multiple rows to remove one language.",
    level: "basic"
  },
  {
    question: "Why can't Functional Dependencies (FDs) detect 4NF anomalies?",
    shortAnswer: "Because in tables with all-prime composite keys and zero single-valued dependencies, no non-trivial FDs exist; MVDs are required to detect independent multivalued sets.",
    explanation: "Limits of FD theory vs MVD theory.",
    hint: "FDs only evaluate single-valued mappings, not independent multi-valued sets.",
    level: "moderate"
  },
  {
    question: "What is the Replication Rule in Armstrong-like axioms for MVDs?",
    shortAnswer: "If X → Y, then X ↠ Y.",
    explanation: "Replication rule for MVD inference.",
    hint: "Every functional dependency implies a multi-valued dependency.",
    level: "expert"
  },
  {
    question: "What is the Coalescence Rule for MVDs?",
    shortAnswer: "If X ↠ Y and there exists W such that W ∩ Y = ∅, W → Z, and Z ⊆ Y, then X → Z.",
    explanation: "Coalescence inference rule.",
    hint: "Coalescence bridges MVDs and FDs.",
    level: "expert"
  },
  {
    question: "In restaurant menu design, if `Restaurant(rest_id, dish_name, payment_method)` has independent dishes and payment methods, what normal form is violated?",
    shortAnswer: "Fourth Normal Form (4NF), due to MVDs `rest_id ↠ dish_name` and `rest_id ↠ payment_method`.",
    explanation: "Restaurant menu 4NF violation.",
    hint: "Violates 4NF.",
    level: "basic"
  },
  {
    question: "How does 4NF decomposition reduce database storage size?",
    shortAnswer: "It converts an M × N multiplicative row explosion into an M + N additive row sum (e.g. 50 skills × 10 languages = 500 rows reduced to 50 + 10 = 60 rows).",
    explanation: "Mathematical storage reduction in 4NF.",
    hint: "Replaces M × N rows with M + N rows.",
    level: "basic"
  },
  {
    question: "Does 4NF decomposition guarantee a Lossless Join?",
    shortAnswer: "YES. By Fagin's Theorem, decomposing across an MVD guarantees that a natural join will reconstruct the original table without spurious rows.",
    explanation: "Lossless join property of 4NF.",
    hint: "Yes, guaranteed by Fagin's Theorem.",
    level: "basic"
  },
  {
    question: "Is every 4NF relation automatically in BCNF and 3NF?",
    shortAnswer: "YES. 4NF is strictly higher than BCNF (4NF ⊂ BCNF ⊂ 3NF ⊂ 2NF ⊂ 1NF).",
    explanation: "Normal form hierarchy.",
    hint: "Yes, 4NF is a stricter subset of BCNF.",
    level: "basic"
  },
  {
    question: "What SQL syntax is used to query 4NF decomposed tables when a combined report is needed?",
    shortAnswer: "A `CROSS JOIN` (or filtered join on shared foreign key `emp_id`) between the two decomposed child tables.",
    explanation: "Querying 4NF decomposed tables.",
    hint: "SQL JOIN on the shared parent entity key.",
    level: "basic"
  },
  {
    question: "If an employee's skills and certifications are NOT independent (e.g. a certification applies to a specific skill), is it a 4NF violation to store them together?",
    shortAnswer: "NO. If `(emp_id, skill) → certification`, there is a functional dependency, meaning the relationship is dependent rather than an independent MVD.",
    explanation: "Dependent vs independent multivalued relationships.",
    hint: "No, because the certification is dependent on the specific skill.",
    level: "moderate"
  },
  {
    question: "What is the primary sign that a developer is violating 4NF in production?",
    shortAnswer: "Designing an all-key composite junction table that combines two completely unrelated many-to-many relationships for the same parent entity.",
    explanation: "Practical detection of 4NF violations.",
    hint: "Combining two unrelated M:N relationships in one table.",
    level: "basic"
  },
  {
    question: "In academy management, if `Student_Activities(student_id, club_name, sport_name)` has independent clubs and sports, what is the 4NF solution?",
    shortAnswer: "`Student_Clubs(student_id, club_name)` and `Student_Sports(student_id, sport_name)`.",
    explanation: "Student activities 4NF decomposition.",
    hint: "Student_Clubs and Student_Sports tables.",
    level: "basic"
  },
  {
    question: "Why are 4NF violations rare in well-modeled Entity-Relationship (ER) designs?",
    shortAnswer: "Because independent many-to-many relationships are modeled as separate relationship sets (diamonds) in ER diagrams, which naturally translate into separate junction tables.",
    explanation: "ER diagram translation to 4NF.",
    hint: "Separate ER diamonds naturally map to separate 4NF junction tables.",
    level: "moderate"
  },
  {
    question: "Can an MVD exist in a table with only 1 multi-valued attribute?",
    shortAnswer: "NO. An MVD requires at least two independent multi-valued facts (or a multi-valued fact and a set of independent non-key attributes) to create non-trivial redundancy.",
    explanation: "Single multivalued attribute condition.",
    hint: "No, requires multiple independent multivalued facts.",
    level: "moderate"
  },
  {
    question: "What is the ultimate takeaway for database engineers regarding Fourth Normal Form (4NF)?",
    shortAnswer: "Never combine two independent many-to-many relationships in the same table; always model each independent multi-valued fact in its own dedicated two-column junction table.",
    explanation: "Final summary conclusion for Topic 12.",
    hint: "Separate independent multi-valued relationships into dedicated junction tables.",
    level: "basic"
  }
];

export default questions;
