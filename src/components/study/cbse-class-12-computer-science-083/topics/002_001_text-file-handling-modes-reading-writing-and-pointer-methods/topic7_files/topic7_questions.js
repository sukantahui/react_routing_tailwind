// 25 Authentic CBSE Board Examination Questions for Topic 7
const questions = [
  {
    "id": 1,
    "question": "What is the primary advantage of using the `with` statement when opening files in Python?",
    "options": [
      "It makes the file execute 10 times faster",
      "It guarantees that the file is automatically closed when the block exits, even if an exception occurs",
      "It encrypts the file contents",
      "It bypasses operating system permissions"
    ],
    "correctAnswer": 1,
    "explanation": "The `with` statement acts as a context manager, ensuring `close()` is executed automatically under all exit circumstances.",
    "hint": "Guarantees automatic file closure."
  },
  {
    "id": 2,
    "question": "Which Python protocol powers the `with` statement under the hood?",
    "options": [
      "Iterator Protocol (__iter__ and __next__)",
      "Context Manager Protocol (__enter__ and __exit__)",
      "Descriptor Protocol (__get__ and __set__)",
      "Callable Protocol (__call__)"
    ],
    "correctAnswer": 1,
    "explanation": "Context managers implement `__enter__()` (which opens the file and returns the handle) and `__exit__()` (which guarantees closure).",
    "hint": "__enter__ and __exit__."
  },
  {
    "id": 3,
    "question": "Consider the code:\n```python\nwith open('doc.txt', 'w') as f:\n    f.write('Hello')\nprint(f.closed)\n```\nWhat does the print statement output?",
    "options": [
      "False",
      "True",
      "None",
      "Raises AttributeError"
    ],
    "correctAnswer": 1,
    "explanation": "Once control leaves the indented `with` block, `f.close()` has executed, so `f.closed` evaluates to `True`.",
    "hint": "File is closed outside the block."
  },
  {
    "id": 4,
    "question": "Is it necessary to call `f.close()` explicitly inside a `with` block?",
    "options": [
      "Yes, mandatory",
      "No, it is completely redundant because the context manager closes it automatically",
      "Only if opened in write mode",
      "Only on Windows"
    ],
    "correctAnswer": 1,
    "explanation": "Calling `f.close()` inside a `with` block is redundant and unnecessary; the context manager handles cleanup automatically.",
    "hint": "Automatic closure makes it redundant."
  },
  {
    "id": 5,
    "question": "What happens if an unexpected runtime error (like `ZeroDivisionError`) occurs inside a `with` block?",
    "options": [
      "The file remains open indefinitely",
      "Python skips closing the file",
      "The file is automatically closed before the exception propagates up",
      "The file is deleted"
    ],
    "correctAnswer": 2,
    "explanation": "The `__exit__()` method is executed during stack unwinding, guaranteeing file closure even during crashes.",
    "hint": "Guaranteed closure during exceptions."
  },
  {
    "id": 6,
    "question": "Which keyword is used to alias the file object returned by `open()` in a `with` statement?",
    "options": [
      "into",
      "as",
      "to",
      "for"
    ],
    "correctAnswer": 1,
    "explanation": "The `as` keyword assigns the context manager's `__enter__()` return value to a variable (e.g. `with open(...) as f:`).",
    "hint": "The 'as' keyword."
  },
  {
    "id": 7,
    "question": "How can two files be opened simultaneously using a single `with` statement?",
    "options": [
      "with open('f1.txt') and open('f2.txt'):",
      "with open('f1.txt') as f1, open('f2.txt') as f2:",
      "with open('f1.txt') + open('f2.txt'):",
      "with (open('f1'), open('f2')):"
    ],
    "correctAnswer": 1,
    "explanation": "Multiple context managers can be chained cleanly using comma separation: `with open('a') as f1, open('b') as f2:`.",
    "hint": "Comma-separated context managers."
  },
  {
    "id": 8,
    "question": "Consider:\n```python\nwith open('story.txt', 'r') as f:\n    for line in f:\n        if 'Secret' in line:\n            break\n```\nDoes breaking out of the loop close the file?",
    "options": [
      "No, break prevents closure",
      "Yes, exiting the with block triggers automatic closure regardless of break",
      "Only if pass is placed after break",
      "Leaves file in undefined state"
    ],
    "correctAnswer": 1,
    "explanation": "Any exit from the `with` block (normal completion, `break`, `return`, or exception) triggers `__exit__()` and closes the file.",
    "hint": "Break triggers cleanup."
  },
  {
    "id": 9,
    "question": "Consider a function:\n```python\ndef get_first_line():\n    with open('log.txt') as f:\n        return f.readline()\n```\nIs the file closed when `return` executes?",
    "options": [
      "No, return halts before cleanup",
      "Yes, the with block cleans up before returning control to the caller",
      "Only on Linux",
      "Raises UnboundLocalError"
    ],
    "correctAnswer": 1,
    "explanation": "Returning inside a `with` block still executes `__exit__()`, safely closing the file before returning.",
    "hint": "Return triggers cleanup."
  },
  {
    "id": 10,
    "question": "Assertion (A): The `with` statement eliminates the need for manual `try ... finally: f.close()` boilerplate.\nReason (R): The `with` statement automatically manages acquisition and release of system resources.",
    "options": [
      "Both A and R are true and R is the correct explanation of A",
      "Both A and R are true but R is not the correct explanation of A",
      "A is true but R is false",
      "A is false but R is true"
    ],
    "correctAnswer": 0,
    "explanation": "`with` was introduced in PEP 343 specifically to encapsulate `try-finally` cleanup patterns cleanly.",
    "hint": "Replaces try-finally boilerplate."
  },
  {
    "id": 11,
    "question": "Can a file handle variable defined in `with open(...) as f:` be accessed outside the `with` block?",
    "options": [
      "No, it goes out of scope",
      "Yes, the variable f remains defined, but refers to a closed file object",
      "Causes NameError",
      "Only in Python 2"
    ],
    "correctAnswer": 1,
    "explanation": "Python blocks (like `with` or `for`) do not create new variable scopes; `f` remains accessible, but `f.closed` is True.",
    "hint": "No block-level scope in Python."
  },
  {
    "id": 12,
    "question": "What error occurs if you try `f.write('text')` outside the `with` block that created `f`?",
    "options": [
      "ValueError: I/O operation on closed file",
      "NameError",
      "AttributeError",
      "FileNotFoundError"
    ],
    "correctAnswer": 0,
    "explanation": "Because the file was closed upon exiting the block, subsequent I/O attempts raise `ValueError`.",
    "hint": "I/O on closed file error."
  },
  {
    "id": 13,
    "question": "Which method of the context manager is invoked when entering the `with` block?",
    "options": [
      "__start__()",
      "__init__()",
      "__enter__()",
      "__open__()"
    ],
    "correctAnswer": 2,
    "explanation": "`__enter__()` is called upon entry, setting up the resource and returning the bound target.",
    "hint": "__enter__ method."
  },
  {
    "id": 14,
    "question": "Which method of the context manager is invoked when exiting the `with` block?",
    "options": [
      "__stop__()",
      "__exit__()",
      "__close__()",
      "__del__()"
    ],
    "correctAnswer": 1,
    "explanation": "`__exit__()` is called upon exit to clean up and close resources.",
    "hint": "__exit__ method."
  },
  {
    "id": 15,
    "question": "What parameters are passed to `__exit__(self, exc_type, exc_val, exc_tb)` when an exception occurs?",
    "options": [
      "None",
      "The exception type, value, and traceback object",
      "The file name and mode",
      "The byte size of file"
    ],
    "correctAnswer": 1,
    "explanation": "`__exit__` receives the exception class, exception instance, and traceback information.",
    "hint": "Exception type, value, and traceback."
  },
  {
    "id": 16,
    "question": "Which of the following code snippets correctly copies `source.txt` to `dest.txt` using the `with` statement?",
    "options": [
      "with open('source.txt', 'r') as src, open('dest.txt', 'w') as dst:\n    dst.write(src.read())",
      "with open('source.txt') + open('dest.txt'): copy()",
      "with src = open('source.txt') and dst = open('dest.txt'): write()",
      "open('source.txt') as src with dst.write(src)"
    ],
    "correctAnswer": 0,
    "explanation": "Option 1 correctly chains both file handles and streams data from source to destination.",
    "hint": "Chained comma-separated context manager."
  },
  {
    "id": 17,
    "question": "Assertion (A): Using `with open(...)` prevents OS file descriptor exhaustion leaks.\nReason (R): It guarantees that files are not left hanging open if unexpected errors occur during processing.",
    "options": [
      "Both A and R are true and R is the correct explanation of A",
      "Both A and R are true but R is not the correct explanation of A",
      "A is true but R is false",
      "A is false but R is true"
    ],
    "correctAnswer": 0,
    "explanation": "Guaranteed closure prevents uncollected OS handles from exhausting descriptor quotas.",
    "hint": "Prevents resource leaks."
  },
  {
    "id": 18,
    "question": "What is the equivalent `try ... finally` structure for `with open('a.txt', 'r') as f: data = f.read()`?",
    "options": [
      "f = open('a.txt', 'r'); try: data = f.read(); finally: f.close()",
      "try: f.close(); finally: data = f.read()",
      "f = open('a.txt'); data = f.read(); f.close()",
      "try: f = open('a.txt') except: pass"
    ],
    "correctAnswer": 0,
    "explanation": "The `with` statement compiles to a `try...finally` block that guarantees `f.close()` in `finally`.",
    "hint": "Standard try-finally pattern."
  },
  {
    "id": 19,
    "question": "Is the `with` statement supported for binary files as well as text files?",
    "options": [
      "No, only text files",
      "Yes, with open('data.dat', 'wb') as f: works seamlessly",
      "Only with CSV files",
      "Only with JSON files"
    ],
    "correctAnswer": 1,
    "explanation": "The `with` statement works identically with text, binary (`'rb'`, `'wb'`), and CSV streams.",
    "hint": "Universal file support."
  },
  {
    "id": 20,
    "question": "Consider:\n```python\nwith open('test.txt', 'w') as f:\n    pass\n```\nWhat effect does this have on `test.txt`?",
    "options": [
      "Nothing happens",
      "Creates an empty file of 0 bytes (or truncates existing file to 0 bytes)",
      "Raises SyntaxError",
      "Deletes the file"
    ],
    "correctAnswer": 1,
    "explanation": "Opening in `'w'` mode creates or truncates the file to 0 bytes immediately upon entering.",
    "hint": "Creates or truncates."
  },
  {
    "id": 21,
    "question": "What does `f.readable()` return inside `with open('scores.txt', 'a') as f:`?",
    "options": [
      "True",
      "False",
      "None",
      "Raises AttributeError"
    ],
    "correctAnswer": 1,
    "explanation": "Mode `'a'` is append-only (write-only), so `f.readable()` returns `False`.",
    "hint": "Append-only is not readable."
  },
  {
    "id": 22,
    "question": "Why is the `with` statement preferred in CBSE Class 12 board examination code solutions?",
    "options": [
      "It scores extra bonus marks",
      "It produces clean, robust, pythonic code that avoids point deductions for unclosed files",
      "It is mandatory by CBSE statute",
      "It runs in parallel threads"
    ],
    "correctAnswer": 1,
    "explanation": "CBSE marking schemes reward pythonic resource management; `with` guarantees no penalties for forgotten `f.close()`.",
    "hint": "Clean and safe code."
  },
  {
    "id": 23,
    "question": "What happens if an invalid file path is given to `with open('missing.txt', 'r') as f:`?",
    "options": [
      "The with block executes with f = None",
      "FileNotFoundError is raised before entering the indented block",
      "Creates an empty file",
      "f.closed is set to True"
    ],
    "correctAnswer": 1,
    "explanation": "The exception occurs during `open()`, preventing entry into the `with` block.",
    "hint": "FileNotFoundError on open."
  },
  {
    "id": 24,
    "question": "Can custom user-defined classes be used with the `with` statement?",
    "options": [
      "No, only built-in file objects",
      "Yes, by defining __enter__() and __exit__() methods on the class",
      "Only if inheriting from file",
      "Only using ctypes"
    ],
    "correctAnswer": 1,
    "explanation": "Any Python class implementing `__enter__()` and `__exit__()` qualifies as a valid context manager.",
    "hint": "Implement enter and exit."
  },
  {
    "id": 25,
    "question": "In a CBSE 3-mark question: 'Write a function COUNT_WORDS() using the with statement to count words in STORY.TXT.' Which pattern is optimal?",
    "options": [
      "with open('STORY.TXT') as f: print(len(f.read().split()))",
      "f = open('STORY.TXT'); print(len(f.read())); f.close()",
      "with open('STORY.TXT'): readline()",
      "with open('STORY.TXT') as f: f.close()"
    ],
    "correctAnswer": 0,
    "explanation": "Opening with `with` and calculating `len(f.read().split())` is the canonical, full-credit CBSE solution.",
    "hint": "read().split() inside with."
  }
];

export default questions;
