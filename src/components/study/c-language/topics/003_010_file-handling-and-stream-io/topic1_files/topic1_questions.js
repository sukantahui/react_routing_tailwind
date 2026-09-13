// topic1_questions.js - 25 FAQs for File Modes & fopen()

const questions = [
  {
    question: "What is a `FILE*` pointer in standard C?",
    answer: "A 'FILE*' is an opaque pointer referencing a standard library internal structure (FILE) that tracks the open file's descriptor, stream buffer, buffer position, file cursor offset, and error/EOF status flags."
  },
  {
    question: "What is the function prototype of fopen() in <stdio.h>?",
    answer: "The prototype is: 'FILE *fopen(const char *filename, const char *mode);'. It opens the file specified by 'filename' in the given 'mode' and returns a valid 'FILE*' pointer, or NULL on failure."
  },
  {
    question: "What is the function prototype of fclose() in <stdio.h>?",
    answer: "The prototype is: 'int fclose(FILE *stream);'. It flushes any unwritten output buffer, closes the underlying operating system file descriptor, and releases internal buffer memory, returning 0 on success or EOF on error."
  },
  {
    question: "Why is verifying `if (fp == NULL)` mandatory immediately after fopen()?",
    answer: "If the file does not exist (in 'r' mode), permissions are denied, the disk is full, or the path is invalid, fopen() fails and returns NULL. Attempting to pass NULL to any file function causes an immediate segmentation fault."
  },
  {
    question: "What does opening a file in \"w\" (write) mode do if the file already exists?",
    answer: "In 'w' mode, if the file already exists, its contents are immediately truncated (erased) to 0 bytes. If it does not exist, a new empty file is created."
  },
  {
    question: "What does opening a file in \"a\" (append) mode do?",
    answer: "In 'a' mode, all write operations are forced to the end of the file, preserving existing contents. If the file does not exist, it creates a new empty file."
  },
  {
    question: "What happens if you open a non-existent file in \"r\" (read) mode?",
    answer: "fopen() fails and returns NULL. It does NOT create the file."
  },
  {
    question: "What is the difference between \"r+\", \"w+\", and \"a+\" update modes?",
    answer: "'r+' opens for read/write (file must exist). 'w+' creates an empty file for read/write (truncates if exists). 'a+' opens for reading and appending (creates if missing, writes always append to end)."
  },
  {
    question: "What is the meaning of the 'b' flag in file modes (e.g. \"rb\", \"wb\", \"ab+\")?",
    answer: "The 'b' specifies Binary mode. On systems like Windows, binary mode suppresses automatic newline translations ('\\r\\n' to '\\n'), ensuring exact raw bytes are preserved."
  },
  {
    question: "Is the 'b' flag required on Linux and POSIX systems?",
    answer: "On Linux/UNIX systems, text and binary files are treated identically without translation, so 'b' is ignored. However, including 'b' is mandatory for cross-platform portability with Windows."
  },
  {
    question: "What does the function `perror(const char *s)` do?",
    answer: "'perror' prints the user-supplied prefix string followed by a colon and the human-readable description of the global 'errno' error code (e.g. 'No such file or directory' or 'Permission denied')."
  },
  {
    question: "What happens if a program opens files in a loop without ever calling fclose()?",
    answer: "It creates a File Descriptor Leak. The process will hit the operating system's open-file limit (e.g., 1024 open files) and all subsequent fopen() calls will fail."
  },
  {
    question: "What is `FOPEN_MAX` in `<stdio.h>`?",
    answer: "'FOPEN_MAX' is a standard macro defining the minimum number of files that an implementation guarantees can be open simultaneously (typically at least 8, often hundreds)."
  },
  {
    question: "What is `FILENAME_MAX` in `<stdio.h>`?",
    answer: "'FILENAME_MAX' is an integer constant representing the maximum character length guaranteed for file path strings on the system (e.g., 260 on Windows or 4096 on Linux)."
  },
  {
    question: "What does `remove(const char *filename)` do in C?",
    answer: "'remove()' deletes the specified file from the file system, returning 0 on success or non-zero on failure."
  },
  {
    question: "What does `rename(const char *oldname, const char *newname)` do in C?",
    answer: "'rename()' renames or moves a file from 'oldname' to 'newname' atomically on the file system."
  },
  {
    question: "What is the 'x' mode modifier introduced in C11 (e.g. \"wx\" or \"w+x\")?",
    answer: "The 'x' modifier enables exclusive creation: fopen() fails if the file already exists, preventing accidental overwriting of existing files."
  },
  {
    question: "Why should you set `fp = NULL;` immediately after calling `fclose(fp)`?",
    answer: "To eliminate the dangling file pointer. Attempting to use a closed 'FILE*' pointer is undefined behavior."
  },
  {
    question: "How do you check if a file exists without modifying it in C?",
    answer: "Attempt to open it with 'FILE *fp = fopen(filename, \"r\");'. If 'fp != NULL', the file exists; call 'fclose(fp)'. Alternatively, use the POSIX 'access()' function."
  },
  {
    question: "Can you switch between reading and writing on an update stream (\"r+\", \"w+\", \"a+\") directly?",
    answer: "No! The C standard requires calling a positioning function (fseek, fsetpos, rewind) or fflush between read and write operations on update streams."
  },
  {
    question: "How does local classroom debugging at Coder & AccoTax illustrate file permissions?",
    answer: "In Sukanta Hui's class, students try opening system files or read-only files in 'w' mode, observing how 'fopen' returns NULL and 'perror' prints 'Permission denied', reinforcing error handling discipline."
  },
  {
    question: "What happens if a program terminates abnormally while a file is open in 'w' mode?",
    answer: "Any unwritten buffered data in RAM is lost, leaving the file on disk truncated or missing recent updates."
  },
  {
    question: "What header defines the `errno` global integer variable?",
    answer: "The standard header `<errno.h>` declares 'errno'."
  },
  {
    question: "What is the difference between `strerror(errno)` and `perror(\"msg\")`?",
    answer: "'strerror(errno)' returns a string pointer to the error message; 'perror' immediately prints the custom message followed by the error string to 'stderr'."
  },
  {
    question: "What is the golden rule of file pointer lifecycle management?",
    answer: "Every successful fopen() must have a matching fclose(), and all fopen() calls must be followed by `if (fp == NULL)` validation!"
  }
];

export default questions;
