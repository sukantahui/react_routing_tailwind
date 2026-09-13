// topic1_questions.js - 25 FAQs for malloc() vs calloc()

const questions = [
  {
    question: "What is the function prototype of malloc() in <stdlib.h>?",
    answer: "The prototype is: 'void *malloc(size_t size);'. It takes a single parameter specifying the total number of bytes to allocate on the heap and returns a 'void*' pointer to the first byte, or NULL on failure."
  },
  {
    question: "What is the function prototype of calloc() in <stdlib.h>?",
    answer: "The prototype is: 'void *calloc(size_t num, size_t size);'. It takes two parameters: 'num' (number of elements) and 'size' (byte size of each element). It allocates 'num * size' contiguous bytes and initializes all bits to zero."
  },
  {
    question: "What is the key difference between malloc() and calloc() regarding initial memory content?",
    answer: "malloc() does not initialize allocated memory, leaving it containing whatever residual bit patterns (garbage values) previously existed in RAM. In contrast, calloc() explicitly zeroes out every single allocated byte before returning the pointer."
  },
  {
    question: "Why is checking for NULL immediately after malloc() or calloc() mandatory?",
    answer: "If system RAM or virtual memory swap is exhausted, the operating system kernel cannot satisfy the request, and the allocator returns NULL. Attempting to dereference a NULL pointer (e.g., '*ptr = 10') causes an immediate operating system segmentation fault (crash)."
  },
  {
    question: "How do you correctly check for allocation failure in C?",
    answer: "Use: 'int *ptr = malloc(n * sizeof(int)); if (ptr == NULL) { fprintf(stderr, \"Allocation failed!\\n\"); exit(EXIT_FAILURE); }'"
  },
  {
    question: "Why should we use 'sizeof(type)' instead of hardcoding byte constants in malloc?",
    answer: "Data type sizes vary across hardware architectures (e.g., 'sizeof(int*)' is 4 bytes on 32-bit systems and 8 bytes on 64-bit systems). Using 'sizeof(*ptr)' or 'sizeof(type)' guarantees 100% portability."
  },
  {
    question: "What is the recommended idiom: 'malloc(n * sizeof(int))' or 'malloc(n * sizeof(*ptr))'?",
    answer: "Using 'sizeof(*ptr)' (e.g., 'ptr = malloc(n * sizeof(*ptr))') is preferred in modern C best practices because if the type of 'ptr' changes in future refactoring (e.g., from int* to double*), the sizeof expression automatically adjusts without code desynchronization."
  },
  {
    question: "Is calloc() slower than malloc() and why?",
    answer: "Yes, calloc() can be slightly slower because it must clear every allocated byte to zero (performing an explicit 'memset' or zero-page mapping), whereas malloc() simply marks the block as allocated without touching the underlying memory contents."
  },
  {
    question: "Can calloc() prevent integer overflow when computing total bytes?",
    answer: "Yes. Many modern C standard libraries check if 'num * size' would overflow 'size_t' inside calloc() and safely return NULL, whereas with 'malloc(num * size)', the multiplication overflow occurs before malloc() is even called."
  },
  {
    question: "What does malloc(0) or calloc(0, size) return in C?",
    answer: "The C standard allows implementation-defined behavior: it may either return a non-null unique pointer that cannot be dereferenced but can be passed safely to free(), or return NULL."
  },
  {
    question: "What happens if you allocate memory with malloc() and immediately read its values without writing?",
    answer: "Reading uninitialized memory produces indeterminate garbage values and can cause severe security vulnerabilities (information disclosure of leftover memory from other routines)."
  },
  {
    question: "Is calloc(n, sizeof(float)) guaranteed to set floating-point variables to 0.0?",
    answer: "On all modern systems conforming to IEEE 754 floating-point standards (virtually all x86, ARM, RISC-V), all-zero bit representations evaluate to exactly 0.0f and 0.0."
  },
  {
    question: "Is calloc() guaranteed to set pointer members to NULL in standard C?",
    answer: "On virtually all modern platforms, NULL is represented by all-zero bits (0x0). In extreme legacy architectures with non-zero NULL bit patterns, explicit NULL assignment is required."
  },
  {
    question: "Can memory allocated with calloc() be resized with realloc()?",
    answer: "Yes, memory allocated with either malloc() or calloc() resides on the same heap runtime and can be resized seamlessly using realloc()."
  },
  {
    question: "How do you allocate dynamic memory for a struct in C?",
    answer: "Using: 'struct Student *s = (struct Student *)malloc(sizeof(struct Student)); if (s != NULL) { s->roll = 101; }'"
  },
  {
    question: "How do you dynamically allocate an array of 50 structs?",
    answer: "Using: 'struct Student *arr = (struct Student *)malloc(50 * sizeof(struct Student));' or 'calloc(50, sizeof(struct Student));'"
  },
  {
    question: "What is the return type 'void*' in C and why does it not need a cast from malloc?",
    answer: "In C (unlike C++), 'void*' is a universal pointer that implicitly converts to any data pointer type without an explicit cast operator (e.g. 'int *p = malloc(...)')."
  },
  {
    question: "Why do some developers still write explicit casts like '(int*)malloc(...)'?",
    answer: "Explicit casts are used for C++ compatibility (where void* cannot be implicitly assigned to typed pointers) or to make code review intent immediately visible."
  },
  {
    question: "What happens if you allocate memory with malloc() in a loop without freeing?",
    answer: "It creates a severe 'Memory Leak'. The process will continuously consume RAM until the system runs out of memory (OOM killer terminates the program)."
  },
  {
    question: "Can you pass a pointer allocated by malloc() to free() multiple times?",
    answer: "No. Calling free() more than once on the same pointer causes a critical 'Double Free' corruption error, crashing the runtime allocator."
  },
  {
    question: "What is the difference between static array declaration 'int arr[100];' and 'int *arr = malloc(100 * sizeof(int));'?",
    answer: "'int arr[100];' has fixed compile-time size, is allocated on the stack/data segment, and is automatically destroyed on scope exit. The malloc version has runtime-determined size, lives on the heap, and persists until freed."
  },
  {
    question: "How does local classroom debugging at Coder & AccoTax demonstrate calloc vs malloc?",
    answer: "In Sukanta Hui's lab, students print arrays immediately after allocation. The malloc array prints random numbers like '-858993460', whereas the calloc array cleanly prints '0 0 0 0 0'."
  },
  {
    question: "When should you choose calloc() over malloc()?",
    answer: "Choose calloc() when you need counters, frequency tables, matrix accumulators, or boolean flag tables where elements must start cleanly at zero."
  },
  {
    question: "When should you choose malloc() over calloc()?",
    answer: "Choose malloc() when you plan to immediately overwrite the entire buffer (e.g. reading from a file with fread, copying with strcpy, or filling in a loop), saving the CPU overhead of zeroing memory."
  },
  {
    question: "What is the maximum amount of memory malloc() can allocate in a single call?",
    answer: "Theoretical limit is SIZE_MAX (the maximum value of size_t, 18.4 exabytes on 64-bit). The practical limit is bounded by physical RAM, OS page tables, and available virtual memory space."
  }
];

export default questions;
