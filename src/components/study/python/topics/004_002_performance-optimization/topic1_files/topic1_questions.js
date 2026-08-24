// src/components/study/python/topics/004_002_performance-optimization/topic1_files/topic1_questions.js
// Comprehensive Master Review Questions for Topic 1: Comparing lookup costs across Python data structures (list, set, dict, deque)

const questions = [
  {
    question: "What is the time complexity of searching for an element using 'x in collection' across list, set, dict, and deque?",
    shortAnswer: "Set and Dict are O(1) Constant Time on average (hash table lookup); List and Deque are O(N) Linear Time (sequential element-by-element scan).",
    explanation: "Data structure membership search complexity.",
    hint: "Set/Dict are O(1) via hash table; List/Deque are O(N) via linear scan.",
    level: "basic",
    codeExample: "# Set/Dict = O(1); List/Deque = O(N)"
  },
  {
    question: "Why is 'x in my_set' so much faster than 'x in my_list' for large collections?",
    shortAnswer: "Sets compute the hash code of 'x' to jump directly to the target memory bucket in O(1) time, whereas lists must iterate through each item sequentially from index 0 until a match is found.",
    explanation: "Hash table direct addressing vs array linear scanning.",
    hint: "Sets use hash codes for direct memory bucket lookup in O(1) time.",
    level: "basic",
    codeExample: "if target_id in student_set: # O(1) Constant Time"
  },
  {
    question: "Why is 'list.insert(0, x)' an O(N) operation in Python?",
    shortAnswer: "Python lists are contiguous dynamic arrays; inserting an element at index 0 requires CPython to shift all existing N element pointers one position to the right in memory via 'memmove()'.",
    explanation: "Contiguous array element shifting overhead.",
    hint: "Forces CPython to shift all N elements to the right in memory.",
    level: "basic",
    codeExample: "my_list.insert(0, 'head') # O(N) Memory Shift"
  },
  {
    question: "How does 'collections.deque' achieve O(1) time complexity for 'appendleft()' and 'popleft()'?",
    shortAnswer: "'deque' is implemented as a doubly linked list of fixed-size blocks (64 elements per block); adding or removing at the head simply updates block pointers without shifting any elements.",
    explanation: "Doubly linked memory block architecture.",
    hint: "Uses a doubly linked list of 64-element blocks, updating pointers in O(1) time.",
    level: "moderate",
    codeExample: "from collections import deque\nq = deque()\nq.appendleft(10) # O(1) Instant link"
  },
  {
    question: "What is the time complexity of indexing into the middle of a deque ('my_deque[N // 2]') versus a list ('my_list[N // 2]')?",
    shortAnswer: "List indexing is O(1) Constant Time (direct pointer arithmetic); Deque middle indexing is O(N) Linear Time (traversing the linked blocks from the nearest end).",
    explanation: "Direct array pointer offset vs linked block traversal.",
    hint: "List is O(1) direct indexing; Deque is O(N) because it must traverse blocks.",
    level: "moderate",
    codeExample: "val = my_list[5000]  # O(1)\nval = my_deque[5000] # O(N) Block Traversal"
  },
  {
    question: "Why does 'list.append()' have O(1) amortized time complexity rather than strict O(1)?",
    shortAnswer: "Because most appends write directly into pre-allocated buffer space in O(1), but when the buffer fills, CPython must allocate a larger array and copy all elements over in O(N) time.",
    explanation: "Dynamic array over-allocation and reallocation amortization.",
    hint: "Occasional O(N) array resize reallocations are amortized over many O(1) appends.",
    level: "complex",
    codeExample: "# CPython over-allocation formula: new_allocated = size + (size >> 3) + 6"
  },
  {
    question: "Why do 'dict' and 'set' consume significantly more memory than 'list' and 'tuple' for the same number of items?",
    shortAnswer: "Because hash tables require sparse bucket arrays (roughly 1/3 empty to minimize hash collisions) and store hash values and keys alongside data pointers.",
    explanation: "Hash table sparsity and entry struct memory overhead.",
    hint: "Hash tables maintain empty buckets and hash metadata to prevent collisions.",
    level: "basic",
    codeExample: "sys.getsizeof(my_dict) > sys.getsizeof(my_list) # Dict has ~4x-8x overhead"
  },
  {
    question: "Why are 'tuple' objects more memory-efficient than 'list' objects in Python?",
    shortAnswer: "Tuples are immutable, allowing CPython to allocate the exact memory needed with zero extra over-allocation buffers; lists must allocate surplus capacity for future appends.",
    explanation: "Immutable exact-fit memory allocation.",
    hint: "Tuples allocate exact memory with zero surplus capacity buffer.",
    level: "basic",
    codeExample: "sys.getsizeof((1, 2, 3)) < sys.getsizeof([1, 2, 3])"
  },
  {
    question: "What is CPU cache locality and why do lists and tuples have better cache locality than dicts and linked structures?",
    shortAnswer: "Lists and tuples store element pointers in contiguous linear memory, allowing the CPU hardware prefetcher to load adjacent items into L1/L2 caches; dicts and linked nodes cause random memory pointer chasing.",
    explanation: "CPU L1/L2 cache prefetching in contiguous memory.",
    hint: "Contiguous arrays enable CPU hardware prefetching into high-speed L1/L2 cache.",
    level: "complex",
    codeExample: "# Contiguous memory arrays maximize CPU cache hit rates"
  },
  {
    question: "What data structure should you use to implement a FIFO (First-In, First-Out) queue in Python?",
    shortAnswer: "'collections.deque', using 'append()' to enqueue and 'popleft()' to dequeue in O(1) time.",
    explanation: "FIFO queue implementation standard.",
    hint: "Use collections.deque with append() and popleft().",
    level: "basic",
    codeExample: "from collections import deque\nqueue = deque()\nqueue.append(task)\nitem = queue.popleft() # O(1)"
  },
  {
    question: "Why is using a Python list as a FIFO queue with 'list.pop(0)' considered a major performance anti-pattern?",
    shortAnswer: "Because 'list.pop(0)' is an O(N) operation that shifts all remaining elements on every pop, turning N queue operations into catastrophic O(N^2) total execution time.",
    explanation: "Quadratic queue degradation anti-pattern.",
    hint: "Shifting elements on every pop(0) makes queue processing O(N^2) instead of O(N).",
    level: "basic",
    codeExample: "# AVOID: while q: item = q.pop(0) -> O(N^2) total!"
  },
  {
    question: "What is the time complexity of deleting a key from a dictionary ('del dict[key]') or removing an item from a set ('set.remove(x)')?",
    shortAnswer: "O(1) Constant Time on average, as the key's hash bucket is located and marked as a dummy/deleted entry in constant time.",
    explanation: "Hash table tombstone deletion complexity.",
    hint: "O(1) on average via hash lookup and tombstone marking.",
    level: "basic",
    codeExample: "del student_dict['STU-101'] # O(1) Average"
  },
  {
    question: "What is the time complexity of removing an item from a list by value ('list.remove(x)')?",
    shortAnswer: "O(N) Linear Time, because Python must first linearly scan for the item and then shift all subsequent elements in memory.",
    explanation: "Linear scan plus memory shift.",
    hint: "O(N) because it requires both a linear search and array element shifting.",
    level: "basic",
    codeExample: "my_list.remove('target') # O(N) Time"
  },
  {
    question: "What is the time complexity of getting the length of any built-in Python collection ('len(ds)')?",
    shortAnswer: "O(1) Constant Time for list, tuple, set, dict, and deque, because CPython stores the element count in the object's C header struct ('ob_size') and reads it directly.",
    explanation: "C struct size attribute introspection.",
    hint: "O(1) constant time because CPython reads the ob_size field directly.",
    level: "basic",
    codeExample: "length = len(any_collection) # O(1) Instant"
  },
  {
    question: "What is the worst-case time complexity of dictionary lookup and when does it occur?",
    shortAnswer: "O(N) Linear Time, which occurs when all inserted keys collide on the exact same hash bucket (hash collision storm), forcing a linear probe through all entries.",
    explanation: "Hash collision worst-case degradation.",
    hint: "O(N) in pathological cases where all keys hash to the same bucket.",
    level: "complex",
    codeExample: "# Hash collision storm worst-case: O(N)"
  },
  {
    question: "How do you choose between a List, Set, Dict, and Deque in system design?",
    shortAnswer: "Use Set for fast O(1) uniqueness/membership checks; Dict for O(1) key-value mappings; Deque for O(1) FIFO queues/sliding windows; List for ordered indexed sequences.",
    explanation: "Data structure decision framework.",
    hint: "Set for membership, Dict for mappings, Deque for FIFO queues, List for indexed order.",
    level: "basic",
    codeExample: "# Production Data Structure Strategy"
  },
  {
    question: "What is the time complexity of converting a set of N elements to a list ('list(my_set)')?",
    shortAnswer: "O(N) Time and O(N) Space, as it iterates through all N entries in the hash table and copies pointers into a new contiguous array.",
    explanation: "Bulk collection type conversion.",
    hint: "O(N) time and space to iterate and allocate the array.",
    level: "basic",
    codeExample: "ordered = list(unique_set) # O(N)"
  },
  {
    question: "What is the time complexity of checking if a key exists in a dictionary using 'key in dict' vs 'key in dict.keys()' in Python 3?",
    shortAnswer: "Both are O(1) Constant Time, because in Python 3 'dict.keys()' returns a dynamic dictionary view object that performs O(1) hash lookups directly on the underlying table.",
    explanation: "Dictionary view lookup mechanics in Python 3.",
    hint: "Both are O(1) because dict.keys() is a view object performing hash lookups.",
    level: "moderate",
    codeExample: "if 'k' in my_dict: # O(1)\nif 'k' in my_dict.keys(): # O(1)"
  },
  {
    question: "What is the time complexity of checking if a value exists in a dictionary using 'val in dict.values()'?",
    shortAnswer: "O(N) Linear Time, because dictionary values are not indexed by a hash table; Python must iterate through all values sequentially.",
    explanation: "Dictionary value linear iteration.",
    hint: "O(N) because values are not hashed, requiring a linear scan.",
    level: "basic",
    codeExample: "if 'target' in my_dict.values(): # O(N) Linear Scan"
  },
  {
    question: "What is the time complexity of finding the intersection of two sets ('set_a & set_b')?",
    shortAnswer: "O(min(len(set_a), len(set_b))), because Python iterates over the smaller set and performs O(1) lookups in the larger set.",
    explanation: "Set intersection optimization in CPython.",
    hint: "O(min(len(A), len(B))) by iterating over the smaller set with O(1) lookups in the larger.",
    level: "moderate",
    codeExample: "common = set_a & set_b # O(min(len(A), len(B)))"
  },
  {
    question: "How much faster is membership search in a set compared to a list for 100,000 items?",
    shortAnswer: "Typically 5,000x to 15,000x faster, reducing lookup time from ~1.5 milliseconds (list scan) to ~0.0001 milliseconds (set hash lookup).",
    explanation: "Empirical latency divergence at scale.",
    hint: "5,000x to 15,000x faster for 100,000 elements.",
    level: "basic",
    codeExample: "# Set lookup (~50ns) vs List lookup (~1.5ms)"
  },
  {
    question: "What is the difference between 'deque(maxlen=K)' and a standard list for rolling buffers?",
    shortAnswer: "'deque(maxlen=K)' automatically discards old elements from the opposite end in O(1) time when new items are added beyond size K, maintaining a fixed-size window with zero memory shifting.",
    explanation: "Bounded double-ended queue sliding window.",
    hint: "Automatically evicts oldest items in O(1) time when reaching maxlen.",
    level: "basic",
    codeExample: "history = deque(maxlen=100) # Fixed-size rolling buffer"
  },
  {
    question: "Why should you never write 'if x in [1, 2, 3, ...]' inside a loop over N items?",
    shortAnswer: "Because it constructs a new list and performs an O(M) linear search on every iteration, leading to O(N * M) time; defining a set '{1, 2, 3, ...}' outside the loop makes lookups O(1) for O(N) total time.",
    explanation: "Loop invariant set hoisting optimization.",
    hint: "Hoisting the collection outside as a set converts O(N * M) into O(N).",
    level: "basic",
    codeExample: "VALID_SET = {1, 2, 3}\nfor x in data: if x in VALID_SET: ..."
  },
  {
    question: "What is the time complexity of extending a list ('list.extend(other_list)') vs extending a deque ('deque.extend(other_deque)')?",
    shortAnswer: "Both are O(K) where K is the length of the second collection, efficiently copying memory blocks in bulk.",
    explanation: "Bulk extension complexity.",
    hint: "O(K) where K is the number of elements being added.",
    level: "basic",
    codeExample: "my_list.extend(batch) # O(K)"
  },
  {
    question: "What is the ultimate golden rule for selecting data structures in Python?",
    shortAnswer: "Match data structures to operational access patterns: convert to 'set' for frequent membership checks, use 'dict' for key lookups, use 'collections.deque' for FIFO queues and rolling windows, and use 'list' for indexed order.",
    explanation: "The complete enterprise guideline for Python data structure selection.",
    hint: "Use sets for lookups, dicts for mappings, deques for FIFO queues, and lists for indexed order.",
    level: "basic",
    codeExample: "# Python Data Structure Performance Mastery"
  }
];

export default questions;
