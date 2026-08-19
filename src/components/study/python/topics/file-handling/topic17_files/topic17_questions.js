// topic17_questions.js
// 30 questions about line-by-line reading (moderate to expert)

const questions = [
  {
    question: "Why is line-by-line reading important for large files?",
    shortAnswer: "It keeps memory usage low by processing one line at a time.",
    explanation: "Only the current line is loaded into memory, not the entire file.",
    hint: "Memory efficiency is key.",
    level: "basic",
    codeExample: null
  },
  {
    question: "What is the most Pythonic way to read a file line by line?",
    shortAnswer: "Using `for line in f:`.",
    explanation: "It's simple, readable, and handles EOF automatically.",
    hint: "The for loop approach.",
    level: "basic",
    codeExample: "for line in f: process(line)"
  },
  {
    question: "Does `for line in f` load the entire file into memory?",
    shortAnswer: "No, it reads lines lazily, one at a time.",
    explanation: "The file object is an iterator that yields lines as needed.",
    hint: "Memory efficient.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "How does `for line in f` know when to stop?",
    shortAnswer: "The file's iterator raises StopIteration at EOF.",
    explanation: "It uses readline() internally until EOF.",
    hint: "It's built into the file object.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "What is the difference between `for line in f` and `f.readlines()`?",
    shortAnswer: "`for line in f` reads lazily; `readlines()` loads all lines into memory.",
    explanation: "`for line in f` is memory-efficient; `readlines()` is not for large files.",
    hint: "One is lazy, one loads all.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "What is the walrus operator and how is it used for line reading?",
    shortAnswer: "`:=` allows assignment in the while condition: `while line := f.readline():`.",
    explanation: "This simplifies the readline loop by combining assignment and condition.",
    hint: "Python 3.8+ feature.",
    level: "advanced",
    codeExample: "while line := f.readline(): process(line)"
  },
  {
    question: "What Python version introduced the walrus operator?",
    shortAnswer: "Python 3.8.",
    explanation: "It's available in Python 3.8 and newer.",
    hint: "Requires 3.8+.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "How do you strip the newline from a line read line by line?",
    shortAnswer: "Use `line.rstrip('\\n')` or `line.strip()`.",
    explanation: "`rstrip('\\n')` removes only newline; `strip()` removes all whitespace.",
    hint: "Remove the newline.",
    level: "basic",
    codeExample: "line.rstrip('\\n')"
  },
  {
    question: "How do you skip empty lines when reading line by line?",
    shortAnswer: "Check `if not line.strip(): continue`.",
    explanation: "This skips lines that are empty or contain only whitespace.",
    hint: "Filter out empty lines.",
    level: "intermediate",
    codeExample: "if not line.strip(): continue"
  },
  {
    question: "Can you get line numbers when using `for line in f`?",
    shortAnswer: "Yes, use `enumerate(f, 1)`.",
    explanation: "`enumerate` provides line numbers starting from 1.",
    hint: "Use enumerate.",
    level: "intermediate",
    codeExample: "for i, line in enumerate(f, 1):"
  },
  {
    question: "Which method gives the most control over the reading process?",
    shortAnswer: "Using `readline()` in a `while` loop.",
    explanation: "You can pause, skip, or conditionally read lines.",
    hint: "More control than for loop.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "Is the `for line in f` approach always the best?",
    shortAnswer: "Yes, for most cases. But `readline()` gives more control.",
    explanation: "Use `for` for simplicity; `readline()` when you need precise control.",
    hint: "Default to `for`.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "What happens if you modify a file while iterating over it?",
    shortAnswer: "It can lead to undefined behavior; the iteration may break.",
    explanation: "Reading and writing the same file simultaneously is not recommended.",
    hint: "Avoid concurrent read/write.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "Can you read a file line by line from the end?",
    shortAnswer: "Not directly; you'd need to read all lines or use seek.",
    explanation: "For large files, read backwards using `seek()` and `readline()`.",
    hint: "Difficult; read forward.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "How do you count lines in a file without reading all lines?",
    shortAnswer: "Use `sum(1 for line in f)`.",
    explanation: "This iterates line by line without storing them.",
    hint: "Memory-efficient counting.",
    level: "intermediate",
    codeExample: "sum(1 for line in f)"
  },
  {
    question: "What is the time complexity of reading a file line by line?",
    shortAnswer: "O(n) where n is the number of lines.",
    explanation: "Each line is processed once.",
    hint: "Linear time.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "Does `for line in f` work with files opened in binary mode?",
    shortAnswer: "Yes, but it returns bytes instead of strings.",
    explanation: "The loop yields bytes objects, one line at a time.",
    hint: "Binary mode = bytes.",
    level: "intermediate",
    codeExample: "for line in f: process(line)  # line is bytes"
  },
  {
    question: "What is the difference between `line.rstrip('\\n')` and `line.strip()`?",
    shortAnswer: "`rstrip('\\n')` removes only newline; `strip()` removes all leading/trailing whitespace.",
    explanation: "Choose based on whether you want to preserve internal whitespace.",
    hint: "One is specific, one is broad.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "How do you handle very long lines (e.g., > 1GB)?",
    shortAnswer: "Use `readline()` with a size limit or use `read()` chunks.",
    explanation: "Very long lines can cause memory issues even in line-by-line reading.",
    hint: "Limit the read size.",
    level: "advanced",
    codeExample: "while True: chunk = f.readline(4096)"
  },
  {
    question: "Is it possible to read a file line by line and write to another file?",
    shortAnswer: "Yes, this is a common pattern for transforming files.",
    explanation: "Read from source, process, write to destination.",
    hint: "Stream processing.",
    level: "intermediate",
    codeExample: "with open('src') as r, open('dst', 'w') as w: for line in r: w.write(line)"
  },
  {
    question: "What is the purpose of the `newline` parameter in `open()` for line reading?",
    shortAnswer: "It controls newline translation, affecting what is recognized as a line.",
    explanation: "Use `newline=''` to disable translation.",
    hint: "Affects line boundaries.",
    level: "advanced",
    codeExample: "open('f.txt', 'r', newline='')"
  },
  {
    question: "Can you use `readline()` to read a specific number of lines?",
    shortAnswer: "Yes, use a loop that counts lines and breaks at the desired count.",
    explanation: "You can control exactly how many lines to read.",
    hint: "Count in a loop.",
    level: "intermediate",
    codeExample: "for _ in range(10): line = f.readline()"
  },
  {
    question: "What is the best practice for reading files line by line?",
    shortAnswer: "Use `with open() as f: for line in f:`.",
    explanation: "This ensures the file is closed and reads line by line efficiently.",
    hint: "The standard pattern.",
    level: "basic",
    codeExample: null
  },
  {
    question: "How does `readline()` handle EOF?",
    shortAnswer: "It returns an empty string `''` at EOF.",
    explanation: "This is how you detect the end of the file.",
    hint: "Empty string = EOF.",
    level: "basic",
    codeExample: null
  },
  {
    question: "What is the `__iter__` method of a file object?",
    shortAnswer: "It returns the file object itself, making it iterable.",
    explanation: "This is what allows `for line in f` to work.",
    hint: "It's how iteration works.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "Can you use `next(f)` to read the next line?",
    shortAnswer: "Yes, `next(f)` returns the next line from the iterator.",
    explanation: "It's equivalent to calling `f.readline()`.",
    hint: "Manual iteration.",
    level: "intermediate",
    codeExample: "line = next(f)"
  },
  {
    question: "What happens if you call `next(f)` at EOF?",
    shortAnswer: "It raises StopIteration.",
    explanation: "The file object raises StopIteration when no more lines are available.",
    hint: "StopIteration at EOF.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "Is `for line in f` faster than `while line := f.readline()`?",
    shortAnswer: "They are very similar in performance; `for` is slightly more efficient.",
    explanation: "The `for` loop is implemented in C for speed.",
    hint: "Both are fast.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "How do you read a file line by line and skip the first N lines?",
    shortAnswer: "Use `for _ in range(N): next(f)` to skip, then process the rest.",
    explanation: "Or use `itertools.islice` for more complex skipping.",
    hint: "Skip with `next()` or `readline()`.",
    level: "intermediate",
    codeExample: "for _ in range(N): f.readline(); for line in f: process(line)"
  },
  {
    question: "What is the memory impact of using `for line in f` on a 1GB file?",
    shortAnswer: "Memory usage is very low; only the current line is in memory.",
    explanation: "The file object uses a small buffer, but not the entire file.",
    hint: "Memory efficient.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "Can you pause and resume reading a file line by line?",
    shortAnswer: "Yes, by storing the file pointer position with `tell()` and using `seek()`.",
    explanation: "This allows you to resume reading from where you left off.",
    hint: "Use `tell()` and `seek()`.",
    level: "advanced",
    codeExample: "pos = f.tell(); f.seek(pos)"
  }
];

export default questions;