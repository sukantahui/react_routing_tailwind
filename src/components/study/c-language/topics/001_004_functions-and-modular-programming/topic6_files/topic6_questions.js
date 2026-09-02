// src/components/study/c-language/topics/001_004_functions-and-modular-programming/topic6_files/topic6_questions.js

export const questions = [
  {
    "question": "What is a function prototype (declaration) in C?",
    "options": [
      "The actual executable code block of a function",
      "A statement informing the compiler about the function's name, return type, and parameter types before its usage",
      "A macro replacement directive",
      "A global variable allocation"
    ],
    "answerIndex": 1,
    "explanation": "A function prototype tells the compiler the function signature (return type, name, parameter types) so it can perform type checking before the function's actual definition."
  },
  {
    "question": "Where is a function prototype typically placed in a C program?",
    "options": [
      "Inside the return statement",
      "At the top of the C source file or inside a header file (.h) before main()",
      "At the end of the source file after all definitions",
      "Inside a while loop"
    ],
    "answerIndex": 1,
    "explanation": "Prototypes are placed before function invocations (usually at the top of .c files or in header files) to resolve forward references."
  },
  {
    "question": "What happens if a function is called before its prototype or definition in C99 standard?",
    "options": [
      "The compiler assumes implicit int return type and continues silently",
      "The compiler issues a warning/error (implicit function declaration is forbidden starting C99)",
      "The operating system crashes",
      "It automatically calls main()"
    ],
    "answerIndex": 1,
    "explanation": "Implicit function declaration was removed in C99. Calling an undeclared function causes a compilation error/warning."
  },
  {
    "question": "What is the difference between a function declaration and a function definition?",
    "options": [
      "A declaration specifies the function signature; a definition provides the actual implementation body in braces { }",
      "A declaration allocates memory; a definition does not",
      "A declaration is written in C; a definition is written in assembly",
      "There is no difference"
    ],
    "answerIndex": 0,
    "explanation": "Declaration introduces the function signature to the compiler. Definition contains the executable code body enclosed in '{ }'."
  },
  {
    "question": "Which of the following is a valid function prototype for a function named 'calculateSum' taking two integers and returning a float?",
    "options": [
      "float calculateSum(int a, int b);",
      "int calculateSum(float a, float b);",
      "void calculateSum(int, int);",
      "calculateSum(int, int) : float;"
    ],
    "answerIndex": 0,
    "explanation": "'float calculateSum(int a, int b);' correctly declares return type float, name calculateSum, and two int parameters."
  },
  {
    "question": "Is it mandatory to include parameter variable names in a function prototype (e.g. int add(int a, int b); vs int add(int, int);)?",
    "options": [
      "Yes, names are strictly required",
      "No, parameter variable names are optional in prototypes; only data types are required",
      "Names are required only for floats",
      "Names are required only in C23"
    ],
    "answerIndex": 1,
    "explanation": "In function prototypes, parameter names are optional. Only the parameter types (e.g. int add(int, int);) are required by the compiler."
  },
  {
    "question": "What does a parameter list of '(void)' in a function declaration mean (e.g. int getValue(void);)?",
    "options": [
      "The function takes an unspecified number of parameters",
      "The function strictly accepts ZERO arguments",
      "The function takes a void pointer",
      "The function returns void"
    ],
    "answerIndex": 1,
    "explanation": "In C, 'int getValue(void);' explicitly specifies that the function takes zero arguments. In legacy C, 'int getValue();' meant unstated arguments."
  },
  {
    "question": "What was the difference between 'int foo()' and 'int foo(void)' in C89/C99?",
    "options": [
      "'int foo()' declared a function taking any number of un-checked arguments; 'int foo(void)' declared a function taking strictly zero arguments",
      "They were identical",
      "'int foo()' was private",
      "'int foo(void)' was inline"
    ],
    "answerIndex": 0,
    "explanation": "In standard C (prior to C23), 'int foo()' meant the parameters were un-specified, while 'int foo(void)' strictly enforced zero arguments."
  },
  {
    "question": "Which keyword is used to declare that a function should be expanded in-line at the call site to eliminate function call overhead?",
    "options": [
      "static",
      "inline",
      "extern",
      "register"
    ],
    "answerIndex": 1,
    "explanation": "The 'inline' keyword (introduced in C99) suggests that the compiler integrate the function's code directly into calling code to save call overhead."
  },
  {
    "question": "What is modular programming in C?",
    "options": [
      "Writing all code inside main() in a single file",
      "Decomposing a large program into independent, reusable, and isolated functions/modules across header (.h) and source (.c) files",
      "Using hardware threads",
      "Eliminating loops"
    ],
    "answerIndex": 1,
    "explanation": "Modular programming decomposes complex systems into smaller, self-contained, testable functions and separate source modules."
  },
  {
    "question": "What is the role of header files (.h) in C modular development?",
    "options": [
      "To contain variable initializations",
      "To expose public function prototypes, macro definitions, struct definitions, and type aliases to other modules",
      "To store compiled binary machine code",
      "To execute main()"
    ],
    "answerIndex": 1,
    "explanation": "Header files declare the public interface (prototypes, types, macros) of a module so other source files can include them with #include."
  },
  {
    "question": "What happens if a function prototype's return type contradicts the actual function definition return type?",
    "options": [
      "Compiler error (conflicting types for function)",
      "The compiler silently converts the return type",
      "Runtime segfault",
      "The prototype is ignored"
    ],
    "answerIndex": 0,
    "explanation": "Mismatching return types or parameter lists between a function prototype and its definition triggers a compiler compilation error."
  },
  {
    "question": "Which of the following is a valid function definition in C?",
    "options": [
      "int square(int x) { return x * x; }",
      "int square(int x);",
      "square(x) -> x * x;",
      "def square(x): return x * x"
    ],
    "answerIndex": 0,
    "explanation": "'int square(int x) { return x * x; }' specifies return type int, parameter int x, and complete implementation body."
  },
  {
    "question": "What is the default return type of a function in K&R C if omitted in declaration?",
    "options": [
      "void",
      "int",
      "float",
      "char"
    ],
    "answerIndex": 1,
    "explanation": "In legacy K&R C, omitting a function return type defaulted to 'int'. Standard C (starting C99) requires explicit return types."
  },
  {
    "question": "Can a function in C return another function directly as a return value?",
    "options": [
      "Yes, directly",
      "No, C functions cannot return functions directly (however, a function can return a FUNCTION POINTER)",
      "Yes, using inline",
      "Only in C23"
    ],
    "answerIndex": 1,
    "explanation": "Functions in C cannot return function code directly, but they can return a pointer to a function."
  },
  {
    "question": "Can a function in C return a whole array directly by value (e.g. int[10] getArray())?",
    "options": [
      "Yes, directly",
      "No, C functions cannot return arrays by value (must return pointer or pass array buffer to fill)",
      "Yes, using struct",
      "Only float arrays"
    ],
    "answerIndex": 1,
    "explanation": "C syntax forbids returning raw array types directly. To return array data, pass a buffer pointer, use dynamic memory allocation (malloc), or wrap the array inside a struct."
  },
  {
    "question": "Can a function return a struct by value in C (e.g. struct Point getPoint())?",
    "options": [
      "Yes, C supports returning structs by value",
      "No, structs cannot be returned",
      "Only if struct has 1 member",
      "Only in C++"
    ],
    "answerIndex": 0,
    "explanation": "Unlike arrays, C fully supports passing and returning 'struct' types by value."
  },
  {
    "question": "What is a main() function signature compliant with ISO C standard?",
    "options": [
      "int main(void) or int main(int argc, char *argv[])",
      "void main()",
      "main()",
      "float main(void)"
    ],
    "answerIndex": 0,
    "explanation": "The ISO C standard strictly mandates that main() return 'int', taking either (void) or (int argc, char *argv[])."
  },
  {
    "question": "What does 'void main()' cause on strictly standards-compliant C compilers?",
    "options": [
      "Standard compliance",
      "Undefined behavior or compiler warning/error (non-standard entry signature)",
      "Faster execution",
      "Automatic return 0"
    ],
    "answerIndex": 1,
    "explanation": "'void main()' is non-standard and violates ISO C. Standard-compliant compilers issue a warning or error."
  },
  {
    "question": "What is the return value of main() conventionally used for by the operating system?",
    "options": [
      "Exit status code (0 indicates success; non-zero indicates error code to shell)",
      "The size of memory used",
      "The execution time",
      "Nothing"
    ],
    "answerIndex": 0,
    "explanation": "The return value of main() passes an exit status code to the OS (0 = success, non-zero = error code)."
  },
  {
    "question": "In C99 and later, what happens if execution reaches the end of main() without an explicit return statement?",
    "options": [
      "The compiler automatically inserts 'return 0;' at the closing brace of main()",
      "The program crashes with segfault",
      "It returns a random garbage integer",
      "It loops infinitely"
    ],
    "answerIndex": 0,
    "explanation": "Starting C99, if control reaches the end of main() without encountering a return statement, 'return 0;' is implicitly executed."
  },
  {
    "question": "What is a pure function in modular software design?",
    "options": [
      "A function whose return value depends solely on its input arguments, producing no side effects (no global mutations, no I/O)",
      "A function written without comments",
      "A main function",
      "A recursive function"
    ],
    "answerIndex": 0,
    "explanation": "A pure function relies exclusively on its parameters, produces consistent output for identical inputs, and causes no side effects."
  },
  {
    "question": "What is a side effect of a function call?",
    "options": [
      "Any modification of state outside the function's local scope (e.g. modifying global variables, modifying passed pointers, performing file I/O)",
      "The return value of the function",
      "A stack overflow error",
      "A compiler warning"
    ],
    "answerIndex": 0,
    "explanation": "A side effect occurs when a function mutates state external to its local environment (such as updating global memory or writing to stdout)."
  },
  {
    "question": "Which header file guard mechanism prevents duplicate declarations when a header file is included multiple times in modular projects?",
    "options": [
      "#ifndef HEADER_H \\n #define HEADER_H \\n ... \\n #endif",
      "#includeonce",
      "#import",
      "#pragma loop"
    ],
    "answerIndex": 0,
    "explanation": "Header guards using #ifndef, #define, and #endif prevent multiple inclusion redefinition errors."
  },
  {
    "question": "What modern preprocessor directive supported by almost all compilers acts as a single-line replacement for header guards?",
    "options": [
      "#pragma once",
      "#guard",
      "#define once",
      "#once"
    ],
    "answerIndex": 0,
    "explanation": "#pragma once is a widely supported preprocessor directive that ensures a header file is included only once during compilation."
  },
  {
    "question": "What is a forward declaration of a function?",
    "options": [
      "Declaring a function prototype before defining its full body later in the file",
      "A declaration inside a loop",
      "Calling a function before creating it",
      "A main function definition"
    ],
    "answerIndex": 0,
    "explanation": "A forward declaration (prototype) tells the compiler about a function before its actual implementation appears later in code."
  },
  {
    "question": "What is the scope of a function prototype parameter name?",
    "options": [
      "Limited strictly to the prototype declaration itself",
      "Global scope",
      "Function body scope",
      "File scope"
    ],
    "answerIndex": 0,
    "explanation": "Parameter names in prototypes exist only within the prototype line and go out of scope immediately at the trailing semicolon."
  },
  {
    "question": "What happens if you define two functions with the exact same name in the same global scope in C?",
    "options": [
      "The compiler throws a redefinition error",
      "The second function overrides the first",
      "Both run in parallel",
      "It creates an overloaded function"
    ],
    "answerIndex": 0,
    "explanation": "C does NOT support function overloading. Defining two functions with identical names in the same scope triggers a redefinition compilation error."
  },
  {
    "question": "Does C support function overloading (defining multiple functions with same name but different parameter types)?",
    "options": [
      "No, C does NOT support function overloading (unlike C++)",
      "Yes, fully supported in C99",
      "Yes, using inline",
      "Only for float types"
    ],
    "answerIndex": 0,
    "explanation": "Standard C does not support function overloading. Every function in a namespace must have a unique identifier name."
  },
  {
    "question": "Which C11 feature allows type-generic selection simulating function overloading at compile time?",
    "options": [
      "_Generic keyword",
      "typeof",
      "template",
      "overload"
    ],
    "answerIndex": 0,
    "explanation": "C11 introduced _Generic expressions to dispatch calls based on argument type at compile time."
  },
  {
    "question": "What is the default parameter passing mechanism in C?",
    "options": [
      "Call by Value",
      "Call by Reference",
      "Call by Name",
      "Call by Result"
    ],
    "answerIndex": 0,
    "explanation": "C strictly uses Call by Value for all function parameter passing by default."
  },
  {
    "question": "What happens when arguments are passed to a function using Call by Value?",
    "options": [
      "A copy of each argument's value is passed into the function's local stack frame parameters; changes to parameters inside the function do NOT affect original caller variables",
      "The function receives direct access to caller variables",
      "Caller variables are erased",
      "Variables are moved to heap"
    ],
    "answerIndex": 0,
    "explanation": "In Call by Value, independent copies are created on the called function's stack frame. Modifying local parameters leaves caller variables untouched."
  },
  {
    "question": "What is the output of: void swap(int a, int b) { int t = a; a = b; b = t; } int main() { int x = 10, y = 20; swap(x, y); printf(\"%d %d\", x, y); }?",
    "options": [
      "10 20 (x and y are unchanged because swap used Call by Value)",
      "20 10",
      "0 0",
      "Compiler error"
    ],
    "answerIndex": 0,
    "explanation": "Since swap(x, y) receives copies by value, swapping a and b inside swap() does not alter caller variables x and y. Output: '10 20'."
  },
  {
    "question": "How do you simulate Call by Reference in C to allow a function to modify caller variables?",
    "options": [
      "By passing memory addresses (pointers) of variables as arguments to the function",
      "By using the ref keyword",
      "By declaring variables global",
      "By returning two values"
    ],
    "answerIndex": 0,
    "explanation": "Simulating Call by Reference in C requires passing variable addresses (e.g. &x) to pointer parameters (e.g. int *p) and dereferencing them (*p)."
  },
  {
    "question": "What is the output of: void swap(int *a, int *b) { int t = *a; *a = *b; *b = t; } int main() { int x = 10, y = 20; swap(&x, &y); printf(\"%d %d\", x, y); }?",
    "options": [
      "20 10 (x and y are successfully swapped via pointers)",
      "10 20",
      "10 10",
      "Compiler error"
    ],
    "answerIndex": 0,
    "explanation": "Passing addresses &x and &y allows swap() to dereference pointers and mutate caller variables x and y directly in memory. Output: '20 10'."
  },
  {
    "question": "When an array is passed as an argument to a function (e.g. void process(int arr[])), what is actually passed?",
    "options": [
      "A copy of the entire array data",
      "A pointer to the first element of the array (&arr[0]) due to array decaying",
      "The total size of the array",
      "A struct"
    ],
    "answerIndex": 1,
    "explanation": "In C, when an array is passed to a function, it decays automatically into a pointer to its first element (&arr[0]). Array contents are NOT copied."
  },
  {
    "question": "Because arrays decay to pointers when passed to functions, are modifications to array elements inside a function reflected in the caller's array?",
    "options": [
      "Yes, because the function operates directly on the caller's memory via the decayed pointer",
      "No, arrays are copied by value",
      "Only if array is static",
      "Only for 1D arrays"
    ],
    "answerIndex": 0,
    "explanation": "Because array parameters receive memory address pointers, element mutations inside the function directly modify the caller's array."
  },
  {
    "question": "What happens when you pass a large 'struct' by value to a function (e.g. void display(struct BigData d))?",
    "options": [
      "The entire struct memory block is copied onto the function's call stack frame, causing performance/memory overhead for large structs",
      "Only a pointer is passed",
      "The struct is deleted",
      "Compiler error"
    ],
    "answerIndex": 0,
    "explanation": "Passing structs by value copies every byte of the struct onto the new stack frame. For large structs, passing a pointer (const struct BigData *d) is far more efficient."
  },
  {
    "question": "How can you pass a struct efficiently without copying memory while preventing the function from modifying it?",
    "options": [
      "Pass a pointer to const struct (e.g., void display(const struct Point *p))",
      "Pass by value",
      "Use void*",
      "Use static"
    ],
    "answerIndex": 0,
    "explanation": "Passing 'const StructType *p' avoids memory copy overhead while enforcing read-only protection via the 'const' qualifier."
  },
  {
    "question": "Given void update(int *p) { *p = 50; }, what happens if you call update(NULL);?",
    "options": [
      "The function sets NULL to 50",
      "Dereferencing NULL pointer (*p) causes Undefined Behavior (Segmentation Fault runtime crash)",
      "p becomes a valid address",
      "Compiler warning only"
    ],
    "answerIndex": 1,
    "explanation": "Dereferencing a NULL pointer inside a function causes Undefined Behavior, typically crashing the application with a Segmentation Fault."
  },
  {
    "question": "How should robust C functions defend against NULL pointer arguments passed to pointer parameters?",
    "options": [
      "Check if the pointer is NULL at the start of the function (e.g. if (p == NULL) return;)",
      "Use try-catch",
      "Ignore NULL",
      "Cast p to int"
    ],
    "answerIndex": 0,
    "explanation": "Defensive programming requires checking 'if (ptr == NULL)' before dereferencing pointers."
  },
  {
    "question": "What is the output of: void inc(int x) { x++; } int main() { int a = 5; inc(a); printf(\"%d\", a); }?",
    "options": [
      "5",
      "6",
      "0",
      "Compiler error"
    ],
    "answerIndex": 0,
    "explanation": "'a' is passed by value. 'inc' increments its local copy 'x'. 'a' remains 5."
  },
  {
    "question": "What is the output of: void inc(int *x) { (*x)++; } int main() { int a = 5; inc(&a); printf(\"%d\", a); }?",
    "options": [
      "6",
      "5",
      "0",
      "Compiler error"
    ],
    "answerIndex": 0,
    "explanation": "'&a' passes the address of 'a'. (*x)++ dereferences the pointer and increments 'a' directly to 6."
  },
  {
    "question": "What is the importance of parentheses in (*x)++ when incrementing a pointed-to value?",
    "options": [
      "Without parentheses, *x++ evaluates as *(x++), which increments the POINTER address instead of the value pointed to!",
      "Parentheses make it run faster",
      "No importance",
      "Parentheses convert float to int"
    ],
    "answerIndex": 0,
    "explanation": "Unary postfix ++ has higher precedence than indirection *. *x++ increments the pointer address 'x'. (*x)++ increments the value pointed to by 'x'."
  },
  {
    "question": "What is the output of: void setZero(int arr[], int n) { for(int i=0; i<n; i++) arr[i]=0; } int main() { int a[2]={5,5}; setZero(a, 2); printf(\"%d\", a[0]); }?",
    "options": [
      "0",
      "5",
      "Garbage",
      "Compiler error"
    ],
    "answerIndex": 0,
    "explanation": "Array 'a' decays to a pointer. setZero mutates a[0] to 0 directly in caller memory. Output is 0."
  },
  {
    "question": "What parameter signature is equivalent to 'void process(int arr[])' in C?",
    "options": [
      "void process(int *arr)",
      "void process(int &arr)",
      "void process(int arr[100])",
      "Both void process(int *arr) and void process(int arr[100])"
    ],
    "answerIndex": 3,
    "explanation": "In function parameter lists, 'int arr[]', 'int *arr', and 'int arr[100]' are completely identical pointer declarations to the compiler."
  },
  {
    "question": "Can a function calculate the number of elements of an array passed to it using sizeof(arr) / sizeof(arr[0]) inside the function?",
    "options": [
      "Yes, works correctly",
      "No! Inside the function, 'arr' has decayed to a pointer, so sizeof(arr) returns sizeof(int*), NOT the full array size!",
      "Only for char arrays",
      "Only in C23"
    ],
    "answerIndex": 1,
    "explanation": "Inside a function, array parameter 'arr' is a pointer. sizeof(arr) returns pointer size (4 or 8 bytes). You MUST pass array size as a separate parameter!"
  },
  {
    "question": "What is the output of: void foo(int a, int b) { a = 100; b = 200; } int main() { int x=1, y=2; foo(x, y); printf(\"%d %d\", x, y); }?",
    "options": [
      "1 2",
      "100 200",
      "0 0",
      "Compiler error"
    ],
    "answerIndex": 0,
    "explanation": "Call by value protects caller variables x and y from modification. Output is '1 2'."
  },
  {
    "question": "What happens when you pass a literal value (e.g. 5) to a function expecting a pointer parameter (e.g. void func(int *p))?",
    "options": [
      "Compiler warning/error (invalid conversion from int to int*)",
      "5 is converted to address 5",
      "func receives NULL",
      "It creates a variable"
    ],
    "answerIndex": 0,
    "explanation": "Passing an integer literal to a pointer parameter causes a type mismatch compilation error."
  },
  {
    "question": "What operator is used to pass the memory address of a variable to a pointer parameter?",
    "options": [
      "Address-of operator (&)",
      "Dereference operator (*)",
      "Indirection operator (->)",
      "Dot operator (.)"
    ],
    "answerIndex": 0,
    "explanation": "The address-of operator '&' extracts the memory location of a variable (e.g., &var)."
  },
  {
    "question": "What is the outcome of passing a pointer to a pointer (double pointer, e.g. int **pp) to a function?",
    "options": [
      "Allows the called function to modify the address stored in the caller's single pointer variable",
      "Passes a 2D array only",
      "Causes double memory allocation",
      "Returns two integers"
    ],
    "answerIndex": 0,
    "explanation": "Passing a double pointer allows a function to modify where the caller's pointer points (e.g. allocating memory via pointer reference)."
  },
  {
    "question": "What is the output of: void modify(int *p) { p = NULL; } int main() { int x = 10; int *ptr = &x; modify(ptr); printf(\"%d\", *ptr); }?",
    "options": [
      "10 (modify changed its local copy of pointer 'p', leaving caller's 'ptr' pointing to x)",
      "Segmentation Fault",
      "0",
      "NULL"
    ],
    "answerIndex": 0,
    "explanation": "Pointer 'ptr' was passed BY VALUE to 'p'. Reassigning 'p = NULL' inside modify() changes local 'p', leaving caller's 'ptr' unchanged!"
  },
  {
    "question": "How could the function in the previous question be modified to actually set caller's 'ptr' to NULL?",
    "options": [
      "Use double pointer: void modify(int **p) { *p = NULL; } and call modify(&ptr);",
      "Use void modify(const int *p)",
      "Use return NULL",
      "Use static"
    ],
    "answerIndex": 0,
    "explanation": "Passing &ptr (address of pointer) to int **p allows *p = NULL to overwrite caller's 'ptr'."
  },
  {
    "question": "What is passed when a function parameter is declared as 'const int *x'?",
    "options": [
      "A pointer to an integer whose value CANNOT be modified through pointer x inside the function",
      "A pointer that cannot change address",
      "A constant integer value",
      "A global pointer"
    ],
    "answerIndex": 0,
    "explanation": "'const int *x' promises that the function will not modify the value at *x (read-only pointer indirection)."
  },
  {
    "question": "What is passed when a function parameter is declared as 'int * const x'?",
    "options": [
      "A constant pointer whose address stored in x cannot be changed, but the value *x CAN be modified",
      "A read-only integer",
      "A const value",
      "A double pointer"
    ],
    "answerIndex": 0,
    "explanation": "'int * const x' makes the pointer address 'x' immutable, while *x remains writable."
  },
  {
    "question": "What happens if a function attempts to modify *x when parameter is 'const int *x' (e.g. *x = 10;)?",
    "options": [
      "Compiler error (assignment of read-only location)",
      "Value changes silently",
      "Runtime crash",
      "Ignored"
    ],
    "answerIndex": 0,
    "explanation": "Assigning to a const-qualified location (*x = 10) triggers a compile-time error."
  },
  {
    "question": "Why is passing pointers to large data structures preferable to Call by Value?",
    "options": [
      "Saves stack memory and execution time by avoiding copying entire data structures",
      "Makes code automatically parallel",
      "Prevents compilation errors",
      "Uses GPU"
    ],
    "answerIndex": 0,
    "explanation": "Passing a pointer copies only 4 or 8 bytes (address size) rather than copying megabytes of struct data."
  },
  {
    "question": "Can a function return a pointer to its own local automatic stack variable (e.g. int* get() { int x = 5; return &x; })?",
    "options": [
      "NO! Returning address of local stack variable leads to Dangling Pointer and Undefined Behavior because local x is destroyed when function returns!",
      "Yes, perfectly valid",
      "Yes, x lives forever",
      "Only in C99"
    ],
    "answerIndex": 0,
    "explanation": "Local automatic variables are deallocated when function stack frame pops. Returning &x leaves a dangling pointer causing Undefined Behavior!"
  },
  {
    "question": "How can a function safely return a pointer to memory created inside the function?",
    "options": [
      "Allocate memory dynamically on the HEAP using malloc(), or return pointer to a static variable",
      "Return address of local variable",
      "Use auto keyword",
      "Return address of parameter"
    ],
    "answerIndex": 0,
    "explanation": "Heap memory allocated with malloc() persists after function return until explicitly freed with free(). Static variables also persist."
  },
  {
    "question": "What is the output of: int* func() { static int a = 10; return &a; } int main() { int *p = func(); printf(\"%d\", *p); }?",
    "options": [
      "10 (valid because static variable 'a' persists in data segment after func returns)",
      "Dangling pointer crash",
      "0",
      "Compiler error"
    ],
    "answerIndex": 0,
    "explanation": "Static variables reside in global/data memory, remaining valid for the entire program lifetime. Returning &a is completely safe."
  },
  {
    "question": "What happens when a 'return' statement is executed inside a function?",
    "options": [
      "Execution of the current function terminates immediately and control returns to the caller",
      "The function pauses and resumes later",
      "The program exits",
      "The stack frame expands"
    ],
    "answerIndex": 0,
    "explanation": "'return' terminates function execution immediately, pops the stack frame, and hands control back to the caller."
  },
  {
    "question": "What happens if a non-void function reaches its closing brace '}' without executing a return statement in C?",
    "options": [
      "If the caller attempts to use the returned value, it results in Undefined Behavior (garbage value)",
      "It automatically returns 0",
      "Compiler crash",
      "Returns NULL"
    ],
    "answerIndex": 0,
    "explanation": "Failing to return a value from a non-void function leads to Undefined Behavior if caller consumes the return value."
  },
  {
    "question": "Can a 'void' function contain a return statement (e.g. return;)?",
    "options": [
      "Yes, an empty 'return;' statement can be used to exit a void function early",
      "No, return is illegal in void functions",
      "Only if returning 0",
      "Only inside loops"
    ],
    "answerIndex": 0,
    "explanation": "An empty 'return;' statement is completely valid in void functions to exit early."
  },
  {
    "question": "What happens if you attempt to return a value from a void function (e.g. void print() { return 5; })?",
    "options": [
      "Compiler error (void function returning a value)",
      "Returns 5 to caller",
      "Silently converts to void",
      "Warning only"
    ],
    "answerIndex": 0,
    "explanation": "Returning a value from a function declared with void return type causes a compilation error."
  },
  {
    "question": "Can a function return expression contain complex operator logic (e.g. return (a > b) ? a : b;)?",
    "options": [
      "Yes, any expression whose evaluated type matches the function return type is valid",
      "No, return can only take a single variable",
      "Only integer math",
      "Only in C++"
    ],
    "answerIndex": 0,
    "explanation": "The return statement evaluates any expression and converts the result to the function's declared return type."
  },
  {
    "question": "What happens if a function return type is 'float' but the return statement specifies an 'int' (e.g. return 5;)?",
    "options": [
      "The int value 5 is implicitly converted (promoted) to float 5.0f",
      "Compiler error",
      "Returns 0",
      "Truncates data"
    ],
    "answerIndex": 0,
    "explanation": "C automatically performs standard type conversion to cast the returned value to the function's declared return type."
  },
  {
    "question": "What is a variadic function in C?",
    "options": [
      "A function that can accept a variable number of arguments (e.g., printf, scanf)",
      "A function that returns multiple types",
      "A function with no arguments",
      "A recursive function"
    ],
    "answerIndex": 0,
    "explanation": "A variadic function accepts a dynamic/variable number of arguments at runtime."
  },
  {
    "question": "Which standard C header file must be included to process variadic function arguments?",
    "options": [
      "<stdarg.h>",
      "<stdlib.h>",
      "<stdio.h>",
      "<stddef.h>"
    ],
    "answerIndex": 0,
    "explanation": "<stdarg.h> provides the macros and types (va_list, va_start, va_arg, va_end) required to parse variadic arguments."
  },
  {
    "question": "Which macro initializes a va_list variable to iterate over variadic arguments in <stdarg.h>?",
    "options": [
      "va_start(args, last_named_parameter)",
      "va_init()",
      "va_begin()",
      "va_open()"
    ],
    "answerIndex": 0,
    "explanation": "va_start(va_list args, last_named_param) initializes the argument list pointer."
  },
  {
    "question": "Which macro retrieves the next argument value of a specified type from a va_list?",
    "options": [
      "va_arg(args, type)",
      "va_get(args)",
      "va_next(args)",
      "va_read(args, type)"
    ],
    "answerIndex": 0,
    "explanation": "va_arg(args, type) extracts the current argument cast to 'type' and advances the list pointer."
  },
  {
    "question": "Which macro MUST be called before a variadic function returns to clean up va_list resources?",
    "options": [
      "va_end(args)",
      "va_close(args)",
      "va_free(args)",
      "va_stop(args)"
    ],
    "answerIndex": 0,
    "explanation": "va_end(args) performs necessary cleanup on the va_list state before function exit."
  },
  {
    "question": "In a variadic function prototype, how is the variable argument list indicated?",
    "options": [
      "With an ellipsis '...' after at least one named parameter (e.g., int printf(const char *format, ...))",
      "With []",
      "With *args",
      "With varargs"
    ],
    "answerIndex": 0,
    "explanation": "An ellipsis '...' indicates variadic parameters in C prototypes."
  },
  {
    "question": "Can a variadic function in C be declared with ONLY an ellipsis and no named parameters (e.g. void func(...);)?",
    "options": [
      "No, ISO C requires at least one named parameter before the ellipsis",
      "Yes, valid in C99",
      "Yes, valid in C11",
      "Only in C23"
    ],
    "answerIndex": 0,
    "explanation": "Standard C (prior to C23) requires at least one named parameter before the ellipsis to anchor va_start."
  },
  {
    "question": "What is default argument promotion in variadic functions for float types?",
    "options": [
      "float arguments passed to variadic ellipsis '...' are automatically promoted to 'double'",
      "float remains float",
      "float converts to int",
      "float causes error"
    ],
    "answerIndex": 0,
    "explanation": "In variadic calls, default argument promotions convert 'float' to 'double', and integer types smaller than 'int' to 'int'."
  },
  {
    "question": "When calling va_arg(args, type) for a float argument in a variadic function, what type MUST be specified?",
    "options": [
      "double (because float was promoted to double)",
      "float",
      "int",
      "void*"
    ],
    "answerIndex": 0,
    "explanation": "Because of default argument promotion, passing 'float' to va_arg results in undefined behavior; you MUST specify 'double'."
  },
  {
    "question": "What is the output of: int add(int count, ...) { va_list a; va_start(a, count); int s=0; for(int i=0; i<count; i++) s += va_arg(a, int); va_end(a); return s; } int main() { printf(\"%d\", add(3, 10, 20, 30)); }?",
    "options": [
      "60",
      "30",
      "10",
      "Compiler error"
    ],
    "answerIndex": 0,
    "explanation": "The variadic function iterates 3 times, summing 10 + 20 + 30 = 60."
  },
  {
    "question": "What is the return type of a function declared as 'void* allocate(size_t size)'?",
    "options": [
      "A generic memory address pointer (void*)",
      "Nothing (void)",
      "An integer",
      "A character pointer"
    ],
    "answerIndex": 0,
    "explanation": "'void*' is a generic pointer return type that can be assigned to any pointer type without explicit casting."
  },
  {
    "question": "What is the output of: int func() { return 1; return 2; return 3; } int main() { printf(\"%d\", func()); }?",
    "options": [
      "1",
      "2",
      "3",
      "6"
    ],
    "answerIndex": 0,
    "explanation": "The first return statement executes immediately, exiting func() and returning 1. Subsequent return statements are unreachable."
  },
  {
    "question": "What is unreachable code in a function?",
    "options": [
      "Code placed after an unconditional return, break, continue, or goto statement that can never execute",
      "Code in another file",
      "Commented code",
      "Static functions"
    ],
    "answerIndex": 0,
    "explanation": "Unreachable code resides after statements that permanently divert execution flow, so it can never be executed."
  },
  {
    "question": "Can a function return a pointer to a string literal (e.g. const char* getMsg() { return \"SUCCESS\"; })?",
    "options": [
      "Yes, string literals reside in static read-only memory (.rodata) and remain valid for program duration",
      "No, string literals are destroyed",
      "Only if copied",
      "Only in main"
    ],
    "answerIndex": 0,
    "explanation": "String literals have static storage duration. Returning a pointer to a string literal is completely safe."
  },
  {
    "question": "What happens if you ignore the return value of a function (e.g. calling calculate(); without assigning result)?",
    "options": [
      "The returned value is discarded safely",
      "Compiler error",
      "Runtime crash",
      "Function fails to run"
    ],
    "answerIndex": 0,
    "explanation": "Ignoring return values is syntactically legal in C (though for critical functions like scanf/malloc, ignoring return values is bad practice)."
  },
  {
    "question": "What attribute can be added in modern C/GCC to warn if a caller ignores a function's return value?",
    "options": [
      "__attribute__((warn_unused_result)) or [[nodiscard]] in C23",
      "[[ignore]]",
      "static_return",
      "must_use"
    ],
    "answerIndex": 0,
    "explanation": "__attribute__((warn_unused_result)) / [[nodiscard]] instructs the compiler to emit a warning if the return value is ignored."
  },
  {
    "question": "Which macro in <stdarg.h> copies a va_list state to another va_list?",
    "options": [
      "va_copy(dest, src)",
      "va_clone(dest, src)",
      "va_dup(dest, src)",
      "va_move(dest, src)"
    ],
    "answerIndex": 0,
    "explanation": "va_copy(dest, src) (introduced in C99) duplicates a va_list state."
  },
  {
    "question": "What is the output of: int f(int x) { if (x > 0) return x; } int main() { printf(\"%d\", f(-5)); }?",
    "options": [
      "Undefined behavior (garbage value printed because no return executed for x <= 0)",
      "0",
      "-5",
      "Compiler error"
    ],
    "answerIndex": 0,
    "explanation": "f(-5) skips the if branch and hits the closing brace without returning a value, resulting in Undefined Behavior when caller prints the result."
  },
  {
    "question": "How do you declare a function signature that promises never to return to caller (e.g. exit handler)?",
    "options": [
      "_Noreturn void fatal(const char *msg); (introduced in C11)",
      "void fatal() noreturn",
      "never_return void fatal()",
      "static void fatal()"
    ],
    "answerIndex": 0,
    "explanation": "C11 introduced '_Noreturn' specifier (<stdnoreturn.h>) for functions that do not return to caller."
  },
  {
    "question": "What is variable 'Scope' in C programming?",
    "options": [
      "The region of source code text where a variable name is visible and accessible to the compiler",
      "The physical memory address in RAM",
      "The time duration a variable exists",
      "The size in bytes"
    ],
    "answerIndex": 0,
    "explanation": "Scope defines the region of source code text where an identifier can be referenced."
  },
  {
    "question": "What is variable 'Lifetime' (Storage Duration) in C?",
    "options": [
      "The period of program execution time during which a variable exists in RAM storage",
      "The lines of text where it is visible",
      "The data type size",
      "The variable name"
    ],
    "answerIndex": 0,
    "explanation": "Lifetime (storage duration) is the temporal duration during execution when memory remains allocated for a variable."
  },
  {
    "question": "What is Block Scope (Local Scope)?",
    "options": [
      "Variables declared inside a block enclosed by braces '{ }' or function parameters, visible only within that block",
      "Variables visible across all files",
      "Variables visible only in main()",
      "Global variables"
    ],
    "answerIndex": 0,
    "explanation": "Block scope variables are declared inside '{ }' and are accessible only from declaration to closing brace '}'."
  },
  {
    "question": "What is File Scope (Global Scope)?",
    "options": [
      "Variables declared outside all functions, visible from declaration point to the end of the source file",
      "Variables declared inside main()",
      "Variables inside loops",
      "Header variables"
    ],
    "answerIndex": 0,
    "explanation": "File scope variables are declared outside functions and can be accessed by any function below their declaration in the file."
  },
  {
    "question": "What is Variable Shadowing in C?",
    "options": [
      "When an inner block variable is declared with the same name as an outer block/global variable, hiding the outer variable within the inner scope",
      "A compiler bug",
      "Deleting a variable",
      "Copying memory"
    ],
    "answerIndex": 0,
    "explanation": "Shadowing occurs when an inner scope identifier masks an outer scope identifier with the same name."
  },
  {
    "question": "What is the output of: int x = 10; int main() { int x = 20; { int x = 30; printf(\"%d \", x); } printf(\"%d \", x); }?",
    "options": [
      "30 20 ",
      "30 30 ",
      "10 20 ",
      "20 20 "
    ],
    "answerIndex": 0,
    "explanation": "Inner block x (30) shadows outer local x (20), which shadows global x (10). Output: '30 20 '."
  },
  {
    "question": "What is automatic storage duration in C?",
    "options": [
      "Memory is allocated on stack when scope is entered and automatically deallocated when scope exits (default for local variables)",
      "Memory stays allocated forever",
      "Memory on heap",
      "Static memory"
    ],
    "answerIndex": 0,
    "explanation": "Automatic storage duration (default for block variables) automatically manages stack allocation/deallocation at block entry/exit."
  },
  {
    "question": "What is static storage duration in C?",
    "options": [
      "Memory is allocated in data/BSS segment when program starts and persists for the ENTIRE duration of program execution",
      "Memory deallocated when function returns",
      "Temporary stack memory",
      "Heap memory"
    ],
    "answerIndex": 0,
    "explanation": "Static storage duration objects persist in memory throughout the entire runtime execution of the application."
  },
  {
    "question": "What is default initial value of an uninitialized local variable with automatic storage duration?",
    "options": [
      "Indeterminate garbage value",
      "0",
      "NULL",
      "1"
    ],
    "answerIndex": 0,
    "explanation": "Local automatic variables are NOT zero-initialized by default; they contain indeterminate garbage memory values."
  },
  {
    "question": "What is default initial value of an uninitialized global variable with static storage duration?",
    "options": [
      "Implicitly zero-initialized (0 for numbers, NULL for pointers)",
      "Garbage value",
      "1",
      "Undefined"
    ],
    "answerIndex": 0,
    "explanation": "Global and static variables with static storage duration are automatically initialized to zero (0/NULL) at program startup."
  },
  {
    "question": "What is Linkage in C programming?",
    "options": [
      "The property governing whether multiple declarations of an identifier in different scopes or translation units refer to the same object",
      "Connecting to a database",
      "Linking CSS to HTML",
      "Compiling loops"
    ],
    "answerIndex": 0,
    "explanation": "Linkage determines whether identical identifier names across different scopes/files resolve to the exact same memory entity."
  },
  {
    "question": "What are the three types of Linkage in C?",
    "options": [
      "External Linkage, Internal Linkage, and No Linkage",
      "Public, Private, Protected",
      "Global, Local, Static",
      "Direct, Indirect, Null"
    ],
    "answerIndex": 0,
    "explanation": "C recognizes three linkage types: External linkage, Internal linkage, and No linkage."
  },
  {
    "question": "Which linkage type applies to local automatic variables declared inside a function?",
    "options": [
      "No Linkage (each declaration is unique to its block)",
      "External Linkage",
      "Internal Linkage",
      "File Linkage"
    ],
    "answerIndex": 0,
    "explanation": "Local block variables have No Linkage; they cannot be accessed or referenced outside their immediate block scope."
  },
  {
    "question": "Which linkage type applies to global variables declared without 'static' outside functions?",
    "options": [
      "External Linkage (accessible across multiple translation units/files using 'extern')",
      "Internal Linkage",
      "No Linkage",
      "Block Linkage"
    ],
    "answerIndex": 0,
    "explanation": "Non-static global variables have External Linkage, allowing them to be shared across multiple source files via 'extern'."
  },
  {
    "question": "Which linkage type applies to global variables declared WITH the 'static' keyword outside functions?",
    "options": [
      "Internal Linkage (restricted exclusively to the current source file / translation unit)",
      "External Linkage",
      "No Linkage",
      "Universal Linkage"
    ],
    "answerIndex": 0,
    "explanation": "'static' at file scope restricts linkage to Internal Linkage, hiding the variable from other source files."
  },
  {
    "question": "What is a Translation Unit in C compilation?",
    "options": [
      "A single preprocessed C source file (.c) along with all header files (.h) included via #include",
      "A compiled .exe file",
      "A CPU thread",
      "A function"
    ],
    "answerIndex": 0,
    "explanation": "A Translation Unit is the complete text stream produced after preprocessor expansion of a .c file and all its includes."
  },
  {
    "question": "What happens if two separate .c files define a global variable with the same name 'int count = 0;' without 'static' or 'extern'?",
    "options": [
      "Linker error (multiple definition of symbol 'count')",
      "They merge automatically",
      "Compiler ignores second file",
      "One becomes static"
    ],
    "answerIndex": 0,
    "explanation": "Defining the same external linkage symbol in multiple source files causes a Linker Duplicate Symbol error."
  },
  {
    "question": "How can file A access a global variable 'int count;' defined in file B?",
    "options": [
      "By declaring 'extern int count;' in file A",
      "By re-defining 'int count;' in file A",
      "By importing file B",
      "Using static int count;"
    ],
    "answerIndex": 0,
    "explanation": "'extern int count;' in file A declares the symbol without allocating new memory, instructing the linker to resolve it from file B."
  },
  {
    "question": "Does 'extern int count;' allocate memory for variable count?",
    "options": [
      "No, 'extern' is a pure declaration that tells compiler memory is allocated elsewhere",
      "Yes, allocates 4 bytes",
      "Allocates heap memory",
      "Allocates stack memory"
    ],
    "answerIndex": 0,
    "explanation": "'extern int count;' declares existence and type without allocating memory storage."
  },
  {
    "question": "What is Function Scope in C?",
    "options": [
      "Scope that applies strictly to goto statement labels (labels are visible anywhere within their enclosing function)",
      "Scope of local variables",
      "Scope of main()",
      "Global scope"
    ],
    "answerIndex": 0,
    "explanation": "Function Scope applies ONLY to statement labels (used by goto), making labels visible throughout their containing function regardless of block nesting."
  },
  {
    "question": "What is the scope of a function parameter?",
    "options": [
      "Block scope of the function's outermost compound statement",
      "Global scope",
      "File scope",
      "Prototype scope"
    ],
    "answerIndex": 0,
    "explanation": "Function parameters have block scope corresponding to the body of the function."
  },
  {
    "question": "What is the output of: int main() { { int a = 5; } printf(\"%d\", a); }?",
    "options": [
      "Compiler error ('a' undeclared in this scope)",
      "5",
      "0",
      "Garbage"
    ],
    "answerIndex": 0,
    "explanation": "'a' is scoped strictly to the inner block '{ int a = 5; }'. Referencing 'a' outside that block causes a compilation error."
  },
  {
    "question": "Can a global variable be accessed inside a function if a local variable has the same name?",
    "options": [
      "Not directly in C (the local variable shadows the global variable)",
      "Yes, using :: global operator",
      "Yes, using super.x",
      "Yes, using this.x"
    ],
    "answerIndex": 0,
    "explanation": "In C (unlike C++ which has ::), there is no operator to access a shadowed file-scope global variable if a local variable has the same name."
  },
  {
    "question": "What is the lifetime of a local variable declared inside a loop: for (int i=0; i<3; i++) { int k = 10; }?",
    "options": [
      "'k' is created and destroyed on each loop iteration",
      "'k' exists for entire program",
      "'k' exists for function duration",
      "Garbage"
    ],
    "answerIndex": 0,
    "explanation": "Block scope automatic variables are created at block entry and destroyed at block exit during every iteration."
  },
  {
    "question": "What is the output of: int x = 5; void f() { printf(\"%d \", x); } int main() { int x = 10; f(); }?",
    "options": [
      "5 (f() accesses the global x = 5)",
      "10",
      "Garbage",
      "Compiler error"
    ],
    "answerIndex": 0,
    "explanation": "Functions access global file-scope variables. The local 'x = 10' inside main() does not affect f()'s view of global x."
  },
  {
    "question": "What is tentative declaration in C for global variables?",
    "options": [
      "A global declaration without an initializer (e.g. int x;) that acts as a declaration and potential definition",
      "A local variable",
      "A loop header",
      "A macro"
    ],
    "answerIndex": 0,
    "explanation": "At file scope, 'int x;' is a tentative declaration. If no initializing definition appears, the compiler initializes x to 0 at translation unit end."
  },
  {
    "question": "What happens if multiple tentative declarations 'int x;' appear at file scope in the same file?",
    "options": [
      "They resolve seamlessly to a single global variable definition initialized to 0",
      "Compiler error",
      "Duplicate symbol",
      "Stack overflow"
    ],
    "answerIndex": 0,
    "explanation": "Multiple tentative declarations of the same identifier in a single file merge into a single definition."
  },
  {
    "question": "What is the storage duration of string literals?",
    "options": [
      "Static storage duration (they exist in memory for entire program duration)",
      "Automatic storage duration",
      "Dynamic heap duration",
      "Thread duration"
    ],
    "answerIndex": 0,
    "explanation": "String literals have static storage duration and reside in read-only memory throughout program execution."
  },
  {
    "question": "Which keyword forces a global function to have Internal Linkage so it cannot be called from other files?",
    "options": [
      "static",
      "extern",
      "inline",
      "auto"
    ],
    "answerIndex": 0,
    "explanation": "Applying 'static' to a function declaration restricts its linkage to internal, making it private to that source file."
  },
  {
    "question": "What is the benefit of making helper functions 'static' in modular C software?",
    "options": [
      "Encapsulation: prevents namespace pollution and symbol collision with other files, and allows compiler optimizations",
      "Makes code run multithreaded",
      "Allocates heap memory",
      "Speeds up disk I/O"
    ],
    "answerIndex": 0,
    "explanation": "Static helper functions enforce encapsulation, prevent symbol collisions in multi-file projects, and enable inline optimization."
  },
  {
    "question": "What are the four standard Storage Class specifiers in C89/C99?",
    "options": [
      "auto, register, static, extern",
      "public, private, protected, internal",
      "local, global, dynamic, heap",
      "const, volatile, restrict, inline"
    ],
    "answerIndex": 0,
    "explanation": "The four primary storage class specifiers in C are auto, register, static, and extern."
  },
  {
    "question": "What does the 'auto' storage class specifier signify when applied to a local variable (e.g. auto int x;)?",
    "options": [
      "Automatic storage duration (stack allocation); default for all local variables inside functions",
      "Automatic type inference (like C++)",
      "Automated memory allocation on heap",
      "Global variable"
    ],
    "answerIndex": 0,
    "explanation": "In C, 'auto' specifies automatic storage duration (stack allocation). It is the implicit default for local variables."
  },
  {
    "question": "Does 'auto' in C perform automatic type inference like 'auto' in C++11?",
    "options": [
      "No! In C (prior to C23), 'auto' is a storage class specifier for stack variables; it does NOT infer types",
      "Yes, identical to C++",
      "Only for floats",
      "Only in GCC"
    ],
    "answerIndex": 0,
    "explanation": "In standard C (prior to C23), 'auto' specifies stack storage duration, NOT type inference. (C23 adopted type inference auto)."
  },
  {
    "question": "Can 'auto' be applied to global variables declared at file scope outside functions?",
    "options": [
      "No, 'auto' is forbidden at file scope and causes a compilation error",
      "Yes",
      "Only if initialized",
      "Only in main"
    ],
    "answerIndex": 0,
    "explanation": "'auto' is valid ONLY for block-scope local variables inside functions."
  },
  {
    "question": "What request does the 'register' storage class specifier make to the compiler (e.g. register int i;)?",
    "options": [
      "Requests that the compiler store the variable in a fast CPU register instead of RAM stack for high-speed access",
      "Forces memory creation on RAM",
      "Allocates heap memory",
      "Makes variable static"
    ],
    "answerIndex": 0,
    "explanation": "'register' hints to the compiler that the variable will be heavily accessed, requesting optimization into a CPU register."
  },
  {
    "question": "Can you take the address of a 'register' variable using the address-of operator '&' in C (e.g. &reg_var)?",
    "options": [
      "NO! Taking the address of a variable declared with 'register' causes a COMPILER ERROR in C!",
      "Yes, always allowed",
      "Returns NULL",
      "Only in C++"
    ],
    "answerIndex": 0,
    "explanation": "ISO C strictly forbids applying address-of operator '&' to 'register' variables, because CPU registers do not reside at RAM memory addresses."
  },
  {
    "question": "Is the compiler obligated to honor the 'register' keyword request?",
    "options": [
      "No, 'register' is merely a compiler hint; modern compilers may ignore it or optimize un-marked variables into registers automatically",
      "Yes, strictly mandated",
      "Only on 32-bit CPUs",
      "Only in MSVC"
    ],
    "answerIndex": 0,
    "explanation": "Modern optimizing compilers perform register allocation automatically and routinely ignore explicit 'register' hints."
  },
  {
    "question": "Can 'register' be applied to global variables at file scope?",
    "options": [
      "No, 'register' is restricted to local block variables and function parameters",
      "Yes",
      "Only for pointers",
      "Only in C23"
    ],
    "answerIndex": 0,
    "explanation": "'register' storage class can only be applied to local variables and function parameters."
  },
  {
    "question": "What is the effect of applying the 'static' keyword to a LOCAL variable declared inside a function?",
    "options": [
      "Changes its storage duration from automatic to STATIC: value persists across multiple function calls",
      "Makes it global",
      "Makes it read-only",
      "Deletes it on return"
    ],
    "answerIndex": 0,
    "explanation": "Local static variables are initialized ONCE at program startup and retain their values between function invocations."
  },
  {
    "question": "When is a local 'static' variable initialized during execution?",
    "options": [
      "Exactly ONCE before program execution begins (at program startup / compile time)",
      "Every time the function is called",
      "When main() returns",
      "When stack overflows"
    ],
    "answerIndex": 0,
    "explanation": "Local static variables are initialized once prior to program execution, NOT on each function call."
  },
  {
    "question": "What is the output of: void counter() { static int count = 0; count++; printf(\"%d \", count); } int main() { counter(); counter(); counter(); }?",
    "options": [
      "1 2 3 ",
      "1 1 1 ",
      "0 0 0 ",
      "3 3 3 "
    ],
    "answerIndex": 0,
    "explanation": "'count' is static. Call 1: count becomes 1. Call 2: count becomes 2. Call 3: count becomes 3. Output: '1 2 3 '."
  },
  {
    "question": "What would be the output of the previous question if 'static' were removed (auto int count = 0)?",
    "options": [
      "1 1 1 ",
      "1 2 3 ",
      "0 0 0 ",
      "3 3 3 "
    ],
    "answerIndex": 0,
    "explanation": "Without 'static', 'count' is re-created and initialized to 0 on every call, printing '1 1 1 '."
  },
  {
    "question": "What is the scope of a local 'static' variable declared inside a function?",
    "options": [
      "Block scope (accessible ONLY inside the function where it is declared)",
      "Global scope",
      "File scope",
      "External scope"
    ],
    "answerIndex": 0,
    "explanation": "A local static variable has static storage duration, but its visibility (scope) is strictly limited to the block where it is declared."
  },
  {
    "question": "What is default initial value of an un-initialized static variable (e.g. static int x;)?",
    "options": [
      "Zero (0)",
      "Garbage value",
      "1",
      "NULL pointer (if pointer)"
    ],
    "answerIndex": 0,
    "explanation": "Static variables are automatically zero-initialized (0 for integers, 0.0 for floats, NULL for pointers)."
  },
  {
    "question": "What is the effect of applying 'static' to a GLOBAL variable or FUNCTION at file scope?",
    "options": [
      "Restricts linkage to Internal Linkage: symbol is private and hidden from other files",
      "Makes symbol global to all files",
      "Allocates heap memory",
      "Speeds up execution"
    ],
    "answerIndex": 0,
    "explanation": "File-scope 'static' limits visibility to the current translation unit, preventing external access."
  },
  {
    "question": "What does the 'extern' storage class specifier signify?",
    "options": [
      "Declares that a variable or function symbol has External Linkage and is defined in another source file or scope",
      "Allocates new memory",
      "Deletes a symbol",
      "Makes variable local"
    ],
    "answerIndex": 0,
    "explanation": "'extern' informs compiler that symbol memory is defined elsewhere, linking to the external definition."
  },
  {
    "question": "What happens if 'extern int x = 10;' (with an initializer) is declared at file scope?",
    "options": [
      "The 'extern' keyword is ignored and it acts as a defining declaration initializing x to 10",
      "Compiler error",
      "x is declared read-only",
      "x is allocated on stack"
    ],
    "answerIndex": 0,
    "explanation": "Providing an initializer with 'extern' at file scope turns the declaration into a defining declaration, ignoring the 'extern' keyword."
  },
  {
    "question": "Where is static storage duration memory allocated in process memory layout?",
    "options": [
      "In the Data Segment (initialized) or BSS Segment (uninitialized zero-fill)",
      "On the Call Stack",
      "On the Heap",
      "In Text segment"
    ],
    "answerIndex": 0,
    "explanation": "Static and global variables reside in Data segment (for initialized globals) and BSS segment (for zero-initialized globals)."
  },
  {
    "question": "Where are local 'auto' variables allocated in process memory layout?",
    "options": [
      "On the Call Stack (Stack Frame)",
      "In Data segment",
      "In BSS segment",
      "On the Heap"
    ],
    "answerIndex": 0,
    "explanation": "Automatic variables are allocated dynamically on the function call stack frame."
  },
  {
    "question": "What storage class specifier was introduced in C11 for thread-specific variable isolation?",
    "options": [
      "_Thread_local (or thread_local in <threads.h>)",
      "static_thread",
      "extern_thread",
      "auto_thread"
    ],
    "answerIndex": 0,
    "explanation": "C11 introduced '_Thread_local' so each thread possesses its own distinct copy of the variable."
  },
  {
    "question": "What is the lifetime of a '_Thread_local' variable?",
    "options": [
      "Entire duration of the thread's execution (created at thread start, destroyed at thread exit)",
      "Entire program",
      "Single function call",
      "Single loop iteration"
    ],
    "answerIndex": 0,
    "explanation": "Thread-local variables exist for the duration of the executing thread."
  },
  {
    "question": "Can 'static' and 'extern' specifiers be combined on the same variable declaration (e.g. static extern int x;)?",
    "options": [
      "No! Combining multiple storage class specifiers on a single declaration causes a COMPILER ERROR",
      "Yes",
      "Only in main",
      "Only in C23"
    ],
    "answerIndex": 0,
    "explanation": "A declaration can have at most ONE storage class specifier. Combining specifiers causes a compile-time error."
  },
  {
    "question": "What is the output of: int f() { static int x = 5; return x++; } int main() { f(); printf(\"%d\", f()); }?",
    "options": [
      "6",
      "5",
      "7",
      "Garbage"
    ],
    "answerIndex": 0,
    "explanation": "First f() call returns 5, then post-increments x to 6. Second f() call inside printf returns 6, then increments x to 7. Output: 6."
  },
  {
    "question": "What is the output of: int f() { static int x = 5; return ++x; } int main() { f(); printf(\"%d\", f()); }?",
    "options": [
      "7",
      "6",
      "5",
      "8"
    ],
    "answerIndex": 0,
    "explanation": "First f() call pre-increments x to 6 and returns 6. Second f() call pre-increments x to 7 and returns 7. Output: 7."
  },
  {
    "question": "Is a local static variable initializer required to be a compile-time constant (e.g. static int x = 10; vs static int x = getValue();)?",
    "options": [
      "In standard C, local static initializers MUST be compile-time constants!",
      "Can be any runtime expression",
      "Can be function calls",
      "Can be user input"
    ],
    "answerIndex": 0,
    "explanation": "In standard C, static variables are initialized before program execution, so their initializers MUST be compile-time constants."
  },
  {
    "question": "Can you initialize a static variable with a function call in standard C (e.g. static int x = rand();)?",
    "options": [
      "No, causes compiler error (initializer element is not constant in C)",
      "Yes",
      "Only in C99",
      "Only if function is inline"
    ],
    "answerIndex": 0,
    "explanation": "Initializing a static variable with a non-constant expression (like a function call) triggers a compiler error in C."
  },
  {
    "question": "What happens when you declare 'extern' inside a block (e.g. int main() { extern int global_var; })?",
    "options": [
      "Gives the function access to external global_var without declaring it at file scope",
      "Creates a local variable",
      "Allocates stack memory",
      "Compiler error"
    ],
    "answerIndex": 0,
    "explanation": "Block-scope 'extern' imports an external file-scope variable declaration into local block scope."
  },
  {
    "question": "Why are local static variables useful for implementing State Machines?",
    "options": [
      "They preserve internal state across function calls without exposing state variables as global symbols",
      "They make code run on GPU",
      "They allocate heap memory",
      "They prevent stack overflow"
    ],
    "answerIndex": 0,
    "explanation": "Local static variables maintain internal state between calls while encapsulating scope inside the function."
  },
  {
    "question": "Which storage class specifier is implicit for function declarations at file scope?",
    "options": [
      "extern",
      "static",
      "auto",
      "register"
    ],
    "answerIndex": 0,
    "explanation": "Function declarations at file scope are implicitly 'extern' unless explicitly qualified with 'static'."
  },
  {
    "question": "What is the storage duration of function parameters?",
    "options": [
      "Automatic storage duration (stack allocation)",
      "Static storage duration",
      "Heap duration",
      "Thread duration"
    ],
    "answerIndex": 0,
    "explanation": "Function parameters behave like local automatic variables and have automatic storage duration on the stack."
  },
  {
    "question": "What is Recursion in computer science?",
    "options": [
      "A programming technique where a function calls itself directly or indirectly to solve smaller instances of a problem",
      "A loop that never stops",
      "A sorting algorithm",
      "A preprocessor macro"
    ],
    "answerIndex": 0,
    "explanation": "Recursion occurs when a function calls itself to solve sub-problems until a base condition is reached."
  },
  {
    "question": "What are the two essential components required in every correct recursive function?",
    "options": [
      "Base Case (termination condition) and Recursive Step (reducing problem size towards base case)",
      "Loop header and Break statement",
      "Pointer and Struct",
      "Init and Free"
    ],
    "answerIndex": 0,
    "explanation": "A valid recursive function MUST have: 1. Base Case to stop recursion, 2. Recursive Call moving toward base case."
  },
  {
    "question": "What happens if a recursive function lacks a base case or base case is never reached?",
    "options": [
      "Unbounded recursion leading to Stack Overflow (runtime crash due to memory exhaustion)",
      "Infinite output",
      "Compiles silently to a loop",
      "Returns 0"
    ],
    "answerIndex": 0,
    "explanation": "Infinite recursion continuously pushes stack frames until the Call Stack memory is exhausted, causing a Stack Overflow crash."
  },
  {
    "question": "What is a Stack Frame (Activation Record)?",
    "options": [
      "A region of stack memory allocated for a single function call, storing parameters, local variables, return address, and saved registers",
      "A heap block",
      "A CPU register",
      "A disk file"
    ],
    "answerIndex": 0,
    "explanation": "Every function invocation pushes a Stack Frame containing parameters, local variables, and return address onto the call stack."
  },
  {
    "question": "In recursive execution, what happens to stack frames during call stack expansion?",
    "options": [
      "Each recursive call pushes a NEW stack frame onto the call stack, increasing stack memory usage proportionally to recursion depth",
      "Stack frames overwrite previous frames",
      "Stack frames are saved to disk",
      "No stack used"
    ],
    "answerIndex": 0,
    "explanation": "Each level of recursion pushes an active stack frame. Maximum stack memory used is proportional to maximum recursion depth."
  },
  {
    "question": "When does stack unwinding occur during recursive execution?",
    "options": [
      "When the base case is reached and recursive calls start returning values back up the chain, popping stack frames",
      "Before main() runs",
      "During compilation",
      "When heap is full"
    ],
    "answerIndex": 0,
    "explanation": "Stack unwinding occurs as base cases return, popping stack frames off the call stack in reverse order (LIFO)."
  },
  {
    "question": "What is Tail Recursion?",
    "options": [
      "A special form of recursion where the recursive call is the VERY LAST operation executed in the function, with no pending work after return",
      "Recursion at start of function",
      "Recursion inside loops",
      "Recursion with two calls"
    ],
    "answerIndex": 0,
    "explanation": "Tail recursion occurs when the recursive call is the final statement and its result is returned directly without further computation."
  },
  {
    "question": "Why is Tail Recursion significant for compiler optimizations (Tail Call Optimization - TCO)?",
    "options": [
      "Compilers can optimize tail-recursive functions into iterative loops, REUSING the current stack frame and reducing space complexity to O(1)!",
      "It makes code multithreaded",
      "It uses heap",
      "It eliminates base cases"
    ],
    "answerIndex": 0,
    "explanation": "Tail Call Optimization (TCO) allows compilers to reuse stack frames for tail-recursive calls, preventing stack overflow."
  },
  {
    "question": "Is the standard recursive factorial function: int fact(int n) { if (n<=1) return 1; return n * fact(n-1); } tail-recursive?",
    "options": [
      "NO, because multiplication by 'n' is pending after fact(n-1) returns",
      "Yes, it is tail recursive",
      "Only for n=1",
      "Only in GCC"
    ],
    "answerIndex": 0,
    "explanation": "It is NOT tail recursive because multiplication 'n * ...' must wait for fact(n-1) to return before completing."
  },
  {
    "question": "How can the recursive factorial function be rewritten to be Tail-Recursive?",
    "options": [
      "By passing an accumulator parameter: int factTail(int n, int acc) { if (n<=1) return acc; return factTail(n-1, n * acc); }",
      "By using static variables",
      "By removing base case",
      "By using pointers"
    ],
    "answerIndex": 0,
    "explanation": "Passing an accumulator 'acc' performs multiplication before the recursive call, making 'return factTail(...)' the final tail operation."
  },
  {
    "question": "What is Direct Recursion vs Indirect Recursion?",
    "options": [
      "Direct: Function A calls A. Indirect: Function A calls B, and Function B calls A.",
      "Direct uses loops; Indirect uses pointers",
      "Direct is fast; Indirect is slow",
      "No difference"
    ],
    "answerIndex": 0,
    "explanation": "Direct recursion involves a function calling itself. Indirect recursion involves a cycle of mutual calls among two or more functions."
  },
  {
    "question": "What is the mathematical output of: int fib(int n) { if (n<=1) return n; return fib(n-1) + fib(n-2); } for fib(5)?",
    "options": [
      "5",
      "8",
      "3",
      "13"
    ],
    "answerIndex": 0,
    "explanation": "fib(5) = fib(4) + fib(3) = 3 + 2 = 5. (Sequence: 0, 1, 1, 2, 3, 5)."
  },
  {
    "question": "What is the time complexity of naive double-recursive Fibonacci function fib(n) = fib(n-1) + fib(n-2)?",
    "options": [
      "O(2^N) Exponential time complexity due to redundant sub-problem calculations",
      "O(N)",
      "O(N log N)",
      "O(1)"
    ],
    "answerIndex": 0,
    "explanation": "Naive recursive Fibonacci branches into two calls per level, leading to O(2^N) exponential time complexity."
  },
  {
    "question": "What technique optimizes recursive algorithms with overlapping subproblems by caching previously computed subproblem results?",
    "options": [
      "Memoization (Dynamic Programming)",
      "Stack overflow",
      "Tail call",
      "Heap allocation"
    ],
    "answerIndex": 0,
    "explanation": "Memoization stores results of expensive recursive subproblems in a lookup table to avoid redundant recalculations."
  },
  {
    "question": "What is the recursive base case for computing the Greatest Common Divisor (GCD) using Euclidean algorithm: gcd(a, b)?",
    "options": [
      "if (b == 0) return a;",
      "if (a == 0) return 0;",
      "if (a == b) return 1;",
      "if (b == 1) return 0;"
    ],
    "answerIndex": 0,
    "explanation": "Euclidean GCD base case: when b becomes 0, GCD is a."
  },
  {
    "question": "What is the recursive implementation of Euclidean GCD?",
    "options": [
      "int gcd(int a, int b) { return (b == 0) ? a : gcd(b, a % b); }",
      "int gcd(int a, int b) { return a + b; }",
      "int gcd(int a, int b) { return a * b; }",
      "int gcd(int a, int b) { return a - b; }"
    ],
    "answerIndex": 0,
    "explanation": "gcd(a, b) recursively evaluates gcd(b, a % b) until b == 0."
  },
  {
    "question": "How many moves are required to solve the Tower of Hanoi puzzle for N disks recursively?",
    "options": [
      "2^N - 1 moves",
      "N^2 moves",
      "2 * N moves",
      "N! moves"
    ],
    "answerIndex": 0,
    "explanation": "The minimum number of moves to solve Tower of Hanoi for N disks is 2^N - 1."
  },
  {
    "question": "What is the time complexity of solving Tower of Hanoi recursively for N disks?",
    "options": [
      "O(2^N)",
      "O(N)",
      "O(N^2)",
      "O(log N)"
    ],
    "answerIndex": 0,
    "explanation": "Each disk move generates two recursive calls for N-1 disks, yielding O(2^N) time complexity."
  },
  {
    "question": "What is the space complexity (stack depth) of solving Tower of Hanoi recursively for N disks?",
    "options": [
      "O(N) (maximum stack depth corresponds to disk count N)",
      "O(2^N)",
      "O(1)",
      "O(N^2)"
    ],
    "answerIndex": 0,
    "explanation": "The maximum depth of the call stack for Tower of Hanoi is O(N)."
  },
  {
    "question": "What is the output of: void print(int n) { if (n == 0) return; printf(\"%d \", n); print(n - 1); } int main() { print(3); }?",
    "options": [
      "3 2 1 ",
      "1 2 3 ",
      "3 3 3 ",
      "0 1 2 3 "
    ],
    "answerIndex": 0,
    "explanation": "Prints 'n' BEFORE recursive call: n=3 prints 3, n=2 prints 2, n=1 prints 1, n=0 returns. Output: '3 2 1 '."
  },
  {
    "question": "What is the output of: void print(int n) { if (n == 0) return; print(n - 1); printf(\"%d \", n); } int main() { print(3); }?",
    "options": [
      "1 2 3 ",
      "3 2 1 ",
      "3 3 3 ",
      "0 1 2 3 "
    ],
    "answerIndex": 0,
    "explanation": "Recursive call happens BEFORE print statement! Stack unwinds: n=1 prints 1, n=2 prints 2, n=3 prints 3. Output: '1 2 3 '."
  },
  {
    "question": "What is the output of: int fun(int n) { if (n == 1) return 1; return n + fun(n - 1); } int main() { printf(\"%d\", fun(4)); }?",
    "options": [
      "10 (4 + 3 + 2 + 1 = 10)",
      "24",
      "4",
      "16"
    ],
    "answerIndex": 0,
    "explanation": "Calculates sum of natural numbers: fun(4) = 4 + fun(3) = 4 + 3 + 2 + 1 = 10."
  },
  {
    "question": "What is Tree Recursion?",
    "options": [
      "Recursion where a function makes two or more recursive calls within the same execution path",
      "Recursion using trees",
      "Linear recursion",
      "Tail recursion"
    ],
    "answerIndex": 0,
    "explanation": "Tree recursion occurs when a function makes multiple recursive calls per invocation (e.g. Fibonacci fib(n-1) + fib(n-2))."
  },
  {
    "question": "What is Nested Recursion?",
    "options": [
      "Recursion where a function passes a recursive call as an argument to another recursive call (e.g. Ackermann function)",
      "Recursion inside loop",
      "Indirect recursion",
      "Tail recursion"
    ],
    "answerIndex": 0,
    "explanation": "Nested recursion passes a recursive call as a parameter to itself (e.g. f(f(n-1)))."
  },
  {
    "question": "What happens when call stack space runs out due to deep recursion?",
    "options": [
      "Stack Overflow error / Segmentation fault crash",
      "Heap overflow",
      "System reboot",
      "Automatic array conversion"
    ],
    "answerIndex": 0,
    "explanation": "Exhausting call stack memory triggers a Stack Overflow runtime crash."
  },
  {
    "question": "Which data structure inherently models function call and return behavior in recursive execution?",
    "options": [
      "Call Stack (LIFO - Last In First Out)",
      "Queue (FIFO)",
      "Linked List",
      "Heap"
    ],
    "answerIndex": 0,
    "explanation": "The CPU Call Stack operates as a LIFO stack data structure."
  },
  {
    "question": "Can any recursive algorithm be converted into an equivalent iterative loop algorithm?",
    "options": [
      "Yes, any recursive algorithm can be re-written iteratively using explicit loops (and an explicit stack data structure if necessary)",
      "No, recursion has unique powers",
      "Only factorial",
      "Only tail recursion"
    ],
    "answerIndex": 0,
    "explanation": "Turing completeness guarantees that recursion and iteration are computationally equivalent."
  },
  {
    "question": "What is the main advantage of recursion over iteration?",
    "options": [
      "Expressiveness and code simplicity for inherently hierarchical or divide-and-conquer problems (e.g. tree traversals, quicksort)",
      "Faster execution speed",
      "Uses less RAM",
      "Eliminates pointer usage"
    ],
    "answerIndex": 0,
    "explanation": "Recursion provides elegant, clean, and intuitive code for hierarchical data structures like trees and graphs."
  },
  {
    "question": "What is the main disadvantage of recursion compared to iteration?",
    "options": [
      "High memory consumption and call overhead due to repeatedly pushing/popping stack frames",
      "Cannot compute math",
      "Syntax errors",
      "Cannot use integers"
    ],
    "answerIndex": 0,
    "explanation": "Recursion incurs CPU overhead for stack frame creation and risks stack overflow for large inputs."
  },
  {
    "question": "What is the output of: void count(int n) { static int d = 1; printf(\"%d %d \", n, d); d++; if (n > 1) count(n - 1); } int main() { count(3); }?",
    "options": [
      "3 1 2 2 1 3 ",
      "3 1 2 1 1 1 ",
      "3 3 2 2 1 1 ",
      "1 2 3 4 5 6 "
    ],
    "answerIndex": 0,
    "explanation": "d is static! Call 1 (n=3): prints '3 1', d becomes 2, calls count(2). Call 2 (n=2): prints '2 2', d becomes 3, calls count(1). Call 3 (n=1): prints '1 3', d becomes 4, n>1 false. Output: '3 1 2 2 1 3 '."
  },
  {
    "question": "What is a Function Pointer in C?",
    "options": [
      "A variable that stores the memory address of executable function code in the text segment",
      "A pointer returned by a function",
      "A void pointer",
      "A pointer on heap"
    ],
    "answerIndex": 0,
    "explanation": "A function pointer holds the memory address of an executable function, enabling dynamic calls at runtime."
  },
  {
    "question": "What is the correct syntax to declare a function pointer 'func_ptr' for a function taking two ints and returning an int?",
    "options": [
      "int (*func_ptr)(int, int);",
      "int *func_ptr(int, int);",
      "int func_ptr*(int, int);",
      "(int*) func_ptr(int, int);"
    ],
    "answerIndex": 0,
    "explanation": "'int (*func_ptr)(int, int);' declares a function pointer. Without parentheses, 'int *func_ptr(int, int);' declares a function returning an int pointer!"
  },
  {
    "question": "Given 'int add(int a, int b)', how do you assign the address of 'add' to function pointer 'fp'?",
    "options": [
      "fp = add; (or fp = &add;)",
      "fp = *add;",
      "fp = add();",
      "fp = (int)add;"
    ],
    "answerIndex": 0,
    "explanation": "The function name 'add' automatically evaluates to its memory address, so 'fp = add;' or 'fp = &add;' is valid."
  },
  {
    "question": "How do you invoke a function using function pointer 'fp' with arguments 5 and 3?",
    "options": [
      "int res = fp(5, 3); (or int res = (*fp)(5, 3);)",
      "int res = *fp(5, 3);",
      "int res = fp->(5, 3);",
      "int res = call(fp, 5, 3);"
    ],
    "answerIndex": 0,
    "explanation": "Calling 'fp(5, 3);' or dereferencing '(*fp)(5, 3);' invokes the target function."
  },
  {
    "question": "What is Callback Function pattern in C?",
    "options": [
      "Passing a function pointer as an argument to another function so it can execute the callback at an appropriate event",
      "A recursive function",
      "A return statement",
      "A main function call"
    ],
    "answerIndex": 0,
    "explanation": "Callbacks pass a function pointer into an API so the API can execute custom user code dynamically (e.g. qsort comparison)."
  },
  {
    "question": "Which standard library function in <stdlib.h> uses a callback function pointer for custom sorting?",
    "options": [
      "qsort()",
      "bsearch()",
      "both qsort() and bsearch()",
      "malloc()"
    ],
    "answerIndex": 2,
    "explanation": "Both qsort() and bsearch() require a callback function pointer: int (*compar)(const void *, const void *)."
  },
  {
    "question": "What is the function pointer signature required by standard library qsort()?",
    "options": [
      "int (*compar)(const void *a, const void *b)",
      "void (*compar)(int a, int b)",
      "int (*compar)(int a, int b)",
      "bool (*compar)(void *a)"
    ],
    "answerIndex": 0,
    "explanation": "qsort() expects a comparison callback taking two 'const void *' pointers and returning an int (-ve, 0, +ve)."
  },
  {
    "question": "What is a Function Dispatch Table?",
    "options": [
      "An array of function pointers used to select and execute functions dynamically based on an index",
      "A switch table",
      "A stack frame",
      "A symbol table"
    ],
    "answerIndex": 0,
    "explanation": "An array of function pointers (e.g. void (*table[])(void)) acts as a dispatch table for state machines or command handlers."
  },
  {
    "question": "What is the output of: int add(int a, int b) { return a+b; } int main() { int (*fp)(int, int) = add; printf(\"%d\", fp(10, 20)); }?",
    "options": [
      "30",
      "10",
      "20",
      "Compiler error"
    ],
    "answerIndex": 0,
    "explanation": "Function pointer 'fp' points to add(). Calling fp(10, 20) executes add(10, 20), returning 30."
  },
  {
    "question": "What is the difference between 'int *f()' and 'int (*f)()'?",
    "options": [
      "'int *f()' is a function returning an int pointer; 'int (*f)()' is a function pointer returning an int",
      "They are identical",
      "'int *f()' is private",
      "No difference"
    ],
    "answerIndex": 0,
    "explanation": "Operator precedence: () has higher precedence than *. int *f() is a function returning int*. int (*f)() is a pointer to a function."
  },
  {
    "question": "Can you create an array of function pointers in C (e.g. int (*arr[3])(int, int);)?",
    "options": [
      "Yes, completely valid syntax for dispatch tables",
      "No, function pointers cannot be placed in arrays",
      "Only in C++",
      "Only for void functions"
    ],
    "answerIndex": 0,
    "explanation": "'int (*arr[3])(int, int);' declares an array of 3 function pointers."
  },
  {
    "question": "What is the output of: void f1() { printf(\"1\"); } void f2() { printf(\"2\"); } int main() { void (*arr[])() = {f1, f2}; arr[1](); }?",
    "options": [
      "2",
      "1",
      "12",
      "Compiler error"
    ],
    "answerIndex": 0,
    "explanation": "arr[1] holds pointer to f2. Invoking arr[1]() executes f2(), printing '2'."
  },
  {
    "question": "What happens when you call a NULL function pointer (e.g. void (*fp)() = NULL; fp();)?",
    "options": [
      "Segmentation Fault / Crash due to executing code at address 0x0",
      "Runs main()",
      "Does nothing",
      "Returns 0"
    ],
    "answerIndex": 0,
    "explanation": "Calling a NULL or uninitialized function pointer jumps to invalid memory address 0x0, crashing with a Segmentation Fault."
  },
  {
    "question": "What defensive check should be performed before invoking a function pointer?",
    "options": [
      "if (fp != NULL) fp();",
      "if (fp == NULL) fp();",
      "cast fp to void",
      "check sizeof(fp)"
    ],
    "answerIndex": 0,
    "explanation": "Always verify 'if (fp != NULL)' before executing a function pointer."
  },
  {
    "question": "Can function pointers be cast to 'void*' and back in standard ISO C?",
    "options": [
      "ISO C standard states that casting function pointers to object pointers (void*) is technically implementation-defined (though POSIX demands it for dlsym)",
      "Yes, fully required by ISO C",
      "No, forbidden everywhere",
      "Only in C23"
    ],
    "answerIndex": 0,
    "explanation": "ISO C separates object pointers (void*) from function pointers. While POSIX requires conversion support for dlsym(), ISO C considers it implementation-defined."
  },
  {
    "question": "What is the size of a function pointer on a 64-bit architecture?",
    "options": [
      "8 bytes (64 bits, same as address pointers)",
      "4 bytes",
      "16 bytes",
      "Varies by function code length"
    ],
    "answerIndex": 0,
    "explanation": "On a 64-bit platform, all memory pointers (including function pointers) occupy 8 bytes."
  },
  {
    "question": "What is the output of: int f(int a, int b) { return a * b; } int main() { printf(\"%d\", sizeof(f)); } in GCC?",
    "options": [
      "Compiler error or warning (sizeof cannot be applied to function type in ISO C; GCC extension returns 1)",
      "4 bytes",
      "8 bytes",
      "Size of assembly code"
    ],
    "answerIndex": 0,
    "explanation": "Applying sizeof directly to a function identifier 'sizeof(f)' is illegal in ISO C (GCC extension treats it as 1 byte)."
  },
  {
    "question": "What is the output of: int f(int a, int b) { return a * b; } int main() { printf(\"%d\", sizeof(&f)); } on 64-bit system?",
    "options": [
      "8 (sizeof pointer &f is 8 bytes on 64-bit systems)",
      "4",
      "1",
      "16"
    ],
    "answerIndex": 0,
    "explanation": "&f is a function pointer. sizeof(&f) measures pointer size, which is 8 bytes on 64-bit systems."
  },
  {
    "question": "How does typedef simplify function pointer syntax?",
    "options": [
      "typedef int (*MathFunc)(int, int); creates a clean type alias 'MathFunc' for function pointers",
      "Eliminates pointers",
      "Makes functions inline",
      "Makes functions global"
    ],
    "answerIndex": 0,
    "explanation": "Using typedef allows declaring variables as 'MathFunc fp;' instead of complex pointer syntax."
  },
  {
    "question": "What is signal() function in <signal.h> an example of?",
    "options": [
      "A function that TAKES a function pointer callback AND RETURNS a function pointer callback!",
      "A recursive function",
      "A variadic macro",
      "A file I/O API"
    ],
    "answerIndex": 0,
    "explanation": "signal() registers a signal handler callback and returns the previous signal handler callback pointer."
  },
  {
    "question": "What is the complex signature of signal() in <signal.h>?",
    "options": [
      "void (*signal(int sig, void (*func)(int)))(int);",
      "void signal(int, void*)",
      "int signal(int, int)",
      "signal(int, func)"
    ],
    "answerIndex": 0,
    "explanation": "'void (*signal(int sig, void (*func)(int)))(int);' is one of C's most famous complex declarations."
  },
  {
    "question": "What rule of thumb simplifies reading complex C declarations like 'void (*signal(int, void (*)(int)))(int)'?",
    "options": [
      "The Clockwise / Right-Left Rule (start from identifier, move right then left)",
      "Read left to right",
      "Read right to left",
      "Ignore parentheses"
    ],
    "answerIndex": 0,
    "explanation": "The Right-Left (Clockwise) Rule is the standard technique for parsing complex nested C declarations."
  },
  {
    "question": "What is the output of: void f() { printf(\"A\"); } int main() { void (*p)() = f; (*p)(); p(); }?",
    "options": [
      "AA",
      "A",
      "Compiler error",
      "Segmentation fault"
    ],
    "answerIndex": 0,
    "explanation": "Both (*p)() and p() are valid syntax for invoking a function pointer. Output is 'AA'."
  },
  {
    "question": "What happens when you pass a function name without parentheses as a parameter to a function expecting a function pointer?",
    "options": [
      "The function name automatically evaluates/decays to a pointer to that function",
      "Compiler error",
      "Calls the function first",
      "Returns 0"
    ],
    "answerIndex": 0,
    "explanation": "Like arrays, a function name without parentheses automatically decays into a function pointer address."
  },
  {
    "question": "Why are function pointers vital for implementing Object-Oriented polymorphism and Virtual Method Tables (VTABLES) in C?",
    "options": [
      "They allow struct fields to hold function addresses, enabling dynamic dispatch and polymorphism in C",
      "They eliminate structs",
      "They create classes",
      "They run on GPU"
    ],
    "answerIndex": 0,
    "explanation": "C projects (like the Linux kernel and COM objects) achieve polymorphism and OOP interfaces by putting function pointers inside structs to build VTABLEs."
  }
];
