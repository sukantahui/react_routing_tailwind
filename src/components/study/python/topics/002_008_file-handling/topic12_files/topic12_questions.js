// topic12_questions.js
// 30 questions about 'with open()' (moderate to expert)

const questions = [
  {
    question: "What does the 'with' statement do when used with open()?",
    shortAnswer: "It automatically closes the file when the block exits.",
    explanation: "It ensures the file is closed even if an exception occurs.",
    hint: "It's a context manager for resource cleanup.",
    level: "basic",
    codeExample: "with open('file.txt') as f: data = f.read()"
  },
  {
    question: "Why is 'with' preferred over manual close()?",
    shortAnswer: "It's safer, more readable, and guarantees closure.",
    explanation: "Manual close() can be forgotten, leading to resource leaks.",
    hint: "The Pythonic way.",
    level: "basic",
    codeExample: null
  },
  {
    question: "What is a context manager?",
    shortAnswer: "An object that implements __enter__ and __exit__ methods.",
    explanation: "It manages resources, setting them up and cleaning them up.",
    hint: "Used with the 'with' statement.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "What are the __enter__ and __exit__ methods?",
    shortAnswer: "__enter__ sets up the resource; __exit__ cleans it up.",
    explanation: "__enter__ returns the resource; __exit__ handles cleanup.",
    hint: "The magic behind 'with'.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "Is it possible to open multiple files with one 'with'?",
    shortAnswer: "Yes, using a comma-separated list of open() calls.",
    explanation: "Example: `with open('a') as f1, open('b') as f2:`.",
    hint: "All files are closed automatically.",
    level: "intermediate",
    codeExample: "with open('a') as f1, open('b') as f2:"
  },
  {
    question: "What happens to the file object after the 'with' block?",
    shortAnswer: "It is closed and cannot be used.",
    explanation: "The file object is only valid inside the block.",
    hint: "Scope is limited to the block.",
    level: "intermediate",
    codeExample: "with open('f.txt') as f: data = f.read(); # f is closed here"
  },
  {
    question: "Can you use 'with' with files opened in binary mode?",
    shortAnswer: "Yes, it works with any mode (rb, wb, etc.).",
    explanation: "'with' works with any context manager, regardless of mode.",
    hint: "Same syntax.",
    level: "basic",
    codeExample: "with open('image.jpg', 'rb') as f: data = f.read()"
  },
  {
    question: "What happens if an exception occurs inside a 'with' block?",
    shortAnswer: "The file is still closed before the exception propagates.",
    explanation: "That's the main safety feature of 'with'.",
    hint: "Cleanup is guaranteed.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "Does the 'with' statement call close() automatically?",
    shortAnswer: "Yes, it calls the file's __exit__ method, which calls close().",
    explanation: "It also flushes the buffer.",
    hint: "You don't need to call close() manually.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "Can you use 'with' with variables that are not files?",
    shortAnswer: "Yes, with any object that supports the context manager protocol.",
    explanation: "Examples: locks, database connections, sockets.",
    hint: "It's a general resource management pattern.",
    level: "advanced",
    codeExample: "with threading.Lock():"
  },
  {
    question: "What is the difference between 'with' and try-finally for file handling?",
    shortAnswer: "'with' is more concise and less error-prone.",
    explanation: "'with' abstracts the try-finally pattern, making code cleaner.",
    hint: "Use 'with' for files.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "Can you nest 'with' statements?",
    shortAnswer: "Yes, they can be nested, like any block.",
    explanation: "Useful for managing multiple resources.",
    hint: "Indent each 'with'.",
    level: "intermediate",
    codeExample: "with open('a') as f1: with open('b') as f2: ..."
  },
  {
    question: "What is the 'as' keyword in 'with open() as f'?",
    shortAnswer: "It assigns the file object to the variable f.",
    explanation: "You can then use f to read/write inside the block.",
    hint: "It's optional but recommended.",
    level: "basic",
    codeExample: "with open('f.txt') as f:"
  },
  {
    question: "Can you use 'with' without 'as'?",
    shortAnswer: "Yes, if you don't need to reference the resource.",
    explanation: "But it's usually used with 'as'.",
    hint: "Mostly used with 'as'.",
    level: "basic",
    codeExample: "with open('f.txt'):  # no variable"
  },
  {
    question: "What is the scope of the variable defined with 'as'?",
    shortAnswer: "The variable is scoped to the 'with' block.",
    explanation: "It is not accessible outside the block.",
    hint: "Limited lifetime.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "How do you handle errors from opening the file inside a 'with'?",
    shortAnswer: "Wrap the 'with' in a try-except block.",
    explanation: "The error occurs before __enter__ completes.",
    hint: "Try-except around the 'with'.",
    level: "intermediate",
    codeExample: "try: with open('f.txt') as f: ... except FileNotFoundError: ..."
  },
  {
    question: "What is the 'contextlib' module used for?",
    shortAnswer: "It provides utilities for creating context managers.",
    explanation: "Useful for creating custom context managers without classes.",
    hint: "Advanced topic.",
    level: "advanced",
    codeExample: "from contextlib import contextmanager"
  },
  {
    question: "Can you create a context manager with a function using contextlib?",
    shortAnswer: "Yes, using the @contextmanager decorator.",
    explanation: "It yields the resource, and cleanup happens after yield.",
    hint: "Simplifies custom context managers.",
    level: "advanced",
    codeExample: "@contextmanager def managed_file(name): f = open(name); try: yield f; finally: f.close()"
  },
  {
    question: "What happens if __exit__ returns True?",
    shortAnswer: "It suppresses any exception that occurred in the block.",
    explanation: "Rarely used; usually __exit__ returns False.",
    hint: "Advanced use.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "Is the file closed immediately after the 'with' block exits?",
    shortAnswer: "Yes, the __exit__ method is called immediately.",
    explanation: "The file is closed and the buffer is flushed.",
    hint: "Instant cleanup.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "Can you use 'with' with a file that was already opened?",
    shortAnswer: "No, 'with' is used for opening and managing the file.",
    explanation: "You cannot wrap an existing file object in 'with'.",
    hint: "Use 'with' at open time.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "What is the recommended way to handle files in Python?",
    shortAnswer: "Always use the 'with' statement.",
    explanation: "It's safe, concise, and Pythonic.",
    hint: "Use 'with open()'.",
    level: "basic",
    codeExample: null
  },
  {
    question: "Can 'with' be used with the 'pathlib' library?",
    shortAnswer: "Yes, using Path.open() which returns a file object.",
    explanation: "Example: `with Path('file.txt').open('r') as f:`.",
    hint: "Works the same way.",
    level: "intermediate",
    codeExample: "from pathlib import Path; with Path('f.txt').open() as f: ..."
  },
  {
    question: "What is the benefit of using 'with' for database connections?",
    shortAnswer: "It automatically commits/rolls back and closes connections.",
    explanation: "Many database libraries support context managers.",
    hint: "Resource management.",
    level: "advanced",
    codeExample: "with connection: cursor.execute(...)"
  },
  {
    question: "Can 'with' be used with network sockets?",
    shortAnswer: "Yes, if the socket implements the context manager protocol.",
    explanation: "It's common in libraries that manage sockets.",
    hint: "Check documentation.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "What is the difference between 'with' and 'with...as'?",
    shortAnswer: "'with...as' assigns the context manager's return to a variable.",
    explanation: "Without 'as', you cannot reference the resource.",
    hint: "'as' is optional.",
    level: "basic",
    codeExample: "with open('f.txt') as f:  # with 'as'"
  },
  {
    question: "Can you use multiple 'with' statements in one line?",
    shortAnswer: "Yes, using commas and backslashes for readability.",
    explanation: "Example: `with open('a') as f1, open('b') as f2:`.",
    hint: "Keep it readable.",
    level: "intermediate",
    codeExample: "with open('a') as f1, open('b') as f2:"
  },
  {
    question: "What is the 'atexit' module and how does it relate to 'with'?",
    shortAnswer: "'atexit' registers functions to run at exit; not directly related to 'with'.",
    explanation: "'with' provides immediate cleanup; 'atexit' is for program exit.",
    hint: "Different use cases.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "How does the 'with' statement handle exceptions in __enter__?",
    shortAnswer: "If __enter__ raises an exception, it propagates without calling __exit__.",
    explanation: "The resource was never acquired, so no cleanup needed.",
    hint: "Think about it.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "Can you use 'with' with a context manager that returns a different type?",
    shortAnswer: "Yes, __enter__ can return any object, not just the context manager.",
    explanation: "It's often the resource itself (like a file object).",
    hint: "The returned object is assigned with 'as'.",
    level: "advanced",
    codeExample: null
  }
];

export default questions;