// src/components/study/python/topics/004_002_performance-optimization/topic5_files/topic5_questions.js
// Comprehensive Master Review Questions for Topic 5: Optimizing loops, lookups, and eliminating algorithmic bottlenecks

const questions = [
  {
    question: "Why are list comprehensions faster than standard for loops with 'list.append()' in CPython?",
    shortAnswer: "List comprehensions are executed at the C bytecode level using specialized 'LIST_APPEND' opcodes, bypassing the Python interpreter's per-iteration attribute lookup and function call overhead required by 'list.append()'.",
    explanation: "C-level loop execution vs Python interpreter method dispatch.",
    hint: "Think about specialized C bytecode opcodes like LIST_APPEND bypassing method lookups.",
    level: "basic",
    codeExample: "# List comprehension (25-40% faster):\nresults = [x * 2 for x in data]\n\n# Standard loop (slower due to repeated .append lookup):\nresults = []\nfor x in data:\n    results.append(x * 2)"
  },
  {
    question: "What is 'local method caching' in Python loops and how does it improve performance?",
    shortAnswer: "Binding an object method to a local variable outside the loop (e.g. 'append = result.append') eliminates the repeated global/attribute resolution ('LOAD_ATTR') on every iteration, replacing it with a faster local variable access ('LOAD_FAST').",
    explanation: "LOAD_FAST bytecode instruction vs LOAD_ATTR resolution in tight loops.",
    hint: "Store 'result.append' in a local variable before starting the loop.",
    level: "moderate",
    codeExample: "append = result.append # Cached once\nfor item in large_dataset:\n    append(process(item))"
  },
  {
    question: "What is 'Loop-Invariant Code Motion' and why is it essential?",
    shortAnswer: "Loop-invariant code motion is the practice of moving calculations, function calls, global lookups, or object instantiations whose values do not change inside the loop to before the loop begins, preventing redundant repeated work.",
    explanation: "Hoisting constant calculations outside repetitive cycles.",
    hint: "Move any computation that produces the same result on every iteration out of the loop.",
    level: "basic",
    codeExample: "# BAD: len(dataset) evaluated N times\nfor i in range(len(dataset)):\n    ...\n\n# GOOD: Hoist outside\nn = len(dataset)\nfor i in range(n):\n    ..."
  },
  {
    question: "Why does repeated string concatenation with '+=' inside a loop lead to an O(N^2) time complexity bottleneck?",
    shortAnswer: "Because Python strings are immutable; each '+=' creates a brand new string and copies all previous characters into a newly allocated memory buffer, resulting in 1 + 2 + 3 + ... + N = O(N^2) character copies.",
    explanation: "String immutability and continuous memory reallocation.",
    hint: "Each += allocates a brand new memory block and copies all previous characters.",
    level: "basic",
    codeExample: "# SLOW (O(N^2) memory reallocation):\ns = ''\nfor w in words: s += w\n\n# FAST (O(N) pre-allocated buffer):\ns = ''.join(words)"
  },
  {
    question: "How does 'str.join()' achieve linear O(N) performance for joining string sequences?",
    shortAnswer: "'str.join()' performs a two-pass C-level optimization: it first calculates the exact total length needed for all strings, allocates one single continuous memory block, and then copies all characters directly without intermediate reallocations.",
    explanation: "Two-pass single allocation strategy in CPython.",
    hint: "Calculates total size upfront and allocates memory only once.",
    level: "moderate",
    codeExample: "result = ', '.join(student_names)"
  },
  {
    question: "How can you convert a slow O(N * M) nested lookup loop into an O(N + M) linear operation?",
    shortAnswer: "By pre-building a hash table (a Python 'set' or 'dict') from the second collection in O(M) time, allowing subsequent membership tests inside the first loop to execute in instant O(1) average time.",
    explanation: "Hash table indexing to eliminate quadratic search bottlenecks.",
    hint: "Convert the lookup list into a set before entering the loop.",
    level: "basic",
    codeExample: "# Convert target list to set once (O(M)):\nregistered_set = set(registered_ids)\n\n# Linear lookup (O(N * 1) = O(N)):\nenrolled = [s for s in applicants if s.id in registered_set]"
  },
  {
    question: "When should you use the 'bisect' module instead of converting a list to a set?",
    shortAnswer: "When the sequence is already sorted, when you need range/threshold queries (e.g. grading tiers, price brackets), or when you cannot afford the extra memory overhead of allocating a separate hash table.",
    explanation: "Binary search on sorted sequences with logarithmic O(log N) lookup.",
    hint: "Use bisect for sorted lists and range/tier lookups with O(log N) efficiency.",
    level: "moderate",
    codeExample: "import bisect\ncutoffs = [60, 75, 85, 90]\ngrades = ['F', 'C', 'B', 'A', 'A+']\ngrade = grades[bisect.bisect_right(cutoffs, score)]"
  },
  {
    question: "What is the performance advantage of generator pipelines over nested list comprehensions?",
    shortAnswer: "Generators yield items lazily one at a time on demand (O(1) auxiliary memory), completely eliminating the creation and storage of large intermediate lists in RAM and allowing early termination.",
    explanation: "Lazy streaming evaluation vs eager memory allocation.",
    hint: "Generators process items one by one without creating large temporary lists in RAM.",
    level: "moderate",
    codeExample: "# Memory-safe generator pipeline:\nvalid = (s for s in students if s.is_valid)\nscores = (s.score for s in valid)\ntop_score = max(scores)"
  },
  {
    question: "What is 'itertools.islice()' and why is it more efficient than standard list slicing ('lst[start:stop]') on iterators?",
    shortAnswer: "'itertools.islice()' consumes items from an iterator lazily without creating a new copied list, avoiding memory allocations and working seamlessly with infinite or streaming data sources.",
    explanation: "Zero-copy lazy slicing across arbitrary iterators.",
    hint: "Lazily slices iterables without copying data into a new list.",
    level: "moderate",
    codeExample: "from itertools import islice\nfirst_ten = list(islice(streaming_records, 10))"
  },
  {
    question: "How does 'itertools.chain()' optimize the iteration over multiple sequences?",
    shortAnswer: "'itertools.chain()' chains multiple iterables into a single continuous stream without copying or concatenating them into a new combined collection, saving memory and time.",
    explanation: "Zero-copy sequence concatenation.",
    hint: "Combines multiple iterables without creating an intermediate combined list.",
    level: "basic",
    codeExample: "from itertools import chain\nfor item in chain(barrackpore_cohort, kolkata_cohort):\n    process(item)"
  },
  {
    question: "Why should you avoid calling 're.compile()' inside a loop?",
    shortAnswer: "Compiling a regular expression pattern is a CPU-intensive operation involving parsing, building an AST, and generating a state machine; compiling it once outside the loop reuses the compiled regex object across all iterations.",
    explanation: "Regex pre-compilation hoisting.",
    hint: "Compile regular expressions once before the loop begins.",
    level: "basic",
    codeExample: "import re\n# Hoist regex compilation outside loop:\nemail_pattern = re.compile(r'^[\\w\\.-]+@[\\w\\.-]+\\.\\w+$')\nvalid_records = [r for r in records if email_pattern.match(r['email'])]"
  },
  {
    question: "What is the danger of modifying a list or dictionary while iterating over it in a loop?",
    shortAnswer: "Modifying a collection during iteration causes index-shifting bugs, skipped elements, or 'RuntimeError: dictionary changed size during iteration'; you should iterate over a copy or build a new collection instead.",
    explanation: "Collection mutation during iteration hazards.",
    hint: "Never delete or insert items in a collection you are currently looping over.",
    level: "basic",
    codeExample: "# BUG:\nfor k in my_dict:\n    if bad(k): del my_dict[k] # RuntimeError!\n\n# FIX: Dict comprehension\nmy_dict = {k: v for k, v in my_dict.items() if not bad(k)}"
  },
  {
    question: "How does 'builtins.map()' with a C-implemented function compare to a list comprehension?",
    shortAnswer: "'map(built_in_func, iterable)' with a C function (like 'map(str.upper, words)' or 'map(int, strings)') can be slightly faster than a list comprehension because the loop executes entirely inside C without Python opcode evaluation.",
    explanation: "C-level function mapping vs bytecode comprehension loop.",
    hint: "map() is fastest when calling C built-ins directly without lambda functions.",
    level: "moderate",
    codeExample: "# Very fast with C built-in:\nids = list(map(int, id_strings))"
  },
  {
    question: "Why is 'map()' with a 'lambda' function slower than a list comprehension?",
    shortAnswer: "Because a lambda creates Python function call overhead ('CALL_FUNCTION') on every iteration, whereas a list comprehension executes the expression directly in the main loop frame.",
    explanation: "Lambda frame creation overhead vs inlined comprehension evaluation.",
    hint: "List comprehensions avoid the per-item function call overhead of lambdas.",
    level: "moderate",
    codeExample: "# Slower: map(lambda x: x*2, data)\n# Faster: [x * 2 for x in data]"
  },
  {
    question: "What is a 'Compound Multi-Key Hash Index' and when should you construct one?",
    shortAnswer: "A dictionary where tuples of multiple fields serve as the lookup key (e.g. 'index[(campus, course_id)] = student_list'), enabling instant O(1) multi-criteria filtering instead of iterating through the entire dataset.",
    explanation: "Multi-dimensional hash indexing for complex filtering.",
    hint: "Use tuple keys like (campus, grade) in a dictionary for instant composite filtering.",
    level: "complex",
    codeExample: "index = {}\nfor s in students:\n    index.setdefault((s.campus, s.course), []).append(s)\n\n# Instant O(1) multi-filter query:\nbarrackpore_py = index.get(('Barrackpore', 'PYTHON'), [])"
  },
  {
    question: "How does 'collections.defaultdict' optimize grouping loops compared to 'dict.setdefault()' or manual key checks?",
    shortAnswer: "'defaultdict' invokes a C-level factory function automatically whenever a missing key is accessed, avoiding the conditional branching ('if key not in d') and duplicate key lookups of manual dictionary access.",
    explanation: "C-level default factory resolution vs manual dictionary key branching.",
    hint: "defaultdict(list) eliminates manual if-checks and key lookups.",
    level: "basic",
    codeExample: "from collections import defaultdict\ngroups = defaultdict(list)\nfor student in students:\n    groups[student.campus].append(student)"
  },
  {
    question: "What is 'Short-Circuit Evaluation' and how can it optimize loop condition checking?",
    shortAnswer: "Python evaluates 'and' / 'or' expressions from left to right and stops as soon as the outcome is certain; placing fast, inexpensive checks (like integer comparisons) before slow checks (like regex or DB calls) skips heavy work on non-matching items.",
    explanation: "Order of operands in compound boolean expressions.",
    hint: "Put fast, cheap checks on the left of 'and' so slow checks are skipped when false.",
    level: "moderate",
    codeExample: "# Fast check first:\nif item.is_active and heavy_validation_check(item):\n    process(item)"
  },
  {
    question: "Why does converting a generator into a list with 'list()' defeat lazy evaluation?",
    shortAnswer: "Calling 'list()' forces immediate evaluation of the entire generator stream into memory all at once, forfeiting the O(1) memory and streaming benefits of generators.",
    explanation: "Eager materialization vs streaming consumption.",
    hint: "Calling list() on a generator pulls all items into RAM immediately.",
    level: "basic",
    codeExample: "# Consumes entire stream into RAM:\ndata = list(gen) # Materialized\n\n# Streaming consumption (Memory safe):\nfor item in gen: process(item)"
  },
  {
    question: "How does 'itertools.accumulate()' optimize running totals and running maximums?",
    shortAnswer: "'itertools.accumulate()' computes prefix sums or cumulative reductions in an optimized C-level loop without requiring mutable state management or manual accumulator loops in Python.",
    explanation: "C-speed prefix scan / cumulative aggregation.",
    hint: "Computes running totals or cumulative operations in C without manual loop variables.",
    level: "moderate",
    codeExample: "from itertools import accumulate\nrunning_fees = list(accumulate([100, 250, 400, 300])) # [100, 350, 750, 1050]"
  },
  {
    question: "What is the ultimate golden rule for eliminating algorithmic bottlenecks in Python applications?",
    shortAnswer: "First profile with 'cProfile' to pinpoint the exact slowest lines; replace quadratic nested loops with O(1) hash sets/dicts or binary search; hoist invariant operations outside loops; use list comprehensions or itertools streaming; and avoid premature micro-optimization.",
    explanation: "Comprehensive production algorithmic performance blueprint.",
    hint: "Profile first, replace O(N^2) with O(N) hash indexes, hoist invariants, and stream with itertools.",
    level: "basic",
    codeExample: "# 1. Profile -> 2. Fix Algorithmic Complexity (O(N^2)->O(N)) -> 3. Hoist & Vectorize"
  }
];

export default questions;
