const topic4_questions = [
  {
    question: "What are the 5 mathematical properties required by the 'equals()' contract in Java?",
    shortAnswer: "1. Reflexive (x.equals(x) == true), 2. Symmetric (x.equals(y) == y.equals(x)), 3. Transitive (x.equals(y) && y.equals(z) implies x.equals(z)), 4. Consistent (remains invariant unless fields change), 5. Non-nullity (x.equals(null) == false).",
    explanation: "Violating any of these 5 rules breaks HashSets, HashMaps, and sorting algorithms.",
    hint: "Reflexive, Symmetric, Transitive, Consistent, and Non-nullity.",
    level: "Intermediate",
    codeExample: "// Non-nullity: if (obj == null) return false;"
  }
];

export default topic4_questions;