const topic4_questions = [
  {
    question: "Does using a wildcard import ('import java.util.*') slow down application execution at runtime?",
    shortAnswer: "No! Wildcard imports have ZERO impact on runtime execution speed or memory footprint. In bytecode, javac translates every class into its fully qualified name. Unused classes in the package are never loaded by the JVM.",
    explanation: "Explicit imports are preferred primarily for readability and collision prevention, not performance.",
    hint: "Zero runtime impact; bytecode always uses fully qualified class names.",
    level: "Intermediate",
    codeExample: "import java.util.*; // Compiled bytecode uses exact classes only"
  }
];

export default topic4_questions;