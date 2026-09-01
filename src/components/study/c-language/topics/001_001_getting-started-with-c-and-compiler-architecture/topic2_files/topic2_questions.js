const questions = [
  {
    question: "What are the four sequential stages of the GCC compilation pipeline?",
    shortAnswer: "1. Preprocessing, 2. Compilation, 3. Assembly, 4. Linking.",
    explanation: "GCC passes source code through four tools: the Preprocessor (cpp) expands macros and headers; the Compiler (cc1) translates C into assembly; the Assembler (as) generates relocatable machine object code; and the Linker (ld) combines object files into an executable binary.",
    hint: ".c -> .i -> .s -> .o -> executable binary.",
    level: "basic"
  },
  {
    question: "What command stops GCC execution after the Preprocessing phase?",
    shortAnswer: "gcc -E main.c -o main.i",
    explanation: "The -E flag instructs GCC to run only the preprocessor and save the resulting expanded text stream to main.i.",
    hint: "gcc -E outputs preprocessed text file.",
    level: "basic"
  },
  {
    question: "What command stops GCC execution after the Compilation (Assembly generation) phase?",
    shortAnswer: "gcc -S main.c -o main.s",
    explanation: "The -S flag stops compilation after producing human-readable assembly language instructions for the target CPU architecture in main.s.",
    hint: "gcc -S outputs assembly file (.s).",
    level: "intermediate"
  },
  {
    question: "What command stops GCC execution after the Assembly phase?",
    shortAnswer: "gcc -c main.c -o main.o",
    explanation: "The -c flag compiles and assembles source files into binary relocatable object files (.o) without running the linker.",
    hint: "gcc -c outputs object file (.o).",
    level: "basic"
  },
  {
    question: "What is a relocatable object file (.o / .obj)?",
    shortAnswer: "A binary file containing machine language CPU instructions with unresolved external symbol references.",
    explanation: "An object file contains valid binary opcodes for functions defined in that specific source file, but external calls (like printf) leave blank symbol slots for the linker to fill.",
    hint: "Object files contain machine code with unresolved symbol slots.",
    level: "intermediate"
  },
  {
    question: "What is the primary role of the Linker (ld) in C compilation?",
    shortAnswer: "To resolve external function symbol addresses and merge multiple object files and library archives into a final executable.",
    explanation: "The linker matches called function names with their actual address definitions across object files (.o) and C standard libraries (libc.a / libc.so).",
    hint: "Symbol address resolution and binary merging.",
    level: "intermediate"
  },
  {
    question: "What causes an 'undefined reference to main' linker error?",
    shortAnswer: "Compiling without defining an entry point main() function, or omitting the object file containing main() during linking.",
    explanation: "The C runtime startup code (crt0) looks for the global symbol name 'main'. If no object file provides 'main', the linker fails with an undefined reference error.",
    hint: "Linker cannot find main() function entry point.",
    level: "basic"
  },
  {
    question: "What is the difference between compiler warnings (-Wall -Wextra) and compiler errors?",
    shortAnswer: "Errors halt compilation immediately; warnings report potential logic defects while allowing compilation to complete.",
    explanation: "Errors mean invalid C syntax. Warnings highlight dangerous practices (such as uninitialized variables or format string mismatches) that could cause runtime crashes.",
    hint: "Errors stop build; warnings flag potential runtime bugs.",
    level: "basic"
  },
  {
    question: "What is the function of the -o flag in GCC?",
    shortAnswer: "It specifies the output filename for the generated file.",
    explanation: "Without -o, GCC defaults executable output names to 'a.out' on Linux/macOS or 'a.exe' on Windows. Passing -o app names the binary 'app'.",
    hint: "gcc main.c -o myprogram",
    level: "basic"
  },
  {
    question: "What is Symbol Decaying / Resolution during linking?",
    shortAnswer: "Connecting function call references in object files to their exact physical memory offsets in final binaries.",
    explanation: "When main.c calls calculateScore(), main.o places a dummy placeholder. The linker locates calculateScore() in scores.o and replaces the dummy with its actual relative offset.",
    hint: "Connecting call sites to function definition addresses.",
    level: "advanced"
  },
  {
    question: "What is static linking vs dynamic linking in GCC?",
    shortAnswer: "Static linking (-static) copies library code into executable; dynamic linking links shared .so/.dll files at launch.",
    explanation: "Static binaries are self-contained and run on systems without installed C runtime libraries, but produce larger binary file sizes.",
    hint: "Static copies library bytes; dynamic links shared library files at runtime.",
    level: "advanced"
  },
  {
    question: "What happens if you include a .c file directly using #include \"helper.c\"?",
    shortAnswer: "It includes raw C code into the preprocessor stream, causing duplicate symbol errors during linking if helper.c is also compiled separately.",
    explanation: "Headers (.h) should contain declarations only. Including implementation (.c) files leads to multiple definition linker errors.",
    hint: "Only include .h header files, never .c implementation files.",
    level: "intermediate"
  },
  {
    question: "What is the Symbol Table in object files?",
    shortAnswer: "A data structure mapping function and variable names to their memory offsets and linkage types.",
    explanation: "You can inspect symbol tables using the command line tool 'nm main.o' or 'objdump -t main.o'.",
    hint: "Use nm or objdump to view symbol tables.",
    level: "advanced"
  },
  {
    question: "How do compiler optimization flags (-O1, -O2, -O3, -Os) affect the compilation pipeline?",
    shortAnswer: "They instruct the compiler stage (cc1) to optimize generated assembly code for speed or size.",
    explanation: "-O2 enables loop unrolling and inline expansion; -O3 enables vectorization; -Os optimizes for smallest binary memory footprint.",
    hint: "Optimization flags run during the compiler phase.",
    level: "intermediate"
  },
  {
    question: "What is a header guard (#ifndef HEADER_H ... #endif) and why is it needed during preprocessing?",
    shortAnswer: "It prevents the preprocessor from inserting duplicate header content when a header is included multiple times.",
    explanation: "Without header guards, re-including a header file introduces duplicate struct definitions, causing compilation errors.",
    hint: "Prevents duplicate header inclusions.",
    level: "intermediate"
  },
  {
    question: "What does the -g flag in GCC do?",
    shortAnswer: "It generates DWARF debugging symbols inside the binary executable for tools like GDB.",
    explanation: "The -g flag keeps variable names and source code line mappings inside the output file so GDB can step through C code line by line.",
    hint: "gcc -g enables GDB source debugging.",
    level: "basic"
  },
  {
    question: "What is the C Runtime Startup Code (crt0.o / crt1.o)?",
    shortAnswer: "The system object file linked into every executable to initialize process memory before calling main().",
    explanation: "crt0 sets up process stack frames, initializes environment variables, passes command line argc/argv to main(), and calls exit() when main() returns.",
    hint: "Startup object file executing before main().",
    level: "expert"
  },
  {
    question: "What is the difference between #include <filename.h> and #include \"filename.h\"?",
    shortAnswer: "<> searches standard system directories; \"\" searches current working directory first.",
    explanation: "<stdio.h> searches GCC system headers directory (/usr/include). \"myheader.h\" checks local directory before system path.",
    hint: "Use quotes for project local headers.",
    level: "basic"
  },
  {
    question: "What tool can disassemble a C binary object file into assembly code?",
    shortAnswer: "objdump -d main.o or objdump -d app",
    explanation: "objdump parses ELF binary object files and displays machine opcodes alongside assembly language mnemonics.",
    hint: "objdump -d disassembles binary files.",
    level: "intermediate"
  },
  {
    question: "What is a Multiple Definition linker error?",
    shortAnswer: "Occurs when a global variable or function is defined with the same symbol name in more than one object file.",
    explanation: "Defining int total = 0; in a header included by two .c files causes both object files to export 'total', breaking linker uniqueness rules.",
    hint: "Declare global variables as extern in headers.",
    level: "intermediate"
  },
  {
    question: "What does the GCC flag -E output when applied to a source file containing #define macros?",
    shortAnswer: "It outputs source code with macro names replaced by their defined text expressions.",
    explanation: "Predefined macros like MULTIPLY(5, 120) expand into ((5) * (120)) directly in the text stream.",
    hint: "gcc -E displays expanded macros.",
    level: "basic"
  },
  {
    question: "What is the role of the C Standard Library (libc.so / libc.a)?",
    shortAnswer: "Provides pre-compiled binary object implementations for standard functions like printf, scanf, malloc, and free.",
    explanation: "GCC automatically links libc during the final linking stage unless -nostdlib is explicitly specified.",
    hint: "Contains implementations for standard C functions.",
    level: "intermediate"
  },
  {
    question: "How does GCC handle multi-file compilation: gcc main.c utils.c -o app?",
    shortAnswer: "GCC runs Preprocessing, Compilation, and Assembly on main.c and utils.c independently, then links main.o and utils.o together.",
    explanation: "Each .c file is compiled into an isolated object module (.o) before the final linker step merges them into one binary file.",
    hint: "Independent compilation per file followed by single link step.",
    level: "intermediate"
  },
  {
    question: "What is ELF (Executable and Linkable Format)?",
    shortAnswer: "The standard binary file format for executables, object code, and shared libraries on Linux/Unix systems.",
    explanation: "ELF files contain binary section headers (.text for instructions, .data for initialized variables, .bss for zero-initialized memory).",
    hint: "Standard Linux binary format.",
    level: "advanced"
  },
  {
    question: "Why is understanding the compiler pipeline important for debugging C applications?",
    shortAnswer: "It helps developers identify whether an error is a Preprocessor syntax error, Compiler type error, or Linker symbol error.",
    explanation: "Knowing pipeline stages allows developers to diagnose build failures rapidly (e.g. missing header vs missing library vs syntax error).",
    hint: "Distinguishes preprocessor, compiler, and linker errors.",
    level: "basic"
  }
];

export default questions;
