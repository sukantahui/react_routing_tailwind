const topic3_questions = [
  {
    question: "How does Java solve multiple inheritance safely through interfaces?",
    shortAnswer: "A Java class can implement multiple interfaces simultaneously ('implements A, B, C'). Since traditional interfaces contain no instance state and only method signatures, there is no memory layout ambiguity or field collision.",
    explanation: "Allows a class to assume multiple behavioral roles across different subsystems.",
    hint: "A single class implements multiple comma-separated interfaces.",
    level: "Beginner",
    codeExample: "class Student implements Printable, Serializable, Comparable {}"
  }
];

export default topic3_questions;