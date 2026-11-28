// 25 Authentic CBSE Board Examination Questions for Topic 4
const questions = [
  {
    "id": 1,
    "question": "What does the `f.read()` method return when invoked without arguments?",
    "options": [
      "A list of lines",
      "The entire remaining content of the file as a single string",
      "A generator object",
      "The byte count of the file"
    ],
    "correctAnswer": 1,
    "explanation": "`f.read()` without parameters reads from the current pointer to EOF and returns the result as a single string.",
    "hint": "Single string of entire content."
  },
  {
    "id": 2,
    "question": "What does `f.read(10)` do on a text file?",
    "options": [
      "Reads the 10th line of the file",
      "Reads at most 10 characters starting from current file pointer",
      "Reads 10 lines from the start",
      "Skips 10 characters without reading"
    ],
    "correctAnswer": 1,
    "explanation": "`read(n)` reads at most `n` characters from the current position in a text file.",
    "hint": "Reads up to n characters."
  },
  {
    "id": 3,
    "question": "What does `f.readline()` return when it reaches the End of File (EOF)?",
    "options": [
      "None",
      "An empty string ''",
      "Raises EOFError",
      "Raises StopIteration"
    ],
    "correctAnswer": 1,
    "explanation": "In Python text file reading, `readline()` and `read()` return an empty string `''` upon reaching EOF.",
    "hint": "Empty string marks EOF."
  },
  {
    "id": 4,
    "question": "What data type is returned by the `f.readlines()` method?",
    "options": [
      "str",
      "tuple",
      "list of strings",
      "dict"
    ],
    "correctAnswer": 2,
    "explanation": "`f.readlines()` reads all remaining lines from the file and returns them as a Python list of strings.",
    "hint": "List of line strings."
  },
  {
    "id": 5,
    "question": "Consider a file `poem.txt` with content:\n`Sun\\nMoon\\nStar`\nWhat does `len(f.readlines())` return when opened from start?",
    "options": [
      "3",
      "12",
      "1",
      "14"
    ],
    "correctAnswer": 0,
    "explanation": "There are 3 distinct lines ('Sun\\n', 'Moon\\n', 'Star'), so `readlines()` returns a list with 3 elements.",
    "hint": "Number of lines."
  },
  {
    "id": 6,
    "question": "In `poem.txt` with lines `Sun\\nMoon\\nStar`, what does `f.readline()` return on its first invocation?",
    "options": [
      "'Sun'",
      "'Sun\\n'",
      "'SunMoonStar'",
      "['Sun']"
    ],
    "correctAnswer": 1,
    "explanation": "`readline()` retains the trailing newline character `\\n` at the end of the line unless stripped.",
    "hint": "Includes trailing newline."
  },
  {
    "id": 7,
    "question": "What is the most memory-efficient way to process a 10 GB text file line-by-line in Python?",
    "options": [
      "content = f.read(); for c in content:",
      "lines = f.readlines(); for l in lines:",
      "for line in f:",
      "f.read(10000000000)"
    ],
    "correctAnswer": 2,
    "explanation": "Using `for line in f:` iterates over the file object directly as an iterator, streaming one line at a time into RAM.",
    "hint": "Direct file handle iteration."
  },
  {
    "id": 8,
    "question": "Consider: `f = open('data.txt')`. After executing `a = f.read()`, what will a subsequent call `b = f.read()` return?",
    "options": [
      "The first line again",
      "An empty string '' because pointer is at EOF",
      "Raises ValueError",
      "The last character"
    ],
    "correctAnswer": 1,
    "explanation": "The first `read()` moves the file pointer to the end; subsequent calls return `''` until the pointer is rewound.",
    "hint": "Pointer is already at EOF."
  },
  {
    "id": 9,
    "question": "What string method is commonly used to remove the trailing `\\n` from a line returned by `f.readline()`?",
    "options": [
      "line.split()",
      "line.rstrip('\\n')",
      "line.pop()",
      "line.truncate()"
    ],
    "correctAnswer": 1,
    "explanation": "`line.rstrip('\\n')` or `line.strip()` strips trailing whitespace and newline characters.",
    "hint": "rstrip strips from right."
  },
  {
    "id": 10,
    "question": "What will `f.read(-1)` do in Python?",
    "options": [
      "Raise ValueError",
      "Read the file backwards from the end",
      "Read the entire file to EOF just like f.read()",
      "Delete the last character"
    ],
    "correctAnswer": 2,
    "explanation": "Passing a negative integer or omitting the argument causes `read()` to read until EOF.",
    "hint": "Negative means all."
  },
  {
    "id": 11,
    "question": "Consider `sample.txt` containing: `Python Class 12`. What does the following code print?\n```python\nf = open('sample.txt')\nprint(f.read(6))\nprint(f.read(6))\n```",
    "options": [
      "Python and Python",
      "Python and  Class",
      "Class  and 12",
      "Python Class 12"
    ],
    "correctAnswer": 1,
    "explanation": "The first read gets 'Python' (6 chars). The second read continues from index 6, returning ' Class' (6 chars).",
    "hint": "Continues from previous pointer."
  },
  {
    "id": 12,
    "question": "Assertion (A): `f.readlines()` should be avoided when processing extremely large multi-gigabyte log files.\nReason (R): `f.readlines()` reads all lines simultaneously into RAM as a list, risking MemoryError.",
    "options": [
      "Both A and R are true and R is the correct explanation of A",
      "Both A and R are true but R is not the correct explanation of A",
      "A is true but R is false",
      "A is false but R is true"
    ],
    "correctAnswer": 0,
    "explanation": "Loading entire huge files into memory with `readlines()` exhausts available RAM; line-by-line iteration is required.",
    "hint": "Memory exhaustion risk."
  },
  {
    "id": 13,
    "question": "Consider the code:\n```python\nf = open('note.txt')\ncount = 0\nfor line in f:\n    count += 1\n```\nWhat does `count` represent?",
    "options": [
      "Total words in note.txt",
      "Total characters in note.txt",
      "Total lines in note.txt",
      "Total paragraphs in note.txt"
    ],
    "correctAnswer": 2,
    "explanation": "Each iteration of `for line in f:` retrieves one individual line, so `count` tallies total lines.",
    "hint": "Iterates over lines."
  },
  {
    "id": 14,
    "question": "What is returned if `f.readline(3)` is called on a file whose first line is `Computer\\n`?",
    "options": [
      "'Computer\\n'",
      "'Com'",
      "'put'",
      "['Com']"
    ],
    "correctAnswer": 1,
    "explanation": "`readline(size)` reads up to `size` characters of the current line, yielding `'Com'`.",
    "hint": "Up to 3 characters of current line."
  },
  {
    "id": 15,
    "question": "What does the following snippet evaluate to?\n```python\nf = open('test.txt', 'w')\nf.write('Line 1\\nLine 2')\nf.close()\nf = open('test.txt', 'r')\nL = f.readlines()\nprint(L[0])\n```",
    "options": [
      "'Line 1'",
      "'Line 1\\n'",
      "'Line 2'",
      "['Line 1']"
    ],
    "correctAnswer": 1,
    "explanation": "The first element of `readlines()` preserves the newline: `'Line 1\\n'`.",
    "hint": "Trailing newline is preserved."
  },
  {
    "id": 16,
    "question": "How does `for ch in f.read():` iterate through a file?",
    "options": [
      "Line by line",
      "Word by word",
      "Character by character (including spaces and newlines)",
      "Paragraph by paragraph"
    ],
    "correctAnswer": 2,
    "explanation": "`f.read()` returns a full string; iterating over that string processes every individual character in sequence.",
    "hint": "String iteration character-by-character."
  },
  {
    "id": 17,
    "question": "Which method is the most appropriate when an algorithm needs to count occurrences of the word 'India' in a file?",
    "options": [
      "f.read().split() and count words in list",
      "f.readline() once",
      "f.seek(5)",
      "f.read(-10)"
    ],
    "correctAnswer": 0,
    "explanation": "Reading the file, splitting via `.split()` into individual whitespace-delimited words, and checking each word is standard.",
    "hint": "split() breaks into words."
  },
  {
    "id": 18,
    "question": "If `f.readline()` returns an empty string `''`, which condition is True?",
    "options": [
      "The file has a blank empty line",
      "The file pointer has reached EOF",
      "The file is corrupted",
      "The file is binary"
    ],
    "correctAnswer": 1,
    "explanation": "A blank line with a newline returns `'\\n'` (length 1). Only true EOF returns `''` (length 0).",
    "hint": "Blank line has \\n, EOF has ''."
  },
  {
    "id": 19,
    "question": "Consider: `line = '\\n'`. What is `len(line)`?",
    "options": [
      "0",
      "1",
      "2",
      "Undefined"
    ],
    "correctAnswer": 1,
    "explanation": "A blank newline string has length 1 in Python.",
    "hint": "Single escape character."
  },
  {
    "id": 20,
    "question": "What does `f.read().splitlines()` return?",
    "options": [
      "A single string with newlines",
      "A list of lines with newline characters removed (stripped)",
      "A list of individual characters",
      "An integer count of lines"
    ],
    "correctAnswer": 1,
    "explanation": "`splitlines()` splits a string at line breaks and strips the newline characters automatically.",
    "hint": "Splits lines and strips \\n."
  },
  {
    "id": 21,
    "question": "Consider the code:\n```python\nwith open('doc.txt') as f:\n    data = f.read(5)\n    more = f.read(5)\n```\nWhere is the file pointer after this code executes?",
    "options": [
      "Byte 0",
      "Byte 5",
      "Byte 10",
      "At EOF"
    ],
    "correctAnswer": 2,
    "explanation": "The pointer advances by 5 bytes twice, leaving it at byte position 10.",
    "hint": "5 + 5 = 10."
  },
  {
    "id": 22,
    "question": "What exception occurs if `f.read()` is invoked on a file opened with mode `open('data.txt', 'w')`?",
    "options": [
      "io.UnsupportedOperation: not readable",
      "ValueError",
      "FileNotFoundError",
      "EOFError"
    ],
    "correctAnswer": 0,
    "explanation": "File mode `'w'` is write-only, so attempting to read raises `io.UnsupportedOperation: not readable`.",
    "hint": "Not readable exception."
  },
  {
    "id": 23,
    "question": "What is the return type of `f.readline()`?",
    "options": [
      "list",
      "str",
      "bytes",
      "int"
    ],
    "correctAnswer": 1,
    "explanation": "`f.readline()` returns a string (`str`).",
    "hint": "Returns a single line string."
  },
  {
    "id": 24,
    "question": "Assertion (A): `for line in f:` is identical to `for line in f.readlines():` in terms of memory usage.\nReason (R): Both constructs yield identical lines sequentially.",
    "options": [
      "Both A and R are true",
      "Both A and R are false",
      "A is false but R is true",
      "A is true but R is false"
    ],
    "correctAnswer": 2,
    "explanation": "A is false: `f.readlines()` creates a full list in memory at once, whereas `for line in f:` streams lines lazily without buffering all lines.",
    "hint": "readlines creates a full list in RAM."
  },
  {
    "id": 25,
    "question": "In a CBSE 2-mark question: 'How can you read a text file character-by-character without loading the whole file into RAM at once?' What is the correct approach?",
    "options": [
      "Use f.readlines()",
      "Repeatedly call f.read(1) inside a while loop until it returns ''",
      "Call f.readline() with split()",
      "Use f.seek(1)"
    ],
    "correctAnswer": 1,
    "explanation": "Reading chunks of size 1 with `f.read(1)` reads one character per iteration with minimal memory consumption.",
    "hint": "f.read(1) in a loop."
  }
];

export default questions;
