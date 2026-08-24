// topic11_questions.js
// 30 questions about closing files (moderate to expert)

const questions = [
  {
    question: "Why is it important to close files in Python?",
    shortAnswer: "To release system resources and flush buffered data to disk.",
    explanation: "Open files consume file descriptors, which are limited. Not closing can cause resource leaks.",
    hint: "Think of it as closing a book when you're done reading.",
    level: "basic",
    codeExample: null
  },
  {
    question: "What does the `close()` method do?",
    shortAnswer: "Flushes the buffer and releases the file descriptor.",
    explanation: "After closing, the file object cannot be used for I/O.",
    hint: "It's the final cleanup step.",
    level: "basic",
    codeExample: "f.close()"
  },
  {
    question: "What is the `with` statement used for?",
    shortAnswer: "It's a context manager that automatically closes the file when the block exits.",
    explanation: "It ensures the file is closed even if an exception occurs.",
    hint: "The Pythonic way to handle files.",
    level: "intermediate",
    codeExample: "with open('file.txt') as f: data = f.read()"
  },
  {
    question: "What happens if you don't close a file?",
    shortAnswer: "The file descriptor is leaked, potentially causing resource exhaustion.",
    explanation: "In long-running applications, this can lead to 'too many open files' errors.",
    hint: "It's a resource leak.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "What error is raised when you use a closed file?",
    shortAnswer: "ValueError.",
    explanation: "The error message says 'I/O operation on closed file'.",
    hint: "Check `f.closed` before operations.",
    level: "intermediate",
    codeExample: "f = open('file.txt'); f.close(); f.read()  # ValueError"
  },
  {
    question: "How can you check if a file is already closed?",
    shortAnswer: "Using the `closed` attribute: `f.closed`.",
    explanation: "It returns True if the file is closed, False otherwise.",
    hint: "Always check before operations.",
    level: "basic",
    codeExample: "if not f.closed: f.read()"
  },
  {
    question: "Is closing a file twice safe?",
    shortAnswer: "Yes, calling close() on an already closed file does nothing.",
    explanation: "It's idempotent; no error is raised.",
    hint: "No harm done.",
    level: "intermediate",
    codeExample: "f.close(); f.close()  # safe"
  },
  {
    question: "What is the difference between `with` and `try-finally` for closing?",
    shortAnswer: "`with` is more concise and Pythonic; `try-finally` is more explicit.",
    explanation: "Both ensure the file is closed. `with` is preferred for readability.",
    hint: "Use `with` for simplicity.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "Can you use a file object after the `with` block ends?",
    shortAnswer: "No, the file object is closed and cannot be used.",
    explanation: "The `with` block limits the scope of the file object.",
    hint: "The file object is not accessible outside the block.",
    level: "intermediate",
    codeExample: "with open('file.txt') as f: data = f.read(); # f is closed here"
  },
  {
    question: "What is a file descriptor?",
    shortAnswer: "A low-level integer handle used by the OS to identify an open file.",
    explanation: "Python's file object wraps a file descriptor.",
    hint: "It's the OS's way of tracking open files.",
    level: "advanced",
    codeExample: "f.fileno()"
  },
  {
    question: "What is the 'too many open files' error?",
    shortAnswer: "An OS-level error when the process exceeds the maximum open file descriptors.",
    explanation: "This happens when files are not closed properly.",
    hint: "It's a classic symptom of resource leaks.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "Does Python automatically close files when the program exits?",
    shortAnswer: "Yes, the interpreter closes open files on exit.",
    explanation: "But relying on this is bad practice; always close explicitly.",
    hint: "Don't rely on the interpreter to clean up.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "What is garbage collection and how does it relate to file closing?",
    shortAnswer: "GC automatically frees objects no longer in use, which may close files.",
    explanation: "But GC is not deterministic; you cannot rely on it for resource cleanup.",
    hint: "Use `with` for guaranteed cleanup.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "Can you use `with` with multiple files?",
    shortAnswer: "Yes, using a single `with` with comma-separated open calls.",
    explanation: "Example: `with open('a') as f1, open('b') as f2:`.",
    hint: "Both files are closed automatically.",
    level: "intermediate",
    codeExample: "with open('src') as src, open('dst', 'w') as dst: dst.write(src.read())"
  },
  {
    question: "What happens if an exception occurs inside a `with` block?",
    shortAnswer: "The file is still closed before the exception propagates.",
    explanation: "The context manager's `__exit__` method is called, closing the file.",
    hint: "That's the main advantage of `with`.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "What is the `__exit__` method in a context manager?",
    shortAnswer: "It's called when the `with` block exits, handling cleanup.",
    explanation: "For file objects, `__exit__` calls `close()`.",
    hint: "It's the magic behind `with`.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "Is it possible to close a file that was opened with `with` manually?",
    shortAnswer: "Yes, but it's unnecessary and redundant.",
    explanation: "The file is already closed when the `with` block exits.",
    hint: "You can call `f.close()` inside the block, but it's pointless.",
    level: "intermediate",
    codeExample: "with open('file.txt') as f: f.close()  # redundant"
  },
  {
    question: "What is the `flush()` method and how does it relate to closing?",
    shortAnswer: "`flush()` writes buffered data to disk without closing the file.",
    explanation: "Closing implicitly calls `flush()`.",
    hint: "`flush()` is like saving without closing.",
    level: "advanced",
    codeExample: "f.flush()"
  },
  {
    question: "Why might a file not be fully written when you close it?",
    shortAnswer: "It might if you close a file that wasn't properly flushed.",
    explanation: "But `close()` flushes, so data should be written.",
    hint: "Use `flush()` or `close()` to ensure writes.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "What is the danger of relying on `__del__` for closing files?",
    shortAnswer: "`__del__` is not guaranteed to be called, and may not close in time.",
    explanation: "Resource cleanup should be explicit, not left to `__del__`.",
    hint: "Never rely on `__del__` for resource cleanup.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "Can you reopen a closed file object?",
    shortAnswer: "No, you must call `open()` again.",
    explanation: "A closed file object is no longer valid.",
    hint: "Just open it again.",
    level: "basic",
    codeExample: "f = open('file.txt'); f.close(); f = open('file.txt')  # new object"
  },
  {
    question: "What is the recommended way to handle files in Python?",
    shortAnswer: "Using the `with` statement (context manager).",
    explanation: "It's safe, Pythonic, and automatically handles closing.",
    hint: "Always use `with open()`.",
    level: "basic",
    codeExample: "with open('file.txt') as f:"
  },
  {
    question: "Why is closing files important in web servers and long-running applications?",
    shortAnswer: "To prevent resource exhaustion over time.",
    explanation: "Leaked file descriptors accumulate and eventually crash the process.",
    hint: "It's a scalability issue.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "What is the `os.close()` function and how is it different from `f.close()`?",
    shortAnswer: "`os.close(fd)` closes a file descriptor directly; `f.close()` closes a file object.",
    explanation: "Use `f.close()` for Python file objects.",
    hint: "`os.close()` is low-level.",
    level: "advanced",
    codeExample: "os.close(f.fileno())"
  },
  {
    question: "Can you close a file that was opened in another function?",
    shortAnswer: "Yes, if you have access to the file object.",
    explanation: "The file object can be passed between functions.",
    hint: "But it's better to use `with` to manage scope.",
    level: "intermediate",
    codeExample: "def close_file(f): f.close()"
  },
  {
    question: "What happens to the buffer when you close a file?",
    shortAnswer: "The buffer is flushed, writing any remaining data to disk.",
    explanation: "Closing ensures all data is persisted.",
    hint: "Flushing is part of closing.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "What is the `atexit` module and how can it help with file closing?",
    shortAnswer: "It registers functions to run at program exit, helping with cleanup.",
    explanation: "Not needed with `with`, but can be used for legacy code.",
    hint: "Rarely needed.",
    level: "advanced",
    codeExample: "import atexit; atexit.register(f.close)"
  },
  {
    question: "Why is the `with` statement considered Pythonic?",
    shortAnswer: "It encapsulates resource management in a clean, readable syntax.",
    explanation: "It makes the intent clear and reduces boilerplate.",
    hint: "Python's philosophy: explicit is better than implicit.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "Can you use `with` with objects other than files?",
    shortAnswer: "Yes, any object that implements the context manager protocol.",
    explanation: "Common examples: locks, database connections, network sockets.",
    hint: "It's a general-purpose resource management pattern.",
    level: "advanced",
    codeExample: "with threading.Lock():"
  },
  {
    question: "What is the contextlib module?",
    shortAnswer: "It provides utilities for creating context managers.",
    explanation: "Use `contextlib.contextmanager` to create custom context managers.",
    hint: "Advanced topic for custom context managers.",
    level: "advanced",
    codeExample: "from contextlib import contextmanager"
  }
];

export default questions;