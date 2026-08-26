/**
 * Module 001_006: Topic 3: Array instantiation using 'new' keyword and default values of array elements
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What does the `new` keyword do when creating an array (`new int[5]`)?",
    shortAnswer: "It allocates a contiguous block of Heap memory for the array object, initializes the 16-byte object header with `length = 5`, and zeroes out all 5 elements to default values.",
    explanation: "Standard JVM dynamic object allocation.",
    hint: "Allocates contiguous heap memory, writes object header, and zero-fills elements.",
    level: "basic",
    codeExample: "int[] arr = new int[5]; // Instantiates 5-slot heap object"
  },
  {
    question: "Can the array dimension size in `new int[N]` be a dynamic runtime variable?",
    shortAnswer: "Yes! Unlike C++ static arrays where size must be a compile-time constant, Java dynamically calculates and allocates the array size at runtime.",
    explanation: "Dynamic runtime evaluation in Java.",
    hint: "Yes, Java evaluates array size expressions dynamically at runtime.",
    level: "basic",
    codeExample: "int n = scanner.nextInt(); int[] data = new int[n];"
  },
  {
    question: "What is the default value of numeric primitive elements (`byte`, `short`, `int`, `long`) in newly instantiated arrays?",
    shortAnswer: "`0` (or `0L` for `long`).",
    explanation: "JVM guarantees zeroing for all numeric types.",
    hint: "0.",
    level: "basic",
    codeExample: "long[] longs = new long[3]; // longs[0] is 0L"
  },
  {
    question: "What is the default value of floating-point elements (`float`, `double`) in newly instantiated arrays?",
    shortAnswer: "`0.0f` (for `float`) and `0.0` (for `double`).",
    explanation: "IEEE 754 positive zero bit pattern.",
    hint: "0.0.",
    level: "basic",
    codeExample: "double[] d = new double[2]; // d[0] is 0.0"
  },
  {
    question: "What is the default value of `boolean` elements in newly instantiated arrays?",
    shortAnswer: "`false` (stored as byte `0x00` in Heap memory).",
    explanation: "Standard boolean default value.",
    hint: "false.",
    level: "basic",
    codeExample: "boolean[] flags = new boolean[4]; // flags[0] is false"
  },
  {
    question: "What is the default value of `char` elements in newly instantiated arrays?",
    shortAnswer: "The NUL character `'\\u0000'` (decimal value `0`).",
    explanation: "Unicode 16-bit zero character.",
    hint: "'\\u0000' (NUL character).",
    level: "basic",
    codeExample: "char[] ch = new char[2]; // ch[0] == '\\u0000'"
  },
  {
    question: "What is the default value of reference type elements (`String[]`, `Object[]`, `Customer[]`) in newly instantiated arrays?",
    shortAnswer: "`null` (indicating empty object reference pointers).",
    explanation: "Object references default to null.",
    hint: "null.",
    level: "basic",
    codeExample: "String[] names = new String[3]; // names[0] is null"
  },
  {
    question: "In the Coder & AccoTax Barrackpore scholarship ledger, why is dynamic sizing (`new double[studentCount]`) essential?",
    shortAnswer: "Because student enrollments vary per semester; allocating dynamically in Indian Rupees (₹) allows exact capacity matching without hardcoding sizes.",
    explanation: "Demonstrates practical dynamic allocation.",
    hint: "Dynamically sizes capacity to match semester enrollment in ₹.",
    level: "basic",
    codeExample: "double[] ledger = new double[studentCount];"
  },
  {
    question: "Is `new int[0]` a valid expression in Java?",
    shortAnswer: "Yes! It creates a valid, non-null array object on the Heap with `length == 0` and zero element slots.",
    explanation: "Zero-length array object.",
    hint: "Yes, creates a non-null object with length 0.",
    level: "basic",
    codeExample: "int[] empty = new int[0];\nSystem.out.println(empty.length); // 0"
  },
  {
    question: "What happens if you instantiate an array with a negative size (`new int[-10]`)?",
    shortAnswer: "Throws `java.lang.NegativeArraySizeException` at runtime.",
    explanation: "JLS §10.3 enforces non-negative dimension values.",
    hint: "Throws NegativeArraySizeException at runtime.",
    level: "basic",
    codeExample: "// int[] arr = new int[-10]; // THROWS NegativeArraySizeException"
  },
  {
    question: "What is the difference between Array Declaration and Array Instantiation?",
    shortAnswer: "Declaration creates only the reference variable on the Stack (`int[] arr;`); Instantiation physically allocates the object and slots on the Heap (`new int[5]`).",
    explanation: "Stack variable creation vs Heap object allocation.",
    hint: "Declaration creates stack variable; instantiation creates heap object.",
    level: "basic",
    codeExample: "int[] arr; // Declaration | arr = new int[5]; // Instantiation"
  },
  {
    question: "Can an array dimension expression be a method call (`new int[calculateBatchSize()]`)?",
    shortAnswer: "Yes! Any valid Java expression that evaluates to an `int` (or promotable to `int` like `byte`, `short`, `char`) is legal.",
    explanation: "Expression evaluation in array creation.",
    hint: "Yes, any expression evaluating to an int is valid.",
    level: "basic",
    codeExample: "int[] arr = new int[calculateSize()];"
  },
  {
    question: "Can a `long` value be passed as the array dimension (`long n = 5L; new int[n];`)?",
    shortAnswer: "NO! Array dimension expressions must be `int` values; passing a `long` causes a compile error: `incompatible types: possible lossy conversion from long to int`.",
    explanation: "JVM array indexing is strictly 32-bit.",
    hint: "Compile error: array dimensions must be int, not long.",
    level: "intermediate",
    codeExample: "long n = 5L;\n// int[] arr = new int[n]; // COMPILER ERROR!"
  },
  {
    question: "How does the JVM physically execute array instantiation at the bytecode level?",
    shortAnswer: "For primitive arrays, it issues the `newarray` bytecode instruction; for reference object arrays, it issues the `anewarray` or `multianewarray` instruction.",
    explanation: "JVM bytecode specification.",
    hint: "newarray for primitives; anewarray for reference types.",
    level: "advanced",
    codeExample: "// Bytecode: newarray int (for int[]) | anewarray java/lang/String (for String[])"
  },
  {
    question: "What is the initial value of `arr[0].length()` when `String[] arr = new String[5];` is executed?",
    shortAnswer: "Throws `NullPointerException` because `arr[0]` is initialized to `null` by default!",
    explanation: "Dereferencing default null elements in object arrays.",
    hint: "Throws NullPointerException because arr[0] is null.",
    level: "basic",
    codeExample: "String[] arr = new String[5];\n// int len = arr[0].length(); // THROWS NullPointerException!"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what step is required before calling methods on `StudentRecord[] roster`?",
    shortAnswer: "Instantiating each individual student record slot (`roster[i] = new StudentRecord(...);`) to replace the default `null` pointers.",
    explanation: "Mandatory object array population.",
    hint: "Must instantiate individual object elements before invoking methods.",
    level: "basic",
    codeExample: "for (int i=0; i<roster.length; i++) roster[i] = new StudentRecord(...);"
  },
  {
    question: "Can an array be instantiated anonymously as a method argument (`process(new int[5])`)?",
    shortAnswer: "Yes! Instantiating without assigning to a local variable creates an anonymous array passed directly to the method.",
    explanation: "Anonymous array instantiation.",
    hint: "Yes, anonymous arrays can be passed directly to methods.",
    level: "basic",
    codeExample: "process(new int[5]); // Anonymous array instantiation"
  },
  {
    question: "How does the `Arrays.fill()` method help after default instantiation?",
    shortAnswer: "It allows replacing the default zeroes/nulls with a custom initial value (e.g. `Arrays.fill(marks, -1);` or `Arrays.fill(fees, 5000.0);`).",
    explanation: "Convenience utility for custom initializations.",
    hint: "Arrays.fill() sets all elements to a custom specified value.",
    level: "basic",
    codeExample: "int[] marks = new int[10];\nArrays.fill(marks, -1); // Fills with -1"
  },
  {
    question: "What is the time complexity of instantiating `new int[N]`?",
    shortAnswer: "$O(N)$ linear time because the JVM must zero-out all $N$ memory slots in the Heap upon allocation.",
    explanation: "Bulk memory clearing cost.",
    hint: "O(N) time due to memory zeroing.",
    level: "intermediate",
    codeExample: "// O(N) time complexity to zero-fill N elements"
  },
  {
    question: "What is the memory size of `new boolean[100]` in HotSpot JVM?",
    shortAnswer: "In HotSpot JVM, each `boolean` element in a `boolean[]` is stored as an 8-bit (1-byte) value, so 100 booleans consume 100 bytes of payload + 16-byte header + padding = 120 bytes.",
    explanation: "HotSpot boolean array implementation.",
    hint: "100 bytes payload (1 byte per boolean) + 16B header + padding.",
    level: "advanced",
    codeExample: "// boolean[] uses 1 byte per element"
  },
  {
    question: "Can you change the size of an array after it has been instantiated with `new`?",
    shortAnswer: "No! Array size is fixed permanently upon instantiation; the `length` field is `public final int` and cannot be modified.",
    explanation: "Fixed-size immutability.",
    hint: "No, size is permanently fixed upon instantiation.",
    level: "basic",
    codeExample: "// Immutable size once instantiated"
  },
  {
    question: "What exception is thrown if `studentCount` evaluates to a negative number at runtime (`int count = -5; new double[count];`)?",
    shortAnswer: "`java.lang.NegativeArraySizeException`.",
    explanation: "Prevents allocating invalid negative memory dimensions.",
    hint: "NegativeArraySizeException.",
    level: "basic",
    codeExample: "// Throws NegativeArraySizeException"
  },
  {
    question: "How does `java.util.BitSet` compare to `new boolean[N]` for very large flag arrays?",
    shortAnswer: "`BitSet` uses 1 bit per boolean flag (8x more memory-efficient than `boolean[]` which uses 1 byte per flag), ideal for millions of boolean flags.",
    explanation: "Memory optimization for massive boolean sequences.",
    hint: "BitSet uses 1 bit per flag; boolean[] uses 1 byte per flag.",
    level: "advanced",
    codeExample: "BitSet flags = new BitSet(1_000_000); // 8x more memory efficient"
  },
  {
    question: "In the Coder & AccoTax Barrackpore tax calculator, what is the advantage of default zero-initialization for invoices?",
    shortAnswer: "It prevents random garbage values from polluting tax calculations, ensuring unassigned invoice balances start cleanly at ₹0.00.",
    explanation: "Financial computation safety.",
    hint: "Ensures unassigned balances start at clean ₹0.00 without garbage data.",
    level: "basic",
    codeExample: "double[] invoices = new double[50]; // All 50 start at 0.0"
  },
  {
    question: "What is the difference between `new int[5]` and `new int[]{0, 0, 0, 0, 0}`?",
    shortAnswer: "Both produce identical runtime arrays on the Heap; `new int[5]` relies on automatic JVM zero-filling, while `new int[]{...}` explicitly specifies literal initial values.",
    explanation: "Syntax comparison.",
    hint: "Functionally identical; new int[5] is more concise for zero-filled arrays.",
    level: "basic",
    codeExample: "int[] a = new int[5]; // Concise zero-fill"
  },
  {
    question: "Can an array instantiation be chained immediately with element access (`new int[]{10, 20, 30}[1]`)?",
    shortAnswer: "Yes! `new int[]{10, 20, 30}[1]` evaluates to `20` immediately.",
    explanation: "Chained array instantiation expression.",
    hint: "Yes, element indexing can follow instantiation directly.",
    level: "intermediate",
    codeExample: "int val = new int[]{10, 20, 30}[1]; // val is 20"
  },
  {
    question: "What happens if you try to instantiate an array of an abstract class or interface (`new CharSequence[5]`)?",
    shortAnswer: "It is 100% legal! It creates an array of 5 `null` reference slots capable of holding any concrete implementing class (e.g. `String`, `StringBuilder`).",
    explanation: "Arrays of interface types hold references, not instances of the interface itself.",
    hint: "Legal; creates 5 null reference slots for implementing classes.",
    level: "intermediate",
    codeExample: "CharSequence[] seqs = new CharSequence[5]; // Legal null reference slots"
  },
  {
    question: "What is the ultimate takeaway of Module 001_006 Topic 3 for Java developers?",
    shortAnswer: "The `new Type[size]` operator dynamically allocates contiguous Heap memory with an object header and guarantees type-safe zero-initialization across all primitive and reference types.",
    explanation: "Mastery of dynamic array instantiation mechanics in Java.",
    hint: "Dynamic heap allocation with guaranteed type-safe zero-initialization.",
    level: "basic",
    codeExample: "// Summary: new Type[n] -> dynamic contiguous heap allocation + zero-initialization"
  },
  {
    question: "What is the next topic (Topic 4) in Module 001_006?",
    shortAnswer: "Array initialization literals (e.g. int[] numbers = {10, 20, 30};).",
    explanation: "Topic 4 explores array initializer shortcuts, anonymous array literals, multidimensional literals, and syntax rules.",
    hint: "Array initialization literals: int[] numbers = {10, 20, 30}.",
    level: "basic",
    codeExample: "// Topic 4: Array Initialization Literals and Shortcuts"
  },
  {
    question: "Can an array instantiation throw `OutOfMemoryError`?",
    shortAnswer: "Yes! If the requested dimension size requires more contiguous memory than is available in the JVM Heap, `OutOfMemoryError: Java heap space` is thrown.",
    explanation: "Heap memory exhaustion.",
    hint: "Yes, throws OutOfMemoryError if heap memory is exhausted.",
    level: "basic",
    codeExample: "// Throws OutOfMemoryError if heap cannot accommodate size"
  }
];

export default questions;
