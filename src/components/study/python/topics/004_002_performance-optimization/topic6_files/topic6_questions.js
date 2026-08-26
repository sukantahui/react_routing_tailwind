// src/components/study/python/topics/004_002_performance-optimization/topic6_files/topic6_questions.js
// Comprehensive Master Review Questions for Topic 6: collections module: deque, Counter, defaultdict, OrderedDict, namedtuple

const questions = [
  {
    question: "Why is 'collections.deque' vastly superior to a standard Python list for FIFO queues?",
    shortAnswer: "'collections.deque' performs appends and pops from both ends in O(1) constant time because it is implemented as a doubly-linked list of fixed-size memory blocks, whereas 'list.pop(0)' or 'list.insert(0)' requires shifting every subsequent element in memory, taking O(N) linear time.",
    explanation: "Doubly-linked memory block architecture vs contiguous array shifting.",
    hint: "Think about O(1) constant time end operations vs O(N) array element shifting for list.pop(0).",
    level: "basic",
    codeExample: "from collections import deque\nq = deque()\nq.append('First')\nitem = q.popleft() # Instant O(1)"
  },
  {
    question: "How does the 'maxlen' parameter in 'deque' enable fixed-size ring buffers?",
    shortAnswer: "When a deque with 'maxlen=K' is full, appending a new element automatically and silently discards the oldest element from the opposing end in O(1) time without manual size-checking or trimming.",
    explanation: "Automatic boundary-capped sliding window eviction.",
    hint: "Passing maxlen=K auto-evicts the oldest item when new items are pushed.",
    level: "basic",
    codeExample: "recent_logs = deque(maxlen=3)\nfor i in range(5): recent_logs.append(i)\n# Result: deque([2, 3, 4], maxlen=3)"
  },
  {
    question: "How does 'Counter.most_common(k)' find top items without sorting the entire dataset?",
    shortAnswer: "'Counter.most_common(k)' utilizes 'heapq.nlargest' under the hood to maintain a min-heap of size K, achieving O(N log K) time complexity rather than the slower O(N log N) required by a full sort.",
    explanation: "Heap-based top-K selection vs full dataset sorting.",
    hint: "Uses a min-heap (heapq.nlargest) running in O(N log K) time.",
    level: "moderate",
    codeExample: "from collections import Counter\ntally = Counter(student_scores)\ntop_3 = tally.most_common(3) # O(N log 3)"
  },
  {
    question: "What multiset arithmetic operations are supported by Python's 'Counter' class?",
    shortAnswer: "Counter supports addition ('+'), subtraction ('-' retaining only positive counts), intersection ('&' keeping minimum counts), and union ('|' keeping maximum counts).",
    explanation: "Multiset / Bag algebraic operations.",
    hint: "You can combine counters using +, -, &, and | operators.",
    level: "moderate",
    codeExample: "c1 = Counter(a=3, b=1)\nc2 = Counter(a=1, b=2)\nunion = c1 | c2 # Counter({'a': 3, 'b': 2})"
  },
  {
    question: "What is the key performance benefit of 'defaultdict' over standard 'dict.setdefault()' inside tight loops?",
    shortAnswer: "'defaultdict' invokes its C-level default factory function only when a missing key is accessed, avoiding the unnecessary evaluation of default arguments on every iteration and eliminating manual 'if key not in dict' conditional branching.",
    explanation: "C-level default factory function invocation on KeyError.",
    hint: "defaultdict invokes the factory in C only on missing keys, avoiding redundant argument evaluations.",
    level: "basic",
    codeExample: "from collections import defaultdict\ngroups = defaultdict(list)\nfor s in students:\n    groups[s.campus].append(s) # No if-check needed"
  },
  {
    question: "How do you create an arbitrarily deep nested tree structure using 'defaultdict'?",
    shortAnswer: "By defining a recursive lambda factory: 'Tree = lambda: defaultdict(Tree)'.",
    explanation: "Recursive factory functions for auto-vivifying nested hierarchies.",
    hint: "Use lambda: defaultdict(Tree) to create infinite auto-vivified nested trees.",
    level: "complex",
    codeExample: "tree = lambda: defaultdict(tree)\ninstitution = tree()\ninstitution['Barrackpore']['Python']['Batch1'] = ['Mamata', 'Mahima']"
  },
  {
    question: "Since standard Python 3.7+ dictionaries maintain insertion order, why does 'OrderedDict' still exist?",
    shortAnswer: "'OrderedDict' provides order-aware specialized methods not available in standard dicts: 'move_to_end(key, last=True/False)' and 'popitem(last=True/False)', which are essential for implementing efficient O(1) LRU/MRU caches.",
    explanation: "Specialized order-manipulation methods (move_to_end, bidirectional popitem).",
    hint: "OrderedDict has move_to_end() and popitem(last=False) for LRU caching.",
    level: "moderate",
    codeExample: "from collections import OrderedDict\nlru = OrderedDict()\nlru['a'] = 1\nlru.move_to_end('a') # Move to most recently used"
  },
  {
    question: "How does 'namedtuple' compare to a standard Python class in terms of memory overhead?",
    shortAnswer: "'namedtuple' has the exact same compact memory footprint as a standard Python C tuple (no dynamic '__dict__' or '__weakref__' overhead), consuming ~60-70% less RAM than a standard class while providing clean named field access.",
    explanation: "C tuple struct subclassing with descriptor accessors.",
    hint: "namedtuples inherit from C tuples with zero __dict__ overhead.",
    level: "basic",
    codeExample: "from collections import namedtuple\nStudent = namedtuple('Student', ['id', 'name', 'fee'])\ns = Student('STU1', 'Mamata', 5000) # Compact C tuple"
  },
  {
    question: "Can you modify an attribute on a 'namedtuple' instance after creation?",
    shortAnswer: "No, 'namedtuple' instances are strictly immutable; to update a field, you must create a new instance using the '_replace()' helper method: 'new_s = s._replace(score=99)'.",
    explanation: "Immutability and functional update via _replace().",
    hint: "namedtuples are immutable; use s._replace(field=val) to produce a modified copy.",
    level: "basic",
    codeExample: "updated_student = s._replace(fee=4500)"
  },
  {
    question: "What is 'collections.ChainMap' and how does it optimize searching across multiple dictionaries?",
    shortAnswer: "'ChainMap' groups multiple dictionaries into a single logical mapping by reference without copying or merging their contents, searching through the mappings sequentially in O(1) setup time and zero extra memory.",
    explanation: "Zero-copy layered dictionary referencing.",
    hint: "Combines multiple dicts by reference without creating a combined copied dictionary.",
    level: "moderate",
    codeExample: "from collections import ChainMap\napp_config = ChainMap(cli_args, env_vars, default_settings)"
  },
  {
    question: "When you update or set a key in a 'ChainMap', which underlying dictionary is modified?",
    shortAnswer: "All mutations (writes, updates, deletions) are performed exclusively on the FIRST dictionary in the ChainMap ('maps[0]'), leaving the subsequent fallback dictionaries untouched.",
    explanation: "First-map mutation scoping in ChainMap.",
    hint: "Mutations only affect the first dictionary (maps[0]) in the chain.",
    level: "moderate",
    codeExample: "config = ChainMap(user_overrides, default_config)\nconfig['timeout'] = 10 # Writes to user_overrides only"
  },
  {
    question: "Why should you avoid random index access (e.g. 'deque[5000]') on a large 'collections.deque'?",
    shortAnswer: "Because a deque is a doubly-linked block list; indexing to the middle requires traversing block pointers from the nearest end in O(N) time, whereas a standard list provides instant O(1) random array indexing.",
    explanation: "Linked block traversal vs contiguous memory indexing.",
    hint: "Deques are optimized for ends (O(1)); accessing middle indices takes O(N) time.",
    level: "moderate",
    codeExample: "# SLOW: dq[50000] takes O(N) pointer traversals\n# FAST: list[50000] takes O(1) direct memory offset"
  },
  {
    question: "What happens when you access a missing key in a 'collections.Counter'?",
    shortAnswer: "Accessing a missing key in a 'Counter' returns '0' instead of raising a 'KeyError', making it safe for direct frequency increments and threshold checks.",
    explanation: "Missing key zero-defaulting behavior in Counter.",
    hint: "Counter returns 0 for missing keys instead of raising a KeyError.",
    level: "basic",
    codeExample: "counts = Counter()\nprint(counts['nonexistent']) # Returns 0 without KeyError"
  },
  {
    question: "How does 'deque.rotate(n)' work and what is its computational complexity?",
    shortAnswer: "'deque.rotate(n)' shifts all elements n steps to the right (or left if n is negative) in O(K) time where K = |n|, moving block pointers without reallocating memory.",
    explanation: "Pointer-based cyclic rotation in deque blocks.",
    hint: "dq.rotate(1) shifts items right by 1, wrapping the last item to the front in O(1).",
    level: "moderate",
    codeExample: "d = deque([1, 2, 3, 4])\nd.rotate(1) # deque([4, 1, 2, 3])"
  },
  {
    question: "What is the danger of passing a mutable object (like '[]') as a default value to 'namedtuple'?",
    shortAnswer: "All instances created with the default value will share the exact same mutable list object in memory, leading to unintended shared state bugs.",
    explanation: "Shared mutable default reference hazard.",
    hint: "Never use mutable defaults like [] in namedtuple; use None and initialize inside factories.",
    level: "moderate",
    codeExample: "# BAD: defaults={'tags': []} # Shared list across instances!\n# GOOD: defaults={'tags': None}"
  },
  {
    question: "How does 'Counter.update()' differ from standard 'dict.update()'?",
    shortAnswer: "'dict.update()' replaces existing key values with the new values, whereas 'Counter.update()' adds and accumulates the counts together.",
    explanation: "Count accumulation vs key overwrite semantics.",
    hint: "dict.update overwrites values; Counter.update adds counts together.",
    level: "basic",
    codeExample: "c = Counter({'a': 2})\nc.update({'a': 3}) # c['a'] becomes 5!"
  },
  {
    question: "How can you convert a 'namedtuple' instance into a regular Python dictionary?",
    shortAnswer: "By calling the built-in '._asdict()' method: 'student_dict = student_instance._asdict()'.",
    explanation: "Built-in dictionary serialization method for namedtuples.",
    hint: "Use instance._asdict()",
    level: "basic",
    codeExample: "s = Student('STU1', 'Mamata', 5000)\nd = s._asdict() # {'id': 'STU1', 'name': 'Mamata', 'fee': 5000}"
  },
  {
    question: "Why does 'defaultdict' populate a key when checked with 'if d[key]:'?",
    shortAnswer: "Because simply accessing 'd[key]' triggers '__missing__' and inserts the default value into the dictionary; to check existence without inserting, use 'if key in d:'.",
    explanation: "Auto-vivification side effect on key lookup.",
    hint: "Always check 'if key in d:' rather than 'd[key]' to avoid accidental insertion.",
    level: "basic",
    codeExample: "# BAD: if d['missing']: ... # Inserts 'missing': []!\n# GOOD: if 'missing' in d: ..."
  },
  {
    question: "How does 'ChainMap.new_child()' support scoped nested evaluation (e.g. template rendering, interpreters)?",
    shortAnswer: "'ChainMap.new_child(override_dict)' creates a new ChainMap with 'override_dict' at the head, representing a local lexical scope that shadows enclosing scopes without mutating outer variables.",
    explanation: "Lexical scoping and nested execution frame modeling.",
    hint: "Creates a new child scope that shadows parent scopes without mutating parent maps.",
    level: "complex",
    codeExample: "global_scope = ChainMap({'x': 10})\nlocal_scope = global_scope.new_child({'x': 20}) # Shadows x=10"
  },
  {
    question: "What is the ultimate golden rule for selecting containers from the 'collections' module?",
    shortAnswer: "Use 'deque' for high-throughput FIFO/LIFO queues and bounded ring buffers; 'Counter' for frequencies and multisets; 'defaultdict' for grouping and inverted indexes; 'OrderedDict' for LRU caches; 'namedtuple' for low-memory immutable records; and 'ChainMap' for layered hierarchical settings.",
    explanation: "The complete enterprise selection matrix for high-speed collections.",
    hint: "Choose the specialized container that matches your access pattern for maximum speed and minimal memory.",
    level: "basic",
    codeExample: "# High-Performance Collections Module Mastery"
  }
];

export default questions;
