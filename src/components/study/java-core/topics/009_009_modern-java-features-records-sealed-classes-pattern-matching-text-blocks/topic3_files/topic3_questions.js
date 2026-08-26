const topic3_questions = [
  {
    "question": "How does equals() in a Java Record handle primitive fields versus object reference fields?",
    "shortAnswer": "Primitive fields are compared by value (e.g. == for ints, Double.compare for doubles), while object reference fields are compared via Objects.equals(this.field, other.field).",
    "explanation": "Generated automatically according to the Java Record Language Specification.",
    "hint": "Primitives compared by value; objects compared using Objects.equals().",
    "level": "Intermediate",
    "codeExample": "record Data(int id, String text) {} // Compares id with == and text with Objects.equals()"
  },
  {
    "question": "What is the Canonical Constructor in a Java Record?",
    "shortAnswer": "The constructor whose parameter list matches the component list of the record header in number, order, and types, initializing each private final field.",
    "explanation": "Automatically provided by the compiler unless explicitly customized.",
    "hint": "The full-parameter constructor matching the record header signature.",
    "level": "Beginner",
    "codeExample": "public Point(int x, int y) { this.x = x; this.y = y; }"
  }
];

export default topic3_questions;
