const topic1_questions = [
  {
    "question": "How do accessor method names in Java Records differ from traditional JavaBeans?",
    "shortAnswer": "Record accessors use the exact component name without the 'get' prefix (e.g. s.name() and s.age() rather than s.getName() and s.getAge()).",
    "explanation": "Emphasizes that records are transparent data carriers rather than mutable JavaBeans.",
    "hint": "Uses fieldName() instead of getFieldName().",
    "level": "Beginner",
    "codeExample": "record User(String name) {} // Accessed via user.name()"
  },
  {
    "question": "Are fields in a Java Record mutable?",
    "shortAnswer": "No. All component fields declared in the record header are implicitly private and final. There are no setters generated.",
    "explanation": "Guarantees shallow immutability and thread safety.",
    "hint": "All record fields are implicitly private and final.",
    "level": "Beginner",
    "codeExample": "record Point(int x, int y) {} // x and y are private final"
  }
];

export default topic1_questions;
