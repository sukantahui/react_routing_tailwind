const questions = [
  {
    question: "What does O(n) mean in time complexity?",
    shortAnswer: "Linear time — the runtime grows proportionally with the input size.",
    explanation: "If the input size doubles, the runtime roughly doubles.",
    hint: "One operation per element.",
    level: "basic",
    codeExample: "// for (int i=0; i<n; i++) { ... }"
  },
  {
    question: "What is an example of an O(n) algorithm?",
    shortAnswer: "Linear search in an unsorted array.",
    explanation: "You may need to check every element.",
    hint: "Searching without order.",
    level: "basic",
    codeExample: "// linear search"
  },
  {
    question: "What is the time complexity of summing all elements in an array?",
    shortAnswer: "O(n) — linear time.",
    explanation: "You must visit every element to add it to the sum.",
    hint: "One pass.",
    level: "basic",
    codeExample: "int sum = 0; for (int x : arr) sum += x;"
  },
  {
    question: "What is the time complexity of finding the maximum in an unsorted array?",
    shortAnswer: "O(n) — linear time.",
    explanation: "You must check every element to find the maximum.",
    hint: "Check all.",
    level: "basic",
    codeExample: "// find max = O(n)"
  },
  {
    question: "Is linear search O(n) in the worst case?",
    shortAnswer: "Yes, O(n) — when the target is at the end or not present.",
    explanation: "You check all n elements in the worst case.",
    hint: "Worst case.",
    level: "basic",
    codeExample: "// target at last position"
  },
  {
    question: "Is linear search O(1) in the best case?",
    shortAnswer: "Yes, Ω(1) — when the target is the first element.",
    explanation: "Best case is constant time.",
    hint: "First element.",
    level: "basic",
    codeExample: "// target at index 0"
  },
  {
    question: "What is the time complexity of a single loop that runs n times?",
    shortAnswer: "O(n) — linear time (assuming O(1) work inside).",
    explanation: "The loop body executes n times.",
    hint: "One loop.",
    level: "basic",
    codeExample: "for (int i=0; i<n; i++) { ... } // O(n)"
  },
  {
    question: "Can O(n) be considered efficient?",
    shortAnswer: "Yes, O(n) is usually efficient for most applications.",
    explanation: "For datasets up to millions of elements, O(n) is fast.",
    hint: "Acceptable performance.",
    level: "basic",
    codeExample: "// O(n) is often fast enough"
  },
  {
    question: "What is the time complexity of printing all elements of an array?",
    shortAnswer: "O(n) — linear time.",
    explanation: "You print each element once.",
    hint: "Visit all.",
    level: "basic",
    codeExample: "for (int x : arr) System.out.println(x);"
  },
  {
    question: "What is the time complexity of copying an array?",
    shortAnswer: "O(n) — linear time.",
    explanation: "You must copy each element.",
    hint: "Copy each element.",
    level: "basic",
    codeExample: "int[] copy = Arrays.copyOf(arr, arr.length);"
  },
  {
    question: "What is the time complexity of counting occurrences of a value in an array?",
    shortAnswer: "O(n) — linear time.",
    explanation: "You must check every element to count occurrences.",
    hint: "Count all.",
    level: "basic",
    codeExample: "int count = 0; for (int x : arr) if (x == target) count++;"
  },
  {
    question: "Can an O(n) algorithm be slower than an O(log n) algorithm?",
    shortAnswer: "Yes, O(n) is slower than O(log n) for large n.",
    explanation: "O(n) grows faster than O(log n).",
    hint: "Compare growth rates.",
    level: "basic",
    codeExample: "// O(n) > O(log n)"
  },
  {
    question: "Can an O(n) algorithm be faster than an O(1) algorithm?",
    shortAnswer: "Yes, if the O(1) algorithm has a very large constant factor.",
    explanation: "O(1) means constant, but the constant could be 1 million.",
    hint: "Constants matter.",
    level: "intermediate",
    codeExample: "// O(1) with large constant vs O(n) with small constant"
  },
  {
    question: "What is the time complexity of a loop that runs n/2 times?",
    shortAnswer: "O(n) — still linear.",
    explanation: "O(n/2) = O(n) because constants are dropped.",
    hint: "Drop constants.",
    level: "basic",
    codeExample: "for (int i=0; i<n; i+=2) { ... } // O(n)"
  },
  {
    question: "What is the time complexity of a loop that runs n times but has an inner loop that runs a constant number of times?",
    shortAnswer: "O(n) — because the inner loop is constant.",
    explanation: "O(n * constant) = O(n).",
    hint: "Constant inner loop.",
    level: "intermediate",
    codeExample: "for (int i=0; i<n; i++) { for (int j=0; j<10; j++) { ... } } // O(n)"
  },
  {
    question: "What is the time complexity of two sequential loops, each O(n)?",
    shortAnswer: "O(n) — because O(n) + O(n) = O(2n) = O(n).",
    explanation: "Sequential loops add, but constants are dropped.",
    hint: "Add and simplify.",
    level: "basic",
    codeExample: "// O(n) + O(n) = O(n)"
  },
  {
    question: "Can you find the maximum in an unsorted array in O(log n)?",
    shortAnswer: "No, it's impossible without sorting or a different data structure.",
    explanation: "You must check every element to be sure of the maximum.",
    hint: "Lower bound.",
    level: "intermediate",
    codeExample: "// Not possible."
  },
  {
    question: "What is the time complexity of checking if a value exists in a HashSet?",
    shortAnswer: "O(1) average, O(n) worst-case.",
    explanation: "HashSet uses hashing for O(1) average lookup.",
    hint: "Hash table.",
    level: "intermediate",
    codeExample: "set.contains(value);"
  },
  {
    question: "What is the time complexity of converting an array to a list?",
    shortAnswer: "O(n) — you must copy each element.",
    explanation: "Arrays.asList() is O(1), but creating a new ArrayList from an array is O(n).",
    hint: "Copy.",
    level: "intermediate",
    codeExample: "List<Integer> list = new ArrayList<>(Arrays.asList(arr));"
  },
  {
    question: "What is the time complexity of reversing an array?",
    shortAnswer: "O(n) — linear time.",
    explanation: "You swap pairs of elements, which requires O(n/2) operations = O(n).",
    hint: "Swap elements.",
    level: "basic",
    codeExample: "for (int i=0; i<n/2; i++) { swap(arr[i], arr[n-1-i]); }"
  },
  {
    question: "Can an algorithm with O(n) time use O(1) space?",
    shortAnswer: "Yes, many O(n) algorithms use O(1) space (e.g., sum of array).",
    explanation: "Time and space are independent.",
    hint: "In-place operations.",
    level: "intermediate",
    codeExample: "int sum = 0; for (int x : arr) sum += x; // O(n) time, O(1) space"
  },
  {
    question: "What is the time complexity of a recursive function that visits each element once?",
    shortAnswer: "O(n) — if it makes one recursive call per element.",
    explanation: "Example: recursive sum with one call per level.",
    hint: "Linear recursion.",
    level: "intermediate",
    codeExample: "// recursive sum = O(n)"
  },
  {
    question: "What is the time complexity of a loop that runs from 0 to n but has a break statement?",
    shortAnswer: "Worst-case O(n), best-case Ω(1).",
    explanation: "Worst-case is when the break never occurs.",
    hint: "Worst-case.",
    level: "intermediate",
    codeExample: "// break when condition met"
  },
  {
    question: "Can a single loop be O(n²)?",
    shortAnswer: "Yes, if the loop body does O(n) work.",
    explanation: "Even a single loop can be O(n²) if the body itself is O(n).",
    hint: "Work inside.",
    level: "intermediate",
    codeExample: "for (int i=0; i<n; i++) { // O(n) work inside } → O(n²)"
  },
  {
    question: "What is the time complexity of finding the median in an unsorted array (naive)?",
    shortAnswer: "O(n log n) if you sort, or O(n) with selection algorithm.",
    explanation: "Sorting gives O(n log n); quickselect gives O(n) on average.",
    hint: "Selection algorithm.",
    level: "advanced",
    codeExample: "// quickselect O(n) average"
  },
  {
    question: "What is the time complexity of filtering an array using Java Streams?",
    shortAnswer: "O(n) — streams process each element once.",
    explanation: "Stream.filter() visits each element.",
    hint: "Single pass.",
    level: "intermediate",
    codeExample: "arr.stream().filter(x -> x > 0).collect(...); // O(n)"
  },
  {
    question: "What is the time complexity of a while loop that increments by 1?",
    shortAnswer: "O(n) — linear.",
    explanation: "It runs n times.",
    hint: "Simple loop.",
    level: "basic",
    codeExample: "while (i < n) { i++; }"
  },
  {
    question: "What is the time complexity of a while loop that increments by a constant?",
    shortAnswer: "O(n) — linear.",
    explanation: "O(n/c) = O(n) because c is constant.",
    hint: "Constant step.",
    level: "basic",
    codeExample: "while (i < n) { i += 2; }"
  },
  {
    question: "Can you achieve O(1) time to find the maximum in an array with precomputation?",
    shortAnswer: "Yes, if you precompute and store the maximum, it's O(1) to retrieve.",
    explanation: "Precomputation takes O(n) once, then queries are O(1).",
    hint: "Cache the result.",
    level: "intermediate",
    codeExample: "// precompute max = O(n), then get max = O(1)"
  },
  {
    question: "What is the time complexity of a loop that processes only half the elements?",
    shortAnswer: "O(n) — still linear.",
    explanation: "O(n/2) = O(n).",
    hint: "Drop constants.",
    level: "basic",
    codeExample: "for (int i=0; i<n/2; i++) { ... } // O(n)"
  }
];

export default questions;