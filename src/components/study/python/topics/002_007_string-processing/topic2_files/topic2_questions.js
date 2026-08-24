// src/components/study/python/topics/002_007_string-processing/topic2_files/topic2_questions.js
// Comprehensive Master Review Questions for Topic 2: Indexing, Slicing, Step Slicing & Reversing Strings

const questions = [
  {
    question: "What is zero-based indexing in Python strings?",
    shortAnswer: "The first character of a string is at index 0, the second at 1, and the last at len(s) - 1.",
    explanation: "Python uses 0-based indexing for all sequence data types (strings, lists, tuples). For a string with length N, valid positive indices range from 0 to N - 1.",
    hint: "Counting starts at 0, not 1.",
    level: "basic",
    codeExample: "s = 'PYTHON'\nprint(s[0])  # 'P'\nprint(s[5])  # 'N'\nprint(len(s)) # 6"
  },
  {
    question: "How does negative indexing work in Python strings?",
    shortAnswer: "Negative indices access elements from right to left, starting at -1 for the last character and -len(s) for the first.",
    explanation: "Negative index -k refers to the character at position len(s) - k. For instance, in 'KOLKATA' (len=7), s[-1] is 'A' and s[-7] is 'K'.",
    hint: "Index -1 is the last character.",
    level: "basic",
    codeExample: "s = 'KOLKATA'\nprint(s[-1])  # 'A'\nprint(s[-2])  # 'T'\nprint(s[-7])  # 'K'"
  },
  {
    question: "Does Python have a distinct 'char' or 'character' data type?",
    shortAnswer: "No, indexing a single character in Python returns a string of length 1 (str).",
    explanation: "Unlike C, C++, or Java, Python does not have a separate char primitive type. Single characters are simply instances of the built-in str class with len(s) == 1.",
    hint: "type(s[0]) is always str.",
    level: "basic",
    codeExample: "s = 'Barrackpore'\nch = s[0]\nprint(type(ch))  # <class 'str'>\nprint(len(ch))   # 1"
  },
  {
    question: "What happens when you access a single index that is out of bounds (e.g., s = 'abc'; s[5])?",
    shortAnswer: "Python raises an IndexError: string index out of range.",
    explanation: "Single-item indexing is strict. Attempting to access an index >= len(s) or < -len(s) immediately terminates execution with an IndexError.",
    hint: "Direct indexing out of range raises IndexError.",
    level: "basic",
    codeExample: "s = 'abc'\ntry:\n    print(s[10])\nexcept IndexError as e:\n    print(e)  # string index out of range"
  },
  {
    question: "What is the general syntax for string slicing in Python?",
    shortAnswer: "string[start : stop : step]",
    explanation: "Slicing extracts a substring. 'start' is the starting index (inclusive), 'stop' is the ending index (exclusive), and 'step' is the stride (optional, defaults to 1).",
    hint: "[start:stop:step]",
    level: "basic",
    codeExample: "s = 'PROGRAMMING'\nprint(s[0:4])    # 'PROG'\nprint(s[3:7])    # 'GRAM'\nprint(s[0:10:2]) # 'PRAMI'"
  },
  {
    question: "Why is Python slicing described as a 'half-open interval' [start, stop)?",
    shortAnswer: "Because it includes the character at 'start' but excludes the character at 'stop'.",
    explanation: "The half-open interval ensures that the number of extracted characters equals (stop - start) when step is 1, and allows clean consecutive partitioning: s[:k] + s[k:] == s.",
    hint: "Start is included, stop is excluded.",
    level: "basic",
    codeExample: "s = 'PYTHON'\n# Length of slice [1:4] is exactly 4 - 1 = 3 ('YTH')\nprint(s[1:4])\nprint(s[:3] + s[3:] == s)  # True"
  },
  {
    question: "What are the default values when start or stop are omitted in a slice?",
    shortAnswer: "Start defaults to 0 (or len-1 if step < 0), and stop defaults to len(s) (or before index 0 if step < 0).",
    explanation: "Writing s[:stop] slices from index 0 up to stop-1. Writing s[start:] slices from start to the very end of the string. Writing s[:] creates a shallow copy of the entire string.",
    hint: "Defaults extend from the start to the end.",
    level: "basic",
    codeExample: "s = 'Hooghly'\nprint(s[:4])   # 'Hoog'\nprint(s[4:])   # 'hly'\nprint(s[:])    # 'Hooghly'"
  },
  {
    question: "Why does slicing out of bounds (e.g., s[10:20]) NOT raise an IndexError?",
    shortAnswer: "Python slicing is tolerant and automatically clamps indices to valid string boundaries.",
    explanation: "Unlike single index access, slicing gracefully clamps oversized indices to len(s) and out-of-range starting indices to valid bounds, returning an empty string '' if no valid range exists.",
    hint: "Slices clamp indices rather than raising errors.",
    level: "moderate",
    codeExample: "s = 'Kolkata'\nprint(repr(s[100:200]))  # ''\nprint(repr(s[2:999]))    # 'lkata'"
  },
  {
    question: "What does step slicing s[::2] do?",
    shortAnswer: "It extracts every second character starting from index 0 (indices 0, 2, 4, 6...).",
    explanation: "The step value defines the stride between elements. A step of +2 skips 1 character after every extracted character.",
    hint: "Stride jumps by the step amount.",
    level: "basic",
    codeExample: "s = 'ABCDEFGHIJ'\nprint(s[::2])  # 'ACEGI'\nprint(s[1::2]) # 'BDFHJ'"
  },
  {
    question: "How do you reverse a string idiomatically in Python using slicing?",
    shortAnswer: "Using the slice s[::-1].",
    explanation: "When step is -1 and start/stop are omitted, start defaults to the last index and stop traverses backwards past the first index, effectively reversing the string in C-level optimized memory.",
    hint: "s[::-1] reverses a string.",
    level: "basic",
    codeExample: "word = 'BARRACKPORE'\nprint(word[::-1])  # 'EROPKCARRAB'"
  },
  {
    question: "What is the difference between s[::-1] and ''.join(reversed(s))?",
    shortAnswer: "s[::-1] is a fast C-level memory copy; reversed(s) creates a reverse iterator object that must be joined.",
    explanation: "s[::-1] is typically 2x-4x faster because CPython handles slice strides directly in native C without iterator object overhead.",
    hint: "s[::-1] is direct slicing; reversed() is an iterator.",
    level: "moderate",
    codeExample: "s = 'Python'\nprint(s[::-1])             # 'nohtyP'\nprint(''.join(reversed(s))) # 'nohtyP'"
  },
  {
    question: "How do you check if a word is a palindrome using slicing in Python?",
    shortAnswer: "word == word[::-1]",
    explanation: "If a string is identical to its reversed slice, it is a palindrome.",
    hint: "Compare the string with its reverse slice.",
    level: "basic",
    codeExample: "def is_palindrome(w):\n    return w == w[::-1]\n\nprint(is_palindrome('radar'))  # True\nprint(is_palindrome('python')) # False"
  },
  {
    question: "What is the result of s[5:2] with default step (+1)?",
    shortAnswer: "An empty string ''",
    explanation: "With a positive step (+1), slicing only progresses from left to right. Since start (5) is greater than stop (2), the slice condition is immediately false and returns ''.",
    hint: "When start > stop with positive step, result is empty.",
    level: "moderate",
    codeExample: "s = 'DEVELOPER'\nprint(repr(s[5:2]))     # ''\nprint(repr(s[5:2:-1]))  # 'OLE' (Works with negative step!)"
  },
  {
    question: "What does s[5:2:-1] return for s = 'DEVELOPER'?",
    shortAnswer: "'OLE'",
    explanation: "With step = -1, traversal goes backwards from index 5 ('O') to index 3 ('E'), stopping before index 2 ('V'). The extracted characters are at indices 5, 4, 3: 'O', 'L', 'E'.",
    hint: "Starts at 5, stops before 2, moving backwards.",
    level: "moderate",
    codeExample: "s = 'DEVELOPER'\n# Indices: 0:D, 1:E, 2:V, 3:E, 4:L, 5:O, 6:P, 7:E, 8:R\nprint(s[5:2:-1])  # 'OLE'"
  },
  {
    question: "What error occurs if you try to assign to a slice: s[0:2] = 'AB'?",
    shortAnswer: "TypeError: 'str' object does not support slice assignment.",
    explanation: "Because strings are immutable, slice assignment is strictly prohibited. Unlike lists (which allow list[0:2] = [1, 2]), string slices cannot be mutated.",
    hint: "Strings do not support slice assignment.",
    level: "moderate",
    codeExample: "s = 'hello'\ntry:\n    s[0:2] = 'HE'\nexcept TypeError as e:\n    print(e)  # 'str' object does not support slice assignment"
  },
  {
    question: "How do you extract the last 4 characters of any non-empty string?",
    shortAnswer: "s[-4:]",
    explanation: "Using negative start index -4 and omitting stop captures all characters from 4 positions before the end through to the last character.",
    hint: "Negative start index with omitted stop.",
    level: "basic",
    codeExample: "filename = 'document_report.pdf'\nprint(filename[-4:])  # '.pdf'"
  },
  {
    question: "How do you remove the last 3 characters from a string using slicing?",
    shortAnswer: "s[:-3]",
    explanation: "s[:-3] slices from index 0 up to 3 positions before the end (excluding the last 3 characters).",
    hint: "Omit start, use negative stop.",
    level: "basic",
    codeExample: "text = 'BarrackporeWest'\nprint(text[:-4])  # 'Barrackpore'"
  },
  {
    question: "What is the result of s[-1:-5:-1] on s = 'abcdefg'?",
    shortAnswer: "'gfed'",
    explanation: "Starts at index -1 ('g'), moves backwards with step -1, and stops before index -5 ('c'). The extracted characters are at indices -1 ('g'), -2 ('f'), -3 ('e'), -4 ('d').",
    hint: "Traversing right-to-left from -1 to before -5.",
    level: "moderate",
    codeExample: "s = 'abcdefg'\nprint(s[-1:-5:-1])  # 'gfed'"
  },
  {
    question: "How do you calculate the length of a slice s[start:stop:step] theoretically?",
    shortAnswer: "max(0, math.ceil((stop - start) / step)) when indices are within bounds.",
    explanation: "For step > 0 and stop > start, the length is ceil((stop - start) / step). If start >= stop, the length is 0.",
    hint: "Ceil of difference divided by step.",
    level: "complex",
    codeExample: "import math\ns = '0123456789'\nstart, stop, step = 1, 8, 2\nslice_len = len(s[start:stop:step])\nformula_len = max(0, math.ceil((stop - start) / step))\nprint(slice_len == formula_len)  # True (4: '1357')"
  },
  {
    question: "How do you write a robust phrase palindrome verifier that ignores spaces and punctuation?",
    shortAnswer: "Filter for alphanumeric characters, lowercase them, and compare with the reversed string.",
    explanation: "Using a generator expression with ch.isalnum() and ch.lower() removes symbols and standardizes case before applying [::-1].",
    hint: "Clean characters with isalnum() before reversing.",
    level: "moderate",
    codeExample: "def is_phrase_palindrome(phrase):\n    clean = ''.join(ch.lower() for ch in phrase if ch.isalnum())\n    return clean == clean[::-1]\n\nprint(is_phrase_palindrome('A man, a plan, a canal: Panama!')) # True"
  },
  {
    question: "Does slicing a string in Python create a copy or a view?",
    shortAnswer: "In standard CPython, slicing a string creates a brand-new string copy in memory.",
    explanation: "Because Python strings are immutable and compact (PEP 393), slices create new string instances containing copies of the character bytes. (Unlike memoryview or numpy slices, which share buffer pointers).",
    hint: "String slices allocate new string objects.",
    level: "complex",
    codeExample: "s = 'Hello Kolkata'\nsub = s[0:5]\nprint(id(s) != id(sub))  # True (Distinct heap object)"
  },
  {
    question: "What is the difference between s[0] and s[0:1]?",
    shortAnswer: "s[0] raises an IndexError if s is empty; s[0:1] safely returns '' without error.",
    explanation: "Both return the first character when s is non-empty. However, on an empty string s = '', s[0] crashes with IndexError, whereas s[0:1] evaluates safely to ''.",
    hint: "Single index is strict; slice is fault-tolerant.",
    level: "moderate",
    codeExample: "s = ''\n# print(s[0])   # IndexError!\nprint(repr(s[0:1]))  # '' (Safe!)"
  },
  {
    question: "How do you split a string into two equal halves using slicing?",
    shortAnswer: "mid = len(s) // 2; first_half = s[:mid]; second_half = s[mid:]",
    explanation: "Integer division // computes the midpoint index, dividing the string into two halves that cleanly recombine as s[:mid] + s[mid:] == s.",
    hint: "Use len(s) // 2 as the slice boundary.",
    level: "basic",
    codeExample: "s = 'Barrackpore'\nmid = len(s) // 2\nprint(s[:mid], '|', s[mid:])  # 'Barra | ckpore'"
  },
  {
    question: "What does the slice s[::] do?",
    shortAnswer: "It returns a shallow copy of the entire string.",
    explanation: "With all three parameters omitted, start defaults to 0, stop defaults to len(s), and step defaults to 1, producing the full string.",
    hint: "Same as s[:]",
    level: "basic",
    codeExample: "s = 'Python'\nprint(s[::] == s)  # True"
  },
  {
    question: "How is fixed-width text parsing implemented using slicing?",
    shortAnswer: "By defining constant (start, stop) tuples for each column and slicing each line at those boundaries.",
    explanation: "Fixed-width data streams (legacy mainframe dumps, telecommunication records, bank slips) have fixed character offsets, making slicing (e.g., line[0:10], line[10:25]) the fastest parsing strategy.",
    hint: "Define fixed column ranges and slice lines.",
    level: "complex",
    codeExample: "record = '2026-08-24TXN94028SUCCESS'\ndate = record[:10]\ntxn = record[10:18]\nstatus = record[18:]\nprint(date, txn, status)  # 2026-08-24 TXN94028 SUCCESS"
  }
];

export default questions;
