export const topic6Questions = [
  {
    question: "How does this Capstone architecture unify in-memory caching and persistent disk storage?",
    answer: "During active runtime execution, queries, mutations, and deletions operate on a high-speed Doubly Linked List in RAM (O(1) updates). When saving, active nodes are serialized to a binary disk file via fwrite(). On startup, fread() deserializes records back into RAM heap nodes."
  },
  {
    question: "Why is a Doubly Linked List chosen as the in-memory cache structure?",
    answer: "Because it provides O(1) node detachment and deletion without linear scanning when a node pointer is held, and supports efficient bi-directional traversal for pagination."
  },
  {
    question: "What is the benefit of decoupling in-memory node representations from on-disk record schemas?",
    answer: "In-memory nodes store transient pointers ('next' and 'prev'). On disk, only pure payload bytes (StudentRecord) are serialized, saving storage space and avoiding invalid pointer address persistence."
  },
  {
    question: "How do you ensure zero memory leaks when destroying and re-initializing the database?",
    answer: "Traverse the linked list and free every StudentNode individually before freeing the master StudentDatabase container struct: freeDatabase(db)."
  },
  {
    question: "What is the time complexity of persisting an N-node database to disk via sequential fwrite()?",
    answer: "O(N) linear time, transferring each struct into the libc stream buffer, which writes full 4KB disk blocks to the operating system."
  },
  {
    question: "How do you protect database binary files from partial write corruption during a system crash?",
    answer: "Write to a temporary file (e.g. 'db.tmp'), verify fclose() success, and call atomic rename('db.tmp', 'db.dat')."
  },
  {
    question: "What is the memory footprint of storing 100,000 student records in RAM vs on disk?",
    answer: "On disk: 100,000 * sizeof(StudentRecord) (approx 8.8 MB). In RAM: 100,000 * sizeof(StudentNode) (approx 10.4 MB, due to 16 bytes of next/prev pointers)."
  },
  {
    question: "How does the system handle ID lookups efficiently?",
    answer: "By traversing the head-to-tail linked chain and checking matching ID and active status flags. For million-record datasets, an auxiliary hash table or AVL tree index is added."
  },
  {
    question: "Why should strings inside structs be sized with fixed char arrays (e.g. char name[50])?",
    answer: "Fixed-size arrays allow structs to be serialized directly as fixed-width binary blocks with fwrite/fread without requiring custom variable-length string parsers."
  },
  {
    question: "How does the Capstone validate data integrity on loading?",
    answer: "By checking the return value of fread() and verifying that the number of successfully read structs matches the expected file size: totalBytes / sizeof(StudentRecord)."
  },
  {
    question: "Can this system be compiled with GCC -Wall -Wextra -Werror with zero warnings?",
    answer: "Yes, by adhering to strict ANSI C conventions, proper type casting, and checking every malloc and file handle return value."
  },
  {
    question: "How do you add multi-criteria search (e.g. search by department or GPA range)?",
    answer: "Iterate through the linked node chain and collect pointers to all nodes satisfying the filter predicates (e.g. strstr(node->data.department, query) && node->data.gpa >= minGpa)."
  },
  {
    question: "How do you implement sorting (e.g. Sort by GPA descending) on the in-memory Doubly Linked List?",
    answer: "Implement Merge Sort for Doubly Linked Lists in O(N log N) time by splitting the list at the midpoint using slow/fast pointers and merging sorted halves in-place without auxiliary memory."
  },
  {
    question: "What is the role of the 'isActive' boolean tombstone flag?",
    answer: "It allows soft deletions in disk files and records historical audit states without physically wiping records immediately."
  },
  {
    question: "Why is modular separation essential when scaling this Capstone to a production microservice?",
    answer: "Decoupling storage engine (db.c), business logic (student.c), CLI interface (cli.c), and diagnostics (logger.h) allows swapping disk storage for network sockets without touching UI code."
  },
  {
    question: "How does this Capstone demonstrate complete mastery of the C language?",
    answer: "It synthesizes pointers, structs, dynamic heap memory, binary file stream I/O, error diagnostics, preprocessor macros, and build automation into a unified, crash-resilient application."
  },
  {
    question: "What happens if a user inputs a name longer than 50 characters?",
    answer: "Using strncpy() with explicit bounds (sizeof(name) - 1) and manual null-termination guarantees buffer overflow immunity."
  },
  {
    question: "Can this system run across Windows, Linux, and macOS without source code changes?",
    answer: "Yes, because it relies strictly on ISO C99/C11 standard library functions without proprietary OS API locks."
  },
  {
    question: "How do you benchmark the database's serialization throughput?",
    answer: "Wrap the persistDatabaseToFile() call in a TIME_BLOCK() macro to measure disk serialization duration in milliseconds."
  },
  {
    question: "What is the purpose of returning 'bool' from database operations?",
    answer: "It provides clean, explicit success/failure feedback to callers without relying on magic negative error numbers."
  },
  {
    question: "How do you implement transaction rollback in this engine?",
    answer: "Before mutating a node, save a copy of its StudentRecord. If validation fails, restore the saved struct."
  },
  {
    question: "How do you export the database records to a human-readable CSV file?",
    answer: "Iterate through nodes and write formatted ASCII lines: fprintf(fp, \"%d,%s,%s,%.2f\\n\", s.id, s.name, s.department, s.gpa)."
  },
  {
    question: "What is the impact of compiler optimization (-O3) on this Capstone application?",
    answer: "-O3 inlines small helper functions, unrolls loops, and optimizes register allocation, achieving hundreds of thousands of operations per second."
  },
  {
    question: "How do you verify there are zero memory leaks in this Capstone using Valgrind?",
    answer: "Run: valgrind --leak-check=full ./student_system. Valgrind will report '0 bytes in 0 blocks' leaked if freeDatabase() correctly frees all nodes."
  },
  {
    question: "What is the ultimate takeaway from completing this comprehensive C systems curriculum?",
    answer: "You possess a profound, mechanical understanding of memory, CPU execution, pointers, disk streams, and build engineering—the bedrock upon which all modern computing infrastructure is built."
  }
];
