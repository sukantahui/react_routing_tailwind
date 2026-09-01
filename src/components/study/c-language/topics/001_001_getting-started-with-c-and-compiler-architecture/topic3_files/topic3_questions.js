const questions = [
  {
    question: "What are the core structural sections of a standard C source file?",
    shortAnswer: "Preprocessor directives (#include, #define), global declarations/prototypes, main() function entry point, and custom function definitions.",
    explanation: "Organizing C files structurally ensures function prototypes are declared before main(), allowing the compiler to validate parameter types during invocation.",
    hint: "Directives -> Prototypes -> main() -> Function Definitions.",
    level: "basic"
  },
  {
    question: "Why must every C program have exactly one main() function?",
    shortAnswer: "The main() function is the designated entry point where host operating systems begin execution.",
    explanation: "When an operating system launches an executable, runtime startup code (crt0) initializes global state and jumps to the memory address of the 'main' symbol.",
    hint: "Operating system execution entry point.",
    level: "basic"
  },
  {
    question: "What does word-by-word dissecting of 'int main(void)' mean?",
    shortAnswer: "'int' specifies integer return type to OS; 'main' is entry symbol name; '(void)' specifies zero parameters.",
    explanation: "'int' tells the OS that main returns a status integer; 'main' is the required global entry identifier; '(void)' explicitly specifies that main accepts no arguments.",
    hint: "int = return type, main = function name, void = no arguments.",
    level: "basic"
  },
  {
    question: "What is the difference between int main(void) and int main(int argc, char *argv[])?",
    shortAnswer: "int main(void) takes no arguments; argc/argv allows receiving command line arguments from the terminal.",
    explanation: "Use int main(void) for simple standalone console programs; use argc/argv when parsing command line flags.",
    hint: "void for no args; argc/argv for terminal arguments.",
    level: "intermediate"
  },
  {
    question: "What is a function prototype and why is it necessary before main()?",
    shortAnswer: "A function declaration specifying return type, name, and parameter types before implementation.",
    explanation: "Prototypes inform the compiler of a function's existence and signature so it can check argument types during calls inside main() before reaching the actual function definition.",
    hint: "Informs compiler of function signature before invocation.",
    level: "basic"
  },
  {
    question: "What is the difference between global scope and local block scope in C?",
    shortAnswer: "Global variables are accessible anywhere in the file; local variables exist only within their enclosing {} block.",
    explanation: "Global variables live in the static data segment throughout program lifetime. Local variables live on stack frames and are destroyed when their enclosing function returns.",
    hint: "Global = file wide; Local = inside {} block.",
    level: "basic"
  },
  {
    question: "What do EXIT_SUCCESS and EXIT_FAILURE macros in <stdlib.h> represent?",
    shortAnswer: "EXIT_SUCCESS evaluates to 0 (successful execution); EXIT_FAILURE evaluates to non-zero (error state).",
    explanation: "Returning EXIT_SUCCESS or EXIT_FAILURE from main() provides portable status codes across Linux, Windows, and macOS operating systems.",
    hint: "EXIT_SUCCESS (0) and EXIT_FAILURE (1).",
    level: "basic"
  },
  {
    question: "What happens if a function prototype parameter names differ from the actual function definition?",
    shortAnswer: "Compiler ignores parameter names in prototypes; only data types and sequence matter.",
    explanation: "Prototype void foo(int a, float b); matches definition void foo(int x, float y) {} because compiler checks type signatures (int, float), not parameter variable names.",
    hint: "Compiler checks data types, not parameter names.",
    level: "intermediate"
  },
  {
    question: "What is the purpose of #define preprocessor macros at the top of C files?",
    shortAnswer: "To define symbolic constants and text substitution rules evaluated before compilation.",
    explanation: "#define MAX_USERS 100 replaces every occurrence of MAX_USERS with 100 during preprocessing, enhancing code maintainability.",
    hint: "Symbolic constant text replacement.",
    level: "basic"
  },
  {
    question: "What is the difference between #include <filename.h> and #include \"filename.h\"?",
    shortAnswer: "<> searches standard system directories; \"\" checks local project folder first.",
    explanation: "Use <> for compiler standard library headers (<stdio.h>, <stdlib.h>); use \"\" for your own created header files (\"myheader.h\").",
    hint: "System headers vs local project headers.",
    level: "basic"
  },
  {
    question: "Why is void main() considered non-standard and bad practice in C?",
    shortAnswer: "The C standard explicitly mandates main() must return int.",
    explanation: "Using void main() leads to undefined behavior on modern compilers because the host OS expects an integer exit code on CPU registers.",
    hint: "Always use int main(void) or int main(int argc, char *argv[]).",
    level: "intermediate"
  },
  {
    question: "What is statement block scoping ({}) in C?",
    shortAnswer: "Variables declared inside curly braces {} exist only within that specific block.",
    explanation: "If you declare int x = 10; inside an if-statement block, x is deallocated when execution leaves the closing brace }.",
    hint: "Variables are scoped to enclosing {} braces.",
    level: "basic"
  },
  {
    question: "What is forward declaration in C?",
    shortAnswer: "Declaring a symbol (function or struct) before its full definition.",
    explanation: "Forward declarations allow functions to call each other recursively or out of physical file order without compilation errors.",
    hint: "Declare signature ahead of definition.",
    level: "intermediate"
  },
  {
    question: "What is the role of return 0 in main() function?",
    shortAnswer: "It passes exit status code 0 back to the parent operating system shell.",
    explanation: "An exit code of 0 informs shell scripts and parent processes that the program executed to completion without errors.",
    hint: "Signals successful process termination.",
    level: "basic"
  },
  {
    question: "What is a semicolon (;) in C program structure?",
    shortAnswer: "The statement terminator in C syntax.",
    explanation: "Unlike Python or JavaScript where newlines separate statements, C uses semicolons to demarcate statement boundaries.",
    hint: "Terminates every C statement.",
    level: "basic"
  },
  {
    question: "What are static global variables (static int globalVar) in C file structure?",
    shortAnswer: "Global variables restricted in visibility to the defining source file only (internal linkage).",
    explanation: "Marking a global variable static prevents other .c files from accessing or modifying it via extern declarations, ensuring file-level encapsulation.",
    hint: "Internal linkage restricted to single file.",
    level: "advanced"
  },
  {
    question: "What is the purpose of comments (// and /* */) in C source files?",
    shortAnswer: "To document code logic for humans; comments are stripped out entirely during preprocessing.",
    explanation: "Comments do not generate machine code instructions or affect binary execution speed.",
    hint: "Human documentation stripped during preprocessing.",
    level: "basic"
  },
  {
    question: "Can a C program have multiple functions with the same name (function overloading)?",
    shortAnswer: "No, C does not support function overloading.",
    explanation: "Unlike C++ or Java, every function symbol name in C must be unique within its scope.",
    hint: "C requires unique function names.",
    level: "intermediate"
  },
  {
    question: "What is the significance of the stdlib.h header file in C program structure?",
    shortAnswer: "Provides general utilities: dynamic memory (malloc/free), process control (exit), and conversion functions (atoi, atof).",
    explanation: "stdlib.h defines core system utilities alongside stdio.h for I/O operations.",
    hint: "Standard library utilities header.",
    level: "basic"
  },
  {
    question: "What is external linkage vs internal linkage?",
    shortAnswer: "External linkage allows symbols accessible across multiple object files; internal linkage restricts symbols to single file.",
    explanation: "Functions are external by default. Adding static keyword enforces internal linkage.",
    hint: "extern (global across files) vs static (file private).",
    level: "advanced"
  },
  {
    question: "What happens if you return a non-zero integer (e.g. return 1) from main()?",
    shortAnswer: "Signals an error or non-standard exit state to the host operating system.",
    explanation: "Automated test runners and terminal scripts read $? to detect if process returned non-zero error status.",
    hint: "Non-zero signals failure status.",
    level: "basic"
  },
  {
    question: "What is the C preprocessor stringizing operator # inside macros?",
    shortAnswer: "Converts a macro parameter argument into a string literal.",
    explanation: "#define PRINT_VAR(x) printf(#x \" = %d\\n\", x) prints variable name alongside its value.",
    hint: "Turns macro arguments into text strings.",
    level: "advanced"
  },
  {
    question: "How does C handle whitespace and indentation in source files?",
    shortAnswer: "Whitespace, tabs, and newlines are ignored by C compiler except inside string literals and preprocessor directives.",
    explanation: "Indentation improves human readability and code maintenance, but has zero effect on generated machine opcodes.",
    hint: "Free-form language; semicolons mark statements.",
    level: "basic"
  },
  {
    question: "Why is proper program structure essential for large multi-developer C projects?",
    shortAnswer: "Prevents symbol name collisions, circular header dependencies, and reduces build compilation times.",
    explanation: "Well-structured C modules separate header interfaces (.h) from implementation files (.c), enabling incremental compilation.",
    hint: "Modular header/source separation for scalability.",
    level: "intermediate"
  },
  {
    question: "What is the difference between declaration and definition in C structure?",
    shortAnswer: "Declaration introduces a symbol's type signature; definition allocates memory and provides implementation.",
    explanation: "extern int count; is a declaration (no memory allocated). int count = 10; is a definition (allocates 4 bytes).",
    hint: "Declaration = signature; Definition = memory & implementation.",
    level: "intermediate"
  }
];

export default questions;
