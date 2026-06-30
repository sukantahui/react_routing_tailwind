const questions = [
  {
    question: "What is the most important factor when comparing algorithms?",
    shortAnswer: "It depends — time complexity, space complexity, constants, and input size all matter.",
    explanation: "The 'best' algorithm depends on the specific context and constraints.",
    hint: "No single answer.",
    level: "basic",
    codeExample: "// Depends on the situation"
  },
  {
    question: "Which is faster: O(n) or O(n log n)?",
    shortAnswer: "O(n) is faster for large n.",
    explanation: "Linear time grows slower than linearithmic time.",
    hint: "Compare growth rates.",
    level: "basic",
    codeExample: "// O(n) < O(n log n)"
  },
  {
    question: "Can an O(n²) algorithm be faster than an O(n log n) algorithm?",
    shortAnswer: "Yes, for small input sizes or when constants in O(n²) are much smaller.",
    explanation: "Big-O ignores constants; in practice, constants matter.",
    hint: "Constants matter.",
    level: "intermediate",
    codeExample: "// For small n, O(n²) can be faster"
  },
  {
    question: "When should you choose quicksort over merge sort?",
    shortAnswer: "When you need in-place sorting and are okay with worst-case O(n²) (rare with random pivot).",
    explanation: "Quicksort is faster on average and uses less memory than merge sort.",
    hint: "In-place vs stable.",
    level: "intermediate",
    codeExample: "// quicksort for speed, merge sort for stability"
  },
  {
    question: "When should you choose merge sort over quicksort?",
    shortAnswer: "When stability is required or guaranteed O(n log n) performance is needed.",
    explanation: "Merge sort is stable and always O(n log n), but uses O(n) space.",
    hint: "Stability and guarantee.",
    level: "intermediate",
    codeExample: "// merge sort for stability"
  },
  {
    question: "Which is more memory efficient: quicksort or merge sort?",
    shortAnswer: "Quicksort uses O(log n) space; merge sort uses O(n) space.",
    explanation: "Quicksort is in-place; merge sort needs a temporary array.",
    hint: "Memory usage.",
    level: "basic",
    codeExample: "// quicksort uses O(log n), merge sort O(n)"
  },
  {
    question: "What is the time complexity of binary search?",
    shortAnswer: "O(log n) — logarithmic time.",
    explanation: "Each step halves the search space.",
    hint: "Halving.",
    level: "basic",
    codeExample: "// O(log n)"
  },
  {
    question: "What is the time complexity of linear search?",
    shortAnswer: "O(n) — linear time.",
    explanation: "Each element is checked one by one.",
    hint: "One by one.",
    level: "basic",
    codeExample: "// O(n)"
  },
  {
    question: "For n=10,000, which is faster: O(n) or O(n²)?",
    shortAnswer: "O(n) is much faster — 10,000 vs 100,000,000 operations.",
    explanation: "The difference is 10,000×.",
    hint: "Huge difference.",
    level: "basic",
    codeExample: "// 10,000 vs 100,000,000"
  },
  {
    question: "What does a 'constant factor' mean in algorithm analysis?",
    shortAnswer: "The fixed number of operations per element, which Big-O ignores.",
    explanation: "An O(n) algorithm could be 2n or 100n operations; both are O(n).",
    hint: "Hidden multiplier.",
    level: "intermediate",
    codeExample: "// O(2n) = O(100n) = O(n)"
  },
  {
    question: "Why is it important to consider the input size when choosing an algorithm?",
    shortAnswer: "Because different algorithms have different growth rates; some work well for small n, others for large n.",
    explanation: "O(n²) is fine for n=100 but terrible for n=1,000,000.",
    hint: "Scale matters.",
    level: "basic",
    codeExample: "// Choose based on n"
  },
  {
    question: "What is the lower bound for comparison-based sorting?",
    shortAnswer: "Ω(n log n).",
    explanation: "No comparison-based sorting algorithm can do better than O(n log n) in the worst case.",
    hint: "Lower bound.",
    level: "advanced",
    codeExample: "// Ω(n log n)"
  },
  {
    question: "Which sorting algorithm is used in Java's Arrays.sort() for primitives?",
    shortAnswer: "Dual-pivot quicksort (for primitives).",
    explanation: "For objects, it uses Timsort (a hybrid of merge sort and insertion sort).",
    hint: "Dual-pivot quicksort.",
    level: "advanced",
    codeExample: "// Arrays.sort(int[]) uses dual-pivot quicksort"
  },
  {
    question: "Which sorting algorithm is used in Java's Collections.sort()?",
    shortAnswer: "Timsort (a hybrid of merge sort and insertion sort).",
    explanation: "Timsort is stable and efficient for real-world data.",
    hint: "Hybrid sort.",
    level: "advanced",
    codeExample: "// Collections.sort() uses Timsort"
  },
  {
    question: "What is the time complexity of Java's Arrays.sort() for objects?",
    shortAnswer: "O(n log n) — uses Timsort.",
    explanation: "Timsort is O(n log n) worst-case and O(n) best-case.",
    hint: "Timsort.",
    level: "advanced",
    codeExample: "// O(n log n)"
  },
  {
    question: "What is the space complexity of Java's Arrays.sort() for primitives?",
    shortAnswer: "O(log n) — quicksort uses recursion stack.",
    explanation: "Quicksort is in-place, so space is O(log n) for the stack.",
    hint: "In-place.",
    level: "advanced",
    codeExample: "// O(log n) space"
  },
  {
    question: "What is the space complexity of Java's Arrays.sort() for objects?",
    shortAnswer: "O(n) — Timsort uses O(n) space.",
    explanation: "Timsort creates temporary arrays for merging.",
    hint: "O(n) space.",
    level: "advanced",
    codeExample: "// O(n) space"
  },
  {
    question: "Can we sort in O(n) time?",
    shortAnswer: "Yes, with non-comparison sorts like counting sort, radix sort.",
    explanation: "Non-comparison sorts can be O(n) under certain conditions.",
    hint: "Non-comparison.",
    level: "advanced",
    codeExample: "// counting sort O(n+k)"
  },
  {
    question: "What is the time complexity of a hash table lookup?",
    shortAnswer: "O(1) average, O(n) worst-case.",
    explanation: "Hash tables are O(1) on average but can degrade to O(n) with collisions.",
    hint: "Average constant.",
    level: "intermediate",
    codeExample: "// map.get(key) — O(1) average"
  },
  {
    question: "What is the time complexity of a TreeMap lookup?",
    shortAnswer: "O(log n) — balanced BST operations.",
    explanation: "TreeMap uses a Red-Black tree.",
    hint: "O(log n).",
    level: "intermediate",
    codeExample: "// treeMap.get(key) — O(log n)"
  },
  {
    question: "What is the trade-off between HashMap and TreeMap?",
    shortAnswer: "HashMap is O(1) average but unordered; TreeMap is O(log n) but sorted.",
    explanation: "Choose HashMap for speed, TreeMap for sorted order.",
    hint: "Speed vs order.",
    level: "intermediate",
    codeExample: "// HashMap: O(1), TreeMap: O(log n)"
  },
  {
    question: "Why is it important to profile your code?",
    shortAnswer: "Because theoretical complexity doesn't always match practical performance.",
    explanation: "Constants, hardware, and data distribution affect real-world performance.",
    hint: "Measure, don't guess.",
    level: "intermediate",
    codeExample: "// Use a profiler"
  },
  {
    question: "What is the best sorting algorithm for small arrays (n < 50)?",
    shortAnswer: "Insertion sort is often fastest for small arrays.",
    explanation: "Low overhead and good cache behavior make insertion sort efficient for small n.",
    hint: "Small arrays.",
    level: "intermediate",
    codeExample: "// insertion sort for small n"
  },
  {
    question: "What is the best sorting algorithm for large arrays (n > 10,000)?",
    shortAnswer: "Quicksort (with random pivot) or merge sort, depending on requirements.",
    explanation: "Both are O(n log n); quicksort is faster on average, merge sort is stable.",
    hint: "Efficient sorting.",
    level: "intermediate",
    codeExample: "// quicksort or merge sort"
  },
  {
    question: "When should you use a linked list over an array?",
    shortAnswer: "When you need frequent insertions/deletions at arbitrary positions.",
    explanation: "Linked lists have O(1) insertion/deletion at known positions.",
    hint: "Frequent insertions.",
    level: "intermediate",
    codeExample: "// linked list for frequent insertions"
  },
  {
    question: "When should you use an array over a linked list?",
    shortAnswer: "When you need fast random access (O(1)) and traversal.",
    explanation: "Arrays have O(1) access by index and better cache locality.",
    hint: "Fast access.",
    level: "intermediate",
    codeExample: "// array for random access"
  },
  {
    question: "What is the time complexity of adding an element to the end of an ArrayList?",
    shortAnswer: "O(1) amortized.",
    explanation: "Most additions are O(1), but occasional resizing is O(n) for n elements.",
    hint: "Amortized constant.",
    level: "intermediate",
    codeExample: "// list.add(element) — O(1) amortized"
  },
  {
    question: "What is the time complexity of adding an element to the beginning of an ArrayList?",
    shortAnswer: "O(n) — because all elements must be shifted.",
    explanation: "Inserting at the front requires shifting all other elements.",
    hint: "Shift needed.",
    level: "intermediate",
    codeExample: "// list.add(0, element) — O(n)"
  },
  {
    question: "What is the time complexity of adding an element to the beginning of a LinkedList?",
    shortAnswer: "O(1) — constant time.",
    explanation: "Linked lists support O(1) insertion at the head.",
    hint: "Constant time.",
    level: "intermediate",
    codeExample: "// list.addFirst(element) — O(1)"
  },
  {
    question: "What is the time complexity of accessing an element in a LinkedList by index?",
    shortAnswer: "O(n) — linear time.",
    explanation: "You must traverse the list from the beginning.",
    hint: "Traversal needed.",
    level: "intermediate",
    codeExample: "// list.get(index) — O(n)"
  },
  {
    question: "What is the time complexity of accessing an element in an ArrayList by index?",
    shortAnswer: "O(1) — constant time.",
    explanation: "Arrays support direct random access.",
    hint: "Direct access.",
    level: "basic",
    codeExample: "// list.get(index) — O(1)"
  }
];

export default questions;