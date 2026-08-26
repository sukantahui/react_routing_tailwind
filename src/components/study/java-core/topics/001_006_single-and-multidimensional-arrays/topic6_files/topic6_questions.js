/**
 * Module 001_006: Topic 6: The 'length' property of arrays (property vs String.length() method)
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "Is `length` on an array a Field Property or a Method in Java?",
    shortAnswer: "`length` is a `public final int` field property stored directly in the array object header; it is accessed WITHOUT parentheses (`arr.length`).",
    explanation: "Array length is a direct instance variable.",
    hint: "Field property accessed without parentheses: arr.length.",
    level: "basic",
    codeExample: "int size = arr.length; // No parentheses!"
  },
  {
    question: "What is the difference between `arr.length`, `str.length()`, and `list.size()` in Java?",
    shortAnswer: "1. `arr.length` is a `final` field property on arrays; 2. `str.length()` is a method on `String`; 3. `list.size()` is a method on `Collection`.",
    explanation: "The three distinct size conventions in Java standard libraries.",
    hint: "Array: property (length) | String: method (length()) | List: method (size()).",
    level: "basic",
    codeExample: "int a = arr.length; int s = str.length(); int l = list.size();"
  },
  {
    question: "What error occurs if you write `arr.length()` with parentheses?",
    shortAnswer: "Compile-time error: `cannot find symbol: method length()`.",
    explanation: "Arrays do not define a length() method.",
    hint: "Compile error: method length() not found.",
    level: "basic",
    codeExample: "// int len = arr.length(); // COMPILER ERROR!"
  },
  {
    question: "What error occurs if you write `str.length` without parentheses?",
    shortAnswer: "Compile-time error: `cannot find symbol: variable length`.",
    explanation: "String length is a method, not a field.",
    hint: "Compile error: variable length not found on String.",
    level: "basic",
    codeExample: "// int len = str.length; // COMPILER ERROR!"
  },
  {
    question: "In the Coder & AccoTax Barrackpore multi-hall ledger, what does `labExamHalls.length` represent?",
    shortAnswer: "The number of rows (total examination halls) in the 2D array.",
    explanation: "Outer array length represents row count.",
    hint: "Represents total hall count (rows).",
    level: "basic",
    codeExample: "int numHalls = labExamHalls.length;"
  },
  {
    question: "What does `matrix[r].length` represent in a 2D array?",
    shortAnswer: "The number of columns (element capacity) in specific row $r$.",
    explanation: "Inner 1D array length.",
    hint: "Represents column count of row r.",
    level: "basic",
    codeExample: "int colsInRow = matrix[r].length;"
  },
  {
    question: "Where is the `length` property physically stored in the JVM?",
    shortAnswer: "Inside the 16-byte array object header in Heap memory (specifically, the 4-byte length field following the Mark Word and Klass Word).",
    explanation: "HotSpot JVM array layout.",
    hint: "4-byte integer field in the array object header.",
    level: "advanced",
    codeExample: "// Stored in 16-byte object header on Heap"
  },
  {
    question: "Can an array's `length` property be modified at runtime (`arr.length = 10;`)?",
    shortAnswer: "NO! `length` is declared `final`; attempting to modify it causes a compile-time error: `cannot assign a value to final variable length`.",
    explanation: "Array size is strictly immutable.",
    hint: "Compile error: cannot assign value to final variable length.",
    level: "basic",
    codeExample: "// arr.length = 10; // COMPILER ERROR!"
  },
  {
    question: "What is the return type of `arr.length`?",
    shortAnswer: "Primitive `int` (32-bit signed integer).",
    explanation: "Array length is always a non-negative int.",
    hint: "Primitive int.",
    level: "basic",
    codeExample: "int len = arr.length;"
  },
  {
    question: "What is the length of `new int[0]`?",
    shortAnswer: "`0`.",
    explanation: "Zero-length array property.",
    hint: "0.",
    level: "basic",
    codeExample: "int[] empty = new int[0]; System.out.println(empty.length); // 0"
  },
  {
    question: "What happens if you check `.length` on a `null` array reference (`int[] a = null; int l = a.length;`)?",
    shortAnswer: "Throws `java.lang.NullPointerException` at runtime.",
    explanation: "Cannot access field on null pointer.",
    hint: "Throws NullPointerException.",
    level: "basic",
    codeExample: "int[] a = null;\n// int l = a.length; // THROWS NullPointerException!"
  },
  {
    question: "Why is accessing `arr.length` practically instantaneous ($O(1)$)?",
    shortAnswer: "Because it is a simple 4-byte memory offset read from the object header already in CPU L1 cache, with zero computation or method invocation overhead.",
    explanation: "Direct memory field read.",
    hint: "Direct field read from object header in L1 cache (O(1) time).",
    level: "basic",
    codeExample: "// Simple L1 cache field read"
  },
  {
    question: "How does `StringBuilder.length()` compare to `arr.length`?",
    shortAnswer: "`StringBuilder.length()` is a method returning the current character count stored in its mutable buffer; `arr.length` is an immutable fixed field.",
    explanation: "Method on mutable builder vs immutable array field.",
    hint: "StringBuilder.length() is a method; arr.length is an immutable field.",
    level: "basic",
    codeExample: "int b = sb.length();"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what check is performed before inspecting `arr.length`?",
    shortAnswer: "`if (arr != null && arr.length > 0)` to prevent `NullPointerException` on empty or unallocated inputs.",
    explanation: "Defensive guard check.",
    hint: "if (arr != null && arr.length > 0).",
    level: "basic",
    codeExample: "if (fees != null && fees.length > 0) { ... }"
  },
  {
    question: "What is the length of an array initialized via literal `{10, 20, 30, 40, 50}`?",
    shortAnswer: "`5`.",
    explanation: "Compiler counts 5 elements in literal.",
    hint: "5.",
    level: "basic",
    codeExample: "int[] a = {10, 20, 30, 40, 50}; // a.length is 5"
  },
  {
    question: "In a 3D array `int[][][] cube = new int[2][3][4];`, what is `cube.length`, `cube[0].length`, and `cube[0][0].length`?",
    shortAnswer: "`cube.length = 2` (1st dimension), `cube[0].length = 3` (2nd dimension), and `cube[0][0].length = 4` (3rd dimension).",
    explanation: "Hierarchical dimension lengths in multidimensional arrays.",
    hint: "2, 3, and 4 respectively.",
    level: "intermediate",
    codeExample: "int d1 = cube.length; int d2 = cube[0].length; int d3 = cube[0][0].length;"
  },
  {
    question: "Can an array's length exceed `Integer.MAX_VALUE`?",
    shortAnswer: "No! Array length in Java is fundamentally represented as a 32-bit signed `int` (maximum $2^{31}-1 = 2,147,483,647$).",
    explanation: "JVM 32-bit index specification.",
    hint: "No, constrained by 32-bit signed int.",
    level: "intermediate",
    codeExample: "// Maximum array length is Integer.MAX_VALUE - 8"
  },
  {
    question: "How does the HotSpot JIT C2 compiler optimize `for (int i=0; i<arr.length; i++)`?",
    shortAnswer: "It hoists `arr.length` and uses it to perform Bounds Check Elimination (BCE), proving that all iterations stay within valid memory bounds.",
    explanation: "JIT induction variable optimization.",
    hint: "JIT uses length to eliminate runtime boundary checks.",
    level: "advanced",
    codeExample: "// JIT optimizes arr.length loops automatically"
  },
  {
    question: "Does `arr.length` include `null` elements in an object array (`String[] s = new String[5];`)?",
    shortAnswer: "YES! `s.length` is `5` regardless of whether the elements are `null` or populated objects.",
    explanation: "Length measures total allocated capacity slots, not non-null count.",
    hint: "Yes, length measures total allocated slot capacity.",
    level: "basic",
    codeExample: "String[] s = new String[5]; // s.length is 5 even if all slots are null"
  },
  {
    question: "How do you count the number of non-null elements in an object array?",
    shortAnswer: "By iterating through the array and counting elements where `elem != null`.",
    explanation: "Active element counting algorithm.",
    hint: "Count elements matching elem != null in a loop.",
    level: "basic",
    codeExample: "int count = 0; for (String s : arr) if (s != null) count++;"
  },
  {
    question: "Why did Java language designers make `length` a public final field instead of a getter method `getLength()` on arrays?",
    shortAnswer: "For maximum runtime performance in tight loops, eliminating method call stack frames and aligning with high-frequency CPU memory instructions.",
    explanation: "Early Java performance design decision (1995).",
    hint: "For peak performance in tight numerical loops without method call overhead.",
    level: "intermediate",
    codeExample: "// Direct field access has zero method dispatch overhead"
  },
  {
    question: "What is the output of `System.out.println(new int[]{1, 2, 3}.length);`?",
    shortAnswer: "`3`.",
    explanation: "Chained length access on anonymous array literal.",
    hint: "3.",
    level: "basic",
    codeExample: "System.out.println(new int[]{1, 2, 3}.length); // prints 3"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, why is `matrix[r].length` crucial for jagged matrices?",
    shortAnswer: "Because each row in a jagged array can have a different number of columns; checking `matrix[r].length` prevents `ArrayIndexOutOfBoundsException` during row traversals.",
    explanation: "Irregular row traversal safety.",
    hint: "Ensures loop iterates exactly to the column count of that specific row.",
    level: "basic",
    codeExample: "for (int c = 0; c < matrix[r].length; c++) { ... }"
  },
  {
    question: "Can an array's length be negative?",
    shortAnswer: "No! The JVM strictly enforces non-negative lengths; attempting to instantiate `new int[-1]` throws `NegativeArraySizeException`.",
    explanation: "Non-negative length invariant.",
    hint: "No, array lengths are strictly non-negative.",
    level: "basic",
    codeExample: "// Array length is always >= 0"
  },
  {
    question: "What is the bytecode instruction to get the length of an array?",
    shortAnswer: "`arraylength`.",
    explanation: "Dedicated JVM bytecode instruction for array length retrieval.",
    hint: "arraylength.",
    level: "advanced",
    codeExample: "// JVM instruction: arraylength"
  },
  {
    question: "How does `File.length()` differ from `arr.length`?",
    shortAnswer: "`File.length()` is a method returning file size in bytes as a `long`; `arr.length` is a field returning element count as an `int`.",
    explanation: "Method returning long vs field returning int.",
    hint: "File.length() returns file byte size as long; arr.length returns element count as int.",
    level: "intermediate",
    codeExample: "long bytes = file.length(); int elements = arr.length;"
  },
  {
    question: "Can reflection inspect the length of an array object?",
    shortAnswer: "Yes! Using `java.lang.reflect.Array.getLength(arrayObject)`.",
    explanation: "Reflection array utility.",
    hint: "Array.getLength(obj).",
    level: "advanced",
    codeExample: "int len = java.lang.reflect.Array.getLength(arrObj);"
  },
  {
    question: "What is the ultimate takeaway of Module 001_006 Topic 6 for Java developers?",
    shortAnswer: "Array `length` is an immutable `public final int` field property stored in the 16-byte object header, accessed without parentheses, providing $O(1)$ capacity measurement across 1D and multidimensional matrices.",
    explanation: "Mastery of the array length property in Java.",
    hint: "Immutable final field in object header accessed without parentheses (arr.length).",
    level: "basic",
    codeExample: "// Summary: arr.length (field) vs str.length() (method) vs list.size() (method)"
  },
  {
    question: "What is the next topic (Topic 7) in Module 001_006?",
    shortAnswer: "ArrayIndexOutOfBoundsException: root cause and prevention strategies.",
    explanation: "Topic 7 explores common root causes of index exceptions, defensive guard idioms, and off-by-one debugging.",
    hint: "ArrayIndexOutOfBoundsException: root cause and prevention strategies.",
    level: "basic",
    codeExample: "// Topic 7: ArrayIndexOutOfBoundsException and Prevention"
  },
  {
    question: "Is `arr.length` evaluated at compile time or runtime?",
    shortAnswer: "At runtime, reading the 4-byte integer from the allocated heap object header.",
    explanation: "Runtime field access.",
    hint: "Runtime memory read from heap object header.",
    level: "intermediate",
    codeExample: "// Runtime object header field read"
  }
];

export default questions;
