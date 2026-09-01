const questions = [
  {
    question: "What is a Function in C, and why is modular design essential?",
    shortAnswer: "A self-contained block of reusable code designed to perform a specific subtask. Modular design breaks large monolithic codebases into small, testable, maintainable, and reusable units.",
    explanation: "Without functions, software would consist of thousands of repetitive, duplicate lines inside `main()`, making debugging and maintenance impossible.",
    hint: "Reusable isolated code blocks.",
    level: "basic"
  },
  {
    question: "What is the difference between a Function Declaration (Prototype) and a Function Definition?",
    shortAnswer: "A Declaration (Prototype) tells the compiler the function's name, return type, and parameters before usage (ends with a semicolon); a Definition contains the actual executable code body enclosed in `{}`.",
    explanation: "Prototypes enable one-pass compilers to validate parameter types and return types when functions are defined below `main()`.",
    hint: "Signature with semicolon vs complete body with braces.",
    level: "basic",
    codeExample: "// Prototype:\ndouble computeTax(double amount);\n\n// Definition:\ndouble computeTax(double amount) {\n    return amount * 0.18;\n}"
  },
  {
    question: "What happens if you invoke a function before its declaration in C99 / C11?",
    shortAnswer: "In modern C (C99+), invoking an undeclared function triggers a compiler error (`error: implicit declaration of function`); in legacy C89, it assumed an implicit return type of `int`.",
    explanation: "Always provide function prototypes before `main()` or in header files (`.h`).",
    hint: "Implicit declaration error in modern C.",
    level: "intermediate"
  },
  {
    question: "What is the anatomy of a C Function Signature?",
    shortAnswer: "`return_type function_name(parameter_type param1, parameter_type param2, ...)`",
    explanation: "Specifies return data type (`int`, `double`, `void`, pointer), identifier name, and formal parameter list.",
    hint: "return_type name(parameter_list)",
    level: "basic"
  },
  {
    question: "What is a `void` return type in C?",
    shortAnswer: "A return type indicating that the function does not return any value back to the caller.",
    explanation: "Used for action-oriented routines like printing banners, rendering graphics, or logging messages.",
    hint: "Returns nothing.",
    level: "basic",
    codeExample: "void printGreeting(const char *name) {\n    printf(\"Welcome, %s!\\n\", name);\n}"
  },
  {
    question: "What is the difference between Formal Parameters and Actual Arguments?",
    shortAnswer: "- Formal Parameters: Variable placeholders declared in the function definition/signature.\n- Actual Arguments: Real values, variables, or expressions passed into the function at invocation time.",
    explanation: "In `int sum(int x, int y)`, `x` and `y` are formal parameters; in `sum(10, 20)`, `10` and `20` are actual arguments.",
    hint: "Definition variables vs caller values.",
    level: "basic"
  },
  {
    question: "What does the `return` statement do in a C function?",
    shortAnswer: "It immediately terminates execution of the active function, passes the computed result back to the caller, and transfers CPU control back to the call site.",
    explanation: "Any code written after a `return` statement in the same execution branch becomes unreachable dead code.",
    hint: "Yields value and terminates function execution.",
    level: "basic"
  },
  {
    question: "Can a function have multiple `return` statements?",
    shortAnswer: "Yes! A function can have multiple `return` statements across different conditional branches (such as guard clauses or `if-else` trees).",
    explanation: "Execution exits as soon as the first matching `return` statement is encountered.",
    hint: "Multiple returns across conditional branches.",
    level: "basic",
    codeExample: "int getAbsolute(int n) {\n    if (n < 0) return -n;\n    return n;\n}"
  },
  {
    question: "What is a Stack Frame (Activation Record)?",
    shortAnswer: "A block of memory pushed onto the CPU Call Stack whenever a function is called, containing local variables, parameters, saved registers, and the return instruction address.",
    explanation: "When the function returns, its stack frame is popped, reclaiming its memory automatically.",
    hint: "Memory chunk allocated on call stack for function execution.",
    level: "intermediate"
  },
  {
    question: "What is the significance of `void` in `int main(void)` vs `int main()` in C?",
    shortAnswer: "In C, `(void)` explicitly states that the function accepts zero arguments; empty parentheses `()` in C means the function can take an unverified, unspecified number of arguments!",
    explanation: "Always use `int main(void)` or `int main(int argc, char *argv[])` for strict type safety in ANSI C.",
    hint: "Explicit zero arguments vs unspecified arguments.",
    level: "intermediate"
  },
  {
    question: "How do you declare a function that takes no arguments?",
    shortAnswer: "`return_type function_name(void);`",
    explanation: "The `void` keyword inside parameter parentheses enforces zero parameters.",
    hint: "Use (void) in parameter list.",
    level: "basic"
  },
  {
    question: "What is Function Inlining (`inline` keyword in C99)?",
    shortAnswer: "A hint to the compiler to replace function calls directly with the function's body code, eliminating function call overhead (stack frame push/pop) for small, performance-critical routines.",
    explanation: "Trades a slight increase in binary code size for faster execution speed.",
    hint: "Replaces call site with body to eliminate overhead.",
    level: "intermediate",
    codeExample: "inline int square(int x) {\n    return x * x;\n}"
  },
  {
    question: "What is Dead Code / Unreachable Code in a function?",
    shortAnswer: "Statements placed immediately after an unconditional `return`, `exit()`, or infinite loop that will never be executed by the CPU.",
    explanation: "Compilers with `-Wunreachable-code` or `-Wall` flag warnings for unreachable statements.",
    hint: "Statements that can never be executed.",
    level: "basic"
  },
  {
    question: "Can a function in C return multiple values directly via `return`?",
    shortAnswer: "No, a C function can only return a single value via `return`; however, it can return multiple values by returning a `struct` or by accepting pointer out-parameters.",
    explanation: "Pass memory addresses (`&var1, &var2`) to populate multiple outputs.",
    hint: "Single return value; use pointers or structs for multiple.",
    level: "intermediate"
  },
  {
    question: "What is a Predicate Function in C?",
    shortAnswer: "A function that returns a boolean condition (`bool`, `1` for true, `0` for false) to test whether input values satisfy a specific property (e.g. `isPrime(n)`, `isEven(n)`).",
    explanation: "Used extensively inside `if` conditions and loop invariants.",
    hint: "Boolean testing function.",
    level: "basic"
  },
  {
    question: "Why should parameter names in function prototypes match those in the definition?",
    shortAnswer: "While the compiler only requires data types in prototypes (e.g. `double calculate(double, double);`), matching descriptive parameter names enhances code readability and developer documentation.",
    explanation: "Named parameters make header files self-documenting for API consumers.",
    hint: "Enhances self-documenting code clarity.",
    level: "basic"
  },
  {
    question: "What is a Variadic Function in C?",
    shortAnswer: "A function that accepts a variable number of arguments (e.g. `printf(const char *format, ...)`), managed using `<stdarg.h>` (`va_list`, `va_start`, `va_arg`, `va_end`).",
    explanation: "Allows passing an arbitrary number of parameters based on a format string or count argument.",
    hint: "Functions with ellipsis (...) like printf.",
    level: "advanced"
  },
  {
    question: "What is the Return Address in a call stack frame?",
    shortAnswer: "The memory address of the next machine instruction in the caller function that the CPU must jump back to after the callee function finishes executing.",
    explanation: "Pushed to stack before jumping to function address; popped into CPU program counter (`PC`) on `return`.",
    hint: "Instruction pointer where caller resumes.",
    level: "intermediate"
  },
  {
    question: "What is the 'Single Responsibility Principle' (SRP) in modular C design?",
    shortAnswer: "A design rule stating that each function should do exactly one well-defined job, and do it completely and reliably.",
    explanation: "Functions that attempt to read input, calculate taxes, print reports, and send network packets all in one are unmaintainable.",
    hint: "Each function performs exactly one specific task.",
    level: "basic"
  },
  {
    question: "What is the difference between a Library Function and a User-Defined Function?",
    shortAnswer: "- Library Functions: Pre-compiled, standardized routines provided by the C Standard Library (e.g. `printf`, `sqrt`, `strlen`).\n- User-Defined Functions: Custom routines written by the programmer to solve domain-specific problems.",
    explanation: "Library headers provide standard prototypes, while linkers bind pre-compiled implementations.",
    hint: "Standard C library vs custom programmer functions.",
    level: "basic"
  },
  {
    question: "What happens if a non-void function reaches the end of its body without a `return` statement?",
    shortAnswer: "It invokes Undefined Behavior (UB); the caller receives random garbage leftover in the CPU return register (`EAX`/`RAX`).",
    explanation: "Exception: `main()` in C99+ implicitly returns 0 if reaching the closing brace.",
    hint: "Undefined behavior yielding garbage return values.",
    level: "intermediate"
  },
  {
    question: "What is the role of Header Files (`.h`) in modular C programming?",
    shortAnswer: "Header files contain shared function prototypes, macro constants, typedefs, and struct declarations, allowing multiple `.c` implementation files to share interfaces safely.",
    explanation: "Included via `#include \"my_module.h\"`.",
    hint: "Interface contract files containing declarations.",
    level: "intermediate"
  },
  {
    question: "What is Forward Declaration in C?",
    shortAnswer: "Declaring a function or type signature before its complete definition to allow calling code or recursive mutual calls to compile without errors.",
    explanation: "Crucial when two functions call each other mutually (`A()` calls `B()` and `B()` calls `A()`).",
    hint: "Declaring function ahead of time for mutual recursion.",
    level: "intermediate"
  },
  {
    question: "What is the maximum number of arguments a function in C can accept?",
    shortAnswer: "The C99 standard mandates that compilers must support at least 127 arguments in a single function call, though good software design rarely exceeds 4 to 6 arguments.",
    explanation: "If a function needs more than 5 arguments, bundle them into a meaningful `struct`.",
    hint: "At least 127 by C99 standard; keep under 5 in practice.",
    level: "intermediate"
  },
  {
    question: "Why does Sukanta Hui teach the 'Recipe vs Cooking' analogy for functions?",
    shortAnswer: "A function prototype is like the recipe card index (name, ingredients, cooking time), the function definition is the actual cooking instructions, and function invocation is serving the cooked dish!",
    explanation: "Provides instant intuition for beginners distinguishing declarations, definitions, and function calls.",
    hint: "Recipe index, cooking instructions, serving the meal.",
    level: "basic"
  }
];

export default questions;
