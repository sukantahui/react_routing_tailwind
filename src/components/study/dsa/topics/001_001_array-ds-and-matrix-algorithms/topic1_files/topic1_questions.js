const questions = [
  {
    "id": 1,
    "question": "Why is geometric capacity doubling (`capacity *= 2`) used in dynamic arrays instead of arithmetic expansion (`capacity += 100`)?",
    "options": [
      "Geometric doubling achieves Amortized O(1) time per append operation, whereas arithmetic expansion degrades to quadratic O(N) amortized time per append",
      "Because CPU memory can only be allocated in powers of 2",
      "Because C compilers reject addition in malloc",
      "To prevent pointer decay"
    ],
    "answer": "Geometric doubling achieves Amortized O(1) time per append operation, whereas arithmetic expansion degrades to quadratic O(N) amortized time per append",
    "explanation": "With doubling, doubling occurs after 1, 2, 4, 8, ... N insertions. Total copying steps across N insertions is 1 + 2 + 4 + ... + N = 2N - 1. Dividing by N gives 2N / N = O(1) amortized time per push."
  },
  {
    "id": 2,
    "question": "What catastrophic bug occurs when writing `ptr = realloc(ptr, new_size);` without using an intermediate temporary pointer?",
    "options": [
      "If `realloc()` fails, it returns NULL, immediately overwriting `ptr` and permanently leaking the original allocated memory block",
      "The program immediately compiles in debug mode",
      "The operating system closes all file handles",
      "The memory is zeroed out"
    ],
    "answer": "If `realloc()` fails, it returns NULL, immediately overwriting `ptr` and permanently leaking the original allocated memory block",
    "explanation": "When `realloc` fails due to insufficient memory, it returns NULL but leaves the original block untouched. Directly assigning to `ptr` destroys the only reference to the original block, causing a memory leak."
  },
  {
    "id": 3,
    "question": "What is the proper idiomatic pattern for safe memory reallocation in C?",
    "options": [
      "`int* temp = realloc(ptr, new_size); if (!temp) { /* handle error */ } else { ptr = temp; }`",
      "`ptr = realloc(ptr, new_size);`",
      "`free(ptr); ptr = malloc(new_size);`",
      "`ptr += new_size;`"
    ],
    "answer": "`int* temp = realloc(ptr, new_size); if (!temp) { /* handle error */ } else { ptr = temp; }`",
    "explanation": "Using an intermediate pointer `temp` ensures that if reallocation fails, the original pointer `ptr` remains valid and accessible for cleanup or graceful error recovery."
  },
  {
    "id": 4,
    "question": "What are the three essential members of a standard Dynamic Array (Vector) struct in C?",
    "options": [
      "`int* data` (pointer to heap buffer), `size_t size` (current element count), and `size_t capacity` (total allocated slots)",
      "`int head`, `int tail`, and `int next`",
      "`char* name`, `int id`, and `float salary`",
      "`int* root`, `int left`, and `int right`"
    ],
    "answer": "`int* data` (pointer to heap buffer), `size_t size` (current element count), and `size_t capacity` (total allocated slots)",
    "explanation": "A dynamic array struct must track the raw heap pointer, how many elements are currently active (`size`), and the physical limit of the allocated buffer (`capacity`)."
  },
  {
    "id": 5,
    "question": "What does `realloc(ptr, 0)` do according to traditional standard C behavior?",
    "options": [
      "Frees the memory block pointed to by `ptr` (equivalent to `free(ptr)`) and returns NULL or an implementation-defined pointer",
      "Allocates 100 bytes",
      "Causes a segmentation fault",
      "Duplicates the array"
    ],
    "answer": "Frees the memory block pointed to by `ptr` (equivalent to `free(ptr)`) and returns NULL or an implementation-defined pointer",
    "explanation": "Reallocating to size 0 is historically treated as releasing the buffer. In C23, calling `realloc(ptr, 0)` is formally undefined behavior, making explicit `free(ptr)` the required standard."
  },
  {
    "id": 6,
    "question": "What happens when `realloc(NULL, size)` is called with a NULL pointer as the first argument?",
    "options": [
      "It behaves exactly like `malloc(size)`, allocating a brand new memory block of the requested size",
      "It throws a NullPointerException",
      "It crashes the program",
      "It returns NULL"
    ],
    "answer": "It behaves exactly like `malloc(size)`, allocating a brand new memory block of the requested size",
    "explanation": "Passing NULL to `realloc` is explicitly defined by the ISO C standard to be identical to calling `malloc(size)`."
  },
  {
    "id": 7,
    "question": "What is the amortized time complexity of popping an element from the end of a dynamic array (`pop_back()`)?",
    "options": [
      "O(1) constant time",
      "O(N)",
      "O(log N)",
      "O(N^2)"
    ],
    "answer": "O(1) constant time",
    "explanation": "Removing the last element requires simply decrementing the `size` counter (`size--`), executing in strictly O(1) constant time."
  },
  {
    "id": 8,
    "question": "When shrinking a dynamic array to reclaim memory, why should shrinking occur at `size <= capacity / 4` rather than `size < capacity / 2`?",
    "options": [
      "To prevent 'thrashing' (oscillating between repeated expensive reallocations and deallocations when elements are rapidly pushed and popped at the boundary)",
      "Because heap memory cannot be divided by 2",
      "To reduce CPU clock speed",
      "Because realloc only accepts multiples of 4"
    ],
    "answer": "To prevent 'thrashing' (oscillating between repeated expensive reallocations and deallocations when elements are rapidly pushed and popped at the boundary)",
    "explanation": "Hysteresis (delaying shrinking until 1/4 capacity) ensures that alternating push and pop operations at the boundary do not trigger continuous expensive realloc calls, preserving amortized O(1) performance."
  },
  {
    "id": 9,
    "question": "What is the difference between `calloc(n, size)` and `malloc(n * size)`?",
    "options": [
      "`calloc()` initializes all allocated bytes to zero and checks for integer multiplication overflow, while `malloc()` leaves memory uninitialized with garbage values",
      "`malloc()` is faster than calloc and zeros out RAM",
      "`calloc()` allocates memory on the stack",
      "There is no difference"
    ],
    "answer": "`calloc()` initializes all allocated bytes to zero and checks for integer multiplication overflow, while `malloc()` leaves memory uninitialized with garbage values",
    "explanation": "`calloc(num, size)` allocates contiguous memory and clears all bits to 0. `malloc()` returns raw uninitialized bytes."
  },
  {
    "id": 10,
    "question": "What is an integer overflow vulnerability when allocating dynamic array memory with `malloc(n * sizeof(int))`?",
    "options": [
      "If `n * sizeof(int)` exceeds the maximum value of `size_t` (e.g. `2^64 - 1`), the multiplication wraps around to a tiny number, allocating too few bytes and leading to heap buffer overflow",
      "The array becomes negative",
      "The CPU stops executing",
      "The compiler throws a division by zero error"
    ],
    "answer": "If `n * sizeof(int)` exceeds the maximum value of `size_t` (e.g. `2^64 - 1`), the multiplication wraps around to a tiny number, allocating too few bytes and leading to heap buffer overflow",
    "explanation": "If `n = 2^30` and `sizeof(int) = 4`, `n * 4` wraps to 0 in 32-bit arithmetic, causing `malloc(0)` to succeed while subsequent writes corrupt memory."
  },
  {
    "id": 11,
    "question": "Why does `realloc()` sometimes return a completely different pointer address than the original pointer passed to it?",
    "options": [
      "If there is insufficient contiguous free memory directly following the current block on the heap, the allocator finds a new larger free slot elsewhere, copies data, and frees the old block",
      "Because pointers change every clock cycle",
      "Because the OS randomizes memory on every write",
      "Because realloc deletes the stack"
    ],
    "answer": "If there is insufficient contiguous free memory directly following the current block on the heap, the allocator finds a new larger free slot elsewhere, copies data, and frees the old block",
    "explanation": "When adjacent heap memory is already occupied, `realloc` allocates a new block elsewhere, copies the old payload, and deallocates the old memory block."
  },
  {
    "id": 12,
    "question": "What happens to pointers or iterators that point to elements inside a dynamic array when the array expands its capacity via `realloc()`?",
    "options": [
      "They become invalid Dangling Pointers pointing to deallocated memory if `realloc()` moved the buffer to a new heap location (Iterator Invalidation)",
      "They automatically update to point to the new location",
      "They are converted to integer indices",
      "They become NULL"
    ],
    "answer": "They become invalid Dangling Pointers pointing to deallocated memory if `realloc()` moved the buffer to a new heap location (Iterator Invalidation)",
    "explanation": "Reallocation can relocate the entire buffer. Any raw pointer previously pointing to `&arr->data[i]` now points to freed memory, leading to use-after-free bugs."
  },
  {
    "id": 13,
    "question": "How do you implement a bounds-checked element access function for a dynamic array in C?",
    "options": [
      "`int vector_get(const Vector* v, size_t index) { if (index >= v->size) { fprintf(stderr, \"Index error\"); exit(EXIT_FAILURE); } return v->data[index]; }`",
      "`return v->data[index];` without any checks",
      "`try { return v->data[index]; } catch(...) {}`",
      "`return index;`"
    ],
    "answer": "`int vector_get(const Vector* v, size_t index) { if (index >= v->size) { fprintf(stderr, \"Index error\"); exit(EXIT_FAILURE); } return v->data[index]; }`",
    "explanation": "Explicit assertion or conditional validation against `v->size` prevents out-of-bounds memory reads and segmentation faults."
  },
  {
    "id": 14,
    "question": "What is the initial default capacity typically chosen when creating an empty dynamic array in C libraries?",
    "options": [
      "A small non-zero power of 2, such as 4, 8, or 16 (or 0 with lazy allocation on first push)",
      "1,000,000 always",
      "-1",
      "Exactly 1 bit"
    ],
    "answer": "A small non-zero power of 2, such as 4, 8, or 16 (or 0 with lazy allocation on first push)",
    "explanation": "Starting with a small capacity (like 4 or 8) minimizes initial memory overhead while avoiding immediate reallocations on the first few pushes."
  },
  {
    "id": 15,
    "question": "Why should a function destroying a dynamic array `vector_free(Vector* v)` accept a pointer to the vector struct?",
    "options": [
      "To free the internal dynamic buffer `free(v->data)`, reset `size` and `capacity` to 0, and optionally `free(v)` if the struct itself was dynamically allocated",
      "To print the array contents",
      "To sort the array before exit",
      "Because C requires all functions to take pointers"
    ],
    "answer": "To free the internal dynamic buffer `free(v->data)`, reset `size` and `capacity` to 0, and optionally `free(v)` if the struct itself was dynamically allocated",
    "explanation": "Proper teardown must free the heap-allocated payload array first (`free(v->data)`), neutralize pointers (`v->data = NULL`), and then free the wrapper struct."
  },
  {
    "id": 16,
    "question": "What is the difference between passing a `Vector` by value vs passing `Vector*` by pointer to an append function in C?",
    "options": [
      "Passing by value creates a local copy of the struct; any updates to `size`, `capacity`, or relocated `data` pointers are lost upon return, causing memory corruption and leaks",
      "Passing by value is faster and safer",
      "Passing by pointer causes compilation errors",
      "There is no difference"
    ],
    "answer": "Passing by value creates a local copy of the struct; any updates to `size`, `capacity`, or relocated `data` pointers are lost upon return, causing memory corruption and leaks",
    "explanation": "Mutating dynamic containers requires pointer-to-struct (`Vector*`) so changes to size, capacity, and buffer pointers persist in the caller's scope."
  },
  {
    "id": 17,
    "question": "What growth factor does the standard C++ `std::vector` use in Microsoft Visual C++ vs GNU GCC libstdc++?",
    "options": [
      "MSVC uses 1.5x growth factor; GCC libstdc++ uses 2.0x growth factor",
      "Both use 10x",
      "Both use arithmetic +10",
      "MSVC uses 0.5x and GCC uses 1.0x"
    ],
    "answer": "MSVC uses 1.5x growth factor; GCC libstdc++ uses 2.0x growth factor",
    "explanation": "A 1.5x growth factor allows previously deallocated memory chunks to be reused in subsequent reallocations, reducing heap fragmentation compared to 2.0x."
  },
  {
    "id": 18,
    "question": "How do you implement `vector_insert_at(Vector* v, size_t index, int val)` in C?",
    "options": [
      "Ensure capacity, shift all elements from `v->size - 1` down to `index` right by one slot using `memmove`, place `val` at `data[index]`, and increment `size`",
      "Overwrite `data[index] = val` without shifting",
      "Append to end and sort the array",
      "Insert into a linked list"
    ],
    "answer": "Ensure capacity, shift all elements from `v->size - 1` down to `index` right by one slot using `memmove`, place `val` at `data[index]`, and increment `size`",
    "explanation": "Arbitrary index insertion requires checking capacity, shifting elements `[index..size-1]` to `[index+1..size]`, and storing the new value at `index` in O(N) time."
  },
  {
    "id": 19,
    "question": "What is the time complexity of searching for an unsorted element in a dynamic array of N elements?",
    "options": [
      "O(N) linear search time",
      "O(1)",
      "O(log N)",
      "O(N^2)"
    ],
    "answer": "O(N) linear search time",
    "explanation": "Without sorting or a secondary index (like a hash map), finding an element requires examining up to N elements sequentially."
  },
  {
    "id": 20,
    "question": "What is the purpose of a `reserve(Vector* v, size_t new_capacity)` function?",
    "options": [
      "Pre-allocates memory for `new_capacity` elements in advance, eliminating repeated reallocations when the exact number of elements is known beforehand",
      "Shrinks the vector to 0",
      "Sorts the vector",
      "Encrypts the vector"
    ],
    "answer": "Pre-allocates memory for `new_capacity` elements in advance, eliminating repeated reallocations when the exact number of elements is known beforehand",
    "explanation": "Pre-reserving capacity turns N individual push operations into pure O(1) writes with zero intermediate reallocations."
  },
  {
    "id": 21,
    "question": "What is `shrink_to_fit(Vector* v)` in dynamic array implementations?",
    "options": [
      "Reallocates the buffer to exact size `capacity = size`, releasing all unused excess memory back to the heap allocator",
      "Deletes all elements",
      "Doubles the capacity",
      "Clears the screen"
    ],
    "answer": "Reallocates the buffer to exact size `capacity = size`, releasing all unused excess memory back to the heap allocator",
    "explanation": "`shrink_to_fit` reduces `capacity` to match current `size` via `realloc(v->data, v->size * sizeof(int))`."
  },
  {
    "id": 22,
    "question": "What happens if you attempt to access `v->data[0]` when `v->size == 0` (empty vector)?",
    "options": [
      "Reading index 0 is undefined behavior (or reads garbage/causes a crash if `data` is NULL)",
      "Returns 0 safely",
      "Throws an exception",
      "Resizes the vector"
    ],
    "answer": "Reading index 0 is undefined behavior (or reads garbage/causes a crash if `data` is NULL)",
    "explanation": "If size is 0, no elements exist. If data is NULL or uninitialized, dereferencing causes a segmentation fault."
  },
  {
    "id": 23,
    "question": "What is the advantage of using `size_t` for `size` and `capacity` instead of `int` in 64-bit C programs?",
    "options": [
      "`size_t` is an unsigned 64-bit integer on 64-bit systems, allowing arrays to hold more than 2 billion (2^31 - 1) elements without signed integer overflow",
      "`size_t` uses less memory than int",
      "`size_t` can hold negative numbers",
      "`size_t` compiles faster"
    ],
    "answer": "`size_t` is an unsigned 64-bit integer on 64-bit systems, allowing arrays to hold more than 2 billion (2^31 - 1) elements without signed integer overflow",
    "explanation": "Standard `int` is limited to 2,147,483,647. On 64-bit systems, `size_t` supports up to 18.4 quintillion bytes."
  },
  {
    "id": 24,
    "question": "Why should `free(v->data)` be executed before `free(v)` when destroying a dynamically allocated vector struct `Vector* v = malloc(sizeof(Vector))`?",
    "options": [
      "Freeing `v` first invalidates the pointer `v`, making `v->data` unreachable and creating an unrecoverable memory leak for the internal buffer",
      "Freeing `v` first is required by the compiler",
      "Freeing `v->data` destroys the CPU cache",
      "It does not matter in what order they are freed"
    ],
    "answer": "Freeing `v` first invalidates the pointer `v`, making `v->data` unreachable and creating an unrecoverable memory leak for the internal buffer",
    "explanation": "Always tear down child dynamic allocations before freeing the parent container struct to prevent orphaned memory leaks."
  },
  {
    "id": 25,
    "question": "What is the space overhead of a dynamic array of N integers with capacity 2N in C on a 64-bit OS?",
    "options": [
      "`(2N * sizeof(int)) + sizeof(Vector)` bytes, where unused capacity is at most 50% of the allocated heap block",
      "100% waste",
      "0 bytes overhead",
      "1 gigabyte"
    ],
    "answer": "`(2N * sizeof(int)) + sizeof(Vector)` bytes, where unused capacity is at most 50% of the allocated heap block",
    "explanation": "Geometric doubling keeps unused memory bounded by at most a constant factor (50% for 2x doubling), guaranteeing O(N) total space complexity."
  }
];

export default questions;
