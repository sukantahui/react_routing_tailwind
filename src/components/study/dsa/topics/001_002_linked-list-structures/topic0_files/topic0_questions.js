const questions = [
  {
    id: 1,
    question: "Why does `struct Node { int data; struct Node next; };` fail to compile in C?",
    options: [
      "It creates an infinite recursive definition, so the compiler cannot calculate `sizeof(struct Node)` ('field has incomplete type')",
      "C structs are not allowed to contain integers and structs together",
      "The keyword `struct` cannot appear inside curly braces",
      "Heap allocation is required before declaring any struct"
    ],
    answer: "It creates an infinite recursive definition, so the compiler cannot calculate `sizeof(struct Node)` ('field has incomplete type')",
    explanation: "If a Node directly contains another full Node, that inner Node would contain another Node forever. Using a pointer `struct Node *next;` fixes the size to 8 bytes (on 64-bit) or 4 bytes (on 32-bit)."
  },
  {
    id: 2,
    question: "How does `struct Node *next;` solve the incomplete type error in a self-referential struct?",
    options: [
      "A pointer has a fixed, known size (8 bytes on 64-bit, 4 bytes on 32-bit) regardless of the struct's total size",
      "A pointer skips memory allocation completely",
      "The compiler automatically converts pointers into arrays",
      "It forces `next` to live on the stack instead of the heap"
    ],
    answer: "A pointer has a fixed, known size (8 bytes on 64-bit, 4 bytes on 32-bit) regardless of the struct's total size",
    explanation: "Every address pointer takes a fixed number of bytes on a given CPU architecture, so the compiler knows the exact size of `struct Node` immediately."
  },
  {
    id: 3,
    question: "On a standard 64-bit x86-64 GCC system, why is `sizeof(struct Node)` typically 16 bytes for `{ int data; struct Node *next; }` instead of 12 bytes?",
    options: [
      "The compiler inserts 4 bytes of alignment padding after `int data` so the 8-byte `*next` pointer starts at an 8-byte aligned offset (+0x08)",
      "Every C struct always adds 4 extra bytes for a hidden string terminator",
      "An `int` takes 8 bytes on all 64-bit compilers",
      "malloc() adds 4 bytes inside the struct definition at compile time"
    ],
    answer: "The compiler inserts 4 bytes of alignment padding after `int data` so the 8-byte `*next` pointer starts at an 8-byte aligned offset (+0x08)",
    explanation: "64-bit CPUs read 8-byte words most efficiently when the address is a multiple of 8. Placing 4 bytes of padding after `int data` (4B) aligns `*next` (8B) at offset 8."
  },
  {
    id: 4,
    question: "How is memory allocated for individual nodes in a Linked List compared to a standard C array?",
    options: [
      "Non-contiguous heap blocks scattered in RAM, connected logically via `next` address pointers",
      "Strictly contiguous stack memory blocks placed side-by-side",
      "Fixed-size compile-time registers inside the CPU",
      "Read-only text segment storage"
    ],
    answer: "Non-contiguous heap blocks scattered in RAM, connected logically via `next` address pointers",
    explanation: "Each call to `malloc(sizeof(Node))` returns whatever free chunk the heap allocator chooses; nodes need not be adjacent in physical or virtual RAM."
  },
  {
    id: 5,
    question: "What happens if a function creates `Node temp;` as a local variable and returns `&temp;`?",
    options: [
      "Undefined behavior / Dangling Pointer: `temp` is destroyed when the function's stack frame pops",
      "The variable automatically moves to the heap",
      "The node stays valid until `main()` finishes",
      "It compiles into a faster version of `malloc()`"
    ],
    answer: "Undefined behavior / Dangling Pointer: `temp` is destroyed when the function's stack frame pops",
    explanation: "Local variables live on the Call Stack and become invalid the moment the function returns. Linked list nodes must be allocated on the Heap using `malloc()`."
  },
  {
    id: 6,
    question: "Why is `Node *ptr = malloc(sizeof(*ptr));` preferred over `malloc(sizeof(ptr));`?",
    options: [
      "`sizeof(ptr)` only allocates 8 bytes (size of a pointer), causing a heap buffer overflow; `sizeof(*ptr)` allocates the full struct size (16 bytes)",
      "`sizeof(ptr)` fails to compile in C99",
      "`sizeof(*ptr)` automatically zeroes out all fields like `calloc()`",
      "They always evaluate to the exact same number of bytes"
    ],
    answer: "`sizeof(ptr)` only allocates 8 bytes (size of a pointer), causing a heap buffer overflow; `sizeof(*ptr)` allocates the full struct size (16 bytes)",
    explanation: "`sizeof(ptr)` is the size of the pointer variable itself (8 bytes on 64-bit), whereas `sizeof(*ptr)` is the size of the target `Node` struct (16 bytes)."
  },
  {
    id: 7,
    question: "What does `malloc()` return if the operating system runs out of heap memory?",
    options: [
      "`NULL` (address `0x0`)",
      "The address of the `head` node",
      "A negative integer `-1`",
      "An empty struct filled with zeroes"
    ],
    answer: "`NULL` (address `0x0`)",
    explanation: "On allocation failure, `malloc()` returns `NULL`. Always check `if (newNode == NULL)` before writing to `newNode->data`."
  },
  {
    id: 8,
    question: "What happens on Linux/Windows/macOS if your C program dereferences a `NULL` pointer (e.g., `curr->data` when `curr == NULL`)?",
    options: [
      "The OS Memory Management Unit (MMU) catches access to unmapped Virtual Page 0 and terminates the process with a Segmentation Fault (`SIGSEGV`)",
      "`curr->data` safely evaluates to `0`",
      "`malloc()` automatically allocates a fallback node",
      "The loop silently breaks without error"
    ],
    answer: "The OS Memory Management Unit (MMU) catches access to unmapped Virtual Page 0 and terminates the process with a Segmentation Fault (`SIGSEGV`)",
    explanation: "Page 0 (starting at `0x0`) is intentionally left unmapped by the OS kernel so invalid pointer dereferences fail loudly instead of corrupting memory."
  },
  {
    id: 9,
    question: "In C, what is `ptr->data` exact syntactic sugar for?",
    options: [
      "`(*ptr).data`",
      "`*(ptr.data)`",
      "`&ptr.data`",
      "`ptr[data]`"
    ],
    answer: "`(*ptr).data`",
    explanation: "The arrow operator `->` first dereferences the pointer `ptr` (`*ptr`) and then accesses the struct member `.data`."
  },
  {
    id: 10,
    question: "Why must a new node's `next` pointer be initialized to `NULL` inside `createNode()`?",
    options: [
      "`malloc()` leaves garbage bytes in allocated memory; uninitialized `next` could point to random memory and crash traversal",
      "C syntax requires every pointer to be set to `NULL` before `return`",
      "Setting `next = NULL` shrinks the node from 16 bytes to 8 bytes",
      "`free()` only works on nodes whose `next` is `NULL`"
    ],
    answer: "`malloc()` leaves garbage bytes in allocated memory; uninitialized `next` could point to random memory and crash traversal",
    explanation: "Unlike `calloc()`, `malloc()` does not zero memory. Leaving `next` uninitialized makes `while (curr != NULL)` walk into garbage addresses."
  },
  {
    id: 11,
    question: "Where does the `Node *head` variable itself typically live if declared inside `main()`?",
    options: [
      "On the Call Stack (an 8-byte local variable holding the address of the first Heap node)",
      "Inside the first Heap node at offset +0x00",
      "Inside the CPU's instruction cache",
      "In a separate file on disk"
    ],
    answer: "On the Call Stack (an 8-byte local variable holding the address of the first Heap node)",
    explanation: "`head` is a local pointer variable in `main()`'s stack frame, while the nodes it points to live in the dynamic Heap segment."
  },
  {
    id: 12,
    question: "Why does `typedef struct Node { int data; struct Node *next; } Node;` still write `struct Node *next;` instead of `Node *next;` inside the struct?",
    options: [
      "The typedef alias `Node` is not yet defined until the closing brace `;` of the declaration",
      "`Node *next` is only valid in C++, never after `typedef`",
      "Using `struct Node *` doubles the pointer speed",
      "`typedef` aliases cannot be used for pointers"
    ],
    answer: "The typedef alias `Node` is not yet defined until the closing brace `;` of the declaration",
    explanation: "Inside the struct body, the compiler has seen the tag `struct Node`, but has not reached the `Node;` alias at the end yet."
  },
  {
    id: 13,
    question: "What is the bug in: `while (curr != NULL) { free(curr); curr = curr->next; }`?",
    options: [
      "Use-After-Free: reading `curr->next` after `curr` has already been freed",
      "Infinite loop because `free(curr)` resets `curr` to `head`",
      "Compile error because `free()` cannot take a struct pointer",
      "Double free of the `head` node"
    ],
    answer: "Use-After-Free: reading `curr->next` after `curr` has already been freed",
    explanation: "Once `free(curr)` runs, that heap block may be overwritten or unmapped. You must save `Node *temp = curr->next;` before calling `free(curr)`."
  },
  {
    id: 14,
    question: "What does `head == NULL` represent in a linked list?",
    options: [
      "An empty list with 0 nodes",
      "A list containing 1 node with value 0",
      "A circular list with a loop",
      "A corrupted stack frame"
    ],
    answer: "An empty list with 0 nodes",
    explanation: "When `head` is `NULL`, there is no first node in the chain, so the list is empty."
  },
  {
    id: 15,
    question: "Why do `insertHead(&head, 10)` and `freeList(&head)` take `Node **headRef` (a pointer to a pointer)?",
    options: [
      "C passes arguments by value, so modifying the caller's `head` pointer requires passing `&head` (`Node **`) or returning the new `head`",
      "A single pointer `Node *` cannot store heap addresses",
      "Double pointers bypass `malloc()` NULL checks",
      "Double pointers reduce struct padding to 0 bytes"
    ],
    answer: "C passes arguments by value, so modifying the caller's `head` pointer requires passing `&head` (`Node **`) or returning the new `head`",
    explanation: "Passing `Node *head` only passes a copy of the address. Passing `&head` (`Node **headRef`) lets the function update `main()`'s `head` directly (e.g., `*headRef = NULL;` after freeing)."
  },
  {
    id: 16,
    question: "In the standard traversal `Node *curr = head; while (curr != NULL) { curr = curr->next; }`, why do we use `curr` instead of moving `head` itself?",
    options: [
      "Moving `head` directly to `NULL` loses the starting reference to the entire linked list, causing a memory leak",
      "`head` is declared `const` by the C compiler",
      "`head->next` is read-only",
      "Using `curr` makes the loop run in O(1) time"
    ],
    answer: "Moving `head` directly to `NULL` loses the starting reference to the entire linked list, causing a memory leak",
    explanation: "If you overwrite `head = head->next` inside `main()` until `head == NULL`, you can never reach or `free()` the earlier nodes again."
  },
  {
    id: 17,
    question: "What is the time complexity to access the 500th element (`index 499`) of a Singly Linked List vs a C array?",
    options: [
      "Linked List: O(N) sequential walk; Array: O(1) direct address calculation",
      "Linked List: O(1); Array: O(N)",
      "Both are O(1)",
      "Both are O(log N)"
    ],
    answer: "Linked List: O(N) sequential walk; Array: O(1) direct address calculation",
    explanation: "Arrays compute `base + i * sizeof(T)` in one step (`O(1)`), while a linked list must follow 499 `next` pointers one by one (`O(N)`)."
  },
  {
    id: 18,
    question: "How much total memory (including pointer overhead, excluding allocator headers) does a 1,000-node `struct Node { int data; struct Node *next; }` take on a 64-bit system compared to `int arr[1000]`?",
    options: [
      "16,000 bytes for the Linked List vs 4,000 bytes for the int array (4x more memory per element)",
      "4,000 bytes for both",
      "8,000 bytes for the Linked List vs 16,000 bytes for the array",
      "12,000 bytes for the Linked List vs 8,000 bytes for the array"
    ],
    answer: "16,000 bytes for the Linked List vs 4,000 bytes for the int array (4x more memory per element)",
    explanation: "Each node takes 16 bytes (4B data + 4B padding + 8B pointer) on 64-bit, totaling 16,000B vs 4,000B for a plain `int` array."
  },
  {
    id: 19,
    question: "What does `free(ptr); ptr = NULL;` prevent after deallocating a single node?",
    options: [
      "Dangling pointer dereferences and accidental Double-Free bugs (since `free(NULL)` is safely a no-op in C)",
      "Compile-time incomplete type errors",
      "Struct padding holes",
      "Integer overflow in `data`"
    ],
    answer: "Dangling pointer dereferences and accidental Double-Free bugs (since `free(NULL)` is safely a no-op in C)",
    explanation: "Calling `free(ptr)` leaves the old address inside `ptr` (a dangling pointer). Setting `ptr = NULL` neutralizes it, and `free(NULL)` is guaranteed safe by the C standard."
  },
  {
    id: 20,
    question: "On glibc (Linux), why does `free(nodePtr)` work without you passing the byte size to `free()`?",
    options: [
      "The allocator stores a hidden chunk header right before `nodePtr` containing the block size and metadata",
      "The CPU scans until it sees a `0x00` byte",
      "`free()` always frees exactly 16 bytes",
      "The compiler hardcodes the size into every call to `free()`"
    ],
    answer: "The allocator stores a hidden chunk header right before `nodePtr` containing the block size and metadata",
    explanation: "Memory allocators prepend metadata (such as the chunk size) immediately before the user pointer returned by `malloc()`, so `free()` knows the chunk size."
  },
  {
    id: 21,
    question: "Why are Linked Lists generally slower to scan linearly than contiguous Arrays of the same length in modern CPUs?",
    options: [
      "Pointer chasing jumps to non-contiguous heap addresses, causing frequent CPU L1/L2 cache misses",
      "The `->` operator takes 100 CPU instructions per node",
      "`while` loops are slower than `for` loops in C",
      "Heap RAM runs at half the voltage of Stack RAM"
    ],
    answer: "Pointer chasing jumps to non-contiguous heap addresses, causing frequent CPU L1/L2 cache misses",
    explanation: "Arrays enjoy spatial locality (the CPU prefetcher loads 64-byte cache lines ahead of time), whereas linked list nodes scattered on the heap cause cache misses."
  },
  {
    id: 22,
    question: "If a struct contains `{ char tag; struct Node *next; int id; }` on 64-bit GCC, how can you reduce padding waste without `#pragma pack`?",
    options: [
      "Reorder fields from largest alignment to smallest: `{ struct Node *next; int id; char tag; }`",
      "Put `char tag;` in the middle between `int` and pointer",
      "Cast `char` to `double`",
      "Declare the struct inside `main()`"
    ],
    answer: "Reorder fields from largest alignment to smallest: `{ struct Node *next; int id; char tag; }`",
    explanation: "`*next` (8B) + `int id` (4B) + `char tag` (1B) + 3B tail padding = 16 bytes total, instead of 24 bytes when `char` and `int` bracket `*next`."
  },
  {
    id: 23,
    question: "What is the role of the `while (curr->next != NULL)` loop condition vs `while (curr != NULL)`?",
    options: [
      "`curr->next != NULL` stops AT the last node (needed for tail append), while `curr != NULL` visits every node and stops AFTER the last node",
      "They execute the exact same number of iterations",
      "`curr->next != NULL` works safely even when `curr` itself is `NULL`",
      "`curr != NULL` skips the first node"
    ],
    answer: "`curr->next != NULL` stops AT the last node (needed for tail append), while `curr != NULL` visits every node and stops AFTER the last node",
    explanation: "Remember: you must guard `if (head == NULL)` before checking `curr->next != NULL`, otherwise `curr->next` dereferences `NULL`!"
  },
  {
    id: 24,
    question: "Which tool helps detect memory leaks and Use-After-Free errors in C linked list programs at runtime?",
    options: [
      "Valgrind (`valgrind --leak-check=full`) or AddressSanitizer (`gcc -fsanitize=address`)",
      "CSS Flexbox Inspector",
      "The `-O0` optimization flag alone",
      "`printf(\"%d\", sizeof(int))`"
    ],
    answer: "Valgrind (`valgrind --leak-check=full`) or AddressSanitizer (`gcc -fsanitize=address`)",
    explanation: "ASan and Valgrind instrument heap allocations/frees to catch forgotten `free()` calls, out-of-bounds writes, and dangling pointer reads immediately."
  },
  {
    id: 25,
    question: "Which statement best summarizes when to choose a Linked List over a static Array?",
    options: [
      "When frequent insertions/deletions at the front or known positions occur and total size is unpredictable at compile time",
      "When you need instant `O(1)` random access by index `arr[k]`",
      "When you want the smallest possible memory footprint per integer",
      "When you want maximum CPU cache prefetch performance for matrix math"
    ],
    answer: "When frequent insertions/deletions at the front or known positions occur and total size is unpredictable at compile time",
    explanation: "Linked lists shine for dynamic size growth and `O(1)` pointer relinking (head/tail/known-node updates), while arrays win at `O(1)` indexing and cache locality."
  }
];

export default questions;
