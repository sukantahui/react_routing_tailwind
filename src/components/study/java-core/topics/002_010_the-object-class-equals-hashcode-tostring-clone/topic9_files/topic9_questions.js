const topic9_questions = [
  {
    question: "What is a Hash Collision and does 'a.hashCode() == b.hashCode()' imply that 'a.equals(b)' is true?",
    shortAnswer: "No! A hash collision occurs when two unequal objects produce the exact same integer hashCode (e.g. \\\"FB\\\" and \\\"Ea\\\"). Because there are infinite possible objects and only 2^32 distinct integers, collisions are mathematically inevitable and handled by collections using bucket collision lists.",
    explanation: "HashMap uses equals() as the final disambiguation step inside colliding buckets.",
    hint: "Collisions are mathematically inevitable; equal hashCodes do not guarantee equal objects.",
    level: "Intermediate",
    codeExample: "assert \\\"FB\\\".hashCode() == \\\"Ea\\\".hashCode(); // true, but equals() is false"
  }
];

export default topic9_questions;