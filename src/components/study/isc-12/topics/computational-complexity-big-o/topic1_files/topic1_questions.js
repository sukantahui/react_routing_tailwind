const questions = [
  {
    question: "What is time complexity?",
    shortAnswer: "A measure of the amount of time an algorithm takes to run as a function of input size.",
    explanation: "Time complexity estimates how the runtime scales with input size, independent of hardware. It is usually expressed using Big-O notation.",
    hint: "Think about how the number of operations grows with 'n'.",
    level: "basic",
    codeExample: "// No code needed"
  },
  {
    question: "How does time complexity differ from actual runtime?",
    shortAnswer: "Time complexity is hardware-independent; actual runtime depends on the machine, language, and environment.",
    explanation: "Time complexity is a theoretical measure of efficiency. Actual runtime (in seconds) can vary, but the growth pattern remains consistent.",
    hint: "Consider running the same code on a supercomputer vs a smartphone.",
    level: "basic",
    codeExample: "// Not applicable"
  },
  {
    question: "What does Big-O notation represent?",
    shortAnswer: "It describes the upper bound of an algorithm's time complexity, i.e., the worst-case scenario.",
    explanation: "Big-O gives us a formal way to express the asymptotic behavior of an algorithm as the input size approaches infinity.",
    hint: "It's like setting a ceiling on how slow the algorithm can be.",
    level: "basic",
    codeExample: "// O(n), O(log n), O(n²)"
  },
  {
    question: "Why do we ignore constants in Big-O notation?",
    shortAnswer: "Because constants do not affect the growth rate as input size becomes very large.",
    explanation: "For large 'n', the constant factor becomes negligible compared to the shape of the growth curve (linear, quadratic, etc.).",
    hint: "When n is a million, 2n and 100n are both in the linear family.",
    level: "intermediate",
    codeExample: "// O(2n) simplifies to O(n)"
  },
  {
    question: "What is the time complexity of a simple for loop iterating 'n' times?",
    shortAnswer: "O(n) — linear time.",
    explanation: "The loop runs exactly 'n' iterations, so the number of operations grows linearly with 'n'.",
    hint: "Count the number of times the loop body executes.",
    level: "basic",
    codeExample: "for (int i = 0; i < n; i++) { /* O(1) work */ }"
  },
  {
    question: "What is the time complexity of a nested loop where both loops run 'n' times?",
    shortAnswer: "O(n²) — quadratic time.",
    explanation: "The inner loop runs 'n' times for each of the 'n' outer iterations, resulting in n * n = n² operations.",
    hint: "Multiply the number of iterations of the outer loop by the inner loop.",
    level: "intermediate",
    codeExample: "for (int i=0; i<n; i++) for (int j=0; j<n; j++) { /* O(1) work */ }"
  },
  {
    question: "What is the time complexity of binary search?",
    shortAnswer: "O(log n) — logarithmic time.",
    explanation: "Binary search halves the search space in each step, so the number of steps is proportional to the logarithm of the input size.",
    hint: "How many times can you divide n by 2 until you reach 1?",
    level: "intermediate",
    codeExample: "// Binary search on a sorted array"
  },
  {
    question: "Why is O(1) called constant time?",
    shortAnswer: "Because the algorithm takes the same amount of time regardless of the input size.",
    explanation: "Operations like accessing an array element or performing a basic arithmetic operation are O(1).",
    hint: "Think of any operation that doesn't depend on 'n'.",
    level: "basic",
    codeExample: "int x = arr[5];"
  },
  {
    question: "How do you analyze time complexity for multiple sequential loops?",
    shortAnswer: "You add their complexities. For example, O(n) + O(n) = O(n).",
    explanation: "Sequential loops do not multiply; they add. Only nested loops multiply.",
    hint: "If you do one task and then another, the total time is the sum of the individual times.",
    level: "intermediate",
    codeExample: "// O(n) + O(n) = O(n)"
  },
  {
    question: "What is the significance of the input size 'n' in time complexity?",
    shortAnswer: "It represents the scale of the problem, such as the length of an array or the number of nodes in a graph.",
    explanation: "Time complexity is defined in terms of 'n' because it allows us to express how the algorithm's performance changes with the problem size.",
    hint: "Always define what 'n' means when analyzing complexity.",
    level: "basic",
    codeExample: "// n = arr.length"
  },
  {
    question: "Can an O(n) algorithm ever be slower than an O(1) algorithm in practice?",
    shortAnswer: "Yes, if 'n' is very small or the O(1) algorithm has a very large constant factor.",
    explanation: "Big-O ignores constants. For small inputs, a high-constant O(1) algorithm could be slower than a low-constant O(n) algorithm.",
    hint: "Consider the hidden constants and the actual input size.",
    level: "advanced",
    codeExample: "// Not applicable"
  },
  {
    question: "How do you determine the time complexity of a recursive function?",
    shortAnswer: "By writing and solving a recurrence relation that describes the number of operations.",
    explanation: "Each recursive call contributes to the total time based on the size of the subproblem.",
    hint: "Use techniques like the Master Theorem or recursion trees.",
    level: "intermediate",
    codeExample: "// T(n) = T(n-1) + O(1) => O(n)"
  },
  {
    question: "What is the difference between O(n) and O(log n)?",
    shortAnswer: "O(n) grows linearly with input size, while O(log n) grows very slowly.",
    explanation: "For n = 1,000,000, O(n) does 1,000,000 operations, while O(log n) does about 20 operations.",
    hint: "Compare linear search (O(n)) vs binary search (O(log n)).",
    level: "intermediate",
    codeExample: "// O(n): linear search; O(log n): binary search"
  },
  {
    question: "Why is O(n log n) preferred over O(n²) for sorting large datasets?",
    shortAnswer: "O(n log n) grows much more slowly than O(n²), making it feasible for large n.",
    explanation: "For n = 1,000,000, n log n ≈ 20,000,000, while n² = 1,000,000,000,000. The difference is enormous.",
    hint: "Compare merge sort (O(n log n)) and bubble sort (O(n²)).",
    level: "intermediate",
    codeExample: "// Merge sort is O(n log n)"
  },
  {
    question: "How does time complexity affect database query optimization?",
    shortAnswer: "Database indexes are used to reduce time complexity from O(n) (full table scan) to O(log n) or O(1).",
    explanation: "Proper indexing allows the database to locate data quickly, drastically reducing query time for large tables.",
    hint: "Think about how an index works like the index of a book.",
    level: "advanced",
    codeExample: "// CREATE INDEX idx_name ON table (column);"
  },
  {
    question: "What is the worst-case time complexity?",
    shortAnswer: "The maximum time an algorithm can take for any input of size 'n'.",
    explanation: "It provides an upper bound on the runtime, which is useful for guaranteeing performance.",
    hint: "Consider the input that would make the algorithm work the hardest.",
    level: "intermediate",
    codeExample: "// Linear search worst-case: O(n)"
  },
  {
    question: "What is the average-case time complexity?",
    shortAnswer: "The expected time an algorithm takes over all possible inputs of size 'n'.",
    explanation: "It requires knowing the distribution of inputs. Often more practical than worst-case, but harder to compute.",
    hint: "Think about the average case for quicksort.",
    level: "advanced",
    codeExample: "// Quicksort average: O(n log n)"
  },
  {
    question: "How does time complexity influence algorithmic design?",
    shortAnswer: "It drives the choice of data structures and algorithms to meet performance requirements.",
    explanation: "Engineers often choose a slightly less intuitive algorithm (like merge sort) over a simpler one (like insertion sort) for large datasets due to better complexity.",
    hint: "Designing for performance starts with analyzing time complexity.",
    level: "intermediate",
    codeExample: "// Choosing HashMap (O(1)) over ArrayList (O(n)) for lookups"
  },
  {
    question: "What is the time complexity of matrix multiplication (naive method)?",
    shortAnswer: "O(n³) — cubic time.",
    explanation: "Three nested loops are required to multiply two n x n matrices.",
    hint: "Count the three nested loops.",
    level: "advanced",
    codeExample: "for (i) for (j) for (k) { /* multiplication */ }"
  },
  {
    question: "Can time complexity vary based on input data arrangement?",
    shortAnswer: "Yes, for example, quicksort is O(n log n) on average but O(n²) in the worst case.",
    explanation: "Algorithms like quicksort depend on the pivot selection, which can be affected by the input order.",
    hint: "Consider how sorted data affects quicksort.",
    level: "intermediate",
    codeExample: "// Quicksort worst-case: sorted array with bad pivot"
  },
  {
    question: "What is the time complexity of hash table operations (insert, search, delete)?",
    shortAnswer: "O(1) on average, O(n) in the worst case (when many collisions occur).",
    explanation: "Hash tables offer constant-time operations on average, assuming a good hash function and proper resizing.",
    hint: "Think about how a good hash function distributes keys.",
    level: "intermediate",
    codeExample: "// hashMap.put(key, value);"
  },
  {
    question: "How is time complexity measured in practice?",
    shortAnswer: "By counting the number of elementary operations (like comparisons, arithmetic operations) or using profiling tools.",
    explanation: "In practice, we often combine theoretical analysis with empirical benchmarking to get the full picture.",
    hint: "Use System.nanoTime() in Java to measure runtime.",
    level: "intermediate",
    codeExample: "long start = System.nanoTime(); // ... code ... long end = System.nanoTime();"
  },
  {
    question: "What is the time complexity of the recursive Fibonacci sequence?",
    shortAnswer: "O(2ⁿ) — exponential time (without memoization).",
    explanation: "The recurrence T(n) = T(n-1) + T(n-2) + O(1) solves to O(2ⁿ).",
    hint: "Draw the recursion tree – it has an exponential number of nodes.",
    level: "advanced",
    codeExample: "// fib(n) = fib(n-1) + fib(n-2)"
  },
  {
    question: "What is the time complexity of the iterative Fibonacci sequence?",
    shortAnswer: "O(n) — linear time.",
    explanation: "The iterative version uses a simple loop that runs from 2 to n, performing constant work each time.",
    hint: "Use a loop with variables to store the last two numbers.",
    level: "advanced",
    codeExample: "for (int i = 2; i <= n; i++) { sum = a + b; a = b; b = sum; }"
  },
  {
    question: "How do you analyze the time complexity of a while loop?",
    shortAnswer: "Determine how many times the condition is checked and the loop body executes, based on how the loop variable changes.",
    explanation: "If the loop variable doubles or halves, it's often O(log n). If it increments or decrements linearly, it's O(n).",
    hint: "Observe how the variable changes (i = i * 2, i = i / 2, i = i + 1).",
    level: "intermediate",
    codeExample: "while (i < n) { i = i * 2; } // O(log n)"
  },
  {
    question: "What is the time complexity of the Euclidean algorithm for finding GCD?",
    shortAnswer: "O(log min(a, b)) — logarithmic time.",
    explanation: "Each step of the algorithm replaces (a, b) with (b, a mod b), which reduces the numbers exponentially.",
    hint: "Think about how fast the numbers decrease.",
    level: "advanced",
    codeExample: "// gcd(a, b) = gcd(b, a % b)"
  },
  {
    question: "Why is time complexity crucial for real-time systems?",
    shortAnswer: "Because real-time systems must guarantee a response within strict time limits.",
    explanation: "Predictable time complexity (ideally O(1) or O(log n)) is necessary to meet deadlines in systems like airbags or medical devices.",
    hint: "Consider what happens if a real-time system misses a deadline.",
    level: "intermediate",
    codeExample: "// Not applicable"
  },
  {
    question: "What is the time complexity of sorting in Java using Arrays.sort()?",
    shortAnswer: "O(n log n) — it uses a tuned version of quicksort (Dual-Pivot QuickSort) for primitives and Timsort (hybrid) for objects.",
    explanation: "Both are O(n log n) on average, with Timsort offering O(n) for nearly sorted data.",
    hint: "Check the Java documentation for Arrays.sort.",
    level: "intermediate",
    codeExample: "Arrays.sort(array);"
  },
  {
    question: "How does time complexity help in choosing between ArrayList and LinkedList?",
    shortAnswer: "ArrayList has O(1) access time but O(n) insertion/deletion in the middle. LinkedList has O(n) access but O(1) insertion/deletion at the head.",
    explanation: "The choice depends on the operations you perform most frequently.",
    hint: "If you need fast random access, choose ArrayList. If you frequently add/remove at the beginning, choose LinkedList.",
    level: "advanced",
    codeExample: "// list.get(index); list.add(index, element);"
  },
  {
    question: "What is the time complexity of traversing a binary tree?",
    shortAnswer: "O(n) — linear time, where n is the number of nodes in the tree.",
    explanation: "Each node is visited exactly once during a traversal (in-order, pre-order, post-order).",
    hint: "Count how many times each node is visited.",
    level: "intermediate",
    codeExample: "// traverse(node.left); visit(node); traverse(node.right);"
  }
];

export default questions;