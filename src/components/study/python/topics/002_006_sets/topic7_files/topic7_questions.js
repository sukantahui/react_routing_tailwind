// src/components/study/python/topics/002_006_sets/topic7_files/topic7_questions.js
// 30 Comprehensive Master Review Questions for Topic 7: Iterating Through Sets

const questions = [
  {
    question: "How does a standard for-loop traverse a set in Python?",
    shortAnswer: "It calls iter(my_set) to get a set_iterator, then calls next() to traverse all occupied hash buckets until StopIteration is raised.",
    explanation: "The for-loop leverages the Python Iterator Protocol: it inspects the internal hash table array sequentially, skipping empty slots and yielding each populated bucket element exactly once.",
    hint: "Think about the Iterator Protocol (__iter__ and __next__).",
    level: "basic",
    codeExample: "s = {\"Kolkata\", \"Barrackpore\", \"Ichapur\"}\nfor city in s:\n    print(city)"
  },
  {
    question: "What error occurs if you add or remove an element from a set while iterating over it in a for-loop?",
    shortAnswer: "RuntimeError: Set changed size during iteration.",
    explanation: "Modifying the set's size during iteration invalidates the iterator's internal bucket pointer and table state, causing Python to raise a RuntimeError to prevent undefined behavior and infinite loops.",
    hint: "Modifying while iterating raises a RuntimeError.",
    level: "moderate",
    codeExample: "s = {1, 2, 3, 4}\ntry:\n    for x in s:\n        if x % 2 == 0:\n            s.remove(x)\nexcept RuntimeError as e:\n    print(e)  # Set changed size during iteration"
  },
  {
    question: "What are the two proper ways to safely remove items from a set based on a condition?",
    shortAnswer: "1) Iterate over a shallow copy: for x in s.copy(): s.remove(x), or 2) Rebuild using a set comprehension: s = {x for x in s if not condition}.",
    explanation: "Iterating over s.copy() isolates the active iterator on a separate cloned object, while a set comprehension builds a fresh, filtered set in a single clean Pythonic pass.",
    hint: "Use s.copy() or a set comprehension.",
    level: "moderate",
    codeExample: "# Method 1: Set Comprehension (Recommended)\ns = {1, 2, 3, 4, 5}\ns = {x for x in s if x % 2 != 0}\nprint(s)  # {1, 3, 5}"
  },
  {
    question: "What does enumerate(my_set) produce when iterating over a set?",
    shortAnswer: "It yields (counter, element) pairs where counter starts from 0 (or a specified start value).",
    explanation: "enumerate() simply increments an integer counter on each iteration step. It does NOT mean the set has fixed index positions, as the assigned numbers can change between program runs.",
    hint: "The index is a loop counter, not a set index.",
    level: "basic",
    codeExample: "cities = {\"Barrackpore\", \"Kolkata\"}\nfor idx, city in enumerate(cities, start=1):\n    print(f\"{idx}. {city}\")"
  },
  {
    question: "How can you iterate through a set in alphabetical or numerical ascending order?",
    shortAnswer: "Pass the set to sorted(): for item in sorted(my_set):",
    explanation: "sorted(my_set) returns a new sorted list in O(N log N) time without modifying the original set, allowing clean, predictable sequential iteration.",
    hint: "Use sorted() to produce a sorted sequence for the loop.",
    level: "basic",
    codeExample: "scores = {92, 78, 95, 88}\nfor score in sorted(scores):\n    print(score)"
  },
  {
    question: "Can you iterate through a set of tuples and unpack them directly in the for-loop header?",
    shortAnswer: "Yes, Python automatically unpacks each tuple element into matching variable names: for a, b in my_set:.",
    explanation: "If each member of the set is a tuple of fixed length, Python unpacks the elements on every iteration step (e.g. for roll, name, fee in student_set:).",
    hint: "Use multiple variable names in the for loop header.",
    level: "basic",
    codeExample: "records = {(101, \"Susmita\"), (102, \"Debangshu\")}\nfor roll, name in records:\n    print(f\"Roll: {roll}, Name: {name}\")"
  },
  {
    question: "Why is the iteration order of sets non-deterministic across different Python interpreter sessions?",
    shortAnswer: "Because string hash seeds are randomized at startup (PYTHONHASHSEED), placing string elements in different bucket orders.",
    explanation: "To prevent algorithmic complexity Denial-of-Service attacks, Python generates a random hash seed on startup. Strings hash to different bucket indices, altering the iteration traversal sequence across processes.",
    hint: "Recall PYTHONHASHSEED security randomization.",
    level: "expert",
    codeExample: "# Session 1: set('cat') -> {'t', 'a', 'c'}\n# Session 2: set('cat') -> {'a', 'c', 't'}"
  },
  {
    question: "What happens if you call reversed() on a set: for x in reversed(my_set):?",
    shortAnswer: "It raises TypeError: 'set' object is not reversible.",
    explanation: "Reversal requires a sequence with defined backward indices or a __reversed__ dunder method. Because sets are unordered, reversed() is unsupported.",
    hint: "Sets cannot be reversed directly; use sorted(s, reverse=True).",
    level: "basic",
    codeExample: "s = {1, 2, 3}\ntry:\n    for x in reversed(s):\n        pass\nexcept TypeError as e:\n    print(e)  # 'set' object is not reversible"
  },
  {
    question: "What is the time complexity of iterating through an entire set of N elements?",
    shortAnswer: "O(N) linear time (proportional to total table capacity).",
    explanation: "The iterator traverses the allocated hash table slots, skipping empty buckets and yielding active elements. Since the table size is proportional to N, the traversal takes O(N) linear time.",
    hint: "Every element is visited once -> O(N).",
    level: "moderate",
    codeExample: "# Iteration cost: O(N) where N is the number of elements"
  },
  {
    question: "How can you manually advance an iterator over a set using iter() and next()?",
    shortAnswer: "iterator = iter(my_set); item = next(iterator).",
    explanation: "iter(my_set) returns the set's iterator object, and calling next(iterator) yields the next available bucket element until StopIteration is raised.",
    hint: "Use iter() to create the iterator and next() to pull elements.",
    level: "moderate",
    codeExample: "s = {\"A\", \"B\"}\nit = iter(s)\nprint(next(it))\nprint(next(it))\n# next(it) -> raises StopIteration"
  },
  {
    question: "What happens if you provide a default value to next(): next(iter(my_set), default_val)?",
    shortAnswer: "If the set is empty, it returns default_val instead of raising StopIteration.",
    explanation: "The next() function accepts an optional second argument (default). If the iterator is exhausted or the set is empty, it returns this fallback value safely.",
    hint: "The second argument to next() prevents StopIteration.",
    level: "moderate",
    codeExample: "empty_set = set()\nfirst = next(iter(empty_set), \"NO_ITEMS\")\nprint(first)  # 'NO_ITEMS'"
  },
  {
    question: "Can you pass a set to the map() function to transform all elements during iteration?",
    shortAnswer: "Yes, map(func, my_set) applies func to each item in the set, returning a lazy iterator.",
    explanation: "map() accepts any iterable. for item in map(str.upper, my_set): iterates through uppercase versions of each string in the set.",
    hint: "map() works with any iterable collection.",
    level: "basic",
    codeExample: "cities = {\"barrackpore\", \"kolkata\"}\nfor upper_city in map(str.upper, cities):\n    print(upper_city)"
  },
  {
    question: "Can you pass a set to the filter() function during iteration?",
    shortAnswer: "Yes, filter(predicate, my_set) lazily yields only elements that evaluate to True for the predicate.",
    explanation: "filter() consumes the set iterator and filters out unwanted items on the fly during loop execution in O(N) time.",
    hint: "filter() works directly with sets.",
    level: "basic",
    codeExample: "nums = {10, 15, 20, 25, 30}\nfor even in filter(lambda x: x % 2 == 0, nums):\n    print(even)"
  },
  {
    question: "What is the result of using zip() with a set and a list: for item, num in zip(my_set, [1, 2, 3]):?",
    shortAnswer: "It pairs elements one by one, but pairings are non-deterministic because set order is not fixed.",
    explanation: "zip() consumes both iterables in parallel until the shortest ends. Because set elements emerge in bucket order, the pairing between list items and set items can vary across runs.",
    hint: "Pairings will be unpredictable due to set unorderedness.",
    level: "moderate",
    codeExample: "s = {\"A\", \"B\", \"C\"}\nfor letter, num in zip(s, [1, 2, 3]):\n    print(letter, num)"
  },
  {
    question: "How can you iterate through a set and calculate the sum of all elements without using a for-loop?",
    shortAnswer: "Use the built-in sum(my_set) function.",
    explanation: "The sum() function consumes the set iterator internally in optimized C code, computing the cumulative sum of numeric items in O(N) time.",
    hint: "Use the built-in sum() function.",
    level: "basic",
    codeExample: "fees = {4500, 3500, 6500}\nprint(\"Total Fees: ₹\", sum(fees))  # ₹14500"
  },
  {
    question: "Can you iterate through a frozenset in the exact same manner as a standard set?",
    shortAnswer: "Yes, frozenset implements the exact same iterator protocol (__iter__ and __next__).",
    explanation: "frozenset objects are fully iterable with for-loops, enumerate, map, filter, and comprehensions.",
    hint: "frozenset has full iteration support.",
    level: "basic",
    codeExample: "fs = frozenset([\"Python\", \"React\", \"Django\"])\nfor tech in fs:\n    print(tech)"
  },
  {
    question: "What happens if an element inside a set is a custom object and its attributes are mutated during iteration?",
    shortAnswer: "The loop continues without raising RuntimeError, but the object's hash code may become corrupted in the set.",
    explanation: "RuntimeError only checks if the set container's size changed. Mutating an inner object's fields doesn't change the set size, but it corrupts the hash table invariants and breaks future lookups.",
    hint: "Set size didn't change, but hash integrity was destroyed.",
    level: "expert",
    codeExample: "# Mutating inner object attributes is dangerous even if loop doesn't crash!"
  },
  {
    question: "How can you execute a side-effect function for every element in a set?",
    shortAnswer: "Use a clean for-loop: for x in my_set: do_something(x).",
    explanation: "In Python, explicit for-loops are preferred over comprehensions when executing side-effects (like logging, sending emails, or writing to disk).",
    hint: "Use standard for loops for side effects.",
    level: "basic",
    codeExample: "users = {\"susmita@example.com\", \"debangshu@example.com\"}\nfor email in users:\n    print(f\"Sending alert to {email}\")"
  },
  {
    question: "What is the difference between iterating over my_set vs my_set.copy() in terms of memory overhead?",
    shortAnswer: "Iterating over my_set uses zero extra memory; my_set.copy() allocates a duplicate set table in memory.",
    explanation: "Direct iteration consumes the existing hash table in place. s.copy() creates a new set object with duplicate bucket pointers, using additional memory proportional to the set size.",
    hint: "Direct iteration has O(1) memory overhead; copy() uses O(N) memory.",
    level: "moderate",
    codeExample: "# Direct: 0 extra memory\n# Copy:   O(N) memory allocated for clone"
  },
  {
    question: "How do you iterate through a set in batches or chunks of size K?",
    shortAnswer: "Convert to an iterator and use itertools.islice() or a while loop.",
    explanation: "import itertools; it = iter(my_set); list(itertools.islice(it, K)) extracts chunks of size K until the iterator is exhausted.",
    hint: "Use itertools.islice with an iterator on the set.",
    level: "expert",
    codeExample: "import itertools\ns = set(range(10))\nit = iter(s)\nwhile chunk := list(itertools.islice(it, 3)):\n    print(\"Batch:\", chunk)"
  },
  {
    question: "What is the output of [x*2 for x in {1, 2, 3}]?",
    shortAnswer: "A list containing [2, 4, 6] (or any order permutation like [4, 2, 6]).",
    explanation: "The list comprehension iterates over the set, multiplies each item by 2, and collects the results into a new Python list.",
    hint: "The comprehension produces a list from the set's items.",
    level: "basic",
    codeExample: "doubled = [x * 2 for x in {1, 2, 3}]\nprint(doubled)"
  },
  {
    question: "Can an asynchronous for-loop (async for) be used directly on a standard Python set?",
    shortAnswer: "No, standard sets only implement synchronous __iter__, not asynchronous __aiter__.",
    explanation: "Standard Python sets are in-memory synchronous data structures. To iterate asynchronously, you must wrap the set in an async generator function.",
    hint: "Sets implement synchronous __iter__ only.",
    level: "expert",
    codeExample: "# async for requires an async iterable (with __aiter__)"
  },
  {
    question: "How can you check if all elements in a set meet a condition during iteration?",
    shortAnswer: "Use all(condition(x) for x in my_set) in short-circuiting O(N) time.",
    explanation: "The all() function iterates through the generator, returning True if every element satisfies the condition, and immediately returning False on the first failure.",
    hint: "Use the all() built-in function.",
    level: "basic",
    codeExample: "scores = {85, 92, 78, 88}\nall_passed = all(s >= 40 for s in scores)\nprint(\"All passed? ->\", all_passed)  # True"
  },
  {
    question: "How can you check if at least one element in a set meets a condition during iteration?",
    shortAnswer: "Use any(condition(x) for x in my_set) in short-circuiting O(N) time.",
    explanation: "The any() function returns True as soon as the first matching element is encountered, avoiding unnecessary iteration over remaining items.",
    hint: "Use the any() built-in function.",
    level: "basic",
    codeExample: "roles = {\"viewer\", \"student\", \"admin\"}\nhas_admin = any(r == \"admin\" for r in roles)\nprint(\"Has admin? ->\", has_admin)  # True"
  },
  {
    question: "What happens if you iterate over a set containing custom class instances with custom __repr__?",
    shortAnswer: "Python calls __repr__ when printing instances during loop execution.",
    explanation: "The loop fetches each instance, and printing or formatting invokes the class's __repr__ method.",
    hint: "__repr__ controls how instances are formatted when printed in loops.",
    level: "basic",
    codeExample: "class Role:\n    def __init__(self, name):\n        self.name = name\n    def __repr__(self):\n        return f\"<Role: {self.name}>\"\n\ns = {Role(\"Admin\"), Role(\"Editor\")}\nfor r in s:\n    print(r)"
  },
  {
    question: "How does set iteration performance compare to list iteration performance?",
    shortAnswer: "List iteration is slightly faster (by ~10-20%) because lists iterate over contiguous array pointers without checking empty hash bucket slots.",
    explanation: "A list iterator simply increments an array pointer. A set iterator must check each bucket to see if it's occupied or empty, resulting in a minor CPU branching overhead.",
    hint: "Lists have simple pointer increments; sets skip empty bucket slots.",
    level: "expert",
    codeExample: "# List iteration is slightly faster than set iteration due to contiguous cache locality"
  },
  {
    question: "How can you find the longest string in a set of words during iteration?",
    shortAnswer: "Use max(my_set, key=len).",
    explanation: "The max() function accepts a key function (len), iterating through the set and returning the string with the maximum character length in O(N) time.",
    hint: "Use max() with key=len.",
    level: "basic",
    codeExample: "cities = {\"Kolkata\", \"Barrackpore\", \"Ichapur\"}\nlongest = max(cities, key=len)\nprint(\"Longest name:\", longest)  # 'Barrackpore'"
  },
  {
    question: "What is the effect of calling break inside a set iteration loop?",
    shortAnswer: "The loop terminates immediately, leaving unvisited hash buckets untouched.",
    explanation: "Standard control flow statements (break, continue, pass) work identically with set iterators as with any other Python loop.",
    hint: "break immediately exits the loop.",
    level: "basic",
    codeExample: "for num in {10, 20, 30, 40}:\n    if num == 20:\n        break"
  },
  {
    question: "Why should you never write unit tests that compare the string output of a set for-loop?",
    shortAnswer: "Because non-deterministic iteration order causes tests to pass or fail randomly across machines or test runs.",
    explanation: "Automated test suites must sort the output list (e.g. sorted(results)) before asserting expected sequential values.",
    hint: "Sort results before asserting in tests.",
    level: "moderate",
    codeExample: "# Test Practice: Always sort before asserting!\n# assert sorted(results) == ['A', 'B', 'C']"
  },
  {
    question: "What is the master summary rule for iterating over sets in Python?",
    shortAnswer: "Iterate directly when order does not matter; use sorted(s) when sequence is required; and never mutate the set inside the loop!",
    explanation: "Following these three foundational rules ensures maximum execution performance, predictable outputs, and 100% bug-free iteration across all Python applications.",
    hint: "Direct loop for unordered, sorted() for sequence, copy() or comprehension for mutations.",
    level: "basic",
    codeExample: "# Master Rule:\n# 1. Unordered: for x in s:\n# 2. Sorted:    for x in sorted(s):\n# 3. Mutating:  s = {x for x in s if cond}"
  }
];

export default questions;
