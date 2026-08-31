const topic1_questions = [
  {
    "question": "What is the primary benefit of Tiered Compilation enabled by default in Java?",
    "shortAnswer": "It provides both ultra-fast application startup (via C1 client compilation) and maximum long-term peak throughput (via C2 server compilation) without requiring developers to choose between -client and -server JVM modes.",
    "explanation": "Combines the advantages of both historical JIT compilers.",
    "hint": "Combines fast startup (C1) with peak long-term optimization (C2).",
    "level": "Intermediate",
    "codeExample": "Tiered promotion: 0 → 3 → 4"
  },
  {
    "question": "What does the number in the output column of -XX:+PrintCompilation represent (e.g. '1254   4   com.foo.Bar::calculate')?",
    "shortAnswer": "It represents the Tier Compilation Level (from 1 to 4) at which the method was just compiled by the JIT.",
    "explanation": "Level 4 indicates maximum C2 optimization.",
    "hint": "The Tiered Compilation level (1, 2, 3, or 4).",
    "level": "Beginner",
    "codeExample": "1254  4  ... → Level 4 C2 Server compilation."
  }
];

export default topic1_questions;
