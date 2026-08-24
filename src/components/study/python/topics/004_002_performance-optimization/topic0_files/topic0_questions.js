// src/components/study/python/topics/004_002_performance-optimization/topic0_files/topic0_questions.js
// Comprehensive Master Review Questions for Topic 0: Big-O notation basics (Time & Space complexity: O(1), O(N), O(N log N), O(N^2))

const questions = [
  {
    question: "What is Big-O notation and why is it used in computer science and software engineering?",
    shortAnswer: "Big-O notation is a mathematical model used to describe the asymptotic upper bound of an algorithm's runtime (Time Complexity) or memory usage (Space Complexity) as the input size N scales towards infinity.",
    explanation: "Asymptotic algorithm scaling analysis.",
    hint: "Describes how runtime or memory grows as input size N tends to infinity.",
    level: "basic",
    codeExample: "# Big-O describes algorithmic growth rates relative to input size N"
  },
  {
    question: "Why do we drop constant coefficients and lower-order terms in Big-O analysis?",
    shortAnswer: "Because as N approaches infinity, the highest-order term completely dominates growth; constant multipliers and smaller terms have a negligible impact on asymptotic scaling (e.g. O(5N^2 + 1000N + 50) simplifies to O(N^2)).",
    explanation: "Dominant asymptotic term isolation.",
    hint: "The highest-order term dominates growth as N becomes arbitrarily large.",
    level: "basic",
    codeExample: "# O(3N + 10) -> O(N); O(N^2 + 500N) -> O(N^2)"
  },
  {
    question: "What is the ranking of common Big-O time complexity classes from fastest to slowest?",
    shortAnswer: "O(1) [Constant] < O(log N) [Logarithmic] < O(N) [Linear] < O(N log N) [Linearithmic] < O(N^2) [Quadratic] < O(2^N) [Exponential] < O(N!) [Factorial].",
    explanation: "Complexity class growth rate hierarchy.",
    hint: "O(1) is fastest, followed by log N, N, N log N, N^2, and 2^N.",
    level: "basic",
    codeExample: "O(1) < O(log N) < O(N) < O(N log N) < O(N^2) < O(2^N) < O(N!)"
  },
  {
    question: "What is the average time complexity of a dictionary key lookup ('dict[key]') in Python?",
    shortAnswer: "O(1) Constant Time, because Python dictionaries use optimized hash tables with open addressing to compute memory buckets in constant time.",
    explanation: "Hash table direct address indexing.",
    hint: "O(1) constant time on average via hash tables.",
    level: "basic",
    codeExample: "val = student_dict.get('STU-101') # O(1) Average"
  },
  {
    question: "What is the time complexity of searching for an item in a Python list ('item in my_list')?",
    shortAnswer: "O(N) Linear Time, because Python must perform a linear scan inspecting elements sequentially from the start of the list to the end in the worst case.",
    explanation: "Sequential array linear search.",
    hint: "O(N) because it scans each list element one by one.",
    level: "basic",
    codeExample: "exists = 'STU-101' in student_list # O(N) Linear Search"
  },
  {
    question: "What is the time complexity of Python's built-in 'sorted()' and 'list.sort()' methods?",
    shortAnswer: "O(N log N) Linearithmic Time in the average and worst case (and O(N) in the best case for already sorted data), implemented using the Timsort hybrid sorting algorithm.",
    explanation: "Timsort algorithmic complexity.",
    hint: "O(N log N) average/worst case using Timsort.",
    level: "basic",
    codeExample: "sorted_students = sorted(roster, key=lambda s: s['id']) # O(N log N)"
  },
  {
    question: "What is Binary Search, what is its time complexity, and what is its prerequisite?",
    shortAnswer: "Binary search repeatedly divides the search space in half, achieving O(log N) time complexity; its prerequisite is that the input array MUST be pre-sorted.",
    explanation: "Divide-and-conquer logarithmic search.",
    hint: "O(log N) time; requires the data to be sorted.",
    level: "basic",
    codeExample: "# Binary search: O(log N) on sorted data"
  },
  {
    question: "Why do nested loops typically result in O(N^2) quadratic time complexity?",
    shortAnswer: "If an outer loop runs N times and for every outer iteration an inner loop runs N times, the total operations executed equals N * N = N^2.",
    explanation: "Multiplicative loop nesting.",
    hint: "Outer N iterations multiplied by inner N iterations yields N^2 operations.",
    level: "basic",
    codeExample: "for i in range(N):\n    for j in range(N):\n        # O(N^2) operations"
  },
  {
    question: "What is Space Complexity (Auxiliary Memory Complexity)?",
    shortAnswer: "Space Complexity quantifies the amount of additional working memory (RAM) allocated by an algorithm during execution, excluding the input data itself.",
    explanation: "Auxiliary RAM allocation scaling.",
    hint: "Measures the extra memory allocated by the algorithm relative to N.",
    level: "basic",
    codeExample: "# In-place algorithms require O(1) auxiliary space"
  },
  {
    question: "What is the difference in Space Complexity between a List Comprehension and a Generator Expression?",
    shortAnswer: "A List Comprehension ('[x for x in data]') is O(N) Space because it eagerly allocates memory for all N elements; a Generator Expression ('(x for x in data)') is O(1) Space because it yields items lazily on-demand.",
    explanation: "Eager memory materialization vs lazy evaluation.",
    hint: "List is O(N) eager memory; Generator is O(1) lazy streaming memory.",
    level: "moderate",
    codeExample: "list_comp = [x for x in range(10**6)] # O(N) Space (~8MB)\ngen_expr = (x for x in range(10**6))  # O(1) Space (~100 Bytes)"
  },
  {
    question: "What is a Space-Time Trade-off?",
    shortAnswer: "A design technique where an algorithm consumes additional memory (O(N) space, such as a hash map or cache) to achieve significantly faster execution speed (O(1) time instead of O(N) search).",
    explanation: "Trading auxiliary memory for execution speed.",
    hint: "Using extra memory (like hash tables) to achieve faster execution time.",
    level: "basic",
    codeExample: "# Indexing a list into a dict trades O(N) RAM for O(1) query time"
  },
  {
    question: "What is the difference between Worst-Case, Average-Case, and Best-Case complexity?",
    shortAnswer: "Worst-case (Big-O) is the maximum time taken for any input; Average-case (Big-Theta) is expected time over typical inputs; Best-case (Big-Omega) is the minimum time (e.g. finding item at index 0 in O(1)).",
    explanation: "Asymptotic boundary scenarios.",
    hint: "Worst-case is upper bound, average-case is expected, best-case is lower bound.",
    level: "basic",
    codeExample: "# Linear search: Best = O(1), Worst = O(N), Average = O(N)"
  },
  {
    question: "What is the difference between Big-O (O), Big-Omega (Ω), and Big-Theta (Θ)?",
    shortAnswer: "Big-O (O) represents the asymptotic upper bound (worst case); Big-Omega (Ω) represents the asymptotic lower bound (best case); Big-Theta (Θ) represents the tight asymptotic bound where upper and lower bounds coincide.",
    explanation: "Formal asymptotic notation bounds.",
    hint: "Big-O is upper bound, Big-Omega is lower bound, Big-Theta is exact tight bound.",
    level: "complex",
    codeExample: "# Formal mathematical notation definitions"
  },
  {
    question: "What is the time complexity of appending to a Python list ('list.append(x)') vs inserting at the beginning ('list.insert(0, x)')?",
    shortAnswer: "'list.append(x)' is O(1) amortized constant time; 'list.insert(0, x)' is O(N) linear time because all existing N elements must be shifted in contiguous memory.",
    explanation: "Dynamic array memory reallocation and shifting.",
    hint: "append is O(1) amortized; insert(0) is O(N) due to memory shifting.",
    level: "basic",
    codeExample: "my_list.append(x) # O(1) Amortized\nmy_list.insert(0, x) # O(N) Linear Shift"
  },
  {
    question: "What data structure should you use when you need O(1) insertions and deletions at BOTH ends of a sequence?",
    shortAnswer: "'collections.deque' (Double-Ended Queue), which provides O(1) time complexity for 'append()', 'appendleft()', 'pop()', and 'popleft()'.",
    explanation: "Doubly-linked memory block queue.",
    hint: "collections.deque provides O(1) operations at both ends.",
    level: "basic",
    codeExample: "from collections import deque\nq = deque(); q.appendleft(1); q.pop() # All O(1)"
  },
  {
    question: "What is the time complexity of computing a substring slice in Python ('s[10:1000]')?",
    shortAnswer: "O(K) where K is the length of the slice, because Python strings are immutable and slicing creates a new string object copying K characters.",
    explanation: "Immutable string slice copying.",
    hint: "O(K) where K is the slice length, because characters are copied into a new string.",
    level: "moderate",
    codeExample: "sub = text[a:b] # O(b - a) Time and Space"
  },
  {
    question: "What is the time complexity of checking membership in a Set ('x in my_set')?",
    shortAnswer: "O(1) Constant Time on average, because Python sets use hash tables with O(1) key hashing.",
    explanation: "Hash set membership testing.",
    hint: "O(1) on average via hash lookup.",
    level: "basic",
    codeExample: "if student_id in active_student_set: # O(1) Constant Time"
  },
  {
    question: "Why does naive recursive Fibonacci have O(2^N) exponential time complexity?",
    shortAnswer: "Because each function call branches into 2 sub-calls ('fib(n-1) + fib(n-2)'), creating a binary call tree of depth N containing 2^N redundant computations.",
    explanation: "Recursive branching tree explosion.",
    hint: "Each call spawns 2 more calls, doubling work at every recursive level.",
    level: "moderate",
    codeExample: "def fib(n): return n if n <= 1 else fib(n-1) + fib(n-2) # O(2^N)"
  },
  {
    question: "How do you optimize recursive Fibonacci from O(2^N) to O(N) time and O(1) space?",
    shortAnswer: "Using dynamic programming / memoization or an iterative bottom-up approach storing only the last two computed terms.",
    explanation: "Dynamic programming state reduction.",
    hint: "Use an iterative loop keeping track of the last two values (a, b = b, a + b).",
    level: "basic",
    codeExample: "def fib_opt(n): a, b = 0, 1\nfor _ in range(n): a, b = b, a + b\nreturn a # O(N) Time, O(1) Space"
  },
  {
    question: "What is the time complexity of 'min(my_list)' and 'max(my_list)'?",
    shortAnswer: "O(N) Linear Time, because Python must inspect all N elements in the list to determine the minimum or maximum value.",
    explanation: "Linear array reduction.",
    hint: "O(N) because it must inspect every element.",
    level: "basic",
    codeExample: "lowest = min(scores) # O(N)"
  },
  {
    question: "What is the time complexity of converting a list of N items into a set ('set(my_list)')?",
    shortAnswer: "O(N) Time and O(N) Space, because it iterates through all N items and hashes each into the new set.",
    explanation: "Bulk hash set instantiation.",
    hint: "O(N) time and O(N) space to hash and insert N elements.",
    level: "basic",
    codeExample: "unique_ids = set(raw_id_list) # O(N) Time, O(N) Space"
  },
  {
    question: "How do you measure object memory consumption accurately in Python?",
    shortAnswer: "Using 'sys.getsizeof(obj)', which returns the memory footprint allocated by the Python runtime in bytes.",
    explanation: "Built-in memory introspection.",
    hint: "sys.getsizeof(obj) returns the object size in bytes.",
    level: "basic",
    codeExample: "import sys\nbytes_used = sys.getsizeof(data_structure)"
  },
  {
    question: "What is Amortized Time Complexity?",
    shortAnswer: "The average time taken per operation over a sequence of operations; for example, 'list.append()' is O(1) amortized because expensive O(N) array resize reallocations occur infrequently.",
    explanation: "Amortized cost distribution.",
    hint: "The average cost over a series of operations, smoothing out rare expensive spikes.",
    level: "complex",
    codeExample: "# Dynamic array doubling ensures O(1) amortized append"
  },
  {
    question: "How does nested loop refactoring with a dictionary index improve reconciliation performance?",
    shortAnswer: "It replaces an O(N * M) nested scan (which takes billions of operations for large datasets) with an O(M) index build plus O(N) lookups, yielding O(N + M) total linear time (1000x+ faster).",
    explanation: "Dictionary indexing optimization pattern.",
    hint: "Collapses O(N * M) quadratic comparisons into O(N + M) linear hash lookups.",
    level: "moderate",
    codeExample: "index = {item.id: item for item in list_b}\nmatches = [index.get(x.id) for x in list_a] # O(N + M)"
  },
  {
    question: "What is the ultimate golden rule of Big-O complexity in Python?",
    shortAnswer: "Always analyze algorithmic complexity before optimizing code: prefer O(1) and O(log N) lookups over O(N), eliminate O(N^2) nested loops by indexing into dictionaries, and use generators for O(1) streaming memory.",
    explanation: "The complete enterprise guideline for Big-O thinking in Python.",
    hint: "Use dicts for O(1) lookups, avoid nested O(N^2) loops, and use generators for O(1) memory.",
    level: "basic",
    codeExample: "# Python Big-O Mastery"
  }
];

export default questions;
