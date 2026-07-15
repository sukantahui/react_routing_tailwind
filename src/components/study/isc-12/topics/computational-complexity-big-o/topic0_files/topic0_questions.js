const questions = [
  {
    question: "What is algorithm analysis?",
    shortAnswer: "It's the study of how an algorithm's runtime and memory usage scale with input size.",
    explanation: "Algorithm analysis evaluates the efficiency of an algorithm independently of hardware, focusing on how resource consumption grows as input size increases.",
    hint: "Think about what happens when you double the number of items.",
    level: "basic",
    codeExample: "// No code needed for conceptual question"
  },
  {
    question: "Why does algorithm analysis matter in real-world applications?",
    shortAnswer: "It helps choose the right algorithm to ensure acceptable performance at scale, saving time and money.",
    explanation: "A poorly chosen algorithm can cause slowdowns, high cloud costs, and poor user experience. Analysis guides design decisions.",
    hint: "Consider a school in Barrackpore with 50,000 students.",
    level: "basic",
    codeExample: "// Real-world: sorting student records"
  },
  {
    question: "What is the difference between O(n) and O(n²) in practice?",
    shortAnswer: "O(n) grows linearly, O(n²) grows quadratically – for large n, O(n²) becomes far slower.",
    explanation: "For n=1000, O(n) takes ~1000 operations, O(n²) ~1,000,000. The gap widens quickly.",
    hint: "Try running the LinearVsQuadratic.java example.",
    level: "basic",
    codeExample: "// See LinearVsQuadratic.java"
  },
  {
    question: "Why is O(log n) considered very efficient?",
    shortAnswer: "Because it grows very slowly – even for huge inputs, the number of operations is tiny.",
    explanation: "For n=1,000,000, log₂(n) ≈ 20. That's why binary search is so fast.",
    hint: "Think about halving the search space each time.",
    level: "basic",
    codeExample: "// Binary search"
  },
  {
    question: "Can an algorithm with O(n) ever be slower than one with O(n²) in practice?",
    shortAnswer: "Yes, if the O(n) algorithm has a very large constant factor and n is small.",
    explanation: "Big-O ignores constants. For n=10, O(n) with a constant 1000 might be slower than O(n²) with constant 1.",
    hint: "Consider the hidden constants.",
    level: "intermediate",
    codeExample: "// Not applicable"
  },
  {
    question: "What is the worst-case time complexity of linear search?",
    shortAnswer: "O(n), because in the worst case you must check every element.",
    explanation: "If the target is at the end or not present, you scan the entire array.",
    hint: "Think about the target being the last element.",
    level: "basic",
    codeExample: "// Linear search loop"
  },
  {
    question: "What is the best-case time complexity of binary search?",
    shortAnswer: "O(1) – the target is found at the middle on the first check.",
    explanation: "In the best case, the first mid element matches the target.",
    hint: "What if the target is exactly at the middle?",
    level: "basic",
    codeExample: "// Binary search first check"
  },
  {
    question: "Why do we ignore constants in Big-O notation?",
    shortAnswer: "To focus on the growth rate as n becomes large, which dominates performance.",
    explanation: "For large n, constant factors become negligible compared to the shape of the curve.",
    hint: "When n is 1 million, 2n and 100n are both in the same order.",
    level: "intermediate",
    codeExample: "// Big-O is about asymptotic behavior"
  },
  {
    question: "What is amortized analysis?",
    shortAnswer: "It averages the cost of operations over a sequence, smoothing out occasional expensive ones.",
    explanation: "Used in data structures like dynamic arrays, where occasional resizing is costly but rare.",
    hint: "Think about adding elements to an ArrayList.",
    level: "advanced",
    codeExample: "// ArrayList add() amortized O(1)"
  },
  {
    question: "How does algorithm analysis help in cloud cost optimization?",
    shortAnswer: "Choosing efficient algorithms reduces CPU time, which directly lowers cloud computing bills.",
    explanation: "Faster algorithms use less energy and fewer compute resources, saving money at scale.",
    hint: "Think about millions of requests per day.",
    level: "intermediate",
    codeExample: "// Not code-specific"
  },
  {
    question: "What is the time complexity of a nested loop where outer runs n times and inner runs m times?",
    shortAnswer: "O(n * m). If m = n, then O(n²).",
    explanation: "The total iterations are the product of the loop counts.",
    hint: "Count how many times the inner body executes.",
    level: "basic",
    codeExample: "for (i=0; i<n; i++) for (j=0; j<m; j++) { ... }"
  },
  {
    question: "Can an algorithm have O(1) space complexity but O(n) time?",
    shortAnswer: "Yes, many algorithms use constant extra space but linear time (e.g., linear search).",
    explanation: "Space complexity measures extra memory, not including input.",
    hint: "Think of in-place algorithms.",
    level: "intermediate",
    codeExample: "// Linear search uses O(1) extra space."
  },
  {
    question: "Why do we prefer O(n log n) over O(n²) for sorting large datasets?",
    shortAnswer: "O(n log n) grows much more slowly than O(n²), making it feasible for large n.",
    explanation: "For n=1e6, n log n ≈ 20e6, while n² = 1e12 – a huge difference.",
    hint: "Compare merge sort vs bubble sort.",
    level: "basic",
    codeExample: "// Merge sort is O(n log n)"
  },
  {
    question: "What is the significance of the Master Theorem?",
    shortAnswer: "It provides a cookbook solution for solving recurrence relations of divide-and-conquer algorithms.",
    explanation: "It gives complexity directly from the recurrence form T(n) = aT(n/b) + f(n).",
    hint: "Used for algorithms like merge sort, binary search.",
    level: "advanced",
    codeExample: "// T(n) = 2T(n/2) + O(n) => O(n log n)"
  },
  {
    question: "How do you analyze the complexity of recursive algorithms?",
    shortAnswer: "By writing and solving a recurrence relation that describes the number of operations.",
    explanation: "Each recursive call contributes to the total time based on the subproblem size.",
    hint: "Draw a recursion tree.",
    level: "intermediate",
    codeExample: "// factorial: T(n) = T(n-1) + O(1) => O(n)"
  },
  {
    question: "What is the difference between Big-O, Big-Ω, and Big-Θ?",
    shortAnswer: "O is upper bound, Ω is lower bound, Θ is tight bound (both upper and lower).",
    explanation: "O describes worst-case, Ω best-case, Θ when both match.",
    hint: "Think of bounds on a function.",
    level: "intermediate",
    codeExample: "// No code"
  },
  {
    question: "Can an algorithm be O(n) and Ω(n) at the same time?",
    shortAnswer: "Yes, that means it is Θ(n) – the complexity is tightly bounded.",
    explanation: "For example, linear search in the worst case is both O(n) and Ω(n).",
    hint: "When best and worst cases are the same.",
    level: "intermediate",
    codeExample: "// Many algorithms have tight bounds."
  },
  {
    question: "What is the time complexity of accessing an element in an array by index?",
    shortAnswer: "O(1) – constant time, because arrays support random access.",
    explanation: "The address is computed directly from the index.",
    hint: "No loop needed.",
    level: "basic",
    codeExample: "arr[i]"
  },
  {
    question: "Why is binary search O(log n) and not O(n)?",
    shortAnswer: "Because each step halves the search space, leading to logarithmic number of steps.",
    explanation: "After k steps, the remaining size is n/2^k. We stop when it's 1, so k = log₂ n.",
    hint: "Count how many times you can divide n by 2.",
    level: "basic",
    codeExample: "// Binary search while loop"
  },
  {
    question: "What is space complexity of merge sort?",
    shortAnswer: "O(n) – it requires auxiliary arrays for merging.",
    explanation: "Merge sort creates temporary arrays during the merge step.",
    hint: "Think about the merging process.",
    level: "intermediate",
    codeExample: "// merge sort uses extra array"
  },
  {
    question: "Can we have an algorithm with O(n) time and O(1) space?",
    shortAnswer: "Yes, many linear-time algorithms use constant extra space (e.g., linear search, summing array).",
    explanation: "They process input in-place without allocating additional structures.",
    hint: "Think of simple loops with a few variables.",
    level: "basic",
    codeExample: "int sum = 0; for (int x : arr) sum += x;"
  },
  {
    question: "What is the complexity of adding an element to the end of a dynamic array (ArrayList)?",
    shortAnswer: "Amortized O(1) – most additions are constant time, occasional resizing is O(n).",
    explanation: "When the array is full, it doubles in size, copying all elements. But this happens rarely, so average is O(1).",
    hint: "Think about the amortized analysis.",
    level: "intermediate",
    codeExample: "list.add(element);"
  },
  {
    question: "Why does quicksort have O(n log n) average but O(n²) worst-case?",
    shortAnswer: "The worst-case occurs when the pivot is always the smallest or largest, causing unbalanced partitions.",
    explanation: "With random or median-of-three pivot selection, the average is O(n log n).",
    hint: "Think about sorted input and choosing first element as pivot.",
    level: "advanced",
    codeExample: "// Quicksort with bad pivot"
  },
  {
    question: "What is the time complexity of the Euclidean algorithm for GCD?",
    shortAnswer: "O(log min(a,b)) – it reduces the problem size quickly.",
    explanation: "Each step replaces (a,b) with (b, a mod b), and the numbers decrease exponentially.",
    hint: "Think about Fibonacci numbers and worst-case performance.",
    level: "advanced",
    codeExample: "// gcd(a,b) = gcd(b, a%b)"
  },
  {
    question: "How does input size affect the choice between O(n²) and O(n log n)?",
    shortAnswer: "For small n, O(n²) may be fine; for large n, O(n log n) is necessary.",
    explanation: "The crossover point depends on constants and implementation.",
    hint: "Measure actual performance for your typical data size.",
    level: "intermediate",
    codeExample: "// Not code-specific"
  },
  {
    question: "What is the significance of the 'log' base in O(log n)?",
    shortAnswer: "The base doesn't matter because it changes the constant factor, which is ignored in Big-O.",
    explanation: "log₂ n = log₁₀ n / log₁₀ 2, and constants are dropped.",
    hint: "Remember the change of base formula.",
    level: "basic",
    codeExample: "// O(log n) is base-independent"
  },
  {
    question: "Can an algorithm have O(1) time complexity?",
    shortAnswer: "Yes, if it takes the same amount of time regardless of input size (e.g., accessing array element).",
    explanation: "Operations like arithmetic, variable assignment, array indexing are O(1).",
    hint: "Think of any operation that doesn't depend on n.",
    level: "basic",
    codeExample: "int x = arr[0];"
  },
  {
    question: "What is the time complexity of a nested loop where inner loop runs from i to n?",
    shortAnswer: "O(n²) – sum of i from 1 to n is n(n+1)/2, which is O(n²).",
    explanation: "This is a classic double loop pattern.",
    hint: "Count total iterations.",
    level: "intermediate",
    codeExample: "for (i=0; i<n; i++) for (j=i; j<n; j++) { ... }"
  },
  {
    question: "Why is it important to consider both time and space complexity?",
    shortAnswer: "Sometimes you have limited memory, so a time-efficient algorithm may not fit.",
    explanation: "Trade-offs exist – you may choose slower but memory-friendly algorithm in embedded systems.",
    hint: "Think of mobile devices or IoT.",
    level: "intermediate",
    codeExample: "// Consider memory constraints"
  },
  {
    question: "What is the complexity of the Tower of Hanoi recursive solution?",
    shortAnswer: "O(2ⁿ) time – it doubles the number of moves with each additional disk.",
    explanation: "The recurrence T(n) = 2T(n-1) + 1 solves to 2ⁿ - 1.",
    hint: "Each disk addition doubles the work.",
    level: "advanced",
    codeExample: "// Tower of Hanoi recursive"
  },
  {
    question: "How do you decide which algorithm to use in practice?",
    shortAnswer: "Consider input size, constraints, available memory, and read/write patterns.",
    explanation: "Often you test with realistic data and choose the one that meets performance goals.",
    hint: "Profile with representative inputs.",
    level: "advanced",
    codeExample: "// Use benchmarking"
  }
];

export default questions;