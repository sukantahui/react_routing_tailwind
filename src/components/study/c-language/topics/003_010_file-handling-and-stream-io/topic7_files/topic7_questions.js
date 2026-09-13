// 200 Comprehensive MCQs for Module 003_010: File Handling & Stream I/O Architecture
// Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)

const questions = [
  {
    "question": "What is a stream in C I/O architecture?",
    "options": [
      "A network cable connection",
      "An abstract, uniform logical interface that maps physical hardware devices or storage files into continuous sequences of bytes",
      "A GPU parallel pipeline",
      "A dynamic array stored in RAM"
    ],
    "answerIndex": 1,
    "explanation": "Streams provide a uniform device-independent logical interface for reading/writing sequences of bytes regardless of physical media."
  },
  {
    "question": "What is the `FILE` structure defined in `<stdio.h>`?",
    "options": [
      "A system call wrapper",
      "An opaque struct containing stream state, file descriptor, buffer pointers, error/EOF indicator flags, and file position offset",
      "A hard drive partition table",
      "A raw block of disk sectors"
    ],
    "answerIndex": 1,
    "explanation": "`FILE` holds runtime stream bookkeeping data including memory buffers, OS file descriptors, and stream status flags."
  },
  {
    "question": "What are the three standard stream pointers automatically opened at C program startup?",
    "options": [
      "`stdin`, `stdout`, `stderr`",
      "`cin`, `cout`, `cerr`",
      "`input`, `output`, `error`",
      "`sys_in`, `sys_out`, `sys_err`"
    ],
    "answerIndex": 0,
    "explanation": "Standard C automatically initializes `stdin` (Standard Input), `stdout` (Standard Output), and `stderr` (Standard Error)."
  },
  {
    "question": "What is the buffering difference between `stdout` and `stderr` by default when connected to a terminal?",
    "options": [
      "`stdout` is unbuffered; `stderr` is fully buffered",
      "`stdout` is line-buffered; `stderr` is unbuffered (outputs immediately)",
      "Both are fully buffered",
      "Both are unbuffered"
    ],
    "answerIndex": 1,
    "explanation": "`stdout` flushes on newlines (`\\n`) or buffer full, while `stderr` is completely unbuffered so error diagnostics print immediately before crashes."
  },
  {
    "question": "What are the three buffering modes configurable via `setvbuf()`?",
    "options": [
      "`_IOFBF` (Full), `_IOLBF` (Line), `_IONBF` (No Buffering)",
      "`_FAST`, `_MEDIUM`, `_SLOW`",
      "`_STACK`, `_HEAP`, `_DISK`",
      "`_READ`, `_WRITE`, `_APPEND`"
    ],
    "answerIndex": 0,
    "explanation": "<stdio.h> defines `_IOFBF` (Full buffering), `_IOLBF` (Line buffering), and `_IONBF` (Unbuffered)."
  },
  {
    "question": "What does `fopen(\"data.txt\", \"r\")` return if the file does not exist?",
    "options": [
      "Creates the file automatically",
      "`NULL` pointer, and sets `errno` to `ENOENT`",
      "Returns pointer to empty buffer",
      "Raises a runtime exception"
    ],
    "answerIndex": 1,
    "explanation": "Opening in read mode `\"r\"` requires the file to already exist; if missing, it returns `NULL` and sets `errno`."
  },
  {
    "question": "What does `fopen(\"data.txt\", \"w\")` do if the target file already exists?",
    "options": [
      "Appends data to the end of the file",
      "Truncates (erases) the file to zero length immediately upon opening",
      "Fails and returns NULL",
      "Creates a backup file"
    ],
    "answerIndex": 1,
    "explanation": "Write mode `\"w\"` destroys existing content by truncating the file to 0 bytes upon successful open."
  },
  {
    "question": "What mode must you use to preserve existing file data and write new entries strictly at the end?",
    "options": [
      "`\"w\"`",
      "`\"r+\"`",
      "`\"a\"` (or `\"ab\"`, `\"a+\"`)",
      "`\"w+\"`"
    ],
    "answerIndex": 2,
    "explanation": "Append mode `\"a\"` positions the stream at the end of the file, preserving existing content."
  },
  {
    "question": "Why should you always append the `\"b\"` flag (e.g. `\"rb\"`, `\"wb\"`) when dealing with binary files on Windows?",
    "options": [
      "To prevent Windows runtime from converting `\\n` (newline) into `\\r\\n` (CRLF) and treating byte `0x1A` as EOF",
      "To compress the file",
      "To bypass anti-virus scanners",
      "To allocate contiguous disk clusters"
    ],
    "answerIndex": 0,
    "explanation": "In text mode on Windows, `\\n` is converted to `\\r\\n` and `0x1A` terminates reads; binary mode `\"b\"` passes exact raw bytes."
  },
  {
    "question": "What does `fclose(fp)` do before releasing the `FILE` handle?",
    "options": [
      "Deletes the file from disk",
      "Flushes any pending unwritten buffered data to the operating system kernel and closes the underlying OS file descriptor",
      "Resets file permissions",
      "Encrypts the disk sectors"
    ],
    "answerIndex": 1,
    "explanation": "`fclose()` automatically calls `fflush()` to write out all cached stream buffers before releasing system resources."
  },
  {
    "question": "What happens if a program exits or crashes without calling `fclose()` on a buffered file stream?",
    "options": [
      "Disk sectors become physically corrupted",
      "Pending buffer data in user space RAM may never be written to disk, causing silent data loss",
      "The OS cannot restart",
      "The file is automatically deleted"
    ],
    "answerIndex": 1,
    "explanation": "Unwritten user-space buffers residing in the `FILE` buffer may be lost if a process crashes abruptly before flushing."
  },
  {
    "question": "What function reads a single line safely from a file stream without buffer overflow risks?",
    "options": [
      "`gets()`",
      "`fgets(buffer, sizeof(buffer), fp)`",
      "`fgetln()`",
      "`scanf(\"%s\")`"
    ],
    "answerIndex": 1,
    "explanation": "`fgets()` takes a maximum size limit `n`, stopping at `n-1` characters or newline, and always writes a terminating `'\\0'`."
  },
  {
    "question": "Why was `gets()` permanently removed from the ISO C11 standard?",
    "options": [
      "It was too slow",
      "It had zero boundary checking, making it impossible to use safely without risking stack buffer overflow exploits",
      "It only accepted ASCII characters",
      "It leaked memory"
    ],
    "answerIndex": 1,
    "explanation": "`gets()` cannot know the destination buffer size, making it a critical security vulnerability removed in C11."
  },
  {
    "question": "What does `fread(ptr, size, count, fp)` return?",
    "options": [
      "Total bytes read (`size * count`)",
      "The number of full elements (up to `count`) successfully read",
      "0 on success, -1 on error",
      "File size in bytes"
    ],
    "answerIndex": 1,
    "explanation": "`fread()` returns the number of whole items successfully read; if it is less than `count`, check `feof()` or `ferror()`."
  },
  {
    "question": "What does `fwrite(ptr, size, count, fp)` return?",
    "options": [
      "The number of full items successfully written to the stream",
      "Total bytes written",
      "0 on error",
      "Buffer remaining space"
    ],
    "answerIndex": 0,
    "explanation": "`fwrite()` returns the number of complete items written out."
  },
  {
    "question": "What does `fseek(fp, offset, origin)` do?",
    "options": [
      "Searches for a text string in the file",
      "Repositions the stream's file position indicator by `offset` bytes relative to `origin` (`SEEK_SET`, `SEEK_CUR`, `SEEK_END`)",
      "Sorts the file records",
      "Scans the disk for bad blocks"
    ],
    "answerIndex": 1,
    "explanation": "`fseek()` performs random-access navigation within a file stream."
  },
  {
    "question": "What does `ftell(fp)` return?",
    "options": [
      "The current value of the file position indicator as a byte offset from the start of the file, or `-1L` on error",
      "The total size of the hard drive",
      "The number of lines read",
      "The file creation timestamp"
    ],
    "answerIndex": 0,
    "explanation": "`ftell()` queries the current stream byte position offset from the file beginning."
  },
  {
    "question": "How do you calculate the exact size of a file in bytes using `fseek()` and `ftell()`?",
    "options": [
      "`fseek(fp, 0, SEEK_END); long size = ftell(fp); rewind(fp);`",
      "`long size = sizeof(fp);`",
      "`long size = strlen(fp);`",
      "`fseek(fp, 0, SEEK_SET); long size = ftell(fp);`"
    ],
    "answerIndex": 0,
    "explanation": "Seeking to `SEEK_END` and reading `ftell()` gives the total byte count; `rewind()` resets the stream pointer back to 0."
  },
  {
    "question": "What does `rewind(fp)` do?",
    "options": [
      "Deletes the last written line",
      "Sets the file position indicator to the beginning of the file (`SEEK_SET, 0`) and clears the error/EOF indicators",
      "Inverts the file bytes",
      "Replays audio streams"
    ],
    "answerIndex": 1,
    "explanation": "`rewind(fp)` is equivalent to `(void)fseek(fp, 0L, SEEK_SET); clearerr(fp);`."
  },
  {
    "question": "Why should `while (!feof(fp))` NEVER be used as the file reading loop condition?",
    "options": [
      "It causes an infinite loop",
      "`feof()` returns true only AFTER a read operation has already failed upon attempting to read past the end of the file, leading to processing duplicate or garbage data on the final iteration",
      "It deletes the file on EOF",
      "It is a deprecated POSIX function"
    ],
    "answerIndex": 1,
    "explanation": "EOF status is set only after an attempted read fails past the end. Loops should test the return value of read functions (`fread`, `fgets`, `fgetc`)."
  },
  {
    "question": "What does `ferror(fp)` check for?",
    "options": [
      "Syntax errors in C code",
      "Whether the stream's error indicator flag has been set due to an I/O read/write hardware or permission failure",
      "File encryption errors",
      "Disk full status only"
    ],
    "answerIndex": 1,
    "explanation": "`ferror()` returns non-zero if the stream's error indicator is set."
  },
  {
    "question": "What does `clearerr(fp)` do?",
    "options": [
      "Fixes corrupted file sectors",
      "Resets both the EOF indicator and error indicator flags of the stream to zero",
      "Closes and reopens the stream",
      "Clears screen terminal output"
    ],
    "answerIndex": 1,
    "explanation": "`clearerr()` clears the end-of-file and error indicators for the given stream."
  },
  {
    "question": "What does `perror(\"Error Message\")` do?",
    "options": [
      "Prints the custom string followed by a colon and the human-readable description of current `errno` to `stderr`",
      "Terminates the program immediately",
      "Logs errors to the Windows Event Log",
      "Pings the network server"
    ],
    "answerIndex": 0,
    "explanation": "`perror()` interprets the global `errno` value and prints standard OS error descriptions to `stderr`."
  },
  {
    "question": "What does `strerror(errno)` from `<string.h>` return?",
    "options": [
      "A pointer to the textual error string corresponding to the error number in `errno`",
      "An integer error code",
      "The function name where error occurred",
      "The stack trace string"
    ],
    "answerIndex": 0,
    "explanation": "`strerror(errno)` returns a pointer to the system error message string."
  },
  {
    "question": "What does `fflush(fp)` do for an output stream?",
    "options": [
      "Erases the file content",
      "Forces all user-space buffered data for stream `fp` to be written out to the operating system",
      "Frees the `FILE` struct",
      "Flushes CPU instruction pipelines"
    ],
    "answerIndex": 1,
    "explanation": "`fflush(fp)` forces a write of all user-space buffered data for the given output stream."
  },
  {
    "question": "Is `fflush(stdin)` defined in standard ISO C?",
    "options": [
      "Yes, it clears keyboard input on all standard systems",
      "No, `fflush()` on an input stream results in Undefined Behavior (UB) in standard C (though some MSVC versions historically treated it as clearing input)",
      "Yes, it is guaranteed in C99",
      "It is only valid on Linux"
    ],
    "answerIndex": 1,
    "explanation": "ISO C defines `fflush()` exclusively for output streams; calling it on an input stream is Undefined Behavior."
  },
  {
    "question": "What is the standard, portable way to clear leftover newline characters from `stdin` in C?",
    "options": [
      "`fflush(stdin);`",
      "`int c; while ((c = getchar()) != '\\n' && c != EOF);`",
      "`scanf(\"%*[^\n]\");`",
      "`stdin = NULL;`"
    ],
    "answerIndex": 1,
    "explanation": "Looping with `getchar()` until `\\n` or `EOF` is the only 100% portable and standard-compliant way to flush `stdin`."
  },
  {
    "question": "What is the return value of `remove(\"filename.txt\")` from `<stdio.h>` on success?",
    "options": [
      "`0`",
      "`1`",
      "`-1`",
      "`NULL`"
    ],
    "answerIndex": 0,
    "explanation": "`remove()` deletes the specified file and returns 0 on success, or non-zero on failure."
  },
  {
    "question": "What does `rename(\"old.txt\", \"new.txt\")` do?",
    "options": [
      "Copies the file to a new location",
      "Changes the name or path of a file atomically in the filesystem",
      "Creates an alias pointer",
      "Renames all files in the directory"
    ],
    "answerIndex": 1,
    "explanation": "`rename()` changes the name of a file or moves it within the same filesystem."
  },
  {
    "question": "Why should structures containing raw memory pointers NEVER be directly serialized with `fwrite()`?",
    "options": [
      "`fwrite()` only works on primitive types",
      "Pointers store virtual RAM addresses that are meaningless and invalid when loaded in a different process or after restart",
      "It triggers a compilation error",
      "It encrypts the pointers"
    ],
    "answerIndex": 1,
    "explanation": "Direct pointer serialization writes useless virtual addresses; data structures must be deep-serialized with payload contents."
  },
  {
    "question": "File Stream Assessment Item #31: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #32: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #33: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #34: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #35: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #36: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #37: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #38: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #39: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #40: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #41: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #42: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #43: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #44: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #45: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #46: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #47: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #48: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #49: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #50: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #51: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #52: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #53: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #54: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #55: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #56: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #57: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #58: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #59: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #60: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #61: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #62: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #63: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #64: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #65: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #66: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #67: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #68: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #69: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #70: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #71: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #72: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #73: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #74: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #75: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #76: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #77: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #78: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #79: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #80: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #81: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #82: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #83: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #84: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #85: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #86: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #87: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #88: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #89: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #90: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #91: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #92: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #93: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #94: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #95: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #96: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #97: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #98: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #99: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #100: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #101: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #102: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #103: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #104: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #105: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #106: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #107: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #108: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #109: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #110: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #111: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #112: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #113: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #114: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #115: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #116: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #117: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #118: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #119: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #120: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #121: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #122: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #123: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #124: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #125: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #126: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #127: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #128: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #129: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #130: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #131: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #132: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #133: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #134: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #135: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #136: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #137: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #138: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #139: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #140: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #141: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #142: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #143: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #144: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #145: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #146: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #147: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #148: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #149: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #150: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #151: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #152: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #153: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #154: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #155: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #156: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #157: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #158: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #159: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #160: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #161: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #162: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #163: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #164: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #165: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #166: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #167: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #168: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #169: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #170: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #171: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #172: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #173: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #174: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #175: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #176: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #177: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #178: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #179: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #180: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #181: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #182: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #183: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #184: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #185: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #186: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #187: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #188: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #189: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #190: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #191: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #192: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #193: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #194: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #195: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #196: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #197: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #198: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #199: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  },
  {
    "question": "File Stream Assessment Item #200: In high-reliability C systems engineering, why is checking the return value of every file operation (fopen, fread, fwrite, fclose) mandatory?",
    "options": [
      "Operating systems can encounter disk full, permission revocation, or I/O hardware bus errors at any time during execution",
      "It prevents compiler optimization passes",
      "It encrypts file sector transfers",
      "It bypasses POSIX signal handlers"
    ],
    "answerIndex": 0,
    "explanation": "Robust systems software must anticipate environmental failures (out of disk space, bad sectors, removed USB drives) by verifying every I/O call."
  }
];

export default questions;
export { questions };
