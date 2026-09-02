const questions = [
  {
    question: "How is `my_strlen` implemented using pointer traversal in C?",
    shortAnswer: "Loop `while (*str != '\\0') { count++; str++; }` until the null terminator is hit.",
    explanation: "Dereferencing the pointer tests the current character. It returns the accumulated count in O(n) time.",
    hint: "Pointer increment until dereferenced value is '\\0'.",
    level: "basic",
    codeExample: "int my_strlen(const char *s) {\n    int len = 0;\n    while (*s++) len++;\n    return len;\n}"
  },
  {
    question: "How is `my_strcpy` implemented concisely using pointer assignment in a while loop?",
    shortAnswer: "`while ((*dest++ = *src++));`",
    explanation: "Assigns character, tests if the assigned character is non-zero, then increments both pointers until `\\0` is copied.",
    hint: "Classic K&R C idiom: `while ((*d++ = *s++));`.",
    level: "intermediate",
    codeExample: "void my_strcpy(char *d, const char *s) {\n    while ((*d++ = *s++));\n}"
  },
  {
    question: "How do you reverse a string in-place in C without extra memory?",
    shortAnswer: "Initialize two pointers `i = 0` and `j = len - 1`. Swap `str[i]` and `str[j]` while incrementing `i` and decrementing `j`.",
    explanation: "Runs in O(n/2) = O(n) time and O(1) auxiliary space.",
    hint: "Two-pointer swap moving towards center.",
    level: "basic"
  },
  {
    question: "What is the algorithmic condition for a string to be a palindrome?",
    shortAnswer: "The string reads the exact same forwards and backwards (e.g. \"radar\", \"level\").",
    explanation: "For all i from 0 to len / 2: `str[i] == str[len - 1 - i]`.",
    hint: "Symmetric character equality from both ends.",
    level: "basic"
  },
  {
    question: "Why does \"Madam\" fail a case-sensitive palindrome check in C?",
    shortAnswer: "Because 'M' (ASCII 77) is not equal to 'm' (ASCII 109).",
    explanation: "A case-insensitive check must normalize both characters using `tolower()` or `toupper()` before comparing.",
    hint: "ASCII 77 != ASCII 109.",
    level: "basic"
  },
  {
    question: "How do you convert a string to uppercase in-place in C?",
    shortAnswer: "If `str[i] >= 'a' && str[i] <= 'z'`, subtract 32: `str[i] -= 32;`.",
    explanation: "In ASCII, lowercase characters start at 97 ('a') and uppercase at 65 ('A'). The difference is 32.",
    hint: "Subtract 32 from lowercase letters.",
    level: "basic"
  },
  {
    question: "How do you convert a string to lowercase in-place in C?",
    shortAnswer: "If `str[i] >= 'A' && str[i] <= 'Z'`, add 32: `str[i] += 32;`.",
    explanation: "Adding 32 transforms 'A' (65) into 'a' (97).",
    hint: "Add 32 to uppercase letters.",
    level: "basic"
  },
  {
    question: "How do you count the total vowels, consonants, digits, and spaces in a string?",
    shortAnswer: "Iterate through the string and use a `switch` or `if-else` ladder to classify each character.",
    explanation: "Check for 'a','e','i','o','u' (case-insensitive), isdigit(), and isspace().",
    hint: "Character classification loop.",
    level: "basic"
  },
  {
    question: "How do you remove all whitespace characters from a string in-place in O(n)?",
    shortAnswer: "Use two pointers (read pointer `j` and write pointer `i`).",
    explanation: "If `str[j] != ' '`, assign `str[i++] = str[j]`. Finally, append `str[i] = '\\0'`. Runs in single pass.",
    hint: "Two-pointer write filter.",
    level: "intermediate",
    codeExample: "int i = 0;\nfor (int j = 0; str[j] != '\\0'; j++) {\n    if (str[j] != ' ') str[i++] = str[j];\n}\nstr[i] = '\\0';"
  },
  {
    question: "How do you check if two strings are Anagrams (e.g. \"listen\" and \"silent\")?",
    shortAnswer: "Count character frequencies using an array of 26 (or 256) integers.",
    explanation: "Increment counts for string 1 and decrement for string 2. If all frequency counts are 0, they are anagrams.",
    hint: "Frequency count table of 256 bytes.",
    level: "intermediate"
  },
  {
    question: "How do you count the total number of words in a sentence string?",
    shortAnswer: "Count transitions from space to non-space characters using a boolean `inWord` flag.",
    explanation: "Handles multiple consecutive spaces and leading/trailing spaces accurately.",
    hint: "State flag tracking word boundaries.",
    level: "intermediate"
  },
  {
    question: "How do you implement custom `my_strcmp`?",
    shortAnswer: "Compare `*s1` and `*s2`; if different or `\\0` reached, return `(unsigned char)*s1 - (unsigned char)*s2`.",
    explanation: "Advance pointers while `*s1 && (*s1 == *s2)`.",
    hint: "Difference between first mismatching unsigned char.",
    level: "intermediate",
    codeExample: "int my_strcmp(const char *s1, const char *s2) {\n    while (*s1 && (*s1 == *s2)) { s1++; s2++; }\n    return *(unsigned char*)s1 - *(unsigned char*)s2;\n}"
  },
  {
    question: "How do you implement custom `my_strcat`?",
    shortAnswer: "Advance pointer to destination's `\\0`, then copy source characters and append new `\\0`.",
    explanation: "Find tail with `while (*d) d++;`, then `while ((*d++ = *s++));`.",
    hint: "Find '\\0' in dest, then copy src.",
    level: "intermediate"
  },
  {
    question: "How do you reverse individual words in a sentence while keeping word order intact?",
    shortAnswer: "Reverse each word individually by finding space boundaries, then reverse the words in place.",
    explanation: "Track word start and end indices and apply standard two-pointer in-place reversal on each word segment.",
    hint: "Segmented word-by-word reversal.",
    level: "intermediate"
  },
  {
    question: "How do you reverse the entire sentence order (e.g. \"I love C\" -> \"C love I\")?",
    shortAnswer: "Step 1: Reverse the entire string (\"C evol I\"); Step 2: Reverse each individual word (\"C love I\").",
    explanation: "Two-step reversal yields the reversed word sentence in O(n) time and O(1) space.",
    hint: "Reverse entire string, then reverse individual words.",
    level: "advanced"
  },
  {
    question: "How do you implement custom `my_strstr` substring search in C?",
    shortAnswer: "Nested loop comparing substring characters against haystack starting from each index.",
    explanation: "For each position in haystack, verify if subsequent characters match needle until needle's `\\0`.",
    hint: "Brute force substring matching in O(N * M).",
    level: "intermediate",
    codeExample: "char* my_strstr(const char *h, const char *n) {\n    if (!*n) return (char*)h;\n    for (; *h; h++) {\n        const char *h_p = h, *n_p = n;\n        while (*h_p && *n_p && (*h_p == *n_p)) { h_p++; n_p++; }\n        if (!*n_p) return (char*)h;\n    }\n    return NULL;\n}"
  },
  {
    question: "How do you convert an integer to a string (custom `itoa`) in pure C?",
    shortAnswer: "Extract digits using `% 10`, store characters in reverse, and finally reverse the string buffer.",
    explanation: "Handle negative numbers with a sign flag, and zero explicitly.",
    hint: "Modulo 10 digit extraction + reverse buffer.",
    level: "intermediate"
  },
  {
    question: "How do you convert a string of digits to an integer (custom `atoi`) in pure C?",
    shortAnswer: "Iterate characters: `result = result * 10 + (str[i] - '0');`.",
    explanation: "Subtracting `'0'` converts ASCII digit char to numeric int. Handles optional leading '-' sign.",
    hint: "`res = res * 10 + (c - '0')`.",
    level: "basic",
    codeExample: "int my_atoi(const char *s) {\n    int res = 0, sign = 1;\n    if (*s == '-') { sign = -1; s++; }\n    while (*s >= '0' && *s <= '9') { res = res * 10 + (*s++ - '0'); }\n    return res * sign;\n}"
  },
  {
    question: "How do you find the first non-repeating character in a string in O(n) time?",
    shortAnswer: "Count frequencies in a 256-integer array in pass 1; in pass 2, return the first character with count == 1.",
    explanation: "Two linear passes take O(n) time and O(1) space.",
    hint: "256-element frequency lookup in two passes.",
    level: "intermediate"
  },
  {
    question: "How do you compress repeated characters in a string (e.g. \"aaabbc\" -> \"a3b2c1\")?",
    shortAnswer: "Run-length encoding (RLE): Count consecutive matching characters and write character + count.",
    explanation: "Iterate while next char matches current, incrementing count.",
    hint: "Run-length encoding (RLE).",
    level: "intermediate"
  },
  {
    question: "How do you check if a string contains only digits in C?",
    shortAnswer: "Loop through all characters; if any character is `< '0'` or `> '9'`, return 0.",
    explanation: "If loop completes to `\\0`, return 1.",
    hint: "Validate each character in range ['0'..'9'].",
    level: "basic"
  },
  {
    question: "How do you toggle the case of every character in a string (uppercase to lowercase and vice-versa)?",
    shortAnswer: "If uppercase add 32; if lowercase subtract 32; or use bitwise XOR with 32 (`c ^ 32`).",
    explanation: "In ASCII, the 6th bit (value 32) toggles case. `c ^ 32` flips 'A' to 'a' and 'a' to 'A'.",
    hint: "Bitwise XOR with 32 (0x20).",
    level: "advanced"
  },
  {
    question: "How do you replace all occurrences of a character `oldChar` with `newChar` in a string?",
    shortAnswer: "Loop through string; if `str[i] == oldChar`, assign `str[i] = newChar`.",
    explanation: "Modifies characters in-place in O(n) time.",
    hint: "Single-pass character replacement.",
    level: "basic"
  },
  {
    question: "Why is manual pointer traversal often faster than index subscripting `str[i]` in tight loops on older compilers?",
    shortAnswer: "Pointer traversal uses auto-increment instructions without computing `base + i * sizeof(char)` every step.",
    explanation: "Modern optimizers optimize both equally, but pointer traversal remains standard C idiom.",
    hint: "Single pointer increment vs base+offset calculation.",
    level: "advanced"
  },
  {
    question: "What is the danger of writing custom string manipulation functions without handling `\\0` carefully?",
    shortAnswer: "Missing the terminating `\\0` causes all downstream string functions to read out-of-bounds memory.",
    explanation: "Always explicitly set `dest[i] = '\\0'` at the conclusion of every string generating function.",
    hint: "Never forget the final '\\0' assignment.",
    level: "basic"
  }
];

export default questions;
