const questions = [
  {
    id: 1,
    question: "What is the primary role of the 'try' block in Java exception handling?",
    options: [
      "To enclose statements that might potentially throw a runtime exception",
      "To declare class variables permanently",
      "To restart the computer when an error occurs",
      "To run code in a background thread automatically"
    ],
    correctAnswer: 0,
    explanation: "The `try` block encloses risky code statements that might throw an exception during execution. If an exception occurs inside the try block, control transfers immediately to the matching `catch` block.",
    marks: 1,
    hint: "Encloses potentially risky code."
  },
  {
    id: 2,
    question: "Under what conditions does the 'finally' block execute in Java?",
    options: [
      "Always executes, regardless of whether an exception was thrown or caught (unless JVM terminates via System.exit)",
      "Only when an exception is successfully caught",
      "Only when NO exception is thrown",
      "Only on weekends"
    ],
    correctAnswer: 0,
    explanation: "The `finally` block ALWAYS executes whether an exception is thrown, caught, or not thrown at all. It is primarily used for cleanup tasks like closing database connections and file streams.",
    marks: 1,
    hint: "Guaranteed cleanup block that executes under all circumstances."
  },
  {
    id: 3,
    question: "Which keyword is used to explicitly instantiate and throw an exception object in Java?",
    options: [
      "throw",
      "throws",
      "catch",
      "assert"
    ],
    correctAnswer: 0,
    explanation: "`throw` is used to explicitly throw an exception object (e.g. `throw new IllegalArgumentException();`), whereas `throws` is used in method signatures to declare checked exceptions.",
    marks: 1,
    hint: "throw (verb - throw an object) vs throws (clause in method signature)."
  },
  {
    id: 4,
    question: "Can a single 'try' block be followed by multiple 'catch' blocks in Java?",
    options: [
      "Yes, to handle different types of exceptions with specific recovery handlers",
      "No, only one catch block is permitted per try block",
      "Yes, but only if all catch blocks catch the exact same exception class",
      "No, multiple catch blocks cause a compile error"
    ],
    correctAnswer: 0,
    explanation: "A single try block can have multiple catch blocks to handle specific exceptions independently (from most specific subclass to most generic superclass).",
    marks: 1,
    hint: "Multiple catch blocks handle diverse exception types."
  },
  {
    id: 5,
    question: "What happens if an exception is thrown inside a try block and no matching catch block is found?",
    options: [
      "The finally block executes, and then the uncaught exception propagates up the call stack to terminate the thread",
      "The exception is silently deleted",
      "The program returns to the start of the try block",
      "The catch block of another unrelated class is invoked"
    ],
    correctAnswer: 0,
    explanation: "Even if an exception is unhandled, the `finally` block executes first, after which the unhandled exception propagates up the call stack to the default exception handler.",
    marks: 1,
    hint: "Finally executes before unhandled exceptions propagate."
  }
];

export default questions;
