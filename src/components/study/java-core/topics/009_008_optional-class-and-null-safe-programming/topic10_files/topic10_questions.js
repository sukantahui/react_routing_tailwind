const topic10_questions = [
  {
    "question": "What is the key advantage of ifPresentOrElse() over traditional if-else blocks?",
    "shortAnswer": "It allows handling both presence and absence in a single fluent expression without calling isPresent() and get() manually, preventing accidental NoSuchElementException bugs.",
    "explanation": "Introduced in Java 9 to complete Optional branch handling.",
    "hint": "Eliminates imperative if-else and prevents unsafe get() calls.",
    "level": "Beginner",
    "codeExample": "opt.ifPresentOrElse(System.out::println, () → System.out.println('Missing'));"
  },
  {
    "question": "What functional interface types are used by ifPresentOrElse()?",
    "shortAnswer": "1. java.util.function.Consumer<? super T> for the present value action. 2. java.lang.Runnable for the empty fallback action.",
    "explanation": "Consumer accepts the present value; Runnable takes 0 args and returns void.",
    "hint": "Consumer (for present) and Runnable (for empty).",
    "level": "Intermediate",
    "codeExample": "opt.ifPresentOrElse(Consumer<T>, Runnable);"
  }
];

export default topic10_questions;
