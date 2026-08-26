const topic5_questions = [
  {
    "question": "In what order are resources closed when multiple resources are declared in a single Try-with-Resources statement?",
    "shortAnswer": "Resources are closed in the exact REVERSE ORDER of their declaration (Last-In, First-Out / LIFO). If declared as 'resA', 'resB', 'resC', they will be closed in the order 'resC.close()', 'resB.close()', and finally 'resA.close()'.",
    "explanation": "Ensures dependent child objects (like ResultSet) close before parent objects (Connection) close.",
    "hint": "Closed in reverse order of declaration (LIFO).",
    "level": "Beginner",
    "codeExample": "try (A a = new A(); B b = new B()) { ... } // b closes first, then a"
  }
];

export default topic5_questions;