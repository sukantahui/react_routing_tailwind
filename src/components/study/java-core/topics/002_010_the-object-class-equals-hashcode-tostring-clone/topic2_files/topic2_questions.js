const topic2_questions = [
  {
    question: "What is the default implementation format of 'Object.toString()' in Java?",
    shortAnswer: "'getClass().getName() + '@' + Integer.toHexString(hashCode())' (e.g. 'com.app.Student@7a81197d').",
    explanation: "Overriding toString() provides meaningful debug logs and clean console prints.",
    hint: "Outputs ClassName@HexHashCode by default.",
    level: "Beginner",
    codeExample: "@Override public String toString() { return \\\"User[id=\\\" + id + \\\"]\\\"; }"
  }
];

export default topic2_questions;