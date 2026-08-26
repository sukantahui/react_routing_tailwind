/**
 * Module 001_006: Topic 2: Array declaration styles: int[] arr vs int arr[] (preferred Java convention)
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What are the two syntactical styles for declaring an array in Java?",
    shortAnswer: "1. Java Style (Preferred): `int[] arr;` (brackets attached to data type); 2. C-Style (Legacy): `int arr[];` (brackets attached to identifier).",
    explanation: "Both are semantically valid in Java, but Java style is industry standard.",
    hint: "int[] arr (Java style) vs int arr[] (C style).",
    level: "basic",
    codeExample: "int[] javaStyle; // Preferred | int cStyle[]; // Discouraged"
  },
  {
    question: "Why is `int[] arr;` universally preferred over `int arr[];` in professional Java code?",
    shortAnswer: "Because `int[]` clearly communicates that the *type* of the variable is 'Array of Integers', and prevents multi-variable declaration bugs like `int a[], b;`.",
    explanation: "Clean type-level binding.",
    hint: "Clearly binds array dimension to the type and prevents multi-variable bugs.",
    level: "basic",
    codeExample: "int[] a, b; // Both are int[] arrays"
  },
  {
    question: "In the declaration `int a[], b;`, what is the type of variable `a` and variable `b`?",
    shortAnswer: "`a` is an array of integers (`int[]`); `b` is a regular primitive scalar `int`!",
    explanation: "Classic C-syntax trap: brackets on identifier apply ONLY to that specific variable.",
    hint: "a is int[], b is a regular primitive int.",
    level: "basic",
    codeExample: "int a[], b; // a is int[], b is int"
  },
  {
    question: "In the declaration `int[] a, b;`, what is the type of variable `a` and variable `b`?",
    shortAnswer: "BOTH `a` and `b` are arrays of integers (`int[]`).",
    explanation: "Because `int[]` modifies the base type of the entire declaration line.",
    hint: "Both a and b are int[] arrays.",
    level: "basic",
    codeExample: "int[] a, b; // a is int[], b is int[]"
  },
  {
    question: "In the Coder & AccoTax Barrackpore fee ledger, how does `double[] feesA, feesB;` prevent accounting bugs?",
    shortAnswer: "It guarantees that both `feesA` and `feesB` are allocated as full array ledgers in Indian Rupees (₹) rather than accidental single scalars.",
    explanation: "Demonstrates practical type safety.",
    hint: "Guarantees both variables are full arrays in ₹.",
    level: "basic",
    codeExample: "double[] feesA, feesB; // Both are double[] arrays"
  },
  {
    question: "In the declaration `int[] a, b[];`, what are the dimensions of `a` and `b`?",
    shortAnswer: "`a` is a 1-dimensional array (`int[]`); `b` is a 2-dimensional array (`int[][]`)!",
    explanation: "The base type is `int[]`, and `b` adds an extra bracket dimension.",
    hint: "a is 1D (int[]), b is 2D (int[][]).",
    level: "intermediate",
    codeExample: "int[] a, b[]; // a is int[], b is int[][]"
  },
  {
    question: "Why did the creators of Java include C-style `int arr[];` in the first place?",
    shortAnswer: "To make it easier for C and C++ programmers to transition to Java in 1995 without rejecting familiar syntax.",
    explanation: "Historical backward compatibility with C.",
    hint: "To ease adoption for C and C++ programmers in 1995.",
    level: "basic",
    codeExample: "// Legacy C compatibility feature"
  },
  {
    question: "Can space exist between the type, brackets, and identifier (`int [ ] arr;`)?",
    shortAnswer: "Yes! Java syntax is whitespace-insensitive, so `int[] arr;`, `int [] arr;`, and `int[ ] arr;` are all identical to the compiler.",
    explanation: "Whitespace flexibility in Java grammar.",
    hint: "Yes, whitespace around brackets is permitted but discouraged.",
    level: "basic",
    codeExample: "int [] arr; // Valid, but use int[] arr"
  },
  {
    question: "Can you specify an array dimension size in a declaration (`int[5] arr;`)?",
    shortAnswer: "NO! In Java, specifying dimension size during declaration is a COMPILE ERROR (`']' expected`). Size is specified ONLY during instantiation (`new int[5]`).",
    explanation: "Declaration defines type, not memory allocation.",
    hint: "Compile error: size cannot be specified in declaration.",
    level: "basic",
    codeExample: "// int[5] arr; // COMPILER ERROR!"
  },
  {
    question: "In the declaration `int[][] a, b;`, what are `a` and `b`?",
    shortAnswer: "BOTH `a` and `b` are 2-dimensional integer arrays (`int[][]`).",
    explanation: "The base type is 2D array.",
    hint: "Both a and b are 2D arrays (int[][]).",
    level: "basic",
    codeExample: "int[][] a, b; // Both are int[][]"
  },
  {
    question: "In the declaration `int a[][], b[];`, what are `a` and `b`?",
    shortAnswer: "`a` is a 2D array (`int[][]`); `b` is a 1D array (`int[]`).",
    explanation: "Identifier-bound brackets apply separately to each variable.",
    hint: "a is 2D (int[][]), b is 1D (int[]).",
    level: "intermediate",
    codeExample: "int a[][], b[]; // a is int[][], b is int[]"
  },
  {
    question: "What does the Google Java Style Guide say about array declaration brackets?",
    shortAnswer: "The Google Java Style Guide strictly mandates: 'The square brackets form a part of the type, not the variable: `String[] args`, not `String args[]`'.",
    explanation: "Industry standard style rule.",
    hint: "Brackets must form part of the type (String[] args).",
    level: "basic",
    codeExample: "// Google Style Guide: String[] args"
  },
  {
    question: "How does `public static void main(String[] args)` demonstrate the preferred Java convention?",
    shortAnswer: "The brackets are attached to `String[]`, explicitly declaring that the `main` method receives an array of String arguments.",
    explanation: "Standard entry point signature.",
    hint: "Standard main method signature uses String[] args.",
    level: "basic",
    codeExample: "public static void main(String[] args)"
  },
  {
    question: "Is `public static void main(String args[])` legal in Java?",
    shortAnswer: "Yes, it compiles and runs identically, but is considered outdated legacy syntax.",
    explanation: "Valid syntax, but discouraged in modern codebases.",
    hint: "Legal and runnable, but outdated style.",
    level: "basic",
    codeExample: "public static void main(String args[]) // Legal but legacy"
  },
  {
    question: "In the declaration `int[] []a;`, is `a` a 1D or 2D array?",
    shortAnswer: "`a` is a 2D array (`int[][]`).",
    explanation: "Spaces between brackets do not alter dimensionality.",
    hint: "2D array (int[][]).",
    level: "intermediate",
    codeExample: "int[] []a; // 2D array"
  },
  {
    question: "Can an array be declared with `var` in Java 10+ (`var arr = new int[5];`)?",
    shortAnswer: "Yes! Using Local Variable Type Inference (`var`), the compiler automatically infers `arr` as `int[]`.",
    explanation: "Modern Java 10+ feature.",
    hint: "Yes, var infers int[] from the RHS instantiation.",
    level: "intermediate",
    codeExample: "var arr = new int[5]; // Inferred as int[]"
  },
  {
    question: "Can you use `var[] arr = new int[5];` or `var arr[] = new int[5];`?",
    shortAnswer: "NO! `var` cannot be combined with bracket syntax; it results in a compile-time syntax error.",
    explanation: "JLS §14.4 restricts var syntax.",
    hint: "Compile error: var cannot have bracket modifiers.",
    level: "intermediate",
    codeExample: "// var[] arr = new int[5]; // COMPILER ERROR!"
  },
  {
    question: "Can you declare an array using `var` with an array initializer literal (`var arr = {1, 2, 3};`)?",
    shortAnswer: "NO! Array initializer literals (`{1, 2, 3}`) require an explicit target type, so `var arr = {1, 2, 3};` fails to compile (must write `var arr = new int[]{1, 2, 3};`).",
    explanation: "Type inference limitation with naked array literals.",
    hint: "Compile error: must use new int[]{1, 2, 3} with var.",
    level: "intermediate",
    codeExample: "var arr = new int[]{1, 2, 3}; // Legal"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what is the #1 syntax rule enforced in code reviews?",
    shortAnswer: "Always place brackets directly on the type (`double[] fees`) and never split brackets across variable names.",
    explanation: "Ensures readability and prevents multi-variable declaration bugs.",
    hint: "Always place brackets on type (double[] fees).",
    level: "basic",
    codeExample: "double[] fees; // Code review standard"
  },
  {
    question: "In `int[] a, b[], c[][];`, what are the dimensions of `a`, `b`, and `c`?",
    shortAnswer: "`a` is 1D (`int[]`), `b` is 2D (`int[][]`), and `c` is 3D (`int[][][]`).",
    explanation: "Each variable adds its own bracket count to the base type `int[]`.",
    hint: "a is 1D, b is 2D, c is 3D.",
    level: "advanced",
    codeExample: "int[] a, b[], c[][]; // 1D, 2D, 3D"
  },
  {
    question: "Can an array declaration be preceded by `final` (`final int[] arr;`)?",
    shortAnswer: "Yes! The `final` modifier applies to the reference variable, preventing reassignment to another array object.",
    explanation: "Immutable reference variable.",
    hint: "Yes, makes the reference variable constant.",
    level: "basic",
    codeExample: "final int[] arr = new int[3];"
  },
  {
    question: "Does `final int[] arr` make the array elements read-only?",
    shortAnswer: "NO! The reference cannot change, but the contents (`arr[0] = 42;`) remain fully mutable.",
    explanation: "Shallow immutability.",
    hint: "No, elements remain mutable.",
    level: "basic",
    codeExample: "final int[] arr = {1, 2}; arr[0] = 99; // Legal"
  },
  {
    question: "Can an array be declared as a return type of a method (`public int[] getScores()`)?",
    shortAnswer: "Yes! Java style places `int[]` as the return type before the method name.",
    explanation: "Standard method signature return type.",
    hint: "Yes: public int[] getScores().",
    level: "basic",
    codeExample: "public int[] getScores() { return new int[]{100, 95}; }"
  },
  {
    question: "Can a C-style array bracket follow a method name (`public int getScores()[]`) in Java?",
    shortAnswer: "Yes, Java grammar technically permits `int getScores()[]`, but it is heavily deprecated in style guides and should never be used.",
    explanation: "Obscure legacy grammar quirk.",
    hint: "Syntactically legal but strongly discouraged.",
    level: "advanced",
    codeExample: "int getScores()[] { return new int[0]; } // Legal but terrible style!"
  },
  {
    question: "How does declaring multiple variables on separate lines improve code quality?",
    shortAnswer: "Declaring one variable per line (`int[] a; int[] b;`) eliminates ambiguity and allows individual documentation comments per field.",
    explanation: "Clean Code best practice.",
    hint: "One declaration per line eliminates all syntax ambiguities.",
    level: "basic",
    codeExample: "int[] marks;\nint[] rollNumbers;"
  },
  {
    question: "What is the bytecode difference between `int[] arr` and `int arr[]`?",
    shortAnswer: "Zero difference! Both compile to the EXACT same JVM bytecode instructions.",
    explanation: "Purely a source-level syntactic distinction.",
    hint: "Zero difference; both produce identical bytecode.",
    level: "intermediate",
    codeExample: "// Bytecode is 100% identical"
  },
  {
    question: "In the Coder & AccoTax Barrackpore tax accounting module, why is `BigDecimal[] ledger` used instead of `BigDecimal ledger[]`?",
    shortAnswer: "To ensure clear type recognition for financial audits and compatibility with automated static analysis tools (SonarQube, Checkstyle).",
    explanation: "Static code analysis compliance.",
    hint: "Complies with Checkstyle and SonarQube static analysis rules.",
    level: "basic",
    codeExample: "BigDecimal[] ledger; // Compliant with static analysis"
  },
  {
    question: "Can annotations be placed on array types in Java 8+ (`@NonNull String [] arr`)?",
    shortAnswer: "Yes! Java 8 Type Annotations allow annotating the array type (`@NonNull String[]`) or the array element type (`String @NonNull []`).",
    explanation: "Java Type Annotation specification (JSR 308).",
    hint: "Yes, Java 8 type annotations can target array brackets directly.",
    level: "advanced",
    codeExample: "String @NonNull [] arr; // Array cannot be null"
  },
  {
    question: "What is the ultimate takeaway of Module 001_006 Topic 2 for Java developers?",
    shortAnswer: "Always use Java style `type[] name` (e.g. `int[] arr`) because brackets belong to the type, ensuring clean multi-variable declarations and adhering to the Google Java Style Guide.",
    explanation: "Universal Java syntax standard.",
    hint: "Always attach brackets to the type (int[] arr), not the identifier.",
    level: "basic",
    codeExample: "// Summary: Always use int[] arr; avoid int arr[];"
  },
  {
    question: "What is the next topic (Topic 3) in Module 001_006?",
    shortAnswer: "Array instantiation using 'new' keyword and default values of array elements.",
    explanation: "Topic 3 explores dynamic array allocation mechanics, heap dimension arguments, and runtime default initialization.",
    hint: "Array instantiation using 'new' keyword and default values.",
    level: "basic",
    codeExample: "// Topic 3: Array Instantiation with 'new' and Default Values"
  }
];

export default questions;
