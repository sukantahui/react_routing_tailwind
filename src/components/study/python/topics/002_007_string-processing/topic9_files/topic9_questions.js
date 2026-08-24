// src/components/study/python/topics/002_007_string-processing/topic9_files/topic9_questions.js
// Comprehensive Master Review Questions for Topic 9: Common String Processing Algorithms

const questions = [
  {
    question: "What is the optimal algorithm to check if a string is a palindrome while ignoring punctuation, spaces, and case?",
    shortAnswer: "The Two-Pointer Inward Scan algorithm achieves O(N) time complexity with O(1) auxiliary space.",
    explanation: "By placing one pointer at index 0 and another at len(s) - 1, and skipping non-alphanumeric characters inward, you avoid allocating a new reversed copy of the string.",
    hint: "Two pointers scanning inward achieve O(1) space.",
    level: "moderate",
    codeExample: "def is_palindrome(s):\n    l, r = 0, len(s) - 1\n    while l < r:\n        while l < r and not s[l].isalnum(): l += 1\n        while l < r and not s[r].isalnum(): r -= 1\n        if s[l].lower() != s[r].lower(): return False\n        l += 1; r -= 1\n    return True"
  },
  {
    question: "What is the difference in time complexity between checking anagrams via sorting vs collections.Counter?",
    shortAnswer: "Sorting takes O(N log N) time; collections.Counter takes O(N) linear time.",
    explanation: "Sorting both strings requires Timsort (O(N log N)). Building a character frequency hashmap with Counter counts every character in a single linear pass (O(N)).",
    hint: "Sorting is O(N log N); Counter is O(N).",
    level: "basic",
    codeExample: "import collections\n# O(N log N):\nprint(sorted('listen') == sorted('silent'))\n# O(N):\nprint(collections.Counter('listen') == collections.Counter('silent'))"
  },
  {
    question: "How do you group a list of words into clusters of anagrams in Python?",
    shortAnswer: "Use a collections.defaultdict(list) where the key is the sorted character string (canonical key) of each word.",
    explanation: "Words like 'eat', 'tea', and 'ate' all share the same sorted key 'aet', allowing them to be appended into the same bucket in O(N * K log K) time.",
    hint: "Use sorted(word) as the dictionary key.",
    level: "moderate",
    codeExample: "import collections\ndef group_anagrams(words):\n    groups = collections.defaultdict(list)\n    for w in words:\n        groups[''.join(sorted(w))].append(w)\n    return list(groups.values())"
  },
  {
    question: "What is Levenshtein Edit Distance?",
    shortAnswer: "The minimum number of single-character operations (insertions, deletions, substitutions) required to transform one string into another.",
    explanation: "Levenshtein distance is the foundational algorithm for spell checkers, typo-tolerant search bars, and DNA sequence alignment, computed in O(M * N) using 2D Dynamic Programming.",
    hint: "Measures min edits (insert, delete, replace) between strings.",
    level: "moderate",
    codeExample: "# kitten -> sitting (replace k->s, replace e->i, insert g = distance 3)"
  },
  {
    question: "How do you find the first non-repeating (unique) character in a string in O(N) time?",
    shortAnswer: "Count character frequencies using collections.Counter(s), then iterate through the string in order and return the first character with frequency 1.",
    explanation: "The first pass counts frequencies in O(N); the second pass finds the first unique character in original left-to-right order.",
    hint: "Count frequencies in pass 1, find first count==1 in pass 2.",
    level: "moderate",
    codeExample: "import collections\ndef first_unique(s):\n    counts = collections.Counter(s)\n    for ch in s:\n        if counts[ch] == 1:\n            return ch\n    return None\n\nprint(first_unique('swiss'))  # 'w'"
  },
  {
    question: "What is Run-Length Encoding (RLE) and how does it compress strings?",
    shortAnswer: "RLE replaces consecutive repeated characters with the character followed by its repetition count: e.g. 'AAAAABBBCC' -> 'A5B3C2'.",
    explanation: "RLE is a simple, lossless data compression algorithm highly effective on strings with long runs of repeated symbols.",
    hint: "Replaces runs of duplicate characters with char+count.",
    level: "basic",
    codeExample: "def rle_compress(s):\n    if not s: return ''\n    res, cur, count = [], s[0], 1\n    for ch in s[1:]:\n        if ch == cur: count += 1\n        else: res.append(f'{cur}{count}'); cur = ch; count = 1\n    res.append(f'{cur}{count}')\n    return ''.join(res)\n\nprint(rle_compress('AAAAABBBCC'))  # 'A5B3C2'"
  },
  {
    question: "How do you generate word Bigrams and Trigrams in Python?",
    shortAnswer: "[tuple(words[i:i+n]) for i in range(len(words) - n + 1)]",
    explanation: "A sliding window of size n slices the word list to create contiguous n-token tuples.",
    hint: "Use a sliding slice of size n across the list.",
    level: "basic",
    codeExample: "words = ['Python', 'data', 'science', 'pro']\nbigrams = [tuple(words[i:i+2]) for i in range(len(words)-1)]\nprint(bigrams)  # [('Python', 'data'), ('data', 'science'), ('science', 'pro')]"
  },
  {
    question: "How do you convert a string from snake_case to camelCase in Python?",
    shortAnswer: "components = s.split('_'); return components[0] + ''.join(x.title() for x in components[1:])",
    explanation: "Splitting on underscores, keeping the first word lowercase, and capitalizing subsequent components produces camelCase.",
    hint: "Split by underscore and capitalize tail words.",
    level: "basic",
    codeExample: "s = 'student_first_name'\nparts = s.split('_')\nprint(parts[0] + ''.join(x.capitalize() for x in parts[1:]))\n# 'studentFirstName'"
  },
  {
    question: "How do you convert a string from camelCase to snake_case using regex?",
    shortAnswer: "re.sub(r'(?<!^)(?=[A-Z])', '_', s).lower()",
    explanation: "The lookahead (?=[A-Z]) and negative lookbehind (?<!^) insert an underscore before every uppercase letter except at index 0.",
    hint: "Insert '_' before uppercase letters with regex lookahead.",
    level: "moderate",
    codeExample: "import re\nprint(re.sub(r'(?<!^)(?=[A-Z])', '_', 'studentFirstName').lower())\n# 'student_first_name'"
  },
  {
    question: "How does the Caesar Cipher / ROT13 algorithm work in Python?",
    shortAnswer: "It shifts each alphabetic character by N positions (13 for ROT13) in the alphabet using ord() and chr() with modulo 26 arithmetic.",
    explanation: "ROT13 is symmetric: applying ROT13 to an encrypted string decrypts it back to original plaintext because (x + 13 + 13) % 26 == x.",
    hint: "Shift characters using chr((ord(c) - base + shift) % 26 + base).",
    level: "moderate",
    codeExample: "def rot13(text):\n    res = []\n    for c in text:\n        if c.isalpha():\n            base = ord('A') if c.isupper() else ord('a')\n            res.append(chr((ord(c) - base + 13) % 26 + base))\n        else: res.append(c)\n    return ''.join(res)\n\nprint(rot13('Python'))  # 'Clguba'\nprint(rot13('Clguba'))  # 'Python'"
  },
  {
    question: "Why does the slicing palindrome check `s == s[::-1]` consume O(N) auxiliary space?",
    shortAnswer: "Because `s[::-1]` creates a brand new reversed string object in memory containing N characters.",
    explanation: "For short strings, slice reversal is blazing fast in CPython. For massive multi-megabyte strings, the two-pointer approach avoids allocating another copy in RAM.",
    hint: "Reversed slice creates a new string in memory.",
    level: "basic",
    codeExample: "# Slicing creates new object; two-pointer uses pointers in-place"
  },
  {
    question: "How do you find the top 5 most common words in a large text document?",
    shortAnswer: "collections.Counter(re.findall(r'\\b\\w+\\b', text.lower())).most_common(5)",
    explanation: "Regex tokenizes words, lower() normalizes case, and Counter.most_common(5) returns the top 5 (word, frequency) tuples efficiently using a heap.",
    hint: "Use Counter(words).most_common(5).",
    level: "basic",
    codeExample: "import collections, re\nwords = re.findall(r'\\b\\w+\\b', 'Python is great. Python is fast. Python is fun.')\nprint(collections.Counter(words).most_common(2))\n# [('Python', 3), ('is', 3)]"
  },
  {
    question: "What is the time complexity of building collections.Counter(words) vs sorting a word list?",
    shortAnswer: "Counter takes O(N) linear time; sorting takes O(N log N) time.",
    explanation: "Hashing each element into a Counter runs in average O(1) time per word, totaling O(N) for N words.",
    hint: "Counter is O(N); sorting is O(N log N).",
    level: "basic",
    codeExample: "# Counter is significantly faster than sorting for frequency analysis"
  },
  {
    question: "How do you calculate the Lexical Density of a text document?",
    shortAnswer: "(Number of Unique Words / Total Number of Words) * 100",
    explanation: "Lexical density measures vocabulary richness. A higher percentage indicates a richer, more diverse vocabulary.",
    hint: "(len(set(words)) / len(words)) * 100",
    level: "basic",
    codeExample: "words = ['python', 'code', 'python', 'fast']\ndensity = (len(set(words)) / len(words)) * 100\nprint(f'{density:.1f}%')  # '75.0%'"
  },
  {
    question: "How do you decompress a Run-Length Encoded string like 'A5B3C2' using regex?",
    shortAnswer: "''.join(char * int(count) for char, count in re.findall(r'([A-Za-z])(\\d+)', s))",
    explanation: "re.findall captures each character and its associated integer count, allowing direct string multiplication and joining.",
    hint: "Extract (char, count) pairs with regex and multiply.",
    level: "moderate",
    codeExample: "import re\nrle = 'A5B3C2'\nprint(''.join(c * int(n) for c, n in re.findall(r'([A-Za-z])(\\d+)', rle)))\n# 'AAAAABBBCC'"
  },
  {
    question: "What is the base case cost in the Levenshtein Distance dynamic programming matrix?",
    shortAnswer: "Transforming an empty string of length 0 into a string of length N costs N insertions (dp[0][j] = j), and vice versa (dp[i][0] = i).",
    explanation: "Row 0 and Column 0 are initialized to represent the cost of deleting all characters or inserting all characters.",
    hint: "Row 0 = j insertions; Column 0 = i deletions.",
    level: "moderate",
    codeExample: "# dp[i][0] = i, dp[0][j] = j"
  },
  {
    question: "How do you implement a typo-tolerant fuzzy search for a course catalog in Python?",
    shortAnswer: "Iterate through catalog items, calculate Levenshtein distance between query and each title, and return titles with distance <= threshold sorted by distance.",
    explanation: "Fuzzy matching allows users who type 'Pythn' or 'FastApi' to find 'Python Programming' and 'FastAPI Web Development'.",
    hint: "Filter catalog titles by Levenshtein distance <= threshold.",
    level: "moderate",
    codeExample: "# Filters catalog items where levenshtein(query, title) <= 3"
  },
  {
    question: "How do you remove English stop words (like 'the', 'is', 'in') from a word frequency count?",
    shortAnswer: "filtered_words = [w for w in words if w not in STOP_WORDS_SET]",
    explanation: "Filtering against a set of stop words has O(1) membership lookup, stripping noise words before frequency analysis.",
    hint: "Use set membership 'if w not in stop_words'.",
    level: "basic",
    codeExample: "stop_words = {'is', 'the', 'in', 'at'}\nwords = ['python', 'is', 'the', 'best']\nprint([w for w in words if w not in stop_words])  # ['python', 'best']"
  },
  {
    question: "What is an Anagram?",
    shortAnswer: "A word or phrase formed by rearranging the letters of a different word or phrase, using all original letters exactly once.",
    explanation: "For example, 'listen' and 'silent' are anagrams because they contain the exact same multiset of characters.",
    hint: "Rearranging letters of a word to produce another word.",
    level: "basic",
    codeExample: "print(sorted('rail safety') == sorted('fairy tales'))  # True"
  },
  {
    question: "What is a Palindrome?",
    shortAnswer: "A word, phrase, number, or sequence of characters that reads the same forwards and backwards.",
    explanation: "Examples include 'racecar', 'level', and phrases like 'A man, a plan, a canal: Panama!'.",
    hint: "Reads identically forwards and backwards.",
    level: "basic",
    codeExample: "print('racecar' == 'racecar'[::-1])  # True"
  },
  {
    question: "What happens in RLE compression when consecutive characters do NOT repeat (e.g. 'ABCDEF')?",
    shortAnswer: "The compressed output becomes larger than the original: 'A1B1C1D1E1F1' (12 chars vs 6 chars).",
    explanation: "RLE is ineffective on random or non-repeating data. It should only be used when character repetition runs are high.",
    hint: "RLE expands non-repeating text.",
    level: "moderate",
    codeExample: "# 'ABC' -> 'A1B1C1' (Negative compression ratio)"
  },
  {
    question: "How do you check if two strings are anagrams in Python in a single line of code?",
    shortAnswer: "collections.Counter(s1) == collections.Counter(s2)",
    explanation: "Counter automatically builds and compares character frequency dictionaries.",
    hint: "Counter(s1) == Counter(s2)",
    level: "basic",
    codeExample: "from collections import Counter\nprint(Counter('anagram') == Counter('nagaram'))  # True"
  },
  {
    question: "What is the longest palindromic substring algorithm time complexity?",
    shortAnswer: "O(N^2) using center expansion, or O(N) using Manacher's Algorithm.",
    explanation: "Expanding around each potential center takes O(N^2); Manacher's algorithm achieves linear O(N) by exploiting palindrome symmetry.",
    hint: "Center expansion is O(N^2); Manacher's is O(N).",
    level: "complex",
    codeExample: "# Center expansion tests 2N-1 centers"
  },
  {
    question: "How do you count character frequencies in a string using Python built-ins without any imports?",
    shortAnswer: "d = {}; for c in s: d[c] = d.get(c, 0) + 1",
    explanation: "dict.get(c, 0) returns 0 for unseen keys and increments by 1 on each encounter.",
    hint: "Use d[c] = d.get(c, 0) + 1.",
    level: "basic",
    codeExample: "s = 'barrackpore'\nd = {}\nfor c in s:\n    d[c] = d.get(c, 0) + 1\nprint(d['r'])  # 3"
  },
  {
    question: "How do you find the most frequent character in a string in one line?",
    shortAnswer: "max(set(s), key=s.count) or collections.Counter(s).most_common(1)[0][0]",
    explanation: "Counter.most_common(1) is O(N), whereas max with key=s.count is O(N^2) due to repeated count() calls.",
    hint: "Use Counter(s).most_common(1)[0][0] for O(N) performance.",
    level: "moderate",
    codeExample: "from collections import Counter\nprint(Counter('barrackpore').most_common(1)[0])  # ('r', 3)"
  }
];

export default questions;
