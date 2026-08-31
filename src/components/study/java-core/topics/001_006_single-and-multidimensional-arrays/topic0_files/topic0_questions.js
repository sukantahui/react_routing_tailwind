/**
 * Module 001_006: Topic 0: What is an array and why arrays are fixed-size reference types in Java
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What is an Array in Java (JLS §10)?",
    shortAnswer: "A container object that holds a fixed number of values of a single homogeneous type (primitives or object references).",
    explanation: "Elements are stored sequentially and accessed via 0-based integer indices.",
    hint: "A fixed-size container object holding homogeneous elements.",
    level: "basic",
    codeExample: "int[] numbers = new int[5];"
  },
  {
    question: "Are arrays in Java Primitive Types or Reference Types?",
    shortAnswer: "Arrays in Java are Reference Types (First-Class Objects) that inherit directly from `java.lang.Object`.",
    explanation: "Even arrays of primitives (e.g. `int[]`) are objects created on the Java Heap.",
    hint: "Arrays are reference types and first-class objects inheriting java.lang.Object.",
    level: "basic",
    codeExample: "int[] arr = new int[3];\nSystem.out.println(arr instanceof Object); // true"
  },
  {
    question: "Why are arrays in Java 'Fixed-Size'?",
    shortAnswer: "Because the JVM allocates a contiguous block of memory in the Heap at creation time; keeping size fixed enables $O(1)$ constant-time index math without memory relocation overhead.",
    explanation: "Resizing requires allocating a brand new array and copying elements.",
    hint: "Fixed size enables contiguous heap allocation and O(1) random access.",
    level: "basic",
    codeExample: "// arr.length cannot be changed after instantiation"
  },
  {
    question: "What does 'Homogeneous' mean regarding array elements?",
    shortAnswer: "All elements stored within a specific array must be of the EXACT same declared data type (or assignable subtypes).",
    explanation: "An `int[]` can only store integer primitives; a `String[]` can only store String references.",
    hint: "All elements must be of the identical data type.",
    level: "basic",
    codeExample: "int[] data = {1, 2, 3}; // All elements must be int"
  },
  {
    question: "In the Coder & AccoTax Barrackpore batch fee demo, how is the array initialized?",
    shortAnswer: "With a fixed capacity of 4 student slots (`new double[4]`), recording tuition fees (₹12,000 to ₹18,000) in Indian Rupees (₹).",
    explanation: "Demonstrates practical fixed-capacity allocation.",
    hint: "Fixed 4-student capacity array holding tuition fees in ₹.",
    level: "basic",
    codeExample: "double[] fees = new double[4];"
  },
  {
    question: "What interfaces are automatically implemented by all Java arrays?",
    shortAnswer: "`java.lang.Cloneable` and `java.io.Serializable`.",
    explanation: "Specified in JLS §10.7.",
    hint: "Cloneable and Serializable.",
    level: "intermediate",
    codeExample: "int[] a = {1, 2}; int[] b = a.clone();"
  },
  {
    question: "What is the internal JVM class signature name for a 1D `double[]` array?",
    shortAnswer: "`[D` (where `[` indicates a 1D array dimension and `D` represents primitive `double`).",
    explanation: "JVM internal type descriptor notation.",
    hint: "[D.",
    level: "advanced",
    codeExample: "System.out.println(double[].class.getName()); // \"[D\""
  },
  {
    question: "What is the internal JVM class signature name for a 1D `int[]` array?",
    shortAnswer: "`[I`.",
    explanation: "JVM type signature for integer array.",
    hint: "[I.",
    level: "advanced",
    codeExample: "System.out.println(int[].class.getName()); // \"[I\""
  },
  {
    question: "What is the internal JVM class signature name for a 1D `String[]` array?",
    shortAnswer: "`[Ljava.lang.String;`.",
    explanation: "Reference object array descriptor notation.",
    hint: "[Ljava.lang.String;.",
    level: "advanced",
    codeExample: "System.out.println(String[].class.getName()); // \"[Ljava.lang.String;\""
  },
  {
    question: "How does the CPU calculate the memory address of `arr[i]` in $O(1)$ constant time?",
    shortAnswer: "$\\text{Memory Address} = \\text{Base Address} + (i \\times \\text{Element Size in Bytes})$.",
    explanation: "Direct arithmetic memory offset calculation.",
    hint: "Base Address + (i * elementSize).",
    level: "intermediate",
    codeExample: "// Address = Base + i * 4 (for 4-byte ints)"
  },
  {
    question: "Can an array's `length` field be modified after creation (`arr.length = 10;`)?",
    shortAnswer: "No! `length` is a `public final int` field on the array object; attempting to modify it causes a compile error (`cannot assign a value to final variable length`).",
    explanation: "Array size is strictly immutable.",
    hint: "Compile error: length is final.",
    level: "basic",
    codeExample: "// arr.length = 10; // COMPILER ERROR: final variable!"
  },
  {
    question: "What happens if you need to add elements to an array that is already full?",
    shortAnswer: "You must allocate a NEW larger array (e.g. double the size) and copy existing elements over using `System.arraycopy()` or `Arrays.copyOf()`.",
    explanation: "The underlying mechanism used internally by `ArrayList`.",
    hint: "Allocate a new larger array and copy elements over.",
    level: "basic",
    codeExample: "int[] newArr = Arrays.copyOf(oldArr, oldArr.length * 2);"
  },
  {
    question: "How does an `ArrayList` differ from a raw primitive Java array (`int[]`)?",
    shortAnswer: "`ArrayList` is a resizable collection wrapper that stores objects on the Heap; a raw array (`int[]`) is a fixed-size, zero-overhead contiguous structure supporting primitives.",
    explanation: "Raw arrays offer maximum performance; ArrayList offers dynamic resizing.",
    hint: "Raw arrays are fixed-size and hold primitives; ArrayList is resizable and holds objects.",
    level: "basic",
    codeExample: "// int[] vs ArrayList<Integer>"
  },
  {
    question: "Where is the array reference variable stored vs the actual array object in memory?",
    shortAnswer: "The array reference variable is stored on the Stack (if a local variable); the actual array object and its elements are ALWAYS allocated on the Heap.",
    explanation: "Standard JVM memory architecture.",
    hint: "Reference on Stack; array object on Heap.",
    level: "basic",
    codeExample: "int[] ref = new int[5]; // 'ref' on Stack → object on Heap"
  },
  {
    question: "Can an array of an Object type (e.g. `Object[]`) hold mixed types?",
    shortAnswer: "Yes! Because all classes in Java inherit from `java.lang.Object`, an `Object[]` can store references to `String`, `Integer`, custom records, etc.",
    explanation: "Polymorphic assignment compatibility in Java.",
    hint: "Yes, Object[] can hold any object type through polymorphism.",
    level: "intermediate",
    codeExample: "Object[] mixed = {\"Barrackpore\", 5000, 98.5};"
  },
  {
    question: "What is Array Covariance in Java (`Number[] nums = new Integer[5];`)?",
    shortAnswer: "If type `S` is a subtype of type `T`, then array type `S[]` is treated as a subtype of `T[]`.",
    explanation: "A historical Java design feature (can cause `ArrayStoreException` at runtime).",
    hint: "If S is a subtype of T, S[] is a subtype of T[].",
    level: "advanced",
    codeExample: "Number[] nums = new Integer[5]; // Covariance in Java"
  },
  {
    question: "What runtime exception occurs if you put a `Double` into a `Number[]` array backed by `Integer[]`?",
    shortAnswer: "`java.lang.ArrayStoreException` because the JVM verifies actual runtime heap type compatibility during assignment.",
    explanation: "Runtime type safety check against covariance errors.",
    hint: "Throws ArrayStoreException.",
    level: "advanced",
    codeExample: "Number[] nums = new Integer[5];\n// nums[0] = 3.14; // THROWS ArrayStoreException!"
  },
  {
    question: "Can an array have a size of ZERO (`new int[0]`)?",
    shortAnswer: "Yes! An empty array (`new int[0]`) is a valid object in Java with `length == 0`.",
    explanation: "Frequently returned from methods instead of `null` to prevent NPEs.",
    hint: "Yes, empty arrays with length 0 are valid objects.",
    level: "basic",
    codeExample: "int[] empty = new int[0]; // Legal and useful!"
  },
  {
    question: "What happens if you specify a negative size when creating an array (`new int[-5]`)?",
    shortAnswer: "Throws `java.lang.NegativeArraySizeException` at runtime.",
    explanation: "Array dimensions must be non-negative.",
    hint: "Throws NegativeArraySizeException.",
    level: "basic",
    codeExample: "// int[] arr = new int[-5]; // THROWS NegativeArraySizeException!"
  },
  {
    question: "What is the maximum allowable size of an array in the Java Virtual Machine?",
    shortAnswer: "Approximately `Integer.MAX_VALUE - 8` (around 2,147,483,639 elements), constrained by 32-bit indexing and JVM object header memory overhead.",
    explanation: "Attempting larger allocations throws `OutOfMemoryError`.",
    hint: "Integer.MAX_VALUE - 8 (approx 2.14 billion elements).",
    level: "advanced",
    codeExample: "// Integer.MAX_VALUE - 8 is max array capacity"
  },
  {
    question: "Why can't an array be indexed with a `long` in Java (`arr[0L]`)?",
    shortAnswer: "Java language grammar restricts array indices strictly to 32-bit `int` values (JLS §10.4); using a `long` causes a compile error: `incompatible types: possible lossy conversion from long to int`.",
    explanation: "JVM bytecode array instructions (`iaload`, `daload`) use 32-bit integer offsets.",
    hint: "Compile error: array indexing requires int, not long.",
    level: "intermediate",
    codeExample: "long idx = 2L;\n// int x = arr[idx]; // COMPILER ERROR!"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, why are empty arrays preferred over `null` as method return values?",
    shortAnswer: "Because returning an empty array (`new Student[0]`) allows callers to iterate with `for-each` immediately without writing defensive `if (arr != null)` checks.",
    explanation: "Adheres to Effective Java Item 54: Return empty arrays or collections, not nulls.",
    hint: "Eliminates NullPointerExceptions in client code.",
    level: "intermediate",
    codeExample: "public Student[] getEnrolled() { return new Student[0]; }"
  },
  {
    question: "What is the memory overhead of a Java array object header in HotSpot 64-bit JVM with Compressed OOPs?",
    shortAnswer: "16 bytes total: 8-byte Mark Word + 4-byte Klass Word + 4-byte Array Length field.",
    explanation: "Array headers have 4 additional bytes for the length field compared to standard objects.",
    hint: "16 bytes (Mark Word + Klass Word + 4-byte length).",
    level: "expert",
    codeExample: "// 16-byte object header for arrays on 64-bit JVM"
  },
  {
    question: "What is the difference between Array Length property (`arr.length`) and String Length method (`str.length()`)?",
    shortAnswer: "`arr.length` is a `final` field property (no parentheses); `str.length()` is a method call (with parentheses).",
    explanation: "Classic beginner syntax confusion.",
    hint: "Array is a field (arr.length); String is a method (str.length()).",
    level: "basic",
    codeExample: "int a = arr.length; int s = str.length();"
  },
  {
    question: "Can an array reference be reassigned to point to a different array?",
    shortAnswer: "Yes! The reference variable can point to any compatible array object in Heap memory unless declared `final`.",
    explanation: "Reference variable assignment vs array content mutation.",
    hint: "Yes, reference variables can be reassigned to other arrays.",
    level: "basic",
    codeExample: "int[] a = {1, 2}; a = new int[]{3, 4, 5}; // Reassigned"
  },
  {
    question: "What happens if an array is declared `final` (`final int[] arr = {1, 2, 3};`)?",
    shortAnswer: "The reference variable `arr` cannot be reassigned to a new array, but the elements inside the array CAN still be mutated (`arr[0] = 99;` is legal!).",
    explanation: "Shallow immutability of final reference variables.",
    hint: "Reference is constant, but array elements can still be mutated.",
    level: "intermediate",
    codeExample: "final int[] arr = {1, 2}; arr[0] = 99; // LEGAL!"
  },
  {
    question: "How does the Garbage Collector handle array objects when no references point to them?",
    shortAnswer: "The array object on the Heap becomes unreachable and is reclaimed during the next Garbage Collection cycle.",
    explanation: "Standard JVM automatic memory management.",
    hint: "Reclaimed automatically by the Garbage Collector.",
    level: "basic",
    codeExample: "arr = null; // Original array is eligible for GC"
  },
  {
    question: "What is the Cache Locality advantage of 1D primitive arrays?",
    shortAnswer: "Elements are stored consecutively in contiguous memory addresses, allowing the CPU to load entire cache lines (64 bytes) into L1 cache for ultra-fast traversal.",
    explanation: "Hardware spatial locality.",
    hint: "Contiguous memory layout maximizes CPU L1/L2 cache line hits.",
    level: "advanced",
    codeExample: "// Contiguous memory layout = maximum cache locality"
  },
  {
    question: "What is the ultimate takeaway of Module 001_006 Topic 0 for Java developers?",
    shortAnswer: "Arrays in Java are fixed-size, homogeneous first-class reference objects allocated in Heap memory, providing $O(1)$ constant-time index math and peak memory locality.",
    explanation: "The foundational linear data structure in the Java language.",
    hint: "Fixed-size homogeneous first-class objects with O(1) random access in Heap.",
    level: "basic",
    codeExample: "// Summary: Fixed size, homogeneous, first-class Heap object"
  },
  {
    question: "What is the next topic (Topic 1) in Module 001_006?",
    shortAnswer: "Array memory allocation: reference on Stack, elements allocated dynamically on Heap.",
    explanation: "Topic 1 explores Stack vs Heap memory layout, default element initialization, and JVM pointer references.",
    hint: "Array memory allocation: reference on Stack, elements on Heap.",
    level: "basic",
    codeExample: "// Topic 1: Array Stack and Heap Memory Layout"
  }
];

export default questions;
