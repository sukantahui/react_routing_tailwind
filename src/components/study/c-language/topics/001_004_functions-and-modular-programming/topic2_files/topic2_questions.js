const questions = [
  {
    question: "What is the difference between Variable Scope, Visibility, and Lifetime in C?",
    shortAnswer: "- Scope: The spatial region of code where a variable's identifier is recognized.\n- Visibility: Whether the variable can be directly accessed (can be hidden by shadowing).\n- Lifetime (Duration): The time span during program execution when storage memory is allocated for the variable.",
    explanation: "A local variable has block scope and automatic duration; a global variable has file scope and static duration.",
    hint: "Code region (scope) vs access rights (visibility) vs memory existence (lifetime).",
    level: "basic"
  },
  {
    question: "What is Local / Block Scope in C?",
    shortAnswer: "A variable declared inside a code block enclosed in `{}` is accessible only from its declaration point to the closing brace `}`.",
    explanation: "Memory is allocated when entering the block and automatically reclaimed upon exiting.",
    hint: "Accessible only within surrounding braces.",
    level: "basic",
    codeExample: "void test(void) {\n    int x = 10; // Local scope inside test()\n    if (x > 5) {\n        int y = 20; // Block scope inside if\n    }\n    // y is inaccessible here!\n}"
  },
  {
    question: "What is Global / File Scope in C?",
    shortAnswer: "A variable declared outside of all functions, accessible by any function defined below its declaration within that source file (translation unit).",
    explanation: "Stored in the data segment (.data / .bss) and persists for the entire program execution.",
    hint: "Declared outside all functions.",
    level: "basic"
  },
  {
    question: "What is Variable Shadowing (Name Masking)?",
    shortAnswer: "When an inner block or local function declares a variable with the exact same name as an outer or global variable, the inner declaration hides (masks) the outer one within that block.",
    explanation: "Inside the inner block, all references resolve to the inner variable.",
    hint: "Inner declaration masks outer variable with same name.",
    level: "intermediate",
    codeExample: "int count = 100; // Global\n\nvoid func(void) {\n    int count = 5; // Shadows global count\n    printf(\"%d\\n\", count); // Prints 5\n}"
  },
  {
    question: "Why are non-const Global Variables generally discouraged in modern software engineering?",
    shortAnswer: "Because any function anywhere can silently modify a global variable, creating hidden coupling, race conditions in multithreaded code, and making debugging nearly impossible.",
    explanation: "Prefer passing parameters or using encapsulation with `static` file scope.",
    hint: "Uncontrolled side effects and multithreading bugs.",
    level: "basic"
  },
  {
    question: "What is Function Prototype Scope?",
    shortAnswer: "The scope of parameter names declared within a function prototype (declaration), which extends only to the end of the prototype signature.",
    explanation: "In `double calc(double radius);`, `radius` ceases to exist outside that declaration line.",
    hint: "Parameter names exist only within prototype declaration.",
    level: "intermediate"
  },
  {
    question: "What is Automatic Storage Duration (Lifetime)?",
    shortAnswer: "The lifetime of local variables: allocated on the CPU stack when entering the declaring block and automatically deallocated when the block terminates.",
    explanation: "Default for all variables declared inside functions (`auto` keyword).",
    hint: "Stack allocated; destroyed on block exit.",
    level: "basic"
  },
  {
    question: "What is Static Storage Duration (Lifetime)?",
    shortAnswer: "Storage allocated once at program startup in the global/static data segment that persists throughout the entire execution until program termination.",
    explanation: "Applies to global variables and local variables marked with `static`.",
    hint: "Lives for full duration of program execution.",
    level: "basic"
  },
  {
    question: "Can two different functions declare local variables with the same name without conflict?",
    shortAnswer: "Yes, completely! Because each function's local variables reside in separate, isolated stack frames and exist only within their own function scope.",
    explanation: "`funcA()`'s `int x` has no relationship or memory collision with `funcB()`'s `int x`.",
    hint: "Isolated stack frames prevent naming conflicts.",
    level: "basic"
  },
  {
    question: "What is C99 Loop-Header Scope (e.g. `for (int i = 0; ...)` )?",
    shortAnswer: "Variables declared inside the `for` loop initialization clause have block scope restricted strictly to the body of that `for` loop.",
    explanation: "The variable `i` is destroyed as soon as the loop finishes iterating.",
    hint: "Loop counter exists only inside the loop.",
    level: "basic",
    codeExample: "for (int i = 0; i < 5; i++) {\n    printf(\"%d \", i);\n}\n// i is NOT accessible here in C99!"
  },
  {
    question: "What default initial value do Global variables have vs Local variables?",
    shortAnswer: "- Global Variables: Automatically zero-initialized by the OS (0, 0.0, NULL, '\\0').\n- Local Automatic Variables: Contain uninitialized random garbage stack bits!",
    explanation: "Reading an uninitialized local variable invokes Undefined Behavior.",
    hint: "Globals default to 0; locals contain garbage.",
    level: "basic"
  },
  {
    question: "Where in computer memory are Global variables stored vs Local variables?",
    shortAnswer: "- Global Variables: Stored in the Data Segment (`.data` for initialized, `.bss` for uninitialized).\n- Local Variables: Stored on the runtime Call Stack.",
    explanation: "Stack memory expands and contracts rapidly with function invocations.",
    hint: "Data segment vs runtime call stack.",
    level: "intermediate"
  },
  {
    question: "What is the Personal Bedroom vs Public Park Analogy for Scope?",
    shortAnswer: "- Local Scope is like your personal bedroom: private to you, cleanable anytime.\n- Global Scope is like a public city park: anyone can walk in, drop trash, or move benches, affecting everyone in town!",
    explanation: "Sukanta Hui's classic intuitive classroom analogy.",
    hint: "Private bedroom vs public city park.",
    level: "basic"
  },
  {
    question: "What is a Translation Unit in C?",
    shortAnswer: "A single source file (`.c`) along with all header files (`.h`) directly and indirectly included by `#include` directives after preprocessor expansion.",
    explanation: "The fundamental input unit processed by the compiler.",
    hint: "Source file + all included headers after preprocessing.",
    level: "intermediate"
  },
  {
    question: "How do you declare a Global Constant safely in C?",
    shortAnswer: "Use the `const` type qualifier: `const double PI = 3.141592653589793;` or `#define PI ...`.",
    explanation: "Prevents any function from mutating the global configuration value.",
    hint: "const qualifier prevents accidental global mutation.",
    level: "basic"
  },
  {
    question: "What happens if you define two global variables with the exact same name in the same file?",
    shortAnswer: "The compiler will halt with a 'redefinition of variable' error.",
    explanation: "Global identifiers in the same translation unit must be unique.",
    hint: "Redefinition compiler error.",
    level: "basic"
  },
  {
    question: "What is Variable Lifetime vs Memory Reachability?",
    shortAnswer: "A variable may still exist in physical RAM (lifetime active), but code may lose the pointer address or scope to reach it (loss of reachability), creating a memory leak or shadow.",
    explanation: "Static local variables exist forever, but are visible only within their declaring function.",
    hint: "Existence in memory vs ability to access.",
    level: "advanced"
  },
  {
    question: "What is Thread-Local Storage (`_Thread_local` in C11)?",
    shortAnswer: "A storage duration where each concurrent thread gets its own distinct, independent copy of a variable that persists for the lifetime of that thread.",
    explanation: "Eliminates race conditions without requiring mutex locks.",
    hint: "Unique variable copy per thread.",
    level: "advanced"
  },
  {
    question: "Can an inner block access an outer block's variable if the names are different?",
    shortAnswer: "Yes! Nested inner blocks inherit full read and write access to all non-shadowed variables declared in enclosing outer blocks.",
    explanation: "Lexical scoping enables inner algorithms to access parent variables.",
    hint: "Inner blocks can see non-shadowed outer variables.",
    level: "basic"
  },
  {
    question: "What compiler flag detects accidental variable shadowing?",
    shortAnswer: "`-Wshadow` in GCC and Clang.",
    explanation: "Emits a warning whenever a local variable declaration shadows another local or global variable.",
    hint: "-Wshadow warning flag.",
    level: "intermediate"
  },
  {
    question: "How does the OS `.bss` section optimize executable file size for uninitialized globals?",
    shortAnswer: "The `.bss` segment does not store megabytes of actual zero bytes in the `.exe` binary on disk; it simply stores a number indicating total size, and the OS fills the RAM with zeros at program launch!",
    explanation: "Keeps executable files small on disk.",
    hint: "Stores only size metadata; OS zeroes memory on load.",
    level: "advanced"
  },
  {
    question: "What is Dynamic Storage Duration (Heap Allocation)?",
    shortAnswer: "Memory explicitly requested at runtime using `malloc()`, `calloc()`, or `realloc()`, which lives until explicitly freed with `free()` or program exit.",
    explanation: "Managed manually by the programmer, not tied to function blocks or scopes.",
    hint: "Heap memory allocated via malloc and freed via free.",
    level: "intermediate"
  },
  {
    question: "What is Scope Resolution in nested blocks with 3 levels of identical variable names?",
    shortAnswer: "The compiler resolves the identifier to the declaration in the innermost enclosing scope.",
    explanation: "Innermost declaration always wins.",
    hint: "Innermost matching declaration takes precedence.",
    level: "intermediate"
  },
  {
    question: "Why does returning a pointer to a global variable work safely, unlike returning a pointer to a local variable?",
    shortAnswer: "Because global variables reside in static data memory that never dies when a function returns, so the returned pointer remains 100% valid!",
    explanation: "Local variables on the stack die on return; globals live for the whole program.",
    hint: "Global memory outlives function returns.",
    level: "intermediate"
  },
  {
    question: "What is Sukanta Hui's golden advice regarding variable scope in C?",
    shortAnswer: "Keep the scope of every variable as narrow and local as possible! Declare variables right before their first use, and avoid globals unless modeling true system-wide hardware states!",
    explanation: "Minimizing scope reduces cognitive load and eliminates unintended side-effect bugs.",
    hint: "Keep scope as narrow and local as possible.",
    level: "basic"
  }
];

export default questions;
