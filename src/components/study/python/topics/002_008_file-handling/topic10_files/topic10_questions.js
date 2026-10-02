// Question Bank for Topic 10: Writing Files: write(), writelines(), appending data
// Module: 002_008_file-handling | Python from Basic to Pro
// Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)

const questions = [
  {
    question: "What is the return value of Python's file.write(text) method?",
    shortAnswer: "It returns an integer representing the exact number of characters written to the file.",
    explanation: "When you call file.write(string) on a text stream in Python 3, the method returns the integer count of characters (or bytes in binary mode) written into the stream buffer. For instance, f.write('Hello\\n') returns 6.",
    hint: "Think about character count including any explicit newline escape characters.",
    level: "basic",
    codeExample: "with open('demo.txt', 'w', encoding='utf-8') as f:\n    count = f.write('Coder & AccoTax\\n')\n    print(f'Characters written: {count}')  # Outputs: 16"
  },
  {
    question: "What happens if you pass an integer or float directly into file.write() without converting it?",
    shortAnswer: "Python raises a TypeError: write() argument must be str, not int.",
    explanation: "The write() method on text-mode file objects strictly expects a string (str). It does not perform automatic type coercion. Any numeric, boolean, list, or dictionary value must first be converted to a string using str(), f-strings, or format().",
    hint: "Check the expected argument type of the file.write() method signature.",
    level: "basic",
    codeExample: "# Incorrect:\n# f.write(4500) -> TypeError\n\n# Correct:\nwith open('fees.txt', 'w') as f:\n    amount = 4500\n    f.write(f'Paid: ₹{amount}\\n')  # String formatting"
  },
  {
    question: "Does file.write() automatically append a newline character ('\\n') at the end of each line?",
    shortAnswer: "No, write() writes exactly the string provided without appending any newline automatically.",
    explanation: "Unlike the built-in print() function (which defaults to end='\\n'), file.write() does not insert newlines. If you call f.write('Mamata') and f.write('Barrackpore'), the file will contain 'MamataBarrackpore' on the exact same line unless you explicitly include '\\n'.",
    hint: "Contrast the default behavior of print() with the raw stream behavior of write().",
    level: "basic",
    codeExample: "with open('names.txt', 'w') as f:\n    f.write('Mamata\\n')      # Explicit \\n creates new line\n    f.write('Debangshu\\n')"
  },
  {
    question: "What is the primary purpose and return value of file.writelines(lines)?",
    shortAnswer: "It writes a sequence of strings from any iterable into the file and returns None.",
    explanation: "file.writelines() accepts an iterable containing strings (such as a list of strings, a tuple, or a generator). It iterates through the sequence and writes each string consecutively to the file stream. The return value of writelines() is always None.",
    hint: "Note that writelines() does not return a character count like write() does.",
    level: "basic",
    codeExample: "lines = ['Mamata\\n', 'Debangshu\\n', 'Susmita\\n']\nwith open('students.txt', 'w') as f:\n    res = f.writelines(lines)\n    print(res)  # None"
  },
  {
    question: "What is the most common beginner mistake when using file.writelines()?",
    shortAnswer: "Assuming writelines() automatically inserts newline characters between list items.",
    explanation: "Despite its plural name, writelines() simply concatenates each string from the iterable into the file without injecting separators or newlines. If lines=['A', 'B', 'C'], writelines(lines) produces 'ABC'. You must ensure each item ends with '\\n' beforehand.",
    hint: "Think about whether 'writelines' formats line breaks on its own.",
    level: "moderate",
    codeExample: "names = ['Mamata', 'Mahima', 'Abhronila']\n# Correct technique using list comprehension:\nwith open('out.txt', 'w') as f:\n    f.writelines([f'{name}\\n' for name in names])"
  },
  {
    question: "What is the critical difference between opening a file in 'w' mode versus 'a' mode?",
    shortAnswer: "'w' truncates (erases) existing content to 0 bytes, whereas 'a' preserves existing content and appends to the end.",
    explanation: "In 'w' (write) mode, if the file exists, Python immediately truncates it to 0 bytes upon opening, destroying previous data. In 'a' (append) mode, the existing data is left intact and the write pointer is automatically placed at the end of the file.",
    hint: "Consider what happens to your historical log files if opened with 'w' instead of 'a'.",
    level: "basic",
    codeExample: "# 'w' overwrites everything:\nwith open('log.txt', 'w') as f:\n    f.write('New Day\\n')\n\n# 'a' keeps history:\nwith open('log.txt', 'a') as f:\n    f.write('New Transaction\\n')"
  },
  {
    question: "What occurs if you attempt to open a non-existent file in 'a' (append) mode?",
    shortAnswer: "Python creates a new, empty file and opens it for appending without raising an error.",
    explanation: "Both 'w' and 'a' modes check if the file exists on disk. If it does not exist, the operating system creates a new empty file at that path. Only reading modes like 'r' raise a FileNotFoundError if the file is absent.",
    hint: "Think about whether append mode can initiate a brand new log file.",
    level: "basic",
    codeExample: "# Even if 'new_audit.log' doesn't exist, this succeeds:\nwith open('new_audit.log', 'a', encoding='utf-8') as f:\n    f.write('System initialized.\\n')"
  },
  {
    question: "What is the purpose of exclusive creation mode ('x') in Python file handling?",
    shortAnswer: "It opens a file for writing ONLY if the file does not already exist, raising FileExistsError otherwise.",
    explanation: "Mode 'x' prevents accidental overwriting of vital files. If the target file already exists on the filesystem, Python immediately throws a FileExistsError. If the file does not exist, it creates it and opens it in write mode.",
    hint: "Think of 'x' as a safety shield against unintentional file erasure.",
    level: "moderate",
    codeExample: "try:\n    with open('unique_token.txt', 'x') as f:\n        f.write('TOKEN_99812')\nexcept FileExistsError:\n    print('Warning: File already exists! Overwrite prevented.')"
  },
  {
    question: "What does the file.flush() method do and when should you call it explicitly?",
    shortAnswer: "It forces buffered data in Python's internal memory buffer to be written out to the operating system stream.",
    explanation: "For performance reasons, Python buffers file write operations in RAM before committing them to the operating system file descriptor. Calling file.flush() empties this user-space buffer immediately. It is essential in long-running services, real-time logging, and interactive daemons.",
    hint: "Think about why a tail -f log watcher might not see lines immediately without flushing.",
    level: "moderate",
    codeExample: "import time\nwith open('sensor.log', 'w') as f:\n    f.write('Critical Alarm: Overheat detected\\n')\n    f.flush()  # Immediately visible to other processes\n    time.sleep(10)"
  },
  {
    question: "What is the difference between file.flush() and os.fsync(file.fileno())?",
    shortAnswer: "file.flush() flushes Python's internal buffer to the OS, while os.fsync() forces the OS kernel to commit dirty pages to physical disk hardware.",
    explanation: "file.flush() only transfers data from Python's C-level stream buffer to the OS kernel page cache. If power is lost instantly, data in the OS page cache might still be lost. os.fsync(f.fileno()) issues an OS sync syscall, guaranteeing that data is physically written to the non-volatile storage drive.",
    hint: "Distinguish between Python user-space memory, OS page cache, and physical storage.",
    level: "expert",
    codeExample: "import os\nwith open('bank_ledger.txt', 'a') as f:\n    f.write('TXN_ID_9901: ₹50,000 Transferred\\n')\n    f.flush()            # Python RAM -> OS Cache\n    os.fsync(f.fileno()) # OS Cache -> Physical SSD"
  },
  {
    question: "How does the 'w+' mode behave compared to 'r+' and 'a+' modes?",
    shortAnswer: "'w+' allows reading and writing but truncates (erases) the file to 0 bytes on open.",
    explanation: "All three modes support read+write operations, but their starting behavior differs significantly: 'r+' opens for reading and writing without truncation (pointer at start); 'a+' opens for reading and writing without truncation (pointer at end for writing); 'w+' wipes the file clean to 0 bytes immediately upon opening.",
    hint: "Remember the danger of 'w' prefix in 'w+'—it always truncates!",
    level: "moderate",
    codeExample: "with open('data.txt', 'w+') as f:\n    f.write('Initial Text\\n')\n    f.seek(0)  # Rewind to start to read\n    content = f.read()\n    print(content)  # 'Initial Text\\n'"
  },
  {
    question: "In 'a+' (append and read) mode, where is the file pointer initially positioned for read operations?",
    shortAnswer: "At the end of the file (EOF), meaning f.read() returns an empty string unless you f.seek(0) first.",
    explanation: "When opening with 'a+', the file pointer starts at the end of the existing content. If you immediately call f.read(), it reads from the pointer to EOF, returning ''. To read the file content, you must explicitly reposition the pointer using f.seek(0). Note that subsequent writes will still always append to the end in append mode.",
    hint: "Consider what f.tell() returns immediately after opening a file in 'a+' mode.",
    level: "moderate",
    codeExample: "with open('notes.txt', 'a+') as f:\n    f.write('Appended Line\\n')\n    f.seek(0)            # Move pointer to beginning\n    print(f.read())      # Reads all text including appended line"
  },
  {
    question: "Why is it dangerous to write files directly without the 'with' statement in production?",
    shortAnswer: "If an unhandled exception occurs before file.close(), data in the buffer may be lost and the file descriptor remains leaked.",
    explanation: "The with statement uses the context manager protocol (__enter__ and __exit__). It guarantees that f.close() is called unconditionally, flushing all buffers and releasing operating system file handles, even if a RuntimeError, KeyboardInterrupt, or MemoryError occurs.",
    hint: "Think about file descriptor exhaustion and dirty buffer leaks.",
    level: "basic",
    codeExample: "# Unsafe:\nf = open('data.txt', 'w')\nf.write('Hello')\n# If an error happens here, file stays open!\nf.close()\n\n# Safe:\nwith open('data.txt', 'w') as f:\n    f.write('Hello')"
  },
  {
    question: "How can you write a list of dictionaries to a text file in a clean, human-readable format using write()?",
    shortAnswer: "Iterate through the dictionary list and format each record using f-string template alignment with newlines.",
    explanation: "You can format tabular columns using f-string specifiers like {value:<width} (left-aligned), {value:>width} (right-aligned), and {value:^width} (centered) and append '\\n' at the end of each row.",
    hint: "Use format specifiers inside f-strings for neat columns.",
    level: "moderate",
    codeExample: "students = [{'name': 'Mamata', 'score': 95}, {'name': 'Debangshu', 'score': 92}]\nwith open('report.txt', 'w') as f:\n    f.write(f'{\"Name\":<15} {\"Score\":>5}\\n')\n    f.write('-'*21 + '\\n')\n    for s in students:\n        f.write(f'{s[\"name\"]: <15} {s[\"score\"]:>5}\\n')"
  },
  {
    question: "What is the memory-efficient way to write millions of lines to a file with writelines()?",
    shortAnswer: "Pass a generator expression or generator function to writelines() instead of creating a huge list in RAM.",
    explanation: "If you construct a list with 10,000,000 strings, Python allocates gigabytes of RAM. Passing a generator expression (f'{i}\\n' for i in range(10_000_000)) produces one string at a time on-demand, keeping RAM usage minimal (O(1) memory overhead).",
    hint: "Replace square brackets [] with parentheses () for lazy stream evaluation.",
    level: "expert",
    codeExample: "# Generates 1,000,000 lines with zero RAM spikes:\nwith open('big_log.txt', 'w') as f:\n    f.writelines(f'Record #{i:07d}: OK\\n' for i in range(1, 1_000_001))"
  },
  {
    question: "How do you handle special characters (such as Bengali or Hindi text, or currency symbols like ₹) when writing files?",
    shortAnswer: "Always pass encoding='utf-8' explicitly in the open() function.",
    explanation: "On Windows, Python's default encoding may default to the system locale (such as cp1252 or ANSI). Attempting to write non-ASCII characters like '₹', 'নমস্কার', or emojis without UTF-8 will trigger a UnicodeEncodeError. Specifying encoding='utf-8' guarantees universal compatibility.",
    hint: "Never rely on the operating system default encoding when opening files.",
    level: "basic",
    codeExample: "with open('receipt.txt', 'w', encoding='utf-8') as f:\n    f.write('Student: মমতা (Mamata) | Fee: ₹4,500\\n')"
  },
  {
    question: "What is an Atomic Write and why is it considered an industry best practice?",
    shortAnswer: "Writing to a temporary staging file first and then atomically renaming it over the target file using os.replace().",
    explanation: "If a server loses power while Python is midway through f.write() on 'config.json', the original file is left corrupted or half-empty. In atomic writing, data is written and synced to a temporary file in the same directory, then os.replace() swaps the files in one atomic OS filesystem operation.",
    hint: "Consider how to prevent file corruption during sudden server reboots.",
    level: "expert",
    codeExample: "import tempfile, os\nwith tempfile.NamedTemporaryFile('w', dir='.', delete=False) as tf:\n    tf.write('New Valid Config')\n    tf.flush()\n    os.fsync(tf.fileno())\n    temp_name = tf.name\nos.replace(temp_name, 'config.json')"
  },
  {
    question: "What error is raised if you try to call f.write() on a file opened in read mode ('r')?",
    shortAnswer: "io.UnsupportedOperation: not writable",
    explanation: "Opening a file in 'r' mode creates a read-only stream. Attempting to call write() or writelines() on this stream triggers an io.UnsupportedOperation exception indicating that write permissions were not granted.",
    hint: "Think about the permissions set by the mode flag.",
    level: "basic",
    codeExample: "with open('readonly.txt', 'r') as f:\n    try:\n        f.write('Text')\n    except Exception as e:\n        print(type(e), e)  # <class 'io.UnsupportedOperation'> not writable"
  },
  {
    question: "What error occurs if you call f.write() after the 'with' block has completed?",
    shortAnswer: "ValueError: I/O operation on closed file.",
    explanation: "Once execution leaves the with block, the context manager automatically calls f.close(). Attempting any read, write, or seek operation on a closed file object raises a ValueError.",
    hint: "Check whether the file handle is still active outside the indented context block.",
    level: "basic",
    codeExample: "with open('data.txt', 'w') as f:\n    f.write('Line 1\\n')\n# File is now closed\ntry:\n    f.write('Line 2\\n')\nexcept ValueError as err:\n    print(err)  # I/O operation on closed file."
  },
  {
    question: "How does the newline parameter in open('file.txt', 'w', newline='') affect newline translation on Windows?",
    shortAnswer: "It disables Python's universal newline translation, preventing '\\n' from being automatically converted to '\\r\\n'.",
    explanation: "By default on Windows, Python translates every '\\n' written into CRLF ('\\r\\n') in text mode. Setting newline='' preserves literal '\\n' or ensures modules like the csv writer can manage exact line terminators without inserting extra blank lines.",
    hint: "Recall why CSV writers on Windows require newline='' to avoid double spacing.",
    level: "expert",
    codeExample: "with open('unix_output.txt', 'w', newline='\\n', encoding='utf-8') as f:\n    f.write('Line1\\nLine2\\n')  # Guaranteed LF line endings even on Windows"
  },
  {
    question: "How can you write data from a Python dictionary to a JSON file using json.dump()?",
    shortAnswer: "Open the file in 'w' mode with UTF-8 encoding and call json.dump(data, file, indent=4).",
    explanation: "json.dump(obj, fp) serializes a Python dictionary or list directly into a writable file stream fp. Passing indent=4 formats the output with pretty-printed indentation.",
    hint: "Notice the difference between json.dumps (to string) and json.dump (to file stream).",
    level: "moderate",
    codeExample: "import json\nstudent = {'name': 'Susmita', 'center': 'Kolkata', 'score': 98}\nwith open('student.json', 'w', encoding='utf-8') as f:\n    json.dump(student, f, indent=4)"
  },
  {
    question: "If you open a file in append mode ('a') and execute f.seek(0), where will f.write('Hello') write the text?",
    shortAnswer: "It will still append 'Hello' at the end of the file.",
    explanation: "In standard append mode ('a' or 'a+'), the operating system (specifically POSIX O_APPEND flag or Windows equivalent) forces all write operations to occur at the end of the file, regardless of any preceding seek() calls.",
    hint: "Append mode overrides the write pointer to always point to EOF during write calls.",
    level: "expert",
    codeExample: "with open('log.txt', 'a+') as f:\n    f.seek(0)           # Pointer moved to start for READING\n    f.write('Appended') # Still written at the END of the file!"
  },
  {
    question: "How can you write multiple lines using the print() function directed to a file?",
    shortAnswer: "By supplying the file keyword argument: print('Text', file=f).",
    explanation: "Python's built-in print() function accepts a file keyword argument (defaulting to sys.stdout). Passing an open writable file object directs the printed output to that file, automatically handling string conversion and appending newlines (unless end is customized).",
    hint: "Check the optional keyword parameters of print().",
    level: "moderate",
    codeExample: "with open('output.txt', 'w') as f:\n    print('Mamata', 'Barrackpore', 95, sep=' | ', file=f)\n    print('Debangshu', 'Jadavpur', 92, sep=' | ', file=f)"
  },
  {
    question: "What is the difference between buffer modes in open(): buffering=0, buffering=1, and buffering=-1?",
    shortAnswer: "0 = unbuffered (binary only), 1 = line-buffered (text mode only), -1 = system default buffer size (typically 4KB to 8KB).",
    explanation: "Buffering controls when Python sends data to the operating system. In line-buffered mode (1), writes are flushed automatically whenever a '\\n' is written. In default buffered mode (-1), writes are stored until the internal buffer is full.",
    hint: "Consider how buffering affects I/O performance vs real-time interactivity.",
    level: "expert",
    codeExample: "# Line-buffered writing (flushes on every '\\n'):\nwith open('live.log', 'w', buffering=1) as f:\n    f.write('Immediate log entry\\n')"
  },
  {
    question: "How do you append a list of strings to an existing file without overwriting old lines?",
    shortAnswer: "Open the file with mode='a' and pass the formatted list to f.writelines().",
    explanation: "Opening in mode='a' preserves existing lines and positions the pointer at the end. Calling writelines() writes all new items from the list to the end of the file.",
    hint: "Combine mode='a' with writelines().",
    level: "basic",
    codeExample: "new_students = ['Mahima\\n', 'Abhronila\\n']\nwith open('roster.txt', 'a') as f:\n    f.writelines(new_students)"
  },
  {
    question: "Why should you avoid opening and closing a file inside a tight loop when writing thousands of lines?",
    shortAnswer: "Opening and closing files repeatedly creates massive OS file-system overhead and degrades performance.",
    explanation: "Each open() and close() call requires OS system calls to resolve paths, check permissions, allocate kernel file descriptors, and flush buffers. Opening the file once outside the loop is hundreds of times faster.",
    hint: "Keep open() outside the loop, write inside the loop.",
    level: "moderate",
    codeExample: "# Slow (Anti-pattern):\n# for item in items: with open('file.txt', 'a') as f: f.write(item)\n\n# Fast (Optimal):\nwith open('file.txt', 'a') as f:\n    for item in items:\n        f.write(item)"
  },
  {
    question: "How can you write binary data (such as raw bytes or images) to a file in Python?",
    shortAnswer: "Open the file in binary write mode ('wb') or binary append mode ('ab') and pass bytes objects to write().",
    explanation: "In binary modes ('wb', 'ab'), write() accepts bytes or bytearray instances rather than strings. Encoding and line-ending translations are completely disabled.",
    hint: "Notice the 'b' suffix in the mode string.",
    level: "moderate",
    codeExample: "data = bytes([0x48, 0x65, 0x6C, 0x6C, 0x6F])  # b'Hello'\nwith open('binary_data.bin', 'wb') as f:\n    f.write(data)"
  },
  {
    question: "What happens if a disk runs out of space while calling file.write()?",
    shortAnswer: "Python raises an OSError (specifically errno.ENOSPC: No space left on device).",
    explanation: "When the underlying filesystem runs out of storage space or disk quota, the operating system kernel rejects the write call and Python translates the error into an OSError with error message 'No space left on device'.",
    hint: "Catch OSError to handle low-level disk exhaustion safely.",
    level: "expert",
    codeExample: "try:\n    with open('massive_dump.txt', 'w') as f:\n        f.write('Data...' * 10_000_000)\nexcept OSError as err:\n    print(f'Storage error: {err}')"
  },
  {
    question: "How can you write formatted currency and floating-point values accurately into a report file?",
    shortAnswer: "Use f-strings with format specifiers such as ₹{amount:,.2f} to include commas and fixed decimal precision.",
    explanation: "Python's f-string formatting allows embedding localized symbols, thousand grouping commas (,), and decimal precision (.2f) directly inside the string before passing to write().",
    hint: "Use :,.2f format specifiers.",
    level: "basic",
    codeExample: "revenue = 1450250.75\nwith open('summary.txt', 'w', encoding='utf-8') as f:\n    f.write(f'Total Collections: ₹{revenue:,.2f}\\n')\n    # Produces: Total Collections: ₹1,450,250.75"
  },
  {
    question: "What is the best practice for building a reusable append-only audit logger in Python?",
    shortAnswer: "Encapsulate the write in a function that opens in 'a' mode, formats ISO/local timestamps, includes log levels, and flushes critical events.",
    explanation: "A professional audit logging function accepts the event description, actor, and severity level, appends a structured record with a timestamp to the log file, handles I/O exceptions gracefully, and calls f.flush() on critical errors.",
    hint: "Combine timestamps, severity tags, append mode, and explicit flushing.",
    level: "expert",
    codeExample: "from datetime import datetime\ndef audit_log(event, user='System', level='INFO'):\n    ts = datetime.now().isoformat()\n    with open('audit.log', 'a', encoding='utf-8') as f:\n        f.write(f'[{ts}] [{level}] User: {user} - {event}\\n')\n        if level in ('ERROR', 'CRITICAL'):\n            f.flush()"
  }
];

export default questions;
