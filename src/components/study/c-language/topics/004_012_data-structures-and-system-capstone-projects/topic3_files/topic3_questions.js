export const topic3Questions = [
  {
    question: "What do 'argc' and 'argv' represent in the main function signature?",
    answer: "'argc' (Argument Count) is an integer representing the total number of command-line arguments passed to the program (including the program name). 'argv' (Argument Vector) is an array of null-terminated character strings (char *argv[]) containing the individual arguments."
  },
  {
    question: "What is guaranteed to be stored in argv[0]?",
    answer: "argv[0] holds the program invocation name or file path used to execute the binary."
  },
  {
    question: "What is guaranteed to be stored in argv[argc] in standard C?",
    answer: "The ANSI C standard guarantees that argv[argc] is always a NULL pointer."
  },
  {
    question: "How do you convert numerical string arguments (e.g. \"42\" or \"3.14\") into numbers?",
    answer: "Use strtol() for integers (e.g. long val = strtol(argv[i], &endptr, 10)) or strtod() for floating-point numbers. Avoid atoi() because it cannot detect parse errors or integer overflow."
  },
  {
    question: "What is the third optional parameter 'char *envp[]' in main?",
    answer: "A null-terminated array of strings containing the operating system's environment variables (e.g. \"PATH=...\", \"USER=...\"). In standard C, getenv() from <stdlib.h> is preferred for cross-platform access."
  },
  {
    question: "How does POSIX getopt() parse command-line options?",
    answer: "getopt(argc, argv, \"i:o:vh\") iterates through short flags ('-i', '-v'). Options followed by a colon (e.g. 'i:') require a following argument stored in the global 'optarg' pointer."
  },
  {
    question: "What is the difference between short options (e.g. '-v') and GNU long options (e.g. '--verbose')?",
    answer: "Short options are single-character flags prefixed with a single hyphen. GNU long options are full-word flags prefixed with two hyphens, parsed in POSIX via getopt_long()."
  },
  {
    question: "How do you handle argument flags that appear multiple times (e.g. -v -v -v)?",
    answer: "Increment a verbosity counter (e.g., verbosityLevel++) on each occurrence in the parsing loop."
  },
  {
    question: "What happens if a required option (like -i) is missing from the command line?",
    answer: "The parser should output a clear error message to stderr, display the usage help manual (printUsage()), and terminate with exit(EXIT_FAILURE) (or return 1)."
  },
  {
    question: "Can command-line arguments contain spaces?",
    answer: "Yes, if the user encloses the argument in double or single quotes in the shell (e.g. ./app -i \"My Documents/data.csv\"). The shell strips the quotes and passes the string as a single argv element."
  },
  {
    question: "What is the return value of main() and what do exit codes 0 vs non-zero indicate?",
    answer: "Returning 0 (or EXIT_SUCCESS) indicates successful execution to the operating system/shell. Returning non-zero (or EXIT_FAILURE) signals that an error occurred."
  },
  {
    question: "How can you pass wildcard patterns (e.g. *.txt) to a C program?",
    answer: "On POSIX/Linux, the shell expands wildcards before invoking the program, passing all matching filenames as separate argv elements. On Windows cmd.exe, the program receives \"*.txt\" and must expand it manually."
  },
  {
    question: "What is optind in POSIX getopt?",
    answer: "optind is the global index of the next element in argv to be processed. Once all flags are parsed, non-option positional arguments start at argv[optind]."
  },
  {
    question: "Why should you never modify string literals pointed to by argv without copying?",
    answer: "While argv strings are stored in modifiable process memory, modifying them in place alters the strings seen by system process listing tools (like 'ps' on Linux)."
  },
  {
    question: "How do you implement a '--' delimiter in command-line tools?",
    answer: "A standalone '--' argument signals the end of options; all subsequent arguments are treated as raw positional arguments, even if they start with a hyphen."
  },
  {
    question: "How do you safely validate integer arguments against overflow?",
    answer: "Use strtol(), check errno != ERANGE, verify endptr != argv[i], and ensure *endptr == '\\0'."
  },
  {
    question: "Can argc ever be zero?",
    answer: "In rare freestanding environments or malicious execve() calls, argc can theoretically be 0 with argv[0] == NULL. Robust code checks 'if (argc > 0)' before accessing argv[0]."
  },
  {
    question: "How do you parse flag combinations like '-xvf' in C?",
    answer: "Iterate through each character in the string argv[i] starting at index 1: for (int c=1; argv[i][c]; c++) switch (argv[i][c]) { ... }"
  },
  {
    question: "What is the maximum length of command-line arguments supported by modern operating systems?",
    answer: "POSIX systems define ARG_MAX (often 2 MB to 20 MB). Windows CreateProcess() supports up to 32,767 characters."
  },
  {
    question: "How do you print the full list of arguments for debugging?",
    answer: "for (int i = 0; i < argc; i++) printf(\"argv[%d] = %s\\n\", i, argv[i]);"
  },
  {
    question: "What is the difference between char **argv and char *argv[] in main signature?",
    answer: "They are completely identical in C; array parameter declarations in function signatures automatically decay into pointers."
  },
  {
    question: "How do shell scripts inspect the exit status of a C program?",
    answer: "In Bash, by inspecting '$?'; in Windows Batch/PowerShell, by inspecting '%ERRORLEVEL%' or '$LASTEXITCODE'."
  },
  {
    question: "How does getenv() work in <stdlib.h>?",
    answer: "char *val = getenv(\"HOME\"); returns a pointer to the environment variable's value string, or NULL if the variable is not set."
  },
  {
    question: "Why is a help flag (-h / --help) mandatory in professional CLI utilities?",
    answer: "It provides self-documenting interface guidance, allowing users to discover command flags without external documentation."
  },
  {
    question: "How do CLI utilities support reading from stdin when no input file is supplied?",
    answer: "If inputFileName is NULL or \"-\", the program opens stdin directly as its input stream."
  }
];
