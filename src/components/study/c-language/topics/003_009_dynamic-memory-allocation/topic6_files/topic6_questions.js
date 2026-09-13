// topic6_questions.js - 25 FAQs for Dynamic Vector & Matrix Capstone Projects

const questions = [
  {
    question: "What is a Dynamic Vector in systems programming?",
    answer: "A dynamic vector is a resizable, contiguous array data structure that encapsulates a raw pointer, the current number of active elements ('size'), and the maximum allocated capacity ('capacity'), automatically expanding when full."
  },
  {
    question: "Why is tracking both 'size' and 'capacity' separately necessary in a vector?",
    answer: "'size' represents the actual count of valid user elements currently stored, while 'capacity' represents the total allocated slots on the heap. Separating them avoids calling expensive realloc() on every single push operation."
  },
  {
    question: "What is the amortized time complexity of vector_push_back with geometric doubling?",
    answer: "With geometric doubling (doubling capacity when full), appending N elements requires a total of O(N) operations, yielding an Amortized Constant Time complexity of O(1) per push_back."
  },
  {
    question: "What would happen to time complexity if capacity only grew by +1 element on each push?",
    answer: "Growing capacity by only +1 requires calling realloc() and potentially copying the entire array on EVERY single push, resulting in a disastrous O(N²) time complexity for N insertions."
  },
  {
    question: "What growth factor is typically used in industrial dynamic arrays?",
    answer: "Common growth factors are 2.0x (GCC libstdc++ std::vector) and 1.5x (MSVC and Facebook Folly vector, which facilitates better memory allocator page reuse)."
  },
  {
    question: "How does vector_destroy use double pointers ('IntVector **vec_ptr')?",
    answer: "By passing a double pointer, the destructor can free the internal data array ('free((*vec_ptr)->data)'), free the container struct ('free(*vec_ptr)'), and set '*vec_ptr = NULL' directly in the caller's scope to prevent dangling pointers."
  },
  {
    question: "How do you implement bounds checking in vector_get() and vector_set()?",
    answer: "Verify that 'index < vec->size'. If 'index >= vec->size', return false or handle an out-of-bounds error rather than allowing arbitrary illegal memory reads."
  },
  {
    question: "How can you make the dynamic vector generic in pure C (supporting any data type)?",
    answer: "Store data as raw 'void *data' or 'char *data', track 'element_size' in bytes inside the struct, and use 'memcpy' with byte offsets ('(char*)vec->data + (index * vec->element_size)') for insertions."
  },
  {
    question: "What is vector_shrink_to_fit()?",
    answer: "A utility function that calls 'realloc(vec->data, vec->size * sizeof(int))' to release unused excess capacity back to the heap manager once insertions are complete."
  },
  {
    question: "What is vector_reserve()?",
    answer: "A function that pre-allocates heap memory for a known number of future elements upfront, avoiding all reallocations during subsequent insertions."
  },
  {
    question: "How do you implement vector_insert at an arbitrary index?",
    answer: "Ensure capacity, shift all elements from index to size-1 one position to the right using 'memmove()', insert the new value at index, and increment size."
  },
  {
    question: "Why must 'memmove()' be used instead of 'memcpy()' when shifting elements in an array?",
    answer: "Because source and destination memory regions overlap during array element shifting. 'memmove()' is explicitly guaranteed to handle overlapping memory safely, whereas 'memcpy()' produces undefined behavior."
  },
  {
    question: "How do you implement vector_remove_at at an arbitrary index?",
    answer: "Shift all elements from index+1 to size-1 one position to the left using 'memmove()', decrement size, and optionally shrink capacity if size drops below 25% of capacity."
  },
  {
    question: "What is a Dynamic Matrix Struct in C?",
    answer: "A struct definition such as 'typedef struct { int rows; int cols; double *data; } Matrix;' that encapsulates dimensions and a single contiguous heap buffer."
  },
  {
    question: "How do you allocate and initialize a Dynamic Matrix struct?",
    answer: "Allocate the struct, then allocate 'rows * cols * sizeof(double)' for data, check for NULL, and set fields."
  },
  {
    question: "How do you implement matrix multiplication dynamically in C?",
    answer: "Verify that 'A->cols == B->rows', allocate result matrix C with dimensions 'A->rows x B->cols', and compute dot products using triple nested loops."
  },
  {
    question: "How does local classroom debugging at Coder & AccoTax demonstrate vector capacity expansion?",
    answer: "In Sukanta Hui's class, students print capacity after every push_back, watching capacity jump dynamically from 2 → 4 → 8 → 16 as elements fill up."
  },
  {
    question: "What happens if malloc fails inside vector_create?",
    answer: "vector_create returns NULL, and the calling application must handle the failure gracefully without dereferencing."
  },
  {
    question: "What is vector_clear()?",
    answer: "A function that sets 'vec->size = 0' without deallocating the heap buffer, allowing the allocated capacity to be reused for new elements with zero allocation overhead."
  },
  {
    question: "How do you sort a dynamic vector using standard library qsort()?",
    answer: "Pass 'vec->data', 'vec->size', 'sizeof(int)', and a custom integer comparator function to 'qsort()'."
  },
  {
    question: "What is the advantage of vector data contiguous layout over linked lists?",
    answer: "Vectors allow instant O(1) random access by index ('vec->data[i]') and provide superior CPU cache performance, whereas linked lists require O(N) traversal and incur pointer overhead."
  },
  {
    question: "What is the memory footprint of an empty IntVector struct on a 64-bit machine?",
    answer: "24 bytes: 8 bytes for data pointer, 8 bytes for size_t size, and 8 bytes for size_t capacity."
  },
  {
    question: "How can you prevent memory fragmentation when allocating many dynamic matrices?",
    answer: "Allocate all matrix cells and the struct header in a single contiguous malloc chunk (single-allocation pattern)."
  },
  {
    question: "Why is building custom dynamic data structures in C the best test of systems programming competence?",
    answer: "Because it demands flawless coordination of pointer arithmetic, dynamic memory management, boundary checking, lifecycle encapsulation, and error handling."
  },
  {
    question: "What is the golden rule when building dynamic data structures in C?",
    answer: "Always provide paired creation and destruction functions (e.g., 'vector_create' and 'vector_destroy') and ensure every internal heap allocation is completely released upon destruction!"
  }
];

export default questions;
