const topic9_questions = [
  {
    "question": "Why can 'java.lang.Runnable' be instantiated with a Java 8 lambda expression '() → { ... }'?",
    "shortAnswer": "'java.lang.Runnable' is annotated with '@FunctionalInterface' (Single Abstract Method interface) and defines exactly ONE abstract method: 'void run()'. Under Java 8 SAM conversion rules, any lambda expression with matching parameter list '()' and return type 'void' can seamlessly implement Runnable with zero boilerplate.",
    "explanation": "Fundamental Java 8 functional programming integration with core threading.",
    "hint": "Runnable is a functional interface with a single abstract method: void run().",
    "level": "Beginner",
    "codeExample": "new Thread(() → System.out.println(\"Running in parallel!\")).start();"
  }
];

export default topic9_questions;