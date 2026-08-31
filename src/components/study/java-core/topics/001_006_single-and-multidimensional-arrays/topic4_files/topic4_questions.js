/**
 * Module 001_006: Topic 4: Array initialization literals (e.g. int[] numbers = {10, 20, 30};)
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What is an Array Initializer Shortcut in Java (`int[] arr = {10, 20, 30};`)?",
    shortAnswer: "A concise syntax available ONLY at the point of declaration where the compiler automatically determines array length and populates elements in a single step.",
    explanation: "Eliminates the need to write `new int[]` during variable declaration.",
    hint: "Concise declaration syntax that infers length and initializes elements.",
    level: "basic",
    codeExample: "int[] numbers = {10, 20, 30};"
  },
  {
    question: "Can the `{10, 20, 30}` shortcut be used for variable reassignment (`arr = {40, 50};`)?",
    shortAnswer: "NO! Reassigning an existing array variable requires the Anonymous Array syntax: `arr = new int[]{40, 50};`.",
    explanation: "JLS §10.6 restricts naked brace initializers to initial declarations.",
    hint: "Compile error: must use new int[]{40, 50} for reassignments.",
    level: "basic",
    codeExample: "int[] arr = {1, 2};\n// arr = {3, 4}; // COMPILE ERROR!\narr = new int[]{3, 4}; // LEGAL"
  },
  {
    question: "What is an Anonymous Array in Java (`new int[]{10, 20, 30}`)?",
    shortAnswer: "An array created on-the-fly without an explicit variable name, typically used for method arguments, return statements, or variable reassignments.",
    explanation: "Inline array creation anywhere an expression is permitted.",
    hint: "An unnamed inline array created via new Type[]{...}.",
    level: "basic",
    codeExample: "printScores(new int[]{95, 88, 92});"
  },
  {
    question: "Why is `new int[3]{10, 20, 30}` a COMPILE-TIME ERROR in Java?",
    shortAnswer: "Because specifying the dimension `[3]` conflicts with the initializer list elements; Java grammar requires either `new int[3]` (empty) OR `new int[]{10, 20, 30}` (inferred length).",
    explanation: "Redundant and conflicting dimension specification.",
    hint: "Compile error: dimension size cannot be specified when initializer braces are provided.",
    level: "basic",
    codeExample: "// int[] arr = new int[3]{1, 2, 3}; // COMPILE ERROR!"
  },
  {
    question: "In the Coder & AccoTax Barrackpore course fee catalog, how are pricing tiers declared?",
    shortAnswer: "Using array literals `{12000.0, 15000.0, 18000.0, 25000.0}` to define tiered course packages in Indian Rupees (₹).",
    explanation: "Demonstrates clean array literal initialization.",
    hint: "Initializes pricing tier packages directly in ₹.",
    level: "basic",
    codeExample: "double[] packages = {12000.0, 15000.0, 18000.0};"
  },
  {
    question: "Is a trailing comma allowed inside an array initializer (`int[] arr = {1, 2, 3,};`)?",
    shortAnswer: "YES! Java grammar explicitly permits an optional trailing comma after the last element, simplifying multiline diffs in version control.",
    explanation: "Valid Java syntax since Java 1.0.",
    hint: "Yes, trailing commas are completely legal in Java array literals.",
    level: "basic",
    codeExample: "int[] arr = { 1, 2, 3, }; // Legal!"
  },
  {
    question: "How do you initialize a 2D Matrix using nested array literals?",
    shortAnswer: "`int[][] matrix = { {1, 2}, {3, 4} };`.",
    explanation: "Outer braces enclose inner 1D row array literals.",
    hint: "Use nested braces: {{1, 2}, {3, 4}}.",
    level: "basic",
    codeExample: "int[][] grid = { {1, 2}, {3, 4} };"
  },
  {
    question: "Can nested array literals create Jagged (Ragged) arrays with varying row lengths?",
    shortAnswer: "YES! `int[][] jagged = { {1}, {2, 3}, {4, 5, 6} };` automatically creates rows of lengths 1, 2, and 3 respectively.",
    explanation: "Jagged array literal creation.",
    hint: "Yes, rows can have differing element counts inside nested braces.",
    level: "basic",
    codeExample: "int[][] jagged = { {1}, {2, 3}, {4, 5, 6} };"
  },
  {
    question: "Can an array literal contain expressions and method calls (`int[] arr = {1 + 2, Math.max(5, 10)};`)?",
    shortAnswer: "YES! Any valid Java expression that evaluates to the declared element type is evaluated at runtime during array initialization.",
    explanation: "Dynamic element evaluation in literals.",
    hint: "Yes, expressions and method calls are evaluated at runtime.",
    level: "basic",
    codeExample: "int[] data = { 10 * 2, Math.max(4, 9), getCount() };"
  },
  {
    question: "Can `var` be used with a naked array initializer literal (`var arr = {1, 2, 3};`)?",
    shortAnswer: "NO! `var` requires an explicit type on the right-hand side, so you must write `var arr = new int[]{1, 2, 3};`.",
    explanation: "Type inference requires explicit type information.",
    hint: "Compile error: var requires new int[]{1, 2, 3}.",
    level: "intermediate",
    codeExample: "var arr = new int[]{1, 2, 3}; // Legal"
  },
  {
    question: "What is the bytecode generated for an array literal `{1, 2, 3}`?",
    shortAnswer: "The Java compiler generates `iconst_3`, `newarray int`, followed by `dup`, index pushes, and `iastore` bytecode instructions for each element.",
    explanation: "Syntactic sugar that translates to standard instantiation and assignment bytecode.",
    hint: "Translates to newarray followed by sequential iastore instructions.",
    level: "advanced",
    codeExample: "// Bytecode: newarray int → dup → iconst_0 → iconst_1 → iastore"
  },
  {
    question: "How do you return an inline array directly from a method?",
    shortAnswer: "`return new int[]{10, 20, 30};`.",
    explanation: "Anonymous array return idiom.",
    hint: "return new int[]{10, 20, 30};.",
    level: "basic",
    codeExample: "public int[] getCoords() { return new int[]{10, 20}; }"
  },
  {
    question: "Can an empty array literal be declared using braces (`int[] empty = {};`)?",
    shortAnswer: "YES! `int[] empty = {};` creates a valid array object on the Heap with `length == 0`.",
    explanation: "Zero-length array literal.",
    hint: "Yes, int[] empty = {}; creates an array of length 0.",
    level: "basic",
    codeExample: "int[] empty = {}; // length is 0"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, how do students pass test cases to grading methods?",
    shortAnswer: "By passing anonymous arrays: `verifyBatch(new double[]{15000.0, 18000.0});` in Indian Rupees (₹).",
    explanation: "Clean unit testing practice.",
    hint: "Passes inline anonymous arrays without declaring temporary variables.",
    level: "basic",
    codeExample: "verify(new double[]{15000.0, 18000.0});"
  },
  {
    question: "What happens if an element in an `int[]` literal cannot be widened to `int` (`int[] arr = {1, 2.5};`)?",
    shortAnswer: "Compile-time error: `incompatible types: possible lossy conversion from double to int`.",
    explanation: "Strict type checking during literal initialization.",
    hint: "Compile error: incompatible types.",
    level: "basic",
    codeExample: "// int[] arr = {1, 2.5}; // COMPILER ERROR!"
  },
  {
    question: "Can an array literal contain smaller numeric types (e.g. `byte`, `short`, `char`) in a `double[]` array?",
    shortAnswer: "YES! Implicit widening primitive conversion automatically converts `byte`, `short`, `char`, and `int` to `double`.",
    explanation: "Widening primitive conversions are legal in array initializers.",
    hint: "Yes, smaller numeric types are automatically widened.",
    level: "basic",
    codeExample: "double[] d = { 1, 'A', 50L }; // Legal (widened to double)"
  },
  {
    question: "Can an array of Objects be initialized with record or class instances (`StudentRecord[] r = { new StudentRecord(\"Swadeep\", 1) };`)?",
    shortAnswer: "YES! Object arrays can be initialized with instances of matching types or subclasses.",
    explanation: "Object array literal syntax.",
    hint: "Yes, Object array literals can contain instance constructors.",
    level: "basic",
    codeExample: "StudentRecord[] r = { new StudentRecord(\"Swadeep\", 101) };"
  },
  {
    question: "What is the memory difference between `int[] a = {1, 2};` and `int[] a = new int[]{1, 2};`?",
    shortAnswer: "Zero memory difference! Both allocate the exact same heap object with identical length and payload.",
    explanation: "The brace shortcut is purely syntactic sugar.",
    hint: "Zero difference; both produce identical heap objects.",
    level: "basic",
    codeExample: "// Bytecode and memory footprint are 100% identical"
  },
  {
    question: "Can array literals initialize 3D arrays (`int[][][] cube = { { {1} } };`)?",
    shortAnswer: "YES! Nested braces can nest to any dimension depth supported by the JVM.",
    explanation: "Multidimensional array literal nesting.",
    hint: "Yes, nested braces support arbitrary dimensions.",
    level: "intermediate",
    codeExample: "int[][][] cube = { { {1, 2}, {3, 4} } };"
  },
  {
    question: "How do you quickly print an array initialized via literal syntax?",
    shortAnswer: "`System.out.println(Arrays.toString(arr));` (or `Arrays.deepToString(matrix)` for 2D).",
    explanation: "Standard array visualization utility.",
    hint: "Arrays.toString(arr) or Arrays.deepToString(matrix).",
    level: "basic",
    codeExample: "System.out.println(Arrays.toString(coursePackages));"
  },
  {
    question: "What is the danger of large static array literals (e.g. 50,000 elements in `{...}`) in Java source code?",
    shortAnswer: "The generated bytecode for initializing the array may exceed the JVM 64KB method bytecode limit (`Code length too long` compile error).",
    explanation: "Java method bytecode limit constraint.",
    hint: "Can exceed the JVM 64KB method size limit.",
    level: "advanced",
    codeExample: "// Large datasets should be loaded from files/resources, not source code literals"
  },
  {
    question: "Can array initializers be used inside class field declarations (`private static final int[] DAYS = {31, 28, 31};`)?",
    shortAnswer: "YES! It is the standard idiom for initializing constant lookup tables.",
    explanation: "Static constant table pattern.",
    hint: "Yes, standard for static constant lookup tables.",
    level: "basic",
    codeExample: "private static final int[] DAYS = {31, 28, 31, 30};"
  },
  {
    question: "Is `new Object[]{ \"Barrackpore\", 5000, true }` legal?",
    shortAnswer: "YES! Because primitives are autoboxed into `Integer` and `Boolean`, which inherit from `java.lang.Object`.",
    explanation: "Autoboxing in polymorphic Object arrays.",
    hint: "Yes, primitives are autoboxed to Object wrappers.",
    level: "intermediate",
    codeExample: "Object[] mixed = new Object[]{ \"Barrackpore\", 5000, true };"
  },
  {
    question: "In the Coder & AccoTax Barrackpore exam scheduler, how is the seating matrix initialized?",
    shortAnswer: "Via nested 2D array literals `{ {101, 102}, {201, 202, 203} }` mapping hall exam seats.",
    explanation: "Practical application of multidimensional literals.",
    hint: "Uses nested 2D array literals to map hall seating.",
    level: "basic",
    codeExample: "int[][] seats = { {101, 102}, {201, 202, 203} };"
  },
  {
    question: "Can you mix `new int[]` with brace shortcut on separate lines (`int[] a; a = {1, 2};`)?",
    shortAnswer: "NO! Once declared, reassigning `a` requires `a = new int[]{1, 2};`.",
    explanation: "Reassignment rule.",
    hint: "Compile error: reassignment requires new int[]{1, 2}.",
    level: "basic",
    codeExample: "int[] a; a = new int[]{1, 2}; // Required syntax"
  },
  {
    question: "Can array literals be used in annotation parameters (`@SuppressWarnings({\"unchecked\", \"rawtypes\"})`)?",
    shortAnswer: "YES! Array literal brace syntax is standard for passing multiple values to annotation array attributes.",
    explanation: "Annotation array attribute syntax.",
    hint: "Yes, used in annotation array parameters.",
    level: "intermediate",
    codeExample: "@SuppressWarnings({\"unchecked\", \"deprecation\"})"
  },
  {
    question: "How does `List.of(10, 20, 30)` differ from `new int[]{10, 20, 30}`?",
    shortAnswer: "`List.of()` returns an immutable `List<Integer>` collection; `new int[]{}` returns a mutable primitive raw `int[]` array.",
    explanation: "Immutable collections vs raw primitive arrays.",
    hint: "List.of creates immutable collection; new int[] creates mutable raw array.",
    level: "intermediate",
    codeExample: "// List.of (immutable collection) vs new int[] (mutable array)"
  },
  {
    question: "What is the ultimate takeaway of Module 001_006 Topic 4 for Java developers?",
    shortAnswer: "The `{...}` shortcut provides clean initialization at declaration, while `new Type[]{...}` enables anonymous inline array creation anywhere in expressions with automatic length inference.",
    explanation: "Mastery of array literal expressions in Java.",
    hint: "Use {...} at declaration and new Type[]{...} for reassignments and arguments.",
    level: "basic",
    codeExample: "// Summary: int[] a = {1, 2}; vs a = new int[]{3, 4};"
  },
  {
    question: "What is the next topic (Topic 5) in Module 001_006?",
    shortAnswer: "Array indexing (0-based) and accessing elements via index.",
    explanation: "Topic 5 explores 0-based index calculation, direct memory access, mutation, and boundary mechanics.",
    hint: "Array indexing (0-based) and accessing elements via index.",
    level: "basic",
    codeExample: "// Topic 5: Array 0-Based Indexing and Element Access"
  },
  {
    question: "Can an array literal be empty inside an anonymous creation (`new int[]{}`)?",
    shortAnswer: "YES! `new int[]{}` creates an empty array object of length 0.",
    explanation: "Anonymous zero-length array.",
    hint: "Yes, creates a zero-length anonymous array.",
    level: "basic",
    codeExample: "call(new int[]{}); // Legal empty array argument"
  }
];

export default questions;
