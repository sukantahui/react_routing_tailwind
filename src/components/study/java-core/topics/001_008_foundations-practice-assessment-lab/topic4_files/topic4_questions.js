/**
 * Module 001_008: Topic 4: Algorithmic Problem 4: Finding duplicate and missing numbers in an array
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "How do you find a single missing number in an array of size $N-1$ containing distinct elements from $[1..N]$ using Bitwise XOR?",
    shortAnswer: "Compute the XOR sum of all numbers from $1$ to $N$ (`xorFull`) and the XOR sum of all array elements (`xorArray`); their XOR `xorFull ^ xorArray` isolates the missing number in $O(N)$ time and $O(1)$ space with zero overflow risk.",
    explanation: "Bitwise XOR missing number principle.",
    hint: "xorFull ^ xorArray leaves the single missing number.",
    level: "basic",
    codeExample: "int missing = xorFull ^ xorArray;"
  },
  {
    question: "Why is the Bitwise XOR method safer than the Gauss Sum formula ($N(N+1)/2 - \\sum arr$)?",
    shortAnswer: "Because for large $N$ (e.g. $N = 100,000$), $N(N+1)/2$ exceeds 32-bit `Integer.MAX_VALUE` ($2.14 \\times 10^9$) causing integer overflow, whereas Bitwise XOR operates on individual bit columns without numerical accumulation.",
    explanation: "Integer overflow safety comparison.",
    hint: "Bitwise XOR never accumulates large sums and is immune to integer overflow.",
    level: "basic",
    codeExample: "// Sum formula requires 'long expectedSum = (long) n * (n + 1) / 2;'"
  },
  {
    question: "How does Floyd's Tortoise and Hare algorithm find a duplicate number in an array of size $N+1$ with values $[1..N]$?",
    shortAnswer: "Treat the array as a linked list where `nums[i]` is a pointer to the next index; because a duplicate exists, a cycle is created. Use slow and fast pointers to find the cycle intersection, then find the cycle entry point.",
    explanation: "Floyd's cycle detection in arrays (LeetCode 287).",
    hint: "Treat array as a linked list: slow moves 1 step, fast moves 2 steps.",
    level: "intermediate",
    codeExample: "do { slow = nums[slow]; fast = nums[nums[fast]]; } while (slow != fast);"
  },
  {
    question: "What is the Space and Time Complexity of Floyd's Cycle Detection for finding duplicates?",
    shortAnswer: "$O(N)$ Time Complexity and strict $O(1)$ Auxiliary Space without modifying the original array or allocating hash tables.",
    explanation: "Floyd's cycle complexity profile.",
    hint: "O(N) time and O(1) space non-destructively.",
    level: "basic",
    codeExample: "// O(N) Time, O(1) Space without modifying array"
  },
  {
    question: "How does Negative Index Marking find a duplicate in an array with elements in $[1..N]$?",
    shortAnswer: "For each element, calculate index `Math.abs(val) - 1`. If `nums[index] < 0`, `val` is the duplicate (already visited); otherwise, mark it by setting `nums[index] = -nums[index]`.",
    explanation: "Negative index marking technique.",
    hint: "Negate nums[abs(val) - 1] to mark visited; if already negative, duplicate found.",
    level: "intermediate",
    codeExample: "if (nums[val - 1] < 0) duplicate = val; else nums[val - 1] = -nums[val - 1];"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what was the missing roll number in range $[1..10]$?",
    shortAnswer: "Roll ID `4`.",
    explanation: "Missing roll number verification.",
    hint: "4.",
    level: "basic",
    codeExample: "findMissingNumberXor(studentRollsMissing, 10) -> 4"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what was the duplicate ID in `{3, 1, 3, 4, 2}`?",
    shortAnswer: "Duplicate ID `3`.",
    explanation: "Duplicate ID verification.",
    hint: "3.",
    level: "basic",
    codeExample: "findDuplicateFloyd(studentRollsDuplicate) -> 3"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what were the duplicate and missing values in transaction IDs `{1, 2, 2, 4}`?",
    shortAnswer: "Duplicate = `2`, Missing = `3` (Set Mismatch).",
    explanation: "Set mismatch result verification.",
    hint: "Duplicate: 2, Missing: 3.",
    level: "basic",
    codeExample: "findSetMismatch(transactionIds) -> [2, 3]"
  },
  {
    question: "Why must array signs be restored after Negative Index Marking?",
    shortAnswer: "To maintain method purity and prevent side-effects in caller code by converting all negated elements back to positive values via `Math.abs()`.",
    explanation: "Array state restoration best practice.",
    hint: "Restores array to original state to avoid side-effects.",
    level: "basic",
    codeExample: "for (int i = 0; i < nums.length; i++) nums[i] = Math.abs(nums[i]);"
  },
  {
    question: "How can you find TWO missing numbers in range $[1..N]$ (Array size $N-2$)?",
    shortAnswer: "1. XOR all elements and full range to get $X = A \\oplus B$. 2. Find the rightmost set bit in $X$ (`diff = X & (-X)`). 3. Partition numbers into two groups based on that bit to isolate $A$ and $B$.",
    explanation: "Two missing numbers bitwise partitioning algorithm.",
    hint: "Find rightmost set bit of total XOR, partition into two buckets, and XOR each bucket.",
    level: "advanced",
    codeExample: "int diff = xorAll & (-xorAll); // Rightmost set bit"
  },
  {
    question: "What is the Time Complexity of finding Set Mismatch via Negative Index Marking?",
    shortAnswer: "$O(N)$ linear time, making two passes over the array in $O(1)$ space.",
    explanation: "Set mismatch complexity.",
    hint: "O(N) time and O(1) space.",
    level: "basic",
    codeExample: "// 2 linear passes = O(N) Time"
  },
  {
    question: "Can sorting be used to find duplicate or missing numbers?",
    shortAnswer: "YES (`Arrays.sort(nums)`), but sorting takes $O(N \\log N)$ time and modifies array order, which is strictly inferior to $O(N)$ XOR or Floyd's algorithm.",
    explanation: "Sorting vs linear algorithms comparison.",
    hint: "Yes, but sorting takes O(N log N) time which is slower than O(N).",
    level: "basic",
    codeExample: "// Arrays.sort() is O(N log N)"
  },
  {
    question: "How does a Hash Set find duplicates, and why is it not ideal for memory-constrained systems?",
    shortAnswer: "A `HashSet` adds elements and returns false if already present ($O(N)$ time); however, it consumes $O(N)$ Heap memory and incurs object wrapper overhead.",
    explanation: "HashSet memory overhead.",
    hint: "Takes O(N) time but uses O(N) heap memory.",
    level: "basic",
    codeExample: "Set<Integer> set = new HashSet<>(); if (!set.add(x)) return x;"
  },
  {
    question: "What is the mathematical equation system to solve Set Mismatch ($[1..N]$)?",
    shortAnswer: "Let $D$ = Duplicate, $M$ = Missing. 1. $\\sum nums - \\sum [1..N] = D - M$. 2. $\\sum nums^2 - \\sum [1..N]^2 = D^2 - M^2 = (D - M)(D + M)$. Solving these yields $D$ and $M$ directly.",
    explanation: "Mathematical algebraic equation system for Set Mismatch.",
    hint: "Difference of sums gives (D - M); difference of squares gives (D^2 - M^2).",
    level: "advanced",
    codeExample: "long sumDiff = actualSum - expectedSum; // D - M"
  },
  {
    question: "What property of Bitwise XOR allows it to cancel duplicate pairs?",
    shortAnswer: "$X \\oplus X = 0$ (Self-inverse property) and $X \\oplus 0 = X$ (Identity property), combined with Commutative and Associative laws.",
    explanation: "XOR mathematical properties.",
    hint: "X ^ X = 0 and X ^ 0 = X.",
    level: "basic",
    codeExample: "5 ^ 5 = 0 | 5 ^ 0 = 5"
  },
  {
    question: "What happens if an array is missing NO numbers and contains all $[1..N]$?",
    shortAnswer: "The XOR result `xorFull ^ xorArray` equals `0`, indicating that all numbers from $1$ to $N$ are present with zero missing elements.",
    explanation: "Zero missing number edge case.",
    hint: "XOR returns 0 when no elements are missing.",
    level: "basic",
    codeExample: "if ((xorFull ^ xorArray) == 0) System.out.println(\"No missing number\");"
  },
  {
    question: "In Floyd's algorithm, why are we guaranteed that a cycle exists when array size is $N+1$ with elements in $[1..N]$?",
    shortAnswer: "By the **Pigeonhole Principle**: $N+1$ integers mapped into $N$ distinct values guarantees at least one value appears twice, creating a cycle in the index pointer graph.",
    explanation: "Pigeonhole Principle in cycle detection.",
    hint: "Pigeonhole Principle guarantees at least 1 duplicate among N+1 elements.",
    level: "intermediate",
    codeExample: "// N+1 elements in [1..N] -> Cycle guaranteed by Pigeonhole Principle"
  },
  {
    question: "Can Floyd's Cycle Detection handle arrays containing zeros or negative numbers?",
    shortAnswer: "NO! Floyd's algorithm assumes values are valid 1-based indices in range $[1..N]$; if elements contain 0 or negative numbers, pointer indexing jumps out of bounds.",
    explanation: "Floyd's algorithm precondition.",
    hint: "Requires 1-based positive integers in range [1..N].",
    level: "intermediate",
    codeExample: "// Requires nums[i] in [1, N]"
  },
  {
    question: "How do you find all numbers that appear TWICE in an array where elements are in $[1..N]$?",
    shortAnswer: "Using Negative Index Marking: Iterate through array; for each `val`, if `nums[abs(val) - 1] < 0`, add `abs(val)` to the duplicate list, otherwise negate `nums[abs(val) - 1]`.",
    explanation: "Multiple duplicates finding algorithm (LeetCode 442).",
    hint: "Negate index on visit; if already negative, add to duplicate list.",
    level: "intermediate",
    codeExample: "if (nums[idx] < 0) duplicates.add(Math.abs(val)); else nums[idx] = -nums[idx];"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what was `expectedSum` for $N = 10$?",
    shortAnswer: "$10 \\times 11 / 2 = 55$.",
    explanation: "Gauss sum calculation verification.",
    hint: "55.",
    level: "basic",
    codeExample: "expectedSum = 10 * 11 / 2 = 55"
  },
  {
    question: "What is 'Count Inversions' in an array?",
    shortAnswer: "The number of pairs $(i, j)$ such that $i < j$ and $arr[i] > arr[j]$, measured using MergeSort in $O(N \\log N)$ time.",
    explanation: "Count inversions algorithmic concept.",
    hint: "Pairs (i, j) where i < j and arr[i] > arr[j] computed via MergeSort.",
    level: "advanced",
    codeExample: "// Count inversions using MergeSort divide-and-conquer"
  },
  {
    question: "Why should `(long) n * (n + 1) / 2` cast `n` to `long` before multiplication?",
    shortAnswer: "Because `n * (n + 1)` is evaluated as a 32-bit `int` by default before division; casting `(long) n` promotes the expression to 64-bit arithmetic, preventing overflow.",
    explanation: "Type promotion overflow trap.",
    hint: "Prevents 32-bit int multiplication overflow before division.",
    level: "basic",
    codeExample: "long sum = (long) n * (n + 1) / 2; // Safe"
  },
  {
    question: "How does `BitSet` find multiple missing numbers in range $[1..N]$?",
    shortAnswer: "Initialize `BitSet bs = new BitSet(N + 1)`; for each value set `bs.set(val)`; all unset bits `bs.nextClearBit(1)` up to $N$ are missing numbers.",
    explanation: "BitSet missing numbers identification.",
    hint: "Mark present numbers in BitSet; clear bits identify missing numbers.",
    level: "intermediate",
    codeExample: "BitSet bs = new BitSet(n + 1); for (int v : nums) bs.set(v);"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, how did Phase 2 of Floyd's algorithm locate the duplicate entry?",
    shortAnswer: "By placing `ptr1` at `nums[0]` and `ptr2` at the intersection point, advancing both 1 step at a time until `ptr1 == ptr2`.",
    explanation: "Floyd's algorithm phase 2 cycle entry proof.",
    hint: "Advance ptr1 from start and ptr2 from intersection 1 step at a time.",
    level: "intermediate",
    codeExample: "while (ptr1 != ptr2) { ptr1 = nums[ptr1]; ptr2 = nums[ptr2]; }"
  },
  {
    question: "Can XOR be used to find a single non-repeating number in an array where every other number appears twice?",
    shortAnswer: "YES! XOR-ing all elements results in duplicates cancelling to 0 ($X \\oplus X = 0$), leaving only the unique single number in $O(N)$ time and $O(1)$ space (Single Number - LeetCode 136).",
    explanation: "Single Number XOR trick.",
    hint: "XOR all elements: pairs cancel to 0, leaving the unique single number.",
    level: "basic",
    codeExample: "int single = 0; for (int x : nums) single ^= x; return single;"
  },
  {
    question: "What is the difference between finding duplicates with `Math.abs()` vs boolean frequency arrays?",
    shortAnswer: "`Math.abs()` modifies array signs in-place with $O(1)$ extra space; a boolean frequency array requires $O(N)$ extra heap memory.",
    explanation: "In-place vs auxiliary space comparison.",
    hint: "Math.abs() uses O(1) in-place space; frequency array uses O(N) extra RAM.",
    level: "basic",
    codeExample: "// In-place sign marking (O(1)) vs boolean[] seen = new boolean[N] (O(N))"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what was the actual sum of rolls `{1, 2, 3, 5, 6, 7, 8, 9, 10}`?",
    shortAnswer: "$51$ (Expected: $55$, Missing: $55 - 51 = 4$).",
    explanation: "Sum subtraction calculation.",
    hint: "51.",
    level: "basic",
    codeExample: "actualSum = 51 -> 55 - 51 = 4"
  },
  {
    question: "What is the ultimate takeaway of Module 001_008 Topic 4 for Java developers?",
    shortAnswer: "Finding missing and duplicate numbers efficiently requires bitwise and in-place tricks: Bitwise XOR eliminates overflow for missing numbers, Floyd's Cycle Detection finds duplicates non-destructively in $O(1)$ space, and Negative Index Marking identifies Set Mismatches in $O(N)$ time.",
    explanation: "Mastery of missing and duplicate number algorithms.",
    hint: "XOR for missing numbers; Floyd's Tortoise & Hare for duplicates; Negative index marking for Set Mismatch.",
    level: "basic",
    codeExample: "// Summary: XOR (Missing), Floyd's (Duplicate), Negative Marking (Mismatch)"
  },
  {
    question: "What is the next topic (Topic 5) in Module 001_008?",
    shortAnswer: "Algorithmic Problem 5: Array element frequency counter using frequency arrays.",
    explanation: "Topic 5 implements high-speed array element frequency counting using direct address frequency arrays and hash maps.",
    hint: "Algorithmic Problem 5: Array element frequency counter using frequency arrays.",
    level: "basic",
    codeExample: "// Topic 5: Array Element Frequency Counter"
  },
  {
    question: "How does Java 21 `java.util.Collections` and Stream API calculate frequencies?",
    shortAnswer: "Using `Collectors.groupingBy(Function.identity(), Collectors.counting())` to produce a frequency map in a single declarative stream pipeline.",
    explanation: "Stream API frequency collection.",
    hint: "Collectors.groupingBy() with Collectors.counting().",
    level: "intermediate",
    codeExample: "Map<Integer, Long> freq = list.stream().collect(Collectors.groupingBy(e -> e, Collectors.counting()));"
  }
];

export default questions;
