// src/components/study/python/topics/002_006_sets/topic11_files/topic11_questions.js
// 30 Comprehensive Master Review Questions for Topic 11: Symmetric Difference

const questions = [
  {
    question: "What is the mathematical definition of set Symmetric Difference (A ^ B)?",
    shortAnswer: "The set of elements that belong to either set A or set B, but NOT to both (A Δ B = (A ∪ B) - (A ∩ B)).",
    explanation: "Symmetric difference acts like a logical XOR (Exclusive OR) on set memberships: it keeps elements unique to set A and elements unique to set B, excluding any elements in their common intersection.",
    hint: "Think of XOR: elements in either set, but not in both.",
    level: "basic",
    codeExample: "A = {\"Python\", \"React\"}\nB = {\"React\", \"Django\"}\nprint(A ^ B)  # {'Python', 'Django'}"
  },
  {
    question: "What is the output of {1, 2, 3} ^ {2, 3, 4}?",
    shortAnswer: "{1, 4}.",
    explanation: "2 and 3 are shared (intersection) and thus discarded; 1 is exclusive to the first set and 4 is exclusive to the second set, yielding {1, 4}.",
    hint: "Exclude the shared items 2 and 3.",
    level: "basic",
    codeExample: "print({1, 2, 3} ^ {2, 3, 4})  # {1, 4}"
  },
  {
    question: "Is Symmetric Difference commutative: Is A ^ B always equal to B ^ A?",
    shortAnswer: "Yes, symmetric difference is strictly commutative: A ^ B == B ^ A for all sets.",
    explanation: "Because (A \\ B) ∪ (B \\ A) is equivalent to (B \\ A) ∪ (A \\ B), the order of operands has zero effect on the resulting set.",
    hint: "A ^ B produces the exact same set as B ^ A.",
    level: "basic",
    codeExample: "A, B = {10, 20}, {20, 30}\nprint(A ^ B == B ^ A)  # True ({10, 30})"
  },
  {
    question: "What is the output of A ^ A for any set A?",
    shortAnswer: "set() (an empty set).",
    explanation: "Every element in A exists in both operands, so the intersection equals the entire set, leaving zero exclusive elements (self-inversion).",
    hint: "Any set XORed with itself is completely empty.",
    level: "basic",
    codeExample: "s = {\"Kolkata\", \"Barrackpore\"}\nprint(s ^ s)  # set()"
  },
  {
    question: "What is the output of A ^ set() for any set A?",
    shortAnswer: "A (a new shallow clone of set A).",
    explanation: "Because an empty set has 0 elements, the intersection is empty and all elements of A are exclusive, returning set A.",
    hint: "Symmetric difference with empty set returns A.",
    level: "basic",
    codeExample: "s = {1, 2, 3}\nprint(s ^ set() == s)  # True"
  },
  {
    question: "What is the difference between A ^ B and A.symmetric_difference(B)?",
    shortAnswer: "The ^ operator strictly requires both operands to be set instances; .symmetric_difference() accepts any iterable (list, tuple, etc.).",
    explanation: "Writing A ^ [1, 2] raises TypeError, whereas A.symmetric_difference([1, 2]) automatically converts the list and computes the result.",
    hint: "Operators require sets; methods accept any iterable.",
    level: "moderate",
    codeExample: "A = {1, 2}\n# A ^ [2, 3]                          # TypeError\nres = A.symmetric_difference([2, 3])  # Valid! Returns {1, 3}"
  },
  {
    question: "Why does A.symmetric_difference(B, C) raise a TypeError?",
    shortAnswer: "symmetric_difference() accepts exactly ONE iterable argument; multi-set symmetric difference must be chained with operators: A ^ B ^ C.",
    explanation: "Unlike union() and intersection() which accept *others variadic arguments, symmetric_difference() is defined pairwise and takes exactly one argument.",
    hint: "symmetric_difference takes only 1 argument; chain with ^ for multiple sets.",
    level: "expert",
    codeExample: "A, B, C = {1}, {2}, {3}\n# A.symmetric_difference(B, C)  # TypeError\nres = A ^ B ^ C                 # Valid! Returns {1, 2, 3}"
  },
  {
    question: "How does multi-set chaining work: What elements are in A ^ B ^ C?",
    shortAnswer: "Elements that appear in an ODD number of sets (i.e. present in exactly 1 set OR present in all 3 sets).",
    explanation: "Following XOR logic: items in 1 set appear 1 time (odd -> kept); items in 2 sets appear 2 times (even -> cancelled out); items in 3 sets appear 3 times (odd -> kept).",
    hint: "Elements with odd multiplicity are kept; even multiplicity are cancelled.",
    level: "expert",
    codeExample: "A = {1, 2, 3}\nB = {2, 3, 4}\nC = {3, 4, 5}\n# 1 in A (odd: kept)\n# 2 in A,B (even: dropped)\n# 3 in A,B,C (odd: kept)\n# 4 in B,C (even: dropped)\n# 5 in C (odd: kept)\nprint(A ^ B ^ C)  # {1, 3, 5}"
  },
  {
    question: "What is the in-place mutating equivalent of A ^ B?",
    shortAnswer: "A ^= B or A.symmetric_difference_update(B).",
    explanation: "Both ^= and symmetric_difference_update() mutate set A in place, replacing its elements with the symmetric difference and returning None.",
    hint: "Use ^= or symmetric_difference_update().",
    level: "basic",
    codeExample: "A = {1, 2}\nB = {2, 3}\nA ^= B\nprint(A)  # {1, 3}"
  },
  {
    question: "How can you use symmetric difference to detect discrepancies between an ERP database and a bank statement in one line?",
    shortAnswer: "discrepancies = erp_transactions ^ bank_transactions.",
    explanation: "Any transaction that exists only in the ERP (un-cleared payment) or only in the bank statement (unrecorded deposit) appears in the symmetric difference set.",
    hint: "Symmetric difference highlights all non-matching records.",
    level: "moderate",
    codeExample: "erp = {\"TXN1\", \"TXN2\", \"TXN3\"}\nbank = {\"TXN1\", \"TXN2\", \"TXN4\"}\nprint(erp ^ bank)  # {'TXN3', 'TXN4'}"
  },
  {
    question: "What is the time complexity of set Symmetric Difference (A ^ B)?",
    shortAnswer: "O(len(A) + len(B)).",
    explanation: "Python constructs a new set, copies elements from A, and then iterates through all elements of B, toggling (adding missing, removing present) in O(1) time per element.",
    hint: "Proportional to the total number of items in both sets.",
    level: "moderate",
    codeExample: "# Time: O(len(A) + len(B))"
  },
  {
    question: "How does ^= optimize memory compared to A = A ^ B?",
    shortAnswer: "A ^= B mutates the existing hash table in place, avoiding the allocation and garbage collection of an intermediate set object.",
    explanation: "In-place ^= re-uses the existing PySetObject structure, mutating buckets directly rather than creating a second copy in RAM.",
    hint: "In-place mutation avoids allocating a new container.",
    level: "expert",
    codeExample: "A = set(range(100000))\nB = set(range(50000, 150000))\nA ^= B  # Re-uses A's memory block"
  },
  {
    question: "What is the result of A ^ B when A and B are completely disjoint sets (A & B == set())?",
    shortAnswer: "A | B (The union of both sets).",
    explanation: "Because the intersection is empty ((A & B) == set()), subtracting nothing from the union leaves the entire union: (A | B) - set() == A | B.",
    hint: "Disjoint sets have no shared items to subtract.",
    level: "basic",
    codeExample: "A = {\"A\", \"B\"}\nB = {\"C\", \"D\"}\nprint(A ^ B == A | B)  # True"
  },
  {
    question: "What is the result of A ^ B when A is a subset of B (A <= B)?",
    shortAnswer: "B - A (The difference of B and A).",
    explanation: "Since all elements of A are inside B, the intersection is A. The union is B. Thus (A | B) - (A & B) = B - A.",
    hint: "Union is B and intersection is A, so result is B - A.",
    level: "moderate",
    codeExample: "A = {1, 2}\nB = {1, 2, 3, 4}\nprint(A ^ B == B - A)  # True ({3, 4})"
  },
  {
    question: "How can you detect configuration drift between Production and Staging server feature flags?",
    shortAnswer: "drift_flags = prod_flags ^ staging_flags.",
    explanation: "Symmetric difference highlights flags enabled in production but disabled in staging, and vice versa.",
    hint: "Symmetric difference finds all environment discrepancies.",
    level: "basic",
    codeExample: "prod = {\"AUTH_V2\", \"DARK_MODE\"}\nstaging = {\"AUTH_V2\", \"BETA_DASHBOARD\"}\nprint(prod ^ staging)  # {'DARK_MODE', 'BETA_DASHBOARD'}"
  },
  {
    question: "Can symmetric difference be applied directly between dictionary keys views: dict1.keys() ^ dict2.keys()?",
    shortAnswer: "Yes, in Python 3 dictionary key views support the ^ operator directly.",
    explanation: "dict_keys objects implement full set algebraic operators, enabling instantaneous key difference queries.",
    hint: "dict.keys() supports ^ natively.",
    level: "moderate",
    codeExample: "d1 = {\"a\": 1, \"b\": 2}\nd2 = {\"b\": 3, \"c\": 4}\nprint(d1.keys() ^ d2.keys())  # {'a', 'c'}"
  },
  {
    question: "What happens if you execute: A = {1, 2}; A = A.symmetric_difference_update({2, 3})?",
    shortAnswer: "A becomes None because symmetric_difference_update() mutates in place and returns None.",
    explanation: "This is the classic return-value reassignment trap. Mutating methods return None.",
    hint: "Mutating methods return None.",
    level: "basic",
    codeExample: "A = {1, 2}\n# A = A.symmetric_difference_update({2, 3}) # DANGER: A becomes None!\nA.symmetric_difference_update({2, 3})      # Correct!"
  },
  {
    question: "How do you find characters that appear in string 1 or string 2, but not in both?",
    shortAnswer: "set(str1) ^ set(str2).",
    explanation: "Converting strings to sets of characters and applying ^ finds all non-common letters.",
    hint: "Convert strings to sets and apply ^.",
    level: "basic",
    codeExample: "s1 = \"barrackpore\"\ns2 = \"kolkata\"\nprint(set(s1) ^ set(s2))  # Characters exclusive to either city"
  },
  {
    question: "Is Symmetric Difference associative: Is (A ^ B) ^ C equal to A ^ (B ^ C)?",
    shortAnswer: "Yes, symmetric difference is strictly associative.",
    explanation: "Parenthesization order does not change the resulting set of odd-multiplicity elements.",
    hint: "Associativity holds for symmetric difference.",
    level: "expert",
    codeExample: "A, B, C = {1, 2}, {2, 3}, {3, 4}\nprint(((A ^ B) ^ C) == (A ^ (B ^ C)))  # True"
  },
  {
    question: "How can you find students who take exactly ONE course between Course A, Course B, and Course C (exclusive single-course students)?",
    shortAnswer: "(A - B - C) | (B - A - C) | (C - A - B).",
    explanation: "Note that A ^ B ^ C includes students in all 3 courses as well (odd count). To strictly get students in exactly 1 course, unite the pairwise differences.",
    hint: "Unite students exclusive to each single course.",
    level: "expert",
    codeExample: "A, B, C = {1, 2}, {2, 3}, {2, 4}\nstrictly_one = (A - B - C) | (B - A - C) | (C - A - B)\nprint(strictly_one)  # {1, 3, 4}"
  },
  {
    question: "What is the output of {True, 1} ^ {1, 2} and why?",
    shortAnswer: "{2}.",
    explanation: "Because True == 1 and hash(True) == hash(1), {True, 1} evaluates to {True} (or {1}). In {1} ^ {1, 2}, 1 is shared and eliminated, leaving {2}.",
    hint: "True and 1 collapse into a single element.",
    level: "expert",
    codeExample: "print({True, 1} ^ {1, 2})  # {2}"
  },
  {
    question: "What happens if you use ^ between a set and a frozenset?",
    shortAnswer: "It succeeds; the return type matches the type of the left-hand operand.",
    explanation: "set ^ frozenset produces a set; frozenset ^ set produces a frozenset.",
    hint: "Left operand dictates return type.",
    level: "moderate",
    codeExample: "s = {1, 2}\nfs = frozenset([2, 3])\nprint(type(s ^ fs))   # <class 'set'>\nprint(type(fs ^ s))  # <class 'frozenset'>"
  },
  {
    question: "How do you find elements that changed between two versions of a data record?",
    shortAnswer: "delta = set(record_v1.items()) ^ set(record_v2.items()).",
    explanation: "Converting key-value pairs to tuple sets and applying ^ extracts modified or added key-value pairs in O(N) time.",
    hint: "Apply ^ on dict.items() tuple sets.",
    level: "moderate",
    codeExample: "v1 = {\"name\": \"Susmita\", \"fee\": 4500}\nv2 = {\"name\": \"Susmita\", \"fee\": 5000}\nprint(set(v1.items()) ^ set(v2.items()))  # {('fee', 4500), ('fee', 5000)}"
  },
  {
    question: "What is the algebraic relationship between Difference and Symmetric Difference?",
    shortAnswer: "A ^ B == (A - B) | (B - A).",
    explanation: "Symmetric difference is the union of relative complements.",
    hint: "Union of A - B and B - A.",
    level: "basic",
    codeExample: "A, B = {1, 2}, {2, 3}\nprint(A ^ B == ((A - B) | (B - A)))  # True"
  },
  {
    question: "What is the output of: s = set(); print(s.symmetric_difference([]))?",
    shortAnswer: "set() (empty set).",
    explanation: "Both collections are empty, so symmetric difference is empty.",
    hint: "Empty set XOR empty list is empty set.",
    level: "basic",
    codeExample: "print(set().symmetric_difference([]))  # set()"
  },
  {
    question: "Can set symmetric difference be used to toggle the presence of an item in a set?",
    shortAnswer: "Yes: s ^= {item} adds item if absent, and removes item if already present.",
    explanation: "If item exists in s, {item} is shared and removed. If item is missing from s, it is exclusive and added (classic toggle pattern!).",
    hint: "s ^= {x} acts as an in-place state toggle.",
    level: "expert",
    codeExample: "selected = {\"DARK_MODE\"}\nselected ^= {\"DARK_MODE\"}  # Toggles OFF -> set()\nprint(selected)\nselected ^= {\"DARK_MODE\"}  # Toggles ON  -> {'DARK_MODE'}\nprint(selected)"
  },
  {
    question: "Why is s ^= {item} preferred for state toggling in GUI/CLI applications?",
    shortAnswer: "It eliminates if/else branching logic: if item in s: s.remove(item) else: s.add(item) becomes a clean 1-liner.",
    explanation: "Symmetric difference naturally encapsulates the toggle condition in a single atomic expression.",
    hint: "Replaces if/else with a clean 1-line expression.",
    level: "moderate",
    codeExample: "# Instead of:\n# if x in s: s.remove(x) else: s.add(x)\n# Use:\ns ^= {x}"
  },
  {
    question: "What is the output of {1, 2} ^ {3, 4} ^ {1, 3}?",
    shortAnswer: "{2, 4}.",
    explanation: "1 appears in set1 and set3 (even -> cancelled); 3 appears in set2 and set3 (even -> cancelled); 2 appears only in set1 (odd -> kept); 4 appears only in set2 (odd -> kept).",
    hint: "1 and 3 appear twice (even), so they drop out.",
    level: "moderate",
    codeExample: "print({1, 2} ^ {3, 4} ^ {1, 3})  # {2, 4}"
  },
  {
    question: "How does set symmetric difference assist in biometric database deduplication?",
    shortAnswer: "It isolates unique fingerprint or face feature hashes that don't match across two scan captures.",
    explanation: "Computing hash_a ^ hash_b highlights mismatched biometric minutiae points in O(1) hash lookups.",
    hint: "Highlights non-matching feature points.",
    level: "moderate",
    codeExample: "# Feature delta: scan1 ^ scan2"
  },
  {
    question: "What is the key takeaway for a software developer regarding Symmetric Difference?",
    shortAnswer: "Use Symmetric Difference (A ^ B) whenever you need to find deltas, discrepancies, or anomalies between two datasets in a single step.",
    explanation: "From bank ledger reconciliation to feature toggle states and configuration diffs, Symmetric Difference provides instantaneous delta resolution in Python.",
    hint: "Symmetric Difference = Instant Delta & Discrepancy Finder.",
    level: "basic",
    codeExample: "# Master Formula:\n# Discrepancies = System_A ^ System_B\n# Toggle State  = Active_States ^= {Feature}"
  }
];

export default questions;
