// src/components/study/python/topics/004_002_performance-optimization/topic2_files/topic2_questions.js
// Comprehensive Master Review Questions for Topic 2: Benchmarking code with timeit module

const questions = [
  {
    question: "What is the primary purpose of Python's built-in 'timeit' module?",
    shortAnswer: "To accurately measure the execution time of small code snippets and functions by repeating them thousands of times, isolating setup costs, and filtering out background OS interference.",
    explanation: "Standard library micro-benchmarking engine.",
    hint: "Measures execution time of small code snippets with high statistical accuracy.",
    level: "basic",
    codeExample: "import timeit\nt = timeit.timeit('\"-\".join(str(n) for n in range(100))', number=10000)"
  },
  {
    question: "Why should you NEVER use 'time.time()' for micro-benchmarking Python code?",
    shortAnswer: "'time.time()' has low clock resolution on some operating systems, includes unrelated background processes and CPU interrupts, and measures wall-clock time rather than isolated execution time.",
    explanation: "Clock resolution and OS context-switch noise.",
    hint: "Has low clock resolution and includes unrelated background OS processes.",
    level: "basic",
    codeExample: "# AVOID: t0 = time.time(); func(); dt = time.time() - t0"
  },
  {
    question: "What is the key difference between 'timeit.timeit()' and 'timeit.repeat()'?",
    shortAnswer: "'timeit.timeit()' runs the benchmark once for a specified 'number' of loops; 'timeit.repeat()' runs the entire multi-loop benchmark 'repeat' separate times and returns a list of results.",
    explanation: "Single pass vs multi-pass repetition.",
    hint: "timeit() runs once; repeat() runs multiple rounds to enable statistical filtering.",
    level: "basic",
    codeExample: "times = timeit.repeat(my_func, number=10000, repeat=5)"
  },
  {
    question: "Why is 'min(times)' the statistically correct metric to report from 'timeit.repeat()' rather than 'mean(times)'?",
    shortAnswer: "Because in a computer system, code cannot run faster than its optimal limit; any slower runs are caused by external OS noise (context switches, garbage collection pauses, disk/network interrupts), so the minimum represents the true execution cost.",
    explanation: "External interference filtering theory.",
    hint: "Any slower runs are caused by OS background interrupts, so the minimum is the true speed.",
    level: "complex",
    codeExample: "best_time = min(timeit.repeat(stmt, number=1000, repeat=5))"
  },
  {
    question: "How does the 'setup' parameter in 'timeit.timeit()' work?",
    shortAnswer: "The 'setup' statement is executed once before the timed loop begins, allowing you to import modules or instantiate test data without including that setup overhead in the measurement.",
    explanation: "Setup isolation in micro-benchmarks.",
    hint: "Executes once before timing begins to isolate import and data initialization costs.",
    level: "basic",
    codeExample: "timeit.timeit('math.sqrt(x)', setup='import math; x = 144', number=100000)"
  },
  {
    question: "How do you benchmark a Python function that requires arguments using 'timeit'?",
    shortAnswer: "By wrapping the function with 'functools.partial(func, arg1, arg2)' or using a zero-argument lambda: 'timeit.timeit(lambda: func(arg1), number=1000)'.",
    explanation: "Callable argument binding for timeit.",
    hint: "Use functools.partial or a lambda wrapper.",
    level: "basic",
    codeExample: "from functools import partial\nt = timeit.timeit(partial(my_func, 100), number=1000)"
  },
  {
    question: "Why is the dictionary literal '{}' faster than the 'dict()' constructor in Python?",
    shortAnswer: "'{}' compiles directly into a single CPython opcode ('BUILD_MAP'); 'dict()' requires a global namespace lookup ('LOAD_NAME') followed by a full Python function call frame ('CALL_FUNCTION').",
    explanation: "Bytecode opcode vs global name lookup overhead.",
    hint: "{} is a direct C opcode; dict() requires a global name lookup and function call.",
    level: "moderate",
    codeExample: "# {} -> BUILD_MAP (Fast)\n# dict() -> LOAD_NAME + CALL_FUNCTION (Slower)"
  },
  {
    question: "Why is a list comprehension faster than a standard 'for' loop with 'list.append()'?",
    shortAnswer: "List comprehensions run in optimized C bytecode ('LIST_APPEND') inside CPython without the overhead of looking up the '.append' attribute and creating Python method call frames on each iteration.",
    explanation: "C-level opcode loop execution.",
    hint: "Runs in optimized C loops, avoiding method lookup and function call overhead.",
    level: "basic",
    codeExample: "[x * 2 for x in data] # ~2x faster than for x in data: res.append(x * 2)"
  },
  {
    question: "Why are f-strings ('f\"{a} {b}\"') faster than '.format()' and '%' formatting?",
    shortAnswer: "f-strings are evaluated at runtime via dedicated C opcodes ('FORMAT_VALUE' and 'BUILD_STRING') rather than parsing a format specifier string during a function call.",
    explanation: "Inline C opcode string interpolation.",
    hint: "Compiled into dedicated FORMAT_VALUE bytecodes rather than runtime function parsing.",
    level: "basic",
    codeExample: "f'Hello {name}' # Faster than 'Hello {}'.format(name)"
  },
  {
    question: "Why is 'if not seq:' faster than 'if len(seq) == 0:' for checking emptiness?",
    shortAnswer: "'if not seq:' invokes the object's direct C truthiness protocol ('__bool__' or 'sq_length'); 'len(seq) == 0' requires looking up 'len', calling the function, and executing an integer comparison.",
    explanation: "Direct truthiness protocol vs function call and comparison.",
    hint: "Direct C truthiness check avoids function call and comparison overhead.",
    level: "basic",
    codeExample: "if not my_list: pass # Direct C truth protocol (Fastest)"
  },
  {
    question: "What does 'Timer.autorange()' do in the 'timeit' module?",
    shortAnswer: "It automatically scales the number of loop iterations (1, 2, 5, 10, 20, 50, 100...) until the total benchmark execution time reaches at least 0.2 seconds, returning '(number, total_time)'.",
    explanation: "Automatic loop count calibration.",
    hint: "Automatically increases loop counts until execution time reaches at least 0.2 seconds.",
    level: "moderate",
    codeExample: "number, time_taken = timeit.Timer('sum(range(100))').autorange()"
  },
  {
    question: "How do you run 'timeit' directly from your operating system terminal (CLI)?",
    shortAnswer: "Using the '-m timeit' flag with python: 'python -m timeit -s \"data = list(range(100))\" \"sum(data)\"'.",
    explanation: "Command-line timeit execution.",
    hint: "python -m timeit -s \"setup\" \"statement\"",
    level: "basic",
    codeExample: "# Terminal: python -m timeit -s \"import math\" \"math.sqrt(100)\""
  },
  {
    question: "How does 'timeit' handle Garbage Collection by default during benchmarks?",
    shortAnswer: "By default, 'timeit' temporarily disables Python's cyclic garbage collector to prevent arbitrary GC collection cycles from skewing microsecond measurements.",
    explanation: "Garbage collection suspension in micro-benchmarks.",
    hint: "Temporarily disables garbage collection to prevent timing spikes.",
    level: "complex",
    codeExample: "# timeit suspends gc by default (or gc.enable() in setup if desired)"
  },
  {
    question: "Why is '\"-\".join([str(i) for i in range(100)])' faster than using a generator expression inside 'join()'?",
    shortAnswer: "'str.join()' can pre-allocate the exact output buffer capacity when passed a list with known length; when passed a generator, it must dynamically resize the memory buffer as items arrive.",
    explanation: "Buffer pre-allocation in sequence joiners.",
    hint: "Lists allow join() to pre-allocate memory buffers upfront.",
    level: "complex",
    codeExample: "'-'.join([str(i) for i in range(100)]) # Faster than generator in join"
  },
  {
    question: "What is the difference between micro-benchmarking and macro-profiling?",
    shortAnswer: "Micro-benchmarking ('timeit') measures the isolated execution time of small statements/functions (nanoseconds/microseconds); Macro-profiling ('cProfile') measures an entire application's call tree.",
    explanation: "Granular micro-tests vs holistic application profiling.",
    hint: "Micro-benchmarking tests small functions; macro-profiling analyzes entire program call trees.",
    level: "basic",
    codeExample: "# timeit = micro-benchmark; cProfile = application macro-profile"
  },
  {
    question: "What is the danger of benchmarking code that has dead-code elimination or constant folding?",
    shortAnswer: "Python's compiler optimizes constant arithmetic at compile time (e.g. '24 * 60 * 60' becomes '86400'); benchmarking constants measures 0 operations rather than real runtime arithmetic.",
    explanation: "Compile-time constant folding in CPython.",
    hint: "Compile-time folding computes constant results ahead of time, measuring zero operations.",
    level: "complex",
    codeExample: "# compile('24 * 60', '', 'eval') folds into constant 1440"
  },
  {
    question: "How do you benchmark two alternative regex patterns using 'timeit'?",
    shortAnswer: "Compile both regex patterns in the 'setup' statement ('re.compile(...)'), and measure the '.match()' or '.search()' call in the benchmark statement.",
    explanation: "Pre-compiled regex benchmark isolation.",
    hint: "Pre-compile regular expressions in setup to measure only search execution time.",
    level: "basic",
    codeExample: "timeit.timeit('pattern.match(text)', setup='import re; pattern = re.compile(r\"\\d+\"); text = \"12345\"')"
  },
  {
    question: "Why is 'local_var' access faster than 'global_var' access in Python benchmarks?",
    shortAnswer: "Local variables are stored in a fixed-size C array and accessed via the fast 'LOAD_FAST' opcode; global variables require looking up a key in the global dictionary ('LOAD_GLOBAL').",
    explanation: "LOAD_FAST array offset vs LOAD_GLOBAL dictionary lookup.",
    hint: "Locals use LOAD_FAST array indexing; globals require dictionary lookups.",
    level: "complex",
    codeExample: "# LOAD_FAST (locals) vs LOAD_GLOBAL (globals)"
  },
  {
    question: "How can you store a global function reference in a local variable to speed up loops in Python?",
    shortAnswer: "Assign the method to a local variable before the loop: 'append = my_list.append; for x in data: append(x)' (avoids looking up '.append' on every iteration).",
    explanation: "Method caching in local scope.",
    hint: "Assigning method to local variable avoids repeated attribute lookups in loops.",
    level: "moderate",
    codeExample: "append = results.append\nfor item in data:\n    append(item)"
  },
  {
    question: "What is the time complexity difference between building a string via repeated '+=' in a loop vs 'str.join()'?",
    shortAnswer: "Repeated '+=' in a loop creates new string copies at each step, resulting in O(N^2) quadratic time; 'str.join()' computes the total length and builds the string in a single O(N) pass.",
    explanation: "String immutability and reallocation mechanics.",
    hint: "+= creates copies yielding O(N^2); str.join() builds the string in O(N) time.",
    level: "basic",
    codeExample: "out = ''.join(chunks) # O(N) vs O(N^2) repeated concat"
  },
  {
    question: "How do you calculate the speedup factor between two benchmarked implementations?",
    shortAnswer: "Divide the slower execution time by the faster execution time: 'speedup = slow_time / fast_time' (e.g. 50ms / 5ms = 10x speedup).",
    explanation: "Performance speedup calculation formula.",
    hint: "Divide slower time by faster time.",
    level: "basic",
    codeExample: "speedup = naive_time / optimized_time"
  },
  {
    question: "What is the role of the 'dis' module when analyzing benchmark differences?",
    shortAnswer: "'dis.dis()' disassembles Python functions or bytecode strings into human-readable CPython virtual machine instructions, showing exactly which opcodes are executed.",
    explanation: "Bytecode disassembly analysis.",
    hint: "Disassembles Python code to show exact virtual machine opcodes.",
    level: "basic",
    codeExample: "import dis\ndis.dis(my_function)"
  },
  {
    question: "Why should you run micro-benchmarks on a machine with minimal background workload?",
    shortAnswer: "Heavy background processes (browsers, IDE indexers, antivirus) trigger CPU thermal throttling, CPU frequency scaling, and OS context switches that distort microsecond timing.",
    explanation: "Hardware thermal throttling and environment stability.",
    hint: "Minimizes CPU throttling, frequency scaling, and context switch timing distortions.",
    level: "basic",
    codeExample: "# Isolate benchmark execution environment"
  },
  {
    question: "What is the Specializing Adaptive Interpreter in Python 3.11+ and how does it affect benchmarks?",
    shortAnswer: "CPython 3.11+ dynamically replaces generic opcodes with specialized fast opcodes (like 'BINARY_OP_ADD_INT') after repeated executions; warm-up loops are needed to measure steady-state speed.",
    explanation: "Adaptive opcode specialization in modern Python.",
    hint: "Specializes bytecodes after warm-up loops, making warm code faster than cold code.",
    level: "complex",
    codeExample: "# Python 3.11+ Adaptive Specializing Interpreter"
  },
  {
    question: "What is the ultimate golden rule of micro-benchmarking with timeit?",
    shortAnswer: "Isolate setup costs, run sufficient iterations, repeat 5+ times and take the minimum (not the average), inspect bytecodes with 'dis' to understand the root cause, and verify real-world impact with macro profiling.",
    explanation: "The complete enterprise guideline for micro-benchmarking in Python.",
    hint: "Isolate setup, repeat and take minimum, inspect bytecodes, and verify with macro profiling.",
    level: "basic",
    codeExample: "# Python Micro-Benchmarking Mastery"
  }
];

export default questions;
