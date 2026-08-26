const topic16_questions = [
  {
    question: "What is the 'recursive constructor invocation' error in Java?",
    shortAnswer: "A compile-time error triggered when overloaded constructors form a circular delegation loop using 'this()' (e.g. A calls B, and B calls A).",
    explanation: "Because 'this()' must be on line 1, constructor chaining is unconditional. The compiler builds a dependency graph and rejects circular dependencies.",
    hint: "Compile error caused by circular this() calls.",
    level: "Beginner",
    codeExample: "// Compile Error: recursive constructor invocation\nDemo() { this(1); }\nDemo(int x) { this(); }"
  },
  {
    question: "Why does Java catch constructor recursion at compile time, whereas method recursion is detected at runtime?",
    shortAnswer: "Method recursion can have dynamic runtime base cases ('if (n > 0) rec()'). Constructor 'this()' calls on line 1 are unconditional and can never terminate.",
    explanation: "Since constructor chaining has no base case exit, it is guaranteed to be an infinite loop, allowing javac to reject it at compile time.",
    hint: "Constructor this() is unconditional; method recursion has runtime base cases.",
    level: "Intermediate",
    codeExample: "// Method recursion has 'if (n <= 1) return;'\n// Constructor this() has no conditionals allowed"
  }
];

export default topic16_questions;