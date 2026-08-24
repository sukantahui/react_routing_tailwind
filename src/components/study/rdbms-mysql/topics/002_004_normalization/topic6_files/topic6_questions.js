// topic6_files/topic6_questions.js

const questions = [
  {
    question: "Who formulated Armstrong's Axioms and in what year?",
    shortAnswer: "William W. Armstrong in 1974.",
    explanation: "Historical background of Armstrong's inference system.",
    hint: "William W. Armstrong in 1974.",
    level: "basic"
  },
  {
    question: "What does it mean that Armstrong's Axioms are 'Sound'?",
    shortAnswer: "Any functional dependency generated using Armstrong's Axioms from a set F is mathematically guaranteed to be true in all relation instances satisfying F.",
    explanation: "Soundness property of logical inference systems.",
    hint: "Generates only true, valid functional dependencies.",
    level: "basic"
  },
  {
    question: "What does it mean that Armstrong's Axioms are 'Complete'?",
    shortAnswer: "Given a set of functional dependencies F, Armstrong's Axioms can infer ALL functional dependencies that logically follow from F (its full closure F+).",
    explanation: "Completeness property of inference rules.",
    hint: "Capable of generating all logically implied functional dependencies.",
    level: "basic"
  },
  {
    question: "What are the three primary (fundamental) Armstrong Axioms?",
    shortAnswer: "1) Axiom of Reflexivity, 2) Axiom of Augmentation, and 3) Axiom of Transitivity.",
    explanation: "The three core axioms from which all other rules are derived.",
    hint: "Reflexivity, Augmentation, and Transitivity.",
    level: "basic"
  },
  {
    question: "State the Axiom of Reflexivity.",
    shortAnswer: "If Y ⊆ X, then X → Y holds (e.g. {student_id, name} → student_id).",
    explanation: "Formal definition of reflexivity axiom.",
    hint: "If Y is a subset of X, then X → Y.",
    level: "basic"
  },
  {
    question: "State the Axiom of Augmentation.",
    shortAnswer: "If X → Y holds, then XZ → YZ holds for any attribute set Z.",
    explanation: "Formal definition of augmentation axiom.",
    hint: "If X → Y, then XZ → YZ.",
    level: "basic"
  },
  {
    question: "State the Axiom of Transitivity.",
    shortAnswer: "If X → Y and Y → Z hold, then X → Z holds.",
    explanation: "Formal definition of transitivity axiom.",
    hint: "If X → Y and Y → Z, then X → Z.",
    level: "basic"
  },
  {
    question: "State the Decomposition (Projectivity) Rule derived from Armstrong's Axioms.",
    shortAnswer: "If X → YZ holds, then X → Y and X → Z both hold.",
    explanation: "Definition and formula of decomposition rule.",
    hint: "If X → YZ, then X → Y and X → Z.",
    level: "basic"
  },
  {
    question: "State the Union (Additive) Rule derived from Armstrong's Axioms.",
    shortAnswer: "If X → Y and X → Z hold, then X → YZ holds.",
    explanation: "Definition and formula of union rule.",
    hint: "If X → Y and X → Z, then X → YZ.",
    level: "basic"
  },
  {
    question: "State the Pseudotransitivity Rule derived from Armstrong's Axioms.",
    shortAnswer: "If X → Y and WY → Z hold, then WX → Z holds.",
    explanation: "Definition and formula of pseudotransitivity rule.",
    hint: "If X → Y and WY → Z, then WX → Z.",
    level: "moderate"
  },
  {
    question: "Can a composite determinant on the left-hand side like {A, B} → C be split into A → C and B → C?",
    shortAnswer: "ABSOLUTELY NOT! Left-hand side attributes cannot be split; {A, B} → C requires both A and B together to determine C.",
    explanation: "Critical rule: decomposition applies ONLY to the right-hand side (dependent).",
    hint: "No, decomposition applies only to the right-hand side.",
    level: "basic"
  },
  {
    question: "How is the Decomposition Rule proven using Reflexivity and Transitivity?",
    shortAnswer: "Since Y ⊆ YZ, YZ → Y (Reflexivity). Given X → YZ and YZ → Y, applying Transitivity yields X → Y.",
    explanation: "Formal proof of the decomposition rule.",
    hint: "Use Reflexivity (YZ → Y) and Transitivity (X → YZ and YZ → Y).",
    level: "moderate"
  },
  {
    question: "How is the Union Rule proven using Augmentation and Transitivity?",
    shortAnswer: "From X → Y, augment with X to get X → XY. From X → Z, augment with Y to get XY → YZ. By Transitivity on X → XY and XY → YZ, we get X → YZ.",
    explanation: "Formal proof of the union rule.",
    hint: "Augment X → Y with X, augment X → Z with Y, and apply Transitivity.",
    level: "moderate"
  },
  {
    question: "What is the closure of a set of functional dependencies (denoted as F+)?",
    shortAnswer: "The set of all functional dependencies that can be logically inferred from F using Armstrong's Axioms.",
    explanation: "Definition of dependency closure F+.",
    hint: "All functional dependencies logically implied by F.",
    level: "basic"
  },
  {
    question: "If A → B and B → C hold, what dependency is derived by Transitivity?",
    shortAnswer: "A → C.",
    explanation: "Direct application of transitivity.",
    hint: "A → C.",
    level: "basic"
  },
  {
    question: "If A → B holds, what dependency is derived by augmenting with attribute C?",
    shortAnswer: "AC → BC.",
    explanation: "Direct application of augmentation.",
    hint: "AC → BC.",
    level: "basic"
  },
  {
    question: "If AB → C and C → D hold, what dependency is derived by Transitivity?",
    shortAnswer: "AB → D.",
    explanation: "Application of transitivity on composite LHS.",
    hint: "AB → D.",
    level: "basic"
  },
  {
    question: "If A → B and BC → D hold, what dependency is derived by Pseudotransitivity?",
    shortAnswer: "AC → D (substituting A for B in BC).",
    explanation: "Application of pseudotransitivity rule.",
    hint: "AC → D.",
    level: "moderate"
  },
  {
    question: "Why are Armstrong's Axioms important for the Attribute Closure algorithm (X+)?",
    shortAnswer: "Because the attribute closure algorithm iteratively applies the union, decomposition, and transitivity rules to compute all reachable attributes from X.",
    explanation: "Algorithmic application of Armstrong's Axioms.",
    hint: "Powers the attribute closure algorithm to find candidate keys.",
    level: "basic"
  },
  {
    question: "What is an Extraneous Attribute in a set of functional dependencies?",
    shortAnswer: "An attribute in an FD that can be removed from the LHS or RHS without altering the overall closure (F+) of the dependency set.",
    explanation: "Definition of extraneous attribute.",
    hint: "An attribute that can be deleted without changing F+.",
    level: "expert"
  },
  {
    question: "In the dependency `student_id → {student_name, email, city}`, how many individual dependencies are represented?",
    shortAnswer: "Three: `student_id → student_name`, `student_id → email`, and `student_id → city` (via Decomposition).",
    explanation: "Decomposition of multi-attribute RHS.",
    hint: "Three individual dependencies.",
    level: "basic"
  },
  {
    question: "If X → Y holds, does XZ → Y hold?",
    shortAnswer: "YES. By Augmentation (XZ → YZ) and Decomposition (YZ → Y, since Y ⊆ YZ), XZ → Y is valid.",
    explanation: "Subset-determinant property.",
    hint: "Yes, XZ → Y holds.",
    level: "moderate"
  },
  {
    question: "What is a Minimal Cover (Canonical Cover)?",
    shortAnswer: "A simplified, canonical set of functional dependencies equivalent to F where all RHS are single attributes, no extraneous attributes exist, and no redundant FDs exist.",
    explanation: "Definition of minimal cover.",
    hint: "An equivalent minimal set of FDs with single RHS and no redundant attributes.",
    level: "expert"
  },
  {
    question: "Can Armstrong's Axioms be used to determine if two sets of functional dependencies F and G are equivalent (F ≡ G)?",
    shortAnswer: "YES. If every FD in F can be inferred from G (F ⊆ G+) and every FD in G can be inferred from F (G ⊆ F+), then F ≡ G.",
    explanation: "FD set equivalence testing.",
    hint: "Yes, by checking if F ⊆ G+ and G ⊆ F+.",
    level: "moderate"
  },
  {
    question: "If relation R has FDs {A → B, B → C, CD → E}, what is the closure of {A, D} (i.e. {A, D}+)?",
    shortAnswer: "{A, D, B, C, E} (since A→B ➔ {A,D,B}, B→C ➔ {A,D,B,C}, CD→E ➔ {A,D,B,C,E}).",
    explanation: "Step-by-step attribute closure calculation.",
    hint: "{A, D, B, C, E}.",
    level: "moderate"
  },
  {
    question: "Is {A, D} a candidate key in the previous question if R has schema (A, B, C, D, E)?",
    shortAnswer: "YES, because {A, D}+ = {A, B, C, D, E} (the whole relation), and neither A+ nor D+ alone contains all attributes.",
    explanation: "Candidate key verification via closure.",
    hint: "Yes, {A, D} is a minimal super key.",
    level: "moderate"
  },
  {
    question: "Why does the Reflexivity axiom (If Y ⊆ X, then X → Y) always hold in relational databases?",
    shortAnswer: "Because knowing the tuple values for a composite set X automatically gives you the values of its sub-components.",
    explanation: "Intuitive justification of reflexivity.",
    hint: "Sub-components are already known once the composite set is known.",
    level: "basic"
  },
  {
    question: "In academy management, if `course_id → instructor_id` and `instructor_id → instructor_phone`, what FD is inferred?",
    shortAnswer: "`course_id → instructor_phone` (via Transitivity).",
    explanation: "Practical application of transitivity.",
    hint: "course_id → instructor_phone.",
    level: "basic"
  },
  {
    question: "What happens if a database designer attempts normalization without using Armstrong's Axioms?",
    shortAnswer: "They may miss hidden transitive or partial dependencies, leading to incomplete decompositions and persistent update anomalies.",
    explanation: "Importance of formal inference rules.",
    hint: "Risks missing hidden dependencies and failing to reach proper normal forms.",
    level: "basic"
  },
  {
    question: "What is the ultimate takeaway for database engineers regarding Armstrong's Axioms?",
    shortAnswer: "Armstrong's Axioms provide the sound, complete, and rigorous mathematical engine for calculating attribute closures, discovering candidate keys, and executing lossless decompositions.",
    explanation: "Final summary conclusion for Topic 6.",
    hint: "Sound and complete inference engine for closures, candidate keys, and normalization.",
    level: "basic"
  }
];

export default questions;
