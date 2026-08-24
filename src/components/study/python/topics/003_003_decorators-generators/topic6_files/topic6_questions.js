// src/components/study/python/topics/003_003_decorators-generators/topic6_files/topic6_questions.js
// Comprehensive Master Review Questions for Topic 6: Iteration protocol: __iter__() and __next__()

const questions = [
  {
    question: "What is the Python Iteration Protocol?",
    shortAnswer: "A standard interface protocol based on two dunder methods: '__iter__()' which returns an iterator object, and '__next__()' which returns successive items or raises 'StopIteration' when finished.",
    explanation: "Allows any custom class to integrate with for loops, list comprehensions, and unpacking.",
    hint: "The interface consisting of __iter__() and __next__() methods.",
    level: "basic",
    codeExample: "# class with __iter__() and __next__()"
  },
  {
    question: "What is the difference between an 'Iterable' and an 'Iterator' in Python?",
    shortAnswer: "An Iterable is any object implementing '__iter__()' that can yield an iterator (e.g. list, str, dict); an Iterator is the stateful stream object implementing BOTH '__iter__()' (returns self) and '__next__()'.",
    explanation: "Iterables produce iterators; iterators produce values via next().",
    hint: "Iterable has __iter__(); Iterator has __iter__() AND __next__().",
    level: "basic",
    codeExample: "# Iterable: list -> iter(list) -> Iterator"
  },
  {
    question: "What does calling 'iter(obj)' do?",
    shortAnswer: "It calls 'obj.__iter__()' to obtain an iterator, or if '__iter__' is absent but '__getitem__' is implemented, Python creates an iterator starting at index 0.",
    explanation: "Built-in function to request an iterator from any object.",
    hint: "Invokes obj.__iter__() to obtain an iterator.",
    level: "basic",
    codeExample: "my_iter = iter([1, 2, 3])"
  },
  {
    question: "What does calling 'next(iterator)' do?",
    shortAnswer: "It calls 'iterator.__next__()' to retrieve the next element in the stream, or raises 'StopIteration' if no further elements remain.",
    explanation: "Advances the iterator cursor by one step.",
    hint: "Invokes iterator.__next__() to fetch the next value.",
    level: "basic",
    codeExample: "val = next(my_iter)"
  },
  {
    question: "Can 'next()' accept a default fallback argument to prevent 'StopIteration' from being raised?",
    shortAnswer: "Yes. 'next(iterator, default_value)' returns 'default_value' instead of raising 'StopIteration' when the iterator is exhausted.",
    explanation: "Convenient for safe single-item lookups without try...except.",
    hint: "next(iterator, default_value) returns default on exhaustion.",
    level: "basic",
    codeExample: "val = next(my_iter, None)"
  },
  {
    question: "What exact code does Python's 'for item in iterable:' loop execute under the hood?",
    shortAnswer: "'it = iter(iterable); while True: try: item = next(it); ... except StopIteration: break'.",
    explanation: "The core translation of for loops in Python bytecode.",
    hint: "iter() call followed by a while loop catching StopIteration.",
    level: "moderate",
    codeExample: "it = iter(collection)\nwhile True:\n    try: item = next(it)\n    except StopIteration: break"
  },
  {
    question: "What is the 2-argument form of 'iter(callable, sentinel)'?",
    shortAnswer: "It creates a sentinel iterator that invokes 'callable()' with zero arguments on every 'next()' call, continuing until the return value equals 'sentinel', at which point 'StopIteration' is raised.",
    explanation: "Commonly used for reading streams and chunked file I/O.",
    hint: "Calls callable repeatedly until it returns sentinel value.",
    level: "complex",
    codeExample: "for chunk in iter(lambda: f.read(1024), b''): pass"
  },
  {
    question: "Why are Python iterators 'single-pass' (exhaustible)?",
    shortAnswer: "Because iterators maintain internal mutable state (cursor pointer) that only advances forward; once the stream reaches the end, all subsequent 'next()' calls raise 'StopIteration'.",
    explanation: "To restart iteration, a new iterator must be created from the iterable.",
    hint: "Iterators advance forward only; once exhausted, they cannot be rewound.",
    level: "basic",
    codeExample: "it = iter([1, 2]); list(it); list(it) # Second list() is []"
  },
  {
    question: "What is the 'Idempotence' property of Python iterators?",
    shortAnswer: "Calling 'iter(iterator)' on an existing iterator simply returns the iterator itself ('it.__iter__() is it'), allowing iterators to be used anywhere an iterable is accepted.",
    explanation: "Crucial design requirement for all custom Iterator classes.",
    hint: "iter(iterator) returns self.",
    level: "moderate",
    codeExample: "it = iter([1, 2, 3])\nassert iter(it) is it"
  },
  {
    question: "Why should an Iterable container and its Iterator be separate classes in custom collections?",
    shortAnswer: "Separating them allows multiple independent iterators to iterate over the same container simultaneously without interfering with each other's cursor positions.",
    explanation: "Prevents cursor collision across multiple nested for loops.",
    hint: "Allows multiple independent concurrent loops over the same container.",
    level: "complex",
    codeExample: "class Roster: # Iterable\nclass RosterIter: # Iterator"
  },
  {
    question: "What happens if a custom class implements '__next__()' but forgets '__iter__()'?",
    shortAnswer: "It is an invalid iterator and will raise 'TypeError: '...' object is not iterable' when passed to a 'for' loop or 'iter()'.",
    explanation: "All iterators must implement __iter__() returning self.",
    hint: "Raises TypeError because Python requires __iter__() for iteration.",
    level: "basic",
    codeExample: "# TypeError: 'MyClass' object is not iterable"
  },
  {
    question: "What happens if '__next__()' never raises 'StopIteration'?",
    shortAnswer: "The iterator becomes an infinite stream; iterating over it in a 'for' loop will run forever unless explicitly broken with 'break' or limited.",
    explanation: "Useful for infinite generators and clocks.",
    hint: "Produces an infinite loop unless manually broken with break.",
    level: "basic",
    codeExample: "def __next__(self): return random.randint(1, 100)"
  },
  {
    question: "How does the 'itertools.islice' utility interact with iterators?",
    shortAnswer: "It consumes and yields a specified slice/count of items from an iterator without exhausting the entire stream or creating intermediate lists in memory.",
    explanation: "Essential tool for paginating through infinite streams.",
    hint: "Yields a limited slice from an iterator without exhausting it completely.",
    level: "moderate",
    codeExample: "import itertools\nfirst_five = list(itertools.islice(stream, 5))"
  },
  {
    question: "What built-in functions in Python consume iterators completely?",
    shortAnswer: "'list()', 'tuple()', 'set()', 'sum()', 'min()', 'max()', 'all()', 'any()', and 'sorted()'.",
    explanation: "These functions pull items from the iterator until StopIteration is raised.",
    hint: "list(), sum(), min(), max(), set(), tuple().",
    level: "basic",
    codeExample: "total = sum(my_iterator)  # Fully consumes my_iterator"
  },
  {
    question: "How does 'zip()' utilize the iteration protocol?",
    shortAnswer: "'zip()' obtains an iterator from each passed iterable and calls 'next()' on all of them in lockstep, stopping as soon as the shortest iterator raises 'StopIteration'.",
    explanation: "Standard pair-wise stream aggregation.",
    hint: "Calls next() on each iterator in lockstep until one raises StopIteration.",
    level: "moderate",
    codeExample: "for a, b in zip(it1, it2): ..."
  },
  {
    question: "What is the memory advantage of Iterators over large Lists?",
    shortAnswer: "Iterators compute and produce elements lazily on demand, occupying O(1) constant memory regardless of whether the dataset has 10 items or 10 billion items.",
    explanation: "Eliminates Out-Of-Memory (OOM) errors in big data processing.",
    hint: "Iterators use O(1) constant memory by producing items lazily on demand.",
    level: "basic",
    codeExample: "# Lists use O(N) memory; Iterators use O(1) memory"
  },
  {
    question: "How can you check if an object is an Iterable vs an Iterator using the 'collections.abc' module?",
    shortAnswer: "'isinstance(obj, collections.abc.Iterable)' checks for '__iter__'; 'isinstance(obj, collections.abc.Iterator)' checks for both '__iter__' and '__next__'.",
    explanation: "Standard ABC type checking for collection protocols.",
    hint: "Use collections.abc.Iterable and collections.abc.Iterator.",
    level: "moderate",
    codeExample: "from collections.abc import Iterable, Iterator\nassert isinstance(it, Iterator)"
  },
  {
    question: "What happens if '__next__()' raises an exception other than 'StopIteration' (e.g. ValueError)?",
    shortAnswer: "The exception is NOT caught by the 'for' loop and immediately crashes loop execution, propagating the error upward.",
    explanation: "Only StopIteration is caught as the clean loop exit signal.",
    hint: "Any other exception immediately crashes the for loop and bubbles up.",
    level: "basic",
    codeExample: "# ValueError in __next__() crashes the for loop"
  },
  {
    question: "How does dictionary iteration work in Python 3.7+?",
    shortAnswer: "'iter(my_dict)' returns a dictionary key iterator yielding keys in insertion order; 'my_dict.values()' and 'my_dict.items()' return iterables yielding value and (key, value) iterators.",
    explanation: "Maintains deterministic insertion order.",
    hint: "Iterating a dict yields its keys in insertion order.",
    level: "basic",
    codeExample: "for k in {'a': 1, 'b': 2}: print(k) # 'a', 'b'"
  },
  {
    question: "What is 'Generator Delegation' and how does it relate to the iteration protocol?",
    shortAnswer: "'yield from iterable' automatically obtains an iterator via 'iter(iterable)' and yields every element from that iterator until 'StopIteration', delegating iteration seamlessly.",
    explanation: "Topic 8 and 9 explore yield from in depth.",
    hint: "yield from delegates iteration to another iterable.",
    level: "complex",
    codeExample: "def chain(a, b):\n    yield from a\n    yield from b"
  },
  {
    question: "Why should you never modify a collection (like deleting from a list) while iterating over it?",
    shortAnswer: "Because modifying the underlying collection alters index offsets and internal bucket structures, causing the iterator to skip elements, repeat elements, or raise 'RuntimeError: dictionary changed size during iteration'.",
    explanation: "The classic concurrent modification iteration hazard.",
    hint: "Causes skipped/repeated items or RuntimeError (dictionary changed size).",
    level: "moderate",
    codeExample: "# AVOID: for x in lst: lst.remove(x)"
  },
  {
    question: "How do you safely remove items while iterating over a collection?",
    shortAnswer: "By iterating over a copy of the collection ('for x in list(lst):' or 'for k in list(d.keys()):') or using list comprehensions/filters to build a new collection.",
    explanation: "Iterating over a snapshot avoids mutating the active iterator source.",
    hint: "Iterate over a copy (e.g. list(collection)) or use a list comprehension.",
    level: "basic",
    codeExample: "for item in list(my_list):\n    if should_remove(item): my_list.remove(item)"
  },
  {
    question: "Can an iterator be converted back into a list multiple times?",
    shortAnswer: "No. The first 'list(iterator)' consumes all elements; any subsequent 'list(iterator)' calls will return an empty list '[]'.",
    explanation: "Demonstrates iterator exhaustion.",
    hint: "No, the first list() call exhausts the iterator completely.",
    level: "basic",
    codeExample: "it = iter([1, 2]); l1 = list(it); l2 = list(it) # l2 is []"
  },
  {
    question: "What is the role of 'StopIteration(value)' in Python coroutines?",
    shortAnswer: "When a generator/coroutine returns a value with 'return x', Python attaches 'x' to the 'StopIteration.value' attribute ('raise StopIteration(x)'), allowing calling frameworks to retrieve returned results.",
    explanation: "Underpins PEP 380 and the original async/await generator mechanics.",
    hint: "Return statements in generators populate the StopIteration.value attribute.",
    level: "complex",
    codeExample: "try: next(g)\nexcept StopIteration as exc: return_val = exc.value"
  },
  {
    question: "What is the ultimate golden rule of the Python Iteration Protocol?",
    shortAnswer: "An Iterable implements '__iter__()' to create a fresh Iterator; an Iterator implements both '__iter__()' (returning self) and '__next__()' (yielding values lazily until raising StopIteration on completion).",
    explanation: "The foundation of all iteration, comprehensions, and generators in Python.",
    hint: "Iterable produces iterators via __iter__(); Iterator yields values via __next__().",
    level: "basic",
    codeExample: "# Python Iteration Protocol Mastery"
  }
];

export default questions;
