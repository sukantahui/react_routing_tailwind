// topic13_files/topic13_questions.js

const questions = [
  {
    question: "What is a Join Dependency (JD) denoted as ⋈[R1, R2, ..., Rn]?",
    shortAnswer: "A constraint stating that a relation R is equal to the lossless Natural Join of its n projections on sub-schemas R1, R2, ..., Rn.",
    explanation: "Standard formal definition of Join Dependency.",
    hint: "R equals the natural join of its n projections.",
    level: "basic"
  },
  {
    question: "Who introduced Join Dependencies and Fifth Normal Form (5NF)?",
    shortAnswer: "Ronald Fagin in 1979.",
    explanation: "Historical background of 5NF theory.",
    hint: "Ronald Fagin (1979).",
    level: "basic"
  },
  {
    question: "What is another name for Fifth Normal Form (5NF)?",
    shortAnswer: "Project-Join Normal Form (PJNF).",
    explanation: "Alternative name emphasizing project-join operators.",
    hint: "Project-Join Normal Form (PJNF).",
    level: "basic"
  },
  {
    question: "What is the relationship between a Multi-valued Dependency (MVD) and a Join Dependency (JD)?",
    shortAnswer: "An MVD is a special case of a Join Dependency with exactly n = 2 components (a binary Join Dependency).",
    explanation: "Relationship between MVD and JD.",
    hint: "An MVD is a binary Join Dependency (n = 2).",
    level: "moderate"
  },
  {
    question: "What is the formal definition of Fifth Normal Form (5NF / PJNF)?",
    shortAnswer: "A relation schema R is in 5NF if it is in 4NF and for every non-trivial Join Dependency ⋈[R1, R2, ..., Rn] holding on R, every Ri is a Super Key of R.",
    explanation: "Formal definition of Fifth Normal Form.",
    hint: "Every component schema in the join dependency must be a super key.",
    level: "basic"
  },
  {
    question: "What is a Trivial Join Dependency?",
    shortAnswer: "A Join Dependency ⋈[R1, R2, ..., Rn] where at least one of the component schemas Ri contains all attributes of R (Ri = R).",
    explanation: "Definition of trivial JD.",
    hint: "One of the component schemas equals the entire relation R.",
    level: "moderate"
  },
  {
    question: "Give the classic benchmark example of a relation violating 5NF.",
    shortAnswer: "`Consulting(developer, company, project)` where developers work on projects for companies under a 3-way cyclic constraint.",
    explanation: "Classic 3-way ternary cyclic 5NF violation.",
    hint: "Ternary relationship between developer, company, and project.",
    level: "basic"
  },
  {
    question: "Why cannot a 5NF-violating table be decomposed losslessly into ONLY 2 tables?",
    shortAnswer: "Because any 2-table decomposition produces spurious (false) tuples upon natural join; only a 3-table cyclic decomposition is lossless.",
    explanation: "Failure of binary decomposition in 5NF violations.",
    hint: "Joining 2 tables produces spurious rows; 3 tables are required for a lossless join.",
    level: "moderate"
  },
  {
    question: "How is `Consulting(developer, company, project)` decomposed into 5NF?",
    shortAnswer: "Into 3 binary tables: `Dev_Company(developer, company)`, `Company_Proj(company, project)`, and `Dev_Proj(developer, project)`.",
    explanation: "5NF 3-table decomposition.",
    hint: "Three binary association tables: (dev, company), (company, proj), and (dev, proj).",
    level: "basic"
  },
  {
    question: "What is the ultimate theoretical limit of normal forms based on projection and join operators?",
    shortAnswer: "Fifth Normal Form (5NF / PJNF) is the final and highest normal form reachable using projection and join operations alone.",
    explanation: "5NF as the theoretical peak of project-join normalization.",
    hint: "5NF is the theoretical limit of project-join decomposition.",
    level: "moderate"
  },
  {
    question: "What is Domain-Key Normal Form (DKNF)?",
    shortAnswer: "A theoretical normal form beyond 5NF where every constraint on a relation is a logical consequence of domain constraints and key constraints alone.",
    explanation: "Overview of DKNF (Fagin, 1981).",
    hint: "Every constraint is a domain or key constraint.",
    level: "expert"
  },
  {
    question: "What is Sixth Normal Form (6NF)?",
    shortAnswer: "A normal form used in temporal and historized databases where tables are decomposed until they contain no non-trivial join dependencies at all (each table has PK + at most 1 attribute).",
    explanation: "Overview of 6NF used in temporal relational engines.",
    hint: "Used in temporal databases: primary key + at most 1 attribute per table.",
    level: "expert"
  },
  {
    question: "Why are 5NF violations extremely rare in real-world software engineering?",
    shortAnswer: "Because cyclic ternary constraints rarely occur in isolation, and experienced developers naturally model ternary relationships as separate binary association tables.",
    explanation: "Rarity of 5NF violations in practice.",
    hint: "Cyclic 3-way constraints are rare and naturally split into separate tables.",
    level: "basic"
  },
  {
    question: "Does 5NF decomposition always guarantee a Lossless Join?",
    shortAnswer: "YES. By definition, a Join Dependency explicitly defines a set of projections whose natural join is guaranteed to be lossless.",
    explanation: "Lossless join property of 5NF.",
    hint: "Yes, guaranteed by the definition of Join Dependency.",
    level: "basic"
  },
  {
    question: "Can a relation with only 2 attributes violate 5NF?",
    shortAnswer: "NO. Any binary relation in 1NF is automatically in 5NF.",
    explanation: "Binary relation theorem.",
    hint: "No, 2-attribute tables automatically satisfy 5NF.",
    level: "basic"
  },
  {
    question: "Can a relation in 4NF violate 5NF?",
    shortAnswer: "YES, if it contains an n-ary Join Dependency (n ≥ 3) that cannot be expressed as binary Multi-valued Dependencies.",
    explanation: "4NF vs 5NF distinction.",
    hint: "Yes, if an n-ary (n ≥ 3) join dependency exists.",
    level: "moderate"
  },
  {
    question: "What is the primary sign that a table needs 5NF decomposition?",
    shortAnswer: "When inserting a new tuple requires verifying a 3-way cyclic business rule across three entities to prevent inconsistent combinations.",
    explanation: "Practical detection of 5NF requirements.",
    hint: "Presence of a 3-way cyclic business integrity rule.",
    level: "moderate"
  },
  {
    question: "In hospital staffing, if `Doctor_Hospital_Specialty(doc, hosp, spec)` has a 3-way cyclic rule, what is the 5NF schema?",
    shortAnswer: "`Doc_Hospital(doc, hosp)`, `Hospital_Specialty(hosp, spec)`, and `Doc_Specialty(doc, spec)`.",
    explanation: "Healthcare domain 5NF decomposition.",
    hint: "Three binary association tables.",
    level: "basic"
  },
  {
    question: "How does 5NF eliminate update anomalies in ternary cyclic tables?",
    shortAnswer: "Updating or deleting a pairing (e.g. a company dropping a project) modifies exactly one row in one binary table rather than cascade-updating many ternary rows.",
    explanation: "Update anomaly resolution in 5NF.",
    hint: "Modifies exactly one row in one binary table.",
    level: "basic"
  },
  {
    question: "What SQL syntax is used to reconstruct the original ternary relation from 3 decomposed 5NF tables?",
    shortAnswer: "`SELECT * FROM T1 NATURAL JOIN T2 NATURAL JOIN T3` (or equivalent multi-table `INNER JOIN` on common keys).",
    explanation: "Reconstructing 5NF tables with SQL JOIN.",
    hint: "Multi-table INNER JOIN or NATURAL JOIN across all 3 tables.",
    level: "basic"
  },
  {
    question: "Is it easy to test for Join Dependencies algorithmically?",
    shortAnswer: "NO. Detecting general Join Dependencies and testing 5NF is computationally hard (NP-hard) and requires deep domain semantic knowledge.",
    explanation: "Computational complexity of 5NF testing.",
    hint: "Computationally hard and requires domain semantic knowledge.",
    level: "expert"
  },
  {
    question: "What is a 'Spurious Tuple' in relation join theory?",
    shortAnswer: "A false, non-existent row generated accidentally when joining improperly decomposed tables that do not satisfy a lossless join dependency.",
    explanation: "Definition of spurious tuples.",
    hint: "A false, phantom row generated by lossy joins.",
    level: "basic"
  },
  {
    question: "What is the Chase Algorithm used for in Join Dependency theory?",
    shortAnswer: "A formal tableau-based algorithm used to test whether a given decomposition satisfies a Join Dependency and is lossless.",
    explanation: "Role of the Chase Algorithm in JD verification.",
    hint: "Tableau-based algorithm for verifying lossless join dependencies.",
    level: "expert"
  },
  {
    question: "How does 5NF affect query read performance vs write performance?",
    shortAnswer: "It maximizes write integrity and eliminates redundancy, but requires 3-way joins for read queries (which can be optimized using indexes or views).",
    explanation: "Read vs write trade-offs in 5NF.",
    hint: "Maximizes write integrity at the cost of requiring 3-way joins on reads.",
    level: "moderate"
  },
  {
    question: "In academy management, if `Instructor_Course_Textbook(instructor, course, book)` has a cyclic rule, what is the 5NF solution?",
    shortAnswer: "`Instructor_Courses(inst, course)`, `Course_Books(course, book)`, and `Instructor_Books(inst, book)`.",
    explanation: "Academy textbook 5NF solution.",
    hint: "Three separate binary tables.",
    level: "basic"
  },
  {
    question: "Why is 3NF/BCNF typically the stopping point for most commercial database applications instead of 5NF?",
    shortAnswer: "Because 3NF/BCNF resolves over 99% of real-world anomalies, and the performance cost of 3-way joins in 5NF often outweighs its marginal redundancy benefits.",
    explanation: "Practical standard in software engineering.",
    hint: "3NF/BCNF solves over 99% of practical anomalies without extra join overhead.",
    level: "basic"
  },
  {
    question: "What constraint must be enforced if 5NF tables are maintained separately?",
    shortAnswer: "Foreign Key constraints referencing the individual master entities (e.g. Developers, Companies, Projects).",
    explanation: "Referential integrity in 5NF binary tables.",
    hint: "Foreign key constraints referencing master entity tables.",
    level: "basic"
  },
  {
    question: "Can a relation with no multi-valued dependencies still violate 5NF?",
    shortAnswer: "YES. A table with cyclic ternary join dependencies can be in 4NF (zero non-trivial MVDs) yet still violate 5NF.",
    explanation: "4NF relations violating 5NF.",
    hint: "Yes, through n-ary cyclic join dependencies.",
    level: "moderate"
  },
  {
    question: "What is the complete hierarchy of relational normal forms?",
    shortAnswer: "UNF ➔ 1NF ➔ 2NF ➔ 3NF ➔ BCNF ➔ 4NF ➔ 5NF (PJNF) ➔ 6NF / DKNF.",
    explanation: "Complete hierarchy of relational normal forms.",
    hint: "1NF ➔ 2NF ➔ 3NF ➔ BCNF ➔ 4NF ➔ 5NF ➔ 6NF.",
    level: "basic"
  },
  {
    question: "What is the ultimate takeaway for database engineers regarding Fifth Normal Form (5NF)?",
    shortAnswer: "5NF represents the absolute theoretical peak of project-join decomposition; when you encounter ternary cyclic relationships, decompose them into 3 binary association tables to eliminate all remaining redundancy.",
    explanation: "Final summary conclusion for Topic 13.",
    hint: "Theoretical peak of project-join normalization: decompose ternary cycles into 3 binary tables.",
    level: "basic"
  }
];

export default questions;
