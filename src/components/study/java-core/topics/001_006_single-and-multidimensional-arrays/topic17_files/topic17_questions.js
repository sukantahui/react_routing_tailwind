/**
 * Module 001_006: Topic 17: Cloning and copying arrays: System.arraycopy(), clone(), and Arrays.copyOf()
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What is `System.arraycopy()` in Java?",
    shortAnswer: "A low-level, high-performance `native` static method implemented in C++ in the JVM that performs direct raw block memory transfers between arrays with hardware acceleration.",
    explanation: "Native JVM intrinsic array copying (JLS §10.2).",
    hint: "Native C++ JVM intrinsic method performing direct raw memory block transfers.",
    level: "basic",
    codeExample: "System.arraycopy(src, srcPos, dest, destPos, length);"
  },
  {
    question: "What are the 5 arguments of `System.arraycopy()`?",
    shortAnswer: "1. `Object src` (Source array), 2. `int srcPos` (Source start index), 3. `Object dest` (Destination array), 4. `int destPos` (Destination start index), 5. `int length` (Number of elements to copy).",
    explanation: "Standard 5-parameter method signature.",
    hint: "(src, srcPos, dest, destPos, length).",
    level: "basic",
    codeExample: "System.arraycopy(src, 0, dest, 0, len);"
  },
  {
    question: "Can `System.arraycopy()` copy elements within the SAME array when ranges overlap (self-copy)?",
    shortAnswer: "YES! `System.arraycopy()` behaves as if the source elements are first copied into a temporary buffer, making it completely safe for left-shifting or right-shifting within the same array without data clobbering.",
    explanation: "Self-overlapping copy safety guarantee (C `memmove` equivalent).",
    hint: "Yes, safe for self-overlapping shifts without data corruption.",
    level: "intermediate",
    codeExample: "System.arraycopy(arr, 1, arr, 0, 4); // Left shift by 1"
  },
  {
    question: "How does `arr.clone()` work on primitive arrays in Java?",
    shortAnswer: "It allocates a new 1D array object on the Heap with identical length and copies all primitive values into the new array; modifying the clone does NOT affect the original.",
    explanation: "Covariant primitive cloning.",
    hint: "Allocates a new array on the Heap and copies primitive values directly.",
    level: "basic",
    codeExample: "double[] copy = original.clone();"
  },
  {
    question: "Why don't you need to typecast `arr.clone()` on arrays in modern Java?",
    shortAnswer: "Because array types in Java have a built-in Covariant Return Type: `int[].clone()` returns `int[]` directly (not `Object`), so no explicit `(int[])` cast is required.",
    explanation: "Covariant return type enhancement in Java 5+.",
    hint: "Array cloning features a covariant return type matching the exact array type.",
    level: "intermediate",
    codeExample: "double[] c = fees.clone(); // No (double[]) cast needed!"
  },
  {
    question: "What does `Arrays.copyOf(arr, newLength)` do if `newLength` is GREATER than `arr.length`?",
    shortAnswer: "It allocates a new array of size `newLength`, copies all elements from `arr`, and pads the remaining trailing slots with default values (`0`, `0.0`, `false`, or `null`).",
    explanation: "Array expansion with zero-padding.",
    hint: "Expands the array and pads new slots with default values.",
    level: "basic",
    codeExample: "int[] expanded = Arrays.copyOf(arr, 10); // Trailing slots are 0"
  },
  {
    question: "What does `Arrays.copyOf(arr, newLength)` do if `newLength` is LESS than `arr.length`?",
    shortAnswer: "It allocates a new array of size `newLength` and copies only the first `newLength` elements, truncating the rest.",
    explanation: "Array truncation.",
    hint: "Truncates the array to the first newLength elements.",
    level: "basic",
    codeExample: "int[] truncated = Arrays.copyOf(arr, 3); // Copies first 3 elements"
  },
  {
    question: "How does `Arrays.copyOfRange(arr, from, to)` define its range boundaries?",
    shortAnswer: "Half-open interval: `from` is INCLUSIVE, while `to` is EXCLUSIVE ($[\\text{from}, \\text{to})$).",
    explanation: "Standard Java half-open slice convention.",
    hint: "from is inclusive; to is exclusive [from, to).",
    level: "basic",
    codeExample: "double[] slice = Arrays.copyOfRange(arr, 1, 4); // Extracts indices 1, 2, 3"
  },
  {
    question: "In the Coder & AccoTax Barrackpore fee archive, how was a 3-element slice extracted from `originalFees`?",
    shortAnswer: "`Arrays.copyOfRange(originalFees, 1, 4)` extracted student seat indices 1, 2, and 3 in Indian Rupees (₹).",
    explanation: "Practical application of subarray slicing.",
    hint: "Extracted indices 1 to 3 using copyOfRange(arr, 1, 4).",
    level: "basic",
    codeExample: "double[] sliced = Arrays.copyOfRange(originalFees, 1, 4);"
  },
  {
    question: "What does `Arrays.copyOf()` call internally under the hood?",
    shortAnswer: "It instantiates a new array via reflection/new and immediately calls `System.arraycopy()` to transfer the data.",
    explanation: "JDK internal delegation architecture.",
    hint: "Allocates the new array and calls System.arraycopy() internally.",
    level: "intermediate",
    codeExample: "// Arrays.copyOf() is a convenient wrapper around System.arraycopy()"
  },
  {
    question: "What exception is thrown if `srcPos + length > src.length` in `System.arraycopy()`?",
    shortAnswer: "`java.lang.ArrayIndexOutOfBoundsException`.",
    explanation: "Boundary check violation.",
    hint: "ArrayIndexOutOfBoundsException.",
    level: "basic",
    codeExample: "// Exceeding source or destination bounds throws ArrayIndexOutOfBoundsException"
  },
  {
    question: "What exception is thrown if either `src` or `dest` is `null` in `System.arraycopy()`?",
    shortAnswer: "`java.lang.NullPointerException`.",
    explanation: "Null pointer argument trap.",
    hint: "NullPointerException.",
    level: "basic",
    codeExample: "// Passing null array throws NullPointerException"
  },
  {
    question: "What exception is thrown if `src` and `dest` have incompatible element types in `System.arraycopy()` (e.g. copying `String[]` into `Integer[]`)?",
    shortAnswer: "`java.lang.ArrayStoreException`.",
    explanation: "Runtime array covariance type safety violation.",
    hint: "ArrayStoreException.",
    level: "intermediate",
    codeExample: "System.arraycopy(strArr, 0, intArr, 0, 1); // THROWS ArrayStoreException!"
  },
  {
    question: "Which array copying method is the absolute fastest in the Java HotSpot JVM?",
    shortAnswer: "`System.arraycopy()`, because the JIT compiler compiles it directly into native CPU vector memory copy instructions (`memcpy`/`memmove` / AVX-512).",
    explanation: "Hardware-level intrinsic compilation.",
    hint: "System.arraycopy() compiled directly to CPU vector intrinsics.",
    level: "advanced",
    codeExample: "// JIT inlines System.arraycopy() to native CPU instructions"
  },
  {
    question: "How does a manual `for` loop copy compare to `System.arraycopy()` for large arrays?",
    shortAnswer: "`System.arraycopy()` is significantly faster because it transfers whole 64-byte cache lines or SIMD blocks at once without per-element bounds checking in bytecode.",
    explanation: "Bulk memory transfer vs scalar loop.",
    hint: "System.arraycopy() is much faster due to bulk SIMD memory transfer.",
    level: "intermediate",
    codeExample: "// Prefer System.arraycopy() over manual for loop copies"
  },
  {
    question: "Does `arr.clone()` perform a Shallow Copy or a Deep Copy on an object array (`Student[]`)?",
    shortAnswer: "SHALLOW COPY! It creates a new `Student[]` array, but each element in the copy references the exact same `Student` objects on the Heap.",
    explanation: "Shallow copy reference sharing.",
    hint: "Shallow copy: clones the array container, but shares the underlying objects.",
    level: "intermediate",
    codeExample: "Student[] c = orig.clone(); // Modifying c[0].setName() modifies orig[0]!"
  },
  {
    question: "Does `arr.clone()` perform a Shallow Copy or a Deep Copy on a 2D matrix (`int[][]`)?",
    shortAnswer: "SHALLOW COPY! It clones only the outer array of row pointers; both 2D arrays point to the exact same inner 1D row objects.",
    explanation: "Multidimensional shallow copy trap.",
    hint: "Shallow copy: shares the inner 1D row array objects.",
    level: "intermediate",
    codeExample: "int[][] c = orig.clone(); c[0][0] = 99; // orig[0][0] is now 99!"
  },
  {
    question: "How does `ArrayList` dynamically expand its internal array when capacity is exceeded?",
    shortAnswer: "It calls `Arrays.copyOf(elementData, newCapacity)` (which invokes `System.arraycopy()`) to grow capacity by 50% ($1.5\\times$).",
    explanation: "Dynamic array resizing in JDK Collections.",
    hint: "Uses Arrays.copyOf() to expand the internal backing array by 1.5x.",
    level: "advanced",
    codeExample: "elementData = Arrays.copyOf(elementData, newCapacity);"
  },
  {
    question: "What happens if `from > to` in `Arrays.copyOfRange(arr, from, to)`?",
    shortAnswer: "`java.lang.IllegalArgumentException: fromIndex(X) > toIndex(Y)`.",
    explanation: "Argument range validation.",
    hint: "IllegalArgumentException.",
    level: "basic",
    codeExample: "Arrays.copyOfRange(arr, 4, 2); // THROWS IllegalArgumentException"
  },
  {
    question: "Can `Arrays.copyOfRange()` accept a `to` index that is GREATER than `arr.length`?",
    shortAnswer: "YES! The resulting array is padded with default values (`0`, `null`, etc.) up to the requested length.",
    explanation: "Slicing with automatic expansion.",
    hint: "Yes, expands and pads remaining slots with default values.",
    level: "intermediate",
    codeExample: "int[] slice = Arrays.copyOfRange(new int[]{1, 2}, 0, 5); // length 5, padded"
  },
  {
    question: "In the Coder & AccoTax Barrackpore banking engine, why are transaction logs cloned before auditing?",
    shortAnswer: "To prevent audit routines from mutating or locking active live transaction records in Indian Rupees (₹).",
    explanation: "Defensive copying in enterprise software.",
    hint: "Creates an isolated snapshot to prevent live transaction data corruption.",
    level: "basic",
    codeExample: "Transaction[] snapshot = liveLogs.clone();"
  },
  {
    question: "Can you copy a primitive `int[]` array into a `double[]` array using `System.arraycopy()`?",
    shortAnswer: "NO! `System.arraycopy()` requires exact matching primitive types; attempting to copy `int[]` into `double[]` throws `ArrayStoreException`.",
    explanation: "Primitive type strictness in native array copying.",
    hint: "No, primitive types must match exactly (cannot copy int[] to double[]).",
    level: "intermediate",
    codeExample: "// System.arraycopy(intArr, 0, doubleArr, 0, n); // FAILS!"
  },
  {
    question: "How do you copy elements from an `int[]` array to a `double[]` array correctly?",
    shortAnswer: "Using an explicit conversion loop: `for (int i = 0; i < src.length; i++) dest[i] = src[i];` (or via Streams `Arrays.stream(intArr).asDoubleStream().toArray()`).",
    explanation: "Widening primitive conversion loop.",
    hint: "Use an explicit loop or stream conversion.",
    level: "basic",
    codeExample: "for (int i=0; i<src.length; i++) dest[i] = src[i];"
  },
  {
    question: "Does `System.arraycopy()` allocate any new memory on the Heap?",
    shortAnswer: "NO! `System.arraycopy()` only copies data into a pre-existing destination array object supplied by the caller.",
    explanation: "Zero-allocation copying method.",
    hint: "No, copies directly into a pre-existing destination array.",
    level: "intermediate",
    codeExample: "// Requires pre-allocated destination: double[] dest = new double[n];"
  },
  {
    question: "Does `Arrays.copyOf()` allocate new memory on the Heap?",
    shortAnswer: "YES! `Arrays.copyOf()` always instantiates and returns a brand-new array object.",
    explanation: "Factory allocation copying method.",
    hint: "Yes, allocates and returns a new array object.",
    level: "basic",
    codeExample: "double[] newArr = Arrays.copyOf(orig, len); // Allocates new array"
  },
  {
    question: "What is the Time Complexity of `System.arraycopy()`, `arr.clone()`, and `Arrays.copyOf()`?",
    shortAnswer: "$O(N)$ linear time proportional to the number of elements copied.",
    explanation: "Linear memory transfer complexity.",
    hint: "O(N) linear time.",
    level: "basic",
    codeExample: "// All 3 copying utilities run in O(N) linear time"
  },
  {
    question: "What is the Space Complexity of `arr.clone()` and `Arrays.copyOf()`?",
    shortAnswer: "$O(N)$ auxiliary space (allocates a new array of size $N$ on the Heap).",
    explanation: "Memory allocation space complexity.",
    hint: "O(N) auxiliary space.",
    level: "basic",
    codeExample: "// O(N) memory allocation"
  },
  {
    question: "What is the ultimate takeaway of Module 001_006 Topic 17 for Java developers?",
    shortAnswer: "`System.arraycopy()` is the fastest native zero-allocation memory transfer tool; `arr.clone()` provides simple 1D cloning with covariant return types; `Arrays.copyOf()` and `Arrays.copyOfRange()` offer convenient resizing and slicing utilities.",
    explanation: "Mastery of array copying and cloning in Java.",
    hint: "System.arraycopy (native speed), clone (1D copy), Arrays.copyOf (resizing/slicing).",
    level: "basic",
    codeExample: "// Summary: System.arraycopy | arr.clone() | Arrays.copyOf()"
  },
  {
    question: "What is the next topic (Topic 18) in Module 001_006?",
    shortAnswer: "Deep copy vs Shallow copy of arrays.",
    explanation: "Topic 18 explores reference sharing traps in object and 2D arrays, and writing recursive deep copy algorithms.",
    hint: "Deep copy vs Shallow copy of arrays.",
    level: "basic",
    codeExample: "// Topic 18: Deep Copy vs Shallow Copy of Arrays"
  },
  {
    question: "Can `System.arraycopy()` be used on multi-dimensional array row references?",
    shortAnswer: "YES! `System.arraycopy(matrixA, 0, matrixB, 0, matrixA.length)` copies the 1D row references (shallow copy of rows).",
    explanation: "Row reference copying.",
    hint: "Yes, copies the outer array reference pointers.",
    level: "intermediate",
    codeExample: "System.arraycopy(matrixA, 0, matrixB, 0, matrixA.length);"
  }
];

export default questions;
