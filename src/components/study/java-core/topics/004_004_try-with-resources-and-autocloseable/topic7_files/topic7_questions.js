const topic7_questions = [
  {
    "question": "What major syntactic enhancement was introduced in Java 9 for Try-with-Resources statements?",
    "shortAnswer": "Java 9 allows passing previously declared 'final' or 'effectively final' resource variables directly into the try parentheses (e.g. 'try (myStream) { ... }'). In Java 7 and 8, developers were forced to create redundant alias declarations inside the header (e.g. 'try (InputStream s = myStream) { ... }').",
    "explanation": "Eliminates duplicate variable declarations when resources are initialized outside the try statement.",
    "hint": "Allows passing pre-existing final/effectively final variables directly without re-declaration.",
    "level": "Intermediate",
    "codeExample": "Reader r = getReader(); try (r) { ... } // Legal in Java 9+"
  }
];

export default topic7_questions;