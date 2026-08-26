const topic1_questions = [
  {
    "question": "What does the question mark '?' wildcard symbol represent in Java Generics?",
    "shortAnswer": "The question mark '?' is the Wildcard symbol representing an 'Unknown Type'. In 'List<?>', it denotes a list whose exact element type is unknown at compile time. 'List<?>' acts as the common universal supertype for all generic lists (such as List<String>, List<Integer>, List<Date>), allowing generic polymorphic collection passing.",
    "explanation": "Re-establishes polymorphism for generic collections.",
    "hint": "Represents an unknown type, acting as the universal supertype for all generic collections.",
    "level": "Beginner",
    "codeExample": "public static void print(List<?> list) { ... } // Accepts any generic list"
  }
];

export default topic1_questions;