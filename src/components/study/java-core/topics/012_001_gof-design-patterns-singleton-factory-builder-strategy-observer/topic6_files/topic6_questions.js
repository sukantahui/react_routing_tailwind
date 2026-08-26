const topic6_questions = [
  {
    "question": "What is the 'Telescoping Constructor' anti-pattern and how does the Builder pattern fix it?",
    "shortAnswer": "The telescoping constructor anti-pattern occurs when a class provides numerous overloaded constructors with increasing parameter counts, making code unreadable and error-prone. The Builder pattern replaces this with fluent, self-describing method chaining and final validation in build().",
    "explanation": "Effective Java Item 2 recommendation.",
    "hint": "Eliminates constructors with numerous ambiguous parameters.",
    "level": "Beginner",
    "codeExample": "Student.builder().name(\"Tuhina\").center(\"Naihati\").build();"
  },
  {
    "question": "Why does the Builder pattern support creating completely immutable domain objects?",
    "shortAnswer": "Because all fields on the target class can be declared private and final without public setter methods, as the private constructor receives all validated state directly from the Builder instance.",
    "explanation": "Enforces thread-safe, immutable domain models.",
    "hint": "All target class fields remain private and final without setters.",
    "level": "Intermediate",
    "codeExample": "private final String name; // immutable field populated by Builder"
  }
];

export default topic6_questions;
