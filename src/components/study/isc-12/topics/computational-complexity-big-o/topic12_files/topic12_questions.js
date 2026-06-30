const questions = [
  {
    question: "What is the worst-case time complexity of linear search?",
    shortAnswer: "O(n) — when the target is at the end or not present.",
    explanation: "In the worst case, you must check every element.",
    hint: "Target not found or at last position.",
    level: "basic",
    codeExample: "// linear search worst O(n)"
  },
  {
    question: "What is the best-case time complexity of linear search?",
    shortAnswer: "Ω(1) — when the target is the first element.",
    explanation: "Best case is constant time.",
    hint: "First element.",
    level: "basic",
    codeExample: "// target at index 0"
  },
  {
    question: "What is the average-case time complexity of linear search?",
    shortAnswer: "Θ(n) on average, assuming uniform distribution.",
    explanation: "The expected number of comparisons is (n+1)/2.",
    hint: "Uniform random input.",
    level: "intermediate",
    codeExample: "// average over all positions"
  },
  {
    question: "What is the worst-case time complexity of quicksort?",
    shortAnswer: "O(n²) — when the pivot is always the smallest or largest element.",
    explanation: "This happens with sorted input and bad pivot selection.",
    hint: "Bad pivot choices.",
    level: "intermediate",
    codeExample: "// quicksort worst O(n²)"
  },
  {
    question: "What is the average-case time complexity of quicksort?",
    shortAnswer: "Θ(n log n) — with good pivot choices (e.g., random).",
    explanation: "Average case is linearithmic.",
    hint: "Random pivot or median-of-three.",
    level: "intermediate",
    codeExample: "// quicksort avg Θ(n log n)"
  },
  {
    question: "What is the best-case time complexity of quicksort?",
    shortAnswer: "Ω(n log n) — when the pivot always divides the array evenly.",
    explanation: "Best case requires perfect partitioning.",
    hint: "Perfect split.",
    level: "intermediate",
    codeExample: "// quicksort best Ω(n log n)"
  },
  {
    question: "Why is worst-case analysis important?",
    shortAnswer: "It provides a performance guarantee that the algorithm will not exceed that bound.",
    explanation: "In critical systems, you need to know the maximum time.",
    hint: "Guarantee.",
    level: "basic",
    codeExample: "// safety-critical systems"
  },
  {
    question: "Why is average-case analysis often more practical?",
    shortAnswer: "Because typical inputs are closer to average than worst-case.",
    explanation: "Worst-case inputs may be rare, so average gives a better picture of expected performance.",
    hint: "Typical input.",
    level: "intermediate",
    codeExample: "// typical usage"
  },
  {
    question: "What does it mean for an algorithm to be Θ(n log n) in the average case?",
    shortAnswer: "That the average runtime grows as n log n, up to constant factors.",
    explanation: "It's tightly bounded in the average case.",
    hint: "Tight bound on average.",
    level: "intermediate",
    codeExample: "// quicksort average Θ(n log n)"
  },
  {
    question: "Can an algorithm have the same complexity for best, worst, and average?",
    shortAnswer: "Yes, then it is Θ(g(n)) for all cases (e.g., merge sort).",
    explanation: "Merge sort is Θ(n log n) in all cases.",
    hint: "All cases equal.",
    level: "intermediate",
    codeExample: "// merge sort Θ(n log n)"
  },
  {
    question: "What is the worst-case time complexity of binary search?",
    shortAnswer: "O(log n) — it's logarithmic in the worst case.",
    explanation: "Binary search always halves the search space.",
    hint: "Halving.",
    level: "basic",
    codeExample: "// binary search worst O(log n)"
  },
  {
    question: "What is the best-case time complexity of binary search?",
    shortAnswer: "Ω(1) — when the target is at the middle.",
    explanation: "Best case is constant.",
    hint: "Middle element.",
    level: "basic",
    codeExample: "// target at mid"
  },
  {
    question: "What is the average-case time complexity of binary search?",
    shortAnswer: "Θ(log n) — average is logarithmic as well.",
    explanation: "On average, binary search examines about log₂(n) elements.",
    hint: "Logarithmic average.",
    level: "intermediate",
    codeExample: "// binary search avg Θ(log n)"
  },
  {
    question: "What is the worst-case time complexity of insertion sort?",
    shortAnswer: "O(n²) — when the array is reverse sorted.",
    explanation: "Each element must be shifted to the beginning.",
    hint: "Reverse sorted.",
    level: "intermediate",
    codeExample: "// insertion sort worst O(n²)"
  },
  {
    question: "What is the best-case time complexity of insertion sort?",
    shortAnswer: "Ω(n) — when the array is already sorted.",
    explanation: "Each element is already in place, so one comparison each.",
    hint: "Sorted input.",
    level: "intermediate",
    codeExample: "// insertion sort best Ω(n)"
  },
  {
    question: "What is the average-case time complexity of insertion sort?",
    shortAnswer: "Θ(n²) — average is quadratic.",
    explanation: "On average, about half the elements must be shifted.",
    hint: "Average quadratic.",
    level: "intermediate",
    codeExample: "// insertion sort avg Θ(n²)"
  },
  {
    question: "What is the worst-case time complexity of merge sort?",
    shortAnswer: "Θ(n log n) — merge sort is always linearithmic.",
    explanation: "Merge sort consistently divides and merges.",
    hint: "Always.",
    level: "intermediate",
    codeExample: "// merge sort worst Θ(n log n)"
  },
  {
    question: "What is the average-case time complexity of merge sort?",
    shortAnswer: "Θ(n log n) — same as worst and best.",
    explanation: "It's Θ(n log n) in all cases.",
    hint: "All cases.",
    level: "intermediate",
    codeExample: "// merge sort avg Θ(n log n)"
  },
  {
    question: "What is the worst-case time complexity of heap sort?",
    shortAnswer: "Θ(n log n) — heap sort is always linearithmic.",
    explanation: "Heap sort has Θ(n log n) in all cases.",
    hint: "All cases.",
    level: "intermediate",
    codeExample: "// heap sort worst Θ(n log n)"
  },
  {
    question: "What is the average-case time complexity of heap sort?",
    shortAnswer: "Θ(n log n) — same.",
    explanation: "Heap sort is Θ(n log n) all around.",
    hint: "All cases.",
    level: "intermediate",
    codeExample: "// heap sort avg Θ(n log n)"
  },
  {
    question: "What is the worst-case time complexity of bubble sort (naive)?",
    shortAnswer: "Θ(n²) — always n² comparisons.",
    explanation: "Naive bubble sort always does n² comparisons.",
    hint: "No early break.",
    level: "intermediate",
    codeExample: "// naive bubble sort Θ(n²)"
  },
  {
    question: "What is the best-case time complexity of optimized bubble sort?",
    shortAnswer: "Ω(n) — when the array is already sorted and optimization is used.",
    explanation: "With early exit, it makes one pass.",
    hint: "Early break.",
    level: "intermediate",
    codeExample: "// optimized bubble sort best Ω(n)"
  },
  {
    question: "What is the average-case time complexity of optimized bubble sort?",
    shortAnswer: "Θ(n²) — still quadratic on average.",
    explanation: "Even with optimization, average is still O(n²).",
    hint: "Still slow.",
    level: "intermediate",
    codeExample: "// optimized bubble sort avg Θ(n²)"
  },
  {
    question: "Why do we often ignore best-case complexity?",
    shortAnswer: "Because it's rarely representative of typical or guaranteed performance.",
    explanation: "Best-case is often too optimistic.",
    hint: "Not useful for guarantees.",
    level: "basic",
    codeExample: "// marketing often uses best-case"
  },
  {
    question: "What is the worst-case time complexity of hash table lookup?",
    shortAnswer: "O(n) — when all keys collide.",
    explanation: "If many keys hash to the same bucket, lookup degrades to linear.",
    hint: "Collisions.",
    level: "intermediate",
    codeExample: "// hashmap worst O(n)"
  },
  {
    question: "What is the average-case time complexity of hash table lookup?",
    shortAnswer: "Θ(1) — assuming a good hash function and low load factor.",
    explanation: "Average case is constant time.",
    hint: "Good hash.",
    level: "intermediate",
    codeExample: "// hashmap avg Θ(1)"
  },
  {
    question: "What is the best-case time complexity of hash table lookup?",
    shortAnswer: "Θ(1) — same as average in best case.",
    explanation: "Best case is also constant.",
    hint: "No collisions.",
    level: "intermediate",
    codeExample: "// hashmap best Θ(1)"
  },
  {
    question: "What is the worst-case time complexity of the Euclidean algorithm?",
    shortAnswer: "O(log min(a,b)) — but it's actually Θ(log min(a,b)) in worst case?",
    explanation: "The number of steps is bounded by log of the smaller number.",
    hint: "Logarithmic worst.",
    level: "advanced",
    codeExample: "// gcd(a,b) O(log min(a,b))"
  },
  {
    question: "What is the average-case time complexity of the Euclidean algorithm?",
    shortAnswer: "Θ(log min(a,b)) — same as worst on average.",
    explanation: "It's logarithmic on average as well.",
    hint: "Average logarithmic.",
    level: "advanced",
    codeExample: "// gcd avg Θ(log min(a,b))"
  },
  {
    question: "What is the best-case time complexity of the Euclidean algorithm?",
    shortAnswer: "Ω(1) — when one number divides the other (a % b == 0).",
    explanation: "Best case is constant.",
    hint: "Divisible.",
    level: "advanced",
    codeExample: "// gcd best Ω(1)"
  },
  {
    question: "How do you decide which case to use in practice?",
    shortAnswer: "Use worst-case for guarantees, average-case for typical performance, and best-case for lower bounds.",
    explanation: "The choice depends on the application and the risk tolerance.",
    hint: "Application dependent.",
    level: "intermediate",
    codeExample: "// depends on requirements"
  }
];

export default questions;