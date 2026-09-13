export const topic3Questions = [
  {
    question: "What are the prototypes and return types of fwrite and fread in C?",
    answer: "Both functions are declared in <stdio.h> as:\nsize_t fwrite(const void *ptr, size_t size, size_t nmemb, FILE *stream);\nsize_t fread(void *ptr, size_t size, size_t nmemb, FILE *stream);\nThey return the number of full elements (not total bytes) successfully written or read."
  },
  {
    question: "What does the return value of fread() indicate?",
    answer: "fread returns the count of complete elements transferred (up to nmemb). If the return value is less than nmemb, it indicates either an End-of-File (EOF) was encountered or a read error occurred. You must use feof() or ferror() to distinguish."
  },
  {
    question: "Why should we use binary mode ('rb', 'wb', 'ab') instead of text mode for struct serialization?",
    answer: "In text mode on Windows, newline characters (\\n) are automatically translated to carriage return + newline (\\r\\n), and byte 0x1A is treated as EOF. This character translation corrupts binary struct bytes, integer bit patterns, and float IEEE-754 bit representations."
  },
  {
    question: "What is structure padding and alignment, and how does it affect binary file portability?",
    answer: "Compilers insert padding bytes between struct members to align them on word boundaries (e.g. 4 or 8 bytes). Different compilers or CPU architectures (e.g., x86 32-bit vs x86-64 vs ARM) may have different padding rules, making raw struct dumps non-portable across different systems."
  },
  {
    question: "What is the danger of serializing a struct containing pointer members with fwrite?",
    answer: "Pointers hold transient virtual memory addresses. Writing a struct with a pointer only writes the 4/8-byte numerical address, not the data pointed to. When read back in another run or machine, that memory address is invalid, causing segmentation faults or garbage data."
  },
  {
    question: "How do you serialize structures that contain dynamically allocated strings or nested pointers?",
    answer: "You must use deep serialization: first write the length of the dynamic buffer (e.g., sizeof(int)), then write the actual string/buffer bytes with a second fwrite call. On reading, first read the length, allocate memory with malloc, and read the payload bytes."
  },
  {
    question: "Can fwrite write an entire array of 100 structs in a single call?",
    answer: "Yes. You can write: fwrite(studentArray, sizeof(Student), 100, fp); This performs a single contiguous memory block transfer from RAM to the OS file buffer, which is substantially faster than calling fwrite 100 times in a loop."
  },
  {
    question: "What is endianness, and how does it impact binary files?",
    answer: "Endianness refers to byte ordering in multi-byte data types (Little Endian vs Big Endian). A 4-byte integer like 0x12345678 is stored as 78 56 34 12 on x86/ARM (Little Endian). If read on a Big Endian CPU, it reads as 0x78563412 unless byte-swapped."
  },
  {
    question: "How can you pack a struct to eliminate padding bytes?",
    answer: "GCC and Clang support __attribute__((packed)), and MSVC supports #pragma pack(push, 1). This forces 1-byte alignment, removing internal holes. However, unaligned memory access may incur CPU performance penalties on some architectures."
  },
  {
    question: "Why is fwrite faster than formatted fprintf for large datasets?",
    answer: "fprintf requires parsing formatting strings, converting numbers to ASCII character sequences, and allocating temporary buffers. fwrite simply performs a direct memory copy (memcpy-like) of raw binary bytes into the stream buffer."
  },
  {
    question: "What happens if you pass NULL as the buffer pointer to fread or fwrite?",
    answer: "Passing NULL invokes Undefined Behavior (UB), almost always resulting in an immediate segmentation fault or access violation."
  },
  {
    question: "How does fwrite behave when the disk is completely full?",
    answer: "fwrite will write as many complete elements as can fit, then fail for subsequent elements. It returns a number less than nmemb, and ferror(fp) will evaluate to true (non-zero)."
  },
  {
    question: "What is the difference between fwrite(ptr, 1, totalBytes, fp) and fwrite(ptr, sizeof(Struct), count, fp)?",
    answer: "If writing fails halfway through an element, the first format returns the exact number of bytes written so far. The second format returns only the count of *fully written* structs. Functionally the disk writes identical bytes, but the return count reflects 1-byte units vs struct units."
  },
  {
    question: "Can binary files created with fwrite be viewed or edited in Notepad?",
    answer: "No. Binary files contain raw byte values (0x00 to 0xFF) including non-printable control codes, null bytes, and float representations. Notepad will display garbled glyphs and saving it will corrupt the binary structure."
  },
  {
    question: "How do you append a new struct record to an existing binary file?",
    answer: "Open the file with fopen(filename, 'ab') or 'ab+'. Then call fwrite(&newRecord, sizeof(Record), 1, fp); The file pointer is automatically anchored to the end of the file for write operations."
  },
  {
    question: "What happens if you read a file written with a 64-bit binary on a 32-bit compiled program?",
    answer: "If the struct contains pointers or long types (which are 8 bytes in 64-bit and 4 bytes in 32-bit), member offsets and struct sizes will differ, leading to severe field misalignment and garbage data."
  },
  {
    question: "What header types from <stdint.h> ensure consistent integer sizes for binary serialization?",
    answer: "Using fixed-width types like int32_t, uint32_t, int64_t, and int16_t guarantees exact byte sizes regardless of compiler target bitness (32-bit vs 64-bit)."
  },
  {
    question: "Is it safe to write a struct containing a union using fwrite?",
    answer: "Yes, but you must know which member of the union is active. The struct will write the entire size of the union (equal to its largest member). Storing a tag field (tagged union / enum) alongside is essential to interpret the data correctly on read."
  },
  {
    question: "Can fread cause a buffer overflow if the destination buffer is too small?",
    answer: "Yes. If the size * nmemb specified in fread exceeds the memory allocated at the destination pointer ptr, fread will overwrite adjacent memory, corrupting the stack or heap."
  },
  {
    question: "How do you count the total number of struct records in a binary file?",
    answer: "Seek to the end using fseek(fp, 0, SEEK_END); long size = ftell(fp); then calculate count = size / sizeof(Record); Ensure you rewind or seek back to the beginning before reading."
  },
  {
    question: "How does buffering work under the hood during fwrite?",
    answer: "fwrite copies bytes into an internal libc FILE buffer (typically 4KB or 8KB). When the buffer fills up, libc issues a write() / WriteFile() system call to transfer the block to the OS page cache."
  },
  {
    question: "What is data versioning in binary file headers?",
    answer: "Professional binary formats write a header struct containing a 'Magic Number' (e.g. 0x4D594442) and a 'Format Version' (e.g. 1, 2) at the start of the file. This allows future software to detect format mismatches and migrate legacy records."
  },
  {
    question: "Can we use memcmp to compare two struct variables read from a binary file?",
    answer: "Only if padding bytes were zeroed before writing (e.g., via memset(&rec, 0, sizeof(rec))). Otherwise, uninitialized garbage in padding bytes may cause memcmp to report inequality even if all active fields match."
  },
  {
    question: "What happens if a program crashes before fclose after multiple fwrite calls?",
    answer: "Data remaining in user-space libc stream buffers will be lost because it was never flushed to the OS kernel. Calling fflush(fp) periodically commits buffered data to the kernel."
  },
  {
    question: "What is the recommended idiom for reading all binary records with fread in a loop?",
    answer: "The recommended idiom is: while (fread(&record, sizeof(Record), 1, fp) == 1) { /* process record */ } This cleanly terminates when EOF is reached or a read error occurs."
  }
];
