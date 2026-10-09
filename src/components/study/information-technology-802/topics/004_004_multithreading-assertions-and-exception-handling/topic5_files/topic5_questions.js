const questions = [
  {
    id: 1,
    question: "Which command-line option is used with the 'java' launcher to enable assertions for an entire application?",
    options: [
      "-ea (or -enableassertions)",
      "-assert",
      "-debug",
      "-enable-invariants"
    ],
    correctAnswer: 0,
    explanation: "The `-ea` or `-enableassertions` command-line switch enables assertion checking in the JVM at runtime.",
    marks: 1,
    hint: "Short for 'enable assertions'."
  },
  {
    id: 2,
    question: "Which command-line option disables assertions explicitly in the JVM?",
    options: [
      "-da (or -disableassertions)",
      "-noassert",
      "-killassertions",
      "-stop-ea"
    ],
    correctAnswer: 0,
    explanation: "The `-da` or `-disableassertions` flag explicitly disables assertion checking in the JVM.",
    marks: 1,
    hint: "Short for 'disable assertions'."
  },
  {
    id: 3,
    question: "How do you enable assertions for a specific package named 'com.school.banking' while keeping other packages default?",
    options: [
      "java -ea:com.school.banking... MainClass",
      "java -enable com.school.banking MainClass",
      "java -ea:package(com.school.banking) MainClass",
      "java --assert com.school.banking MainClass"
    ],
    correctAnswer: 0,
    explanation: "Using `java -ea:com.school.banking... MainClass` enables assertions for the specified package and all its subpackages (indicated by the three dots `...`).",
    marks: 1,
    hint: "Package-level assertion syntax with package name followed by three dots."
  },
  {
    id: 4,
    question: "Which flag is used to enable assertions in system classes (JVM core libraries)?",
    options: [
      "-esa (or -enablesystemassertions)",
      "-system-assert",
      "-ea-core",
      "-system-ea"
    ],
    correctAnswer: 0,
    explanation: "The `-esa` or `-enablesystemassertions` command-line switch enables assertion checking inside JVM system and core runtime classes.",
    marks: 1,
    hint: "System assertions enablement flag with 's' for system."
  },
  {
    id: 5,
    question: "If a Java program containing `assert x > 0;` is executed as `java Main` (without -ea), what happens if x is -5?",
    options: [
      "The assertion statement is ignored, and the program continues executing without throwing any error",
      "The JVM throws an AssertionError",
      "The program terminates with an ExitCode 1",
      "The compiler flags a warning"
    ],
    correctAnswer: 0,
    explanation: "Because `java Main` runs without the `-ea` flag, assertions remain disabled by default, so the failed condition is completely ignored and no error is thrown.",
    marks: 1,
    hint: "Assertions are disabled by default when -ea is omitted."
  }
];

export default questions;
