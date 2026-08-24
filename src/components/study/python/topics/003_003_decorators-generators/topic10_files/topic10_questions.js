// src/components/study/python/topics/003_003_decorators-generators/topic10_files/topic10_questions.js
// Comprehensive Master Review Questions for Topic 10: Generator expressions for memory efficiency

const questions = [
  {
    question: "What is a Generator Expression in Python?",
    shortAnswer: "A concise, inline expression using parentheses '(expr for item in iterable if condition)' that returns a generator iterator object evaluating elements lazily on demand.",
    explanation: "Syntactically similar to list comprehensions but evaluated lazily.",
    hint: "An inline generator defined with parentheses (x for x in iterable).",
    level: "basic",
    codeExample: "squares_gen = (x**2 for x in range(1000))"
  },
  {
    question: "How does a Generator Expression differ syntactically from a List Comprehension?",
    shortAnswer: "A List Comprehension uses square brackets '[x for x in seq]' and builds a full list in RAM; a Generator Expression uses parentheses '(x for x in seq)' and builds a lazy generator object.",
    explanation: "Square brackets = eager List; parentheses = lazy Generator.",
    hint: "Square brackets [] vs parentheses ().",
    level: "basic",
    codeExample: "l = [x for x in r]  # List\ng = (x for x in r)  # Generator"
  },
  {
    question: "What is the Parentheses Reduction rule for Generator Expressions?",
    shortAnswer: "When a generator expression is the ONLY argument to a function call (e.g. 'sum', 'min', 'max', 'join'), the outer parentheses of the generator expression can be omitted: 'sum(x for x in data)' instead of 'sum((x for x in data))'.",
    explanation: "Standard idiomatic Python syntax clean-up.",
    hint: "You can omit the outer parentheses when genexp is the sole argument to a function.",
    level: "basic",
    codeExample: "total = sum(x**2 for x in range(10))"
  },
  {
    question: "Why should you use a Generator Expression inside 'sum()' instead of a List Comprehension?",
    shortAnswer: "'sum(x for x in data)' calculates the sum on the fly using O(1) constant memory without ever allocating a temporary multi-megabyte list in RAM.",
    explanation: "Eliminates intermediate list garbage collection overhead.",
    hint: "Avoids allocating an unnecessary intermediate list in memory.",
    level: "basic",
    codeExample: "# BAD: sum([x for x in range(10**7)])\n# GOOD: sum(x for x in range(10**7))"
  },
  {
    question: "How does 'Short-Circuiting' work with Generator Expressions and 'any()' or 'all()'?",
    shortAnswer: "'any(gen)' stops evaluation on the first True element; 'all(gen)' stops on the first False element. Remaining generator items are NEVER computed or evaluated.",
    explanation: "Saves massive CPU time when scanning large datasets.",
    hint: "Stops evaluating remaining items immediately when the condition is decided.",
    level: "moderate",
    codeExample: "has_topper = any(s >= 90 for s in huge_scores_stream)"
  },
  {
    question: "How can you extract only the FIRST matching item from an iterable using a Generator Expression?",
    shortAnswer: "'next((item for item in iterable if condition), default_value)' finds and returns the first matching item lazily without evaluating subsequent items.",
    explanation: "The standard Pythonic idiom for 'find first'.",
    hint: "Use next((x for x in seq if cond), default).",
    level: "moderate",
    codeExample: "first_topper = next((s for s in students if s.score >= 90), None)"
  },
  {
    question: "How do you chain multiple Generator Expressions into a multi-stage streaming pipeline?",
    shortAnswer: "By passing the output generator of one expression as the input iterable of the next: 'stage2 = (transform(x) for x in stage1 if valid(x))'.",
    explanation: "Unix-style composable streaming with zero intermediate memory.",
    hint: "Feed one generator expression directly into the next.",
    level: "moderate",
    codeExample: "cleaned = (s.strip() for s in lines)\nparsed = (json.loads(s) for s in cleaned)"
  },
  {
    question: "What is the memory complexity of a 5-stage Chained Generator Expression pipeline?",
    shortAnswer: "O(1) constant auxiliary space across all 5 stages, as items flow element-by-element through the stages without accumulating intermediate arrays.",
    explanation: "Constant memory throughout the entire data processing lifecycle.",
    hint: "O(1) constant memory across all pipeline stages.",
    level: "basic",
    codeExample: "# Memory remains ~112 bytes across all chained stages"
  },
  {
    question: "Why does evaluating a Generator Expression multiple times require re-creating it?",
    shortAnswer: "Because like all generators, generator expressions are single-pass iterators that become exhausted upon reaching the end of the stream.",
    explanation: "To re-iterate, the generator expression must be defined again.",
    hint: "Generators are single-pass; once consumed, they are exhausted.",
    level: "basic",
    codeExample: "g = (x for x in range(3)); list(g); list(g) # Second list is []"
  },
  {
    question: "How does a Tuple Comprehension compare to a Generator Expression?",
    shortAnswer: "There is NO tuple comprehension in Python; writing '(x for x in data)' creates a Generator Expression. To create a tuple, you must pass the genexp to 'tuple()': 'tuple(x for x in data)'.",
    explanation: "Common Python syntax gotcha for beginners.",
    hint: "(x for x in seq) creates a generator, NOT a tuple.",
    level: "basic",
    codeExample: "my_tuple = tuple(x for x in range(5))"
  },
  {
    question: "When is a List Comprehension faster than a Generator Expression?",
    shortAnswer: "When you genuinely need the full list in memory for indexing or multiple iterations; list comprehensions are implemented in optimized C loops and can build lists ~10-15% faster than 'list(gen_exp)'.",
    explanation: "Direct C-level array pre-allocation vs generator frame step overhead.",
    hint: "When a full list in RAM is mandatory, list comprehensions build lists faster.",
    level: "moderate",
    codeExample: "# [x for x in r] is faster than list((x for x in r))"
  },
  {
    question: "Can a Generator Expression contain multiple 'for' clauses (nested loops)?",
    shortAnswer: "Yes. '( (x, y) for x in seq_a for y in seq_b if condition )' produces cartesian products lazily on demand.",
    explanation: "Supports nested iteration over multiple dimensions.",
    hint: "Yes, multiple 'for' and 'if' clauses are allowed.",
    level: "moderate",
    codeExample: "pairs = ((r, c) for r in rows for c in cols)"
  },
  {
    question: "What happens to variable scope inside a Generator Expression in Python 3?",
    shortAnswer: "Loop variables inside generator expressions are localized to a private inner frame and do NOT leak into or overwrite variables in the enclosing scope.",
    explanation: "Guaranteed scope isolation in Python 3+.",
    hint: "Loop variables are scoped privately and do not leak to outer scope.",
    level: "moderate",
    codeExample: "x = 100; g = (x for x in range(5)); list(g); assert x == 100"
  },
  {
    question: "How does string '.join()' benefit from Generator Expressions?",
    shortAnswer: "Writing `','.join(str(x) for x in data)` formats and joins items without building an intermediate list of strings in RAM.",
    explanation: "Efficient formatted string serialization.",
    hint: "Streams formatted strings directly into the join buffer.",
    level: "basic",
    codeExample: "csv_line = ','.join(str(x) for x in row)"
  },
  {
    question: "Can a Generator Expression be indexed (e.g. 'g[0]')?",
    shortAnswer: "No. Generator expressions do not support indexing or slicing; attempting to index raises 'TypeError: 'generator' object is not subscriptable'.",
    explanation: "Use itertools.islice() or next() instead.",
    hint: "Raises TypeError; generators cannot be indexed.",
    level: "basic",
    codeExample: "# TypeError: 'generator' object is not subscriptable"
  },
  {
    question: "How does 'itertools.compress' or 'itertools.filterfalse' compare to Generator Expressions with 'if' filters?",
    shortAnswer: "Generator expressions '(x for x in data if cond)' provide equivalent functionality with more readable, Pythonic inline syntax.",
    explanation: "GenExps are often preferred for standard inline filtering.",
    hint: "GenExps provide readable inline syntax for filtering without importing itertools.",
    level: "basic",
    codeExample: "filtered = (x for x in data if x > 0)"
  },
  {
    question: "What happens if an exception is raised inside the expression part of a Generator Expression?",
    shortAnswer: "The exception is NOT raised when the generator expression is defined; it is raised only when the specific faulty element is evaluated during a 'next()' call.",
    explanation: "Deferred exception evaluation due to lazy execution.",
    hint: "Exceptions are deferred until the element is actually fetched via next().",
    level: "moderate",
    codeExample: "g = (1/x for x in [1, 0, 2]) # No error on definition; errors on 0 during next()"
  },
  {
    question: "Can a Generator Expression refer to global or enclosing variables?",
    shortAnswer: "Yes. The expression can read variables from enclosing (closure) and global scopes, resolving them at evaluation time.",
    explanation: "Standard LEGB lexical scope rules apply.",
    hint: "Yes, standard LEGB scope resolution applies.",
    level: "basic",
    codeExample: "tax = 0.18; g = (price * (1 + tax) for price in prices)"
  },
  {
    question: "What is the 'Late Binding' gotcha with Generator Expressions inside loops?",
    shortAnswer: "If a generator expression captures a loop variable by reference, all generated items will see the FINAL value of the loop variable unless default arguments or closures bind the value eagerly.",
    explanation: "The classic loop variable closure capture trap.",
    hint: "Captures the variable by reference, seeing only its final loop value.",
    level: "complex",
    codeExample: "# Multipliers late binding trap"
  },
  {
    question: "How does 'sys.getsizeof()' prove that a Generator Expression does not store elements?",
    shortAnswer: "'sys.getsizeof((x for x in range(N)))' returns ~112 bytes for N=10, N=1,000, and N=1,000,000, proving zero elements are stored in memory.",
    explanation: "Direct proof of constant O(1) memory complexity.",
    hint: "Returns constant ~112 bytes regardless of range size N.",
    level: "basic",
    codeExample: "assert sys.getsizeof((x for x in range(10**9))) < 200"
  },
  {
    question: "Can you pass multiple generator expressions into a function taking '*args'?",
    shortAnswer: "Yes, but you must include explicit parentheses around each generator expression to disambiguate the argument boundaries: 'my_func((x for x in a), (y for y in b))'.",
    explanation: "Parentheses reduction only applies to single-argument calls.",
    hint: "Must use explicit parentheses around each genexp when passing multiple arguments.",
    level: "moderate",
    codeExample: "zip((x for x in a), (y for y in b))"
  },
  {
    question: "What is the difference between 'map(func, iterable)' and '(func(x) for x in iterable)'?",
    shortAnswer: "Both are lazy iterators with O(1) memory; generator expressions are often preferred for readability, support for inline 'if' filtering, and avoiding lambda definitions.",
    explanation: "Modern Python style favors generator expressions over map/filter with lambdas.",
    hint: "GenExps are more readable and support inline 'if' clauses without lambdas.",
    level: "basic",
    codeExample: "(func(x) for x in seq if cond)"
  },
  {
    question: "How does a generator expression behave when passed to 'dict()'?",
    shortAnswer: "If the generator expression yields 2-element pairs '(key, value)', 'dict(gen)' consumes the stream and constructs a dictionary: 'dict((s.id, s.name) for s in students)'.",
    explanation: "Memory-efficient dictionary instantiation from streams.",
    hint: "Builds a dictionary from yielded (key, value) pairs.",
    level: "basic",
    codeExample: "d = dict((s.id, s.name) for s in students)"
  },
  {
    question: "Can a generator expression be used in an asynchronous 'async for' loop?",
    shortAnswer: "Synchronous generator expressions cannot be used with 'async for'; for asynchronous iteration, asynchronous generator expressions or async comprehensions (PEP 530) are used.",
    explanation: "Async comprehensions support async streams in Python 3.6+.",
    hint: "Use async comprehensions (PEP 530) for async streams.",
    level: "complex",
    codeExample: "async for x in async_gen(): pass"
  },
  {
    question: "What is the ultimate golden rule for Generator Expressions in Python?",
    shortAnswer: "Use Generator Expressions '(expr for x in iterable if cond)' whenever aggregating ('sum', 'any', 'all', 'max') or chaining multi-stage pipelines to guarantee constant O(1) memory and instant responsiveness.",
    explanation: "The gold standard for clean, memory-efficient data transformations.",
    hint: "Use genexps for aggregations and pipelines to ensure O(1) memory.",
    level: "basic",
    codeExample: "# Python Generator Expression Mastery"
  }
];

export default questions;
