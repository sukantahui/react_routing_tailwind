const questions = [
  {
    question: "What is a Double Pointer (Pointer to Pointer) in C?",
    shortAnswer: "A pointer variable that stores the memory address of another pointer variable.",
    explanation: "Declared with two asterisks: `int **pp;`. It enables two levels of memory indirection.",
    hint: "Pointer storing another pointer's address.",
    level: "basic"
  },
  {
    question: "How many asterisks are required to dereference a double pointer to access the ultimate integer value?",
    shortAnswer: "Two asterisks (`**pp`).",
    explanation: "`*pp` dereferences to the single pointer (`int*`); `**pp` dereferences to the underlying `int`.",
    hint: "**pp retrieves the target value.",
    level: "basic"
  },
  {
    question: "Why is a double pointer required when a function needs to modify a caller's pointer variable (e.g. allocating heap memory)?",
    shortAnswer: "Because C is pass-by-value. To modify an integer, you pass `int*`; to modify a pointer `int*`, you must pass its address as `int**`.",
    explanation: "Without `int**`, the newly allocated `malloc()` address is assigned to a local parameter copy and lost (memory leak).",
    hint: "Must pass &ptr (type T**) to mutate ptr.",
    level: "intermediate",
    codeExample: "void allocate(int **p, int n) {\n    *p = malloc(n * sizeof(int));\n}"
  },
  {
    question: "What is the memory size of a double pointer `int **pp` on a 64-bit machine?",
    options: ["16 bytes", "8 bytes", "4 bytes", "32 bytes"],
    correctAnswer: 1,
    explanation: "All pointers in a 64-bit architecture occupy exactly 8 bytes (64 bits), regardless of indirection level.",
    level: "basic"
  },
  {
    question: "How do you create a dynamic 2D array of integers of dimension `R x C` on the heap using double pointers?",
    shortAnswer: "1. `int **matrix = malloc(R * sizeof(int*));`\n2. For each row: `matrix[i] = malloc(C * sizeof(int));`",
    explanation: "Allocates an array of row pointers, then allocates each row independently.",
    hint: "Two-stage heap allocation.",
    level: "intermediate",
    codeExample: "int **mat = malloc(R * sizeof(int*));\nfor (int i = 0; i < R; i++)\n    mat[i] = malloc(C * sizeof(int));"
  },
  {
    question: "How do you correctly free a dynamic 2D array allocated via double pointers?",
    shortAnswer: "Free each individual row first in a loop (`free(mat[i])`), then free the master pointer array (`free(mat)`).",
    explanation: "Freeing `mat` first causes a memory leak because the row pointers become unreachable.",
    hint: "Free inner rows first, then outer pointer array.",
    level: "intermediate"
  },
  {
    question: "What does `char **argv` represent in `int main(int argc, char **argv)`?",
    shortAnswer: "A double pointer to the array of string argument pointers passed from the command line.",
    explanation: "`char **argv` is completely identical in function signature to `char *argv[]`.",
    hint: "Array of string pointers.",
    level: "basic"
  },
  {
    question: "What is a Triple Pointer (`int ***ppp`)?",
    shortAnswer: "A pointer that stores the address of a double pointer variable (3 levels of indirection).",
    explanation: "Used in multi-dimensional data structures or functions modifying dynamic 2D matrices.",
    hint: "3 levels of indirection.",
    level: "advanced"
  },
  {
    question: "What is the difference between a contiguous 2D array `int grid[3][4]` and dynamic double pointer `int **grid`?",
    shortAnswer: "`grid[3][4]` is 48 contiguous bytes in RAM; `int **grid` consists of separate pointer allocations that may be scattered across heap memory.",
    explanation: "Row pointers point to disparate memory buffers; not guaranteed to be contiguous.",
    hint: "Single contiguous block vs scattered heap buffers.",
    level: "advanced"
  },
  {
    question: "Can double pointers be used to create Jagged (Ragged) Matrices where rows have different column lengths?",
    shortAnswer: "Yes, because each row pointer `mat[i]` can be allocated with a different byte size via `malloc()`.",
    explanation: "Row 0 can have 3 elements, Row 1 can have 10 elements, etc.",
    hint: "Variable-length row allocations.",
    level: "intermediate"
  },
  {
    question: "What is the output of `int x = 5; int *p = &x; int **pp = &p; printf(\"%d\", **pp + 1);`?",
    options: ["5", "6", "Address of x", "Garbage"],
    correctAnswer: 1,
    explanation: "`**pp` retrieves 5; adding 1 yields 6."
  },
  {
    question: "What does `*pp = NULL;` accomplish when `pp` points to pointer `p`?",
    shortAnswer: "It sets the pointer variable `p` to `NULL`.",
    explanation: "Dereferencing once modifies the single pointer `p` itself.",
    hint: "Zeros out the single pointer variable.",
    level: "basic"
  },
  {
    question: "How do you write a safe `safe_free` macro that frees memory and zeroes the caller's pointer?",
    shortAnswer: "`#define SAFE_FREE(p) do { free(*(p)); *(p) = NULL; } while(0)` (Passing `&ptr` as argument).",
    explanation: "Eliminates dangling pointers across an entire codebase.",
    hint: "Safe free macro taking &ptr.",
    level: "advanced"
  },
  {
    question: "How do you traverse command-line arguments using pointer-to-pointer incrementation?",
    shortAnswer: "`for (char **p = argv; *p != NULL; p++) { printf(\"%s\\n\", *p); }`",
    explanation: "Advances through the NULL-terminated array of string pointers.",
    hint: "p++ until *p == NULL.",
    level: "intermediate",
    codeExample: "for (char **p = argv; *p != NULL; p++) {\n    printf(\"%s\\n\", *p);\n}"
  },
  {
    question: "Why can't you write `void allocate(int *p) { p = malloc(100); }` to return memory to the caller?",
    shortAnswer: "Because `p` is a local copy; modifying `p` changes only the local variable, leaving the caller's pointer uninitialized (Wild).",
    explanation: "The allocated memory is leaked and inaccessible to the caller.",
    hint: "Modifies only local parameter copy.",
    level: "intermediate"
  },
  {
    question: "What is the type of `&p` if `p` is declared as `char *p`?",
    shortAnswer: "`char**` (pointer to pointer to char).",
    explanation: "Taking the address of a `char*` yields `char**`.",
    hint: "char**.",
    level: "basic"
  },
  {
    question: "What is the type of `*pp` if `pp` is declared as `double **pp`?",
    shortAnswer: "`double*` (pointer to double).",
    explanation: "Dereferencing `double**` once yields `double*`.",
    hint: "double*.",
    level: "basic"
  },
  {
    question: "What happens if `pp` is `NULL` and you execute `*pp = malloc(10);`?",
    shortAnswer: "Segmentation Fault / Crash due to null pointer dereference.",
    explanation: "Always check `if (pp != NULL)` before dereferencing.",
    hint: "NULL dereference crash.",
    level: "basic"
  },
  {
    question: "How do you implement a function that inserts a node at the head of a Linked List in C?",
    shortAnswer: "Pass a double pointer to the head: `void insertHead(Node **head, int val);`.",
    explanation: "Updating the head pointer of the caller requires `Node**`.",
    hint: "Double pointer to head Node**.",
    level: "intermediate",
    codeExample: "void insertHead(Node **head, int val) {\n    Node *newNode = malloc(sizeof(Node));\n    newNode->data = val;\n    newNode->next = *head;\n    *head = newNode;\n}"
  },
  {
    question: "Why is a single contiguous block `malloc(R * C * sizeof(int))` often preferred over `int **` for high-performance 2D matrices?",
    shortAnswer: "Better CPU cache spatial locality, fewer malloc/free overheads, and guaranteed contiguous memory.",
    explanation: "Single malloc ensures elements are adjacent in physical RAM.",
    hint: "Spatial cache locality.",
    level: "advanced"
  },
  {
    question: "What does `const char **p` mean?",
    shortAnswer: "A pointer to a pointer to constant characters (the characters cannot be modified).",
    explanation: "Commonly used in string array processing.",
    hint: "Pointee characters are const.",
    level: "intermediate"
  },
  {
    question: "What does `char * const *p` mean?",
    shortAnswer: "A pointer to a constant pointer to characters.",
    explanation: "The intermediate pointers cannot be reassigned.",
    hint: "Intermediate pointer is const.",
    level: "advanced"
  },
  {
    question: "Can you reassign `ppVal` to point to a different pointer `pVal2`?",
    shortAnswer: "Yes, `ppVal = &pVal2;` reassigns the double pointer address.",
    explanation: "Double pointers are mutable variables unless qualified with `const`.",
    hint: "Double pointer variable is mutable.",
    level: "basic"
  },
  {
    question: "What is the output of `int a = 10, b = 20; int *p = &a; int **pp = &p; *pp = &b; printf(\"%d\", *p);`?",
    options: ["10", "20", "Address of a", "Compiler error"],
    correctAnswer: 1,
    explanation: "`*pp = &b` reassigns pointer `p` to point to `b`. Dereferencing `*p` yields 20."
  },
  {
    question: "What is the primary architectural role of double pointers in C systems software?",
    shortAnswer: "Managing dynamic collections, modifying pointer references in data structures, and handling polymorphic argument lists.",
    explanation: "Essential for memory managers, operating systems kernels, and complex data structures.",
    hint: "Dynamic memory and reference mutation.",
    level: "intermediate"
  }
];

export default questions;
