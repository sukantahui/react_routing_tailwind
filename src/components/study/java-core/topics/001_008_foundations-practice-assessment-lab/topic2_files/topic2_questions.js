/**
 * Module 001_008: Topic 2: Algorithmic Problem 2: Palindromic number and String verification
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What is a Palindrome in computer science?",
    shortAnswer: "A sequence of characters or integer digits that reads identically forwards and backwards (e.g. `12321`, `\"racecar\"`, `\"A man, a plan, a canal: Panama\"`).",
    explanation: "Core definition of a palindrome.",
    hint: "Sequence that reads the same forwards and backwards.",
    level: "basic",
    codeExample: "isIntegerPalindrome(12321) -> true"
  },
  {
    question: "Why are negative numbers (e.g. `-121`) never palindromes?",
    shortAnswer: "Because reversing `-121` yields `121-`, where the leading minus sign becomes a trailing minus sign, creating a non-palindromic mismatch.",
    explanation: "Negative integer palindrome rule.",
    hint: "Negative sign makes reversed number invalid (-121 != 121-).",
    level: "basic",
    codeExample: "if (x < 0) return false;"
  },
  {
    question: "Why is reversing ONLY HALF the integer digits superior to reversing the full integer?",
    shortAnswer: "Reversing only the second half completely avoids 32-bit `int` overflow when numbers approach `Integer.MAX_VALUE` ($2.14 \\times 10^9$) and executes in half the loop steps.",
    explanation: "Half-reversal integer palindrome optimization.",
    hint: "Prevents integer overflow by only reversing half the digits.",
    level: "intermediate",
    codeExample: "while (x > reversedHalf) { reversedHalf = reversedHalf * 10 + x % 10; x /= 10; }"
  },
  {
    question: "How do you check parity for odd-length vs even-length integers in half-reversal?",
    shortAnswer: "For even-length: `x == reversedHalf` (e.g. `1221` $\\to$ `x = 12, rev = 12`); for odd-length: `x == reversedHalf / 10` (e.g. `12321` $\\to$ `x = 12, rev = 123`).",
    explanation: "Odd and even parity checks in half-reversal.",
    hint: "Even: x == reversedHalf | Odd: x == reversedHalf / 10.",
    level: "intermediate",
    codeExample: "return (x == reversedHalf) || (x == reversedHalf / 10);"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what was the result of testing `10`?",
    shortAnswer: "`false`, because any positive number ending in 0 (except 0 itself) cannot be a palindrome (reversal of `10` is `01`).",
    explanation: "Trailing zero edge case.",
    hint: "Numbers ending in 0 (except 0) are not palindromes.",
    level: "basic",
    codeExample: "if (x % 10 == 0 && x != 0) return false;"
  },
  {
    question: "What is the Time Complexity of Two-Pointer String Palindrome verification?",
    shortAnswer: "$O(N)$ linear time, where $N$ is the length of the string, as each character is examined at most once.",
    explanation: "Two-pointer time complexity analysis.",
    hint: "O(N) linear time.",
    level: "basic",
    codeExample: "while (left < right) { ... }"
  },
  {
    question: "What is the Space Complexity of the Two-Pointer in-place String verification?",
    shortAnswer: "$O(1)$ constant auxiliary memory space, because pointers iterate over the existing string without allocating new string copies.",
    explanation: "In-place two-pointer space complexity.",
    hint: "O(1) constant auxiliary space.",
    level: "basic",
    codeExample: "int left = 0, right = s.length() - 1; // O(1) space"
  },
  {
    question: "Why should you use `Character.isLetterOrDigit()` when verifying complex phrases?",
    shortAnswer: "To ignore punctuation marks, spaces, symbols, and special characters (e.g. in `\"A man, a plan, a canal: Panama\"`) so only alphanumeric characters are compared.",
    explanation: "Alphanumeric filtering in sentence palindromes.",
    hint: "Skips spaces and punctuation marks to compare only alphanumeric characters.",
    level: "basic",
    codeExample: "while (left < right && !Character.isLetterOrDigit(s.charAt(left))) left++;"
  },
  {
    question: "How is case-insensitivity achieved during character comparison?",
    shortAnswer: "Using `Character.toLowerCase(s.charAt(left)) == Character.toLowerCase(s.charAt(right))`.",
    explanation: "Case-insensitive character comparison.",
    hint: "Convert both characters to lowercase using Character.toLowerCase().",
    level: "basic",
    codeExample: "char l = Character.toLowerCase(s.charAt(left));"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what was the result of testing `\"Barrackpore\"`?",
    shortAnswer: "`false` (not a palindrome).",
    explanation: "String palindrome test output.",
    hint: "False.",
    level: "basic",
    codeExample: "isStringPalindromeTwoPointer(\"Barrackpore\") -> false"
  },
  {
    question: "What are the Base Cases for Recursive String Palindrome verification?",
    shortAnswer: "1. `left >= right` $\\to$ return `true` (pointers have crossed with zero mismatches). 2. `charAt(left) != charAt(right)` $\\to$ return `false` (mismatch found).",
    explanation: "Recursive palindrome base cases.",
    hint: "Pointers meet/cross -> true; mismatch -> false.",
    level: "basic",
    codeExample: "if (left >= right) return true; if (charAt(left) != charAt(right)) return false;"
  },
  {
    question: "What is the Space Complexity of Recursive String Palindrome verification in Java?",
    shortAnswer: "$O(N)$ stack memory space, because each character comparison pushes a new Stack Frame on the Call Stack up to depth $N/2$.",
    explanation: "Stack frame consumption in recursive string verification.",
    hint: "O(N) stack memory proportional to string length.",
    level: "intermediate",
    codeExample: "// Stack depth equals N / 2 frames"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what was the result for `\"Malayalam\"`?",
    shortAnswer: "`true` (verified recursively as a valid case-insensitive palindrome).",
    explanation: "Malayalam palindrome verification.",
    hint: "True.",
    level: "basic",
    codeExample: "isStringPalindromeRecursive(\"Malayalam\", 0, 8) -> true"
  },
  {
    question: "Why is `s.equals(new StringBuilder(s).reverse().toString())` considered suboptimal for large strings?",
    shortAnswer: "Because it allocates a new `StringBuilder`, a new reversed `char[]` array, and a new `String` object on the Heap, consuming $O(N)$ extra memory and creating garbage collection churn compared to $O(1)$ two-pointers.",
    explanation: "StringBuilder reverse memory inefficiency.",
    hint: "Allocates extra heap objects and doubles memory consumption compared to two-pointers.",
    level: "intermediate",
    codeExample: "// Suboptimal: s.equals(new StringBuilder(s).reverse().toString())"
  },
  {
    question: "Is a single character string (e.g. `\"A\"`) or single digit (e.g. `7`) a palindrome?",
    shortAnswer: "YES! Any single character or single digit is trivially a palindrome because it reads identically in both directions.",
    explanation: "Single character trivial palindrome.",
    hint: "Yes, single characters and single digits are trivially palindromes.",
    level: "basic",
    codeExample: "isIntegerPalindrome(7) -> true | isStringPalindromeTwoPointer(\"A\") -> true"
  },
  {
    question: "Is an empty string `\"\"` considered a valid palindrome?",
    shortAnswer: "YES! By standard computer science and LeetCode convention, an empty string reads identically in both directions.",
    explanation: "Empty string palindrome convention.",
    hint: "Yes, empty strings are valid palindromes by convention.",
    level: "basic",
    codeExample: "isStringPalindromeTwoPointer(\"\") -> true"
  },
  {
    question: "What is a 'Palindromic Substring'?",
    shortAnswer: "A contiguous sequence of characters within a string that forms a palindrome (e.g. in `\"babad\"`, `\"aba\"` and `\"bab\"` are palindromic substrings).",
    explanation: "Palindromic substring definition.",
    hint: "A contiguous substring that reads the same forwards and backwards.",
    level: "intermediate",
    codeExample: "// Longest Palindromic Substring algorithm (Expand Around Center / Manacher's)"
  },
  {
    question: "How does the 'Expand Around Center' algorithm find the Longest Palindromic Substring in $O(N^2)$ time?",
    shortAnswer: "For each character (and each adjacent character pair), expand left and right pointers outward as long as characters match, tracking the maximum palindrome length found.",
    explanation: "Expand around center algorithmic mechanics.",
    hint: "Expands outward from 2N - 1 center points as long as characters match.",
    level: "advanced",
    codeExample: "expandAroundCenter(s, i, i); expandAroundCenter(s, i, i + 1);"
  },
  {
    question: "What is Manacher's Algorithm for Longest Palindromic Substring?",
    shortAnswer: "An optimal linear-time algorithm that finds the longest palindromic substring in strict $O(N)$ time by utilizing previously computed palindrome radii to avoid redundant character comparisons.",
    explanation: "Manacher's algorithm linear time complexity.",
    hint: "Optimal O(N) linear time algorithm using palindrome radii symmetry.",
    level: "advanced",
    codeExample: "// Manacher's Algorithm: O(N) time with # padding"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what was the result of testing `1000021`?",
    shortAnswer: "`false` (reversing `1000021` yields `1200001`).",
    explanation: "Non-palindromic number test.",
    hint: "False.",
    level: "basic",
    codeExample: "isIntegerPalindrome(1000021) -> false"
  },
  {
    question: "Can a linked list be checked for palindromic structure in $O(N)$ time and $O(1)$ space?",
    shortAnswer: "YES! Find the middle node using slow/fast pointers, reverse the second half of the linked list in-place, compare the two halves, and restore the list.",
    explanation: "Palindromic linked list verification technique.",
    hint: "Find middle with fast/slow pointers -> reverse second half -> compare.",
    level: "advanced",
    codeExample: "// ListNode fast = head, slow = head; ... reverse(slow);"
  },
  {
    question: "How do you verify if a number is a Palindrome in a specific base $B$ (e.g. binary base 2)?",
    shortAnswer: "Convert the number into base $B$ digits using modulo $B$ and division by $B$, and apply two-pointer verification on the extracted base-$B$ digits.",
    explanation: "Arbitrary base palindrome verification.",
    hint: "Extract base B digits using % B and / B, then compare pointers.",
    level: "intermediate",
    codeExample: "List<Integer> digits = new ArrayList<>(); while (n > 0) { digits.add(n % B); n /= B; }"
  },
  {
    question: "What is 'Valid Palindrome II' (allowing deletion of at most ONE character)?",
    shortAnswer: "When a mismatch `s.charAt(left) != s.charAt(right)` occurs, check if either substring `(left + 1, right)` or `(left, right - 1)` forms a valid palindrome.",
    explanation: "Valid Palindrome II interview problem.",
    hint: "On first mismatch, check if removing left char OR right char creates a palindrome.",
    level: "intermediate",
    codeExample: "return isPal(s, left + 1, right) || isPal(s, left, right - 1);"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what was the result of `\"Was it a car or a cat I saw?\"`?",
    shortAnswer: "`true` (verified as a valid case-insensitive phrase palindrome).",
    explanation: "Phrase palindrome test verification.",
    hint: "True.",
    level: "basic",
    codeExample: "isStringPalindromeTwoPointer(\"Was it a car or a cat I saw?\") -> true"
  },
  {
    question: "How can Bit Manipulation verify if any permutation of a String can form a Palindrome?",
    shortAnswer: "A string can be rearranged into a palindrome if and only if **at most ONE character has an odd frequency count**; track frequencies using an integer bitmask (`mask ^= (1 << (c - 'a'))`) and check `(mask & (mask - 1)) == 0`.",
    explanation: "Bitmask palindrome permutation test.",
    hint: "At most one character can have odd frequency: (bitmask & (bitmask - 1)) == 0.",
    level: "advanced",
    codeExample: "int mask = 0; for (char c : s.toCharArray()) mask ^= (1 << (c - 'a')); return (mask & (mask - 1)) == 0;"
  },
  {
    question: "What happens if you pass `null` to `isStringPalindromeTwoPointer(String s)`?",
    shortAnswer: "Defensive guard `if (s == null) return false;` returns `false` safely without throwing `NullPointerException`.",
    explanation: "Null safety in palindrome verification.",
    hint: "Returns false safely due to null check.",
    level: "basic",
    codeExample: "if (s == null) return false;"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what was the result of testing `123454321`?",
    shortAnswer: "`true` (9-digit odd-length symmetric integer palindrome).",
    explanation: "9-digit palindrome verification.",
    hint: "True.",
    level: "basic",
    codeExample: "isIntegerPalindrome(123454321) -> true"
  },
  {
    question: "What is the ultimate takeaway of Module 001_008 Topic 2 for Java developers?",
    shortAnswer: "Palindrome verification requires two optimal patterns: half-reversal for integers ($O(\\log_{10} N)$ time, $O(1)$ space, zero overflow risk) and two-pointers for strings ($O(N)$ time, $O(1)$ space with alphanumeric filtering).",
    explanation: "Mastery of palindrome verification.",
    hint: "Half-reversal for integers (prevents overflow); Two-pointer for strings (O(1) space).",
    level: "basic",
    codeExample: "// Summary: Half-Reversal (int) & Two-Pointers (String)"
  },
  {
    question: "What is the next topic (Topic 3) in Module 001_008?",
    shortAnswer: "Algorithmic Problem 3: Matrix spiral traversal and 90-degree clockwise rotation.",
    explanation: "Topic 3 explores 2D matrix boundary spiral traversal and in-place 90-degree matrix rotation.",
    hint: "Algorithmic Problem 3: Matrix spiral traversal and 90-degree clockwise rotation.",
    level: "basic",
    codeExample: "// Topic 3: Matrix Spiral Traversal & 90-Degree Rotation"
  },
  {
    question: "How does Java 21 String Templates and Pattern Matching impact character inspection?",
    shortAnswer: "Pattern matching with switch enhances custom character class filtering and Unicode grapheme cluster validations.",
    explanation: "Modern Java string parsing capabilities.",
    hint: "Pattern matching simplifies character classification and Unicode normalization.",
    level: "advanced",
    codeExample: "// Pattern matching and grapheme segmentation for multi-byte Unicode palindromes"
  }
];

export default questions;
