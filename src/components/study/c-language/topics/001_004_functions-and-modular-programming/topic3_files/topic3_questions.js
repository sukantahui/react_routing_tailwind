const questions = [
  {
    question: "What is a Storage Class in C?",
    shortAnswer: "A specifier that defines the scope (visibility), lifetime (duration), memory storage location (Stack, Heap, Data segment, or CPU Register), and linkage (internal vs external) of a variable or function.",
    explanation: "C provides four standard storage classes: `auto`, `register`, `static`, and `extern`.",
    hint: "Defines scope, lifetime, memory location, and linkage.",
    level: "basic"
  },
  {
    question: "What is the `auto` Storage Class?",
    shortAnswer: "The default storage class for all local variables declared inside functions or blocks, allocating memory on the runtime stack that is destroyed upon block exit.",
    explanation: "Because it is the default, the `auto` keyword is rarely written explicitly in modern C code.",
    hint: "Default automatic stack variable.",
    level: "basic"
  },
  {
    question: "What is the `static` Storage Class when applied to a Local Variable?",
    shortAnswer: "It gives the local variable static storage duration (persisting in the data segment across function calls) while preserving its local block scope visibility.",
    explanation: "Initialized only once when the program launches; remembers its value between consecutive function invocations.",
    hint: "Remembers value across calls without global pollution.",
    level: "basic",
    codeExample: "void countCalls(void) {\n    static int count = 0; // Initialized once!\n    count++;\n    printf(\"Call #%d\\n\", count);\n}"
  },
  {
    question: "What is the `static` Storage Class when applied to a Global Variable or Function?",
    shortAnswer: "It gives the global identifier Internal Linkage, restricting its visibility strictly to the source file (`.c`) where it is declared and hiding it from other compilation units.",
    explanation: "Used for encapsulation and data hiding to create private module helpers.",
    hint: "Internal linkage restricts visibility to current file.",
    level: "intermediate"
  },
  {
    question: "What is the `extern` Storage Class?",
    shortAnswer: "A declaration specifier that tells the compiler that a global variable or function is defined with External Linkage in another translation unit (source file), without allocating new storage.",
    explanation: "Allows sharing global state or library functions across multiple `.c` files in a multi-file project.",
    hint: "Declares variable defined in another file.",
    level: "intermediate",
    codeExample: "// In file1.c:\nint globalScore = 100;\n\n// In file2.c:\nextern int globalScore; // References file1.c's variable!"
  },
  {
    question: "What is the `register` Storage Class?",
    shortAnswer: "A hint to the compiler to store the variable directly in a high-speed CPU register instead of RAM, accelerating access for intensive loop counters.",
    explanation: "You CANNOT apply the address-of operator (`&`) to a `register` variable because registers do not have physical RAM byte addresses!",
    hint: "CPU register optimization hint; no RAM address.",
    level: "intermediate"
  },
  {
    question: "Why does `&regVar` cause a compiler error if `regVar` is declared with `register`?",
    shortAnswer: "Because CPU registers reside inside the processor silicon core, NOT in system RAM, and therefore have no addressable memory addresses.",
    explanation: "The compiler will halt with `error: address of register variable requested`.",
    hint: "Registers do not have RAM addresses.",
    level: "basic"
  },
  {
    question: "What is the difference between Internal Linkage and External Linkage?",
    shortAnswer: "- Internal Linkage (`static` globals/functions): Identifier can be referenced only within the current translation unit.\n- External Linkage (regular globals/functions / `extern`): Identifier can be shared and linked across multiple translation units.",
    explanation: "Controls multi-file visibility across linker object files.",
    hint: "File-private vs project-wide linkage.",
    level: "intermediate"
  },
  {
    question: "What default initial value do `static` and `extern` variables receive if not explicitly initialized?",
    shortAnswer: "They are automatically zero-initialized by the system: integer types receive `0`, floats `0.0`, pointers `NULL`, and characters `\\0`.",
    explanation: "Stored in the `.bss` (Block Started by Symbol) segment.",
    hint: "Zero-initialized by default.",
    level: "basic"
  },
  {
    question: "What is the Diary / Ledger Analogy taught by Sukanta Hui for `static` local variables?",
    shortAnswer: "`auto` variables are like wiping a whiteboard clean after every class, whereas `static` local variables are like a teacher's private diary that stays locked in the room and never forgets previous notes!",
    explanation: "Helps beginners grasp persistence without global exposure.",
    hint: "Whiteboard wiped clean vs private diary remembering notes.",
    level: "basic"
  },
  {
    question: "Can a `static` local variable be initialized with a non-constant expression in C?",
    shortAnswer: "In ANSI C / C99, `static` variables with static storage duration MUST be initialized with a compile-time constant expression.",
    explanation: "They are initialized at program load time before `main()` starts running.",
    hint: "Must use compile-time constant for static initializer.",
    level: "intermediate",
    codeExample: "static int count = 10; // OK\n// static int x = rand(); // Error in standard C!"
  },
  {
    question: "How does `typedef` relate syntactically to storage class specifiers in C grammar?",
    shortAnswer: "In C grammar specifications, `typedef` is syntactically classified as a storage class specifier because it appears in the same declaration specifier slot.",
    explanation: "You cannot combine `typedef` with `static` or `extern` in the same declaration.",
    hint: "Classified as storage class specifier in C grammar.",
    level: "advanced"
  },
  {
    question: "What is a Tentative Definition in C?",
    shortAnswer: "A file-scope variable declaration without an initializer (e.g. `int x;`), which acts as a tentative definition that the compiler turns into a real definition if no other definition appears.",
    explanation: "Allowed in C file scope, but prohibited inside local function blocks.",
    hint: "File-scope declaration without explicit initializer.",
    level: "advanced"
  },
  {
    question: "Why do modern optimizing compilers (e.g. GCC with `-O2` / `-O3`) mostly ignore the `register` keyword?",
    shortAnswer: "Because modern compiler Register Allocation algorithms (such as Graph Coloring) are far better at allocating CPU registers optimally than human programmers.",
    explanation: "`register` remains in the standard mainly for backwards compatibility and preventing `&` address taking.",
    hint: "Compiler optimizers perform superior register allocation.",
    level: "intermediate"
  },
  {
    question: "How can you implement a Singleton or Persistent State Machine in C using `static` variables?",
    shortAnswer: "Declare `static` state variables inside the state machine dispatcher function; the state remains private to the function while surviving across infinite execution cycles.",
    explanation: "Prevents other files from corrupting the state machine.",
    hint: "Encapsulates state inside function.",
    level: "intermediate"
  },
  {
    question: "What happens if two different `.c` files declare a global variable with the same name without `static` or `extern`?",
    shortAnswer: "The linker will report a 'multiple definition' error (`redefinition of symbol`) during the linking phase.",
    explanation: "Qualifying one or both with `static` gives them internal linkage and resolves the collision.",
    hint: "Linker collision unless marked static.",
    level: "intermediate"
  },
  {
    question: "What is the memory overhead of a `static` local variable compared to an `auto` variable?",
    shortAnswer: "A `static` local variable consumes a fixed memory slot in the Data Segment throughout program execution, whereas an `auto` variable consumes stack space only while its declaring function is executing.",
    explanation: "Trade-off: permanence vs stack reuse.",
    hint: "Fixed data segment allocation vs dynamic stack reuse.",
    level: "intermediate"
  },
  {
    question: "How do header files use `extern` to share global variables safely?",
    shortAnswer: "Header files declare `extern int myGlobal;`, and exactly ONE `.c` implementation file provides the definition `int myGlobal = 0;`.",
    explanation: "Prevents duplicate symbol errors across multiple `#include` statements.",
    hint: "extern declaration in header, single definition in .c file.",
    level: "intermediate"
  },
  {
    question: "What is `static inline` in C header files?",
    shortAnswer: "A function defined in a header file with `static inline` to allow each including `.c` file to emit its own private inlined copy without causing duplicate symbol linker errors.",
    explanation: "Standard pattern for high-performance utility headers in systems code.",
    hint: "Header inline functions without linker collisions.",
    level: "advanced"
  },
  {
    question: "Can a function marked `static` be called via a Function Pointer in another file?",
    shortAnswer: "Yes! If the defining file explicitly exports a function pointer pointing to the `static` function, another file can invoke it through the pointer.",
    explanation: "Internal linkage hides the symbol name from the linker, but the executable code address in RAM remains valid.",
    hint: "Accessible via function pointer if address is exported.",
    level: "advanced"
  },
  {
    question: "What is the difference between `const` and `static`?",
    shortAnswer: "- `const` is a Type Qualifier specifying that data is read-only (immutable).\n- `static` is a Storage Class specifying storage duration and linkage (internal visibility/persistence).",
    explanation: "You can combine them: `static const double PI = 3.14159;`.",
    hint: "Immutability qualifier vs storage/linkage class.",
    level: "basic"
  },
  {
    question: "What is the lifetime of an `extern` variable?",
    shortAnswer: "Static Storage Duration; it exists for the entire duration of the program from startup to termination.",
    explanation: "All global variables linked via `extern` live in the data segment.",
    hint: "Lives for full program execution.",
    level: "basic"
  },
  {
    question: "What storage class is assigned to function parameters by default in C?",
    shortAnswer: "`auto` (Automatic storage duration on the call stack; you can also specify `register`).",
    explanation: "Parameters cannot be marked `static` or `extern`.",
    hint: "Automatic stack storage duration.",
    level: "basic"
  },
  {
    question: "How does `static` support the Object-Oriented concept of 'Encapsulation' in C?",
    shortAnswer: "By making internal helper functions and state variables `static`, a C library hides its implementation details and exposes only clean public APIs via header files.",
    explanation: "Creates private vs public interface boundaries in modular C.",
    hint: "Hides private implementation details in C modules.",
    level: "intermediate"
  },
  {
    question: "What is Sukanta Hui's memory mantra for Storage Classes in C?",
    shortAnswer: "- `auto`: Temporary stack worker\n- `register`: High-speed CPU runner\n- `static`: Faithful diary that never forgets\n- `extern`: Global passport across files",
    explanation: "Memorable 4-point summary for competitive exams and interviews.",
    hint: "Stack worker, CPU runner, faithful diary, global passport.",
    level: "basic"
  }
];

export default questions;
