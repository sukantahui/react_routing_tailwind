// topic16_questions.js
// 30 questions about readlines() (moderate to expert)

const questions = [
  {
    question: "What does the readlines() method do?",
    shortAnswer: "Reads all lines from a file and returns them as a list of strings.",
    explanation: "Each line includes its newline character.",
    hint: "It's a list of lines.",
    level: "basic",
    codeExample: "lines = f.readlines()"
  },
  {
    question: "What does readlines() return for an empty file?",
    shortAnswer: "An empty list [].",
    explanation: "No lines to read, so the list is empty.",
    hint: "Not EOF, but empty.",
    level: "basic",
    codeExample: "f.readlines()  # []"
  },
  {
    question: "What is the return type of readlines() in text mode?",
    shortAnswer: "List of strings (str).",
    explanation: "Each element is a string representing a line.",
    hint: "List of str.",
    level: "basic",
    codeExample: "type(f.readlines())  # list"
  },
  {
    question: "What is the return type of readlines() in binary mode?",
    shortAnswer: "List of bytes objects.",
    explanation: "Each line is a bytes object.",
    hint: "List of bytes.",
    level: "intermediate",
    codeExample: "type(f.readlines())  # list of bytes"
  },
  {
    question: "Does readlines() include the newline character?",
    shortAnswer: "Yes, each line includes its newline character at the end.",
    explanation: "The only exception is the last line if it doesn't end with a newline.",
    hint: "Use strip() to remove.",
    level: "basic",
    codeExample: null
  },
  {
    question: "How do you remove newlines from readlines() output?",
    shortAnswer: "Use list comprehension: `[line.rstrip('\\n') for line in f.readlines()]`.",
    explanation: "This creates a new list with newlines removed.",
    hint: "Strip each line.",
    level: "intermediate",
    codeExample: "[line.rstrip('\\n') for line in lines]"
  },
  {
    question: "What is the difference between readlines() and read()?",
    shortAnswer: "readlines() returns a list of lines; read() returns a single string.",
    explanation: "read() gives all content as one string; readlines() splits by line.",
    hint: "List vs string.",
    level: "basic",
    codeExample: null
  },
  {
    question: "What is the difference between readlines() and readline()?",
    shortAnswer: "readlines() reads all lines; readline() reads one line at a time.",
    explanation: "readlines() loads everything; readline() is line‑by‑line.",
    hint: "All vs one.",
    level: "basic",
    codeExample: null
  },
  {
    question: "When should you use readlines()?",
    shortAnswer: "For small files where you need random access to all lines.",
    explanation: "It's convenient but memory‑intensive.",
    hint: "Only for small files.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "When should you NOT use readlines()?",
    shortAnswer: "For large files, as it loads the entire file into memory.",
    explanation: "Use iteration (`for line in f`) for large files.",
    hint: "Avoid memory issues.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "What is the sizehint parameter in readlines()?",
    shortAnswer: "A hint for how many bytes to read in one internal operation.",
    explanation: "It controls chunk size when reading in batches.",
    hint: "Used for optimization.",
    level: "advanced",
    codeExample: "f.readlines(8192)"
  },
  {
    question: "Does sizehint guarantee an exact number of bytes?",
    shortAnswer: "No, it's a hint. Python may read more or less.",
    explanation: "It ensures complete lines are returned.",
    hint: "It's approximate.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "Can you use readlines() to read a file in chunks?",
    shortAnswer: "Yes, using the sizehint parameter in a loop.",
    explanation: "This allows batch processing without loading the entire file.",
    hint: "Read chunks of lines.",
    level: "advanced",
    codeExample: "while True: lines = f.readlines(8192); if not lines: break"
  },
  {
    question: "What is the memory overhead of readlines()?",
    shortAnswer: "It uses memory for the list itself plus all line strings.",
    explanation: "For large files, the list overhead can be significant.",
    hint: "List overhead + string content.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "How does readlines() compare to `for line in f` in memory usage?",
    shortAnswer: "readlines() uses much more memory as it loads all lines.",
    explanation: "Iteration reads one line at a time, keeping memory low.",
    hint: "readlines() is memory‑heavy.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "Is readlines() faster than iteration for small files?",
    shortAnswer: "It can be slightly faster due to fewer I/O calls.",
    explanation: "But the difference is usually negligible for small files.",
    hint: "Minor speed difference.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "Can you modify the list returned by readlines()?",
    shortAnswer: "Yes, it's a normal Python list that you can modify.",
    explanation: "Modifying doesn't affect the file itself; it's in memory.",
    hint: "In‑memory list.",
    level: "intermediate",
    codeExample: "lines = f.readlines(); lines[0] = 'new line\\n'"
  },
  {
    question: "Does readlines() work on files opened in 'r+' mode?",
    shortAnswer: "Yes, it works with any mode that allows reading.",
    explanation: "'r+', 'w+', and 'a+' all support readlines().",
    hint: "Any read‑enabled mode.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "What happens if you call readlines() on a file opened with 'w'?",
    shortAnswer: "It raises an error because 'w' is write‑only.",
    explanation: "Use 'r' or 'r+' for reading.",
    hint: "Open in the right mode.",
    level: "basic",
    codeExample: "f = open('f.txt', 'w'); f.readlines()  # OSError"
  },
  {
    question: "How do you get the number of lines in a file using readlines()?",
    shortAnswer: "Use `len(f.readlines())`.",
    explanation: "This counts the lines by loading them into a list.",
    hint: "Not efficient for large files.",
    level: "basic",
    codeExample: "len(f.readlines())"
  },
  {
    question: "How do you get the number of lines in a file without memory issues?",
    shortAnswer: "Use iteration: `sum(1 for line in f)`.",
    explanation: "This counts lines without loading the entire file.",
    hint: "Memory‑efficient.",
    level: "intermediate",
    codeExample: "sum(1 for line in f)"
  },
  {
    question: "Can readlines() handle very large files with sizehint?",
    shortAnswer: "Yes, by reading in chunks with sizehint.",
    explanation: "It allows batch processing without loading the whole file.",
    hint: "Use in a loop.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "What is the default value of sizehint?",
    shortAnswer: "It's -1, which means read the entire file.",
    explanation: "A negative value is treated as 'read all'.",
    hint: "Read all by default.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "Is readlines() part of the file object or a separate function?",
    shortAnswer: "It's a method of the file object.",
    explanation: "Called on a file object, e.g., `f.readlines()`.",
    hint: "It's a method.",
    level: "basic",
    codeExample: null
  },
  {
    question: "Can you use readlines() with sys.stdin?",
    shortAnswer: "Yes, sys.stdin is a file‑like object that supports readlines().",
    explanation: "Useful for reading all input lines from the console.",
    hint: "Works with stdin.",
    level: "intermediate",
    codeExample: "import sys; lines = sys.stdin.readlines()"
  },
  {
    question: "What is the impact of `newline` parameter on readlines()?",
    shortAnswer: "It affects newline translation, which affects line boundaries.",
    explanation: "Use `newline=''` to preserve exact newlines.",
    hint: "Affects line splitting.",
    level: "advanced",
    codeExample: "open('f.txt', 'r', newline='')"
  },
  {
    question: "Does readlines() preserve empty lines?",
    shortAnswer: "Yes, empty lines are included as `'\\n'`.",
    explanation: "A blank line is a line with only a newline.",
    hint: "Empty lines are included.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "How can you skip empty lines when using readlines()?",
    shortAnswer: "Filter the list: `[line for line in lines if line.strip()]`.",
    explanation: "This removes lines that are blank or only whitespace.",
    hint: "Filter out empty lines.",
    level: "intermediate",
    codeExample: "[line for line in lines if line.strip()]"
  },
  {
    question: "Is there a way to read lines lazily (not all at once)?",
    shortAnswer: "Yes, use `for line in f` or `readline()` in a loop.",
    explanation: "These approaches read one line at a time.",
    hint: "Use iteration.",
    level: "basic",
    codeExample: null
  },
  {
    question: "What is the best practice for reading small configuration files?",
    shortAnswer: "readlines() is often fine for small config files.",
    explanation: "It's convenient and the file is typically small.",
    hint: "readlines() for small files.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "What is the best practice for reading large data files?",
    shortAnswer: "Use `for line in f` or `readline()` in a loop.",
    explanation: "This keeps memory usage low and is safer.",
    hint: "Iterate for large files.",
    level: "intermediate",
    codeExample: "for line in f: process(line)"
  }
];

export default questions;