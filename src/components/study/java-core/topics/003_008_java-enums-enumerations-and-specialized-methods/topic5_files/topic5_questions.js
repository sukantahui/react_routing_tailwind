const topic5_questions = [
  {
    "question": "Why are Enums exceptionally powerful when paired with modern Java Switch Expressions (Java 14+)?",
    "shortAnswer": "Because switch expressions over Enums provide 'Compile-Time Exhaustiveness Checking'. If all enum constants are covered, no 'default' branch is required. If a new constant is added to the enum later, the compiler immediately flags every switch expression in the codebase that forgot to handle it.",
    "explanation": "Eliminates subtle runtime missing-branch bugs across large codebases.",
    "hint": "Provides compile-time exhaustiveness checking without requiring a default branch.",
    "level": "Intermediate",
    "codeExample": "String text = switch (status) { case ACTIVE → \"On\"; case INACTIVE → \"Off\"; };"
  }
];

export default topic5_questions;