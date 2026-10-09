const questions = [
  {
    id: 1,
    question: "Why are assertions disabled by default in the Java Runtime Environment (JRE)?",
    options: [
      "To eliminate CPU and memory evaluation overhead and preserve maximum execution speed in production environments",
      "Because assertions contain security vulnerabilities",
      "Because assertions only work on Linux operating systems",
      "Because the assert keyword was deprecated in Java 8"
    ],
    correctAnswer: 0,
    explanation: "Assertions are disabled by default so that production systems can run at maximum performance without wasting CPU cycles continually re-evaluating diagnostic boolean conditions.",
    marks: 1,
    hint: "Think about runtime performance and execution speed in production systems."
  },
  {
    id: 2,
    question: "What happens when an assertion statement is encountered at runtime if assertions are DISABLED?",
    options: [
      "The JVM skips the assertion statement entirely without evaluating the condition",
      "The JVM throws an AssertionDisabledException",
      "The program terminates immediately",
      "The statement is logged to a hidden error file"
    ],
    correctAnswer: 0,
    explanation: "When assertions are disabled, the JVM completely bypasses the assertion statement at bytecode execution level, incurring virtually zero CPU overhead.",
    marks: 1,
    hint: "Skipped completely by the bytecode execution engine."
  },
  {
    id: 3,
    question: "Why is putting a method call with side effects inside an assertion (e.g. `assert list.remove(item);`) considered dangerous in Java?",
    options: [
      "Because in production where assertions are disabled, the condition is not evaluated, so the item is never removed",
      "Because list.remove() returns a boolean which is not accepted by assert",
      "Because it causes an OutOfMemoryError",
      "Because Java does not permit calling methods inside assert statements"
    ],
    correctAnswer: 0,
    explanation: "If assertions are disabled in production, any state mutation or side effect inside the assert expression will NOT execute, altering program behavior between development and production.",
    marks: 1,
    hint: "Condition is not evaluated when assertions are disabled, so side effects never happen."
  },
  {
    id: 4,
    question: "At what stage of application lifecycle are assertions primarily intended to be enabled?",
    options: [
      "During Development, Unit Testing, and Quality Assurance (QA) phases",
      "Only during live production deployment",
      "During database backup operations",
      "During JAR file compression"
    ],
    correctAnswer: 0,
    explanation: "Assertions are designed to be enabled during development and testing phases to catch software logic defects early.",
    marks: 1,
    hint: "Development and testing phases."
  },
  {
    id: 5,
    question: "Does disabling assertions require recompiling the Java source code files?",
    options: [
      "No, assertions can be enabled or disabled at runtime via command-line flags without recompiling bytecode",
      "Yes, the code must be recompiled with javac -noassert",
      "Yes, all assert statements must be manually deleted from .java files",
      "Yes, but only for classes with main methods"
    ],
    correctAnswer: 0,
    explanation: "No recompilation is needed. Assertion enablement is controlled entirely at runtime through JVM command-line options.",
    marks: 1,
    hint: "Runtime switch without modifying or recompiling .class files."
  }
];

export default questions;
