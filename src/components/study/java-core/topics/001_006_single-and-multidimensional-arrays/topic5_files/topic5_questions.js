/**
 * Module 001_006: Topic 5: Array indexing (0-based) and accessing elements via index
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "Why is Array Indexing 0-based in Java (and most computer architectures)?",
    shortAnswer: "Because the index represents the memory OFFSET from the base memory address; at index 0, offset is $0 \\times \\text{elementSize} = 0$, giving immediate access to the beginning of the array payload.",
    explanation: "Memory address offset calculation principle.",
    hint: "Index represents offset from base address; 0 means 0 offset.",
    level: "basic",
    codeExample: "int first = arr[0]; // 0 offsets from Base Address"
  },
  {
    question: "What is the valid index range for an array of length $N$ in Java?",
    shortAnswer: "From $0$ up to $N - 1$ inclusive ($0 \\le \\text{index} < N$).",
    explanation: "Standard 0-based index boundary rule.",
    hint: "0 to length - 1.",
    level: "basic",
    codeExample: "// For length 5: valid indices are 0, 1, 2, 3, 4"
  },
  {
    question: "How do you access the LAST element of an array `arr` in Java?",
    shortAnswer: "`arr[arr.length - 1]`.",
    explanation: "The last element is located at index length minus one.",
    hint: "arr[arr.length - 1].",
    level: "basic",
    codeExample: "int last = arr[arr.length - 1];"
  },
  {
    question: "What happens if you attempt to access `arr[arr.length]`?",
    shortAnswer: "Throws `java.lang.ArrayIndexOutOfBoundsException` because index `length` is one beyond the valid maximum index (`length - 1`).",
    explanation: "Classic off-by-one boundary violation.",
    hint: "Throws ArrayIndexOutOfBoundsException.",
    level: "basic",
    codeExample: "// int val = arr[arr.length]; // THROWS ArrayIndexOutOfBoundsException!"
  },
  {
    question: "In the Coder & AccoTax Barrackpore batch fee ledger, what is the index of Swadeep's fee?",
    shortAnswer: "Index `0` (`batchFees[0]`), representing the first student seat in Indian Rupees (₹).",
    explanation: "Demonstrates 0-based seat mapping.",
    hint: "Index 0 represents the first element in ₹.",
    level: "basic",
    codeExample: "double swadeepFee = batchFees[0];"
  },
  {
    question: "Can an array index be an arithmetic expression (`arr[2 * i + 1]`)?",
    shortAnswer: "YES! Any valid Java expression that resolves to an `int` (or promotable to `int`) can serve as an array index.",
    explanation: "Dynamic index expression evaluation.",
    hint: "Yes, any expression evaluating to an int is valid.",
    level: "basic",
    codeExample: "int val = arr[2 * i + 1];"
  },
  {
    question: "What is the Time Complexity of accessing an array element by index (`arr[i]`)?",
    shortAnswer: "$O(1)$ constant time.",
    explanation: "Direct arithmetic computation of the physical memory address.",
    hint: "O(1) constant time.",
    level: "basic",
    codeExample: "// Address = Base + i * 4 → O(1) Instantaneous"
  },
  {
    question: "How do you update an array element in-place (e.g. increase by 10)?",
    shortAnswer: "`arr[i] += 10;` (or `arr[i] = arr[i] + 10;`).",
    explanation: "In-place element mutation.",
    hint: "arr[i] += 10;.",
    level: "basic",
    codeExample: "batchFees[0] += 1500.0; // In-place update"
  },
  {
    question: "Can negative numbers be used as array indices in Java (`arr[-1]`) like in Python?",
    shortAnswer: "NO! Java does NOT support negative indexing; `arr[-1]` always throws `java.lang.ArrayIndexOutOfBoundsException`.",
    explanation: "Java arrays require non-negative integer indices.",
    hint: "Throws ArrayIndexOutOfBoundsException; negative indices are not supported.",
    level: "basic",
    codeExample: "// int val = arr[-1]; // THROWS ArrayIndexOutOfBoundsException!"
  },
  {
    question: "How do you access the middle element of an array of length $N$?",
    shortAnswer: "`arr[arr.length / 2]` (integer division drops any fractional half).",
    explanation: "Standard midpoint index calculation.",
    hint: "arr[arr.length / 2].",
    level: "basic",
    codeExample: "int mid = arr[arr.length / 2];"
  },
  {
    question: "What is the result of `arr[++i]` vs `arr[i++]`?",
    shortAnswer: "`arr[++i]` increments `i` FIRST and accesses the element at the new index; `arr[i++]` accesses the element at current index `i` and THEN increments `i`.",
    explanation: "Pre-increment vs post-increment evaluation order.",
    hint: "++i increments before index access; i++ increments after index access.",
    level: "intermediate",
    codeExample: "int a = arr[++i]; // new index | int b = arr[i++]; // old index"
  },
  {
    question: "What bytecode instruction is used to load an `int` from an array in the JVM?",
    shortAnswer: "`iaload` (Integer Array Load).",
    explanation: "JVM bytecode array load instruction.",
    hint: "iaload.",
    level: "advanced",
    codeExample: "// JVM instruction: iaload (for int), daload (for double), aaload (for Object)"
  },
  {
    question: "What bytecode instruction is used to store an `int` into an array in the JVM?",
    shortAnswer: "`iastore` (Integer Array Store).",
    explanation: "JVM bytecode array store instruction.",
    hint: "iastore.",
    level: "advanced",
    codeExample: "// JVM instruction: iastore (for int), dastore (for double), aastore (for Object)"
  },
  {
    question: "Can an array element be swapped with another in-place without helper libraries?",
    shortAnswer: "`int temp = arr[i]; arr[i] = arr[j]; arr[j] = temp;`.",
    explanation: "Classic 3-step variable swap.",
    hint: "int temp = arr[i]; arr[i] = arr[j]; arr[j] = temp;.",
    level: "basic",
    codeExample: "int t = arr[0]; arr[0] = arr[1]; arr[1] = t;"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what happens if an empty array (`new int[0]`) is indexed at `[0]`?",
    shortAnswer: "Throws `ArrayIndexOutOfBoundsException: Index 0 out of bounds for length 0`.",
    explanation: "Empty arrays have no valid indices.",
    hint: "Throws ArrayIndexOutOfBoundsException because length is 0.",
    level: "basic",
    codeExample: "int[] empty = new int[0];\n// int x = empty[0]; // THROWS Exception!"
  },
  {
    question: "What is the effect of invoking a method on an element: `studentNames[0].toUpperCase()`?",
    shortAnswer: "It retrieves the object reference stored at index `0` and invokes the method on that target object.",
    explanation: "Chained method call on array element.",
    hint: "Retrieves reference at index 0 and calls method on it.",
    level: "basic",
    codeExample: "String upper = studentNames[0].toUpperCase();"
  },
  {
    question: "How does the JVM perform runtime array bounds checking on every index access?",
    shortAnswer: "The JVM compares the index operand against the array's `length` field in hardware; if `index < 0 || index >= length`, it triggers a trap branch throwing `ArrayIndexOutOfBoundsException`.",
    explanation: "Runtime array boundary enforcement.",
    hint: "Compares index against length field before memory access.",
    level: "intermediate",
    codeExample: "// Hardware bounds check: if (index >= length) throw Exception"
  },
  {
    question: "Can a `char` variable be used as an array index (`arr['A']`)?",
    shortAnswer: "YES! `char` is an unsigned 16-bit integer and is implicitly promoted to `int` (e.g. `'A'` becomes index `65`).",
    explanation: "Primitive widening to int for array indexing.",
    hint: "Yes, char is widened to int (e.g. 'A' is index 65).",
    level: "intermediate",
    codeExample: "int val = arr['A']; // Accesses index 65"
  },
  {
    question: "Can a `byte` or `short` variable be used as an array index?",
    shortAnswer: "YES! `byte` and `short` are automatically widened to `int` during index evaluation.",
    explanation: "Numeric primitive promotion to int.",
    hint: "Yes, byte and short are automatically promoted to int.",
    level: "basic",
    codeExample: "byte b = 2; int val = arr[b]; // Legal"
  },
  {
    question: "Why does `int val = arr[index];` avoid autoboxing overhead for primitive arrays?",
    shortAnswer: "Because `arr` is an `int[]`, loading an element transfers the raw 32-bit primitive directly into a CPU register without allocating an `Integer` wrapper object.",
    explanation: "Zero-allocation primitive access.",
    hint: "Transfers raw 32-bit value directly into CPU register without object wrapper.",
    level: "intermediate",
    codeExample: "// Zero autoboxing overhead with primitive arrays"
  },
  {
    question: "In 2D arrays, how is an element accessed at row $r$ and column $c$?",
    shortAnswer: "`matrix[r][c]` (first dereferences row $r$, then column $c$).",
    explanation: "2D array element access syntax.",
    hint: "matrix[r][c].",
    level: "basic",
    codeExample: "int val = grid[r][c];"
  },
  {
    question: "What happens if you write `arr[i++] = i;`?",
    shortAnswer: "The target slot `arr[i]` uses the original value of `i`, then `i` is incremented, and the NEW incremented value is assigned into that slot (e.g. if $i=0$, `arr[0] = 1`).",
    explanation: "Java left-to-right evaluation order rule (JLS §15.7).",
    hint: "Left-hand side index evaluated first, then right-hand side assigned.",
    level: "advanced",
    codeExample: "int i = 0; arr[i++] = i; // arr[0] becomes 1"
  },
  {
    question: "Can an array element be passed to a method that accepts a primitive parameter (`Math.sqrt(arr[0])`)?",
    shortAnswer: "YES! The value stored at `arr[0]` is evaluated and passed by value to the method.",
    explanation: "Passing array elements as method arguments.",
    hint: "Yes, element value is passed by value.",
    level: "basic",
    codeExample: "double root = Math.sqrt(batchFees[0]);"
  },
  {
    question: "In the Coder & AccoTax Barrackpore accounting audit, why is `batchFees[0] += 1500.0` safe?",
    shortAnswer: "Because `batchFees[0]` directly modifies the allocated double element in Heap memory in Indian Rupees (₹) without reallocating the array.",
    explanation: "In-place mutation safety.",
    hint: "Mutates heap element in-place without reallocating array in ₹.",
    level: "basic",
    codeExample: "batchFees[0] += 1500.0; // In-place mutation"
  },
  {
    question: "What is the result of `arr[arr[0]]` (Nested Indexing)?",
    shortAnswer: "It first reads the integer stored at `arr[0]` and uses that value as the index to access the second element.",
    explanation: "Indirection indexing (common in graph adjacency lists and permutation cycles).",
    hint: "Uses the value of arr[0] as the index for the outer access.",
    level: "intermediate",
    codeExample: "int[] a = {2, 0, 1}; int val = a[a[0]]; // a[2] is 1"
  },
  {
    question: "What is the maximum index allowed in Java arrays?",
    shortAnswer: "`Integer.MAX_VALUE - 1` (2,147,483,646), constrained by 32-bit signed integer limits.",
    explanation: "Maximum theoretical array index.",
    hint: "Integer.MAX_VALUE - 1.",
    level: "advanced",
    codeExample: "// Maximum index is Integer.MAX_VALUE - 1"
  },
  {
    question: "How do you find the second-to-last element of an array `arr`?",
    shortAnswer: "`arr[arr.length - 2]` (valid for `length >= 2`).",
    explanation: "Second from the end index offset.",
    hint: "arr[arr.length - 2].",
    level: "basic",
    codeExample: "int secondLast = arr[arr.length - 2];"
  },
  {
    question: "What happens if you index an uninitialized array reference (`int[] a; a[0] = 5;`)?",
    shortAnswer: "Compile-time error: `variable a might not have been initialized`.",
    explanation: "Definite assignment rule for local variables.",
    hint: "Compile error: variable not initialized.",
    level: "basic",
    codeExample: "int[] a;\n// a[0] = 5; // COMPILE ERROR: not initialized!"
  },
  {
    question: "What is the ultimate takeaway of Module 001_006 Topic 5 for Java developers?",
    shortAnswer: "Array indexing is strictly 0-based ($0 \\le i < \\text{length}$), executes in $O(1)$ constant time via base address memory offsets, and allows reading, writing, and in-place mutation of elements.",
    explanation: "Mastery of 0-based array index access.",
    hint: "0-based indexing (0 to length-1) with O(1) random access and in-place mutation.",
    level: "basic",
    codeExample: "// Summary: arr[0] (first) to arr[length - 1] (last) in O(1) time"
  },
  {
    question: "What is the next topic (Topic 6) in Module 001_006?",
    shortAnswer: "The 'length' property of arrays (property vs String.length() method).",
    explanation: "Topic 6 explores the immutable final length property, JVM object header storage, comparisons with Collection.size() and String.length().",
    hint: "The 'length' property of arrays (property vs String.length()).",
    level: "basic",
    codeExample: "// Topic 6: The 'length' Array Property"
  }
];

export default questions;
