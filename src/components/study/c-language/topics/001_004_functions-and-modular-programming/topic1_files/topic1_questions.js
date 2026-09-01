const questions = [
  {
    question: "What is 'Call by Value' in C parameter passing?",
    shortAnswer: "The mechanism where a copy of the actual argument's value is passed to the function's formal parameter on the call stack, isolating the caller's variable from modifications.",
    explanation: "Any assignment made to the formal parameter inside the function modifies only the temporary local copy in the callee's stack frame.",
    hint: "Passes duplicate copy of data.",
    level: "basic"
  },
  {
    question: "Why does the classic `swap(a, b)` function fail when using Call by Value?",
    shortAnswer: "Because `swap` only swaps the values of the local copies `x` and `y` inside its own stack frame; when the function returns, its frame is destroyed, leaving the caller's `a` and `b` unchanged.",
    explanation: "To mutate caller variables, you must pass memory addresses (`&a, &b`).",
    hint: "Swaps temporary stack copies instead of original variables.",
    level: "basic",
    codeExample: "void swap(int x, int y) {\n    int temp = x;\n    x = y;\n    y = temp;\n} // Fails to swap caller variables!"
  },
  {
    question: "Does C support true native 'Call by Reference' like C++ or Java?",
    shortAnswer: "Strictly speaking, NO. In C, ALL parameters are passed strictly by value; C simulates Call by Reference by passing the pointer (memory address) by value!",
    explanation: "Passing an address `&x` passes the address value into a pointer variable `int *ptr`, which can then be dereferenced (`*ptr`) to modify the caller's memory.",
    hint: "C passes pointers by value to simulate call by reference.",
    level: "intermediate"
  },
  {
    question: "What is the Dereference Operator (`*`) and how is it used in parameter passing?",
    shortAnswer: "The unary `*` operator accesses and modifies the value residing at the target memory address stored inside a pointer parameter.",
    explanation: "In `void increment(int *p) { (*p)++; }`, `*p` directly modifies the variable at address `p`.",
    hint: "Accesses value at pointer address.",
    level: "basic"
  },
  {
    question: "What is the Address-of Operator (`&`) and when is it used during function invocation?",
    shortAnswer: "The unary `&` operator retrieves the physical RAM memory address of a variable, which is passed as an argument when calling a function that expects a pointer.",
    explanation: "`swap(&a, &b)` passes the addresses of `a` and `b` to `swap(int *ptrA, int *ptrB)`.",
    hint: "Retrieves memory address of variable.",
    level: "basic"
  },
  {
    question: "How do you return multiple values from a single C function?",
    shortAnswer: "By passing pointers to caller variables as 'Out-Parameters', allowing the function to write multiple computed results directly into the caller's memory.",
    explanation: "Example: `void getStats(int a, int b, int *sum, int *diff)`.",
    hint: "Pointer out-parameters.",
    level: "intermediate",
    codeExample: "void compute(int a, int b, int *sum, int *prod) {\n    *sum = a + b;\n    *prod = a * b;\n}"
  },
  {
    question: "How are Arrays passed into functions in C?",
    shortAnswer: "Arrays automatically 'decay' into pointers to their first element (`arr[0]`), so arrays are always passed by pointer address in C functions.",
    explanation: "`void printArr(int arr[], int size)` is syntactically identical to `void printArr(int *arr, int size)`.",
    hint: "Arrays decay to pointer to first element.",
    level: "intermediate"
  },
  {
    question: "Why must you pass the size of an array alongside the array parameter in C?",
    shortAnswer: "Because array decay strips away compile-time size information; inside the function, `sizeof(arr)` yields only the size of a pointer (4 or 8 bytes), NOT the array length.",
    explanation: "Always pass an explicit `int size` argument when passing arrays to functions.",
    hint: "sizeof on decayed array yields pointer size, not array length.",
    level: "intermediate"
  },
  {
    question: "How can you prevent a function from modifying an array or pointer passed to it?",
    shortAnswer: "Qualify the pointer parameter with `const`: `void display(const int *arr, int size);`",
    explanation: "The compiler will raise an error if any code inside the function attempts to modify `*arr`.",
    hint: "Use const pointer qualification.",
    level: "basic",
    codeExample: "void printData(const int *data, int n) {\n    // *data = 100; // Compiler Error: assignment of read-only location!\n}"
  },
  {
    question: "What is the difference between `const int *ptr` and `int * const ptr` in function parameters?",
    shortAnswer: "- `const int *ptr`: Pointer to constant data (the data cannot be changed through the pointer).\n- `int * const ptr`: Constant pointer to mutable data (the pointer address cannot point to another variable).",
    explanation: "`const int * const ptr` makes both the address and the pointed data read-only.",
    hint: "Read-only data vs fixed pointer address.",
    level: "advanced"
  },
  {
    question: "What are the performance trade-offs between Call by Value and Passing Pointers?",
    shortAnswer: "Passing small primitives (`int`, `char`, `float`) by value is fast and safe; passing large `struct` objects (e.g. 1,000 bytes) by value causes expensive memory copying, so passing `const StructType *` is much faster.",
    explanation: "Pointers pass only 8 bytes of address on 64-bit systems regardless of data size.",
    hint: "Small types by value; large structs by const pointer.",
    level: "intermediate"
  },
  {
    question: "What happens if you pass a `NULL` pointer into a function expecting a valid address?",
    shortAnswer: "Attempting to dereference `*ptr` when `ptr == NULL` results in a Segmentation Fault (`SIGSEGV`) and immediate program crash.",
    explanation: "Always include defensive null checks: `if (ptr == NULL) return;`.",
    hint: "Dereferencing NULL triggers segmentation fault crash.",
    level: "basic"
  },
  {
    question: "What is Defensive Parameter Validation (Null Guard) in C functions?",
    shortAnswer: "Checking pointers for `NULL` and boundary values (e.g. `size <= 0`) at the very top of a function before executing any logic.",
    explanation: "Prevents crashes and undefined behavior.",
    hint: "Checking ptr == NULL at start of function.",
    level: "basic",
    codeExample: "void processBuffer(int *buf, int len) {\n    if (buf == NULL || len <= 0) return; // Guard clause\n    // Safe to process buf\n}"
  },
  {
    question: "Can you modify a caller's pointer itself (make it point elsewhere) inside a function?",
    shortAnswer: "Yes, by passing a Double Pointer (`int **pptr`), which passes the memory address of the pointer variable itself.",
    explanation: "Used extensively in memory allocation functions like `void allocateBuffer(int **buf, size_t size)`.",
    hint: "Pass double pointer to modify pointer address.",
    level: "advanced"
  },
  {
    question: "How does the Call Stack represent parameters during Call by Value vs Pointer Passing?",
    shortAnswer: "In Call by Value, the stack frame stores the complete binary value of the argument; in Pointer Passing, the stack frame stores an 8-byte hexadecimal RAM address pointing to the caller's stack frame.",
    explanation: "Dereferencing reads/writes across stack frame boundaries into the caller's memory.",
    hint: "Data bits vs memory address in stack frame.",
    level: "intermediate"
  },
  {
    question: "Why should you never return the address of a local automatic variable from a function?",
    shortAnswer: "Because local variables reside in the function's stack frame, which is destroyed upon `return`. Returning its address yields a Dangling Pointer pointing to invalid memory.",
    explanation: "Subsequent function calls will overwrite that memory with new stack frames.",
    hint: "Stack frame destruction creates dangling pointers.",
    level: "intermediate",
    codeExample: "int* badFunction(void) {\n    int temp = 42;\n    return &temp; // DANGEROUS BUG! Returns pointer to dead stack memory!\n}"
  },
  {
    question: "How can a function safely return dynamically allocated data to the caller?",
    shortAnswer: "Allocate the data on the Heap using `malloc()` / `calloc()`, which persists in memory until explicitly released with `free()`.",
    explanation: "Heap memory outlives function stack frames.",
    hint: "Heap memory allocated via malloc persists after return.",
    level: "intermediate"
  },
  {
    question: "What is an In-Parameter vs an Out-Parameter vs an In-Out Parameter?",
    shortAnswer: "- In-Parameter: Supplies read-only input data to the function (`const int *in`).\n- Out-Parameter: Receives output results from the function (`int *out`).\n- In-Out Parameter: Passes initial data that is modified in-place by the function (`int *inout`).",
    explanation: "Standard industrial API parameter classifications.",
    hint: "Input only, output destination, in-place modification.",
    level: "intermediate"
  },
  {
    question: "How do you pass a struct by value vs by reference in C?",
    shortAnswer: "- By Value: `void display(Student s)` (copies entire struct memory).\n- By Reference: `void display(const Student *s)` (passes 8-byte address; access fields with `s->name`).",
    explanation: "Arrow operator `->` combines dereference and member access `(*s).name`.",
    hint: "Dot notation on value; arrow operator -> on pointer.",
    level: "basic"
  },
  {
    question: "What happens if an actual argument is an expression like `square(x + 5)`?",
    shortAnswer: "The expression `x + 5` is evaluated first in the caller's context, and the resulting temporary value is passed into the function parameter.",
    explanation: "C uses Eager Evaluation (Applicative Order) for argument expressions.",
    hint: "Expression evaluated first, result passed by value.",
    level: "basic"
  },
  {
    question: "Is the order of evaluation of function arguments specified in C?",
    shortAnswer: "NO! The order of argument evaluation (e.g. `func(f1(), f2())` or `printf(\"%d %d\", i++, i++)`) is Unspecified Behavior in C.",
    explanation: "Never write expressions with side effects on the same variable across function argument lists.",
    hint: "Argument evaluation order is unspecified.",
    level: "advanced"
  },
  {
    question: "What is the Photocopy Sheet Analogy taught by Sukanta Hui for Call by Value?",
    shortAnswer: "Call by value is like handing a student a photocopy of your notes. If they scribble or erase on the photocopy, your original master document remains pristine and untouched!",
    explanation: "Passing pointers is like handing the student a laser pointer directed at the master document on the whiteboard.",
    hint: "Photocopy vs laser pointer directed at original master.",
    level: "basic"
  },
  {
    question: "How do you pass 2D arrays to functions in C?",
    shortAnswer: "Specify all column dimensions in the prototype: `void process(int rows, int cols, int arr[][COLS])` or in C99 use variable-length array parameters: `void process(int r, int c, int arr[r][c])`.",
    explanation: "Column dimensions are required by the compiler to compute row-major byte offsets.",
    hint: "Column dimension required for row-major offset math.",
    level: "intermediate"
  },
  {
    question: "What is Pass-by-Const-Pointer and why is it considered the best practice for read-only structures?",
    shortAnswer: "It passes a memory address (avoiding expensive copying of large structures) while guaranteeing that the function cannot accidentally mutate the caller's data.",
    explanation: "Combines the performance speed of pointers with the safety of call by value.",
    hint: "Speed of pointer with safety of read-only const.",
    level: "intermediate"
  },
  {
    question: "Why should every C programmer master pointer parameter passing before studying Data Structures?",
    shortAnswer: "Because linked lists, binary trees, dynamic graphs, and memory management algorithms rely completely on pointer parameter passing to manipulate node pointers and allocate heap buffers.",
    explanation: "Pointers and parameter mechanics are the foundation of all advanced computer science in C.",
    hint: "Essential foundation for linked lists, trees, and memory management.",
    level: "basic"
  }
];

export default questions;
