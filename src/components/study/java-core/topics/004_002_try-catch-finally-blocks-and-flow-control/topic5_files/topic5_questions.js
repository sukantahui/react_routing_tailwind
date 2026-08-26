const topic5_questions = [
  {
    "question": "What is the Java 7 Multi-Catch syntax and what rule governs the exception types combined with the pipe '|' operator?",
    "shortAnswer": "Multi-Catch allows combining multiple exception types in a single catch parameter: 'catch (TypeA | TypeB ex)'. Rule: The combined exception types MUST be DISJOINT (they cannot have an inheritance relationship where one is a subclass of another, e.g. 'catch (FileNotFoundException | IOException ex)' is illegal).",
    "explanation": "Introduced in Project Coin (Java 7) to drastically reduce duplicated error-handling boilerplate.",
    "hint": "Uses the pipe '|' operator; combined types must not inherit from each other.",
    "level": "Beginner",
    "codeExample": "try { ... } catch (IOException | SQLException ex) { log.error(ex); }"
  }
];

export default topic5_questions;