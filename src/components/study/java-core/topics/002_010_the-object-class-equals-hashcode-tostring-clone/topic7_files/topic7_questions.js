const topic7_questions = [
  {
    question: "What is the mandatory contract between 'equals()' and 'hashCode()' in Java?",
    shortAnswer: "If two objects are equal according to 'equals(Object)', calling 'hashCode()' on each MUST produce the exact same integer. If two objects have the same hashCode, they may or may not be equal (a hash collision).",
    explanation: "Never override equals() without overriding hashCode() using the same fields.",
    hint: "Equal objects MUST have equal hashCodes.",
    level: "Intermediate",
    codeExample: "// If a.equals(b) == true -> a.hashCode() == b.hashCode() is MANDATORY!"
  }
];

export default topic7_questions;