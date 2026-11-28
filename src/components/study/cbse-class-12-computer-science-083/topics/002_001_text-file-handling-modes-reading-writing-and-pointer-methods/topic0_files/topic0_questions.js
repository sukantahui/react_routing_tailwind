// 25 Authentic CBSE Board Examination Questions for Topic 0
const questions = [
  {
    "id": 1,
    "question": "What happens to data stored in RAM when a Python program terminates?",
    "options": [
      "It is automatically written to disk",
      "It persists until computer restart",
      "It is completely lost from memory",
      "It is archived in virtual memory"
    ],
    "correctAnswer": 2,
    "explanation": "RAM is primary volatile memory; when a process finishes or power turns off, all data stored within it is cleared.",
    "hint": "RAM is volatile memory."
  },
  {
    "id": 2,
    "question": "Which term describes data storage that retains information even after the application halts or system is powered down?",
    "options": [
      "Volatile Storage",
      "Persistent Storage",
      "Transient Cache",
      "Registers"
    ],
    "correctAnswer": 1,
    "explanation": "Persistent (secondary) storage keeps data intact across program executions on media such as HDDs, SSDs, or optical drives.",
    "hint": "Persist means to endure over time."
  },
  {
    "id": 3,
    "question": "In computing terminology, what is a 'File'?",
    "options": [
      "A hardware register inside CPU",
      "A named collection of related data stored on secondary storage",
      "An in-memory Python variable",
      "A network communication socket"
    ],
    "correctAnswer": 1,
    "explanation": "A file is a named, structured sequence of bytes or characters permanently stored on secondary storage devices.",
    "hint": "Files exist on disk with a name."
  },
  {
    "id": 4,
    "question": "Why is persistent file handling indispensable in software applications?",
    "options": [
      "Because RAM capacity is infinite",
      "To preserve application state, user databases, and logs between runs",
      "To speed up CPU clock cycle",
      "To bypass operating system kernel"
    ],
    "correctAnswer": 1,
    "explanation": "Files allow long-term retention of records, logs, and configurations across distinct program runs.",
    "hint": "Think of databases and settings."
  },
  {
    "id": 5,
    "question": "Which component of the computer acts as the bridge between secondary storage and CPU processing?",
    "options": [
      "Primary Memory (RAM)",
      "Graphics Processing Unit (GPU)",
      "Optical Drive",
      "Ethernet Port"
    ],
    "correctAnswer": 0,
    "explanation": "CPU processes instructions and data held in RAM; files are read from secondary storage into RAM for processing.",
    "hint": "Primary main memory."
  },
  {
    "id": 6,
    "question": "Assertion (A): Variables declared in a Python script cannot retain values after the script exits.\nReason (R): Variable allocations reside in volatile primary memory (RAM).",
    "options": [
      "Both A and R are true and R is the correct explanation of A",
      "Both A and R are true but R is not the correct explanation of A",
      "A is true but R is false",
      "A is false but R is true"
    ],
    "correctAnswer": 0,
    "explanation": "Both statements are true. Memory allocated to program variables in RAM is reclaimed by the OS once execution ends.",
    "hint": "Recall memory lifetime."
  },
  {
    "id": 7,
    "question": "What is a 'Stream' in Python file input/output mechanics?",
    "options": [
      "A high-speed GPU pipeline",
      "A sequential flow of data elements being transferred between memory and secondary storage",
      "A video conferencing channel",
      "A recursive loop"
    ],
    "correctAnswer": 1,
    "explanation": "A stream is an abstraction representing a continuous sequential flow of bytes or characters between an I/O device and program memory.",
    "hint": "Flow of bytes."
  },
  {
    "id": 8,
    "question": "Which stream is mapped to standard output (`sys.stdout`) by default in Python?",
    "options": [
      "Keyboard stream",
      "Console screen / Terminal",
      "System Error file",
      "Temporary disk cache"
    ],
    "correctAnswer": 1,
    "explanation": "`sys.stdout` represents standard output, sending characters to the console display by default.",
    "hint": "Where print() outputs."
  },
  {
    "id": 9,
    "question": "Which built-in Python function is used to create or bind a file stream to a Python variable?",
    "options": [
      "bind()",
      "connect()",
      "open()",
      "load()"
    ],
    "correctAnswer": 2,
    "explanation": "`open()` establishes a file object (stream) bound to a file on secondary storage.",
    "hint": "Standard built-in function for files."
  },
  {
    "id": 10,
    "question": "What is an I/O buffer in file handling?",
    "options": [
      "A physical hard drive sector",
      "A temporary block of memory used to hold data during transmission between RAM and disk",
      "A permanent CPU register",
      "A firewall utility"
    ],
    "correctAnswer": 1,
    "explanation": "Buffering reduces expensive disk read/write cycles by grouping transfers in temporary RAM blocks.",
    "hint": "Intermediate holding area."
  },
  {
    "id": 11,
    "question": "Which method forcefully flushes buffered write data to disk without explicitly closing the file?",
    "options": [
      "file.clear()",
      "file.sync()",
      "file.flush()",
      "file.commit()"
    ],
    "correctAnswer": 2,
    "explanation": "`file.flush()` writes the contents of the I/O buffer to secondary storage immediately.",
    "hint": "Flush writes out buffers."
  },
  {
    "id": 12,
    "question": "What happens if a program crashes before the file buffer is flushed or the file closed?",
    "options": [
      "Data is safely restored from OS cache",
      "Buffered data not yet written to disk may be permanently lost",
      "The disk drives roll back",
      "The file automatically deletes itself"
    ],
    "correctAnswer": 1,
    "explanation": "Unflushed buffers reside in volatile memory and are lost if an abrupt process crash occurs before disk synchronization.",
    "hint": "Uncommitted RAM data vanishes."
  },
  {
    "id": 13,
    "question": "Which Python standard library module provides utilities for operating system file paths and disk queries?",
    "options": [
      "math",
      "sys",
      "os",
      "random"
    ],
    "correctAnswer": 2,
    "explanation": "The `os` module (and `pathlib`) contains OS file system operations, directory creation, path checks, and deletions.",
    "hint": "Two-letter module for Operating System."
  },
  {
    "id": 14,
    "question": "What is an absolute file path?",
    "options": [
      "A path relative to current working directory",
      "The complete root-to-file path specifying exact physical location on disk",
      "A URL web address",
      "A symbolic link only"
    ],
    "correctAnswer": 1,
    "explanation": "An absolute path specifies the full location starting from root (e.g. `C:\\Users\\...` or `/home/...`).",
    "hint": "Starts from the root drive."
  },
  {
    "id": 15,
    "question": "What is a relative file path?",
    "options": [
      "A path that changes dynamically during execution",
      "A path specified in relation to the current active working directory",
      "A path inside the CPU cache",
      "A path across a local area network"
    ],
    "correctAnswer": 1,
    "explanation": "Relative paths are resolved relative to the current working directory of the executing Python script.",
    "hint": "Relative to current folder."
  },
  {
    "id": 16,
    "question": "In Python, what is the default character encoding usually utilized by `open()` on modern UTF-8 operating systems?",
    "options": [
      "ASCII",
      "UTF-8",
      "UTF-16",
      "EBCDIC"
    ],
    "correctAnswer": 1,
    "explanation": "Python 3 defaults to platform-dependent encoding, typically UTF-8 on modern systems, handling international characters.",
    "hint": "Universal transformation format 8-bit."
  },
  {
    "id": 17,
    "question": "Which of the following is considered volatile primary memory?",
    "options": [
      "Solid State Drive (SSD)",
      "Hard Disk Drive (HDD)",
      "Random Access Memory (RAM)",
      "Magnetic Tape"
    ],
    "correctAnswer": 2,
    "explanation": "RAM is primary volatile storage, losing its state when electricity is disconnected.",
    "hint": "RAM loses power loses data."
  },
  {
    "id": 18,
    "question": "Which file handling concept ensures that secondary storage resources are properly released by the OS?",
    "options": [
      "De-referencing",
      "Closing the file via close() or with block",
      "Garbage collector cycle only",
      "System reboot"
    ],
    "correctAnswer": 1,
    "explanation": "Closing releases the OS file descriptor and flushes any pending write buffers.",
    "hint": "close() releases OS handles."
  },
  {
    "id": 19,
    "question": "Consider: `f = open('data.txt', 'w')`. What does `f` represent?",
    "options": [
      "The content string of the file",
      "A file handle / stream object representing the open file",
      "A boolean confirmation flag",
      "The byte size of data.txt"
    ],
    "correctAnswer": 1,
    "explanation": "`f` is a Python file object (stream handler) exposing methods like `read()`, `write()`, etc.",
    "hint": "It is an object handle."
  },
  {
    "id": 20,
    "question": "What is the consequence of leaving too many files open simultaneously without closing them?",
    "options": [
      "Hard drive physical wear",
      "Exhaustion of OS file descriptors leading to OSError",
      "CPU overheating",
      "Loss of Python installation"
    ],
    "correctAnswer": 1,
    "explanation": "The OS enforces limits on concurrent open file descriptors; failing to close them causes `OSError: Too many open files`.",
    "hint": "Resource exhaustion."
  },
  {
    "id": 21,
    "question": "Which of the following is NOT an advantage of persistent file storage?",
    "options": [
      "Data survives system shutdown",
      "Enables sharing information between different programs",
      "Instant nanosecond CPU register-speed direct access",
      "Supports large data volumes exceeding RAM capacity"
    ],
    "correctAnswer": 2,
    "explanation": "Secondary storage is significantly slower than CPU registers and RAM; nanosecond direct execution is an attribute of RAM/cache.",
    "hint": "Files on disk are slower than registers."
  },
  {
    "id": 22,
    "question": "What does the end-of-file (EOF) marker represent in file processing?",
    "options": [
      "A hardware fault on disk",
      "A condition indicating no further data can be read from the stream",
      "A syntax error in Python",
      "An encryption handshake"
    ],
    "correctAnswer": 1,
    "explanation": "EOF marks the terminal boundary of the stored file data.",
    "hint": "End of stream."
  },
  {
    "id": 23,
    "question": "How does Python indicate EOF when reading from a text file using `f.read()`?",
    "options": [
      "Raises EOFError exception",
      "Returns an empty string ''",
      "Returns None",
      "Returns False"
    ],
    "correctAnswer": 1,
    "explanation": "In text files, `read()`, `readline()`, etc., return an empty string `''` when EOF is reached.",
    "hint": "Empty string indicates end."
  },
  {
    "id": 24,
    "question": "Assertion (A): Secondary storage files allow data to be shared across distinct executions of an application.\nReason (R): Data in secondary storage is stored in non-volatile magnetic, optical, or flash media.",
    "options": [
      "Both A and R are true and R is the correct explanation of A",
      "Both A and R are true but R is not the correct explanation of A",
      "A is true but R is false",
      "A is false but R is true"
    ],
    "correctAnswer": 0,
    "explanation": "Non-volatile physical media enables data retention independent of CPU power, allowing inter-session sharing.",
    "hint": "Non-volatile means permanence."
  },
  {
    "id": 25,
    "question": "Which of the following files is NOT human-readable directly in a plain text editor?",
    "options": [
      "summary.txt",
      "notes.py",
      "student.dat (serialized binary file)",
      "report.csv"
    ],
    "correctAnswer": 2,
    "explanation": "Binary files (`.dat`) store raw byte streams, appearing as scrambled characters when viewed in plain text editors.",
    "hint": ".dat binary serialized file."
  }
];

export default questions;
