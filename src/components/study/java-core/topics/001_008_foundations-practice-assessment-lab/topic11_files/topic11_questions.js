/**
 * Module 001_008: Topic 11: Segment 1 Comprehensive Multiple Choice Question Exam
 * 30 High-Yield Comprehensive Q&A Items (Synthesizing Modules 001_001 through 001_007)
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "Where does the JVM allocate method stack frames and local variables?",
    shortAnswer: "Inside the thread-private **Stack Memory Area** (which is allocated and deallocated in $O(1)$ LIFO order without garbage collection).",
    explanation: "JVM Stack Memory Area mechanics (Module 001_001).",
    hint: "Thread-private Stack Memory Area.",
    level: "basic",
    codeExample: "// Stack frames created on method entry, popped on return"
  },
  {
    question: "Where are Java Object instances and array elements stored?",
    shortAnswer: "Inside the shared **Heap Memory Area**, managed by the JVM Garbage Collector.",
    explanation: "JVM Heap memory allocation (Module 001_001).",
    hint: "Shared Heap Memory Area.",
    level: "basic",
    codeExample: "int[] arr = new int[10]; // Stored in Heap"
  },
  {
    question: "What are the 8 primitive datatypes in Java?",
    shortAnswer: "`byte` (8-bit), `short` (16-bit), `int` (32-bit), `long` (64-bit), `float` (32-bit), `double` (64-bit), `char` (16-bit Unicode), and `boolean`.",
    explanation: "The 8 Java primitives (Module 001_002).",
    hint: "byte, short, int, long, float, double, char, boolean.",
    level: "basic",
    codeExample: "byte b; short s; int i; long l; float f; double d; char c; boolean bool;"
  },
  {
    question: "What is the default value of a local variable in Java?",
    shortAnswer: "Local variables have **NO default values**; Java enforces Definite Assignment and produces a compilation error if accessed uninitialized.",
    explanation: "Local variable definite assignment rule (Module 001_002).",
    hint: "No default value; causes compilation error if read uninitialized.",
    level: "basic",
    codeExample: "int x; // Must be assigned before use"
  },
  {
    question: "What is Type Widening (Implicit Promotion) vs Narrowing (Explicit Cast)?",
    shortAnswer: "**Widening** converts smaller types to larger types automatically without data loss (`int` $\\to$ `double`); **Narrowing** requires an explicit cast `(int) d` and can cause truncation loss.",
    explanation: "Type conversion taxonomy (Module 001_003).",
    hint: "Widening is automatic; Narrowing requires explicit cast and may lose precision.",
    level: "basic",
    codeExample: "double d = 10; // Widening | int x = (int) 7.9; // Narrowing"
  },
  {
    question: "What is the difference between `==` and `.equals()` for Strings?",
    shortAnswer: "`==` compares object reference memory addresses; `.equals()` compares character content sequence.",
    explanation: "String equality distinction (Module 001_003 / 001_008).",
    hint: "== compares memory addresses; .equals() compares character values.",
    level: "basic",
    codeExample: "str1.equals(str2) // Content comparison"
  },
  {
    question: "How does the arrow syntax (`->`) in Java 14+ Enhanced Switch prevent fall-through?",
    shortAnswer: "It executes only the statement or expression on the right-hand side of the arrow, automatically breaking without falling into subsequent cases.",
    explanation: "Enhanced switch expression mechanics (Module 001_004).",
    hint: "Arrow syntax executes only the matched case without falling through.",
    level: "basic",
    codeExample: "case 1 -> \"Monday\";"
  },
  {
    question: "What is the key difference between a `while` loop and a `do-while` loop?",
    shortAnswer: "A `while` loop checks the condition before the first iteration (may run 0 times); a `do-while` loop evaluates the condition at the bottom, **guaranteed to run at least ONCE**.",
    explanation: "Loop evaluation timing (Module 001_005).",
    hint: "do-while executes at least once before checking condition.",
    level: "basic",
    codeExample: "do { ... } while (condition);"
  },
  {
    question: "What is the difference between `break` and `continue` inside loops?",
    shortAnswer: "`break` terminates the entire loop immediately; `continue` skips the remainder of the current iteration and jumps to the next loop step.",
    explanation: "Jump statements in loops (Module 001_005).",
    hint: "break exits the loop; continue skips to the next iteration.",
    level: "basic",
    codeExample: "if (x == 5) break; if (x == 2) continue;"
  },
  {
    question: "What is a 'Ragged' (Jagged) Array in Java?",
    shortAnswer: "A 2D array where each row can have a different column length (e.g. `int[][] ragged = new int[3][]; ragged[0] = new int[2]; ragged[1] = new int[5];`).",
    explanation: "Ragged array memory model (Module 001_006).",
    hint: "A 2D array where rows have varying numbers of columns.",
    level: "basic",
    codeExample: "int[][] ragged = new int[2][]; ragged[0] = new int[3]; ragged[1] = new int[5];"
  },
  {
    question: "In the Coder & AccoTax Barrackpore exam simulation, what was Swadeep's exam score?",
    shortAnswer: "`7/7` ($100.0\\%$, Grade A, ₹5,000 merit award).",
    explanation: "Swadeep exam evaluation verification.",
    hint: "100.0% (Grade A).",
    level: "basic",
    codeExample: "Swadeep: Score 7/7 (100.0%) | Grade A"
  },
  {
    question: "Is Java Pass-by-Value or Pass-by-Reference?",
    shortAnswer: "Java is **STRICTLY PASS-BY-VALUE** for all parameters. For primitives, a copy of the primitive value is passed; for objects, a copy of the reference address pointer is passed.",
    explanation: "Pass-by-value fundamental truth in Java (Module 001_007).",
    hint: "Java is strictly Pass-by-Value for everything.",
    level: "basic",
    codeExample: "// Java copies the value/reference address onto the stack frame"
  },
  {
    question: "What are the rules for Variable-Length Arguments (`Varargs`) in Java methods?",
    shortAnswer: "1. Only ONE vararg parameter per method. 2. The vararg parameter must be the **LAST parameter** in the signature (`void log(String tag, int... values)`).",
    explanation: "Varargs declaration rules (Module 001_007).",
    hint: "Must be the last parameter; only one vararg parameter allowed per method.",
    level: "basic",
    codeExample: "public static void process(String title, int... numbers) {}"
  },
  {
    question: "What are the Two Mandatory Components of every recursive method?",
    shortAnswer: "1. **Base Case**: Halting condition that returns without recursing. 2. **Recursive Step (Inductive Step)**: Calls itself with modified arguments moving towards the base case.",
    explanation: "Recursive design requirements (Module 001_007).",
    hint: "Base Case (halts) and Recursive Step (progresses).",
    level: "basic",
    codeExample: "if (n <= 1) return 1; return n * fact(n - 1);"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what was Debangshu's score percentage?",
    shortAnswer: "`6/7` ($85.7\\%$, Grade B, ₹2,500 merit award).",
    explanation: "Debangshu exam score verification.",
    hint: "85.7% (Grade B).",
    level: "basic",
    codeExample: "Debangshu: Score 6/7 (85.7%) | Grade B"
  },
  {
    question: "What exception occurs when an array is indexed at `-1` or `arr.length`?",
    shortAnswer: "`java.lang.ArrayIndexOutOfBoundsException`.",
    explanation: "Array bounds exception type.",
    hint: "ArrayIndexOutOfBoundsException.",
    level: "basic",
    codeExample: "int x = arr[arr.length]; // Throws ArrayIndexOutOfBoundsException"
  },
  {
    question: "What is the result of integer division `5 / 2` in Java?",
    shortAnswer: "`2` (integer division truncates the decimal portion).",
    explanation: "Integer truncation rules.",
    hint: "2.",
    level: "basic",
    codeExample: "int result = 5 / 2; // 2"
  },
  {
    question: "How does the Bitwise XOR operator (`^`) behave for identical inputs $X \\oplus X$?",
    shortAnswer: "$X \\oplus X = 0$ (Self-inverse cancellation).",
    explanation: "Bitwise XOR self-inverse property.",
    hint: "Cancels out to 0.",
    level: "basic",
    codeExample: "5 ^ 5 = 0"
  },
  {
    question: "What is Method Overloading in Java?",
    shortAnswer: "Defining multiple methods in the same class with the **same name but different parameter lists** (number, types, or order of parameters).",
    explanation: "Compile-time polymorphism / method overloading.",
    hint: "Same method name with different parameter signatures.",
    level: "basic",
    codeExample: "void add(int a, int b); void add(double a, double b);"
  },
  {
    question: "Can method return type alone be used to overload a method in Java?",
    shortAnswer: "NO! Changing only the return type without modifying the parameter list causes a compilation error (`error: method is already defined`).",
    explanation: "Overloading return type invalidity.",
    hint: "No, return type alone cannot overload a method.",
    level: "basic",
    codeExample: "// Invalid: int get() and double get() in same class"
  },
  {
    question: "What is the time complexity of the Sieve of Eratosthenes for generating primes up to $N$?",
    shortAnswer: "$O(N \\log(\\log N))$ near-linear time.",
    explanation: "Sieve time complexity.",
    hint: "O(N log(log N)).",
    level: "basic",
    codeExample: "// O(N log(log N))"
  },
  {
    question: "What is the time complexity of Binary Search on a sorted array of size $N$?",
    shortAnswer: "$O(\\log_2 N)$ logarithmic time.",
    explanation: "Binary search complexity.",
    hint: "O(log N).",
    level: "basic",
    codeExample: "// O(log N)"
  },
  {
    question: "Why should `low + (high - low) / 2` be used for binary search midpoint?",
    shortAnswer: "To prevent 32-bit signed integer overflow when `low + high` exceeds `Integer.MAX_VALUE` ($2.14 \\times 10^9$).",
    explanation: "Midpoint overflow prevention formula.",
    hint: "Prevents integer overflow on large array indices.",
    level: "basic",
    codeExample: "int mid = low + (high - low) / 2;"
  },
  {
    question: "What is the formula to rotate an $N \\times N$ square matrix 90 degrees clockwise in-place?",
    shortAnswer: "1. Transpose the matrix across the main diagonal. 2. Reverse each row horizontally.",
    explanation: "In-place 90-degree rotation steps.",
    hint: "Transpose matrix + Reverse each row horizontally.",
    level: "basic",
    codeExample: "// Transpose + Row Reversal = 90° Clockwise Rotation"
  },
  {
    question: "What are the default values of fields inside newly instantiated objects?",
    shortAnswer: "Numeric primitives: `0` (`0.0`), `boolean`: `false`, `char`: `\\u0000`, Object references: `null`.",
    explanation: "Default initialization values in Heap.",
    hint: "0 for numbers, false for boolean, null for object references.",
    level: "basic",
    codeExample: "int a; // 0 | boolean b; // false | String s; // null"
  },
  {
    question: "What is an Armstrong Number?",
    shortAnswer: "A number of $D$ digits where the sum of each digit raised to the power of $D$ equals the number itself ($153 = 1^3 + 5^3 + 3^3$).",
    explanation: "Armstrong number definition.",
    hint: "Sum of digits raised to digit count equals the number itself.",
    level: "basic",
    codeExample: "153 = 1^3 + 5^3 + 3^3 = 153"
  },
  {
    question: "What is the standard indentation in Google Java Style?",
    shortAnswer: "Exactly **2 spaces** per indentation level.",
    explanation: "Google Java Style indentation standard.",
    hint: "2 spaces.",
    level: "basic",
    codeExample: "// 2 spaces indentation"
  },
  {
    question: "What is the ultimate takeaway of Segment 1 (Modules 001_001 through 001_008)?",
    shortAnswer: "Segment 1 establishes the rock-solid procedural, memory, and algorithmic foundation in Java Core (JVM memory, types, expressions, control flow, arrays, methods, recursion, and clean code hygiene), making the transition to Segment 2 Object-Oriented Programming intuitive and powerful.",
    explanation: "Segment 1 synthesis conclusion.",
    hint: "Rock-solid mastery of procedural, memory, array, and algorithmic foundations.",
    level: "basic",
    codeExample: "// Segment 1 Complete -> Ready for Segment 2 OOP!"
  },
  {
    question: "What is the next topic (Topic 12) in Module 001_008?",
    shortAnswer: "Segment 1 Timed Coding Assessment (Comprehensive coding evaluation covering arrays, methods, algorithms, and switch logic).",
    explanation: "Topic 12 is the final hands-on timed coding assessment for Segment 1.",
    hint: "Segment 1 Timed Coding Assessment.",
    level: "basic",
    codeExample: "// Topic 12: Segment 1 Timed Coding Assessment"
  },
  {
    question: "What is the first module in upcoming Segment 2 (Object-Oriented Programming)?",
    shortAnswer: "Module `002_001_classes-objects-and-constructors-deep-dive`.",
    explanation: "Segment 2 OOP starting module.",
    hint: "Module 002_001: Classes, Objects, and Constructors Deep Dive.",
    level: "basic",
    codeExample: "// Segment 2: Module 002_001 Classes & Objects Deep Dive"
  }
];

export default questions;
