// topic3_files/topic3_questions.js

const questions = [
  {
    question: "What is a Trivial Functional Dependency?",
    shortAnswer: "A functional dependency X → Y is trivial if and only if the dependent set Y is a subset of the determinant set X (Y ⊆ X).",
    explanation: "Formal mathematical definition of trivial functional dependencies.",
    hint: "Y is a subset of X (Y ⊆ X).",
    level: "basic"
  },
  {
    question: "Give an example of a Trivial Functional Dependency from an academy schema.",
    shortAnswer: "{student_id, student_name} → student_id (since student_id ⊆ {student_id, student_name}).",
    explanation: "Concrete example of trivial FD.",
    hint: "{student_id, name} → student_id.",
    level: "basic"
  },
  {
    question: "Why do Trivial Functional Dependencies hold in EVERY possible relational database instance?",
    shortAnswer: "Because if two tuples have identical values across a set of columns X, they must obviously have identical values for any individual column already contained within X (Reflexivity).",
    explanation: "Mathematical reason why trivial dependencies are universal tautologies.",
    hint: "Holds by mathematical reflexivity because Y is already part of X.",
    level: "basic"
  },
  {
    question: "What is a Non-Trivial Functional Dependency?",
    shortAnswer: "A functional dependency X → Y where Y is NOT a subset of X (Y ⊈ X), meaning X determines at least one attribute not present in X.",
    explanation: "Definition of non-trivial FD.",
    hint: "Y is not a subset of X.",
    level: "basic"
  },
  {
    question: "What is a Completely Non-Trivial Functional Dependency?",
    shortAnswer: "A functional dependency X → Y where the intersection of X and Y is completely empty (X ∩ Y = ∅).",
    explanation: "Definition of completely non-trivial FD.",
    hint: "X and Y share no common attributes (X ∩ Y = ∅).",
    level: "basic"
  },
  {
    question: "Give an example of a Completely Non-Trivial Functional Dependency.",
    shortAnswer: "student_id → {student_name, city} (since {student_id} ∩ {student_name, city} = ∅).",
    explanation: "Example of completely non-trivial FD.",
    hint: "student_id → {student_name, city}.",
    level: "basic"
  },
  {
    question: "What is a Semi-Trivial (or Partially Non-Trivial) Functional Dependency?",
    shortAnswer: "A functional dependency X → Y where Y is not a subset of X, but X and Y share at least one common attribute (X ∩ Y ≠ ∅ and Y ⊈ X).",
    explanation: "Definition of semi-trivial FD.",
    hint: "Y is not a subset of X, but they share some common attributes.",
    level: "moderate"
  },
  {
    question: "How can the semi-trivial dependency `{student_id, course_id} → {student_name, course_id}` be decomposed?",
    shortAnswer: "Into a trivial part: `{student_id, course_id} → course_id`, and a non-trivial part: `{student_id, course_id} → student_name`.",
    explanation: "Decomposition of semi-trivial FDs using Armstrong's rules.",
    hint: "Decomposes into a trivial part and a completely non-trivial part.",
    level: "moderate"
  },
  {
    question: "Why are Trivial Functional Dependencies explicitly excluded from the definition of Boyce-Codd Normal Form (BCNF)?",
    shortAnswer: "Because if trivial FDs were tested, no relation could ever be in BCNF since trivial FDs like {A, B} → A hold even when {A, B} is not a candidate key.",
    explanation: "Crucial role of excluding trivial FDs in BCNF testing.",
    hint: "Without excluding trivial FDs, no table could ever satisfy BCNF.",
    level: "moderate"
  },
  {
    question: "Does the trivial dependency `A → A` convey any meaningful business domain rule?",
    shortAnswer: "NO. It is a mathematical tautology (Reflexivity Axiom) present in every dataset regardless of business rules.",
    explanation: "Business semantic perspective on trivial FDs.",
    hint: "No, it is a mathematical tautology.",
    level: "basic"
  },
  {
    question: "In Armstrong's Axioms, which rule formally produces trivial functional dependencies?",
    shortAnswer: "The Axiom of Reflexivity: If Y ⊆ X, then X → Y.",
    explanation: "Armstrong's Reflexivity Axiom source of trivial FDs.",
    hint: "The Axiom of Reflexivity.",
    level: "basic"
  },
  {
    question: "Is `student_id → student_id` a trivial functional dependency?",
    shortAnswer: "YES, because {student_id} ⊆ {student_id}.",
    explanation: "Reflexive self-dependency is trivial.",
    hint: "Yes, {student_id} is a subset of itself.",
    level: "basic"
  },
  {
    question: "Is `{student_id, city} → {city, email}` trivial, semi-trivial, or completely non-trivial?",
    shortAnswer: "Semi-Trivial (Partially Non-Trivial), because {city, email} ⊈ {student_id, city}, but they share the attribute `city`.",
    explanation: "Classification of partially overlapping FD.",
    hint: "Semi-Trivial because they share `city`.",
    level: "moderate"
  },
  {
    question: "What is the standard practice when documenting functional dependencies for database design?",
    shortAnswer: "Omit all trivial dependencies and simplify semi-trivial dependencies into strictly completely non-trivial canonical form (X ∩ Y = ∅).",
    explanation: "Best practice in canonical FD documentation.",
    hint: "Document only completely non-trivial FDs with minimal left-hand sides.",
    level: "basic"
  },
  {
    question: "Can a trivial functional dependency ever cause an update anomaly?",
    shortAnswer: "NO. Trivial dependencies cannot cause update anomalies because they do not introduce non-key redundancies.",
    explanation: "Anomalies and trivial FDs.",
    hint: "No, trivial FDs do not cause anomalies.",
    level: "basic"
  },
  {
    question: "Can a trivial functional dependency ever cause an insertion anomaly?",
    shortAnswer: "NO. Trivial dependencies do not enforce cross-entity constraints and cannot block insertions.",
    explanation: "Trivial FDs and insertion safety.",
    hint: "No, trivial dependencies cannot cause insertion anomalies.",
    level: "basic"
  },
  {
    question: "If X → Y is non-trivial, what does this tell us about the relationship between X and Y?",
    shortAnswer: "It tells us that X provides genuine new information about Y that was not already known just by having X.",
    explanation: "Informational content of non-trivial FDs.",
    hint: "X provides new information about Y.",
    level: "basic"
  },
  {
    question: "In Third Normal Form (3NF), does the condition 'X is a super key or Y is a prime attribute' apply to trivial FDs?",
    shortAnswer: "No, 3NF only evaluates non-trivial functional dependencies X → Y.",
    explanation: "3NF definition scope.",
    hint: "Only evaluates non-trivial functional dependencies.",
    level: "basic"
  },
  {
    question: "If relation R has schema (A, B, C), how many trivial functional dependencies can be formed?",
    shortAnswer: "Multiple trivial FDs, such as ABC → A, ABC → B, ABC → C, ABC → AB, ABC → BC, ABC → AC, ABC → ABC, AB → A, AB → B, etc.",
    explanation: "Combinatorial explosion of trivial FDs.",
    hint: "Every subset of every attribute combination forms a trivial FD.",
    level: "moderate"
  },
  {
    question: "What does the closure algorithm (X+) do with trivial functional dependencies?",
    shortAnswer: "The closure X+ always initializes with X itself (X+ = X), automatically incorporating all trivial dependencies by definition.",
    explanation: "Initialization of attribute closure algorithm.",
    hint: "Initializes X+ = X, automatically including all trivial FDs.",
    level: "moderate"
  },
  {
    question: "Is `{course_id, fee} → fee` a trivial functional dependency?",
    shortAnswer: "YES, because {fee} ⊆ {course_id, fee}.",
    explanation: "Identification of trivial FD.",
    hint: "Yes, {fee} is a subset of the determinant.",
    level: "basic"
  },
  {
    question: "Is `course_id → fee` a trivial functional dependency?",
    shortAnswer: "NO, it is Completely Non-Trivial because {course_id} ∩ {fee} = ∅.",
    explanation: "Identification of completely non-trivial FD.",
    hint: "Completely Non-Trivial.",
    level: "basic"
  },
  {
    question: "Why is `{student_id} → {student_id, student_name}` semi-trivial?",
    shortAnswer: "Because {student_id, student_name} is not a subset of {student_id}, but both sides share `student_id`.",
    explanation: "Analysis of semi-trivial expansion.",
    hint: "Shares student_id on both sides.",
    level: "moderate"
  },
  {
    question: "What rule of Armstrong's Axioms allows removing redundant attributes from the right-hand side of a semi-trivial FD?",
    shortAnswer: "The Decomposition (Projectivity) Rule: from X → YZ, we infer X → Y and X → Z; we then discard the trivial X → X.",
    explanation: "Simplification rule for semi-trivial FDs.",
    hint: "Decomposition Rule.",
    level: "moderate"
  },
  {
    question: "In relational schema synthesis, what is a 'Minimal Cover' (Canonical Cover)?",
    shortAnswer: "An equivalent simplified set of functional dependencies where every FD is completely non-trivial, has a single attribute on the RHS, and contains no extraneous attributes.",
    explanation: "Definition of minimal / canonical cover.",
    hint: "A simplified set of completely non-trivial FDs without extraneous attributes.",
    level: "expert"
  },
  {
    question: "Can an FD be partially non-trivial if the determinant has only 1 attribute?",
    shortAnswer: "Yes, if the RHS contains that 1 attribute plus other attributes (e.g. A → {A, B}).",
    explanation: "Single-attribute determinant semi-trivial case.",
    hint: "Yes, e.g. A → {A, B}.",
    level: "moderate"
  },
  {
    question: "What is the primary danger of keeping semi-trivial dependencies in database normalization proofs?",
    shortAnswer: "It clutters candidate key and normal form calculations with redundant self-dependencies.",
    explanation: "Mathematical clutter avoidance.",
    hint: "Clutters normal form proofs with redundant self-dependencies.",
    level: "basic"
  },
  {
    question: "How do modern SQL database engines enforce non-trivial functional dependencies?",
    shortAnswer: "Via PRIMARY KEY, UNIQUE constraints, FOREIGN KEY constraints, and CHECK triggers.",
    explanation: "RDBMS constraint enforcement.",
    hint: "PRIMARY KEY, UNIQUE, and FOREIGN KEY constraints.",
    level: "basic"
  },
  {
    question: "If X → Y is trivial, is it always true that X is a super key of the relation formed by XY?",
    shortAnswer: "YES. Since Y ⊆ X, X determines everything in XY, so X is trivially a super key of schema (XY).",
    explanation: "Super key property on trivial sub-schemas.",
    hint: "Yes, X determines all attributes in XY.",
    level: "expert"
  },
  {
    question: "What is the core takeaway for database students regarding Trivial vs Non-Trivial FDs?",
    shortAnswer: "Trivial FDs (Y ⊆ X) are universal mathematical truths that are filtered out; Completely Non-Trivial FDs (X ∩ Y = ∅) are the true business constraints that drive database normalization.",
    explanation: "Summary conclusion for Topic 3.",
    hint: "Trivial FDs are filtered out; completely non-trivial FDs drive normalization.",
    level: "basic"
  }
];

export default questions;
