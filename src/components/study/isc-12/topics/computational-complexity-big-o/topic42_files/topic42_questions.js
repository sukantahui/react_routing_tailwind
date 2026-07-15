const questions = [
  {
    question: "What is the recurrence for recursive palindrome check (compare ends)?",
    shortAnswer: "T(n) = T(n-2) + O(1), T(0)=T(1)=O(1)",
    explanation: "Each step compares two characters and reduces the problem size by 2.",
    hint: "Reduce by 2.",
    level: "basic",
    codeExample: "// T(n) = T(n-2) + 1"
  },
  {
    question: "What is the time complexity of recursive palindrome check (compare ends)?",
    shortAnswer: "O(n) — linear time.",
    explanation: "The recurrence T(n) = T(n-2) + O(1) solves to O(n).",
    hint: "Linear.",
    level: "basic",
    codeExample: "// O(n)"
  },
  {
    question: "What is the space complexity of recursive palindrome check (compare ends)?",
    shortAnswer: "O(n) — due to the recursion stack (depth = n/2).",
    explanation: "The recursion depth is n/2, so O(n) stack space is used.",
    hint: "Depth = n/2.",
    level: "basic",
    codeExample: "// O(n) space"
  },
  {
    question: "What are the base cases for recursive palindrome check?",
    shortAnswer: "If left >= right → true (empty or single character), if first != last → false.",
    explanation: "The recursion stops when left >= right or characters don't match.",
    hint: "left >= right or mismatch.",
    level: "basic",
    codeExample: "// if (left >= right) return true; if (s[left] != s[right]) return false;"
  },
  {
    question: "How many comparisons does recursive palindrome check make for n characters?",
    shortAnswer: "n/2 comparisons.",
    explanation: "Each recursive call compares one pair of characters.",
    hint: "n/2.",
    level: "basic",
    codeExample: "// ⌊n/2⌋ comparisons"
  },
  {
    question: "How many recursive calls are made for palindrome check of n characters?",
    shortAnswer: "n/2 + 1 calls (including base case).",
    explanation: "Each call processes two characters until left >= right.",
    hint: "n/2 + 1.",
    level: "intermediate",
    codeExample: "// ⌊n/2⌋ + 1 calls"
  },
  {
    question: "What is the recurrence for palindrome check using substring?",
    shortAnswer: "T(n) = T(n-2) + O(n), T(0)=T(1)=O(1) → O(n²).",
    explanation: "substring creates new strings of O(n) size, leading to O(n²).",
    hint: "Substring copies.",
    level: "advanced",
    codeExample: "// T(n) = T(n-2) + n"
  },
  {
    question: "Why is using indices better than substring in recursive palindrome check?",
    shortAnswer: "Because substring creates new strings (O(n) each), leading to O(n²) time.",
    explanation: "Indices only pass integers (O(1) each), keeping the time O(n).",
    hint: "No string creation.",
    level: "intermediate",
    codeExample: "// indices avoid string allocation"
  },
  {
    question: "What is the time complexity of iterative palindrome check (two pointers)?",
    shortAnswer: "O(n) — linear time.",
    explanation: "Each character is compared once.",
    hint: "Linear.",
    level: "basic",
    codeExample: "// O(n)"
  },
  {
    question: "What is the space complexity of iterative palindrome check (two pointers)?",
    shortAnswer: "O(1) — constant space.",
    explanation: "Only two pointers are used.",
    hint: "No stack.",
    level: "basic",
    codeExample: "// O(1) space"
  },
  {
    question: "What is the time complexity of palindrome check by reversing and comparing?",
    shortAnswer: "O(n) — linear time.",
    explanation: "Reversing is O(n) and comparing is O(n).",
    hint: "O(n) + O(n) = O(n).",
    level: "basic",
    codeExample: "// O(n)"
  },
  {
    question: "What is the space complexity of palindrome check by reversing and comparing?",
    shortAnswer: "O(n) — for the reversed string.",
    explanation: "Reversing creates a new string of size n.",
    hint: "Reversed string.",
    level: "basic",
    codeExample: "// O(n) space"
  },
  {
    question: "What is the recurrence for the number of recursive calls in palindrome check?",
    shortAnswer: "C(n) = C(n-2) + 1, C(0)=C(1)=1 → O(n).",
    explanation: "Each call adds one, reducing n by 2.",
    hint: "Linear.",
    level: "intermediate",
    codeExample: "// C(n) = C(n-2) + 1"
  },
  {
    question: "What is the recurrence for the number of comparisons in palindrome check?",
    shortAnswer: "Comp(n) = Comp(n-2) + 1, Comp(0)=Comp(1)=0 → O(n).",
    explanation: "Each call does one comparison.",
    hint: "Linear.",
    level: "intermediate",
    codeExample: "// Comp(n) = Comp(n-2) + 1"
  },
  {
    question: "What is the maximum recursion depth for palindrome check of n characters?",
    shortAnswer: "n/2 (or n/2 + 1 for the base case).",
    explanation: "The depth is the number of recursive calls before reaching the base case.",
    hint: "n/2.",
    level: "intermediate",
    codeExample: "// depth = n/2 + 1"
  },
  {
    question: "Can recursive palindrome check be tail-recursive?",
    shortAnswer: "Yes, with an accumulator or using a helper function, but it's not common.",
    explanation: "Tail recursion can be optimized in some languages.",
    hint: "Accumulator.",
    level: "advanced",
    codeExample: "// tail recursion possible"
  },
  {
    question: "Does Java support tail call optimization for palindrome check?",
    shortAnswer: "No, Java does not support TCO.",
    explanation: "Java compilers do not optimize tail recursion.",
    hint: "Not in Java.",
    level: "advanced",
    codeExample: "// no TCO"
  },
  {
    question: "What is the space complexity of recursive palindrome check without TCO?",
    shortAnswer: "O(n) — still uses stack.",
    explanation: "Without TCO, each call adds a stack frame.",
    hint: "Still O(n).",
    level: "advanced",
    codeExample: "// O(n) without TCO"
  },
  {
    question: "How can you make palindrome check case-insensitive?",
    shortAnswer: "Convert the string to lowercase (or uppercase) before checking.",
    explanation: "Use s.toLowerCase() or Character.toLowerCase() for each comparison.",
    hint: "Normalize case.",
    level: "intermediate",
    codeExample: "// s.toLowerCase()"
  },
  {
    question: "How can you handle spaces and punctuation in palindrome check?",
    shortAnswer: "Filter out non-alphanumeric characters before checking.",
    explanation: "Use s.replaceAll(\"[^a-zA-Z0-9]\", \"\") to remove non-alphanumeric.",
    hint: "Filter input.",
    level: "intermediate",
    codeExample: "// s.replaceAll(\"[^a-zA-Z0-9]\", \"\")"
  },
  {
    question: "What is the classic palindrome phrase example?",
    shortAnswer: "\"A man, a plan, a canal, Panama\".",
    explanation: "When ignoring case and punctuation, it reads the same forward and backward.",
    hint: "Famous palindrome.",
    level: "basic",
    codeExample: "// A man a plan a canal Panama"
  },
  {
    question: "Is an empty string considered a palindrome?",
    shortAnswer: "Yes, by definition, an empty string is a palindrome.",
    explanation: "It reads the same forward and backward.",
    hint: "Empty is palindrome.",
    level: "basic",
    codeExample: "// true"
  },
  {
    question: "Is a single-character string considered a palindrome?",
    shortAnswer: "Yes, a single character is a palindrome.",
    explanation: "It reads the same forward and backward.",
    hint: "Single char is palindrome.",
    level: "basic",
    codeExample: "// true"
  },
  {
    question: "What is the time complexity of checking if a string is a palindrome by comparing first and last characters?",
    shortAnswer: "O(n) — linear time.",
    explanation: "You compare n/2 pairs of characters.",
    hint: "Linear.",
    level: "basic",
    codeExample: "// O(n)"
  },
  {
    question: "What is the space complexity of checking if a string is a palindrome using recursion?",
    shortAnswer: "O(n) — recursion stack.",
    explanation: "The depth is n/2, which is O(n).",
    hint: "O(n).",
    level: "basic",
    codeExample: "// O(n) space"
  },
  {
    question: "What is the recurrence for palindrome check that uses s.substring(1, n-1)?",
    shortAnswer: "T(n) = T(n-2) + O(n), T(0)=T(1)=O(1)",
    explanation: "substring copies O(n) characters each call.",
    hint: "Substring copies.",
    level: "advanced",
    codeExample: "// T(n) = T(n-2) + n"
  },
  {
    question: "What is the time complexity of palindrome check with substring?",
    shortAnswer: "O(n²) — quadratic time.",
    explanation: "Each substring operation copies O(n) characters, and there are n/2 calls.",
    hint: "Quadratic.",
    level: "advanced",
    codeExample: "// O(n²)"
  },
  {
    question: "Can a palindrome check be done in O(1) space iteratively?",
    shortAnswer: "Yes, using two pointers with no extra array.",
    explanation: "Iterative two-pointer uses O(1) extra space.",
    hint: "Two pointers.",
    level: "intermediate",
    codeExample: "// while (left < right) { ... }"
  },
  {
    question: "What is the time complexity of the two-pointer palindrome check?",
    shortAnswer: "O(n) — linear time.",
    explanation: "Each character is compared once.",
    hint: "O(n).",
    level: "basic",
    codeExample: "// O(n)"
  },
  {
    question: "What is the space complexity of the two-pointer palindrome check?",
    shortAnswer: "O(1) — constant space.",
    explanation: "Only two integer pointers are used.",
    hint: "O(1).",
    level: "basic",
    codeExample: "// O(1)"
  },
  {
    question: "What is the recurrence for the number of comparisons in iterative palindrome check?",
    shortAnswer: "Comp(n) = n/2 — exactly half the length.",
    explanation: "Each iteration compares one pair.",
    hint: "n/2.",
    level: "intermediate",
    codeExample: "// n/2 comparisons"
  }
];

export default questions;