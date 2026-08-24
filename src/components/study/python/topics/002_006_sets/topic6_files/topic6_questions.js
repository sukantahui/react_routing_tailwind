// src/components/study/python/topics/002_006_sets/topic6_files/topic6_questions.js
// 30 Comprehensive Master Review Questions for Topic 6: Membership Testing Using 'in' and 'not in'

const questions = [
  {
    question: "What is the average time complexity for checking membership with 'x in my_set' vs 'x in my_list'?",
    shortAnswer: "'x in my_set' is O(1) constant time; 'x in my_list' is O(N) linear time.",
    explanation: "In a list, Python must inspect each element sequentially from start to end (worst case N checks). In a set, Python calculates hash(x) and jumps directly to the target bucket in O(1) average time, making sets vastly superior for lookup operations.",
    hint: "Think about instant hash jump vs sequential item-by-item scan.",
    level: "basic",
    codeExample: "# Set lookup:  'item in s' -> O(1)\n# List lookup: 'item in l' -> O(N)"
  },
  {
    question: "What special dunder method is invoked under the hood when executing 'x in my_set'?",
    shortAnswer: "The __contains__(self, item) method.",
    explanation: "Python translates the membership expression 'x in s' directly into a call to s.__contains__(x), which evaluates the hash table lookup in CPython.",
    hint: "Think of the container protocol method name.",
    level: "moderate",
    codeExample: "s = {10, 20, 30}\nprint(s.__contains__(20))  # True (Equivalent to 20 in s)"
  },
  {
    question: "What is the result of evaluating 'True in {1, 2, 3}' and why?",
    shortAnswer: "True, because True == 1 and hash(True) == hash(1).",
    explanation: "Python evaluates membership by checking both hash equality and value equality. Because True == 1 is True and hash(True) == 1, Python finds 1 in the hash table and returns True.",
    hint: "Remember that True and 1 compare equal and share hash value 1.",
    level: "moderate",
    codeExample: "print(True in {1, 2, 3})   # True\nprint(False in {0, 2, 3})  # True"
  },
  {
    question: "Why does 'kolkata' in {'Kolkata', 'Barrackpore'} evaluate to False?",
    shortAnswer: "String membership is case-sensitive; 'kolkata' != 'Kolkata' and their hashes differ.",
    explanation: "Uppercase and lowercase characters have different Unicode code points ('K' = 75, 'k' = 107), resulting in different hashes and unequal comparisons.",
    hint: "Set membership respects exact character casing.",
    level: "basic",
    codeExample: "cities = {\"Kolkata\", \"Barrackpore\"}\nprint(\"kolkata\" in cities)  # False\nprint(\"Kolkata\" in cities)  # True"
  },
  {
    question: "What is the catastrophic performance trap of writing: 'for item in dataset: if item in set(big_list):'?",
    shortAnswer: "It re-constructs the entire set on every single loop iteration, ballooning execution time from O(N) to O(N^2) quadratic time.",
    explanation: "Calling set(big_list) inside the loop executes O(M) work on every single step. The proper pattern is to build the set once outside the loop (lookup_set = set(big_list)) and then perform O(1) queries inside the loop.",
    hint: "Build the set once before the loop, not inside it.",
    level: "expert",
    codeExample: "# BAD (O(N^2)):\n# for x in stream:\n#     if x in set(big_list):\n\n# GOOD (O(N)):\n# fast_set = set(big_list)\n# for x in stream:\n#     if x in fast_set:"
  },
  {
    question: "What is the worst-case time complexity of set membership testing, and when does it occur?",
    shortAnswer: "O(N) worst-case time, occurring when all elements produce the exact same hash code (catastrophic hash collision).",
    explanation: "If a malicious or flawed hash function causes all N elements to collide in the same bucket, Python must traverse the open-addressing probe chain linearly with equality checks, taking O(N) time.",
    hint: "Severe hash collisions degrade hash tables to linear lists.",
    level: "expert",
    codeExample: "# When hash(a) == hash(b) == hash(c)... for all items, lookup degrades to O(N)"
  },
  {
    question: "How does the 'not in' operator work in Python sets?",
    shortAnswer: "It returns True if the element is absent from the set's hash table and False if it is present.",
    explanation: "The expression 'x not in s' is equivalent to 'not (x in s)', executing an O(1) hash check and inverting the boolean result.",
    hint: "It inverts the membership test result.",
    level: "basic",
    codeExample: "banned = {\"192.168.1.1\", \"10.0.0.5\"}\nif \"172.16.0.1\" not in banned:\n    print(\"Allowed connection\")"
  },
  {
    question: "Can you test membership of a tuple in a set: (1, 2) in {(1, 2), (3, 4)}?",
    shortAnswer: "Yes, because tuples of immutable items are hashable and can be looked up in O(1) time.",
    explanation: "Python computes the combined hash of the tuple (1, 2) and looks it up directly in the set's hash table, returning True.",
    hint: "Tuples are hashable and valid lookup targets.",
    level: "basic",
    codeExample: "coords = {(22.57, 88.36), (22.76, 88.37)}\nprint((22.57, 88.36) in coords)  # True"
  },
  {
    question: "What happens if you test membership of an unhashable object: [1, 2] in {1, 2, 3}?",
    shortAnswer: "It immediately raises TypeError: unhashable type: 'list'.",
    explanation: "To check membership in a set, Python must calculate hash(target). Since lists cannot be hashed, the lookup fails at step 1 with a TypeError.",
    hint: "The searched item must also be hashable.",
    level: "moderate",
    codeExample: "s = {1, 2, 3}\ntry:\n    print([1, 2] in s)\nexcept TypeError as e:\n    print(e)  # unhashable type: 'list'"
  },
  {
    question: "What is the speed difference between searching a million-item list vs a million-item set?",
    shortAnswer: "Sets are typically 1,000x to 10,000x faster than lists for large dataset lookups.",
    explanation: "A million-item list requires inspecting up to 1,000,000 memory pointers sequentially (~10-20 ms). A set calculates one hash and inspects one bucket in under 0.0001 ms.",
    hint: "1 step vs 1,000,000 steps.",
    level: "moderate",
    codeExample: "# Million item lookup: List takes ~15ms; Set takes ~0.00005ms"
  },
  {
    question: "How do sets handle float-to-integer membership: 42.0 in {42}?",
    shortAnswer: "It returns True because 42.0 == 42 and hash(42.0) == hash(42).",
    explanation: "Floats and ints with identical mathematical values have matching hashes and compare equal, so 42.0 is found inside {42}.",
    hint: "42.0 and 42 are equal in hash and value.",
    level: "basic",
    codeExample: "print(42.0 in {42})  # True\nprint(42 in {42.0})  # True"
  },
  {
    question: "What is the result of 'None in {None}' and 'None in set()'?",
    shortAnswer: "'None in {None}' is True; 'None in set()' is False.",
    explanation: "None is a valid immutable singleton object. It exists in {None} (len 1) and is absent from empty set() (len 0).",
    hint: "None is a valid set element.",
    level: "basic",
    codeExample: "print(None in {None})  # True\nprint(None in set())   # False"
  },
  {
    question: "How can you use set membership testing to filter common items between two large lists in O(N+M) time?",
    shortAnswer: "Convert one list to a set (O(M)), then filter the other list with 'x in set_b' in O(N) time.",
    explanation: "Converting list B to a set takes O(M). Checking each item of list A takes O(1) * N = O(N). Total time is O(N+M), far faster than O(N*M) nested list scanning.",
    hint: "Convert the lookup list to a set first.",
    level: "moderate",
    codeExample: "list_a = [1, 2, 3, 4, 5]\nlist_b = [3, 4, 5, 6, 7]\nset_b = set(list_b)\ncommon = [x for x in list_a if x in set_b]\nprint(common)  # [3, 4, 5]"
  },
  {
    question: "Can set membership testing be used inside dictionary and list comprehensions?",
    shortAnswer: "Yes, 'x in my_set' is widely used in comprehension if-clauses for high-speed filtering.",
    explanation: "Because set lookups are O(1), using 'if x in whitelist_set' inside a list or dict comprehension keeps comprehension throughput at maximum speed.",
    hint: "Using sets in comprehension filter conditions keeps them O(N).",
    level: "basic",
    codeExample: "allowed_roles = {\"admin\", \"editor\"}\nusers = [{\"name\": \"Susmita\", \"role\": \"admin\"}, {\"name\": \"John\", \"role\": \"guest\"}]\nactive_staff = [u[\"name\"] for u in users if u[\"role\"] in allowed_roles]\nprint(active_staff)  # ['Susmita']"
  },
  {
    question: "What is the difference between 'x in my_set' and 'my_set.issubset({x})'?",
    shortAnswer: "'x in my_set' checks if x is an ELEMENT of my_set; issubset({x}) checks if my_set is a SUBSET of {x}.",
    explanation: "'x in my_set' tests single element membership in O(1) time. {x}.issubset(my_set) checks set containment.",
    hint: "Distinguish element membership from subset containment.",
    level: "moderate",
    codeExample: "s = {1, 2, 3}\nprint(1 in s)              # True\nprint({1}.issubset(s))     # True\nprint(s.issubset({1}))     # False"
  },
  {
    question: "Why is set membership testing thread-safe for concurrent read-only operations under Python's GIL?",
    shortAnswer: "Read-only membership queries ('x in s') only calculate hashes and read buckets without mutating table pointers.",
    explanation: "Because read-only lookups don't alter the internal PySetObject C struct or resize the table, concurrent threads can query 'x in s' simultaneously without corrupting memory.",
    hint: "Read-only hash lookups do not mutate internal data structures.",
    level: "expert",
    codeExample: "# Multiple threads querying 'token in active_sessions' is safe for reads"
  },
  {
    question: "What is the output of '0.1 + 0.2 in {0.3}' and why?",
    shortAnswer: "False, due to IEEE 754 floating-point binary representation precision (0.1 + 0.2 == 0.30000000000000004).",
    explanation: "In binary floating-point math, 0.1 + 0.2 equals 0.30000000000000004. Since 0.1 + 0.2 != 0.3, the equality check fails and Python returns False.",
    hint: "Recall binary floating-point rounding inaccuracies.",
    level: "expert",
    codeExample: "print(0.1 + 0.2 in {0.3})  # False\nprint(0.1 + 0.2)            # 0.30000000000000004"
  },
  {
    question: "How does set membership testing benefit web scraper crawlers?",
    shortAnswer: "It allows O(1) verification to check if a URL has already been crawled before making an HTTP request.",
    explanation: "A scraper maintains visited_urls = set(). Checking 'url in visited_urls' takes O(1) time, preventing redundant network requests and endless link loops.",
    hint: "Check visited URLs in O(1) time.",
    level: "basic",
    codeExample: "visited = set()\ndef crawl(url):\n    if url in visited:\n        return\n    visited.add(url)"
  },
  {
    question: "What happens when you check membership of a custom class instance: my_obj in my_set?",
    shortAnswer: "Python executes custom_class.__hash__() followed by custom_class.__eq__().",
    explanation: "Python calls the instance's __hash__ method to locate the bucket, and if needed, invokes __eq__ to confirm matching instance values.",
    hint: "Custom classes route lookups through __hash__ and __eq__.",
    level: "moderate",
    codeExample: "class Student:\n    def __init__(self, roll):\n        self.roll = roll\n    def __hash__(self):\n        return hash(self.roll)\n    def __eq__(self, other):\n        return isinstance(other, Student) and self.roll == other.roll\n\ns = {Student(101)}\nprint(Student(101) in s)  # True"
  },
  {
    question: "How can you check if any element from list A is present in set B?",
    shortAnswer: "Use any(x in set_b for x in list_a) or bool(set_b.intersection(list_a)).",
    explanation: "any(x in set_b for x in list_a) short-circuits on the first match in O(1) per check. bool(set_b.intersection(list_a)) checks set overlap directly.",
    hint: "Combine any() with a set membership generator.",
    level: "moderate",
    codeExample: "banned_roles = {\"banned\", \"suspended\"}\nuser_roles = [\"viewer\", \"banned\", \"student\"]\nprint(any(r in banned_roles for r in user_roles))  # True"
  },
  {
    question: "How can you check if ALL elements from list A are present in set B?",
    shortAnswer: "Use all(x in set_b for x in list_a) or set(list_a).issubset(set_b).",
    explanation: "all(x in set_b for x in list_a) verifies that every item in list_a exists in set_b, short-circuiting to False on the first missing item.",
    hint: "Use all() or issubset().",
    level: "moderate",
    codeExample: "required = {\"read\", \"write\"}\nuser_perms = {\"read\", \"write\", \"delete\"}\nprint(required.issubset(user_perms))  # True"
  },
  {
    question: "Why is 'x in my_set' faster than 'x in my_dict.keys()' in Python 2 vs Python 3?",
    shortAnswer: "In Python 3, dict.keys() is a set-like dictionary view with O(1) lookups, identical in speed to sets; in Python 2, dict.keys() built a full list in O(N).",
    explanation: "Python 3 converted dict.keys() from a static list into a dynamic set-like view with direct O(1) hash lookups, matching set performance.",
    hint: "In Python 3, dict.keys() is a set-like view.",
    level: "expert",
    codeExample: "d = {\"a\": 1, \"b\": 2}\n# 'a in d' or 'a in d.keys()' is O(1) in Python 3"
  },
  {
    question: "What is the output of '\"5\" in {5, 6, 7}'?",
    shortAnswer: "False, because string '5' and integer 5 have different types and different hashes.",
    explanation: "In Python, \"5\" (str) != 5 (int), and hash(\"5\") != hash(5). They are completely distinct elements.",
    hint: "Strings and integers do not compare equal.",
    level: "basic",
    codeExample: "print(\"5\" in {5, 6, 7})  # False\nprint(5 in {5, 6, 7})    # True"
  },
  {
    question: "How does set membership testing speed up spell checker applications?",
    shortAnswer: "Loading dictionary words into a set allows verifying if any input word is spelled correctly in O(1) time.",
    explanation: "A spell checker with 200,000 words in a set checks word validity in under 1 microsecond per word, compared to scanning a text file in 50 milliseconds per word.",
    hint: "Dictionary lookup in O(1) enables real-time spell checking.",
    level: "basic",
    codeExample: "dictionary = {\"python\", \"programming\", \"barrackpore\"}\nword = \"python\"\nprint(f\"Is '{word}' valid? -> {word in dictionary}\")"
  },
  {
    question: "Can set membership be checked for complex numbers: (1+2j) in {1+2j, 3+4j}?",
    shortAnswer: "Yes, complex numbers are hashable and evaluated in O(1) time.",
    explanation: "Complex numbers compute hashes from real and imaginary parts and compare equal with ==, executing normal O(1) lookups.",
    hint: "Complex numbers are hashable and valid in sets.",
    level: "basic",
    codeExample: "c_set = {1 + 2j, 3 + 4j}\nprint(1 + 2j in c_set)  # True"
  },
  {
    question: "What is the effect of checking membership in an empty set: x in set()?",
    shortAnswer: "It immediately returns False in O(1) time without error.",
    explanation: "Because an empty set has 0 active elements, Python immediately detects that no matching bucket exists and returns False in 1 step.",
    hint: "Empty set lookups always evaluate to False.",
    level: "basic",
    codeExample: "print(10 in set())  # False"
  },
  {
    question: "How can you count the number of elements from a query list that exist in a set?",
    shortAnswer: "Use sum(1 for x in query_list if x in target_set).",
    explanation: "The generator expression evaluates each item in query_list against target_set in O(1) time, summing 1 for each match in O(N) total time.",
    hint: "Combine sum() with a set membership filter generator.",
    level: "moderate",
    codeExample: "target_set = {\"A\", \"B\", \"C\", \"D\"}\nquery = [\"A\", \"B\", \"Z\", \"X\", \"A\"]\nmatch_count = sum(1 for item in query if item in target_set)\nprint(\"Matches:\", match_count)  # 3 (A, B, A)"
  },
  {
    question: "Why does Python set membership testing use open-addressing with quadratic perturbation instead of chaining (linked lists)?",
    shortAnswer: "Open-addressing maintains CPU cache locality by keeping all entries in a single contiguous memory block, avoiding pointer chasing.",
    explanation: "Separate chaining with linked lists incurs CPU cache misses due to fragmented pointer chasing. Open-addressing keeps entries close in CPU cache lines, maximizing lookup speed on modern processors.",
    hint: "Contiguous cache locality is faster than linked list pointer chasing.",
    level: "expert",
    codeExample: "# CPython uses perturbation open addressing for maximum CPU cache hit rate"
  },
  {
    question: "How does set membership testing protect user authentication endpoints against brute force attacks?",
    shortAnswer: "By storing rate-limited or locked IP addresses in an in-memory set to reject blocked IPs in O(1) time before hitting the database.",
    explanation: "A security middleware checks 'client_ip in locked_ips' before performing expensive database queries or cryptographic hashing, deflecting brute-force attacks at zero cost.",
    hint: "O(1) in-memory checks block requests before hitting the database.",
    level: "moderate",
    codeExample: "locked_ips = {\"192.168.1.100\", \"10.0.0.99\"}\nif client_ip in locked_ips:\n    return \"403 Forbidden\""
  },
  {
    question: "What is the golden rule for professional developers regarding membership testing in Python?",
    shortAnswer: "Whenever you need repeated 'in' or 'not in' lookups across a collection of data, ALWAYS store or convert the collection to a Set!",
    explanation: "Converting a list to a set changes search cost from O(N) linear time to O(1) constant time, transforming slow multi-second pipelines into instantaneous millisecond executions.",
    hint: "Repeated Lookups = Convert to Set!",
    level: "basic",
    codeExample: "# Golden Rule:\n# Repeated Lookups -> USE SET!\nfast_lookup = set(raw_data)\nif item in fast_lookup:\n    ..."
  }
];

export default questions;
