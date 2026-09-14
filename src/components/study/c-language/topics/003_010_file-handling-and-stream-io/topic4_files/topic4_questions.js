export const topic4Questions = [
  {
    question: "What is random access in C file handling, and how does it differ from sequential access?",
    answer: "Sequential access reads or writes bytes strictly from start to finish in linear order. Random access allows jumping directly to any arbitrary byte offset in a file instantaneously without reading intermediate data, using functions like fseek() and ftell()."
  },
  {
    question: "What is the prototype and return value of fseek()?",
    answer: "int fseek(FILE *stream, long offset, int whence);\nIt returns 0 on success, and non-zero (-1) on error. On failure, errno is set (e.g. EINVAL or ESPIPE for pipes/sockets)."
  },
  {
    question: "What are the three standard origin constants used as the 'whence' parameter in fseek()?",
    answer: "1. SEEK_SET (0): Relative to the beginning of the file.\n2. SEEK_CUR (1): Relative to the current file pointer position.\n3. SEEK_END (2): Relative to the end of the file."
  },
  {
    question: "What is the function of ftell()?",
    answer: "long ftell(FILE *stream);\nIt returns the current byte offset of the file position indicator from the beginning of the file, or -1L on error."
  },
  {
    question: "What does the rewind() function do?",
    answer: "void rewind(FILE *stream);\nIt resets the file position indicator to the very beginning of the stream (equivalent to (void)fseek(stream, 0L, SEEK_SET)) and additionally clears both error and EOF indicators for the stream."
  },
  {
    question: "How do you calculate the byte size of any file using fseek and ftell?",
    answer: "fseek(fp, 0, SEEK_END);\nlong fileSize = ftell(fp);\nrewind(fp); // or fseek(fp, 0, SEEK_SET);\nThis moves the pointer to the end, reads the offset (total bytes), and returns the pointer to the start."
  },
  {
    question: "How do you calculate the byte offset of the Nth record in a binary file?",
    answer: "For 0-indexed records: long offset = (long)N * sizeof(RecordType);\nfseek(fp, offset, SEEK_SET);"
  },
  {
    question: "Can fseek seek past the end of a file?",
    answer: "Yes, seeking past EOF is permissible in C. If you subsequently write data beyond EOF, the OS creates a 'file hole' (sparse file) filled with zero bytes between the old EOF and the new write location."
  },
  {
    question: "Why does fseek have limitations in text mode on Windows?",
    answer: "In text mode on Windows, \\r\\n carriage-return conversions alter byte offsets dynamically. In text streams, fseek() is only guaranteed to work with SEEK_SET using an offset previously returned by ftell() on that same stream, or with an offset of 0."
  },
  {
    question: "What is the 2 GB / 4 GB file size limitation with fseek and ftell, and how is it solved?",
    answer: "Because ftell and fseek use signed 'long' (32-bit on Windows and 32-bit Linux), maximum addressable file size is 2 GB. POSIX provides fseeko() / ftello() with 64-bit 'off_t', and C standard provides fgetpos() / fsetpos() with 'fpos_t'."
  },
  {
    question: "What is the purpose of fgetpos() and fsetpos()?",
    answer: "int fgetpos(FILE *stream, fpos_t *pos);\nint fsetpos(FILE *stream, const fpos_t *pos);\nThey record and restore file positions using an opaque fpos_t object that can handle extremely large files and non-trivial multibyte character shift states."
  },
  {
    question: "How do you perform an in-place update of a single record in a binary file?",
    answer: "1. Open in update mode ('rb+' or 'r+b').\n2. Seek to record: fseek(fp, index * sizeof(Rec), SEEK_SET);\n3. Read record: fread(&rec, sizeof(Rec), 1, fp);\n4. Modify record fields in RAM.\n5. Seek back: fseek(fp, index * sizeof(Rec), SEEK_SET);\n6. Overwrite: fwrite(&rec, sizeof(Rec), 1, fp);\n7. Flush: fflush(fp);"
  },
  {
    question: "Why must you seek between a read and a write in update mode ('r+', 'w+', 'a+')?",
    answer: "The ANSI C standard requires that an input operation cannot be directly followed by an output operation without an intervening call to fflush, fseek, fsetpos, or rewind (and vice versa) to synchronize internal I/O stream buffers."
  },
  {
    question: "Can you use fseek on stdin, stdout, or network sockets?",
    answer: "No. Interactive streams like stdin, stdout, stderr, pipes, and sockets are non-seekable. Calling fseek on them fails and returns -1 with errno set to ESPIPE (Illegal seek)."
  },
  {
    question: "What is the difference between SEEK_CUR with a positive vs negative offset?",
    answer: "A positive offset moves the file indicator forward towards EOF; a negative offset moves the file indicator backward towards the start of the file."
  },
  {
    question: "How do you jump to read the very last record in a binary file?",
    answer: "fseek(fp, -(long)sizeof(Record), SEEK_END);\nfread(&lastRec, sizeof(Record), 1, fp);"
  },
  {
    question: "What happens if you seek to a negative offset before SEEK_SET?",
    answer: "Seeking before the beginning of the file is an error. fseek returns -1, and the file position remains unchanged."
  },
  {
    question: "Does fseek clear the End-of-File (EOF) indicator?",
    answer: "Yes, successful calls to fseek, fsetpos, and rewind clear the EOF indicator on the stream."
  },
  {
    question: "Does fseek clear the error indicator (ferror)?",
    answer: "No. fseek does not clear error indicators. Only rewind() or clearerr() clears the ferror condition."
  },
  {
    question: "Why is random access in binary files O(1) time complexity?",
    answer: "Because all struct records have an identical fixed size, the byte address is computed with a simple multiplication: address = index * record_size. The OS file system maps this to disk sectors instantly without scanning."
  },
  {
    question: "Can variable-length text records support O(1) random access?",
    answer: "Not directly, because line lengths vary. To achieve fast random access on text or variable data, you must build an auxiliary index file storing fixed-size (Key, ByteOffset) pairs."
  },
  {
    question: "How does OS file buffering interact with fseek?",
    answer: "When fseek moves outside the current libc buffer window, the dirty buffer is flushed (if modified) and the buffer is discarded. The next read/write causes the OS to fetch a new 4KB/8KB disk sector."
  },
  {
    question: "What is a sparse file created by seeking past EOF?",
    answer: "A file where large blocks of zeros are stored efficiently as metadata without consuming physical disk allocation blocks until non-zero data is actually written to them."
  },
  {
    question: "How do you verify whether an fseek operation succeeded?",
    answer: "Always check the return value: if (fseek(fp, offset, whence) != 0) { perror('fseek failed'); /* handle error */ }"
  },
  {
    question: "What is the difference between 'r+' and 'w+' when performing random access?",
    answer: "'r+' opens an existing file without truncating it, allowing random reads and writes anywhere. 'w+' immediately truncates (wipes) the file to 0 bytes before opening, destroying existing content."
  }
];

export default topic4Questions;
