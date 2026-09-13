export const topic6Questions = [
  {
    question: "What components constitute an industrial-grade macro metaprogramming diagnostic framework in C?",
    answer: "A complete framework combines: 1) Multi-level variadic logging, 2) Compile-time log level gating, 3) Source location metadata injection (__FILE__, __LINE__, __func__), 4) Custom panic assertions with stringized condition dumps, and 5) Performance execution timing blocks."
  },
  {
    question: "Why is the ARRAY_SIZE(arr) macro (sizeof(arr)/sizeof(arr[0])) safe for stack arrays but dangerous for pointer parameters?",
    answer: "For arrays declared in local scope, sizeof(arr) evaluates to the total array byte size. But when an array is passed to a function, it decays to a pointer, so sizeof(arr) evaluates to 8 bytes (the pointer size), producing an erroneous element count."
  },
  {
    question: "How does the TIME_BLOCK macro measure code execution without polluting the surrounding scope?",
    answer: "By wrapping timing variables (start_##name, end_##name) in a 'do { ... } while (0)' block, the timer variables remain strictly local to that block and never collide with other timers."
  },
  {
    question: "What is the advantage of using compile-time log level filtering over runtime boolean checks?",
    answer: "Compile-time filtering via '#if ACTIVE_LOG_LEVEL <= LOG_LVL_DEBUG' completely removes debug log strings and formatting calls from the final compiled binary, achieving zero binary bloat and maximum runtime performance."
  },
  {
    question: "How does the PANIC_ASSERT macro assist in debugging complex systems?",
    answer: "It prints the exact failed expression using the '#' stringizing operator, alongside the source file, line number, calling function, and build timestamp, giving developers instant root-cause analysis."
  },
  {
    question: "Why should timing macros use volatile variables when benchmarking compute loops?",
    answer: "Without 'volatile', an optimizing compiler (-O3) might optimize away computations whose results are unused, resulting in misleading zero-millisecond benchmark results."
  },
  {
    question: "What is the role of clock() and CLOCKS_PER_SEC from <time.h>?",
    answer: "clock() returns the processor CPU time used by the program. Dividing the difference by CLOCKS_PER_SEC and multiplying by 1000.0 gives the elapsed CPU time in milliseconds."
  },
  {
    question: "How do you disable all diagnostic assertions in release builds with standard C conventions?",
    answer: "Pass -DNDEBUG to the compiler, which causes assertion macros to expand into ((void)0)."
  },
  {
    question: "Can macro suites be packaged into a single reusable header file (e.g. 'diagnostics.h')?",
    answer: "Yes, by wrapping the macros with #ifndef DIAGNOSTICS_H include guards, the suite can be dropped into any C project for instant telemetry capabilities."
  },
  {
    question: "Why are variadic macros (##__VA_ARGS__) essential for modern logging frameworks?",
    answer: "They permit passing printf-style format strings with zero, one, or multiple arguments seamlessly (e.g. LOG_I(\"Ready\"); vs LOG_I(\"Code: %d, Rate: %.2f\", code, rate);)."
  },
  {
    question: "What happens if a logging macro is called billions of times in an inner loop?",
    answer: "Even with stdout buffering, excessive I/O system calls degrade throughput. Industrial systems use compile-time level gating to strip verbose debug logs from production loops."
  },
  {
    question: "How can you implement colored ANSI terminal output in logging macros?",
    answer: "Include ANSI escape sequences in the level string: \"\\033[32mINFO\\033[0m\" for green, \"\\033[31mERROR\\033[0m\" for red, and \"\\033[33mWARN\\033[0m\" for yellow."
  },
  {
    question: "What is a 'Static Assert' (Compile-Time Assertion) in C11?",
    answer: "_Static_assert(constant_expression, \"message\"); evaluates an assertion during compilation. If the condition is false, compilation fails with the custom error message."
  },
  {
    question: "How can macros implement compile-time assertions before C11?",
    answer: "By creating an array with negative size on failure: #define STATIC_ASSERT(cond) typedef char static_assert_failed[(cond) ? 1 : -1]; Compilers reject arrays of negative length during semantic analysis."
  },
  {
    question: "How do you prevent macro name collisions when building a public library?",
    answer: "Prefix all macro identifiers with a unique library namespace, e.g. MYLIB_LOG_INFO instead of just LOG_INFO."
  },
  {
    question: "Why should logging macros output to stderr for WARN and ERROR, but stdout for INFO?",
    answer: "Because stdout can be redirected to data pipelines or output files (e.g., ./app > output.csv) while errors and warnings remain visible on the operator console via stderr."
  },
  {
    question: "Can a macro measure memory consumption of a dynamic allocation?",
    answer: "Yes, by defining #define MY_MALLOC(size) (track_alloc(size, __FILE__, __LINE__), malloc(size)) to intercept and log allocations."
  },
  {
    question: "What is the 'typeof' / '__typeof__' keyword and how does it make macros generic in GCC?",
    answer: "It allows inspecting the data type of an expression at compile-time to declare temporary variables matching the argument type: __typeof__(a) temp = (a);"
  },
  {
    question: "How do you ensure logging macros are thread-safe in multi-threaded applications?",
    answer: "Wrap the logging dispatch in a mutex lock/unlock block, or use atomic append operations on thread-safe lock-free ring buffers."
  },
  {
    question: "What is a 'Crash Dump Handler' and how does it relate to PANIC_ASSERT?",
    answer: "When PANIC_ASSERT fails, it can invoke a crash handler to write stack traces, open file handles, and core memory dumps to disk before calling abort()."
  },
  {
    question: "How does the Linux kernel define the famous 'container_of' macro?",
    answer: "#define container_of(ptr, type, member) ((type *)((char *)(ptr) - offsetof(type, member))) - allowing navigation from a struct member pointer back to the parent struct."
  },
  {
    question: "Why is 'offsetof' from <stddef.h> considered macro metaprogramming?",
    answer: "offsetof(struct_type, member) calculates the byte offset of a struct field at compile time by simulating a null pointer dereference: ((size_t)&(((type *)0)->member))."
  },
  {
    question: "How can macros generate automated test runner suites?",
    answer: "Using token concatenation to declare test functions (TEST_##name) and an X-Macro list to automatically invoke each test function sequentially in main()."
  },
  {
    question: "What is the performance overhead of PANIC_ASSERT in release builds?",
    answer: "When compiled with -DNDEBUG or gated by release macros, PANIC_ASSERT expands to nothing, incurring exactly 0.00% CPU overhead."
  },
  {
    question: "What makes C macro metaprogramming uniquely powerful compared to other compiled languages?",
    answer: "It gives developers direct control over the compilation pipeline to customize syntax, build zero-cost abstractions, inspect physical memory layouts, and craft hardware-optimized binaries without language runtime bloat."
  }
];
