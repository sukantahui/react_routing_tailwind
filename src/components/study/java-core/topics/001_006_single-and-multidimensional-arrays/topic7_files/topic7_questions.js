/**
 * Module 001_006: Topic 7: ArrayIndexOutOfBoundsException: root cause and prevention strategies
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What is `ArrayIndexOutOfBoundsException` in Java?",
    shortAnswer: "An unchecked runtime exception (`RuntimeException`) thrown by the JVM when code attempts to access an array with an illegal index that is either negative or greater than or equal to `arr.length`.",
    explanation: "Standard array boundary protection mechanism in Java.",
    hint: "Unchecked runtime exception thrown when index is < 0 or >= arr.length.",
    level: "basic",
    codeExample: "int[] a = new int[3];\n// int x = a[3]; // Throws ArrayIndexOutOfBoundsException!"
  },
  {
    question: "Is `ArrayIndexOutOfBoundsException` a Checked Exception or an Unchecked Exception?",
    shortAnswer: "It is an UNCHECKED exception (subclass of `java.lang.IndexOutOfBoundsException` which extends `java.lang.RuntimeException`), meaning methods do not need to declare `throws` for it.",
    explanation: "Unchecked runtime exception hierarchy.",
    hint: "Unchecked exception (extends RuntimeException).",
    level: "basic",
    codeExample: "// No try-catch or throws clause required by compiler"
  },
  {
    question: "What is the #1 most common root cause of `ArrayIndexOutOfBoundsException`?",
    shortAnswer: "Using `<=` instead of `<` in the loop condition (`for (int i = 0; i <= arr.length; i++)`).",
    explanation: "Classic off-by-one loop boundary bug.",
    hint: "Using <= arr.length instead of < arr.length in loop headers.",
    level: "basic",
    codeExample: "for (int i = 0; i <= arr.length; i++) // BUG! Should be i < arr.length"
  },
  {
    question: "In the Coder & AccoTax Barrackpore fee demo, what index triggered the exception in `studentFees` of length 4?",
    shortAnswer: "Index `4` (`studentFees[4]`), because valid indices for length 4 are only `0, 1, 2, 3` in Indian Rupees (₹).",
    explanation: "Off-by-one index violation.",
    hint: "Index 4 is out of bounds for an array of length 4.",
    level: "basic",
    codeExample: "double fee = studentFees[4]; // Exception: Index 4 out of bounds for length 4"
  },
  {
    question: "How does the Defensive Boundary Guard prevent `ArrayIndexOutOfBoundsException`?",
    shortAnswer: "By validating the index before accessing the array: `if (index >= 0 && index < arr.length)`.",
    explanation: "Defensive programming pattern.",
    hint: "Check: if (index >= 0 && index < arr.length).",
    level: "basic",
    codeExample: "if (idx >= 0 && idx < arr.length) return arr[idx];"
  },
  {
    question: "Why is the Enhanced `for-each` loop immune to `ArrayIndexOutOfBoundsException`?",
    shortAnswer: "Because the compiler automatically handles iteration internally from index `0` up to `arr.length - 1`, eliminating manual index tracking.",
    explanation: "Syntactic loop safety guarantee.",
    hint: "Compiler manages iteration bounds internally, preventing index errors.",
    level: "basic",
    codeExample: "for (double fee : studentFees) System.out.println(fee);"
  },
  {
    question: "What happens if you index an empty array `int[] empty = new int[0];` at `empty[0]`?",
    shortAnswer: "Throws `ArrayIndexOutOfBoundsException: Index 0 out of bounds for length 0`.",
    explanation: "Empty arrays have length 0, so even index 0 is invalid.",
    hint: "Throws exception because length is 0 (no valid indices).",
    level: "basic",
    codeExample: "int[] empty = new int[0];\n// int x = empty[0]; // Throws Exception!"
  },
  {
    question: "What happens if you use a negative index in Java (`arr[-1]`)?",
    shortAnswer: "Throws `ArrayIndexOutOfBoundsException: Index -1 out of bounds for length N`.",
    explanation: "Java does not support negative indices.",
    hint: "Throws exception; negative indices are illegal.",
    level: "basic",
    codeExample: "int val = arr[-1]; // Throws ArrayIndexOutOfBoundsException"
  },
  {
    question: "How does `Objects.checkIndex(index, length)` in Java 9+ simplify boundary validation?",
    shortAnswer: "It verifies that `0 <= index < length` in a single high-performance intrinsic call, returning `index` or throwing `IndexOutOfBoundsException` if invalid.",
    explanation: "Modern Java 9+ utility method.",
    hint: "Java 9 utility that validates index bounds in one call.",
    level: "intermediate",
    codeExample: "Objects.checkIndex(idx, arr.length); return arr[idx];"
  },
  {
    question: "In 2D jagged arrays, what causes column `ArrayIndexOutOfBoundsException`?",
    shortAnswer: "Hardcoding the column loop to a fixed width (e.g. `c < 4`) when a specific row has fewer columns (e.g. `matrix[r].length == 2`).",
    explanation: "Irregular row length assumption bug.",
    hint: "Hardcoding column loop bounds instead of using matrix[r].length.",
    level: "basic",
    codeExample: "for (int c = 0; c < matrix[r].length; c++) // Safe jagged loop"
  },
  {
    question: "What is the difference between `NullPointerException` and `ArrayIndexOutOfBoundsException`?",
    shortAnswer: "`NullPointerException` occurs when the array reference itself is `null` (`arr.length`); `ArrayIndexOutOfBoundsException` occurs when the array exists on the Heap, but the requested index is outside `[0 .. length-1]`.",
    explanation: "Null pointer vs index range violation.",
    hint: "NPE: reference is null; AIOOBE: array exists but index is invalid.",
    level: "basic",
    codeExample: "int[] a = null; a[0] = 1; // NPE | int[] b = new int[1]; b[5] = 1; // AIOOBE"
  },
  {
    question: "Why does the JVM NOT just return a default value (like `0` or `null`) when an index is out of bounds?",
    shortAnswer: "Because silently returning default values masks serious logic bugs and security flaws (like buffer over-reads), whereas throwing an immediate exception fails fast and protects data integrity.",
    explanation: "Fail-Fast architectural principle.",
    hint: "Fails fast to prevent masking serious logic bugs and buffer over-reads.",
    level: "intermediate",
    codeExample: "// Fail-fast design ensures bugs are caught immediately"
  },
  {
    question: "How does HotSpot JIT 'Bounds Check Elimination' (BCE) interact with `ArrayIndexOutOfBoundsException`?",
    shortAnswer: "If the JIT compiler proves an index is always within `[0 .. length-1]` (e.g. standard `for (int i=0; i<arr.length; i++)`), it deletes the boundary check instructions from machine code for peak speed while guaranteeing safety.",
    explanation: "Compiler safety proof optimization.",
    hint: "Compiler removes runtime bounds check instructions when bounds are provably safe.",
    level: "advanced",
    codeExample: "// JIT eliminates checks in standard for loops"
  },
  {
    question: "Can `ArrayIndexOutOfBoundsException` be caught with a `try-catch` block?",
    shortAnswer: "YES! However, catching runtime boundary exceptions is considered poor practice; you should fix the underlying indexing logic with guard checks instead.",
    explanation: "Clean exception handling principle.",
    hint: "Yes, but prefer fixing the index logic or using guard checks.",
    level: "basic",
    codeExample: "try { int x = a[i]; } catch (ArrayIndexOutOfBoundsException ex) { ... }"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, how do students debug an index out of bounds exception in a stack trace?",
    shortAnswer: "1. Locate the exact line number from the stack trace; 2. Print `arr.length` and the offending index variable at that moment; 3. Correct the loop bound.",
    explanation: "Systematic 3-step debugging protocol.",
    hint: "Inspect line number in stack trace, print length and index values.",
    level: "basic",
    codeExample: "System.out.printf(\"Debugging: index=%d, length=%d%n\", idx, arr.length);"
  },
  {
    question: "What happens during array reverse traversal if you start at `int i = arr.length`?",
    shortAnswer: "Immediate `ArrayIndexOutOfBoundsException` on the very first iteration; reverse loops MUST start at `int i = arr.length - 1`.",
    explanation: "Classic reverse loop boundary mistake.",
    hint: "Throws exception; reverse loops must start at arr.length - 1.",
    level: "basic",
    codeExample: "for (int i = arr.length - 1; i >= 0; i--) // Correct reverse loop"
  },
  {
    question: "What happens if a reverse loop condition is written as `i > 0` instead of `i >= 0`?",
    shortAnswer: "It does not throw an exception, but it skips the first element at index `0` (Off-by-One omission bug).",
    explanation: "Missing first element at index 0.",
    hint: "Omits the element at index 0 (silent logic bug).",
    level: "basic",
    codeExample: "for (int i = arr.length - 1; i >= 0; i--) // Must include i >= 0"
  },
  {
    question: "Can an expression inside an index cause `ArrayIndexOutOfBoundsException` conditionally (`arr[i + 1]`)?",
    shortAnswer: "YES! In loops that compare adjacent elements (`arr[i] == arr[i + 1]`), the loop must terminate at `i < arr.length - 1` to prevent `i + 1` from overflowing at the final iteration.",
    explanation: "Adjacent element comparison guard.",
    hint: "Loop must terminate at arr.length - 1 when accessing arr[i + 1].",
    level: "intermediate",
    codeExample: "for (int i = 0; i < arr.length - 1; i++) if (arr[i] == arr[i + 1]) { ... }"
  },
  {
    question: "What is the message format of `ArrayIndexOutOfBoundsException` in modern Java (Java 17+)?",
    shortAnswer: "`Index X out of bounds for length Y` (e.g. `Index 4 out of bounds for length 4`), clearly detailing both the invalid index and the array size.",
    explanation: "Enhanced error diagnostics in modern JDK.",
    hint: "Index X out of bounds for length Y.",
    level: "basic",
    codeExample: "// Exception message: Index 4 out of bounds for length 4"
  },
  {
    question: "How does `StringIndexOutOfBoundsException` relate to `ArrayIndexOutOfBoundsException`?",
    shortAnswer: "Both inherit from `IndexOutOfBoundsException`; `StringIndexOutOfBoundsException` is thrown by `String.charAt(i)` and `String.substring()`, while `ArrayIndexOutOfBoundsException` is thrown by raw array indexing.",
    explanation: "Exception hierarchy relationship.",
    hint: "Both extend IndexOutOfBoundsException for strings and arrays respectively.",
    level: "intermediate",
    codeExample: "// StringIndexOutOfBoundsException (String) vs ArrayIndexOutOfBoundsException (Array)"
  },
  {
    question: "In binary search implementations, what causes `ArrayIndexOutOfBoundsException`?",
    shortAnswer: "Failing to check `if (mid >= 0 && mid < arr.length)` or incorrectly updating pointers (`high = mid` instead of `high = mid - 1`), causing bounds overflow.",
    explanation: "Binary search pointer convergence bug.",
    hint: "Improper pointer updates in binary search (e.g. high = mid instead of high = mid - 1).",
    level: "intermediate",
    codeExample: "high = mid - 1; // Correct pointer decrement"
  },
  {
    question: "Can reflection throw `ArrayIndexOutOfBoundsException`?",
    shortAnswer: "YES! `java.lang.reflect.Array.get(arr, index)` throws `ArrayIndexOutOfBoundsException` if the index is out of bounds.",
    explanation: "Reflection array API bounds checking.",
    hint: "Yes, Array.get(arr, idx) throws ArrayIndexOutOfBoundsException.",
    level: "advanced",
    codeExample: "Array.get(arr, 99); // Throws ArrayIndexOutOfBoundsException"
  },
  {
    question: "In the Coder & AccoTax Barrackpore banking auditor, why are customer account lookups guarded defensively?",
    shortAnswer: "To ensure an invalid account index entered by an operator does not crash the ledger application in Indian Rupees (₹).",
    explanation: "Robust enterprise fault tolerance.",
    hint: "Guards against invalid operator index inputs in ₹.",
    level: "basic",
    codeExample: "if (accId >= 0 && accId < accounts.length) process(accounts[accId]);"
  },
  {
    question: "What happens if you access `arr[arr.length - 0]`?",
    shortAnswer: "Throws `ArrayIndexOutOfBoundsException` because `arr.length - 0 == arr.length` (one past the last valid index).",
    explanation: "Arithmetic index mistake.",
    hint: "Throws exception because arr.length - 0 is arr.length.",
    level: "basic",
    codeExample: "// int val = arr[arr.length - 0]; // Exception!"
  },
  {
    question: "How does `Arrays.copyOfRange(arr, from, to)` handle out-of-bounds `from` indices?",
    shortAnswer: "Throws `ArrayIndexOutOfBoundsException` if `from < 0` or `from > arr.length`.",
    explanation: "Range copying boundary validation.",
    hint: "Throws exception if from < 0 or from > length.",
    level: "intermediate",
    codeExample: "int[] sub = Arrays.copyOfRange(arr, 0, arr.length);"
  },
  {
    question: "Can static code analyzers (SonarQube, SpotBugs) detect off-by-one loop errors before compilation?",
    shortAnswer: "YES! Modern static analysis tools flag `i <= arr.length` as a critical bug during code scanning.",
    explanation: "Automated code quality assurance.",
    hint: "Yes, static analysis tools detect i <= arr.length automatically.",
    level: "basic",
    codeExample: "// Flagged by SpotBugs: Array index out of bounds in loop"
  },
  {
    question: "What is the performance overhead of Java's runtime array bounds checking?",
    shortAnswer: "Near-zero in hot loops due to HotSpot JIT Bounds Check Elimination (BCE) and CPU branch prediction hardware.",
    explanation: "Modern JVM hardware acceleration.",
    hint: "Near-zero overhead due to JIT Bounds Check Elimination.",
    level: "advanced",
    codeExample: "// BCE eliminates overhead in optimized hot loops"
  },
  {
    question: "What is the ultimate takeaway of Module 001_006 Topic 7 for Java developers?",
    shortAnswer: "`ArrayIndexOutOfBoundsException` is an unchecked runtime exception caused by off-by-one loop conditions (`<=`), negative indices, or empty array access; prevented via strict `< arr.length` loops, defensive guard checks (`0 <= idx < len`), and enhanced `for-each` iterations.",
    explanation: "Mastery of array boundary safety in Java.",
    hint: "Use < arr.length, defensive guards (0 <= idx < len), and for-each loops.",
    level: "basic",
    codeExample: "// Summary: Always use i < arr.length and guard: if (idx >= 0 && idx < arr.length)"
  },
  {
    question: "What is the next topic (Topic 8) in Module 001_006?",
    shortAnswer: "Traversing arrays using standard index-based for loops and reverse loops.",
    explanation: "Topic 8 explores forward iteration, backward reverse traversal, step-skipping loops, and accumulation patterns.",
    hint: "Traversing arrays using standard index-based for loops and reverse loops.",
    level: "basic",
    codeExample: "// Topic 8: Standard and Reverse Array Traversal"
  },
  {
    question: "Can `System.arraycopy()` throw `ArrayIndexOutOfBoundsException`?",
    shortAnswer: "YES! If `srcPos`, `destPos`, or `length` would cause reads or writes beyond array boundaries.",
    explanation: "Bulk memory copy boundary check.",
    hint: "Yes, throws exception if copy range exceeds array boundaries.",
    level: "intermediate",
    codeExample: "System.arraycopy(src, 0, dest, 0, len);"
  }
];

export default questions;
