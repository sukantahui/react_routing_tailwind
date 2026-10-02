// Question Bank for Topic 11: File Pointer Manipulation: tell() and seek()
// Module: 002_008_file-handling | Python from Basic to Pro
// Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)

const questions = [
  {
    question: "What is the purpose of the file.tell() method in Python?",
    shortAnswer: "It returns the current byte position (cursor offset) of the file pointer within the opened file.",
    explanation: "file.tell() returns an integer representing the current byte offset from the start of the file. In a freshly opened reading file (mode 'r'), f.tell() starts at 0. As read() or readline() operations consume characters, the pointer advances.",
    hint: "Think of tell() as asking 'Where is my file cursor located right now?'.",
    level: "basic",
    codeExample: "with open('demo.txt', 'r', encoding='utf-8') as f:\n    print(f.tell())  # 0 at the start\n    f.readline()\n    print(f.tell())  # Returns byte position after line 1"
  },
  {
    question: "What is the syntax and purpose of the file.seek(offset, whence) method?",
    shortAnswer: "It repositions the file pointer cursor to a specific byte offset relative to a reference point (whence).",
    explanation: "The seek() method changes the stream position to the given byte offset. The parameter 'whence' defines the reference point: 0 (start of file, default), 1 (current pointer position), or 2 (end of file).",
    hint: "offset is the distance to move; whence is the reference starting anchor.",
    level: "basic",
    codeExample: "with open('demo.txt', 'r', encoding='utf-8') as f:\n    f.read(10)  # Move 10 bytes forward\n    f.seek(0)   # Rewind pointer back to start (offset 0)"
  },
  {
    question: "What are the three valid values for the 'whence' parameter in file.seek(offset, whence)?",
    shortAnswer: "0 (os.SEEK_SET = start of file), 1 (os.SEEK_CUR = current position), and 2 (os.SEEK_END = end of file).",
    explanation: "0 specifies absolute positioning from the start of the file (default). 1 specifies relative movement from the current pointer location. 2 specifies relative movement from the end of the file.",
    hint: "Remember: 0 = Start, 1 = Current, 2 = End (EOF).",
    level: "basic",
    codeExample: "import os\n# f.seek(0, os.SEEK_SET) -> start\n# f.seek(5, os.SEEK_CUR) -> +5 from current\n# f.seek(0, os.SEEK_END) -> end of file"
  },
  {
    question: "How can you rewind an open file back to the very beginning without re-opening it?",
    shortAnswer: "By calling file.seek(0) or file.seek(0, 0).",
    explanation: "Calling f.seek(0) sets the file pointer offset back to byte 0. This enables you to perform multiple read passes (e.g. counting lines in pass 1, then computing statistics in pass 2) without the overhead of closing and re-opening the file descriptor.",
    hint: "Use seek with an offset of zero.",
    level: "basic",
    codeExample: "with open('students.txt', 'r', encoding='utf-8') as f:\n    lines = f.readlines()\n    f.seek(0)  # Rewind to top\n    first_line = f.readline()  # Re-reads first line"
  },
  {
    question: "How can you determine the total size of a file in bytes using seek() and tell()?",
    shortAnswer: "By seeking to the end with file.seek(0, 2) and capturing file.tell().",
    explanation: "Calling f.seek(0, 2) moves the pointer to 0 bytes from the end of the file. Calling f.tell() immediately afterward returns the total byte count of the file.",
    hint: "Go to the end of the file (whence=2), then read the cursor offset.",
    level: "basic",
    codeExample: "with open('data.bin', 'rb') as f:\n    f.seek(0, 2)  # Jump to EOF\n    file_size = f.tell()\n    print(f'File size: {file_size} bytes')\n    f.seek(0)     # Reset to beginning"
  },
  {
    question: "What restriction applies to file.seek() when working in TEXT mode ('r' or 'w') in Python 3?",
    shortAnswer: "In text mode, only seeking from the start (whence=0) or seeking (0, 2) to EOF is permitted.",
    explanation: "Because text streams decode variable-length encodings (like UTF-8) and handle OS newline translations (\\r\\n vs \\n), arbitrary relative seeking (whence=1 or whence=2 with non-zero offsets) raises an io.UnsupportedOperation error in text mode. In text mode, only 0 or opaque return values from tell() are valid with whence=0.",
    hint: "For non-zero relative offsets (whence=1 or whence=2), open the file in binary mode ('rb').",
    level: "moderate",
    codeExample: "# In text mode:\n# f.seek(-10, 2)  # Raises io.UnsupportedOperation!\n\n# Must use binary mode:\nwith open('log.txt', 'rb') as f:\n    f.seek(-10, 2)  # Valid in binary mode"
  },
  {
    question: "What is mode 'r+' and how does it combine with seek() for in-place modifications?",
    shortAnswer: "Mode 'r+' opens a file for both reading and writing without truncating it, allowing targeted overwrites.",
    explanation: "With 'r+', the pointer starts at offset 0. You can read a record, call f.seek(target_offset), and write new data directly over the old bytes without rewriting the rest of the file.",
    hint: "Think of 'r+' as read-write with surgical overwrite capability.",
    level: "moderate",
    codeExample: "with open('status.txt', 'r+', encoding='utf-8') as f:\n    f.seek(10)  # Move to status column\n    f.write('APPROVED')  # Overwrites 8 characters in-place"
  },
  {
    question: "What happens if you open a file with mode 'w+' vs mode 'r+' regarding file pointer and content?",
    shortAnswer: "'w+' truncates the file to 0 bytes upon opening, while 'r+' preserves existing content.",
    explanation: "Both 'w+' and 'r+' support reading and writing. However, 'w+' immediately erases (truncates) the file to empty, whereas 'r+' keeps all existing data intact and requires the file to already exist on disk.",
    hint: "Remember that any mode containing 'w' wipes the file on open.",
    level: "moderate",
    codeExample: "# 'w+' -> wipes file to 0 bytes\n# 'r+' -> preserves file content and places cursor at 0"
  },
  {
    question: "Where is the file pointer initially placed when opening a file in append mode ('a' or 'a+')?",
    shortAnswer: "At the very end of the file (EOF).",
    explanation: "In append mode ('a' or 'a+'), the file pointer is placed at the end of the file so that all write() operations automatically append to the end. In 'a+', you must call f.seek(0) if you want to read from the beginning.",
    hint: "Append mode starts at EOF to prevent accidental overwrites.",
    level: "basic",
    codeExample: "with open('audit.log', 'a+', encoding='utf-8') as f:\n    print(f.tell())  # Points to EOF\n    f.seek(0)        # Rewind if you need to read earlier logs\n    print(f.readline())"
  },
  {
    question: "Why does seeking to an arbitrary byte offset in a UTF-8 text file risk causing a UnicodeDecodeError?",
    shortAnswer: "UTF-8 uses variable-length encoding (1 to 4 bytes per character); seeking into the middle of a multi-byte sequence splits the byte code.",
    explanation: "ASCII characters take 1 byte, but characters like Bengali (3 bytes) or Emojis (4 bytes) span multiple bytes. If you seek to a byte in the middle of a 3-byte character, Python cannot decode the fragmented byte sequence and throws UnicodeDecodeError.",
    hint: "In text mode, only seek to 0, EOF, or offsets previously returned by tell().",
    level: "advanced",
    codeExample: "# 'ন' is 3 bytes in UTF-8: \\xe0\\xa6\\xa8\n# Seeking to offset 1 or 2 lands inside 'ন' and breaks decoding.\nwith open('bengali.txt', 'r', encoding='utf-8') as f:\n    # Safe: use offsets from f.tell()\n    pos = f.tell()\n    char = f.read(1)"
  },
  {
    question: "How can you read a large log file backwards (reverse tail) using seek() without loading the file into RAM?",
    shortAnswer: "Open in binary mode ('rb'), seek backwards from EOF in chunks (whence=2), and count newline characters.",
    explanation: "By starting at EOF (f.seek(0, 2)) and stepping backwards with f.seek(cursor - chunk_size), you read only the trailing bytes of the file. This achieves O(1) memory consumption even on multi-gigabyte server logs.",
    hint: "Use binary mode with negative offsets and os.SEEK_END.",
    level: "advanced",
    codeExample: "with open('server.log', 'rb') as f:\n    f.seek(-1024, 2)  # Read last 1024 bytes\n    tail_bytes = f.read()\n    print(tail_bytes.decode('utf-8'))"
  },
  {
    question: "What does file.seekable() return?",
    shortAnswer: "A boolean (True or False) indicating whether the stream supports random access via seek().",
    explanation: "Regular disk files return True for f.seekable(). Streams connected to terminal standard input (sys.stdin), pipes, or network sockets return False because data cannot be rewound.",
    hint: "It checks whether random seeking is supported by the underlying OS stream.",
    level: "moderate",
    codeExample: "with open('data.txt', 'r') as f:\n    print(f.seekable())  # True\n\nimport sys\nprint(sys.stdin.seekable())  # False (usually on interactive terminals)"
  },
  {
    question: "How does buffering affect file.tell() and file.seek() in Python?",
    shortAnswer: "Python's io layer transparently calculates the logical cursor position despite internal RAM read-ahead buffers.",
    explanation: "When you read a line, Python may buffer 8KB from the OS kernel into memory. However, file.tell() accurately reports your logical position in the stream. Calling seek() adjusts both the Python buffer and the underlying OS file descriptor.",
    hint: "tell() always returns the logical stream position.",
    level: "advanced",
    codeExample: "with open('demo.txt', 'r', buffering=8192) as f:\n    f.readline()\n    print(f.tell())  # Exact logical byte offset of line end"
  },
  {
    question: "What is the result of executing f.seek(100) on a file that is only 20 bytes long?",
    shortAnswer: "The pointer moves to offset 100 without error; reading returns empty, but writing creates a sparse file hole.",
    explanation: "Seeking past EOF is permitted by most operating systems. If you immediately read, f.read() returns empty (''). If you write data at offset 100, the OS fills the gap between byte 20 and 100 with null bytes (\\x00), creating a sparse file.",
    hint: "Seeking past EOF is legal; writing creates a null-byte gap.",
    level: "advanced",
    codeExample: "with open('sparse.bin', 'wb+') as f:\n    f.write(b'Header')  # 6 bytes\n    f.seek(50)          # Seek past EOF\n    f.write(b'Footer')  # Gap 6..49 filled with \\x00"
  },
  {
    question: "How can you build an index of line offsets to achieve O(1) random line lookup in large files?",
    shortAnswer: "Iterate through the file once, recording f.tell() before each line into a dictionary {line_number: byte_offset}.",
    explanation: "In pass 1, record {0: 0, 1: 45, 2: 92...}. Later, to read line 50,000 instantly without scanning lines 1 through 49,999, simply call f.seek(index[50000]) and f.readline().",
    hint: "Cache the byte offsets in a hash map for instant seeking.",
    level: "moderate",
    codeExample: "index = {}\nwith open('large.txt', 'r') as f:\n    line_no = 0\n    while True:\n        pos = f.tell()\n        line = f.readline()\n        if not line: break\n        index[line_no] = pos\n        line_no += 1"
  },
  {
    question: "Why is f.seek(0, 1) useful in Python text mode?",
    shortAnswer: "It acts as a no-op position sync (or stream flush) between read and write operations in 'r+' mode.",
    explanation: "In C and Python standard I/O, switching between reading and writing on an 'r+' stream requires a repositioning call like f.seek(0, 1) or f.seek(f.tell()) to flush internal read/write buffers.",
    hint: "It synchronizes the read/write state without moving the pointer.",
    level: "advanced",
    codeExample: "with open('file.txt', 'r+', encoding='utf-8') as f:\n    data = f.read(5)\n    f.seek(0, 1)  # Buffer sync\n    f.write('X')"
  },
  {
    question: "How does seek() work with fixed-width binary records (struct module)?",
    shortAnswer: "You calculate the target offset as: target_offset = record_index * RECORD_SIZE and jump with f.seek(target_offset).",
    explanation: "Because each binary record has a constant size in bytes (e.g. 24 bytes), record N always begins exactly at byte N * 24. This allows instantaneous O(1) read, update, and search operations.",
    hint: "Multiply the record index by the constant record byte size.",
    level: "moderate",
    codeExample: "RECORD_SIZE = 24\nrecord_id = 5\nwith open('db.dat', 'rb') as f:\n    f.seek(record_id * RECORD_SIZE)\n    data = f.read(RECORD_SIZE)"
  },
  {
    question: "What error is raised if you pass negative offset to seek() with whence=0 (os.SEEK_SET)?",
    shortAnswer: "ValueError: negative seek position -1 (or OSError).",
    explanation: "File offsets before the start of the file (offset < 0 with whence=0) do not exist. Python immediately raises a ValueError preventing invalid negative positioning.",
    hint: "You cannot seek before byte 0 (start of file).",
    level: "basic",
    codeExample: "with open('demo.txt', 'rb') as f:\n    # f.seek(-5, 0) -> ValueError: negative seek value -5\n    pass"
  },
  {
    question: "Does file.tell() return character count or byte count in Python 3 text mode?",
    shortAnswer: "It returns an opaque integer representing the byte offset in the underlying stream.",
    explanation: "tell() returns a byte-based cookie / offset, not a character count. For multi-byte characters (such as Unicode symbols or Bengali script), the byte offset advances by 2, 3, or 4 for a single character.",
    hint: "tell() is byte-oriented, not character-oriented.",
    level: "moderate",
    codeExample: "with open('utf8.txt', 'w', encoding='utf-8') as f:\n    f.write('₹')  # Rupee symbol is 3 bytes\nwith open('utf8.txt', 'r', encoding='utf-8') as f:\n    f.read(1)     # Reads 1 character\n    print(f.tell())  # Prints 3 (bytes)"
  },
  {
    question: "What is the difference between f.seek(0) and reopening the file with open()?",
    shortAnswer: "f.seek(0) reuses the existing open file descriptor with zero OS file open overhead, making it much faster.",
    explanation: "Reopening a file requires issuing OS system calls (open, permissions check, descriptor allocation, handle creation). f.seek(0) merely updates the internal cursor offset in CPU memory and filesystem cache.",
    hint: "seek(0) avoids repeated OS open/close system calls.",
    level: "moderate",
    codeExample: "# High performance 2-pass scan:\nwith open('data.csv', 'r') as f:\n    count = sum(1 for _ in f)\n    f.seek(0)  # Instant rewind\n    data = [line.split(',') for line in f]"
  },
  {
    question: "Can file.seek() be used on compressed files like gzip.GzipFile in Python?",
    shortAnswer: "Yes, Python's gzip module implements seek() and tell(), though seeking backwards may decompress from the start.",
    explanation: "The gzip.GzipFile class emulates the standard Python file interface. However, because gzip is a stream-compressed format, seeking backwards or jumping forward may require decompressing earlier blocks under the hood.",
    hint: "seek() is emulated on gzip streams with decompression overhead.",
    level: "advanced",
    codeExample: "import gzip\nwith gzip.open('data.csv.gz', 'rt') as f:\n    line1 = f.readline()\n    f.seek(0)  # Rewinds compressed stream\n    line1_again = f.readline()"
  },
  {
    question: "What happens if you call f.tell() immediately after opening a file in 'w' mode?",
    shortAnswer: "It returns 0.",
    explanation: "Opening in 'w' mode truncates the file to 0 bytes and sets the pointer to offset 0, ready for fresh writes.",
    hint: "New or truncated files start at byte 0.",
    level: "basic",
    codeExample: "with open('fresh.txt', 'w') as f:\n    print(f.tell())  # 0"
  },
  {
    question: "What is the return value of file.seek(offset, whence)?",
    shortAnswer: "It returns the new absolute byte position as an integer.",
    explanation: "In Python 3, file.seek() returns the new absolute byte offset from the start of the file. For example, new_pos = f.seek(20) sets and returns 20.",
    hint: "seek() returns the new cursor position.",
    level: "basic",
    codeExample: "with open('demo.txt', 'r') as f:\n    new_pos = f.seek(15)\n    print(new_pos)  # 15"
  },
  {
    question: "How do Windows line endings ('\\r\\n') affect tell() and seek() in text mode?",
    shortAnswer: "Python's universal newline translation converts '\\r\\n' to '\\n' in memory, causing character indices to diverge from raw byte offsets.",
    explanation: "On Windows, a line ending takes 2 bytes on disk ('\\r\\n' = 2 bytes) but appears as 1 character ('\\n') in Python text mode. Therefore, line length in Python text is shorter than the byte distance reported by tell().",
    hint: "Windows CRLF on disk takes 2 bytes per newline.",
    level: "moderate",
    codeExample: "# On Windows with CRLF:\nwith open('win.txt', 'w', newline='\\r\\n') as f:\n    f.write('Hi\\n')  # 'H','i','\\r','\\n' = 4 bytes\nwith open('win.txt', 'r') as f:\n    f.readline()\n    print(f.tell())  # 4 bytes on disk"
  },
  {
    question: "Why should you pass newline='' when working with CSV files and tell()/seek()?",
    shortAnswer: "It disables universal newline translation, ensuring exact byte-accurate offset tracking without double-newline corruption.",
    explanation: "Passing newline='' prevents Python from altering CRLF / LF line endings, which is required by the csv module and ensures that f.tell() positions map strictly to disk byte offsets.",
    hint: "Always specify newline='' when opening CSV files in Python.",
    level: "moderate",
    codeExample: "import csv\nwith open('data.csv', 'r', newline='', encoding='utf-8') as f:\n    reader = csv.reader(f)\n    pos = f.tell()"
  },
  {
    question: "How can you truncate a file at the current pointer position using file.truncate()?",
    shortAnswer: "By calling file.truncate() without arguments, which slices the file at the current tell() offset.",
    explanation: "file.truncate([size]) resizes the file to the specified size. If size is omitted, it truncates the file at the current pointer position (f.tell()), discarding all subsequent bytes.",
    hint: "truncate() cuts the file off at the current cursor.",
    level: "advanced",
    codeExample: "with open('log.txt', 'r+', encoding='utf-8') as f:\n    f.seek(50)      # Keep first 50 bytes\n    f.truncate()    # Discard everything after byte 50"
  },
  {
    question: "What is the difference between os.lseek() and file.seek()?",
    shortAnswer: "file.seek() is a high-level method on Python file objects, while os.lseek() operates on raw low-level integer OS file descriptors.",
    explanation: "file.seek() coordinates with Python's user-space buffering layer. os.lseek(fd, offset, whence) issues a direct lseek() syscall on raw integer file descriptors (from os.open()).",
    hint: "os.lseek is low-level with integer file descriptors.",
    level: "advanced",
    codeExample: "import os\nfd = os.open('raw.bin', os.O_RDONLY)\nos.lseek(fd, 10, os.SEEK_SET)\nos.close(fd)"
  },
  {
    question: "How do you skip a fixed number of bytes in binary mode without reading data into RAM?",
    shortAnswer: "Use file.seek(bytes_to_skip, os.SEEK_CUR) with whence=1.",
    explanation: "Calling f.seek(1000, 1) advances the pointer by 1000 bytes instantly via OS file pointer arithmetic without allocating memory or reading data into Python objects.",
    hint: "Relative seek forward skips bytes in O(1) time.",
    level: "moderate",
    codeExample: "with open('video.mp4', 'rb') as f:\n    f.seek(1024 * 1024, 1)  # Skip 1 MB forward instantly"
  },
  {
    question: "What happens if multiple threads try to seek() and write() on the same shared file object?",
    shortAnswer: "Race conditions occur because the file pointer is shared state, leading to interleaved or corrupted data.",
    explanation: "A file object maintains a single cursor. If Thread A seeks to offset 10, but Thread B seeks to offset 50 before Thread A writes, Thread A's data will be written at offset 50. Thread locks (threading.Lock) or thread-local file descriptors must be used.",
    hint: "The file pointer is not thread-safe without synchronization locks.",
    level: "advanced",
    codeExample: "import threading\nfile_lock = threading.Lock()\n# with file_lock:\n#     f.seek(offset)\n#     f.write(data)"
  },
  {
    question: "What is Sir Sukanta Hui's golden rule regarding tell() and seek() in Python production systems?",
    shortAnswer: "'Always use binary mode ('rb'/'rb+') for relative byte arithmetic, and restrict text mode seeking to 0, EOF, or tell() bookmarks.'",
    explanation: "Sir Sukanta Hui emphasizes that text encodings (UTF-8, UTF-16) and OS line translation make raw byte math in text mode hazardous. For binary structures, audio/video chunks, and reverse log tailers, binary mode is mathematically precise and 100% reliable.",
    hint: "Binary mode for byte arithmetic; bookmarks for text mode.",
    level: "advanced",
    codeExample: "# Golden Rule:\n# Text Mode -> f.seek(0) or f.seek(saved_tell_offset)\n# Binary Mode -> f.seek(+/- offset, whence)"
  }
];

export default questions;
