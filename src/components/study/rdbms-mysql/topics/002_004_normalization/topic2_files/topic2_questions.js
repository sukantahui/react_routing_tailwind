// topic2_files/topic2_questions.js

const questions = [
  {
    question: "What is the formal mathematical definition of a Functional Dependency (X → Y) in relation schema R?",
    shortAnswer: "For any legal relation instance r(R), for all pairs of tuples t1, t2 ∈ r, if t1[X] = t2[X], then t1[Y] = t2[Y].",
    explanation: "Formal definition of functional dependencies according to relational database theory.",
    hint: "If two tuples agree on attribute set X, they must also agree on attribute set Y.",
    level: "basic"
  },
  {
    question: "In the functional dependency expression X → Y, what are X and Y called?",
    shortAnswer: "X is called the Determinant (left-hand side), and Y is called the Dependent (right-hand side).",
    explanation: "Standard terminology for functional dependencies.",
    hint: "X = Determinant, Y = Dependent.",
    level: "basic"
  },
  {
    question: "What does the statement 'student_id → student_name' mean in plain business English?",
    shortAnswer: "Each unique student_id corresponds to exactly one student name; no two different names can share the same student_id.",
    explanation: "Semantic interpretation of single-attribute functional dependency.",
    hint: "Given a student_id, the student name is uniquely determined.",
    level: "basic"
  },
  {
    question: "Does the functional dependency X → Y imply that Y → X also holds?",
    shortAnswer: "NO. Functional dependencies are strictly unidirectional (e.g., student_id → city does NOT imply city → student_id).",
    explanation: "Asymmetry of functional dependencies.",
    hint: "No, FDs are not symmetrical.",
    level: "basic"
  },
  {
    question: "Why can't functional dependencies be proven solely by inspecting a temporary table snapshot of 5 rows?",
    shortAnswer: "Because FDs represent universal semantic integrity constraints governing ALL possible future valid states of the database, not accidental uniqueness in a sample dataset.",
    explanation: "Semantic invariant vs sample instance distinction.",
    hint: "FDs are business domain rules, not accidental coincidences in sample rows.",
    level: "moderate"
  },
  {
    question: "What is a Composite Determinant?",
    shortAnswer: "A determinant consisting of two or more attributes working together, such as (student_id, course_id) → grade.",
    explanation: "Definition of multi-attribute determinant.",
    hint: "A multi-attribute left-hand side like (student_id, course_id).",
    level: "basic"
  },
  {
    question: "If attribute set X functionally determines all attributes in relation R (X → R), what is X called?",
    shortAnswer: "A Super Key of relation R.",
    explanation: "Definition of a super key in terms of functional dependencies.",
    hint: "Super Key.",
    level: "basic"
  },
  {
    question: "What is the relationship between a Super Key and a Candidate Key in terms of functional dependencies?",
    shortAnswer: "A Candidate Key is a minimal super key (a super key from which no attribute can be removed without losing the property of determining all attributes in R).",
    explanation: "Candidate key minimality definition.",
    hint: "A candidate key is a minimal super key.",
    level: "basic"
  },
  {
    question: "What is a Trivial Functional Dependency?",
    shortAnswer: "A dependency X → Y where Y is a subset of X (Y ⊆ X), such as {student_id, name} → student_id.",
    explanation: "Definition of trivial FD.",
    hint: "Y is a subset of X (Y ⊆ X).",
    level: "basic"
  },
  {
    question: "What is a Non-Trivial Functional Dependency?",
    shortAnswer: "A dependency X → Y where Y is NOT a subset of X (Y ⊈ X), meaning X determines new information not already contained in X.",
    explanation: "Definition of non-trivial FD.",
    hint: "Y is not a subset of X.",
    level: "basic"
  },
  {
    question: "What is a Completely Non-Trivial Functional Dependency?",
    shortAnswer: "A dependency X → Y where X ∩ Y = ∅ (the intersection of X and Y is completely empty).",
    explanation: "Definition of completely non-trivial FD.",
    hint: "X and Y share no common attributes (X ∩ Y = ∅).",
    level: "moderate"
  },
  {
    question: "In a college database, why is `city → student_id` an INVALID functional dependency?",
    shortAnswer: "Because a single city (e.g. Barrackpore) contains multiple students, violating the rule that one determinant value must map to exactly one dependent value.",
    explanation: "Violation of functional dependency uniqueness.",
    hint: "One city maps to multiple different student IDs.",
    level: "basic"
  },
  {
    question: "How is a Functional Dependency represented in Relational Decomposition algorithms?",
    shortAnswer: "As a production rule in the set of functional dependencies F, used to calculate attribute closures (X+) and verify lossless joins.",
    explanation: "Role of FDs in schema synthesis and decomposition.",
    hint: "Used in attribute closure algorithms to find keys and decompose tables.",
    level: "moderate"
  },
  {
    question: "What is a Partial Dependency?",
    shortAnswer: "A functional dependency where a non-prime attribute depends on only a proper subset of a composite candidate key (e.g. course_id → course_fee when PK is (student_id, course_id)).",
    explanation: "Definition of partial dependency (violation of 2NF).",
    hint: "Non-key attribute depends on part of a composite primary key.",
    level: "basic"
  },
  {
    question: "What is a Transitive Dependency?",
    shortAnswer: "A functional dependency between non-prime attributes where X → Y and Y → Z (where Y is not a candidate key and Z does not belong to any candidate key).",
    explanation: "Definition of transitive dependency (violation of 3NF).",
    hint: "A non-key attribute determines another non-key attribute (X → Y → Z).",
    level: "basic"
  },
  {
    question: "If relation R has schema (A, B, C) and functional dependencies {A → B, B → C}, what is the candidate key?",
    shortAnswer: "Attribute A (since A+ = {A, B, C}).",
    explanation: "Candidate key calculation via closure.",
    hint: "A+ = {A, B, C}, so A is the candidate key.",
    level: "basic"
  },
  {
    question: "What does the closure of an attribute set X (denoted as X+) represent?",
    shortAnswer: "The set of all attributes that are functionally determined by X under a given set of functional dependencies F.",
    explanation: "Definition of attribute closure.",
    hint: "All attributes determined by X under FD set F.",
    level: "moderate"
  },
  {
    question: "If t1[X] = t2[X] but t1[Y] ≠ t2[Y] in a table instance, what does this prove?",
    shortAnswer: "It proves that the functional dependency X → Y is VIOLATED in that relation instance.",
    explanation: "Empirical counter-example proving an FD does not hold.",
    hint: "Proves X → Y is violated and cannot hold as a valid constraint.",
    level: "basic"
  },
  {
    question: "Can a functional dependency have multiple attributes on the right-hand side (e.g. X → {Y, Z})?",
    shortAnswer: "YES. By the Decomposition Rule of Armstrong's Axioms, X → {Y, Z} is equivalent to X → Y and X → Z.",
    explanation: "Decomposition rule for right-hand side attributes.",
    hint: "Yes, equivalent to X → Y and X → Z.",
    level: "basic"
  },
  {
    question: "Can a functional dependency with multiple attributes on the left-hand side ({W, X} → Y) be split into W → Y and X → Y?",
    shortAnswer: "NO! Left-hand side attributes cannot be decomposed; {W, X} → Y requires BOTH W and X together to determine Y.",
    explanation: "Determinant integrity rule in FDs.",
    hint: "No, left-hand side attributes cannot be split.",
    level: "moderate"
  },
  {
    question: "In SQL, how can a database designer enforce a functional dependency X → Y where X is a single attribute?",
    shortAnswer: "By defining X as a PRIMARY KEY or UNIQUE NOT NULL column in a dedicated normalized table, or by using a foreign key constraint.",
    explanation: "SQL implementation of functional dependencies.",
    hint: "Enforce X as PRIMARY KEY or UNIQUE NOT NULL.",
    level: "basic"
  },
  {
    question: "What is an Armstrong Axiom?",
    shortAnswer: "A set of sound and complete inference rules (Reflexivity, Augmentation, Transitivity) used to deduce all functional dependencies implied by a set F.",
    explanation: "Definition of Armstrong's Axioms.",
    hint: "Sound and complete inference rules for FDs (Reflexivity, Augmentation, Transitivity).",
    level: "moderate"
  },
  {
    question: "What does the Reflexivity Rule state?",
    shortAnswer: "If Y ⊆ X, then X → Y holds (e.g. {student_id, name} → student_id).",
    explanation: "Armstrong's Reflexivity Axiom.",
    hint: "If Y is a subset of X, then X → Y.",
    level: "basic"
  },
  {
    question: "What does the Augmentation Rule state?",
    shortAnswer: "If X → Y holds, then XZ → YZ holds for any attribute set Z.",
    explanation: "Armstrong's Augmentation Axiom.",
    hint: "If X → Y, then XZ → YZ.",
    level: "moderate"
  },
  {
    question: "What does the Transitivity Rule state?",
    shortAnswer: "If X → Y and Y → Z hold, then X → Z holds.",
    explanation: "Armstrong's Transitivity Axiom.",
    hint: "If X → Y and Y → Z, then X → Z.",
    level: "basic"
  },
  {
    question: "Why is Functional Dependency theory considered the bedrock of Relational Database Normalization?",
    shortAnswer: "Because 2NF, 3NF, and BCNF are strictly defined by identifying and eliminating specific undesirable types of functional dependencies.",
    explanation: "Central role of FDs in database design.",
    hint: "All normal forms from 2NF to BCNF are defined by functional dependencies.",
    level: "basic"
  },
  {
    question: "If relation R has attributes (A, B) and only 1 tuple (1, 2), does A → B hold?",
    shortAnswer: "In that specific 1-tuple instance, yes (trivially), but in the real world, whether A → B holds depends on the business domain semantics across all possible tuples.",
    explanation: "Single-tuple instance vs semantic validity.",
    hint: "Holds in the instance trivially, but true FD requires domain business semantic validity.",
    level: "moderate"
  },
  {
    question: "In an e-commerce order schema, why is `(order_id, product_id) → quantity` a valid functional dependency?",
    shortAnswer: "Because in a specific order, each distinct product appears on exactly one order line with one specific purchase quantity.",
    explanation: "Real-world e-commerce FD example.",
    hint: "Each product in an order has exactly one designated quantity.",
    level: "basic"
  },
  {
    question: "What is an extraneous attribute in a functional dependency?",
    shortAnswer: "An attribute in an FD that can be removed from the left-hand side or right-hand side without changing the closure of the dependency set F.",
    explanation: "Definition of extraneous attribute used in minimal cover algorithms.",
    hint: "An unnecessary attribute in an FD whose removal does not alter the closure.",
    level: "expert"
  },
  {
    question: "What is the ultimate takeaway for database engineers when discovering functional dependencies?",
    shortAnswer: "Always derive FDs directly from real-world business requirements, treat determinants as potential candidate keys, and decompose tables until all non-trivial FDs have super key determinants.",
    explanation: "Final summary rule for Topic 2.",
    hint: "Derive FDs from business rules and decompose until determinants are super keys.",
    level: "basic"
  }
];

export default questions;
