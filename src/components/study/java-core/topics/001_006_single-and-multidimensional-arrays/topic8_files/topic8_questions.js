/**
 * Module 001_006: Topic 8: Traversing arrays using standard index-based for loops and reverse loops
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What is the standard idiom for forward array traversal in Java?",
    shortAnswer: "`for (int i = 0; i < arr.length; i++) { ... }`.",
    explanation: "Iterates from index 0 up to length - 1 sequentially.",
    hint: "for (int i = 0; i < arr.length; i++).",
    level: "basic",
    codeExample: "for (int i = 0; i < arr.length; i++) System.out.println(arr[i]);"
  },
  {
    question: "What is the standard idiom for reverse (backward) array traversal in Java?",
    shortAnswer: "`for (int i = arr.length - 1; i >= 0; i--) { ... }`.",
    explanation: "Iterates from the last element down to index 0.",
    hint: "for (int i = arr.length - 1; i >= 0; i--).",
    level: "basic",
    codeExample: "for (int i = arr.length - 1; i >= 0; i--) System.out.println(arr[i]);"
  },
  {
    question: "Why can't you mutate array elements inside a standard read-only enhanced for-each loop?",
    shortAnswer: "Because the for-each loop variable is a local copy of each element value; mutating the loop variable does NOT change the underlying array slot.",
    explanation: "Index-based loops (`arr[i] = ...`) are required for element mutation.",
    hint: "Loop variable is a local copy; index-based for loop is required to mutate elements.",
    level: "basic",
    codeExample: "for (int i = 0; i < arr.length; i++) arr[i] *= 2; // Mutates array!"
  },
  {
    question: "How does Two-Pointer Array Reversal work in-place?",
    shortAnswer: "Initialize `int left = 0, right = arr.length - 1;` and swap elements `arr[left]` and `arr[right]` while `left < right`, incrementing `left++` and decrementing `right--`.",
    explanation: "Runs in $O(N)$ time and $O(1)$ auxiliary memory.",
    hint: "Swaps left and right pointers moving toward the center.",
    level: "intermediate",
    codeExample: "while (left < right) { int t = a[left]; a[left++] = a[right]; a[right--] = t; }"
  },
  {
    question: "In the Coder & AccoTax Barrackpore fee records, how is total revenue calculated during forward traversal?",
    shortAnswer: "By maintaining an accumulator variable: `double total = 0.0; for (int i=0; i<feeRecords.length; i++) total += feeRecords[i];` in Indian Rupees (₹).",
    explanation: "Standard linear accumulator pattern.",
    hint: "Accumulates total fees using total += feeRecords[i] in ₹.",
    level: "basic",
    codeExample: "double sum = 0; for (int i=0; i<fees.length; i++) sum += fees[i];"
  },
  {
    question: "How do you traverse ONLY even index positions in an array?",
    shortAnswer: "`for (int i = 0; i < arr.length; i += 2)`.",
    explanation: "Increments step by +2 starting at 0.",
    hint: "Step by 2 starting from index 0.",
    level: "basic",
    codeExample: "for (int i = 0; i < arr.length; i += 2) print(arr[i]);"
  },
  {
    question: "How do you traverse ONLY odd index positions in an array?",
    shortAnswer: "`for (int i = 1; i < arr.length; i += 2)`.",
    explanation: "Increments step by +2 starting at 1.",
    hint: "Step by 2 starting from index 1.",
    level: "basic",
    codeExample: "for (int i = 1; i < arr.length; i += 2) print(arr[i]);"
  },
  {
    question: "What is the Time Complexity of traversing an array of length $N$?",
    shortAnswer: "$O(N)$ linear time.",
    explanation: "Each element is visited exactly once.",
    hint: "O(N) linear time.",
    level: "basic",
    codeExample: "// O(N) operations"
  },
  {
    question: "What is the Space Complexity of Two-Pointer in-place reversal?",
    shortAnswer: "$O(1)$ constant auxiliary space.",
    explanation: "Reversal is performed directly within existing array memory without extra arrays.",
    hint: "O(1) constant auxiliary space.",
    level: "basic",
    codeExample: "// O(1) space complexity"
  },
  {
    question: "What happens if you write a reverse loop condition as `i > 0` instead of `i >= 0`?",
    shortAnswer: "The loop terminates prematurely after index `1`, skipping the first element at index `0`.",
    explanation: "Off-by-one omission bug.",
    hint: "Skips element at index 0.",
    level: "basic",
    codeExample: "for (int i = arr.length - 1; i >= 0; i--) // Must use i >= 0"
  },
  {
    question: "How do you calculate the arithmetic average of array elements during traversal?",
    shortAnswer: "`double avg = total / arr.length;` (where `total` is the accumulator sum).",
    explanation: "Sum divided by length.",
    hint: "sum / arr.length.",
    level: "basic",
    codeExample: "double avg = (double) sum / arr.length;"
  },
  {
    question: "Can an array be traversed simultaneously from both ends in a single loop?",
    shortAnswer: "YES! `for (int i = 0, j = arr.length - 1; i < j; i++, j--)` manages two pointers simultaneously.",
    explanation: "Multi-variable for loop header.",
    hint: "Yes, using multiple loop variables (int i=0, j=length-1).",
    level: "intermediate",
    codeExample: "for (int i = 0, j = arr.length - 1; i < j; i++, j--) { ... }"
  },
  {
    question: "How do you count occurrences of a target value during forward traversal?",
    shortAnswer: "`int count = 0; for (int i = 0; i < arr.length; i++) if (arr[i] == target) count++;`.",
    explanation: "Standard linear counting filter.",
    hint: "Increment count when arr[i] == target.",
    level: "basic",
    codeExample: "int count = 0; for (int x : arr) if (x == target) count++;"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, how do students double all scholarship balances in-place?",
    shortAnswer: "`for (int i = 0; i < scholarships.length; i++) scholarships[i] *= 2;` in Indian Rupees (₹).",
    explanation: "In-place array mutation.",
    hint: "Multiplies each slot in-place via scholarships[i] *= 2.",
    level: "basic",
    codeExample: "for (int i=0; i<arr.length; i++) arr[i] *= 2;"
  },
  {
    question: "How do you find if an array is a Palindrome Array (reads same forwards and backwards)?",
    shortAnswer: "Use two pointers `left = 0, right = arr.length - 1;` while `left < right`; if `arr[left] != arr[right]` return `false`, else increment `left++` and decrement `right--`.",
    explanation: "Two-pointer symmetry verification.",
    hint: "Compare arr[left] with arr[right] moving inward.",
    level: "intermediate",
    codeExample: "while (l < r) { if (a[l++] != a[r--]) return false; } return true;"
  },
  {
    question: "What is 'Loop Hoisting' when traversing an ArrayList vs a raw array?",
    shortAnswer: "For `ArrayList`, caching `int len = list.size()` avoids $N-1$ method calls; for raw arrays, `arr.length` is already a pre-cached field.",
    explanation: "Performance optimization difference.",
    hint: "Caching list.size() in loop header avoids redundant method calls.",
    level: "intermediate",
    codeExample: "for (int i = 0, len = list.size(); i < len; i++)"
  },
  {
    question: "Can `while` and `do-while` loops traverse arrays identically to `for` loops?",
    shortAnswer: "YES! By managing the index variable manually outside the loop (`int i = 0; while (i < arr.length) { ... i++; }`).",
    explanation: "Loop construct interchangeability.",
    hint: "Yes, by manually tracking index variable in while loop.",
    level: "basic",
    codeExample: "int i = 0; while (i < arr.length) { process(arr[i++]); }"
  },
  {
    question: "How do you copy elements from one array to another during forward traversal?",
    shortAnswer: "`for (int i = 0; i < src.length; i++) dest[i] = src[i];` (or via `System.arraycopy()`).",
    explanation: "Manual element-by-element copy.",
    hint: "dest[i] = src[i] inside forward loop.",
    level: "basic",
    codeExample: "for (int i=0; i<src.length; i++) dest[i] = src[i];"
  },
  {
    question: "What happens if an array is modified concurrently during index-based traversal in a single thread?",
    shortAnswer: "Index-based loops do NOT throw `ConcurrentModificationException`; they will simply read the newly mutated values at subsequent indices.",
    explanation: "Direct memory access without Iterator fail-fast tracking.",
    hint: "Reads newly updated values directly without throwing ConcurrentModificationException.",
    level: "intermediate",
    codeExample: "// Index loops allow direct memory reading during mutation"
  },
  {
    question: "How do you shift all elements left by 1 position (left rotate)?",
    shortAnswer: "Save `first = arr[0]`, then `for (int i = 0; i < arr.length - 1; i++) arr[i] = arr[i+1];`, then set `arr[arr.length - 1] = first;`.",
    explanation: "Classic left-shift algorithm.",
    hint: "Save first element, shift rest left, place first element at end.",
    level: "intermediate",
    codeExample: "int first = a[0]; for (int i=0; i<a.length-1; i++) a[i] = a[i+1]; a[a.length-1] = first;"
  },
  {
    question: "How do you shift all elements right by 1 position (right rotate)?",
    shortAnswer: "Save `last = arr[arr.length - 1]`, then reverse loop `for (int i = arr.length - 1; i > 0; i--) arr[i] = arr[i-1];`, then set `arr[0] = last;`.",
    explanation: "Classic right-shift algorithm using reverse loop.",
    hint: "Save last element, shift rest right with reverse loop, place last at index 0.",
    level: "intermediate",
    codeExample: "int last = a[a.length-1]; for (int i=a.length-1; i>0; i--) a[i] = a[i-1]; a[0] = last;"
  },
  {
    question: "In the Coder & AccoTax Barrackpore database, why is reverse traversal used for transaction logs?",
    shortAnswer: "To inspect and display the most recent student payments first (Reverse Chronological Order) in Indian Rupees (₹).",
    explanation: "Practical application of reverse traversal.",
    hint: "Displays most recent transactions first in reverse chronological order.",
    level: "basic",
    codeExample: "for (int i=logs.length-1; i>=0; i--) display(logs[i]);"
  },
  {
    question: "Can an array traversal terminate early using `break`?",
    shortAnswer: "YES! When searching for an element, hitting `break` halts the traversal immediately once the target is found.",
    explanation: "Early exit loop control.",
    hint: "Yes, break halts traversal immediately upon finding target.",
    level: "basic",
    codeExample: "for (int i=0; i<arr.length; i++) if (arr[i] == target) { found = true; break; }"
  },
  {
    question: "Can an array traversal skip specific elements using `continue`?",
    shortAnswer: "YES! Hitting `continue` skips the current iteration and advances directly to the next index update `i++`.",
    explanation: "Conditional element skipping.",
    hint: "Yes, continue skips current element and advances index.",
    level: "basic",
    codeExample: "for (int i=0; i<arr.length; i++) if (arr[i] < 0) continue; // skip negatives"
  },
  {
    question: "How do you traverse a 2D matrix in Row-Major order?",
    shortAnswer: "Nested loops: outer loop iterates rows `r = 0 .. R-1`, inner loop iterates columns `c = 0 .. C-1`.",
    explanation: "Hardware cache-friendly 2D traversal.",
    hint: "Outer loop rows, inner loop columns (matrix[r][c]).",
    level: "basic",
    codeExample: "for (int r=0; r<matrix.length; r++) for (int c=0; c<matrix[r].length; c++)"
  },
  {
    question: "How do you traverse a 2D matrix in Column-Major order?",
    shortAnswer: "Nested loops: outer loop iterates columns `c = 0 .. C-1`, inner loop iterates rows `r = 0 .. R-1`.",
    explanation: "Column-by-column matrix traversal.",
    hint: "Outer loop columns, inner loop rows (matrix[r][c]).",
    level: "intermediate",
    codeExample: "for (int c=0; c<cols; c++) for (int r=0; r<rows; r++) print(matrix[r][c]);"
  },
  {
    question: "Why is Row-Major order faster than Column-Major order on modern CPUs?",
    shortAnswer: "Because Row-Major accesses contiguous memory addresses sequentially loaded into 64-byte CPU L1/L2 cache lines, whereas Column-Major causes CPU cache misses on every jump.",
    explanation: "Hardware spatial memory locality.",
    hint: "Row-Major maximizes CPU cache hits along contiguous memory addresses.",
    level: "advanced",
    codeExample: "// Row-Major is cache-friendly and up to 10x faster"
  },
  {
    question: "What is the ultimate takeaway of Module 001_006 Topic 8 for Java developers?",
    shortAnswer: "Forward traversal (`0 .. len-1`) provides sequential processing and in-place mutation; reverse traversal (`len-1 .. 0`) enables LIFO ordering; two-pointer convergence reverses arrays in $O(N)$ time and $O(1)$ space.",
    explanation: "Mastery of array traversal patterns.",
    hint: "Master forward loops, reverse loops, and two-pointer convergence.",
    level: "basic",
    codeExample: "// Summary: Forward (i++), Reverse (i--), Two-pointer (left++, right--)"
  },
  {
    question: "What is the next topic (Topic 9) in Module 001_006?",
    shortAnswer: "Traversing arrays using enhanced for-each loop (read-only limitation).",
    explanation: "Topic 9 explores for-each syntax, read-only limitations, bytecode expansion, and when to choose for vs for-each.",
    hint: "Traversing arrays using enhanced for-each loop (read-only limitation).",
    level: "basic",
    codeExample: "// Topic 9: Enhanced For-Each Loop and Read-Only Limitations"
  },
  {
    question: "How do you reverse an array using a new auxiliary array?",
    shortAnswer: "`int[] rev = new int[arr.length]; for (int i = 0; i < arr.length; i++) rev[i] = arr[arr.length - 1 - i];`.",
    explanation: "Out-of-place reversal using $O(N)$ extra space.",
    hint: "rev[i] = arr[arr.length - 1 - i] with extra array.",
    level: "basic",
    codeExample: "for (int i=0; i<a.length; i++) rev[i] = a[a.length - 1 - i];"
  }
];

export default questions;
