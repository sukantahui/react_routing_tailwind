// src/components/study/python/topics/003_005_advance-comprehensions/topic5_files/topic5_questions.js
// Comprehensive Master Review Questions for Topic 5: zip() and itertools module essentials (count, cycle, repeat, chain)

const questions = [
  {
    question: "What happens when standard 'zip()' is called with iterables of unequal length?",
    shortAnswer: "'zip()' silently stops yielding pairs as soon as the shortest iterable is exhausted, discarding all excess elements in longer iterables without warning.",
    explanation: "Silent truncation behavior of standard zip.",
    hint: "It silently truncates and stops at the end of the shortest iterable.",
    level: "basic",
    codeExample: "list(zip([1, 2, 3, 4], ['a', 'b'])) # [(1, 'a'), (2, 'b')]"
  },
  {
    question: "What is 'zip(strict=True)' introduced in Python 3.10?",
    shortAnswer: "A defensive mode that raises a 'ValueError: zip() argument N is shorter than argument M' if any of the passed iterables differ in length.",
    explanation: "Prevents silent data loss bugs in parallel iterations.",
    hint: "Raises ValueError if any input iterable has a different length.",
    level: "basic",
    codeExample: "zip([1, 2], ['a', 'b', 'c'], strict=True) # Raises ValueError"
  },
  {
    question: "How does 'itertools.zip_longest()' handle iterables of unequal length?",
    shortAnswer: "It continues iterating until the LONGEST iterable is exhausted, padding missing values from shorter iterables with 'fillvalue=None' (or a custom specified value).",
    explanation: "Padded parallel iteration.",
    hint: "Iterates until the longest sequence finishes, padding shorter ones with fillvalue.",
    level: "basic",
    codeExample: "list(itertools.zip_longest([1, 2], ['a'], fillvalue='N/A')) # [(1, 'a'), (2, 'N/A')]"
  },
  {
    question: "How do you unzip a list of 2-tuples back into two separate lists or tuples in Python?",
    shortAnswer: "Using the argument unpacking operator with zip: 'ids, names = zip(*paired_records)'.",
    explanation: "Inverse pairing / matrix transposition recipe.",
    hint: "Use zip(*pairs) with the asterisk unpacking operator.",
    level: "basic",
    codeExample: "pairs = [(1, 'a'), (2, 'b')]; x, y = zip(*pairs) # x=(1, 2), y=('a', 'b')"
  },
  {
    question: "What is 'itertools.count(start, step)' and how is it safely bounded?",
    shortAnswer: "An infinite generator that yields incrementing numbers starting at 'start' by 'step'; it is bounded by pairing it with a finite sequence in 'zip()' or slicing with 'itertools.islice()'.",
    explanation: "Infinite sequence generator in Python.",
    hint: "Generates infinite numbers; bound it using zip() or itertools.islice().",
    level: "moderate",
    codeExample: "ids = [f'ID-{n}' for n, user in zip(itertools.count(1001), users)]"
  },
  {
    question: "What is 'itertools.cycle(iterable)' and what is a classic real-world use case?",
    shortAnswer: "An infinite iterator that repeats elements of an iterable in an endless loop; commonly used for round-robin task dispatching, load balancing, and shift rotations.",
    explanation: "Round-robin scheduling generator.",
    hint: "Loops over an iterable infinitely; ideal for round-robin load balancing.",
    level: "basic",
    codeExample: "proctors = itertools.cycle(['Alice', 'Bob'])\nnext(proctors); next(proctors)"
  },
  {
    question: "What is 'itertools.repeat(object, [times])'?",
    shortAnswer: "An iterator that yields the same object repeatedly; if 'times' is omitted, it yields infinitely; commonly used to supply constant arguments to 'map()'.",
    explanation: "Constant value repeater.",
    hint: "Yields the same object N times or infinitely.",
    level: "basic",
    codeExample: "list(map(pow, range(5), itertools.repeat(2))) # [0, 1, 4, 9, 16]"
  },
  {
    question: "What is 'itertools.chain.from_iterable(nested_iterables)' and why is it faster than '+' list concatenation?",
    shortAnswer: "It streams elements from nested sub-iterables one-by-one in linear O(N) time with zero intermediate list allocations, avoiding the quadratic O(N^2) memory copying overhead of '+' concatenation.",
    explanation: "High-performance zero-copy flattening.",
    hint: "Flattens nested iterables in O(N) zero-copy streaming time.",
    level: "moderate",
    codeExample: "flat = list(itertools.chain.from_iterable([[1, 2], [3, 4]]))"
  },
  {
    question: "What does 'itertools.compress(data, selectors)' do?",
    shortAnswer: "It filters elements of 'data' returning only those where the corresponding boolean selector in 'selectors' is True (high-speed boolean masking).",
    explanation: "Boolean mask filtering without writing explicit lambdas.",
    hint: "Filters data where the corresponding selector item is True.",
    level: "basic",
    codeExample: "list(itertools.compress(['A', 'B', 'C'], [True, False, True])) # ['A', 'C']"
  },
  {
    question: "How does 'itertools.islice(iterable, start, stop, [step])' enable zero-copy pagination?",
    shortAnswer: "It slices generator streams and non-indexable iterables on-the-fly without loading or copying the entire dataset into memory.",
    explanation: "Streaming pagination across generator pipelines.",
    hint: "Slices any iterator on-the-fly without allocating full list copies in RAM.",
    level: "moderate",
    codeExample: "page_2 = list(itertools.islice(generator_stream, 10, 20))"
  },
  {
    question: "What happens if you pass an unbounded 'itertools.count()' directly to 'list()'?",
    shortAnswer: "It causes an infinite loop that exhausts system RAM and eventually crashes the Python interpreter with a 'MemoryError'.",
    explanation: "Infinite generator materialization hazard.",
    hint: "Causes an infinite loop and crashes with MemoryError.",
    level: "basic",
    codeExample: "# DANGEROUS: list(itertools.count())"
  },
  {
    question: "How do you construct a dictionary from two separate lists of keys and values using 'zip()'?",
    shortAnswer: "Using 'dict(zip(keys, values))'.",
    explanation: "Idiomatic dictionary construction from paired sequences.",
    hint: "Use dict(zip(keys, values)).",
    level: "basic",
    codeExample: "user_map = dict(zip(['id', 'name'], ['STU-101', 'Sourav']))"
  },
  {
    question: "How do you iterate through elements of a list in consecutive overlapping pairs (e.g. (x0, x1), (x1, x2))?",
    shortAnswer: "Using 'zip(seq, seq[1:])' or 'itertools.pairwise(seq)' (introduced in Python 3.10).",
    explanation: "Consecutive pairwise sliding window.",
    hint: "Use itertools.pairwise(seq) or zip(seq, seq[1:]).",
    level: "moderate",
    codeExample: "import itertools\nlist(itertools.pairwise([1, 2, 3, 4])) # [(1, 2), (2, 3), (3, 4)]"
  },
  {
    question: "Can 'zip()' accept generator expressions as arguments?",
    shortAnswer: "Yes. 'zip(g1, g2)' consumes items from each generator in lockstep with O(1) constant memory.",
    explanation: "Lockstep streaming evaluation.",
    hint: "Yes, zip consumes generators in parallel lockstep with O(1) memory.",
    level: "basic",
    codeExample: "zip((x*2 for x in seq1), (y*3 for y in seq2))"
  },
  {
    question: "How do you flatten a multi-campus dictionary of student lists into a flat list using itertools?",
    shortAnswer: "Using 'list(itertools.chain.from_iterable(campus_dict.values()))'.",
    explanation: "Dictionary value flattening.",
    hint: "Use itertools.chain.from_iterable(d.values()).",
    level: "basic",
    codeExample: "all_students = list(itertools.chain.from_iterable(campuses.values()))"
  },
  {
    question: "What is the difference between 'itertools.chain(a, b, c)' and 'itertools.chain.from_iterable([a, b, c])'?",
    shortAnswer: "'chain(*iterables)' requires all sequences to be passed as separate positional arguments; 'chain.from_iterable()' accepts a single iterable containing the sub-sequences lazily.",
    explanation: "Positional argument unpacking vs single lazy iterable input.",
    hint: "chain() takes *args; chain.from_iterable() takes a single iterable of iterables.",
    level: "moderate",
    codeExample: "chain(a, b) vs chain.from_iterable(list_of_lists)"
  },
  {
    question: "How do you calculate running prefix sums using itertools?",
    shortAnswer: "Using 'itertools.accumulate(numbers, operator.add)' (or 'list(itertools.accumulate(numbers))').",
    explanation: "Prefix scan accumulation.",
    hint: "Use itertools.accumulate(numbers).",
    level: "basic",
    codeExample: "list(itertools.accumulate([10, 20, 30])) # [10, 30, 60]"
  },
  {
    question: "What is 'itertools.takewhile(predicate, iterable)'?",
    shortAnswer: "An iterator that yields elements as long as the predicate evaluates to True, halting immediately as soon as the first element evaluates to False.",
    explanation: "Conditional stream prefix extraction.",
    hint: "Yields elements until the predicate becomes False, then stops permanently.",
    level: "moderate",
    codeExample: "list(itertools.takewhile(lambda x: x < 5, [1, 3, 5, 2, 4])) # [1, 3]"
  },
  {
    question: "What is 'itertools.dropwhile(predicate, iterable)'?",
    shortAnswer: "An iterator that skips elements as long as the predicate evaluates to True, and yields ALL remaining elements once the predicate evaluates to False for the first time.",
    explanation: "Conditional stream prefix dropping.",
    hint: "Drops items until predicate is False, then yields all remaining items.",
    level: "moderate",
    codeExample: "list(itertools.dropwhile(lambda x: x < 5, [1, 3, 5, 2, 4])) # [5, 2, 4]"
  },
  {
    question: "How do you group sorted data by a key using itertools?",
    shortAnswer: "Using 'itertools.groupby(sorted_iterable, key_func)'; the input data MUST be sorted by the grouping key beforehand.",
    explanation: "Consecutive key grouping.",
    hint: "Use itertools.groupby() on pre-sorted data.",
    level: "complex",
    codeExample: "for k, g in itertools.groupby(sorted_students, key=lambda s: s['dept']): ..."
  },
  {
    question: "Why must data be pre-sorted before calling 'itertools.groupby()'?",
    shortAnswer: "'itertools.groupby()' only aggregates CONSECUTIVE identical keys; if identical keys appear non-consecutively, multiple separate groups will be created.",
    explanation: "Single-pass consecutive grouping invariant.",
    hint: "It only groups consecutive items; non-consecutive keys form separate groups.",
    level: "complex",
    codeExample: "# Must sort data before groupby: sorted(data, key=keyfunc)"
  },
  {
    question: "How do you generate Cartesian permutations and combinations using itertools?",
    shortAnswer: "Using 'itertools.permutations(iterable, r)' (order matters) and 'itertools.combinations(iterable, r)' (order does not matter).",
    explanation: "Combinatorial iterators in Python.",
    hint: "itertools.permutations for ordered sets; itertools.combinations for unordered subsets.",
    level: "basic",
    codeExample: "list(itertools.permutations([1, 2], 2)); list(itertools.combinations([1, 2], 2))"
  },
  {
    question: "How do you generate combinations with replacement using itertools?",
    shortAnswer: "Using 'itertools.combinations_with_replacement(iterable, r)'.",
    explanation: "Combinatorics allowing repeated element selection.",
    hint: "itertools.combinations_with_replacement(seq, r).",
    level: "moderate",
    codeExample: "list(itertools.combinations_with_replacement(['A', 'B'], 2)) # [('A', 'A'), ('A', 'B'), ('B', 'B')]"
  },
  {
    question: "What is the memory advantage of using itertools functions over list comprehensions?",
    shortAnswer: "itertools functions operate in C-level streaming memory, yielding items on-the-fly with constant O(1) memory, preventing out-of-memory crashes on massive datasets.",
    explanation: "High-throughput streaming architecture.",
    hint: "Operates in constant O(1) memory, preventing out-of-memory crashes on big data.",
    level: "basic",
    codeExample: "# O(1) memory itertools stream"
  },
  {
    question: "What is the ultimate golden rule for `zip()` and `itertools` in Python?",
    shortAnswer: "Use `zip(strict=True)` in Python 3.10+ to prevent silent truncation, `zip_longest` when padding is required, `chain.from_iterable` for zero-copy flattening, and `cycle`/`count` bounded with `islice` for round-robin generation.",
    explanation: "The complete enterprise guideline for zip and itertools in Python.",
    hint: "Use zip(strict=True), zip_longest for padding, chain.from_iterable for flattening, and islice to bound infinite streams.",
    level: "basic",
    codeExample: "# Python zip & itertools Mastery"
  }
];

export default questions;
