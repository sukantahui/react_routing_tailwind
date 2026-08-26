const topic0_questions = [
  {
    "question": "What is the primary architectural purpose of the Java 8 Stream API?",
    "shortAnswer": "The Stream API provides a declarative, functional pipeline for processing sequences of elements (filtering, transforming, aggregating) without mutating the underlying data source and enabling easy parallelization.",
    "explanation": "Introduced in Java 8, Streams allow developers to write concise queries over in-memory collections similar to SQL queries over database tables.",
    "hint": "Declarative functional pipeline over collections and data sources.",
    "level": "Beginner",
    "codeExample": "List<String> list = students.stream().filter(s -> s.getScore() > 80).map(Student::getName).toList();"
  },
  {
    "question": "How does declarative stream processing differ fundamentally from imperative loop processing?",
    "shortAnswer": "Imperative processing focuses on 'HOW to do it' (manual iteration, index management, state mutations in temp lists), whereas Declarative stream processing focuses on 'WHAT to do' (specifying transformations via pure functions).",
    "explanation": "Declarative pipelines improve maintainability, reduce bug surface area, and abstract execution mechanics away from business logic.",
    "hint": "HOW (loops and manual mutations) vs WHAT (functional composition).",
    "level": "Intermediate",
    "codeExample": "// Declarative:\\nstudents.stream().filter(s -> s.isActive()).forEach(System.out::println);"
  }
];

export default topic0_questions;
