// Question Bank for Topic 12: Working with Bytes & Bytearray for Binary Files
// Module: 002_008_file-handling | Python from Basic to Pro
// Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)

const questions = [
  {
    question: "What is the primary difference between Python's 'bytes' and 'bytearray' types?",
    shortAnswer: "'bytes' is an immutable sequence of byte integers (0-255), while 'bytearray' is a mutable sequence.",
    explanation: "Both types represent raw sequences of bytes (integers in the range 0 to 255). However, bytes objects cannot be modified after creation (attempting assignment like b[0] = 65 raises a TypeError). bytearray allows in-place mutations, element assignments, slice substitutions, append(), and extend().",
    hint: "Think about immutability vs in-place mutability.",
    level: "basic",
    codeExample: "b = b'Hello'       # bytes (immutable)\n# b[0] = 74         # TypeError!\n\nba = bytearray(b'Hello')  # bytearray (mutable)\nba[0] = 74                # Allowed -> bytearray(b'Jello')"
  },
  {
    question: "What does indexing a 'bytes' object (e.g. b[0]) return in Python 3?",
    shortAnswer: "It returns an integer representing the ASCII/byte value (0 to 255), not a 1-character bytes object.",
    explanation: "In Python 3, b[0] yields an integer (e.g. 65 for b'A'). If you want a 1-byte bytes slice, you must use slice notation b[0:1] which returns b'A'.",
    hint: "Single index gives integer; slice gives bytes.",
    level: "basic",
    codeExample: "data = b'ABC'\nprint(data[0])    # 65 (int)\nprint(data[0:1])  # b'A' (bytes)"
  },
  {
    question: "Why must binary files (like images, zip files, or PDFs) be opened in binary mode ('rb' or 'wb') instead of text mode?",
    shortAnswer: "To prevent automatic OS newline translation ('\\r\\n' to '\\n') and UTF-8 decoding corruption of raw byte streams.",
    explanation: "In text mode, Python translates OS line terminators and attempts to decode binary sequences as Unicode characters. This corrupts binary files like PNGs or compiled executables where byte 0x0A (10) represents data rather than a newline.",
    hint: "Text mode translates newlines and requires valid Unicode encodings.",
    level: "basic",
    codeExample: "# Incorrect: open('pic.png', 'r') -> UnicodeDecodeError\n# Correct:\nwith open('pic.png', 'rb') as f:\n    raw_bytes = f.read()"
  },
  {
    question: "How do you convert a Python Unicode string to bytes, and bytes back to a string?",
    shortAnswer: "Use string.encode('utf-8') to get bytes, and bytes.decode('utf-8') to get a string.",
    explanation: "string.encode(encoding) transforms abstract Unicode characters into a sequence of bytes. bytes.decode(encoding) reconstructs the Unicode string from raw bytes.",
    hint: "Encode string to bytes; decode bytes to string.",
    level: "basic",
    codeExample: "text = 'Mamata - Barrackpore'\nraw = text.encode('utf-8')  # str -> bytes\nrestored = raw.decode('utf-8') # bytes -> str"
  },
  {
    question: "What is a file 'magic number' and how is it used in Python?",
    shortAnswer: "A unique fixed byte signature at the start of a file (offset 0) identifying its true file format.",
    explanation: "Operating systems and parsers inspect the first few bytes (e.g. \\x89PNG\\r\\n\\x1a\\n for PNG, %PDF for PDF, PK\\x03\\x04 for ZIP) to verify file formats regardless of what extension (.png, .txt) the file is given.",
    hint: "Inspect the first 4 to 8 bytes with f.read(8).",
    level: "moderate",
    codeExample: "with open('unknown_file', 'rb') as f:\n    sig = f.read(4)\n    if sig == b'%PDF':\n        print('Valid PDF document')"
  },
  {
    question: "How do you convert a hexadecimal string (like '48656c6c6f') into bytes and vice-versa in Python?",
    shortAnswer: "Use bytes.fromhex('48656c6c6f') to create bytes, and bytes.hex() to get the hex string.",
    explanation: "bytes.fromhex(hex_str) parses paired hexadecimal characters into binary bytes. bytes.hex() converts raw binary data into a human-readable hex string.",
    hint: "bytes.fromhex() and b.hex().",
    level: "basic",
    codeExample: "raw = bytes.fromhex('48656c6c6f')  # b'Hello'\nprint(raw.hex())                   # '48656c6c6f'"
  },
  {
    question: "How can you copy a 10GB binary file in Python without exhausting system RAM?",
    shortAnswer: "By reading and writing in fixed-size chunks (e.g. 64KB or 1MB) inside a while loop.",
    explanation: "Instead of calling f.read() which loads the entire file into RAM, reading in chunks (e.g. iter(lambda: f.read(65536), b'')) ensures memory usage remains constant at 64KB regardless of file size.",
    hint: "Stream data in chunks of 4KB to 1MB.",
    level: "moderate",
    codeExample: "CHUNK_SIZE = 64 * 1024\nwith open('source.iso', 'rb') as src, open('dest.iso', 'wb') as dst:\n    while True:\n        chunk = src.read(CHUNK_SIZE)\n        if not chunk: break\n        dst.write(chunk)"
  },
  {
    question: "What is the purpose of Python's 'memoryview' and how does it optimize binary file processing?",
    shortAnswer: "It allows zero-copy slicing and buffer access on binary data without allocating new memory objects.",
    explanation: "Standard slicing on bytes (b[10:5000]) allocates a new copy of the sliced bytes in RAM. memoryview creates a lightweight view over the existing buffer, enabling zero-copy slicing and in-place mutation on bytearrays.",
    hint: "Zero-copy memory sharing.",
    level: "advanced",
    codeExample: "buf = bytearray(1000000)  # 1MB buffer\nmv = memoryview(buf)\nslice_view = mv[100:200]  # Zero memory allocated!"
  },
  {
    question: "What error occurs if you try to assign an integer value outside 0-255 to a bytearray element?",
    shortAnswer: "ValueError: byte must be in range(0, 256).",
    explanation: "Each byte in a bytearray must fit into an unsigned 8-bit integer (0 to 255). Assigning negative numbers (e.g. -1) or values >= 256 raises a ValueError.",
    hint: "A single byte is 8 bits (0 to 255).",
    level: "basic",
    codeExample: "ba = bytearray(5)\n# ba[0] = 300  # Raises ValueError: byte must be in range(0, 256)"
  },
  {
    question: "How does symmetric XOR encryption work on a bytearray?",
    shortAnswer: "By applying the bitwise XOR operator (^) between each byte of the data and a secret key byte: (A ^ K) ^ K = A.",
    explanation: "XORing a byte with a key encrypts it; applying the exact same XOR operation with the same key restores the original plaintext byte. In bytearray, this can be executed completely in-place.",
    hint: "Bitwise XOR with the same key twice restores the original value.",
    level: "moderate",
    codeExample: "KEY = 0xAA\ndata = bytearray(b'Barrackpore')\nfor i in range(len(data)): data[i] ^= KEY  # Encrypt\nfor i in range(len(data)): data[i] ^= KEY  # Decrypt"
  },
  {
    question: "What is the difference between bytes literals created with b'...' vs regular strings '...'?",
    shortAnswer: "b'...' produces a 'bytes' object consisting of 8-bit ASCII/raw values, while '...' produces a Unicode 'str' object.",
    explanation: "String literals are abstract Unicode sequences where characters can have code points up to 0x10FFFF. Bytes literals only accept ASCII characters (0-127) and hex escape sequences (\\x00 to \\xFF).",
    hint: "Bytes are raw 8-bit numbers; strings are Unicode characters.",
    level: "basic",
    codeExample: "s = 'Mamata'   # type: str\nb = b'Mamata'  # type: bytes"
  },
  {
    question: "Can a bytearray be converted back to an immutable 'bytes' object?",
    shortAnswer: "Yes, by passing the bytearray to the bytes() constructor: immutable_bytes = bytes(ba).",
    explanation: "The bytes(bytearray) constructor creates an immutable snapshot copy of the bytearray.",
    hint: "Use bytes(my_bytearray).",
    level: "basic",
    codeExample: "ba = bytearray(b'abc')\nba.append(100)\nfinal_bytes = bytes(ba)  # b'abcd'"
  },
  {
    question: "What does the 'errors' parameter do in string.encode() and bytes.decode()?",
    shortAnswer: "It determines how unencodable or undecodable byte sequences are handled ('strict', 'ignore', 'replace', 'backslashreplace').",
    explanation: "'strict' (default) raises an error on invalid bytes. 'ignore' skips bad bytes. 'replace' substitutes an official replacement character (like ).",
    hint: "Controls tolerance for corrupted or unknown character encodings.",
    level: "moderate",
    codeExample: "raw = b'Valid \\xff Invalid'\nprint(raw.decode('utf-8', errors='replace'))  # 'Valid  Invalid'"
  },
  {
    question: "How do you find the index of a specific byte sub-sequence within a bytes object?",
    shortAnswer: "Use the .find() or .index() method: pos = data.find(b'KEY').",
    explanation: "Just like strings, bytes objects provide find(), index(), startswith(), endswith(), split(), and join(). Note that the argument must be a bytes object (b'KEY'), not a string.",
    hint: "Call .find(b'target') with a bytes argument.",
    level: "basic",
    codeExample: "data = b'HEADER_DATA_FOOTER'\npos = data.find(b'DATA')  # 7"
  },
  {
    question: "What is the struct module in Python and why is it paired with bytes and binary files?",
    shortAnswer: "struct converts between Python values (integers, floats, strings) and C-style packed binary structs.",
    explanation: "The struct.pack() and struct.unpack() functions format integers into fixed-width binary representations (e.g. 4-byte integers '>i', 8-byte doubles '>d') for hardware protocols and database files.",
    hint: "Packed binary layout formatting.",
    level: "moderate",
    codeExample: "import struct\npacked = struct.pack('>i10s', 101, b'Mamata    ')\nwith open('rec.bin', 'wb') as f: f.write(packed)"
  },
  {
    question: "What is Big-Endian vs Little-Endian byte order in binary file formats?",
    shortAnswer: "Big-Endian stores the most significant byte first; Little-Endian stores the least significant byte first.",
    explanation: "In an integer 0x12345678, Big-Endian writes bytes as [12, 34, 56, 78] (network order), while Little-Endian writes [78, 56, 34, 12] (standard on x86/ARM CPUs). Python's struct uses '>' for Big-Endian and '<' for Little-Endian.",
    hint: "Big-endian = MSB first; Little-endian = LSB first.",
    level: "moderate",
    codeExample: "import struct\nbe = struct.pack('>I', 0x12345678)  # b'\\x124Vx'\nle = struct.pack('<I', 0x12345678)  # b'xV4\\x12'"
  },
  {
    question: "How does bytearray.extend() differ from bytearray.append()?",
    shortAnswer: "append(int) adds a single integer byte (0-255); extend(iterable) adds an entire sequence of bytes.",
    explanation: "ba.append(65) adds single byte 'A'. ba.extend(b'XYZ') appends all three bytes 'X', 'Y', 'Z' to the end of the bytearray.",
    hint: "append adds one byte; extend appends an iterable.",
    level: "basic",
    codeExample: "ba = bytearray()\nba.append(65)         # bytearray(b'A')\nba.extend(b'BC')      # bytearray(b'ABC')"
  },
  {
    question: "How can you read a binary file directly into an existing pre-allocated bytearray buffer?",
    shortAnswer: "Use file.readinto(buffer), which writes bytes directly into the buffer without allocating new memory.",
    explanation: "f.readinto(bytearray_obj) populates the mutable buffer in-place and returns the number of bytes read, achieving zero-allocation I/O.",
    hint: "readinto() populates a pre-allocated buffer in-place.",
    level: "advanced",
    codeExample: "buf = bytearray(1024)\nwith open('data.bin', 'rb') as f:\n    bytes_read = f.readinto(buf)\n    print(f'Read {bytes_read} bytes into buffer')"
  },
  {
    question: "What is the difference between mode 'wb' and mode 'wb+' for binary files?",
    shortAnswer: "'wb' is write-only; 'wb+' allows both writing and reading after seeking back.",
    explanation: "Both truncate the file to 0 bytes on open. However, 'wb+' allows you to seek backwards and read the binary data you just wrote without reopening the file.",
    hint: "'+' adds read capability to write mode.",
    level: "basic",
    codeExample: "with open('temp.bin', 'wb+') as f:\n    f.write(b'Data')\n    f.seek(0)\n    print(f.read())  # b'Data'"
  },
  {
    question: "How can you inspect raw binary bytes as a clean visual hex dump in Python?",
    shortAnswer: "Iterate in 16-byte chunks, printing byte offsets, hex pairs, and printable ASCII characters.",
    explanation: "A standard hex dump displays the offset (e.g. 00000000), 16 space-separated hex bytes, and an ASCII representation where non-printable characters are shown as dots ('.').",
    hint: "16 bytes per line with hex and ASCII columns.",
    level: "moderate",
    codeExample: "data = b'Coder & AccoTax Barrackpore Hub'\nfor i in range(0, len(data), 16):\n    chunk = data[i:i+16]\n    hex_part = ' '.join(f'{b:02X}' for b in chunk)\n    print(f'{i:08X}  {hex_part:<48}')"
  },
  {
    question: "Why does Python raise TypeError when concatenating a string and a bytes object (e.g. 'text' + b'bytes')?",
    shortAnswer: "Python strictly separates text (str) and binary data (bytes) to avoid implicit encoding assumptions.",
    explanation: "In Python 2, strings and bytes were loosely interchangeable, causing subtle encoding bugs. Python 3 enforces strict type safety: you must explicitly decode bytes or encode strings before combining.",
    hint: "Python 3 does not guess character encodings implicitly.",
    level: "basic",
    codeExample: "# 'Name: ' + b'Mamata' -> TypeError\n# Correct:\nres = 'Name: ' + b'Mamata'.decode('utf-8')"
  },
  {
    question: "What is the fastest way to replace all occurrences of a byte sequence in a binary file?",
    shortAnswer: "Use bytes.replace(old, new) or in-place bytearray replacement.",
    explanation: "The replace() method works directly on bytes objects in C speed: new_bytes = data.replace(b'OLD', b'NEW').",
    hint: "bytes.replace(b'old', b'new').",
    level: "basic",
    codeExample: "with open('file.bin', 'rb') as f: data = f.read()\nupdated = data.replace(b'2025', b'2026')\nwith open('file.bin', 'wb') as f: f.write(updated)"
  },
  {
    question: "What does bytes([65, 66, 67]) evaluate to in Python?",
    shortAnswer: "b'ABC'",
    explanation: "Passing an iterable of integers (0-255) to bytes() creates a bytes object containing those exact ASCII/byte values.",
    hint: "65=A, 66=B, 67=C.",
    level: "basic",
    codeExample: "b = bytes([65, 66, 67])\nprint(b)  # b'ABC'"
  },
  {
    question: "What does bytearray(10) create in Python?",
    shortAnswer: "A mutable bytearray of 10 zeroed null bytes (b'\\x00' * 10).",
    explanation: "Passing a single integer N to the bytes() or bytearray() constructor creates a buffer of N zero bytes (\\x00).",
    hint: "Pre-allocates N null bytes.",
    level: "basic",
    codeExample: "buf = bytearray(5)\nprint(buf)  # bytearray(b'\\x00\\x00\\x00\\x00\\x00')"
  },
  {
    question: "How do you calculate a SHA-256 or MD5 cryptographic hash of a binary file in Python?",
    shortAnswer: "Use hashlib.sha256() and feed it binary chunks with sha256.update(chunk).",
    explanation: "By updating the hash object chunk-by-chunk, you compute the exact checksum of any binary file without loading the whole file into RAM.",
    hint: "Use hashlib with chunked streaming.",
    level: "moderate",
    codeExample: "import hashlib\nh = hashlib.sha256()\nwith open('image.png', 'rb') as f:\n    for chunk in iter(lambda: f.read(4096), b''):\n        h.update(chunk)\nprint(h.hexdigest())"
  },
  {
    question: "How do you write a minimal raw BMP image file directly from Python bytes?",
    shortAnswer: "Write a 54-byte BMP/DIB header followed by row-aligned BGR pixel bytes padded to 4-byte boundaries.",
    explanation: "BMP files begin with 'BM' (0x424D) followed by file size, image dimensions (width, height), color depth (24-bit RGB), and uncompressed pixel rows padded to multiples of 4 bytes.",
    hint: "54-byte header + BGR pixel rows.",
    level: "advanced",
    codeExample: "# See Example 9 in topic files for full BMP header construction"
  },
  {
    question: "Can memoryview be used with immutable 'bytes' objects as well as 'bytearray'?",
    shortAnswer: "Yes, but the resulting memoryview will be read-only (readonly=True).",
    explanation: "Wrapping bytes in memoryview allows zero-copy read access and slicing. To support write assignments (e.g. mv[0] = 65), the underlying buffer must be mutable (like bytearray or mmap).",
    hint: "memoryview on bytes is read-only; on bytearray is read-write.",
    level: "moderate",
    codeExample: "mv_read = memoryview(b'ABC')\nprint(mv_read.readonly)  # True\n\nmv_write = memoryview(bytearray(b'ABC'))\nprint(mv_write.readonly) # False"
  },
  {
    question: "What is the mmap module in Python and how does it relate to binary file handling?",
    shortAnswer: "mmap maps a binary file on disk directly into application memory space for fast pointer-like access.",
    explanation: "Memory-mapped files allow OS kernel virtual memory paging to handle file I/O, allowing you to treat a 10GB binary file as if it were a giant in-memory bytearray.",
    hint: "Memory-mapped files via OS virtual memory.",
    level: "advanced",
    codeExample: "import mmap\nwith open('large.dat', 'r+b') as f:\n    mm = mmap.mmap(f.fileno(), 0)\n    print(mm[:10])  # Fast zero-copy access\n    mm.close()"
  },
  {
    question: "How do you strip trailing null bytes (\\x00) from a fixed-width binary string?",
    shortAnswer: "Use bytes.rstrip(b'\\x00') or bytes.rstrip(b' ').",
    explanation: "Fixed-width binary fields are often padded with null bytes or spaces. Calling .rstrip(b'\\x00') removes trailing null padding before decoding to text.",
    hint: "rstrip(b'\\x00').",
    level: "basic",
    codeExample: "raw_field = b'Mamata\\x00\\x00\\x00\\x00'\nclean_name = raw_field.rstrip(b'\\x00').decode('utf-8')"
  },
  {
    question: "What is Sir Sukanta Hui's golden rule for working with binary files in Python?",
    shortAnswer: "'Treat bytes as exact hardware integers, stream large files in chunks, and use bytearray for in-place surgeries to keep RAM at O(1).'",
    explanation: "Sir Sukanta Hui emphasizes that binary I/O is about exact bit-level control. By avoiding full-file reads and using chunked streaming with bytearray buffers, your Python systems can process gigabytes of data reliably with sub-millisecond efficiency.",
    hint: "Chunk streaming, in-place bytearray mutation, O(1) RAM.",
    level: "advanced",
    codeExample: "# Golden Rule:\n# Always 'rb'/'wb', stream in 64KB chunks, mutate with bytearray"
  }
];

export default questions;
