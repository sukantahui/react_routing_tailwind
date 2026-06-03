const questions = [
  {
    question: "What does the `map()` function do?",
    shortAnswer: "Applies a given function to every item of an iterable and returns an iterator.",
    explanation: "`map(function, iterable)` yields `function(item)` for each item. It is lazy – results are computed on demand.",
    hint: "Think of transforming each element.",
    level: "basic",
    codeExample: "list(map(lambda x: x*2, [1,2,3]))  # [2,4,6]"
  },
  {
    question: "What does the `filter()` function do?",
    shortAnswer: "Returns an iterator containing only items for which the function returns a truthy value.",
    explanation: "`filter(predicate, iterable)` keeps elements where `predicate(item)` is `True`.",
    hint: "It selects, not transforms.",
    level: "basic",
    codeExample: "list(filter(lambda x: x%2==0, [1,2,3,4]))  # [2,4]"
  },
  {
    question: "What type do `map()` and `filter()` return?",
    shortAnswer: "An iterator (lazy sequence), not a list.",
    explanation: "In Python 3, they return iterators. Use `list()` to materialise the results.",
    hint: "Iterators are memory-efficient.",
    level: "basic",
    codeExample: "result = map(lambda x: x, [1,2]); print(type(result))  # <class 'map'>"
  },
  {
    question: "How do you use a lambda with `map()`?",
    shortAnswer: "Pass the lambda as the first argument, e.g., `map(lambda x: x**2, numbers)`.",
    explanation: "The lambda defines the transformation applied to each element.",
    hint: "Keep the lambda simple.",
    level: "basic",
    codeExample: "squared = map(lambda n: n*n, [1,2,3])"
  },
  {
    question: "How do you use a lambda with `filter()`?",
    shortAnswer: "Pass a lambda that returns a boolean, e.g., `filter(lambda x: x>0, numbers)`.",
    explanation: "The lambda is the predicate that decides which elements to keep.",
    hint: "Return `True` to keep, `False` to discard.",
    level: "basic",
    codeExample: "positives = filter(lambda x: x>0, [-1,2,-3,4])"
  },
  {
    question: "Can `map()` work with more than one iterable?",
    shortAnswer: "Yes, it can take multiple iterables; the function must accept that many arguments.",
    explanation: "`map(func, iter1, iter2, ...)` stops when the shortest iterable is exhausted.",
    hint: "Element‑wise combination.",
    level: "intermediate",
    codeExample: "list(map(lambda a,b: a+b, [1,2], [10,20]))  # [11,22]"
  },
  {
    question: "What is the difference between `map()` and list comprehension?",
    shortAnswer: "List comprehension is often more readable and can include filtering; `map` is lazy and may be faster for very large data.",
    explanation: "Comprehensions are generally preferred for simple transformations. `map` shines when you already have a named function or need lazy evaluation.",
    hint: "Readability over micro‑optimisation.",
    level: "intermediate",
    codeExample: "[x*2 for x in data]  vs  list(map(lambda x: x*2, data))"
  },
  {
    question: "What is the difference between `filter()` and list comprehension with `if`?",
    shortAnswer: "They are similar, but list comprehension can also transform; `filter` only selects.",
    explanation: "`[x for x in data if condition]` is often more readable than `list(filter(lambda x: condition, data))`.",
    hint: "Pythonic style leans towards comprehensions.",
    level: "intermediate",
    codeExample: "[x for x in data if x%2==0]  vs  list(filter(lambda x: x%2==0, data))"
  },
  {
    question: "How do you combine `map()` and `filter()`?",
    shortAnswer: "Chain them: `map(func, filter(pred, data))` or use comprehension for clarity.",
    explanation: "`filter` first to reduce elements, then `map` to transform.",
    hint: "Order matters.",
    level: "intermediate",
    codeExample: "squares_of_evens = list(map(lambda x: x**2, filter(lambda x: x%2==0, numbers)))"
  },
  {
    question: "What happens if you pass `None` as the function to `filter()`?",
    shortAnswer: "It removes all falsy elements (False, None, 0, '', [], etc.).",
    explanation: "`filter(None, iterable)` is a concise way to keep only truthy values.",
    hint: "Truthy values remain.",
    level: "intermediate",
    codeExample: "list(filter(None, [0, 1, False, 2, '', 3]))  # [1,2,3]"
  },
  {
    question: "Can you use `map()` with a lambda that has side effects (e.g., printing)?",
    shortAnswer: "Technically yes, but it's considered bad practice because `map` is meant for pure transformations.",
    explanation: "Using `map` for side effects is confusing and wastes the returned iterator.",
    hint: "Use a `for` loop for side effects.",
    level: "advanced",
    codeExample: "# Avoid: list(map(lambda x: print(x), data))"
  },
  {
    question: "Are `map()` and `filter()` lazy?",
    shortAnswer: "Yes, they return iterators that compute values on demand.",
    explanation: "This is efficient for large or infinite sequences.",
    hint: "They don't produce all results until you iterate.",
    level: "intermediate",
    codeExample: "m = map(lambda x: x*2, range(10**9))  # No memory error"
  },
  {
    question: "How can you convert the result of `map()` to a list?",
    shortAnswer: "Use `list(map(...))`.",
    explanation: "This forces evaluation of all items.",
    hint: "Be careful with infinite iterators.",
    level: "basic",
    codeExample: "list(map(lambda x: x*2, [1,2,3]))"
  },
  {
    question: "What is a typical real‑world use of `map()` with lambda?",
    shortAnswer: "Converting data types (e.g., strings to ints), applying formatting, or extracting fields.",
    explanation: "For example, reading numbers from a file: `map(int, lines)`.",
    hint: "Transformations.",
    level: "intermediate",
    codeExample: "list(map(int, ['1','2','3']))  # [1,2,3]"
  },
  {
    question: "What is a typical real‑world use of `filter()` with lambda?",
    shortAnswer: "Removing empty strings, filtering invalid entries, or keeping items that meet a condition.",
    explanation: "E.g., `filter(lambda line: line.strip(), file_lines)`.",
    hint: "Selection.",
    level: "intermediate",
    codeExample: "list(filter(lambda s: s, ['', 'hi', '', 'bye']))  # ['hi','bye']"
  },
  {
    question: "Can `filter()` use a lambda that returns a non‑boolean?",
    shortAnswer: "Yes, it uses truthiness: any value that is `False` in a boolean context is filtered out.",
    explanation: "For example, `0`, `None`, `''`, `[]` are removed.",
    hint: "Truthy values stay.",
    level: "intermediate",
    codeExample: "list(filter(lambda x: x, [0, 5, None, 'hello']))  # [5, 'hello']"
  },
  {
    question: "How do you debug a lambda inside `map()`?",
    shortAnswer: "Replace the lambda with a named function that prints intermediate values.",
    explanation: "You cannot easily debug a lambda. Use `def` and add print statements.",
    hint: "Keep debugging simple.",
    level: "advanced",
    codeExample: "def debug(x): print(x); return x*2; list(map(debug, [1,2,3]))"
  },
  {
    question: "What is the performance difference between `map` with lambda and a for loop?",
    shortAnswer: "`map` is often slightly faster because it runs in C, but the difference is usually negligible.",
    explanation: "For most code, readability matters more. Use what is clear.",
    hint: "Don't sacrifice clarity.",
    level: "expert",
    codeExample: "Micro‑benchmarks may show map faster, but readability wins."
  },
  {
    question: "Can you use `map()` to transpose a matrix?",
    shortAnswer: "Yes, using `zip(*matrix)` is easier, but `map(list, zip(*matrix))` works.",
    explanation: "`map` with multiple iterables can combine columns.",
    hint: "`zip` is more common.",
    level: "advanced",
    codeExample: "list(map(list, zip([1,2], [3,4])))  # [[1,3],[2,4]]"
  },
  {
    question: "How do you use `filter()` to remove `None` values from a list?",
    shortAnswer: "`filter(None, list)` removes all falsy, including None, 0, ''.",
    explanation: "If you only want to remove None, use `filter(lambda x: x is not None, list)`.",
    hint: "`None` is falsy.",
    level: "basic",
    codeExample: "list(filter(lambda x: x is not None, [1, None, 2]))"
  },
  {
    question: "Can `map()` be used with a lambda that returns a tuple?",
    shortAnswer: "Yes, the lambda can return any type.",
    explanation: "For example, `map(lambda x: (x, x**2), numbers)` produces tuples.",
    hint: "Useful for pairing.",
    level: "intermediate",
    codeExample: "list(map(lambda x: (x, x**2), [1,2,3]))"
  },
  {
    question: "What is the `itertools` alternative to `map()` and `filter()`?",
    shortAnswer: "`itertools.starmap` for mapping with tuple unpacking; `itertools.filterfalse` for opposite filter.",
    explanation: "These provide additional flexibility for functional pipelines.",
    hint: "Part of the `itertools` module.",
    level: "expert",
    codeExample: "from itertools import starmap; list(starmap(pow, [(2,3), (3,2)]))"
  },
  {
    question: "How do you handle exceptions inside a lambda used in `map()`?",
    shortAnswer: "You cannot handle exceptions inside a lambda. Use a regular function with try/except.",
    explanation: "Lambdas cannot contain statements, so error handling requires a `def`.",
    hint: "Wrap the lambda in a try/except via a named function.",
    level: "advanced",
    codeExample: "def safe(x): try: return int(x); except: return None; list(map(safe, ['1','a','2']))"
  },
  {
    question: "What does `list(map(lambda x: x, filter(lambda y: y>0, data)))` do?",
    shortAnswer: "It filters positive numbers and then returns a list of those numbers (no transformation).",
    explanation: "The `map` is redundant – `list(filter(...))` would be enough.",
    hint: "Avoid redundant mapping.",
    level: "basic",
    codeExample: "result = list(filter(lambda x: x>0, data))"
  },
  {
    question: "Can `map()` be used with a function that returns `None`?",
    shortAnswer: "Yes, but then the result list will contain `None` for each item.",
    explanation: "If the function has side effects and you only care about them, you should not use `map`.",
    hint: "Not idiomatic.",
    level: "intermediate",
    codeExample: "list(map(lambda x: print(x), [1,2]))  # [None, None] and prints"
  },
  {
    question: "What is the purpose of `functools.reduce()` and how does it differ from `map`?",
    shortAnswer: "`reduce` combines elements into a single value; `map` transforms each element individually.",
    explanation: "`reduce` applies a function cumulatively (e.g., sum, product).",
    hint: "`reduce` is for aggregation.",
    level: "advanced",
    codeExample: "from functools import reduce; reduce(lambda a,b: a+b, [1,2,3])  # 6"
  },
  {
    question: "How can you use `map()` to apply a lambda to dictionary values?",
    shortAnswer: "Use `map(lambda kv: (kv[0], transform(kv[1])), dict.items())`.",
    explanation: "Then convert back to dict: `dict(result)`.",
    hint: "Iterate over items.",
    level: "intermediate",
    codeExample: "d = {'a':1,'b':2}; dict(map(lambda i: (i[0], i[1]*2), d.items()))  # {'a':2,'b':4}"
  },
  {
    question: "Why might `filter()` be preferred over a list comprehension in some cases?",
    shortAnswer: "When you need lazy evaluation for very large or infinite iterables, or when you already have a predicate function.",
    explanation: "`filter` returns an iterator, so it doesn't allocate a list.",
    hint: "Memory efficiency for huge data.",
    level: "expert",
    codeExample: "large_filter = filter(predicate, huge_generator)  # no memory explosion"
  },
  {
    question: "Can you use `map()` and `filter()` together with a lambda that accesses an external variable?",
    shortAnswer: "Yes, lambdas can capture variables from the enclosing scope (closures).",
    explanation: "Be careful with late binding; use default arguments if needed.",
    hint: "Closures work, but watch for surprises.",
    level: "advanced",
    codeExample: "threshold = 5; list(filter(lambda x: x > threshold, [1,6,3,8]))"
  },
  {
    question: "What is the most Pythonic way to transform and filter a list: `map+filter` or list comprehension?",
    shortAnswer: "List comprehension is generally considered more Pythonic and readable.",
    explanation: "`[f(x) for x in data if condition]` combines both steps clearly.",
    hint: "The Zen of Python: readability counts.",
    level: "intermediate",
    codeExample: "[x**2 for x in range(10) if x%2==0]"
  }
];

export default questions;