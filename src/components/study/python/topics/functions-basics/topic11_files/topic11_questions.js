const questions = [
  {
    question: "What is a lambda function in Python?",
    shortAnswer: "A small, anonymous function defined with the `lambda` keyword.",
    explanation: "Lambdas are limited to a single expression and are often used as inline functions.",
    hint: "Think of them as one‑line throwaway functions.",
    level: "basic",
    codeExample: "add = lambda x, y: x + y"
  },
  {
    question: "What is the syntax of a lambda function?",
    shortAnswer: "`lambda arguments: expression`",
    explanation: "Arguments are comma‑separated, and the expression is evaluated and returned.",
    hint: "No `return` keyword needed.",
    level: "basic",
    codeExample: "square = lambda x: x ** 2"
  },
  {
    question: "Can a lambda function have multiple statements?",
    shortAnswer: "No, only a single expression is allowed.",
    explanation: "Lambdas cannot contain statements like `if`, `for`, `while`, or `return`.",
    hint: "Use a regular `def` for complex logic.",
    level: "basic",
    codeExample: "# lambda x: if x>0: return x  # SyntaxError"
  },
  {
    question: "Do lambda functions have a name?",
    shortAnswer: "No, they are anonymous unless assigned to a variable.",
    explanation: "Their `__name__` attribute is `'<lambda>'`.",
    hint: "They are often used without naming.",
    level: "basic",
    codeExample: "f = lambda x: x+1; print(f.__name__)  # '<lambda>'"
  },
  {
    question: "How do you call a lambda function?",
    shortAnswer: "Like any other function: `lambda_func(arguments)` or directly `(lambda x: x*2)(5)`.",
    explanation: "You can assign it to a variable and call it, or call it immediately.",
    hint: "Parentheses around the lambda are needed for immediate call.",
    level: "basic",
    codeExample: "result = (lambda x: x*2)(5)  # 10"
  },
  {
    question: "Can a lambda have default argument values?",
    shortAnswer: "Yes, just like regular functions.",
    explanation: "`lambda x, y=10: x + y` works.",
    hint: "Useful for optional parameters.",
    level: "intermediate",
    codeExample: "increment = lambda x, step=1: x + step"
  },
  {
    question: "Can a lambda have variable-length arguments (`*args`, `**kwargs`)?",
    shortAnswer: "Yes, lambdas support `*args` and `**kwargs`.",
    explanation: "Example: `lambda *args: sum(args)`.",
    hint: "Same as def.",
    level: "intermediate",
    codeExample: "sum_all = lambda *nums: sum(nums)"
  },
  {
    question: "What is the return type of a lambda?",
    shortAnswer: "The type of the expression result.",
    explanation: "It's inferred from the expression; no explicit type annotation.",
    hint: "Can be any Python type.",
    level: "basic",
    codeExample: "lambda: None  # returns None; lambda: 5 returns int"
  },
  {
    question: "Can a lambda contain an `if` statement?",
    shortAnswer: "No, but you can use a conditional expression (`x if condition else y`).",
    explanation: "The ternary operator is an expression, not a statement.",
    hint: "Use `value_if_true if condition else value_if_false`.",
    level: "intermediate",
    codeExample: "abs = lambda x: x if x>=0 else -x"
  },
  {
    question: "What is the difference between `lambda` and `def`?",
    shortAnswer: "`lambda` is an expression that creates a function; `def` is a statement that defines a named function.",
    explanation: "Lambdas are limited to one expression, cannot contain statements, and have no docstring.",
    hint: "Use `def` for anything beyond a trivial expression.",
    level: "basic",
    codeExample: "def f(x): return x*2  # vs lambda x: x*2"
  },
  {
    question: "Where are lambdas commonly used?",
    shortAnswer: "As arguments to higher‑order functions like `map()`, `filter()`, `sorted()`, `reduce()`.",
    explanation: "They provide a concise way to specify simple transformations.",
    hint: "Think of callbacks and keys.",
    level: "basic",
    codeExample: "sorted(list, key=lambda x: x[1])"
  },
  {
    question: "Can a lambda function be recursive?",
    shortAnswer: "Technically yes, but it's very awkward and not recommended.",
    explanation: "You would need to assign the lambda to a name, defeating the purpose.",
    hint: "Use `def` for recursion.",
    level: "advanced",
    codeExample: "fact = lambda n: 1 if n<=1 else n * fact(n-1)  # works but odd"
  },
  {
    question: "How do you write a lambda that returns a tuple?",
    shortAnswer: "Just return the tuple: `lambda: (1, 2, 3)`.",
    explanation: "Parentheses are required for tuple syntax.",
    hint: "No special trick.",
    level: "basic",
    codeExample: "get_coords = lambda: (10, 20)"
  },
  {
    question: "Can a lambda have a docstring?",
    shortAnswer: "No, lambdas cannot have docstrings.",
    explanation: "They are intended for very short, self‑explanatory functions.",
    hint: "If you need a docstring, use `def`.",
    level: "intermediate",
    codeExample: "# lambda x: x*2  # cannot attach __doc__"
  },
  {
    question: "What is the `__name__` of a lambda?",
    shortAnswer: "`'<lambda>'`.",
    explanation: "All lambdas have the same name, which can make debugging harder.",
    hint: "Tracebacks will show `<lambda>`.",
    level: "intermediate",
    codeExample: "f = lambda: None; print(f.__name__)  # '<lambda>'"
  },
  {
    question: "Can I use type hints with lambda?",
    shortAnswer: "No, lambda syntax does not support type annotations.",
    explanation: "Python's grammar does not allow `:` inside lambda parameters.",
    hint: "Use `def` if you need type hints.",
    level: "advanced",
    codeExample: "# lambda x: int  # no"
  },
  {
    question: "What is the late binding gotcha with lambdas in loops?",
    shortAnswer: "Lambdas created in a loop capture the loop variable by reference, so they all see the final value.",
    explanation: "Solution: bind the current value as a default argument: `lambda i=i: i`.",
    hint: "Use default argument to capture current value.",
    level: "advanced",
    codeExample: "funcs = [lambda i=i: i for i in range(3)]"
  },
  {
    question: "Can a lambda be used as a key in `sorted()`?",
    shortAnswer: "Yes, very common. Example: `sorted(data, key=lambda x: x[1])`.",
    explanation: "The lambda extracts the sort key from each element.",
    hint: "Powerful and concise.",
    level: "basic",
    codeExample: "pairs = [(1,2), (3,1)]; sorted(pairs, key=lambda p: p[1])"
  },
  {
    question: "How do you write a lambda that does nothing?",
    shortAnswer: "`lambda: None`",
    explanation: "A lambda that takes no arguments and returns `None`.",
    hint: "Useful as a placeholder.",
    level: "basic",
    codeExample: "do_nothing = lambda: None"
  },
  {
    question: "Can a lambda be used with `map()` to convert types?",
    shortAnswer: "Yes, `map(lambda x: int(x), list_of_strings)`.",
    explanation: "Lambdas are perfect for element‑wise transformations.",
    hint: "Often used with `map`.",
    level: "intermediate",
    codeExample: "list(map(lambda s: s.upper(), ['a','b']))  # ['A','B']"
  },
  {
    question: "What is the performance difference between lambda and def?",
    shortAnswer: "Negligible; both create function objects.",
    explanation: "Lambdas might be slightly faster to define (no `def` overhead), but call time is identical.",
    hint: "Don't optimise prematurely.",
    level: "expert",
    codeExample: "Microbenchmarks show minimal difference."
  },
  {
    question: "Can a lambda return a lambda?",
    shortAnswer: "Yes, this is currying: `lambda x: lambda y: x + y`.",
    explanation: "The outer lambda returns another lambda, which can be called later.",
    hint: "Functional programming technique.",
    level: "advanced",
    codeExample: "add_x = lambda x: lambda y: x + y; add_5 = add_x(5); print(add_5(3))  # 8"
  },
  {
    question: "Is `lambda` faster than a list comprehension?",
    shortAnswer: "No, list comprehensions are usually faster for transformations.",
    explanation: "`map` with lambda has function call overhead per element.",
    hint: "Prefer list comprehensions for readability and speed.",
    level: "advanced",
    codeExample: "# [x*2 for x in data] is faster than list(map(lambda x: x*2, data))"
  },
  {
    question: "Can I pickle a lambda function?",
    shortAnswer: "No, lambda functions cannot be pickled because they are anonymous.",
    explanation: "Pickle requires a fully qualified name; lambdas don't have one.",
    hint: "Use a regular `def` for serializable functions.",
    level: "expert",
    codeExample: "import pickle; pickle.dumps(lambda x: x)  # PicklingError"
  },
  {
    question: "What is the `__code__` attribute of a lambda?",
    shortAnswer: "It contains the bytecode, just like a regular function.",
    explanation: "Lambdas are function objects, so they have all the same attributes.",
    hint: "Inspect with `lambda.__code__.co_argcount`.",
    level: "expert",
    codeExample: "f = lambda a,b: a+b; print(f.__code__.co_argcount)  # 2"
  },
  {
    question: "Can a lambda be used as a decorator?",
    shortAnswer: "Technically yes, but it's unusual and hard to read.",
    explanation: "Example: `@lambda func: lambda *args: func(*args)` is possible but not recommended.",
    hint: "Use `def` for decorators.",
    level: "expert",
    codeExample: "# Not practical"
  },
  {
    question: "How do you write a lambda that prints something?",
    shortAnswer: "`lambda x: print(x)` – but it returns `None`, so be careful.",
    explanation: "`print` is an expression that returns `None`, so it's allowed.",
    hint: "Not recommended; side effects in lambdas are discouraged.",
    level: "intermediate",
    codeExample: "show = lambda x: print(x); show('hi')"
  },
  {
    question: "Can a lambda raise an exception?",
    shortAnswer: "Yes, by using `raise` inside a lambda? No – `raise` is a statement. But you can call a function that raises.",
    explanation: "You cannot write `lambda: raise ValueError` directly, but you can call a function that raises.",
    hint: "Indirectly possible but ugly.",
    level: "expert",
    codeExample: "raiser = lambda: exec('raise ValueError')  # works but horrible"
  },
  {
    question: "What is the `__qualname__` of a lambda?",
    shortAnswer: "`'<lambda>'`.",
    explanation: "Same as `__name__`; no qualifier because there's no scope.",
    hint: "Not useful for debugging.",
    level: "advanced",
    codeExample: "print((lambda: None).__qualname__)  # '<lambda>'"
  },
  {
    question: "Can a lambda be used in `if` condition?",
    shortAnswer: "Yes, the lambda itself is truthy, but you likely want to call it.",
    explanation: "`if lambda x: x>0:` is always true because the lambda object exists.",
    hint: "Don't forget the parentheses to call it.",
    level: "intermediate",
    codeExample: "if (lambda x: x>0)(5): print('positive')"
  },
  {
    question: "What is the difference between `lambda` and `functools.partial`?",
    shortAnswer: "`lambda` creates a new function; `partial` freezes arguments of an existing function.",
    explanation: "Both are used to create callables with fewer arguments.",
    hint: "Use `partial` for reusing existing functions, `lambda` for small custom logic.",
    level: "advanced",
    codeExample: "from functools import partial; double = partial(lambda x,y: x*y, y=2)"
  }
];

export default questions;