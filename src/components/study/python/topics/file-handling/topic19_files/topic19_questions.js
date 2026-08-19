// topic19_questions.js
// 30 questions about writelines() (moderate to expert)

const questions = [
  {
    question: "What does writelines() do?",
    shortAnswer: "Writes a list (or iterable) of strings to a file.",
    explanation: "It writes each string in the iterable to the file, without adding newlines.",
    hint: "It's the counterpart to readlines().",
    level: "basic",
    codeExample: "f.writelines(['line1\\n', 'line2\\n'])"
  },
  {
    question: "Does writelines() add newlines automatically?",
    shortAnswer: "No, you must include newlines in the strings yourself.",
    explanation: "Unlike what the name might suggest, it does not add line breaks.",
    hint: "Always include '\\n'.",
    level: "basic",
    codeExample: null
  },
  {
    question: "What does writelines() return?",
    shortAnswer: "None.",
    explanation: "It doesn't return a count of written characters like write() does.",
    hint: "It returns None.",
    level: "intermediate",
    codeExample: "result = f.writelines(lines)  # result is None"
  },
  {
    question: "What types of input does writelines() accept?",
    shortAnswer: "Any iterable of strings (list, tuple, generator, etc.).",
    explanation: "It iterates over the input and writes each string.",
    hint: "It works with any iterable.",
    level: "intermediate",
    codeExample: "f.writelines(generator_function())"
  },
  {
    question: "Is writelines() more efficient than multiple write() calls?",
    shortAnswer: "Yes, for many lines it reduces method call overhead.",
    explanation: "One call to writelines() is faster than many write() calls.",
    hint: "Fewer Python-level calls.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "What happens if you pass a single string to writelines()?",
    shortAnswer: "It iterates over the characters and writes each character individually.",
    explanation: "A string is an iterable of characters, so it writes each character.",
    hint: "Be careful! It's not what you want.",
    level: "advanced",
    codeExample: "f.writelines('hello')  # writes h, e, l, l, o"
  },
  {
    question: "How do you write a list of strings as separate lines?",
    shortAnswer: "Ensure each string ends with '\\n', or use `\\n`.join() before writing.",
    explanation: "You need to add newlines manually.",
    hint: "Use list comprehension to add newlines.",
    level: "basic",
    codeExample: "lines = [f'{item}\\n' for item in data]"
  },
  {
    question: "What is the difference between writelines() and write()?",
    shortAnswer: "write() writes a single string; writelines() writes a list of strings.",
    explanation: "write() returns the number of characters; writelines() returns None.",
    hint: "One writes one, the other writes many.",
    level: "basic",
    codeExample: null
  },
  {
    question: "Can you use writelines() with a generator?",
    shortAnswer: "Yes, generators are iterable and work perfectly.",
    explanation: "This is memory‑efficient for large datasets.",
    hint: "Use generators for large files.",
    level: "intermediate",
    codeExample: "f.writelines(line for line in generate_data())"
  },
  {
    question: "Does writelines() flush the buffer after each line?",
    shortAnswer: "No, it buffers writes; use flush() or close() to force writing.",
    explanation: "Like write(), it uses buffered I/O.",
    hint: "Close the file or flush.",
    level: "intermediate",
    codeExample: "f.flush()"
  },
  {
    question: "What happens if you call writelines() on a closed file?",
    shortAnswer: "It raises a ValueError.",
    explanation: "Cannot write to a closed file.",
    hint: "Always use `with`.",
    level: "basic",
    codeExample: "f.close(); f.writelines(['a'])  # ValueError"
  },
  {
    question: "How do you write a list of integers with writelines()?",
    shortAnswer: "Convert them to strings first, using map() or list comprehension.",
    explanation: "writelines() only accepts strings.",
    hint: "Use map(str, list).",
    level: "intermediate",
    codeExample: "f.writelines([str(i) + '\\n' for i in [1,2,3]])"
  },
  {
    question: "Is there a limit to the number of lines writelines() can handle?",
    shortAnswer: "Limited by memory for the list, or disk space; no hard limit.",
    explanation: "If you use a generator, memory is not an issue.",
    hint: "Use a generator for huge datasets.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "Can writelines() be used in binary mode?",
    shortAnswer: "Yes, but you must write bytes, not strings.",
    explanation: "In binary mode, it expects an iterable of bytes objects.",
    hint: "Use b'' for bytes.",
    level: "intermediate",
    codeExample: "f.writelines([b'line1\\n', b'line2\\n'])"
  },
  {
    question: "What is the difference between `f.writelines(lines)` and `f.write(''.join(lines))`?",
    shortAnswer: "Both write all lines, but writelines() is more efficient.",
    explanation: "writelines() writes directly; join() creates a new string in memory.",
    hint: "writelines() saves memory.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "Why does writelines() not add newlines automatically?",
    shortAnswer: "For flexibility and performance; the caller controls the formatting.",
    explanation: "It allows writing data that may not be line‑oriented.",
    hint: "Flexibility.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "How do you add a trailing newline to a list of lines?",
    shortAnswer: "Use list comprehension: `[line + '\\n' for line in lines]`.",
    explanation: "Or ensure each line already ends with '\\n'.",
    hint: "Add newline to each.",
    level: "intermediate",
    codeExample: "f.writelines([f'{line}\\n' for line in lines])"
  },
  {
    question: "What is the performance difference between writelines and a loop?",
    shortAnswer: "writelines is faster for many lines due to fewer method calls.",
    explanation: "The loop makes multiple Python→C transitions; writelines does one.",
    hint: "Use writelines for large datasets.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "Can writelines() accept a list of strings that are not all strings?",
    shortAnswer: "No, it raises TypeError if any element is not a string.",
    explanation: "All elements must be strings (or bytes in binary mode).",
    hint: "Ensure all elements are strings.",
    level: "intermediate",
    codeExample: "f.writelines(['a', 2, 'c'])  # TypeError"
  },
  {
    question: "How do you write a CSV file using writelines()?",
    shortAnswer: "Format each row as a comma‑separated string with newline, then write.",
    explanation: "Example: `f.writelines([f'{a},{b}\\n' for a,b in data])`.",
    hint: "Format each row.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "Is it safe to call writelines() with a very large list?",
    shortAnswer: "It may use a lot of memory. Use a generator instead.",
    explanation: "A large list of strings can be memory‑intensive.",
    hint: "Use a generator for large data.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "Does writelines() work with file-like objects other than open()?",
    shortAnswer: "Yes, any object that supports `write()` in a buffered manner.",
    explanation: "E.g., `io.StringIO`, `sys.stdout` (if writing to console).",
    hint: "Works with any file-like object.",
    level: "advanced",
    codeExample: "import sys; sys.stdout.writelines(['a\\n', 'b\\n'])"
  },
  {
    question: "What is the difference between writelines() and print(file=) with a loop?",
    shortAnswer: "writelines() is lower-level and doesn't add newlines; print() adds newline by default.",
    explanation: "print() with `file=` is more flexible but slower.",
    hint: "print() adds newlines.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "How do you write a list of lines with a trailing newline at the end of the file?",
    shortAnswer: "Ensure the last string ends with '\\n'. Or add it after writelines().",
    explanation: "Add `f.write('\\n')` after writelines if needed.",
    hint: "Add a final newline.",
    level: "intermediate",
    codeExample: "f.writelines(lines); f.write('\\n')"
  },
  {
    question: "What happens if writelines() is interrupted by an exception?",
    shortAnswer: "Data that was already written remains, but the rest is not written.",
    explanation: "Use `with` to ensure file is closed, but partial writes may occur.",
    hint: "Handle exceptions.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "Can you use writelines() to append to a file?",
    shortAnswer: "Yes, open the file in 'a' mode and use writelines().",
    explanation: "The lines are appended to the end.",
    hint: "Use 'a' mode.",
    level: "basic",
    codeExample: "with open('log.txt', 'a') as f: f.writelines(['new line\\n'])"
  },
  {
    question: "How do you write a list of strings without newlines but with a separator?",
    shortAnswer: "Use `f.write(separator.join(lines))` instead.",
    explanation: "writelines() doesn't insert separators.",
    hint: "Use join() for separators.",
    level: "intermediate",
    codeExample: "f.write('\\t'.join(lines))"
  },
  {
    question: "Is there a way to get the count of written lines with writelines()?",
    shortAnswer: "No, you can count the lines beforehand.",
    explanation: "writelines() doesn't return anything.",
    hint: "Count your iterable length.",
    level: "intermediate",
    codeExample: "count = len(lines); f.writelines(lines)"
  },
  {
    question: "What is the purpose of the name writelines() if it doesn't add newlines?",
    shortAnswer: "It's designed to write multiple strings, not necessarily lines.",
    explanation: "The name is historical; it writes each element of the iterable.",
    hint: "It's for bulk writing.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "How does writelines() handle a generator that raises an exception?",
    shortAnswer: "The exception propagates, and the file remains open unless using `with`.",
    explanation: "Make sure to handle exceptions.",
    hint: "Use try-except around the with block.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "Which is better for writing a list of strings: writelines() or using write() with join()?",
    shortAnswer: "writelines() is more memory‑efficient; join() creates a single large string.",
    explanation: "For large lists, writelines() is preferred.",
    hint: "Use writelines() for large data.",
    level: "intermediate",
    codeExample: null
  }
];

export default questions;