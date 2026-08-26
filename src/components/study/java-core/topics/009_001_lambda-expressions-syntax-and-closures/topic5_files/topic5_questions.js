const topic5_questions = [
  {
    "question": "What is the purpose of the '@FunctionalInterface' annotation in Java and is it mandatory for writing lambdas?",
    "shortAnswer": "1. 'Purpose': '@FunctionalInterface' is an informative annotation that instructs the 'javac' compiler to enforce the Single Abstract Method (SAM) contract at compile time. If an interface annotated with '@FunctionalInterface' contains zero or more than one abstract method, the compiler immediately generates a compilation error. 2. 'Is it Mandatory?': NO, it is NOT mandatory. Any interface with exactly one abstract method is automatically a functional interface by definition. However, using the annotation is a critical industry best practice to prevent teammates from accidentally adding second abstract methods that would break existing lambdas across the codebase.",
    "explanation": "Compile-time validation role of @FunctionalInterface.",
    "hint": "Not mandatory, but provides compile-time error checking to ensure the interface maintains exactly 1 abstract method.",
    "level": "Beginner",
    "codeExample": "@FunctionalInterface interface Auditor { void audit(); }"
  }
];

export default topic5_questions;