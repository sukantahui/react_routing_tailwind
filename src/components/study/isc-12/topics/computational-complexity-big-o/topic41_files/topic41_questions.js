const questions = [
  {
    question: "What is the recurrence for naive recursive string reversal?",
    shortAnswer: "T(n) = T(n-1) + O(n), T(0)=O(1)",
    explanation: "Each call creates a substring (O(n)) and concatenates (O(n)), leading to O(n) work per level.",
    hint: "Substring and concat.",
    level: "intermediate",
    codeExample: "// reverse(s) = reverse(s.substring(1)) + s.charAt(0)"
  },
  {
    question: "What is the time complexity of naive recursive string reversal?",
    shortAnswer: "O(n²) — quadratic time.",
    explanation: "Each level does O(n) work, and there are n levels, giving O(n²).",
    hint: "Quadratic.",
    level: "intermediate",
    codeExample: "// O(n²)"
  },
  {
    question: "What is the recurrence for efficient recursive string reversal (using swaps)?",
    shortAnswer: "T(n) = T(n-2) + O(1), T(0)=T(1)=O(1)",
    explanation: "Each call swaps two characters and reduces the problem size by 2.",
    hint: "Swap and reduce by 2.",
    level: "intermediate",
    codeExample: "// reverse(arr, left, right) = swap + reverse(arr, left+1, right-1)"
  },
  {
    question: "What is the time complexity of efficient recursive string reversal?",
    shortAnswer: "O(n) — linear time.",
    explanation: "There are n/2 swaps, each O(1), so total O(n).",
    hint: "Linear.",
    level: "basic",
    codeExample: "// O(n)"
  },
  {
    question: "What is the space complexity of recursive string reversal?",
    shortAnswer: "O(n) — due to the recursion stack (depth = n/2 or n).",
    explanation: "The recursion depth is at most n/2 for efficient version, O(n) for naive.",
    hint: "Depth = O(n).",
    level: "basic",
    codeExample: "// O(n) space"
  },
  {
    question: "Why does naive recursive reversal use O(n²) time?",
    shortAnswer: "Because each recursive call creates a new substring (O(n)) and concatenates (O(n)), accumulating to O(n²).",
    explanation: "String concatenation in Java creates a new string each time, copying all characters.",
    hint: "String immutability.",
    level: "intermediate",
    codeExample: "// Each concat copies O(n) characters"
  },
  {
    question: "What is the space complexity of naive recursive reversal?",
    shortAnswer: "O(n) recursion stack + O(n²) total string allocations (but not simultaneous).",
    explanation: "While the stack is O(n), the total number of characters allocated over all calls is O(n²).",
    hint: "String allocations.",
    level: "advanced",
    codeExample: "// O(n²) total character copies"
  },
  {
    question: "What is the base case for recursive string reversal?",
    shortAnswer: "When the string length is 0 or 1, return the string itself.",
    explanation: "Empty or single-character strings are already reversed.",
    hint: "Length ≤ 1.",
    level: "basic",
    codeExample: "// if (s.length() <= 1) return s;"
  },
  {
    question: "How does the efficient recursive reversal avoid O(n²) time?",
    shortAnswer: "By using a character array and swapping in place, avoiding string creation.",
    explanation: "No new strings are created; only array elements are swapped.",
    hint: "In-place swap.",
    level: "intermediate",
    codeExample: "// char[] arr = s.toCharArray(); swap(arr[left], arr[right]);"
  },
  {
    question: "What is the recurrence for efficient reversal in terms of n?",
    shortAnswer: "T(n) = T(n-2) + O(1), which solves to O(n).",
    explanation: "Each step reduces the problem size by 2, so the number of steps is n/2.",
    hint: "Reduce by 2.",
    level: "intermediate",
    codeExample: "// T(n) = T(n-2) + 1"
  },
  {
    question: "Can recursive string reversal be tail-recursive?",
    shortAnswer: "Yes, with an accumulator string, but it's not common.",
    explanation: "Tail recursion can be optimized to O(1) space in some languages.",
    hint: "Accumulator.",
    level: "advanced",
    codeExample: "// reverseTail(s, acc)"
  },
  {
    question: "What is the time complexity of StringBuilder.reverse()?",
    shortAnswer: "O(n) — linear time.",
    explanation: "It reverses the character array in place.",
    hint: "O(n).",
    level: "basic",
    codeExample: "// new StringBuilder(s).reverse()"
  },
  {
    question: "What is the space complexity of StringBuilder.reverse()?",
    shortAnswer: "O(n) — it creates a char array of length n.",
    explanation: "It stores the characters internally in an array.",
    hint: "O(n).",
    level: "basic",
    codeExample: "// O(n) space"
  },
  {
    question: "What is the time complexity of iterative string reversal using two pointers?",
    shortAnswer: "O(n) — linear time.",
    explanation: "Each character is swapped once.",
    hint: "Linear.",
    level: "basic",
    codeExample: "// while (left < right) { swap; left++; right--; }"
  },
  {
    question: "What is the space complexity of iterative string reversal?",
    shortAnswer: "O(n) if using char array, O(1) if using StringBuilder directly? Actually char array is O(n).",
    explanation: "Converting to char array uses O(n) space, but if using StringBuilder, it's O(n) internally.",
    hint: "O(n) for char array.",
    level: "intermediate",
    codeExample: "// char[] arr = s.toCharArray(); // O(n)"
  },
  {
    question: "Can we reverse a string in O(1) extra space recursively?",
    shortAnswer: "Not without tail call optimization; recursion stack uses O(n) space.",
    explanation: "Recursive calls consume stack space proportional to depth.",
    hint: "Stack space.",
    level: "advanced",
    codeExample: "// still O(n) stack"
  },
  {
    question: "What is the difference in time complexity between using substring and using indices?",
    shortAnswer: "substring is O(n) per call (O(n²) total), indices are O(1) per call (O(n) total).",
    explanation: "substring creates new strings; indices just pass integers.",
    hint: "String creation vs integer passing.",
    level: "intermediate",
    codeExample: "// substring O(n), indices O(1)"
  },
  {
    question: "Why is it important to avoid string concatenation in recursive string reversal?",
    shortAnswer: "Because string concatenation creates new strings, leading to O(n²) time.",
    explanation: "Each concatenation copies all characters of the resulting string.",
    hint: "String immutability.",
    level: "basic",
    codeExample: "// s + 'a' creates a new string"
  },
  {
    question: "What is the time complexity of reversing a string using recursion with substring but no concatenation (e.g., using char array)?",
    shortAnswer: "It would be O(n) if you pass char array and indices.",
    explanation: "If you avoid creating new strings, it's O(n).",
    hint: "Use indices.",
    level: "intermediate",
    codeExample: "// reverse(arr, left, right)"
  },
  {
    question: "Can recursion depth for string reversal cause stack overflow?",
    shortAnswer: "Yes, for very long strings (e.g., > 10,000 characters) the recursion depth may exceed the stack limit.",
    explanation: "Depth is O(n) for naive, O(n/2) for efficient; still linear.",
    hint: "Large n.",
    level: "intermediate",
    codeExample: "// StackOverflowError for large strings"
  },
  {
    question: "What is the best way to reverse a string in Java?",
    shortAnswer: "Use StringBuilder.reverse() for simplicity and performance.",
    explanation: "It's O(n) time and uses built-in optimized code.",
    hint: "Built-in method.",
    level: "basic",
    codeExample: "// new StringBuilder(s).reverse().toString()"
  },
  {
    question: "What is the recurrence for recursive reversal that swaps first and last characters?",
    shortAnswer: "T(n) = T(n-2) + O(1), T(0)=T(1)=O(1).",
    explanation: "Each call swaps two characters and recurses on the middle.",
    hint: "Swap and recurse on middle.",
    level: "intermediate",
    codeExample: "// reverse(arr, left, right) = swap + reverse(arr, left+1, right-1)"
  },
  {
    question: "What is the total number of swaps in efficient recursive reversal?",
    shortAnswer: "Floor(n/2) swaps.",
    explanation: "Each swap reduces the problem by 2 characters.",
    hint: "n/2.",
    level: "basic",
    codeExample: "// ⌊n/2⌋ swaps"
  },
  {
    question: "How many recursive calls are made for efficient reversal of n characters?",
    shortAnswer: "⌊n/2⌋ + 1 calls (including base case).",
    explanation: "Each call processes two characters until left >= right.",
    hint: "n/2 + 1.",
    level: "intermediate",
    codeExample: "// ⌊n/2⌋ + 1 calls"
  },
  {
    question: "What is the time complexity of a tail-recursive string reversal with an accumulator?",
    shortAnswer: "O(n) — still linear, but space can be O(1) with TCO.",
    explanation: "The recurrence is T(n) = T(n-1) + O(1) with accumulator.",
    hint: "Linear.",
    level: "advanced",
    codeExample: "// T(n) = T(n-1) + 1"
  },
  {
    question: "Does Java support tail call optimization for recursive string reversal?",
    shortAnswer: "No, Java does not have TCO.",
    explanation: "Java compilers do not optimize tail recursion.",
    hint: "Not in Java.",
    level: "advanced",
    codeExample: "// no TCO"
  },
  {
    question: "What is the space complexity of a tail-recursive reversal without TCO?",
    shortAnswer: "O(n) — still uses stack.",
    explanation: "Without TCO, each call adds a stack frame.",
    hint: "Still O(n).",
    level: "advanced",
    codeExample: "// O(n) without TCO"
  },
  {
    question: "How can you reverse a string in O(1) extra space iteratively?",
    shortAnswer: "Use two pointers and swap characters in place without extra array.",
    explanation: "You can convert to char array (which is O(n) space) or use StringBuilder which internally uses char array.",
    hint: "In-place swap.",
    level: "intermediate",
    codeExample: "// swap characters using two pointers"
  },
  {
    question: "What is the time complexity of reversing a string using recursion with a helper method that swaps characters?",
    shortAnswer: "O(n) — linear time.",
    explanation: "Each character is involved in at most one swap.",
    hint: "Linear.",
    level: "basic",
    codeExample: "// O(n)"
  },
  {
    question: "What is the recurrence for the number of recursive calls in efficient reversal?",
    shortAnswer: "C(n) = C(n-2) + 1, C(0)=C(1)=1 → O(n).",
    explanation: "The number of calls is n/2 + 1.",
    hint: "Linear.",
    level: "intermediate",
    codeExample: "// C(n) = C(n-2) + 1"
  },
  {
    question: "What is the recurrence for the number of swaps in efficient reversal?",
    shortAnswer: "S(n) = S(n-2) + 1, S(0)=S(1)=0 → O(n).",
    explanation: "Each call does one swap, except base cases.",
    hint: "Linear.",
    level: "intermediate",
    codeExample: "// S(n) = S(n-2) + 1"
  }
];

export default questions;