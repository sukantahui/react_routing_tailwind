/**
 * Module 001_008: Topic 0: Review of Segment 1 core concepts: JVM, Datatypes, Operators, Control Flow, Loops, Arrays, Methods
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What comprises the Segment 1 Java Core Foundations?",
    shortAnswer: "The foundational syntax and runtime architecture of Java: JVM Architecture, Datatypes & Variables, Operators, Decision Making & Switch, Loops, Arrays, and Methods with Recursion.",
    explanation: "Overview of Segment 1 foundational roadmap.",
    hint: "JVM, Datatypes, Operators, Control Flow, Loops, Arrays, and Methods.",
    level: "basic",
    codeExample: "// Modules 001_001 through 001_007"
  },
  {
    question: "What is the primary role of the Java Virtual Machine (JVM)?",
    shortAnswer: "To execute compiled Java bytecode (`.class` files) on any underlying hardware/OS platform (Write Once, Run Anywhere - WORA), managing memory, ClassLoading, and JIT compilation.",
    explanation: "JVM core responsibility.",
    hint: "Executes bytecode, manages memory, ClassLoading, and JIT compilation.",
    level: "basic",
    codeExample: "javac App.java -> App.class -> JVM Execution"
  },
  {
    question: "What are the 8 Primitive Data Types in Java and their sizes in bits?",
    shortAnswer: "`byte` (8), `short` (16), `int` (32), `long` (64), `float` (32), `double` (64), `char` (16), `boolean` (JVM dependent, typically 8/32).",
    explanation: "The 8 primitive types in Java.",
    hint: "byte, short, int, long, float, double, char, boolean.",
    level: "basic",
    codeExample: "byte b = 127; short s = 32000; int i = 200000; long l = 100L;"
  },
  {
    question: "What is the key difference between Primitive Types and Reference Types in memory?",
    shortAnswer: "Primitive variables directly store their raw binary values inside their local stack slot; Reference variables store memory address pointers on the Stack referring to Object instances on the Heap.",
    explanation: "Primitive vs Reference memory layout.",
    hint: "Primitives hold values directly on Stack; Reference variables hold Heap memory pointers.",
    level: "basic",
    codeExample: "int x = 10; // Primitive on stack\nStudentRecord s = new StudentRecord(...); // Pointer on stack, object on Heap"
  },
  {
    question: "What is the difference between Widening and Narrowing Type Casting in Java?",
    shortAnswer: "Widening converts smaller data types to larger types automatically without data loss; Narrowing converts larger types to smaller types requiring explicit casting `(int) d` with potential precision loss.",
    explanation: "Type conversion mechanics.",
    hint: "Widening is implicit and lossless; narrowing is explicit with potential data loss.",
    level: "basic",
    codeExample: "double d = 10; // Widening (implicit)\nint i = (int) 10.5; // Narrowing (explicit)"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what was Swadeep's average score across 4 exams?",
    shortAnswer: "(88 + 92 + 95 + 90) / 4 = 91.25% (Grade: A+ Outstanding).",
    explanation: "Swadeep average calculation.",
    hint: "91.25%.",
    level: "basic",
    codeExample: "computeAverageScore(new int[]{88, 92, 95, 90}) -> 91.25%"
  },
  {
    question: "How do modern Switch Expressions (Java 14+) differ from legacy switch statements?",
    shortAnswer: "They use arrow syntax (`->`), return values directly, eliminate fall-through bugs without requiring `break`, and allow multiple comma-separated case labels (`case 10, 9 -> ...`).",
    explanation: "Java 14+ enhanced switch features.",
    hint: "Arrow syntax, value return, no fall-through bugs, comma-separated labels.",
    level: "basic",
    codeExample: "return switch (band) { case 10, 9 -> \"A+\"; case 8 -> \"A\"; default -> \"B\"; };"
  },
  {
    question: "What is the difference between `==` and `.equals()` in Java?",
    shortAnswer: "`==` compares memory references (do both variables point to the exact same memory address?); `.equals()` compares logical content value equivalence.",
    explanation: "Reference identity vs value equality.",
    hint: "== compares memory addresses; .equals() compares logical content.",
    level: "basic",
    codeExample: "s1 == s2 // Address comparison | s1.equals(s2) // Content comparison"
  },
  {
    question: "How does the enhanced `for-each` loop work on arrays internally?",
    shortAnswer: "The Java compiler converts `for (int s : scores)` into a standard indexed for-loop `for (int i = 0; i < scores.length; i++)` in bytecode.",
    explanation: "For-each loop bytecode compilation.",
    hint: "Translates to a standard indexed loop in bytecode.",
    level: "basic",
    codeExample: "for (int s : scores) total += s;"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what was Tuhina's net fee after 20% scholarship and 18% GST?",
    shortAnswer: "Base: ₹25,000 &minus; 20% (₹5,000) = ₹20,000 taxable + 18% GST (₹3,600) = ₹23,600.00 in Indian Rupees (₹).",
    explanation: "Tuhina fee calculation.",
    hint: "₹23,600.00.",
    level: "basic",
    codeExample: "computeFinalPayable(25000.0, 20.0) -> ₹23,600.00"
  },
  {
    question: "Why is an Array in Java always treated as an Object?",
    shortAnswer: "Arrays in Java are dynamically allocated on the Heap, possess an implicit length property (`arr.length`), and inherit from `java.lang.Object`.",
    explanation: "Java array object nature.",
    hint: "Allocated on Heap, has .length property, and inherits from java.lang.Object.",
    level: "basic",
    codeExample: "int[] arr = new int[5]; // Object on Heap"
  },
  {
    question: "What is a 'Ragged Array' (Jagged Array) in Java?",
    shortAnswer: "A multidimensional array where sub-arrays have different lengths (e.g. `int[][] grid = new int[3][]; grid[0] = new int[2]; grid[1] = new int[5];`).",
    explanation: "Ragged array definition.",
    hint: "Multidimensional array where rows have varying column lengths.",
    level: "intermediate",
    codeExample: "int[][] jagged = new int[2][]; jagged[0] = new int[2]; jagged[1] = new int[4];"
  },
  {
    question: "Why is Java strictly Pass-by-Value for both primitives and object references?",
    shortAnswer: "Because Java always makes a copy of the value: primitive values copy their raw bits; object references copy the address pointer value (the caller's reference variable cannot be reassigned).",
    explanation: "Pass-by-value fundamental proof.",
    hint: "Copies the value: raw bits for primitives, address pointer for references.",
    level: "basic",
    codeExample: "void modify(int x) { x = 99; } // Does not change caller's variable"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, how did `calculateLoyaltyRewardPoints` execute recursively?",
    shortAnswer: "Base Case: `milestones <= 0` returns 0; Recursive Step: `50 + calculateLoyaltyRewardPoints(milestones - 1)` awarding 200 points for 4 completed tests in Indian Rupees (₹).",
    explanation: "Reward points recursive calculation.",
    hint: "50 * 4 = 200 points.",
    level: "basic",
    codeExample: "calculateLoyaltyRewardPoints(4) -> 200 pts"
  },
  {
    question: "What is Method Overloading and what determines a valid overload?",
    shortAnswer: "Defining multiple methods with the SAME name in the same class with DIFFERENT parameter lists (count, types, or order). Return type alone CANNOT overload a method.",
    explanation: "Method overloading definition and rules.",
    hint: "Same method name, different parameter lists. Return type alone is insufficient.",
    level: "basic",
    codeExample: "void pay(int amt); void pay(double amt); void pay(String student, double amt);"
  },
  {
    question: "What is the Single-Last-Parameter rule for Variable Arguments (Varargs)?",
    shortAnswer: "A method can declare at most ONE varargs parameter (`Type...`), and it MUST be the very last parameter in the method signature.",
    explanation: "Varargs syntax invariant.",
    hint: "At most one varargs parameter, and it must be the last parameter.",
    level: "basic",
    codeExample: "public static double sum(String campus, double... fees) { ... }"
  },
  {
    question: "What is the Call Stack during method execution?",
    shortAnswer: "A private per-thread LIFO memory structure where each method call pushes a Stack Frame containing local variables, operand stack, and return addresses, popped upon return in $O(1)$ time.",
    explanation: "Call stack definition.",
    hint: "Per-thread LIFO memory storing active method stack frames.",
    level: "basic",
    codeExample: "// Method invocation pushes frame; method return pops frame"
  },
  {
    question: "In the Coder & AccoTax Barrackpore ledger, what was the Total Aggregate Revenue collected across all 4 students?",
    shortAnswer: "Swadeep (₹20,060) + Tuhina (₹23,600) + Abhronila (₹19,116) + Debangshu (₹16,815) = ₹79,591.00 in Indian Rupees (₹).",
    explanation: "Total revenue aggregation calculation.",
    hint: "₹79,591.00 total.",
    level: "basic",
    codeExample: "aggregateCampusFees = ₹79,591.00"
  },
  {
    question: "What causes a `StackOverflowError` in Java?",
    shortAnswer: "Excessively deep or unbounded recursive method calls exceeding the thread's Call Stack memory limit.",
    explanation: "Stack overflow root cause.",
    hint: "Unbounded recursion or excessively deep calls exceeding stack memory.",
    level: "basic",
    codeExample: "void recurse() { recurse(); } // StackOverflowError"
  },
  {
    question: "What causes an `ArrayIndexOutOfBoundsException`?",
    shortAnswer: "Attempting to access an array index that is negative or greater than or equal to `array.length` (`index < 0 || index >= length`).",
    explanation: "Array bounds exception cause.",
    hint: "Accessing index < 0 or index >= array.length.",
    level: "basic",
    codeExample: "int[] a = new int[3]; int val = a[5]; // Throws ArrayIndexOutOfBoundsException"
  },
  {
    question: "What is the difference between `break` and `continue` inside loops?",
    shortAnswer: "`break` immediately terminates the entire loop; `continue` skips the remainder of the current iteration and jumps to the next iteration.",
    explanation: "Loop control jump statements.",
    hint: "break exits loop completely; continue skips to the next iteration.",
    level: "basic",
    codeExample: "if (x == 5) break; // Exits loop | if (x == 5) continue; // Next iteration"
  },
  {
    question: "What is the difference between `System.out.print()`, `println()`, and `printf()`?",
    shortAnswer: "`print()` outputs without a newline; `println()` appends a newline; `printf()` formats strings with format specifiers (`%s`, `%d`, `%.2f`, `%,.2f`).",
    explanation: "Console output methods comparison.",
    hint: "print (raw), println (newline), printf (formatted).",
    level: "basic",
    codeExample: "System.out.printf(\"Fee: ₹%,.2f%n\", 25000.0);"
  },
  {
    question: "Why should you avoid creating monolithic code inside a single `main()` method?",
    shortAnswer: "Monolithic code is hard to read, impossible to unit test, violates Single Responsibility, and prevents code reuse across components.",
    explanation: "Modular software engineering rationale.",
    hint: "Hard to maintain, test, and reuse. Violates single responsibility.",
    level: "basic",
    codeExample: "// Decompose into small, focused, reusable helper methods"
  },
  {
    question: "What is the String Pool in the JVM Heap?",
    shortAnswer: "A special cached memory area on the Heap where string literals are deduplicated and shared to optimize memory consumption.",
    explanation: "String pool memory optimization.",
    hint: "Heap cache that stores unique string literals to save memory.",
    level: "intermediate",
    codeExample: "String s1 = \"Java\"; String s2 = \"Java\"; // s1 == s2 is true (shared in pool)"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what was Abhronila's net fee after 10% scholarship and 18% GST?",
    shortAnswer: "Base: ₹18,000 &minus; 10% (₹1,800) = ₹16,200 taxable + 18% GST (₹2,916) = ₹19,116.00 in Indian Rupees (₹).",
    explanation: "Abhronila net fee calculation.",
    hint: "₹19,116.00.",
    level: "basic",
    codeExample: "computeFinalPayable(18000.0, 10.0) -> ₹19,116.00"
  },
  {
    question: "What is the difference between a `while` loop and a `do-while` loop?",
    shortAnswer: "A `while` loop checks the condition before the first iteration (may execute 0 times); a `do-while` loop checks the condition after execution (always executes at least 1 time).",
    explanation: "Pre-test vs Post-test loop mechanics.",
    hint: "while checks before (0+ executions); do-while checks after (1+ executions).",
    level: "basic",
    codeExample: "do { System.out.println(\"Runs at least once\"); } while (false);"
  },
  {
    question: "What is the purpose of Module 001_008 in the Java Core curriculum?",
    shortAnswer: "It serves as the comprehensive assessment and algorithmic problem-solving lab for Segment 1, synthesizing all foundational competencies through classic interview problems and mini-projects.",
    explanation: "Module 001_008 mission statement.",
    hint: "Comprehensive synthesis, algorithmic lab, and certification assessment for Segment 1.",
    level: "basic",
    codeExample: "// Module 001_008: Segment 1 Capstone Assessment Lab"
  },
  {
    question: "What is the ultimate takeaway of Module 001_008 Topic 0 for Java developers?",
    shortAnswer: "Segment 1 establishes the rock-solid foundations of Java: JVM execution, strong typing, operators, control flow, loops, arrays, and modular methods. Mastering these is required before advancing to Object-Oriented Programming (OOP).",
    explanation: "Segment 1 synthesis mastery.",
    hint: "Solidifies all foundational syntax and memory concepts before advancing to OOP.",
    level: "basic",
    codeExample: "// Foundations Mastery: Ready for Segment 2 OOP!"
  },
  {
    question: "What is the next topic (Topic 1) in Module 001_008?",
    shortAnswer: "Algorithmic Problem 1: Prime number generation using Sieve of Eratosthenes.",
    explanation: "Topic 1 implements the high-performance Sieve of Eratosthenes prime generation algorithm.",
    hint: "Algorithmic Problem 1: Prime number generation using Sieve of Eratosthenes.",
    level: "basic",
    codeExample: "// Topic 1: Sieve of Eratosthenes Prime Generator"
  },
  {
    question: "What is the time complexity of the Sieve of Eratosthenes algorithm explored in Topic 1?",
    shortAnswer: "$O(N \\log (\\log N))$ time complexity, which is dramatically faster than the naive $O(N \\sqrt{N})$ trial division approach.",
    explanation: "Sieve of Eratosthenes algorithmic efficiency preview.",
    hint: "O(N log(log N)) ultra-fast time complexity.",
    level: "intermediate",
    codeExample: "// Sieve of Eratosthenes: O(N log(log N))"
  }
];

export default questions;
