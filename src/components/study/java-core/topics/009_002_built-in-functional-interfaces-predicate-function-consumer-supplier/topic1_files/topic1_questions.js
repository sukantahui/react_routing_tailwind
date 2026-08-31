const topic1_questions = [
  {
    "question": "Explain the roles, input/output types, and SAM methods of the Big 4 Java Functional Interfaces.",
    "shortAnswer": "1. 'Predicate<T>': 'boolean test(T t)' – Accepts 1 argument of type T, returns boolean (Condition testing/filtering). 2. 'Function<T, R>': 'R apply(T t)' – Accepts 1 argument of type T, returns transformed value of type R (Data mapping). 3. 'Consumer<T>': 'void accept(T t)' – Accepts 1 argument of type T, returns void (Side-effect actions like printing/saving). 4. 'Supplier<T>': 'T get()' – Takes 0 arguments, returns a new/cached value of type T (Lazy generation/factory).",
    "explanation": "Core matrix of the Big 4 foundational functional interfaces.",
    "hint": "Predicate tests (T → boolean), Function transforms (T → R), Consumer consumes (T → void), Supplier generates (() → T).",
    "level": "Beginner",
    "codeExample": "Predicate<T> (test), Function<T,R> (apply), Consumer<T> (accept), Supplier<T> (get)"
  }
];

export default topic1_questions;