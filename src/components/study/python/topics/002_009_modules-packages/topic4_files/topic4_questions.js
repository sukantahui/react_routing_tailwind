// src/components/study/python/topics/002_009_modules-packages/topic4_files/topic4_questions.js
// Comprehensive Master Review Questions for Topic 4: The __name__ == '__main__' idiom explained with practical use cases

const questions = [
  {
    question: "What is the primary purpose of the 'if __name__ == \"__main__\":' idiom in Python?",
    shortAnswer: "It allows a Python file to distinguish between being executed directly as a standalone script versus being imported as a module into another program.",
    explanation: "Code inside the block runs ONLY when the script is directly executed from the terminal, preventing unintended side effects upon import.",
    hint: "Differentiates direct execution from module imports.",
    level: "basic",
    codeExample: "if __name__ == '__main__':\n    print('Executed directly from terminal!')"
  },
  {
    question: "What is the exact string value of __name__ when a Python file is run directly vs when it is imported?",
    shortAnswer: "When run directly: '__main__'; When imported: the module's actual name string (e.g. 'fee_calculator').",
    explanation: "CPython dynamically sets the special variable __name__ in the module's global namespace before executing the file.",
    hint: "'__main__' when run directly; 'module_name' when imported.",
    level: "basic",
    codeExample: "# Directly: python app.py -> __name__ is '__main__'\n# Imported: import app    -> __name__ is 'app'"
  },
  {
    question: "What happens if a module has top-level print statements or calculations outside of 'if __name__ == \"__main__\":'?",
    shortAnswer: "Those statements execute immediately whenever any other script imports that module, polluting the console output and wasting CPU cycles.",
    explanation: "Importing a module executes all top-level statements. The execution guard prevents execution of demo, test, or CLI code.",
    hint: "Top-level code runs automatically during import.",
    level: "basic",
    codeExample: "# BAD:\nprint('Connecting to DB...')  # Runs on every import!\n# GOOD:\nif __name__ == '__main__':\n    print('Connecting to DB...')"
  },
  {
    question: "What is a 'Dual-Purpose Module' in Python software engineering?",
    shortAnswer: "A module that serves as an importable library providing functions/classes to other scripts AND as a runnable CLI tool when executed from the terminal.",
    explanation: "Functions remain clean and pure for web backends, while the 'if __name__ == \"__main__\":' block handles terminal arguments.",
    hint: "Functions as both an importable library and a CLI script.",
    level: "moderate",
    codeExample: "def convert(x): return x * 2\n\nif __name__ == '__main__':\n    import sys\n    print(convert(float(sys.argv[1])))"
  },
  {
    question: "Why is wrapping execution logic inside a 'def main():' function recommended instead of putting raw statements directly inside 'if __name__ == \"__main__\":'?",
    shortAnswer: "1. Keeps variables local instead of polluting the global namespace; 2. Allows other scripts or test suites to call main() programmatically.",
    explanation: "Variables declared directly inside an 'if' block become global module variables; defining 'def main():' encapsulates them locally.",
    hint: "Prevents global variable leaks and enables calling main() directly.",
    level: "moderate",
    codeExample: "def main():\n    temp_val = 100  # Local, not global!\n    print(temp_val)\n\nif __name__ == '__main__':\n    main()"
  },
  {
    question: "How can you use the main guard for embedded self-testing and unit test assertions?",
    shortAnswer: "Place 'assert' statements inside the block to verify core function outputs when the developer runs the file directly.",
    explanation: "This allows instant verification during development without requiring complex test runner setups.",
    hint: "Use assert statements inside the main block.",
    level: "basic",
    codeExample: "def add(a, b): return a + b\n\nif __name__ == '__main__':\n    assert add(2, 3) == 5, 'Math error'\n    print('All internal tests passed!')"
  },
  {
    question: "How can you use the main guard for algorithm performance micro-benchmarking?",
    shortAnswer: "Measure function execution time using time.perf_counter() inside the guard without imposing any performance overhead when imported.",
    explanation: "The benchmarking code is completely bypassed when the module is imported into production systems.",
    hint: "Use time.perf_counter() inside the guard.",
    level: "moderate",
    codeExample: "if __name__ == '__main__':\n    import time\n    t0 = time.perf_counter()\n    do_work()\n    print(f'Duration: {(time.perf_counter()-t0)*1000:.2f} ms')"
  },
  {
    question: "Can an imported module access its own __name__ variable?",
    shortAnswer: "Yes. Inside the module's functions or top-level code, __name__ evaluates to the module's string name.",
    explanation: "This is commonly used in logging: logger = logging.getLogger(__name__).",
    hint: "Useful for logging: getLogger(__name__).",
    level: "basic",
    codeExample: "import logging\nlogger = logging.getLogger(__name__)"
  },
  {
    question: "What is the difference between running a script as 'python script.py' vs 'python -m script'?",
    shortAnswer: "'python script.py' sets sys.path[0] to the script's directory; 'python -m script' searches sys.path for the module and sets __name__ to '__main__'.",
    explanation: "'python -m' allows executing modules inside packages correctly with relative imports.",
    hint: "'python -m' runs a module within package context.",
    level: "moderate",
    codeExample: "# Terminal: python -m my_package.service"
  },
  {
    question: "What happens if you import a file that contains 'if __name__ == \"__main__\":' from another script?",
    shortAnswer: "The condition evaluates to False (since __name__ != '__main__'), and the entire block is skipped completely.",
    explanation: "Only the functions, classes, and top-level definitions in the module are loaded into memory.",
    hint: "The block is completely skipped on import.",
    level: "basic",
    codeExample: "# Importing skips the guard block automatically"
  },
  {
    question: "Why does omitting the main guard break multiprocessing on Windows?",
    shortAnswer: "On Windows, multiprocessing creates new child processes by re-importing the main script; without the guard, child processes create recursive infinite child process loops!",
    explanation: "On Windows (which uses spawn instead of fork), every child process executes the script from line 1. The guard prevents child processes from spawning infinite children.",
    hint: "Prevents infinite process spawning on Windows.",
    level: "complex",
    codeExample: "import multiprocessing\n\ndef worker(): print('Working')\n\nif __name__ == '__main__':\n    p = multiprocessing.Process(target=worker)\n    p.start()"
  },
  {
    question: "How do you parse command-line flags inside a main guard using the standard library?",
    shortAnswer: "Use sys.argv for simple arguments or argparse.ArgumentParser() for robust CLI flags and help menus.",
    explanation: "The argparse module builds automated --help flags, type conversions, and argument validation.",
    hint: "Use sys.argv or argparse.ArgumentParser.",
    level: "moderate",
    codeExample: "import argparse\n\ndef main():\n    parser = argparse.ArgumentParser()\n    parser.add_argument('--port', type=int, default=8000)\n    args = parser.parse_args()\n    print(f'Starting server on port {args.port}')\n\nif __name__ == '__main__':\n    main()"
  },
  {
    question: "Can a module have multiple 'if __name__ == \"__main__\":' blocks?",
    shortAnswer: "Yes, Python allows it, but it is considered poor style. Standard practice is to have exactly one guard at the bottom of the file.",
    explanation: "Having a single entry point at the end of the file maintains code clarity.",
    hint: "Allowed but bad practice; use one at the bottom.",
    level: "basic",
    codeExample: "# Best practice: single guard at the bottom calling main()"
  },
  {
    question: "How does the Python REPL / interactive shell set __name__?",
    shortAnswer: "In the interactive shell / IDLE, __name__ is set to '__main__'.",
    explanation: "Interactive REPL sessions operate as the main top-level execution scope.",
    hint: "__name__ is '__main__' in REPL.",
    level: "basic",
    codeExample: ">>> __name__\n'__main__'"
  },
  {
    question: "What is the return value of a script when main() finishes without calling sys.exit()?",
    shortAnswer: "Python exits with status code 0 (success) by default.",
    explanation: "If an unhandled exception occurs, Python exits with status code 1.",
    hint: "Defaults to exit code 0.",
    level: "basic",
    codeExample: "# Clean termination exits with code 0"
  },
  {
    question: "How do you pass a custom exit status code from main() to the operating system?",
    shortAnswer: "sys.exit(main()) where main() returns an integer (0 for success, 1+ for errors).",
    explanation: "This allows bash/PowerShell scripts to check the return code ($? on Linux, $LASTEXITCODE on PowerShell).",
    hint: "Use sys.exit(main()).",
    level: "moderate",
    codeExample: "import sys\ndef main() -> int:\n    return 0  # Success\n\nif __name__ == '__main__':\n    sys.exit(main())"
  },
  {
    question: "Why should functions inside a library module return values instead of calling print()?",
    shortAnswer: "Returning values makes functions composable, testable, and reusable by web APIs, GUI apps, and other modules without unwanted console output.",
    explanation: "Console printing should be isolated to the presentation layer or the CLI main guard.",
    hint: "Return values for reusability; reserve print() for CLI.",
    level: "basic",
    codeExample: "# GOOD: def calculate(x): return x * 1.18\n# BAD:  def calculate(x): print(x * 1.18)"
  },
  {
    question: "What happens if you put import statements inside the 'if __name__ == \"__main__\":' block?",
    shortAnswer: "Those modules are imported ONLY when the script is run directly, saving import time when the module is imported as a library.",
    explanation: "This is a great technique for CLI-only dependencies (like argparse, colorama, or benchmark tools).",
    hint: "Imports execute only during direct script execution.",
    level: "moderate",
    codeExample: "if __name__ == '__main__':\n    import argparse  # Loaded only when run as CLI!"
  },
  {
    question: "How do you test the CLI functionality of a module from within a Python test runner like pytest?",
    shortAnswer: "Use subprocess.run(['python', 'my_module.py', 'arg1'], capture_output=True, text=True).",
    explanation: "subprocess runs the module in a fresh process where __name__ == '__main__', capturing stdout and exit codes.",
    hint: "Use subprocess.run() to test CLI execution.",
    level: "complex",
    codeExample: "import subprocess\nres = subprocess.run(['python', 'app.py', '100'], capture_output=True, text=True)\nassert 'INR 200' in res.stdout"
  },
  {
    question: "Is '__main__' a built-in module in Python?",
    shortAnswer: "Yes, sys.modules['__main__'] exists and represents the top-level script environment.",
    explanation: "You can inspect attributes of the running script via sys.modules['__main__'].",
    hint: "sys.modules['__main__'] holds the top-level environment.",
    level: "complex",
    codeExample: "import sys\nprint(sys.modules['__main__'])"
  },
  {
    question: "What is the standard naming convention for the entry point function called by the main guard?",
    shortAnswer: "def main(): or def cli():",
    explanation: "Standard naming makes the code immediately understandable to any Python developer.",
    hint: "def main():",
    level: "basic",
    codeExample: "def main(): pass\nif __name__ == '__main__': main()"
  },
  {
    question: "What error occurs if you write 'if __name__ = '__main__':' with a single equals sign?",
    shortAnswer: "SyntaxError: invalid syntax (assignment inside if statement is invalid; use == for equality comparison).",
    explanation: "Comparison requires double equals '=='.",
    hint: "Use '==' for comparison, not '='.",
    level: "basic",
    codeExample: "# SyntaxError: if __name__ = '__main__':"
  },
  {
    question: "How do you run a package's __main__.py file from the terminal?",
    shortAnswer: "python -m package_name",
    explanation: "When you execute a directory or zip archive with -m, Python looks for and executes its __main__.py file.",
    hint: "python -m package_name runs __main__.py.",
    level: "moderate",
    codeExample: "# Inside my_package/__main__.py:\n# Executed via: python -m my_package"
  },
  {
    question: "Can you pass keyword arguments via sys.argv in the command line?",
    shortAnswer: "sys.argv only provides raw string tokens; parsing keyword flags like '--rate=0.18' requires manual splitting or argparse.",
    explanation: "sys.argv is a raw list of strings ['--rate=0.18']; argparse parses it into args.rate = 0.18.",
    hint: "sys.argv is raw strings; use argparse for flags.",
    level: "basic",
    codeExample: "import sys\n# sys.argv is a raw list of string tokens"
  },
  {
    question: "Why is 'if __name__ == \"__main__\":' considered a hallmark of professional Python code quality?",
    shortAnswer: "It guarantees that files are modular, safely testable, reusable across frameworks, and free of unintended execution side effects.",
    explanation: "Code written with main guards can be effortlessly integrated into larger applications without rewriting.",
    hint: "Guarantees modularity, reusability, and safe imports.",
    level: "basic",
    codeExample: "# Essential standard across all professional Python codebases"
  }
];

export default questions;
