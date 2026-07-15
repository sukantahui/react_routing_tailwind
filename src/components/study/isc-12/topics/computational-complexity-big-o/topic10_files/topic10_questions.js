const questions = [
  {
    question: "What is Big-Ω notation?",
    shortAnswer: "A mathematical notation that describes the lower bound (best-case) of an algorithm's growth rate.",
    explanation: "It gives the minimum time or space complexity, ignoring constants and lower-order terms, as input size approaches infinity.",
    hint: "Think of it as the 'at least' bound.",
    level: "basic",
    codeExample: "// Ω(n), Ω(log n), etc."
  },
  {
    question: "How does Big-Ω differ from Big-O?",
    shortAnswer: "Big-O is upper bound (worst-case), Big-Ω is lower bound (best-case).",
    explanation: "Big-O says 'not slower than', Big-Ω says 'not faster than'.",
    hint: "O = upper, Ω = lower.",
    level: "basic",
    codeExample: "// O(n) worst, Ω(1) best for linear search"
  },
  {
    question: "What does Ω(1) mean?",
    shortAnswer: "The algorithm takes at least constant time in the best case.",
    explanation: "The runtime is bounded below by a constant; it's never faster than that.",
    hint: "Best-case constant.",
    level: "basic",
    codeExample: "// target at first position in linear search"
  },
  {
    question: "Can an algorithm have Ω(n) and O(n²)?",
    shortAnswer: "Yes, if the best-case is linear but worst-case quadratic.",
    explanation: "Example: some algorithms have different best and worst behaviors.",
    hint: "Different bounds.",
    level: "intermediate",
    codeExample: "// quicksort: O(n²) worst, Ω(n log n) best?"
  },
  {
    question: "What is the Ω complexity of binary search?",
    shortAnswer: "Ω(1) — in the best case, the target is at the middle and found immediately.",
    explanation: "The lower bound is constant because the search can terminate after one comparison.",
    hint: "Best case.",
    level: "intermediate",
    codeExample: "// if arr[mid] == target"
  },
  {
    question: "What is the Ω complexity of linear search?",
    shortAnswer: "Ω(1) — the target could be the first element.",
    explanation: "Best case is constant time.",
    hint: "First element.",
    level: "basic",
    codeExample: "// if arr[0] == target"
  },
  {
    question: "What is the Ω complexity of checking if all elements in an array are positive?",
    shortAnswer: "Ω(n) in the worst case if all elements are positive, but Ω(1) if a negative is found early.",
    explanation: "Best case: a negative at position 0 → Ω(1). But if all positive, you must scan all n → Ω(n).",
    hint: "Depends on input.",
    level: "intermediate",
    codeExample: "// check all positive"
  },
  {
    question: "What is the Ω complexity of finding the maximum in an array?",
    shortAnswer: "Ω(n) — you must examine every element to determine the maximum, even in the best case.",
    explanation: "No matter the input, you cannot be sure max without checking all.",
    hint: "Must scan all.",
    level: "intermediate",
    codeExample: "// find max requires O(n) even in best case"
  },
  {
    question: "Can an algorithm be Ω(n) and O(n) simultaneously?",
    shortAnswer: "Yes, that means it is Θ(n) — both upper and lower bounds match.",
    explanation: "When best and worst cases are the same.",
    hint: "Tight bound.",
    level: "intermediate",
    codeExample: "// sum of array: Θ(n)"
  },
  {
    question: "Is Big-Ω used as often as Big-O in practice?",
    shortAnswer: "No, Big-O is more commonly used for worst-case guarantees, but Ω is used for lower-bound proofs.",
    explanation: "In interviews, O is more frequently asked, but Ω appears in theoretical contexts.",
    hint: "Worst-case is more important for real-world.",
    level: "basic",
    codeExample: "// Not as common"
  },
  {
    question: "What is the Ω complexity of merge sort?",
    shortAnswer: "Ω(n log n) — because even in the best case, merge sort does n log n comparisons.",
    explanation: "Merge sort's lower bound is the same as its upper bound, so it's Θ(n log n).",
    hint: "Tight bound.",
    level: "intermediate",
    codeExample: "// merge sort is Θ(n log n)"
  },
  {
    question: "What is the Ω complexity of quicksort?",
    shortAnswer: "Ω(n log n) average, but Ω(n) in the best case if the partition splits evenly?",
    explanation: "Actually quicksort's best case is Ω(n log n) (when pivot always splits evenly), but if the array is already sorted and pivot selection is poor, best is still O(n log n)?",
    hint: "Actually best case for quicksort is O(n log n), but lower bound is Ω(n log n) as well?",
    level: "advanced",
    codeExample: "// quicksort best case Ω(n log n)"
  },
  {
    question: "What is the Ω complexity of bubble sort?",
    shortAnswer: "Ω(n) — when the array is already sorted (with optimization, it can be O(n) best case).",
    explanation: "If the array is sorted, optimized bubble sort runs in O(n), but Ω(n) because you still need to scan once.",
    hint: "Best case sorted.",
    level: "intermediate",
    codeExample: "// optimized bubble sort Ω(n)"
  },
  {
    question: "What is the Ω complexity of insertion sort?",
    shortAnswer: "Ω(n) — when the array is already sorted.",
    explanation: "In the best case, each element is already in place, so only one comparison per element.",
    hint: "Sorted input.",
    level: "intermediate",
    codeExample: "// insertion sort best Ω(n)"
  },
  {
    question: "Does Big-Ω ignore constants like Big-O?",
    shortAnswer: "Yes, constants are ignored in Ω notation as well.",
    explanation: "Ω(2n) = Ω(n).",
    hint: "Same as O.",
    level: "basic",
    codeExample: "// Ω(2n) = Ω(n)"
  },
  {
    question: "What is the Ω complexity of a loop that halves the input each time?",
    shortAnswer: "Ω(log n) if it always runs until halving completes, but if we consider best case maybe Ω(1) if we can break early.",
    explanation: "Generally, a pure halving loop is Ω(log n) because it must run that many steps in all cases.",
    hint: "No early break.",
    level: "intermediate",
    codeExample: "while (n > 1) { n /= 2; } // Ω(log n)"
  },
  {
    question: "Can Ω be equal to O for some algorithms?",
    shortAnswer: "Yes, then we say the algorithm is Θ (Theta) of that bound.",
    explanation: "When the lower and upper bounds match, we use Θ notation.",
    hint: "Tight bound.",
    level: "basic",
    codeExample: "// merge sort Θ(n log n)"
  },
  {
    question: "What is the Ω complexity of counting the number of bits in an integer?",
    shortAnswer: "Ω(log n) — because you need to examine all bits, which is log₂(n) bits.",
    explanation: "The number of bits is proportional to log₂(n), so any algorithm that counts bits must inspect each.",
    hint: "Number of bits.",
    level: "intermediate",
    codeExample: "// while (n > 0) { count++; n >>= 1; }"
  },
  {
    question: "What is the Ω complexity of finding the GCD using the Euclidean algorithm?",
    shortAnswer: "Ω(log min(a,b)) — because the worst-case lower bound is logarithmic, but best case could be Ω(1) if modulo quickly gives 0?",
    explanation: "Actually Euclidean algorithm is Ω(log min(a,b)) in all cases? No, best case can be Ω(1) if a % b == 0 immediately.",
    hint: "Best case when divisible.",
    level: "advanced",
    codeExample: "// if a % b == 0, Ω(1)"
  },
  {
    question: "How does Big-Ω help in proving optimality?",
    shortAnswer: "By showing that no algorithm can solve a problem faster than Ω(g(n)), you prove that O(g(n)) is optimal.",
    explanation: "If you have an algorithm that is O(g(n)) and you prove Ω(g(n)) is a lower bound, then it's optimal.",
    hint: "Lower bound + matching upper = optimal.",
    level: "advanced",
    codeExample: "// sorting lower bound Ω(n log n)"
  },
  {
    question: "What is the Ω complexity of matrix multiplication (naive)?",
    shortAnswer: "Ω(n³) — because you must perform at least n³ multiplications? Actually the lower bound is not proven, but naive is Ω(n³).",
    explanation: "The naive algorithm has Ω(n³) because it performs that many operations for all inputs.",
    hint: "Nested loops.",
    level: "advanced",
    codeExample: "// naive matrix mult Ω(n³)"
  },
  {
    question: "What is the Ω complexity of the Tower of Hanoi?",
    shortAnswer: "Ω(2ⁿ) — because you must perform at least 2ⁿ - 1 moves in all cases.",
    explanation: "The number of moves is exactly 2ⁿ - 1, so it's both Ω and O of 2ⁿ.",
    hint: "Tight bound.",
    level: "advanced",
    codeExample: "// tower of hanoi Θ(2ⁿ)"
  },
  {
    question: "Can an algorithm have Ω(1) and O(1) at the same time?",
    shortAnswer: "Yes, that means it is Θ(1) — constant time in all cases.",
    explanation: "Algorithms like array access are Θ(1).",
    hint: "Constant time.",
    level: "basic",
    codeExample: "// arr[0]"
  },
  {
    question: "Is it possible for an algorithm to have Ω(n²) and O(n)?",
    shortAnswer: "No, because Ω(n²) means it must take at least n² time, but O(n) means at most n time, which would be a contradiction.",
    explanation: "The lower bound cannot be higher than the upper bound.",
    hint: "Logical contradiction.",
    level: "intermediate",
    codeExample: "// impossible"
  },
  {
    question: "What is the Ω complexity of a simple for loop from 0 to n?",
    shortAnswer: "Ω(n) — because the loop always runs n times (no early break).",
    explanation: "It cannot be faster than n iterations.",
    hint: "Fixed loop count.",
    level: "basic",
    codeExample: "for (int i=0; i<n; i++) { ... } // Ω(n)"
  },
  {
    question: "What is the Ω complexity of a for loop that goes from 0 to n but breaks early in best case?",
    shortAnswer: "Ω(1) — if the break condition can be satisfied early (e.g., finding a target at index 0).",
    explanation: "Best case can be constant.",
    hint: "Early break.",
    level: "intermediate",
    codeExample: "// linear search with break"
  },
  {
    question: "How do you determine the Ω of a recursive algorithm?",
    shortAnswer: "Write the recurrence and solve for the lower bound using the same techniques as Big-O, but focusing on the best-case recurrence.",
    explanation: "Sometimes the best-case recurrence differs from worst-case.",
    hint: "Analyze best-case path.",
    level: "advanced",
    codeExample: "// T(n) = T(n/2) + O(1) => Ω(log n)"
  },
  {
    question: "What is the Ω complexity of checking if a number is prime (naive)?",
    shortAnswer: "Ω(√n) — because you must check up to √n in the worst case, but best case could be Ω(1) if n is even (divisible by 2).",
    explanation: "Best case: if n is even (and n>2), immediately false. So Ω(1).",
    hint: "Divisible by 2.",
    level: "advanced",
    codeExample: "// if n%2==0 return false; Ω(1)"
  },
  {
    question: "What is the Ω complexity of the Sieve of Eratosthenes?",
    shortAnswer: "Ω(n log log n) — because it must at least mark multiples of primes up to √n.",
    explanation: "The algorithm has a minimum work that is Θ(n log log n).",
    hint: "Nearly linear.",
    level: "advanced",
    codeExample: "// not Ω(n) but Ω(n log log n)"
  },
  {
    question: "What is the Ω complexity of finding the k-th smallest element in an unsorted array?",
    shortAnswer: "Ω(n) — you must at least examine all elements to know the k-th smallest, even in best case.",
    explanation: "You can't know the answer without seeing all elements, so lower bound is Ω(n).",
    hint: "Must read all.",
    level: "advanced",
    codeExample: "// selection problem Ω(n)"
  },
  {
    question: "What is the Ω complexity of a hash table lookup (average)?",
    shortAnswer: "Ω(1) average, because best case is direct hit (no collision).",
    explanation: "Best case: the key hashes to a bucket with no collision, O(1).",
    hint: "No collisions.",
    level: "intermediate",
    codeExample: "// hashmap get Ω(1) best"
  }
];

export default questions;