// topic7_files/topic7_questions.js

const questions = [
  {
    question: "What is the formal definition of the Attribute Closure (X+) of an attribute set X under functional dependency set F?",
    shortAnswer: "The set of all attributes in relation schema R that are functionally determined by X under F (i.e., { A ∈ R | X → A is in F+ }).",
    explanation: "Standard relational database definition of attribute closure.",
    hint: "All attributes reachable or determined by X.",
    level: "basic"
  },
  {
    question: "How is the attribute closure algorithm initialized?",
    shortAnswer: "Set X+ = X (by the Axiom of Reflexivity, X determines itself).",
    explanation: "Initial step of attribute closure algorithm.",
    hint: "X+ is initialized with X itself.",
    level: "basic"
  },
  {
    question: "What is the core iterative loop condition in the Attribute Closure algorithm?",
    shortAnswer: "For each FD (LHS → RHS) in F, if LHS ⊆ X+, then update X+ = X+ ∪ RHS, repeating until X+ reaches a fixpoint (no new attributes are added).",
    explanation: "Iterative expansion mechanism of closure algorithm.",
    hint: "Add RHS whenever LHS is a subset of the current closure.",
    level: "basic"
  },
  {
    question: "What is a Super Key in terms of attribute closure?",
    shortAnswer: "An attribute set K is a Super Key of relation R if its attribute closure equals the entire relation schema R (K+ = R).",
    explanation: "Definition of super key via closure.",
    hint: "K+ = R.",
    level: "basic"
  },
  {
    question: "What is a Candidate Key in terms of attribute closure?",
    shortAnswer: "A Candidate Key is a minimal super key (K+ = R and for every proper subset K' ⊂ K, (K')+ ≠ R).",
    explanation: "Definition of candidate key via minimality and closure.",
    hint: "A minimal super key whose closure contains all attributes.",
    level: "basic"
  },
  {
    question: "In relation R(A, B, C, D) with FDs {A → B, B → C, C → D}, what is the closure of {A} (i.e. A+)?",
    shortAnswer: "{A, B, C, D}.",
    explanation: "Chained closure derivation: A ➔ AB ➔ ABC ➔ ABCD.",
    hint: "{A, B, C, D}.",
    level: "basic"
  },
  {
    question: "In the previous question, what is the candidate key of R(A, B, C, D)?",
    shortAnswer: "Attribute {A} (since A+ = R and A is a single attribute, making it trivially minimal).",
    explanation: "Candidate key identification.",
    hint: "{A}.",
    level: "basic"
  },
  {
    question: "What is the heuristic rule for attributes that appear ONLY on the Left-Hand Side (Class L) of FDs?",
    shortAnswer: "They MUST be present in EVERY candidate key of the relation.",
    explanation: "Class L attribute heuristic rule.",
    hint: "Must be part of every candidate key.",
    level: "moderate"
  },
  {
    question: "What is the heuristic rule for attributes that appear ONLY on the Right-Hand Side (Class R) of FDs?",
    shortAnswer: "They can NEVER be part of ANY candidate key (because other attributes already determine them).",
    explanation: "Class R attribute heuristic rule.",
    hint: "Can never belong to any candidate key.",
    level: "moderate"
  },
  {
    question: "What is the heuristic rule for attributes that appear on NEITHER side (Class N) of FDs?",
    shortAnswer: "They MUST be present in EVERY candidate key (since no FD can ever determine them).",
    explanation: "Class N attribute heuristic rule.",
    hint: "Must belong to every candidate key.",
    level: "moderate"
  },
  {
    question: "What is the heuristic rule for attributes that appear on BOTH sides (Class LR) of FDs?",
    shortAnswer: "They may or may not be part of candidate keys; they are systematically tested in combinations with Class L and N attributes.",
    explanation: "Class LR attribute heuristic rule.",
    hint: "May or may not belong to candidate keys.",
    level: "moderate"
  },
  {
    question: "If relation R(A, B, C, D) has FDs {AB → C, C → D, D → A}, what are the candidate keys?",
    shortAnswer: "{A, B}, {B, C}, and {B, D}.",
    explanation: "Calculation of 3 overlapping candidate keys.",
    hint: "{A, B}, {B, C}, and {B, D}.",
    level: "moderate"
  },
  {
    question: "What are the Prime Attributes in the previous relation R(A, B, C, D) with candidate keys {AB, BC, BD}?",
    shortAnswer: "All four attributes {A, B, C, D} are prime attributes because each belongs to at least one candidate key.",
    explanation: "Prime attribute determination from all candidate keys.",
    hint: "{A, B, C, D}.",
    level: "moderate"
  },
  {
    question: "What is the computational time complexity of the Attribute Closure algorithm?",
    shortAnswer: "Polynomial / Linear time O(|F| · |R|), making closure calculation very fast and scalable.",
    explanation: "Computational complexity of attribute closure.",
    hint: "Polynomial / Linear time O(|F| · |R|).",
    level: "moderate"
  },
  {
    question: "Why is finding all candidate keys in the worst-case scenario an NP-complete problem?",
    shortAnswer: "Because testing all possible 2^n attribute subsets when many overlapping Class LR dependencies exist can lead to an exponential number of candidate keys.",
    explanation: "Complexity of candidate key enumeration.",
    hint: "Exponential number of possible attribute subset combinations.",
    level: "expert"
  },
  {
    question: "How do you test if a functional dependency X → Y is logically implied by a set F using attribute closures?",
    shortAnswer: "Compute X+ under F; if Y ⊆ X+, then X → Y is logically implied (X → Y ∈ F+).",
    explanation: "Testing FD membership using attribute closure.",
    hint: "Compute X+ and verify if Y is a subset of X+.",
    level: "basic"
  },
  {
    question: "If relation R(A, B, C) has FDs {A → B, B → C} and candidate key A, is relation (A, C) in 3NF?",
    shortAnswer: "YES. In the projected relation R1(A, C), A → C holds and A is the candidate key.",
    explanation: "Projected dependency verification via closure.",
    hint: "Yes, A is the candidate key.",
    level: "moderate"
  },
  {
    question: "In academy management, if schema is (student_id, roll_no, email, name) and student_id → name, email → student_id, roll_no → student_id, how many candidate keys exist?",
    shortAnswer: "Three: {student_id}, {email}, and {roll_no}.",
    explanation: "Multiple candidate keys in real-world student schema.",
    hint: "Three candidate keys: {student_id}, {email}, and {roll_no}.",
    level: "basic"
  },
  {
    question: "If an attribute set K satisfies K+ = R, but proper subset K1 ⊂ K also satisfies K1+ = R, is K a candidate key?",
    shortAnswer: "NO. K is a Super Key, but NOT a Candidate Key because it fails the minimality requirement.",
    explanation: "Super key vs candidate key minimality test.",
    hint: "No, K is a super key but fails minimality.",
    level: "basic"
  },
  {
    question: "Can an attribute closure X+ contain fewer attributes than X?",
    shortAnswer: "NO. X+ always contains at least X itself (X ⊆ X+) by Reflexivity.",
    explanation: "Monotonicity and reflexivity of attribute closure.",
    hint: "No, X+ always contains at least X.",
    level: "basic"
  },
  {
    question: "What happens if a relation R has zero functional dependencies (F = ∅)?",
    shortAnswer: "The only candidate key is the combination of ALL attributes in R ({R} is the candidate key).",
    explanation: "Zero-dependency all-attribute candidate key rule.",
    hint: "The entire relation (all attributes together) is the candidate key.",
    level: "basic"
  },
  {
    question: "If relation R(A, B, C, D) has FDs {A → B, C → D}, what is the candidate key?",
    shortAnswer: "{A, C} (since A+={A,B} and C+={C,D}, combining them yields {A, C}+ = {A, B, C, D}).",
    explanation: "Combining disjoint key components.",
    hint: "{A, C}.",
    level: "basic"
  },
  {
    question: "Why is attribute closure (X+) preferred over dependency closure (F+) for testing FDs?",
    shortAnswer: "Because computing F+ takes exponential time and produces massive sets of redundant FDs, whereas X+ takes linear time O(|F| · |R|).",
    explanation: "Efficiency advantage of attribute closure.",
    hint: "Attribute closure is linear O(|F| · |R|); dependency closure F+ is exponential.",
    level: "moderate"
  },
  {
    question: "If relation R(A, B, C, D) has FDs {A → B, B → C, C → A}, what are the candidate keys?",
    shortAnswer: "{A, D}, {B, D}, and {C, D} (attribute D is in Class N and must be added to all keys).",
    explanation: "Class N attribute integration into candidate keys.",
    hint: "{A, D}, {B, D}, and {C, D}.",
    level: "moderate"
  },
  {
    question: "What is an extraneous attribute on the left-hand side of FD XY → Z?",
    shortAnswer: "Attribute X is extraneous in XY → Z if Z ⊆ (Y)+ under F (meaning Y alone can determine Z).",
    explanation: "Testing LHS extraneous attributes using closure.",
    hint: "X is extraneous if Y alone determines Z.",
    level: "expert"
  },
  {
    question: "What is an extraneous attribute on the right-hand side of FD X → YZ?",
    shortAnswer: "Attribute Y is extraneous in X → YZ if Y ⊆ (X)+ under the modified set F' = (F - {X → YZ}) ∪ {X → Z}.",
    explanation: "Testing RHS extraneous attributes using closure.",
    hint: "Y is extraneous if it can still be derived without being explicitly listed.",
    level: "expert"
  },
  {
    question: "In hospital records, if `(doctor_id, slot_id) → patient_id` and `patient_id → phone`, what is the closure of `{doctor_id, slot_id}`?",
    shortAnswer: "`{doctor_id, slot_id, patient_id, phone}`.",
    explanation: "Practical healthcare closure calculation.",
    hint: "`{doctor_id, slot_id, patient_id, phone}`.",
    level: "basic"
  },
  {
    question: "Can two different candidate keys have different numbers of attributes (e.g. one key has 1 attribute, another has 2)?",
    shortAnswer: "YES. Minimality means no subset of a candidate key is a key; it does NOT mean all candidate keys must have the exact same cardinality.",
    explanation: "Candidate key cardinality independence.",
    hint: "Yes, candidate keys can have different numbers of columns.",
    level: "basic"
  },
  {
    question: "What is the Primary Key chosen by the database designer from among multiple Candidate Keys?",
    shortAnswer: "The most stable, compact, non-null, and frequently queried candidate key chosen to identify rows physically and serve as the foreign key target.",
    explanation: "Choosing primary key among candidate keys.",
    hint: "The chosen candidate key for physical identification and foreign keys.",
    level: "basic"
  },
  {
    question: "What is the ultimate takeaway for database engineers regarding Attribute Closure (X+)?",
    shortAnswer: "The Attribute Closure algorithm is the master tool for testing FD membership, finding all candidate keys, and validating normal forms (2NF, 3NF, BCNF) with linear-time efficiency.",
    explanation: "Final summary conclusion for Topic 7.",
    hint: "Master tool for finding candidate keys and validating normal forms.",
    level: "basic"
  }
];

export default questions;
