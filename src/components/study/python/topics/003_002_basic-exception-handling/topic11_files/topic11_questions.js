// src/components/study/python/topics/003_002_basic-exception-handling/topic11_files/topic11_questions.js
// Comprehensive Master Review Questions for Topic 11: Debugging techniques & pdb breakpoints

const questions = [
  {
    question: "What is 'pdb' in Python?",
    shortAnswer: "The built-in Python interactive Source Code Debugger module, allowing developers to set breakpoints, step line-by-line, inspect stack frames, and evaluate variables at runtime.",
    explanation: "Standard library tool for inspecting runtime state without external IDE dependencies.",
    hint: "Python's standard built-in interactive source code debugger.",
    level: "basic",
    codeExample: "import pdb; pdb.set_trace()"
  },
  {
    question: "How do you set a breakpoint in modern Python (Python 3.7+)?",
    shortAnswer: "By calling the built-in 'breakpoint()' function, which automatically calls 'sys.breakpointhook()' (defaulting to 'pdb.set_trace()').",
    explanation: "Replaces the older 'import pdb; pdb.set_trace()' idiom.",
    hint: "Use the built-in breakpoint() function.",
    level: "basic",
    codeExample: "def compute():\n    breakpoint()  # Drops into PDB\n    return 42"
  },
  {
    question: "What is the difference between the PDB commands 'n' (next) and 's' (step into)?",
    shortAnswer: "'n' (next) executes the current line as a whole and stops at the next line in the current function; 's' (step) steps into any function call located on the current line.",
    explanation: "Use 'n' to step over helper functions and 's' to enter their bodies.",
    hint: "n steps over function calls; s steps inside called functions.",
    level: "basic",
    codeExample: "# Line: result = calculate(x)\n# 'n' executes calculate() and stops\n# 's' enters calculate() function body"
  },
  {
    question: "What do the PDB commands 'u' (up) and 'd' (down) do?",
    shortAnswer: "'u' (up) moves the current frame pointer one level UP the call stack (toward the caller); 'd' (down) moves one level DOWN (toward the callee).",
    explanation: "Allows inspecting variable state in outer caller scopes while paused in a helper function.",
    hint: "Navigates up and down the call stack frames.",
    level: "moderate",
    codeExample: "(Pdb) u  # Inspects caller's local variables\n(Pdb) d  # Returns to inner callee frame"
  },
  {
    question: "What does the PDB command 'w' (where) display?",
    shortAnswer: "It prints the entire call stack trace from the root script entry point down to the currently paused line, with an arrow indicating the active frame.",
    explanation: "Essential for understanding how execution arrived at the current breakpoint.",
    hint: "Prints the full call stack trace.",
    level: "basic",
    codeExample: "(Pdb) w\n# Shows complete stack frame hierarchy"
  },
  {
    question: "What is 'Post-Mortem Debugging' in Python?",
    shortAnswer: "The technique of inspecting the dying state, call stack, and local variables of an unhandled exception immediately after it crashes, using 'pdb.post_mortem()' or 'pdb.pm()'.",
    explanation: "Enables post-crash forensic autopsy without having to reproduce the bug.",
    hint: "Debugging the state of a program immediately after an unhandled exception crashes.",
    level: "moderate",
    codeExample: "import pdb, sys\ntry: risky_code()\nexcept: pdb.post_mortem(sys.exc_info()[2])"
  },
  {
    question: "How can you run any Python script directly inside PDB from the terminal command line?",
    shortAnswer: "By executing 'python -m pdb my_script.py'.",
    explanation: "Automatically pauses execution at the very first line of the script.",
    hint: "Use python -m pdb script.py.",
    level: "basic",
    codeExample: "python -m pdb manage.py runserver"
  },
  {
    question: "How can all 'breakpoint()' calls across an entire codebase be disabled in production without modifying code?",
    shortAnswer: "By setting the environment variable 'PYTHONBREAKPOINT=0' before running Python.",
    explanation: "Guarantees production services never hang waiting for interactive terminal input.",
    hint: "Set environment variable PYTHONBREAKPOINT=0.",
    level: "moderate",
    codeExample: "export PYTHONBREAKPOINT=0\npython main.py  # All breakpoints ignored!"
  },
  {
    question: "How can you plug in alternative debuggers (like ipdb, pudb, or web-pdb) using 'PYTHONBREAKPOINT'?",
    shortAnswer: "By setting 'PYTHONBREAKPOINT=ipdb.set_trace' or 'PYTHONBREAKPOINT=pudb.set_trace' in the environment.",
    explanation: "Customizes the global breakpoint handler dynamically.",
    hint: "Set PYTHONBREAKPOINT=<module>.<function>.",
    level: "complex",
    codeExample: "export PYTHONBREAKPOINT=ipdb.set_trace"
  },
  {
    question: "What is the difference between PDB commands 'p' and 'pp'?",
    shortAnswer: "'p <expr>' evaluates and prints an expression; 'pp <expr>' pretty-prints complex nested data structures (like large dictionaries and lists) using the 'pprint' module.",
    explanation: "Improves readability when inspecting large nested datasets.",
    hint: "p is standard print; pp is formatted pretty-print.",
    level: "basic",
    codeExample: "(Pdb) pp student_roster  # Cleanly formatted JSON-like view"
  },
  {
    question: "Why is the 'logging' module preferred over 'print()' statements for debugging in production systems?",
    shortAnswer: "Because logging provides standardized severity levels (DEBUG, INFO, WARNING, ERROR), timestamps, module names, thread IDs, log rotation, and the ability to disable debug logs globally without editing source files.",
    explanation: "print() statements pollute output, lack metadata, and cannot be filtered dynamically.",
    hint: "Logging provides levels, timestamps, rotation, and dynamic verbosity control.",
    level: "basic",
    codeExample: "logger.debug(f'Computed value: {x}')"
  },
  {
    question: "What are the 5 standard logging levels in Python in ascending order of severity?",
    shortAnswer: "1. DEBUG (10), 2. INFO (20), 3. WARNING (30), 4. ERROR (40), 5. CRITICAL (50).",
    explanation: "Standard hierarchy defined in the logging module.",
    hint: "DEBUG -> INFO -> WARNING -> ERROR -> CRITICAL.",
    level: "basic",
    codeExample: "logger.debug('lowest') -> logger.critical('highest')"
  },
  {
    question: "What does 'logger.exception(\"msg\")' do when called inside an 'except' block?",
    shortAnswer: "It automatically captures and logs the full exception traceback at the ERROR severity level along with the custom message.",
    explanation: "Shorthand for logger.error(msg, exc_info=True).",
    hint: "Logs the message and automatically attaches the full exception traceback.",
    level: "basic",
    codeExample: "except DatabaseError:\n    logger.exception('Database write failed')"
  },
  {
    question: "What does the PDB command 'c' (continue) do?",
    shortAnswer: "It resumes normal script execution until the next breakpoint is encountered or the program terminates.",
    explanation: "Exits step-by-step mode and lets the program run at full speed.",
    hint: "Resumes execution until the next breakpoint.",
    level: "basic",
    codeExample: "(Pdb) c  # Resumes execution"
  },
  {
    question: "How do you set a conditional breakpoint inside a PDB session?",
    shortAnswer: "Using the command 'b <line_number>, <condition>' (e.g. 'b 42, count > 1000').",
    explanation: "PDB will only pause execution on line 42 when count exceeds 1000.",
    hint: "Use 'b line, condition'.",
    level: "moderate",
    codeExample: "(Pdb) b 42, score < 40  # Pauses line 42 only on failing scores"
  },
  {
    question: "What does the PDB command 'l' (list) do?",
    shortAnswer: "Displays 11 lines of source code centered around the currently executing line (or continues listing subsequent lines if repeated).",
    explanation: "Provides instant source code context in terminal debugging sessions.",
    hint: "Lists lines of source code around current execution pointer.",
    level: "basic",
    codeExample: "(Pdb) l  # Shows source code window"
  },
  {
    question: "What happens if a variable in your code is named 'c' or 'n' when inside a PDB prompt?",
    shortAnswer: "Typing 'c' or 'n' will trigger the PDB commands (continue/next) rather than printing the variable; to inspect the variable, prefix it with 'p' (e.g. 'p c' or 'p n').",
    explanation: "PDB command names take precedence over bare variable names.",
    hint: "PDB commands shadow variable names; use 'p var' to inspect.",
    level: "moderate",
    codeExample: "(Pdb) p n  # Prints variable named 'n' rather than stepping"
  },
  {
    question: "How do you modify a variable's value dynamically while paused inside a PDB session?",
    shortAnswer: "By executing an assignment expression directly in the PDB prompt (e.g. 'x = 100' or '!x = 100').",
    explanation: "Allows testing live patches and exploring alternative branches interactively.",
    hint: "Assign the variable directly in the (Pdb) prompt: x = 100.",
    level: "moderate",
    codeExample: "(Pdb) fee_balance = 0.0  # Mutates variable live in memory"
  },
  {
    question: "What is the purpose of 'pdb.runcall(func, *args)'?",
    shortAnswer: "Executes a specified function under PDB supervision, pausing execution immediately at the function's entry point.",
    explanation: "Convenient for targeted debugging of isolated functions without editing source files.",
    hint: "Runs a function under PDB control starting at the first line.",
    level: "complex",
    codeExample: "import pdb; pdb.runcall(calculate_gpa, [85, 90])"
  },
  {
    question: "What is the 'Logging Configuration Dict' pattern ('logging.config.dictConfig')?",
    shortAnswer: "A standard declarative JSON/dict configuration format used in enterprise frameworks (Django, FastAPI) to configure loggers, handlers, formatters, and filters in a single central place.",
    explanation: "Separates logging configuration from application business logic.",
    hint: "Declarative dictionary configuration for loggers and handlers.",
    level: "moderate",
    codeExample: "logging.config.dictConfig(LOGGING_CONFIG)"
  },
  {
    question: "What does the PDB command 'unt' (until) do?",
    shortAnswer: "Continues execution until a line number greater than the current line is reached (useful for stepping completely through a loop without pausing on every iteration).",
    explanation: "Fast-forwards past repetitive loop bodies.",
    hint: "Runs until the loop finishes or a higher line number is reached.",
    level: "complex",
    codeExample: "(Pdb) unt  # Steps past current loop"
  },
  {
    question: "What does the PDB command 'r' (return) do?",
    shortAnswer: "Continues execution until the current function returns, pausing immediately at the return statement.",
    explanation: "Allows you to inspect the return value before exiting a function.",
    hint: "Executes until the current function returns.",
    level: "moderate",
    codeExample: "(Pdb) r  # Fast-forwards to function return"
  },
  {
    question: "Can PDB be used to debug multithreaded or multiprocessing applications?",
    shortAnswer: "Standard PDB operates on stdin/stdout and can freeze or get corrupted with multiple threads competing for terminal input; specialized debuggers (like 'rpdb' or 'web-pdb') or thread-safe logging are required for concurrent systems.",
    explanation: "Concurrent terminal I/O causes race conditions in standard PDB.",
    hint: "Standard PDB has terminal conflicts with threads; use logging or remote debuggers.",
    level: "complex",
    codeExample: "# Use structured logging for multithreaded systems"
  },
  {
    question: "What is the command to quit PDB immediately without finishing the script?",
    shortAnswer: "The 'q' (quit) command, which raises 'BdbQuit' to terminate the interpreter.",
    explanation: "Immediately stops the debugging session.",
    hint: "Type 'q' to quit.",
    level: "basic",
    codeExample: "(Pdb) q  # Terminates session"
  },
  {
    question: "What is the ultimate golden rule for debugging Python applications?",
    shortAnswer: "Use structured logging as the permanent foundation for production telemetry, leverage 'breakpoint()' with PDB commands ('n', 's', 'w', 'p') for interactive diagnosis, and use post-mortem 'pdb.pm()' to perform forensic root-cause analysis on unexpected crashes.",
    explanation: "Provides a complete, professional diagnostic toolkit for any Python system.",
    hint: "Use structured logging for production, breakpoint() for dev, and pdb.pm() for post-mortem analysis.",
    level: "basic",
    codeExample: "# Complete, professional Python debugging strategy"
  }
];

export default questions;
