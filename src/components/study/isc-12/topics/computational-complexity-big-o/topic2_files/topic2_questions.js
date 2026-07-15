const questions = [
  {
    question: "What is space complexity?",
    shortAnswer: "A measure of the amount of memory an algorithm uses as a function of input size.",
    explanation: "Space complexity includes both the input memory and the auxiliary (extra) memory used by the algorithm.",
    hint: "Think about variables, data structures, and recursion stack.",
    level: "basic",
    codeExample: "// Not applicable"
  },
  {
    question: "How does space complexity differ from time complexity?",
    shortAnswer: "Time complexity measures time taken; space complexity measures memory used.",
    explanation: "Both are important performance metrics, but they often trade off against each other.",
    hint: "Consider caching (more memory) vs recomputing (more time).",
    level: "basic",
    codeExample: "// Not applicable"
  },
  {
    question: "What is auxiliary space?",
    shortAnswer: "The extra memory (temporary space) used by an algorithm, excluding the input itself.",
    explanation: "Auxiliary space is the memory allocated during execution for variables, arrays, recursion, etc.",
    hint: "It's the memory you allocate on top of the input.",
    level: "basic",
    codeExample: "// int[] temp = new int[n]; // O(n) auxiliary"
  },
  {
    question: "What is the space complexity of a simple loop with a few variables?",
    shortAnswer: "O(1) — constant space.",
    explanation: "Only a fixed number of variables are used, independent of input size.",
    hint: "Count the variables declared outside the loop.",
    level: "basic",
    codeExample: "int sum = 0; for (int x : arr) sum += x; // O(1)"
  },
  {
    question: "What is the space complexity of creating a new array of size n?",
    shortAnswer: "O(n) — linear space.",
    explanation: "The array size grows proportionally with the input.",
    hint: "If you copy an array, you double the memory usage.",
    level: "basic",
    codeExample: "int[] copy = new int[arr.length];"
  },
  {
    question: "Why does recursion often increase space complexity?",
    shortAnswer: "Because each recursive call adds a new frame to the call stack, using O(depth) memory.",
    explanation: "The call stack depth can be O(n) in the worst case, leading to O(n) space even without explicit data structures.",
    hint: "Think about how many nested calls happen.",
    level: "intermediate",
    codeExample: "// Recursive factorial: calls n times -> O(n) stack space"
  },
  {
    question: "How can we reduce space complexity in recursive algorithms?",
    shortAnswer: "By converting recursion to iteration (tail recursion) or using explicit stacks.",
    explanation: "Tail recursion can be optimized by the compiler to reuse a single stack frame, but not all languages support it.",
    hint: "Iterative solutions often use O(1) space.",
    level: "intermediate",
    codeExample: "// Use a loop instead of recursion"
  },
  {
    question: "What is the space complexity of in-place algorithms?",
    shortAnswer: "O(1) auxiliary space, because they modify the input directly without extra storage.",
    explanation: "In-place sorting (like heap sort) uses only a few variables for swapping.",
    hint: "Look for algorithms that swap elements within the same array.",
    level: "intermediate",
    codeExample: "// In-place array reversal"
  },
  {
    question: "What is the space complexity of using a HashMap to store n elements?",
    shortAnswer: "O(n) — linear space, because the map stores n key-value pairs.",
    explanation: "The hash map grows with the number of elements inserted.",
    hint: "The number of entries is proportional to input size.",
    level: "intermediate",
    codeExample: "Map<Integer, Integer> map = new HashMap<>(); // O(n) space"
  },
  {
    question: "How does garbage collection affect space complexity analysis?",
    shortAnswer: "It can introduce overhead, but in theoretical analysis, we still consider peak memory usage.",
    explanation: "In languages like Java, memory may not be freed immediately, so peak usage can be higher than expected.",
    hint: "Consider memory before garbage collection runs.",
    level: "advanced",
    codeExample: "// Not code-specific"
  },
  {
    question: "What is the space complexity of binary search (iterative)?",
    shortAnswer: "O(1) — constant auxiliary space.",
    explanation: "Binary search uses only a few variables (low, high, mid) regardless of input size.",
    hint: "No additional arrays are created.",
    level: "intermediate",
    codeExample: "// while (low <= high) { mid = (low+high)/2; ... }"
  },
  {
    question: "What is the space complexity of binary search (recursive)?",
    shortAnswer: "O(log n) — logarithmic space due to the recursion stack.",
    explanation: "The recursion depth is O(log n) because the search space halves each time.",
    hint: "Count the number of recursive calls.",
    level: "intermediate",
    codeExample: "// recursive binary search"
  },
  {
    question: "What is the space complexity of merge sort?",
    shortAnswer: "O(n) — linear auxiliary space for the temporary arrays used during merging.",
    explanation: "Merge sort requires a temporary array of size n to merge two halves.",
    hint: "The merge step creates a new array each time.",
    level: "intermediate",
    codeExample: "// int[] temp = new int[right-left+1];"
  },
  {
    question: "What is the space complexity of quicksort?",
    shortAnswer: "O(log n) average, O(n) worst-case due to recursion stack.",
    explanation: "Quicksort sorts in-place but recursion depth can be O(log n) on average, O(n) in worst case.",
    hint: "The stack depth depends on pivot choices.",
    level: "advanced",
    codeExample: "// Quicksort recursive"
  },
  {
    question: "Can an algorithm have O(1) time but O(n) space?",
    shortAnswer: "Yes, if it performs a fixed number of operations but uses memory proportional to the input.",
    explanation: "For example, precomputing all results in an array of size n would be O(n) space but O(1) time per query.",
    hint: "Think of a lookup table.",
    level: "intermediate",
    codeExample: "// Precomputed array for O(1) lookups"
  },
  {
    question: "What is the space complexity of a linked list?",
    shortAnswer: "O(n) — the list grows with each node stored.",
    explanation: "Each element in the list is a separate node, requiring memory for each node.",
    hint: "The number of nodes equals the number of elements.",
    level: "basic",
    codeExample: "// Node class with next pointer"
  },
  {
    question: "How does space complexity affect cache performance?",
    shortAnswer: "High space complexity can cause cache misses, slowing down the algorithm.",
    explanation: "If data doesn't fit in cache, memory access becomes slower, increasing actual runtime.",
    hint: "Think about spatial and temporal locality.",
    level: "advanced",
    codeExample: "// Not code-specific"
  },
  {
    question: "What is the space complexity of a string concatenation in a loop?",
    shortAnswer: "O(n²) in some languages (like Java with String), because each concatenation creates a new string.",
    explanation: "Using StringBuilder reduces it to O(n) space.",
    hint: "Strings are immutable in Java.",
    level: "intermediate",
    codeExample: "// String s = \"\"; for (int i=0; i<n; i++) s += i; // O(n²) space"
  },
  {
    question: "What is the space complexity of dynamic programming (DP) with a 2D table?",
    shortAnswer: "O(n*m) — quadratic space, where n and m are dimensions.",
    explanation: "DP often stores results in a table, which can be large.",
    hint: "Look for ways to reduce space (e.g., rolling arrays).",
    level: "advanced",
    codeExample: "int[][] dp = new int[n][m];"
  },
  {
    question: "How can you reduce space complexity in DP?",
    shortAnswer: "By using space optimization techniques like rolling arrays (only keeping previous rows).",
    explanation: "If the recurrence only depends on the previous row, you can reduce O(n²) to O(n).",
    hint: "For LCS, you only need two rows.",
    level: "advanced",
    codeExample: "// int[] prev = new int[m+1]; int[] curr = new int[m+1];"
  },
  {
    question: "What is the space complexity of breadth-first search (BFS) on a graph?",
    shortAnswer: "O(V) — linear space for the queue and visited set.",
    explanation: "In the worst case, the queue may hold all vertices.",
    hint: "The queue size can grow to O(V).",
    level: "intermediate",
    codeExample: "// Queue<Node> queue = new LinkedList<>();"
  },
  {
    question: "What is the space complexity of depth-first search (DFS) on a graph?",
    shortAnswer: "O(V) — linear space for the visited set and recursion stack.",
    explanation: "The recursion stack can go as deep as the number of vertices.",
    hint: "DFS uses a stack (implicit or explicit).",
    level: "intermediate",
    codeExample: "// Set visited = new HashSet(); // recursion stack"
  },
  {
    question: "How does the space complexity of an algorithm affect its scalability?",
    shortAnswer: "High space complexity limits the maximum input size that can be handled due to memory constraints.",
    explanation: "If an algorithm uses O(n²) space, it may become infeasible for n > few thousand.",
    hint: "Consider available RAM.",
    level: "intermediate",
    codeExample: "// Not applicable"
  },
  {
    question: "What is the space complexity of a Trie data structure?",
    shortAnswer: "O(alphabet_size * total_characters) — can be large.",
    explanation: "Each node may have up to alphabet_size children, leading to significant memory usage.",
    hint: "Trades space for fast prefix searches.",
    level: "advanced",
    codeExample: "// Trie node with children array"
  },
  {
    question: "Why might an algorithm with better time complexity have worse space complexity?",
    shortAnswer: "Because caching or memoization stores data to avoid recomputation, which increases memory usage.",
    explanation: "Example: dynamic programming vs recursion, or using a hash table for O(1) lookup.",
    hint: "Space-time trade-off.",
    level: "intermediate",
    codeExample: "// Memoization caches results."
  },
  {
    question: "What is the space complexity of a Fibonacci computation using memoization?",
    shortAnswer: "O(n) — for the memo array and the recursion stack.",
    explanation: "The memo array stores results for all n, and recursion depth is O(n).",
    hint: "You can optimize to O(1) with iteration.",
    level: "intermediate",
    codeExample: "// int[] memo = new int[n+1];"
  },
  {
    question: "What is the space complexity of the iterative Fibonacci?",
    shortAnswer: "O(1) — constant space.",
    explanation: "Only two variables are needed to track the previous two numbers.",
    hint: "No arrays or recursion.",
    level: "intermediate",
    codeExample: "int a=0,b=1; for (int i=2;i<=n;i++){ int c=a+b; a=b; b=c; }"
  },
  {
    question: "How do you measure space complexity in practice?",
    shortAnswer: "By profiling memory usage with tools like VisualVM, JProfiler, or using runtime monitoring.",
    explanation: "You can also estimate by counting the number of objects allocated and their sizes.",
    hint: "Use memory profilers.",
    level: "advanced",
    codeExample: "// Runtime.totalMemory() and freeMemory() in Java"
  },
  {
    question: "What is the space complexity of a database index?",
    shortAnswer: "O(n) — extra space proportional to the number of rows.",
    explanation: "An index is a separate data structure (like a B-tree) that stores keys and pointers.",
    hint: "Indexes speed up queries but cost memory.",
    level: "advanced",
    codeExample: "// CREATE INDEX idx ON table(column)"
  },
  {
    question: "How does the space complexity of an algorithm relate to its environmental constraints?",
    shortAnswer: "In embedded systems, memory limits dictate the choice of algorithm, often favoring lower space complexity.",
    explanation: "Space complexity analysis helps engineers decide if an algorithm can run on a given device.",
    hint: "Consider IoT devices with 2MB RAM.",
    level: "intermediate",
    codeExample: "// Not applicable"
  },
  {
    question: "What is the space complexity of the Tower of Hanoi iterative solution?",
    shortAnswer: "O(n) — if using an explicit stack, or O(1) with clever positioning.",
    explanation: "Iterative solutions may still use a stack to simulate recursion, but some optimized versions use O(1).",
    hint: "Recursive solution is O(n) stack space.",
    level: "advanced",
    codeExample: "// Not applicable"
  }
];

export default questions;