// src/components/study/python/topics/004_002_performance-optimization/topic3_files/topic3_questions.js
// Comprehensive Master Review Questions for Topic 3: Profiling CPU execution using cProfile and pstats

const questions = [
  {
    question: "What is 'cProfile' in Python and how does it work?",
    shortAnswer: "'cProfile' is a built-in C-extension deterministic CPU profiler that monitors every function call, return, and exception, recording precise call counts, internal execution time ('tottime'), and cumulative time ('cumtime').",
    explanation: "Standard deterministic CPU execution profiler.",
    hint: "Built-in C extension that deterministically tracks call counts and execution durations.",
    level: "basic",
    codeExample: "import cProfile\ncProfile.run('my_pipeline()')"
  },
  {
    question: "What is the difference between 'cProfile' and the legacy 'profile' module?",
    shortAnswer: "'cProfile' is implemented in C with minimal runtime overhead (~10-30%); 'profile' is written in pure Python and adds severe slowdown overhead (~1000%), making 'cProfile' the standard choice.",
    explanation: "C-extension vs pure Python profiler implementation.",
    hint: "cProfile is written in C with minimal overhead; profile is pure Python and very slow.",
    level: "basic",
    codeExample: "# Always use cProfile over profile"
  },
  {
    question: "What is the difference between 'tottime' and 'cumtime' in a profiling report?",
    shortAnswer: "'tottime' is the total time spent inside the function body itself EXCLUDING sub-calls; 'cumtime' is the cumulative time spent in the function AND ALL its child sub-functions.",
    explanation: "Internal function time vs cumulative call-tree time.",
    hint: "tottime excludes sub-calls; cumtime includes all child sub-functions.",
    level: "basic",
    codeExample: "# tottime = self only; cumtime = self + child calls"
  },
  {
    question: "What does an entry like 'ncalls = 50/1' mean in a pstats report?",
    shortAnswer: "The first number (50) is the total number of calls, and the second number (1) is the number of primitive (non-recursive) top-level calls, indicating recursive execution.",
    explanation: "Recursive call count notation.",
    hint: "Total calls / Primitive non-recursive calls.",
    level: "moderate",
    codeExample: "# 50 total calls, initiated by 1 top-level caller"
  },
  {
    question: "What is the role of the 'pstats' module when working with 'cProfile'?",
    shortAnswer: "'pstats.Stats' formats, filters, cleans filenames ('strip_dirs()'), sorts by specific metrics ('sort_stats()'), and restricts output lines ('print_stats(10)') from a 'cProfile.Profile' instance.",
    explanation: "Profiling statistics report generator.",
    hint: "Formats, cleans, filters, and sorts raw profiler output.",
    level: "basic",
    codeExample: "stats = pstats.Stats(profiler).strip_dirs().sort_stats('cumulative')"
  },
  {
    question: "How do you sort a profiling report to find high-level workflow bottlenecks vs low-level CPU hogs?",
    shortAnswer: "Sort by 'SortKey.CUMULATIVE' (or '\"cumulative\"') to find high-level workflow bottlenecks; sort by 'SortKey.TIME' (or '\"time\"') to find low-level CPU-bound functions with heavy internal logic.",
    explanation: "Cumulative vs internal time sorting strategies.",
    hint: "Cumulative time identifies high-level bottlenecks; internal time identifies leaf CPU hogs.",
    level: "basic",
    codeExample: "stats.sort_stats(pstats.SortKey.CUMULATIVE)\nstats.sort_stats(pstats.SortKey.TIME)"
  },
  {
    question: "How do you profile a specific targeted block of code without profiling the entire script?",
    shortAnswer: "Create a 'cProfile.Profile()' object, call 'profiler.enable()' before the block, and call 'profiler.disable()' immediately after the block.",
    explanation: "Targeted section profiling lifecycle.",
    hint: "Use profiler.enable() and profiler.disable() around the target code block.",
    level: "basic",
    codeExample: "prof = cProfile.Profile()\nprof.enable()\nprocess_batch()\nprof.disable()"
  },
  {
    question: "How do you export profile statistics to a binary file for visual analysis?",
    shortAnswer: "Call 'profiler.dump_stats(\"filename.pstats\")' (or 'stats.dump_stats(\"...\")') to save a binary snapshot of the profiling data.",
    explanation: "Binary profile snapshot persistence.",
    hint: "Call profiler.dump_stats('profile.pstats').",
    level: "basic",
    codeExample: "profiler.dump_stats('admission_profile.pstats')"
  },
  {
    question: "What is Snakeviz and how does it integrate with 'cProfile' snapshots?",
    shortAnswer: "Snakeviz is a web-based graphical viewer for Python profiling data that reads '.pstats' files and renders interactive icicle diagrams and sunburst flamegraphs in the browser via 'snakeviz profile.pstats'.",
    explanation: "Browser flamegraph visualization ecosystem.",
    hint: "Visualizes .pstats binary files as interactive browser flamegraphs and icicle charts.",
    level: "basic",
    codeExample: "# Terminal: snakeviz admission_profile.pstats"
  },
  {
    question: "What does 'stats.strip_dirs()' do in 'pstats'?",
    shortAnswer: "It strips long absolute directory path prefixes from filenames in the report, leaving only the base filename and line number (e.g. 'utils.py:45' instead of 'C:\\Users\\...\\utils.py:45') for cleaner terminal display.",
    explanation: "Path truncation formatting.",
    hint: "Removes long directory paths from filenames to make reports clean and readable.",
    level: "basic",
    codeExample: "stats.strip_dirs().print_stats(10)"
  },
  {
    question: "What is the difference between Deterministic Profiling ('cProfile') and Statistical Sampling Profiling (e.g. 'py-spy')?",
    shortAnswer: "Deterministic profiling intercepts EVERY function call (high detail, moderate overhead); Statistical sampling samples the call stack at periodic intervals (low overhead, zero code changes, safe for live production).",
    explanation: "Deterministic event tracing vs periodic sampling.",
    hint: "Deterministic tracks all calls; sampling checks the stack periodically with zero overhead.",
    level: "complex",
    codeExample: "# cProfile = deterministic; py-spy = statistical sampling"
  },
  {
    question: "Why should deterministic profiling ('cProfile') generally NOT be left active on live production servers?",
    shortAnswer: "Because intercepting every function call introduces a 10% to 30% execution overhead and consumes memory to track call counters, increasing request latency.",
    explanation: "Profiling overhead impact in production environments.",
    hint: "Introduces 10-30% CPU overhead and memory usage on live request paths.",
    level: "basic",
    codeExample: "# Keep cProfile in dev/staging; use sampling or APMs in production"
  },
  {
    question: "How do you run 'cProfile' directly from the command line on an entire Python script?",
    shortAnswer: "Using the '-m cProfile' flag: 'python -m cProfile -s cumulative my_script.py' or exporting to file: 'python -m cProfile -o output.pstats my_script.py'.",
    explanation: "CLI cProfile script execution.",
    hint: "python -m cProfile -s cumulative script.py",
    level: "basic",
    codeExample: "# Terminal: python -m cProfile -s cumulative app.py"
  },
  {
    question: "What is 'line_profiler' and when should it be used instead of 'cProfile'?",
    shortAnswer: "'line_profiler' (using the '@profile' decorator and 'kernprof') provides line-by-line execution time breakdown INSIDE a single function, used after 'cProfile' has identified which function is the bottleneck.",
    explanation: "Function-level macro profiling vs line-level micro profiling.",
    hint: "Use cProfile to find the bottleneck function, then line_profiler to find the exact slow line.",
    level: "moderate",
    codeExample: "# kernprof -l -v script.py (line-by-line inspection)"
  },
  {
    question: "What does a high 'ncalls' count combined with low 'tottime' per call indicate in a profile?",
    shortAnswer: "A function that is called excessively inside a tight loop (e.g. millions of calls), where the function itself is fast but the sheer call volume creates a major bottleneck.",
    explanation: "Call count amplification bottleneck.",
    hint: "Indicates a function invoked millions of times inside loops, creating high cumulative cost.",
    level: "moderate",
    codeExample: "# Inlining or caching the function can eliminate call overhead"
  },
  {
    question: "How can you restrict a 'pstats' report to show only functions matching a specific regex or module name?",
    shortAnswer: "Pass the regex string to 'print_stats()': 'stats.print_stats(\"admission_\")' or 'stats.print_stats(10, \"accotax\")'.",
    explanation: "Regex filtering in pstats reports.",
    hint: "Pass a string or regex pattern to stats.print_stats().",
    level: "basic",
    codeExample: "stats.print_stats('my_module')"
  },
  {
    question: "How do you create a custom reusable '@profile_function' decorator?",
    shortAnswer: "Instantiate a 'cProfile.Profile()' inside the wrapper, enable it before invoking 'func(*args, **kwargs)', disable it after, and print 'pstats.Stats(profiler)'.",
    explanation: "Decorator pattern for profiling.",
    hint: "Wrap the function with profiler.enable() and profiler.disable() in a decorator.",
    level: "basic",
    codeExample: "def profile(fn):\n    def wrapper(*a, **k):\n        p = cProfile.Profile(); p.enable(); res = fn(*a, **k); p.disable()\n        pstats.Stats(p).print_stats(5); return res\n    return wrapper"
  },
  {
    question: "What does '{built-in method ...}' in a cProfile report signify?",
    shortAnswer: "It represents standard library or C-level built-in operations (like 'built-in method builtins.sum', 'built-in method time.sleep', or 'built-in method posix.stat').",
    explanation: "Built-in C function notation in cProfile.",
    hint: "Identifies standard library or C-level functions executing outside pure Python frames.",
    level: "basic",
    codeExample: "# {built-in method builtins.sorted}"
  },
  {
    question: "What is 'callers' and 'callees' analysis in 'pstats'?",
    shortAnswer: "'stats.print_callers()' shows which functions called a specific function; 'stats.print_callees()' shows which sub-functions were called by a specific function, allowing you to trace call relationships.",
    explanation: "Call graph relationship introspection.",
    hint: "print_callers() shows who called the function; print_callees() shows what it called.",
    level: "moderate",
    codeExample: "stats.print_callers('validate_kyc')\nstats.print_callees('execute_pipeline')"
  },
  {
    question: "How can cProfile help detect uncompiled regular expressions?",
    shortAnswer: "By showing thousands of calls to 're.compile' or 'sre_compile.compile' in the profiling report, indicating that regexes are being re-parsed inside a loop instead of pre-compiled globally.",
    explanation: "Regex compilation overhead detection.",
    hint: "High ncalls for sre_compile indicates regexes are being compiled inside loops.",
    level: "moderate",
    codeExample: "# Profiler reveals: 10,000 calls to sre_compile.compile"
  },
  {
    question: "What is the systematic 3-step workflow for CPU optimization using cProfile?",
    shortAnswer: "1. Profile the application with cProfile to find the top bottleneck function by 'cumtime'; 2. Refactor the bottleneck algorithm (e.g. O(N^2) to O(N) or pre-compile); 3. Re-profile to verify latency reduction.",
    explanation: "Systematic profiling and verification cycle.",
    hint: "1. Profile to find bottleneck; 2. Refactor algorithm; 3. Re-profile to verify speedup.",
    level: "basic",
    codeExample: "# Measure -> Refactor -> Verify"
  },
  {
    question: "Why should you avoid optimizing code based purely on intuition without profiling?",
    shortAnswer: "Because developers frequently misjudge where CPU time is actually spent (e.g. optimizing microsecond string syntax while 95% of time is wasted on an unindexed database query or quadratic loop).",
    explanation: "Premature optimization fallacy and evidence-based profiling.",
    hint: "Intuition is often wrong; profiling provides empirical proof of where time is spent.",
    level: "basic",
    codeExample: "# 'Premature optimization is the root of all evil' - Donald Knuth"
  },
  {
    question: "How do you capture profile statistics into a string variable instead of printing to stdout?",
    shortAnswer: "Pass an 'io.StringIO()' buffer to 'pstats.Stats(profiler, stream=my_buffer)', then retrieve the formatted text via 'my_buffer.getvalue()'.",
    explanation: "StringIO buffer redirection for profiling reports.",
    hint: "Pass a StringIO instance to the stream= parameter of pstats.Stats.",
    level: "basic",
    codeExample: "buf = io.StringIO()\nstats = pstats.Stats(prof, stream=buf)\nstats.print_stats()\nreport_str = buf.getvalue()"
  },
  {
    question: "Can cProfile profile multi-threaded Python programs?",
    shortAnswer: "By default, 'cProfile' only profiles the calling thread; to profile multi-threaded programs, a profiler instance must be explicitly attached to each worker thread target function.",
    explanation: "Thread-specific profiling scope in CPython.",
    hint: "Only profiles the calling thread; worker threads require separate profiler instances.",
    level: "complex",
    codeExample: "def thread_worker():\n    p = cProfile.Profile(); p.enable(); ...; p.disable()"
  },
  {
    question: "What is the ultimate golden rule of CPU profiling with cProfile?",
    shortAnswer: "Never guess where bottlenecks are: use 'cProfile' sorted by cumulative time to pinpoint the exact 5% of code consuming 95% of runtime, eliminate the algorithmic bottleneck, and re-profile to verify the speedup.",
    explanation: "The complete enterprise guideline for CPU profiling in Python.",
    hint: "Use cProfile sorted by cumulative time to find the 5% bottleneck consuming 95% runtime.",
    level: "basic",
    codeExample: "# Python CPU Profiling Mastery"
  }
];

export default questions;
