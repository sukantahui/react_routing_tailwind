/**
 * Module 001_007: Topic 14: Visualizing recursive execution trees and stack unwinding
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What is a Recursive Execution Tree?",
    shortAnswer: "A visual hierarchical tree graph where each node represents a specific recursive method call, and its child nodes represent the sub-calls spawned by that method.",
    explanation: "Core definition of recursive execution trees.",
    hint: "Hierarchical tree graph representing method calls as nodes and sub-calls as children.",
    level: "basic",
    codeExample: "// fib(4) splits into children fib(3) and fib(2)"
  },
  {
    question: "In what traversal order does the JVM execute a multi-branch recursive tree?",
    shortAnswer: "**Depth-First Search (DFS) Order**: The JVM dives down the leftmost branch completely to its base case before unwinding and evaluating the right branch.",
    explanation: "JVM call stack execution order in tree recursion.",
    hint: "Depth-First Search (DFS) order, evaluating left branch before right.",
    level: "basic",
    codeExample: "// In fib(4): fib(3) → fib(2) → fib(1) is fully evaluated before fib(2) right branch"
  },
  {
    question: "What is the difference between Linear Recursion and Tree (Binary) Recursion?",
    shortAnswer: "Linear Recursion makes AT MOST ONE recursive call per frame (e.g. Factorial, producing a straight chain); Tree Recursion makes TWO OR MORE recursive calls per frame (e.g. Fibonacci, generating a branching tree).",
    explanation: "Linear vs Tree recursion taxonomy.",
    hint: "Linear makes 1 call per frame; Tree makes 2+ calls creating branches.",
    level: "basic",
    codeExample: "// Linear: return n * fact(n - 1); | Tree: return fib(n - 1) + fib(n - 2);"
  },
  {
    question: "What is the Time Complexity of naive recursive Fibonacci ($fib(N)$)?",
    shortAnswer: "$O(2^N)$ Exponential Time, because the number of recursive nodes approximately doubles with each increase in $N$.",
    explanation: "Exponential complexity of binary recursive trees.",
    hint: "O(2^N) exponential time.",
    level: "basic",
    codeExample: "// T(N) = T(N - 1) + T(N - 2) + O(1) → O(2^N)"
  },
  {
    question: "What is the Space Complexity of naive recursive Fibonacci ($fib(N)$) on the Call Stack?",
    shortAnswer: "$O(N)$ Linear Stack Space, because the maximum stack depth at any given moment equals the height of the tree ($N$).",
    explanation: "Maximum tree height dictates call stack depth.",
    hint: "O(N) stack memory proportional to tree height.",
    level: "intermediate",
    codeExample: "// Call stack holds at most N active frames along the deepest DFS path"
  },
  {
    question: "Why is naive recursive Fibonacci inefficient for large $N$ (e.g. $N = 50$)?",
    shortAnswer: "Due to **Overlapping Sub-problems**: Identical sub-problems (like `fib(2)` and `fib(3)`) are recomputed thousands of times redundantly across different branches.",
    explanation: "Overlapping sub-problems in tree recursion.",
    hint: "Recomputes identical sub-problems thousands of times redundantly.",
    level: "basic",
    codeExample: "// In fib(5), fib(3) is computed 2 times, fib(2) is computed 3 times"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what was the return value of `traceFibonacci(4, 0)`?",
    shortAnswer: "$fib(4) = 3$ (sequence: $0, 1, 1, 2, 3$).",
    explanation: "Fibonacci output verification.",
    hint: "3.",
    level: "basic",
    codeExample: "traceFibonacci(4, 0) → 3"
  },
  {
    question: "How does 'Stack Unwinding' assemble the final answer in a binary recursion tree?",
    shortAnswer: "When both left and right base cases return to their parent frame, the parent computes their sum (`left + right`) and returns the combined result to its caller, popping its frame.",
    explanation: "Binary tree stack unwinding process.",
    hint: "Parent frame sums the returns of left and right children and returns up.",
    level: "intermediate",
    codeExample: "int left = fib(n - 1); int right = fib(n - 2); return left + right;"
  },
  {
    question: "What state is saved in the Call Stack when a parent method suspends to invoke its left child?",
    shortAnswer: "The parent's Local Variable Array, return address (pointing to the line after the left call), and intermediate evaluation state remain safely preserved on the stack frame.",
    explanation: "Stack frame suspension mechanics.",
    hint: "Parent's variables and return address are preserved while waiting for child.",
    level: "intermediate",
    codeExample: "// Parent frame remains frozen on stack until child returns"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, how did `calculateTieredScholarship` branch at each tier?",
    shortAnswer: "It split each tier into two sub-problems: 60% Academic Merit and 40% Attendance Merit across recursive depths in Indian Rupees (₹).",
    explanation: "Tiered scholarship multi-branch tree.",
    hint: "Split into 60% academic bonus and 40% attendance bonus.",
    level: "basic",
    codeExample: "calculateTieredScholarship(tier - 1, base * 0.60) + calculateTieredScholarship(tier - 1, base * 0.40)"
  },
  {
    question: "What is the total number of method calls in a full binary recursion tree of depth $N$?",
    shortAnswer: "$2^{N+1} - 1$ total node invocations.",
    explanation: "Full binary tree node count formula.",
    hint: "2^(N+1) - 1 nodes.",
    level: "advanced",
    codeExample: "// Depth 4 tree has up to 2^5 - 1 = 31 node evaluations"
  },
  {
    question: "How does Dynamic Programming (Memoization) optimize a recursive execution tree?",
    shortAnswer: "By storing each computed sub-problem result in a lookup table (e.g. `memo[n]`), pruning all redundant sub-trees so that the execution tree collapses from exponential $O(2^N)$ into a linear graph of $O(N)$ operations.",
    explanation: "Memoization tree pruning concept.",
    hint: "Prunes redundant branches by caching results in a lookup table.",
    level: "intermediate",
    codeExample: "if (memo[n] != 0) return memo[n]; memo[n] = fib(n - 1) + fib(n - 2); return memo[n];"
  },
  {
    question: "What is 'Bottom-Up Tabulation' compared to Top-Down Recursive Trees?",
    shortAnswer: "Top-Down starts at the root ($N$) and divides down to base cases with recursion; Bottom-Up starts at base cases ($0, 1$) and builds up to $N$ iteratively using an array in $O(N)$ time with zero stack frames.",
    explanation: "Top-down recursion vs bottom-up tabulation.",
    hint: "Top-Down divides from N to base; Bottom-Up builds iteratively from base to N.",
    level: "intermediate",
    codeExample: "int[] dp = new int[n + 1]; dp[0] = 0; dp[1] = 1; for (int i = 2; i <= n; i++) dp[i] = dp[i-1] + dp[i-2];"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what was the total scholarship discount computed for Tier 3 on ₹20,000?",
    shortAnswer: "₹1,000.00 base scholarship discount in Indian Rupees (₹).",
    explanation: "Tier 3 scholarship total output verification.",
    hint: "₹1,000.00.",
    level: "basic",
    codeExample: "calculateTieredScholarship(3, 20000.0, 0) → ₹1,000.00"
  },
  {
    question: "Can an execution tree have more than 2 branches per node (Multi-way Tree)?",
    shortAnswer: "YES! Algorithms like the N-Queens problem, Sudoku solver, or Boggle word finder spawn $K$ branches per recursive state.",
    explanation: "K-ary recursive branching trees.",
    hint: "Yes, backtracking algorithms generate K branches per node.",
    level: "intermediate",
    codeExample: "for (int col = 0; col < N; col++) solveNQueens(row + 1, ...);"
  },
  {
    question: "What is 'Backtracking' in the context of recursive trees?",
    shortAnswer: "A tree exploration technique where the method explores a recursive path; if it hits a dead-end, it UNWINDS (backtracks) to the parent node, undoes state changes, and tries the next branch.",
    explanation: "Backtracking algorithm paradigm.",
    hint: "Unwinds back to parent when a path fails to try alternative branches.",
    level: "intermediate",
    codeExample: "board[r][c] = 1; if (solve(r + 1)) return true; board[r][c] = 0; // Backtrack!"
  },
  {
    question: "How can indentation strings (e.g. `\" \".repeat(depth)`) be used to debug recursive trees?",
    shortAnswer: "Indenting each log line by the current recursion depth visually renders the nesting hierarchy in console output, making entry, base cases, and return unwinding crystal clear.",
    explanation: "Visual recursive debugging technique.",
    hint: "Indenting console output by recursion depth visualizes call hierarchy.",
    level: "basic",
    codeExample: "String indent = \"  \".repeat(depth); System.out.println(indent + \"-> Enter: \" + n);"
  },
  {
    question: "What is the height of the execution tree for MergeSort on an array of size $N$?",
    shortAnswer: "$O(\\log_2 N)$ height, because the array is divided in half at each recursive level.",
    explanation: "Divide-and-conquer tree height analysis.",
    hint: "O(log N) tree height.",
    level: "intermediate",
    codeExample: "mergeSort(left); mergeSort(right); // Height = log2(N)"
  },
  {
    question: "What is the total work done at each level of the MergeSort recursion tree?",
    shortAnswer: "$O(N)$ work merging sub-arrays across each level, resulting in total time complexity $O(N \\log N)$.",
    explanation: "Master Theorem / Recursion tree work analysis.",
    hint: "O(N) work per level across log N levels = O(N log N).",
    level: "advanced",
    codeExample: "// N work per level * log2(N) levels = O(N log N)"
  },
  {
    question: "In `traceFibonacci(4, 0)`, how many total times was the base case hit?",
    shortAnswer: "5 times (fib(1) hit 3 times, fib(0) hit 2 times).",
    explanation: "Base case frequency count in fib(4).",
    hint: "5 times total (3 ones and 2 zeros).",
    level: "intermediate",
    codeExample: "fib(4) base cases: fib(1), fib(0), fib(1), fib(1), fib(0)"
  },
  {
    question: "What is a 'Leaf Node' in a recursive execution tree?",
    shortAnswer: "A terminal node in the tree where the Base Case is satisfied and no further child recursive calls are spawned.",
    explanation: "Leaf node definition in recursion trees.",
    hint: "Terminal node where the base case is reached with zero child calls.",
    level: "basic",
    codeExample: "// Leaf nodes correspond to Base Cases in the recursion tree"
  },
  {
    question: "What is an 'Internal Node' in a recursive execution tree?",
    shortAnswer: "A non-terminal node that executes the Recursive Step and spawns one or more child recursive calls.",
    explanation: "Internal node definition in recursion trees.",
    hint: "Non-terminal node that spawns child recursive calls.",
    level: "basic",
    codeExample: "// Internal nodes correspond to Recursive Steps"
  },
  {
    question: "Why does tree recursion naturally fit Tree and Graph Traversal algorithms?",
    shortAnswer: "Because the recursive method's call tree mirrors the actual topology of the data structure being traversed (e.g. left and right subtrees).",
    explanation: "Structural isomorphism between recursion and data structures.",
    hint: "Because the call tree topology matches the data structure hierarchy.",
    level: "intermediate",
    codeExample: "void traverse(Node n) { if (n == null) return; traverse(n.left); traverse(n.right); }"
  },
  {
    question: "What is 'Tail Recursion Elimination' and can it be applied to multi-branch tree recursion?",
    shortAnswer: "Tail Recursion Elimination converts single-tail calls into loops; it CANNOT be directly applied to multi-branch tree recursion because intermediate stack frames must be preserved to compute the remaining branches.",
    explanation: "Tail call elimination limitation on tree recursion.",
    hint: "Cannot be applied directly to tree recursion because multiple branches require stack state.",
    level: "advanced",
    codeExample: "// Binary recursion cannot be directly converted to a simple tail call"
  },
  {
    question: "How can binary tree recursion be converted to an iterative loop?",
    shortAnswer: "By using an explicit `java.util.ArrayDeque` or `Stack` data structure on the Heap to manually manage stack frames and simulation state.",
    explanation: "Explicit heap stack simulation of recursion.",
    hint: "Use an explicit Deque or Stack data structure to simulate stack frames.",
    level: "advanced",
    codeExample: "Deque<Node> stack = new ArrayDeque<>(); stack.push(root);"
  },
  {
    question: "In the Coder & AccoTax Barrackpore system, what were the two child branches in `traceFibonacci(4)`?",
    shortAnswer: "Left branch: `traceFibonacci(3)` and Right branch: `traceFibonacci(2)` in Indian Rupees (₹).",
    explanation: "Fibonacci root children.",
    hint: "traceFibonacci(3) and traceFibonacci(2).",
    level: "basic",
    codeExample: "fib(4) → left: fib(3), right: fib(2)"
  },
  {
    question: "What tool in the Java ecosystem allows profiling recursive execution trees at runtime?",
    shortAnswer: "Java Flight Recorder (JFR) and Java Mission Control (JMC), profiling stack frame depth, method invocation counts, and CPU sampling.",
    explanation: "JVM profiling tooling for recursive stacks.",
    hint: "Java Flight Recorder (JFR) and JMC profiler.",
    level: "advanced",
    codeExample: "java -XX:StartFlightRecording=filename=rec.jfr ..."
  },
  {
    question: "What is the ultimate takeaway of Module 001_007 Topic 14 for Java developers?",
    shortAnswer: "Recursive Execution Trees map the branching structure of recursive calls. The JVM evaluates branches in Depth-First Search (DFS) order, pausing parent frames while child calls execute and unwinding results from leaf base cases.",
    explanation: "Mastery of recursive execution trees.",
    hint: "Trees visualize DFS call flow; parent frames suspend until children unwind from base leaves.",
    level: "basic",
    codeExample: "// Summary: DFS Branching → Leaf Base Case → Stack Unwinding"
  },
  {
    question: "What is the next topic (Topic 15) in Module 001_007?",
    shortAnswer: "StackOverflowError: causes, infinite recursion, and prevention.",
    explanation: "Topic 15 diagnoses StackOverflowError causes, JVM stack limit tuning, and defensive prevention patterns.",
    hint: "StackOverflowError: causes, infinite recursion, and prevention.",
    level: "basic",
    codeExample: "// Topic 15: StackOverflowError Causes & Prevention"
  },
  {
    question: "How does the 'Master Theorem' calculate time complexity from recursive tree equations ($T(N) = aT(N/b) + f(N)$)?",
    shortAnswer: "By comparing the work done at the leaf nodes ($N^{\\log_b a}$) with the work done dividing and combining at the root ($f(N)$).",
    explanation: "Master Theorem theoretical foundation.",
    hint: "Compares leaf node work against root divide/combine work.",
    level: "advanced",
    codeExample: "T(N) = 2T(N/2) + O(N) → O(N log N) by Master Theorem"
  }
];

export default questions;
