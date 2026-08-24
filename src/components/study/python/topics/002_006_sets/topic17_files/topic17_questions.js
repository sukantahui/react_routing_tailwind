// src/components/study/python/topics/002_006_sets/topic17_files/topic17_questions.js
// 30 Comprehensive Master Review Questions for Topic 17: Performance Benefits of Sets

const questions = [
  {
    question: "What is the average time complexity of checking membership ('x in s') in a Python set vs a Python list?",
    shortAnswer: "Set membership is O(1) constant time; List membership is O(N) linear time.",
    explanation: "Sets compute the hash of the query item and jump directly to the target bucket in O(1) time. Lists must scan items sequentially from start to end, taking O(N) operations in the worst case.",
    hint: "Set is O(1); List is O(N).",
    level: "basic",
    codeExample: "# Set: O(1) constant time\n# List: O(N) linear scan time"
  },
  {
    question: "Why does the lookup time in a set remain virtually flat as the number of elements grows from 1,000 to 1,000,000?",
    shortAnswer: "Because computing hash(x) and jumping to the bucket index takes the exact same number of CPU cycles regardless of set size.",
    explanation: "In an open-addressing hash table with low collision rates, finding a bucket requires only a hash computation and array index calculation, independent of total element count N.",
    hint: "Hash calculation takes constant time regardless of collection size.",
    level: "moderate",
    codeExample: "# 1,000 items -> ~50 nanoseconds\n# 1,000,000 items -> ~50 nanoseconds (Flat O(1) curve!)"
  },
  {
    question: "What is the worst-case time complexity of set lookup and when does it occur?",
    shortAnswer: "O(N) worst-case time, occurring when all elements produce severe hash collisions.",
    explanation: "If a malicious attacker crafts input where hash(x1) == hash(x2) == ... == hash(xN), Python is forced to probe linearly down the table, degrading to O(N). Python uses SipHash to protect against hash collision attacks.",
    hint: "Catastrophic hash collisions cause O(N) worst-case degradation.",
    level: "expert",
    codeExample: "# Worst case O(N) on pathological hash collisions (rare/attack scenarios)"
  },
  {
    question: "What is the time complexity of set intersection: set_a & set_b?",
    shortAnswer: "O(min(len(A), len(B))) on average.",
    explanation: "Python optimizes set intersection by always iterating over the smaller set and performing O(1) lookups in the larger set.",
    hint: "Python loops over the smaller set.",
    level: "moderate",
    codeExample: "# Time: O(min(len(A), len(B)))"
  },
  {
    question: "Why is set_a & set_b dramatically faster than [x for x in list_a if x in list_b]?",
    shortAnswer: "The nested list comprehension runs in O(len(A) * len(B)) quadratic time with Python bytecode overhead; set intersection runs in C at O(min(len(A), len(B))) time.",
    explanation: "For 50,000 items each, nested lists perform 2.5 billion iterations taking minutes; set algebra executes in C in under 5 milliseconds (10,000x faster).",
    hint: "Set intersection avoids O(A*B) quadratic scanning and runs inside C code.",
    level: "expert",
    codeExample: "# Nested List: O(A * B) -> Slow!\n# Set Algebra: O(min(A, B)) -> Instant!"
  },
  {
    question: "What is the space-time trade-off associated with Python sets?",
    shortAnswer: "Sets trade higher memory usage (~4-8x more RAM than lists) to achieve O(1) constant time lookup speed.",
    explanation: "The sparse hash table structure, collision handling metadata, and load factor threshold (~2/3) require pre-allocating extra empty buckets in RAM.",
    hint: "More RAM in exchange for O(1) speed.",
    level: "basic",
    codeExample: "# Lists: Compact contiguous memory (~8 bytes per pointer)\n# Sets:  Sparse hash table (~32-64 bytes per entry)"
  },
  {
    question: "What is the time complexity of deleting an element from a set via set.remove() or set.discard()?",
    shortAnswer: "O(1) average time complexity.",
    explanation: "Python locates the hash bucket in O(1) and marks the slot as a 'dummy' placeholder without shifting any other array elements.",
    hint: "Set deletion marks dummy slots in O(1) without shifting.",
    level: "moderate",
    codeExample: "s = {1, 2, 3}\ns.discard(2)  # O(1) time"
  },
  {
    question: "Why is list.remove(x) an O(N) operation while set.remove(x) is O(1)?",
    shortAnswer: "list.remove() must linearly scan for x and then shift all subsequent array pointers left to close the gap; set.remove() directly modifies the bucket.",
    explanation: "Array memory compaction in lists forces memory copying proportional to the number of remaining elements.",
    hint: "List removal requires shifting subsequent array pointers.",
    level: "expert",
    codeExample: "# list.remove(x): Scan O(N) + Shift O(N) = O(N)\n# set.remove(x):  Hash O(1) + Mark Dummy O(1) = O(1)"
  },
  {
    question: "What is the time complexity of set union: set_a | set_b?",
    shortAnswer: "O(len(A) + len(B)).",
    explanation: "Python copies set A into a new hash table and inserts all elements from set B in O(1) time per item.",
    hint: "Proportional to the sum of lengths of both sets.",
    level: "moderate",
    codeExample: "# Time: O(len(A) + len(B))"
  },
  {
    question: "What is the time complexity of set difference: set_a - set_b?",
    shortAnswer: "O(len(A)).",
    explanation: "Python iterates through set A and checks membership in set B in O(1) time per element.",
    hint: "Proportional to the length of the left set A.",
    level: "moderate",
    codeExample: "# Time: O(len(A))"
  },
  {
    question: "How does set.isdisjoint() optimize performance compared to checking if len(A & B) == 0?",
    shortAnswer: "isdisjoint() short-circuits on the very first common element without allocating an intermediate intersection set in memory.",
    explanation: "A & B allocates an entirely new set in RAM; isdisjoint() loops over the smaller set and returns False immediately on finding 1 match.",
    hint: "isdisjoint short-circuits and allocates zero memory.",
    level: "expert",
    codeExample: "# SLOW: len(A & B) == 0  (Allocates memory)\n# FAST: A.isdisjoint(B)  (Short-circuits O(1))"
  },
  {
    question: "If a function performs 10,000 membership checks against an unchanging list of 5,000 items, how should you optimize it?",
    shortAnswer: "Convert the list to a set once before the loop: lookup_set = set(my_list).",
    explanation: "Converting costs O(N) once, and reduces 10,000 * O(N) checks (50,000,000 operations) to 10,000 * O(1) checks (10,000 operations), achieving a 5,000x speedup.",
    hint: "Pre-convert list to set outside the query loop.",
    level: "basic",
    codeExample: "raw_list = list(range(5000))\n# Convert once:\nlookup_set = set(raw_list)\n# Now all 10,000 queries run in O(1) nanoseconds"
  },
  {
    question: "What is the time complexity of adding N items to an empty set using a loop?",
    shortAnswer: "O(N) total time (amortized O(1) per insertion).",
    explanation: "While individual insertions may occasionally trigger table resizing (doubling the table), the amortized cost per item remains O(1).",
    hint: "Amortized O(1) per add yields O(N) total.",
    level: "moderate",
    codeExample: "# Adding N items takes O(N) amortized total time"
  },
  {
    question: "Why are set operations implemented in C inside CPython faster than equivalent Python bytecode loops?",
    shortAnswer: "CPython executes set methods directly in compiled C code, bypassing Python bytecode dispatch, opcode interpretation, and dynamic type checks.",
    explanation: "C loops run at native processor speed with zero VM interpreter overhead.",
    hint: "C-level routines bypass bytecode interpreter overhead.",
    level: "expert",
    codeExample: "# set.intersection() executes in compiled C"
  },
  {
    question: "What is the time complexity of copying a set using set.copy() or set(s)?",
    shortAnswer: "O(N) linear time where N is the number of elements in the set.",
    explanation: "Python allocates a new hash table and copies references to all N elements.",
    hint: "O(N) to copy all element references.",
    level: "basic",
    codeExample: "# Time: O(len(s))"
  },
  {
    question: "What happens to the performance of a set when its size shrinks drastically after many pop() or remove() calls?",
    shortAnswer: "CPython maintains the table size until explicit rehashing occurs; the table does not shrink on every single delete to prevent thrashing.",
    explanation: "CPython resizes down only when significant deletions lower the active entry count below 1/4 capacity.",
    hint: "CPython avoids shrinking on every deletion to prevent memory thrashing.",
    level: "expert",
    codeExample: "# Deletions leave dummy markers; table resizes down periodically"
  },
  {
    question: "How does set lookup performance assist web application firewalls (WAF) in blocking malicious IPs?",
    shortAnswer: "By checking incoming IP addresses against a blacklist set (if ip in BLACKLIST_SET) in ~50 nanoseconds per request.",
    explanation: "O(1) lookups allow firewalls to inspect 100,000+ incoming requests per second without adding latency.",
    hint: "O(1) lookup allows inspecting 100k req/sec with zero latency penalty.",
    level: "basic",
    codeExample: "BANNED_IPS = {\"192.168.1.1\", \"10.0.0.5\"}\nif client_ip in BANNED_IPS:  # O(1) Instant Drop!\n    drop_connection()"
  },
  {
    question: "What is the time complexity of checking if a set is empty using bool(s) or len(s) == 0?",
    shortAnswer: "O(1) constant time.",
    explanation: "CPython stores the active element count as an integer attribute (used_count) on the PySetObject struct, accessible in O(1) time.",
    hint: "Element count is stored directly as a struct field.",
    level: "basic",
    codeExample: "# bool(s) reads PySetObject->used in O(1)"
  },
  {
    question: "Why does searching for a string in a set of 1,000,000 strings take roughly the same time as searching in a set of 10 strings?",
    shortAnswer: "Because hash computation time depends on the length of the string, not the number of strings in the set.",
    explanation: "Once hash(string) is calculated, the bucket jump is immediate regardless of set size.",
    hint: "Hash time depends on string length, not set size.",
    level: "expert",
    codeExample: "# Query time is independent of set size N"
  },
  {
    question: "What is the time complexity of min(s) and max(s) on a set?",
    shortAnswer: "O(N) linear time.",
    explanation: "Because sets are unordered hash tables, finding the minimum or maximum element requires scanning every single element in the set.",
    hint: "Must scan all elements to find min or max.",
    level: "moderate",
    codeExample: "# min(s) and max(s) take O(N) time"
  },
  {
    question: "What is the time complexity of set comprehension {f(x) for x in data}?",
    shortAnswer: "O(N) where N is the length of data (assuming f(x) and hash(x) are O(1)).",
    explanation: "It loops through N items, transforms each, and performs an O(1) set insertion.",
    hint: "O(N) overall time.",
    level: "basic",
    codeExample: "# Time: O(N)"
  },
  {
    question: "How do sets optimize relational database joins when implemented in Python ORMs?",
    shortAnswer: "By loading foreign keys into sets, the ORM can perform in-memory hash joins in O(N + M) time instead of O(N * M) nested loop joins.",
    explanation: "Converting the join column of one table into a set allows matching rows in O(1) time per record.",
    hint: "Enables O(N + M) hash joins instead of O(N * M) nested loops.",
    level: "expert",
    codeExample: "# Hash Join: O(N + M) vs Nested Loop: O(N * M)"
  },
  {
    question: "Can set operations be parallelized across multiple CPU threads in Python?",
    shortAnswer: "Pure Python set operations are serialized by the Global Interpreter Lock (GIL); multi-processing or C extensions (like NumPy) are required for CPU multi-threading.",
    explanation: "While read-only frozenset queries can be shared across threads, mutating sets requires thread coordination.",
    hint: "GIL serializes Python bytecode; use multiprocessing for true parallel execution.",
    level: "expert",
    codeExample: "# Read-only frozenset is thread-safe; use multiprocessing for parallel scaling"
  },
  {
    question: "What is the time complexity of converting a list of N elements into a set: set(my_list)?",
    shortAnswer: "O(N) linear time.",
    explanation: "Python iterates through the N elements and inserts each into the new hash table in O(1) amortized time.",
    hint: "O(N) linear time to build the set.",
    level: "basic",
    codeExample: "s = set(range(1000000))  # O(N) time"
  },
  {
    question: "How does set deduplication optimize search engine web crawlers?",
    shortAnswer: "By storing visited URLs in a set, the crawler checks if a link has been visited before enqueueing it in O(1) time.",
    explanation: "This prevents the crawler from getting stuck in infinite crawl loops or processing duplicate web pages.",
    hint: "Prevents duplicate web crawls with O(1) URL checks.",
    level: "basic",
    codeExample: "visited = set()\ndef crawl(url):\n    if url in visited: return\n    visited.add(url)"
  },
  {
    question: "What is the memory size overhead of a set compared to a list in 64-bit Python for 100,000 integers?",
    shortAnswer: "List uses ~800 KB; Set uses ~8.3 MB (~10x larger).",
    explanation: "The open-addressing hash table maintains empty buckets, hash codes, and pointer structures that multiply memory footprint.",
    hint: "Sets use ~10x more memory than lists for large integer collections.",
    level: "expert",
    codeExample: "# 100K ints: List ~800 KB vs Set ~8.3 MB"
  },
  {
    question: "When should you NOT use a set despite its O(1) lookup speed?",
    shortAnswer: "When memory is strictly constrained, when you only perform 1 or 2 total queries, or when element sequence order must be preserved.",
    explanation: "For a single query on small data (N < 20), converting to a set has more overhead than a simple linear scan.",
    hint: "Avoid sets for tiny collections (N < 20) with single queries or tight memory limits.",
    level: "moderate",
    codeExample: "# Small list with 1 lookup: 'x in [1, 2, 3]' is faster than 'x in set([1, 2, 3])'"
  },
  {
    question: "What is the time complexity of checking if a set is a subset of another set: set_a <= set_b?",
    shortAnswer: "O(len(A)) with short-circuiting.",
    explanation: "Python checks each element of set A in set B in O(1) time and returns False as soon as 1 element is missing.",
    hint: "O(len(A)) with early exit.",
    level: "moderate",
    codeExample: "# Time: O(len(A))"
  },
  {
    question: "How do sets enable high-speed financial tax exemption audits in West Bengal?",
    shortAnswer: "By loading 10,000 exempt PAN IDs into a set, auditing 250,000 transactions completes in ~0.03 seconds via 250,000 O(1) hash checks.",
    explanation: "Using a list would take 250,000 * 10,000 = 2.5 billion comparisons (~15 seconds). Sets make high-volume audits instantaneous.",
    hint: "Replaces 2.5 billion list checks with 250,000 O(1) hash lookups.",
    level: "basic",
    codeExample: "# Audit: [txn for txn in txns if txn['pan'] in exempt_pan_set]"
  },
  {
    question: "What is the master takeaway for software performance regarding Python sets?",
    shortAnswer: "Sets are the ultimate algorithmic weapon for transforming O(N) and O(N^2) search and comparison bottlenecks into blazingly fast O(1) and O(N) operations.",
    explanation: "Whenever your profiling tools detect slow membership scans or nested loops, introducing a set will deliver orders-of-magnitude speedups.",
    hint: "Sets turn O(N^2) bottlenecks into O(N) / O(1) speed.",
    level: "basic",
    codeExample: "# Performance Golden Rule:\n# Frequent 'in' queries? -> USE A SET!"
  }
];

export default questions;
