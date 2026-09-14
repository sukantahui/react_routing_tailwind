export const topic5Questions = [
  {
    question: "Why is 'while (!feof(fp))' considered one of the worst antipatterns in C programming?",
    answer: "feof() does not look ahead into the future; it only returns true AFTER an I/O operation attempts to read PAST the end of file and fails. Using while(!feof(fp)) causes the loop body to execute one extra time with stale or invalid buffer data."
  },
  {
    question: "What is the correct idiom to read a file until EOF instead of while(!feof(fp))?",
    answer: "Check the return value of the read function itself:\n- For characters: while ((ch = fgetc(fp)) != EOF) { ... }\n- For lines: while (fgets(buffer, sizeof(buffer), fp) != NULL) { ... }\n- For binary structs: while (fread(&rec, sizeof(rec), 1, fp) == 1) { ... }"
  },
  {
    question: "What is the purpose of ferror()?",
    answer: "int ferror(FILE *stream);\nIt checks whether the error indicator for the given stream is set. It returns a non-zero value if an I/O error occurred on the stream (e.g. disk read failure, writing to a read-only stream), and 0 otherwise."
  },
  {
    question: "What does clearerr() do?",
    answer: "void clearerr(FILE *stream);\nIt resets both the End-of-File indicator (feof) and the error indicator (ferror) for the specified file stream to zero."
  },
  {
    question: "What is the relationship between perror(), errno, and <errno.h>?",
    answer: "When a system or standard library call fails, it records an integer error code in the global variable 'errno'. Calling perror(prefix) prints the prefix string followed by a colon and the human-readable explanation of that errno value to stderr."
  },
  {
    question: "What does strerror(errno) do, and which header declares it?",
    answer: "Declared in <string.h>, 'char *strerror(int errnum)' returns a pointer to the human-readable error description string corresponding to the integer error number without printing to stderr."
  },
  {
    question: "When should you check feof() and ferror()?",
    answer: "After a read function (like fread, fgetc, or fgets) returns EOF or NULL. Use feof(fp) to confirm if termination was normal EOF, or ferror(fp) to detect if an unexpected hardware/permission error occurred."
  },
  {
    question: "Does fopen() set errno on failure?",
    answer: "Yes. When fopen() returns NULL, errno is set to specific error codes like ENOENT (No such file or directory), EACCES (Permission denied), or EMFILE (Too many open files)."
  },
  {
    question: "Why must the variable holding fgetc() return value be 'int' instead of 'char'?",
    answer: "fgetc returns an int because it must represent all valid unsigned char values (0 to 255) PLUS the EOF constant (typically -1). If stored in a signed char, byte 0xFF (255) could be misinterpreted as EOF (-1)."
  },
  {
    question: "What happens if you ignore the return value of fclose()?",
    answer: "fclose() returns 0 on success or EOF on error. If a write error occurs while flushing buffered data during fclose(), ignoring its return value will cause silent data loss to go unnoticed."
  },
  {
    question: "Can ferror be triggered by a network disconnection while reading from a mounted NFS/SMB drive?",
    answer: "Yes. If the underlying network filesystem drops, subsequent read/write calls fail, setting ferror(fp) to non-zero and setting errno to EIO or ETIMEDOUT."
  },
  {
    question: "How do you distinguish between an empty file and a read error?",
    answer: "When fgetc(fp) immediately returns EOF on the first read: if (feof(fp)) the file is empty; if (ferror(fp)) a read error occurred."
  },
  {
    question: "Does rewind() clear ferror and feof indicators?",
    answer: "Yes. rewind(fp) is defined to reset the file position indicator to the beginning AND clear both error and EOF indicators for the stream."
  },
  {
    question: "What error code indicates 'Permission Denied' in errno?",
    answer: "EACCES (error code 13 on most POSIX and Windows systems)."
  },
  {
    question: "What error code indicates 'No such file or directory' in errno?",
    answer: "ENOENT (error code 2 on most POSIX and Windows systems)."
  },
  {
    question: "Why should you set errno = 0 before calling certain standard library functions?",
    answer: "Library functions do not reset errno to 0 on success. If errno was set by a prior failed operation, it might retain the old error value unless cleared manually before calling functions like strtol."
  },
  {
    question: "Is perror thread-safe?",
    answer: "In modern C (C11 and POSIX.1-2001), errno is a thread-local variable, making perror and strerror_r thread-safe for reading the current thread's error state."
  },
  {
    question: "What happens if disk space runs out during an fwrite operation?",
    answer: "fwrite returns a count less than the requested nmemb, ferror(fp) becomes true, and errno is set to ENOSPC (No space left on device)."
  },
  {
    question: "How can you test if a file exists without opening and keeping it open?",
    answer: "In standard C, you attempt fopen(name, 'r') and immediately fclose if non-NULL. In POSIX systems, access(path, F_OK) can check existence without opening."
  },
  {
    question: "What is the difference between stderr and stdout when logging error diagnostics?",
    answer: "stderr is unbuffered by default and is intended for diagnostic alerts and error messages so they appear immediately even if the program crashes. stdout is line or fully buffered."
  },
  {
    question: "Can an interrupted system call (EINTR) cause fread or fwrite to return early?",
    answer: "Yes, on POSIX systems, if a signal is caught during blocking disk/pipe I/O, errno may be set to EINTR. Robust production programs retry the transfer loop in such cases."
  },
  {
    question: "What does remove() return on failure?",
    answer: "int remove(const char *filename);\nIt returns 0 on success and non-zero (-1) on failure, setting errno (e.g., EBUSY if the file is open, EACCES if write-protected)."
  },
  {
    question: "What does rename() return on failure?",
    answer: "int rename(const char *oldname, const char *newname);\nIt returns 0 on success and non-zero (-1) on failure, setting errno (e.g., EXDEV if attempting to move across different physical drives)."
  },
  {
    question: "What is atomic file replacement and how does it prevent file corruption on crash?",
    answer: "Write updates to a temporary file (e.g. 'data.tmp'), flush and close it, then call rename('data.tmp', 'data.dat'). On POSIX and modern Windows systems, rename is atomic, guaranteeing the database is never left in a corrupted half-written state."
  },
  {
    question: "How does fflush(fp) help in diagnosing runtime crashes?",
    answer: "Calling fflush(fp) after critical writes forces libc to flush its user-space buffers to the OS kernel immediately, ensuring logs and database records are preserved on disk even if an unexpected abort occurs."
  }
];

export default topic5Questions;
