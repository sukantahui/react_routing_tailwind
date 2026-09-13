// topic2_questions.js - 25 FAQs for realloc()

const questions = [
  {
    question: "What is the function prototype of realloc() in <stdlib.h>?",
    answer: "The prototype is: 'void *realloc(void *ptr, size_t new_size);'. It attempts to resize the existing heap memory block pointed to by 'ptr' to 'new_size' bytes, returning a pointer to the new memory block or NULL on failure."
  },
  {
    question: "Why is writing 'ptr = realloc(ptr, new_size);' considered a dangerous bug?",
    answer: "If realloc() fails to allocate memory, it returns NULL without freeing the original block pointed to by 'ptr'. Overwriting 'ptr' directly with NULL loses the only reference to the original block, causing an irrecoverable memory leak."
  },
  {
    question: "What is the safe temporary pointer pattern for calling realloc()?",
    answer: "Always assign the result to a temporary pointer first: 'void *temp = realloc(ptr, new_size); if (temp == NULL) { /* handle failure, original ptr is still valid */ } else { ptr = temp; }'"
  },
  {
    question: "What happens to the existing data in a buffer when it is resized with realloc()?",
    answer: "The existing data is preserved up to the minimum of the old and new sizes. If expanded, the newly added bytes contain uninitialized garbage values. If shrunk, data beyond the new size is discarded."
  },
  {
    question: "What are the two possible behaviors of realloc() during buffer expansion?",
    answer: "1) In-place expansion: If adjacent heap memory is free, the allocator simply extends the existing block without changing the address. 2) Relocation: If adjacent space is blocked, the allocator allocates a new block elsewhere, copies the old data over, frees the old block automatically, and returns the new address."
  },
  {
    question: "What happens if you pass NULL as the first argument to realloc (i.e., 'realloc(NULL, size)')?",
    answer: "'realloc(NULL, size)' behaves exactly identically to 'malloc(size)', allocating a fresh block on the heap."
  },
  {
    question: "What happens if you pass 0 as the second argument to realloc (i.e., 'realloc(ptr, 0)')?",
    answer: "In standard C99/C11, passing 0 size frees the memory block and returns either NULL or an implementation-defined non-dereferenceable pointer. (In C23, passing size 0 is undefined behavior to remove ambiguity; 'free()' should always be used instead)."
  },
  {
    question: "Does realloc() automatically free the old memory block when relocating?",
    answer: "Yes! When realloc() moves the memory block to a new address, it automatically deallocates the old memory block. You must NEVER manually call free() on the old address."
  },
  {
    question: "Can realloc() be used on memory allocated by calloc() or malloc() interchangeably?",
    answer: "Yes, realloc() works identically on memory allocated by malloc(), calloc(), or a previous realloc() call."
  },
  {
    question: "Can realloc() be called on a pointer to a static or stack variable?",
    answer: "No. Calling realloc() (or free()) on an address that was not dynamically allocated by the heap allocator causes undefined behavior and immediate process crash."
  },
  {
    question: "Are the newly expanded bytes in realloc() zero-initialized?",
    answer: "No. The newly added bytes contain uninitialized garbage values. The programmer must manually initialize them or use memset."
  },
  {
    question: "What happens if other pointers are referencing the old memory block before realloc() relocates it?",
    answer: "If realloc() relocates the block, all other pointers referencing the old address become invalid 'dangling pointers'. Dereferencing them is a Use-After-Free bug."
  },
  {
    question: "How does a dynamic array (vector) grow efficiently using realloc()?",
    answer: "Dynamic arrays typically double their capacity (growth factor of 1.5x or 2x) instead of growing by 1 element each time, achieving O(1) amortized insertion time complexity."
  },
  {
    question: "What is geometric memory resizing in systems programming?",
    answer: "Geometric resizing multiplies the buffer capacity by a factor (e.g., 'capacity = capacity * 2') whenever full, minimizing expensive reallocation and memory copy overhead."
  },
  {
    question: "How does local classroom debugging at Coder & AccoTax illustrate in-place vs relocated realloc?",
    answer: "In Sukanta Hui's class, students print the pointer address before and after realloc(). For small resizes, the address often stays identical (in-place), while for large resizes, a new address is printed (relocation)."
  },
  {
    question: "Can realloc() shrink a buffer in-place?",
    answer: "Yes, shrinking a buffer typically occurs in-place by updating the block metadata and returning the excess tail memory back to the heap free list."
  },
  {
    question: "What is the time complexity of realloc() in the worst case?",
    answer: "The worst-case time complexity is O(N) when the allocator must allocate a new buffer and copy N bytes of old data to the new location."
  },
  {
    question: "What is the best-case time complexity of realloc()?",
    answer: "The best case is O(1) when the memory block can be expanded or shrunk in-place without moving data."
  },
  {
    question: "Should you check if realloc() returned the same pointer address?",
    answer: "No, your program logic should simply use the returned pointer without caring whether it was expanded in-place or relocated."
  },
  {
    question: "Can realloc() fail when shrinking memory?",
    answer: "Standard compliant C libraries almost never fail when shrinking, but checking for NULL with a temporary pointer remains a universal defensive best practice."
  },
  {
    question: "What happens if you pass an uninitialized pointer to realloc()?",
    answer: "Passing an uninitialized (wild) pointer to realloc() results in immediate heap corruption or a segmentation fault."
  },
  {
    question: "What happens if you call realloc() on a pointer that has already been freed?",
    answer: "Calling realloc() on an already-freed pointer is a critical Use-After-Free / Double-Free vulnerability that corrupts the heap."
  },
  {
    question: "How do you free a dynamically resized buffer at the end of the program?",
    answer: "Simply call 'free(ptr); ptr = NULL;' on the final pointer returned by the last successful realloc() call."
  },
  {
    question: "Why is realloc() essential for building interactive command-line tools in C?",
    answer: "It allows dynamic buffers to grow smoothly as users type arbitrarily long inputs or stream unpredictable file sizes without setting hardcoded artificial limits."
  },
  {
    question: "What is the golden rule when resizing memory with realloc()?",
    answer: "Always use a temporary pointer: 'temp = realloc(ptr, size); if (temp) ptr = temp;' — never overwrite your only pointer with the return value directly!"
  }
];

export default questions;
