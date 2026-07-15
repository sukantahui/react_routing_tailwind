const questions = [
  {
    question: "What is Big-Θ notation?",
    shortAnswer: "A tight bound that means the function grows at exactly the same rate as g(n), up to constant factors.",
    explanation: "It requires both an upper bound (O) and a lower bound (Ω) for the same g(n).",
    hint: "Both upper and lower bounds match.",
    level: "basic",
    codeExample: "// Θ(n), Θ(n log n)"
  },
  {
    question: "How does Θ differ from O and Ω?",
    shortAnswer: "O is upper bound, Ω is lower bound, Θ is both (tight bound).",
    explanation: "Θ implies both O and Ω for the same function.",
    hint: "Combines both.",
    level: "basic",
    codeExample: "// O(n) + Ω(n) = Θ(n)"
  },
  {
    question: "Can an algorithm be Θ(n) if it has O(n) and Ω(1)?",
    shortAnswer: "No, because Ω(1) is not the same as Ω(n). Θ requires matching bounds.",
    explanation: "For Θ(n), you need both O(n) and Ω(n).",
    hint: "Bounds must match.",
    level: "intermediate",
    codeExample: "// Linear search: O(n), Ω(1) -> no Θ"
  },
  {
    question: "What is the Θ complexity of merge sort?",
    shortAnswer: "Θ(n log n) — it's the same for best, worst, and average.",
    explanation: "Merge sort always divides and merges in Θ(n log n) time.",
    hint: "All cases equal.",
    level: "intermediate",
    codeExample: "// merge sort is Θ(n log n)"
  },
  {
    question: "What is the Θ complexity of a simple loop from 0 to n-1?",
    shortAnswer: "Θ(n) — because it always runs n times.",
    explanation: "No early break, so both upper and lower bounds are Θ(n).",
    hint: "Fixed iterations.",
    level: "basic",
    codeExample: "for (int i=0; i<n; i++) { ... } // Θ(n)"
  },
  {
    question: "What is the Θ complexity of binary search?",
    shortAnswer: "Θ(log n) for the worst-case, but Θ(1) for the best-case (if target is at middle).",
    explanation: "Overall, binary search does not have a single Θ because best and worst differ.",
    hint: "Depends on case.",
    level: "intermediate",
    codeExample: "// binary search worst Θ(log n), best Θ(1)"
  },
  {
    question: "What is the Θ complexity of finding the maximum in an array?",
    shortAnswer: "Θ(n) — you must check every element in all cases.",
    explanation: "Regardless of input, you need to visit all elements to find the max.",
    hint: "Must scan all.",
    level: "intermediate",
    codeExample: "// find max = Θ(n)"
  },
  {
    question: "Can a function be Θ(1)?",
    shortAnswer: "Yes, if it takes constant time in all cases (e.g., array access).",
    explanation: "O(1) and Ω(1) match.",
    hint: "Constant time.",
    level: "basic",
    codeExample: "// arr[0] = Θ(1)"
  },
  {
    question: "Can an algorithm have Θ(n²) in the worst-case but Θ(n) in best-case?",
    shortAnswer: "Yes, then it does not have a single Θ overall, but has Θ for specific cases.",
    explanation: "For example, insertion sort is Θ(n²) worst, Θ(n) best.",
    hint: "Case-dependent.",
    level: "intermediate",
    codeExample: "// insertion sort"
  },
  {
    question: "What is the Θ complexity of quicksort (average-case)?",
    shortAnswer: "Θ(n log n) on average.",
    explanation: "With good pivot selection, quicksort is Θ(n log n) on average.",
    hint: "Average case.",
    level: "advanced",
    codeExample: "// quicksort avg Θ(n log n)"
  },
  {
    question: "What is the Θ complexity of the Tower of Hanoi?",
    shortAnswer: "Θ(2ⁿ) — because it always performs exactly 2ⁿ - 1 moves.",
    explanation: "Both upper and lower bounds are 2ⁿ.",
    hint: "Tight bound.",
    level: "advanced",
    codeExample: "// tower of hanoi Θ(2ⁿ)"
  },
  {
    question: "Why is Θ considered the most precise asymptotic notation?",
    shortAnswer: "Because it gives both an upper and lower bound that match, providing an exact growth rate.",
    explanation: "It tells you exactly how the algorithm scales, not just a ceiling or floor.",
    hint: "Exact growth.",
    level: "basic",
    codeExample: "// Θ gives the exact rate"
  },
  {
    question: "Is Θ always the best notation to use in interviews?",
    shortAnswer: "Not necessarily; many interviewers focus on O (worst-case) because it's more important for performance.",
    explanation: "Θ is more precise but O is more commonly expected in practical discussions.",
    hint: "Worst-case is often enough.",
    level: "basic",
    codeExample: "// O is more common"
  },
  {
    question: "What is the Θ complexity of checking if a number is even?",
    shortAnswer: "Θ(1) — it's a single operation.",
    explanation: "Constant time in all cases.",
    hint: "O(1) and Ω(1).",
    level: "basic",
    codeExample: "// n % 2 == 0"
  },
  {
    question: "What is the Θ complexity of the naive Fibonacci recursive?",
    shortAnswer: "Θ(2ⁿ) — it's exponential with a fixed base.",
    explanation: "The recurrence T(n) = T(n-1) + T(n-2) gives exactly 2ⁿ growth (with constant factors).",
    hint: "Exact exponential.",
    level: "advanced",
    codeExample: "// naive fib = Θ(2ⁿ)"
  },
  {
    question: "Can we say Θ(n) for linear search?",
    shortAnswer: "No, unless we specify worst-case (then it's Θ(n) for worst-case).",
    explanation: "Overall, linear search is O(n) and Ω(1), so no single Θ exists.",
    hint: "Case-specific.",
    level: "intermediate",
    codeExample: "// linear search worst Θ(n), best Θ(1)"
  },
  {
    question: "What is the Θ complexity of the Sieve of Eratosthenes?",
    shortAnswer: "Θ(n log log n) — it's a tight bound.",
    explanation: "Both upper and lower bounds are n log log n.",
    hint: "Nearly linear.",
    level: "advanced",
    codeExample: "// sieve Θ(n log log n)"
  },
  {
    question: "What is the Θ complexity of insertion sort in the worst case?",
    shortAnswer: "Θ(n²) — because it performs that many operations in the worst case.",
    explanation: "Worst-case (reverse sorted) gives exactly n²/2 comparisons, so Θ(n²).",
    hint: "Worst-case tight.",
    level: "intermediate",
    codeExample: "// insertion sort worst Θ(n²)"
  },
  {
    question: "What is the Θ complexity of insertion sort in the best case?",
    shortAnswer: "Θ(n) — when the array is already sorted.",
    explanation: "Best-case (sorted) gives n comparisons, so Θ(n).",
    hint: "Best-case tight.",
    level: "intermediate",
    codeExample: "// insertion sort best Θ(n)"
  },
  {
    question: "What is the Θ complexity of bubble sort in the worst case?",
    shortAnswer: "Θ(n²) — always n² comparisons in the naive version.",
    explanation: "Naive bubble sort always does n² comparisons, so Θ(n²).",
    hint: "Naive version.",
    level: "intermediate",
    codeExample: "// naive bubble sort Θ(n²)"
  },
  {
    question: "What is the Θ complexity of optimized bubble sort in the best case?",
    shortAnswer: "Θ(n) — if the array is sorted, it makes one pass.",
    explanation: "With early exit optimization, best-case is Θ(n).",
    hint: "Early break.",
    level: "intermediate",
    codeExample: "// optimized bubble sort best Θ(n)"
  },
  {
    question: "What does Θ(n²) mean in practical terms?",
    shortAnswer: "The runtime grows as the square of the input size, with constants ignored.",
    explanation: "Doubling n quadruples the time.",
    hint: "Quadratic growth.",
    level: "basic",
    codeExample: "// time ≈ c * n²"
  },
  {
    question: "Can an algorithm have Θ(n) and Θ(n²) simultaneously?",
    shortAnswer: "No, because Θ is a specific growth rate; it cannot be both.",
    explanation: "An algorithm's growth rate is unique up to constant factors.",
    hint: "Only one Θ.",
    level: "intermediate",
    codeExample: "// impossible"
  },
  {
    question: "What is the Θ complexity of counting the number of bits in an integer?",
    shortAnswer: "Θ(log n) — because the number of bits is log₂(n), and you must examine all.",
    explanation: "Any algorithm that counts bits must inspect all bits, which is Θ(log n).",
    hint: "Number of bits.",
    level: "intermediate",
    codeExample: "while (n > 0) { count++; n >>= 1; } // Θ(log n)"
  },
  {
    question: "What is the Θ complexity of a hash table lookup in the worst case?",
    shortAnswer: "Θ(n) in the worst case (all keys collide).",
    explanation: "If all keys hash to the same bucket, lookup degrades to Θ(n).",
    hint: "Collisions.",
    level: "intermediate",
    codeExample: "// hashmap worst Θ(n)"
  },
  {
    question: "What is the Θ complexity of a hash table lookup in the average case?",
    shortAnswer: "Θ(1) on average, assuming good hash function and load factor.",
    explanation: "Average case is constant time.",
    hint: "Average constant.",
    level: "intermediate",
    codeExample: "// hashmap avg Θ(1)"
  },
  {
    question: "Can Θ be used for average-case analysis?",
    shortAnswer: "Yes, you can say an algorithm has Θ(g(n)) average-case if the average growth is tightly bounded.",
    explanation: "For example, quicksort average is Θ(n log n).",
    hint: "Average-case.",
    level: "advanced",
    codeExample: "// quicksort avg Θ(n log n)"
  },
  {
    question: "What is the Θ complexity of the Euclidean algorithm?",
    shortAnswer: "Θ(log min(a,b)) — it's a tight bound.",
    explanation: "The number of steps is logarithmic in the smaller input.",
    hint: "Tight bound.",
    level: "advanced",
    codeExample: "// gcd(a,b) Θ(log min(a,b))"
  },
  {
    question: "What is the Θ complexity of searching in a balanced BST?",
    shortAnswer: "Θ(log n) for search, insert, delete in the worst case (for balanced trees).",
    explanation: "Balanced BST height is Θ(log n), so operations are Θ(log n).",
    hint: "Balanced tree.",
    level: "intermediate",
    codeExample: "// BST search Θ(log n)"
  },
  {
    question: "What is the Θ complexity of heap sort?",
    shortAnswer: "Θ(n log n) — it's O(n log n) and Ω(n log n).",
    explanation: "Heap sort always performs n log n operations, so tight bound.",
    hint: "All cases.",
    level: "intermediate",
    codeExample: "// heap sort Θ(n log n)"
  },
  {
    question: "What is the Θ complexity of the nested loop where inner runs from i to n?",
    shortAnswer: "Θ(n²) — because total iterations is n(n+1)/2, which is Θ(n²).",
    explanation: "That's still quadratic.",
    hint: "Sum of i.",
    level: "advanced",
    codeExample: "for (i=0; i<n; i++) for (j=i; j<n; j++) { ... } // Θ(n²)"
  }
];

export default questions;