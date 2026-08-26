const topic9_questions = [
  {
    question: "What are Java Text Blocks (standardized in Java 15 JEP 378) and what problem do they solve?",
    shortAnswer: "Text Blocks are multi-line string literals enclosed in triple quotes (\\\"\\\"\\\") that automatically preserve formatting without requiring '\\\\n' or escaped quotes. They eliminate ugly string concatenation when embedding JSON, SQL, or HTML in Java source code.",
    explanation: "The opening triple quotes must be followed by an immediate newline.",
    hint: "Multi-line string literals using triple quotes ('\"\"\"') standardized in Java 15.",
    level: "Intermediate",
    codeExample: "String json = \\\"\\\"\\\"\\n{\\n  \\\\\\\"name\\\\\\\": \\\\\\\"Swadeep\\\\\\\"\\n}\\n\\\"\\\"\\\";"
  }
];

export default topic9_questions;
