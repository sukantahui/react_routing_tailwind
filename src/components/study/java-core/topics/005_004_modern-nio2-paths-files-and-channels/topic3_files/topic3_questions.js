const topic3_questions = [
  {
    "question": "What is the difference between 'Path.of(\"data.txt\")' and 'Paths.get(\"data.txt\")' in modern Java?",
    "shortAnswer": "'Path.of()' was introduced in Java 11 as a static factory directly on the 'Path' interface, following modern Java API design. 'Paths.get()' was the Java 7 approach requiring the separate utility class 'Paths'. Under the hood, 'Paths.get()' simply delegates to 'Path.of()', making 'Path.of()' the cleaner and preferred modern standard.",
    "explanation": "Mirrors the modernization of List.of(), Set.of(), and Map.of() in Java 9+.",
    "hint": "Path.of() is the modern Java 11+ factory directly on the interface, eliminating the companion Paths class.",
    "level": "Beginner",
    "codeExample": "Path p = Path.of(\"src\", \"App.java\"); // Modern Java 11+"
  }
];

export default topic3_questions;