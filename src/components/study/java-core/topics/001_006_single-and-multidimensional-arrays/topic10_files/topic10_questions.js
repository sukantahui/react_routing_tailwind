/**
 * Module 001_006: Topic 10: Passing arrays to methods and returning arrays from methods
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "Is Java 'Pass-by-Value' or 'Pass-by-Reference' when passing arrays to methods?",
    shortAnswer: "Java is STRICTLY Pass-by-Value: when an array is passed, the *reference address* value is copied onto the method's stack frame, enabling the method to mutate the underlying Heap array elements.",
    explanation: "Core Java parameter passing semantics (JLS §8.4.1).",
    hint: "Strictly pass-by-value; the reference memory address is copied by value.",
    level: "basic",
    codeExample: "void update(int[] a) { a[0] = 99; } // Mutates original array in heap!"
  },
  {
    question: "Can a method modify elements in the caller's array (`void modify(int[] arr)`)?",
    shortAnswer: "YES! Because the copied reference parameter points to the exact same array object on the Heap, any element mutation (`arr[0] = 50`) directly alters the caller's data.",
    explanation: "Shared Heap object mutation.",
    hint: "Yes, changes to array elements persist and reflect in the caller's array.",
    level: "basic",
    codeExample: "public static void zeroFirst(int[] arr) { arr[0] = 0; }"
  },
  {
    question: "What happens if a method reassigns its array parameter (`void reset(int[] arr) { arr = new int[10]; }`)?",
    shortAnswer: "It mutates ONLY the local parameter copy on that method's stack frame; the caller's original array variable remains completely unchanged.",
    explanation: "Parameter reference reassignment isolation.",
    hint: "Reassigning the parameter has zero effect on the caller's variable.",
    level: "basic",
    codeExample: "void reset(int[] a) { a = new int[5]; } // Caller is unaffected!"
  },
  {
    question: "How do you return an array from a method in Java?",
    shortAnswer: "Specify the array type as the method return type (e.g. `public static int[] getScores()`) and return an array reference (e.g. `return new int[]{100, 95};`).",
    explanation: "Standard method return type syntax.",
    hint: "Specify type[] as return type and return an array reference.",
    level: "basic",
    codeExample: "public static double[] getBonuses() { return new double[]{2500.0, 3000.0}; }"
  },
  {
    question: "Why should methods return an EMPTY array (`new int[0]`) instead of `null` (Effective Java Item 54)?",
    shortAnswer: "Returning an empty array allows clients to iterate directly with `for-each` or check `.length` without writing repetitive, error-prone `if (arr != null)` defensive checks.",
    explanation: "Clean Code and defensive API design standard.",
    hint: "Prevents NullPointerExceptions and eliminates boilerplate null-checks in client code.",
    level: "basic",
    codeExample: "public int[] getResults() { if (empty) return new int[0]; ... }"
  },
  {
    question: "In the Coder & AccoTax Barrackpore fee discount demo, what happened when `applyInstitutionalDiscount(batchFees, 1500.0)` was executed?",
    shortAnswer: "All fees in the caller's `batchFees` array were reduced by ₹1,500 in Indian Rupees (₹) because the method modified the shared Heap array elements.",
    explanation: "Demonstrates in-place parameter array mutation.",
    hint: "Caller's batch fee balances were reduced in-place by ₹1,500.",
    level: "basic",
    codeExample: "applyInstitutionalDiscount(batchFees, 1500.0);"
  },
  {
    question: "What is 'Defensive Copying' when returning private array fields from a class getter?",
    shortAnswer: "Returning a clone of the private array (`return privateArr.clone();` or `Arrays.copyOf()`) to prevent external callers from mutating the class's internal private state.",
    explanation: "Encapsulation protection pattern.",
    hint: "Returning a clone of the internal array to preserve encapsulation.",
    level: "intermediate",
    codeExample: "public int[] getScores() { return scores.clone(); // Defensive copy }"
  },
  {
    question: "What is 'Defensive Copying' when receiving an array in a class constructor?",
    shortAnswer: "Cloning the incoming array argument before storing it in a private field (`this.scores = scores.clone();`) so the caller cannot modify it externally later.",
    explanation: "Constructor encapsulation protection.",
    hint: "Cloning constructor arguments so external caller modifications don't mutate private fields.",
    level: "intermediate",
    codeExample: "public Student(int[] marks) { this.marks = marks.clone(); }"
  },
  {
    question: "Can an anonymous array literal be passed directly to a method (`print(new int[]{1, 2, 3})`)?",
    shortAnswer: "YES! Anonymous arrays allow creating and passing inline arrays without declaring a temporary variable.",
    explanation: "Anonymous inline array passing.",
    hint: "Yes, anonymous arrays can be passed directly as method arguments.",
    level: "basic",
    codeExample: "process(new double[]{12000.0, 15000.0});"
  },
  {
    question: "What happens if a caller passes `null` to a method expecting an array (`process(null)`)?",
    shortAnswer: "If the method tries to access `arr.length` or `arr[i]` without guarding, it throws `java.lang.NullPointerException` at runtime.",
    explanation: "Null parameter vulnerability.",
    hint: "Throws NullPointerException if method dereferences the null argument.",
    level: "basic",
    codeExample: "void process(int[] a) { if (a == null) return; ... }"
  },
  {
    question: "How do you pass a 2D matrix to a method in Java?",
    shortAnswer: "`public static void printMatrix(int[][] matrix) { ... }`.",
    explanation: "2D array method parameter syntax.",
    hint: "Use int[][] as parameter type.",
    level: "basic",
    codeExample: "public static void process(double[][] halls) { ... }"
  },
  {
    question: "Can a method return a 2D matrix (`public static int[][] createGrid()`)?",
    shortAnswer: "YES! The method allocates and returns a 2D array reference.",
    explanation: "Returning multidimensional arrays.",
    hint: "Yes, declare return type as Type[][].",
    level: "basic",
    codeExample: "public static int[][] identity(int n) { return new int[n][n]; }"
  },
  {
    question: "What is the memory impact of returning a newly allocated array from a method?",
    shortAnswer: "The array object allocated in Heap memory persists after the method returns because the caller retains a reference pointer to it on its stack frame.",
    explanation: "Heap object escape and retention.",
    hint: "Heap object persists as long as the caller holds a reference to it.",
    level: "intermediate",
    codeExample: "double[] bonuses = createBonuses(); // Retained by caller"
  },
  {
    question: "Can a method accept Varargs (`int... values`) alongside array arguments?",
    shortAnswer: "YES! In Java, varargs `int...` is internally compiled into an `int[]` array, allowing either a comma-separated list or a direct array to be passed.",
    explanation: "Varargs compilation to arrays.",
    hint: "Varargs is compiled directly to an array parameter in bytecode.",
    level: "intermediate",
    codeExample: "public static int sum(int... values) { return values.length; }"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what is the best practice for calculating array statistics?",
    shortAnswer: "Passing the array to static utility methods (e.g. `ArrayMath.average(fees)`) that perform read-only calculations without mutating caller data in Indian Rupees (₹).",
    explanation: "Pure function design.",
    hint: "Read-only static calculation methods that do not mutate input arrays.",
    level: "basic",
    codeExample: "double avg = calculateAverage(batchFees);"
  },
  {
    question: "What is a 'Pure Function' when dealing with array parameters?",
    shortAnswer: "A method that inspects array elements to compute a result (e.g. sum, max) without modifying any element in the passed array (no side effects).",
    explanation: "Functional programming purity in Java.",
    hint: "A method that produces output without mutating input array elements.",
    level: "intermediate",
    codeExample: "public static int sum(int[] a) { /* Reads only, no mutation */ }"
  },
  {
    question: "What happens if two threads pass the same array to two different methods simultaneously?",
    shortAnswer: "A Race Condition and data corruption can occur if either method modifies array elements without synchronization.",
    explanation: "Thread safety in mutable shared arrays.",
    hint: "Race condition risk if concurrent threads modify shared array elements.",
    level: "advanced",
    codeExample: "// Shared mutable arrays require synchronization in concurrent code"
  },
  {
    question: "How do you swap two elements of an array inside a helper method?",
    shortAnswer: "`public static void swap(int[] arr, int i, int j) { int t = arr[i]; arr[i] = arr[j]; arr[j] = t; }`.",
    explanation: "Array swap helper method.",
    hint: "Pass the array and the two indices: swap(arr, i, j).",
    level: "basic",
    codeExample: "public static void swap(int[] a, int i, int j) { int t = a[i]; a[i] = a[j]; a[j] = t; }"
  },
  {
    question: "Why does writing a swap method `void swap(int a, int b) { int t = a; a = b; b = t; }` FAIL in Java?",
    shortAnswer: "Because primitives are passed by value; swapping the parameters `a` and `b` modifies only local stack copies, leaving the caller's variables completely unchanged.",
    explanation: "Classic beginner mistake in Java parameter passing.",
    hint: "Fails because primitive variables are copied by value; array index swap is required.",
    level: "basic",
    codeExample: "// swap(x, y) fails; swap(arr, i, j) succeeds!"
  },
  {
    question: "Can an array be resized by passing it to a method (`void expand(int[] arr) { arr = Arrays.copyOf(arr, arr.length * 2); }`)?",
    shortAnswer: "NO! Reassigning `arr` only updates the local parameter copy; the method must RETURN the new array: `arr = expand(arr);`.",
    explanation: "Returning expanded arrays.",
    hint: "No, the method must return the newly allocated expanded array.",
    level: "intermediate",
    codeExample: "public static int[] expand(int[] a) { return Arrays.copyOf(a, a.length * 2); }"
  },
  {
    question: "How does `Arrays.sort(arr)` work when passed an array?",
    shortAnswer: "It mutates the passed array in-place, sorting its elements in ascending order with return type `void`.",
    explanation: "In-place standard library sort.",
    hint: "Sorts the passed array in-place directly on the Heap (void return).",
    level: "basic",
    codeExample: "Arrays.sort(batchFees); // Mutates batchFees in-place"
  },
  {
    question: "In the Coder & AccoTax Barrackpore scholarship module, why is `createBonusScholarshipArray(0, ...)` designed to return `new double[0]`?",
    shortAnswer: "To ensure downstream reporting methods can iterate the returned array safely without throwing `NullPointerException` in Indian Rupees (₹).",
    explanation: "Defensive API design pattern.",
    hint: "Returns zero-length array to prevent NPEs in downstream code.",
    level: "basic",
    codeExample: "if (count <= 0) return new double[0];"
  },
  {
    question: "Can an array parameter be marked `final` (`public static void process(final int[] arr)`)?",
    shortAnswer: "YES! It prevents reassigning the parameter reference variable (`arr = new int[5]` causes a compile error), but the elements (`arr[0] = 99`) remain mutable.",
    explanation: "Final parameter modifier scope.",
    hint: "Yes, prevents parameter reassignment, but elements remain mutable.",
    level: "basic",
    codeExample: "public static void process(final int[] arr) { arr[0] = 99; // Legal }"
  },
  {
    question: "How do you make an array parameter truly immutable inside a method?",
    shortAnswer: "Wrap it using `Collections.unmodifiableList(Arrays.asList(arr))` or copy it into an immutable collection (`List.of()`), because raw Java arrays are always mutable.",
    explanation: "Immutability wrapping.",
    hint: "Wrap with List.of() or unmodifiable collection.",
    level: "intermediate",
    codeExample: "List<Integer> immutable = List.of(1, 2, 3);"
  },
  {
    question: "What is the bytecode mechanism for passing an array reference to a static method?",
    shortAnswer: "The JVM issues `aload` to push the array reference onto the operand stack, followed by `invokestatic` to execute the method frame.",
    explanation: "JVM bytecode invocation mechanics.",
    hint: "aload pushes reference to operand stack, then invokestatic.",
    level: "advanced",
    codeExample: "// Bytecode: aload_0 → invokestatic MyClass.process([I)V"
  },
  {
    question: "Can a generic method accept and return primitive arrays (`<T> T[] process(T[] arr)`)?",
    shortAnswer: "NO! Generics in Java work only with Reference types (`Integer[]`, `String[]`), not primitive arrays like `int[]`.",
    explanation: "Java generics type erasure limitation.",
    hint: "Generics apply only to Object arrays, not primitive arrays.",
    level: "advanced",
    codeExample: "// Generics require Object arrays: <T> T[] process(T[] a)"
  },
  {
    question: "How do you return multiple different arrays from a single method?",
    shortAnswer: "By wrapping them inside a custom Java Record or Class (e.g. `record Result(int[] passed, int[] failed)`).",
    explanation: "Record container return pattern.",
    hint: "Wrap multiple arrays inside a Java record or class.",
    level: "basic",
    codeExample: "public record ExamSplit(int[] passed, int[] failed) {}"
  },
  {
    question: "What is the ultimate takeaway of Module 001_006 Topic 10 for Java developers?",
    shortAnswer: "Java passes array reference addresses by value, allowing methods to mutate caller elements in-place on the Heap; methods should return newly allocated or empty arrays (`new int[0]`) rather than `null`.",
    explanation: "Mastery of method interaction with arrays.",
    hint: "Pass-by-value reference allows in-place mutation; return empty arrays instead of null.",
    level: "basic",
    codeExample: "// Summary: In-place mutation (fees[i]-=d) | Return empty (new int[0])"
  },
  {
    question: "What is the next topic (Topic 11) in Module 001_006?",
    shortAnswer: "Searching in arrays: Linear Search algorithm and Binary Search on sorted arrays.",
    explanation: "Topic 11 explores $O(N)$ Linear Search, $O(\\log N)$ Binary Search, sorted preconditions, and Arrays.binarySearch().",
    hint: "Searching in arrays: Linear Search and Binary Search on sorted arrays.",
    level: "basic",
    codeExample: "// Topic 11: Linear Search and Binary Search in Arrays"
  },
  {
    question: "What happens if a method returns `null` and the caller iterates with `for (int x : getArray())`?",
    shortAnswer: "Throws `java.lang.NullPointerException` immediately upon evaluating the for-each loop header.",
    explanation: "Why returning empty arrays is mandatory.",
    hint: "Throws NullPointerException in caller's for-each loop.",
    level: "basic",
    codeExample: "// Returning null causes NPE in caller for-each loop"
  }
];

export default questions;
