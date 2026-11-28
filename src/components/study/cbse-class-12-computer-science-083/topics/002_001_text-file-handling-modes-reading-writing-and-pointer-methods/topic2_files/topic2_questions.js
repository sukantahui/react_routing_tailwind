// 25 Authentic CBSE Board Examination Questions for Topic 2
const questions = [
  {
    "id": 1,
    "question": "Which built-in function is utilized to open an existing file or create a new file in Python?",
    "options": [
      "create()",
      "file()",
      "open()",
      "connect()"
    ],
    "correctAnswer": 2,
    "explanation": "Python uses the built-in `open()` function to instantiate a file stream object.",
    "hint": "Standard 4-letter built-in function."
  },
  {
    "id": 2,
    "question": "What is returned by the `open()` function upon successfully opening a file?",
    "options": [
      "A boolean True",
      "The entire file content as a string",
      "A file handle / file stream object",
      "The physical byte size on disk"
    ],
    "correctAnswer": 2,
    "explanation": "`open()` returns a file object (handle) through which reading, writing, and seeking methods are accessed.",
    "hint": "File object handle."
  },
  {
    "id": 3,
    "question": "What exception is raised if `open('missing.txt', 'r')` is called for a non-existent file?",
    "options": [
      "FileExistsError",
      "FileNotFoundError",
      "EOFError",
      "ModeError"
    ],
    "correctAnswer": 1,
    "explanation": "Opening a non-existent file in read mode (`'r'`) triggers a `FileNotFoundError` (subclass of `OSError`).",
    "hint": "File is not found."
  },
  {
    "id": 4,
    "question": "Which method is used to formally release operating system resources allocated to a file handle?",
    "options": [
      "f.delete()",
      "f.release()",
      "f.close()",
      "f.exit()"
    ],
    "correctAnswer": 2,
    "explanation": "`f.close()` flushes pending write buffers and frees OS file descriptors.",
    "hint": "Opposite of open."
  },
  {
    "id": 5,
    "question": "Which attribute of a file object returns a boolean indicating whether the file has been closed?",
    "options": [
      "f.is_closed",
      "f.closed",
      "f.status",
      "f.state"
    ],
    "correctAnswer": 1,
    "explanation": "`f.closed` evaluates to `True` if the file has been closed, and `False` if it is currently open.",
    "hint": "Past participle attribute: closed."
  },
  {
    "id": 6,
    "question": "Which attribute returns the access mode string with which the file object was opened?",
    "options": [
      "f.access",
      "f.mode",
      "f.flag",
      "f.type"
    ],
    "correctAnswer": 1,
    "explanation": "`f.mode` returns the mode string, e.g., `'r'`, `'w'`, or `'a+'`.",
    "hint": "Attribute name matches the parameter."
  },
  {
    "id": 7,
    "question": "Which attribute returns the name of the file bound to the file object?",
    "options": [
      "f.filename",
      "f.name",
      "f.path",
      "f.title"
    ],
    "correctAnswer": 1,
    "explanation": "`f.name` stores the string name or path with which `open()` was invoked.",
    "hint": "Simple 4-letter property."
  },
  {
    "id": 8,
    "question": "Consider: `f = open('data.txt', 'w')`. Then `f.close()`. What does `print(f.closed)` output?",
    "options": [
      "False",
      "True",
      "None",
      "Raises ValueError"
    ],
    "correctAnswer": 1,
    "explanation": "After invoking `f.close()`, the `closed` attribute becomes `True`.",
    "hint": "The file is closed."
  },
  {
    "id": 9,
    "question": "What happens if a program attempts to read or write using a file handle that is already closed?",
    "options": [
      "Python reopens it automatically",
      "Raises ValueError: I/O operation on closed file",
      "Returns None silently",
      "Overwrites the file from index 0"
    ],
    "correctAnswer": 1,
    "explanation": "Performing I/O operations on a closed file handle triggers `ValueError: I/O operation on closed file`.",
    "hint": "I/O on closed file is invalid."
  },
  {
    "id": 10,
    "question": "Why is it vital to call `f.close()` in production software?",
    "options": [
      "To prevent memory fragmentation in CPU registers",
      "To flush dirty RAM buffers to disk and prevent OS file descriptor exhaustion",
      "To convert text into binary automatically",
      "To encrypt the file against viruses"
    ],
    "correctAnswer": 1,
    "explanation": "Closing ensures all buffered data is synchronized to disk and OS limits on concurrent open files are not violated.",
    "hint": "Buffer flushing and OS descriptor release."
  },
  {
    "id": 11,
    "question": "Which programming construct guarantees that `f.close()` will run even if an exception occurs during file processing?",
    "options": [
      "try ... finally",
      "while ... else",
      "for ... in",
      "if ... elif"
    ],
    "correctAnswer": 0,
    "explanation": "A `try ... finally` block (or `with` statement) guarantees code in `finally` executes under all circumstances.",
    "hint": "try-finally pattern."
  },
  {
    "id": 12,
    "question": "What is the second argument passed to `open(filename, mode)`?",
    "options": [
      "Character encoding only",
      "File access mode specifying intended operations",
      "Buffer size in megabytes",
      "File owner permissions"
    ],
    "correctAnswer": 1,
    "explanation": "The second positional parameter is the access mode string (e.g. `'r'`, `'w'`, `'a'`).",
    "hint": "Mode parameter."
  },
  {
    "id": 13,
    "question": "If the mode parameter is omitted in `open('story.txt')`, what default mode is assumed by Python?",
    "options": [
      "'w'",
      "'a'",
      "'r'",
      "'r+'"
    ],
    "correctAnswer": 2,
    "explanation": "The default access mode is `'r'` (read text mode).",
    "hint": "Read-only by default."
  },
  {
    "id": 14,
    "question": "Assertion (A): It is dangerous to assume Python will immediately close files automatically when variables go out of scope.\nReason (R): Garbage collection timing is non-deterministic and delayed in various Python runtimes.",
    "options": [
      "Both A and R are true and R is the correct explanation of A",
      "Both A and R are true but R is not the correct explanation of A",
      "A is true but R is false",
      "A is false but R is true"
    ],
    "correctAnswer": 0,
    "explanation": "Relying on CPython's reference counting is non-portable; explicit closure prevents lingering file locks.",
    "hint": "Garbage collection cannot guarantee prompt closure."
  },
  {
    "id": 15,
    "question": "Consider: `f = open('sample.txt')`. Which of the following statements about `f` is false?",
    "options": [
      "f.name contains 'sample.txt'",
      "f.mode contains 'r'",
      "f.closed is False initially",
      "f.readable() evaluates to False"
    ],
    "correctAnswer": 3,
    "explanation": "`f.readable()` returns `True` since the file was opened in read mode.",
    "hint": "Read mode files are readable."
  },
  {
    "id": 16,
    "question": "Which method manually forces data currently residing in the Python I/O buffer to be committed to physical disk without closing the handle?",
    "options": [
      "f.flush()",
      "f.commit()",
      "f.sync()",
      "f.writeback()"
    ],
    "correctAnswer": 0,
    "explanation": "`f.flush()` clears the internal buffer and forces immediate OS disk write.",
    "hint": "flush method."
  },
  {
    "id": 17,
    "question": "What does `f.writable()` return for a file opened with `f = open('test.txt', 'r')`?",
    "options": [
      "True",
      "False",
      "None",
      "Raises TypeError"
    ],
    "correctAnswer": 1,
    "explanation": "A file opened in `'r'` mode is read-only, so `f.writable()` returns `False`.",
    "hint": "Not writable in read mode."
  },
  {
    "id": 18,
    "question": "Consider the code:\n```python\nf = open('marks.txt', 'w')\nf.write('100')\n# Program halts abruptly without close\n```\nWhat risk exists?",
    "options": [
      "File marks.txt is permanently corrupted with random bytes",
      "The string '100' might remain trapped in the unflushed buffer and not appear in marks.txt",
      "The operating system refuses to boot",
      "Python deletes the script"
    ],
    "correctAnswer": 1,
    "explanation": "Small string writes remain in memory buffers; if the process halts before flush/close, disk writes are incomplete.",
    "hint": "Buffered writes may be lost."
  },
  {
    "id": 19,
    "question": "How many file handles can be simultaneously opened in Python?",
    "options": [
      "Exactly 256",
      "Unlimited by Python, but restricted by OS file descriptor table limits",
      "Exactly 1",
      "Only 10 per module"
    ],
    "correctAnswer": 1,
    "explanation": "Python does not impose an arbitrary cap; the operating system kernel imposes maximum open descriptor limits.",
    "hint": "Limited by operating system."
  },
  {
    "id": 20,
    "question": "Which parameter in `open()` explicitly defines the text character encoding standard?",
    "options": [
      "format='utf-8'",
      "encoding='utf-8'",
      "charset='utf-8'",
      "codec='utf-8'"
    ],
    "correctAnswer": 1,
    "explanation": "The parameter is named `encoding`, e.g. `open('doc.txt', 'r', encoding='utf-8')`.",
    "hint": "encoding parameter."
  },
  {
    "id": 21,
    "question": "Which method checks if a file stream supports random positioning methods like seek() and tell()?",
    "options": [
      "f.seekable()",
      "f.movable()",
      "f.random()",
      "f.can_seek()"
    ],
    "correctAnswer": 0,
    "explanation": "`f.seekable()` returns `True` if the stream allows pointer adjustments via `seek()`.",
    "hint": "seekable method."
  },
  {
    "id": 22,
    "question": "What is output by:\n```python\nf = open('temp.txt', 'w')\nprint(type(f.closed))\nf.close()\n```",
    "options": [
      "<class 'str'>",
      "<class 'bool'>",
      "<class 'int'>",
      "<class 'NoneType'>"
    ],
    "correctAnswer": 1,
    "explanation": "`f.closed` is a boolean attribute, so its type is `<class 'bool'>`.",
    "hint": "Boolean type."
  },
  {
    "id": 23,
    "question": "What is an OS file descriptor?",
    "options": [
      "A graphical file icon",
      "An integer handle maintained by the OS kernel to track an open file session",
      "A Python class method",
      "A security password on disk"
    ],
    "correctAnswer": 1,
    "explanation": "An OS file descriptor is a low-level integer indexing the process open file table in kernel memory.",
    "hint": "Low level kernel integer handle."
  },
  {
    "id": 24,
    "question": "Assertion (A): Calling `close()` on an already closed file raises a fatal exception.\nReason (R): Python does not allow duplicate close invocations.",
    "options": [
      "Both A and R are true",
      "Both A and R are false",
      "A is true but R is false",
      "A is false but R is true"
    ],
    "correctAnswer": 1,
    "explanation": "Both are false: In Python, calling `f.close()` multiple times on the same handle is a safe no-op and raises no exception.",
    "hint": "Multiple close calls are harmless."
  },
  {
    "id": 25,
    "question": "Which of the following lines correctly opens a file `story.txt` for appending text?",
    "options": [
      "f = open('story.txt', mode='write_append')",
      "f = open('story.txt', 'a')",
      "f = open('story.txt', '+')",
      "f = open('story.txt', 'app')"
    ],
    "correctAnswer": 1,
    "explanation": "The `'a'` access mode opens a text file for appending at the end.",
    "hint": "'a' for append."
  }
];

export default questions;
