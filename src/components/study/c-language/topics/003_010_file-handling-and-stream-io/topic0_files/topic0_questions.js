// topic0_questions.js - 25 FAQs for Standard Streams & Stream Buffering

const questions = [
  {
    question: "What is a Stream in C input/output?",
    answer: "A stream is a logical interface and abstraction provided by the C standard library that maps uniform sequential byte I/O operations across diverse physical devices (keyboards, terminals, disk files, network sockets, printers)."
  },
  {
    question: "What are the three predefined standard streams automatically opened for every C program?",
    answer: "The standard streams are: 1) 'stdin' (Standard Input, file descriptor 0, default keyboard), 2) 'stdout' (Standard Output, file descriptor 1, default terminal display), and 3) 'stderr' (Standard Error, file descriptor 2, default unbuffered terminal output)."
  },
  {
    question: "What are the three stream buffering modes defined in <stdio.h>?",
    answer: "1) Full Buffering ('_IOFBF'): Data is read/written in large blocks when the buffer is completely full. 2) Line Buffering ('_IOLBF'): Data is flushed whenever a newline ('\\n') character is output or buffer fills. 3) Unbuffered ('_IONBF'): Characters are transmitted directly to the device immediately without intermediate storage."
  },
  {
    question: "Why is stderr unbuffered (_IONBF) by default in C?",
    answer: "Because error messages, diagnostic warnings, and fatal abort notices must reach the console immediately, ensuring they are visible even if the program crashes in the very next instruction before a newline."
  },
  {
    question: "What does the function fflush(FILE *stream) do?",
    answer: "fflush() writes any unwritten buffered data in the output stream's user-space buffer directly to the underlying OS file or device. Passing NULL ('fflush(NULL)') flushes all open output streams."
  },
  {
    question: "Is calling fflush(stdin) standard C behavior for clearing input buffers?",
    answer: "No! The C standard explicitly states that calling fflush() on an input stream produces Undefined Behavior. To safely clear the input buffer, read characters until '\\n' or EOF using 'while((c = getchar()) != '\\n' && c != EOF);'."
  },
  {
    question: "How does setvbuf() allow custom stream buffering configuration?",
    answer: "The prototype is: 'int setvbuf(FILE *stream, char *buffer, int mode, size_t size);'. It allows the developer to supply a custom memory buffer and choose between _IOFBF, _IOLBF, or _IONBF before performing I/O operations."
  },
  {
    question: "What happens if setvbuf() is called after I/O operations have already begun on a stream?",
    answer: "Calling setvbuf() after I/O has started produces undefined behavior. It must be called immediately after opening the file or at the start of main() before any read/write calls."
  },
  {
    question: "Why does `printf(\"Loading...\");` without a newline not appear immediately on the terminal?",
    answer: "Standard output ('stdout') connected to a terminal is Line-Buffered (_IOLBF). Without a '\\n' or an explicit 'fflush(stdout);', the text remains trapped in the output buffer."
  },
  {
    question: "What is the difference between Text Streams and Binary Streams in C?",
    answer: "In Text streams, newline characters ('\\n') may be translated to/from platform-specific line endings (e.g. CRLF '\\r\\n' on Windows). Binary streams transfer exact raw bytes with zero translation or modification."
  },
  {
    question: "What are File Descriptors in POSIX/Linux systems?",
    answer: "File descriptors are low-level non-negative integers (0 for stdin, 1 for stdout, 2 for stderr) assigned by the operating system kernel to identify open file tables."
  },
  {
    question: "How does the C FILE* pointer relate to the operating system's raw file descriptor?",
    answer: "A 'FILE*' is a high-level user-space data structure encapsulating the file descriptor, stream buffer pointer, buffer capacity, read/write offset, and error/EOF flags."
  },
  {
    question: "What function retrieves the integer file descriptor from a `FILE*` pointer?",
    answer: "The POSIX function 'fileno(FILE *stream)' returns the integer file descriptor associated with the stream."
  },
  {
    question: "What is I/O Redirection in command-line shells (e.g. `./app > output.txt 2> error.log`)?",
    answer: "The shell rebinds file descriptor 1 (stdout) to 'output.txt' and file descriptor 2 (stderr) to 'error.log' using system calls like dup2(), cleanly separating output from errors."
  },
  {
    question: "When stdout is redirected to a disk file, how does its buffering mode change automatically?",
    answer: "When connected to an interactive terminal, stdout is Line-Buffered (_IOLBF). When redirected to a regular disk file, it automatically switches to Full Buffering (_IOFBF, typically 4KB or 8KB) for optimal disk throughput."
  },
  {
    question: "What is the function of `setbuf(FILE *stream, char *buffer)`?",
    answer: "'setbuf(stream, buf)' is a simplified legacy wrapper around setvbuf(). If 'buf' is non-null, it enables full buffering with default size BUFSIZ; if 'buf' is NULL, it disables buffering (_IONBF)."
  },
  {
    question: "What is `BUFSIZ` in `<stdio.h>`?",
    answer: "'BUFSIZ' is a standard macro defining the implementation's default optimal buffer size for file stream operations (commonly 512, 1024, 4096, or 8192 bytes)."
  },
  {
    question: "Why does stream buffering dramatically improve performance for disk and network I/O?",
    answer: "System calls ('read' / 'write') and disk head seeks have high overhead. Buffering accumulates hundreds of individual byte operations into one single bulk block write, reducing system calls by orders of magnitude."
  },
  {
    question: "What happens to stream buffers when `exit(0)` or `return 0` from `main()` executes?",
    answer: "Standard exit processing automatically flushes all open output stream buffers and cleanly closes all open file pointers."
  },
  {
    question: "What happens to stream buffers if a program crashes abruptly via `_Exit()` or `abort()` or a segmentation fault?",
    answer: "Unflushed buffered data in user-space RAM is lost permanently because low-level abnormal termination bypasses standard library buffer flushing."
  },
  {
    question: "How does local classroom debugging at Coder & AccoTax demonstrate stream buffering?",
    answer: "In Sukanta Hui's lab, students write animation and progress-bar loops using 'printf(\".\")' without '\\n'. They observe the dots freezing until 'fflush(stdout)' is called, making the buffering concept crystal clear."
  },
  {
    question: "Can `stderr` be redirected separately from `stdout` in the terminal?",
    answer: "Yes, using shell redirection syntax: `command > normal.txt 2> errors.txt` or combined with `command > all.txt 2>&1`."
  },
  {
    question: "What is `fwide(FILE *stream, int mode)` used for?",
    answer: "'fwide' queries or sets the stream orientation (byte-oriented for standard char I/O or wide-oriented for wchar_t Unicode I/O)."
  },
  {
    question: "Why is mixing wide-character I/O and byte-oriented I/O on the same stream prohibited?",
    answer: "Once a stream establishes its orientation (byte vs wide) on its first I/O call, mixing operations results in undefined behavior until the stream is closed and reopened."
  },
  {
    question: "What is the golden rule of terminal progress displays in C?",
    answer: "Whenever printing interactive status updates, prompts, or progress indicators without a newline '\\n', always immediately call `fflush(stdout);` to ensure instant visibility!"
  }
];

export default questions;
