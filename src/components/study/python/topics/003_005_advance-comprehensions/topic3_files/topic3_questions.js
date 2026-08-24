// src/components/study/python/topics/003_005_advance-comprehensions/topic3_files/topic3_questions.js
// Comprehensive Master Review Questions for Topic 3: Functional tools: map(), filter(), and functools.reduce()

const questions = [
  {
    question: "What are the three core functions of Python's 'Functional Trinity' and what does each do?",
    shortAnswer: "'map(func, seq)' transforms elements lazily; 'filter(pred, seq)' selects elements that evaluate to True lazily; 'functools.reduce(func, seq)' folds/accumulates elements pairwise into a single scalar or aggregate value.",
    explanation: "The three foundational higher-order functions of functional programming in Python.",
    hint: "map transforms, filter selects, and reduce folds into a single value.",
    level: "basic",
    codeExample: "map(fn, seq); filter(pred, seq); functools.reduce(fn, seq, init)"
  },
  {
    question: "Why do 'map()' and 'filter()' return lazy iterators in Python 3 instead of lists?",
    shortAnswer: "To conserve memory and enable streaming computation; lazy iterators produce elements one-at-a-time on demand (O(1) memory) rather than allocating the entire transformed list in RAM immediately.",
    explanation: "Python 3 iterator design transition.",
    hint: "Conserves memory by yielding elements lazily on demand without allocating full lists.",
    level: "basic",
    codeExample: "type(map(int, ['1', '2'])) # <class 'map'>"
  },
  {
    question: "Why was 'reduce()' moved from built-in scope to the 'functools' module in Python 3?",
    shortAnswer: "Guido van Rossum (Python's creator) moved it to discourage overuse in favor of clearer built-in reducers like 'sum()', 'min()', 'max()', 'any()', 'all()', or explicit 'for' loops.",
    explanation: "Design philosophy favoring readability.",
    hint: "Moved to functools to encourage clearer built-in reducers like sum() and max().",
    level: "basic",
    codeExample: "from functools import reduce"
  },
  {
    question: "What is the purpose of the 'initializer' argument in 'functools.reduce()'?",
    shortAnswer: "It specifies the starting accumulator value before processing elements; if the iterable is empty, 'reduce' returns the initializer safely without raising an error.",
    explanation: "Prevents runtime crashes on empty collections.",
    hint: "Sets initial accumulator value and handles empty iterables safely.",
    level: "moderate",
    codeExample: "reduce(lambda acc, x: acc + x, [], 0) # Returns 0 without error"
  },
  {
    question: "What happens if 'functools.reduce()' is called on an empty sequence WITHOUT an initializer?",
    shortAnswer: "It raises 'TypeError: reduce() of empty iterable with no initial value'.",
    explanation: "A critical production runtime error.",
    hint: "Raises TypeError: reduce() of empty iterable with no initial value.",
    level: "basic",
    codeExample: "# TypeError: reduce(lambda a, b: a + b, [])"
  },
  {
    question: "When does 'map()' execute faster than an equivalent List Comprehension?",
    shortAnswer: "When using an existing built-in C function (such as 'map(int, str_list)' or 'map(str.upper, words)'), because 'map' executes entirely in optimized C without Python bytecode interpreter overhead.",
    explanation: "C-speed built-in function mapping.",
    hint: "When using built-in C functions like int, str, or str.upper.",
    level: "moderate",
    codeExample: "list(map(int, str_numbers)) # Faster than [int(x) for x in str_numbers]"
  },
  {
    question: "Why are List Comprehensions preferred over 'map()' when using 'lambda' expressions?",
    shortAnswer: "List comprehensions avoid the overhead of lambda function call frames and are much more readable than 'list(map(lambda x: ..., seq))'.",
    explanation: "Comprehensions are universally recognized as more Pythonic than lambda maps.",
    hint: "Comprehensions avoid lambda frame overhead and are cleaner to read.",
    level: "basic",
    codeExample: "[x * 2 for x in seq] # Better than list(map(lambda x: x * 2, seq))"
  },
  {
    question: "How does 'filter(None, sequence)' behave in Python?",
    shortAnswer: "Passing 'None' as the predicate to 'filter()' removes all falsy elements (0, '', None, False, [], {}), leaving only truthy values.",
    explanation: "Handy built-in truthiness filter idiom.",
    hint: "Passing None removes all falsy values (0, '', None, False, []).",
    level: "moderate",
    codeExample: "list(filter(None, [0, 'Sourav', '', None, 42])) # ['Sourav', 42]"
  },
  {
    question: "What is 'functools.partial' and how does it assist functional pipelines?",
    shortAnswer: "It creates a new callable with one or more arguments pre-filled ('frozen'), making multi-argument functions compatible with single-argument 'map()' or 'filter()' callers.",
    explanation: "Currying and partial function application in Python.",
    hint: "Pre-fills arguments of a function to make it compatible with map().",
    level: "moderate",
    codeExample: "add_tax = functools.partial(calc_tax, rate=0.18)\nlist(map(add_tax, fees))"
  },
  {
    question: "How do you chain 'filter' and 'map' together without evaluating intermediate lists?",
    shortAnswer: "By nesting or piping the iterators directly: 'map(transform, filter(predicate, seq))', which computes transformed elements on-the-fly during consumption.",
    explanation: "Zero-allocation lazy streaming pipelines.",
    hint: "Nest iterators directly: map(f, filter(p, data)).",
    level: "moderate",
    codeExample: "stream = map(f, filter(p, data)) # Both are lazy iterators"
  },
  {
    question: "Can 'map()' accept multiple iterable arguments simultaneously?",
    shortAnswer: "Yes. 'map(func, iter1, iter2)' passes corresponding elements from each iterable in parallel to the function, terminating when the shortest iterable is exhausted.",
    explanation: "Multi-sequence parallel mapping.",
    hint: "Yes, map passes corresponding elements from all iterables in parallel.",
    level: "moderate",
    codeExample: "list(map(lambda x, y: x + y, [1, 2], [10, 20])) # [11, 22]"
  },
  {
    question: "How do you implement a rolling multi-metric statistical summary using 'functools.reduce()'?",
    shortAnswer: "By passing a dictionary or dataclass as the initial accumulator state and updating total count, sum, min, and max within the reducer function on each step.",
    explanation: "Multi-metric state accumulation pattern.",
    hint: "Use a dictionary state accumulator inside reduce.",
    level: "complex",
    codeExample: "reduce(lambda acc, x: {'sum': acc['sum'] + x, 'cnt': acc['cnt'] + 1}, seq, {'sum': 0, 'cnt': 0})"
  },
  {
    question: "What is the time complexity of 'functools.reduce()' over a sequence of N elements?",
    shortAnswer: "O(N * C), where N is the number of elements and C is the time complexity of the reduction step function.",
    explanation: "Linear pass accumulation.",
    hint: "Linear O(N) time assuming constant step function.",
    level: "basic",
    codeExample: "# O(N) linear iteration"
  },
  {
    question: "Why can't you iterate over a 'map' or 'filter' object multiple times?",
    shortAnswer: "Because they are single-pass generator-like iterators; once exhausted by a loop or 'list()', subsequent iterations yield nothing unless recreated.",
    explanation: "Iterator exhaustion in Python.",
    hint: "They are single-pass iterators; once exhausted, they yield nothing.",
    level: "basic",
    codeExample: "m = map(int, ['1', '2']); list(m) # [1, 2]; list(m) # [] (Empty!)"
  },
  {
    question: "How do you calculate factorial of N using 'functools.reduce()'?",
    shortAnswer: "Using 'functools.reduce(lambda acc, x: acc * x, range(1, N + 1), 1)'.",
    explanation: "Classic multiplicative reduction.",
    hint: "Use reduce with multiplication operator: reduce(lambda a, b: a * b, range(1, n+1), 1).",
    level: "basic",
    codeExample: "fact = functools.reduce(operator.mul, range(1, 6), 1) # 120"
  },
  {
    question: "What module in the standard library provides optimized C functions for 'reduce()' operations like addition and multiplication?",
    shortAnswer: "The 'operator' module (e.g. 'operator.add', 'operator.mul', 'operator.concat').",
    explanation: "Standard library C-speed operator functions.",
    hint: "The operator module (operator.add, operator.mul).",
    level: "basic",
    codeExample: "import operator\nreduce(operator.add, numbers, 0)"
  },
  {
    question: "How do you flatten a list of lists into a single list using 'functools.reduce()'?",
    shortAnswer: "Using 'functools.reduce(operator.concat, list_of_lists, [])' (or 'reduce(lambda a, b: a + b, lists, [])').",
    explanation: "Concatenation folding reduction.",
    hint: "Use reduce with operator.concat and [] initializer.",
    level: "moderate",
    codeExample: "reduce(operator.concat, [[1, 2], [3, 4]], []) # [1, 2, 3, 4]"
  },
  {
    question: "Why is 'itertools.chain.from_iterable()' preferred over 'reduce(operator.concat, ...)' for massive lists?",
    shortAnswer: "'reduce(operator.concat, ...)' creates new intermediate list objects at every step (O(N^2) total copying time); 'itertools.chain' flattens in linear O(N) streaming time.",
    explanation: "Quadratic string/list concatenation overhead avoidance.",
    hint: "reduce(concat) has O(N^2) quadratic copying overhead; chain is O(N) streaming.",
    level: "complex",
    codeExample: "itertools.chain.from_iterable(nested_lists) # O(N) time"
  },
  {
    question: "How do you find the longest string in a list using 'functools.reduce()'?",
    shortAnswer: "Using 'functools.reduce(lambda a, b: a if len(a) >= len(b) else b, words)'.",
    explanation: "Extreme value selection via reduction.",
    hint: "Use reduce comparing lengths of a and b.",
    level: "basic",
    codeExample: "reduce(lambda a, b: a if len(a) >= len(b) else b, ['AI', 'Python', 'Go']) # 'Python'"
  },
  {
    question: "What is 'Function Composition' in Python functional programming?",
    shortAnswer: "Combining two or more functions 'f' and 'g' such that the output of 'g(x)' becomes the input to 'f(g(x))'.",
    explanation: "Building high-order transformation chains.",
    hint: "Piping the output of one function as the input to the next: f(g(x)).",
    level: "moderate",
    codeExample: "compose = lambda f, g: lambda x: f(g(x))"
  },
  {
    question: "How does 'functools.reduce' compare to 'itertools.accumulate'?",
    shortAnswer: "'reduce' returns only the single final aggregated value; 'itertools.accumulate' yields all intermediate running subtotals as an iterator.",
    explanation: "Final scalar reduction vs running prefix stream.",
    hint: "reduce returns final scalar; accumulate yields all intermediate running subtotals.",
    level: "moderate",
    codeExample: "list(itertools.accumulate([1, 2, 3, 4])) # [1, 3, 6, 10]"
  },
  {
    question: "How do you reverse a string using 'functools.reduce()'?",
    shortAnswer: "Using 'functools.reduce(lambda acc, char: char + acc, my_string, '')'.",
    explanation: "Prepending accumulator folding.",
    hint: "Prepend char to accumulator: reduce(lambda acc, c: c + acc, s, '').",
    level: "basic",
    codeExample: "reduce(lambda acc, c: c + acc, 'Python', '') # 'nohtyP'"
  },
  {
    question: "How do you count occurrences of elements in a list using 'functools.reduce()'?",
    shortAnswer: "Using 'functools.reduce(lambda acc, x: {**acc, x: acc.get(x, 0) + 1}, items, {})' (though 'collections.Counter' is more idiomatic).",
    explanation: "Frequency map reduction.",
    hint: "Accumulate counts into a dictionary using reduce.",
    level: "moderate",
    codeExample: "reduce(lambda acc, x: {**acc, x: acc.get(x, 0) + 1}, ['a', 'b', 'a'], {})"
  },
  {
    question: "What is the memory benefit of piping 'filter' -> 'map' -> 'reduce' on large files?",
    shortAnswer: "Data is processed element-by-element in a streaming conveyor belt with constant O(1) memory, allowing multi-gigabyte log files to be processed on systems with minimal RAM.",
    explanation: "Streaming big data architecture in pure Python.",
    hint: "Streams data in O(1) RAM without loading the full file into memory.",
    level: "moderate",
    codeExample: "# Streaming O(1) memory pipeline"
  },
  {
    question: "What is the ultimate golden rule for Functional Tools (`map`, `filter`, `reduce`) in Python?",
    shortAnswer: "Use 'map()' for C built-in casts, 'filter(None, ...)' for falsy cleaning, and 'functools.reduce()' with an initializer for custom accumulations; for custom lambda transformations, use List Comprehensions for clarity.",
    explanation: "The complete enterprise guideline for functional programming in Python.",
    hint: "map for C-builtins, filter for selection, reduce with initializer for custom folds; comprehensions for lambdas.",
    level: "basic",
    codeExample: "# Python Functional Programming Mastery"
  }
];

export default questions;
