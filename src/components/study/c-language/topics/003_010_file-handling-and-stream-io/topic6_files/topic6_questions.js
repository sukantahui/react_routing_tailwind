export const topic6Questions = [
  {
    question: "What is CRUD in file-based database architecture?",
    answer: "CRUD represents the four fundamental operations of persistent storage:\n- Create (Insert records via fwrite in 'ab' mode)\n- Read (Retrieve records via fread and fseek in 'rb' mode)\n- Update (Mutate existing fields via fseek and fwrite in 'rb+' mode)\n- Delete (Mark tombstone or purge records via temp file compaction)"
  },
  {
    question: "What is the 'tombstone' pattern (soft delete) in file systems and why is it preferred over immediate hard deletion?",
    answer: "Hard deletion requires shifting all subsequent records forward on disk (O(N) write cost) or rewriting the entire file. Soft deletion simply sets a boolean flag (e.g. isActive = false) in O(1) time. Purging is deferred to background maintenance compaction."
  },
  {
    question: "Why should we use 'ab' mode for record insertion?",
    answer: "'ab' (Append Binary) mode automatically positions the file write pointer to the very end of the file before every write operation, guaranteeing that concurrent or consecutive writes never overwrite existing records."
  },
  {
    question: "How does Database Compaction (Purge) work in C?",
    answer: "Compaction streams active records from the master database file to a new temporary file (ignoring tombstoned inactive records). Once complete, fclose flushes both files, remove() deletes the old file, and rename() renames the temp file to the master filename."
  },
  {
    question: "Why is rename() preferred for atomic swapping of database files?",
    answer: "On POSIX filesystems and modern OS kernels, rename() is atomic within the same filesystem. If the power cuts out during compaction, the old database remains intact because the swap happens instantaneously at the filesystem metadata level."
  },
  {
    question: "How does fixed-width record architecture enable O(1) primary key indexing?",
    answer: "If records have sequential IDs (e.g., ID 100, 101, 102...) or an auxiliary hash/B-Tree index, the byte offset is computed directly as: offset = (ID - BASE_ID) * sizeof(Record). The OS seeks to the byte position in O(1) time without scanning intermediate records."
  },
  {
    question: "What happens if two processes open the same binary database in 'rb+' mode simultaneously without file locking?",
    answer: "Race conditions can occur: dirty reads, lost updates, or interleaved writes that corrupt record boundaries. Production database engines use advisory locking (e.g., fcntl() or flock() on POSIX, LockFileEx() on Windows)."
  },
  {
    question: "How do you handle string fields like name and course to avoid buffer overflow during file input?",
    answer: "Store strings in fixed-size arrays inside the struct (e.g. char name[50]), and populate them using strncpy() or snprintf() with explicit bounds, ensuring null-termination: name[MAX_NAME - 1] = '\\0'."
  },
  {
    question: "What is the memory footprint of keeping the entire database on disk vs loading it into RAM?",
    answer: "On disk, the database can scale to hundreds of gigabytes while the C program consumes only a few kilobytes of RAM (just one record buffer). In-memory arrays are limited by available physical RAM."
  },
  {
    question: "Why is fflush(fp) important after an in-place update in 'rb+' mode?",
    answer: "fflush forces the modified struct from libc's user-space stream buffer directly down to OS kernel page cache, ensuring modifications survive even if the program terminates abnormally right after."
  },
  {
    question: "How do you implement binary search on a sorted disk file?",
    answer: "Calculate low = 0 and high = totalRecords - 1. While low <= high, compute mid = low + (high - low) / 2. Jump using fseek(fp, mid * sizeof(Record), SEEK_SET), read the record with fread, and compare the key."
  },
  {
    question: "What is a 'Magic Number' in database file headers?",
    answer: "A fixed constant (e.g. 4 bytes: 0x53544442 for 'STDB') written at byte 0 of the file. On startup, the engine reads this header to verify that the file is indeed a valid database created by this engine, preventing corruption from opening arbitrary files."
  },
  {
    question: "What is the difference between sequential search and index-assisted search on binary files?",
    answer: "Sequential search scans all records from byte 0 (O(N) disk I/O). Index-assisted search keeps a lightweight in-memory array of (ID, DiskByteOffset) pairs, allowing instant O(1) or O(log N) lookup directly to the target byte."
  },
  {
    question: "Why should we avoid writing floats/doubles directly to disk if the file must be read on different CPU architectures?",
    answer: "While IEEE-754 is widely standard, different architectures may have different endianness for floating-point words. For extreme portability, floats are converted to fixed-point integers or serialized in standardized endian formats."
  },
  {
    question: "What is WAL (Write-Ahead Logging) in database systems?",
    answer: "A technique where changes are first appended sequentially to a log file before modifying the master database records. If a crash occurs mid-update, the engine replays the WAL on startup to restore consistency."
  },
  {
    question: "How do you count the number of active vs deleted records in a binary database?",
    answer: "Iterate through the file with fread(&rec, sizeof(rec), 1, fp). Maintain two counters: activeCount++ if rec.isActive is true, and deletedCount++ if rec.isActive is false."
  },
  {
    question: "Why is 'w+' mode inappropriate for opening an existing database for update?",
    answer: "'w+' immediately truncates (erases) the file to 0 bytes upon opening! To update an existing database without erasing its data, you must use 'rb+' (or 'r+')."
  },
  {
    question: "What is the purpose of fcloseall() or explicitly closing every FILE pointer?",
    answer: "Leaving file handles open causes file descriptor leaks. In long-running server processes, running out of file descriptors (EMFILE error) prevents new files or network sockets from opening."
  },
  {
    question: "Can a C binary file engine store dynamic variable-length records (e.g. comments of arbitrary length)?",
    answer: "Yes, by storing records in two files: an index file of fixed-size metadata containing (ID, Offset, Length) and a heap data file containing raw variable-length byte streams."
  },
  {
    question: "How do you implement rollback / undo in a simple C file engine?",
    answer: "Before executing an in-place overwrite, read the original record and store it in a transaction buffer. If an error occurs, seek back and re-write the old record."
  },
  {
    question: "What is the impact of structure alignment on total database file size?",
    answer: "Padding bytes inside structs consume disk space. For 10 million records, 4 bytes of padding per struct consumes 40 MB of extra disk space. Compacting or reordering fields (largest to smallest) minimizes padding waste."
  },
  {
    question: "How does the OS page cache accelerate repeated reads in a C binary file engine?",
    answer: "When fread reads 60 bytes, the OS reads an entire 4KB page from disk into RAM cache. Subsequent fseek/fread calls targeting nearby records are served directly from RAM without hitting physical disk platters/SSDs."
  },
  {
    question: "What is the difference between synchronous write (O_SYNC / fflush) and asynchronous write?",
    answer: "Asynchronous writes return immediately after copying to cache (fast). Synchronous writes wait until disk controller confirms bytes are physically recorded on non-volatile media (durable)."
  },
  {
    question: "Why should error handling accompany every fopen, fread, fwrite, and fseek call in a database engine?",
    answer: "File systems can fail at any moment due to permissions, full disks, unmounted drives, or hardware failures. Unchecked returns cause silent data corruption or undefined segmentation faults."
  },
  {
    question: "How do you test database engine resilience against unexpected termination?",
    answer: "By creating unit tests that simulate power interruption (e.g. calling abort() or exit() immediately after write operations) and verifying if compaction or recovery restores the database to a valid state."
  }
];
